"use client";

import { motion } from "framer-motion";
import { ArrowRight, Blocks, Rocket, TrendingUp } from "lucide-react";
import { EASE, Magnetic, Reveal, SectionTag } from "./ui";

const STEPS = [
  {
    icon: Blocks,
    num: "01",
    title: "Plug in your tools",
    desc: "Connect HRMS, CRM or sheets in clicks. Contacts, teams and budgets sync themselves.",
    meta: "Avg. setup · 3h 42m",
  },
  {
    icon: Rocket,
    num: "02",
    title: "Launch a campaign",
    desc: "Pick a template, set rules, hit send. Rewards fly out over SMS, email & WhatsApp.",
    meta: "First reward · under 24h",
  },
  {
    icon: TrendingUp,
    num: "03",
    title: "Watch ROI compound",
    desc: "Delivery, redemption and retention stream into one dashboard your CFO will love.",
    meta: "Reporting · real-time",
  },
];

export default function LaunchSteps() {
  return (
    <section id="how" className="relative overflow-hidden bg-base py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[420px] rounded-full bg-volt/8 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTag index="02" label="How it works" />
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.05}>
            <h2 className="max-w-xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl">
              Live before{" "}
              <span className="font-serifit font-normal italic text-acc">
                lunch tomorrow.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-base leading-relaxed text-fg/60 sm:text-lg">
              Three steps stand between you and your first delivered reward.
              No IT tickets, no six-week onboarding.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-12 grid gap-5 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-16 hidden border-t-2 border-dashed border-line/20 md:block" />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: EASE }}
              className="group relative rounded-[2rem] border border-line/10 bg-raise p-8 transition-all duration-300 hover:-translate-y-2 hover:border-acc/50 hover:shadow-card"
            >
              <span className="text-stroke pointer-events-none absolute right-6 top-4 select-none font-display text-7xl font-bold opacity-60">
                {s.num}
              </span>
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-volt text-coal shadow-glow transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                <s.icon className="h-7 w-7" />
              </span>
              <h3 className="relative mt-6 font-display text-2xl font-bold text-fg">
                {s.title}
              </h3>
              <p className="relative mt-3 leading-relaxed text-fg/60">{s.desc}</p>
              <p className="relative mt-5 inline-flex rounded-full bg-acc/10 px-3.5 py-1.5 text-xs font-bold text-acc">
                {s.meta}
              </p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 text-center">
          <Magnetic>
            <a
              href="/demo"
              className="group inline-flex items-center gap-2 rounded-full bg-volt px-8 py-4 font-display text-base font-bold text-coal shadow-glow transition-colors hover:bg-paper"
            >
              Start with a live demo
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
