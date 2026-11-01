"use client";

import { Scene } from "@/components/story/Scene";
import { StoryProgressBar } from "@/components/story/StoryProgressBar";
import { MotionToggle } from "@/components/ui/MotionToggle";
import {
  buildScene0,
  Scene0Content,
} from "@/components/story/scenes/Scene0Sampul";
import {
  buildScene1,
  Scene1TahukahKamu,
} from "@/components/story/scenes/Scene1TahukahKamu";
import {
  buildScene6,
  Scene6TibaTiba,
} from "@/components/story/scenes/Scene6TibaTiba";

export default function Home() {
  return (
    <>
      {/* Elemen UI Minimal: Progress Bar di atas & Tombol Aksesibilitas di pojok */}
      <StoryProgressBar />
      <MotionToggle />

      <main id="konten-utama" tabIndex={-1} className="relative w-full">
        {/* Scene 0: Sampul (Latar Paper Krem) */}
        <Scene
          id="scene-0-sampul"
          bg="var(--paper)"
          length="+=250%"
          build={buildScene0}
        >
          <Scene0Content />
        </Scene>

        {/* Scene 1: Tahukah kamu? (Latar Sky Pastel Biru Muda) */}
        <Scene
          id="scene-1-tahukah-kamu"
          bg="var(--sky)"
          length="+=300%"
          build={buildScene1}
        >
          <Scene1TahukahKamu />
        </Scene>

        {/* Scene 6: Tiba-tiba Ardi jatuh (Latar Cool Dingin Pucat / Kantin) */}
        <Scene
          id="scene-6-tiba-tiba"
          bg="var(--cool)"
          length="+=300%"
          build={buildScene6}
        >
          <Scene6TibaTiba />
        </Scene>
      </main>
    </>
  );
}
