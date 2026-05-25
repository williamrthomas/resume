// Full content with metrics restored — for the gated experience.
// This file is the source of truth for the rendered site AND the chatbot's system prompt.

export const candidate = {
  name: "William R. Thomas",
  short: "Bill Thomas",
  location: "Rockport, Maine",
  openToRelocation: true,
  email: "william.r.thomas@gmail.com",
  phone: "+1-207-951-8613",
  title: "Platform Data Solutions Senior Manager — Internal AI & Data Product Builder",
  employer: "athenahealth",
  applyingFor: "Forward Deployed Engineer, Applied AI",
  jobUrl: "https://job-boards.greenhouse.io/anthropic/jobs/4985877008",
  links: {
    linkedin: "https://www.linkedin.com/in/wthomasoh/",
    github: "https://github.com/williamrthomas",
    substack: "https://williamrthomas.substack.com",
    roboticsPress: "https://robotics.press"
  }
} as const;

export const headline = `Data product and AI operations leader. Nine years at athenahealth in enterprise platform operations; current title Platform Data Solutions Senior Manager — Internal AI & Data Product Builder. Architecting AI-first operations: federated operating models, builder communities, governed analytics platforms, agentic development workflows, and local-first analytics delivery.`;

// Tile/card content for the visual experience. Order matters for layout.
export type EvidenceTile = {
  id: string;
  category: "ai-leadership" | "data-platform" | "ops-impact" | "public-build" | "founder" | "communication";
  title: string;
  subtitle?: string;
  body: string;
  metrics?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
};

