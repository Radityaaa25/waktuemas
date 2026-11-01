const INK = "#e8eefc";
const DIM = "#5b6b86";
const HOPE = "#5eead4";
const ALERT = "#ff5277";
const WARN = "#f5b04d";
const SKY = "#7dd3fc";
const INDEX_TEXT = "#c7d2e3";

function Person({
  x,
  y,
  scale = 1,
  color = DIM,
  opacity = 0.55,
}: {
  x: number;
  y: number;
  scale?: number;
  color?: string;
  opacity?: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      stroke={color}
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
    >
      <circle cx={0} cy={-26} r={9} />
      <path d="M0 -17v26" />
      <path d="M0 -8l-12 10M0 -8l12 10" />
      <path d="M0 9l-9 22M0 9l9 22" />
    </g>
  );
}

function Grid() {
  return (
    <>
      <defs>
        <pattern id="story-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke={INK} strokeOpacity="0.06" />
        </pattern>
        <radialGradient id="story-glow" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor={HOPE} stopOpacity="0.16" />
          <stop offset="100%" stopColor={HOPE} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="story-alert" cx="50%" cy="55%" r="62%">
          <stop offset="0%" stopColor={ALERT} stopOpacity="0.18" />
          <stop offset="100%" stopColor={ALERT} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="story-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={HOPE} />
          <stop offset="60%" stopColor={WARN} />
          <stop offset="100%" stopColor={ALERT} />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#story-grid)" />
    </>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 800 600"
      className="relative h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <Grid />
      {children}
    </svg>
  );
}

