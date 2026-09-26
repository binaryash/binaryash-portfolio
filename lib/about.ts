export type BioSegment =
  | string
  | { text: string; href: string }
  | { text: string; strong: true };

export const bio: BioSegment[][] = [
  [
    "I architect, build, and deploy end-to-end intelligent systems. Specialized in ",
    { text: "Full-Stack", strong: true },
    ", ",
    { text: "AI/ML & GenAI", strong: true },
    ", ",
    { text: "Embedded Systems", strong: true },
    ", ",
    { text: "Web3", strong: true },
    ", and ",
    { text: "Cross-Platform Mobile", strong: true },
    ". From concept to production.",
  ],
  [
    "I handle the entire lifecycle: architecture, development, testing, and DevOps. Delivering robust software and intelligent applications across platforms.",
  ],
];

export const now = [
  { key: "building", value: "KP — a lightning-fast TUI for KeePassXC" },
  { key: "reading", value: "Bash and fzf source for the KP workflow" },
  { key: "learning", value: "multi-agent RAG pipelines for Redbud" },
];

export const stats = [
  { value: 13, label: "open repos" },
  { value: 0, label: "papers" },
  { value: 3, label: "years in prod" },
  { value: null, label: "coffee" },
];

export const timeline = [
  { year: "2023", text: "AI Intern at Company (6 months)" },
  { year: "2023", text: "Backend Developer at Company (6 months)" },
  { year: "2024", text: "Software Architect at Company (6 months)" },
  { year: "2025", text: "Software Architect at another Company (1 year)" },
];

export const closing = "Usually awake later than is wise, always happy to talk shop.";
