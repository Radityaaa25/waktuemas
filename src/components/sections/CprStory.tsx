"use client";

import { useRef } from "react";
import {
  AlertTriangle,
  Check,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { CprPlaceholder } from "@/components/ui/CprPlaceholder";
import { EcgLine } from "@/components/ui/EcgLine";
import { StepPanel } from "@/components/ui/StepPanel";
import { Timer } from "@/components/ui/Timer";
import { a11y, cpr, transition, ui } from "@/data/content";
import type { CprStep, StoryPath } from "@/data/content";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { formatClock } from "@/lib/format";
import { getLenis } from "@/lib/lenis";
import { useScrollStore, type StoryPhase } from "@/lib/scrollStore";

const PATH_ICON = {
  A: AlertTriangle,
  B: ShieldCheck,
} as const;

const STORY_TOTAL = 240;
const PATH_A_END = 0.4;
const PATH_B_START = 0.5;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function stepIndexForTime(steps: readonly CprStep[], time: number): number {
  let index = 0;
  steps.forEach((step, stepIndex) => {
    if (time >= step.timeSeconds) index = stepIndex;
  });
  return index;
}

function resolveStory(progress: number): {
  phase: StoryPhase;
  path: StoryPath;
  time: number;
} {
  const p = clamp01(progress);

  if (p < PATH_A_END) {
    return {
      phase: "A",
      path: "A",
      time: Math.min(STORY_TOTAL, (p / PATH_A_END) * STORY_TOTAL),
    };
  }

  if (p < PATH_B_START) {
    const rewind = (p - PATH_A_END) / (PATH_B_START - PATH_A_END);
    return {
      phase: "rewind",
      path: "A",
      time: Math.max(0, STORY_TOTAL * (1 - rewind)),
    };
  }

  return {
    phase: "B",
    path: "B",
    time: Math.min(
      STORY_TOTAL,
      ((p - PATH_B_START) / (1 - PATH_B_START)) * STORY_TOTAL,
    ),
  };
}

export function CprStory() {
  const path = useScrollStore((state) => state.path);
  const stepIndex = useScrollStore((state) => state.step);
  const storyTime = useScrollStore((state) => state.storyTime);
  const storyPhase = useScrollStore((state) => state.storyPhase);
  const reducedMotion = useScrollStore((state) => state.reducedMotion);
  const setStory = useScrollStore((state) => state.setStory);
  const setInStory = useScrollStore((state) => state.setInStory);

  const trackRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const activePath = path === "A" ? cpr.pathA : cpr.pathB;
  const steps = activePath.steps;
  const safeStep = steps[stepIndex] ?? steps[0]!;

  const isPathA = path === "A";
  const isRewind = storyPhase === "rewind";
  const toneText = isPathA ? "text-alert" : "text-hope";
  const toneBorder = isPathA ? "border-alert/35" : "border-hope/35";
  const toneBg = isPathA ? "bg-alert/10" : "bg-hope/10";
  const displaySeconds = reducedMotion
    ? safeStep.timeSeconds
    : Math.round(storyTime);
  const timeRatio = clamp01(displaySeconds / STORY_TOTAL);

  useGSAP(
    () => {
      if (reducedMotion) return;

      const track = trackRef.current;
      if (!track) return;

      const apply = (rawProgress: number) => {
        const resolved = resolveStory(rawProgress);
        const resolvedSteps =
          resolved.path === "A" ? cpr.pathA.steps : cpr.pathB.steps;
        const time = Math.round(resolved.time);
        const index = stepIndexForTime(resolvedSteps, time);
        const step = resolvedSteps[index] ?? resolvedSteps[0]!;
        const current = useScrollStore.getState();

        if (
          current.storyPhase === resolved.phase &&
          current.path === resolved.path &&
          current.step === index &&
          current.storyTime === time &&
          current.ecgState === step.ecg
        ) {
          return;
        }

        setStory({
          path: resolved.path,
          step: index,
          storyTime: time,
          storyPhase: resolved.phase,
          ecgState: step.ecg,
        });
      };

      const trigger = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => apply(self.progress),
        onRefresh: (self) => apply(self.progress),
        onToggle: (self) => setInStory(self.isActive),
      });

      triggerRef.current = trigger;
      apply(trigger.progress);

      return () => {
        trigger.kill();
        triggerRef.current = null;
        setInStory(false);
      };
    },
    { dependencies: [reducedMotion], revertOnUpdate: true },
  );

  const scrollToProgress = (target: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const y = trigger.start + (trigger.end - trigger.start) * clamp01(target);
    const lenis = getLenis();

    if (lenis) {
      lenis.scrollTo(y, { duration: 1.15 });
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const selectPath = (next: StoryPath) => {
    const nextStep =
      (next === "A" ? cpr.pathA.steps[0] : cpr.pathB.steps[0])!;

    setStory({
      path: next,
      step: 0,
      storyTime: nextStep.timeSeconds,
      storyPhase: next,
      ecgState: nextStep.ecg,
    });

    if (!reducedMotion) {
      scrollToProgress(next === "A" ? 0.02 : 0.52);
    }
  };

  const selectStep = (targetPath: StoryPath, index: number) => {
    const targetSteps =
      targetPath === "A" ? cpr.pathA.steps : cpr.pathB.steps;
    const targetStep = targetSteps[index];
    if (!targetStep) return;

    setStory({
      path: targetPath,
      step: index,
      storyTime: targetStep.timeSeconds,
      storyPhase: targetPath,
      ecgState: targetStep.ecg,
    });

    if (!reducedMotion) {
      const target =
        targetPath === "A"
          ? (targetStep.timeSeconds / STORY_TOTAL) * (PATH_A_END - 0.01)
          : PATH_B_START +
            (targetStep.timeSeconds / STORY_TOTAL) *
              (1 - PATH_B_START - 0.01);
      scrollToProgress(target);
    }
  };

  if (!safeStep) return null;

  return (
    <section
      id="cpr"
      aria-labelledby="cpr-title"
      className="border-b border-border bg-bg"
      data-cpr-section
    >
      <div className="page-shell pt-16 pb-8 md:pt-24">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">{cpr.eyebrow}</p>
            <h2
              id="cpr-title"
              className="mt-4 max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)]"
              data-section-title
            >
              {cpr.title}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="lede text-base">{cpr.lead}</p>
            <p className="mt-3 text-xs leading-relaxed text-muted">{cpr.hint}</p>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className={
          reducedMotion ? "relative" : "relative h-[400svh] lg:h-[500svh]"
        }
        data-cpr-story
      >
        <div
          className={
            reducedMotion
              ? "relative"
              : "sticky top-16 flex min-h-[calc(100svh-4rem)] items-center py-4"
          }
        >
          <div className="page-shell w-full">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div
                role="group"
                aria-label={ui.cpr.tabsLabel}
                className="grid w-full max-w-xl grid-cols-2 gap-2"
                data-cpr-tabs
              >
                {[cpr.pathA, cpr.pathB].map((item) => {
                  const Icon = PATH_ICON[item.id];
                  const active = item.id === path;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectPath(item.id)}
                      aria-pressed={active}
                      aria-label={
                        item.id === "A" ? cpr.pathAriaLabel : cpr.pathBAriaLabel
                      }
                      className={`flex min-h-16 items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${
                        active
                          ? item.id === "A"
                            ? "border-alert/50 bg-alert/10"
                            : "border-hope/50 bg-hope/10"
                          : "border-border bg-text/[0.02] hover:border-border-strong"
                      }`}
                    >
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${
                          active
                            ? item.id === "A"
                              ? "border-alert/40 text-alert"
                              : "border-hope/40 text-hope"
                            : "border-border text-muted"
                        }`}
                      >
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block text-sm font-semibold ${
                            active ? "text-text" : "text-muted"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span
                          className="mt-0.5 block text-xs leading-snug text-muted"
                          data-cpr-tab-badge
                        >
                          {item.badge}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {reducedMotion ? null : (
                <div className="hidden items-center gap-3 sm:flex">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.6875rem] font-medium ${
                      isRewind
                        ? "border-alert/40 bg-alert/10 text-alert"
                        : `${toneBorder} ${toneBg} ${toneText}`
                    }`}
                  >
                    {isRewind ? (
                      <RotateCcw aria-hidden="true" className="size-3.5" />
                    ) : isPathA ? (
                      <AlertTriangle aria-hidden="true" className="size-3.5" />
                    ) : (
                      <ShieldCheck aria-hidden="true" className="size-3.5" />
                    )}
                    {isRewind ? ui.cpr.currentLabel : activePath.label}
                  </span>
                  <span className="numeric text-sm text-muted">
                    {formatClock(displaySeconds)}
                  </span>
                </div>
              )}
            </div>

            <div
              className="mt-4 grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
              data-cpr-grid
            >
              <div className="order-1" data-cpr-canvas>
                <div className="cpr-canvas-card relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-surface sm:aspect-[16/9] lg:aspect-[4/3.05]">
                  <CprPlaceholder path={path} />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full border border-border bg-bg/70 px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.14em] uppercase backdrop-blur">
                    {ui.cpr.previewLabel}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <EcgLine
                      state={safeStep.ecg}
                      className={`mt-3 h-12 w-full ${toneText}`}
                      label={`EKG ${activePath.label}: ${safeStep.title}`}
                    />
                  </div>

                  {isRewind ? (
                    <div
                      className="absolute inset-0 z-10 overflow-hidden"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-bg/65 backdrop-blur-[2px]" />
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <div className="rewind-panel relative w-[min(88%,22rem)] overflow-hidden rounded-2xl border border-border-strong bg-surface/95 p-4 text-center shadow-[0_18px_50px_-24px_rgba(11,18,32,0.45)]">
                          <RotateCcw
                            aria-hidden="true"
                            className="mx-auto size-6 text-alert"
                          />
                          <p className="mt-2 font-mono text-[0.625rem] tracking-[0.16em] text-alert uppercase">
                            {transition.rewindLabel}
                          </p>
                          <p className="numeric mt-1 text-3xl font-medium text-text">
                            {formatClock(displaySeconds)}
                          </p>
                          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-text/10">
                            <div
                              className="h-full rounded-full bg-alert transition-[width] duration-200"
                              style={{ width: `${timeRatio * 100}%` }}
                            />
                          </div>
                          <span className="rewind-bar top-3" />
                          <span className="rewind-bar bottom-6" />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <p className="cpr-preview-note mt-2 text-[0.6875rem] leading-relaxed text-muted">
                  {ui.cpr.previewNote}
                </p>
                <p className="sr-only">
                  {isPathA ? a11y.canvasSummaryPathA : a11y.canvasSummary}
                </p>
              </div>

              <div className="order-2 flex flex-col gap-3" data-cpr-panel>
                <div
                  className={`card-surface border ${toneBorder} p-4 sm:p-5`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="eyebrow text-[0.6875rem]">
                      {isRewind ? transition.rewindLabel : ui.cpr.currentLabel}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6875rem] font-medium ${toneBorder} ${toneBg} ${toneText}`}
                    >
                      {activePath.label}
                      {isPathA ? (
                        <AlertTriangle
                          aria-hidden="true"
                          className="size-3.5"
                        />
                      ) : (
                        <ShieldCheck aria-hidden="true" className="size-3.5" />
                      )}
                    </span>
                  </div>

                  <Timer
                    seconds={displaySeconds}
                    label={cpr.timerLabel}
                    totalLabel={ui.cpr.timerTotal}
                    className={`mt-4 ${toneText}`}
                  />

                  <p className="mt-4 hidden text-xs leading-relaxed text-muted sm:block">
                    {activePath.description}
                  </p>
                </div>

                <StepPanel
                  step={safeStep}
                  index={stepIndex}
                  total={steps.length}
                  pathLabel={activePath.label}
                  compact={!reducedMotion}
                />
              </div>
            </div>

            {reducedMotion ? null : (
              <div className="mt-4" data-cpr-progress>
                <div className="flex items-center justify-between text-[0.625rem] text-muted">
                  <span className="numeric">0:00</span>
                  <span>{ui.cpr.timelineLabel}</span>
                  <span className="numeric">4:00</span>
                </div>
                <div
                  className="mt-1.5 h-1 overflow-hidden rounded-full bg-text/10"
                  aria-hidden="true"
                >
                  <div
                    className={`h-full rounded-full transition-[width] duration-150 ${
                      isRewind ? "bg-alert" : "bg-current"
                    } ${toneText}`}
                    style={{ width: `${timeRatio * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="page-shell pb-16 md:pb-20">
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[cpr.pathA, cpr.pathB].map((item) => {
            const itemIsA = item.id === "A";
            const itemTone = itemIsA ? "text-alert" : "text-hope";
            const itemBorder = itemIsA ? "border-alert/30" : "border-hope/30";
            const itemBg = itemIsA ? "bg-alert/[0.06]" : "bg-hope/[0.06]";

            return (
              <div
                key={item.id}
                className={`rounded-2xl border ${itemBorder} ${itemBg} p-5`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="eyebrow text-[0.6875rem]">{item.label}</p>
                  <span className={`text-xs font-medium ${itemTone}`}>
                    {item.badge}
                  </span>
                </div>
                <h3 className={`mt-2 text-lg font-semibold ${itemTone}`}>
                  {item.outcome.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text/80">
                  {item.outcome.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {[cpr.pathA, cpr.pathB].map((item) => {
            const itemIsA = item.id === "A";
            const itemTone = itemIsA ? "text-alert" : "text-hope";

            return (
              <div key={item.id} className="card-surface p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{item.label}</h3>
                  <span className={`text-xs font-medium ${itemTone}`}>
                    {item.badge}
                  </span>
                </div>
                <ol className="mt-4 space-y-3">
                  {item.steps.map((step, index) => (
                    <li
                      key={step.id}
                      className="border-t border-border pt-3 first:border-t-0 first:pt-0"
                    >
                      <button
                        type="button"
                        onClick={() => selectStep(item.id, index)}
                        className="flex w-full min-h-11 items-center gap-3 rounded-xl text-left transition-colors hover:text-text"
                      >
                        <span
                          className={`numeric w-10 shrink-0 text-xs ${itemTone}`}
                        >
                          {step.timer}
                        </span>
                        <span className="flex-1 text-sm font-medium">
                          {step.title}
                        </span>
                        <ChevronRight
                          aria-hidden="true"
                          className="size-4 shrink-0 opacity-50"
                        />
                      </button>
                      <p className="mt-1 pl-[3.25rem] text-xs leading-relaxed text-muted">
                        {step.summary}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-border p-5 md:p-6">
          <p className="eyebrow text-[0.6875rem]">{ui.cpr.guidanceLabel}</p>
          <h3 className="mt-2 text-lg font-semibold">{cpr.guidance.title}</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {cpr.guidance.items.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-sm leading-relaxed text-muted"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-hope"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href={`#ref-${cpr.guidance.sourceId}`}
            className="mt-4 inline-flex min-h-11 items-center text-xs text-muted underline decoration-text/20 underline-offset-4 transition-colors hover:text-text"
          >
            {ui.problem.sourceLabel}: {ui.cpr.guidanceSource}
          </a>
        </div>
      </div>
    </section>
  );
}
