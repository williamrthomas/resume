# For the engineer

If you want to see code patterns, start with **[evidence/agent-systems.md](../evidence/agent-systems.md)**. It walks the robotics.press architecture with PR numbers you can click through.

The fastest signals:

1. **`llm_traces` wrappers** (PR #282) — observability discipline before evals.
2. **Shared tool registry** (PR #391) — MCP-shaped capability subscription pattern.
3. **State machine for article lifecycle** (PR #552) — typed states, not boolean tangles.
4. **Listener pattern across 5 sources** (PRs #503, #500, #143, #142, #140) — integration shape I'll bring to FDE engagements.
5. **Card composer agent replaces 36 templates** (PR #582) — refactoring template explosion into a single composing agent.

If you want a code-shaped conversation in the interview, pick any of those PRs and we can talk through tradeoffs, what I'd do differently, and where the pattern bends.

## Languages and stack

- **Python primary** across robotics.press (12+ repos), `sourdoughcheatsheets.com`, `base` template, several forks.
- **TypeScript secondary** in `healthcare-data-training` and `postiz-app`.
- **Astro** for publishing surface.
- **Snowflake / DuckDB / Salesforce / Oracle** on the data side (work).
- **systemd, modular Python packages, structured-data-first APIs.**

## What I'd want to discuss

- Eval harness design for agent systems where ground truth is fuzzy (robotics.press content).
- Cost-aware model routing (when does Haiku do vs. when do you reach for Opus / Sonnet).
- MCP server design for healthcare or finance enterprises — what shape do the most useful ones take.
- When you accept short-term complexity to avoid template explosion (card_composer pattern).
- Anything Claude-Code-flavored: workflow, prompt patterns, what's worth automating.
