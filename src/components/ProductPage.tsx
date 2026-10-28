"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useScroll } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { products, type Product } from "@/data/products";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import Spot from "@/components/ui/Spot";
import ProductVisual from "./ProductVisual";

function StepItem({ i, title, text, accent }: { i: number; title: string; text: string; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { margin: "-42% 0px -42% 0px" });
  const A = `rgb(var(--c-${accent}))`;
  return (
    <div ref={ref} className="relative flex gap-5 pb-8 last:pb-0">
      <div
        className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border font-display text-sm font-bold transition-all duration-500"
        style={{
          borderColor: active ? A : "rgb(var(--c-line) / 0.2)",
          background: active ? A : "rgb(var(--c-raise))",
          color: active ? "rgb(var(--c-base))" : "rgb(var(--c-fg) / 0.5)",
          boxShadow: active ? `0 0 0 6px rgb(var(--c-${accent}) / 0.15)` : "none",
        }}
      >
        {i + 1}
      </div>
      <div
        className="flex-1 rounded-2xl border bg-raise p-5 transition-all duration-500"
        style={{
          borderColor: active ? `rgb(var(--c-${accent}) / 0.5)` : "rgb(var(--c-line) / 0.1)",
          opacity: active ? 1 : 0.6,
          transform: active ? "translateX(4px)" : "none",
        }}
      >
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-fg/65">{text}</p>
      </div>
    </div>
  );
}

