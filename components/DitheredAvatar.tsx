"use client";

import { useTheme } from "next-themes";
import { ImageDithering } from "@paper-design/shaders-react";
import { useMounted } from "@/hooks/useMounted";

const palettes = {
  dark: { colorFront: "#ff6b2c", colorBack: "#0a0a0a" },
  light: { colorFront: "#e2530a", colorBack: "#fafaf7" },
};

export default function DitheredAvatar({ alt }: { alt: string }) {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const palette = palettes[resolvedTheme === "dark" ? "dark" : "light"];

  return (
    <div
      role="img"
      aria-label={alt}
      className="size-24 overflow-hidden rounded-full border border-hairline bg-muted"
    >
      {mounted && (
        <ImageDithering
          image="/avatar.png"
          {...palette}
          type="4x4"
          size={2}
          colorSteps={2}
          fit="cover"
          minPixelRatio={1}
          className="size-full"
        />
      )}
    </div>
  );
}
