import Image from "next/image";
import { getPostByUri } from "@/lib/api/wordpress";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug?: string[] | string }>;
};

export default async function BlogPostPage({ params }: Props) {
  // ✅ unwrap params (Next 15/16 requirement)
  const resolvedParams = await params;

  const slugArr =
    Array.isArray(resolvedParams?.slug)
      ? resolvedParams.slug
      : typeof resolvedParams?.slug === "string"
      ? [resolvedParams.slug]
      : [];

  if (slugArr.length === 0) {
    return (
      <main className="container py-20">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <p className="text-muted mt-2">Please check the link and try again.</p>
      </main>
    );
  }

  // WP stores root URIs, not /blog/
  const rawSlug = slugArr.join("/");
  const cleanedSlug = rawSlug.replace(/^blog\//, "");
  const uri = `/${decodeURIComponent(cleanedSlug)}/`;

  const post = await getPostByUri(uri);

  if (!post) {
    return (
      <main className="container py-20">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <p className="text-muted mt-2">Please check the link and try again.</p>
      </main>
    );
  }

  const img = post.featuredImage?.node?.sourceUrl;

  return (
    <main className="container py-16 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
        {post.title}
      </h1>

      <div className="text-sm text-gray-500 mt-2">
        {new Date(post.date).toLocaleDateString()}
        {post.author?.node?.name ? ` · By ${post.author.node.name}` : ""}
      </div>

      {img && (
        <div className="relative w-full h-[360px] mt-6 rounded-2xl overflow-hidden border shadow-sm">
          <Image
            src={img}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <article
        className="prose prose-lg mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
      />
    </main>
  );
}
