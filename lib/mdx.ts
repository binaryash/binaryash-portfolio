import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { MDXComponents } from "mdx/types";
import MdxPre from "@/components/MdxPre";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  excerpt: string;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  content: string;
}

function formatDateLabel(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year ?? 0, (month ?? 1) - 1, day ?? 1));
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readPost(slug: string): { meta: PostMeta; content: string } {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title,
      date: data.date,
      dateLabel: formatDateLabel(data.date),
      excerpt: data.excerpt,
      readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    },
    content,
  };
}

export function getPostBySlug(slug: string): Post {
  const { meta, content } = readPost(slug);
  return { ...meta, content };
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => readPost(slug).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

interface MdastNode {
  type: string;
  meta?: string | null;
  data?: { hProperties?: Record<string, unknown> };
  children?: MdastNode[];
}

export function remarkCodeMeta() {
  const walk = (node: MdastNode) => {
    if (node.type === "code" && node.meta) {
      node.data = {
        ...node.data,
        hProperties: { ...node.data?.hProperties, "data-meta": node.meta },
      };
    }
    node.children?.forEach(walk);
  };
  return walk;
}

export const mdxComponents: MDXComponents = {
  pre: MdxPre,
};
