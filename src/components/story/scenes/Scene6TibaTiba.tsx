import Image from "next/image";
import type { SceneBuildFn } from "@/lib/sceneTimeline";

export const buildScene6: SceneBuildFn = (tl, { container }) => {
  const headline = container.querySelector("[data-el='headline']");
  const ardi = container.querySelector("[data-el='ardi']");
  const bystanders = container.querySelector("[data-el='bystanders']");
  const questionMarks = container.querySelectorAll("[data-el='qmark']");
  const freezeVignette = container.querySelector("[data-el='freeze-vignette']");
  const alertBadge = container.querySelector("[data-el='alert-badge']");

  // IN: 3 arah berbeda
  // Teks dari atas, Ardi jatuh/rebah dari atas-tengah miring, Penonton membeku dari kiri, Tanda tanya dari 4 sudut
  tl.fromTo(
    alertBadge,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 15 },
    0,
  )
    .fromTo(
      headline,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 25 },
      5,
    )
    .fromTo(
      bystanders,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 25 },
      8,
    )
    .fromTo(
      ardi,
      { y: -140, rotation: -20, opacity: 0 },
      { y: 0, rotation: 0, opacity: 1, duration: 30, ease: "bounce.out" },
      10,
    )
    .fromTo(
      freezeVignette,
      { opacity: 0 },
      { opacity: 0.25, duration: 25 },
      15,
    )
    .fromTo(
      questionMarks,
      { scale: 0, opacity: 0, rotation: (i) => (i % 2 === 0 ? -30 : 30) },
      { scale: 1.2, opacity: 1, rotation: 0, stagger: 4, duration: 20 },
      20,
    );

  // HOLD: Semua membeku, tanda tanya berdenyut bingung
  tl.to(
    questionMarks,
    {
      y: -12,
      duration: 15,
      repeat: 1,
      yoyo: true,
      ease: "sine.inOut",
    },
    40,
  )
    .to(
      bystanders,
      {
        scale: 1.04,
        duration: 15,
        repeat: 1,
        yoyo: true,
      },
      40,
    );

  // OUT: Transisi keluar ke arah berbeda menjelang scene mitos / Jalur A
  tl.to(
    headline,
    { y: -80, opacity: 0, duration: 20 },
    75,
  )
    .to(
      alertBadge,
      { scale: 1.5, opacity: 0, duration: 15 },
      75,
    )
    .to(
      questionMarks,
      { y: -100, opacity: 0, stagger: 2, duration: 18 },
      75,
    )
    .to(
      bystanders,
      { x: -150, opacity: 0, duration: 20 },
      78,
    )
    .to(
      ardi,
      { opacity: 0.4, scale: 0.95, duration: 20 },
      80,
    )
    .to(freezeVignette, { opacity: 0, duration: 15 }, 80);
};

export function Scene6TibaTiba() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between px-6 py-10 md:py-16 text-center select-none">
      {/* Vignette suasana hening membeku */}
      <div
        data-el="freeze-vignette"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,transparent_40%,var(--cool)_100%)]"
      />

      {/* Tanda Tanya Muncul dari 4 Sudut */}
      <div
        data-el="qmark"
        className="pointer-events-none absolute left-6 md:left-24 top-20 text-3xl md:text-5xl font-black text-[var(--coral)] -rotate-12"
      >
        ?
      </div>
      <div
        data-el="qmark"
        className="pointer-events-none absolute right-8 md:right-32 top-24 text-4xl md:text-6xl font-black text-[var(--sun)] rotate-12"
      >
        ?
      </div>
      <div
        data-el="qmark"
        className="pointer-events-none absolute left-10 md:left-28 bottom-28 text-3xl md:text-5xl font-black text-[var(--coral)] rotate-6"
      >
        ?
      </div>
      <div
        data-el="qmark"
        className="pointer-events-none absolute right-10 md:right-32 bottom-32 text-4xl md:text-6xl font-black text-[var(--sun)] -rotate-6"
      >
        ?
      </div>

      {/* Bagian Atas: Kicker & Headline */}
      <div className="z-10 mt-2 max-w-3xl">
        <span
          data-el="alert-badge"
          className="inline-block rounded-full border-2 border-[var(--ink)] bg-[var(--coral)] px-5 py-1 text-xs md:text-sm font-bold uppercase tracking-wider text-white shadow-[2px_2px_0px_var(--ink)]"
        >
          Detik Nol
        </span>
        <h2
          data-el="headline"
          className="mt-4 font-display text-[clamp(2.2rem,6vw,5rem)] leading-none font-extrabold text-[var(--ink)]"
        >
          Ardi jatuh.
          <br />
          Semua berhenti. Semua bingung.
        </h2>
        <p className="mt-3 text-sm md:text-lg font-medium text-[var(--ink)]/75">
          Bukan karena mereka tidak peduli. Banyak yang belum pernah diajari apa yang harus dilakukan.
        </p>
      </div>

      {/* Bagian Tengah: Visual Kantin Hening (Ardi Rebah + Orang Sekitar Tertegun) */}
      <div className="relative my-auto flex w-full max-w-4xl flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
        {/* Orang Sekitar yang Membeku (Bystanders) */}
        <div data-el="bystanders" className="relative shrink-0">
          <Image
            src="/assets/bystanders.svg"
            alt="Orang sekitar kantin kaget dan tertegun"
            width={320}
            height={280}
            className="h-36 w-auto md:h-64 object-contain drop-shadow-[2px_4px_0px_var(--ink)]"
            priority
          />
        </div>

        {/* Korban Rebah di Lantai (Ardi Collapsed) */}
        <div data-el="ardi" className="relative shrink-0">
          <Image
            src="/assets/ardi-collapsed.svg"
            alt="Ardi terbaring terlentang di lantai, tidak sadar"
            width={380}
            height={140}
            className="h-28 w-auto md:h-44 object-contain drop-shadow-[3px_5px_0px_var(--ink)]"
            priority
          />
        </div>
      </div>

      {/* Petunjuk Cerita di Bawah */}
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--ink)]/60">
          Apa yang harus dilakukan dalam 10 detik pertama?
        </p>
      </div>
    </div>
  );
}
