"use client";

import { Sparkle } from "lucide-react";
import { useState } from "react";
import { Reveal, cn } from "./ui";

type Brand = {
  name: string;
  mark: string;
  color: string;
  icon?: string;
};

const ROW_1: Brand[] = [
  { name: "Pine Labs", mark: "P", color: "#00764E" },
  { name: "IDFC FIRST", mark: "F", color: "#A71930" },
  { name: "DBS Bank", mark: "DBS", color: "#E42535" },
  { name: "Razorpay", mark: "R", color: "#1468C9", icon: "razorpay" },
  { name: "Amazon", mark: "a", color: "#E18B00", icon: "amazon" },
  { name: "Flipkart", mark: "f", color: "#2874F0", icon: "flipkart" },
  { name: "Google Wallet", mark: "G", color: "#4285F4", icon: "googlewallet" },
  { name: "Myntra", mark: "M", color: "#E63C83", icon: "myntra" },
  { name: "Canara Bank", mark: "C", color: "#078BB7" },
  { name: "Slice", mark: "s", color: "#782BEA" },
  { name: "Lava", mark: "L", color: "#DE2C2C" },
  { name: "Lifestyle", mark: "L", color: "#C32C60" },
];

const ROW_2: Brand[] = [
  { name: "RED FM", mark: "RED", color: "#E02828" },
  { name: "Cipla", mark: "C", color: "#1476B9" },
  { name: "JSW Paints", mark: "JSW", color: "#14559C" },
  { name: "Astral Pipes", mark: "A", color: "#E23F35" },
  { name: "Welspun", mark: "W", color: "#0068A0" },
  { name: "Sky Decor", mark: "S", color: "#3A91C9" },
  { name: "Ground Truth", mark: "GT", color: "#305D65" },
  { name: "Aranca", mark: "A", color: "#D23C35" },
  { name: "Omnism", mark: "O", color: "#584ACB" },
];

function PartnerLogo({ brand }: { brand: Brand }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className="flex w-full items-center justify-center gap-4">
      <span
        className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/[0.06] bg-[#F7F8FA] font-display text-xl font-black sm:h-16 sm:w-16"
        style={{ color: brand.color }}
      >
        {brand.icon && !broken ? (
          <img
            src={`https://cdn.simpleicons.org/${brand.icon}/${brand.color.replace("#", "")}`}
            alt=""
            aria-hidden="true"
            width={48}
            height={48}
            loading="lazy"
            onError={() => setBroken(true)}
            className="h-10 w-10 object-contain sm:h-12 sm:w-12"
          />
        ) : (
          <span className={brand.mark.length > 1 ? "text-sm font-black" : "text-3xl font-black"}>
            {brand.mark}
          </span>
        )}
      </span>
      <span className="min-w-0 max-w-[165px] font-display text-lg font-extrabold leading-tight sm:text-xl" style={{ color: brand.color }}>
        {brand.name}
      </span>
    </div>
  );
}

function BrandRow({ brands, reverse = false }: { brands: Brand[]; reverse?: boolean }) {
  return (
    <div className="marquee-paused overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className={cn("flex w-max gap-4 py-2 will-change-transform", reverse ? "animate-marquee-rev" : "animate-marquee-slow")}>
        {[...brands, ...brands].map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="group flex h-[108px] w-[278px] shrink-0 items-center justify-center rounded-[22px] border border-[#E1E5E9] bg-white px-5 shadow-[0_5px_18px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#BDD64D] hover:shadow-lg sm:h-[120px] sm:w-[300px]"
          >
            <PartnerLogo brand={brand} />
          </div>
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
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-fg/60">Trusted by partners across India</p>
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

/* Existing ribbon animations preserved */
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
          "flex w-max items-center gap-6 pr-6 will-change-transform sm:gap-10 sm:pr-10",
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
