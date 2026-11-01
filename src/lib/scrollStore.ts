import { create } from "zustand";
import type { SceneId } from "@/data/story";

interface ScrollState {
  progress: number;
  activeScene: SceneId;
  sceneProgress: number;
  reducedMotion: boolean;
  paused: boolean;
  setProgress: (progress: number) => void;
  setScene: (scene: SceneId, sceneProgress: number, progress: number) => void;
  setReducedMotion: (reduced: boolean) => void;
  toggleReducedMotion: () => void;
  togglePaused: () => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  activeScene: "opening",
  sceneProgress: 0,
  reducedMotion: false,
  paused: false,
  setProgress: (progress) => set({ progress }),
  setScene: (activeScene, sceneProgress, progress) =>
    set({ activeScene, sceneProgress, progress }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  toggleReducedMotion: () =>
    set((state) => ({ reducedMotion: !state.reducedMotion })),
  togglePaused: () => set((state) => ({ paused: !state.paused })),
}));
