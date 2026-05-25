# Agent systems — code patterns

Maps to JD requirements `r.production-llm`, `r.deliver-mcp-subagents-skills`, `r.codify-patterns`, `r.shipped-production-apps`.

Two threads. The first is **the agent-assisted development operating model I designed at athenahealth** — the meta-structure that makes agent-assisted dev safe to scale across an organization. The second is **the agent architecture behind [robotics.press](https://robotics.press)** — the public production system I run, where the same operating model gets used in anger every day.

## Agent-assisted development operating model (athenahealth)

I designed and built the operating model the federated AI builder community uses for agent-assisted development. The shape:

- **Task packets in, closeout memory out.** Every agent run starts from a structured task packet — scope, context, success criteria, validation — and ends with a closeout artifact that's durable, reviewable, and feeds into the next run's memory.
- **Backlog control plane.** A managed backlog of tasks/issues feeds the agent system. Priorities, owners, and dependencies are explicit rather than scattered in chat or someone's head.
- **Scoped worktrees.** Each agent run gets its own worktree boundary. The blast radius is small. Cleanups are predictable.
- **Staged review.** Agents propose; humans review at defined gates. Not "agent does whole feature in one shot," not "human reviews every line." A small number of well-placed checkpoints.
- **Validation checks.** Tests, schema checks, lint, type checks, custom validators are part of the run, not a downstream surprise.
- **Evaluation artifacts.** Each run produces inputs/outputs that flow into eval datasets, so the system gets sharper over time.
- **Durable closeout memory.** A persisted summary of what was tried, what worked, what didn't. Subsequent runs benefit; humans benefit; the agent benefits.

This is the operating model I use across all of my own building (including robotics.press) and the one I teach inside athena's federated builder community.

It is also exactly the FDE artifact problem stated more precisely: when you leave a customer engagement, the artifact you leave behind isn't the code — it's the operating model around the code that lets the customer keep going.

## Agent architecture behind robotics.press

The rest of this file walks the robotics.press architecture with concrete pointers to the PR titles where each pattern lives. Pull request numbers reference the `robotics-press-engine` repo unless noted.

## Decomposition: agents, not chains

The system is organized as a set of specialized agents that share infrastructure. Each agent has a narrow purpose and works against the same set of typed objects in the engine.

- **`card_composer` agent** (PR #582) — replaces 36 separate templates with a single composing agent that reads each article and produces summary cards. The template-explosion problem is one I expect to see in every FDE engagement: someone has 36 templates and is about to make it 40. Refactoring to an agent that generalizes the templating concern is the move.
- **Card composer + media + editor + research + intelligence + publisher** — each is a discrete role with its own scope, communicating through structured intermediate objects in the engine, not through prompt chaining.

## Shared tool registry — define once, assign per agent

[PR #391](https://github.com/williamrthomas/robotics-press-engine/) — "Shared tool registry — define once, assign per agent."

Tools live in a registry. Each agent subscribes to a subset. This is the same idea MCP servers express at the protocol level: capability is exposed by the server, the client (agent / sub-agent) picks what it needs. Designing for this pattern *before* MCP existed is a tell that I think in the right shape.

When the FDE role talks about "MCP servers, sub-agents, and agent skills as production artifacts," the registry/subscription pattern is the underlying primitive. I've been shipping it.

## Observability: `llm_traces` wrappers

[PR #282](https://github.com/williamrthomas/robotics-press-engine/) — "Backfill llm_traces wrappers across remaining `call_llm_json` sites."

Every LLM call goes through an instrumented wrapper that captures inputs, outputs, latency, model, and cost. The backfill PR walks the codebase, finds every remaining unwrapped call site, and brings them under the same observability. This is what gives you replay, eval, and cost analysis without retrofit pain.

You cannot do eval frameworks without this. The PR is one of the highest-leverage moves I made on the project.

## State machines, not flag soup

[PR #552](https://github.com/williamrthomas/robotics-press-engine/) — "Add PUBLISHED → REMEDIATION state machine transition."

Articles in the engine have a typed state machine, not a bag of booleans. The REMEDIATION state is what happens when a published article is flagged for correction — every downstream agent (SEO, syndication, social) knows what to do because the state is explicit.

For FDEs deploying production AI in enterprise contexts, this matters because the alternative — a tangled set of "is_published / is_correct / needs_review / is_archived" flags — is what makes most real systems brittle.

## Modular splits, not monoliths

- [PR #387](https://github.com/williamrthomas/robotics-press-engine/) — "Split `watchdog.py` into modular package."
- [PR #386](https://github.com/williamrthomas/robotics-press-engine/) — "Split `email_comms.py` into modular package."

Active refactoring discipline. As soon as a file accumulates real responsibilities, it gets split. The same discipline you'd want from an FDE leaving customer code behind.

## External intelligence — listener pattern

A class of agents called *listeners* poll or stream external data sources into the engine:

- **SEC EDGAR listener** (PR #503) — fetches 8-K body content for monitoring filings.
- **DVIDS listener** (PR #500) — Defense Visual Information Distribution Service API.
- **GDELT listener** (PR #142) — global event monitoring via the free GDELT API.
- **OpenAlex listener** (PR #143) — academic paper signals.
- **YouTube transcript listener** (PR #140) — extracts intelligence from 10 defense channels.

Each listener owns a single source, normalizes into the same internal `Signal` object, and hands off to research/editor agents. This is a textbook integration pattern that I expect to write three times a quarter as an FDE — different customers, different sources, same shape.

## Cheap-frontier-model registration

[PR #499](https://github.com/williamrthomas/robotics-press-engine/) — "Register new cheap-frontier models in `rp_models`."

The engine knows which models are available and what they cost. New cheaper-but-capable models get added to the registry and agents pick them up. Where I use Haiku specifically: batched enrichment jobs (e.g., PR #359, "Enrich attack_events with impacts and weapons — Haiku batched job_type"). The point is that I'm already designing for the mixed-model future the FDE role lives in.

## Scheduled work via systemd

[PR #421](https://github.com/williamrthomas/robotics-press-publishing) — "rp-publishing systemd service for scheduled newsletter sends."

Production work runs as systemd services. Boring, predictable, reliable. Not Kubernetes — appropriate-scale boring infrastructure.

## Frontend: Astro publishing

[PR #476](https://github.com/williamrthomas/robotics-press) — "Render `structured_data.enhancements` in Astro article template."

The article surface is Astro. Articles ship with structured-data enhancements so search engines and agents can both consume the content. This is the same data-flower-farm idea I write about in the Substack.

## `parlant` fork — studying customer-facing agent patterns

I keep a fork of [parlant](https://github.com/williamrthomas/parlant) (behavior guidance framework for customer-facing LLM agents). Active study of how others structure agents that have to be trustworthy in customer-facing contexts is exactly the FDE problem space.

## What this lets me bring to an Anthropic FDE engagement

- Agent architectures that decompose by role, not by prompt chain.
- Tool-registry / subscription patterns that map cleanly to MCP.
- Observability discipline (`llm_traces`) as a precondition for evals.
- Typed state machines instead of boolean tangles.
- Listener pattern for plugging customer data sources into agent workflows.
- A working playbook for mixed-model routing (frontier vs. Haiku).
- Boring deployment (systemd, scheduled jobs, modular splits) over cleverness.
