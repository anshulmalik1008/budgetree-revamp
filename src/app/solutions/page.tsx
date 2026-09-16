"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  Quote,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SOLUTIONS } from "@/data/solutions";
import { CtaBand } from "@/components/PageBits";
import { EASE, Magnetic, Reveal, SectionTag, cn } from "@/components/ui";

const QUOTES = [
  {
    quote:
      "Budgetree made our employee appreciation program effortless. The gifting options are fantastic, and the platform is super user-friendly.",
    name: "Anita P.",
    role: "Operations Manager",
  },
  {
    quote:
      "Real-time payouts and clear reporting gave our leadership confidence to scale incentives across regions.",
    name: "Priya K.",
    role: "Finance Director",
  },
];

export default function SolutionsPage() {
  const [active, setActive] = useState(SOLUTIONS[0].id);

  // Read ?tab= once on mount (matches the live site's deep links)
  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab && SOLUTIONS.some((s) => s.id === tab)) setActive(tab);
  }, []);

  const sol = SOLUTIONS.find((s) => s.id === active) ?? SOLUTIONS[0];

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative pb-14 pt-36 sm:pt-40">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_50%_at_50%_0%,black,transparent)]" />
        <div className="glow-volt pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTag index="◆" label="Solutions" />
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[0.98] tracking-tight text-fg sm:text-6xl"
          >
            Driving business impact across{" "}
            <span className="font-serifit font-normal italic text-acc">
              every industry.
            </span>
          </motion.h1>
          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-6 flex max-w-2xl flex-wrap gap-x-7 gap-y-2"
          >
            {[
              "Payouts, rewards & loyalty in one suite",
              "UPI incentives & engagement automation",
              "Built for every industry & team size",
            ].map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm font-medium text-fg/70">
                <BadgeCheck className="h-4 w-4 shrink-0 text-jade" /> {b}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Industry tabs */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-fg/45">
              Select industry
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {SOLUTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "relative rounded-full px-5 py-2.5 font-display text-sm font-bold transition-colors",
                    active === s.id ? "text-coal" : "text-fg/60 hover:text-fg"
                  )}
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="industry-pill"
                      className="absolute inset-0 rounded-full bg-volt"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{s.label}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Panel */}
          <div className="mt-8 min-h-[480px] overflow-hidden rounded-[2rem] border border-line/10 bg-sunken/40 p-7 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-2 rounded-full bg-volt px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-coal">
                      <sol.icon className="h-4 w-4" /> {sol.label}
                    </span>
                    <h2 className="mt-4 font-display text-3xl font-bold text-fg sm:text-4xl">
                      {sol.intro}
                    </h2>
                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                      {sol.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm font-medium text-fg/70">
                          <BadgeCheck className="h-4 w-4 shrink-0 text-jade" /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-3xl border border-line/10 bg-line/[0.04] p-6 text-center">
                    <p className="font-display text-4xl font-bold text-acc">{sol.stat.value}</p>
                    <p className="mt-1 max-w-[140px] text-xs font-semibold text-fg/55">
                      {sol.stat.label}
                    </p>
                  </div>
                </div>

                <div className="mt-10 grid gap-10 lg:grid-cols-2">
                  {/* Challenges */}
                  <div>
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-fg/45">
                      <CircleAlert className="h-4 w-4 text-honey" />
                      Key engagement challenges
                    </p>
                    <div className="mt-4 space-y-3">
                      {sol.challenges.map((c, i) => (
                        <motion.div
                          key={c.title}
                          initial={{ opacity: 0, x: -14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: EASE }}
                          className="flex items-start gap-4 rounded-2xl border border-line/10 bg-base/60 p-4"
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-honey/15 text-honey">
                            <CircleAlert className="h-5 w-5" />
                          </span>
                          <span>
                            <span className="block font-display text-sm font-bold text-fg">
                              {c.title}
                            </span>
                            <span className="block text-sm text-fg/60">{c.desc}</span>
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  {/* How */}
                  <div>
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-fg/45">
                      <Sparkles className="h-4 w-4 text-acc" />
                      How BudgeTree makes it effortless
                    </p>
                    <div className="mt-4 space-y-3">
                      {sol.how.map((h, i) => (
                        <motion.div
                          key={h.title}
                          initial={{ opacity: 0, x: 14 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: EASE }}
                          className="flex items-start gap-4 rounded-2xl border border-acc/20 bg-acc/5 p-4"
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-volt text-coal shadow-glow">
                            <Sparkles className="h-5 w-5" />
                          </span>
                          <span>
                            <span className="block font-display text-sm font-bold text-fg">
                              {h.title}
                            </span>
                            <span className="block text-sm text-fg/60">{h.desc}</span>
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    <Magnetic className="mt-6">
                      <a
                        href="/demo"
                        className="group inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3.5 font-display text-sm font-bold text-coal shadow-glow transition hover:bg-paper"
                      >
                        Book a free demo
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section className="border-t border-line/10 bg-raise/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold text-fg sm:text-4xl">
              What our customers{" "}
              <span className="font-serifit font-normal italic text-acc">say.</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {QUOTES.map((q, i) => (
              <Reveal key={q.name} delay={i * 0.1}>
                <figure className="h-full rounded-3xl border border-line/10 bg-base p-7">
                  <Quote className="h-8 w-8 fill-volt text-volt" />
                  <blockquote className="mt-4 font-serifit text-xl italic leading-snug text-fg/85">
                    “{q.quote}”
                  </blockquote>
                  <figcaption className="mt-5 font-display text-sm font-bold text-fg">
                    {q.name} <span className="font-body text-sm font-medium text-fg/50">· {q.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
