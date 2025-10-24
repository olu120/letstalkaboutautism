import ComingSoon from "@/components/ComingSoon";
import { getSiteSettings } from "@/lib/api/wordpress";

export const revalidate = 60; // ISR: refresh data every 60s

export default async function Page() {
  const settings = await getSiteSettings();

  const launchDate: string | undefined =
    settings?.launchDate || process.env.NEXT_PUBLIC_LAUNCH_DATE;

  const socials = [
    { label: "Instagram", href: settings?.instagramurl || "https://instagram.com" },
    { label: "LinkedIn",  href: settings?.linkedinurl  || "https://linkedin.com" },
    { label: "WhatsApp",  href: settings?.whatsappurl  || "https://wa.me/" },
  ];

  return <ComingSoon initialLaunchDate={launchDate} socials={socials} />;
}
