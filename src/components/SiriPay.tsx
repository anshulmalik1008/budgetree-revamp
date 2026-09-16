"use client";

import { ArrowUpRight, BadgePercent, Gift, Timer, WalletCards } from "lucide-react";
import { Magnetic, Reveal, Tilt } from "./ui";

const PERKS = [
  { icon: WalletCards, big: "350+", small: "Digital gift cards" },
  { icon: BadgePercent, big: "54%", small: "Discounts up to" },
  { icon: Timer, big: "24-hr", small: "Express delivery" },
];

export default function SiriPay() {
  return (
    <section className="relative bg-base px-4 pb-24 sm:px-6 sm:pb-32">
      <Reveal>
        <div className="noise relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-volt via-[#D8FF6B] to-mint p-8 text-coal sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/40 blur-[100px]" />
          <Gift className="pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rotate-12 text-coal/10" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-coal px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-volt">
                <Gift className="h-3.5 w-3.5" /> Siri Pay · by BudgeTree
              </span>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.0] tracking-tight sm:text-5xl lg:text-6xl">
                Smarter gifting,{" "}
                <span className="font-serifit font-normal italic">
                  made simple.
                </span>
              </h2>
              <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-coal/70 sm:text-lg">
                350+ gift cards for employee rewards or personal gifting —
                top brands, delivered fast.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                {PERKS.map((p) => (
                  <div
                    key={p.small}
                    className="rounded-2xl bg-coal/[0.07] p-3 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 sm:p-4"
                  >
                    <p.icon className="h-5 w-5" />
                    <p className="mt-2 font-display text-xl font-bold sm:text-2xl">{p.big}</p>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-coal/60 sm:text-xs">
                      {p.small}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {["Amazon", "Flipkart", "Myntra", "Swiggy", "Zomato", "+345"].map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-coal/20 px-4 py-1.5 text-sm font-bold"
                  >
                    {b}
                  </span>
                ))}
              </div>

              <Magnetic className="mt-8">
                <a
                  href="/demo"
                  className="group inline-flex items-center gap-2 rounded-full bg-coal px-7 py-4 font-display text-base font-bold text-paper transition-transform hover:scale-[1.02]"
                >
                  Visit SiriPay
                  <ArrowUpRight className="h-5 w-5 text-volt transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Magnetic>
            </div>

            {/* Tilt gift cards */}
            <Tilt className="mx-auto w-full max-w-md" max={12}>
              <div className="relative h-[380px] sm:h-[440px]">
                <div className="absolute left-1/2 top-6 w-64 -translate-x-1/2 rotate-[-8deg] rounded-3xl bg-coal p-5 text-paper shadow-card transition-transform duration-500 hover:rotate-[-4deg] sm:w-72">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-volt">
                    Amazon
                  </p>
                  <p className="mt-8 font-display text-3xl font-bold">₹5,000</p>
                  <div className="mt-4 flex items-end justify-between">
                    <div className="flex gap-1">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <span key={i} className="h-6 w-[3px] rounded bg-paper/70" style={{ opacity: 0.35 + (i % 4) * 0.2 }} />
                      ))}
                    </div>
                    <Gift className="h-6 w-6 text-volt" />
                  </div>
                </div>
                <div className="absolute bottom-10 left-1/2 w-64 -translate-x-1/2 rotate-[6deg] rounded-3xl border-2 border-coal bg-cream p-5 shadow-card transition-transform duration-500 hover:rotate-[2deg] sm:w-72">
                  <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-coal/60">
                    Flipkart
                  </p>
                  <p className="mt-8 font-display text-3xl font-bold">₹2,500</p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-coal/10">
                    <div className="h-full w-2/3 rounded-full bg-coal" />
                  </div>
                </div>
                <div className="absolute right-2 top-2 animate-float rounded-2xl bg-coal px-4 py-3 text-paper shadow-card sm:right-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-volt">Saved</p>
                  <p className="font-display text-xl font-bold">₹1,240</p>
                </div>
                <div className="absolute bottom-2 left-2 animate-float2 rounded-2xl bg-cream px-4 py-3 shadow-card sm:left-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-coal/60">
                    Delivered
                  </p>
                  <p className="font-display text-xl font-bold">in 3 secs</p>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
