import { gsap } from "./gsap";

export interface SceneContext {
  container: HTMLElement;
  isMobile: boolean;
}

export type SceneBuildFn = (timeline: gsap.core.Timeline, ctx: SceneContext) => void;

/**
 * Helper untuk menyusun timeline scrub per-scene dengan fase IN, HOLD, OUT yang konsisten.
 */
export function createSceneTimeline(
  buildFn: SceneBuildFn,
  ctx: SceneContext,
): gsap.core.Timeline {
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: "none" },
  });

  buildFn(tl, ctx);
  return tl;
}
