import type { SceneBuildFn } from "@/lib/sceneTimeline";
import {
  createAmbientRegistry,
  heartLubDub,
  float,
  spin,
  ekgLoop,
  twinkle,
  type AmbientController,
} from "@/lib/ambient";
import { SceneBackground } from "@/components/motion/SceneBackground";
import {
  PlusSign,
  Ring,
  Sparkle,
  MiniHeart,
  DotsCluster,
  PillBadge,
} from "@/components/motion/Decorations";
import { MarqueeTape } from "@/components/motion/MarqueeTape";
import { TransitionOverlay } from "@/components/motion/TransitionOverlay";
import { storyMeta } from "@/data/story";

export function setupScene0Ambient(stage: HTMLElement): AmbientController {
  const reg = createAmbientRegistry();

  const heart = stage.querySelector("[data-el='heart']");
  const rings = stage.querySelectorAll("[data-el='pulse-ring']");
  if (heart) {
    reg.add(heartLubDub(heart, rings));
  }

  const ekg = stage.querySelector("[data-el='ekg-line']");
  if (ekg) {
    reg.add(ekgLoop(ekg, 3.2));
  }

  const floating = stage.querySelectorAll("[data-el='float-item']");
  floating.forEach((el, i) => {
    reg.add(float(el, { y: 14 + (i % 3) * 6, duration: 3 + i * 0.5 }));
  });

  const spins = stage.querySelectorAll("[data-el='spin-item']");
  spins.forEach((el, i) => {
    reg.add(spin(el, 26 + i * 8, i % 2 === 0));
  });

  const sparkles = stage.querySelectorAll("[data-el='twinkle-item']");
  sparkles.forEach((el, i) => {
    reg.add(twinkle(el, i * 0.3));
  });

  return reg.controller;
}

export const buildScene0: SceneBuildFn = (tl, { container }) => {
  const title = container.querySelector("[data-el='title']");
  const sub = container.querySelector("[data-el='sub']");
  const heartGroup = container.querySelector("[data-el='heart-group']");
  const decos = container.querySelectorAll("[data-el='float-item']");
  const marquee = container.querySelector("[data-el='marquee']");
  const cue = container.querySelector("[data-el='scroll-cue']");
  const transCircle = container.querySelector("[data-el='trans-circle']");

  // IN (0 -> 30): 3 arah berbeda
  tl.fromTo(title, { y: -90, opacity: 0 }, { y: 0, opacity: 1, duration: 24 }, 0)
    .fromTo(sub, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 20 }, 8)
    .fromTo(
      heartGroup,
      { scale: 0.15, opacity: 0, rotation: -20 },
      { scale: 1, opacity: 1, rotation: 0, duration: 28 },
      4,
    )
    .fromTo(
      decos,
      {
        x: (i) => (i % 2 === 0 ? -120 : 120),
        y: (i) => (i < 3 ? -80 : 80),
        opacity: 0,
      },
      { x: 0, y: 0, opacity: 1, stagger: 2, duration: 22 },
      8,
    )
    .fromTo(marquee, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 18 }, 12)
    .fromTo(cue, { opacity: 0 }, { opacity: 0.8, duration: 14 }, 16);

  // HOLD (30 -> 70): Parallax scroll saat pembaca menggulir
  tl.to(heartGroup, { y: -16, duration: 40 }, 30)
    .to(decos, { y: (i) => (i % 2 === 0 ? -24 : 24), stagger: 1, duration: 40 }, 30);

  // OUT & TRANSITION TO SCENE 1 (70 -> 100):
  // circle-wipe warna coral/sky membesar dari jantung ke seluruh layar
  tl.to(title, { y: -60, opacity: 0, duration: 18 }, 75)
    .to(sub, { opacity: 0, duration: 14 }, 75)
    .to(marquee, { opacity: 0, duration: 12 }, 78)
    .to(cue, { opacity: 0, duration: 10 }, 78)
    .fromTo(
      transCircle,
      { clipPath: "circle(0% at 50% 50%)" },
      { clipPath: "circle(140% at 50% 50%)", duration: 24, ease: "power2.inOut" },
      76,
    );
};

