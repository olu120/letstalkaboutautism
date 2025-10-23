import "./globals.css";

export const metadata = {
  title: "Let’s Talk About Autism",
  description: "We’re building something helpful.",
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
