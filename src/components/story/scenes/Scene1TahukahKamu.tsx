import type { SceneBuildFn } from "@/lib/sceneTimeline";

export const buildScene1: SceneBuildFn = (tl, { container }) => {
  const headline = container.querySelector("[data-el='headline']");
  const statBadge = container.querySelector("[data-el='stat-badge']");
  const people = container.querySelectorAll("[data-el='person']");
  const litPeople = container.querySelectorAll("[data-el='person-lit']");
  const sparkles = container.querySelectorAll("[data-el='sparkle']");
  const source = container.querySelector("[data-el='source']");

  // IN: Minimal 3 arah (Teks dari atas, Siluet orang masuk bergantian dari kiri/kanan/bawah)
  tl.fromTo(
    headline,
    { y: -80, opacity: 0 },
    { y: 0, opacity: 1, duration: 25 },
    0,
  )
    .fromTo(
      statBadge,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 20 },
      10,
    )
    .fromTo(
      people,
      {
        y: (i) => (i % 2 === 0 ? 80 : -60),
        x: (i) => (i < 5 ? -60 : 60),
        opacity: 0,
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        stagger: 2,
        duration: 25,
      },
      5,
    )
    .fromTo(
      source,
      { opacity: 0, y: 20 },
      { opacity: 0.7, y: 0, duration: 15 },
      20,
    );

  // HOLD: 4 orang penolong menyala berkilau (highlight sun & coral)
  tl.to(
    litPeople,
    {
      scale: 1.12,
      duration: 15,
      repeat: 1,
      yoyo: true,
      ease: "power1.inOut",
    },
    35,
  )
    .fromTo(
      sparkles,
      { scale: 0, opacity: 0, rotation: -45 },
      { scale: 1.3, opacity: 1, rotation: 45, stagger: 3, duration: 20 },
      35,
    );

  // OUT: Transisi keluar ke arah berbeda
  tl.to(
    headline,
    { y: -60, opacity: 0, duration: 20 },
    75,
  )
    .to(
      statBadge,
      { scale: 1.4, opacity: 0, duration: 15 },
      75,
    )
    .to(
      people,
      {
        y: (i) => (i % 2 === 0 ? -100 : 100),
        opacity: 0,
        stagger: 1,
        duration: 20,
      },
      78,
    )
    .to(sparkles, { opacity: 0, duration: 10 }, 80)
    .to(source, { opacity: 0, duration: 15 }, 80);
};

export function Scene1TahukahKamu() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between px-6 py-10 md:py-16 text-center select-none">
      {/* Kicker & Judul Pertanyaan Besar */}
      <div className="z-10 mt-2 max-w-4xl">
        <span
          data-el="stat-badge"
          className="inline-block rounded-full border-2 border-[var(--ink)] bg-[var(--coral)] px-5 py-1 text-xs md:text-sm font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_var(--ink)]"
        >
          Fakta Menit Awal
        </span>
        <h2
          data-el="headline"
          className="mt-4 font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-tight font-extrabold text-[var(--ink)]"
        >
          Tahukah kamu? Hanya{" "}
          <span className="relative inline-block text-[var(--coral)] underline decoration-[var(--sun)] decoration-wavy decoration-2 md:decoration-4">
            4 dari 10
          </span>{" "}
          korban henti jantung yang langsung ditolong orang sekitar.
        </h2>
      </div>

      {/* Visual Utama: 10 Karakter Orang Bergaya Flat Vektor */}
      <div className="relative my-auto flex w-full max-w-5xl items-center justify-center">
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3 md:gap-4 items-end justify-items-center">
          {Array.from({ length: 10 }).map((_, i) => {
            const isLit = i < 4;
            return (
              <div
                key={i}
                data-el={isLit ? "person-lit" : "person"}
                className={`relative flex flex-col items-center transition-all ${
                  isLit ? "z-10 drop-shadow-[0_8px_16px_rgba(255,201,77,0.45)]" : "opacity-45"
                }`}
              >
                {/* Highlight Badge 4 Penolong */}
                {isLit ? (
                  <div
                    data-el="sparkle"
                    className="absolute -top-6 rounded-full border border-[var(--ink)] bg-[var(--sun)] px-2 py-0.5 text-[0.625rem] font-extrabold text-[var(--ink)]"
                  >
                    Penolong!
                  </div>
                ) : null}

                {/* Karakter Vektor Flat Ilustrasi Modern */}
                <svg
                  viewBox="0 0 120 280"
                  className={`h-28 w-14 md:h-48 md:w-24 ${
                    isLit ? "scale-105" : "grayscale opacity-75"
                  }`}
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Kepala & Rambut */}
                  <circle cx="60" cy="54" r="22" fill={isLit ? "#FFE3D6" : "#E3E8F5"} />
                  <path
                    d="M44 46 C48 34, 72 34, 76 46 C72 42, 48 42, 44 46 Z"
                    fill={isLit ? "var(--ink)" : "#556074"}
                  />
                  {/* Wajah sederhana */}
                  <circle cx="53" cy="55" r="2.5" fill="var(--ink)" stroke="none" />
                  <circle cx="67" cy="55" r="2.5" fill="var(--ink)" stroke="none" />
                  <path
                    d={isLit ? "M55 64 Q60 69 65 64" : "M55 65 L65 65"}
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="2.5"
                  />
                  {/* Badan / Baju */}
                  <path
                    d="M40 92 C42 86, 78 86, 80 92 L84 165 C84 170, 36 170, 36 165 Z"
                    fill={isLit ? (i % 2 === 0 ? "var(--mint)" : "var(--sun)") : "#D9D2FF"}
                  />
                  <path d="M52 86 L60 98 L68 86" fill="var(--paper)" />
                  {/* Lengan */}
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
                  {/* Celana */}
                  <path
                    d="M38 168 L42 245 C42 250, 56 250, 56 245 L58 185 L62 185 L64 245 C64 250, 78 250, 78 245 L82 168 Z"
                    fill={isLit ? "var(--ink)" : "#556074"}
                  />
                  {/* Sepatu */}
                  <ellipse cx="49" cy="254" rx="10" ry="5" fill="var(--paper)" />
                  <ellipse cx="71" cy="254" rx="10" ry="5" fill="var(--paper)" />
                </svg>

                <span className="mt-1 font-mono text-[0.625rem] font-bold text-[var(--ink)]/70">
                  {i + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sumber Medis Resmi di Pojok Bawah */}
      <div data-el="source" className="text-center">
        <p className="font-mono text-xs text-[var(--ink)]/65">
          Sumber: AHA 2025, data pasien henti jantung luar rumah sakit dewasa AS 2024.
        </p>
      </div>
    </div>
  );
}
