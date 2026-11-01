"use client";

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
import type { StoryPath } from "@/data/content";
import { useScrollStore } from "@/lib/scrollStore";

const PATH_ICON = {
  A: AlertTriangle,
  B: ShieldCheck,
} as const;

export function CprStory() {
  const path = useScrollStore((state) => state.path);
  const stepIndex = useScrollStore((state) => state.step);
  const setPath = useScrollStore((state) => state.setPath);
  const setStep = useScrollStore((state) => state.setStep);

  const activePath = path === "A" ? cpr.pathA : cpr.pathB;
  const steps = activePath.steps;
  const safeStep = steps[stepIndex] ?? steps[0];

  if (!safeStep) return null;

  const isPathA = path === "A";
  const toneText = isPathA ? "text-alert" : "text-hope";
  const toneBorder = isPathA ? "border-alert/35" : "border-hope/35";
  const toneBg = isPathA ? "bg-alert/10" : "bg-hope/10";

  const selectPath = (next: StoryPath) => {
    setPath(next);
    setStep(0);
  };

  return (
    <section
      id="cpr"
      aria-labelledby="cpr-title"
      className="section-block border-b border-white/5"
      data-cpr-section
    >
      <div className="page-shell">
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

        <div
          role="group"
          aria-label={ui.cpr.tabsLabel}
          className="mt-10 grid max-w-xl grid-cols-2 gap-2"
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
                aria-label={item.id === "A" ? cpr.pathAriaLabel : cpr.pathBAriaLabel}
                className={`flex min-h-16 items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${
                  active
                    ? item.id === "A"
                      ? "border-alert/50 bg-alert/10"
                      : "border-hope/50 bg-hope/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/25"
                }`}
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl border ${
                    active
                      ? item.id === "A"
                        ? "border-alert/40 text-alert"
                        : "border-hope/40 text-hope"
                      : "border-white/10 text-muted"
                  }`}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span className="min-w-0">
                  <span
                    className={`block text-sm font-semibold ${active ? "text-text" : "text-muted"}`}
                  >
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted">
                    {item.badge}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.22fr)]">
          <div className="order-2 lg:order-1" data-cpr-panel>
            <div
              className={`card-surface border ${toneBorder} overflow-hidden p-5 sm:p-6`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="eyebrow text-[0.6875rem]">
                  {ui.cpr.currentLabel}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6875rem] font-medium ${toneBorder} ${toneBg} ${toneText}`}
                >
                  {activePath.label}
                  {isPathA ? (
                    <AlertTriangle aria-hidden="true" className="size-3.5" />
                  ) : (
                    <ShieldCheck aria-hidden="true" className="size-3.5" />
                  )}
                </span>
              </div>

              <Timer
                seconds={safeStep.timeSeconds}
                label={cpr.timerLabel}
                totalLabel={ui.cpr.timerTotal}
                className={`mt-4 ${toneText}`}
              />

              <p className="mt-4 text-xs leading-relaxed text-muted">
                {activePath.description}
              </p>
            </div>

            <div className="mt-4">
              <StepPanel
                step={safeStep}
                index={stepIndex}
                total={steps.length}
                pathLabel={activePath.label}
              />
            </div>

            <div className="card-surface mt-4 p-4 sm:p-5">
              <p className="eyebrow text-[0.6875rem]">{ui.cpr.timelineLabel}</p>
              <ol className="mt-3 space-y-1.5">
                {steps.map((item, index) => {
                  const active = index === stepIndex;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setStep(index)}
                        aria-current={active ? "step" : undefined}
                        className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-2.5 py-1.5 text-left text-sm transition-colors ${
                          active
                            ? `border ${toneBorder} ${toneBg} text-text`
                            : "border border-transparent text-muted hover:bg-white/5 hover:text-text"
                        }`}
                      >
                        <span
                          className={`numeric w-10 shrink-0 text-xs ${active ? toneText : "text-muted"}`}
                        >
                          {item.timer}
                        </span>
                        <span className="flex-1">{item.title}</span>
                        <ChevronRight
                          aria-hidden="true"
                          className="size-4 shrink-0 opacity-60"
                        />
                      </button>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-3 text-[0.6875rem] leading-relaxed text-muted/80">
                {ui.cpr.selectHint}
              </p>
            </div>

            <div
              className={`mt-4 rounded-2xl border ${toneBorder} ${toneBg} p-5`}
            >
              <p className="eyebrow text-[0.6875rem]">{ui.cpr.outcomeLabel}</p>
              <h3 className={`mt-2 text-lg font-semibold ${toneText}`}>
                {activePath.outcome.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text/80">
                {activePath.outcome.text}
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:sticky lg:top-20" data-cpr-canvas>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-surface sm:aspect-[16/11] lg:aspect-[4/3.2]">
              <CprPlaceholder path={path} />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent"
                aria-hidden="true"
              />
              <span className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-bg/70 px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.14em] uppercase backdrop-blur">
                {ui.cpr.previewLabel}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <EcgLine
                  state={safeStep.ecg}
                  className={`mt-3 h-12 w-full ${toneText}`}
                  label={`EKG ${activePath.label}: ${safeStep.title}`}
                />
              </div>
            </div>
            <p className="mt-2 text-[0.6875rem] leading-relaxed text-muted">
              {ui.cpr.previewNote}
            </p>
            <p className="sr-only">{a11y.canvasSummary}</p>
          </div>
        </div>

        <div
          className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-surface p-6 md:p-8"
          data-cpr-rewind
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent 0 22px, rgba(244,246,251,0.5) 22px 23px)",
            }}
          />
          <div className="relative flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="eyebrow text-[0.6875rem]">
                {transition.rewindLabel}
              </p>
              <h3 className="mt-2 text-[clamp(1.375rem,2.4vw,2rem)]">
                {isPathA ? transition.title : ui.cpr.backTitle}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                {isPathA ? transition.description : ui.cpr.backDescription}
              </p>
            </div>
            <button
              type="button"
              onClick={() => selectPath(isPathA ? "B" : "A")}
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-text px-5 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              {isPathA ? ui.cpr.rewindToB : ui.cpr.rewindToA}
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 p-5 md:p-6">
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
            className="mt-4 inline-flex min-h-11 items-center text-xs text-muted underline decoration-white/25 underline-offset-4 transition-colors hover:text-text"
          >
            {ui.problem.sourceLabel}: {ui.cpr.guidanceSource}
          </a>
        </div>
      </div>
    </section>
  );
}
