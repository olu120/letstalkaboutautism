"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ContactPageContent } from "@/lib/api/wordpress";

export default function Contact({ content }: { content: ContactPageContent }) {
  const {
    heroEyebrow,
    heroHeading,
    herobody,
    herochips,

    formHeading,
    formbody,
    identityoptions,
    topicoptions,

    contactEmail,
    contactPhone,
    contactaddress,
    bestWaysHeading,
    bestwaysbody,
    contactbuttons,

    emergencyHeading,
    emergencybody,
    emergencyLinkText,
    emergencylinkurl,

    spaceHeading,
    spacebody,
    openinghours,
    accessibility,

    mapimage,
    mapCaption,

    quickquestions,

    ctaBarText,
    ctaBarButtonText,
    ctabarbuttonlink,
  } = content;

  const fallbackIdentity = [
    { label: "Family member / caregiver" },
    { label: "Autistic adult" },
    { label: "Educator / school staff" },
    { label: "Health professional" },
    { label: "Volunteer / supporter" },
    { label: "Other" },
  ];

  const fallbackTopics = [
    { label: "General question" },
    { label: "Programs & events" },
    { label: "Resources / guides" },
    { label: "School inclusion / training" },
    { label: "Volunteering" },
    { label: "Partnerships / collaboration" },
    { label: "Donations / fundraising" },
    { label: "Other" },
  ];

  const identities = identityoptions?.length ? identityoptions : fallbackIdentity;
  const topics = topicoptions?.length ? topicoptions : fallbackTopics;

  // Form endpoint (same pattern as NewsletterBanner)
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  const [status, setStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!endpoint) {
      alert("Form endpoint not configured yet.");
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const mapSrc = mapimage?.node?.sourceUrl || null;
  const mapAlt = mapimage?.node?.altText || "Map";

  const faqs = quickquestions ?? [];

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl border bg-gray-50 p-8 md:p-12">
            <div className="absolute inset-0 bg-soft-blobs pointer-events-none" />
            <p className="text-sm text-gray-500 mb-3">
              {heroEyebrow || "Contact"}
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 max-w-3xl">
              {heroHeading ||
                "Contact our team for support, questions, or collaboration"}
            </h1>
            {herobody && (
              <p className="mt-4 text-muted max-w-3xl leading-relaxed">
                {herobody}
              </p>
            )}

            {(herochips?.length ?? 0) > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {herochips!.map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full bg-white border px-3 py-1 text-xs text-gray-700 shadow-sm"
                  >
                    {c.chipText}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FORM + CONTACT DETAILS */}
      <section className="py-16 bg-white bg-subtle-grid">
        <div className="container max-w-6xl grid md:grid-cols-2 gap-6">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="card p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900">
              {formHeading || "Send us a message"}
            </h2>
            {formbody && <p className="text-muted mt-2">{formbody}</p>}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand"
                  disabled={status === "loading"}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand"
                  disabled={status === "loading"}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <select
                  name="identity"
                  className="w-full rounded-xl border px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-brand"
                  disabled={status === "loading"}
                  defaultValue=""
                >
                  <option value="" disabled>
                    I am a...
                  </option>
                  {identities.map((o, i) => (
                    <option key={i} value={o.label || ""}>
                      {o.label}
                    </option>
                  ))}
                </select>

                <select
                  name="topic"
                  className="w-full rounded-xl border px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-brand"
                  disabled={status === "loading"}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Topic
                  </option>
                  {topics.map((o, i) => (
                    <option key={i} value={o.label || ""}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <textarea
                name="message"
                required
                rows={6}
                placeholder="How can we help?"
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand"
                disabled={status === "loading"}
              />

              <button
                className="btn btn-primary w-full md:w-auto px-6 py-3"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send message"}
              </button>

              {status === "ok" && (
                <p className="text-sm text-green-700">
                  Thanks! Your message has been sent.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="card p-6 md:p-8 space-y-5"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Contact details
              </h3>
              <p className="text-muted mt-2 text-sm">
                {bestwaysbody ||
                  "Email is usually the fastest way to reach us."}
              </p>
            </div>

            <div className="text-sm text-gray-700 space-y-2">
              {contactEmail && (
                <p>
                  <strong>Email:</strong> {contactEmail}
                </p>
              )}
              {contactPhone && (
                <p>
                  <strong>Phone:</strong> {contactPhone}
                </p>
              )}
              {contactaddress && (
                <p>
                  <strong>Address:</strong> {contactaddress}
                </p>
              )}
            </div>

            {bestWaysHeading && (
              <div>
                <h4 className="font-semibold text-gray-900">
                  {bestWaysHeading}
                </h4>
                {bestwaysbody && (
                  <p className="text-sm text-muted mt-1">
                    {bestwaysbody}
                  </p>
                )}
              </div>
            )}

            {(contactbuttons?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {contactbuttons!.map((b, i) => (
                  <a
                    key={i}
                    href={b.link || "#"}
                    className="btn btn-tertiary"
                  >
                    {b.label}
                  </a>
                ))}
              </div>
            )}
          </motion.aside>
        </div>
      </section>

      {/* EMERGENCY */}
      {(emergencyHeading || emergencybody) && (
        <section className="py-12 bg-white">
          <div className="container max-w-6xl">
            <div className="card p-6 md:p-8 border-l-4 border-accent">
              <h3 className="text-xl font-semibold text-gray-900">
                {emergencyHeading || "Emergency and crisis support"}
              </h3>
              {emergencybody && (
                <p className="text-muted mt-2">{emergencybody}</p>
              )}
              {emergencyLinkText && emergencylinkurl && (
                <a
                  href={emergencylinkurl}
                  className="mt-4 inline-block text-accent font-medium hover:underline"
                >
                  {emergencyLinkText} →
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* COMMUNITY SPACE + MAP */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-6xl grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="card p-6 md:p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900">
              {spaceHeading || "Visit our community space"}
            </h3>
            {spacebody && (
              <p className="text-muted mt-2">{spacebody}</p>
            )}

            {(openinghours?.length ?? 0) > 0 && (
              <div className="mt-5">
                <h4 className="font-semibold text-gray-900">
                  Opening hours
                </h4>
                <ul className="mt-2 text-sm text-gray-700 space-y-1">
                  {openinghours!.map((h, i) => (
                    <li key={i}>• {h.label}</li>
                  ))}
                </ul>
              </div>
            )}

            {(accessibility?.length ?? 0) > 0 && (
              <div className="mt-5">
                <h4 className="font-semibold text-gray-900">
                  Accessibility
                </h4>
                <ul className="mt-2 text-sm text-gray-700 space-y-1">
                  {accessibility!.map((a, i) => (
                    <li key={i}>• {a.label}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="card overflow-hidden"
          >
            {mapSrc ? (
              <img
                src={mapSrc}
                alt={mapAlt}
                className="h-64 md:h-full w-full object-cover"
              />
            ) : (
              <div className="h-64 md:h-full w-full bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                Map placeholder
              </div>
            )}
            {mapCaption && (
              <p className="p-4 text-sm text-muted">{mapCaption}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* QUICK QUESTIONS */}
      {(faqs.length ?? 0) > 0 && (
        <section className="py-16 bg-white">
          <div className="container max-w-4xl">
            <h3 className="text-2xl font-semibold text-gray-900 text-center">
              Quick questions
            </h3>

            <div className="mt-8 space-y-3">
              {faqs.map((f, i) => (
                <details
                  key={i}
                  className="card p-5 group"
                >
                  <summary className="cursor-pointer font-medium text-gray-900 flex justify-between items-center">
                    {f.question}
                    <span className="text-gray-400 group-open:rotate-180 transition">
                      ↓
                    </span>
                  </summary>
                  {f.answer && (
                    <p className="text-muted mt-2 text-sm leading-relaxed">
                      {f.answer}
                    </p>
                  )}
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA BAR */}
      {(ctaBarText || ctaBarButtonText) && (
        <section className="py-10 bg-secondary-light">
          <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-900 font-medium text-lg">
              {ctaBarText}
            </p>
            {ctaBarButtonText && ctabarbuttonlink && (
              <a
                href={ctabarbuttonlink}
                className="btn btn-primary px-6 py-3 whitespace-nowrap rounded-xl text-center leading-snug"
              >
                {ctaBarButtonText}
              </a>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
