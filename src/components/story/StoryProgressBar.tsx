"use client";

import { useRef } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

export function StoryProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = barRef.current;
    if (!bar) return;

    ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        bar.style.transform = `scaleX(${self.progress})`;
      },
    });
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-50 h-1 bg-[var(--ink)]/10"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-[var(--coral)] transition-transform duration-75"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
