"use client";

import { Zap, ZapOff } from "lucide-react";
import { a11y } from "@/data/content";
import { useScrollStore } from "@/lib/scrollStore";

export function MotionToggle({ className = "" }: { className?: string }) {
  const reducedMotion = useScrollStore((state) => state.reducedMotion);
  const toggleReducedMotion = useScrollStore(
    (state) => state.toggleReducedMotion,
  );

  return (
    <button
      type="button"
      onClick={toggleReducedMotion}
      aria-pressed={reducedMotion}
      title={a11y.reducedMotionHint}
      className={`fixed top-4 right-4 z-50 inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-[var(--ink)] bg-[var(--paper)] px-3.5 py-1.5 text-xs font-bold text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0 ${className}`}
    >
      {reducedMotion ? (
        <ZapOff aria-hidden="true" className="size-4 text-[var(--coral)]" />
      ) : (
        <Zap aria-hidden="true" className="size-4 text-[var(--ink)]" />
      )}
      <span className="hidden sm:inline">
        {reducedMotion ? "Animasi: Mati" : "Kurangi animasi"}
      </span>
    </button>
  );
}
