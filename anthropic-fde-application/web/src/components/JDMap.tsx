import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { timeline } from "../data/timeline";
import { jdSections, jdHeader } from "../data/jd";
import { requirements } from "../data/content";
import { themes, themeById } from "../data/themes";
import { voiceFor, proofForMoment } from "../data/answers";

// --- static lookups (data is build-time constant) ---------------------------

const PALETTE = ["#C25B3D", "#5B7B8C", "#6B7F6E", "#8A6D3B", "#7A6A82", "#A0492F", "#9C6B4F", "#4A4034"];
const REQ_COLOR = new Map<string, string>();
requirements.forEach((r, i) => REQ_COLOR.set(r.id, PALETTE[i % PALETTE.length]));
const colorFor = (reqId: string) => REQ_COLOR.get(reqId) ?? "#C25B3D";
const reqText = (reqId: string) => requirements.find((r) => r.id === reqId)?.text ?? reqId;

const TRACK_COLOR: Record<string, string> = {
  "ai-leadership": "#C25B3D",
  "data-platform": "#5B7B8C",
  "ops-impact": "#6B7F6E",
  "public-build": "#8A6D3B",
  founder: "#7A6A82",
  communication: "#9C6B4F",
  operator: "#A89683",
  athena: "#1F1B16"
};
const trackColor = (t: string) => TRACK_COLOR[t] ?? "#A89683";

const RAIL_NODES = [...timeline].reverse(); // newest first

type Src = { kind: "req" | "theme"; id: string; key: string; el: HTMLElement };
type Conn = { key: string; color: string; src: { x: number; y: number }; items: { key: string; d: string; x: number; y: number }[] };

const COLLAPSED_W = 76;
const EXPANDED_W = 380;

