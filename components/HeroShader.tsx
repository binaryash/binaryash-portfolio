"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "motion/react";
import { GrainGradient } from "@paper-design/shaders-react";

const palettes = {
  dark: { colorBack: "#0a0a0a", colors: ["#ff6b2c", "#7c3aed", "#1a0f0a"] },
  light: { colorBack: "#fafaf7", colors: ["#ffc9a8", "#d9ccff", "#fafaf7"] },
};

export default function HeroShader() {
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const palette = palettes[resolvedTheme === "dark" ? "dark" : "light"];

  return (
    <div ref={ref} className="absolute inset-0">
      <GrainGradient
        className="size-full"
        {...palette}
        shape="corners"
        softness={0.8}
        intensity={0.3}
        noise={0.35}
        speed={reduceMotion || !visible ? 0 : 0.15}
        minPixelRatio={1}
        maxPixelCount={1_500_000}
      />
    </div>
  );
}
