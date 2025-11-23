"use client";

import { motion } from "framer-motion";
import { sectionFade, staggerGrid, cardFade } from "@/components/motion";

const logos = [
  { src: "/partners/partner1.png", alt: "Partner 1" },
  { src: "/partners/partner2.png", alt: "Partner 2" },
  { src: "/partners/partner3.png", alt: "Partner 3" },
  { src: "/partners/partner4.png", alt: "Partner 4" },
];

export default function Partners() {
  return (
    <motion.section
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 bg-white relative overflow-hidden"
    >
      {/* soft brand blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="hero-floating hero-blue opacity-[0.10]" />
        <div className="hero-floating hero-green opacity-[0.07]" />
      </div>

      <div className="container relative z-10">
        <h3 className="text-center text-gray-600 uppercase tracking-wide text-sm mb-10">
          Partners & Supporters
        </h3>

        <motion.div
          variants={staggerGrid}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-center"
        >
          {logos.map((l) => (
            <motion.div
              key={l.alt}
              variants={cardFade}
              whileHover={{ scale: 1.05, opacity: 1 }}
              className="flex items-center justify-center"
            >
              <img
                src={l.src}
                alt={l.alt}
                className="h-10 w-auto opacity-70 hover:opacity-100 transition-all grayscale hover:grayscale-0"
              />
            </motion.div>
          ))}
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