export function Scene0Content() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between px-6 py-8 md:py-12 text-center select-none">
      {/* Background tekstur dot grid + blob lembut */}
      <SceneBackground variant="dots" tint="var(--ink)" />

      {/* Dekorasi motion graphic di sudut-sudut aman */}
      <div
        data-el="float-item"
        className="pointer-events-none absolute left-6 md:left-20 top-20 z-10"
      >
        <PlusSign size={24} color="var(--coral)" />
      </div>
      <div
        data-el="float-item"
        className="pointer-events-none absolute right-8 md:right-28 top-24 z-10"
      >
        <Sparkle size={32} color="var(--sun)" />
      </div>
      <div
        data-el="float-item"
        className="pointer-events-none absolute left-10 md:left-24 bottom-32 z-10"
      >
        <Ring size={40} color="var(--sky)" />
      </div>
      <div
        data-el="float-item"
        className="pointer-events-none absolute right-12 md:right-32 bottom-36 z-10"
      >
        <MiniHeart size={26} color="var(--coral)" />
      </div>
      <div
        data-el="spin-item"
        className="pointer-events-none absolute right-6 md:right-16 top-1/2 -translate-y-1/2 z-10"
      >
        <DotsCluster color="var(--ink)" />
      </div>

      {/* Bagian Atas: Kicker pill & Judul Besar */}
      <div className="z-10 mt-2 md:mt-4 max-w-4xl">
        <PillBadge text={storyMeta.event} bg="var(--sun)" className="mb-3" />
        <h1
          data-el="title"
          className="font-display text-[clamp(2.6rem,7.5vw,6.5rem)] leading-none font-extrabold tracking-tight text-[var(--ink)]"
        >
          {storyMeta.title}
        </h1>
        <p
          data-el="sub"
          className="mt-3 text-base md:text-xl font-medium text-[var(--ink)]/80 max-w-xl mx-auto"
        >
          Cerita tentang menit-menit pertama yang menentukan hidup.
        </p>
      </div>

      {/* Bagian Tengah: Jantung Hero + Garis EKG melintas */}
      <div
        data-el="heart-group"
        className="relative flex items-center justify-center my-auto w-full max-w-2xl py-4"
      >
        {/* Ring ripple denyut memancar */}
        <div
          data-el="pulse-ring"
          className="pointer-events-none absolute h-52 w-52 md:h-80 md:w-80 rounded-full border-4 border-[var(--coral)]"
        />
        <div
          data-el="pulse-ring"
          className="pointer-events-none absolute h-64 w-64 md:h-96 md:w-96 rounded-full border-2 border-[var(--sun)]/60"
        />

        {/* Garis EKG melintas di belakang jantung */}
        <svg
          className="pointer-events-none absolute inset-x-0 h-28 w-full z-0 opacity-45"
          viewBox="0 0 600 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            data-el="ekg-line"
            d="M0 60 L180 60 L195 20 L210 100 L225 10 L240 75 L255 60 L600 60"
            stroke="var(--coral)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Jantung SVG Ilustratif Flat Tebal */}
        <div data-el="heart" className="relative z-10 cursor-pointer">
          <svg
            viewBox="0 0 200 200"
            className="h-44 w-44 md:h-64 md:w-64 drop-shadow-[4px_6px_0px_var(--ink)]"
            fill="none"
          >
            <path
              d="M100 175 C100 175, 20 120, 20 65 C20 35, 45 18, 75 22 C90 24, 98 35, 100 42 C102 35, 110 24, 125 22 C155 18, 180 35, 180 65 C180 120, 100 175, 100 175 Z"
              fill="var(--coral)"
              stroke="var(--ink)"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* Aorta dan pembuluh */}
            <path
              d="M85 24 L85 10 C85 6, 95 6, 95 10 L95 28"
              fill="var(--sky)"
              stroke="var(--ink)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M105 28 L105 8 C105 4, 120 4, 120 8 L120 23"
              fill="var(--sun)"
              stroke="var(--ink)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Highlight kilau */}
            <path
              d="M40 50 C40 38, 55 30, 68 32"
              stroke="#FFFFFF"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Bagian Bawah: MarqueeTape tipis & Petunjuk Scroll */}
      <div className="z-10 w-full flex flex-col items-center gap-2">
        <div data-el="marquee" className="w-full">
          <MarqueeTape
            text="WAKTU TIDAK MENUNGGU ★ 4 MENIT PERTAMA MENENTUKAN ★ SETIAP DETIK BERHARGA"
            bg="var(--sun)"
            rotation={-1}
          />
        </div>
        <div data-el="scroll-cue" className="mt-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--ink)]/65">
          <span>Gulir untuk membaca cerita</span>
          <svg className="h-4 w-4 animate-bounce text-[var(--ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </div>

      {/* Transisi Overlay Wipe ke Scene 1 */}
      <TransitionOverlay variant="circle-wipe" color="var(--sky)" />
    </div>
  );
}
