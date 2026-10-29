"use client";

import { Sparkle } from "lucide-react";
import { useState } from "react";
import { Reveal, cn } from "./ui";

type Brand = {
  name: string;
  domain?: string;
  svg?: string;
  color?: string;
};

const ROW_1: Brand[] = [
  { name: "Pine Labs", domain: "pinelabs.com" },
  { name: "IDFC FIRST", domain: "idfcfirstbank.com" },
  { name: "DBS Bank", domain: "dbs.com" },
  { name: "Razorpay", domain: "razorpay.com", svg: "razorpay", color: "#0B72E7" },
  { name: "Amazon", domain: "amazon.in", svg: "amazon", color: "#FF9900" },
  { name: "Flipkart", domain: "flipkart.com", svg: "flipkart", color: "#2874F0" },
  { name: "Google Wallet", domain: "wallet.google", svg: "googlewallet", color: "#4285F4" },
  { name: "Myntra", domain: "myntra.com", svg: "myntra", color: "#FF3E6C" },
  { name: "Canara Bank", domain: "canarabank.com" },
  { name: "Slice", domain: "sliceit.com" },
  { name: "Lava", domain: "lavamobiles.com" },
  { name: "Lifestyle", domain: "lifestylestores.com" },
];

const ROW_2: Brand[] = [
  { name: "RED FM", domain: "redfmindia.in" },
  { name: "Cipla", domain: "cipla.com" },
  { name: "JSW Paints", domain: "jswpaints.in" },
  { name: "Astral Pipes", domain: "astralpipes.com" },
  { name: "Welspun", domain: "welspun.com" },
  { name: "Sky Decor", domain: "skydecor.in" },
  { name: "Ground Truth", domain: "groundtruth.com" },
  { name: "Aranca", domain: "aranca.com" },
  { name: "Omnism" },
];

/* SVGs stay sharp at any screen resolution; other brands use their site's icon.
   For logos without a reliable public vector, text branding is kept as fallback. */
function PartnerLogo({ brand }: { brand: Brand }) {
  const [fallback, setFallback] = useState(false);
  const [failed, setFailed] = useState(false);
  const primary = brand.svg
    ? `https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/${brand.svg}.svg`
    : brand.domain
      ? `https://www.google.com/s2/favicons?domain=${brand.domain}&sz=256`
      : null;
  const secondary = brand.svg && brand.domain
    ? `https://www.google.com/s2/favicons?domain=${brand.domain}&sz=256`
    : null;
  const source = fallback ? secondary : primary;

  return (
    <div className="flex h-full items-center justify-center gap-3">
      {source && !failed && (
        <img
          src={source}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={62}
          height={62}
          onError={() => {
            if (!fallback && secondary) setFallback(true);
            else setFailed(true);
          }}
          className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
          style={brand.svg && !fallback && brand.color
            ? { filter: "none" }
            : undefined}
        />
      )}
      <span className="max-w-[155px] text-center font-display text-base font-extrabold leading-tight text-[#20262A] sm:text-lg">
        {brand.name}
      </span>
    </div>
  );
}

function BrandRow({
  brands,
  reverse = false,
}: {
  brands: Brand[];
  reverse?: boolean;
}) {
  const list = [...brands, ...brands];
  return (
    <div className="marquee-paused overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div
        className={cn(
          "flex w-max gap-4 py-2 will-change-transform",
          reverse ? "animate-marquee-rev" : "animate-marquee-slow"
        )}
      >
        {list.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="group flex h-[100px] w-[250px] shrink-0 items-center justify-center rounded-[22px] border border-black/10 bg-white px-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-acc/40 hover:shadow-lg sm:h-[114px] sm:w-[270px]"
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
