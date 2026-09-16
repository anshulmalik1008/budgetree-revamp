"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight, Clock3 } from "lucide-react";
import { useParams } from "next/navigation";
import { POSTS, getPost } from "@/data/blog";
import { CtaBand } from "@/components/PageBits";
import { EASE, Reveal, cn } from "@/components/ui";

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const post = getPost(slug);

  if (!post) {
    return (
      <main className="grid min-h-[70vh] place-items-center px-4 pt-32">
        <div className="text-center">
          <p className="font-display text-7xl font-bold text-fg/20">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold text-fg">Article not found</h1>
          <a
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3 font-display text-sm font-bold text-coal"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </a>
        </div>
      </main>
    );
  }

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="overflow-hidden">
      <article className="relative pb-20 pt-36 sm:pt-40">
        <div className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[480px] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-1.5 text-sm text-fg/50"
          >
            <a href="/" className="transition hover:text-fg">Home</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <a href="/blog" className="transition hover:text-fg">Blog</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="truncate font-semibold text-fg">{post.category}</span>
          </motion.nav>

          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
            className="mt-8 inline-block rounded-full bg-acc/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-acc"
          >
            {post.category}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight text-fg sm:text-5xl"
          >
            {post.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="mt-5 flex items-center gap-5 text-sm font-semibold text-fg/50"
          >
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" /> {post.read}
            </span>
            <span>BudgeTree Team</span>
          </motion.p>

          {/* Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className={cn(
              "relative mt-10 h-52 overflow-hidden rounded-[2rem] bg-gradient-to-br sm:h-64",
              post.accent
            )}
          >
            <div className="dot-grid-dark absolute inset-0 opacity-60" />
            <span className="absolute -bottom-8 -right-4 select-none font-display text-[10rem] font-bold leading-none text-coal/15">
              ✦
            </span>
          </motion.div>

          {/* Body */}
          <div className="mt-10 space-y-6">
            {post.content.map((block, i) => (
              <Reveal key={i} delay={0.05}>
                {block.h && (
                  <h2 className="mb-3 font-display text-2xl font-bold text-fg">
                    {block.h}
                  </h2>
                )}
                <p className="text-base leading-[1.85] text-fg/70">{block.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-line/10 bg-raise/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <Reveal>
              <h2 className="font-display text-3xl font-bold text-fg sm:text-4xl">
                Keep{" "}
                <span className="font-serifit font-normal italic text-acc">reading.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-acc"
              >
                All articles <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.08}>
                <a
                  href={`/blog/${r.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line/10 bg-base transition-all duration-300 hover:-translate-y-1.5 hover:border-acc/40"
                >
                  <div className={cn("relative h-28 bg-gradient-to-br", r.accent)}>
                    <div className="dot-grid-dark absolute inset-0 opacity-50" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-acc">
                      {r.category}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-fg">
                      {r.title}
                    </h3>
                    <p className="mt-auto pt-4 text-xs font-semibold text-fg/45">{r.date}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
