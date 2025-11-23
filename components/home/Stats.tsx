"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sectionFade, cardFade, staggerGrid } from "@/components/motion";

type Stat = { statNumber: string; statLabel: string };

function useCountUp(to: number, duration = 900) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame: number;

    const loop = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(p * to));
      if (p < 1) frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [to, duration]);

  return val;
}

export default function Stats({ items = [] as Stat[] }) {
  return (
    <motion.section
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Soft background blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="hero-floating hero-blue opacity-[0.10]" />
        <div className="hero-floating hero-green opacity-[0.06]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={staggerGrid}
          className="grid md:grid-cols-3 gap-8 text-center"
        >
          {items.map((i) => {
            const numeric = parseInt(
              String(i.statNumber).replace(/[^0-9]/g, "") || "0",
              10
            );
            const value = useCountUp(isNaN(numeric) ? 0 : numeric);
            const suffix = /\+$/.test(i.statNumber) ? "+" : "";

            return (
              <motion.div
                key={i.statLabel}
                variants={cardFade}
                whileHover={{ y: -4 }}
                className="card py-10 px-6 bg-white/95 backdrop-blur-sm border shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl font-bold text-brand mb-2">
                  {value.toLocaleString()} {suffix}
                </div>

                <div className="text-muted text-base">
                  {i.statLabel}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom decorative wave */}
      <img
        src="/partners/hero-wave.svg"
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full opacity-70 pointer-events-none select-none"
      />
    </motion.section>
  );
}
