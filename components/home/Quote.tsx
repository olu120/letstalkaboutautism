"use client";

import { motion } from "framer-motion";
import { sectionFade } from "@/components/motion";

export default function Quote({
  text,
  ctaText,
  ctaLink,
}: {
  text?: string | null;
  ctaText?: string | null;
  ctaLink?: string | null;
}) {
  return (
    <motion.section
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 bg-white"
    >
      <div className="container max-w-4xl mx-auto">
        <div className="bg-gray-50 border rounded-2xl p-10 md:p-14 text-center shadow-sm">
          {text && (
            <p className="text-2xl md:text-4xl font-semibold text-gray-900 leading-snug">
              “{text}”
            </p>
          )}

          {ctaText && ctaLink && (
            <motion.a
              href={ctaLink}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary mt-8 inline-flex px-6 py-3 rounded-xl"
            >
              {ctaText}
            </motion.a>
          )}
        </div>
      </div>
    </motion.section>
  );
}
