import type { EcgState } from "@/data/content";

const BEAT_SHAPE: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [0.1, 0],
  [0.14, -0.16],
  [0.18, 0],
  [0.27, 0],
  [0.3, 0.06],
  [0.35, 1],
  [0.39, -0.62],
  [0.43, 0.14],
  [0.46, 0],
  [0.61, 0],
  [0.69, 0.18],
  [0.8, 0],
  [1, 0],
];

const CPR_SHAPE: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [0.12, 0.06],
  [0.3, 0.82],
  [0.48, 1],
  [0.66, 0.82],
  [0.86, 0.06],
  [1, 0],
];

const AMPLITUDE: Record<EcgState, number> = {
  normal: 38,
  irregular: 34,
  weak: 15,
  flatline: 0,
  cpr: 24,
  recovered: 36,
};

function ecgPath(state: EcgState, width = 600, height = 120): string {
  const baseline = height * 0.64;

  if (state === "flatline") {
    return `M 0 ${baseline} L ${width} ${baseline}`;
  }

  const isCpr = state === "cpr";
  const shape = isCpr ? CPR_SHAPE : BEAT_SHAPE;
  const beatWidth = isCpr ? 52 : 84;
  const beats = Math.ceil(width / beatWidth) + 1;
  const irregularScale = [1, 0.62, 1.12, 0.46, 0.9, 1.24];

  const command: string[] = [`M 0 ${baseline}`];

  for (let beat = 0; beat < beats; beat += 1) {
    const offset = beat * beatWidth;
    const scale =
      state === "irregular"
        ? (irregularScale[beat % irregularScale.length] ?? 1)
        : state === "weak"
          ? 0.62
          : 1;
    const amplitude = AMPLITUDE[state] * scale;

    for (const [position, value] of shape) {
      const x = offset + position * beatWidth;
      if (x > width) break;
      const y = baseline - value * amplitude;
      command.push(`L ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
  }

  command.push(`L ${width} ${baseline}`);
  return command.join(" ");
}

interface EcgLineProps {
  state: EcgState;
  className?: string;
  label?: string;
  ariaHidden?: boolean;
  width?: number;
  height?: number;
}

export function EcgLine({
  state,
  className,
  label,
  ariaHidden = false,
  width = 600,
  height = 120,
}: EcgLineProps) {
  const path = ecgPath(state, width, height);
  const baseline = height * 0.64;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role={ariaHidden ? "presentation" : "img"}
      aria-hidden={ariaHidden || undefined}
      aria-label={ariaHidden ? undefined : (label ?? "Garis detak jantung ilustratif")}
      preserveAspectRatio="none"
    >
      <line
        x1={0}
        x2={width}
        y1={baseline}
        y2={baseline}
        stroke="currentColor"
        strokeOpacity={0.16}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.2}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        data-ecg-path
      />
    </svg>
  );
}
