import type { StoryPath } from "@/data/content";
import { ui } from "@/data/content";

export function CprPlaceholder({ path }: { path: StoryPath }) {
  const isHelped = path === "B";

  return (
    <svg
      viewBox="0 0 800 480"
      className="h-full w-full"
      role="img"
      aria-label={isHelped ? ui.a11yScene.cprPathB : ui.a11yScene.cprPathA}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="cpr-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1524" />
          <stop offset="100%" stopColor="#080c14" />
        </linearGradient>
        <radialGradient id="cpr-light" cx="0.5" cy="0.25" r="0.75">
          <stop
            offset="0%"
            stopColor={isHelped ? "#2dd4bf" : "#ff3b4e"}
            stopOpacity="0.16"
          />
          <stop
            offset="100%"
            stopColor={isHelped ? "#2dd4bf" : "#ff3b4e"}
            stopOpacity="0"
          />
        </radialGradient>
        <linearGradient id="cpr-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f1727" stopOpacity="0" />
          <stop offset="100%" stopColor="#0f1727" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <rect width="800" height="480" fill="url(#cpr-bg)" />
      <rect width="800" height="480" fill="url(#cpr-light)" />

      <g opacity="0.5" stroke="#243450" strokeWidth="1">
        <line x1="0" y1="360" x2="800" y2="360" />
        <line x1="0" y1="400" x2="800" y2="400" />
        <line x1="130" y1="300" x2="130" y2="480" />
        <line x1="420" y1="300" x2="420" y2="480" />
        <line x1="670" y1="300" x2="670" y2="480" />
      </g>
      <rect x="0" y="340" width="800" height="140" fill="url(#cpr-floor)" />

      <g opacity="0.35">
        <rect x="60" y="70" width="180" height="120" rx="10" fill="#131e33" />
        <rect x="590" y="60" width="150" height="150" rx="10" fill="#131e33" />
      </g>

      {isHelped ? (
        <>
          <g fill="#151f33" stroke="#3e547a" strokeWidth="3">
            <circle cx="352" cy="228" r="27" />
            <path d="M322 264 Q352 248 382 264 L394 344 Q352 362 310 344 Z" />
            <path
              d="M374 280 Q404 292 412 318"
              fill="none"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M330 280 Q300 292 296 318"
              fill="none"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <rect x="318" y="336" width="24" height="62" rx="12" />
            <rect x="352" y="336" width="24" height="62" rx="12" />
          </g>

          <g fill="#121b2c" stroke="#334765" strokeWidth="3">
            <circle cx="600" cy="286" r="21" />
            <path d="M578 314 Q600 302 622 314 L628 378 Q600 388 572 378 Z" />
            <rect x="578" y="372" width="18" height="50" rx="9" />
            <rect x="604" y="372" width="18" height="50" rx="9" />
          </g>

          <g transform="translate(648 330)" fill="#ffb020">
            <rect width="46" height="60" rx="8" />
            <rect x="8" y="10" width="30" height="18" rx="3" fill="#0b0f1a" />
            <path d="M23 36 L17 46 H23 L21 54 L29 42 H23 Z" fill="#0b0f1a" />
          </g>

          <g stroke="var(--hope)" strokeWidth="2" fill="none" opacity="0.8">
            <path d="M350 300 L350 316" />
            <path d="M360 300 L360 316" />
            <path d="M370 300 L370 316" />
          </g>
        </>
      ) : (
        <g fill="#0a0f1a" stroke="#2a3a5c" strokeWidth="2" opacity="0.75">
          <g>
            <circle cx="560" cy="252" r="22" />
            <path d="M536 286 Q560 273 584 286 L590 352 Q560 362 530 352 Z" />
            <rect x="540" y="346" width="14" height="46" rx="7" />
            <rect x="562" y="346" width="14" height="46" rx="7" />
          </g>
          <g opacity="0.8">
            <circle cx="632" cy="266" r="20" />
            <path d="M610 296 Q632 284 654 296 L658 354 Q632 362 606 354 Z" />
            <rect x="614" y="348" width="13" height="42" rx="6.5" />
            <rect x="634" y="348" width="13" height="42" rx="6.5" />
          </g>
          <g opacity="0.6">
            <circle cx="700" cy="280" r="18" />
            <path d="M680 306 Q700 296 720 306 L724 356 Q700 364 676 356 Z" />
            <rect x="683" y="350" width="12" height="38" rx="6" />
            <rect x="701" y="350" width="12" height="38" rx="6" />
          </g>
        </g>
      )}

      <ellipse cx="330" cy="402" rx="200" ry="26" fill="#060a12" opacity="0.8" />
      <g fill="#1a2439" stroke="#3a4c70" strokeWidth="3">
        <circle cx="182" cy="348" r="30" />
        <rect x="216" y="330" width="170" height="50" rx="25" />
        <rect x="380" y="340" width="130" height="30" rx="15" />
        <rect x="500" y="346" width="86" height="22" rx="11" />
        <rect x="238" y="382" width="120" height="18" rx="9" />
        <rect x="388" y="374" width="108" height="16" rx="8" />
      </g>

      <g opacity="0.9">
        <rect
          x="24"
          y="24"
          width="250"
          height="56"
          rx="12"
          fill="#0a101c"
          fillOpacity="0.78"
          stroke="#23324c"
        />
        <text
          x="42"
          y="58"
          fill={isHelped ? "var(--hope)" : "var(--alert)"}
          fontSize="14"
          fontFamily="var(--font-jetbrains)"
          letterSpacing="1.5"
        >
          {isHelped ? ui.cpr.pathBTag : ui.cpr.pathATag}
        </text>
      </g>
    </svg>
  );
}
