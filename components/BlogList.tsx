import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import type { PostMeta } from "@/lib/mdx";

export default function BlogList({ posts }: { posts: PostMeta[] }) {
  return (
    <ul className="border-t border-hairline">
      {posts.map((post, index) => (
        <li key={post.slug} className="border-b border-hairline">
          <BlurFade delay={0.1 + index * 0.06}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <time
                dateTime={post.date}
                className="shrink-0 font-mono text-xs text-dim tabular-nums"
              >
                {post.dateLabel}
              </time>
              <span className="flex-1 text-xl leading-snug tracking-[-0.01em] text-fg transition-colors group-hover:text-brand">
                {post.title}
              </span>
              <span className="shrink-0 font-mono text-xs text-dim">
                {post.readingMinutes} min
              </span>
            </Link>
          </BlurFade>
        </li>
      ))}
    </ul>
  );
}