export const tiles: EvidenceTile[] = [
  {
    id: "federated-ai",
    category: "ai-leadership",
    title: "Federated AI operating model",
    subtitle: "Internal · athenahealth · 2024–present",
    body:
      "Architected and executed an AI operating model that moved operational teams from isolated experimentation to repeatable AI-enabled execution. Federated structure of local builders with shared infrastructure, office-hours communities, and a clear path from learning to production. The principle: AI adoption inside an enterprise does not scale by central evangelism — it scales by federation.",
    metrics: [
      { label: "AI champions", value: "60+" },
      { label: "active builders", value: "25+" },
      { label: "automation opportunities", value: "30+" }
    ]
  },
  {
    id: "governed-analytics",
    category: "data-platform",
    title: "Governed analytics platform",
    subtitle: "Internal · athenahealth · 2025–present",
    body:
      "Built shared SQL models, semantic tests, validation gates, and consumer-facing data contracts on top of an enterprise warehouse-backed analytics stack (Snowflake). Unifies operational and warehouse data into reusable, validated models. Downstream consumers get a stable surface to build against, not a moving target. The fastest path from 'we have data' to 'you can ship Claude against it.'"
  },
  {
    id: "agentic-dev-operating-model",
    category: "ai-leadership",
    title: "Agent-assisted development operating model",
    subtitle: "Internal · athenahealth · 2025–present",
    body:
      "Designed the operating model the federated AI builder community uses for agent-assisted development. Task packets in, durable closeout memory out. Scoped worktree blast radius. Staged review. Validation gates. Evaluation artifacts. The artifact an FDE leaves behind that lets a customer keep going."
  },
  {
    id: "local-first-packages",
    category: "data-platform",
    title: "Local-first analytics package delivery",
    subtitle: "Internal · athenahealth · 2025–present",
    body:
      "Built warehouse → Parquet → DuckDB packaging patterns with manifests, validation, provenance, and launch flows. Stakeholders get versioned analytics packages they can run in a browser or locally without standing infrastructure — the right pattern for customer engagements with data residency, network, or speed-of-iteration constraints."
  },
  {
    id: "ai-case-intelligence",
    category: "ai-leadership",
    title: "AI case-intelligence workflows",
    subtitle: "Internal · athenahealth · 2025–present",
    body:
      "Applied embeddings, vector similarity, clustering, and LLM-assisted analysis to support-case operations. Historical resolutions become an active input on every new case. Turns institutional knowledge into something the agent can reach for instead of something stuck in someone's head."
  },
  {
    id: "continuity-mfa",
    category: "ops-impact",
    title: "Multi-wave MFA rollout — data-product security response",
    subtitle: "Internal · athenahealth · 2024–2025",
    body:
      "Led a six-wave MFA rollout for an enterprise data product in response to customer credential-security concerns. Account review, communication, migration, cleanup.",
    metrics: [
      { label: "accounts reviewed", value: "16,000" },
      { label: "users migrated", value: "1,520" },
      { label: "stakeholders contacted (incident response)", value: "6,000+" }
    ]
  },
  {
    id: "continuity-tier1-transition",
    category: "ops-impact",
    title: "Global Tier 1 support transition",
    subtitle: "Internal · athenahealth · 2024–2025",
    body:
      "Moved Tier 1 enterprise-data-product support to a global partner team. Documentation, KB transfer, runbook design, ramp coaching, escalation handoffs.",
    metrics: [
      { label: "partner Tier 1 resolution share", value: "28% → 60%" },
      { label: "time to that shift", value: "6 months" }
    ]
  },
  {
    id: "continuity-snowflake",
    category: "ops-impact",
    title: "Snowflake partner-account consolidation",
    subtitle: "Internal · athenahealth · 2024",
    body:
      "Drove cost savings by consolidating partner accounts and empowering downstream teams to operate within their share — without losing performance or governance.",
    metrics: [
      { label: "annual savings", value: "$300K" }
    ]
  },
  {
    id: "continuity-release-recovery",
    category: "ops-impact",
    title: "Data-product release recovery",
    subtitle: "Internal · athenahealth · 2025",
    body:
      "Mitigated a release drought by executing two off-cycle releases, expanding available data assets and templates.",
    metrics: [
      { label: "new views/tables", value: "95" },
      { label: "data elements", value: "21" },
      { label: "QuickStart templates", value: "2" }
    ]
  },
  {
    id: "site-visit-mapping",
    category: "ops-impact",
    title: "Geospatial site-visit planning solution",
    subtitle: "Internal · athenahealth · 2025",
    body:
      "Delivered a high-impact geospatial planning solution credited internally with saving hundreds of planning hours. Map-based decision support for site-visit, account, and outreach operations.",
    metrics: [
      { label: "planning hours saved", value: "hundreds" }
    ]
  },
  {
    id: "interim-po",
    category: "ops-impact",
    title: "Interim product ownership — enterprise data product",
    subtitle: "Internal · athenahealth · 2025",
    body:
      "Stepped into interim Product Owner responsibilities during a leadership gap. Maintained roadmap, stakeholder communication, release pace, and team stability through the transition."
  },
  {
    id: "robotics-press",
    category: "public-build",
    title: "robotics.press — public production multi-agent system",
    subtitle: "Public · 2024–present",
    body:
      "Fully automated, agentic intelligence platform tracking robotics deployments in security, defense, and infrastructure. The CIDE (Critical Infrastructure Drone Exposure) map is a geospatial intelligence product scoring infrastructure sites for drone vulnerability across conflict zones. Built on a Python service network of 12+ repos with a card-composer agent, shared tool registry, llm_traces observability, mixed-model routing (Claude + Haiku batched jobs), and a listener pattern for SEC EDGAR, GDELT, DVIDS, OpenAlex, and YouTube.",
    metrics: [
      { label: "companies tracked", value: "1.4K+" },
      { label: "articles published", value: "2.8K+" },
      { label: "intelligence signals", value: "40.7K+" },
      { label: "sites scored", value: "31.7K+" },
      { label: "attack events", value: "4,174" }
    ],
    links: [{ label: "robotics.press →", href: "https://robotics.press" }]
  },
  {
    id: "github-velocity",
    category: "public-build",
    title: "GitHub velocity",
    subtitle: "Public · last 12 months",
    body:
      "Sustained parallel shipping across day job, public production system, side projects, and writing. The metric is the contribution count; the signal is consistency.",
    metrics: [
      { label: "contributions, last year", value: "4,435" },
      { label: "commits in May 2026", value: "1,275" },
      { label: "active repos in May 2026", value: "18" }
    ],
    links: [{ label: "github.com/williamrthomas →", href: "https://github.com/williamrthomas" }]
  },
  {
    id: "healthcare-data-training",
    category: "public-build",
    title: "healthcare-data-training",
    subtitle: "Private repo · curriculum + market research",
    body:
      "Market research + curriculum + GTM for training non-technical healthcare workers to build data tools with Claude Code, Codex, and Cursor. The thesis: a new class of clinically/operationally-fluent worker is being empowered by agentic AI to do work that previously required a data engineer. Maps directly to the FDE customer profile in healthcare.",
    metrics: [
      { label: "personas", value: "7" },
      { label: "courses analyzed (landscape teardown)", value: "43" },
      { label: "funnel teardowns", value: "10" },
      { label: "curriculum spec", value: "1,402 lines" },
      { label: "GTM plan", value: "~3,000 lines" }
    ]
  },
  {
    id: "founder-q5",
    category: "founder",
    title: "Q5 Labs — founder/operator",
    subtitle: "Sports nutrition brand · 2012–2016",
    body:
      "Bootstrapped a niche sports nutrition brand for combat athletes. Full product line, packaging, content marketing, athlete partnerships. Successful exit in 2016.",
    metrics: [
      { label: "growth", value: "$0 → $20K+/mo" },
      { label: "time to peak", value: "13 months" },
      { label: "marketing budget", value: "$0" }
    ]
  },
  {
    id: "founder-bjj-weekly",
    category: "founder",
    title: "BJJ Weekly — co-founder/publisher",
    subtitle: "Niche media venture · 2010–2012",
    body:
      "Co-founded a weekly online news + education site for Brazilian Jiu-Jitsu. Largest blog in the niche within 18 months.",
    metrics: [
      { label: "newsletter subscribers", value: "19,764" },
      { label: "open rate", value: "74%" },
      { label: "YouTube views", value: "7M+" }
    ]
  },
  {
    id: "substack",
    category: "communication",
    title: "Substack — `williamrthomas.substack.com`",
    subtitle: "Public writing",
    body:
      "Active essay practice on the AI / building / agent topics that overlap with the FDE role. \"14 Rules for Solo Builders in the Age of AI\" · \"Why AI Slop Creates Unprecedented Developer Demand\" · \"Can AI Make Us More Human?\" · \"DNA Datascapes & Origami Hard Drives\".",
    links: [{ label: "williamrthomas.substack.com →", href: "https://williamrthomas.substack.com" }]
  }
];

