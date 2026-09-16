"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, POSTS } from "@/data/blog";
import { EASE, Reveal, SectionTag, cn } from "@/components/ui";

export default function BlogPage() {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? POSTS : POSTS.filter((p) => p.category === cat);
  const featured = filtered[0];
  const gridPosts = cat === "All" ? filtered.slice(1) : filtered;

  return (
    <main className="overflow-hidden">
      <section className="relative pb-16 pt-36 sm:pt-40">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_50%_at_50%_0%,black,transparent)]" />
        <div className="glow-lilac pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTag index="◆" label="Insights & updates" />
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[0.98] tracking-tight text-fg sm:text-6xl"
          >
            From our{" "}
            <span className="font-serifit font-normal italic text-acc">
              knowledge hub.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-5 max-w-xl text-base leading-relaxed text-fg/60 sm:text-lg"
          >
            Strategies on loyalty, rewards, payouts and engagement — from the
            BudgeTree team.
          </motion.p>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  cat === c
                    ? "border-volt bg-volt text-coal"
                    : "border-line/15 text-fg/60 hover:border-line/30 hover:text-fg"
                )}
              >
                {c}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      {cat === "All" && (
        <section className="pb-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <a
                href={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-[2rem] border border-line/10 bg-raise transition hover:border-acc/40 lg:grid-cols-[1.1fr_0.9fr]"
              >
                <div className="p-8 sm:p-10">
                  <span className="rounded-full bg-acc/15 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-acc">
                    Featured · {featured.category}
                  </span>
                  <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-fg sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 max-w-xl leading-relaxed text-fg/60">
                    {featured.excerpt}
                  </p>
                  <p className="mt-5 flex items-center gap-4 text-xs font-semibold text-fg/45">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" /> {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" /> {featured.read}
                    </span>
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold text-acc">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
                <div className={cn("relative min-h-[220px] overflow-hidden bg-gradient-to-br", featured.accent)}>
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coal/40 to-transparent" />
                </div>
              </a>
            </Reveal>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <a
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line/10 bg-raise transition-all duration-300 hover:-translate-y-1.5 hover:border-acc/40"
                >
                  <div className={cn("relative h-36 overflow-hidden bg-gradient-to-br", p.accent)}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-coal/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-paper">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold leading-snug text-fg">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-fg/60">
                      {p.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-5 text-xs font-semibold text-fg/45">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" /> {p.date}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-acc transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
