"use client";

import type { ServicesContent } from "@/lib/api/wordpress";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  HeartHandshake,
  Users,
  GraduationCap,
  Baby,
  School,
  UserSquare2,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

type OfferCard = NonNullable<ServicesContent["offerCards"]>[number];
type LifeStageProgram = NonNullable<ServicesContent["lifeStagePrograms"]>[number];
type Faq = NonNullable<ServicesContent["faqs"]>[number];

const iconMap: Record<string, any> = {
  education: GraduationCap,
  family: Users,
  advocacy: HeartHandshake,
  baby: Baby,
  school: School,
  youth: UserSquare2,
  adult: Briefcase,
};

export default function Services({ content }: { content: ServicesContent | null }) {
  const safe = content ?? {};

  const heroHeading = safe.heroHeading ?? "Support for every stage of the autism journey";
  const heroBody = safe.heroBody ?? null;

  const offerHeading = safe.offerHeading ?? "What we offer";
  const offerCards: OfferCard[] = safe.offerCards ?? [];

  const lifeStageHeading = safe.lifeStageHeading ?? "Programs by life stage";
  const lifeStagePrograms: LifeStageProgram[] = safe.lifeStagePrograms ?? [];

  const faqHeading = safe.faqHeading ?? "Frequently asked questions";
  const faqs: Faq[] = safe.faqs ?? [];

  const ctaBody =
    safe.ctaBody ??
    "Not sure which program is right for you? Our team can help you choose the best next step.";
  const ctaButtonText = safe.ctaButtonText ?? "Contact Our Team";
  const ctaButtonLink = safe.ctaButtonLink ?? "/contact";

  return (
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="pt-20 pb-16 bg-soft-blobs">
        <div className="container max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white border shadow-md px-8 py-14"
          >
            <p className="text-sm text-gray-500 mb-2">Services & Programs</p>

            <h1 className="text-4xl md:text-5xl font-semibold max-w-3xl leading-tight">
              {heroHeading}
            </h1>

            {heroBody && (
              <p className="mt-5 text-gray-600 max-w-3xl leading-relaxed text-lg">
                {heroBody}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold">{offerHeading}</h2>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {(offerCards.length ? offerCards : fallbackOfferCards).map((card) => {
              const Icon = iconMap[card.icon || "education"] || GraduationCap;

              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45 }}
                  className="card p-6 hover:shadow-md transition-shadow"
                >
                  <div className="h-12 w-12 rounded-xl bg-brand-light flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-brand" />
                  </div>

                  <h3 className="text-xl font-medium">{card.title}</h3>

                  {card.body && (
                    <p className="mt-2 text-gray-600">{card.body}</p>
                  )}

                  {!!card.bullets?.length && (
                    <ul className="mt-4 space-y-1 text-gray-500 text-sm list-disc list-inside">
                      {card.bullets.map((b, i) => (
                        <li key={`${card.title}-b-${i}`}>{b}</li>
                      ))}
                    </ul>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROGRAMS BY LIFE STAGE */}
      <section className="py-16 bg-subtle-grid">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold">{lifeStageHeading}</h2>

          <div className="mt-10 space-y-6">
            {(lifeStagePrograms.length ? lifeStagePrograms : fallbackLifeStages).map((p) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45 }}
                className="card p-6 md:p-8"
              >
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {p.stageLabel}
                </p>

                <h3 className="text-xl font-semibold mt-1">{p.title}</h3>

                {p.body && (
                  <p className="mt-2 text-gray-600">{p.body}</p>
                )}

                {!!p.tags?.length && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tags.map((t, i) => (
                      <span
                        key={`${p.title}-tag-${i}`}
                        className="px-3 py-1 rounded-full bg-gray-100 border text-xs text-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-semibold">{faqHeading}</h2>
          </div>

          <div className="space-y-3">
            {(faqs.length ? faqs : fallbackFaqs).map((f, idx) => (
              <FaqItem key={idx} question={f.question} answer={f.answer || ""} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="py-14 bg-brand-light border-t">
        <div className="container flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-lg md:text-xl font-medium text-gray-900 max-w-3xl">
            {ctaBody}
          </p>

          <Link href={ctaButtonLink} className="btn btn-primary whitespace-nowrap">
            {ctaButtonText}
          </Link>
        </div>
      </section>
    </main>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((v) => !v)}
      className="w-full text-left card p-5 hover:shadow-md transition"
      aria-expanded={open}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition ${open ? "rotate-180" : ""}`}
        />
      </div>
      {open && (
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">{answer}</p>
      )}
    </button>
  );
}

/* ---------------- Fallbacks if WP has no content ---------------- */

const fallbackOfferCards: OfferCard[] = [
  {
    title: "Education & Workshops",
    body:
      "Practical sessions for caregivers and teachers focused on communication, routines, and sensory understanding.",
    bullets: [
      "Intro to autism",
      "Inclusive classroom tools",
      "Online learning sessions",
    ],
  },
  {
    title: "Family & Individual Support",
    body:
      "A safe space to talk, share experiences, and receive guidance from trained volunteers and specialists.",
    bullets: ["1:1 conversations", "Parent circles", "Resource planning"],
  },
  {
    title: "Community & Advocacy",
    body:
      "Working together to build environments where autistic people can belong and thrive.",
    bullets: ["School partnerships", "Sensory-friendly events", "Awareness campaigns"],
  },
];

const fallbackLifeStages: LifeStageProgram[] = [
  {
    stageLabel: "Ages 0–6",
    title: "Early Connection Program",
    body:
      "Family-centered coaching that helps caregivers understand early signs and build routines that support communication.",
    tags: ["Play-based", "Family coaching", "Peer support"],
  },
  {
    stageLabel: "School age",
    title: "Inclusive Classroom Support",
    body:
      "Helping schools create sensory-aware, strengths-based classrooms for autistic learners.",
    tags: ["Teacher training", "Classroom tools"],
  },
  {
    stageLabel: "Teens & young adults",
    title: "Life Skills & Advocacy Circles",
    body:
      "Spaces where autistic teens and young adults practice everyday independence and communication skills.",
    tags: ["Peer-led", "Hybrid"],
  },
];

const fallbackFaqs: Faq[] = [
  {
    question: "Are your services free?",
    answer:
      "Many of our programs are free or low-cost, with additional support for families who need it.",
  },
  {
    question: "Do I need a diagnosis to participate?",
    answer:
      "No — families and individuals at any stage are welcome, even before diagnosis.",
  },
  {
    question: "Do you offer online programs?",
    answer:
      "Yes. We offer both online and in-person programs depending on your needs.",
  },
];