export const careerArc = [
  { year: "1986–1990", role: "USMC AV-8B Harrier Hydraulics — MAG-32 + VMAT-203, MCAS Cherry Point", track: "operator" },
  { year: "1990–1995", role: "Wight Consulting Engineers — Field Inspector → VP Field Construction (municipal water/sewer/roads)", track: "operator" },
  { year: "1995–1999", role: "NIW Services — co-owner (family services business)", track: "operator" },
  { year: "1999–2003", role: "MBNA America — Customer Assistance → Credit Analyst → LAN Technician", track: "operator" },
  { year: "2003–2005", role: "Edit Systems — independent consulting; statewide K-12 student-assessment database for Maine CTE schools", track: "founder" },
  { year: "2005–2009", role: "Mid-Coast School of Technology — Tech Coordinator + Lab Instructor (CAD/CAM, conceptual physics)", track: "operator" },
  { year: "2009–2016", role: "Thomas Consulting (TCLLC) — independent IT consulting for dental + legal", track: "founder" },
  { year: "2010–2012", role: "BJJ Weekly — co-founder/publisher", track: "founder" },
  { year: "2012–2016", role: "Q5 Labs — founder/operator; sports nutrition; exited 2016", track: "founder" },
  { year: "Mar 2017 – Jul 2020", role: "athenahealth — Senior Emerging Product Services Associate", track: "athena" },
  { year: "Jul 2020 – Dec 2024", role: "athenahealth — Manager, Emerging Products Services", track: "athena" },
  { year: "Aug 2024 – present", role: "athenahealth — Platform Data Solutions Senior Manager / Internal AI & Data Product Builder", track: "athena" },
  { year: "2024 – present", role: "robotics.press — creator/operator", track: "public-build" },
  { year: "2025 – present", role: "Substack writing on agentic AI; healthcare-data-training curriculum (private repo)", track: "public-build" }
] as const;

// JD requirements (paraphrased) — used for the requirements ↔ evidence graph viz
export const requirements = [
  { id: "r.tenure", text: "3+ years in a technical, customer-facing role", evidence: ["federated-ai", "robotics-press", "founder-q5", "founder-bjj-weekly"] },
  { id: "r.production-llm", text: "Production LLM experience (prompt eng, agents, evals, deploy at scale)", evidence: ["federated-ai", "agentic-dev-operating-model", "ai-case-intelligence", "robotics-press"] },
  { id: "r.python", text: "Strong Python, ideally a second language", evidence: ["robotics-press", "governed-analytics", "healthcare-data-training", "github-velocity"] },
  { id: "r.shipped-prod", text: "Shipped production applications", evidence: ["governed-analytics", "local-first-packages", "robotics-press", "founder-q5"] },
  { id: "r.high-agency", text: "High agency under ambiguity", evidence: ["federated-ai", "continuity-mfa", "continuity-tier1-transition", "interim-po", "founder-q5"] },
  { id: "r.cross-org", text: "Cross-organizational collaboration", evidence: ["federated-ai", "continuity-tier1-transition", "continuity-mfa"] },
  { id: "r.safe-ai", text: "Passion for safe, beneficial AI", evidence: ["substack", "healthcare-data-training"] },
  { id: "r.comm", text: "Strong communication, low ego", evidence: ["substack", "healthcare-data-training", "founder-bjj-weekly"] },
  { id: "r.healthcare", text: "Healthcare / enterprise vertical (plus)", evidence: ["federated-ai", "continuity-mfa", "continuity-tier1-transition", "interim-po", "healthcare-data-training"] },
  { id: "r.enterprise-it", text: "Enterprise IT systems / AI deployment patterns (plus)", evidence: ["governed-analytics", "local-first-packages", "agentic-dev-operating-model", "continuity-snowflake"] },
  { id: "r.mcp-subagents", text: "Ship MCP servers, sub-agents, agent skills", evidence: ["agentic-dev-operating-model", "robotics-press", "ai-case-intelligence"] },
  { id: "r.codify-patterns", text: "Codify repeatable deployment patterns", evidence: ["federated-ai", "governed-analytics", "agentic-dev-operating-model", "local-first-packages"] },
  { id: "r.fde-services", text: "FDE / professional services (plus)", evidence: ["federated-ai", "continuity-tier1-transition", "interim-po"] },
  { id: "r.former-founder", text: "Former technical founder (encouraged)", evidence: ["founder-q5", "founder-bjj-weekly"] }
];
