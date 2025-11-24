"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { BlogPageContent, BlogPost, FeaturedPostRow } from "@/lib/api/wordpress";

function buildPostHref(uri: string) {
  if (!uri) return "/blog";
  return "/blog" + (uri.startsWith("/") ? uri : `/${uri}`);
}

export default function Blog({
  content,
  posts = [],
}: {
  content: BlogPageContent;
  posts: BlogPost[];
}) {
  const {
    heroEyebrow,
    heroHeading,
    herobody,
    herochips,

    featuredHeading,
    featuredbody,
    featuredposts, // <-- now correctly an array of rows

    topicfilters,

    ctatext,
    ctaButtonText,
    ctabuttonlink,
  } = content;

  /** ----------------------------------------------------
   * FIXED FEATURED POSTS LOGIC
   * ACF repeater => ALWAYS an array of rows
   ----------------------------------------------------- */
  const featured: BlogPost[] = (featuredposts ?? [])
    .flatMap((row: FeaturedPostRow | null) => row?.post?.nodes ?? [])
    .filter((p): p is BlogPost => !!p?.id);

  const featuredIds = new Set(featured.map((p) => p.id));

  /** ----------------------------------------------------
   * FILTERS
   ----------------------------------------------------- */
  const fallbackFilters = [
    { filterLabel: "All", filterSlug: "all" },
    { filterLabel: "Early years", filterSlug: "early-years" },
    { filterLabel: "School", filterSlug: "school" },
    { filterLabel: "Autistic adults", filterSlug: "autistic-adults" },
    { filterLabel: "Caregivers", filterSlug: "caregivers" },
    { filterLabel: "Community & advocacy", filterSlug: "community-advocacy" },
  ];

  const filters =
    (topicfilters?.length ? topicfilters : fallbackFilters).map((f) => ({
      filterLabel: f.filterLabel || "All",
      filterSlug: f.filterSlug || "all",
    }));

  const [active, setActive] = useState(filters[0]?.filterSlug || "all");
  const [q, setQ] = useState("");

  /** ----------------------------------------------------
   * FILTERED POSTS
   ----------------------------------------------------- */
  const filteredPosts = useMemo(() => {
    const base =
      active === "all"
        ? posts
        : posts.filter((p) =>
            (p.categories?.nodes ?? []).some(
              (c) => c.slug?.toLowerCase() === active
            )
          );

    const withoutFeatured = base.filter((p) => !featuredIds.has(p.id));

    if (!q.trim()) return withoutFeatured;

    const query = q.toLowerCase();
    return withoutFeatured.filter((p) =>
      [p.title, p.excerpt]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(query))
    );
  }, [active, q, posts, featuredIds]);

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl border bg-gray-50 p-8 md:p-12">
            <div className="absolute inset-0 bg-soft-blobs pointer-events-none" />
            <p className="text-sm text-gray-500 mb-3">
              {heroEyebrow || "Blog"}
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 max-w-3xl">
              {heroHeading || "Stories, guides, and community reflections"}
            </h1>
            {herobody && (
              <p className="mt-4 text-muted max-w-3xl leading-relaxed">
                {herobody}
              </p>
            )}
            {(herochips?.length ?? 0) > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {herochips!.map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full bg-white border px-3 py-1 text-xs text-gray-700 shadow-sm"
                  >
                    {c.chipText}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container max-w-6xl">
            <h2 className="text-3xl font-semibold text-gray-900">
              {featuredHeading || "Featured articles"}
            </h2>
            {featuredbody && (
              <p className="text-muted mt-2 max-w-3xl">{featuredbody}</p>
            )}

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {featured.map((p) => {
                const img = p.featuredImage?.node?.sourceUrl;
                const href = buildPostHref(p.uri);
                const date = new Date(p.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="card overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col"
                  >
                    {img && (
                      <a href={href} className="block h-44 w-full overflow-hidden">
                        <img
                          src={img}
                          alt={p.title}
                          className="h-full w-full object-cover"
                        />
                      </a>
                    )}

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="text-xs text-gray-500">
                        {date}
                        {p.author?.node?.name
                          ? ` · By ${p.author.node.name}`
                          : ""}
                      </div>

                      <a
                        href={href}
                        className="mt-2 font-medium line-clamp-2 hover:underline"
                      >
                        {p.title}
                      </a>

                      {p.excerpt && (
                        <div
                          className="prose prose-sm mt-3 text-muted line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: p.excerpt }}
                        />
                      )}

                      <a
                        href={href}
                        className="mt-4 inline-block text-brand font-medium hover:underline"
                      >
                        Read more →
                      </a>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FILTERS + SEARCH */}
      <section className="py-12 bg-white bg-subtle-grid">
        <div className="container max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* FILTER BUTTONS */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.filterSlug}
                  onClick={() => setActive(f.filterSlug)}
                  className={`px-3 py-1 rounded-full text-sm border transition ${
                    active === f.filterSlug
                      ? "bg-brand text-white border-brand"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {f.filterLabel}
                </button>
              ))}
            </div>

            {/* SEARCH */}
            <div className="relative w-full md:w-96">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search blog topics..."
                className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>

          {/* POSTS GRID */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
            className="mt-8 grid md:grid-cols-3 gap-6"
          >
            {filteredPosts.map((p) => {
              const img = p.featuredImage?.node?.sourceUrl;
              const href = buildPostHref(p.uri);
              const date = new Date(p.date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              const author = p.author?.node?.name;
              const cats = p.categories?.nodes ?? [];

              return (
                <motion.article
                  key={p.id}
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    show: { opacity: 1, y: 0 },
                  }}
                  className="card overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col"
                >
                  {img && (
                    <a href={href} className="block h-40 w-full overflow-hidden">
                      <img
                        src={img}
                        alt={p.title}
                        className="h-full w-full object-cover"
                      />
                    </a>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs text-gray-500">
                      {date}
                      {author ? ` · By ${author}` : ""}
                      {cats.length
                        ? ` · ${cats.map((c) => c.name).join(", ")}`
                        : ""}
                    </div>

                    <a
                      href={href}
                      className="mt-2 font-medium line-clamp-2 hover:underline"
                    >
                      {p.title}
                    </a>

                    {p.excerpt && (
                      <div
                        className="prose prose-sm mt-3 text-muted line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: p.excerpt }}
                      />
                    )}

                    <a
                      href={href}
                      className="mt-4 inline-block text-brand font-medium hover:underline"
                    >
                      Read more →
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA BAR */}
      {(ctatext || ctaButtonText) && (
        <section className="py-10 bg-secondary-light">
          <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-900 font-medium text-lg">
              {ctatext}
            </p>

            {ctaButtonText && ctabuttonlink && (
              <a
                href={ctabuttonlink}
                className="btn btn-primary px-6 py-3 whitespace-nowrap rounded-xl text-center leading-snug"
              >
                {ctaButtonText}
              </a>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
