"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CalendarClock } from "lucide-react";
import { AnimNum, Frame, col, useTick } from "./shared";

const warehouses = ["Delhi DC", "Mumbai DC", "Bengaluru DC", "Kolkata DC"];
const levels = [
  [78, 52, 64, 41],
  [72, 44, 58, 36],
  [66, 31, 71, 27],
  [81, 58, 62, 47],
  [74, 49, 55, 39],
];
const THRESHOLD = 35;

const batches = [
  { id: "B-2403", exp: "12 Aug 2026", qty: 1240, tag: "FEFO" },
  { id: "B-2407", exp: "03 Nov 2026", qty: 3800, tag: "" },
  { id: "B-2411", exp: "19 Jan 2027", qty: 5200, tag: "" },
];

export default function InventoryVisual() {
  const tick = useTick(2200, 1000);
  const lv = levels[tick % levels.length];
  const lowIdx = lv.findIndex((v) => v < THRESHOLD);

  return (
    <Frame title="BudgeTree Inventory · Network stock · SKU-DT-1000">
      <div className="p-3 sm:p-4">
        <div className="rounded-xl border border-line/10 bg-sunken/40 p-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-fg/45">On-hand by location</p>
            <p className="text-[10px] text-fg/45">
              Reorder point <span className="font-semibold" style={{ color: col("honey") }}>{THRESHOLD}%</span>
            </p>
          </div>
          <div className="mt-3 space-y-3">
            {warehouses.map((w, i) => {
              const v = lv[i];
              const low = v < THRESHOLD;
              return (
                <div key={w}>
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="font-medium">{w}</span>
                    <span className="flex items-center gap-2">
                      <AnimatePresence>
                        {low && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            className="rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                            style={{ background: col("danger", 0.16), color: col("danger") }}
                          >
                            Low · replenish
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <span className="font-display font-semibold">
                        <AnimNum value={v * 120} />
                        <span className="text-fg/40"> units</span>
                      </span>
                    </span>
                  </div>
                  <div className="relative h-2.5 overflow-hidden rounded-full bg-line/10">
                    <motion.div
                      className="h-full rounded-full transition-colors duration-500"
                      style={{ background: low ? col("danger") : col("jade") }}
                      animate={{ width: `${v}%` }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                    <span className="absolute top-0 h-full w-px" style={{ left: `${THRESHOLD}%`, background: col("honey") }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 overflow-hidden rounded-xl border border-line/10">
          <div className="grid grid-cols-[1fr_1.2fr_0.8fr] bg-sunken/60 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-fg/45">
            <span>Batch</span>
            <span>Expiry</span>
            <span className="text-right">Qty</span>
          </div>
          {batches.map((b, i) => (
            <div
              key={b.id}
              className="grid grid-cols-[1fr_1.2fr_0.8fr] items-center border-t border-line/10 px-3 py-1.5 text-[11px]"
              style={i === 0 ? { background: col("jade", 0.07) } : undefined}
            >
              <span className="flex items-center gap-1.5 font-mono">
                {b.id}
                {b.tag && (
                  <span className="rounded px-1 text-[8px] font-bold" style={{ background: col("jade", 0.2), color: col("jade") }}>
                    {b.tag}
                  </span>
                )}
              </span>
              <span className="flex items-center gap-1 text-fg/60">
                <CalendarClock className="h-3 w-3" /> {b.exp}
              </span>
              <span className="text-right font-semibold">
                <AnimNum value={i === 0 ? b.qty - (tick % 5) * 120 : b.qty} />
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 h-9 overflow-hidden">
          <AnimatePresence mode="wait">
            {lowIdx >= 0 ? (
              <motion.div
                key={`low-${lowIdx}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex h-9 items-center gap-2 rounded-lg px-3 text-[11px] font-medium"
                style={{ background: col("honey", 0.12), color: col("honey") }}
              >
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">AI replenishment · PO suggested for {warehouses[lowIdx]} · 2,400 units</span>
              </motion.div>
            ) : (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex h-9 items-center gap-2 rounded-lg px-3 text-[11px] font-medium"
                style={{ background: col("jade", 0.12), color: col("jade") }}
              >
                ✓ All locations healthy · 0 stock-outs · FEFO allocation active
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Frame>
  );
}
