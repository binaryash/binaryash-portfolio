"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useReducedMotion } from "motion/react";
import { Dithering } from "@paper-design/shaders-react";
import { useMounted } from "@/hooks/useMounted";
const palettes = {
  dark: { colorBack: "#0a0a0a", colorFront: "#ff6b2c33" },
  light: { colorBack: "#fafaf7", colorFront: "#e2530a26" },
};

export default function NotFoundView() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();
  const palette = palettes[resolvedTheme === "dark" ? "dark" : "light"];

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden">
      {mounted && (
        <Dithering
          {...palette}
          shape="warp"
          type="4x4"
          size={2}
          speed={reduceMotion ? 0 : 0.3}
          minPixelRatio={1}
          maxPixelCount={1_500_000}
          className="absolute inset-0"
        />
      )}
      <div className="relative px-[clamp(24px,12%,160px)] font-mono text-sm">
        <p className="text-dim">404</p>
        <p className="mt-4 text-fg">
          <span className="text-brand">zsh:</span> command not found: {pathname}
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-dim transition-colors hover:text-brand"
        >
          ← cd ~
        </Link>
      </div>
    </section>
  );
}
