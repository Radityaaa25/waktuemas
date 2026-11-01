import { StoryStage } from "@/components/story/StoryStage";
import { StoryDetails } from "@/components/story/StoryDetails";

export default function Home() {
  return (
    <main id="konten-utama" tabIndex={-1}>
      <StoryStage />
      <StoryDetails />
    </main>
  );
}
