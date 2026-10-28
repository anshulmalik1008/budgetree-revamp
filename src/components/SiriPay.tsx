
"use client";

import {
  ArrowUpRight,
  BadgePercent,
  Gift,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Magnetic, Reveal } from "./ui";

const PERKS = [
  {
    icon: Gift,
    big: "357",
    small: "Listed brands",
  },
  {
    icon: BadgePercent,
    big: "Exclusive",
    small: "Brand discounts",
  },
  {
    icon: Zap,
    big: "Instant",
    small: "Digital delivery",
  },
];

const CARDS = [
  {
    name: "Flipkart",
    offer: "2% OFF",
    category: "Shopping",
    colors: "from-[#1456D9] via-[#2875F0] to-[#65B4FF]",
    text: "text-white",
    letter: "f",
    accent: "bg-[#FFE500] text-[#1555CF]",
  },
  {
    name: "Myntra",
    offer: "3.5% OFF",
    category: "Fashion",
    colors: "from-[#FF527B] via-[#FF7B54] to-[#FFB36B]",
    text: "text-white",
    letter: "M",
    accent: "bg-white text-[#E94773]",
  },
  {
    name: "Zomato",
    offer: "2.25% OFF",
    category: "Food & Dining",
    colors: "from-[#A90917] via-[#E23744] to-[#FF6972]",
    text: "text-white",
    letter: "z",
    accent: "bg-white text-[#E23744]",
  },
  {
    name: "Starbucks",
    offer: "8% OFF",
    category: "Coffee & Dining",
    colors: "from-[#064D37] via-[#00754A] to-[#22976D]",
    text: "text-white",
    letter: "S",
    accent: "bg-white text-[#00754A]",
  },
  {
    name: "MakeMyTrip",
    offer: "6.25% OFF",
    category: "Travel",
    colors: "from-[#063D84] via-[#1575CF] to-[#35B5E5]",
    text: "text-white",
    letter: "M",
    accent: "bg-white text-[#1268C1]",
  },
  {
    name: "Nykaa",
    offer: "6% OFF",
    category: "Beauty & Lifestyle",
    colors: "from-[#7E164F] via-[#C42B77] to-[#F17BA7]",
    text: "text-white",
    letter: "N",
    accent: "bg-white text-[#C42B77]",
  },
];

type GiftCard = (typeof CARDS)[number];

