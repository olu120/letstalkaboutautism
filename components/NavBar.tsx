"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function NavBar() {
  const [donateOpen, setDonateOpen] = useState(false);

  // close on ESC
  useEffect(() => {
    if (!donateOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDonateOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [donateOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2">
  <Image
    src="/logo-romi.png"     // << your logo file inside /public (change name if different)
    alt="Let's Talk About Autism Logo"
    width={40}          // adjust size as needed
    height={40}
    className="object-contain"
    priority            // ensures navbar logo loads instantly
  />
  <span className="font-semibold text-gray-900 text-lg">
    Let’s Talk About Autism
  </span>
</Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-gray-900 transition"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Donate button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDonateOpen(true)}
              className="btn btn-primary"
              type="button"
            >
              Donate Now
            </button>
          </div>
        </div>
      </header>

      {/* Donate Modal */}
      {donateOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center px-4"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setDonateOpen(false)}
            aria-label="Close donate dialog"
            type="button"
          />

          {/* Modal card */}
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl border p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                Support Let’s Talk About Autism
              </h2>

              <button
                onClick={() => setDonateOpen(false)}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Close"
                type="button"
              >
                ✕
              </button>
            </div>

            <p className="mt-3 text-gray-600 leading-relaxed">
              Thank you for your willingness to support our work.  
              We’re currently accepting donations directly through our team.
              Please reach out using any of the contacts below and we’ll guide you.
            </p>

            <div className="mt-5 space-y-3 text-sm text-gray-800">
              <div className="rounded-xl bg-gray-50 border p-4">
                <p className="font-medium">Email</p>
                <p className="text-gray-700">info@letstalkaboutautism.org</p>
              </div>

              <div className="rounded-xl bg-gray-50 border p-4">
                <p className="font-medium">Phone / WhatsApp</p>
                <p className="text-gray-700">+34666626498</p>
              </div>

              <div className="rounded-xl bg-gray-50 border p-4">
                <p className="font-medium">Office Address</p>
                <p className="text-gray-700">
                  Address <br />
                  (Add full address when ready)
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                onClick={() => setDonateOpen(false)}
                className="btn btn-secondary"
              >
                Contact Our Team
              </Link>
              <button
                onClick={() => setDonateOpen(false)}
                className="btn btn-tertiary"
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
