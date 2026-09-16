"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Magnetic, Reveal } from "./ui";

/* Shared closing CTA used across content pages */
export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-base px-4 py-24 sm:px-6">
      <Reveal>
        <div className="noise relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-line/10 bg-gradient-to-b from-sunken to-raise px-6 py-16 text-center sm:px-12 sm:py-20">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
          <div className="glow-volt pointer-events-none absolute left-1/2 top-0 h-72 w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.0] tracking-tight text-fg sm:text-5xl">
              Ready to turn rewards into{" "}
              <span className="font-serifit font-normal italic text-acc">
                revenue?
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg/60 sm:text-lg">
              Book a 15-minute demo or talk to our team — most clients go live
              in under 24 hours.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <a
                  href="/demo"
                  className="group flex items-center gap-2.5 rounded-full bg-volt px-8 py-4 font-display text-base font-bold text-coal shadow-glow transition-colors hover:bg-paper"
                >
                  Book instant demo
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="/contact"
                  className="flex items-center gap-2 rounded-full border border-line/20 px-8 py-4 font-display text-base font-semibold text-fg transition hover:border-acc/60 hover:bg-line/5"
                >
                  <MessageCircle className="h-4 w-4 text-acc" />
                  Contact sales
                </a>
              </Magnetic>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-sm text-fg/45"
            >
              Response within one business day · No setup fees · Cancel anytime
            </motion.p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
