"use client";

import dynamic from "next/dynamic";
import BlurText from "@/components/BlurText";
import ScrambleIn from "@/components/fancy/text/scramble-in";
import { useModKey } from "@/hooks/useModKey";
import { site } from "@/lib/site";

const HeroShader = dynamic(() => import("@/components/HeroShader"), { ssr: false });

export default function Hero() {
  const mod = useModKey();
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#ffc9a8_0%,transparent_55%),radial-gradient(ellipse_at_bottom_right,#d9ccff_0%,transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top_left,#ff6b2c55_0%,transparent_55%),radial-gradient(ellipse_at_bottom_right,#7c3aed55_0%,transparent_55%)]"
      />
      <HeroShader />

      <div className="relative w-full px-[clamp(24px,12%,160px)]">
        <h1 className="sr-only">{site.name}</h1>
        <div aria-hidden>
          <BlurText
            text={site.name}
            delay={120}
            animateBy="words"
            direction="bottom"
            className="text-[clamp(40px,6vw,96px)] leading-none font-normal tracking-[-0.04em] text-brand"
          />
        </div>
        <p className="mt-5 font-mono text-sm text-fg sm:text-base">
          <ScrambleIn text={site.tagline} scrambleSpeed={40} scrambledLetterCount={3} scrambledClassName="text-dim" />
          <span className="caret" aria-hidden>
            ▍
          </span>
        </p>
        <p className="mt-10 font-mono text-xs text-dim">
          <span className="hidden sm:inline">press {mod}K to explore</span>
          <span className="sm:hidden">tap {mod}K ↗</span>
        </p>
      </div>
    </section>
  );
}
