"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Gift, Zap } from "lucide-react";
import { Magnetic, Reveal } from "./ui";

export default function CtaFooter() {
  return (
    <section id="cta" className="relative overflow-hidden bg-base px-4 pb-24 sm:px-6">
      <Reveal>
        <div className="noise relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-line/10 bg-gradient-to-b from-sunken to-raise px-6 py-20 text-center sm:px-12 sm:py-28">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full glow-volt" />

          {/* Floating chips */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [-6, -3, -6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-6 top-10 hidden items-center gap-2 rounded-2xl border border-line/10 bg-base/70 px-4 py-3 lg:flex"
          >
            <Gift className="h-5 w-5 text-acc" />
            <span className="text-sm font-bold text-fg">₹2,000 gift card</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0], rotate: [5, 8, 5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12 right-8 hidden items-center gap-2 rounded-2xl border border-line/10 bg-base/70 px-4 py-3 lg:flex"
          >
            <Zap className="h-5 w-5 text-honey" />
            <span className="text-sm font-bold text-fg">UPI · settled in 3s</span>
          </motion.div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-acc/30 bg-acc/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-acc">
              <BadgeCheck className="h-4 w-4" /> Join 250+ enterprises
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.0] tracking-tight text-fg sm:text-6xl">
              Launch your first campaign in{" "}
              <span className="font-serifit font-normal italic text-acc">
                under 24 hours.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg/60 sm:text-lg">
              See RewardX, LoyaltyX and instant UPI payouts running on your
              own data — in a 20-minute personalized demo.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <a
                  href="/demo"
                  className="group flex items-center gap-2.5 rounded-full bg-volt px-8 py-4 font-display text-base font-bold text-coal shadow-glow transition-colors hover:bg-paper"
                >
                  Book Instant Demo
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#roi"
                  className="rounded-full border border-line/20 px-8 py-4 font-display text-base font-semibold text-fg transition hover:border-acc/60 hover:bg-line/5"
                >
                  Calculate your ROI
                </a>
              </Magnetic>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-fg/50">
              {["No setup fees", "Cancel anytime", "Free onboarding"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <BadgeCheck className="h-4 w-4 text-jade" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
