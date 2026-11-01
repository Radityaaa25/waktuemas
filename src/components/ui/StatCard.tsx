import { Activity, TrendingDown, Users } from "lucide-react";
import type { StatCardContent } from "@/data/content";
import { ui } from "@/data/content";

const TONE = {
  alert: {
    text: "text-alert",
    icon: Users,
    glow: "from-alert/25",
    border: "hover:border-alert/40",
  },
  warn: {
    text: "text-warn",
    icon: TrendingDown,
    glow: "from-warn/25",
    border: "hover:border-warn/40",
  },
  hope: {
    text: "text-hope",
    icon: Activity,
    glow: "from-hope/25",
    border: "hover:border-hope/40",
  },
} as const;

export function StatCard({ card }: { card: StatCardContent }) {
  const tone = TONE[card.tone];
  const Icon = tone.icon;

  return (
    <article
      className={`card-surface group relative flex h-full flex-col overflow-hidden p-6 transition-colors md:p-8 ${tone.border}`}
      data-animate={`enter-${card.direction}`}
      aria-labelledby={`${card.id}-title`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent opacity-60 ${tone.glow}`}
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-between gap-4">
        <span className={`inline-flex size-11 items-center justify-center rounded-2xl border border-white/10 ${tone.text}`}>
          <Icon aria-hidden="true" className="size-5" />
        </span>
        {card.todoVerify ? (
          <span className="rounded-full border border-warn/40 bg-warn/10 px-2.5 py-1 text-[0.6875rem] font-medium text-warn">
            {ui.problem.todoBadge}
          </span>
        ) : null}
      </div>

      <p className={`numeric relative mt-8 text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none font-medium ${tone.text}`}>
        {card.value}
      </p>
      <p className="relative mt-2 text-xs tracking-wide text-muted uppercase">
        {card.valueLabel}
      </p>
      <h3
        id={`${card.id}-title`}
        className="relative mt-5 text-lg leading-snug font-semibold text-text"
      >
        {card.title}
      </h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted">
        {card.description}
      </p>

      <div className="relative mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-4 text-xs">
        <a
          href={`#ref-${card.source.refId}`}
          className="inline-flex min-h-11 items-center gap-1.5 text-muted underline decoration-white/20 transition-colors hover:text-text"
        >
          {ui.problem.sourceLabel}: {card.source.text}
        </a>
      </div>
    </article>
  );
}
