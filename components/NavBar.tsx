"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  // Close mobile menu on route change
useEffect(() => {
  queueMicrotask(() => setOpen(false));
}, [pathname]);


  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm"
      >
        <nav className="container flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <img
              src="/logo-romi.png"
              alt="Let’s Talk About Autism"
              className="h-10 md:h-11 w-auto object-contain shrink-0 logo-shadow"
            />
            <span className="font-semibold text-gray-900 text-base md:text-lg truncate">
              Let’s Talk About Autism
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`hover:text-brand transition ${
                    pathname === l.href
                      ? "text-brand font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Donate */}
          <button
            onClick={() => setDonateOpen(true)}
            className="hidden md:inline-flex btn btn-primary"
          >
            Donate Now
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border bg-white hover:bg-gray-50"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile Panel */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t bg-white"
            >
              <ul className="container py-4 flex flex-col gap-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`block px-3 py-2 rounded-lg text-sm transition ${
                        pathname === l.href
                          ? "bg-brand-light text-brand font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}

                {/* Mobile Donate */}
                <button
                  onClick={() => {
                    setDonateOpen(true);
                    setOpen(false);
                  }}
                  className="mt-2 btn btn-primary w-full"
                >
                  Donate Now
                </button>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Donate Modal */}
      <AnimatePresence>
        {donateOpen && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/40 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDonateOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-2xl border shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Donate to Let’s Talk About Autism
                </h3>
                <button
                  onClick={() => setDonateOpen(false)}
                  className="h-9 w-9 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                  aria-label="Close donate popup"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-muted mt-3 text-sm leading-relaxed">
                Thank you for supporting autistic individuals and their families.
                For now, donations are handled directly through our team.
              </p>

              <div className="mt-4 space-y-3 text-sm text-gray-800">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  <a href="mailto:info@letstalkaboutautism.org" className="text-brand hover:underline">
                    info@letstalkaboutautism.org
                  </a>
                </p>
                <p>
                  <span className="font-medium">Phone / WhatsApp:</span>{" "}
                  <a href="tel:+256000000000" className="text-brand hover:underline">
                    +256 000 000 000
                  </a>
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setDonateOpen(false)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
