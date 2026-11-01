"use client";

import { Zap, ZapOff } from "lucide-react";
import { a11y, ui } from "@/data/content";
import { useScrollStore } from "@/lib/scrollStore";

export function MotionToggle({ className }: { className?: string }) {
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
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-xs font-medium text-text transition-colors hover:border-white/30 hover:bg-white/5 ${className ?? ""}`}
    >
      {reducedMotion ? (
        <ZapOff aria-hidden="true" className="size-4 text-warn" />
      ) : (
        <Zap aria-hidden="true" className="size-4 text-muted" />
      )}
      <span className="hidden lg:inline">
        {reducedMotion ? a11y.reducedMotionOn : a11y.reducedMotionOff}
      </span>
      <span className="lg:hidden">{ui.header.motionShort}</span>
    </button>
  );
}
