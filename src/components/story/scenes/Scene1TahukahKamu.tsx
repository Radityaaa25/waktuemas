import type { SceneBuildFn } from "@/lib/sceneTimeline";
import {
  createAmbientRegistry,
  breathe,
  blink,
  twinkle,
  float,
  type AmbientController,
} from "@/lib/ambient";
import { SceneBackground } from "@/components/motion/SceneBackground";
import {
  Sparkle,
  PlusSign,
  Ring,
  Squiggle,
  PillBadge,
} from "@/components/motion/Decorations";
import { MarqueeTape } from "@/components/motion/MarqueeTape";
import { TransitionOverlay } from "@/components/motion/TransitionOverlay";

export function setupScene1Ambient(stage: HTMLElement): AmbientController {
  const reg = createAmbientRegistry();

  // Pernapasan halus & kedipan pada 4 penolong yang sadar
  const litBodies = stage.querySelectorAll("[data-el='lit-body']");
  litBodies.forEach((body, i) => {
    reg.add(breathe(body, { scale: 1.025, duration: 2.4 + i * 0.4 }));
  });

  const litEyes = stage.querySelectorAll("[data-el='lit-eyes']");
  litEyes.forEach((eyes, i) => {
    reg.add(blink(eyes, 3.2 + i * 0.7));
  });

  // Twinkle bintang di sekitar penolong
  const sparkles = stage.querySelectorAll("[data-el='sparkle']");
  sparkles.forEach((s, i) => {
    reg.add(twinkle(s, i * 0.25));
  });

  // Floating dekorasi
  const decos = stage.querySelectorAll("[data-el='float-item']");
  decos.forEach((d, i) => {
    reg.add(float(d, { y: 12 + i * 4, duration: 3.2 + i * 0.5 }));
  });

  return reg.controller;
}

export const buildScene1: SceneBuildFn = (tl, { container }) => {
  const headline = container.querySelector("[data-el='headline']");
  const badge = container.querySelector("[data-el='badge']");
  const highlighter = container.querySelector("[data-el='highlighter']");
  const people = container.querySelectorAll("[data-el='person-col']");
  const litPeople = container.querySelectorAll("[data-el='person-lit']");
  const sparkles = container.querySelectorAll("[data-el='sparkle']");
  const countNum = container.querySelector("[data-el='counter-num']");
  const marquee = container.querySelector("[data-el='marquee']");
  const source = container.querySelector("[data-el='source']");
  const transStripes = container.querySelectorAll("[data-el='trans-stripe']");

  // IN (0 -> 30): Minimal 3 arah masuk berbeda
  tl.fromTo(badge, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 16 }, 0)
    .fromTo(headline, { y: -70, opacity: 0 }, { y: 0, opacity: 1, duration: 22 }, 4)
    .fromTo(
      highlighter,
      { scaleX: 0, opacity: 0, transformOrigin: "0% 50%" },
      { scaleX: 1, opacity: 1, duration: 18, ease: "power2.out" },
      14,
    )
    .fromTo(
      people,
      {
        y: (i) => (i % 2 === 0 ? 80 : -70),
        x: (i) => (i < 5 ? -60 : 60),
        opacity: 0,
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        stagger: 1.5,
        duration: 22,
      },
      6,
    )
    .fromTo(marquee, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 18 }, 12)
    .fromTo(source, { opacity: 0, y: 15 }, { opacity: 0.7, y: 0, duration: 14 }, 18);

  // HOLD (30 -> 70): Count-up 41,7% & penolong berkilau membesar
  const countObj = { val: 0 };
  tl.to(
    countObj,
    {
      val: 41.7,
      duration: 30,
      ease: "power1.out",
      onUpdate: () => {
        if (countNum) countNum.textContent = `${countObj.val.toFixed(1).replace(".", ",")}%`;
      },
    },
    28,
  )
    .to(
      litPeople,
      { scale: 1.1, duration: 15, repeat: 1, yoyo: true, ease: "power1.inOut" },
      32,
    )
    .fromTo(
      sparkles,
      { scale: 0, opacity: 0, rotation: -30 },
      { scale: 1.25, opacity: 1, rotation: 30, stagger: 2.5, duration: 18 },
      30,
    );

  // OUT & TRANSITION TO SCENE 6 (70 -> 100):
  // diagonal-stripes pita menyapu layar kiri ke kanan
  tl.to(headline, { y: -60, opacity: 0, duration: 18 }, 76)
    .to(people, { y: (i) => (i % 2 === 0 ? -90 : 90), opacity: 0, stagger: 1, duration: 18 }, 76)
    .to(marquee, { opacity: 0, duration: 14 }, 78)
    .to(source, { opacity: 0, duration: 12 }, 80)
    .fromTo(
      transStripes,
      { scaleX: 0 },
      { scaleX: 1, stagger: 3, duration: 22, ease: "power2.inOut" },
      75,
    );
};

