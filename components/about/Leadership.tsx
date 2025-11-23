"use client";

import { motion } from "framer-motion";

type Person = {
  name?: string | null;
  role?: string | null;
  bio?: string | null;
  photo?: { sourceUrl?: string | null; altText?: string | null } | null;
};

export default function Leadership({ items = [] as Person[] }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Meet the Leadership
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {items.map((p, idx) => (
            <motion.article
              key={`${p.name}-${idx}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="card p-5 text-center"
            >
              {p.photo?.sourceUrl && (
                <div className="mx-auto h-28 w-28 rounded-full overflow-hidden border mb-4">
                  <img
                    src={p.photo.sourceUrl}
                    alt={p.photo.altText || p.name || "Leader"}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <h3 className="font-semibold text-gray-900">{p.name}</h3>
              <p className="text-sm text-brand font-medium">{p.role}</p>
              {p.bio && <p className="text-muted text-sm mt-2">{p.bio}</p>}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
