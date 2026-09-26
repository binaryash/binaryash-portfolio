import type { Metadata } from "next";
import TechGroup from "@/components/TechGroup";
import { BlurFade } from "@/components/ui/blur-fade";
import { tech } from "@/lib/tech";

export const metadata: Metadata = {
  title: "Tech",
  description: "Languages, frameworks and tools I've worked with.",
};

export default function TechPage() {
  return (
    <section className="mx-auto max-w-[760px] px-6 pt-32 pb-28 sm:pt-40">
      <BlurFade>
        <p className="font-mono text-xs text-dim">~/tech</p>
        <h1 className="mt-4 text-4xl font-normal tracking-[-0.03em] text-fg">What I work with</h1>
      </BlurFade>

      <div className="mt-14 space-y-12">
        {tech.map((group) => (
          <TechGroup key={group.category} category={group.category} items={group.items} />
        ))}
      </div>
    </section>
  );
}
