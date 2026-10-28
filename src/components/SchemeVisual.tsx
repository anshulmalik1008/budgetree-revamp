"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Gift, Percent, Ticket } from "lucide-react";
import { AnimNum, Frame, col, useTick } from "./shared";

const schemes = [
  { name: "Buy 50, Get 5 Free", sub: "Detergent 1kg · free goods", save: 600, icon: Gift },
  { name: "5% off above ₹10,000", sub: "Slab discount · bill-wise", save: 570, icon: Percent },
  { name: "Soap + Shampoo Combo", sub: "₹150 off on bundle", save: 150, icon: Ticket },
];

const items = [
  { n: "Detergent 1kg", q: "×50", amt: 6000 },
  { n: "Soap 100g", q: "×120", amt: 3600 },
  { n: "Shampoo 6ml", q: "×300", amt: 1800 },
];

export default function SchemeVisual() {
  const tick = useTick(1500, 1000);
  const step = tick % 6; // 0 none, 1..3 schemes, 4 total+reward, 5 hold
  const applied = Math.min(Math.max(step, 0), 3);
  const saved = schemes.slice(0, applied).reduce((a, s) => a + s.save, 0);
  const subtotal = 11400;

  return (
    <Frame title="BudgeTree Schemes · Auto-apply engine">
      <div className="grid gap-3 p-3 sm:grid-cols-[1fr_1.05fr] sm:p-4">
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-fg/45">Active schemes · North zone</p>
          {schemes.map((s, i) => {
            const on = step > i && step <= 5;
            return (
              <motion.div
                key={s.name}
                animate={{ scale: step === i + 1 ? 1.03 : 1, x: step === i + 1 ? 4 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative flex items-center gap-3 overflow-hidden rounded-xl border bg-sunken/40 p-2.5"
                style={{ borderColor: on ? col("pink", 0.6) : col("line", 0.1) }}
              >
                <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-raise" style={{ boxShadow: `inset 0 0 0 1px ${col("line", 0.1)}` }} />
                <span
                  className="ml-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                  style={{ background: col("pink", on ? 0.25 : 0.12), color: col("pink") }}
                >
                  <s.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold">{s.name}</p>
                  <p className="truncate text-[10px] text-fg/50">{s.sub}</p>
                </div>
                <span
                  className="rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                  style={{ background: on ? col("pink", 0.2) : col("fg", 0.08), color: on ? col("pink") : col("fg", 0.45) }}
                >
                  {on ? "Applied" : "Eligible"}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col rounded-xl border border-line/10 bg-sunken/40 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-fg/45">Order #8847 · Sharma General Store</p>
          <div className="mt-2 space-y-1.5">
            {items.map((it) => (
              <div key={it.n} className="flex items-center justify-between rounded-lg bg-raise px-2.5 py-1.5 text-[11px]">
                <span className="font-medium">
                  {it.n} <span className="text-fg/40">{it.q}</span>
                </span>
                <span className="font-semibold">₹{it.amt.toLocaleString("en-IN")}</span>
              </div>
            ))}
            <AnimatePresence>
              {applied >= 1 && (
                <motion.div
                  key="l1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11px]" style={{ background: col("pink", 0.12), color: col("pink") }}>
                    <span>+5 Detergent free</span>
                    <span className="font-semibold">−₹600</span>
                  </div>
                </motion.div>
              )}
              {applied >= 2 && (
                <motion.div key="l2" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11px]" style={{ background: col("pink", 0.12), color: col("pink") }}>
                    <span>Slab 5% discount</span>
                    <span className="font-semibold">−₹570</span>
                  </div>
                </motion.div>
              )}
              {applied >= 3 && (
                <motion.div key="l3" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11px]" style={{ background: col("pink", 0.12), color: col("pink") }}>
                    <span>Combo benefit</span>
                    <span className="font-semibold">−₹150</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-auto pt-3">
            <div className="flex items-end justify-between border-t border-line/10 pt-2">
              <span className="text-[10px] uppercase tracking-wider text-fg/45">Net payable</span>
              <span className="font-display text-xl font-bold">
                <AnimNum value={subtotal - saved} prefix="₹" />
              </span>
            </div>
            <div className="mt-2 h-8 overflow-hidden">
              <AnimatePresence>
                {step >= 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 14, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-8 items-center justify-center gap-1.5 rounded-lg px-2 text-[10px] font-semibold"
                    style={{ background: col("acc", 0.16), color: col("acc") }}
                  >
                    <Gift className="h-3.5 w-3.5" /> Saved ₹1,320 · UPI cash token ₹250 unlocked
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}
