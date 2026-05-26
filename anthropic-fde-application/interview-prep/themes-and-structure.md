# Shaping spec — themes, relationships, and how it lays on the map

> **Purpose:** the structured model that ties the JD ↔ themes ↔ timeline ↔ answers together, and
> the build spec for the next iteration of `/app`. **Bill: red-line the theme→requirement and
> theme→moment mappings** — these are my reads, easy to change.
>
> **Locked decisions (2026-05-25):** JD stays the centerpiece; **themes are a second selectable
> axis**; recorded **answers appear both** as moment-detail snippets *and* per-theme "in his words".

## Voice & provenance (governing principles — eat our own dog food)

- **Lead with ideas, back with proof.** Surface the *ideas, themes, and concepts* — then the *data of what was actually done* as traceable proof. Don't show raw transcripts or raw data dumps; show the distilled idea + its provenance.
- **Provenance on every claim.** This is `t.provenance` applied to the site itself: each proof point should trace to a source — a repo PR / decision-doc / backlog #, an athena work-product, or a metric. "Don't quote a thing unless you can prove a thing."
- **Honest attribution — not chest-beaty.** For athenahealth (a 22-person zone inside a big org): **led / designed / drove / shaped** — not "I built it all." Reserve **built / created / bootstrapped** for genuinely solo work (robotics.press, the founder ventures, the side projects). When in doubt, downscale the verb.

## The model

Four entities, with **themes as the connective tissue**:

- **JD requirements** (14, in `content.ts` / `jd.ts`) — the *ask*.
- **Timeline moments** (~27 nodes in `timeline.ts`) — the *proof*.
- **Themes** (6, below) — the *ideas* that bridge ask↔proof.
- **Answers** (`answers-raw.md`) — the *voice*.

**Links:** theme→moments (common thread) · theme→requirements (values↔ask) · requirement→moments (existing reverse-map) · moment→{its themes, its requirements} (detail panel) · theme→signature quote · answer→{theme, requirement}.

---

## The 6 themes (build-ready IDs)

Requirement IDs: `r.tenure, r.production-llm, r.python, r.shipped-prod, r.high-agency, r.cross-org, r.safe-ai, r.comm, r.healthcare, r.enterprise-it, r.mcp-subagents, r.codify-patterns, r.fde-services, r.former-founder`.
Moment IDs (from `timeline.ts`): tiles `federated-ai, governed-analytics, agentic-dev-operating-model, local-first-packages, ai-case-intelligence, continuity-mfa, continuity-tier1-transition, continuity-snowflake, continuity-release-recovery, site-visit-mapping, interim-po, robotics-press, github-velocity, healthcare-data-training, founder-q5, founder-bjj-weekly, substack`; arc `usmc, wight, niw, mbna, edit-systems, mid-coast, thomas-consulting, athena-assoc, athena-mgr, athena-sr-mgr`.

### `t.leverage` — Leverage / "higher bandwidth"
- **Essence:** the most done per unit of me — connect my brain to higher bandwidth.
- **Quote:** *"connect my brain to higher bandwidth"* · *"go get a toolbox — why isn't your toolbox good enough?"*
- **Requirements:** r.production-llm, r.mcp-subagents, r.codify-patterns, r.shipped-prod
- **Moments:** mid-coast (CNC router), thomas-consulting, federated-ai, agentic-dev-operating-model, robotics-press, github-velocity, local-first-packages
- **Answers:** agent-assisted dev model; "automate everything → async"; officers test judgment.

### `t.parachute` — Parachute in
- **Essence:** drop into an unfamiliar system, map what moves what, ship something elegant that survives me leaving. Read the room.
- **Quote:** *"come up to speed really quickly on how everything's connected … design something elegant."*
- **Requirements:** r.high-agency, r.fde-services, r.cross-org, r.codify-patterns, r.healthcare, r.tenure, r.enterprise-it
- **Moments:** usmc, wight (construction-engineer leap), mbna, edit-systems, thomas-consulting, athena-assoc (Pop Health greenfield), athena-mgr, athena-sr-mgr, continuity-tier1-transition, interim-po
- **Answers:** Why FDE; Pop Health greenfield; career throughline; CSM-disagreement (read-the-room).

