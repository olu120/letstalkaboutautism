"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, HeartHandshake } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-gray-900 min-w-0"
            onClick={closeMenu}
          >
            <Image
              src="/logo-romi.png"   // <-- change if your file name differs
              alt="Let’s Talk About Autism logo"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
            <span className="text-base sm:text-lg truncate">
              Let’s Talk About Autism
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-brand transition"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Donate button (desktop + mobile small) */}
            <button
              onClick={() => setDonateOpen(true)}
              className="
                inline-flex items-center gap-2 rounded-xl bg-brand text-white font-semibold
                px-3 py-2 text-sm shadow-sm hover:bg-brand/90 transition
                md:px-5 md:py-2 md:text-base whitespace-nowrap
              "
            >
              <HeartHandshake className="h-4 w-4 md:h-5 md:w-5" />
              <span className="hidden sm:inline">Donate Now</span>
              <span className="sm:hidden">Donate</span>
            </button>

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center rounded-xl border bg-white p-2"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div className="md:hidden border-t bg-white">
            <nav className="container max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3 text-gray-800 font-medium">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className="py-2 px-2 rounded-lg hover:bg-gray-50 transition"
                >
                  {l.label}
                </Link>
              ))}

              {/* Donate inside menu too */}
              <button
                onClick={() => {
                  closeMenu();
                  setDonateOpen(true);
                }}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand text-white font-semibold px-4 py-3"
              >
                <HeartHandshake className="h-5 w-5" />
                Donate Now
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Donate Popup / Modal */}
      {donateOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setDonateOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Donate to Let’s Talk About Autism
              </h3>
              <button
                onClick={() => setDonateOpen(false)}
                className="rounded-md p-1 hover:bg-gray-100"
                aria-label="Close donate popup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Thanks for supporting our work. For now, donations are arranged
              directly. Please reach out using the details below and our team will guide you.
            </p>

            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-xl border bg-gray-50 p-3">
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-gray-700">info@letstalkaboutautism.org</p>
              </div>

              <div className="rounded-xl border bg-gray-50 p-3">
                <p className="font-medium text-gray-900">Phone / WhatsApp</p>
                <p className="text-gray-700">+34666626498</p>
              </div>

              <div className="rounded-xl border bg-gray-50 p-3">
                <p className="font-medium text-gray-900">Office</p>
                <p className="text-gray-700">
                  Address (exact address shared on request)
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <Link
                href="/contact"
                onClick={() => setDonateOpen(false)}
                className="btn btn-primary w-full text-center"
              >
                Contact Us
              </Link>

              <button
                onClick={() => setDonateOpen(false)}
                className="btn btn-secondary w-full"
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
