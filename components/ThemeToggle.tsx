"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useMounted } from "@/hooks/useMounted";

const TOGGLE_SELECTOR = "[data-theme-toggle]";

export function useToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  return useCallback(() => {
    const button = document.querySelector<HTMLButtonElement>(TOGGLE_SELECTOR);
    if (button) button.click();
    else setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);
}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const className =
    "grid size-8 place-items-center rounded-full text-dim transition-colors hover:text-fg [&_svg]:size-4";

  if (!mounted) return <span aria-hidden className={className} />;

  return (
    <AnimatedThemeToggler
      data-theme-toggle
      className={className}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onThemeChange={setTheme}
      duration={450}
      aria-label="Toggle theme"
    />
  );
}
