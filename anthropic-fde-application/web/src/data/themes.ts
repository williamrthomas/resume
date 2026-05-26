// The 6 unifying threads — the connective tissue between the JD (ask) and the
// timeline (proof). Each theme is a second-axis selector: it lights up the moments
// it runs through and the JD requirements it covers. See interview-prep/themes-and-structure.md.

export type Theme = {
  id: string;
  label: string; // short chip label
  name: string; // fuller name
  essence: string;
  quote: string;
  color: string;
  requirements: string[]; // JD requirement ids this thread covers
  moments: string[]; // timeline node ids this thread runs through
};

export const themes: Theme[] = [
  {
    id: "t.leverage",
    label: "Leverage",
    name: "Leverage / higher bandwidth",
    essence:
      "The drive to get as much done as I possibly can, as fast as I can. So many ideas — and it's hard to get them out of my head. Every tool I've reached for, from a CNC router to an agent crew, has been about connecting my brain to higher bandwidth. AI is such a draw because it helps me get them out.",
    quote: "connect my brain to higher bandwidth",
    color: "#C25B3D",
    requirements: ["r.production-llm", "r.mcp-subagents", "r.codify-patterns", "r.shipped-prod"],
    moments: ["mid-coast", "thomas-consulting", "federated-ai", "agentic-dev-operating-model", "robotics-press", "github-velocity", "local-first-packages", "source-first-publishing"]
  },
  {
    id: "t.parachute",
    label: "Parachute in",
    name: "Parachute in",
    essence:
      "Drop into an unfamiliar system, map what moves what, and design something elegant that survives me leaving.",
    quote: "come up to speed quickly on how everything's connected — then design something elegant",
    color: "#5B7B8C",
    requirements: ["r.high-agency", "r.fde-services", "r.cross-org", "r.codify-patterns", "r.healthcare", "r.tenure", "r.enterprise-it"],
    moments: ["usmc", "wight", "mbna", "edit-systems", "thomas-consulting", "athena-assoc", "athena-mgr", "athena-sr-mgr", "continuity-tier1-transition", "interim-po", "product-evidence"]
  },
  {
    id: "t.refinement",
    label: "Refinement",
    name: "Relentless refinement → simplicity",
    essence:
      "Overbuild, then whittle toward the simplest, most durable form. And know when to stop.",
    quote: "the arch is the essence of engineering",
    color: "#6B7F6E",
    requirements: ["r.shipped-prod", "r.codify-patterns"],
    moments: ["robotics-press", "github-velocity", "governed-analytics", "agentic-dev-operating-model", "continuity-snowflake", "source-first-publishing", "operational-analytics"]
  },
  {
    id: "t.loops",
    label: "Data & loops",
    name: "Everything is data, everything is a loop",
    essence:
      "Reduce any system to its primitive — read state → transform → write state. Capabilities become config, not new infrastructure. Make failures loud.",
    quote: "everything is data and everything is a loop",
    color: "#8A6D3B",
    requirements: ["r.production-llm", "r.python", "r.mcp-subagents", "r.codify-patterns", "r.enterprise-it"],
    moments: ["robotics-press", "governed-analytics", "local-first-packages", "agentic-dev-operating-model", "ai-case-intelligence", "source-first-publishing", "operational-analytics", "product-evidence"]
  },
  {
    id: "t.provenance",
    label: "Provenance",
    name: "Provenance over proof",
    essence:
      "Don't claim what you can't trace. Provenance born at collection beats verifying the output. Give the model a positive path to failure. Trust the trunk, not every leaf.",
    quote: "don't quote a thing unless you can prove a thing",
    color: "#7A6A82",
    requirements: ["r.safe-ai", "r.production-llm"],
    moments: ["robotics-press", "ai-case-intelligence", "governed-analytics", "continuity-mfa", "operational-analytics"]
  },
  {
    id: "t.why",
    label: "Why we're here",
    name: "Why we're here",
    essence:
      "A lifelong drive — obsession, even — with how intelligence works and where it comes from. A conviction that intelligence is foundational, and that AI is the next fire and electricity: a powerful technology that will let humans transcend their current limitations.",
    quote: "fire, electricity, AI",
    color: "#9C6B4F",
    requirements: ["r.safe-ai", "r.comm", "r.former-founder"],
    moments: ["mid-coast", "founder-bjj-weekly", "founder-q5", "healthcare-data-training"]
  }
];

export const themeById = (id: string) => themes.find((t) => t.id === id);
