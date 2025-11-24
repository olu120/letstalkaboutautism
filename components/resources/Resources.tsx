"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type {
  ResourcesContent,
  LibraryCard,
} from "@/lib/api/wordpress";

export default function Resources({ content }: { content: ResourcesContent }) {
  const {
    heroEyebrow,
    heroHeading,
    heroBody,
    heroChips,

    libraryHeading,
    libraryBody,
    audienceFilters,
    libraryCards,

    downloadHeading,
    downloadBody,
    downloadCards,

    forYouHeading,
    forYouBody,
    forYouCards,

    helpHeading,
    helpBody,
    helpPrimaryText,
    helpPrimaryLink,
    helpSecondaryText,
    helpSecondaryLink,
    quickLinks,

    ctaBarText,
    ctaBarButtonText,
    ctaBarButtonLink,
  } = content;

  const fallbackFilters = [
    { filterLabel: "All", filterSlug: "all" },
    { filterLabel: "Families", filterSlug: "families" },
    { filterLabel: "Educators", filterSlug: "educators" },
    { filterLabel: "Professionals", filterSlug: "professionals" },
    { filterLabel: "Autistic adults", filterSlug: "autistic-adults" },
  ];

  const fallbackLibrary: LibraryCard[] = [
    {
      type: "Guide",
      title: "First steps after an autism diagnosis",
      audience: "For families & caregivers",
      description:
        "A gentle, step-by-step overview of what a diagnosis can mean, common next steps, and ways to care for yourself and your child.",
      meta: "10-minute read · Downloadable PDF",
      ctaText: "View guide",
      ctaLink: "/resources",
      audienceSlug: "families",
    },
    {
      type: "Checklist",
      title: "Creating sensory-friendly classrooms",
      audience: "For school teams",
      description:
        "Practical ideas to adjust lighting, sound, seating, and routines so autistic students can feel safer and more included in class.",
      meta: "Printable · Classroom examples",
      ctaText: "Download checklist",
      ctaLink: "/resources",
      audienceSlug: "educators",
    },
    {
      type: "Video",
      title: "Listening to autistic voices",
      audience: "For everyone",
      description:
        "Short video stories from autistic people sharing what helps, what hurts, and how communities can better support them.",
      meta: "15-minute video",
      ctaText: "Watch now",
      ctaLink: "/resources",
      audienceSlug: "all",
    },
    {
      type: "Template",
      title: "My sensory profile & support plan",
      audience: "For caregivers & adults",
      description:
        "A fillable template describing sensory preferences, communication styles, and helpful accommodations at home, school, or work.",
      meta: "Fillable PDF",
      ctaText: "Use template",
      ctaLink: "/resources",
      audienceSlug: "autistic-adults",
    },
  ];

  const filters = (audienceFilters?.length ? audienceFilters : fallbackFilters);
  const cards = (libraryCards?.length ? libraryCards : fallbackLibrary);

  const [active, setActive] = useState<string>(filters[0]?.filterSlug ?? "all");

  const [q, setQ] = useState("");

  const filteredCards = useMemo(() => {
    const byAudience =
      active === "all"
        ? cards
        : cards.filter(c => (c.audienceSlug || "").toLowerCase() === active);

    if (!q.trim()) return byAudience;
    const query = q.toLowerCase();
    return byAudience.filter(c =>
      [c.title, c.description, c.type, c.audience]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(query))
    );
  }, [active, q, cards]);

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl border bg-gray-50 p-8 md:p-12">
            <div className="absolute inset-0 bg-soft-blobs pointer-events-none" />
            <p className="text-sm text-gray-500 mb-3">
              {heroEyebrow || "Resources & Guides"}
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 max-w-3xl">
              {heroHeading || "Practical tools to understand, support, and advocate"}
            </h1>
            {heroBody && (
              <p className="mt-4 text-muted max-w-3xl leading-relaxed">
                {heroBody}
              </p>
            )}

            {(heroChips?.length ?? 0) > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {heroChips!.map((c, i) => (
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

      {/* LIBRARY */}
      <section className="py-16 bg-white bg-subtle-grid">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-semibold text-gray-900">
            {libraryHeading || "Explore our resource library"}
          </h2>
          {libraryBody && (
            <p className="text-muted mt-2 max-w-3xl">
              {libraryBody}
            </p>
          )}

          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {filters.map(f => (
                <button
                  key={f.filterSlug}
                  onClick={() => setActive(f.filterSlug ?? "all")}

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

            <div className="relative w-full md:w-96">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search topics (communication, school, diagnosis...)"
                className="w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="mt-8 grid md:grid-cols-2 gap-6"
          >
            {filteredCards.map((c, i) => (
              <motion.article
                key={`${c.title}-${i}`}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="card p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-xs text-gray-500 flex justify-between gap-2">
                  <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5">
                    {c.type}
                  </span>
                  {c.audience && <span>{c.audience}</span>}
                </div>

                <h3 className="mt-3 text-lg font-medium text-gray-900">
                  {c.title}
                </h3>
                {c.description && (
                  <p className="mt-2 text-muted">
                    {c.description}
                  </p>
                )}
                {c.meta && (
                  <p className="mt-3 text-xs text-gray-500">
                    {c.meta}
                  </p>
                )}

                {c.ctaText && c.ctaLink && (
                  <a
  href={c.ctaLink}
  target={c.ctaLink?.startsWith("http") ? "_blank" : undefined}
  rel={c.ctaLink?.startsWith("http") ? "noreferrer noopener" : undefined}
  className="mt-4 inline-block text-brand font-medium hover:underline"
>
  {c.ctaText} →
</a>

                )}
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DOWNLOADABLE TOOLS */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-semibold text-gray-900">
            {downloadHeading || "Downloadable tools"}
          </h2>
          {downloadBody && (
            <p className="text-muted mt-2 max-w-3xl">
              {downloadBody}
            </p>
          )}

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {(downloadCards ?? []).map((c, i) => (
              <motion.article
                key={`${c.title}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
                className="card p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium">{c.title}</h3>
                {c.description && <p className="mt-2 text-muted">{c.description}</p>}
                {c.meta && <p className="mt-3 text-xs text-gray-500">{c.meta}</p>}

                {c.ctaText && c.ctaLink && (
                  <a href={c.ctaLink} className="mt-4 inline-block text-brand font-medium hover:underline">
                    {c.ctaText} →
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FOR YOU */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl">
          <h2 className="text-3xl font-semibold text-gray-900">
            {forYouHeading || "Find resources made for you"}
          </h2>
          {forYouBody && <p className="text-muted mt-2 max-w-3xl">{forYouBody}</p>}

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {(forYouCards ?? []).map((c, i) => (
              <motion.article
                key={`${c.title}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
                className="card p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium">{c.title}</h3>
                {c.description && <p className="mt-2 text-muted">{c.description}</p>}

                {(c.bullets?.length ?? 0) > 0 && (
                  <ul className="mt-3 text-sm text-gray-700 list-disc pl-5 space-y-1">
                    {c.bullets!.map((b, idx) => <li key={idx}>{b}</li>)}
                  </ul>
                )}

                {c.ctaText && c.ctaLink && (
                  <a href={c.ctaLink} className="mt-4 inline-block text-brand font-medium hover:underline">
                    {c.ctaText} →
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* HELP + QUICK LINKS */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl grid md:grid-cols-2 gap-6">
          <div className="card p-6 md:p-8">
            <h3 className="text-xl font-semibold">{helpHeading || "Need help choosing a resource?"}</h3>
            {helpBody && <p className="text-muted mt-2">{helpBody}</p>}

            <div className="mt-5 flex flex-wrap gap-3">
              {helpPrimaryText && helpPrimaryLink && (
                <a href={helpPrimaryLink} className="btn btn-secondary">
                  {helpPrimaryText}
                </a>
              )}
              {helpSecondaryText && helpSecondaryLink && (
                <a href={helpSecondaryLink} className="btn btn-tertiary">
                  {helpSecondaryText}
                </a>
              )}
            </div>
          </div>

          <div className="card p-6 md:p-8">
            <h3 className="text-xl font-semibold">Popular quick links</h3>
            <ul className="mt-3 space-y-3 text-sm">
              {(quickLinks ?? []).map((q, i) => (
                <li key={`${q.label}-${i}`}>
                  <a href={q.link || "#"} className="text-brand font-medium hover:underline">
                    {q.label}
                  </a>
                  {q.kind && <span className="text-gray-500"> · {q.kind}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA BAR */}
      {(ctaBarText || ctaBarButtonText) && (
        <section className="py-10 bg-secondary-light">
          <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-900 font-medium text-lg">
              {ctaBarText}
            </p>
            {ctaBarButtonText && ctaBarButtonLink && (
              <a href={ctaBarButtonLink} className="btn btn-primary">
                {ctaBarButtonText}
              </a>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
