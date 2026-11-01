import { Camera } from "lucide-react";
import type { CprStep } from "@/data/content";
import { cpr, ecgLabels, ui } from "@/data/content";

interface StepPanelProps {
  step: CprStep;
  index: number;
  total: number;
  pathLabel: string;
}

export function StepPanel({ step, index, total, pathLabel }: StepPanelProps) {
  return (
    <article
      className="card-surface relative overflow-hidden p-5 sm:p-7"
      aria-labelledby={`${step.id}-title`}
      data-step-panel
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="eyebrow text-[0.6875rem]">
          {pathLabel} &middot; {cpr.stepCounter(index + 1, total)}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.6875rem] text-muted">
          <Camera aria-hidden="true" className="size-3.5" />
          {ui.cpr.cameraLabel}: {step.camera}
        </span>
      </div>

      <h3
        id={`${step.id}-title`}
        className="mt-4 font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-tight font-semibold"
      >
        {step.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-text/85 sm:text-base">
        {step.summary}
      </p>

      <ul className="mt-5 space-y-2.5">
        {step.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-2.5 text-sm leading-relaxed text-muted"
          >
            <span
              className="mt-2 size-1.5 shrink-0 rounded-full bg-current"
              aria-hidden="true"
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 border-t border-white/10 pt-4 text-xs text-muted">
        <span className="text-text/70">{ui.cpr.ecgPrefix}:</span> {ecgLabels[step.ecg]}
      </p>
    </article>
  );
}
