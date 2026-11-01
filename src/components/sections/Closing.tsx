import {
  ArrowUp,
  GraduationCap,
  PhoneCall,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { References } from "@/components/sections/References";
import { closing, site, ui } from "@/data/content";

const ACTION_ICON = {
  training: GraduationCap,
  numbers: PhoneCall,
  share: Share2,
} as const;

export function Closing() {
  return (
    <section
      id="penutup"
      aria-labelledby="penutup-title"
      className="section-block bg-surface"
    >
      <div className="page-shell space-y-14 md:space-y-20">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">{closing.eyebrow}</p>
            <h2
              id="penutup-title"
              className="mt-4 max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)]"
              data-section-title
            >
              {closing.title}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="lede text-base">{closing.lead}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-alert/25 bg-gradient-to-br from-alert/10 via-surface to-surface p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl border border-alert/35 text-alert">
                <PhoneCall aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="eyebrow text-[0.6875rem]">
                  {ui.closing.emergencyLabel}
                </p>
                <p className="mt-1 text-sm text-muted">{site.emergency.note}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {site.emergency.numbers.map((entry) => (
                <a
                  key={entry.number}
                  href={`tel:${entry.number}`}
                  className="flex min-h-14 min-w-28 flex-col justify-center rounded-2xl border border-border bg-bg/50 px-4 transition-colors hover:border-border-strong"
                >
                  <span className="numeric text-xl font-medium text-text">
                    {entry.number}
                  </span>
                  <span className="text-[0.625rem] leading-tight text-muted">
                    {entry.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-[0.6875rem]">
                {ui.closing.stepsLabel}
              </p>
              <h3 className="mt-2 text-[clamp(1.5rem,2.6vw,2.25rem)]">
                {closing.fiveStepsTitle}
              </h3>
            </div>
            <span className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">
              {site.tagline}
            </span>
          </div>

          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {closing.fiveSteps.map((step) => (
              <li
                key={step.number}
                className="card-surface flex flex-col gap-2 p-5"
                data-five-step
              >
                <span className="numeric text-xs text-hope">{step.number}</span>
                <span className="font-display text-xl font-semibold">
                  {step.title}
                </span>
                <span className="text-xs leading-relaxed text-muted">
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <p className="eyebrow text-[0.6875rem]">{ui.closing.chainLabel}</p>
          <h3 className="mt-2 text-[clamp(1.5rem,2.6vw,2.25rem)]">
            {closing.chainTitle}
          </h3>

          <div
            className="mt-6 overflow-x-auto pb-2 [scrollbar-width:thin]"
            data-chain-track
          >
            <ol
              className="flex min-w-[52rem] gap-3 lg:min-w-0 lg:grid lg:grid-cols-6"
              data-chain-inner
            >
              {closing.chain.map((node, index) => (
                <li
                  key={node.id}
                  className="relative w-52 shrink-0 rounded-2xl border border-border bg-surface p-4 lg:w-auto"
                  data-chain-node
                >
                  <span className="numeric text-[0.625rem] text-muted">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="mt-2 block font-display text-base font-semibold leading-snug">
                    {node.title}
                  </span>
                  <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                    {node.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-2 text-[0.6875rem] text-muted lg:hidden">
            {ui.closing.swipeHint}
          </p>
        </div>

        <div>
          <p className="eyebrow text-[0.6875rem]">{ui.closing.actionsLabel}</p>
          <h3 className="mt-2 text-[clamp(1.5rem,2.6vw,2.25rem)]">
            {closing.actionsTitle}
          </h3>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {closing.actions.map((action) => {
              const Icon = ACTION_ICON[action.id as keyof typeof ACTION_ICON] ?? ShieldCheck;
              return (
                <li key={action.id} className="card-surface p-5" data-action-card>
                  <span className="flex size-10 items-center justify-center rounded-xl border border-hope/30 text-hope">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h4 className="mt-4 text-base font-semibold">
                    {action.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {action.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>

        <References />

        <Disclaimer />

        <div>
          <p className="eyebrow text-[0.6875rem]">{ui.closing.creditLabel}</p>
          <h3 className="mt-2 text-[clamp(1.5rem,2.6vw,2.25rem)]">
            {closing.creditTitle}
          </h3>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {closing.credits.map((credit) => (
              <div
                key={credit.label}
                className="rounded-2xl border border-border p-4"
              >
                <dt className="text-[0.6875rem] tracking-wide text-muted uppercase">
                  {credit.label}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-text/85">
                  {credit.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-muted">
            {closing.footerNote}
          </p>
          <a
            href="#hero"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-text"
          >
            <ArrowUp aria-hidden="true" className="size-4" />
            {ui.closing.backToTop}
          </a>
        </div>
      </div>
    </section>
  );
}
