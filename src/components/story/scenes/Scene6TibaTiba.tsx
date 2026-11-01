import type { SceneBuildFn } from "@/lib/sceneTimeline";
import {
  createAmbientRegistry,
  breathe,
  blink,
  wobble,
  twinkle,
  type AmbientController,
} from "@/lib/ambient";
import { SceneBackground } from "@/components/motion/SceneBackground";
import {
  PlusSign,
  Ring,
  PillBadge,
} from "@/components/motion/Decorations";

export function setupScene6Ambient(stage: HTMLElement): AmbientController {
  const reg = createAmbientRegistry();

  // Penonton sadar bernapas halus & berkedip
  const bystandersBody = stage.querySelectorAll("[data-el='bystander-body']");
  bystandersBody.forEach((body, i) => {
    reg.add(breathe(body, { scale: 1.02, duration: 2.5 + i * 0.4 }));
  });

  const bystandersEyes = stage.querySelectorAll("[data-el='bystander-eyes']");
  bystandersEyes.forEach((eyes, i) => {
    reg.add(blink(eyes, 3.4 + i * 0.6));
  });

  // Tanda tanya bergoyang bergantian dengan fase berbeda
  const qmarks = stage.querySelectorAll("[data-el='qmark']");
  qmarks.forEach((q, i) => {
    reg.add(wobble(q, 10 + i * 4, 1.8 + i * 0.3));
  });

  // Ring denyut lemah di dada Ardi (korban TIDAK diberi animasi napas)
  const ardiChestPulse = stage.querySelector("[data-el='ardi-weak-pulse']");
  if (ardiChestPulse) {
    reg.add(twinkle(ardiChestPulse, 0.4));
  }

  return reg.controller;
}

export const buildScene6: SceneBuildFn = (tl, { container }) => {
  const headline = container.querySelector("[data-el='headline']");
  const badge = container.querySelector("[data-el='badge']");
  const ardi = container.querySelector("[data-el='ardi-group']");
  const bystanders = container.querySelector("[data-el='bystanders-group']");
  const qmarks = container.querySelectorAll("[data-el='qmark']");
  const subtext = container.querySelector("[data-el='subtext']");
  const cue = container.querySelector("[data-el='cue']");

  // IN (0 -> 30): 3 arah masuk berbeda
  // Teks dari atas, Bystanders dari kiri, Ardi rebah jatuh dari atas-tengah dengan pantulan
  tl.fromTo(badge, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 15 }, 0)
    .fromTo(headline, { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 24 }, 4)
    .fromTo(subtext, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 18 }, 10)
    .fromTo(
      bystanders,
      { x: -140, opacity: 0 },
      { x: 0, opacity: 1, duration: 26, ease: "power2.out" },
      6,
    )
    .fromTo(
      ardi,
      { y: -160, rotation: -18, opacity: 0 },
      { y: 0, rotation: 0, opacity: 1, duration: 28, ease: "bounce.out" },
      8,
    )
    .fromTo(
      qmarks,
      { scale: 0, opacity: 0, rotation: (i) => (i % 2 === 0 ? -40 : 40) },
      { scale: 1.2, opacity: 1, rotation: 0, stagger: 3, duration: 20 },
      14,
    )
    .fromTo(cue, { opacity: 0 }, { opacity: 0.75, duration: 14 }, 18);

  // HOLD (30 -> 70): Suasana hening kantin membeku
  tl.to(bystanders, { x: 8, duration: 40 }, 30)
    .to(qmarks, { y: (i) => (i % 2 === 0 ? -16 : 16), stagger: 2, duration: 40 }, 30);

  // OUT (70 -> 100): Transisi keluar
  tl.to(headline, { y: -80, opacity: 0, duration: 18 }, 76)
    .to(subtext, { opacity: 0, duration: 14 }, 76)
    .to(qmarks, { y: -100, opacity: 0, stagger: 1.5, duration: 16 }, 76)
    .to(bystanders, { x: -160, opacity: 0, duration: 20 }, 78)
    .to(ardi, { opacity: 0.35, scale: 0.94, duration: 20 }, 80)
    .to(cue, { opacity: 0, duration: 12 }, 82);
};

