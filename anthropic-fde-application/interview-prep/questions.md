# Anthropic FDE — interview question bank

> **Status: data collection (fluid).** This is the question set Bill will answer (recording
> spoken responses, transcribed back in). Questions are *not* final — we'll add/cut/redo as
> answers come in. Next phases: (1) shape & structure the raw answers → unifying themes +
> per-moment snippets, (2) lay it over the JD-map timeline at `/app`.
>
> Source for the loop structure: `~/Documents/Anthropic Forward Deployed Engineer  Hiring & Interview Guide.md`.
> Each stage below notes *what the interviewer is really testing*. `Tailored:` lines point at Bill's record.

---

## 1. Recruiter screen — *testing: relevance, genuine interest, culture signal*

- Tell me about yourself (2–3 min, tight).
- **Why Anthropic specifically** — not "why AI," why this lab?
- Why FDE, vs. a pure SWE or solutions/TAM role?
- Walk me through your resume — what's the throughline?
- *Tailored:* You're a senior leader at athenahealth with 9 years of equity and stability — why jump to a founding-era, travel-heavy field role?
- *Tailored:* You run robotics.press essentially solo — why join a team now?

## 2. Hiring-manager screen — *testing: depth, tradeoff reasoning, retrospection*

- Walk me through 2–3 projects end-to-end: problem → decisions → constraints → outcome → what you'd do differently.
- Take your most technically ambitious project and go as deep as I push.
- Tell me about a decision you got *wrong*. How did you find out? What changed after?
- Hardest speed-vs-correctness tradeoff you've made?
- *Tailored — robotics.press:* Walk the architecture. Why 12+ repos? Where do agents act autonomously vs. you in the loop? How do you *know* it's working (llm_traces, evals)?
- *Tailored — federated AI model:* Why federation over central evangelism? What specifically broke about the central approach?
- *Tailored — agent-assisted dev model:* Task packets, scoped worktrees, closeout memory — what problem forced each piece into existence?
- *Tailored — greenfield-from-chaos:* Pop Health / enterprise data product started as a support disaster. How did you scope the ambiguity into a durable pattern?

## 3. Live coding (Colab/Replit) — *testing: pragmatic iteration & debugging, Python fluency — not abstract DS&A*

- Parse URLs from a list, count domain matches; then extend to async / scale.
- Build an in-memory KV store; add TTL, then persistence/compression (multi-level, escalating).
- Scale a token-generating function to 100k req/s — how?
- Take a raw LLM API call and make it production-robust: retries, rate limits, token budget, partial failures.

## 4. System design (LLM-specific, distributed) — *testing: distributed fundamentals + LLM inference realities + tradeoff articulation*

- Design distributed search over 1B docs at 1M QPS *including* LLM inference.
- Design hybrid keyword + semantic search — where do embeddings live, how fresh, how do you rerank?
- p95 latency jumped 100ms → 2000ms. Debug it live.
- *Tailored:* Design robotics.press at 1000× traffic — what breaks first, what changes?
- *Tailored:* Design a customer-facing agent in a regulated (PHI) enterprise — data residency, audit trail, eval gates, blast-radius containment.

## 5. LLM & prompt engineering (hands-on) — *testing: where LLMs fail and how you design around it; agents; evals; cost*

- For use case X, how do you approach the prompt, and how do you make it robust?
- How do you build an eval for a *fuzzy* task — what's your loop?
- Design a multi-step agent for [task]: where does it break, how do you contain it?
- Token/cost/latency budgeting at volume — when Haiku vs. Opus, when to batch?
- How do you detect and handle hallucination in production?
- *Tailored:* Your mixed-model routing + llm_traces — walk the observability/eval discipline you actually run.
- *Tailored:* MCP server / shared tool registry — how would you ship one as a *leave-behind* artifact a customer keeps using after you're gone?

## 6. Culture fit / research brainstorming — *testing: mission alignment, safety thinking, low-ego collaboration*

- Why does AI safety matter to you, in your own words?
- Describe a **safety-first decision** — a time you slowed down or said no.
- A technical misjudgment that delayed a project — what happened, what did you learn?
- A disagreement with a teammate/stakeholder you resolved with integrity.
- "Do the simple thing that works" — a time you nailed it, and a time you over-built.
- *Tailored:* You frame AI as fire → electricity → AI, a liberation from forced labor. How does that show up when a customer is anxious about workforce displacement?
- *Tailored:* healthcare-data-training democratizes building — how do you keep "democratized" from becoming "unsafe"?

---

## 7. Engineering design ethos / aesthetic / thinking & troubleshooting

*The set Bill specifically wanted — these surface taste and process, not facts. Likely the richest
source of the timeline's "unifying themes."*

**Design instinct & taste**

- When you sit down to build something new, what's your *first* move? Your second?
- How do you decide what **not** to build? Give me a recent "no."
- What does *good taste* in engineering mean to you? Show me one design you find beautiful and one you find ugly — and why.
- You aim for "the simplest loop possible." How do you know when it's simple *enough* vs. so simple it became fragile?
- When do you reach for an abstraction vs. just repeating three similar lines?
- What earns a comment in your code? What never does?

**Leverage & the human/agent boundary**

- You layer agentic "officers" over harnesses. How do you decide what an agent does autonomously vs. what you keep your hands on?
- How do you keep cognitive control as a system grows — what's your *tell* that you're losing the thread, and what do you do about it?
- "Maximum leverage while still understanding everything" — where is that tension hardest, and how do you resolve it?
- How do you choose what to automate vs. keep manual?

**Troubleshooting & judgment**

- Something fails and you have no idea why. Walk me through your first 30 minutes.
- How do you sanity-check output — yours or a model's? Walk me through qualifying whether something is realistic, scaled right, following good principles.
- Tell me about a time your first instinct was wrong — and how you caught it.
- You "ride the edge of your ability." How do you manage that risk? What's the safety net?
- How do you decide when something is **done**?
- What's a strong opinion about building with LLMs you hold that most people disagree with?
