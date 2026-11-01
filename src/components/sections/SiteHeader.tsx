import { Menu } from "lucide-react";
import { a11y, nav, site, ui } from "@/data/content";
import { MotionToggle } from "@/components/ui/MotionToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="page-shell flex h-16 items-center justify-between gap-3">
        <a
          href="#hero"
          aria-label={ui.header.brandAria}
          className="flex min-h-11 shrink-0 items-center gap-2.5"
        >
          <svg
            viewBox="0 0 32 32"
            className="size-8 shrink-0"
            aria-hidden="true"
          >
            <rect
              width="32"
              height="32"
              rx="9"
              fill="var(--surface)"
              stroke="var(--border-strong)"
            />
            <path
              d="M4 18h5l2-5 3 11 3-14 2.5 8H28"
              fill="none"
              stroke="var(--hope)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display text-base font-semibold tracking-tight whitespace-nowrap sm:text-lg">
            {site.name}
          </span>
        </a>

        <nav aria-label={a11y.navLabel} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-sm whitespace-nowrap text-muted transition-colors hover:bg-text/5 hover:text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <MotionToggle />
          <details className="group relative md:hidden">
            <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-border text-xs font-medium transition-colors hover:bg-text/5 [&::-webkit-details-marker]:hidden">
              <Menu aria-hidden="true" className="size-4" />
              <span className="sr-only">{ui.header.navButton}</span>
            </summary>
            <nav
              aria-label={a11y.navLabel}
              className="absolute right-0 top-[calc(100%+0.5rem)] w-48 rounded-2xl border border-border bg-surface p-2 shadow-2xl"
            >
              <ul>
                {nav.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex min-h-11 items-center rounded-xl px-3 text-sm text-muted transition-colors hover:bg-text/5 hover:text-text"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