export function Scene6TibaTiba() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between px-6 py-8 md:py-12 text-center select-none">
      {/* Background line grid dingin (Jalur A / Kantin) */}
      <SceneBackground variant="grid" tint="var(--ink)" />

      {/* Tanda Tanya Melayang dari 4 Sudut */}
      <div
        data-el="qmark"
        className="pointer-events-none absolute left-6 md:left-24 top-20 text-3xl md:text-5xl font-black text-[var(--coral)] -rotate-12 select-none"
      >
        ?
      </div>
      <div
        data-el="qmark"
        className="pointer-events-none absolute right-8 md:right-32 top-24 text-4xl md:text-6xl font-black text-[var(--sun)] rotate-12 select-none"
      >
        ?
      </div>
      <div
        data-el="qmark"
        className="pointer-events-none absolute left-10 md:left-28 bottom-28 text-3xl md:text-5xl font-black text-[var(--coral)] rotate-6 select-none"
      >
        ?
      </div>
      <div
        data-el="qmark"
        className="pointer-events-none absolute right-10 md:right-32 bottom-32 text-4xl md:text-6xl font-black text-[var(--sun)] -rotate-6 select-none"
      >
        ?
      </div>

      {/* Dekorasi kecil */}
      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
        <PlusSign size={20} color="var(--ink)" />
      </div>
      <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2">
        <Ring size={32} color="var(--coral)" />
      </div>

      {/* Bagian Atas: Kicker & Headline */}
      <div className="z-10 mt-2 max-w-4xl">
        <div data-el="badge" className="inline-block mb-3">
          <PillBadge text="DETIK NOL" bg="var(--coral)" color="#FFFFFF" />
        </div>
        <h2
          data-el="headline"
          className="font-display text-[clamp(2.3rem,6.2vw,5rem)] leading-none font-extrabold text-[var(--ink)]"
        >
          Ardi jatuh.
          <br />
          Semua berhenti. Semua bingung.
        </h2>
        <p
          data-el="subtext"
          className="mt-3 text-sm md:text-lg font-medium text-[var(--ink)]/80 max-w-xl mx-auto"
        >
          Bukan karena mereka tidak peduli. Banyak yang belum pernah diajari apa yang harus dilakukan.
        </p>
      </div>

      {/* Bagian Tengah: Karakter Inline SVG (Bystanders + Ardi Rebah Tanpa Animasi Napas) */}
      <div className="relative my-auto flex w-full max-w-4xl flex-col md:flex-row items-center justify-center gap-6 md:gap-14 z-10 py-4">
        {/* Orang Sekitar yang Membeku (Bystanders) dengan Animasi Bernapas & Kedip */}
        <div data-el="bystanders-group" className="relative shrink-0">
          <svg
            viewBox="0 0 320 280"
            className="h-36 w-auto md:h-64 object-contain drop-shadow-[2px_4px_0px_var(--ink)]"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Penonton 1 (Kiri - Tutup Mulut) */}
            <g transform="translate(40, 20)">
              <g data-el="bystander-head">
                <circle cx="40" cy="40" r="18" fill="#FFE3D6" />
                <path d="M28 34 C32 24, 52 24, 56 34 Z" fill="var(--ink)" />
                <g data-el="bystander-eyes">
                  <circle cx="36" cy="40" r="2" fill="var(--ink)" stroke="none" />
                  <circle cx="46" cy="40" r="2" fill="var(--ink)" stroke="none" />
                </g>
              </g>
              <g data-el="bystander-body">
                <path d="M28 80 L36 54 C38 48, 48 48, 46 54 L44 80" fill="var(--mint)" />
                <path d="M30 70 C30 65, 52 65, 52 70 L54 160 L26 160 Z" fill="var(--mint)" />
                <path d="M32 160 L32 230 L48 230 L48 160" fill="var(--ink)" />
              </g>
            </g>

            {/* Penonton 2 (Tengah - Menunjuk Ragu) */}
            <g transform="translate(140, 0)">
              <g data-el="bystander-head">
                <circle cx="45" cy="42" r="19" fill="#FFE3D6" />
                <path d="M32 36 C36 24, 58 24, 62 36 Z" fill="var(--lilac)" />
                <g data-el="bystander-eyes">
                  <circle cx="40" cy="42" r="2" fill="var(--ink)" stroke="none" />
                  <circle cx="50" cy="42" r="2" fill="var(--ink)" stroke="none" />
                </g>
              </g>
              <g data-el="bystander-body">
                <path d="M30 72 C32 68, 60 68, 62 72 L64 165 L28 165 Z" fill="var(--sun)" />
                <path d="M60 85 L95 110 L105 105" strokeWidth="4" />
                <circle cx="108" cy="104" r="5" fill="#FFE3D6" />
                <path d="M34 165 L36 240 L58 240 L56 165" fill="var(--ink)" />
              </g>
            </g>
          </svg>
        </div>

        {/* Korban Rebah di Lantai (Ardi) - TIDAK ADA ANIMASI PERNAPASAN */}
        <div data-el="ardi-group" className="relative shrink-0">
          <svg
            viewBox="0 0 380 140"
            className="h-28 w-auto md:h-44 object-contain drop-shadow-[3px_5px_0px_var(--ink)]"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Bayangan di lantai */}
            <ellipse cx="190" cy="115" rx="160" ry="14" fill="var(--cool)" stroke="none" />

            {/* Ring denyut lemah di dada Ardi (bukan napas) */}
            <circle
              data-el="ardi-weak-pulse"
              cx="200"
              cy="84"
              r="22"
              fill="none"
              stroke="var(--coral)"
              strokeWidth="2.5"
              strokeDasharray="4 6"
              className="opacity-75"
            />

            {/* Kaki / Sepatu */}
            <ellipse cx="54" cy="98" rx="12" ry="7" fill="var(--paper)" />
            <ellipse cx="68" cy="102" rx="12" ry="7" fill="var(--paper)" />
            {/* Celana */}
            <path d="M58 98 L160 92 C165 92, 165 106, 160 106 L72 104 Z" fill="var(--ink)" />
            <path d="M110 92 L160 90 L160 102 L110 100 Z" fill="var(--ink)" opacity="0.9" />

            {/* Badan Kaos Kuning */}
            <path
              d="M158 86 C165 72, 230 72, 240 88 L235 110 C225 116, 160 114, 155 106 Z"
              fill="var(--sun)"
            />

            {/* Lengan terkulai di lantai */}
            <path d="M210 88 L180 108 L140 112" fill="none" strokeWidth="6" stroke="var(--sun)" />
            <circle cx="136" cy="112" r="7" fill="#FFE3D6" />

            {/* Kepala rebah */}
            <path d="M238 90 L252 90" strokeWidth="5" />
            <ellipse cx="278" cy="88" rx="24" ry="20" fill="#FFE3D6" />
            <path d="M260 76 C270 66, 296 68, 302 82 C295 78, 275 75, 260 76 Z" fill="var(--ink)" />
            <path d="M272 88 Q276 92 280 88" strokeWidth="2.5" fill="none" />
            <path d="M225 84 Q210 78 195 86" strokeWidth="5" fill="none" />
            <circle cx="192" cy="87" r="6" fill="#FFE3D6" />
          </svg>
        </div>
      </div>

      {/* Petunjuk Cerita Bawah */}
      <div data-el="cue" className="z-10 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--ink)]/65">
          Apa yang harus dilakukan dalam 10 detik pertama?
        </p>
      </div>
    </div>
  );
}
