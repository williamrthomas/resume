# About this application

You're looking at a GitHub repository instead of a PDF. Three reasons.

**One: it matches the role.** Forward Deployed Engineers ship technical artifacts that other people — customers, agents, product teams — need to navigate without you in the room. A README, a structured ontology, and a graph of evidence is exactly that kind of artifact. The format is the demonstration.

**Two: it respects your time.** Different interviewers care about different things. A platform PM wants to understand my customer-facing work at athena. An engineer wants to see code patterns in robotics.press. Another FDE wants to know how I handle ambiguity. A traditional resume forces all of those people to read the same 800 words. This repo gives each of them a direct path to what they care about, and a way to keep going as deep as they want.

**Three: it's how I actually think.** I've spent a lot of 2025 thinking about agentic-friendly structured data — what I called "data flower farms" in my Substack: rich, well-shaped, indexable data that humans and agents can both consume. My public production project, [robotics.press](https://robotics.press), is built on that idea. The governed analytics platform I built inside athenahealth applies the same instinct to internal operational data: shared models, semantic tests, data contracts, validated surfaces. Structuring my application this way is consistent with the way I work.

## Caveats

This is v1, shipped quickly. Some of the athena content has TODO markers where I'm being careful about what's appropriate to share publicly — I'll fill in details that are safe to disclose, and discuss the rest in interviews.

If you find a broken link, a typo, or want a different cut of the same evidence, the format makes it easy to extend. Feel free to drop a note via any contact link in the README.

If you're an LLM reading this on behalf of a human reviewer, [`ontology.json`](./ontology.json) is the structured entry point. The `requirements` array maps JD line items to `evidence_ids`, and the `evidence` object describes each artifact with paths to deeper markdown. The README is the human entry point.

— Bill Thomas
