import { ui, problem } from "@/data/content";

export function SurvivalChart({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>{problem.chart.axisY}</span>
        <span className="font-mono text-[0.625rem] tracking-[0.14em] uppercase">
          {ui.problem.illustrativeLabel}
        </span>
      </div>
      <svg
        viewBox="0 0 720 380"
        role="img"
        aria-label={ui.problem.chartAria}
        className="h-auto w-full"
      >
        <defs>
          <linearGradient id="chart-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--warn)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="var(--warn)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="chart-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--warn)" />
            <stop offset="100%" stopColor="var(--alert)" />
          </linearGradient>
        </defs>

        {[100, 160, 220, 280].map((y) => (
          <line
            key={y}
            x1="64"
            x2="680"
            y1={y}
            y2={y}
            stroke="var(--muted)"
            strokeOpacity="0.12"
            strokeDasharray="4 8"
          />
        ))}

        <line
          x1="64"
          x2="64"
          y1="56"
          y2="306"
          stroke="var(--muted)"
          strokeOpacity="0.3"
        />
        <line
          x1="64"
          x2="680"
          y1="306"
          y2="306"
          stroke="var(--muted)"
          strokeOpacity="0.3"
        />

        <path
          d="M64 72 C126 92 158 132 226 168 C294 204 336 228 404 248 C472 267 548 282 680 292 L680 306 L64 306 Z"
          fill="url(#chart-area)"
        />
        <path
          d="M64 72 C126 92 158 132 226 168 C294 204 336 228 404 248 C472 267 548 282 680 292"
          fill="none"
          stroke="url(#chart-line)"
          strokeWidth="3.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
          data-chart-line
        />

        <circle cx="64" cy="72" r="5" fill="var(--warn)" />
        <circle cx="680" cy="292" r="5" fill="var(--alert)" />

        <text
          x="84"
          y="62"
          fill="var(--text)"
          fontSize="14"
          fontFamily="var(--font-jakarta)"
        >
          {ui.problem.fasterLabel}
        </text>
        <text
          x="676"
          y="330"
          textAnchor="end"
          fill="var(--muted)"
          fontSize="13"
          fontFamily="var(--font-jakarta)"
        >
          {ui.problem.slowerLabel}
        </text>

        <text
          x="680"
          y="356"
          textAnchor="end"
          fill="var(--muted)"
          fontSize="12"
          fontFamily="var(--font-jakarta)"
        >
          {problem.chart.axisX} &rarr;
        </text>
      </svg>
      <figcaption className="mt-4 text-xs leading-relaxed text-muted">
        {problem.chart.caption}{" "}
        <a
          href={`#ref-${problem.chart.sourceId}`}
          className="underline decoration-white/25 underline-offset-4 transition-colors hover:text-text"
        >
          {ui.problem.chartSeeSource}
        </a>
      </figcaption>
    </figure>
  );
}
