import { CornerDownRight, Info } from "lucide-react";
import { UseCaseScene } from "@/components/ui/UseCaseScene";
import { useCase, ui } from "@/data/content";

export function UseCase() {
  return (
    <section
      id="use-case"
      aria-labelledby="use-case-title"
      className="section-block border-b border-white/5"
    >
      <div className="page-shell">
        <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7" data-use-case-visual>
            <div className="card-surface relative aspect-[5/4] overflow-hidden sm:aspect-[16/11] lg:aspect-[4/3.4]">
              <UseCaseScene className="absolute inset-0 h-full w-full opacity-90" />
              <div
                className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5">
                <p className="max-w-xs text-xs leading-relaxed text-muted">
                  {ui.useCase.visualLabel}
                </p>
                <span className="rounded-full border border-white/15 bg-bg/60 px-3 py-1.5 font-mono text-[0.625rem] tracking-[0.14em] text-text uppercase backdrop-blur">
                  {ui.useCase.locationTag}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5" data-use-case-copy>
            <p className="eyebrow">{useCase.eyebrow}</p>
            <h2
              id="use-case-title"
              className="mt-4 text-[clamp(2.25rem,4.6vw,3.75rem)]"
              data-section-title
            >
              {useCase.title}
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              {useCase.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h3 className="sr-only">{ui.useCase.beatsLabel}</h3>
            <ol className="mt-8 space-y-3">
              {useCase.beats.map((beat) => (
                <li
                  key={beat.time}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5"
                >
                  <CornerDownRight
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-hope"
                  />
                  <p className="text-sm leading-relaxed">
                    <span className="numeric mr-2 text-xs text-hope">
                      {beat.time}
                    </span>
                    <span className="text-muted">{beat.text}</span>
                  </p>
                </li>
              ))}
            </ol>

            <p className="mt-6 flex gap-2 text-xs leading-relaxed text-muted">
              <Info
                aria-hidden="true"
                className="mt-0.5 size-3.5 shrink-0 text-warn"
              />
              {ui.useCase.neutralityNote}
            </p>
          </div>
        </div>

        <p className="sr-only">{useCase.ariaSummary}</p>
      </div>
    </section>
  );
}
