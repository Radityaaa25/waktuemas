import { ArrowUp, Phone } from "lucide-react";
import { nav, site, ui } from "@/data/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-surface/40">
      <div className="page-shell grid gap-8 py-10 md:grid-cols-12 md:py-12">
        <div className="md:col-span-5">
          <p className="font-display text-2xl font-semibold">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-sm text-[0.6875rem] leading-relaxed text-muted">
            {ui.footer.stackNote}
          </p>
        </div>

        <nav
          aria-label={ui.footer.navLabel}
          className="md:col-span-3"
        >
          <p className="eyebrow text-[0.625rem]">{ui.footer.navHeading}</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow text-[0.625rem]">{site.emergency.title}</p>
          <ul className="mt-3 space-y-2">
            {site.emergency.numbers.map((entry) => (
              <li key={entry.number}>
                <a
                  href={`tel:${entry.number}`}
                  className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-text"
                >
                  <Phone aria-hidden="true" className="size-4 text-alert" />
                  <span className="numeric font-medium text-text">
                    {entry.number}
                  </span>
                  <span>{entry.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.6875rem] leading-relaxed text-muted">
            {ui.footer.licenseNote}
          </p>
          <a
            href="#hero"
            className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs text-muted transition-colors hover:text-text"
          >
            <ArrowUp aria-hidden="true" className="size-4" />
            {ui.closing.backToTop}
          </a>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="page-shell flex flex-wrap items-center justify-between gap-2 py-4 text-[0.6875rem] text-muted">
          <span>{ui.closing.copyright}</span>
          <span className="numeric">{site.event}</span>
        </div>
      </div>
    </footer>
  );
}
