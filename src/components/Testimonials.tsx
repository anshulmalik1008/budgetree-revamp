"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { EASE, Reveal, SectionTag, cn } from "./ui";

const QUOTES = [
  {
    quote:
      "BudgeTree made our employee appreciation program effortless. The platform is super user-friendly — our HR team needed zero training.",
    name: "Ananya Rao",
    role: "Head of People · BFSI",
    initials: "AR",
    color: "#CDFB47",
  },
  {
    quote:
      "Our employees love BudgeTree! We saw a huge increase in engagement thanks to seamless UPI rewards that just land in bank accounts.",
    name: "Vikram Mehta",
    role: "CHRO · Retail",
    initials: "VM",
    color: "#8CF0B3",
  },
  {
    quote:
      "Real-time payouts and clear reporting gave leadership the confidence to scale incentives across every region we operate in.",
    name: "Sarah D'Souza",
    role: "Sales Ops Director · Pharma",
    initials: "SD",
    color: "#C9B8FF",
  },
  {
    quote:
      "We replaced three vendors with BudgeTree. Campaign launches went from weeks of coordination to a single afternoon.",
    name: "Rahul Khanna",
    role: "Growth Head · D2C",
    initials: "RK",
    color: "#FFC24B",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (next: number, direction: number) => {
      setDir(direction);
      setIndex((next + QUOTES.length) % QUOTES.length);
    },
    []
  );

  useEffect(() => {
    const t = setInterval(() => go(index + 1, 1), 5600);
    return () => clearInterval(t);
  }, [index, go]);

  const q = QUOTES[index];

  return (
    <section id="customers" className="relative bg-contrast py-24 text-contrastfg sm:py-32">
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,black,transparent)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionTag index="06" label="Customer voices" dark />
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">
              What teams say{" "}
              <span className="font-serifit font-normal italic">
                after switching.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-8 flex items-center gap-4 rounded-3xl border border-contrastfg/10 bg-lift/70 p-5">
              <p className="font-display text-5xl font-bold">4.9</p>
              <div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-contrastfg text-contrastfg" />
                  ))}
                </div>
                <p className="mt-1.5 text-sm font-medium text-contrastfg/60">
                  Average rating · 98% renew year two
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => go(index - 1, -1)}
                aria-label="Previous testimonial"
                className="grid h-12 w-12 place-items-center rounded-full border-2 border-contrastfg/15 transition hover:border-contrastfg hover:bg-coal hover:text-paper"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(index + 1, 1)}
                aria-label="Next testimonial"
                className="grid h-12 w-12 place-items-center rounded-full bg-coal text-paper transition hover:bg-fern"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
              <div className="ml-2 flex gap-2">
                {QUOTES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i, i > index ? 1 : -1)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className="group p-1"
                  >
                    <span
                      className={cn(
                        "block h-1.5 rounded-full transition-all duration-300",
                        i === index ? "w-8 bg-contrastfg" : "w-3 bg-contrastfg/20 group-hover:bg-contrastfg/40"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="relative">
          <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] bg-coal p-8 text-paper shadow-card sm:min-h-[340px] sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-volt/15 blur-[100px]" />
            <Quote className="h-10 w-10 fill-volt text-volt" />
            <div className="relative mt-6 overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.figure
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: 60 * dir }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 * dir }}
                  transition={{ duration: 0.5, ease: EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70) go(index + 1, 1);
                    else if (info.offset.x > 70) go(index - 1, -1);
                  }}
                  style={{ touchAction: "pan-y" }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <blockquote className="font-serifit text-2xl italic leading-snug sm:text-[1.75rem]">
                    “{q.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span
                      className="grid shrink-0 place-items-center rounded-full text-sm font-bold text-coal"
                      style={{ background: q.color, height: 52, width: 52 }}
                    >
                      {q.initials}
                    </span>
                    <span>
                      <span className="block font-display text-base font-bold">{q.name}</span>
                      <span className="block text-sm text-paper/55">{q.role}</span>
                    </span>
                    <span className="ml-auto hidden gap-0.5 sm:flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                      ))}
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-paper/35">
              0{index + 1} — 0{QUOTES.length} · drag or use arrows
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
