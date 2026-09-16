"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Gift,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { EASE, Magnetic, Reveal, SectionTag } from "./ui";

const CARDS = [
  {
    icon: Zap,
    title: "Go live in under 24 hours",
    desc: "API-first setup, guided onboarding and pre-built reward templates — no months-long IT projects.",
  },
  {
    icon: Gift,
    title: "10M+ rewards, one catalog",
    desc: "Gift cards, UPI cash, payouts and loyalty — localized for teams across 175+ countries.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade trust",
    desc: "Bank-level security, compliance-ready payouts and 99.99% uptime for mission-critical programs.",
  },
  {
    icon: BarChart3,
    title: "ROI you can measure",
    desc: "Real-time dashboards tie every single reward to engagement, retention and revenue impact.",
  },
];

function SpotCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: typeof Zap;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: EASE }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        className="group relative h-full overflow-hidden rounded-3xl border border-contrastfg/10 bg-lift/70 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-contrastfg/20 hover:shadow-card"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(340px circle at var(--x, 50%) var(--y, 50%), rgba(205,251,71,0.45), transparent 65%)",
          }}
        />
        <div className="relative">
          <div className="flex items-start justify-between">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-coal text-volt transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              <Icon className="h-6 w-6" />
            </span>
            <span className="font-display text-sm font-bold text-contrastfg/25">
              0{index + 1}
            </span>
          </div>
          <h3 className="mt-6 font-display text-xl font-bold leading-snug text-contrastfg">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-contrastfg/60">{desc}</p>
          <span className="mt-5 inline-flex translate-y-1 items-center gap-1.5 text-sm font-bold text-contrastfg opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Learn more <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyUs() {
  return (
    <section id="why" className="relative bg-contrast py-24 text-contrastfg sm:py-32">
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTag index="01" label="Why teams switch" dark />
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.05}>
            <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              One platform,{" "}
              <span className="font-serifit font-normal italic">
                every reward motion.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-base leading-relaxed text-contrastfg/60 sm:text-lg">
              Stop stitching vendors together. BudgeTree unifies engagement,
              loyalty, UPI rewards and payouts — with the speed enterprises need.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <SpotCard key={c.title} {...c} index={i} />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-4">
          <Magnetic>
            <a
              href="/#products"
              className="group flex items-center gap-2 rounded-full bg-coal px-7 py-3.5 font-display text-sm font-bold text-paper transition hover:bg-fern"
            >
              See it in action
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="/demo"
              className="rounded-full border-2 border-contrastfg/15 px-7 py-3.5 font-display text-sm font-bold text-contrastfg transition hover:border-contrastfg hover:bg-coal hover:text-paper"
            >
              Talk to sales
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
