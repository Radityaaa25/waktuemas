interface MarqueeTapeProps {
  text: string;
  repeat?: number;
  rotation?: number;
  bg?: string;
  color?: string;
  className?: string;
  speed?: number;
}

export function MarqueeTape({
  text,
  repeat = 8,
  rotation = -2,
  bg = "var(--sun)",
  color = "var(--ink)",
  className = "",
  speed = 70,
}: MarqueeTapeProps) {
  const content = Array.from({ length: repeat })
    .map(() => `${text} ★ `)
    .join(" ");

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative w-[120%] -left-[10%] overflow-hidden py-1 border-y-2 border-[var(--ink)] shadow-[0_2px_8px_rgba(30,42,74,0.08)] select-none ${className}`}
      style={{
        backgroundColor: bg,
        color,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="flex w-max whitespace-nowrap font-mono text-xs md:text-sm font-black tracking-widest uppercase">
        <span
          data-el="marquee-track"
          className="inline-block"
          style={{ animation: `marquee ${speed}s linear infinite` }}
        >
          {content} {content}
        </span>
      </div>
    </div>
  );
}