function Chip({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 font-mono text-[0.5625rem] tracking-[0.18em] text-white/70 uppercase backdrop-blur-sm sm:text-[0.625rem] ${className}`}
    >
      {children}
    </span>
  );
}

export function OpeningScene() {
  return (
    <div className="absolute inset-0" data-scene-visual="opening">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#0f2b33_0%,#070b14_66%)]" />
      <Frame>
        <ellipse cx="400" cy="300" rx="250" ry="250" fill="url(#story-glow)" />
        <circle
          cx="400"
          cy="300"
          r="196"
          fill="none"
          stroke={INK}
          strokeOpacity="0.14"
          strokeWidth="2"
        />
        <circle
          cx="400"
          cy="300"
          r="196"
          fill="none"
          stroke={HOPE}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="1"
          pathLength={1}
          strokeDashoffset={0.15}
          transform="rotate(-90 400 300)"
          data-anim="opening-ring"
        />
        {Array.from({ length: 24 }).map((_, index) => {
          const angle = (index / 24) * Math.PI * 2;
          const inner = index % 6 === 0 ? 214 : 222;
          return (
            <line
              key={index}
              x1={400 + Math.cos(angle) * inner}
              y1={300 + Math.sin(angle) * inner}
              x2={400 + Math.cos(angle) * 230}
              y2={300 + Math.sin(angle) * 230}
              stroke={INK}
              strokeOpacity={index % 6 === 0 ? 0.5 : 0.18}
              strokeWidth="2"
            />
          );
        })}
        <text
          x="400"
          y="318"
          textAnchor="middle"
          fill={INK}
          fontSize="126"
          fontFamily="var(--font-jetbrains), monospace"
          letterSpacing="-6"
          data-anim="opening-time"
        >
          4:00
        </text>
        <text
          x="400"
          y="362"
          textAnchor="middle"
          fill={HOPE}
          fontSize="15"
          letterSpacing="9"
          fontFamily="var(--font-jetbrains), monospace"
        >
          MENIT EMAS
        </text>
        <path
          d="M60 470h96l22-44 30 92 34-150 26 102h56l18-34 22 34h96l20-58 26 58h150"
          fill="none"
          stroke={HOPE}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          data-anim="opening-ecg"
        />
        <path
          d="M60 540h680"
          stroke={INK}
          strokeOpacity="0.08"
          strokeWidth="2"
        />
      </Frame>
      <div className="absolute inset-x-0 top-16 flex items-center justify-between p-4 sm:top-20 sm:p-6">
        <Chip>
          <span className="size-1.5 animate-pulse rounded-full bg-[#5eead4]" />
          Henti jantung
        </Chip>
        <Chip>0:00 / 4:00</Chip>
      </div>
    </div>
  );
}

export function CollapseScene() {
  return (
    <div className="absolute inset-0" data-scene-visual="collapse">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_45%,#3a0b18_0%,#070b14_68%)]" />
      <Frame>
        <ellipse cx="480" cy="300" rx="300" ry="240" fill="url(#story-alert)" />
        <g opacity="0.9">
          {Array.from({ length: 10 }).map((_, index) => {
            const column = index % 5;
            const row = Math.floor(index / 5);
            const lit = index < 4;
            return (
              <g key={index} data-anim="collapse-person" data-lit={lit || undefined}>
                <Person
                  x={150 + column * 96}
                  y={170 + row * 150}
                  scale={1.35}
                  color={lit ? HOPE : DIM}
                  opacity={lit ? 0.95 : 0.3}
                />
                {lit ? (
                  <circle
                    cx={150 + column * 96}
                    cy={162 + row * 150 - 26}
                    r={26}
                    fill="none"
                    stroke={HOPE}
                    strokeOpacity="0.28"
                    strokeWidth="2"
                  />
                ) : null}
              </g>
            );
          })}
        </g>
        <g data-anim="collapse-fallen">
          <Person x={400} y={470} scale={1.8} color={ALERT} opacity={0.95} />
        </g>
        <text
          x="150"
          y="540"
          fill={INK}
          fontSize="14"
          letterSpacing="5"
          fontFamily="var(--font-jetbrains), monospace"
          opacity="0.5"
        >
          ORANG DI SEKITAR
        </text>
        <text
          x="640"
          y="540"
          fill={HOPE}
          fontSize="14"
          letterSpacing="5"
          fontFamily="var(--font-jetbrains), monospace"
          opacity="0.8"
        >
          YANG MENOLONG
        </text>
      </Frame>
      <div className="absolute top-28 right-4 text-right sm:top-1/2 sm:right-8 sm:-translate-y-1/2">
        <p
          className="numeric text-[clamp(3.5rem,10vw,8rem)] leading-none font-medium text-[#5eead4]"
          data-anim="collapse-number"
        >
          0%
        </p>
        <p className="mt-1 font-mono text-[0.5625rem] tracking-[0.2em] text-white/50 uppercase sm:text-[0.625rem]">
          CPR oleh orang sekitar
        </p>
        <p className="mt-2 text-[0.5625rem] text-white/35 sm:text-[0.625rem]">
          AHA 2025 &middot; data AS 2024
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 hidden items-center justify-between p-4 sm:p-6 lg:flex">
        <Chip>4 dari 10</Chip>
        <Chip className="border-[#ff5277]/30 text-[#ffb3c2]">Detik 0</Chip>
      </div>
    </div>
  );
}

export function HesitateScene() {
  return (
    <div className="absolute inset-0" data-scene-visual="hesitate">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,#2b1c06_0%,#070b14_70%)]" />
      <Frame>
        <ellipse cx="400" cy="360" rx="280" ry="200" fill="url(#story-alert)" />
        <g data-anim="hesitate-fallen">
          <Person x={400} y={420} scale={1.7} color={ALERT} opacity={0.9} />
        </g>
        <Person x={250} y={300} scale={1.35} color={DIM} opacity={0.4} />
        <Person x={550} y={300} scale={1.35} color={DIM} opacity={0.4} />
        <Person x={620} y={380} scale={1.15} color={DIM} opacity={0.28} />
        <g data-anim="hesitate-hands" opacity="0.9">
          <circle
            cx="400"
            cy="350"
            r="96"
            fill="none"
            stroke={WARN}
            strokeOpacity="0.22"
            strokeWidth="2"
            strokeDasharray="4 10"
          />
          <path
            d="M400 350L400 264"
            stroke={WARN}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
        <text
          x="400"
          y="150"
          textAnchor="middle"
          fill={WARN}
          fontSize="86"
          fontFamily="var(--font-jetbrains), monospace"
        >
          0:30
        </text>
        <text
          x="400"
          y="190"
          textAnchor="middle"
          fill={INK}
          fontSize="13"
          letterSpacing="6"
          fontFamily="var(--font-jetbrains), monospace"
          opacity="0.55"
        >
          TANPA KOMPRESI
        </text>
      </Frame>
      <div className="absolute inset-x-0 bottom-0 hidden items-center justify-between p-4 sm:p-6 lg:flex">
        <Chip className="border-[#f5b04d]/30 text-[#f7d29a]">
          Timer tetap berjalan
        </Chip>
        <Chip>Detik 30</Chip>
      </div>
    </div>
  );
}

export function DeclineScene() {
  return (
    <div className="absolute inset-0" data-scene-visual="decline">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,#30100f_0%,#070b14_72%)]" />
      <Frame>
        {[160, 240, 320, 400].map((y) => (
          <line
            key={y}
            x1="80"
            x2="720"
            y1={y}
            y2={y}
            stroke={INK}
            strokeOpacity="0.08"
          />
        ))}
        <path
          d="M80 120 C220 128 300 210 400 290 C500 370 600 430 720 470 L720 520 L80 520 Z"
          fill={ALERT}
          fillOpacity="0.08"
          data-anim="decline-area"
        />
        <path
          d="M80 120 C220 128 300 210 400 290 C500 370 600 430 720 470"
          fill="none"
          stroke="url(#story-line)"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          data-anim="decline-line"
        />
        <line
          x1="80"
          x2="720"
          y1="520"
          y2="520"
          stroke={INK}
          strokeOpacity="0.18"
        />
        <circle cx="80" cy="120" r="6" fill={HOPE} />
        <circle cx="720" cy="470" r="6" fill={ALERT} />
        <text
          x="92"
          y="108"
          fill={HOPE}
          fontSize="13"
          letterSpacing="4"
          fontFamily="var(--font-jetbrains), monospace"
        >
          LEBIH CEPAT
        </text>
        <text
          x="708"
          y="500"
          textAnchor="end"
          fill={ALERT}
          fontSize="13"
          letterSpacing="4"
          fontFamily="var(--font-jetbrains), monospace"
        >
          SEMAKIN LAMA
        </text>
        <text
          x="400"
          y="575"
          textAnchor="middle"
          fill={INK}
          fontSize="12"
          letterSpacing="4"
          fontFamily="var(--font-jetbrains), monospace"
          opacity="0.45"
        >
          ILUSTRASI MODEL &middot; BUKAN PREDIKSI
        </text>
      </Frame>
      <div className="absolute right-4 bottom-20 text-right sm:right-8">
        <p className="numeric text-[clamp(2.75rem,7vw,5rem)] leading-none font-medium text-[#ff8fa8]">
          10,5%
        </p>
        <p className="mt-1 font-mono text-[0.5625rem] tracking-[0.18em] text-white/50 uppercase">
          bertahan hidup
        </p>
      </div>
      <div className="absolute inset-x-0 top-16 flex items-center justify-between p-4 sm:top-20 sm:p-6">
        <Chip className="border-[#ff5277]/30 text-[#ffb3c2]">
          Menit 1 &rarr; 4
        </Chip>
        <Chip>Tanpa penolong</Chip>
      </div>
    </div>
  );
}

export function RewindScene() {
  return (
    <div className="absolute inset-0" data-scene-visual="rewind">
      <div className="absolute inset-0 bg-[#050810]" />
      <div className="absolute inset-0 opacity-70">
        <Frame>
          {Array.from({ length: 18 }).map((_, index) => (
            <rect
              key={index}
              x={index % 2 === 0 ? -40 : 120}
              y={index * 34 + 6}
              width={index % 3 === 0 ? 900 : 680}
              height={index % 4 === 0 ? 3 : 1}
              fill={index % 5 === 0 ? HOPE : ALERT}
              opacity={index % 5 === 0 ? 0.35 : 0.2}
              data-anim="rewind-band"
            />
          ))}
          <path
            d="M600 210a160 160 0 1 0 10 170"
            fill="none"
            stroke={SKY}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="1"
            pathLength={1}
            data-anim="rewind-arc"
          />
          <path
            d="M590 170l34 44-54 10z"
            fill={SKY}
            data-anim="rewind-arrow"
          />
        </Frame>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="font-mono text-[0.625rem] tracking-[0.35em] text-[#7dd3fc] uppercase">
          rewinding
        </p>
        <p className="numeric mt-3 text-[clamp(4rem,16vw,11rem)] leading-none font-medium text-white">
          0:00
        </p>
        <p className="mt-2 font-mono text-xs tracking-[0.3em] text-white/40 line-through">
          4:00
        </p>
      </div>
      <div className="absolute inset-x-0 bottom-0 hidden items-center justify-between p-4 sm:p-6 lg:flex">
        <Chip className="border-[#7dd3fc]/30 text-[#bae6fd]">
          Putar ulang cerita
        </Chip>
        <Chip>Detik nol lagi</Chip>
      </div>
    </div>
  );
}

export function RespondScene() {
  const steps = ["Aman", "Panggil", "Tekan", "AED", "Lanjut"];
  return (
    <div className="absolute inset-0" data-scene-visual="respond">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,#062e2b_0%,#070b14_70%)]" />
      <Frame>
        <ellipse cx="400" cy="300" rx="290" ry="240" fill="url(#story-glow)" />
        <g data-anim="respond-body">
          <Person x={400} y={300} scale={2.1} color={INK} opacity={0.9} />
          <circle
            cx="400"
            cy="248"
            r="70"
            fill="none"
            stroke={HOPE}
            strokeOpacity="0.22"
            strokeWidth="2"
            strokeDasharray="4 8"
            data-anim="respond-pulse"
          />
        </g>
        <g data-anim="respond-hands">
          <path
            d="M360 300h80M370 318h60"
            stroke={HOPE}
            strokeWidth="7"
            strokeLinecap="round"
          />
        </g>
        <path
          d="M80 500h640"
          stroke={INK}
          strokeOpacity="0.1"
          strokeWidth="2"
        />
        {steps.map((label, index) => {
          const x = 120 + index * 140;
          return (
            <g
              key={label}
              data-anim="respond-step"
              data-step={index}
              opacity={index === 0 ? 1 : 0.35}
            >
              <circle
                cx={x}
                cy={470}
                r="24"
                fill={index < 3 ? HOPE : WARN}
                fillOpacity={index < 3 ? 0.16 : 0.14}
                stroke={index < 3 ? HOPE : WARN}
                strokeOpacity="0.6"
              />
              <text
                x={x}
                y={477}
                textAnchor="middle"
                fill={INK}
                fontSize="15"
                fontFamily="var(--font-jetbrains), monospace"
              >
                {index + 1}
              </text>
              <text
                x={x}
                y={535}
                textAnchor="middle"
                fill={INDEX_TEXT}
                fontSize="16"
                fontFamily="var(--font-jakarta), sans-serif"
              >
                {label}
              </text>
            </g>
          );
        })}
        <text
          x="400"
          y="150"
          textAnchor="middle"
          fill={HOPE}
          fontSize="70"
          fontFamily="var(--font-jetbrains), monospace"
        >
          100&ndash;120
        </text>
        <text
          x="400"
          y="180"
          textAnchor="middle"
          fill={INK}
          fontSize="12"
          letterSpacing="5"
          fontFamily="var(--font-jetbrains), monospace"
          opacity="0.55"
        >
          KOMPRESI / MENIT
        </text>
      </Frame>
      <div className="absolute inset-x-0 bottom-0 hidden items-center justify-between p-4 sm:p-6 lg:flex">
        <Chip className="border-[#5eead4]/30 text-[#99f6e4]">
          5 &ndash; 6 cm
        </Chip>
        <Chip>30 : 2 jika terlatih</Chip>
      </div>
    </div>
  );
}


export function ChainScene() {
  const nodes = ["Penolong", "Panggil", "CPR", "AED", "Ambulans", "Rumah sakit"];
  return (
    <div className="absolute inset-0" data-scene-visual="chain">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a2f2b_0%,#070b14_72%)]" />
      <Frame>
        <path
          d="M80 300h640"
          stroke={INK}
          strokeOpacity="0.1"
          strokeWidth="2"
          strokeDasharray="5 9"
        />
        {nodes.map((label, index) => {
          const x = 80 + index * 128;
          return (
            <g key={label} data-anim="chain-node" data-step={index}>
              <circle
                cx={x}
                cy={300}
                r="34"
                fill="#07120f"
                stroke={index < 3 ? HOPE : WARN}
                strokeWidth="2.5"
                strokeOpacity="0.9"
              />
              <circle
                cx={x}
                cy={300}
                r="14"
                fill={index < 3 ? HOPE : WARN}
                fillOpacity="0.9"
                data-anim="chain-dot"
              />
              <text
                x={x}
                y={372}
                textAnchor="middle"
                fill={INDEX_TEXT}
                fontSize="14"
                fontFamily="var(--font-jakarta), sans-serif"
              >
                {label}
              </text>
            </g>
          );
        })}
        <text
          x="400"
          y="130"
          textAnchor="middle"
          fill={HOPE}
          fontSize="14"
          letterSpacing="8"
          fontFamily="var(--font-jetbrains), monospace"
        >
          RANTAI PERTOLONGAN
        </text>
        <text
          x="400"
          y="470"
          textAnchor="middle"
          fill={INK}
          fontSize="28"
          fontFamily="var(--font-bricolage), sans-serif"
          opacity="0.9"
        >
          Satu orang cukup untuk memulai.
        </text>
      </Frame>
      <div className="absolute inset-x-0 bottom-0 hidden flex-wrap items-center justify-between gap-2 p-4 sm:p-6 lg:flex">
        <div className="flex gap-2">
          <a
            href="tel:112"
            className="inline-flex min-h-11 items-center rounded-full border border-[#5eead4]/40 bg-[#5eead4]/10 px-4 font-mono text-sm text-[#99f6e4]"
          >
            112
          </a>
          <a
            href="tel:119"
            className="inline-flex min-h-11 items-center rounded-full border border-[#5eead4]/40 bg-[#5eead4]/10 px-4 font-mono text-sm text-[#99f6e4]"
          >
            119
          </a>
        </div>
        <Chip>Kenali &middot; Panggil &middot; Tekan &middot; AED</Chip>
      </div>
    </div>
  );
}

export const sceneVisuals = {
  opening: OpeningScene,
  collapse: CollapseScene,
  hesitate: HesitateScene,
  decline: DeclineScene,
  rewind: RewindScene,
  respond: RespondScene,
  chain: ChainScene,
} as const;