export default function JDMap() {
  const [hoverSrc, setHoverSrc] = useState<Src | null>(null);
  const [pinSrc, setPinSrc] = useState<Src | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [railPinned, setRailPinned] = useState(false);
  const [railHover, setRailHover] = useState(false);
  const [conn, setConn] = useState<Conn | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [mounted, setMounted] = useState(false);

  const nodeRefs = useRef(new Map<string, HTMLElement>());
  const themeChipRefs = useRef(new Map<string, HTMLElement>());
  const clearTimer = useRef<number | null>(null);

  const src = hoverSrc ?? pinSrc;
  const current = useMemo(() => {
    if (!src) return null;
    if (src.kind === "req") {
      const moments = new Set(timeline.filter((n) => n.requirements.includes(src.id)).map((n) => n.id));
      return { ...src, color: colorFor(src.id), moments, reqs: new Set([src.id]) };
    }
    const t = themeById(src.id);
    return { ...src, color: t?.color ?? "#C25B3D", moments: new Set(t?.moments ?? []), reqs: new Set(t?.requirements ?? []) };
  }, [src]);

  const railOpen = railPinned || railHover || current != null || (!isDesktop && pinSrc != null);
  const selected = selectedId ? timeline.find((n) => n.id === selectedId) ?? null : null;
  const pinnedTheme = pinSrc?.kind === "theme" ? themeById(pinSrc.id) ?? null : null;

  const setNodeRef = (id: string) => (el: HTMLElement | null) => {
    if (el) nodeRefs.current.set(id, el);
    else nodeRefs.current.delete(id);
  };
  const setChipRef = (id: string) => (el: HTMLElement | null) => {
    if (el) themeChipRefs.current.set(id, el);
    else themeChipRefs.current.delete(id);
  };

  // --- geometry -------------------------------------------------------------
  const compute = useCallback(() => {
    if (!current || !isDesktop) {
      setConn(null);
      return;
    }
    const s = current.el.getBoundingClientRect();
    const x1 = s.right;
    const y1 = s.top + s.height / 2;
    const items: Conn["items"] = [];
    for (const n of timeline) {
      if (!current.moments.has(n.id)) continue;
      const el = nodeRefs.current.get(n.id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const x2 = r.left + 6;
      const y2 = r.top + r.height / 2;
      const dx = Math.max(48, (x2 - x1) * 0.4);
      const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
      items.push({ key: n.id, d, x: x2, y: y2 });
    }
    setConn({ key: current.key, color: current.color, src: { x: x1, y: y1 }, items });
  }, [current, isDesktop]);

  const computeRef = useRef(compute);
  computeRef.current = compute;

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    compute();
    if (!current || !isDesktop) return;
    let raf = 0;
    const onMove = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => computeRef.current());
    };
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [current, isDesktop, mounted, compute]);

  // Keep connectors glued while the rail slides open/closed.
  useEffect(() => {
    if (!mounted || !current || !isDesktop) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      computeRef.current();
      if (t - start < 420) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [railOpen, mounted, current, isDesktop]);

  // Esc: close detail → else clear pins.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (selectedId) setSelectedId(null);
      else {
        setPinSrc(null);
        setRailPinned(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId]);

  // --- hover/pin helpers ----------------------------------------------------
  const enter = (s: Omit<Src, "el">) => (e: React.SyntheticEvent<HTMLElement>) => {
    if (clearTimer.current) window.clearTimeout(clearTimer.current);
    setHoverSrc({ ...s, el: e.currentTarget });
  };
  const leave = () => {
    if (clearTimer.current) window.clearTimeout(clearTimer.current);
    clearTimer.current = window.setTimeout(() => setHoverSrc(null), 80);
  };
  const togglePin = (s: Omit<Src, "el">) => (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    setPinSrc((p) => (p && p.key === s.key ? null : { ...s, el }));
  };
  // Pin a theme from elsewhere (e.g. the detail panel) using its legend chip as anchor.
  const pinTheme = (themeId: string) => {
    const el = themeChipRefs.current.get(themeId);
    if (!el) return;
    setPinSrc({ kind: "theme", id: themeId, key: themeId, el });
  };

  const lineExact = (lineKey: string) => src?.kind === "req" && src.key === lineKey;
  const lineCovered = (reqId: string) => current?.reqs.has(reqId) ?? false;

  return (
    <div className="relative flex items-start min-h-[calc(100vh-3.5rem)]">
      {/* ---- JD centerpiece ---- */}
      <div className="flex-1 min-w-0 px-6 md:px-10 py-10 max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-500 mb-3 fade-up">The role</p>
        <h1 className="text-3xl md:text-4xl font-serif text-ink-900 leading-tight fade-up fade-up-delay-1">{jdHeader.role}</h1>
        <p className="mt-2 text-lg text-ink-600 font-serif fade-up fade-up-delay-1">{jdHeader.company}</p>

        <p className="mt-6 text-base text-ink-700 leading-relaxed fade-up fade-up-delay-2">{jdHeader.aboutRole}</p>

        <p className="mt-3 text-xs text-ink-400 fade-up fade-up-delay-2">
          <a href={jdHeader.url} target="_blank" rel="noopener" className="link">Anthropic's posting ↗</a>
        </p>

        <p className="mt-6 text-sm text-ink-500 leading-relaxed fade-up fade-up-delay-3">
          {isDesktop ? "Hover a requirement" : "Tap a requirement"} to light up where in my life it shows up — or pick a{" "}
          <span className="text-ink-700 font-medium">thread</span> below to follow one idea across everything. Click a moment to read how it maps back.
        </p>

        {/* Theme axis */}
        <div className="mt-6 fade-up fade-up-delay-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-500 mb-2">Threads</p>
          <div className="flex flex-wrap gap-2">
            {themes.map((t) => {
              const on = src?.kind === "theme" && src.id === t.id;
              const pinned = pinSrc?.kind === "theme" && pinSrc.id === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  ref={setChipRef(t.id)}
                  onMouseEnter={enter({ kind: "theme", id: t.id, key: t.id })}
                  onMouseLeave={leave}
                  onFocus={enter({ kind: "theme", id: t.id, key: t.id })}
                  onBlur={leave}
                  onClick={togglePin({ kind: "theme", id: t.id, key: t.id })}
                  aria-pressed={pinned}
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all"
                  style={
                    on
                      ? { background: t.color, color: "#FCFAF6", borderColor: t.color }
                      : { background: "transparent", color: "#4A4034", borderColor: `${t.color}66` }
                  }
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: on ? "#FCFAF6" : t.color }} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {jdSections.map((section) => (
            <section key={section.id}>
              <h2 className="text-xs uppercase tracking-[0.18em] text-ink-500 mb-3">{section.label}</h2>
              <ul className="space-y-1.5">
                {section.lines.map((line, i) => {
                  const lineKey = `${section.id}:${i}`;
                  const color = colorFor(line.reqId);
                  const exact = lineExact(lineKey);
                  const covered = lineCovered(line.reqId);
                  const pinned = pinSrc?.kind === "req" && pinSrc.key === lineKey;
                  const n = timeline.filter((nd) => nd.requirements.includes(line.reqId)).length;
                  return (
                    <li key={lineKey}>
                      <button
                        type="button"
                        onMouseEnter={enter({ kind: "req", id: line.reqId, key: lineKey })}
                        onMouseLeave={leave}
                        onFocus={enter({ kind: "req", id: line.reqId, key: lineKey })}
                        onBlur={leave}
                        onClick={togglePin({ kind: "req", id: line.reqId, key: lineKey })}
                        aria-pressed={pinned}
                        className={`group w-full text-left rounded-lg border pl-3 pr-3 py-2.5 transition-all duration-200 ${
                          exact ? "bg-white border-ink-700/15 shadow-sm" : covered ? "bg-cream-100 border-transparent" : "bg-transparent border-transparent hover:bg-cream-100"
                        }`}
                        style={exact ? { boxShadow: `inset 3px 0 0 0 ${color}` } : undefined}
                      >
                        <span className="flex items-center gap-2">
                          <span className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0 transition-opacity" style={{ background: color, opacity: exact || covered ? 1 : 0.35 }} />
                          <span className="text-sm text-ink-800 leading-snug flex-1">{line.text}</span>
                          <span className="text-[11px] tabular-nums text-ink-400 flex-shrink-0 transition-colors" style={exact || covered ? { color } : undefined}>{n}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-10 text-xs text-ink-400">
          JD paraphrased from the canonical{" "}
          <a href={jdHeader.url} target="_blank" rel="noopener" className="link">Greenhouse posting</a>. Numbers count the matching moments on the timeline.
        </p>
      </div>

      {/* ---- Timeline rail ---- */}
      {!isDesktop && railOpen && <div className="fixed inset-0 z-30 bg-ink-900/20" onClick={() => setPinSrc(null)} aria-hidden="true" />}
      <aside
        onMouseEnter={() => isDesktop && setRailHover(true)}
        onMouseLeave={() => isDesktop && setRailHover(false)}
        className={
          isDesktop
            ? "sticky top-14 h-[calc(100vh-3.5rem)] shrink-0 overflow-hidden border-l border-ink-700/10 bg-cream-50/70 backdrop-blur transition-[width] duration-300 ease-out"
            : `fixed top-14 right-0 z-30 h-[calc(100vh-3.5rem)] border-l border-ink-700/10 bg-cream-50 shadow-2xl transition-transform duration-300 ease-out ${railOpen ? "translate-x-0" : "translate-x-full"}`
        }
        style={isDesktop ? { width: railOpen ? EXPANDED_W : COLLAPSED_W } : { width: "min(85vw, 22rem)" }}
        aria-label="Career timeline"
      >
        <div className="flex items-center justify-between px-3 h-11 border-b border-ink-700/10">
          <span className={`text-[11px] uppercase tracking-[0.18em] text-ink-500 transition-opacity ${railOpen ? "opacity-100" : "opacity-0"}`}>Timeline</span>
          {isDesktop ? (
            <button type="button" onClick={() => setRailPinned((v) => !v)} aria-label={railPinned ? "Unpin timeline" : "Pin timeline open"} className="text-ink-400 hover:text-ink-900 transition p-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {railPinned ? <polyline points="13 17 18 12 13 7" /> : <polyline points="11 17 6 12 11 7" />}
                <line x1={railPinned ? "6" : "18"} y1="12" x2={railPinned ? "20" : "4"} y2="12" />
              </svg>
            </button>
          ) : (
            <button type="button" onClick={() => setPinSrc(null)} aria-label="Close timeline" className="text-ink-400 hover:text-ink-900 transition p-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className="h-[calc(100%-2.75rem)] overflow-y-auto chat-scroll py-2">
          <ul className="relative">
            {RAIL_NODES.map((node) => {
              const related = current ? current.moments.has(node.id) : false;
              const dim = current != null && !related;
              const isSel = selectedId === node.id;
              const ring = current?.color ?? trackColor(node.track);
              return (
                <li key={node.id}>
                  <button
                    type="button"
                    ref={setNodeRef(node.id)}
                    onClick={() => setSelectedId(node.id)}
                    className={`w-full text-left flex items-center gap-2.5 pl-3 pr-3 py-2 transition-all duration-200 ${isSel ? "bg-white" : "hover:bg-cream-100"}`}
                    style={{ opacity: dim ? 0.32 : 1 }}
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full flex-shrink-0 transition-transform duration-200"
                      style={{ background: trackColor(node.track), transform: related ? "scale(1.5)" : "scale(1)", boxShadow: related ? `0 0 0 3px ${ring}33` : undefined }}
                    />
                    <span className="text-[10px] tabular-nums text-ink-400 w-10 flex-shrink-0">{node.dateLabel || node.sortKey}</span>
                    <div className={`flex-1 min-w-0 transition-opacity duration-200 ${railOpen ? "opacity-100" : "opacity-0"}`}>
                      <div className={`text-xs leading-snug truncate ${related ? "text-ink-900 font-medium" : "text-ink-700"}`}>{node.headline}</div>
                      {node.origin && <div className="text-[10px] text-ink-400 truncate leading-snug">{node.origin}</div>}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* ---- Connector overlay ---- */}
      {conn && (
        <svg className="pointer-events-none fixed inset-0 w-full h-full" style={{ zIndex: 25 }} aria-hidden="true">
          <g key={conn.key}>
            <circle cx={conn.src.x} cy={conn.src.y} r={3.5} fill={conn.color} className="connector-dot" />
            {conn.items.map((it, i) => (
              <g key={it.key}>
                <path d={it.d} stroke={conn.color} pathLength={1} className="connector" style={{ animationDelay: `${i * 40}ms` }} />
                <circle cx={it.x} cy={it.y} r={3} fill={conn.color} className="connector-dot" style={{ animationDelay: `${i * 40 + 150}ms` }} />
              </g>
            ))}
          </g>
        </svg>
      )}

      {/* ---- Theme "in his words" panel (left, non-modal so the rail + detail stay clickable) ---- */}
      {pinnedTheme && (
        <>
          <div role="dialog" aria-label={pinnedTheme.name} className="detail-panel-left fixed top-14 left-0 z-50 h-[calc(100vh-3.5rem)] w-[min(420px,100vw)] bg-cream-50 shadow-2xl border-r border-ink-700/15 flex flex-col">
            <div className="flex items-start justify-between gap-3 px-6 py-5 border-b border-ink-700/10" style={{ boxShadow: `inset 4px 0 0 0 ${pinnedTheme.color}` }}>
              <div>
                <p className="text-[11px] uppercase tracking-wider" style={{ color: pinnedTheme.color }}>Thread</p>
                <h3 className="text-xl font-serif text-ink-900 leading-snug mt-1">{pinnedTheme.name}</h3>
              </div>
              <button type="button" onClick={() => setPinSrc(null)} aria-label="Close" className="rounded-md p-1.5 text-ink-500 hover:bg-ink-700/10 hover:text-ink-900 transition flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto chat-scroll px-6 py-5 space-y-5">
              <p className="text-sm text-ink-700 leading-relaxed">{pinnedTheme.essence}</p>
              <blockquote className="border-l-2 pl-3 text-sm italic text-ink-600" style={{ borderColor: pinnedTheme.color }}>"{pinnedTheme.quote}"</blockquote>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-ink-500 mb-2">In his words</p>
                <ul className="space-y-3">
                  {voiceFor(pinnedTheme.id).map((a, i) => (
                    <li key={i} className="text-sm text-ink-700 leading-relaxed">"{a.text}"</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-ink-700/10">
                <p className="text-[11px] uppercase tracking-wider text-ink-500 mb-2">Answers these asks</p>
                <ul className="space-y-1.5">
                  {pinnedTheme.requirements.map((rid) => (
                    <li key={rid} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: colorFor(rid) }} />
                      <span className="text-sm text-ink-700 leading-snug">{reqText(rid)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ---- Moment detail panel (right) ---- */}
      {selected && (
        <>
          <div className="fixed inset-0 z-40 bg-ink-900/30 fade-up" onClick={() => setSelectedId(null)} aria-hidden="true" />
          <div role="dialog" aria-modal="true" aria-label={selected.headline} className="detail-panel fixed top-0 right-0 z-50 h-full w-[min(480px,100vw)] bg-cream-50 shadow-2xl border-l border-ink-700/15 flex flex-col">
            <div className="flex items-start justify-between gap-3 px-6 py-5 border-b border-ink-700/10">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[11px] uppercase tracking-wider text-ink-500">{selected.dateLabel}</p>
                  {selected.origin && (
                    <span className="inline-flex items-center rounded-full border border-ink-700/15 bg-cream-100 px-2 py-0.5 text-[10px] font-medium text-ink-600">{selected.origin}</span>
                  )}
                </div>
                <h3 className="text-xl font-serif text-ink-900 leading-snug mt-1">{selected.headline}</h3>
              </div>
              <button type="button" autoFocus onClick={() => setSelectedId(null)} aria-label="Close" className="rounded-md p-1.5 text-ink-500 hover:bg-ink-700/10 hover:text-ink-900 transition flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto chat-scroll px-6 py-5 space-y-5">
              {selected.body && <p className="text-sm text-ink-700 leading-relaxed">{selected.body}</p>}

              {selected.metrics && selected.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-3 pt-1">
                  {selected.metrics.map((m) => (
                    <div key={m.label} className="metric">
                      <span className="metric-value text-xl">{m.value}</span>
                      <span className="metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {proofForMoment(selected.id).map((a, i) => (
                <blockquote key={i} className="border-l-2 border-ink-700/20 pl-3 text-sm text-ink-700 leading-relaxed">
                  {a.text}
                  {a.source && <span className="block text-[11px] text-ink-400 mt-1">— {a.source}</span>}
                </blockquote>
              ))}

              {selected.links && selected.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {selected.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener" className="text-sm link">{l.label}</a>
                  ))}
                </div>
              )}

              {selected.themes.length > 0 && (
                <div className="pt-2 border-t border-ink-700/10">
                  <p className="text-[11px] uppercase tracking-wider text-ink-500 mb-2">Threads</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.themes.map((tid) => {
                      const t = themeById(tid);
                      if (!t) return null;
                      return (
                        <button key={tid} type="button" onClick={() => pinTheme(tid)} className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition hover:bg-cream-100" style={{ borderColor: `${t.color}66`, color: "#4A4034" }}>
                          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: t.color }} />
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {selected.requirements.length > 0 && (
                <div className="pt-2 border-t border-ink-700/10">
                  <p className="text-[11px] uppercase tracking-wider text-ink-500 mb-2">Maps to</p>
                  <ul className="space-y-1.5">
                    {selected.requirements.map((rid) => (
                      <li key={rid} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: colorFor(rid) }} />
                        <span className="text-sm text-ink-700 leading-snug">{reqText(rid)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