function SlidingGiftCard({ card }: { card: GiftCard }) {
  return (
    <div
      className={`group relative h-[215px] w-[320px] shrink-0 overflow-hidden rounded-[26px] bg-gradient-to-br ${card.colors} ${card.text} p-6 shadow-[0_18px_45px_rgba(0,0,0,0.20)] transition-transform duration-500 hover:-translate-y-2 sm:h-[235px] sm:w-[355px]`}
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border-[32px] border-white/10" />
      <div className="pointer-events-none absolute -bottom-24 -left-12 h-56 w-56 rounded-full border-[28px] border-white/10" />
      <div className="pointer-events-none absolute right-8 top-20 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`grid h-12 w-12 place-items-center rounded-2xl ${card.accent} text-2xl font-black shadow-lg`}
            >
              {card.letter}
            </div>

            <div>
              <p className="font-display text-xl font-extrabold tracking-tight">
                {card.name}
              </p>
              <p className="text-xs font-medium text-white/75">
                {card.category}
              </p>
            </div>
          </div>

          <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-bold backdrop-blur-md">
            {card.offer}
          </span>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/65">
            Digital Gift Card
          </p>

          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="font-display text-2xl font-bold">
                Gift something great.
              </p>
              <p className="mt-1 text-xs text-white/75">
                Explore on SiriPay
              </p>
            </div>

            <div className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/15 backdrop-blur-md">
              <Gift className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SiriPay() {
  return (
    <section className="relative overflow-hidden bg-base px-4 pb-24 sm:px-6 sm:pb-32">
      <style>{`
        @keyframes siripay-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes siripay-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .siripay-marquee {
          animation: siripay-marquee 34s linear infinite;
          width: max-content;
          will-change: transform;
        }

        .siripay-marquee:hover {
          animation-play-state: paused;
        }

        .siripay-float {
          animation: siripay-float 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .siripay-marquee,
          .siripay-float {
            animation: none;
          }
        }
      `}</style>

      <Reveal>
        <div className="noise relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-volt via-[#D8FF6B] to-mint py-10 text-coal sm:py-14 lg:py-16">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/20 blur-3xl" />

          <Gift className="pointer-events-none absolute -right-12 top-12 h-64 w-64 rotate-12 text-coal/[0.04]" />

          {/* Heading */}
          <div className="relative z-10 px-8 sm:px-12 lg:px-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-coal px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-volt">
                  <Gift className="h-4 w-4" />
                  SiriPay · by Budgetree
                </span>

                <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  Every gift.
                  <br />
                  <span className="font-serifit font-normal italic">
                    A better experience.
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-coal/70 sm:text-lg">
                  Discover digital gift cards from leading brands
                  across shopping, food, fashion, travel and more.
                  Enjoy exclusive offers and convenient digital gifting.
                </p>

                <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
                  {PERKS.map((perk) => {
                    const Icon = perk.icon;

                    return (
                      <div
                        key={perk.small}
                        className="rounded-2xl border border-coal/10 bg-white/30 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/50 sm:p-4"
                      >
                        <Icon className="h-5 w-5" />

                        <p className="mt-3 font-display text-lg font-extrabold sm:text-2xl">
                          {perk.big}
                        </p>

                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-coal/60 sm:text-xs">
                          {perk.small}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <a
                      href="https://siripay.co/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 rounded-full bg-coal px-8 py-4 font-display text-base font-bold text-paper shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                      Explore SiriPay
                      <ArrowUpRight className="h-5 w-5 text-volt transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
                  </Magnetic>

                  <span className="inline-flex items-center gap-2 text-xs font-bold text-coal/65">
                    <ShieldCheck className="h-4 w-4" />
                    Secure digital gifting
                  </span>
                </div>
              </div>

              {/* Right feature visual */}
              <div className="relative hidden min-h-[330px] items-center justify-center lg:flex">
                <div className="siripay-float relative flex h-[290px] w-[290px] flex-col items-center justify-center rounded-[44px] border border-white/40 bg-coal p-8 text-center text-paper shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                  <div className="absolute -right-5 -top-5 grid h-20 w-20 rotate-12 place-items-center rounded-3xl bg-white text-coal shadow-xl">
                    <Gift className="h-10 w-10" />
                  </div>

                  <div className="grid h-20 w-20 place-items-center rounded-3xl bg-volt text-coal">
                    <Gift className="h-10 w-10" />
                  </div>

                  <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-volt">
                    Discover · Gift · Celebrate
                  </p>

                  <p className="mt-3 font-display text-3xl font-black">
                    SiriPay
                  </p>

                  <p className="mt-2 text-sm text-paper/60">
                    Digital Gift Card Marketplace
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 rounded-2xl bg-white px-5 py-4 text-coal shadow-xl">
                  <p className="text-xs font-bold text-coal/50">
                    Popular categories
                  </p>
                  <p className="mt-1 text-sm font-extrabold">
                    Shopping · Food · Travel
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sliding cards section */}
          <div className="relative z-10 mt-14 lg:mt-16">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 px-8 sm:px-12 lg:px-16">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-coal/55">
                  Explore the collection
                </p>

                <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
                  Gift cards worth exploring
                </h3>
              </div>

              <span className="rounded-full border border-coal/15 bg-white/30 px-4 py-2 text-xs font-bold text-coal/70">
                Hover to pause
              </span>
            </div>

            <div className="relative overflow-hidden">
              {/* Left and right fade */}
              <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[#D8FF6B]/90 to-transparent sm:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[#D8FF6B]/90 to-transparent sm:w-24" />

              <div className="siripay-marquee flex">
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    className="flex shrink-0 gap-5 pr-5"
                    aria-hidden={copy === 1}
                  >
                    {CARDS.map((card) => (
                      <SlidingGiftCard
                        key={`${copy}-${card.name}`}
                        card={card}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 px-6">
              {[
                "Shopping",
                "Food & Dining",
                "Fashion",
                "Travel",
                "Beauty",
                "Entertainment",
              ].map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-coal/15 bg-white/25 px-4 py-2 text-xs font-bold text-coal/75 backdrop-blur-sm"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://siripay.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b-2 border-coal pb-1 text-sm font-extrabold transition-opacity hover:opacity-60"
              >
                View all gift cards
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
