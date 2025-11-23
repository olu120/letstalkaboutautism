"use client";

import { motion } from "framer-motion";

type Value = {
  valueTitle?: string | null;
  valueDescription?: string | null;
  valueImage?: { sourceUrl?: string | null; altText?: string | null } | null;
};

export default function CoreValues({ items = [] as Value[] }) {
  return (
    <section className="py-16 bg-white bg-soft-blobs">
      <div className="container">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Our Core Values
        </h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid md:grid-cols-4 gap-6"
        >
          {items.map((v, idx) => (
            <motion.article
              key={`${v.valueTitle}-${idx}`}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="card p-6 text-left hover:shadow-md transition-shadow"
            >
              {v.valueImage?.sourceUrl && (
                <div className="mb-4 h-14 w-14 rounded-xl overflow-hidden border bg-white">
                  <img
                    src={v.valueImage.sourceUrl}
                    alt={v.valueImage.altText || v.valueTitle || "Value image"}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <h3 className="text-lg font-semibold">{v.valueTitle}</h3>
              <p className="text-muted mt-2">{v.valueDescription}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
