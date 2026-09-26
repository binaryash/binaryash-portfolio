import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { getAllSlugs, getPostBySlug, mdxComponents, remarkCodeMeta } from "@/lib/mdx";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) notFound();
  const post = getPostBySlug(slug);

  return (
    <>
      <ScrollProgress className="h-px bg-brand bg-none" />
      <article className="mx-auto max-w-[640px] px-6 pt-32 pb-28 sm:pt-40">
        <Link
          href="/blog"
          className="font-mono text-xs text-dim transition-colors hover:text-brand"
        >
          ← cd ..
        </Link>

        <header className="mt-10">
          <p className="font-mono text-xs text-dim">
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span className="mx-2">·</span>
            {post.readingMinutes} min read
          </p>
          <h1 className="mt-4 text-[clamp(32px,5vw,48px)] leading-[1.1] font-normal tracking-[-0.03em] text-fg">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-dim italic">{post.excerpt}</p>
        </header>

        <div className="prose-post mt-12">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkCodeMeta] } }}
          />
        </div>
      </article>
    </>
  );
}
