"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Gift,
  Handshake,
  HeartHandshake,
  Megaphone,
  PartyPopper,
  ClipboardCheck,
} from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { Reveal, SectionTag, cn } from "./ui";

const CARDS = [
  {
    icon: HeartHandshake,
    tag: "HR & People",
    title: "Employee Recognition",
    desc: "Kudos convert to UPI cash in seconds. Birthdays, milestones, spot awards — automated.",
    metric: "3.2x",
    metricLabel: "engagement lift",
    art: "from-volt/80 to-mint/60",
  },
  {
    icon: Handshake,
    tag: "Channel Sales",
    title: "Partner SPIFs",
    desc: "Pay out on every verified invoice. Dealers and distributors stay hungry, month after month.",
    metric: "41%",
    metricLabel: "faster claim cycles",
    art: "from-gold/80 to-[#FF8A3D]/60",
  },
  {
    icon: Megaphone,
    tag: "Marketing",
    title: "Customer Cashback",
    desc: "UPI cash with no app download. Turn one-time buyers into repeat revenue.",
    metric: "68%",
    metricLabel: "redemption rate",
    art: "from-lilac/80 to-[#7C5CFF]/60",
  },
  {
    icon: PartyPopper,
    tag: "Seasonal",
    title: "Festive Gifting",
    desc: "Bulk-deliver 1M+ gifts over SMS, email & WhatsApp. Diwali-scale, zero chaos.",
    metric: "1M+",
    metricLabel: "gifts per season",
    art: "from-[#FF8AB2]/80 to-[#B44DFF]/60",
  },
  {
    icon: ClipboardCheck,
    tag: "Research",
    title: "Survey & NPS Rewards",
    desc: "Auto-trigger incentives the moment feedback lands. Watch response rates soar.",
    metric: "2.4x",
    metricLabel: "more responses",
    art: "from-sky/80 to-[#3D7BFF]/60",
  },
  {
    icon: Gift,
    tag: "Growth",
    title: "Referral Payouts",
    desc: "TDS-ready, compliant referral payouts disbursed in under 24 hours, every time.",
    metric: "<24h",
    metricLabel: "disbursal time",
    art: "from-mint/80 to-[#0EA472]/60",
  },
];

/* Horizontal rail built on native scrolling:
   - touch / trackpad / shift+wheel scroll natively (with real inertia)
   - mouse users get grab-and-drag via pointer capture
   This is far more robust than transform-based drag libraries. */
export default function DragRail() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    id: number;
    startX: number;
    startScroll: number;
    moved: boolean;
    captured: boolean;
  } | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  function updateEdges() {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(updateEdges);
      ro.observe(el);
    }
    window.addEventListener("resize", updateEdges);
    document.fonts?.ready?.then(updateEdges).catch(() => {});
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  function onPointerDown(e: RPointerEvent<HTMLDivElement>) {
    // Touch & pen already scroll natively; only hijack the mouse.
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
      captured: false,
    };
  }

  function onPointerMove(e: RPointerEvent<HTMLDivElement>) {
    const st = dragRef.current;
    const el = scrollerRef.current;
    if (!st || !el || e.pointerId !== st.id) return;
    const dx = e.clientX - st.startX;
    if (!st.moved && Math.abs(dx) > 6) {
      st.moved = true;
      // Capture only once it's a drag, so plain clicks still reach links.
      try {
        el.setPointerCapture(e.pointerId);
        st.captured = true;
      } catch {
        /* ignore */
      }
    }
    if (st.moved) el.scrollLeft = st.startScroll - dx;
  }

  function onPointerUp(e: RPointerEvent<HTMLDivElement>) {
    const st = dragRef.current;
    const el = scrollerRef.current;
    dragRef.current = null;
    if (!st || !el) return;
    if (st.captured) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      if (st.moved) {
        // Swallow the click that follows a drag so links never misfire.
        const swallow = (ev: Event) => {
          ev.preventDefault();
          ev.stopPropagation();
        };
        el.addEventListener("click", swallow, { capture: true, once: true });
        window.setTimeout(
          () => el.removeEventListener("click", swallow, true),
          80
        );
      }
    }
  }

  return (
    <section className="relative overflow-hidden bg-raise py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-volt/8 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionTag index="04" label="Reward motions" />
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-fg sm:text-5xl">
                Recent motions{" "}
                <span className="font-serifit font-normal italic text-fg/60">
                  — drag to explore
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="flex items-center gap-2 rounded-full border border-line/15 px-5 py-2.5 text-sm font-semibold text-fg/70">
              drag
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4 text-acc" />
              </motion.span>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1} className="relative mt-12">
        {/* Edge fades */}
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-raise to-transparent transition-opacity duration-300 sm:w-24",
            canLeft ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-raise to-transparent transition-opacity duration-300 sm:w-24",
            canRight ? "opacity-100" : "opacity-0"
          )}
        />

        <div
          ref={scrollerRef}
          onScroll={updateEdges}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDragStart={(e) => e.preventDefault()}
          className="drag-rail cursor-grab overflow-x-auto overscroll-x-contain active:cursor-grabbing"
        >
          <div className="flex w-max gap-4 px-4 sm:gap-5 sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
            {CARDS.map((c) => (
              <article
                key={c.title}
                className="group w-[300px] shrink-0 select-none overflow-hidden rounded-3xl border border-line/10 bg-base/60 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-acc/40 sm:w-[380px]"
              >
                <div className={cn("relative h-44 overflow-hidden bg-gradient-to-br", c.art)}>
                  <div className="dot-grid-dark absolute inset-0 opacity-60" />
                  <c.icon className="absolute -bottom-6 -right-6 h-40 w-40 text-coal/25 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" />
                  <span className="absolute left-4 top-4 rounded-full bg-coal/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-paper backdrop-blur">
                    {c.tag}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-display text-4xl font-bold text-coal drop-shadow-sm sm:text-5xl">
                      {c.metric}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-coal/70 sm:text-xs">
                      {c.metricLabel}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-fg">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg/60">{c.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-acc">
                    Run this motion
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            ))}
            {/* End card */}
            <a
              href="/demo"
              draggable={false}
              className="grid w-[240px] shrink-0 select-none place-items-center rounded-3xl border border-dashed border-acc/40 bg-acc/5 text-center transition hover:bg-acc/10"
            >
              <span>
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-volt text-coal">
                  <ArrowRight className="h-6 w-6" />
                </span>
                <span className="mt-4 block font-display text-lg font-bold text-fg">
                  Build your own
                </span>
                <span className="mt-1 block text-sm text-fg/55">in under 24 hours</span>
              </span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
