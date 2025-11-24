"use client";

import { motion } from "framer-motion";
import { staggerGrid, cardFade, sectionFade } from "@/components/motion";

type Card = {
  cardTitle: string;
  cardDescription?: string | null;
  cardImage?: { sourceUrl?: string | null; altText?: string | null } | null;
};

export default function Mission({ items = [] as Card[] }) {
  return (
    <motion.section
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="py-16 bg-gray-50"   // ✅ Clean background matching other pages
    >
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-gray-900 text-center">
          Our Mission & Values
        </h2>

        <motion.div
          variants={staggerGrid}
          className="grid md:grid-cols-3 gap-6"
        >
          {items.map((t) => (
            <motion.article
              key={t.cardTitle}
              variants={cardFade}
              className="card p-6 text-left hover:shadow-md transition-shadow bg-white border rounded-xl"
            >
              {t.cardImage?.sourceUrl && (
                <div className="mb-4 h-20 w-20 rounded-xl overflow-hidden border bg-gray-100">
                  <img
                    src={t.cardImage.sourceUrl}
                    alt={t.cardImage.altText || t.cardTitle}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <h3 className="text-xl font-medium mb-2">{t.cardTitle}</h3>

              {t.cardDescription && (
                <p className="text-muted leading-relaxed">
                  {t.cardDescription}
                </p>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
