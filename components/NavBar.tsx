"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm"
    >
      <nav className="container flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <img
            src="/logo-romi.png"
            alt="Let’s Talk About Autism"
            className="h-10 md:h-11 w-auto object-contain logo-shadow shrink-0"
          />
          <span className="font-semibold text-gray-900 text-base md:text-lg truncate">
            Let’s Talk About Autism
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <motion.li key={l.href} whileHover={{ y: -2 }}>
              <Link
                href={l.href}
                className={`transition ${
                  pathname === l.href
                    ? "text-brand font-semibold"
                    : "text-gray-700 hover:text-brand"
                }`}
              >
                {l.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Donate button (Desktop) */}
        <motion.div whileHover={{ scale: 1.04 }} className="hidden md:inline-flex">
          <Link href="/donate" className="btn btn-primary">
            Donate Now
          </Link>
        </motion.div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-gray-800"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-lg border-b shadow-lg z-40"
          >
            {/* Background blobs */}
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="hero-floating hero-blue opacity-[0.08]" />
              <div className="hero-floating hero-green opacity-[0.06]" />
            </div>

            <ul className="relative z-10 flex flex-col px-6 py-6 gap-4 text-base">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`py-2 transition ${
                    pathname === l.href
                      ? "text-brand font-semibold"
                      : "text-gray-700 hover:text-brand"
                  }`}
                >
                  {l.label}
                </Link>
              ))}

              {/* Mobile donate button */}
              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="btn btn-primary mt-2"
              >
                Donate Now
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
