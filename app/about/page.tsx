import type { Metadata } from "next";
import DitheredAvatar from "@/components/DitheredAvatar";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { bio, closing, now, stats, timeline } from "@/lib/about";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-[580px] px-6 pt-32 pb-28 sm:pt-40">
      <BlurFade>
        <p className="font-mono text-xs text-dim">~/about</p>
        <div className="mt-8 flex items-center gap-5">
          <DitheredAvatar alt={`Dithered portrait of ${site.name}`} />
          <div>
            <h1 className="text-3xl font-normal tracking-[-0.03em] text-fg">{site.name}</h1>
            <p className="mt-1 font-mono text-xs text-dim">{site.role}</p>
          </div>
        </div>
      </BlurFade>

      <div className="mt-10 space-y-5 text-lg leading-[1.7] text-body">
        {bio.map((paragraph, i) => (
          <BlurFade key={i} delay={0.08 + i * 0.06} inView>
            <p>
              {paragraph.map((segment, j) =>
                typeof segment === "string" ? (
                  segment
                ) : "href" in segment ? (
                  <a
                    key={j}
                    href={segment.href}
                    className="text-brand underline decoration-1 underline-offset-[3px] hover:decoration-2"
                  >
                    {segment.text}
                  </a>
                ) : (
                  <strong key={j} className="font-semibold text-fg">
                    {segment.text}
                  </strong>
                ),
              )}
            </p>
          </BlurFade>
        ))}
      </div>

      <BlurFade inView className="mt-12">
        <h2 className="font-mono text-xs text-dim">$ now</h2>
        <dl className="mt-3 space-y-2 font-mono text-sm">
          {now.map((entry) => (
            <div key={entry.key} className="flex gap-4">
              <dt className="w-20 shrink-0 text-dim">{entry.key}</dt>
              <dd className="text-fg">{entry.value}</dd>
            </div>
          ))}
        </dl>
      </BlurFade>

      <BlurFade inView className="mt-12">
        <ul className="grid grid-cols-2 gap-y-6 border-y border-hairline py-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <li key={stat.label}>
              <span className="block text-4xl tracking-[-0.03em] text-fg">
                {stat.value === null ? (
                  "∞"
                ) : (
                  <NumberTicker value={stat.value} className="tracking-[-0.03em] text-fg dark:text-fg" />
                )}
              </span>
              <span className="mt-1 block font-mono text-xs text-dim">{stat.label}</span>
            </li>
          ))}
        </ul>
      </BlurFade>

      <BlurFade inView className="mt-12">
        <h2 className="font-mono text-xs text-dim">$ history</h2>
        <ol className="mt-3 border-t border-hairline">
          {timeline.map((item) => (
            <li key={item.year} className="flex gap-6 border-b border-hairline py-3">
              <span className="w-12 shrink-0 pt-0.5 font-mono text-xs text-dim tabular-nums">
                {item.year}
              </span>
              <span className="text-body">{item.text}</span>
            </li>
          ))}
        </ol>
      </BlurFade>

      <BlurFade inView className="mt-12">
        <p className="text-dim italic">{closing}</p>
      </BlurFade>
    </section>
  );
}
