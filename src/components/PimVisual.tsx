"use client";

import { animate, motion } from "framer-motion";
import { Check, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { Frame, col, useTick } from "./shared";

const attrs: [string, string][] = [
  ["Brand", "Sunrise"],
  ["Category", "Home Care › Detergents"],
  ["HSN / GST", "3402 · 18%"],
  ["MRP", "₹120.00"],
  ["Pack size", "1 kg · 12 per case"],
  ["Barcode (EAN)", "8901234567890"],
  ["Shelf life", "24 months"],
];

const channels = ["ERP", "Field App", "Dealer Portal", "Amazon", "Flipkart", "Website"];
const CYCLE_MS = 10000;
const C = 2 * Math.PI * 24;

function Ring({ cycle }: { cycle: number }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const ctl = animate(0, 96, {
      duration: 3.2,
      delay: 0.3,
      ease: "easeOut",
      onUpdate: (v) => setPct(v),
    });
    return () => ctl.stop();
  }, [cycle]);
  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
        <circle cx={28} cy={28} r={24} fill="none" strokeWidth={5} style={{ stroke: col("fg", 0.1) }} />
        <circle
          cx={28}
          cy={28}
          r={24}
          fill="none"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - pct / 100)}
          style={{ stroke: col("pink") }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-display text-[11px] font-bold">{Math.round(pct)}%</span>
    </div>
  );
}

export default function PimVisual() {
  const cycle = useTick(CYCLE_MS, 1000);

  return (
    <Frame title="BudgeTree PIM · Product master · SKU-DT-1000">
      <div key={cycle} className="grid gap-3 p-3 sm:grid-cols-[1.25fr_1fr] sm:p-4">
        {/* product card */}
        <div className="rounded-xl border border-line/10 bg-sunken/40 p-3">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="grid h-14 w-14 shrink-0 place-items-center rounded-xl"
              style={{ background: `linear-gradient(135deg, ${col("pink", 0.35)}, ${col("grape", 0.25)})`, color: col("pink") }}
            >
              <Package className="h-7 w-7" />
            </motion.div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-semibold">Sunrise Detergent Powder 1kg</p>
              <p className="font-mono text-[10px] text-fg/45">SKU-DT-1000 · Draft → Live</p>
            </div>
            <Ring cycle={cycle} />
          </div>

          <div className="mt-3 space-y-1">
            {attrs.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.38, duration: 0.35 }}
                className="flex items-center justify-between gap-2 rounded-lg bg-raise px-2.5 py-1.5 text-[11px]"
              >
                <span className="text-fg/45">{k}</span>
                <span className="flex min-w-0 items-center gap-1.5 font-medium">
                  <span className="truncate">{v}</span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.55 + i * 0.38, type: "spring", stiffness: 400, damping: 14 }}
                    className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full"
                    style={{ background: col("pink", 0.2), color: col("pink") }}
                  >
                    <Check className="h-2.5 w-2.5" />
                  </motion.span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* syndication */}
        <div className="flex flex-col rounded-xl border border-line/10 bg-sunken/40 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-fg/45">Channel syndication</p>
          <motion.div
            initial={{ opacity: 0.5, scale: 1 }}
            animate={{ opacity: 1, scale: [1, 1, 0.94, 1] }}
            transition={{
              opacity: { duration: 0.4 },
              scale: { delay: 0.2, duration: 3.6, times: [0, 0.8, 0.9, 1] },
            }}
            className="mt-2 rounded-lg px-3 py-2 text-center text-[11px] font-bold"
            style={{ background: col("pink"), color: "#0b0f0e" }}
          >
            Publish to 6 channels
          </motion.div>
          <div className="mt-3 flex-1 space-y-1.5">
            {channels.map((ch, i) => (
              <div key={ch} className="relative flex items-center justify-between rounded-lg bg-raise px-2.5 py-2 text-[11px]">
                <span className="font-medium">{ch}</span>
                <span className="relative h-4 min-w-[58px] overflow-hidden text-right text-[10px] font-semibold">
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 3.6 + i * 0.4, duration: 0.2 }}
                    className="absolute right-0 text-fg/35"
                  >
                    Queued
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.7 + i * 0.4, duration: 0.25 }}
                    className="absolute right-0"
                    style={{ color: col("pink") }}
                  >
                    ✓ Synced
                  </motion.span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
