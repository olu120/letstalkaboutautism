"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Media = {
  sourceUrl?: string | null;
  altText?: string | null;
};

type Props = {
  heading: string;
  subheading?: string | null;
  primaryText?: string | null;
  primaryLink?: string | null;
  secondaryText?: string | null;
  secondaryLink?: string | null;
  images?: Media[];
};

export default function Hero({
  heading,
  subheading,
  primaryText,
  primaryLink,
  secondaryText,
  secondaryLink,
  images = [],
}: Props) {
  const valid = images.filter((i) => !!i?.sourceUrl);
  const [index, setIndex] = useState(0);

  // Auto-advance every 5s if multiple images
  useEffect(() => {
    if (valid.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % valid.length),
      5000
    );
    return () => clearInterval(id);
  }, [valid.length]);

  return (
    <section className="bg-white">
      <div className="container max-w-6xl mx-auto py-20 md:py-24 px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-md border bg-gray-50">

          {/* Floating soft blobs behind image */}
          <div aria-hidden className="absolute inset-0 z-0">
            <div className="hero-floating hero-blue" />
            <div className="hero-floating hero-green" />
            <div className="hero-floating hero-red" />
          </div>

          {/* Slider Image Area */}
          {valid.length > 0 && (
            <div className="relative h-[300px] md:h-[520px] w-full z-10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={valid[index].sourceUrl || index}
                  src={valid[index].sourceUrl || ""}
                  alt={valid[index].altText || "Hero image"}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1.1 }}
                />
              </AnimatePresence>

              {/* Base dark overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

              {/* Aurora creative overlay */}
              <motion.div
                aria-hidden
                className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
                animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.05, 1] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Subtle dotted texture */}
              <div
                aria-hidden
                className="absolute inset-0 hero-dots mix-blend-soft-light"
              />
            </div>
          )}

          {/* Centered Text Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pb-14 md:pb-20"
          >
            <h1 className="text-5xl md:text-7xl font-semibold text-white drop-shadow-lg max-w-4xl">
              {heading}
            </h1>

            {subheading && (
              <p className="mt-4 text-lg text-white/95 drop-shadow-md max-w-2xl">
                {subheading}
              </p>
            )}

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {primaryText && primaryLink && (
                <Link href={primaryLink} className="btn btn-primary">
                  {primaryText}
                </Link>
              )}

              {secondaryText && secondaryLink && (
                <Link href={secondaryLink} className="btn btn-secondary">
                  {secondaryText}
                </Link>
              )}
            </div>
          </motion.div>

          {/* Slider Dots */}
          {valid.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {valid.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full ${
                    i === index ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Bottom wave transition (behind content, shorter, pushed lower) */}
          <img
            src="/partners/hero-wave.svg"
            className="absolute bottom-0 left-0 w-full h-24 md:h-32 object-cover translate-y-6 md:translate-y-8 z-0 pointer-events-none select-none"
            aria-hidden="true"
          />

        </div>
      </div>
    </section>
  );
}
