"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BatteryMedium,
  Bell,
  Check,
  Gift,
  Home,
  Loader2,
  MoreHorizontal,
  Play,
  Receipt,
  Send,
  Signal,
  Star,
  Trophy,
  User,
  Wallet,
  Wifi,
  Zap,
} from "lucide-react";
import { CountUp, EASE, Magnetic } from "./ui";

const WORDS = ["Engagement.", "Loyalty.", "Payouts.", "Growth."];

// Real portal screenshots supplied for the homepage phone preview.
// Place these files in public/images/portals/ (included in the assets ZIP).
const PORTAL_SCREENS = [
  { label: "SiriPay", image: "/images/portals/siripay.webp", color: "#E750AF" },
  { label: "Omnism", image: "/images/portals/omnism.webp", color: "#4DD3AD" },
  { label: "IntelliCore AI", image: "/images/portals/intellicore.webp", color: "#5BA0FF" },
  { label: "VyapaarX", image: "/images/portals/vyapaarx.webp", color: "#8D5AFF" },
  { label: "Business Portal", image: "/images/portals/business-portal.webp", color: "#B479FF" },
];

function PortalScreenCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % PORTAL_SCREENS.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[#101415]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 38, filter: "blur(8px)", scale: 1.04 }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, x: -38, filter: "blur(8px)", scale: 0.96 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={PORTAL_SCREENS[active].image}
            alt={`${PORTAL_SCREENS[active].label} portal screenshot`}
            className="h-full w-full object-contain"
          />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-black/30 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-3 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 pb-5 pt-14 text-white">
        <motion.div
          key={`label-${active}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-2"
        >
          <span className="truncate text-[12px] font-extrabold tracking-wide">
            {PORTAL_SCREENS[active].label}
          </span>
          <span className="rounded-full bg-white/20 px-2 py-1 text-[9px] font-bold backdrop-blur">
            {active + 1} / {PORTAL_SCREENS.length}
          </span>
        </motion.div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => { setPaused(true); setActive((i) => (i + PORTAL_SCREENS.length - 1) % PORTAL_SCREENS.length); }}
            aria-label="Previous portal screenshot"
            className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold hover:bg-white/35"
          >‹</button>
          <div className="flex items-center gap-1.5">
            {PORTAL_SCREENS.map((screen, i) => (
              <button
                key={screen.label}
                type="button"
                aria-label={`Show ${screen.label}`}
                onClick={() => { setActive(i); setPaused(true); }}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-volt" : "w-1.5 bg-white/50"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => { setPaused(true); setActive((i) => (i + 1) % PORTAL_SCREENS.length); }}
            aria-label="Next portal screenshot"
            className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold hover:bg-white/35"
          >›</button>
        </div>
      </div>
    </div>
  );
}


type FeedIcon = "payout" | "gift" | "points";
type FeedItem = { id: number; icon: FeedIcon; title: string; sub: string };

const POOL: Array<Omit<FeedItem, "id">> = [
  { icon: "payout", title: "Payout sent · ₹5,000", sub: "Riya S. · UPI · just now" },
  { icon: "gift", title: "Gift card redeemed", sub: "Amazon ₹2,000 · Arjun M." },
  { icon: "points", title: "+2,400 pts earned", sub: "LoyaltyX · Gold tier" },
  { icon: "payout", title: "Bulk payout · 1,200 people", sub: "Diwali Gifting · done" },
  { icon: "gift", title: "Reward delivered", sub: "Myntra ₹1,000 · via SMS" },
  { icon: "points", title: "NPS reward claimed", sub: "Survey · ₹500 UPI cash" },
];

const FEED_ICONS: Record<FeedIcon, typeof Wallet> = {
  payout: Wallet,
  gift: Gift,
  points: Star,
};

const STATS = [
  { end: 10, suffix: "M+", label: "Rewards marketplace" },
  { end: 99.99, decimals: 2, suffix: "%", label: "Enterprise uptime" },
  { end: 24, prefix: "<", suffix: "h", label: "Campaign go-live" },
  
];

const RING = 2 * Math.PI * 15;

/* Isolated so its 2.3s interval re-renders only this tiny span, not the hero */
function WordRotator() {
  const [word, setWord] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2300);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-block overflow-hidden pb-2 pr-3">
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-block font-serifit font-normal italic text-acc"
        >
          {WORDS[word]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* Isolated so the 2.8s feed tick re-renders only the feed, not the hero.
   Listens for "bt-feed" so the "send ₹1,000" simulator can push items in. */
function LiveFeed() {
  const idRef = useRef(2);
  const [items, setItems] = useState<FeedItem[]>([
    { ...POOL[0], id: 0 },
    { ...POOL[1], id: 1 },
  ]);

  useEffect(() => {
    let n = 2;
    const t = setInterval(() => {
      idRef.current += 1;
      const id = idRef.current;
      const p = POOL[n % POOL.length];
      setItems((prev) => [...prev.slice(-1), { ...p, id }]);
      n++;
    }, 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onPush = (e: Event) => {
      const detail = (e as CustomEvent<Omit<FeedItem, "id">>).detail;
      idRef.current += 1;
      const id = idRef.current;
      setItems((prev) => [...prev.slice(-1), { ...detail, id }]);
    };
    window.addEventListener("bt-feed", onPush);
    return () => window.removeEventListener("bt-feed", onPush);
  }, []);

  return (
    <div className="absolute -bottom-10 left-0 w-60 space-y-2 sm:left-2 sm:w-64">
      <AnimatePresence mode="popLayout">
        {items.map((item) => {
          const Icon = FEED_ICONS[item.icon];
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex items-center gap-2.5 rounded-xl border border-line/10 bg-raise/90 px-3 py-2.5 shadow-card"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-acc/15 text-acc">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-fg">{item.title}</p>
                <p className="truncate text-[11px] text-fg/55">{item.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const [sim, setSim] = useState<"idle" | "sending" | "done">("idle");

  function simulate() {
    if (sim !== "idle") return;
    setSim("sending");
    window.setTimeout(() => {
      setSim("done");
      window.dispatchEvent(
        new CustomEvent("bt-feed", {
          detail: {
            icon: "gift",
            title: "You sent ₹1,000",
            sub: "Test reward · delivered in 3s",
          },
        })
      );
      window.setTimeout(() => setSim("idle"), 2800);
    }, 1500);
  }

  /* Mouse parallax + phone tilt */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });

  const tiltX = useSpring(useTransform(sy, [-0.5, 0.5], [11, 1]), {
    stiffness: 60,
    damping: 18,
  });
  const tiltY = useSpring(useTransform(sx, [-0.5, 0.5], [-24, -8]), {
    stiffness: 60,
    damping: 18,
  });

  const nearX = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const nearY = useTransform(sy, [-0.5, 0.5], [16, -16]);
  const farX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const farY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  function onMouse(e: MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      id="top"
      onMouseMove={onMouse}
      className="noise relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-24 lg:pt-44"
    >
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
        <div className="absolute -right-40 -top-40 h-[560px] w-[560px] animate-blob rounded-full glow-volt" />
        <div
          className="absolute -left-48 top-1/3 h-[480px] w-[480px] animate-blob rounded-full glow-mint"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-[380px] w-[380px] animate-blob rounded-full glow-lilac"
          style={{ animationDelay: "-9s" }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
        {/* ---------- Left: copy ---------- */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-acc/30 bg-acc/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-acc"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-volt" />
              <span className="h-2 w-2 rounded-full bg-volt" />
            </span>
            Enterprise Rewards Infrastructure
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(2.9rem,7.2vw,5.6rem)] font-bold leading-[0.96] tracking-tight text-fg">
            {["Power", "modern"].map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-1 pr-3">
                <motion.span
                  className="inline-block"
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.12 + i * 0.09, ease: EASE }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <br />
            {["growth", "with"].map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-2 pr-3">
                <motion.span
                  className="inline-block"
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: 0.3 + i * 0.09, ease: EASE }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <br />
            <WordRotator />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
            className="mt-6 max-w-xl text-base leading-relaxed text-fg/70 sm:text-lg"
          >
            One platform for campaigns, incentives, UPI rewards, payouts and
            ROI — launch in under 24 hours and watch engagement compound.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="/demo"
                className="group flex items-center gap-2.5 rounded-full bg-volt px-7 py-4 font-display text-base font-bold text-coal shadow-glow transition-colors hover:bg-paper"
              >
                Book Instant Demo
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/#products"
                className="group flex items-center gap-3 rounded-full border border-line/15 px-6 py-4 font-display text-base font-semibold text-fg transition hover:border-acc/60 hover:bg-line/5"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-line/10 transition group-hover:bg-volt group-hover:text-coal">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
                See it in action
              </a>
            </Magnetic>
          </motion.div>

          {/* Live simulator trigger */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            className="mt-5"
          >
            <button
              onClick={simulate}
              disabled={sim !== "idle"}
              className="group inline-flex items-center gap-2.5 rounded-full border border-dashed border-acc/50 bg-acc/5 px-5 py-2.5 text-sm font-bold text-acc transition hover:bg-acc/15 disabled:cursor-default disabled:opacity-90"
            >
              {sim === "idle" && (
                <>
                  <Zap className="h-4 w-4 transition-transform group-hover:scale-125" />
                  Try it live — send ₹1,000 to the phone
                </>
              )}
              {sim === "sending" && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending to Riya Sharma…
                </>
              )}
              {sim === "done" && (
                <>
                  <Check className="h-4 w-4" />
                  Delivered in 3s — check the phone
                </>
              )}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
            className="mt-7 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {["AR", "PS", "NK", "JM", "+"].map((t, i) => (
                <span
                  key={i}
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-base text-[11px] font-bold text-coal"
                  style={{
                    background: ["#CDFB47", "#8CF0B3", "#C9B8FF", "#FFC24B", "#F4F0E6"][i],
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-honey">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-sm text-fg/60">
                Loved by <span className="font-semibold text-fg">250+ enterprises</span>
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
            className="mt-10 grid grid-cols-2 gap-6 border-t border-line/10 pt-7 sm:grid-cols-4"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold text-fg sm:text-3xl">
                  <CountUp
                    end={s.end}
                    decimals={s.decimals ?? 0}
                    prefix={s.prefix ?? ""}
                    suffix={s.suffix}
                  />
                </p>
                <p className="mt-1 text-xs leading-snug text-fg/55 sm:text-sm">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ---------- Right: rotated 3D phone scene ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
          className="relative mx-auto w-full max-w-[540px]"
          style={{ perspective: 1400 }}
        >
          {/* Orbit rings */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="aspect-square w-[112%] animate-spin-slow rounded-full border border-dashed border-acc/30" />
          </div>
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="aspect-square w-[86%] rounded-full glow-volt" />
          </div>

          {/* Idle bob wrapper */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 0.8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto w-fit"
          >
            {/* Mouse tilt */}
            <motion.div
              style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
              className="relative w-[270px] rounded-[3rem] border border-line/20 bg-coal p-2.5 shadow-card sm:w-[300px]"
            >
              {/* Side buttons */}
              <div className="absolute -left-[2px] top-28 h-10 w-[3px] rounded-full bg-line/30" />
              <div className="absolute -left-[2px] top-40 h-14 w-[3px] rounded-full bg-line/30" />
              <div className="absolute -right-[2px] top-32 h-16 w-[3px] rounded-full bg-line/30" />

              {/* Real Budgetree portal screenshots rotate inside the existing 3D phone */}
              <div className="relative aspect-[9/19] overflow-hidden rounded-[2.5rem] bg-[#0C1512]">
                <PortalScreenCarousel />
                <AnimatePresence>
                  {sim !== "idle" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-40 grid place-items-center bg-coal/85 p-6"
                    >
                      {sim === "sending" ? (
                        <div className="text-center">
                          <Loader2 className="mx-auto h-10 w-10 animate-spin text-volt" />
                          <p className="mt-4 text-sm font-bold text-paper">Sending demo reward…</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-volt shadow-glow">
                            <Check className="h-8 w-8 text-coal" />
                          </span>
                          <p className="mt-4 font-display text-lg font-bold text-paper">Demo reward delivered!</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating card A — reward delivered */}
          <motion.div
            style={{ x: nearX, y: nearY }}
            className="absolute -right-2 -top-4 animate-float sm:right-0"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-line/10 bg-raise/90 p-3.5 pr-5 shadow-card">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-volt text-coal">
                <Gift className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-fg">₹1,000 reward</p>
                <p className="text-xs text-fg/55">Delivered · Amazon</p>
              </div>
              <span className="ml-1 flex items-center gap-1 rounded-full bg-jade/15 px-2 py-1 text-[10px] font-bold text-jade">
                <BadgeCheck className="h-3 w-3" /> Claimed
              </span>
            </div>
          </motion.div>

          {/* Floating card B — UPI ring */}
          <motion.div
            style={{ x: farX, y: farY }}
            className="absolute -left-2 top-2 hidden animate-float2 md:block lg:left-2"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-line/10 bg-raise/90 p-3 pr-5 shadow-card">
              <span className="relative grid h-12 w-12 place-items-center">
                <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90">
                  <circle cx="20" cy="20" r="15" fill="none" strokeWidth="4" className="stroke-line/15" style={{ stroke: "rgb(var(--c-line) / 0.15)" }} />
                  <motion.circle
                    cx="20" cy="20" r="15" fill="none" stroke="#8CF0B3" strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={RING}
                    initial={{ strokeDashoffset: RING }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 1.6, delay: 1.2, ease: EASE }}
                  />
                </svg>
                <Zap className="h-4 w-4 text-jade" />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-fg">UPI settled</p>
                <p className="text-xs text-fg/55">₹5,000 · in 3s</p>
              </div>
            </div>
          </motion.div>

          {/* Floating card C — SPIF approval */}
          <motion.div
            style={{ x: farX, y: nearY }}
            className="absolute -left-3 bottom-28 hidden animate-float sm:block lg:-left-8"
          >
            <div className="w-52 rounded-2xl border border-line/10 bg-raise/90 p-3.5 shadow-card">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-fg/45">
                  SPIF · Q3
                </p>
                <div className="flex -space-x-1.5">
                  {["#CDFB47", "#8CF0B3", "#C9B8FF"].map((c, i) => (
                    <span key={i} className="h-5 w-5 rounded-full border border-raise" style={{ background: c }} />
                  ))}
                </div>
              </div>
              <p className="mt-1.5 font-display text-base font-bold text-fg">
                ₹8,500 <span className="text-xs font-medium text-fg/50">× 12 partners</span>
              </p>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-line/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-mint to-volt"
                  initial={{ width: "8%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.4, delay: 1.4, ease: EASE }}
                />
              </div>
              <p className="mt-1.5 text-[11px] font-bold text-jade">Approved · disbursing…</p>
            </div>
          </motion.div>

          {/* Floating card D — leaderboard */}
          <motion.div
            style={{ x: nearX, y: farY }}
            className="absolute -bottom-2 right-0 animate-float2"
          >
            <div className="flex items-center gap-2.5 rounded-2xl border border-line/10 bg-raise/90 px-4 py-3 shadow-card">
              <Trophy className="h-5 w-5 text-honey" />
              <div className="leading-tight">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-fg/45">
                  Top redeemer
                </p>
                <p className="text-sm font-bold text-fg">Meera · 12.4k pts</p>
              </div>
            </div>
          </motion.div>

          {/* Live activity feed (self-contained component) */}
          <LiveFeed />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="relative mx-auto mt-20 hidden w-fit flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-fg/40">
          Scroll
        </span>
        <div className="h-10 w-px overflow-hidden bg-line/10">
          <motion.div
            className="h-4 w-px bg-volt"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
