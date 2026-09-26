"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

function getModKey(): "⌘" | "Ctrl" {
  if (typeof navigator === "undefined") return "Ctrl";

  const ua = navigator.userAgent;
  return /mac|iphone|ipad|ipod/i.test(ua) ? "⌘" : "Ctrl";
}

export function useModKey(): "⌘" | "Ctrl" {
  return useSyncExternalStore(subscribe, getModKey, () => "Ctrl");
}
