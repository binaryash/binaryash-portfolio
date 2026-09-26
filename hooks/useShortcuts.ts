"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";

interface ShortcutOptions {
  onPalette: () => void;
  onToggleTheme: () => void;
}

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

export function useShortcuts({ onPalette, onToggleTheme }: ShortcutOptions) {
  const router = useRouter();
  const pendingG = useRef<number | null>(null);

  useEffect(() => {
    const clearPending = () => {
      if (pendingG.current !== null) window.clearTimeout(pendingG.current);
      pendingG.current = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onPalette();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;

      if (pendingG.current !== null) {
        const item = site.nav.find((n) => n.key === e.key);
        clearPending();
        if (item) {
          e.preventDefault();
          router.push(item.href);
        }
        return;
      }

      if (e.key === "g") {
        pendingG.current = window.setTimeout(clearPending, 800);
      } else if (e.key === "t") {
        onToggleTheme();
      } else if (e.key === "/") {
        e.preventDefault();
        onPalette();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearPending();
    };
  }, [router, onPalette, onToggleTheme]);
}
