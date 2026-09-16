"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Scale } from "lucide-react";
import { useParams } from "next/navigation";
import { LEGAL, getLegal } from "@/data/legal";
import { EASE, Reveal, cn } from "@/components/ui";

export default function LegalPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const doc = getLegal(slug);

  if (!doc) {
    return (
      <main className="grid min-h-[70vh] place-items-center px-4 pt-32">
        <div className="text-center">
          <p className="font-display text-7xl font-bold text-fg/20">404</p>
          <h1 className="mt-4 font-display text-3xl font-bold text-fg">Document not found</h1>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {LEGAL.map((l) => (
              <a
                key={l.slug}
                href={`/legal/${l.slug}`}
                className="rounded-full border border-line/15 px-4 py-2 text-sm font-semibold text-fg/70 transition hover:border-acc/60 hover:text-fg"
              >
                {l.title}
              </a>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-hidden">
      <section className="relative pb-24 pt-36 sm:pt-40">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_45%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-1.5 text-sm text-fg/50"
          >
            <a href="/" className="transition hover:text-fg">Home</a>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-semibold text-fg">Legal</span>
          </motion.nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            {/* Sticky intro */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
                className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-volt text-coal shadow-glow"
              >
                <Scale className="h-7 w-7" />
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
                className="mt-5 font-display text-4xl font-bold leading-[1.0] tracking-tight text-fg sm:text-5xl"
              >
                {doc.title}
              </motion.h1>
              <p className="mt-3 text-sm font-semibold text-fg/45">{doc.updated}</p>
              <p className="mt-5 max-w-sm leading-relaxed text-fg/65">{doc.intro}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {LEGAL.map((l) => (
                  <a
                    key={l.slug}
                    href={`/legal/${l.slug}`}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs font-bold transition",
                      l.slug === doc.slug
                        ? "border-volt bg-volt text-coal"
                        : "border-line/15 text-fg/60 hover:border-line/30 hover:text-fg"
                    )}
                  >
                    {l.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-5">
              {doc.sections.map((s, i) => (
                <Reveal key={s.h} delay={i * 0.06}>
                  <section className="rounded-3xl border border-line/10 bg-raise p-7 sm:p-8">
                    <h2 className="font-display text-xl font-bold text-fg">{s.h}</h2>
                    <div className="mt-4 space-y-3">
                      {s.body.map((p, j) => (
                        <p key={j} className="text-sm leading-[1.85] text-fg/65">
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
              <Reveal>
                <p className="rounded-2xl bg-line/5 p-5 text-sm leading-relaxed text-fg/55">
                  Questions about this document? Write to{" "}
                  <a href="mailto:legal@budgetree.in" className="font-semibold text-acc">
                    legal@budgetree.in
                  </a>{" "}
                  — we&apos;re happy to clarify anything before you sign up.
                </p>
              </Reveal>
              <a
                href="/demo"
                className="inline-flex items-center gap-2 rounded-full bg-volt px-6 py-3 font-display text-sm font-bold text-coal shadow-glow transition hover:bg-paper"
              >
                <ArrowLeft className="h-4 w-4 rotate-180" /> Ready when you are — book a demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
