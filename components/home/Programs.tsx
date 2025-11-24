"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Users, GraduationCap } from "lucide-react";
import { sectionFade, cardFade, staggerGrid } from "@/components/motion";

const items = [
  {
    icon: HeartHandshake,
    title: "Therapy Support",
    text: "Guidance to access evidence-informed therapy and coordinate care with providers.",
  },
  {
    icon: GraduationCap,
    title: "Parent Training",
    text: "Workshops and practical tools for families and caregivers at home and school.",
  },
  {
    icon: Users,
    title: "Community Outreach",
    text: "Inclusive events and peer support spaces for families and self-advocates.",
  },
];

export default function Programs() {
  return (
    <motion.section
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="py-16 bg-white"  // ✅ clean like other pages
    >
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-900">
          Programs & Services
        </h2>

        <motion.div
          variants={staggerGrid}
          className="grid md:grid-cols-3 gap-6"
        >
          {items.map(({ icon: Icon, title, text }) => (
            <motion.article
              key={title}
              variants={cardFade}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="card bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-xl bg-brand-light flex items-center justify-center mb-4 border">
                <Icon className="h-6 w-6 text-brand" />
              </div>

              <h3 className="text-lg font-medium text-gray-900">
                {title}
              </h3>

              <p className="text-muted mt-2 leading-relaxed">
                {text}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
