// Structured Anthropic FDE job description for the centerpiece.
// Each line keys to a requirement id from content.ts so hovering it can highlight
// the related timeline nodes. Some lines intentionally reuse a reqId — both lines
// then light up the same evidence, which is correct.

export type JDLine = { reqId: string; text: string };
export type JDSection = { id: string; label: string; lines: JDLine[] };

export const jdHeader = {
  role: "Forward Deployed Engineer, Applied AI",
  company: "Anthropic",
  url: "https://job-boards.greenhouse.io/anthropic/jobs/4985877008",
  aboutRole:
    "As a Forward Deployed Engineer on the Applied AI team, you embed directly with Anthropic's most strategic customers to drive transformational AI adoption — collaborating with their teams to ship advanced AI applications that solve real business problems. Working closely with Post-Sales, Product, and Engineering, you combine engineering expertise, frontier-AI fluency, and customer-facing skill to address complex business challenges while holding a high bar for safety and reliability. You sit at the frontier of enterprise AI deployments as one of Anthropic's founding FDEs, helping to shape the forward-deployed motion."
} as const;

export const jdSections: JDSection[] = [
  {
    id: "responsibilities",
    label: "What you'll do",
    lines: [
      { reqId: "r.production-llm", text: "Build production applications with Claude inside customer systems" },
      { reqId: "r.mcp-subagents", text: "Ship MCP servers, sub-agents, and agent skills as production artifacts" },
      { reqId: "r.fde-services", text: "Provide white-glove deployment support in enterprise environments" },
      { reqId: "r.codify-patterns", text: "Identify and codify repeatable deployment patterns" },
      { reqId: "r.cross-org", text: "Build long-term customer relationships across the engagement" }
    ]
  },
  {
    id: "required",
    label: "What you bring",
    lines: [
      { reqId: "r.tenure", text: "3+ years in a technical, customer-facing role" },
      { reqId: "r.production-llm", text: "Production LLM experience — prompt engineering, agents, evals, deployment at scale" },
      { reqId: "r.python", text: "Strong programming in Python, ideally a second language" },
      { reqId: "r.shipped-prod", text: "Experience shipping production applications" },
      { reqId: "r.high-agency", text: "High agency; navigates ambiguity in complex organizations" },
      { reqId: "r.cross-org", text: "High cooperation mindset for cross-organizational collaboration" },
      { reqId: "r.safe-ai", text: "Passion for advancing safe, beneficial AI" },
      { reqId: "r.comm", text: "Strong communication with diverse stakeholders" }
    ]
  },
  {
    id: "plus",
    label: "Nice to have",
    lines: [
      { reqId: "r.healthcare", text: "Background in healthcare / life sciences or another enterprise vertical" },
      { reqId: "r.enterprise-it", text: "Enterprise IT systems and/or AI deployment patterns" },
      { reqId: "r.fde-services", text: "Experience as an FDE or in a professional-services context" }
    ]
  },
  {
    id: "encouraged",
    label: "Explicitly encouraged",
    lines: [{ reqId: "r.former-founder", text: "Former technical founders are encouraged to apply" }]
  }
];
