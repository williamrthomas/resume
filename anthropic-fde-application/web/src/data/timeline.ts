// Unified timeline model for the JD-map experience.
// Derived from content.ts so the requirement<->evidence wiring stays in one place.
// Tile nodes carry their rich bodies and are reverse-mapped to JD requirements via
// `requirements[].evidence`. Older foundational roles are added as hand-written arc
// nodes (prose seeded from the repo ontology) with an explicit requirement map.

import { tiles, requirements, type EvidenceTile } from "./content";
import { themes } from "./themes";

export type TimelineNode = {
  id: string;
  headline: string; // short rail label
  sortKey: number; // numeric year for chronological placement
  dateLabel: string; // human-readable range
  track: string; // category/track — drives node color grouping
  origin: string; // employer / venture / repo the moment belongs to
  body?: string;
  metrics?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  requirements: string[]; // JD requirement ids this node supports
  themes: string[]; // theme ids whose thread runs through this node (derived from themes.ts)
};

// Origin tag per node id — single-source map so each moment is provenance-stamped.
const ORIGIN_BY_ID: Record<string, string> = {
  // athena work-products
  "federated-ai": "athenahealth",
  "governed-analytics": "athenahealth",
  "agentic-dev-operating-model": "athenahealth",
  "local-first-packages": "athenahealth",
  "ai-case-intelligence": "athenahealth",
  "continuity-mfa": "athenahealth",
  "continuity-tier1-transition": "athenahealth",
  "continuity-snowflake": "athenahealth",
  "continuity-release-recovery": "athenahealth",
  "site-visit-mapping": "athenahealth",
  "interim-po": "athenahealth",
  "source-first-publishing": "athenahealth",
  "operational-analytics": "athenahealth",
  "product-evidence": "athenahealth",
  // public / personal
  "robotics-press": "robotics.press",
  "github-velocity": "GitHub",
  "healthcare-data-training": "private repo",
  // founder
  "founder-q5": "Q5 Labs",
  "founder-bjj-weekly": "BJJ Weekly",
  // arc spine
  "usmc": "USMC",
  "wight": "Wight Engineers",
  "niw": "NIW Services",
  "mbna": "MBNA America",
  "edit-systems": "Edit Systems",
  "mid-coast": "Mid-Coast Tech",
  "thomas-consulting": "Thomas Consulting",
  "athena-assoc": "athenahealth",
  "athena-mgr": "athenahealth",
  "athena-sr-mgr": "athenahealth"
};

// Reverse-map: which themes list this node in their `moments`.
const themesFor = (id: string): string[] => themes.filter((t) => t.moments.includes(id)).map((t) => t.id);

// Reverse-map: which JD requirements point at this evidence id.
const reqsFor = (id: string): string[] =>
  requirements.filter((r) => r.evidence.includes(id)).map((r) => r.id);

const firstYear = (s: string | undefined): number | null => {
  if (!s) return null;
  const m = s.match(/\d{4}/);
  return m ? parseInt(m[0], 10) : null;
};

// Pull a date-looking tail segment out of a tile subtitle ("… · 2024–present").
const tailDate = (subtitle: string | undefined): string | null => {
  if (!subtitle) return null;
  const seg = subtitle.split("·").pop()!.trim();
  return /\d{4}/.test(seg) ? seg : null;
};

// Tiles whose subtitle has no parseable year get an explicit placement.
const TILE_OVERRIDES: Record<string, { sortKey: number; dateLabel: string }> = {
  "github-velocity": { sortKey: 2026, dateLabel: "last 12 months" },
  substack: { sortKey: 2025, dateLabel: "ongoing" },
  "healthcare-data-training": { sortKey: 2026, dateLabel: "2026" }
};

const tileNode = (t: EvidenceTile): Omit<TimelineNode, "themes" | "origin"> => {
  const override = TILE_OVERRIDES[t.id];
  return {
    id: t.id,
    headline: t.title,
    sortKey: override?.sortKey ?? firstYear(t.subtitle) ?? 0,
    dateLabel: override?.dateLabel ?? tailDate(t.subtitle) ?? "",
    track: t.category,
    body: t.body,
    metrics: t.metrics,
    links: t.links,
    requirements: reqsFor(t.id)
  };
};

