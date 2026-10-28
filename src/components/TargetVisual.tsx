"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimNum, Frame, col, useTick } from "./shared";

const pctSeq = [62, 71, 78, 84, 91];
const regions = [
  { n: "North", base: [88, 90, 92, 94, 96] },
  { n: "West", base: [70, 76, 81, 86, 90] },
  { n: "South", base: [58, 63, 70, 77, 84] },
  { n: "East", base: [45, 52, 60, 68, 75] },
];
const chain = ["HQ ₹10 Cr", "Region ₹2.5 Cr", "Area ₹62 L", "Rep ₹8.1 L"];
const R = 52;
const C = 2 * Math.PI * R;

export default function TargetVisual() {
  const tick = useTick(2200, 1000);
  const i = tick % pctSeq.length;
  const pct = pctSeq[i];

  return (
    <Frame title="BudgeTree Targets · Q3 · National">
      <div className="p-3 sm:p-4">
        <div className="grid gap-3 sm:grid-cols-[170px_1fr]">
          <div className="flex flex-col items-center justify-center rounded-xl border border-line/10 bg-sunken/40 p-3">
            <div className="relative h-[130px] w-[130px]">
              <svg viewBox="0 0 130 130" className="h-full w-full -rotate-90">
                <circle cx={65} cy={65} r={R} fill="none" strokeWidth={11} style={{ stroke: col("fg", 0.1) }} />
                <motion.circle
                  cx={65}
                  cy={65}
                  r={R}
                  fill="none"
                  strokeWidth={11}
                  strokeLinecap="round"
                  strokeDasharray={C}
                  animate={{ strokeDashoffset: C * (1 - pct / 100) }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  style={{ stroke: col("honey") }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-display text-2xl font-bold">
                  <AnimNum value={pct} suffix="%" />
                </p>
                <p className="text-[9px] uppercase tracking-wider text-fg/45">achieved</p>
              </div>
            </div>
            <p className="mt-2 text-center text-[11px] text-fg/60">
              <span className="font-semibold text-fg">
                <AnimNum value={pct / 10} prefix="₹" suffix=" Cr" decimals={1} />
              </span>{" "}
              of ₹10 Cr
            </p>
          </div>

          <div className="space-y-2.5 rounded-xl border border-line/10 bg-sunken/40 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-fg/45">Achievement by region</p>
            {regions.map((r) => {
              const v = r.base[i];
              const good = v >= 85;
              return (
                <div key={r.n}>
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="font-medium">{r.n}</span>
                    <span className="font-display font-semibold" style={{ color: good ? col("jade") : v >= 65 ? col("honey") : col("danger") }}>
                      <AnimNum value={v} suffix="%" />
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-line/10">
                    <motion.div
                      className="h-full rounded-full"
                      animate={{ width: `${v}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      style={{ background: good ? col("jade") : v >= 65 ? col("honey") : col("danger") }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5 rounded-xl border border-line/10 bg-sunken/40 p-3">
          <p className="mr-1 w-full text-[10px] font-semibold uppercase tracking-wider text-fg/45 sm:w-auto">Cascade</p>
          {chain.map((c, idx) => (
            <div key={c} className="flex items-center gap-1.5">
              <motion.span
                initial={{ opacity: 0.35, scale: 0.92 }}
                animate={{ opacity: [0.35, 1, 1, 0.35], scale: [0.92, 1, 1, 0.92] }}
                transition={{ duration: 6, delay: idx * 0.6, repeat: Infinity, times: [0, 0.15, 0.7, 1] }}
                className="rounded-md px-2 py-1 text-[10px] font-semibold"
                style={{ background: col("honey", 0.16), color: col("honey") }}
              >
                {c}
              </motion.span>
              {idx < chain.length - 1 && <ArrowRight className="h-3 w-3 text-fg/30" />}
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}
