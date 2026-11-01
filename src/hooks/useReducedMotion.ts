"use client";

import { useScrollStore } from "@/lib/scrollStore";

export function useReducedMotion(): boolean {
  return useScrollStore((state) => state.reducedMotion);
}
