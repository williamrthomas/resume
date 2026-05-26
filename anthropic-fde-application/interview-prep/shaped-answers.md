# Shaped content — by theme ("in his words" + proof/provenance)

> Distilled from `answers-raw.md` + `got-it-wrong-from-repos.md`, in Bill's voice, following the
> governing principles (lead with the idea, honest attribution, provenance on every proof).
> **Bill: red-line the voice and the claims.** Once you're happy, this becomes `answers.ts` and
> feeds the per-theme "in his words" panels + moment snippets. Quotes are close paraphrases of
> your transcripts — fix anything that doesn't sound like you.

---

## `t.leverage` — Leverage / "higher bandwidth"

**The idea:** Get the most done per unit of me. Every tool I've reached for — from a CNC router to an agent crew — has been about connecting my brain to higher bandwidth.

**In his words:**
- "My whole life has been leverage-seeking."
- "I bought a CNC router and kept it in my garage — all part of trying to connect my brain to higher bandwidth, to get my ideas out into the world faster."
- "I give the model as much agency as it can handle. The more agency, the less scaffolding, the more leverage — then I can just have a discussion instead of organizing everybody's toolbox. Go get a toolbox. Why isn't yours good enough?"
- "I want to automate everything that doesn't need my personal attention — and even some that does, then give it my attention async, so I can solve five things at once instead of sitting and waiting for problems to surface."

**Proof / provenance:**
- *robotics.press* — designed and operate a multi-agent system I run at the systems level via a central backlog (734 items in Supabase), without needing to know every module. *(live DB / GitHub)*
- *athena* — designed the agent-assisted development operating model the builder community uses: task packets (1–3 day units, clear acceptance criteria) → durable backlog → scoped worktrees → closeout memory. *(athena work-product)*
- *robotics.press* — moving the persistent fleet to Claude Managed Agents ("Officers") that own functions like editorial and reach into the repos as tools. *(robotics-press-agents)*

---

## `t.parachute` — Parachute in

**The idea:** Drop into an unfamiliar system, map what moves what, and design something elegant that survives me leaving.

**In his words:**
- "I love to be parachuted into a new place and come up to speed really quickly on how everything's connected — what moves what, what controls what — and then design something elegant. I can stay up late for that kind of work."
- "I noticed the engineers walking around the job site were all clean. So when I saw a job for a construction engineer — even though I wasn't really qualified — I applied and went after it hard. It changed the course."
- "I got home still not liking the person — but I realized they were right. The system was putting them and their client in a bad spot. So we fixed it." *(on a disagreement with a CSM)*

**Proof / provenance:**
- *athena, Pop Health* — I didn't build the product; I led building the support operation around it from greenfield: documented how it worked and didn't, taught troubleshooting and investigation, then stood up the operational system. *(athena)*
- *Career arc* — construction engineer (Wight) → MBNA (phones → LAN → credit analyst) → independent consulting (dental/legal) → tech coordinator at a CTE school → athena. Each one a cold start into a new system. *(résumé)*
- *25+ years coaching* — "find the smallest correction that moves someone, then let them keep going." *(coaching / teaching record)*

---

## `t.refinement` — Relentless refinement → simplicity

**The idea:** Overbuild, then whittle toward the simplest, most durable form. And know when to stop.

**In his words:**
- "Look at the SpaceX Raptors. Raptor 1 looks like NASA in the '90s — pipes and wires everywhere. Raptor 2, half of it's gone. Raptor 3 is almost organic. That's relentless refinement toward the most elegant, durable, robust, inexpensive, transparent, modular thing you can get."
- "The arch solves so many structural problems with an incredibly simple idea. That's the essence of engineering."
- "A machinist who ran a big shop taught me when to stop: 'I get it pretty close, then crank the machine until it slams stop, back it off 10%, and you're good.' That's real field engineering — Kalashnikov, not Swiss."
- "I always overbuild, then drive toward simple. You never get the simple thing the first time — simplicity takes whittling."

