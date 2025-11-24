"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { sectionFade, cardFade, staggerGrid } from "@/components/motion";

type Post = {
  id: string;
  title: string;
  date: string;
  excerpt?: string | null;
  uri: string;
  featuredImage?: { node?: { sourceUrl?: string | null } | null } | null;
  author?: { node?: { name?: string | null } | null } | null;
  categories?: { nodes?: { name: string; slug: string }[] | null } | null;
};

export default function Updates({ posts = [] as Post[] }) {
  return (
    <motion.section
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 bg-white"  // ✅ clean & consistent with other pages
    >
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-gray-900">
          Recent Updates
        </h2>

        <motion.div
          variants={staggerGrid}
          className="grid md:grid-cols-3 gap-8"
        >
          {posts.map((p) => {
            const img = p.featuredImage?.node?.sourceUrl || null;

            const date = new Date(p.date).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            const author = p.author?.node?.name;
            const cats = p.categories?.nodes ?? [];

            const cleanUri = p.uri?.startsWith("/") ? p.uri : `/${p.uri}`;
            const href = `/blog${cleanUri}`;

            return (
              <motion.article
                key={p.id}
                variants={cardFade}
                whileHover={{ y: -4 }}
                className="card overflow-hidden h-full flex flex-col bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                {img && (
                  <Link href={href} className="block relative h-44 w-full overflow-hidden">
                    <motion.img
                      src={img}
                      alt={p.title}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.35 }}
                    />
                  </Link>
                )}

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs text-gray-500 flex flex-wrap items-center gap-2">
                    <span>{date}</span>
                    {author && <span>· By {author}</span>}
                  </div>

                  {/* Categories */}
                  {cats.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {cats.slice(0, 3).map((c) => (
                        <span
                          key={c.slug}
                          className="inline-flex px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700"
                        >
                          {c.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <Link
                    href={href}
                    className="mt-3 font-semibold text-lg text-gray-900 line-clamp-2 hover:underline underline-offset-4"
                  >
                    {p.title}
                  </Link>

                  {/* Excerpt */}
                  {p.excerpt && (
                    <div
                      className="prose prose-sm mt-3 text-muted line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: p.excerpt }}
                    />
                  )}

                  <Link
                    href={href}
                    className="mt-auto pt-4 inline-flex items-center text-brand font-medium hover:underline underline-offset-4"
                  >
                    Read more →
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
