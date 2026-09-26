import type { Metadata } from "next";
import ProjectList from "@/components/ProjectList";
import { BlurFade } from "@/components/ui/blur-fade";

export const metadata: Metadata = {
  title: "Projects",
  description: "End-to-end intelligent systems across AI/ML, full-stack, embedded and Web3.",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-[760px] px-6 pt-32 pb-28 sm:pt-40">
      <BlurFade>
        <p className="font-mono text-xs text-dim">~/projects</p>
        <h1 className="mt-4 text-4xl font-normal tracking-[-0.03em] text-fg">Things I&apos;ve built</h1>
        <p className="mt-3 max-w-md text-body">
          End-to-end intelligent systems across AI/ML, full-stack, embedded and Web3.
        </p>
      </BlurFade>

      <div className="mt-10">
        <ProjectList />
      </div>
    </section>
  );
}
