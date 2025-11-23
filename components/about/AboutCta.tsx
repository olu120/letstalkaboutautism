"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutCta({
  text,
  buttonText,
  buttonLink,
}: {
  text?: string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
}) {
  if (!text) return null;

  return (
    <section className="py-12 bg-brand-light">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-white border p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-lg md:text-xl font-medium text-gray-900">
            {text}
          </p>

          {buttonText && buttonLink && (
            <Link href={buttonLink} className="btn btn-primary">
              {buttonText}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
