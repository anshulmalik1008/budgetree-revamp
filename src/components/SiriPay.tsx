"use client";

import { ArrowUpRight, Gift, Sparkles, ShieldCheck, ShoppingBag, Plane, UtensilsCrossed, Shirt } from "lucide-react";
import { Magnetic, Reveal } from "./ui";

const SITE = "https://siripay.co/";

const VOUCHERS = [
  { title: "Food & Dining", description: "Explore dining gift cards", image: "/images/live/gift-food.jpg", icon: UtensilsCrossed },
  { title: "Fashion", description: "Style, shopping and gifting", image: "/images/live/gift-fashion.jpg", icon: Shirt },
  { title: "Shopping", description: "Gifts for every occasion", image: "/images/live/gift-shopping.jpg", icon: ShoppingBag },
  { title: "Travel", description: "Experiences and getaways", image: "/images/live/gift-travel.jpg", icon: Plane },
];

function WebsitePreview() {
  return (
    <a
      href={SITE}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open the real SiriPay marketplace"
      className="group relative mx-auto block w-full max-w-[390px] overflow-hidden rounded-[28px] border-[5px] border-[#14201A] bg-[#F8F6FB] shadow-[0_25px_70px_rgba(0,0,0,0.24)] transition-transform duration-500 hover:-translate-y-2 sm:max-w-[420px] lg:max-w-[410px]"
    >
      <div className="flex h-9 items-center gap-2 border-b border-black/10 bg-[#101715] px-3 text-white">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF625A]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#F8C34A]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#58C879]" />
        <div className="ml-2 flex h-5 flex-1 items-center justify-center rounded-md bg-white/10 px-3 text-[10px] text-white/70">siripay.co</div>
        <ArrowUpRight className="h-3.5 w-3.5 text-white/80" />
      </div>
      {/* Preserve the entire uploaded portal screenshot: never crop it using object-cover. */}
      <div className="relative flex w-full items-center justify-center overflow-hidden bg-[#F8F6FB]">
        <img
          src="/images/portals/siripay.webp"
          alt="Complete SiriPay mobile portal screenshot"
          loading="lazy"
          className="block h-auto max-h-[650px] w-full object-contain object-center sm:max-h-[690px]"
        />
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-black/10 bg-white px-4 py-3 text-[#15201A]">
        <span className="text-xs font-bold sm:text-sm">Explore the real SiriPay experience</span>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#17211A] px-3 py-2 text-[11px] font-bold text-white transition-colors group-hover:bg-[#285342]">
          Open <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </a>
  );
}

function GiftCardMarquee() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#D8FF6B]/95 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#B9F4C6]/95 to-transparent sm:w-24" />
      <div className="sip-image-track flex w-max gap-5 py-4">
        {[...VOUCHERS, ...VOUCHERS].map((voucher, index) => {
          const Icon = voucher.icon;
          return (
            <a
              href={SITE}
              target="_blank"
              rel="noopener noreferrer"
              key={`${voucher.title}-${index}`}
              className="group relative block w-[260px] shrink-0 overflow-hidden rounded-[24px] border border-white/70 bg-white text-coal shadow-[0_14px_32px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:-translate-y-2 sm:w-[325px]"
            >
              <div className="relative h-[162px] overflow-hidden sm:h-[190px]">
                <img src={voucher.image} alt={voucher.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-2xl bg-white/90 text-coal shadow-md backdrop-blur">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div>
                  <p className="font-display text-lg font-extrabold">{voucher.title}</p>
                  <p className="mt-1 text-xs font-medium text-coal/60">{voucher.description}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-coal text-white transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function SiriPay() {
  return (
    <section className="relative overflow-hidden bg-base px-4 pb-24 sm:px-6 sm:pb-32">
      <style>{`
        @keyframes sipImageMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .sip-image-track { animation: sipImageMarquee 28s linear infinite; will-change: transform; }
        .sip-image-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .sip-image-track { animation: none; } }
      `}</style>
      <Reveal>
        <div className="noise relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-volt via-[#D8FF6B] to-mint py-11 text-coal sm:py-16">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-white/25 blur-3xl" />
          <div className="relative z-10 grid items-center gap-12 px-7 sm:px-12 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:px-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-coal px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-volt">
                <Gift className="h-4 w-4" /> SiriPay · by Budgetree
              </span>
              <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.03] tracking-tight sm:text-5xl lg:text-[3.5rem]">
                The real SiriPay <span className="font-serifit font-normal italic">gifting experience.</span>
              </h2>
              <p className="mt-5 max-w-lg text-base font-medium leading-relaxed text-coal/70 sm:text-lg">
                Explore digital gift cards, shopping offers, dining, travel and experiences on the SiriPay marketplace.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {["Gift Cards", "Experiences", "Travel", "Shopping"].map((item) => (
                  <span key={item} className="rounded-full border border-coal/15 bg-white/35 px-3.5 py-2 text-xs font-bold text-coal/75">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a href={SITE} target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full bg-coal px-7 py-4 font-display text-base font-bold text-paper shadow-xl transition hover:-translate-y-1">
                    Explore SiriPay
                    <ArrowUpRight className="h-5 w-5 text-volt transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </Magnetic>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-coal/65">
                  <ShieldCheck className="h-4 w-4" /> Digital gifting marketplace
                </span>
              </div>
            </div>
            <div className="relative min-w-0 w-full">
              <div className="absolute -right-1 -top-4 z-20 flex items-center gap-2 rounded-2xl border border-white/50 bg-white/90 px-4 py-3 text-xs font-bold text-coal shadow-xl backdrop-blur-lg">
                <Sparkles className="h-4 w-4 text-[#E74692]" /> Actual SiriPay portal
              </div>
              <WebsitePreview />
              <p className="mt-3 text-center text-xs font-semibold text-coal/55">A look inside the SiriPay marketplace</p>
            </div>
          </div>
          <div className="relative z-10 mt-16">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3 px-7 sm:px-12 lg:px-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-coal/55">Explore categories</p>
                <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">Discover gifting on SiriPay</h3>
              </div>
              <p className="rounded-full border border-coal/15 bg-white/30 px-4 py-2 text-xs font-bold text-coal/70">Hover to pause</p>
            </div>
            <GiftCardMarquee />
            <div className="mt-7 text-center">
              <a href={SITE} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b-2 border-coal pb-1 text-sm font-extrabold transition-opacity hover:opacity-60">
                View SiriPay gift cards <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
