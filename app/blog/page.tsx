import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { BlurFade } from "@/components/ui/blur-fade";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on GenAI, Web3, TUI tooling and full-stack engineering.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-[760px] px-6 pt-32 pb-28 sm:pt-40">
      <BlurFade>
        <p className="font-mono text-xs text-dim">~/blog</p>
        <h1 className="mt-4 text-4xl font-normal tracking-[-0.03em] text-fg">Writing</h1>
        <p className="mt-3 max-w-md text-body">
          Notes on GenAI, Web3, TUI tooling and full-stack engineering.
        </p>
      </BlurFade>

      <div className="mt-12">
        <BlogList posts={posts} />
      </div>
    </section>
  );
}
