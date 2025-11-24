"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const sitemap = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-10 text-sm relative overflow-hidden">
      {/* subtle top glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent"
      />

      <div className="container grid gap-10 md:grid-cols-3">
        {/* Brand + summary */}
        <div>
          <img
            src="/logo-romi.png"
            alt="Let’s Talk About Autism"
            className="h-14 md:h-16 w-auto object-contain logo-shadow mb-4"
          />
          <p className="leading-relaxed text-gray-300/90 max-w-sm">
            We support autistic people and their families through education,
            advocacy, and community programs that foster inclusion and dignity.
          </p>

          {/* Socials */}
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4 text-gray-200" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4 text-gray-200" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 text-gray-200" />
            </a>
          </div>
        </div>

        {/* Sitemap */}
        <div>
          <h4 className="font-semibold mb-3 text-white text-base">Sitemap</h4>
          <ul className="space-y-2">
            {sitemap.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-white transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-3 text-white text-base">Contact</h4>
          <div className="space-y-3 text-gray-300/90">
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-secondary" />
              <a href="mailto:info@letstalkaboutautism.org" className="hover:text-white transition">
                info@letstalkaboutautism.org
              </a>
            </p>

            {/* replace with your real phone when ready */}
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-secondary" />
              <a href="tel:+15551234567" className="hover:text-white transition">
                +34666626498
              </a>
            </p>

            {/* replace with your real address when ready */}
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-secondary" />
              123 Community Ave, Suite 100
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mt-10 pt-6 border-t border-white/10 text-center text-gray-500">
        © {new Date().getFullYear()} Let’s Talk About Autism. All rights reserved.
      </div>
    </footer>
  );
}
