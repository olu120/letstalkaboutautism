"use client";

import { motion } from "framer-motion";
import {
  HeartHandshake,
  Users,
  GraduationCap
} from "lucide-react";

import {
  sectionFade,
  cardFade,
  staggerGrid
} from "@/components/motion";

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
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Soft background pattern */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="hero-floating hero-blue opacity-[0.12]" />
        <div className="hero-floating hero-green opacity-[0.10]" />
      </div>

      <div className="container relative z-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-gray-900">
          Programs & Services
        </h2>

        {/* Cards Grid */}
        <motion.div
          variants={staggerGrid}
          className="grid md:grid-cols-3 gap-8"
        >
          {items.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={cardFade}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="card bg-white/95 backdrop-blur-sm border rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow relative"
            >
              {/* Icon */}
              <div className="h-14 w-14 rounded-xl bg-brand-light flex items-center justify-center mb-5 shadow-sm border">
                <Icon className="h-7 w-7 text-brand" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {title}
              </h3>

              {/* Description */}
              <p className="text-muted leading-relaxed">
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Bottom Wave */}
      <img
        src="/partners/hero-wave.svg"
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full opacity-70 pointer-events-none select-none"
      />
    </motion.section>
  );
}
