"use client";

import { Sparkle } from "lucide-react";
import { Reveal, cn } from "./ui";

const ROW_1 = [
  "Pine Labs",
  "IDFC FIRST",
  "DBS Bank",
  "Razorpay",
  "amazon",
  "Flipkart",
  "Google Wallet",
  "Myntra",
];

const ROW_2 = [
  "Mahindra",
  "RED FM",
  "Cipla",
  "JSW Paints",
  "Astral Pipes",
  "Welspun",
  "Sky Decor",
  "Ground Truth",
];

function BrandRow({
  brands,
  reverse = false,
}: {
  brands: string[];
  reverse?: boolean;
}) {
  const list = [...brands, ...brands];
  return (
    <div className="marquee-paused overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className={cn(
          "flex w-max gap-4 py-2",
          reverse ? "animate-marquee-rev" : "animate-marquee-slow"
        )}
      >
        {list.map((b, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-2xl border border-line/10 bg-line/[0.04] px-7 py-3.5 font-display text-lg font-semibold text-fg/60 transition-colors duration-300 hover:border-acc/50 hover:text-fg"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LogoMarquee() {
  return (
    <section className="relative border-y border-line/8 bg-raise/40 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-fg/50">
            Trusted by partners across India
          </p>
          <p className="mt-2 font-display text-2xl font-bold text-fg sm:text-3xl">
            250+ enterprises run rewards on BudgeTree
          </p>
        </Reveal>
      </div>
      <div className="space-y-4">
        <BrandRow brands={ROW_1} />
        <BrandRow brands={ROW_2} reverse />
      </div>
    </section>
  );
}

/* Full-bleed marquee ribbon, Sanyam-portfolio style */
export function Strip({
  items,
  dark = false,
  reverse = false,
  fast = false,
  outline = false,
}: {
  items: string[];
  dark?: boolean;
  reverse?: boolean;
  fast?: boolean;
  outline?: boolean;
}) {
  const list = [...items, ...items, ...items, ...items];
  return (
    <div
      className={cn(
        "overflow-hidden border-y py-4 sm:py-5",
        dark ? "border-coal/10 bg-volt" : "border-line/10 bg-sunken/60"
      )}
    >
      <div
        className={cn(
          "flex w-max items-center gap-6 pr-6 sm:gap-10 sm:pr-10",
          reverse
            ? "animate-marquee-rev"
            : fast
              ? "animate-marquee-fast"
              : "animate-marquee"
        )}
      >
        {list.map((t, i) => (
          <span key={i} className="flex items-center gap-6 sm:gap-10">
            <span
              className={cn(
                "whitespace-nowrap font-display text-xl font-bold uppercase tracking-wide sm:text-2xl",
                dark ? "text-coal" : outline ? "text-stroke" : "text-fg/90"
              )}
            >
              {t}
            </span>
            <Sparkle
              className={cn(
                "h-5 w-5 shrink-0",
                dark ? "fill-coal text-coal" : "fill-acc text-acc"
              )}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
