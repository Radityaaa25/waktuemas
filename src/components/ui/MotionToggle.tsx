"use client";

import { Zap, ZapOff } from "lucide-react";
import { a11y, ui } from "@/data/content";
import { useScrollStore } from "@/lib/scrollStore";

export function MotionToggle({
  className,
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
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
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors ${
        inverted
          ? "border-white/15 text-white/80 hover:border-white/30 hover:bg-white/10"
          : "border-border text-text hover:border-border-strong hover:bg-text/5"
      } ${className ?? ""}`}
    >
      {reducedMotion ? (
        <ZapOff aria-hidden="true" className="size-4 text-warn" />
      ) : (
        <Zap
          aria-hidden="true"
          className={`size-4 ${inverted ? "text-white/60" : "text-muted"}`}
        />
      )}
      {inverted ? (
        <span>{ui.header.motionShort}</span>
      ) : (
        <>
          <span className="hidden lg:inline">
            {reducedMotion ? a11y.reducedMotionOn : a11y.reducedMotionOff}
          </span>
          <span className="lg:hidden">{ui.header.motionShort}</span>
        </>
      )}
    </button>
  );
}
