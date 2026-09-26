"use client";

import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import { ReactLenis } from "lenis/react";
import { useModKey } from "@/hooks/useModKey";
import { asciiInitials } from "@/lib/ascii";
import { site } from "@/lib/site";

const greeting = `\n${asciiInitials}\n`;

function useConsoleGreeting() {
  const mod = useModKey();

  useEffect(() => {
    console.log(
      `%c${greeting}%c\n${site.name} · ${site.tagline}\npress ${mod}K, or try g p · g b · t`,
      "color:#ff6b2c;font-family:monospace",
      "color:inherit;font-family:monospace",
    );
  }, [mod]);
}

export default function Providers({ children }: { children: React.ReactNode }) {
  useConsoleGreeting();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">
        <ReactLenis root options={{ lerp: 0.1 }}>
          {children}
        </ReactLenis>
      </MotionConfig>
    </ThemeProvider>
  );
}
