"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight, Clock3 } from "lucide-react";
import { useParams } from "next/navigation";
import { POSTS, getPost } from "@/data/blog";
import { CtaBand } from "@/components/PageBits";
import { EASE, Reveal } from "@/components/ui";

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

  const related = POSTS.filter((p) => p.slug !== post.slug).sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category)).slice(0, 3);
  const sections = post.content.map((block, i) => ({ ...block, index: i })).filter((block) => Boolean(block.h));

  return (
    <main className="overflow-hidden">
      <article className="relative pb-20 pt-36 sm:pt-40">
        <div className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[480px] [mask-image:radial-gradient(ellipse_65%_60%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-1.5 text-sm text-fg/50"
          >
            <a href="/" className="transition hover:text-fg">Home</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <a href="/blog" className="transition hover:text-fg">Insights</a>
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
            <span>Budgetree Editorial</span>
          </motion.p>

          <p className="mt-7 border-l-[3px] border-acc pl-5 text-lg leading-[1.85] text-fg/75 sm:text-xl">
            {post.excerpt}
          </p>
          </div>

          {/* Full image: preserve the artwork's native aspect ratio instead of clipping to a short banner. */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="mx-auto mt-12 w-full overflow-hidden rounded-[1.5rem] border border-line/15 bg-sunken/25 p-3 shadow-card sm:rounded-[2rem] sm:p-5"
          >
            <img
              src={post.image}
              alt={post.title}
              loading="eager"
              decoding="async"
              className="block h-auto w-full rounded-xl object-contain"
            />
          </motion.figure>

          {/* Editorial body and a useful table of contents from the original article. */}
          <div className="mx-auto mt-12 grid max-w-5xl items-start gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
            <aside className="rounded-2xl border border-line/15 bg-raise/80 p-5 lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.17em] text-acc">In this article</p>
              <nav aria-label="Article sections" className="mt-4 space-y-3">
                <a href="#article-start" className="block text-sm leading-snug text-fg/75 transition hover:text-acc">Overview</a>
                {sections.map((section) => (
                  <a key={section.index} href={`#section-${section.index}`} className="block text-sm leading-snug text-fg/75 transition hover:text-acc">
                    {section.h}
                  </a>
                ))}
              </nav>
              <div className="mt-5 border-t border-line/15 pt-4 text-xs leading-relaxed text-fg/55">
                <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-acc" /> {post.read}</span>
                <a href="/blog" className="mt-3 inline-flex items-center gap-1.5 font-semibold text-acc">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Insights
                </a>
              </div>
            </aside>
            <div id="article-start" className="min-w-0 space-y-9 scroll-mt-28">
              {post.content.map((block, i) => (
                <section key={i} id={`section-${i}`} className="scroll-mt-28">
                  {block.h && (
                    <h2 className="mb-4 font-display text-2xl font-bold leading-tight tracking-tight text-fg sm:text-3xl">
                      {block.h}
                    </h2>
                  )}
                  <p className={`leading-[1.95] text-fg/80 ${i === 0 ? "text-lg" : "text-base sm:text-[17px]"}`}>{block.p}</p>
                </section>
              ))}
              <div className="rounded-2xl border border-acc/20 bg-acc/[0.06] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-acc">Explore further</p>
                <h3 className="mt-2 font-display text-xl font-bold text-fg">Turn insights into action.</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg/70">
                  Explore Budgetree's rewards, loyalty and payments solutions, or connect with our team to discuss your business needs.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href="/solutions" className="inline-flex items-center gap-2 rounded-full bg-volt px-5 py-2.5 text-sm font-bold text-coal">Explore solutions <ArrowRight className="h-4 w-4" /></a>
                  <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-line/20 px-5 py-2.5 text-sm font-semibold text-fg">Contact our team</a>
                </div>
              </div>
            </div>
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
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border-b border-line/10 bg-sunken/30 p-3">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="h-full w-full rounded-xl object-contain transition-transform duration-700 group-hover:scale-[1.025]"
                    />
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
