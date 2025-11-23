"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sectionFade } from "@/components/motion";

const items = [
  {
    quote:
      "The team helped us understand our child’s needs and build routines that work. We feel supported.",
    author: "Amina, Parent",
  },
  {
    quote:
      "Practical strategies I could use in class the next day. The workshops are excellent.",
    author: "Mr. Kato, Teacher",
  },
  {
    quote:
      "I finally found a community that listens and values autistic voices. Thank you.",
    author: "David, Self-advocate",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.section
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 bg-gray-50 bg-subtle-grid relative overflow-hidden"
    >
      {/* Soft background blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="hero-floating hero-blue opacity-[0.08]" />
        <div className="hero-floating hero-red opacity-[0.06]" />
      </div>

      <div className="container max-w-4xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-semibold mb-10 text-gray-900">
          What People Say
        </h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              className="mx-auto max-w-3xl"
            >
              <div className="card bg-white/95 backdrop-blur-sm border shadow-sm px-8 py-10 md:px-12 md:py-12">
                <blockquote className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed">
                  “{items[i].quote}”
                </blockquote>
                <p className="mt-5 text-sm md:text-base text-gray-600 font-medium">
                  — {items[i].author}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* dots */}
        <div className="mt-7 flex justify-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to testimonial ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                i === idx ? "bg-brand scale-110" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* bottom wave */}
      <img
        src="/partners/hero-wave.svg"
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full opacity-60 pointer-events-none select-none"
      />
    </motion.section>
  );
}
