import { ArrowUpRight, BookMarked } from "lucide-react";
import { references } from "@/data/references";
import { a11y, closing, ui } from "@/data/content";

function doiHref(identifier?: string): string | undefined {
  if (!identifier?.startsWith("DOI: ")) return undefined;
  return `https://doi.org/${identifier.slice(5)}`;
}

export function References() {
  return (
    <div id="referensi" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-[0.6875rem]">
            <BookMarked aria-hidden="true" className="size-3.5" />
            {ui.closing.referencesLabel}
          </p>
          <h3 className="mt-2 text-[clamp(1.5rem,2.4vw,2rem)]">
            {closing.referencesTitle}
          </h3>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-muted">
          {closing.referencesIntro}
        </p>
      </div>

      <ol className="mt-6 grid gap-3 md:grid-cols-2">
        {references.map((reference, index) => {
          const href = doiHref(reference.identifier);

          return (
            <li
              key={reference.id}
              id={`ref-${reference.id}`}
              className="card-surface scroll-mt-24 p-5"
              data-ref-card
            >
              <div className="flex items-start justify-between gap-3">
                <span className="numeric mt-0.5 text-xs text-muted">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                {reference.todoVerify ? (
                  <span className="rounded-full border border-warn/35 bg-warn/10 px-2 py-0.5 text-[0.625rem] font-medium text-warn">
                    {ui.problem.todoBadge}
                  </span>
                ) : null}
              </div>

              <h4 className="mt-2 text-sm leading-snug font-semibold text-text">
                {reference.title}
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                {reference.authors} &middot; {reference.publication}
                {reference.year !== "\u2014" &&
                !reference.publication.includes(reference.year)
                  ? ` \u00b7 ${reference.year}`
                  : ""}
              </p>

              {reference.identifier ? (
                <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
                  <span className="text-text/60">
                    {ui.references.identifierLabel}:
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center gap-1 underline decoration-text/20 underline-offset-4 transition-colors hover:text-text"
                    >
                      {reference.identifier}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      <span className="sr-only"> {a11y.externalLink}</span>
                    </a>
                  ) : (
                    reference.identifier
                  )}
                </p>
              ) : null}

              <p className="mt-2 text-xs leading-relaxed text-muted">
                <span className="text-text/60">{ui.references.useLabel}:</span>{" "}
                {reference.use}
              </p>

              {reference.note ? (
                <p className="mt-2 text-[0.6875rem] leading-relaxed text-warn/85">
                  {ui.references.noteLabel}: {reference.note}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>

      <p className="mt-4 text-[0.6875rem] leading-relaxed text-muted">
        {ui.closing.todoLegend}
      </p>
    </div>
  );
}
