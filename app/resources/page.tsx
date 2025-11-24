import Resources from "@/components/resources/Resources";
import Footer from "@/components/home/Footer";
import { getResourcesContent } from "@/lib/api/wordpress";

export const revalidate = 60;

export default async function ResourcesPage() {
  const content = await getResourcesContent();

  if (!content) {
    return (
      <main className="container py-20">
        <h1 className="text-2xl font-semibold">Resources</h1>
        <p className="text-muted mt-2">
          Resources content not found. Please check your WordPress ACF setup.
        </p>
      </main>
    );
  }

  return (
    <>
      <Resources content={content} />
      <Footer />
    </>
  );
}
