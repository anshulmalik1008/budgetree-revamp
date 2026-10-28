"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, ShieldX } from "lucide-react";
import { AnimNum, Frame, col, useTick } from "./shared";

// waterfall: [label, from, to, kind]
const bars: { l: string; from: number; to: number; tone: string; total?: boolean }[] = [
  { l: "MRP", from: 0, to: 100, tone: "azure", total: true },
  { l: "Retailer", from: 82, to: 100, tone: "honey" },
  { l: "Distrib.", from: 75, to: 82, tone: "honey" },
  { l: "Scheme", from: 72, to: 75, tone: "pink" },
  { l: "Net", from: 0, to: 72, tone: "jade", total: true },
];

const lists = [
  { z: "North · Modern Trade", base: 72.0 },
  { z: "West · General Trade", base: 70.5 },
  { z: "South · E-commerce", base: 74.2 },
];

export default function PricingVisual() {
  const tick = useTick(1900, 1000);
  const hi = tick % lists.length;
  const margin = [28.4, 24.1, 21.2, 30.2][tick % 4];
  const ok = margin >= 22;

  return (
    <Frame title="BudgeTree Pricing · Price waterfall · SKU-DT-1000">
      <div className="p-3 sm:p-4">
        <div className="rounded-xl border border-line/10 bg-sunken/40 p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-fg/45">MRP → net realisation (₹ per unit)</p>
            <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider" style={{ background: col("azure", 0.16), color: col("azure") }}>
              Effective 1 Apr
            </span>
          </div>
          <div key="chart" className="relative mt-3 flex h-[130px] items-stretch gap-2">
            {bars.map((b, i) => (
              <div key={b.l} className="flex flex-1 flex-col">
                <div className="relative flex-1 rounded-md bg-line/[0.04]">
                  <motion.div
                    className="absolute inset-x-1 rounded-sm"
                    style={{
                      bottom: `${b.from}%`,
                      height: `${b.to - b.from}%`,
                      background: `linear-gradient(180deg, ${col(b.tone)}, ${col(b.tone, 0.55)})`,
                      transformOrigin: b.total ? "bottom" : "top",
                    }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 8, delay: i * 0.35, repeat: Infinity, times: [0, 0.12, 0.85, 1], ease: "easeOut" }}
                  />
                  <span className="absolute inset-x-0 -top-0.5 z-10 -translate-y-full pb-0.5 text-center text-[9px] font-semibold text-fg/70">
                    {b.total ? `₹${b.to}` : `−${b.to - b.from}`}
                  </span>
                </div>
                <p className="mt-1 text-center text-[9px] font-medium text-fg/50">{b.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-[1.3fr_1fr]">
          <div className="overflow-hidden rounded-xl border border-line/10">
            <div className="bg-sunken/60 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-fg/45">Live price lists</div>
            {lists.map((l, i) => (
              <div
                key={l.z}
                style={{ backgroundColor: i === hi ? col("azure", 0.12) : "transparent" }}
                className="flex items-center justify-between border-t border-line/10 px-3 py-2 text-[11px] transition-colors duration-500"
              >
                <span className="truncate font-medium">{l.z}</span>
                <span className="flex items-center gap-2 font-display font-semibold">
                  <AnimNum value={l.base + (i === hi ? 1.8 : 0)} prefix="₹" decimals={2} />
                  <span className="text-[9px]" style={{ color: i === hi ? col("jade") : col("fg", 0.3) }}>
                    {i === hi ? "▲ 2.5%" : "—"}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-line/10 bg-sunken/40 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-fg/45">Margin guardrail</p>
            <p className="mt-1 font-display text-xl font-bold" style={{ color: ok ? col("jade") : col("danger") }}>
              <AnimNum value={margin} decimals={1} suffix="%" />
            </p>
            <div className="relative mt-1 h-2 overflow-hidden rounded-full bg-line/10">
              <motion.div
                className="h-full rounded-full transition-colors duration-500"
                style={{ background: ok ? col("jade") : col("danger") }}
                animate={{ width: `${(margin / 40) * 100}%` }}
                transition={{ duration: 0.8 }}
              />
              <span className="absolute top-0 h-full w-px bg-fg/70" style={{ left: `${(22 / 40) * 100}%` }} />
            </div>
            <div className="mt-2 h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={ok ? "ok" : "no"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-1 text-[10px] font-semibold"
                  style={{ color: ok ? col("jade") : col("danger") }}
                >
                  {ok ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldX className="h-3.5 w-3.5" />}
                  {ok ? "Above 22% floor · approved" : "Below floor · sent for approval"}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}
