"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sectionFade } from "@/components/motion";

export default function NewsletterBanner() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!endpoint) {
      alert("Form endpoint not configured yet.");
      return;
    }

    const data = new FormData(e.currentTarget);
    setStatus("loading");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        setStatus("ok");
        (e.currentTarget as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.section
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 bg-brand-light relative overflow-hidden"
    >
      {/* background blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="hero-floating hero-blue opacity-[0.10]" />
        <div className="hero-floating hero-green opacity-[0.09]" />
      </div>

      <div className="container relative z-10">
        <div className="rounded-2xl bg-white/95 backdrop-blur-sm border p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="max-w-md">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              Stay in the loop
            </h3>
            <p className="text-muted text-sm mt-1">
              Get updates about programs, workshops, events, and new resources.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full md:w-auto gap-3"
          >
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.25 }}
              name="email"
              type="email"
              required
              placeholder="Your email"
              className="w-full md:w-80 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-brand"
              disabled={status === "loading"}
            />

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary disabled:opacity-60"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "Subscribe"}
            </motion.button>
          </form>
        </div>

        {/* Feedback text */}
        <p className="text-center text-sm mt-3 text-gray-600 min-h-[22px]">
          {status === "ok" && (
            <span className="text-green-600 font-medium">
              Thanks! Please check your inbox for confirmation.
            </span>
          )}

          {status === "error" && (
            <span className="text-red-600 font-medium">
              Something went wrong. Please try again.
            </span>
          )}
        </p>
      </div>

      {/* bottom wave */}
      <img
        src="/partners/hero-wave.svg"
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full opacity-70 pointer-events-none select-none"
      />
    </motion.section>
  );
}
