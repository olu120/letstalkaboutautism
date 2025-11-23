import AboutHero from "@/components/about/AboutHero";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import CoreValues from "@/components/about/CoreValues";
import Leadership from "@/components/about/Leadership";
import AboutCta from "@/components/about/AboutCta";
import Footer from "@/components/home/Footer";
import { getAboutContent } from "@/lib/api/wordpress";

export const revalidate = 60;

export default async function AboutPage() {
  const about = await getAboutContent();

  return (
    <>
      <AboutHero
        heading={about?.heroHeading}
        subheading={about?.heroSubheading}
        body={about?.heroBody}
        image={about?.heroImage}
      />

      <JourneyTimeline items={about?.journeyItems || []} />
      <CoreValues items={about?.coreValues || []} />
      <Leadership items={about?.leadershipTeam || []} />

      <AboutCta
        text={about?.ctaText}
        buttonText={about?.ctaButtonText}
        buttonLink={about?.ctaButtonLink}
      />

      <Footer />
    </>
  );
}
