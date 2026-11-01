export type TransitionVariant =
  | "circle-wipe"
  | "diagonal-stripes"
  | "wave"
  | "none";

interface TransitionOverlayProps {
  variant?: TransitionVariant;
  color?: string; // warna penutup layar
  secondaryColor?: string;
  className?: string;
}

export function TransitionOverlay({
  variant = "none",
  color = "var(--coral)",
  secondaryColor = "var(--sun)",
  className = "",
}: TransitionOverlayProps) {
  if (variant === "none") return null;

  if (variant === "circle-wipe") {
    return (
      <div
        aria-hidden="true"
        data-el="transition-overlay"
        className={`pointer-events-none absolute inset-0 z-40 overflow-hidden ${className}`}
      >
        <div
          data-el="trans-circle"
          className="absolute top-1/2 left-1/2 h-[180vmax] w-[180vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            backgroundColor: color,
            clipPath: "circle(0% at 50% 50%)",
          }}
        />
      </div>
    );
  }

  if (variant === "diagonal-stripes") {
    return (
      <div
        aria-hidden="true"
        data-el="transition-overlay"
        className={`pointer-events-none absolute inset-0 z-40 overflow-hidden flex flex-col ${className}`}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            data-el="trans-stripe"
            className="h-1/4 w-full origin-left -rotate-1 scale-x-0"
            style={{
              backgroundColor: i % 2 === 0 ? color : secondaryColor,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
