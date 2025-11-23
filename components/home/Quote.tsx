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
      className="py-20 bg-secondary-light relative overflow-hidden"
    >
      {/* Soft brand blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="hero-floating hero-green opacity-[0.12]" />
        <div className="hero-floating hero-blue opacity-[0.08]" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {text && (
            <p className="text-2xl md:text-4xl font-semibold text-gray-900 leading-snug drop-shadow-sm">
              “{text}”
            </p>
          )}

          {ctaText && ctaLink && (
            <motion.a
              href={ctaLink}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary mt-8 inline-flex"
            >
              {ctaText}
            </motion.a>
          )}
        </div>
      </div>

      {/* Bottom wave transition */}
      <img
        src="/partners/hero-wave.svg"
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full opacity-70 pointer-events-none select-none"
      />
    </motion.section>
  );
}
