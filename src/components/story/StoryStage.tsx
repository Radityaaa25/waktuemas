"use client";

import { useCallback, useRef, type CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { storyMeta, scenes, beats, type Direction, type SceneId } from "@/data/story";
import { sceneVisuals } from "@/components/story/SceneVisuals";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { getLenis } from "@/lib/lenis";
import { useScrollStore } from "@/lib/scrollStore";

const SCENE_ORDER = scenes.map((scene) => scene.id);

const OFFSET: Record<Direction, { x: number; y: number; scale: number }> = {
  up: { x: 0, y: -70, scale: 1 },
  down: { x: 0, y: 70, scale: 1 },
  left: { x: -90, y: 0, scale: 1 },
  right: { x: 90, y: 0, scale: 1 },
  scale: { x: 0, y: 24, scale: 0.86 },
};

function opposite(direction: Direction): Direction {
  if (direction === "up") return "down";
  if (direction === "down") return "up";
  if (direction === "left") return "right";
  if (direction === "right") return "left";
  return "scale";
}

function lineDirections(base: Direction): Direction[] {
  const second = opposite(base);
  const third: Direction =
    base === "up" || base === "down" ? "left" : "up";
  return [base, second, third];
}

function StoryHud() {
  const activeScene = useScrollStore((state) => state.activeScene);
  const sceneIndex = SCENE_ORDER.indexOf(activeScene);
  const scene = scenes[sceneIndex] ?? scenes[0]!;

  return (
    <div className="flex items-center gap-3">
      <span className="numeric text-[0.6875rem] text-white/45">
        {(sceneIndex + 1).toString().padStart(2, "0")} /{" "}
        {scenes.length.toString().padStart(2, "0")}
      </span>
      <span className="hidden font-mono text-[0.5625rem] tracking-[0.18em] text-white/35 uppercase sm:inline">
        {scene.label}
      </span>
    </div>
  );
}

function SceneNav({ onJump }: { onJump: (index: number) => void }) {
  const activeScene = useScrollStore((state) => state.activeScene);
  const activeIndex = SCENE_ORDER.indexOf(activeScene);

  return (
    <nav
      aria-label="Bagian cerita"
      className="absolute right-4 bottom-16 z-40 hidden flex-col items-end gap-2 sm:right-6 lg:top-1/2 lg:bottom-auto lg:flex lg:-translate-y-1/2"
    >
      {scenes.map((scene, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={scene.id}
            type="button"
            onClick={() => onJump(index)}
            aria-current={active ? "step" : undefined}
            aria-label={`Bagian ${index + 1}: ${scene.label}`}
            className="group flex min-h-7 items-center gap-2"
          >
            <span
              className={`hidden font-mono text-[0.5625rem] tracking-[0.14em] uppercase transition-opacity lg:block ${
                active
                  ? "text-white/80"
                  : "text-white/0 group-hover:text-white/45"
              }`}
            >
              {scene.label}
            </span>
            <span
              className={`block h-1.5 rounded-full transition-all ${
                active
                  ? "w-8 bg-[#5eead4]"
                  : "w-2.5 bg-white/25 group-hover:bg-white/50"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}

function StoryHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
      <a
        href="#konten-utama"
        className="flex min-h-11 items-center gap-2.5 text-white"
        aria-label="4 Menit Emas — kembali ke awal"
      >
        <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
          <rect
            width="32"
            height="32"
            rx="9"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.18)"
          />
          <path
            d="M4 18h5l2-5 3 11 3-14 2.5 8H28"
            fill="none"
            stroke="#5eead4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-display text-base font-semibold tracking-tight whitespace-nowrap sm:text-lg">
          {storyMeta.title}
        </span>
      </a>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <StoryHud />
        </div>
        <MotionToggle inverted />
      </div>
    </header>
  );
}

function copyLayer(index: number) {
  const beat = beats[index];
  if (!beat) return [];

  return [
    <div
      key="kicker"
      data-copy-kicker
      className="flex flex-wrap items-center gap-3"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono text-[0.5625rem] tracking-[0.2em] text-white/60 uppercase backdrop-blur-sm">
        <span className="size-1.5 rounded-full bg-current" />
        {beat.time}
      </span>
      <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-white/35 uppercase">
        {scenes.find((scene) => scene.id === beat.scene)?.kicker}
      </span>
    </div>,
    <h2
      key="headline"
      data-copy-headline
      className="mt-4 max-w-[18ch] text-[clamp(2.1rem,6.2vw,4.6rem)] leading-[0.98] font-semibold tracking-[-0.03em] text-balance text-white"
    >
      {beat.line}
    </h2>,
    beat.aside ? (
      <p
        key="aside"
        data-copy-aside
        className="mt-4 max-w-[34ch] text-sm leading-relaxed text-white/55 sm:text-base"
      >
        {beat.aside}
      </p>
    ) : null,
  ];
}

export function StoryStage() {
  const reducedMotion = useScrollStore((state) => state.reducedMotion);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;

      const copyEls = gsap.utils.toArray<HTMLElement>("[data-beat-copy]");
      const sceneEls = gsap.utils.toArray<HTMLElement>("[data-scene-layer]");
      const sceneMap = new Map<SceneId, HTMLElement>();
      sceneEls.forEach((element) => {
        const id = element.dataset.sceneLayer as SceneId | undefined;
        if (id) sceneMap.set(id, element);
      });

      gsap.set(copyEls, { autoAlpha: 0 });
      gsap.set(sceneEls, { autoAlpha: 0 });
      if (sceneEls[0]) gsap.set(sceneEls[0], { autoAlpha: 1 });

      let activeIndex = -1;
      let activeScene: SceneId | null = null;
      const sceneTimelines = new Map<SceneId, gsap.core.Timeline>();

      const beatInScene = (scene: SceneId, index: number) => {
        const list = beats.filter((beat) => beat.scene === scene);
        return Math.max(0, Math.min(list.length - 1, index));
      };

      const sceneIndex = (scene: SceneId) => {
        const list = beats.filter((beat) => beat.scene === scene);
        const first = beats.findIndex((beat) => beat.scene === scene);
        return { first, count: list.length };
      };

      const activateScene = (id: SceneId, previous: SceneId | null) => {
        if (previous && previous !== id) {
          const oldEl = sceneMap.get(previous);
          if (oldEl) {
            gsap.to(oldEl, {
              autoAlpha: 0,
              scale: 1.03,
              duration: 0.35,
              ease: "power2.in",
              overwrite: true,
            });
          }
        }

        const nextEl = sceneMap.get(id);
        if (!nextEl) return;

        const direction =
          beats.find((beat) => beat.scene === id)?.motion.from ?? "scale";
        const offset = OFFSET[direction];

        gsap.killTweensOf(nextEl);
        gsap.fromTo(
          nextEl,
          {
            autoAlpha: 0,
            x: offset.x * 0.8,
            y: offset.y * 0.8,
            scale: 0.98,
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          },
        );

        const timeline = sceneTimelines.get(id);
        timeline?.restart();
      };

      const enterCopy = (index: number) => {
        const element = copyEls[index];
        const beat = beats[index];
        if (!element || !beat) return;

        const kicker = element.querySelector("[data-copy-kicker]");
        const headline = element.querySelector("[data-copy-headline]");
        const aside = element.querySelector("[data-copy-aside]");
        const parts = [kicker, headline, aside].filter(
          (part): part is HTMLElement => part instanceof HTMLElement,
        );
        const directions = lineDirections(beat.motion.from);

        gsap.killTweensOf([element, ...parts]);
        gsap.set(element, { autoAlpha: 1, x: 0, y: 0 });
        parts.forEach((part, partIndex) => {
          const direction = directions[partIndex] ?? beat.motion.from;
          gsap.set(part, {
            autoAlpha: 0,
            x: OFFSET[direction].x,
            y: OFFSET[direction].y,
            scale: OFFSET[direction].scale,
          });
          gsap.to(part, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.62,
            delay: 0.06 + partIndex * 0.08,
            ease: "power3.out",
          });
        });
      };

      const exitCopy = (index: number, direction: Direction) => {
        const element = copyEls[index];
        if (!element) return;

        gsap.killTweensOf(
          element.querySelectorAll(
            "[data-copy-kicker], [data-copy-headline], [data-copy-aside]",
          ),
        );
        gsap.to(element, {
          autoAlpha: 0,
          x: OFFSET[direction].x * 0.5,
          y: OFFSET[direction].y * 0.5,
          duration: 0.32,
          ease: "power2.in",
          overwrite: true,
        });
      };

      const shift = (index: number, instant = false) => {
        if (index === activeIndex) return;
        const beat = beats[index];
        if (!beat) return;

        const previousIndex = activeIndex;
        const previousBeat = beats[previousIndex];

        if (previousIndex >= 0 && previousBeat && !instant) {
          exitCopy(previousIndex, previousBeat.motion.from);
        }

        if (instant) {
          copyEls.forEach((element, elementIndex) => {
            gsap.set(element, { autoAlpha: elementIndex === index ? 1 : 0 });
          });
        } else {
          enterCopy(index);
        }

        const nextScene = beat.scene;
        const previousScene = previousBeat?.scene ?? null;
        if (nextScene !== activeScene) {
          activateScene(nextScene, previousScene);
          activeScene = nextScene;
        }

        const meta = sceneIndex(nextScene);
        const local = meta.count > 1 ? (index - meta.first) / (meta.count - 1) : 0;
        useScrollStore
          .getState()
          .setScene(nextScene, beatInScene(nextScene, local), 0);

        reactToBeat(index);
        activeIndex = index;
      };

      const reactToBeat = (index: number) => {
        const beat = beats[index];
        if (!beat) return;
        const first = beats.findIndex((item) => item.scene === beat.scene);
        const localIndex = index - first;

        if (beat.scene === "respond") {
          const element = sceneMap.get("respond");
          if (!element) return;
          const steps = Array.from(
            element.querySelectorAll<SVGElement>('[data-anim="respond-step"]'),
          );
          steps.forEach((step, stepIndex) => {
            gsap.to(step, {
              autoAlpha: stepIndex <= localIndex ? 1 : 0.25,
              scale: stepIndex === localIndex ? 1.08 : 1,
              transformOrigin: "50% 50%",
              duration: 0.4,
              ease: "power2.out",
              overwrite: true,
            });
          });
          const hands = element.querySelector('[data-anim="respond-hands"]');
          if (hands && localIndex >= 2) {
            gsap.fromTo(
              hands,
              { y: -8 },
              { y: 0, duration: 0.5, ease: "bounce.out", overwrite: true },
            );
          }
        }

        if (beat.scene === "opening" && localIndex === 1) {
          const element = sceneMap.get("opening");
          const clock = element?.querySelector('[data-anim="opening-time"]');
          if (clock) {
            gsap.fromTo(
              clock,
              { scale: 0.96, transformOrigin: "50% 50%" },
              { scale: 1, duration: 0.6, ease: "power2.out", overwrite: true },
            );
          }
        }

        if (beat.scene === "decline" && localIndex === 1) {
          const element = sceneMap.get("decline");
          const line = element?.querySelector('[data-anim="decline-line"]');
          if (line) {
            gsap.fromTo(
              line,
              { opacity: 0.35 },
              { opacity: 1, duration: 0.6, ease: "power2.out" },
            );
          }
        }
      };

      const buildSceneTimeline = (id: SceneId) => {
        const element = sceneMap.get(id);
        if (!element) return undefined;

        const select = (name: string) =>
          element.querySelector<SVGElement>(`[data-anim="${name}"]`);
        const selectAll = (name: string) =>
          Array.from(
            element.querySelectorAll<SVGElement>(`[data-anim="${name}"]`),
          );

        const tl = gsap.timeline({ paused: true });

        if (id === "opening") {
          const ring = select("opening-ring");
          const ecg = select("opening-ecg");
          const time = select("opening-time");
          if (ring) {
            tl.fromTo(
              ring,
              { strokeDashoffset: 1 },
              { strokeDashoffset: 0.04, duration: 1.5, ease: "power2.out" },
              0,
            );
          }
          if (ecg) {
            tl.fromTo(
              ecg,
              { strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 1.35, ease: "power2.out" },
              0.1,
            );
          }
          if (time) {
            tl.fromTo(
              time,
              { scale: 0.9, autoAlpha: 0, transformOrigin: "50% 50%" },
              { scale: 1, autoAlpha: 1, duration: 0.8, ease: "power2.out" },
              0.2,
            );
          }
        }

        if (id === "collapse") {
          const lit = selectAll("collapse-person").filter(
            (node) => node.closest("[data-lit]") !== null,
          );
          const fallen = select("collapse-fallen");
          const number = select("collapse-number");
          if (lit.length) {
            tl.fromTo(
              lit,
              { scale: 0.6, autoAlpha: 0, transformOrigin: "50% 100%" },
              {
                scale: 1,
                autoAlpha: 1,
                duration: 0.5,
                stagger: 0.09,
                ease: "back.out(1.6)",
              },
              0,
            );
          }
          if (fallen) {
            tl.fromTo(
              fallen,
              { y: 40, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out" },
              0.15,
            );
          }
          if (number) {
            const counter = { value: 0 };
            tl.call(
              () => {
                number.textContent = "0%";
              },
              [],
              0.25,
            );
            tl.to(
              counter,
              {
                value: 41.7,
                duration: 1,
                ease: "power1.out",
                onUpdate: () => {
                  number.textContent = `${counter.value
                    .toFixed(1)
                    .replace(".", ",")}%`;
                },
              },
              0.3,
            );
          }
        }

        if (id === "hesitate") {
          const hands = select("hesitate-hands");
          const fallen = select("hesitate-fallen");
          if (fallen) {
            tl.fromTo(
              fallen,
              { autoAlpha: 0, scale: 0.94, transformOrigin: "50% 100%" },
              { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" },
              0,
            );
          }
          if (hands) {
            tl.fromTo(
              hands,
              { autoAlpha: 0, rotation: -12, transformOrigin: "50% 50%" },
              { autoAlpha: 1, rotation: 0, duration: 0.8, ease: "power2.out" },
              0.15,
            );
          }
        }

        if (id === "decline") {
          const line = select("decline-line");
          const area = select("decline-area");
          if (line) {
            tl.fromTo(
              line,
              { strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" },
              0,
            );
          }
          if (area) {
            tl.fromTo(
              area,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 1, ease: "power1.out" },
              0.35,
            );
          }
        }

        if (id === "rewind") {
          const bands = selectAll("rewind-band");
          const arc = select("rewind-arc");
          const arrow = select("rewind-arrow");
          if (bands.length) {
            tl.fromTo(
              bands,
              { x: (index: number) => (index % 2 === 0 ? -60 : 60), autoAlpha: 0 },
              {
                x: 0,
                autoAlpha: 1,
                duration: 0.5,
                stagger: 0.03,
                ease: "power2.out",
              },
              0,
            );
          }
          if (arc) {
            tl.fromTo(
              arc,
              { strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" },
              0.1,
            );
          }
          if (arrow) {
            tl.fromTo(
              arrow,
              { autoAlpha: 0, scale: 0.7, transformOrigin: "50% 50%" },
              { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
              0.5,
            );
          }
        }

        if (id === "respond") {
          const steps = selectAll("respond-step");
          const body = select("respond-body");
          const hands = select("respond-hands");
          if (body) {
            tl.fromTo(
              body,
              { autoAlpha: 0, scale: 0.95, transformOrigin: "50% 100%" },
              { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" },
              0,
            );
          }
          if (hands) {
            tl.fromTo(
              hands,
              { autoAlpha: 0, y: -30 },
              { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
              0.15,
            );
          }
          if (steps.length) {
            tl.set(steps, { autoAlpha: 0.25, scale: 1 });
          }
        }

        if (id === "chain") {
          const nodes = selectAll("chain-node");
          const dots = selectAll("chain-dot");
          if (nodes.length) {
            tl.fromTo(
              nodes,
              { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%" },
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.12,
                ease: "back.out(1.8)",
              },
              0,
            );
          }
          if (dots.length) {
            tl.fromTo(
              dots,
              { scale: 0, transformOrigin: "50% 50%" },
              {
                scale: 1,
                duration: 0.4,
                stagger: 0.12,
                ease: "back.out(3)",
              },
              0.3,
            );
          }
        }

        return tl;
      };

      scenes.forEach((scene) => {
        const timeline = buildSceneTimeline(scene.id);
        if (timeline) sceneTimelines.set(scene.id, timeline);
      });

      const applyProgress = (progress: number) => {
        stage.style.setProperty("--story-p", progress.toFixed(4));
        const scaled = progress * (beats.length - 1);
        const index = Math.max(
          0,
          Math.min(beats.length - 1, Math.round(scaled)),
        );
        if (index !== activeIndex) {
          const instant = activeIndex === -1;
          shift(index, instant);
        }
      };

      const trigger = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => applyProgress(self.progress),
        onRefresh: (self) => applyProgress(self.progress),
      });

      triggerRef.current = trigger;
      applyProgress(trigger.progress);

      const ambient = gsap.timeline({ repeat: -1 });
      const scan = stage.querySelector("[data-story-scan]");
      if (scan) {
        ambient.fromTo(
          scan,
          { yPercent: -100, autoAlpha: 0 },
          {
            yPercent: 100,
            autoAlpha: 0.5,
            duration: 7,
            ease: "none",
            yoyo: true,
            repeat: -1,
          },
          0,
        );
      }
      const pulse = stage.querySelector('[data-anim="respond-pulse"]');
      if (pulse) {
        ambient.to(
          pulse,
          {
            scale: 1.18,
            autoAlpha: 0.5,
            duration: 1.1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            transformOrigin: "50% 50%",
          },
          0,
        );
      }
      const clockHand = stage.querySelector('[data-anim="hesitate-hands"]');
      if (clockHand) {
        ambient.to(
          clockHand,
          {
            rotation: 360,
            duration: 40,
            ease: "none",
            repeat: -1,
            transformOrigin: "50% 50%",
          },
          0,
        );
      }

      return () => {
        trigger.kill();
        triggerRef.current = null;
        ambient.kill();
        sceneTimelines.forEach((timeline) => timeline.kill());
      };
    },
    { dependencies: [reducedMotion], revertOnUpdate: true },
  );

  const jumpTo = useCallback((index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const y =
      trigger.start +
      (trigger.end - trigger.start) *
        (index / Math.max(beats.length - 1, 1));
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(y, { duration: 1.1 });
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  if (reducedMotion) {
    return <StaticStory />;
  }

  return (
    <div
      ref={trackRef}
      className="story-track relative bg-[#070b14]"
      style={{ "--beat-count": beats.length } as CSSProperties}
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-svh overflow-hidden bg-[#070b14] text-white"
      >
        <h1 className="sr-only">
          {storyMeta.title} — {storyMeta.tagline}
        </h1>

        <div className="absolute inset-0" aria-hidden="true">
          {scenes.map((scene) => {
            const Visual = sceneVisuals[scene.id];
            return (
              <div
                key={scene.id}
                data-scene-layer={scene.id}
                className={`absolute inset-0 ${
                  scene.id === "opening" ? "opacity-100" : "opacity-0"
                }`}
              >
                <Visual />
              </div>
            );
          })}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#070b14] via-[#070b14]/70 to-transparent lg:hidden" />
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[52%] bg-gradient-to-r from-[#070b14] via-[#070b14]/85 to-transparent lg:block" />
          <div
            data-story-scan
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent"
          />
        </div>

        <StoryHeader />

        <div className="pointer-events-none absolute inset-0 z-20">
          {beats.map((beat, index) => (
            <article
              key={beat.id}
              data-beat-copy
              data-beat-index={index}
              className="absolute inset-x-0 bottom-0 px-4 pb-24 opacity-0 sm:px-6 sm:pb-24 lg:top-0 lg:right-auto lg:bottom-auto lg:flex lg:h-full lg:w-[48%] lg:max-w-2xl lg:flex-col lg:justify-center lg:px-12 lg:pb-0"
            >
              <div className="max-w-xl">{copyLayer(index)}</div>
            </article>
          ))}
        </div>

        <SceneNav onJump={jumpTo} />

        <div className="absolute inset-x-0 bottom-0 z-30">
          <div className="flex items-end justify-between gap-3 px-4 pb-4 sm:px-6">
            <p className="flex items-center gap-1.5 font-mono text-[0.5625rem] tracking-[0.16em] text-white/40 uppercase">
              <ArrowDown aria-hidden="true" className="size-3" />
              {storyMeta.scrollHint}
            </p>
            <div className="sm:hidden">
              <StoryHud />
            </div>
          </div>
          <div className="h-px w-full bg-white/10">
            <div
              className="h-px origin-left bg-[#5eead4]"
              style={{ width: "calc(var(--story-p, 0) * 100%)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StaticStory() {
  return (
    <section className="bg-[#070b14] text-white">
      <div className="page-shell py-10 sm:py-16">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[0.5625rem] tracking-[0.2em] text-white/40 uppercase">
              {storyMeta.event}
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold">
              {storyMeta.title}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/55">
              {storyMeta.intro}
            </p>
          </div>
          <MotionToggle inverted />
        </header>

        <ol className="mt-8 space-y-6">
          {scenes.map((scene, index) => {
            const Visual = sceneVisuals[scene.id];
            return (
              <li
                key={scene.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="static-visual relative aspect-[16/10] w-full overflow-hidden">
                  <Visual />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.5625rem] tracking-[0.18em] text-white/40 uppercase">
                    <span>
                      {(index + 1).toString().padStart(2, "0")} &middot;{" "}
                      {scene.label}
                    </span>
                    <span>{scene.kicker}</span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl leading-tight font-semibold whitespace-pre-line">
                    {scene.headline}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {scene.support}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {beats
                      .filter((beat) => beat.scene === scene.id)
                      .map((beat) => (
                        <li
                          key={beat.id}
                          className="flex gap-3 text-sm text-white/75"
                        >
                          <span className="numeric w-10 shrink-0 text-xs text-white/35">
                            {beat.time}
                          </span>
                          <span>
                            {beat.line}
                            {beat.aside ? (
                              <span className="mt-0.5 block text-xs text-white/40">
                                {beat.aside}
                              </span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

