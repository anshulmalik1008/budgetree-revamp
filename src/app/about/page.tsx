"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Compass,
  Gauge,
  HeartHandshake,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { CtaBand } from "@/components/PageBits";
import { CountUp, EASE, Magnetic, Reveal, SectionTag, cn } from "@/components/ui";

const BULLETS = [
  "Connect customers, partners & employees",
  "Launch loyalty programs in days",
  "Automate secure payouts at scale",
  "Drive engagement with measurable ROI",
];

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Customer first, always",
    desc: "Every feature starts with a customer problem. If it doesn't move your engagement or ROI, we don't ship it.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance by default",
    desc: "TDS, GST, PAN verification and audit trails come standard — so your team never thinks about them.",
  },
  {
    icon: Gauge,
    title: "Speed with safety",
    desc: "Under-24-hour go-lives and 3-second settlements, on rails hardened for enterprise scale.",
  },
  {
    icon: Compass,
    title: "Measure everything",
    desc: "Rewards are an investment, not a cost. Every rupee ties back to engagement, retention and revenue.",
  },
];

const FAQS = [
  {
    q: "Is there a free trial available?",
    a: "Yes. Book a demo and we'll spin up a sandbox on your own data — you can send real test rewards, explore dashboards and see ROI estimates before paying anything.",
  },
  {
    q: "Who is Budgetree for?",
    a: "B2B and B2C teams of every size — HR, sales, marketing and finance — across BFSI, retail, pharma, auto, FMCG and more. If you reward employees, customers or partners, it's for you.",
  },
  {
    q: "How does Budgetree work?",
    a: "Connect your HRMS, CRM or sheets, pick a template, load funds and launch. Rewards fly out over email, SMS and WhatsApp; UPI cash and payouts settle in seconds; everything reports into one dashboard.",
  },
  {
    q: "Is it paid?",
    a: "The platform runs on a simple fee plus a small per-transaction charge that drops with volume. Recipients never pay anything — claiming rewards is always free.",
  },
  {
    q: "How does my client pay?",
    a: "Recipients receive value as UPI cash, bank transfer or gift cards — they simply tap a link and claim. Your business pays via invoice, UPI, cards or net banking, with GST invoices and TDS handling built in.",
  },
];

const STATS = [
  { end: 250, suffix: "+", label: "Enterprise clients" },
  { end: 45, suffix: "%", label: "Avg. engagement uplift" },
  { end: 10, suffix: "M+", label: "Rewards delivered" },
  { end: 99.99, decimals: 2, suffix: "%", label: "Platform uptime" },
];

export default function AboutPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative pb-20 pt-36 sm:pt-40">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_50%_at_50%_0%,black,transparent)]" />
        <div className="glow-volt pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionTag index="◆" label="About us" />
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="mt-5 font-display text-5xl font-bold leading-[0.98] tracking-tight text-fg sm:text-6xl"
            >
              Seamless rewards.{" "}
              <span className="font-serifit font-normal italic text-acc">
                Effortless payouts.
              </span>{" "}
              That&apos;s BudgeTree.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mt-5 max-w-xl text-base leading-relaxed text-fg/65 sm:text-lg"
            >
              All-in-one rewards and payouts for B2B and B2C teams — built in
              India, trusted worldwide.
            </motion.p>
            <motion.ul
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              className="mt-7 grid max-w-lg gap-3 sm:grid-cols-2"
            >
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm font-medium text-fg/80">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-jade" />
                  {b}
                </li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Magnetic>
                <a
                  href="/demo"
                  className="group flex items-center gap-2 rounded-full bg-volt px-7 py-4 font-display text-base font-bold text-coal shadow-glow transition-colors hover:bg-paper"
                >
                  Book Instant Demo
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="/contact"
                  className="rounded-full border border-line/20 px-7 py-4 font-display text-base font-semibold text-fg transition hover:border-acc/60 hover:bg-line/5"
                >
                  Talk to sales
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Values card stack */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.6, ease: EASE }}
                className={cn(
                  "rounded-3xl border border-line/10 bg-raise p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-acc/40",
                  i % 2 === 1 && "sm:translate-y-6"
                )}
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-volt text-coal shadow-glow">
                  <v.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-fg">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg/60">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-line/10 bg-raise/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-line/10 px-4 sm:grid-cols-4 sm:divide-x sm:px-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="py-10 text-center">
                <p className="font-display text-4xl font-bold text-fg sm:text-5xl">
                  <CountUp end={s.end} decimals={s.decimals ?? 0} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-sm text-fg/55">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTag index="01" label="Our story" />
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <p className="font-serifit text-2xl italic leading-snug text-fg/85 sm:text-[1.7rem]">
                BudgeTree started with a simple observation: companies spend
                weeks and lakhs on rewards that arrive late, feel generic and
                never get measured.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-serifit text-2xl italic leading-snug text-fg/85 sm:text-[1.7rem]">
                So we built the rails we wished existed — one platform where
                recognition, loyalty, UPI cash and payouts flow in seconds,
                and every rupee proves its worth.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-3xl leading-relaxed text-fg/65">
              Today 250+ enterprises across BFSI, retail, pharma, auto and
              FMCG run their reward programs on BudgeTree — from a two-person
              startup sending its first kudo to enterprises disbursing crores
              across 175+ countries. The team spans rewards, payments and
              design, united by one belief: appreciation works best when it&apos;s
              instant, personal and measurable.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-line/10 bg-raise shadow-card">
              <img
                src="/images/live/about.svg"
                alt="The Budgetree rewards ecosystem"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-raise/50 py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionTag index="02" label="FAQ" />
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-fg sm:text-5xl">
                Frequently asked{" "}
                <span className="font-serifit font-normal italic text-acc">
                  questions.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 max-w-sm leading-relaxed text-fg/60">
                Everything teams usually ask about our services. Still curious?
                We reply within one business day.
              </p>
            </Reveal>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={f.q} delay={i * 0.05}>
                  <div
                    className={cn(
                      "overflow-hidden rounded-2xl border transition-colors duration-300",
                      isOpen
                        ? "border-acc/40 bg-sunken/60"
                        : "border-line/10 bg-line/[0.03] hover:border-line/25"
                    )}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                    >
                      <span className="font-display text-base font-bold text-fg sm:text-lg">
                        {f.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors",
                          isOpen ? "bg-volt text-coal" : "bg-line/10 text-fg"
                        )}
                      >
                        <Plus className="h-5 w-5" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                        >
                          <p className="px-5 pb-6 leading-relaxed text-fg/65 sm:px-6">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
