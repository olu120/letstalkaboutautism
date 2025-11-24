import Blog from "@/components/blog/Blog";
import Footer from "@/components/home/Footer";
import { getBlogPageContent, getBlogPosts } from "@/lib/api/wordpress";


export const revalidate = 60;

export default async function BlogPage() {
  const [content, posts] = await Promise.all([
    getBlogPageContent(),
    getBlogPosts(30),
  ]);

  if (!content) {
    return (
      <main className="container py-16">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <p className="text-muted mt-2">Content not available yet.</p>
      </main>
    );
  }

  return (
    <>
      <Blog content={content} posts={posts} />
      <Footer />
    </>
  );
}