### `t.refinement` — Relentless refinement → simplicity
- **Essence:** overbuild, then whittle to the simplest durable form; know when to stop.
- **Quote:** *"the arch is the essence of engineering"* · *"slam to stop, back off 10%"* · Raptor 1→2→3.
- **Requirements:** r.shipped-prod, r.codify-patterns
- **Moments:** robotics-press, github-velocity, governed-analytics, agentic-dev-operating-model, continuity-snowflake
- **Answers:** robotics.press constraints/refinement; Lie-Nielsen stop-criteria; "always overbuild then whittle"; got-it-wrong (deprecate/consolidate backlog).

### `t.loops` — Everything is data, everything is a loop
- **Essence:** reduce any system to read-state → transform → write-state; capabilities are config, not new infrastructure; make failures loud; loops self-correcting.
- **Quote:** *"everything is data and everything is a loop."*
- **Requirements:** r.production-llm, r.python, r.mcp-subagents, r.codify-patterns, r.enterprise-it
- **Moments:** robotics-press, governed-analytics, local-first-packages, agentic-dev-operating-model, ai-case-intelligence
- **Answers:** robotics.press architecture; unified loop / jobs-as-primitive; cognitive control ("make failures loud").

### `t.provenance` — Provenance over proof  (his real AI-safety stance)
- **Essence:** don't claim what you can't trace; provenance born at collection beats verifying output; give the model a positive path to failure; trust the trunk, not every leaf.
- **Quote:** *"don't quote a thing unless you can prove a thing"* · *"if data provenance is working, there is no hallucination."*
- **Requirements:** r.safe-ai, r.production-llm
- **Moments:** robotics-press (llm_traces / provenance), ai-case-intelligence, governed-analytics (validation/contracts), continuity-mfa (credential trust)
- **Answers:** hallucination handling; tracing at the data level; safety-first (provenance + the vulnerability-score legal review); got-it-wrong (verification→provenance, 32%→phantom-capability lint).

### `t.why` — Why we're here  (curiosity + liberation thesis + carrying it to people)
- **Essence:** a lifelong pull toward how intelligence works; AI as the next fire/electricity; a liberation — carried to others through teaching/coaching, low-ego.
- **Quote:** *"fire, electricity, AI"* · *"nobody wants to be chained to a spreadsheet."*
- **Requirements:** r.safe-ai, r.comm, r.former-founder
- **Moments:** mid-coast (teaching), founder-bjj-weekly, founder-q5, healthcare-data-training, substack
- **Answers:** Why Anthropic; why safety matters; workforce displacement; the Hofstadter→Dr. Seuss curiosity origin.

**Coverage check:** the 6 themes collectively touch all 14 requirements; big moments (esp. robotics-press) intentionally carry multiple themes — that overlap is what makes the highlight rich.

---

## How it lays on the map (UI plan)

- **JD centerpiece unchanged.** Add a **theme legend** (6 chips) as the second axis.
- **Hover a JD line** (today): highlight its moments + draw connectors. **New:** also surface the bridging theme chip(s).
- **Select a theme chip** (new): light up every moment the thread runs through (1986→now), highlight the JD lines it covers, show its signature quote, and open its **"in his words"** panel (the relevant answers).
- **Moment detail panel:** add **"Threads"** (its themes) next to the existing **"Maps to"** (its requirements), plus a short **answer excerpt**.

## Data-shape plan (next build)
- New `web/src/data/themes.ts`: `Theme = { id, label, essence, quote, requirements: string[], moments: string[], answerRefs: string[] }` + the 6 records above.
- Add `themes?: string[]` to `TimelineNode` (derive from `themes.ts` so it stays single-source).
- New `web/src/data/answers.ts` (or structured MD import): the cleaned answer excerpts, tagged `{ id, themeIds[], reqId?, momentId?, text }`, sourced from `answers-raw.md`.
- `JDMap.tsx`: add theme legend + theme-select state (a third highlight driver alongside `hoveredReq`/`activeReq`), and the "Threads" + answer-excerpt rows in the detail panel.

## Open for Bill
- Red-line any theme→requirement or theme→moment assignment above.
- Theme **names** ok in your voice, or want different labels?
- 6 themes, or merge any (e.g. `t.loops` into `t.refinement` or `t.leverage`)?
