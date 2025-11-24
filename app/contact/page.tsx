import Footer from "@/components/home/Footer";
import Contact from "@/components/contact/Contact";
import { getContactPageContent } from "@/lib/api/wordpress";

export const revalidate = 60;

export default async function ContactPage() {
  const content = await getContactPageContent();

  if (!content) {
    return (
      <>
        <main className="container py-20">
          <h1 className="text-2xl font-semibold">Contact</h1>
          <p className="text-muted mt-2">
            Contact page content is not available yet.
          </p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Contact content={content} />
      <Footer />
    </>
  );
}
