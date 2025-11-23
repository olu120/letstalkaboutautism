"use client";

import { motion } from "framer-motion";

type Media = { sourceUrl?: string | null; altText?: string | null } | null;

export default function AboutHero({
  heading,
  subheading,
  body,
  image,
}: {
  heading?: string | null;
  subheading?: string | null;
  body?: string | null;
  image?: Media;
}) {
  return (
    <section className="bg-white">
      <div className="container max-w-6xl mx-auto py-20 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
              {heading || "About Let’s Talk About Autism"}
            </h1>
            {subheading && (
              <p className="mt-4 text-lg text-gray-600 max-w-xl">
                {subheading}
              </p>
            )}
            {body && (
              <div
                className="prose prose-lg mt-6 text-gray-700 max-w-none"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            )}
          </motion.div>

          {image?.sourceUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-md border bg-gray-50 h-[320px] md:h-[420px]"
            >
              <img
                src={image.sourceUrl}
                alt={image.altText || "About hero"}
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
