"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Check, Minus } from "lucide-react";
import { useState } from "react";
import { EASE, Magnetic, Reveal, SectionTag, cn } from "@/components/ui";

type Plan = {
  name: string;
  desc: string;
  monthly: number | null;
  annual: number | null;
  cta: string;
  popular?: boolean;
  features: string[];
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    desc: "For teams launching their first rewards program.",
    monthly: 4999,
    annual: 3999,
    cta: "Start free trial",
    features: [
      "3 live campaigns",
      "1,000 rewards / month",
      "100+ gift cards",
      "Email delivery + tracking",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Growth",
    desc: "For scaling engagement, loyalty and payouts.",
    monthly: 14999,
    annual: 11999,
    cta: "Book a demo",
    popular: true,
    features: [
      "Unlimited campaigns",
      "25,000 rewards / month",
      "350+ gift cards + UPI cash",
      "Bulk payouts engine",
      "White-label + custom domain",
      "API + webhooks",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    desc: "Bank-grade scale, security and control.",
    monthly: null,
    annual: null,
    cta: "Talk to sales",
    features: [
      "Everything in Growth",
      "Unlimited volume",
      "SSO, roles & audit logs",
      "Dedicated success manager",
      "Custom SLAs + DPDP support",
      "Guided onboarding",
    ],
  },
];

const TABLE: Array<{ f: string; s: string | boolean; g: string | boolean; e: string | boolean }> = [
  { f: "Live campaigns", s: "3", g: "Unlimited", e: "Unlimited" },
  { f: "Rewards / month", s: "1,000", g: "25,000", e: "Unlimited" },
  { f: "Gift card catalog", s: "100+", g: "350+", e: "350+ + custom" },
  { f: "UPI cash tokens", s: false, g: true, e: true },
  { f: "Bulk payouts", s: false, g: true, e: true },
  { f: "White-label", s: false, g: true, e: true },
  { f: "API + webhooks", s: false, g: true, e: true },
  { f: "SSO & audit logs", s: false, g: false, e: true },
  { f: "Support", s: "Email", g: "Priority", e: "Dedicated CSM" },
];

function Cell({ v }: { v: string | boolean }) {
  if (v === true)
    return (
      <span className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-jade/15">
        <Check className="h-4 w-4 text-jade" />
      </span>
    );
  if (v === false) return <Minus className="mx-auto h-4 w-4 text-fg/25" />;
  return <span className="text-sm font-semibold text-fg">{v}</span>;
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden pb-14 pt-36 sm:pt-40">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_25%,black,transparent)]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-volt/10 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <SectionTag index="◆" label="Pricing" />
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mx-auto mt-5 max-w-3xl font-display text-5xl font-bold leading-[0.98] tracking-tight text-fg sm:text-6xl"
          >
            Simple pricing that{" "}
            <span className="font-serifit font-normal italic text-acc">
              scales with you.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mx-auto mt-5 max-w-xl text-fg/60 sm:text-lg"
          >
            Start small, scale to millions of rewards. Every plan includes
            onboarding, analytics and 99.99% uptime.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mt-8 inline-flex items-center gap-1 rounded-full border border-line/15 bg-raise p-1.5"
          >
            {(["Monthly", "Annual"] as const).map((label) => {
              const isAnnual = label === "Annual";
              const active = annual === isAnnual;
              return (
                <button
                  key={label}
                  onClick={() => setAnnual(isAnnual)}
                  className={cn(
                    "relative rounded-full px-6 py-2.5 font-display text-sm font-bold transition-colors",
                    active ? "text-coal" : "text-fg/55 hover:text-fg"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="billing-pill"
                      className="absolute inset-0 rounded-full bg-volt"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {label}
                    {isAnnual && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                          active ? "bg-coal text-volt" : "bg-jade/15 text-jade"
                        )}
                      >
                        −20%
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.1, ease: EASE }}
              className={cn(
                "relative flex flex-col rounded-[2rem] border p-8 transition-transform duration-300 hover:-translate-y-1.5",
                p.popular
                  ? "border-volt/60 bg-coal shadow-glow lg:scale-[1.04]"
                  : "border-line/10 bg-raise"
              )}
            >
              {p.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-volt px-4 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-coal">
                  Most popular
                </span>
              )}
              <h2
                className={cn(
                  "font-display text-xl font-bold",
                  p.popular ? "text-paper" : "text-fg"
                )}
              >
                {p.name}
              </h2>
              <p
                className={cn(
                  "mt-1.5 min-h-[42px] text-sm",
                  p.popular ? "text-paper/60" : "text-fg/55"
                )}
              >
                {p.desc}
              </p>
              <div className="mt-5 flex h-[72px] items-end">
                <AnimatePresence mode="wait">
                  {p.monthly === null ? (
                    <motion.span
                      key="custom"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={cn(
                        "font-display text-5xl font-bold",
                        p.popular ? "text-paper" : "text-fg"
                      )}
                    >
                      Custom
                    </motion.span>
                  ) : (
                    <motion.span
                      key={annual ? "a" : "m"}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={cn(
                        "font-display text-5xl font-bold tabular-nums",
                        p.popular ? "text-paper" : "text-fg"
                      )}
                    >
                      ₹{(annual ? p.annual! : p.monthly).toLocaleString("en-IN")}
                      <span
                        className={cn(
                          "ml-1 font-body text-sm font-medium",
                          p.popular ? "text-paper/55" : "text-fg/50"
                        )}
                      >
                        /mo{annual ? ", billed annually" : ""}
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <Magnetic className="mt-6 block" strength={0.15}>
                <a
                  href="/demo"
                  className={cn(
                    "group flex items-center justify-center gap-2 rounded-full py-3.5 font-display text-sm font-bold transition",
                    p.popular
                      ? "bg-volt text-coal hover:bg-paper"
                      : "border border-line/20 text-fg hover:border-acc/60 hover:bg-line/5"
                  )}
                >
                  {p.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <ul
                className={cn(
                  "mt-7 space-y-3 border-t pt-6",
                  p.popular ? "border-paper/10" : "border-line/10"
                )}
              >
                {p.features.map((f) => (
                  <li
                    key={f}
                    className={cn(
                      "flex items-center gap-2.5 text-sm font-medium",
                      p.popular ? "text-paper/85" : "text-fg/75"
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full",
                        p.popular ? "bg-volt/20" : "bg-acc/15"
                      )}
                    >
                      <Check
                        className={cn(
                          "h-3.5 w-3.5",
                          p.popular ? "text-volt" : "text-acc"
                        )}
                      />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <Reveal className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm text-fg/50">
          {["30-day money-back", "No setup fees", "Free onboarding"].map(
            (t) => (
              <span key={t} className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-jade" /> {t}
              </span>
            )
          )}
        </Reveal>
      </section>

      {/* Comparison table */}
      <section className="border-t border-line/10 bg-raise/50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-bold text-fg sm:text-4xl">
              Compare plans{" "}
              <span className="font-serifit font-normal italic text-acc">
                in detail.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 overflow-x-auto rounded-3xl border border-line/10 bg-base">
              <table className="w-full min-w-[560px] border-collapse text-center">
                <thead>
                  <tr className="border-b border-line/10">
                    <th className="p-5 text-left font-display text-sm font-bold text-fg">
                      Features
                    </th>
                    {["Starter", "Growth", "Enterprise"].map((h, i) => (
                      <th
                        key={h}
                        className={cn(
                          "p-5 font-display text-sm font-bold",
                          i === 1 ? "text-acc" : "text-fg"
                        )}
                      >
                        {h}
                        {i === 1 && (
                          <span className="ml-2 rounded-full bg-volt px-2 py-0.5 text-[10px] uppercase text-coal">
                            Popular
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE.map((r, i) => (
                    <tr
                      key={r.f}
                      className={cn(i % 2 === 1 && "bg-line/[0.03]")}
                    >
                      <td className="p-4 text-left text-sm font-medium text-fg/70">
                        {r.f}
                      </td>
                      <td className="p-4">
                        <Cell v={r.s} />
                      </td>
                      <td className="p-4">
                        <Cell v={r.g} />
                      </td>
                      <td className="p-4">
                        <Cell v={r.e} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="mt-8 text-center">
            <a
              href="/#faq"
              className="group inline-flex items-center gap-2 font-display text-sm font-bold text-fg"
            >
              <span className="border-b-2 border-acc/60 pb-0.5 transition group-hover:border-acc">
                Still deciding? Read the FAQ
              </span>
              <ArrowRight className="h-4 w-4 text-acc transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
