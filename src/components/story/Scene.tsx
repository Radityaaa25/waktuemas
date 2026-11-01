"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useScrollStore } from "@/lib/scrollStore";
import type { SceneBuildFn } from "@/lib/sceneTimeline";
import type { AmbientController } from "@/lib/ambient";

interface SceneProps {
  id: string;
  bg?: string;
  length?: string; // misalnya "+=250%", default "+=300%"
  build?: SceneBuildFn;
  ambientSetup?: (stage: HTMLElement) => AmbientController | void;
  children: ReactNode;
  className?: string;
}

export function Scene({
  id,
  bg = "var(--paper)",
  length = "+=300%",
  build,
  ambientSetup,
  children,
  className = "",
}: SceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useScrollStore((state) => state.reducedMotion);

  useGSAP(
    () => {
      const container = containerRef.current;
      const stage = stageRef.current;
      if (!container || !stage || reducedMotion) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const isMobile = Boolean(context.conditions?.isMobile);

          // Siapkan controller ambient loop jika disediakan
          let ambientCtrl: AmbientController | void = undefined;
          if (ambientSetup) {
            ambientCtrl = ambientSetup(stage);
          }

          // Timeline utama diikat ke ScrollTrigger dengan pin
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: container,
              pin: stage,
              start: "top top",
              end: length,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onToggle: (self) => {
                if (ambientCtrl) {
                  if (self.isActive) ambientCtrl.play();
                  else ambientCtrl.pause();
                }
              },
            },
          });

          if (build) {
            build(tl, { container: stage, isMobile });
          }

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
            if (ambientCtrl) ambientCtrl.kill();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [reducedMotion, length], revertOnUpdate: true },
  );

  return (
    <section
      ref={containerRef}
      id={id}
      className={`relative w-full ${className}`}
      style={{ backgroundColor: bg }}
    >
      <div
        ref={stageRef}
        className="relative flex h-svh w-full items-center justify-center overflow-hidden"
        style={{ backgroundColor: bg }}
      >
        {children}
      </div>
    </section>
  );
}