**Proof / provenance:**
- *robotics.press* — the backlog reads like a refinement diary: deprecate the SVG hero pipeline, remove dead code, drop `airtable_id` from 19 tables, replace 36 card templates with one article-aware generator. *(backlog #s / PRs)*
- *robotics.press* — "156 repos, almost all of them failures — the reason I can do this now is that I've had so many failures." *(GitHub)*
- *robotics.press* — research-shop v2 cut the synthesizer phase that was 86% of pipeline cost; findings stay machine-readable, prose rendered on demand. *(commit 145e396c)*

---

## `t.loops` — Everything is data, everything is a loop

**The idea:** Reduce any system to its primitive — read state → transform → write state. Capabilities become config, not new infrastructure. Make failures loud.

**In his words:**
- "Everything is data and everything is a loop. I keep things simple, modular, configurable — and find the core primitives: what's the thing that has to be stored, measured, modified? What's the entity?"
- "I make everything available in the data, make loops self-correcting, make failures loud, make agents self-sustaining."
- "You mock a rough solution and poke at it. A lot of times it breaks funny — that's great data. Why did it break like that? Oh, that's why. Can we make it simpler? Do we even need that?"

**Proof / provenance:**
- *robotics.press* — the "unified loop / jobs-as-universal-primitive" design: every actor is read→transform→write, so new capabilities are config rows, not new services. *(decision docs)*
- *athena* — led the design of the governed analytics platform: shared validated SQL models, semantic tests, validation gates, consumer-facing data contracts. *(athena)*
- *athena* — designed local-first analytics packaging (warehouse → Parquet → DuckDB) with manifests, validation, and provenance. *(athena)*

---

## `t.provenance` — Provenance over proof  *(my real AI-safety stance)*

**The idea:** Don't claim what you can't trace. Provenance born at collection beats verifying the output. Give the model a positive path to failure. Trust the trunk, not every leaf.

**In his words:**
- "Don't quote a thing unless you can prove a thing. If you're going to quote it, tell me where you got it — and I check that. If my data provenance is working, there is no hallucination."
- "Give the agent a positive path to failure and enough context, and don't ask it for something it can't produce — it's far less likely to hallucinate."
- "Models are stronger at the core than at the exact number. Think trunk and branches, not every leaf. If you need the leaves, augment."
- "Right now AI is more dangerous as a political and social weapon, and for the upheaval it'll cause, than as an agent waking up — there's no real place for agency outside the inference loop yet."

**Proof / provenance:**
- *robotics.press* — built an article-level fact-check *verifier*; it checked the output instead of the lineage and tried to *prove* point-in-time numbers against a moving denominator. First measurement: **32% support across 2,737 published articles.** Replaced it with provenance-at-collection and a "phantom-capability" lint so a configured agent can't claim a capability it doesn't have. *(decision doc 2026-05-20)*
- *robotics.press* — `llm_traces` observability wrappers across LLM call sites. *(robotics-press-engine)*
- *Said no* — paused a feature that scored sites for vulnerability and ran a legal review: putting a number on a specific site is a gray area, so I slowed down. *(judgment call)*

---

## `t.why` — Why we're here

**The idea:** A lifelong pull toward how intelligence works, and a conviction that AI is the next fire/electricity — a liberation — carried to people through teaching, not preaching.

**In his words:**
- "I think about it as fire, electricity, AI — a basic, foundational thing. As close as I could be to that fire, I'm drawn to it. This whole thing is my Super Bowl."
- "Since I was a kid with Dr. Seuss, then later reading Hofstadter — where did intelligence come from? That question is a thread through my whole life."
- "Everybody should be anxious about displacement — it's real. But we can't keep jobs just because someone's doing them; the job has to provide value. Every time we've feared a technology taking jobs, it's multiplied them — and the more powerful the technology, the bigger the multiplier."
- "I respond to Anthropic's ethos and values. I want to be on a team of really smart people driving on something big and important."

**Proof / provenance:**
- *Substack* — essays orbiting these questions: "Can AI Make Us More Human?", "14 Rules for Solo Builders in the Age of AI." *(williamrthomas.substack.com)*
- *healthcare-data-training* — a curriculum for non-technical healthcare workers to build with Claude Code / Codex / Cursor — democratizing the work responsibly. *(private repo)*
- *Teaching & coaching* — Maine teaching certificate, classroom literacy + CAD/CAM; 25+ years coaching; BJJ Weekly (19,764 subscribers, 7M+ views). *(record)*

---

## Build note
Once red-lined: convert to `web/src/data/answers.ts` as `{ id, themeId, reqId?, momentId?, kind: 'voice'|'proof', text, source? }`, joined to themes via `themes.ts` and to moments via `timeline.ts`. The "in his words" panel renders `kind:'voice'` per theme; moment detail panels render the matching `kind:'proof'` excerpt + source.
