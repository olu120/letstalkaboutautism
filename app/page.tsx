import ComingSoon from "@/components/ComingSoon";
import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import Updates from "@/components/home/Updates";
import Stats from "@/components/home/Stats";
import Quote from "@/components/home/Quote";
import Footer from "@/components/home/Footer";
import Programs from "@/components/home/Programs";
import Testimonials from "@/components/home/Testimonials";
import Partners from "@/components/home/Partners";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import { getSiteSettings, getHomepageContent, getRecentPosts } from "@/lib/api/wordpress";

export const revalidate = 60;

function launchIsInFuture(iso?: string) {
  if (!iso) return false;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() > Date.now(); // future => normally show Coming Soon
}

function shouldShowComingSoon(launchDate?: string) {
  // Bypass in dev/local if flag is set
  if (process.env.NEXT_PUBLIC_BYPASS_COMING_SOON === "1") return false;
  return launchIsInFuture(launchDate);
}



export default async function Page() {
  const [settings, home, posts] = await Promise.all([
    getSiteSettings(),
    getHomepageContent(),
    getRecentPosts(),
  ]);

  const launchDate = settings?.launchDate || process.env.NEXT_PUBLIC_LAUNCH_DATE;
  const socials = [
    { label: "Instagram", href: settings?.instagramUrl || "https://instagram.com" },
    { label: "LinkedIn",  href: settings?.linkedinUrl  || "https://linkedin.com" },
    { label: "WhatsApp",  href: settings?.whatsappUrl  || "https://wa.me/" },
  ];

 if (launchIsInFuture(launchDate) && process.env.NEXT_PUBLIC_BYPASS_COMING_SOON !== "1") {
    return <ComingSoon initialLaunchDate={launchDate} socials={socials} />;
  }
  return (
    <>
  <Hero
 heading={home?.heroHeading || "Let’s Talk About Autism"}
  subheading={home?.heroSubheading}
  primaryText={home?.heroPrimaryText}
  primaryLink={home?.heroPrimaryLink || "/contact"}
  secondaryText={home?.heroSecondaryText}
  secondaryLink={home?.heroSecondaryLink || "/get-involved"}
  images={home?.heroGallery || []}
  />
      <Mission items={home?.missionCards || []} />
<Programs />
<Stats items={home?.stats || []} />
<Updates posts={posts} />
<Testimonials />
<Partners />
<NewsletterBanner />
<Quote
  text={home?.quoteText}
  ctaText={home?.quoteButtonText}
  ctaLink={home?.quoteButtonLink || "/services"}
/>
      <Footer />
    </>
  );
}
