"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronRight,
  Quote,
} from "lucide-react";
import { useParams } from "next/navigation";
import { getProduct, PRODUCTS } from "@/data/products";
import { EASE, Magnetic, Reveal, SectionTag, Tilt, cn } from "@/components/ui";

export default function ProductPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const product = getProduct(slug);

  if (!product) {
    return (
      <main className="grid min-h-[70vh] place-items-center px-4 pt-32">
        <div className="text-center">
          <p className="font-display text-7xl font-bold text-fg/20">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold text-fg">
            Product not found
          </h1>
          <p className="mt-2 text-fg/60">
            That product doesn&apos;t exist — but these do.
          </p>
          <a
            href="/#products"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3 font-display text-sm font-bold text-coal"
          >
            <ArrowLeft className="h-4 w-4" /> Back to products
          </a>
        </div>
      </main>
    );
  }

  const related = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <main className="overflow-hidden">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
          <div
            className={cn(
              "absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full blur-[140px]",
              product.glow
            )}
          />
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
            <a href="/#products" className="transition hover:text-fg">Products</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-fg">{product.name}</span>
          </motion.nav>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em]",
                  product.chip
                )}
              >
                <product.icon className="h-4 w-4" /> {product.name}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
                className="mt-5 font-display text-5xl font-bold leading-[0.98] tracking-tight text-fg sm:text-6xl lg:text-7xl"
              >
                {product.tagline.split(".")[0]}.
                <br />
                <span className="font-serifit font-normal italic text-acc">
                  {product.tagline.split(".").slice(1).join(".").trim()}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
                className="mt-6 max-w-lg text-base leading-relaxed text-fg/65 sm:text-lg"
              >
                {product.desc}
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
                    href="/pricing"
                    className="rounded-full border border-line/20 px-7 py-4 font-display text-base font-semibold text-fg transition hover:border-acc/60 hover:bg-line/5"
                  >
                    See pricing
                  </a>
                </Magnetic>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg/50"
              >
                {["Free onboarding", "Go live < 24h", "Cancel anytime"].map(
                  (t) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <BadgeCheck className="h-4 w-4 text-jade" /> {t}
                    </span>
                  )
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 26 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            >
              <Tilt max={8}>
                <div className="relative overflow-hidden rounded-[2rem] border border-line/10 shadow-card">
                  <img
                    src={product.image}
                    alt={`${product.name} visual`}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex animate-float items-center gap-2 rounded-2xl border border-paper/15 bg-coal/80 px-4 py-2.5 backdrop-blur">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-volt" />
                      <span className="h-2 w-2 rounded-full bg-volt" />
                    </span>
                    <span className="text-sm font-bold text-paper">
                      {product.stats[0].value} {product.stats[0].label}
                    </span>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- Stats band ---------- */}
      <section className="border-y border-line/10 bg-raise/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-line/10 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6">
          {product.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="flex items-center gap-4 py-7 sm:justify-center">
                <p className="font-display text-4xl font-bold text-fg sm:text-5xl">
                  {s.value}
                </p>
                <p className="max-w-[110px] text-sm leading-snug text-fg/55">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Story + features ---------- */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTag index="01" label={`Why ${product.name}`} />
          <div className="mt-5 grid gap-8 lg:grid-cols-2">
            {product.long.map((para, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="font-serifit text-2xl italic leading-snug text-fg/85 sm:text-[1.7rem]">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {product.features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="group rounded-3xl border border-line/10 bg-raise p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-acc/50"
              >
                <span
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
                    product.soft
                  )}
                >
                  <product.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-fg">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg/60">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="bg-raise/50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTag index="02" label="How it works" />
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
              Live in four{" "}
              <span className="font-serifit font-normal italic text-acc">
                simple steps.
              </span>
            </h2>
          </Reveal>
          <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-line/20 lg:block" />
            {product.steps.map((s, i) => (
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
                <h3 className="mt-5 font-display text-lg font-bold text-fg">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg/60">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Live preview ---------- */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div
              className={cn(
                "relative overflow-hidden rounded-[2.5rem] border border-paper/10 bg-gradient-to-br shadow-card",
                product.gradient
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[110px]",
                  product.glow
                )}
              />
              <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-2">
                <div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em]",
                      product.chip
                    )}
                  >
                    Live preview
                  </span>
                  <h2 className="mt-5 font-display text-3xl font-bold text-paper sm:text-5xl">
                    This is what your team will use every day.
                  </h2>
                  <ul className="mt-7 space-y-3">
                    {product.features.slice(0, 3).map((f) => (
                      <li
                        key={f.title}
                        className="flex items-center gap-3 text-sm font-medium text-paper/85"
                      >
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-paper/10">
                          <Check className="h-3.5 w-3.5 text-volt" />
                        </span>
                        {f.title} — {f.desc.split(".")[0]}.
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/demo"
                    className="group mt-8 inline-flex items-center gap-2 rounded-full bg-volt px-7 py-3.5 font-display text-sm font-bold text-coal transition hover:bg-paper"
                  >
                    Try it on your data
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
                <div className="grid place-items-center rounded-3xl bg-coal/25 p-6 sm:p-8">
                  <product.Visual />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Quote ---------- */}
      <section className="pb-24 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <Quote className="mx-auto h-10 w-10 fill-acc text-acc" />
            <blockquote className="mt-6 font-serifit text-2xl italic leading-snug text-fg sm:text-4xl">
              “{product.quote.text}”
            </blockquote>
            <p className="mt-6 font-display text-base font-bold text-fg">
              {product.quote.name}
            </p>
            <p className="text-sm text-fg/55">{product.quote.role}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Related ---------- */}
      <section className="border-t border-line/10 bg-raise/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <Reveal>
              <h2 className="font-display text-3xl font-bold text-fg sm:text-4xl">
                Keep exploring the suite
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                href="/#products"
                className="hidden items-center gap-1.5 text-sm font-bold text-acc sm:inline-flex"
              >
                All products <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r, i) => (
              <motion.a
                key={r.slug}
                href={`/products/${r.slug}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                className="group overflow-hidden rounded-3xl border border-line/10 bg-base transition-all duration-300 hover:-translate-y-1.5 hover:border-acc/50"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/60 to-transparent" />
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
    </main>
  );
}
