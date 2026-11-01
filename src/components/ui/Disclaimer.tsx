import { ShieldAlert } from "lucide-react";
import { closing, ui } from "@/data/content";

export function Disclaimer() {
  return (
    <div className="rounded-2xl border border-warn/25 bg-warn/[0.05] p-5 md:p-6">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-warn/30 text-warn">
          <ShieldAlert aria-hidden="true" className="size-4.5" />
        </span>
        <div>
          <p className="eyebrow text-[0.6875rem]">{ui.closing.disclaimerLabel}</p>
          <h3 className="mt-1.5 text-lg font-semibold">
            {closing.disclaimerTitle}
          </h3>
        </div>
      </div>
      <ul className="mt-4 space-y-2.5 pl-1">
        {closing.disclaimer.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 text-sm leading-relaxed text-muted"
          >
            <span
              className="mt-2 size-1 shrink-0 rounded-full bg-warn/70"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
