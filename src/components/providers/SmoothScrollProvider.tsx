"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";
import { useScrollStore } from "@/lib/scrollStore";

const HEADER_OFFSET = -72;

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useScrollStore((state) => state.reducedMotion);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => useScrollStore.getState().setReducedMotion(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    registerGsap();

    if (reducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: HEADER_OFFSET },
      autoRaf: false,
      respectReducedMotion: true,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    // Satu loop untuk Lenis dan GSAP agar pin/scrub tetap sinkron.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
    };
  }, [reducedMotion]);

  useEffect(() => {
    let timer: number | undefined;

    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    };

    window.addEventListener("orientationchange", refresh);
    window.addEventListener("resize", refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("orientationchange", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return children;
}