// Foundational roles that predate (or sit alongside) the evidence tiles. Bodies
// seeded from ontology.json prose; requirement maps assigned by hand. These let
// the older parts of the timeline participate in the hover-highlight.
const ARC_NODES: Omit<TimelineNode, "themes" | "origin">[] = [
  {
    id: "usmc",
    headline: "USMC — AV-8B Harrier hydraulics",
    sortKey: 1986,
    dateLabel: "1986–1990",
    track: "operator",
    body:
      "U.S. Marine Corps — AV-8B Harrier hydraulics (MAG-32 + VMAT-203, MCAS Cherry Point). Production control and remove-and-replace work. First exposure to large-scale enterprise process: VIDS/MAF work-order tagging, intermediate-level repair flow, priority management under operational pressure.",
    requirements: ["r.enterprise-it", "r.high-agency"]
  },
  {
    id: "wight",
    headline: "Wight Engineers — field construction",
    sortKey: 1990,
    dateLabel: "1990–1995",
    track: "operator",
    body:
      "Wight Consulting Engineers — Field Inspector → VP of Field Construction on municipal water, sewer, and road projects. Ran field operations across multiple stakeholders under real-world ambiguity and schedule pressure.",
    requirements: ["r.high-agency"]
  },
  {
    id: "niw",
    headline: "NIW Services — co-owner",
    sortKey: 1995,
    dateLabel: "1995–1999",
    track: "founder",
    body: "NIW Services — co-owner of a family services business. Early operating and ownership experience.",
    requirements: ["r.former-founder"]
  },
  {
    id: "mbna",
    headline: "MBNA — phones → LAN tech",
    sortKey: 1999,
    dateLabel: "1999–2003",
    track: "operator",
    body:
      "MBNA America — Customer Assistance → Credit Analyst → LAN Technician. Moved from the phones into enterprise IT, supporting the internal network at one of the largest credit-card issuers of its era.",
    requirements: ["r.enterprise-it"]
  },
  {
    id: "edit-systems",
    headline: "Edit Systems — statewide assessment DB",
    sortKey: 2003,
    dateLabel: "2003–2005",
    track: "founder",
    body:
      "Edit Systems — independent consulting. PM and design lead for a statewide student-assessment database deployed to Maine's career & technical schools. Multi-stakeholder public-sector delivery end to end.",
    requirements: ["r.former-founder", "r.fde-services"]
  },
  {
    id: "mid-coast",
    headline: "Mid-Coast Tech — coordinator + instructor",
    sortKey: 2005,
    dateLabel: "2005–2009",
    track: "operator",
    body:
      "Mid-Coast School of Technology — Technology Coordinator and lab instructor (CAD/CAM, conceptual physics, design technique); held a Maine teaching certificate. Built the muscle of conveying technical concepts to non-technical learners.",
    requirements: ["r.comm", "r.enterprise-it"]
  },
  {
    id: "thomas-consulting",
    headline: "Thomas Consulting — IT for dental + legal",
    sortKey: 2009,
    dateLabel: "2009–2016",
    track: "founder",
    body:
      "Thomas Consulting (TCLLC) — eight years of independent IT consulting and managed services for dental and legal practices. Owned the full customer relationship: discovery, deployment, ongoing support.",
    requirements: ["r.former-founder", "r.fde-services", "r.enterprise-it"]
  },
  {
    id: "athena-assoc",
    headline: "athenahealth — Pop Health (greenfield)",
    sortKey: 2017,
    dateLabel: "2017–2020",
    track: "athena",
    body:
      "Joined athenahealth as an analyst on Population Health as it was being integrated into athenaOne. There was no support structure for the complex data operation — built the entire case-support process, knowledge bases, and operational infrastructure from greenfield.",
    requirements: ["r.tenure", "r.healthcare", "r.high-agency"]
  },
  {
    id: "athena-mgr",
    headline: "athenahealth — Manager, Emerging Products",
    sortKey: 2020,
    dateLabel: "2020–2024",
    track: "athena",
    body:
      "Manager, Emerging Products Services — scaled support and operations across athena's emerging platform products, working cross-functionally with Product, Engineering, and Analytics.",
    requirements: ["r.tenure", "r.healthcare", "r.cross-org"]
  },
  {
    id: "athena-sr-mgr",
    headline: "athenahealth — Sr Manager / AI & Data Builder",
    sortKey: 2024,
    dateLabel: "2024–present",
    track: "athena",
    body:
      "Platform Data Solutions Senior Manager — Internal AI & Data Product Builder. Recently transitioned into an IC role focused on operationalizing AI for the platform: strategic AI-first solutions, proactive risk signals, AI-first quality processes, and context engineering. Starting by shaping CRM/Salesforce data into a foundation agentic workflows can act on.",
    requirements: ["r.tenure", "r.healthcare", "r.production-llm"]
  }
];

export const timeline: TimelineNode[] = [...tiles.map(tileNode), ...ARC_NODES]
  .map((n) => ({ ...n, themes: themesFor(n.id), origin: ORIGIN_BY_ID[n.id] ?? "" }))
  .sort((a, b) => a.sortKey - b.sortKey);
