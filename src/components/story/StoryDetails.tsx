import { ArrowUp, Check, PhoneCall, TriangleAlert } from "lucide-react";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { References } from "@/components/sections/References";
import { closing, cpr, problem, site, ui } from "@/data/content";
import { storyMeta, scenes, beatsForScene } from "@/data/story";

export function StoryDetails() {
  return (
    <section id="ringkasan" className="section-block bg-bg">
      <div className="page-shell space-y-12 md:space-y-16">
        <header className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">Baca versi ringkas</p>
            <h2 className="mt-3 max-w-4xl text-[clamp(2rem,4.4vw,3.75rem)]">
              Ceritanya singkat. Yang diingat harus jelas.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="lede text-base">
              Semua adegan di atas tersedia sebagai teks. Angka dan panduan di
              bawah berasal dari sumber yang sama.
            </p>
          </div>
        </header>

        <div>
          <p className="eyebrow text-[0.6875rem]">Angka kunci</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {problem.cards.map((card) => {
              const tone =
                card.tone === "alert"
                  ? "text-alert"
                  : card.tone === "warn"
                    ? "text-warn"
                    : "text-hope";
              return (
                <article key={card.id} className="card-surface p-5">
                  <p className={`numeric text-3xl font-medium ${tone}`}>
                    {card.value}
                  </p>
                  <p className="mt-1 text-xs text-muted">{card.valueLabel}</p>
                  <h3 className="mt-3 text-base font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {card.description}
                  </p>
                  <p className="mt-3 flex flex-wrap items-center gap-2 text-[0.6875rem] text-muted">
                    {card.todoVerify ? (
                      <span className="rounded-full border border-warn/35 bg-warn/10 px-2 py-0.5 font-medium text-warn">
                        {ui.problem.todoBadge}
                      </span>
                    ) : null}
                    <a
                      href={`#ref-${card.source.refId}`}
                      className="underline decoration-text/20 underline-offset-4 hover:text-text"
                    >
                      {card.source.text}
                    </a>
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div>
          <p className="eyebrow text-[0.6875rem]">Alur cerita</p>
          <h3 className="mt-2 text-[clamp(1.5rem,2.6vw,2.25rem)]">
            Tujuh bagian, tiga belas ketukan.
          </h3>
          <ol className="mt-5 grid gap-3 md:grid-cols-2">
            {scenes.map((scene, index) => (
              <li key={scene.id} className="card-surface p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase">
                  <span>
                    {(index + 1).toString().padStart(2, "0")} &middot;{" "}
                    {scene.label}
                  </span>
                  <span>{scene.kicker}</span>
                </div>
                <h4 className="mt-2 font-display text-lg font-semibold whitespace-pre-line">
                  {scene.headline}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">
                  {scene.support}
                </p>
                <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
                  {beatsForScene(scene.id).map((beat) => (
                    <li key={beat.id} className="flex gap-3 text-xs">
                      <span className="numeric w-9 shrink-0 text-muted/80">
                        {beat.time}
                      </span>
                      <span className="text-text/80">
                        {beat.line}
                        {beat.aside ? (
                          <span className="mt-0.5 block text-muted">
                            {beat.aside}
                          </span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <p className="eyebrow text-[0.6875rem]">Lima langkah</p>
          <h3 className="mt-2 text-[clamp(1.5rem,2.6vw,2.25rem)]">
            {closing.fiveStepsTitle}
          </h3>
          <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {closing.fiveSteps.map((step) => (
              <li key={step.number} className="card-surface p-4">
                <span className="numeric text-xs text-hope">{step.number}</span>
                <span className="mt-1.5 block font-display text-lg font-semibold">
                  {step.title}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted">
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="rounded-2xl border border-border p-5 md:p-6">
            <p className="eyebrow text-[0.6875rem]">{ui.cpr.guidanceLabel}</p>
            <h3 className="mt-2 text-lg font-semibold">{cpr.guidance.title}</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {cpr.guidance.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-muted"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-hope"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={`#ref-${cpr.guidance.sourceId}`}
              className="mt-4 inline-flex min-h-11 items-center text-xs text-muted underline decoration-text/20 underline-offset-4 hover:text-text"
            >
              {ui.problem.sourceLabel}: {ui.cpr.guidanceSource}
            </a>
          </div>

          <div className="rounded-2xl border border-alert/25 bg-alert/[0.05] p-5 md:p-6">
            <p className="eyebrow text-[0.6875rem]">{site.emergency.title}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {site.emergency.numbers.map((entry) => (
                <a
                  key={entry.number}
                  href={`tel:${entry.number}`}
                  className="flex min-h-16 min-w-32 flex-col justify-center rounded-2xl border border-border bg-surface px-4 transition-colors hover:border-border-strong"
                >
                  <span className="numeric text-2xl font-medium">
                    {entry.number}
                  </span>
                  <span className="text-[0.625rem] leading-tight text-muted">
                    {entry.label}
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              {site.emergency.note}
            </p>
            <p className="mt-4 flex items-start gap-2 text-[0.6875rem] leading-relaxed text-warn">
              <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              Panduan untuk dewasa. CPR bayi dan anak berbeda.
            </p>
          </div>
        </div>

        <References />

        <Disclaimer />

        <footer className="flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold">{storyMeta.title}</p>
            <p className="mt-1 max-w-md text-xs leading-relaxed text-muted">
              {closing.footerNote}
            </p>
            <p className="mt-2 text-xs text-muted">
              {storyMeta.event} &middot; Tim 4 Menit Emas
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-3 font-mono text-[0.625rem] tracking-wide text-muted">
              <PhoneCall aria-hidden="true" className="size-3.5" />
              112 &middot; 119
            </span>
            <a
              href="#konten-utama"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-text"
            >
              <ArrowUp aria-hidden="true" className="size-4" />
              Ulangi cerita
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
