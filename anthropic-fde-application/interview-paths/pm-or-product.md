# For the PM / product person

If you want to understand how I think about product and customers, start with **[evidence/healthcare-domain.md](../evidence/healthcare-domain.md)** and **[evidence/enterprise-customer.md](../evidence/enterprise-customer.md)**.

## Two signals that are probably most useful

**1. `healthcare-data-training` (private repo).** A market-research + curriculum-design repo I started in May 2026. The thesis: a new class of non-technical healthcare worker is being empowered by Claude Code / Codex / Cursor to do work that previously required a data engineer. 7 personas, 43-course landscape teardown, 6-module curriculum, 3,000-line GTM plan.

This is the exact customer profile a healthcare-vertical FDE meets. I'm already mapping it.

**2. Federated AI operating model at athena.** I architected an AI operating model that moves operational teams from isolated experimentation to repeatable AI-enabled execution. Components: AI enablement programs, builder office-hours communities, an operational automation portfolio across Support / Onboarding / Enablement / Data Operations, reusable assets (OAuth tooling, "SME-in-a-Box" prompt/agent patterns, delegated builder-license models), and the agent-assisted development operating model. This is product thinking applied to operations: AI adoption inside an enterprise scales by federation, not central evangelism.

**3. Governed analytics platform.** Shared SQL models, semantic tests, validation gates, and consumer-facing data contracts on top of a Snowflake-backed warehouse stack — turns "we have data" into "you can build against it." Paired with local-first packaging (warehouse → Parquet → DuckDB) for stakeholder-facing surfaces that work without standing infrastructure.

## How I think about product

- **Start from the data shape, not the dashboard.** Dashboards are the symptom; what people actually want is to ask their own questions of the data. The data shape determines what questions are answerable.
- **Codify, then automate, then delegate to agents.** Codifying a pattern is the bottleneck; automation is mechanical once the pattern exists; agents are the third move, not the first.
- **Boring infrastructure beats clever infrastructure.** systemd + modular Python + structured-data-first APIs gets you 80% of the way to anywhere.
- **One artifact, multiple readers.** This repo is the demonstration. The same ontology serves recruiters, engineers, PMs, and Claude.

## What I'd want to discuss

- Where I think the FDE motion goes once MCP is mature (the customer is going to bring their own agents).
- How `healthcare-data-training` would translate into an Anthropic enablement program for healthcare customers.
- Building product instincts in operations teams (the federated AI operating model at athena).
- The translation from "AI enablement community inside one enterprise" to "FDE engagement model across many enterprises."
