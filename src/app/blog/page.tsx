"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3, Search } from "lucide-react";
import { useState } from "react";
import { CATEGORIES, POSTS } from "@/data/blog";
import { EASE, Reveal, SectionTag, cn } from "@/components/ui";

export default function BlogPage() {
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const sorted = [...POSTS].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const filtered = sorted.filter((p) => (cat === "All" || p.category === cat) &&
    (!query.trim() || (p.title + " " + p.excerpt + " " + p.category)
      .toLowerCase().includes(query.trim().toLowerCase())));
  // Mirror the official Budgetree blog's editorial featured choice while
  // keeping the newest articles visible in chronological order.
  const featured = POSTS.find((p) => p.slug === "redemption-portal-loyalty-rewards") || sorted[0];
  const showFeatured = cat === "All" && !query.trim();
  const gridPosts = showFeatured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;

  return (
    <main className="overflow-hidden">
      <section className="relative pb-16 pt-36 sm:pt-40">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_50%_at_50%_0%,black,transparent)]" />
        <div className="glow-lilac pointer-events-none absolute -top-24 right-0 h-[420px] w-[420px] rounded-full" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTag index="◆" label="The Journal · Insights" />
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-5 max-w-3xl font-display text-5xl font-bold leading-[0.98] tracking-tight text-fg sm:text-6xl"
          >
            Ideas that{" "}
            <span className="font-serifit font-normal italic text-acc">
              move business forward.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-5 max-w-xl text-base leading-relaxed text-fg/60 sm:text-lg"
          >
            Practical perspectives on rewards, loyalty, digital payments and customer engagement — ideas for smarter business growth.
          </motion.p>

          <div className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-line/15 bg-raise px-4 py-3 shadow-sm transition focus-within:border-acc/50">
            <Search className="h-5 w-5 shrink-0 text-acc" aria-hidden="true" />
            <input
              type="search"
              aria-label="Search Budgetree Insights articles"
              placeholder="Search articles, rewards, payouts, loyalty..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg/45"
            />
          </div>

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
      {showFeatured && (
        <section className="pb-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <a
                href={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-[2rem] border border-line/15 bg-raise shadow-card transition hover:border-acc/40 lg:grid-cols-[0.9fr_1.1fr]"
              >
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
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
                <div className="flex min-h-[300px] items-center justify-center border-t border-line/10 bg-sunken/35 p-3 sm:min-h-[360px] lg:min-h-[440px] lg:border-l lg:border-t-0 lg:p-5">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="eager"
                    decoding="async"
                    className="block h-auto max-h-[600px] w-full rounded-2xl object-contain transition-transform duration-700 group-hover:scale-[1.015]"
                  />
                </div>
              </a>
            </Reveal>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-acc">Explore the library</p><h2 className="mt-2 font-display text-3xl font-bold text-fg sm:text-4xl">{cat === "All" ? "Latest thinking" : cat}</h2></div><p className="text-sm font-medium text-fg/55">{gridPosts.length} {gridPosts.length === 1 ? "article" : "articles"}</p></div>
          {gridPosts.length === 0 && (
            <div className="mb-8 rounded-2xl border border-line/15 bg-raise p-8 text-center text-sm text-fg/65">
              No matching Insights articles. Try a different search or category.
            </div>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08}>
                <a
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line/10 bg-raise transition-all duration-300 hover:-translate-y-1.5 hover:border-acc/40"
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-line/10 bg-sunken/30 p-3">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full rounded-xl object-contain transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                    <span className="absolute left-5 top-5 rounded-full border border-line/15 bg-raise/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-fg shadow-sm backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold leading-snug text-fg">
                      {p.title}
                    </h3>
                    <p className="mt-3 line-clamp-4 text-sm leading-[1.8] text-fg/70">
                      {p.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-5 text-xs font-semibold text-fg/45">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" /> {p.date}
                      </span>
                      <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {p.read}</span>
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
