export type ProjectCategory = "ai" | "fullstack" | "tools";

export interface Project {
  name: string;
  description: string;
  category: ProjectCategory;
  year: number;
  tags: string[];
  href: string;
}

export const projectCategories = ["all", "ai", "fullstack", "tools"] as const;

export const projects: Project[] = [
  {
    name: "kp-tui",
    description:
      "A lightning-fast, TUI wrapper for KeePassXC with fuzzy-find and quick copy.",
    category: "tools",
    year: 2026,
    tags: ["bash", "tui", "keepassxc", "fzf", "security"],
    href: "https://github.com/binaryash/kp",
  },
  {
    name: "redbud-ems",
    description:
      "Workforce platform with Gemini agents for contract assignment and RAG-based matching.",
    category: "ai",
    year: 2024,
    tags: ["django", "react", "genai", "ai agents", "rag"],
    href: "https://github.com/binaryash/redbud",
  },
  {
    name: "genai-foundation-models",
    description:
      "From-scratch implementations of Transformers and GANs for NLP and Vision.",
    category: "ai",
    year: 2024,
    tags: ["transformers", "gan", "mlops", "genai", "ml"],
    href: "https://github.com/binaryash/ml",
  },
  {
    name: "job-fetcher",
    description:
      "AI-powered job aggregator with automated extraction and resume generation.",
    category: "ai",
    year: 2024,
    tags: ["python", "django", "genai", "web scraping", "next.js", "ai agents"],
    href: "https://github.com/binaryash/job-fetcher",
  },
  {
    name: "async-task-manager-v2",
    description:
      "Distributed data scraping and summarization using Celery, Redis, and GenAI.",
    category: "tools",
    year: 2023,
    tags: ["django rest", "celery", "redis", "genai", "mcp"],
    href: "https://github.com/binaryash/taskmanager",
  },
  {
    name: "college-management-system",
    description:
      "Full-stack college management platform with Django backend and React frontend.",
    category: "fullstack",
    year: 2024,
    tags: ["django", "react.js", "python"],
    href: "https://github.com/binaryash/college-management-system",
  },
  {
    name: "realtime-chat-app",
    description:
      "Real-time chat application using Django Channels and WebSockets.",
    category: "fullstack",
    year: 2024,
    tags: ["django", "django channels", "websockets"],
    href: "https://github.com/binaryash/django-chat-app",
  },
  {
    name: "event-management-mern",
    description:
      "MERN-stack event management app for creating and managing events.",
    category: "fullstack",
    year: 2023,
    tags: ["mongodb", "express.js", "react.js", "node.js"],
    href: "https://github.com/binaryash/event-management-application",
  },
  {
    name: "rag-project",
    description:
      "Retrieval-Augmented Generation pipeline with MiniLM and GPT-2.",
    category: "ai",
    year: 2023,
    tags: ["minilm", "gpt-2", "faiss"],
    href: "https://github.com/binaryash/ml/blob/main/unnamed/RAG_Project.ipynb",
  },
  {
    name: "movie-recommendation",
    description:
      "Hybrid movie recommender with neural networks and collaborative filtering.",
    category: "ai",
    year: 2023,
    tags: ["neural networks", "hybrid filtering"],
    href: "https://github.com/binaryash/ml/blob/main/unnamed/movie_recommendation.ipynb",
  },
  {
    name: "invoice-generator",
    description:
      "Clean, responsive invoice generator built with React and Ant Design.",
    category: "fullstack",
    year: 2023,
    tags: ["react.js", "vite", "ant design"],
    href: "https://invoice-generator-theta-one.vercel.app/",
  },
  {
    name: "async-task-manager",
    description:
      "Django-based task manager with Celery and Redis for background processing.",
    category: "tools",
    year: 2022,
    tags: ["celery", "redis", "django"],
    href: "https://github.com/binaryash/taskmanager",
  },
  {
    name: "shopify-mern",
    description:
      "MERN application showcasing Shopify-like product catalog functionality.",
    category: "fullstack",
    year: 2022,
    tags: ["mongodb", "express.js", "react.js", "node.js"],
    href: "https://github.com/binaryash/shopify_product_showcase",
  },
];
