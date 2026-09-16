"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  Gift,
  Landmark,
  Receipt,
  Send,
  Smartphone,
  Sparkles,
  Star,
  Wallet,
  Zap,
} from "lucide-react";
import { EASE, Reveal, SectionTag, cn } from "./ui";

/* ---------------- Mini product visuals (pure CSS/Tailwind mock UI) ---------------- */

export function RewardXVisual() {
  return (
    <div className="w-full max-w-sm rounded-3xl border border-paper/10 bg-coal/70 p-5 shadow-card backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">
        Send a reward
      </p>
      <div className="mt-3 flex items-center gap-3 rounded-2xl bg-paper/5 p-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-volt text-sm font-bold text-coal">
          RS
        </span>
        <div>
          <p className="text-sm font-bold text-paper">Riya Sharma</p>
          <p className="text-xs text-paper/50">riya@company.com</p>
        </div>
        <BadgeCheck className="ml-auto h-5 w-5 text-volt" />
      </div>
      <div className="mt-3 flex gap-2">
        {["₹500", "₹1,000", "₹2,000"].map((a, i) => (
          <span
            key={a}
            className={cn(
              "flex-1 rounded-xl py-2 text-center text-sm font-bold",
              i === 1 ? "bg-volt text-coal" : "bg-paper/10 text-paper/70"
            )}
          >
            {a}
          </span>
        ))}
      </div>
      <motion.div
        initial={{ scale: 0.96, opacity: 0.6 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-volt py-3 text-sm font-bold text-coal"
      >
        <Send className="h-4 w-4" /> Delivered in 3s
      </motion.div>
      <div className="mt-3 flex items-center gap-2 text-xs text-mint">
        <span className="relative flex h-2 w-2">
          <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-mint" />
          <span className="h-2 w-2 rounded-full bg-mint" />
        </span>
        Email + SMS + WhatsApp delivery
      </div>
    </div>
  );
}

export function LoyaltyVisual() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="rounded-3xl bg-gradient-to-br from-lilac to-[#7C5CFF] p-5 text-coal shadow-card">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.2em]">LoyaltyX · Gold</p>
          <Star className="h-5 w-5 fill-ink" />
        </div>
        <p className="mt-4 font-display text-4xl font-bold">24,800</p>
        <p className="text-xs font-semibold opacity-70">points · worth ₹12,400</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-coal/20">
          <motion.div
            className="h-full rounded-full bg-coal"
            initial={{ width: 0 }}
            whileInView={{ width: "76%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
          />
        </div>
        <p className="mt-1.5 text-[11px] font-bold">76% to Platinum</p>
      </div>
      <div className="rounded-2xl border border-paper/10 bg-coal/70 p-4 backdrop-blur">
        {["Movie voucher unlocked", "2x weekend multiplier"].map((t) => (
          <div key={t} className="flex items-center gap-2 py-1 text-sm text-paper/80">
            <Sparkles className="h-4 w-4 shrink-0 text-lilac" /> {t}
          </div>
        ))}
      </div>
    </div>
  );
}

export function UpiVisual() {
  return (
    <div className="w-full max-w-sm rounded-3xl border border-paper/10 bg-coal/70 p-5 shadow-card backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold font-display text-lg font-bold text-coal">
          ₹
        </span>
        <div>
          <p className="font-display text-lg font-bold text-paper">₹1,000 received</p>
          <p className="text-xs text-paper/50">UPI Cash Token · no app needed</p>
        </div>
      </div>
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        className="mt-4 flex items-center gap-3 rounded-2xl bg-gold/10 p-3"
      >
        <Smartphone className="h-5 w-5 text-gold" />
        <div className="text-xs">
          <p className="font-bold text-paper">One-tap claim link</p>
          <p className="text-paper/55">Sent via SMS · expires in 48h</p>
        </div>
        <span className="ml-auto rounded-full bg-gold px-3 py-1 text-xs font-bold text-coal">
          Claim
        </span>
      </motion.div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {["Instant", "Secure", "App-free"].map((t) => (
          <span key={t} className="rounded-lg bg-paper/5 py-1.5 text-[11px] font-bold text-paper/70">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PayoutVisual() {
  const rows = [
    { n: "Ankit V.", a: "₹8,500", s: "Paid" },
    { n: "Meera K.", a: "₹12,000", s: "Paid" },
    { n: "Rohan D.", a: "₹5,200", s: "Processing" },
  ];
  return (
    <div className="w-full max-w-sm rounded-3xl border border-paper/10 bg-coal/70 p-5 shadow-card backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">
          Bulk payout · Diwali
        </p>
        <Landmark className="h-4 w-4 text-mint" />
      </div>
      <p className="mt-2 font-display text-3xl font-bold text-paper">
        2,400<span className="text-lg text-paper/50">/2,500</span>
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-mint to-volt"
          initial={{ width: 0 }}
          whileInView={{ width: "96%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        />
      </div>
      <div className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <motion.div
            key={r.n}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.45, ease: EASE }}
            className="flex items-center justify-between rounded-xl bg-paper/5 px-3 py-2 text-sm"
          >
            <span className="font-semibold text-paper/85">{r.n}</span>
            <span className="font-bold text-paper">{r.a}</span>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[11px] font-bold",
                r.s === "Paid" ? "bg-mint/15 text-mint" : "bg-gold/15 text-gold"
              )}
            >
              {r.s}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function BillVisual() {
  const bills = [
    { n: "Electricity · BSES", a: "₹1,840" },
    { n: "Mobile · Jio", a: "₹399" },
    { n: "Broadband · Airtel", a: "₹999" },
  ];
  return (
    <div className="w-full max-w-sm rounded-3xl border border-paper/10 bg-coal/70 p-5 shadow-card backdrop-blur">
      <div className="flex items-center gap-2">
        <Receipt className="h-5 w-5 text-sky" />
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/50">
          This month · 3 bills due
        </p>
      </div>
      <div className="mt-3 space-y-2">
        {bills.map((b, i) => (
          <motion.div
            key={b.n}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.4, ease: EASE }}
            className="flex items-center justify-between rounded-xl bg-paper/5 px-3 py-2.5 text-sm"
          >
            <span className="font-semibold text-paper/85">{b.n}</span>
            <span className="font-bold text-paper">{b.a}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-sky/10 px-4 py-3">
        <span className="text-sm font-bold text-paper">Pay all at once</span>
        <span className="rounded-full bg-sky px-4 py-1.5 text-xs font-bold text-coal">
          ₹3,238
        </span>
      </div>
    </div>
  );
}

/* ---------------- Stack data ---------------- */

const PRODUCTS = [
  {
    id: "rewardx",
    name: "RewardX",
    tagline: "Recognize. Reward. Repeat.",
    desc: "Effortless employee & customer recognition — auto-linked to email or phone, delivered instantly via email or SMS.",
    features: ["Auto-linked rewards", "Split, stack or redeem", "Instant delivery"],
    bg: "bg-gradient-to-br from-[#1E3527] via-[#14231B] to-[#0C1512]",
    glow: "bg-volt/20",
    chip: "bg-volt text-coal",
    icon: Gift,
    Visual: RewardXVisual,
  },
  {
    id: "loyaltyx",
    name: "LoyaltyX",
    tagline: "Smart loyalty. Instant rewards.",
    desc: "AI-powered redemption tailored for every customer, every time — fully white-labeled for your brand.",
    features: ["Plug & play integration", "White-labeled experience", "Dynamic rewards catalog"],
    bg: "bg-gradient-to-br from-[#2A2145] via-[#1C1830] to-[#0C1512]",
    glow: "bg-lilac/20",
    chip: "bg-lilac text-coal",
    icon: Sparkles,
    Visual: LoyaltyVisual,
  },
  {
    id: "upi-rewards",
    name: "UPI Rewards",
    tagline: "Instant. Effortless. Secure.",
    desc: "Cash rewards via UPI in seconds — one link, no app or sign-up. Straight to any bank account.",
    features: ["Instant UPI transfers", "Frictionless redemption", "Trusted & secure"],
    bg: "bg-gradient-to-br from-[#3A2E14] via-[#241D0E] to-[#0C1512]",
    glow: "bg-gold/20",
    chip: "bg-gold text-coal",
    icon: Zap,
    Visual: UpiVisual,
  },
  {
    id: "payouts",
    name: "Payouts",
    tagline: "Fast. Flexible. Trusted.",
    desc: "Bulk and individual payouts to bank, UPI or wallet — encrypted, compliant and fully transparent.",
    features: ["Lightning-fast disbursal", "UPI · bank · wallet", "Secure & compliant"],
    bg: "bg-gradient-to-br from-[#123527] via-[#0E231C] to-[#0C1512]",
    glow: "bg-mint/20",
    chip: "bg-mint text-coal",
    icon: Wallet,
    Visual: PayoutVisual,
  },
  {
    id: "bill-payments",
    name: "Bill Payments",
    tagline: "Every bill. One flow.",
    desc: "Utilities, mobile and broadband in a single dashboard — pay your way with UPI, cards or net banking.",
    features: ["One-tap bill pay", "Every payment mode", "Real-time tracking"],
    bg: "bg-gradient-to-br from-[#173042] via-[#101F2B] to-[#0C1512]",
    glow: "bg-sky/20",
    chip: "bg-sky text-coal",
    icon: Receipt,
    Visual: BillVisual,
  },
];

export default function ProductStack() {
  return (
    <section id="products" className="relative bg-base py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTag index="03" label="Product suite" />
        <div className="mt-5 max-w-3xl">
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-paper sm:text-5xl lg:text-6xl">
              One complete stack for{" "}
              <span className="font-serifit font-normal italic text-acc">
                all things rewards.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-base leading-relaxed text-paper/60 sm:text-lg">
              Scroll through the suite — every product shares one dashboard,
              one API and one catalog. Keep scrolling, they stack.
            </p>
          </Reveal>
        </div>

        {/* Sticky stacking cards — Pine Labs style */}
        <div className="mt-14 space-y-8 pb-8">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.id}
              className="sticky"
              style={{ top: `${96 + i * 30}px` }}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-[2rem] border border-paper/10 shadow-card",
                  p.bg
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[110px]",
                    p.glow
                  )}
                />
                <span className="text-stroke-paper pointer-events-none absolute -top-4 right-6 select-none font-display text-[7rem] font-bold leading-none opacity-40 sm:text-[9rem]">
                  0{i + 1}
                </span>
                <div className="relative grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-2 lg:gap-6 lg:p-12">
                  <div>
                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em]",
                        p.chip
                      )}
                    >
                      <p.icon className="h-4 w-4" /> {p.name}
                    </span>
                    <h3 className="mt-5 font-display text-3xl font-bold text-paper sm:text-4xl lg:text-5xl">
                      {p.tagline}
                    </h3>
                    <p className="mt-4 max-w-md leading-relaxed text-paper/65">
                      {p.desc}
                    </p>
                    <ul className="mt-6 space-y-2.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm font-medium text-paper/85">
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-paper/10">
                            <Check className="h-3.5 w-3.5 text-volt" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`/products/${p.id}`}
                      className="group mt-7 inline-flex items-center gap-2 font-display text-sm font-bold text-paper"
                    >
                      <span className="border-b-2 border-volt/60 pb-0.5 transition group-hover:border-volt">
                        Explore {p.name}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-volt transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                  <div className="grid place-items-center rounded-3xl bg-coal/25 p-6 sm:p-8">
                    <p.Visual />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
