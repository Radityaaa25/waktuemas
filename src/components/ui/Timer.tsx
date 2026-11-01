import { formatClock } from "@/lib/format";

interface TimerProps {
  seconds: number;
  total?: number;
  label: string;
  totalLabel?: string;
  className?: string;
}

export function Timer({
  seconds,
  total = 240,
  label,
  totalLabel,
  className,
}: TimerProps) {
  const safeTotal = Math.max(total, 1);
  const ratio = Math.max(0, Math.min(seconds / safeTotal, 1));

  return (
    <div className={className}>
      <div className="flex items-end gap-2">
        <span className="sr-only">{label}</span>
        <span
          className="numeric text-[clamp(2.75rem,7vw,4.5rem)] leading-none font-medium text-text"
          aria-hidden="true"
        >
          {formatClock(seconds)}
        </span>
        {totalLabel ? (
          <span
            className="numeric pb-1 text-xs text-muted sm:text-sm"
            aria-hidden="true"
          >
            {totalLabel}
          </span>
        ) : null}
      </div>
      <div
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-text/10"
        aria-hidden="true"
      >
        <div
          className="h-full origin-left rounded-full bg-current transition-transform duration-300"
          style={{ transform: `scaleX(${ratio})` }}
        />
      </div>
    </div>
  );
}
