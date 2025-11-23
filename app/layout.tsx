import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import DevBar from "@/components/DevBar";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://letstalkaboutautism.org";
const siteName = "Let’s Talk About Autism"; // <- exact name

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description:
    "Resources, guidance, and community support — coming soon.",
  openGraph: {
    title: `${siteName} — Coming Soon`,
    description:
      "Resources, guidance, and community support — coming soon.",
    url: "/",
    siteName,
    type: "website",
    images: ["/ComingSoon.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}><NavBar />{children}<DevBar /></body>
    </html>
  );
}

