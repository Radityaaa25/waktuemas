import { ArrowDown, ArrowRight, Info, MousePointer2 } from "lucide-react";
import { EcgLine } from "@/components/ui/EcgLine";
import { a11y, hero, ui } from "@/data/content";

function withHighlight(text: string, phrase: string) {
  const index = text.indexOf(phrase);
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-transparent font-semibold text-warn">{phrase}</mark>
      {text.slice(index + phrase.length)}
    </>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-border bg-surface"
      data-hero
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80"
        aria-hidden="true"
        data-hero-glow
        style={{
          background:
            "radial-gradient(60% 50% at 18% 18%, rgba(216,27,60,0.12), transparent 70%), radial-gradient(50% 50% at 85% 10%, rgba(13,148,136,0.16), transparent 70%), radial-gradient(45% 45% at 55% 0%, rgba(3,105,161,0.10), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 text-alert opacity-20 [mask-image:linear-gradient(to_top,black,transparent)]"
        aria-hidden="true"
        data-hero-ecg
      >
        <EcgLine state="normal" className="h-full w-full" ariaHidden />
      </div>

      <div className="page-shell flex min-h-[min(calc(100svh-4rem),52rem)] flex-col justify-center gap-12 py-14 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="eyebrow" data-hero-eyebrow>
              {hero.eyebrow}
            </p>

            <h1
              id="hero-title"
              className="mt-6 font-display text-[clamp(3.5rem,12vw,8.5rem)] leading-[0.86] font-semibold tracking-[-0.04em]"
            >
              {hero.titleLines.map((line, index) => (
                <span
                  key={line}
                  className={`block ${index === 1 ? "text-warn" : "text-text"}`}
                  data-hero-line
                >
                  {line}
                </span>
              ))}
            </h1>

            <p
              className="mt-7 max-w-2xl text-[clamp(1.125rem,1.6vw,1.5rem)] leading-snug text-text/90"
              data-hero-hook
            >
              {withHighlight(hero.hook, hero.hookHighlight)}
            </p>
            <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted">
              {hero.hookSource}{" "}
              <a
                href={`#ref-${hero.hookSourceId}`}
                className="underline decoration-text/20 underline-offset-4 transition-colors hover:text-text"
              >
                {ui.hero.sourceLink}
              </a>
            </p>

            <p className="lede mt-6" data-hero-lead>
              {hero.lead}
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-3"
              data-hero-cta
            >
              <a
                href={hero.ctaHref}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-text px-6 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
              >
                {hero.cta}
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
              <a
                href={ui.hero.secondaryHref}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border-strong px-6 text-sm font-medium text-text transition-colors hover:bg-text/5"
              >
                {ui.hero.secondaryCta}
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
            </div>

          </div>

          <div className="lg:col-span-5" data-hero-monitor>
            <div className="card-surface relative overflow-hidden p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">
                  <span
                    className="size-2 rounded-full bg-alert"
                    aria-hidden="true"
                  />
                  {ui.hero.ecgBadge}
                </span>
                <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.625rem] text-muted">
                  {ui.hero.ecgRate}
                </span>
              </div>

              <div className="relative mt-5 overflow-hidden rounded-2xl border border-border bg-bg/70 p-2">
                <EcgLine
                  state="normal"
                  className="h-32 w-full text-hope sm:h-40"
                  label={hero.ecgLabel}
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  aria-hidden="true"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(11,18,32,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(11,18,32,0.10) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-3">
                {hero.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border bg-text/[0.03] p-3"
                  >
                    <dt className="text-[0.625rem] leading-snug text-muted">
                      {stat.label}
                    </dt>
                    <dd className="numeric mt-1 text-xl font-medium text-text">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-3 text-[0.6875rem] leading-relaxed text-muted">
                {ui.hero.statNote}{" "}
                <a
                  href={`#ref-${hero.statsSourceId}`}
                  className="underline decoration-text/20 underline-offset-4 transition-colors hover:text-text"
                >
                  {ui.hero.sourceLink}
                </a>
              </p>

              <p className="mt-4 flex gap-2 text-[0.6875rem] leading-relaxed text-muted">
                <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                {hero.sideNote}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-2">
            <MousePointer2 aria-hidden="true" className="size-3.5" />
            {a11y.scrollHint}
          </span>
          <span className="font-mono text-[0.625rem] tracking-[0.18em] uppercase">
            {ui.hero.scrollTag}
          </span>
        </div>
      </div>
    </section>
  );
}
