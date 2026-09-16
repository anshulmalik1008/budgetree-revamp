"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronRight,
} from "lucide-react";
import { useParams } from "next/navigation";
import { SERVICES, getService } from "@/data/services";
import { CtaBand } from "@/components/PageBits";
import { EASE, Magnetic, Reveal, SectionTag, Tilt, cn } from "@/components/ui";

export default function ServicePage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const service = getService(slug);

  if (!service) {
    return (
      <main className="grid min-h-[70vh] place-items-center px-4 pt-32">
        <div className="text-center">
          <p className="font-display text-7xl font-bold text-fg/20">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold text-fg">Service not found</h1>
          <a
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3 font-display text-sm font-bold text-coal"
          >
            <ArrowLeft className="h-4 w-4" /> Back home
          </a>
        </div>
      </main>
    );
  }

  const related = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
          <div className={cn("pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full", service.glow)} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-1.5 text-sm text-fg/50"
          >
            <a href="/" className="transition hover:text-fg">Home</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-fg">{service.name}</span>
          </motion.nav>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em]",
                  service.chip
                )}
              >
                <service.icon className="h-4 w-4" /> {service.name}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
                className="mt-5 font-display text-5xl font-bold leading-[0.98] tracking-tight text-fg sm:text-6xl"
              >
                {service.tagline}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
                className="mt-6 max-w-lg text-base leading-relaxed text-fg/65 sm:text-lg"
              >
                {service.desc}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Magnetic>
                  <a
                    href="/demo"
                    className="group flex items-center gap-2 rounded-full bg-volt px-7 py-4 font-display text-base font-bold text-coal shadow-glow transition-colors hover:bg-paper"
                  >
                    Book a demo
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg/50"
              >
                {["Free onboarding", "Go live < 24h", "Enterprise SLAs"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <BadgeCheck className="h-4 w-4 text-jade" /> {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Visual: stats + image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 26 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            >
              <Tilt max={8}>
                <div className="relative overflow-hidden rounded-[2rem] border border-line/10 bg-raise shadow-card">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={`${service.name} preview`}
                      className="aspect-[16/9] w-full object-contain p-3 sm:p-4"
                    />
                  ) : (
                    <div className={cn("grid aspect-[16/9] w-full place-items-center bg-gradient-to-br", service.glow)}>
                      <service.icon className="h-24 w-24 text-fg/20" />
                    </div>
                  )}
                  <div className="grid grid-cols-3 divide-x divide-line/10 border-t border-line/10">
                    {service.stats.map((s) => (
                      <div key={s.label} className="p-4 text-center sm:p-5">
                        <p className="font-display text-xl font-bold text-fg sm:text-2xl">{s.value}</p>
                        <p className="mt-1 text-[11px] font-semibold leading-snug text-fg/55">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTag index="01" label={`Why ${service.name}`} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="group rounded-3xl border border-line/10 bg-raise p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-acc/50"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-volt text-coal shadow-glow transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <service.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-fg">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg/60">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-raise/50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTag index="02" label="How it works" />
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
              Live in four{" "}
              <span className="font-serifit font-normal italic text-acc">simple steps.</span>
            </h2>
          </Reveal>
          <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-line/20 lg:block" />
            {service.steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className="relative"
              >
                <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-volt font-display text-lg font-bold text-coal shadow-glow">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-fg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg/60">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <Reveal delay={0.1}>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
              {service.features.map((f) => (
                <li key={f.title} className="flex items-center gap-2 text-sm font-medium text-fg/70">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-acc/15">
                    <Check className="h-3.5 w-3.5 text-acc" />
                  </span>
                  {f.title}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-line/10 bg-raise/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-fg sm:text-4xl">
              More from{" "}
              <span className="font-serifit font-normal italic text-acc">BudgeTree.</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <motion.a
                key={r.slug}
                href={`/services/${r.slug}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                className="group overflow-hidden rounded-3xl border border-line/10 bg-base transition-all duration-300 hover:-translate-y-1.5 hover:border-acc/50"
              >
                <div className={cn("relative grid h-28 place-items-center bg-gradient-to-br", r.glow)}>
                  <r.icon className="h-10 w-10 text-fg/25 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <p className="flex items-center justify-between font-display text-lg font-bold text-fg">
                    {r.name}
                    <ArrowUpRight className="h-5 w-5 text-acc transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </p>
                  <p className="mt-1 text-sm text-fg/55">{r.tagline}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
