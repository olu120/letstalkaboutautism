"use client";

import { motion } from "framer-motion";

type Item = {
  year?: string | null;
  title?: string | null;
  description?: string | null;
};

export default function JourneyTimeline({ items = [] as Item[] }) {
  return (
    <section className="py-16 bg-gray-50 bg-subtle-grid">
      <div className="container max-w-5xl">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Our Journey So Far
        </h2>

        <div className="space-y-6">
          {items.map((i, idx) => (
            <motion.div
              key={`${i.year}-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="card p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8"
            >
              <div className="text-brand font-bold text-2xl md:w-24 shrink-0">
                {i.year}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {i.title}
                </h3>
                <p className="text-muted mt-2">{i.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
