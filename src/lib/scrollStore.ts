import { create } from "zustand";
import type { EcgState, StoryPath } from "@/data/content";

interface ScrollState {
  progress: number;
  path: StoryPath;
  step: number;
  ecgState: EcgState;
  inStory: boolean;
  reducedMotion: boolean;
  scenePaused: boolean;
  setProgress: (progress: number) => void;
  setPath: (path: StoryPath) => void;
  setStep: (step: number) => void;
  setEcgState: (state: EcgState) => void;
  setInStory: (inStory: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  toggleReducedMotion: () => void;
  toggleScenePaused: () => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  path: "A",
  step: 0,
  ecgState: "irregular",
  inStory: false,
  reducedMotion: false,
  scenePaused: false,
  setProgress: (progress) => set({ progress }),
  setPath: (path) => set({ path }),
  setStep: (step) => set({ step }),
  setEcgState: (ecgState) => set({ ecgState }),
  setInStory: (inStory) => set({ inStory }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  toggleReducedMotion: () =>
    set((state) => ({ reducedMotion: !state.reducedMotion })),
  toggleScenePaused: () =>
    set((state) => ({ scenePaused: !state.scenePaused })),
}));
