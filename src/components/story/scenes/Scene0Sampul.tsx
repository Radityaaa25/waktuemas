import type { SceneBuildFn } from "@/lib/sceneTimeline";
import { storyMeta } from "@/data/story";

export const buildScene0: SceneBuildFn = (tl, { container }) => {
  const title = container.querySelector("[data-el='title']");
  const sub = container.querySelector("[data-el='sub']");
  const heart = container.querySelector("[data-el='heart']");
  const pulseRings = container.querySelectorAll("[data-el='pulse-ring']");
  const floatingLeft = container.querySelector("[data-el='float-left']");
  const floatingRight = container.querySelector("[data-el='float-right']");
  const scrollCue = container.querySelector("[data-el='scroll-cue']");

  // IN: 3 arah berbeda (Judul dari atas, Jantung zoom-in dari tengah, Bentuk dari kiri & kanan)
  tl.fromTo(
    title,
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 25 },
    0,
  )
    .fromTo(
      sub,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 20 },
      10,
    )
    .fromTo(
      heart,
      { scale: 0.2, opacity: 0, rotation: -15 },
      { scale: 1, opacity: 1, rotation: 0, duration: 30 },
      5,
    )
    .fromTo(
      floatingLeft,
      { x: -160, opacity: 0, rotation: -30 },
      { x: 0, opacity: 1, rotation: 0, duration: 25 },
      8,
    )
    .fromTo(
      floatingRight,
      { x: 160, opacity: 0, rotation: 30 },
      { x: 0, opacity: 1, rotation: 0, duration: 25 },
      8,
    )
    .fromTo(
      scrollCue,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 0.7, duration: 15 },
      15,
    );

  // HOLD: Jantung berdenyut kuat, ring membesar, bentuk melayang berputar halus
  tl.to(
    heart,
    {
      scale: 1.18,
      duration: 15,
      repeat: 1,
      yoyo: true,
      ease: "power1.inOut",
    },
    35,
  )
    .fromTo(
      pulseRings,
      { scale: 0.8, opacity: 0.8 },
      { scale: 1.6, opacity: 0, stagger: 6, duration: 25 },
      35,
    )
    .to(floatingLeft, { y: -25, rotation: 12, duration: 30 }, 35)
    .to(floatingRight, { y: 25, rotation: -12, duration: 30 }, 35);

  // OUT: Transisi keluar ke arah berbeda menjelang scene 1
  tl.to(
    title,
    { y: -80, opacity: 0, duration: 20 },
    75,
  )
    .to(sub, { opacity: 0, duration: 15 }, 75)
    .to(
      heart,
      { scale: 1.8, opacity: 0, duration: 25 },
      75,
    )
    .to(
      floatingLeft,
      { x: -200, opacity: 0, duration: 20 },
      80,
    )
    .to(
      floatingRight,
      { x: 200, opacity: 0, duration: 20 },
      80,
    )
    .to(scrollCue, { opacity: 0, duration: 10 }, 85);
};

export function Scene0Content() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between px-6 py-10 md:py-16 text-center select-none">
      {/* Bentuk dekoratif melayang kiri & kanan */}
      <div
        data-el="float-left"
        className="pointer-events-none absolute left-6 md:left-24 top-1/4 h-20 w-20 md:h-32 md:w-32 rounded-3xl bg-[var(--sun)]/30 border-2 border-[var(--ink)]/20 backdrop-blur-sm -rotate-12"
      />
      <div
        data-el="float-right"
        className="pointer-events-none absolute right-6 md:right-28 top-1/3 h-16 w-16 md:h-28 md:w-28 rounded-full bg-[var(--sky)]/40 border-2 border-[var(--ink)]/20 backdrop-blur-sm rotate-12"
      />

      {/* Bagian Atas: Judul & Subjudul */}
      <div className="z-10 mt-4 md:mt-8 max-w-3xl">
        <span className="inline-block rounded-full border-2 border-[var(--ink)] bg-[var(--sun)] px-4 py-1 text-xs md:text-sm font-bold uppercase tracking-wider text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]">
          {storyMeta.event}
        </span>
        <h1
          data-el="title"
          className="mt-4 font-display text-[clamp(2.5rem,7vw,6rem)] leading-none font-extrabold tracking-tight text-[var(--ink)]"
        >
          {storyMeta.title}
        </h1>
        <p
          data-el="sub"
          className="mt-3 text-base md:text-xl font-medium text-[var(--ink)]/80"
        >
          Cerita tentang menit-menit pertama.
        </p>
      </div>

      {/* Bagian Tengah: Jantung Besar Berdenyut */}
      <div className="relative flex items-center justify-center my-auto">
        {/* Ring denyut (ripple) */}
        <div
          data-el="pulse-ring"
          className="pointer-events-none absolute h-52 w-52 md:h-72 md:w-72 rounded-full border-4 border-[var(--coral)]"
        />
        <div
          data-el="pulse-ring"
          className="pointer-events-none absolute h-64 w-64 md:h-96 md:w-96 rounded-full border-2 border-[var(--coral)]/50"
        />

        {/* Jantung SVG Ilustratif Modern dengan outline tebal */}
        <div data-el="heart" className="relative z-10">
          <svg
            viewBox="0 0 200 200"
            className="h-44 w-44 md:h-64 md:w-64 drop-shadow-[4px_6px_0px_var(--ink)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bentuk Jantung Utama */}
            <path
              d="M100 175 C100 175, 20 120, 20 65 C20 35, 45 18, 75 22 C90 24, 98 35, 100 42 C102 35, 110 24, 125 22 C155 18, 180 35, 180 65 C180 120, 100 175, 100 175 Z"
              fill="var(--coral)"
              stroke="var(--ink)"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* Pembuluh Aorta & Vena ilustratif kartun */}
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
            {/* Kilau highlight jantung */}
            <path
              d="M40 50 C40 38, 55 30, 68 32"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Petunjuk Scroll */}
      <div data-el="scroll-cue" className="mb-2 flex flex-col items-center gap-1">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink)]/60">
          Gulir perlahan untuk memulai cerita
        </span>
        <svg
          className="h-5 w-5 animate-bounce text-[var(--ink)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
