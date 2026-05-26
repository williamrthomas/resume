# "Got it wrong → fixed it" — mined from the robotics.press repos

> **Source:** read-only `gh` mine of the private `williamrthomas/robotics-press-*` repos (decision
> records in `robotics-press-hq/decisions/`, code + commits in `-engine` / `-intelligence` /
> `-harness`, archived `ZZ-*` precursors), 2026-05-25. Pulled because Bill works at an abstract/
> systems level and doesn't retain coding mistakes formatively — so we source them from the repos.
> **These are drawn from decision docs Bill authored — confirm/correct framing; pick which ring true.**
> Secret scan: clean.

## Tag key
`[ARCH]` architectural/technical · `[PRODUCT]` product/strategy · best "technical misjudgment"
interview answers are the `[ARCH]` ones.

---

## Concrete examples

1. **`[ARCH]` Built a fact-check *verifier* at the wrong layer.** Built a pipeline (#698→#716) that re-derived each published claim against live tables and gated on a support-rate. Two failures: it checked the *output* not the *lineage*, and tried to *prove* point-in-time numbers against a moving denominator ("article said 22 drones at publish, table now says 24" — unprovable by design). Replaced by **"provenance, not verification"**: provenance born at collection, carried through, inherited by the article; auditor checks the *chain holds*; standard is "justify, not prove."
   *Cite: `-hq/decisions/2026-05-20-provenance-not-verification.md` (supersedes `2026-05-19-fact-check-architecture.md`).*

2. **`[ARCH]` Phantom agent — a `fact_checker` that pointed at code that never existed.** An `agent_type` row was seeded with a `post_processor` path and two backlog items marked **done** — but the file was never written. Undetected because nothing surfaced it; the first real measurement of draft accuracy came back at **32% support across 2,737 already-published articles**. Triggered a "closure-integrity" audit + a lint that fails when an agent's post-processor module is missing.
   *Cite: `-hq/decisions/2026-05-19-fact-check-architecture.md`; `-hq/reports/2026-05-20-closure-integrity-audit.md`.*

3. **`[ARCH]` Non-standard 7th CARVER dimension broke the score's meaning.** The CARVER composite summed 7 dimensions incl. a custom "Robotics Relevance," producing scores up to 62 on a 60 scale — and the drone lens belonged in the separate DRES score. Recomputed all **31,683 sites** back to the 6 classic dimensions; ~130 published assessments with baked numbers tracked for reconciliation.
   *Cite: `-engine` #734 migration `20260525130000`; `-hq/decisions/2026-05-24-commission-driven-production.md`.*

4. **`[ARCH]` Research pipeline spent 86% of cost generating prose nobody asked for.** v1 ran an unconditional `synthesizer` phase turning findings into prose reports — **86% of total pipeline cost** for output downstream didn't need. v2 removed synthesizer + compressor; findings stay machine-readable JSON, prose rendered on-demand per consumer (~$0.09 each).
   *Cite: `robotics-press-intelligence` commit `145e396c` "research-shop v2 — drop synthesizer, add artifact renderers."*

5. **`[ARCH]` LLM agent used as a pure passthrough — paid $0.23/job for a Sonnet that did nothing.** Early architecture routed research jobs through a Sonnet harness that "added no value over calling the tools directly." Added direct Python `runners.py` calling the tools; dispatcher routes by config.
   *Cite: `ZZ-robotics-press-agents` "Add direct Python runners, bypass LLM harness."*

6. **`[ARCH]` Flat backlog was uninterpretable — `priority` P0–P100 + 45 free-form `category` values.** "P5 on a bug and P5 on a refactor sorted identically"; no agent could read a row and say *why it matters* — which broke once codex CLI became an autonomous dispatch tier. Replaced with orthogonal rubric: tier (durability/leverage/capability) × severity × 8-value category enum × plan.
   *Cite: `-hq/decisions/2026-04-26-backlog-triage-rubric.md`; migration `002_backlog_triage_rubric.sql`.*

7. **`[ARCH]` Inbound email MCP + "auto-accept" mode silently swallowed git failures.** Two infra mistakes: (i) an Inbound MCP wired into 7 agents made the prompt-injection trust boundary mere policy, not structure; (ii) agents in auto-accept "don't stop for questions" mode silently swallowed push-to-main denials — commits *looked* saved but weren't. Retired the MCP; rewrote inbound-triage agent text-only (Read/Grep/Glob, no Bash/Write/fetch); tightened permissions; force-close now refuses on unpushed commits.
   *Cite: `robotics-press-harness` "Retire Inbound MCP" (#558); `-hq` commit `e46f1866`.*

8. **`[ARCH]` `deployment_extract` scraper — scoped + half-built against an architecture later deleted; extracted 0 rows.** LLM-extract structured deployment tuples from company pages: 2 jobs failed ("Unknown post-processor"), 1 extracted **0 rows** — the tuples live narratively in editorial articles, not company pages; the target architecture had since been replaced. Decision: don't revive; emit a JSON sidecar from the content pipeline instead.
   *Cite: `-hq/decisions/2026-05-09-site-deployments-curation-strategy.md` (#627).*

9. **`[PRODUCT]` Always-on "push" outreach consumed the contact-graph moat instead of building it.** Hourly mass notifications: **2,354 sends in 30 days reached 2 distinct people** (~99% to generic `info@`/`press@`); deliverability collapsed 1,296→98/week; an incident sent 1,296 in a week. Retired auto-push for weekly intelligence-driven *pull* (25–75 named individuals w/ an editorial reason) + a contact-growth loop.
   *Cite: `-hq/decisions/2026-05-06-outreach-strategy-pivot.md`.*

10. **`[PRODUCT]` The autonomous content "mill" starved the editor it had just built.** A weight/cadence `generate_schedule` loop with no editorial judgment admitted 91 / rejected 306 in a week — and caused the new Editorial Officer's **530 commissions to be rejected** because scheduled + commissioned work competed for the same budget. Stood the loop down (single lever flag); Editorial Officer becomes sole demand source.
    *Cite: `-hq/decisions/2026-05-24-commission-driven-production.md`.*

11. **`[PRODUCT]` Strategic reversal: FEMA-grant C-UAS consulting wedge → publication-first.** 2026-04-24 mission framed the wedge as FEMA-funded consulting + paid CIDE assessments. Two weeks later: "FEMA was a distraction… ten consulting engagements is a treadmill." Pivoted to a specialized-newsletter portfolio; the public database became a free SEO moat, not a paid product.
    *Cite: `-hq/decisions/2026-05-09-publication-first-pivot.md` (refines `2026-04-24-mission-and-operating-model.md`).*

---

## Meta-evolution (the bets → pivots, each with the lesson)

- **Airtable-as-backend → Supabase-as-the-bus.** Feb-2026 precursors (`ZZ-*airtable/tavily/gptresearcher/crew/ops`) were Airtable-centric tool repos w/ an LLM "crew" harness; all ported to Supabase. *Lesson: the database is the integration layer ("turn the DB inside out"), not just storage — no REST/SDK versioning between repos.* (`-hq/decisions/2026-04-19-architectural-synthesis.md`)
- **LLM-everything crew harness → deterministic where deterministic wins.** An LLM hop with no judgment is pure cost (#5). *Move: elevate judgment into agents, keep mechanical work deterministic.*
- **Many specialized services (listen + generate + intelligence) → one engine + "unified loop."** Every actor is the same primitive: read state → transform → write state, so capabilities = config rows, not new services (`-intelligence` is literally "precursor to engine"). *Lesson: config-as-data over more infrastructure.* (`-hq/decisions/2026-04-11-unified-loop.md`, `…jobs-as-universal-primitive.md`)
- **Monolith → multi-repo-by-department w/ a hard "canonical write invariant."** Only `engine` writes canonical tables; satellites write namespaces and promote via explicit `harvest` jobs (CQRS-lite). (`-hq/decisions/2026-04-17-department-architecture-brief.md`)
- **Resident VPS sessions → Claude Managed Agents ("Officers").** Wake-on-message heartbeat dies with its session; persistent fleet migrating to Managed Agents — went active early because *operational friction*, not cost, was the binding constraint. *Lesson: elevate judgment functions into Officers; do NOT migrate the high-volume mechanical pipeline.* (`-hq/decisions/2026-05-21-fleet-substrate-managed-agents.md`)
- **Signature self-named failure mode: "phantom capability."** fact_checker, deployment_extract, "done" rows with no shipped code — *the capability exists in config/backlog but isn't built/enforced/surfaced.* Same class as "done-without-delivery."

---

---

## From the live Supabase `backlog` table (mined 2026-05-25, read-only)

> Accessed via Doppler (`claude-cockpit/dev` → `SUPABASE_PROJECT_URL` + `SUPABASE_SECRET_API_KEY`) → PostgREST. **734 backlog items** total.

**Distribution (this is itself application-grade evidence of velocity + discipline):**
- **status:** 476 done · 234 deferred · 20 backlog · 2 in_review · 1 in_progress · 1 proposed
- **category:** 157 feature · 124 pipeline · 123 platform · 82 bug · 76 code · 61 data · 42 docs · 38 ops · 27 content
- **repo:** 544 eng · 49 hq · 29 cross · 22 globe · 17 ops · 16 pub · 14 sbx · 13 toolkit · 12 website · 10 biz · 6 intel
- Schema is unusually rich for a solo backlog: `tier` (T1–T3) × `severity` (S1–S4) × `category` + `decision_ref`, `commitment_ref`, `resolution`, `cost_usd`, `live_side_effects`, `auto_execute`. (This is the orthogonal rubric from #6 above, in production.)

**85 titles match rework/got-it-wrong keywords.** The strongest, grouped by lesson:

- **Phantom capability / closure-integrity** (the signature failure mode): *"Phantom-capability lint: every configured agent_type must have a backing post_processor"*; *"fact-check v1: verifier remediation — extraction accuracy + row-grounding (finished-but-broken)"*; *"BUG: Editor recurring task using wrong handler — 101 articles stuck in DRAFTING."*
- **Wrong-thing-happened bugs caught in prod:** *"email_comms _update_contact_status deactivates the WRONG address on FLAG_CONTACT"* + *"No reactivation path for wrongly-deactivated contacts"*; *"T04 Conflict Timeline — chart shape tells wrong story."*
- **Migration / schema-drift tax of moving fast across many repos on one DB:** *"Reconcile migration tracking — ~42 applied-but-untracked migrations blind the s155 drift gate"*; *"Reconcile supabase_migrations drift — only 4 of ~46 on-disk migrations tracked"*; *"dispatch.py MIGRATION_DIRS misses publishing migrations (#622 migration silently [skipped])"*; *"Reconcile reverted v3 files on main branch."*
- **Relentless dead-code removal / consolidation (the Raptor 1→2→3 pattern, in tickets):** *"Deprecate SVG hero pipeline and matplotlib charts — remove dead code"*; *"Remove stock photo pipeline + game-icons dead code"*; *"Schema: Drop dead sprint/crew tables + views + enums"*; *"Remove airtable_id columns from 19 tables"*; *"Card composer agent — replace 36 templates with article-aware generation"*; *"Retire Inbound MCP + fully remove Airtable integration."*
- **Data-quality reckonings:** *"Junk-row purge in people table (~130 lowercase-fragment names from scraping artifacts)"*; *"Contact data quality sweep — placeholder/wrong-company domains"*; *"Migrated outreach_log inbound bodies were lost — only LLM summaries stored"* (a lossy-migration regret).

**Meta read:** 476 done vs 234 deferred, with `feature`/`pipeline`/`platform` dwarfing `bug` — i.e. most work is building/refining, not firefighting. The recurring `reconcile` / `drift` / `consolidate` tickets are the honest cost of Bill's "scale wide + fast across many repos sharing one DB" bet — and he's systematically paying it down (auto-migrator, drift gates, phantom-capability lint). That *is* the "got it wrong → built a guardrail so it can't recur" story, with numbers.

**Note:** I now have read-only DB access via Doppler+PostgREST, so I can pull individual ticket `description`/`resolution` text, production stats (article/company/signal counts), or anything else on request.