function Faq({ q, a, defaultOpen = false, accent }: { q: string; a: string; defaultOpen?: boolean; accent: string }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-2xl border border-line/10 bg-raise">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base font-semibold sm:text-lg">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full"
          style={{ background: `rgb(var(--c-${accent}) / 0.15)`, color: `rgb(var(--c-${accent}))` }}
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-fg/65">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductPage({ product }: { product: Product }) {
  const { accent } = product;
  const A = `rgb(var(--c-${accent}))`;
  const related = product.related.map((s) => products.find((p) => p.slug === s)).filter((p): p is Product => !!p);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const s0 = product.stats[0];
  const s1 = product.stats[1];
  const fmt = (s: Product["stats"][number]) => `${s.prefix ?? ""}${s.value.toFixed(s.decimals ?? 0)}${s.suffix ?? ""}`;

  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section className="relative overflow-hidden pb-20 pt-36 sm:pt-40">
        <div className="line-grid pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full blur-3xl"
          style={{ background: `radial-gradient(closest-side, rgb(var(--c-${accent}) / 0.18), transparent)` }}
        />
        <div className="glow-mint pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-2 text-xs text-fg/50"
              aria-label="Breadcrumb"
            >
              <Link href="/products" className="transition hover:text-fg">
                Platform
              </Link>
              <span>/</span>
              <span className="text-fg/80">{product.name}</span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold"
              style={{ borderColor: `rgb(var(--c-${accent}) / 0.4)`, background: `rgb(var(--c-${accent}) / 0.1)`, color: A }}
            >
              <Icon name={product.icon} className="h-3.5 w-3.5" />
              {product.eyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[2.4rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl"
            >
              {product.headline.a}{" "}
              <span className="font-serif font-normal italic" style={{ color: A }}>
                {product.headline.em}
              </span>{" "}
              {product.headline.b}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.7 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-fg/70 sm:text-lg"
            >
              {product.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href={`/demo?product=${product.slug}`}
                className="group inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3 text-sm font-bold text-coal shadow-glow transition hover:bg-paper"
              >
                Book a demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-full border border-line/20 px-6 py-3 text-sm font-semibold transition hover:border-line/40 hover:bg-line/5"
              >
                See how it works
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-fg/55"
            >
              {["Go live in under 24h", "API-first & ERP-ready", "Enterprise-grade security"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" style={{ color: A }} /> {t}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] blur-2xl"
              style={{ background: `radial-gradient(closest-side, rgb(var(--c-${accent}) / 0.2), transparent)` }}
            />
            <div className="relative">
              <ProductVisual name={product.visual} />
            </div>
            <div className="animate-float absolute -left-3 -bottom-6 hidden rounded-2xl border border-line/15 bg-raise/95 px-4 py-3 shadow-card backdrop-blur sm:block lg:-left-8">
              <p className="font-display text-2xl font-bold" style={{ color: A }}>
                {fmt(s0)}
              </p>
              <p className="max-w-[9.5rem] text-[10px] leading-tight text-fg/55">{s0.label}</p>
            </div>
            <div
              className="animate-float absolute -right-2 -top-6 hidden rounded-2xl border border-line/15 bg-raise/95 px-4 py-3 shadow-card backdrop-blur sm:block lg:-right-6"
              style={{ animationDelay: "-3s" }}
            >
              <p className="font-display text-2xl font-bold" style={{ color: A }}>
                {fmt(s1)}
              </p>
              <p className="max-w-[9.5rem] text-[10px] leading-tight text-fg/55">{s1.label}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────── STATS ─────────── */}
      <section className="relative border-y border-line/10 bg-raise/40 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {product.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="border-l-2 pl-5" style={{ borderColor: A }}>
                  <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                    <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-sm leading-snug text-fg/60">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {product.outcomesNote && <p className="mt-8 text-xs text-fg/40">* {product.outcomesNote}</p>}
        </div>
      </section>

      {/* ─────────── FEATURES ─────────── */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: A }}>
              Capabilities
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Built for <span className="font-serif font-normal italic">real-world</span> operations
            </h2>
            <p className="mt-4 max-w-2xl text-fg/65">{product.tagline}</p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.08} className="h-full">
                <Spot accent={accent} className="p-6">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ background: `rgb(var(--c-${accent}) / 0.14)`, color: A }}
                  >
                    <Icon name={f.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg/65">{f.text}</p>
                </Spot>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── HOW IT WORKS ─────────── */}
      <section id="how" className="relative scroll-mt-24 border-t border-line/10 bg-raise/40 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: A }}>
                How it works
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                From signal to <span className="font-serif font-normal italic">outcome</span>, step by step.
              </h2>
              <p className="mt-4 text-fg/65">
                {product.steps.length} connected steps run automatically in the background so your teams focus only on the
                exceptions that matter.
              </p>
              <Link
                href={`/demo?product=${product.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: A }}
              >
                Watch it live in a demo <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div ref={listRef} className="relative">
            <div className="absolute bottom-0 left-[22px] top-0 w-px bg-line/15" />
            <motion.div
              className="absolute bottom-0 left-[22px] top-0 w-px origin-top"
              style={{ scaleY: scrollYProgress, background: A }}
            />
            {product.steps.map((s, i) => (
              <StepItem key={s.title} i={i} title={s.title} text={s.text} accent={accent} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── BENEFITS ─────────── */}
      <section className="relative py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: A }}>
              Why teams choose it
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Elegant workflows, <span className="font-serif font-normal italic">enterprise-grade</span> outcomes.
            </h2>
            <p className="mt-4 max-w-lg text-fg/65">
              Part of the BudgeTree suite — so data flows between modules, rewards and payouts without a single integration
              project.
            </p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {product.benefits.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="flex items-start gap-3 rounded-2xl border border-line/10 bg-raise p-4"
              >
                <span
                  className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full"
                  style={{ background: `rgb(var(--c-${accent}) / 0.18)`, color: A }}
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm leading-snug text-fg/80">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── RELATED ─────────── */}
      <section className="relative border-t border-line/10 bg-raise/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: A }}>
              Better together
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Works seamlessly with the <span className="font-serif font-normal italic">rest of the suite.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08} className="h-full">
                <Link href={`/products/${p.slug}`} className="block h-full">
                  <Spot accent={p.accent} className="p-6">
                    <div className="flex items-start justify-between">
                      <span
                        className="grid h-12 w-12 place-items-center rounded-xl"
                        style={{ background: `rgb(var(--c-${p.accent}) / 0.14)`, color: `rgb(var(--c-${p.accent}))` }}
                      >
                        <Icon name={p.icon} className="h-6 w-6" />
                      </span>
                      <ArrowUpRight className="h-5 w-5 text-fg/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg/65">{p.tagline}</p>
                  </Spot>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── FAQ ─────────── */}
      <section className="relative py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: A }}>
              FAQ
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Common <span className="font-serif font-normal italic">questions</span>
            </h2>
            <p className="mt-4 text-fg/65">Everything you need to know about BudgeTree {product.name}.</p>
          </Reveal>
          <div className="space-y-3">
            {product.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <Faq q={f.q} a={f.a} accent={accent} defaultOpen={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── CTA ─────────── */}
      <section className="relative px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-line/15 bg-raise px-6 py-16 text-center sm:px-12 sm:py-20">
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-70" />
            <div className="glow-volt pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full" />
            <div className="glow-mint pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full" />
            <div className="relative">
              <h2 className="mx-auto max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">
                Ready to see {product.name} <span className="font-serif font-normal italic" style={{ color: A }}>in action?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-fg/65">
                Book a 15-minute demo or talk to our team — most clients go live in under 24 hours.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href={`/demo?product=${product.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-volt px-7 py-3.5 text-sm font-bold text-coal shadow-glow transition hover:bg-paper"
                >
                  Book a demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full border border-line/20 px-7 py-3.5 text-sm font-semibold transition hover:border-line/40 hover:bg-line/5"
                >
                  Explore all products
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
