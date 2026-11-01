import { ui } from "@/data/content";

export function UseCaseScene({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 620"
      className={className}
      role="img"
      aria-label={ui.a11yScene.useCaseScene}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="uc-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8f4f1" />
          <stop offset="100%" stopColor="#f7f9fd" />
        </linearGradient>
        <radialGradient id="uc-glow" cx="0.5" cy="0.15" r="0.7">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#2dd4bf" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="uc-sun" cx="0.85" cy="0.2" r="0.5">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="uc-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dfe9f4" />
          <stop offset="100%" stopColor="#cfdcec" />
        </linearGradient>
      </defs>

      <rect width="800" height="620" fill="url(#uc-bg)" />
      <rect width="800" height="620" fill="url(#uc-glow)" />
      <rect width="800" height="620" fill="url(#uc-sun)" />

      <g data-scene-layer="back">
        <rect
          x="60"
          y="80"
          width="150"
          height="210"
          rx="10"
          fill="#d7e9f7"
          stroke="#bfd6ea"
          strokeWidth="2"
        />
        <rect
          x="230"
          y="80"
          width="150"
          height="210"
          rx="10"
          fill="#d7e9f7"
          stroke="#bfd6ea"
          strokeWidth="2"
        />
        <rect
          x="560"
          y="80"
          width="180"
          height="260"
          rx="10"
          fill="#e2eef9"
          stroke="#c6d8ea"
          strokeWidth="2"
        />
        <path d="M560 210 L740 150 L740 340 L560 340 Z" fill="#d3e3f2" />
        <line
          x1="60"
          y1="300"
          x2="410"
          y2="300"
          stroke="#c0d3e7"
          strokeWidth="6"
        />
      </g>

      <g data-scene-layer="mid">
        <rect x="0" y="474" width="800" height="146" fill="url(#uc-floor)" />
        <rect x="70" y="404" width="250" height="18" rx="9" fill="#b7cae1" />
        <rect x="96" y="422" width="14" height="62" rx="4" fill="#a5bbd6" />
        <rect x="280" y="422" width="14" height="62" rx="4" fill="#a5bbd6" />
        <rect x="470" y="428" width="230" height="16" rx="8" fill="#b7cae1" />
        <rect x="494" y="444" width="12" height="48" rx="4" fill="#a5bbd6" />
        <rect x="664" y="444" width="12" height="48" rx="4" fill="#a5bbd6" />
        <circle cx="150" cy="378" r="10" fill="#8fa9c6" />
        <circle cx="620" cy="380" r="10" fill="#8fa9c6" />
      </g>

      <g data-scene-layer="people" fill="#24334c" stroke="#3f5574" strokeWidth="2">
        <g opacity="0.95">
          <circle cx="150" cy="292" r="26" />
          <path d="M122 330 Q150 312 178 330 L188 470 Q150 486 112 470 Z" />
          <rect x="130" y="466" width="16" height="54" rx="8" />
          <rect x="156" y="466" width="16" height="54" rx="8" />
        </g>
        <g opacity="0.92">
          <circle cx="250" cy="276" r="24" />
          <path d="M224 312 Q250 296 276 312 L284 452 Q250 466 216 452 Z" />
          <rect x="232" y="448" width="15" height="52" rx="7.5" />
          <rect x="256" y="448" width="15" height="52" rx="7.5" />
        </g>
        <g opacity="0.9">
          <circle cx="636" cy="286" r="25" />
          <path d="M609 324 Q636 307 663 324 L672 462 Q636 476 600 462 Z" />
          <rect x="615" y="458" width="15" height="52" rx="7.5" />
          <rect x="640" y="458" width="15" height="52" rx="7.5" />
        </g>
        <g opacity="0.85">
          <circle cx="730" cy="300" r="22" />
          <path d="M706 334 Q730 318 754 334 L760 456 Q730 468 700 456 Z" />
          <rect x="712" y="452" width="14" height="48" rx="7" />
          <rect x="734" y="452" width="14" height="48" rx="7" />
        </g>
      </g>

      <g data-scene-layer="front">
        <path
          d="M300 540 Q390 508 500 540 L500 574 Q390 598 300 574 Z"
          fill="#c2d3e6"
          opacity="0.8"
        />
        <g fill="#2f405c" stroke="#4b6283" strokeWidth="2">
          <circle cx="342" cy="518" r="19" />
          <rect x="374" y="506" width="96" height="26" rx="13" />
          <rect x="466" y="512" width="86" height="18" rx="9" />
          <rect x="548" y="516" width="36" height="14" rx="7" />
        </g>
        <g fill="#1d2b42" stroke="#3f5574" strokeWidth="2">
          <circle cx="430" cy="458" r="21" />
          <path d="M408 490 Q430 478 452 490 L458 548 Q430 558 402 548 Z" />
          <path
            d="M452 500 Q482 508 500 520"
            fill="none"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <rect x="404" y="544" width="14" height="34" rx="7" />
          <rect x="440" y="544" width="14" height="34" rx="7" />
        </g>
      </g>

      <g opacity="0.75">
        <circle
          cx="430"
          cy="458"
          r="30"
          fill="none"
          stroke="var(--hope)"
          strokeOpacity="0.6"
          strokeDasharray="3 6"
        />
      </g>
    </svg>
  );
}
