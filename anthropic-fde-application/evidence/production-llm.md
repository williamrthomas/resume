# Production LLM work

Maps to JD requirements `r.production-llm`, `r.shipped-production-apps`, `r.deliver-mcp-subagents-skills`, `r.codify-patterns`.

The Anthropic FDE role asks for "production LLM experience: prompt engineering, agent development, evaluation frameworks, deployment at scale." I have two simultaneous lines of evidence: inside an enterprise (athenahealth, where I architect the AI operating model for a platform-operations function) and in public (robotics.press, where I run a live production multi-agent system).

## athenahealth — internal AI / data product work (current)

Title: **Platform Data Solutions Senior Manager — Internal AI & Data Product Builder.**

The shape of the work, organized by accomplishment:

### Federated AI operating model

Architected and executed an AI operating model that moved operational teams from isolated experimentation toward repeatable AI-enabled execution. The principle: AI adoption inside an enterprise does not scale by central evangelism — it scales when a federated structure of local builders has air cover, shared infrastructure, and a clear path from learning to production.

Components I built or stood up:

- **AI enablement programs and builder communities.** Office-hours-style communities and structured cohorts supporting **dozens of active AI champions and builders**, creating a practical pipeline from learning to production. People show up with a workflow they want to automate, leave with a working prototype.
- **Operational automation portfolio.** A managed backlog of **dozens of operational automation opportunities** spanning Support, Onboarding, Enablement, and Data Operations. Codified, prioritized, and assignable rather than scattered.
- **Reusable AI and data enablement assets.** Shared repositories, OAuth tooling for warehouse access, "SME-in-a-Box" prompt/agent patterns that let domain experts encode themselves into a reusable form, and delegated builder-license models so the right people can build without central bottlenecks.
- **AI case-intelligence workflows.** Embeddings, vector similarity search, historical-resolution matching, clustering, and structured-recommendation outputs applied to support-case operations. Built so that historical institutional knowledge becomes an active part of every new case.

This is the exact FDE motion turned inward: I work with stakeholders inside an enterprise to deploy AI tooling against real workflows, identify reusable patterns, codify what works, and feed it back into how the org operates.

### Governed analytics platform

Built shared SQL models, semantic tests, validation gates, and consumer-facing data contracts on top of an enterprise warehouse-backed analytics stack (Snowflake). The platform unifies operational and warehouse data into reusable, validated models — meaning downstream consumers get a stable surface to build against, not a moving target.

Why this matters for FDE: customers will hand you their data. The fastest path from "we have data" to "you can ship Claude against it" is a governance layer that establishes what the data actually is. I've built one inside a large enterprise.

### Local-first analytics package delivery

Built warehouse → Parquet → DuckDB packaging patterns with manifests, validation, provenance, and launch flows. Stakeholders get versioned analytics packages they can run in a browser surface or locally without standing infrastructure.

This is exactly the pattern an FDE wants in customer engagements where data residency, network constraints, or speed-of-iteration argues for shipping a portable analytics package rather than relying on always-online infra.

### Agent-assisted development operating model

Designed an agent-assisted development model: task packets, backlog control, scoped worktrees, staged review, validation checks, evaluation artifacts, and durable closeout memory. This is the operating model I now use across all of my own building work (including robotics.press) and the model I teach to other builders inside the federated program.

The point: agent-assisted development is most valuable when it has scaffolding around it that survives the agent itself. Task packets in, closeout memory out. Worktree boundaries scope the blast radius. Validation gates catch the predictable failure modes.

### Source-first publishing pipelines

Built pipelines that convert structured Markdown sources into documents, decks, web artifacts, Confluence pages, and videos. Same artifact, multiple readers — exactly the principle this application repo uses.

## athenahealth — earlier impact (Manager tier, 2020–2024)

Managed Platform Support across Population Health, Health Plan Data Exchange, Moment of Care integrations, an enterprise data product line, and ACO products covering value-based care, care management, quality reporting, and financial analytics. ~22-person zone supporting ~$160M in business end to end (implementation → operations → terminations); cross-functional with Product and Engineering.

Earlier I also led significant data-product continuity work — a customer credential / account-trust response (cross-functional, reaching thousands of stakeholders), a multi-wave MFA rollout reviewing tens of thousands of accounts, a global Tier 1 support transition that more than doubled partner Tier 1 resolution share, and a Snowflake partner-account consolidation initiative delivering six-figure annual savings. Specific quantified outcomes are documented internally; happy to walk through them in interviews.

## robotics.press — public production multi-agent system

[robotics.press](https://robotics.press) is a fully automated, agentic intelligence platform I run publicly. It tracks robotics deployments — currently focused on drones — across security, defense, and infrastructure.

Live as of May 2026:

| Metric | Value |
|---|---|
| Companies tracked | 1,400+ |
| Articles published | 2,800+ |
| Intelligence signals indexed | 40,700+ |
| Critical-infrastructure sites scored (CIDE) | 31,700+ |
| Attack events indexed | 4,174 |

The CIDE map — Critical Infrastructure Drone Exposure — is geospatial, scoring infrastructure sites for drone vulnerability across conflict zones. It combines deployment signals, attack events, and infrastructure data.

Under the hood is a Python service network across 12+ repos. See [agent-systems.md](./agent-systems.md) for the architectural detail (card-composer agent, shared tool registry, llm_traces observability, mixed-model routing, listener pattern).

## Substack — `Why AI Slop Creates Unprecedented Developer Demand`

The thinking that motivates all of the above is captured in my Substack. The headline argument: as model capability rises and code is increasingly cheap to generate, the bottleneck shifts from *can I produce code* to *can I produce code that's worth producing and that someone will actually use*. That's the FDE thesis in one sentence.

Other relevant posts:

- "14 Rules for Solo Builders in the Age of AI"
- "Can AI Make Us More Human?"
- "DNA Datascapes & Origami Hard Drives" (white paper on information as physical form)
