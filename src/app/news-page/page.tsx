"use client";

import { motion } from "framer-motion";
import { CalendarDays, Globe2, Mail, Newspaper } from "lucide-react";
import { FEATURED_RELEASE, PRESS_EMAIL, RELEASES } from "@/data/news";
import { CtaBand } from "@/components/PageBits";
import { EASE, Reveal, SectionTag } from "@/components/ui";

export default function NewsPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative pb-14 pt-36 sm:pt-40">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_50%_at_50%_0%,black,transparent)]" />
        <div className="glow-volt pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTag index="◆" label="Press & media" />
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[0.98] tracking-tight text-fg sm:text-6xl"
          >
            Press{" "}
            <span className="font-serifit font-normal italic text-acc">
              Releases.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-5 max-w-xl text-base leading-relaxed text-fg/60 sm:text-lg"
          >
            Official announcements from Budgetree Technology Pvt. Ltd. on
            product launches, industry programs, and company updates.
          </motion.p>
        </div>
      </section>

      {/* Featured release */}
      <section className="pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-fg/45">
              Featured release
            </p>
            <article className="group mt-4 grid overflow-hidden rounded-[2rem] border border-line/10 bg-raise transition hover:border-acc/40 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[260px] overflow-hidden">
                <img
                  src={FEATURED_RELEASE.image}
                  alt={FEATURED_RELEASE.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coal/40 to-transparent" />
              </div>
              <div className="flex flex-col p-8 sm:p-10">
                <span className="self-start rounded-full bg-volt px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-coal">
                  {FEATURED_RELEASE.tag}
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-fg">
                  {FEATURED_RELEASE.title}
                </h2>
                <p className="mt-4 leading-relaxed text-fg/60">
                  {FEATURED_RELEASE.summary}
                </p>
                <p className="mt-auto flex items-center gap-4 pt-6 text-xs font-semibold text-fg/45">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" /> {FEATURED_RELEASE.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Globe2 className="h-3.5 w-3.5" /> {FEATURED_RELEASE.place}
                  </span>
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* All releases */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-fg/45">
              All press releases
            </p>
          </Reveal>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {RELEASES.map((r, i) => (
              <Reveal key={r.title} delay={(i % 2) * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line/10 bg-raise transition-all duration-300 hover:-translate-y-1.5 hover:border-acc/40">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-coal/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-paper">
                      {r.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="font-display text-xl font-bold leading-snug text-fg">
                      {r.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg/60">
                      {r.summary}
                    </p>
                    <p className="mt-auto flex items-center gap-4 pt-5 text-xs font-semibold text-fg/45">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" /> {r.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Globe2 className="h-3.5 w-3.5" /> {r.place}
                      </span>
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Media inquiries */}
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-line/10 bg-sunken/60 p-7 sm:flex-row sm:items-center sm:p-8">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-volt text-coal shadow-glow">
                  <Newspaper className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-fg">
                    Media inquiries
                  </h3>
                  <p className="mt-1 max-w-xl text-sm text-fg/60">
                    For press kits, interviews, or partnership announcements,
                    reach our team.
                  </p>
                </div>
              </div>
              <a
                href={`mailto:${PRESS_EMAIL}`}
                className="flex shrink-0 items-center gap-2 rounded-full border border-line/20 px-6 py-3.5 font-display text-sm font-bold text-fg transition hover:border-acc/60 hover:bg-line/5"
              >
                <Mail className="h-4 w-4 text-acc" /> Contact press team
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
