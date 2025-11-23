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
      className="py-20 bg-gray-50 relative overflow-hidden"
    >
      {/* soft background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="hero-floating hero-blue opacity-[0.08]" />
        <div className="hero-floating hero-green opacity-[0.06]" />
      </div>

      <div className="container relative z-10">
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
                className="card overflow-hidden h-full flex flex-col bg-white/95 backdrop-blur-sm border shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* image */}
                {img && (
                  <Link href={href} className="block relative h-44 w-full overflow-hidden">
                    <motion.img
                      src={img}
                      alt={p.title}
                      className="h-full w-full object-cover object-center"
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.35 }}
                    />
                    {/* subtle fade for text contrast if ever needed */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </Link>
                )}

                {/* content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* meta line */}
                  <div className="text-xs text-gray-500 flex flex-wrap items-center gap-2">
                    <span>{date}</span>
                    {author && <span>· By {author}</span>}
                  </div>

                  {/* categories (badges) */}
                  {cats.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {cats.slice(0, 3).map((c) => (
                        <span
                          key={c.slug}
                          className="badge-calm"
                        >
                          {c.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* title */}
                  <Link
                    href={href}
                    className="mt-3 font-semibold text-lg text-gray-900 line-clamp-2 hover:underline underline-offset-4"
                  >
                    {p.title}
                  </Link>

                  {/* excerpt */}
                  {p.excerpt && (
                    <div
                      className="prose prose-sm mt-3 text-muted line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: p.excerpt }}
                    />
                  )}

                  {/* read more */}
                  <Link
                    href={href}
                    className="mt-5 inline-flex items-center text-brand font-medium hover:underline underline-offset-4"
                  >
                    Read more →
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* bottom wave transition */}
      <img
        src="/partners/hero-wave.svg"
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full opacity-60 pointer-events-none select-none"
      />
    </motion.section>
  );
}
