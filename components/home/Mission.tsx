"use client";

import { motion } from "framer-motion";
import { staggerGrid, cardFade, sectionFade } from "@/components/motion";

type Card = {
  cardTitle: string;
  cardDescription?: string | null;
  cardImage?: { sourceUrl?: string | null; altText?: string | null };
};

export default function Mission({ items = [] as Card[] }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionFade}
      className="py-16 bg-white bg-soft-blobs"
    >
      <div className="container">
        <h2 className="text-3xl font-semibold mb-10 text-gray-900 text-center">
          Our Mission &amp; Values
        </h2>

        <motion.div
          variants={staggerGrid}
          className="grid md:grid-cols-3 gap-6"
        >
          {items.map((t) => (
            <motion.article
              key={t.cardTitle}
              variants={cardFade}
              whileHover={{ y: -3 }}
              className="card p-6 text-left hover:shadow-lg transition-shadow bg-white/90 backdrop-blur"
            >
              {t.cardImage?.sourceUrl && (
                <div className="mb-4 h-20 w-20 rounded-xl overflow-hidden border shadow-sm">
                  <img
                    src={t.cardImage.sourceUrl}
                    alt={t.cardImage.altText || t.cardTitle}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <h3 className="text-xl font-medium mb-2 text-gray-900">
                {t.cardTitle}
              </h3>

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
