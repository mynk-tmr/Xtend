import logoUrl from "@/common/assets/logo.png";
import { HeroIntro } from "./HeroIntro";
import { AutoPlayImages } from "./AutoPlayImages";
import { PerksSection } from "./PerksSection";
import { Testimonials } from "./Testimonials";
import { YoutubeEmbed } from "./YoutubeEmbed";
import { BottomNavLinks } from "./BottomNavLinks";

export const HomePage = () => {
  return (
    <>
      <h1 className="text-center p-4 mb-5">
        <img src={logoUrl} alt="logo" />
      </h1>
      <section className="grid md:grid-cols-2 content-center gap-12 p-8 items-start">
        <HeroIntro />
        <AutoPlayImages />
      </section>
      <PerksSection />
      <Testimonials />
      <YoutubeEmbed />
      <BottomNavLinks />
    </>
  );
};
