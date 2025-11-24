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
        e.currentTarget.reset();
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
      className="py-16 bg-white"   // ✅ clean & consistent
    >
      <div className="container max-w-6xl mx-auto">
        <div className="rounded-2xl bg-gray-50 border p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          {/* Text */}
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              Stay in the loop
            </h3>
            <p className="text-muted text-sm mt-1 leading-relaxed">
              Get updates about programs, workshops, events, and new resources.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full md:w-auto gap-3"
          >
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              name="email"
              type="email"
              required
              placeholder="Your email"
              className="w-full md:w-80 rounded-xl border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-brand"
              disabled={status === "loading"}
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary disabled:opacity-60 whitespace-nowrap"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "Subscribe"}
            </motion.button>
          </form>
        </div>

        {/* Feedback */}
        <p className="text-center text-sm mt-3 min-h-[22px]">
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
    </motion.section>
  );
}
