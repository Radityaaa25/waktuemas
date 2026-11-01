import { type CSSProperties } from "react";

export type BackgroundVariant = "dots" | "grid" | "soft";

interface SceneBackgroundProps {
  variant?: BackgroundVariant;
  tint?: string;
  className?: string;
}

export function SceneBackground({
  variant = "dots",
  tint = "var(--ink)",
  className = "",
}: SceneBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Lapisan Blob Lembut Bergerak Pelan di Sudut */}
      <div
        data-el="bg-blob-1"
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl opacity-35"
        style={{
          background:
            variant === "grid"
              ? "radial-gradient(circle, var(--cool) 0%, transparent 70%)"
              : "radial-gradient(circle, var(--peach) 0%, transparent 70%)",
        }}
      />
      <div
        data-el="bg-blob-2"
        className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30"
        style={{
          background:
            variant === "grid"
              ? "radial-gradient(circle, var(--sky) 0%, transparent 70%)"
              : "radial-gradient(circle, var(--sun) 0%, transparent 70%)",
        }}
      />

      {/* Tekstur Pola Dot Grid atau Line Grid dengan Radial Mask */}
      {variant === "dots" ? (
        <div
          data-el="bg-pattern"
          className="absolute inset-0"
          style={
            {
              backgroundImage: `radial-gradient(color-mix(in oklab, ${tint} 12%, transparent) 1.5px, transparent 1.5px)`,
              backgroundSize: "26px 26px",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, transparent 15%, black 80%)",
              maskImage:
                "radial-gradient(ellipse at center, transparent 15%, black 80%)",
            } as CSSProperties
          }
        />
      ) : variant === "grid" ? (
        <div
          data-el="bg-pattern"
          className="absolute inset-0"
          style={
            {
              backgroundImage: `
                linear-gradient(color-mix(in oklab, ${tint} 8%, transparent) 1px, transparent 1px),
                linear-gradient(90deg, color-mix(in oklab, ${tint} 8%, transparent) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, transparent 20%, black 85%)",
              maskImage:
                "radial-gradient(ellipse at center, transparent 20%, black 85%)",
            } as CSSProperties
          }
        />
      ) : (
        <div
          data-el="bg-pattern"
          className="absolute inset-0"
          style={
            {
              backgroundImage: `radial-gradient(color-mix(in oklab, ${tint} 8%, transparent) 2px, transparent 2px)`,
              backgroundSize: "44px 44px",
              opacity: 0.6,
            } as CSSProperties
          }
        />
      )}
    </div>
  );
}
