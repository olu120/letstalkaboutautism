"use client";

import { useEffect, useMemo, useState } from "react";

function targetDate(): Date {
  const envDate = process.env.NEXT_PUBLIC_LAUNCH_DATE;
  if (envDate) {
    const d = new Date(envDate);
    if (!isNaN(d as any)) return d;
  }
  // fallback = 60 days from now
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return d;
}

function useCountdown(to: Date) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, to.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, done: diff <= 0 };
}

export default function ComingSoon() {
  const to = useMemo(() => targetDate(), []);
  const { days, hours, minutes, seconds, done } = useCountdown(to);

  const socials = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "WhatsApp", href: "https://wa.me/" },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-6">
      <section className="w-full max-w-3xl text-center">
        <div className="mx-auto mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-sm">
          <img
            src="/ComingSoon.jpg"
            alt="Let’s Talk About Autism — Coming Soon"
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          Let’s Talk About Autism
        </h1>
        <p className="mt-3 text-base md:text-lg text-gray-600">
          We’re preparing resources, guidance, and community support.
        </p>

        <div className="mt-8 grid grid-cols-4 gap-3 md:gap-4">
          {done ? (
            <span className="col-span-4 text-lg font-medium">We’re live!</span>
          ) : (
            [
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Minutes", value: minutes },
              { label: "Seconds", value: seconds },
            ].map((t) => (
              <div
                key={t.label}
                className="rounded-2xl border p-4 md:p-6"
              >
                <div className="text-3xl md:text-4xl font-bold tabular-nums">
                  {String(t.value).padStart(2, "0")}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wide text-gray-500">
                  {t.label}
                </div>
              </div>
            ))
          )}
        </div>

        <form
          className="mt-10 flex flex-col sm:flex-row items-stretch gap-3 justify-center"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks! We’ll keep you posted.");
          }}
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Your email address"
            className="w-full sm:w-80 rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="rounded-xl border border-black bg-black px-5 py-3 font-medium text-white active:translate-y-px"
          >
            Notify me
          </button>
        </form>

        <nav
          aria-label="Social links"
          className="mt-8 flex items-center justify-center gap-5 text-sm text-gray-600"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="underline-offset-4 hover:underline"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <footer className="mt-10 text-xs text-gray-500">
          © {new Date().getFullYear()} Let’s Talk About Autism
        </footer>
      </section>
    </main>
  );
}
