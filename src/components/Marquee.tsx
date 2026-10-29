"use client";

import { Sparkle } from "lucide-react";
import { useState } from "react";
import { Reveal, cn } from "./ui";

type Brand = { name: string; domain?: string; local: string };

const ROW_1: Brand[] = [
  { name: "Pine Labs", domain: "pinelabs.com", local: "pine-labs" },
  { name: "IDFC FIRST", domain: "idfcfirstbank.com", local: "idfc-first" },
  { name: "DBS Bank", domain: "dbs.com", local: "dbs" },
  { name: "Razorpay", domain: "razorpay.com", local: "razorpay" },
  { name: "Amazon", domain: "amazon.in", local: "amazon" },
  { name: "Flipkart", domain: "flipkart.com", local: "flipkart" },
  { name: "Google Wallet", domain: "wallet.google", local: "google-wallet" },
  { name: "Myntra", domain: "myntra.com", local: "myntra" },
  { name: "Canara Bank", domain: "canarabank.com", local: "canara-bank" },
  { name: "Slice", domain: "sliceit.com", local: "slice" },
  { name: "Lava", domain: "lavamobiles.com", local: "lava" },
  { name: "Lifestyle", domain: "lifestylestores.com", local: "lifestyle" },
];

const ROW_2: Brand[] = [
  { name: "RED FM", domain: "redfmindia.in", local: "red-fm" },
  { name: "Cipla", domain: "cipla.com", local: "cipla" },
  { name: "JSW Paints", domain: "jswpaints.in", local: "jsw-paints" },
  { name: "Astral Pipes", domain: "astralpipes.com", local: "astral-pipes" },
  { name: "Welspun", domain: "welspun.com", local: "welspun" },
  { name: "Sky Decor", domain: "skydecor.in", local: "sky-decor" },
  { name: "Ground Truth", domain: "groundtruth.com", local: "ground-truth" },
  { name: "Aranca", domain: "aranca.com", local: "aranca" },
  { name: "Omnism", local: "omnism" },
];

function PartnerLogo({ brand }: { brand: Brand }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const sources = [
    `/images/partners/${brand.local}.svg`,
    `/images/partners/${brand.local}.png`,
    ...(brand.domain ? [`https://cdn.brandfetch.io/${brand.domain}/logo.svg`] : []),
  ];
  const src = sources[sourceIndex];
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      {src ? (
        <img
          src={src}
          alt={brand.name}
          loading="lazy"
          className="h-[62px] w-full max-w-[205px] object-contain sm:h-[74px]"
          onError={() => setSourceIndex((n) => n + 1)}
        />
      ) : (
        <span className="text-center font-display text-xl font-extrabold tracking-tight text-[#17212B] sm:text-2xl">
          {brand.name}
        </span>
      )}
    </div>
  );
}

function BrandRow({ brands, reverse = false }: { brands: Brand[]; reverse?: boolean }) {
  return (
    <div className="marquee-paused overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className={cn("flex w-max gap-4 py-2 will-change-transform", reverse ? "animate-marquee-rev" : "animate-marquee-slow")}>
        {[...brands, ...brands].map((brand, i) => (
          <div key={`${brand.name}-${i}`} className="group flex h-[110px] w-[275px] shrink-0 items-center justify-center rounded-[22px] border border-[#DFE4E9] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:h-[122px] sm:w-[290px]">
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
          <p className="mt-2 font-display text-2xl font-bold text-fg sm:text-3xl">250+ enterprises run rewards on BudgeTree</p>
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
