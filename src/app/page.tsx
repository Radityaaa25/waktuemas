import { SiteHeader } from "@/components/sections/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { UseCase } from "@/components/sections/UseCase";
import { CprStory } from "@/components/sections/CprStory";
import { Closing } from "@/components/sections/Closing";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="konten-utama" tabIndex={-1}>
        <Hero />
        <Problem />
        <UseCase />
        <CprStory />
        <Closing />
      </main>
      <SiteFooter />
    </>
  );
}
