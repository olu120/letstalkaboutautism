import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://letstalkaboutautism.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Let’s Talk About Autism",
    template: "%s — Let’s Talk About Autism",
  },
  description: "Resources, guidance, and community support — coming soon.",
  openGraph: {
    title: "Let’s Talk About Autism — Coming Soon",
    description:
      "Resources, guidance, and community support — coming soon.",
    url: "/",
    siteName: "Let’s Talk About Autism",
    type: "website",
    images: ["/ComingSoon.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
