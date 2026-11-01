interface DecProps {
  className?: string;
  size?: number;
  color?: string;
}

export function PlusSign({ className = "", size = 20, color = "var(--ink)" }: DecProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  );
}

export function Sparkle({ className = "", size = 24, color = "var(--sun)" }: DecProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="var(--ink)"
      strokeWidth="2"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" />
    </svg>
  );
}

export function Squiggle({ className = "", color = "var(--coral)" }: { className?: string; color?: string }) {
  return (
    <svg
      width="64"
      height="18"
      viewBox="0 0 64 18"
      fill="none"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M2 9 Q9 2 16 9 T30 9 T44 9 T58 9" />
    </svg>
  );
}

export function Ring({ className = "", size = 32, color = "var(--sky)" }: DecProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="15" stroke={color} strokeWidth="4" />
      <circle cx="20" cy="20" r="8" fill={color} fillOpacity="0.25" />
    </svg>
  );
}

export function MiniHeart({ className = "", size = 20, color = "var(--coral)" }: DecProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke="var(--ink)"
      strokeWidth="2"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function DotsCluster({ className = "", color = "var(--ink)" }: DecProps) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill={color}
      className={`shrink-0 opacity-40 ${className}`}
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="30" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="18" r="3" />
      <circle cx="30" cy="18" r="3" />
      <circle cx="6" cy="30" r="3" />
      <circle cx="18" cy="30" r="3" />
      <circle cx="30" cy="30" r="3" />
    </svg>
  );
}

export function PillBadge({
  text,
  className = "",
  bg = "var(--sun)",
  color = "var(--ink)",
}: {
  text: string;
  className?: string;
  bg?: string;
  color?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border-2 border-[var(--ink)] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider shadow-[2px_2px_0px_var(--ink)] ${className}`}
      style={{ backgroundColor: bg, color }}
    >
      {text}
    </span>
  );
}
