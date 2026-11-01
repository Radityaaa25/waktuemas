import { gsap } from "./gsap";

export interface AmbientController {
  play: () => void;
  pause: () => void;
  kill: () => void;
}

/**
 * Registry ambient loop untuk satu scene.
 * Semua animasi loop terdaftar di sini dan bisa di-pause/resume bersamaan
 * saat scene masuk atau keluar viewport (via ScrollTrigger onToggle).
 */
export function createAmbientRegistry(): {
  add: (tween: gsap.core.Tween | gsap.core.Timeline) => void;
  controller: AmbientController;
} {
  const animations: (gsap.core.Tween | gsap.core.Timeline)[] = [];

  return {
    add(anim) {
      animations.push(anim);
    },
    controller: {
      play() {
        animations.forEach((a) => a.play());
      },
      pause() {
        animations.forEach((a) => a.pause());
      },
      kill() {
        animations.forEach((a) => a.kill());
        animations.length = 0;
      },
    },
  };
}

/**
 * Melayang naik-turun halus dengan sedikit rotasi acak
 */
export function float(
  el: gsap.DOMTarget,
  options?: { y?: number; duration?: number; rotation?: number; delay?: number },
): gsap.core.Tween {
  const y = options?.y ?? 12;
  const duration = options?.duration ?? 3.5;
  const rotation = options?.rotation ?? 6;
  const delay = options?.delay ?? Math.random() * 1.5;

  return gsap.to(el, {
    y: `-=${y}`,
    rotation: `+=${rotation}`,
    duration,
    delay,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

/**
 * Pernapasan halus untuk karakter (skala 1.0 - 1.025)
 */
export function breathe(
  el: gsap.DOMTarget,
  options?: { scale?: number; duration?: number; delay?: number },
): gsap.core.Tween {
  const scale = options?.scale ?? 1.025;
  const duration = options?.duration ?? 2.8;
  const delay = options?.delay ?? Math.random();

  return gsap.to(el, {
    scaleY: scale,
    scaleX: 1 / Math.sqrt(scale),
    transformOrigin: "50% 100%",
    duration,
    delay,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

/**
 * Denyut jantung realistis bergaya "lub-dub":
 * Dua detakan cepat berturut-turut, lalu jeda istirahat.
 */
export function heartLubDub(
  heartEl: gsap.DOMTarget,
  ringEls?: gsap.DOMTarget,
): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.out" } });

  // Detak 1 (Lub)
  tl.to(heartEl, { scale: 1.14, duration: 0.12 })
    .to(heartEl, { scale: 1.0, duration: 0.14 })
    // Detak 2 (Dub)
    .to(heartEl, { scale: 1.18, duration: 0.13 }, "+=0.06")
    .to(heartEl, { scale: 1.0, duration: 0.22 })
    // Jeda diastole
    .to({}, { duration: 0.65 });

  if (ringEls) {
    tl.fromTo(
      ringEls,
      { scale: 0.85, opacity: 0.75 },
      { scale: 1.45, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power1.out" },
      0.05,
    );
  }

  return tl;
}

/**
 * Gelombang EKG kontinu berjalan melintasi layar (dashoffset loop)
 */
export function ekgLoop(
  pathEl: gsap.DOMTarget,
  duration = 2.4,
): gsap.core.Tween {
  gsap.set(pathEl, { strokeDasharray: "16 320" });
  return gsap.to(pathEl, {
    strokeDashoffset: -336,
    duration,
    repeat: -1,
    ease: "none",
  });
}

/**
 * Putaran pelan kontinu untuk roda, ring, jarum jam
 */
export function spin(
  el: gsap.DOMTarget,
  duration = 24,
  clockwise = true,
): gsap.core.Tween {
  return gsap.to(el, {
    rotation: clockwise ? 360 : -360,
    transformOrigin: "50% 50%",
    duration,
    repeat: -1,
    ease: "none",
  });
}

/**
 * Kedipan mata untuk karakter sadar
 */
export function blink(
  eyesEl: gsap.DOMTarget,
  interval = 4,
): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: interval });
  tl.to(eyesEl, { scaleY: 0.1, duration: 0.08, transformOrigin: "50% 50%" })
    .to(eyesEl, { scaleY: 1, duration: 0.08 });
  return tl;
}

/**
 * Twinkle halus untuk bintang/sparkle dekoratif
 */
export function twinkle(
  el: gsap.DOMTarget,
  delay = 0,
): gsap.core.Tween {
  return gsap.to(el, {
    scale: 0.4,
    opacity: 0.25,
    duration: 1.4 + Math.random(),
    delay,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

/**
 * Goyangan halus tanda tanya atau ikon ragu
 */
export function wobble(
  el: gsap.DOMTarget,
  angle = 12,
  duration = 2.2,
): gsap.core.Tween {
  return gsap.to(el, {
    rotation: `+=${angle}`,
    duration,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    transformOrigin: "50% 90%",
  });
}
