"use client";

import { Sparkle } from "lucide-react";
import { useState } from "react";
import { Reveal, cn } from "./ui";

type Brand = { name: string; logo?: string; domain?: string; color?: string };

const ROW_1: Brand[] = [
  { name: "Lifestyle", domain: "lifestylestores.com", color: "#CC1756" },
  { name: "Pine Labs", domain: "pinelabs.com", color: "#075B43" },
  { name: "IDFC FIRST", domain: "idfcfirstbank.com", color: "#B21F32" },
  { name: "DBS Bank", domain: "dbs.com", color: "#E52330" },
  { name: "Razorpay", domain: "razorpay.com", color: "#175BB5" },
  { name: "Amazon", domain: "amazon.in", color: "#171E28" },
  { name: "Flipkart", domain: "flipkart.com", color: "#1B54B1" },
  { name: "Google Wallet", domain: "wallet.google", color: "#4285F4" },
  { name: "Myntra", domain: "myntra.com", color: "#F03C77" },
  { name: "Canara Bank", domain: "canarabank.com", color: "#178DB8" },
  { name: "Slice", domain: "sliceit.com", color: "#6B2CCF" },
  { name: "Lava", domain: "lavamobiles.com", color: "#D32B32" },
];

const ROW_2: Brand[] = [
  { name: "Aranca", logo: "https://img.sdcexec.com/files/base/acbm/sdce/image/2021/10/aranca_logo_0203.615f01fdc3736.png?fit=max&w=800", color: "#204A7E" },
  { name: "Sky Decor", logo: "https://www.skydecor.in/public/site/skydecor-logo.png", color: "#1B6A97" },
  { name: "Welspun", logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Welspun-word-logo.png", color: "#2256A5" },
  { name: "RED FM", logo: "https://cdn-radiotime-logos.tunein.com/p923503g.png", color: "#DB2328" },
  { name: "Cipla", logo: "https://invoicing.cipla.com/images/cipla-logo.png", color: "#117DB1" },
  { name: "JSW Paints", logo: "https://images.indianexpress.com/2025/06/JSW-Paints.jpg", color: "#1B4D9A" },
  { name: "Astral Pipes", logo: "https://media.assettype.com/freepressjournal/2026-05-18/hapu09ih/astral-ltd.jpg", color: "#E33C3C" },
  { name: "Ground Truth", logo: "https://mma.prnewswire.com/media/2714195/GroundTruth_Logo.jpg", color: "#1C8D69" },
  { name: "Omnism", logo: "https://avatarsapi.com/google-play/com.budgetree.omnism?size=800", color: "#403798" },
];

function PartnerLogo({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false);
  const src = brand.logo || (brand.domain ? `https://cdn.brandfetch.io/${brand.domain}/logo.svg` : undefined);
  return (
    <div className="flex h-full w-full items-center justify-center px-5">
      {src && !failed ? (
        <img
          src={src}
          alt={brand.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="block h-[75px] w-full max-w-[235px] object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-center font-display text-2xl font-extrabold tracking-tight sm:text-[27px]" style={{ color: brand.color || "#222" }}>
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
          <div key={`${brand.name}-${i}`} className="group flex h-[112px] w-[280px] shrink-0 items-center justify-center rounded-[22px] border border-[#E1E5E9] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:h-[128px] sm:w-[310px]">
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
