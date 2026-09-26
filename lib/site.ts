export const site = {
  name: "Binary Ash",
  initials: "BA",
  role: "Software Architect & Multi-Disciplinary Engineer",
  tagline: "quietly obsessive.",
  description:
    "Binary Ash architects, builds and deploys end-to-end intelligent systems. Specialized in Full-Stack, AI/ML & GenAI, Embedded Systems, Web3 and Cross-Platform Mobile.",
  url: "https://binaryash-portfolio.vercel.app",
  email: "binaryash@hotmail.com",
  socials: {
    github: "https://github.com/binaryash",
    linkedin: "https://www.linkedin.com/in/ash-c-7b3113291",
    resume: "/ash-resume.pdf",
  },
  nav: [
    { href: "/", label: "home", key: "h" },
    { href: "/about", label: "about", key: "a" },
    { href: "/projects", label: "projects", key: "p" },
    { href: "/blog", label: "blog", key: "b" },
    { href: "/tech", label: "tech", key: "k" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
