// Distilled, in-his-words content per theme + proof excerpts tied to moments.
// Source: interview-prep/shaped-answers.md. `voice` = the per-theme "in his words" panel;
// `proof` = the traceable evidence excerpt (rendered in a moment's detail when momentId matches).

export type Answer = {
  themeId: string;
  kind: "voice" | "proof";
  text: string;
  momentId?: string;
  source?: string;
};

export const answers: Answer[] = [
  // ── t.leverage ───────────────────────────────────────────────────────────
  { themeId: "t.leverage", kind: "voice", text: "My whole life has been leverage-seeking — get as much done as I possibly can, as fast as I can. The hard part is slowing down long enough to actually do something, because I've got so many ideas. It's hard to get them all out of my head. That's one of the reasons AI is such a draw." },
  { themeId: "t.leverage", kind: "voice", text: "I bought a CNC router and kept it in my garage — all part of trying to connect my brain to higher bandwidth, to get my ideas out into the world faster." },
  { themeId: "t.leverage", kind: "voice", text: "I give the model as much agency as it can handle. The more agency, the less scaffolding, the more leverage — then I can just have a discussion instead of organizing everybody's toolbox. Go get a toolbox. Why isn't yours good enough?" },
  { themeId: "t.leverage", kind: "voice", text: "I want to automate everything that doesn't need my personal attention — and even some that does, then give it my attention async, so I can solve five things at once instead of waiting for problems to surface." },
  { themeId: "t.leverage", kind: "proof", momentId: "robotics-press", source: "Supabase backlog (734 items)", text: "Designed and operate robotics.press at the systems level via a central backlog, without needing to know every module." },
  { themeId: "t.leverage", kind: "proof", momentId: "agentic-dev-operating-model", source: "athena", text: "Designed the agent-assisted development operating model the builder community uses: task packets (1–3 day units, clear acceptance criteria) → durable backlog → scoped worktrees → closeout memory." },

  // ── t.parachute ──────────────────────────────────────────────────────────
  { themeId: "t.parachute", kind: "voice", text: "I love to be parachuted into a new place and come up to speed really quickly on how everything's connected — what moves what, what controls what — and then design something elegant. I can stay up late for that kind of work." },
  { themeId: "t.parachute", kind: "voice", text: "I noticed the engineers walking around the job site were all clean. So when I saw a job for a construction engineer — even though I wasn't really qualified — I applied and went after it hard. It changed the course." },
  { themeId: "t.parachute", kind: "voice", text: "When they asked me to be the case team for Population Health — a new product they'd just integrated — I said 'great.' There was no support structure for it yet. We documented how it worked and how it didn't, taught troubleshooting and investigation, and built the operational system around it from scratch. Then every time there was an opportunity in front of me, I took the growth path." },
  { themeId: "t.parachute", kind: "proof", momentId: "athena-assoc", source: "athena", text: "Didn't build the Pop Health product — led building the support operation around it from greenfield: documented how it worked and didn't, taught troubleshooting and investigation, then stood up the operational system." },
  { themeId: "t.parachute", kind: "proof", momentId: "continuity-tier1-transition", source: "athena", text: "Led the transition of Tier 1 support to a global partner team — documentation, KB transfer, runbook design, ramp coaching, escalation handoffs." },

  // ── t.refinement ─────────────────────────────────────────────────────────
  { themeId: "t.refinement", kind: "voice", text: "Look at the SpaceX Raptors. Raptor 1 looks like NASA in the '90s — pipes and wires everywhere. Raptor 2, half of it's gone. Raptor 3 is almost organic. That's relentless refinement toward the most elegant, durable, robust, inexpensive, transparent, modular thing you can get." },
  { themeId: "t.refinement", kind: "voice", text: "The arch solves so many structural problems with an incredibly simple idea. That's the essence of engineering." },
  { themeId: "t.refinement", kind: "voice", text: "A machinist who ran a big shop taught me when to stop. He'd write the program, then keep maxing out the machine's speed until it actually crashed. Once it crashed, back it off 10% — and run with that. That's real field engineering — Kalashnikov, not Swiss." },
  { themeId: "t.refinement", kind: "voice", text: "I always overbuild, then drive toward simple. You never get the simple thing the first time — simplicity takes whittling." },
  { themeId: "t.refinement", kind: "proof", momentId: "robotics-press", source: "robotics.press backlog / commits", text: "156 repos, almost all of them failures — the reason I can do this now is that I've had so many failures. research-shop v2 cut the synthesizer phase that was 86% of pipeline cost." },
  { themeId: "t.refinement", kind: "proof", momentId: "source-first-publishing", source: "athena", text: "Source-first publishing: structured Markdown is the only thing maintained by hand; documents, decks, Confluence pages, and Remotion videos all render from it. Refine the source, every artifact follows." },
  { themeId: "t.loops", kind: "proof", momentId: "operational-analytics", source: "athena", text: "Feedback and lifecycle analytics modeled as loops: typed event contracts → deterministic reducers → state and friction signals → attention scoring that ranks investigations." },
  { themeId: "t.parachute", kind: "proof", momentId: "product-evidence", source: "athena", text: "Reconciled product, client, commercial, and delivery signals from systems that didn't naturally answer the same question — one validated picture for cross-functional consumers." },

  // ── t.loops ──────────────────────────────────────────────────────────────
  { themeId: "t.loops", kind: "voice", text: "Everything is data and everything is a loop. I keep things simple, modular, configurable — and find the core primitives: what's the thing that has to be stored, measured, modified? What's the entity?" },
  { themeId: "t.loops", kind: "voice", text: "I make everything available in the data, make loops self-correcting, make failures loud, make agents self-sustaining." },
  { themeId: "t.loops", kind: "voice", text: "You mock a rough solution and poke at it. A lot of times it breaks funny — that's great data. Why did it break like that? Oh, that's why. Can we make it simpler? Do we even need that?" },
  { themeId: "t.loops", kind: "proof", momentId: "robotics-press", source: "robotics.press decision docs", text: "The 'unified loop / jobs-as-universal-primitive' design: every actor is read → transform → write, so new capabilities are config rows, not new services." },
  { themeId: "t.loops", kind: "proof", momentId: "governed-analytics", source: "athena", text: "Led the design of the governed analytics platform: shared validated SQL models, semantic tests, validation gates, consumer-facing data contracts." },

  // ── t.provenance ─────────────────────────────────────────────────────────
  { themeId: "t.provenance", kind: "voice", text: "Don't quote a thing unless you can prove a thing. If you're going to quote it, tell me where you got it — and I check that. If my data provenance is working, there is no hallucination." },
  { themeId: "t.provenance", kind: "voice", text: "Give the agent a positive path to failure and enough context, and don't ask it for something it can't produce — it's far less likely to hallucinate." },
  { themeId: "t.provenance", kind: "voice", text: "Models are stronger at the core than at the exact number. Think trunk and branches, not every leaf. If you need the leaves, augment." },
  { themeId: "t.provenance", kind: "voice", text: "Right now AI is more dangerous as a political and social weapon, and for the upheaval it'll cause, than as an agent waking up — there's no real place for agency outside the inference loop yet." },
  { themeId: "t.provenance", kind: "proof", momentId: "robotics-press", source: "decision doc 2026-05-20", text: "Built an article-level fact-check verifier; it checked the output instead of the lineage and tried to prove point-in-time numbers against a moving denominator. First measurement: 32% support across 2,737 published articles. Replaced it with provenance-at-collection plus a 'phantom-capability' lint." },

  // ── t.why ────────────────────────────────────────────────────────────────
  { themeId: "t.why", kind: "voice", text: "I think about it as fire, electricity, AI — a basic, foundational thing. As close as I can get to that fire, I'm drawn to it. I want to participate. I want to be part of the process." },
  { themeId: "t.why", kind: "voice", text: "Since I was a kid — Dr. Seuss. Later, Pirsig, Hofstadter, Drexler, Kurzweil — the classics, the Star Trek holodeck, all of it. Each one made me want to understand the nature of intelligence: how could we accumulate it, enhance it, leverage it? Because with intelligence, you can do anything." },
  { themeId: "t.why", kind: "voice", text: "Everybody should be anxious about displacement — it's real. But we can't keep jobs just because someone's doing them; the job has to provide value. Every time we've feared a technology taking jobs, it's multiplied them — and the more powerful the technology, the bigger the multiplier." },
  { themeId: "t.why", kind: "voice", text: "I respond to Anthropic's ethos and values. I want to be on a team of really smart people driving on something big and important." },
  { themeId: "t.why", kind: "proof", momentId: "healthcare-data-training", source: "private repo", text: "A curriculum for non-technical healthcare workers to build with Claude Code / Codex / Cursor — democratizing the work responsibly." }
];

export const voiceFor = (themeId: string) => answers.filter((a) => a.themeId === themeId && a.kind === "voice");
export const proofForMoment = (momentId: string) => answers.filter((a) => a.kind === "proof" && a.momentId === momentId);
