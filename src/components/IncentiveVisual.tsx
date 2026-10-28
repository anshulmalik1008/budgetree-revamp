"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Crown, Loader2, Wallet } from "lucide-react";
import { AnimNum, Frame, col, useTick } from "./shared";

const reps = [
  { n: "Aarav Sharma", base: 112 },
  { n: "Meera Kapoor", base: 104 },
  { n: "Rohan Patel", base: 98 },
  { n: "Isha Thakur", base: 91 },
  { n: "Vikram Das", base: 86 },
];
const delta = [0, 7, -5, 11, -8, 4, 9, -3];
const phases = ["Calculating", "Approved", "Paying via UPI", "Paid"];

const mult = (s: number) => (s >= 110 ? 1.5 : s >= 100 ? 1.2 : 1);

export default function IncentiveVisual() {
  const tick = useTick(1800, 1000);

  const board = reps
    .map((r, i) => {
      const score = r.base + delta[(tick + i * 3) % delta.length];
      const m = mult(score);
      return { ...r, score, m, pay: Math.round((12000 * m * (score / 100)) / 100) * 100 };
    })
    .sort((a, b) => b.score - a.score);

  const phase = Math.floor(tick / 2) % phases.length;

  return (
    <Frame title="BudgeTree Incentives · Leaderboard · Month-to-date">
      <div className="grid gap-3 p-3 sm:grid-cols-[1.35fr_1fr] sm:p-4">
        <div className="rounded-xl border border-line/10 bg-sunken/40 p-2.5">
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-fg/45">Target achievement</p>
            <p className="text-[10px] text-fg/45">≥110% → 1.5x · ≥100% → 1.2x</p>
          </div>
          <div className="space-y-1.5">
            {board.map((r, i) => (
              <motion.div
                key={r.n}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="flex items-center gap-2 rounded-lg bg-raise px-2 py-1.5"
                style={i === 0 ? { boxShadow: `inset 0 0 0 1px ${col("acc", 0.5)}` } : undefined}
              >
                <span className="w-4 text-center font-display text-[11px] font-bold text-fg/45">{i + 1}</span>
                <span
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-bold"
                  style={{ background: col("acc", 0.16), color: col("acc") }}
                >
                  {i === 0 ? <Crown className="h-3.5 w-3.5" /> : r.n.split(" ").map((x) => x[0]).join("")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="truncate font-medium">{r.n}</span>
                    <span className="font-display font-semibold">
                      <AnimNum value={r.score} suffix="%" />
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line/10">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: r.score >= 100 ? col("acc") : col("honey") }}
                      animate={{ width: `${Math.min(100, (r.score / 125) * 100)}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
                <div className="w-[62px] text-right">
                  <p className="font-display text-[11px] font-bold" style={{ color: col("acc") }}>
                    ₹{r.pay.toLocaleString("en-IN")}
                  </p>
                  <p className="text-[9px] text-fg/45">{r.m}x slab</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-xl border border-line/10 bg-sunken/40 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-fg/45">Payout run · March</p>
          <p className="mt-1 font-display text-2xl font-bold">
            <AnimNum value={1240000} prefix="₹" />
          </p>
          <p className="text-[10px] text-fg/50">128 reps · UPI + bank + gift cards</p>

          <div className="mt-3 space-y-1.5">
            {phases.map((p, i) => {
              const done = i < phase || (phase === 3 && i === 3);
              const active = i === phase && phase !== 3;
              return (
                <div
                  key={p}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] font-medium"
                  style={{
                    background: done ? col("acc", 0.14) : active ? col("honey", 0.14) : col("fg", 0.04),
                    color: done ? col("acc") : active ? col("honey") : col("fg", 0.4),
                  }}
                >
                  <span className="grid h-4 w-4 place-items-center">
                    {done ? <Check className="h-3.5 w-3.5" /> : active ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                  </span>
                  {p}
                </div>
              );
            })}
          </div>

          <div className="mt-auto h-9 pt-3">
            <AnimatePresence>
              {phase === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-9 items-center justify-center gap-1.5 rounded-lg text-[11px] font-bold"
                  style={{ background: col("acc"), color: "#0b0f0e" }}
                >
                  <Wallet className="h-3.5 w-3.5" /> 128 payouts settled
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Frame>
  );
}
