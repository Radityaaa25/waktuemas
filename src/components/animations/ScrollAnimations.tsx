"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { useScrollStore } from "@/lib/scrollStore";

function formatCount(
  value: number,
  prefix: string,
  suffix: string,
  decimals: number,
): string {
  return `${prefix}${value.toFixed(decimals).replace(".", ",")}${suffix}`;
}

function setupCountUp(element: HTMLElement): void {
  const target = Number(element.dataset.count);
  if (!Number.isFinite(target)) return;

  const decimals = Number(element.dataset.countDecimals ?? 0);
  const prefix = element.dataset.countPrefix ?? "";
  const suffix = element.dataset.countSuffix ?? "";

  ScrollTrigger.create({
    trigger: element,
    start: "top 92%",
    end: "top 58%",
    scrub: 0.4,
    onUpdate: (self) => {
      element.textContent = formatCount(
        target * self.progress,
        prefix,
        suffix,
        decimals,
      );
    },
    onLeave: () => {
      element.textContent = formatCount(target, prefix, suffix, decimals);
    },
    onLeaveBack: () => {
      element.textContent = formatCount(0, prefix, suffix, decimals);
    },
  });
}

export function ScrollAnimations({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLElement>(null);
  const reducedMotion = useScrollStore((state) => state.reducedMotion);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || reducedMotion) return;

      const select = <T extends Element>(selector: string): T[] =>
        Array.from(root.querySelectorAll<T>(selector));

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const conditions = context.conditions as {
            isMobile?: boolean;
            isDesktop?: boolean;
          };
          const isMobile = Boolean(conditions.isMobile);

          const hero = select<HTMLElement>("[data-hero]")[0];
          if (hero) {
            const intro = gsap.timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                toggleActions: "play none none reverse",
              },
            });

            intro
              .from("[data-hero-eyebrow]", { y: -24, opacity: 0, duration: 0.5 }, 0)
              .from(
                "[data-hero-line]",
                { yPercent: -110, opacity: 0, stagger: 0.1, duration: 0.85 },
                0.05,
              )
              .from("[data-hero-hook]", { y: 26, opacity: 0, duration: 0.6 }, 0.35)
              .from("[data-hero-lead]", { y: 26, opacity: 0, duration: 0.6 }, 0.45)
              .from("[data-hero-cta]", { y: 22, opacity: 0, duration: 0.5 }, 0.55)
              .from(
                "[data-hero-monitor]",
                {
                  x: isMobile ? 0 : 60,
                  y: isMobile ? 36 : 0,
                  opacity: 0,
                  duration: 0.7,
                },
                0.4,
              );

            intro.play();

            gsap.to("[data-hero-monitor]", {
              y: isMobile ? 28 : 64,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
              },
            });

            gsap.fromTo(
              "[data-hero-glow]",
              { opacity: 0.55, scale: 1 },
              {
                opacity: 1,
                scale: 1.06,
                ease: "none",
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.8,
                },
              },
            );

            select<SVGPathElement>(
              "[data-hero-ecg] [data-ecg-path]",
            ).forEach((path) => {
              gsap.fromTo(
                path,
                { strokeDasharray: 1, strokeDashoffset: 1 },
                {
                  strokeDashoffset: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "bottom 40%",
                    scrub: 0.6,
                  },
                },
              );
            });
          }

          const splits: SplitText[] = [];
          select<HTMLElement>("[data-section-title]").forEach((element) => {
            const split = SplitText.create(element, {
              type: "words",
              autoSplit: true,
              onSplit(self) {
                return gsap.from(self.words, {
                  yPercent: 120,
                  opacity: 0,
                  stagger: 0.035,
                  ease: "none",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    end: "top 55%",
                    scrub: 0.6,
                  },
                });
              },
            });
            splits.push(split);
          });

          select<HTMLElement>("[data-animate]").forEach((card) => {
            const direction = card.dataset.animate ?? "";
            const vars: gsap.TweenVars = {
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                end: "top 62%",
                scrub: 0.6,
              },
            };

            if (direction.includes("left")) vars.x = isMobile ? -70 : -140;
            if (direction.includes("right")) vars.x = isMobile ? 70 : 140;
            if (direction.includes("up")) vars.y = isMobile ? -80 : -120;
            if (direction.includes("down")) vars.y = isMobile ? 80 : 120;

            gsap.from(card, vars);
          });

          select<HTMLElement>("[data-count]").forEach(setupCountUp);

          const chartLine = select<SVGPathElement>("[data-chart-line]")[0];
          if (chartLine) {
            const figure = chartLine.closest("figure") ?? chartLine;
            gsap.fromTo(
              chartLine,
              { strokeDashoffset: 1 },
              {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: figure,
                  start: "top 82%",
                  end: "top 45%",
                  scrub: 0.7,
                },
              },
            );

            const area = select<SVGPathElement>("[data-chart-area]")[0];
            if (area) {
              gsap.from(area, {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: figure,
                  start: "top 82%",
                  end: "top 55%",
                  scrub: 0.7,
                },
              });
            }
          }

          const useCase = select<HTMLElement>("#use-case")[0];
          if (useCase) {
            const offsets: Record<string, number> = {
              back: isMobile ? 18 : 30,
              mid: isMobile ? -14 : -24,
              people: isMobile ? -36 : -60,
              front: isMobile ? -60 : -100,
            };

            select<SVGGElement>("[data-scene-layer]").forEach((layer) => {
              const offset = offsets[layer.dataset.sceneLayer ?? ""] ?? 0;
              gsap.to(layer, {
                y: offset,
                ease: "none",
                scrollTrigger: {
                  trigger: useCase,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.9,
                },
              });
            });

            gsap.from("[data-use-case-copy]", {
              x: isMobile ? 60 : 140,
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-use-case-copy]",
                start: "top 90%",
                end: "top 55%",
                scrub: 0.7,
              },
            });

            const sceneWrap = select<HTMLElement>("[data-scene-wrap]")[0];
            if (sceneWrap) {
              gsap.fromTo(
                sceneWrap,
                {
                  scale: 1,
                  clipPath: "inset(0% round 24px)",
                },
                {
                  scale: 1.12,
                  clipPath: "inset(4% round 32px)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: sceneWrap,
                    start: "top 85%",
                    end: "bottom 25%",
                    scrub: 0.9,
                  },
                },
              );
            }

            const shade = select<HTMLElement>("[data-usecase-shade]")[0];
            if (shade) {
              gsap.fromTo(
                shade,
                { opacity: 0 },
                {
                  opacity: 0.5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: useCase,
                    start: "top 60%",
                    end: "bottom 30%",
                    scrub: 0.8,
                  },
                },
              );
            }
          }

          select<HTMLElement>("[data-five-step]").forEach((step) => {
            gsap.from(step, {
              y: isMobile ? 50 : 80,
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: step,
                start: "top 94%",
                end: "top 72%",
                scrub: 0.5,
              },
            });
          });

          select<HTMLElement>("[data-chain-node]").forEach((node, index) => {
            const fromLeft = index % 2 === 0;
            gsap.from(node, {
              x: isMobile ? 0 : fromLeft ? -70 : 70,
              y: isMobile ? 40 : 0,
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: node,
                start: "top 95%",
                end: "top 70%",
                scrub: 0.5,
              },
            });
          });

          if (isMobile) {
            const chainInner = select<HTMLElement>("[data-chain-inner]")[0];
            const chainTrack = chainInner?.parentElement;
            if (chainInner && chainTrack) {
              gsap.fromTo(
                chainInner,
                { x: 0 },
                {
                  x: -120,
                  ease: "none",
                  scrollTrigger: {
                    trigger: chainTrack,
                    start: "top 85%",
                    end: "bottom 45%",
                    scrub: 0.8,
                  },
                },
              );
            }
          }

          select<HTMLElement>("[data-action-card]").forEach((card) => {
            gsap.from(card, {
              y: 70,
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 95%",
                end: "top 72%",
                scrub: 0.5,
              },
            });
          });

          select<HTMLElement>("[data-ref-card]").forEach((card) => {
            gsap.from(card, {
              y: isMobile ? 70 : 120,
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 96%",
                end: "top 82%",
                scrub: 0.5,
              },
            });
          });

          return () => {
            splits.forEach((split) => split.revert());
          };
        },
      );

      return () => mm.revert();
    },
    { scope, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <main ref={scope} id="konten-utama" tabIndex={-1}>
      {children}
    </main>
  );
}
