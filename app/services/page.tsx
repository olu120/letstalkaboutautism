import Services from "@/components/services/Services";
import Footer from "@/components/home/Footer";
import { getServicesPageContent } from "@/lib/api/wordpress";

export const revalidate = 60;

export default async function ServicesPage() {
  const content = await getServicesPageContent();

  return (
    <>
      <Services content={content} />
      <Footer />
    </>
  );
}
