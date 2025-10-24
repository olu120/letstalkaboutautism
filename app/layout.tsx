import "./globals.css";
import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://letstalkaboutautism.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Let’s Talk About Autism",
    template: "%s — Let’s Talk About Autism",
  },
  description:
    "Resources, guidance, and community support — coming soon.",
  openGraph: {
    title: "Let’s Talk About Autism — Coming Soon",
    description:
      "Resources, guidance, and community support — coming soon.",
    url: "/",
    siteName: "Let’s Talk About Autism",
    type: "website",
    images: ["/ComingSoon.jpg"], // uses your existing hero as OG image
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