export function Scene1TahukahKamu() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between px-6 py-8 md:py-12 text-center select-none">
      {/* Background tekstur dot grid biru muda */}
      <SceneBackground variant="dots" tint="var(--ink)" />

      {/* Dekorasi motion graphic */}
      <div data-el="float-item" className="pointer-events-none absolute left-8 top-20 z-10">
        <Sparkle size={28} color="var(--sun)" />
      </div>
      <div data-el="float-item" className="pointer-events-none absolute right-12 top-24 z-10">
        <Squiggle color="var(--coral)" />
      </div>
      <div data-el="float-item" className="pointer-events-none absolute left-12 bottom-28 z-10">
        <Ring size={36} color="var(--mint)" />
      </div>
      <div data-el="float-item" className="pointer-events-none absolute right-8 bottom-32 z-10">
        <PlusSign size={22} color="var(--ink)" />
      </div>

      {/* Bagian Atas: Kicker & Headline dengan Highlighter Swipe */}
      <div className="z-10 mt-2 max-w-4xl">
        <div data-el="badge" className="inline-block mb-3">
          <PillBadge text="FAKTA MENIT AWAL" bg="var(--coral)" color="#FFFFFF" />
        </div>
        <h2
          data-el="headline"
          className="font-display text-[clamp(2.1rem,5.6vw,4.5rem)] leading-tight font-extrabold text-[var(--ink)]"
        >
          Tahukah kamu? Hanya{" "}
          <span className="relative inline-block px-2 text-[var(--ink)]">
            {/* Highlighter swipe di belakang kata */}
            <span
              data-el="highlighter"
              className="absolute inset-x-0 bottom-1.5 h-4/5 -rotate-1 rounded-md bg-[var(--sun)] -z-10 shadow-[2px_2px_0px_var(--ink)]"
            />
            <span className="relative text-[var(--coral)]">4 dari 10</span>
          </span>{" "}
          korban henti jantung yang langsung ditolong orang sekitar.
        </h2>
      </div>

      {/* Bagian Tengah: Komposisi Asimetris 10 Karakter + Counter Raksasa */}
      <div className="relative my-auto flex w-full max-w-5xl flex-col md:flex-row items-center justify-between gap-6 z-10">
        {/* Kolom Kiri: Baris 10 Karakter Vektor Flat */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3 items-end justify-items-center">
            {Array.from({ length: 10 }).map((_, i) => {
              const isLit = i < 4;
              return (
                <div
                  key={i}
                  data-el="person-col"
                  className={`relative flex flex-col items-center ${
                    isLit ? "z-10 drop-shadow-[0_8px_16px_rgba(255,201,77,0.4)]" : "opacity-45"
                  }`}
                >
                  {/* Badge penolong untuk 4 orang pertama */}
                  {isLit ? (
                    <div
                      data-el="sparkle"
                      className="absolute -top-7 rounded-full border border-[var(--ink)] bg-[var(--sun)] px-2 py-0.5 text-[0.5625rem] font-black text-[var(--ink)] whitespace-nowrap shadow-[1px_1px_0px_var(--ink)]"
                    >
                      Ditolong!
                    </div>
                  ) : null}

                  {/* Karakter Vektor Flat dengan Grup Animasi (Head, Eyes, Body) */}
                  <div data-el={isLit ? "person-lit" : undefined}>
                    <svg
                      viewBox="0 0 120 280"
                      className={`h-24 w-12 md:h-44 md:w-20 ${isLit ? "scale-105" : "grayscale opacity-75"}`}
                      fill="none"
                      stroke="var(--ink)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {/* Kepala & Rambut */}
                      <g data-el={isLit ? "lit-head" : undefined}>
                        <circle cx="60" cy="54" r="22" fill={isLit ? "#FFE3D6" : "#E3E8F5"} />
                        <path
                          d="M44 46 C48 34, 72 34, 76 46 C72 42, 48 42, 44 46 Z"
                          fill={isLit ? "var(--ink)" : "#556074"}
                        />
                        {/* Mata berkedip */}
                        <g data-el={isLit ? "lit-eyes" : undefined}>
                          <circle cx="53" cy="55" r="2.5" fill="var(--ink)" stroke="none" />
                          <circle cx="67" cy="55" r="2.5" fill="var(--ink)" stroke="none" />
                        </g>
                        <path
                          d={isLit ? "M55 64 Q60 69 65 64" : "M55 65 L65 65"}
                          fill="none"
                          stroke="var(--ink)"
                          strokeWidth="2.5"
                        />
                      </g>
                      {/* Badan & Pernapasan Halus */}
                      <g data-el={isLit ? "lit-body" : undefined}>
                        <path
                          d="M40 92 C42 86, 78 86, 80 92 L84 165 C84 170, 36 170, 36 165 Z"
                          fill={isLit ? (i % 2 === 0 ? "var(--mint)" : "var(--sun)") : "#D9D2FF"}
                        />
                        <path d="M52 86 L60 98 L68 86" fill="var(--paper)" />
                        <path
                          d="M38 94 L22 145 C20 152, 28 156, 32 148 L40 120"
                          fill={isLit ? "var(--mint)" : "#D9D2FF"}
                        />
                        <circle cx="23" cy="155" r="6" fill="#FFE3D6" />
                        <path
                          d="M82 94 L98 145 C100 152, 92 156, 88 148 L80 120"
                          fill={isLit ? "var(--sun)" : "#D9D2FF"}
                        />
                        <circle cx="97" cy="155" r="6" fill="#FFE3D6" />
                        <path
                          d="M38 168 L42 245 C42 250, 56 250, 56 245 L58 185 L62 185 L64 245 C64 250, 78 250, 78 245 L82 168 Z"
                          fill={isLit ? "var(--ink)" : "#556074"}
                        />
                        <ellipse cx="49" cy="254" rx="10" ry="5" fill="var(--paper)" />
                        <ellipse cx="71" cy="254" rx="10" ry="5" fill="var(--paper)" />
                      </g>
                    </svg>
                  </div>
                  <span className="mt-1 font-mono text-[0.5625rem] font-bold text-[var(--ink)]/70">
                    {i + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kolom Kanan: Counter Angka Raksasa */}
        <div className="shrink-0 flex flex-col items-center md:items-end justify-center rounded-2xl border-2 border-[var(--ink)] bg-[var(--paper)] p-4 md:p-6 shadow-[4px_4px_0px_var(--ink)]">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--ink)]/70">
            Peluang Ditolong Awam
          </span>
          <span
            data-el="counter-num"
            className="numeric text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-none text-[var(--coral)] mt-1"
          >
            0%
          </span>
          <span className="font-mono text-[0.625rem] text-[var(--ink)]/60 mt-1">
            Data AHA 2025 (AS 2024)
          </span>
        </div>
      </div>

      {/* Bagian Bawah: Marquee Tape & Sumber */}
      <div className="z-10 w-full flex flex-col items-center gap-2">
        <div data-el="marquee" className="w-full">
          <MarqueeTape
            text="HANYA 4 DARI 10 ★ SEBAGIAN BESAR BELUM TAHU CPR ★ KAMU BISA JADI PEMBEDA"
            bg="var(--peach)"
            rotation={1}
          />
        </div>
        <p data-el="source" className="font-mono text-[0.625rem] text-[var(--ink)]/65">
          Sumber: AHA 2025, data pasien henti jantung luar rumah sakit dewasa AS 2024.
        </p>
      </div>

      {/* Transisi Overlay Diagonal Stripes ke Scene 6 */}
      <TransitionOverlay
        variant="diagonal-stripes"
        color="var(--cool)"
        secondaryColor="var(--sun)"
      />
    </div>
  );
}
