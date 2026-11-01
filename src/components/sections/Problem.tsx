import { FlaskConical, Info } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { SurvivalChart } from "@/components/ui/SurvivalChart";
import { problem, ui } from "@/data/content";

export function Problem() {
  return (
    <section
      id="masalah"
      aria-labelledby="masalah-title"
      className="section-block border-b border-border bg-bg"
    >
      <div className="page-shell">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">{problem.eyebrow}</p>
            <h2
              id="masalah-title"
              className="mt-4 max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)]"
              data-section-title
            >
              {problem.title}
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="lede text-base">{problem.lead}</p>
          </div>
        </div>

        <h3 className="sr-only">{ui.problem.cardsLabel}</h3>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {problem.cards.map((card) => (
            <StatCard key={card.id} card={card} />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-warn/20 bg-warn/[0.06] px-4 py-3 text-xs leading-relaxed text-warn/90">
          <Info aria-hidden="true" className="size-4 shrink-0" />
          <p>{ui.problem.todoNote}</p>
        </div>

        <div className="card-surface mt-10 overflow-hidden p-5 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">
                <FlaskConical aria-hidden="true" className="size-3.5" />
                {problem.chart.eyebrow}
              </p>
              <h3 className="mt-3 max-w-2xl text-[clamp(1.5rem,2.6vw,2.25rem)]">
                {problem.chart.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {problem.chart.description}
              </p>
            </div>
            <span className="rounded-full border border-warn/30 bg-warn/10 px-3 py-1.5 text-[0.6875rem] font-medium text-warn">
              {ui.problem.todoBadge}
            </span>
          </div>

          <SurvivalChart className="mt-8" />
        </div>

        <p className="mt-10 max-w-3xl font-display text-[clamp(1.375rem,2.4vw,2rem)] leading-snug text-text/90">
          {problem.closingLine}
        </p>
      </div>
    </section>
  );
}
