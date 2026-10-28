"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, MapPin } from "lucide-react";
import { AnimNum, Frame, MiniStat, col, useTick } from "./shared";

const pts: [number, number][] = [
  [40, 185],
  [105, 125],
  [170, 172],
  [235, 95],
  [295, 148],
  [355, 55],
];
const names = ["Sharma General Store", "Gupta Kirana", "Fresh Mart", "Royal Traders", "City Super Bazaar", "Jain Provision"];

const lens = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
const total = lens.reduce((a, b) => a + b, 0);
const cum = lens.reduce<number[]>((acc, l) => [...acc, acc[acc.length - 1] + l], [0]);
const times = cum.map((v) => (v / total) * 0.85);
const route = "M" + pts.map((p) => p.join(",")).join(" L");
const DUR = 11;
const last = pts[pts.length - 1];

export default function SfaVisual() {
  const tick = useTick(1800, 1000);
  const idx = tick % names.length;

  return (
    <Frame title="BudgeTree SFA · Today's beat · Delhi North">
      <div className="p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-xl border border-line/10 bg-base/60">
          <svg viewBox="0 0 400 230" className="block w-full">
            {/* city blocks */}
            {[
              [10, 20, 70, 50],
              [100, 14, 60, 40],
              [190, 24, 80, 36],
              [300, 90, 70, 30],
              [20, 100, 50, 30],
              [140, 190, 90, 30],
              [260, 180, 70, 36],
              [320, 160, 60, 24],
            ].map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx={6} style={{ fill: col("fg", 0.045) }} />
            ))}
            <path d="M0,150 C80,130 140,205 400,118" fill="none" strokeWidth={6} style={{ stroke: col("fg", 0.06) }} />
            <path d="M120,0 C130,80 90,150 160,230" fill="none" strokeWidth={5} style={{ stroke: col("fg", 0.06) }} />
            <path d="M270,0 C250,60 330,120 300,230" fill="none" strokeWidth={5} style={{ stroke: col("fg", 0.06) }} />

            {/* planned route */}
            <path d={route} fill="none" strokeWidth={2} strokeDasharray="4 5" style={{ stroke: col("fg", 0.22) }} />
            {/* travelled route */}
            <motion.path
              d={route}
              fill="none"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ stroke: col("azure") }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1] }}
              transition={{ duration: DUR, times: [0, 0.85, 1], repeat: Infinity, ease: "linear" }}
            />

            {/* outlet pins */}
            {pts.map(([x, y], i) => (
              <motion.g
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 0, 1.3, 1, 1, 0] }}
                transition={{
                  duration: DUR,
                  times: [0, times[i] + 0.005, times[i] + 0.03, times[i] + 0.06, 0.96, 1],
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                <circle cx={x} cy={y} r={11} style={{ fill: col("azure", 0.2) }} />
                <circle cx={x} cy={y} r={5} style={{ fill: col("azure") }} />
                <circle cx={x} cy={y} r={2} style={{ fill: col("base") }} />
              </motion.g>
            ))}

            {/* rep marker */}
            <motion.circle
              r={13}
              style={{ fill: col("acc", 0.25) }}
              initial={{ cx: pts[0][0], cy: pts[0][1] }}
              animate={{ cx: [...pts.map((p) => p[0]), last[0]], cy: [...pts.map((p) => p[1]), last[1]] }}
              transition={{ duration: DUR, times: [...times, 1], repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
              r={6}
              strokeWidth={2}
              style={{ fill: col("acc"), stroke: col("base") }}
              initial={{ cx: pts[0][0], cy: pts[0][1] }}
              animate={{ cx: [...pts.map((p) => p[0]), last[0]], cy: [...pts.map((p) => p[1]), last[1]] }}
              transition={{ duration: DUR, times: [...times, 1], repeat: Infinity, ease: "linear" }}
            />
          </svg>

          <div className="absolute left-2 top-2 rounded-lg border border-line/10 bg-raise/90 px-2.5 py-1.5">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-fg/45">Visits today</p>
            <p className="font-display text-sm font-semibold">
              <AnimNum value={Math.min(6, idx + 2)} /> <span className="text-fg/40">/ 8</span>
            </p>
          </div>

          <div className="absolute bottom-2 right-2 w-[58%] max-w-[220px] overflow-hidden rounded-lg border border-line/10 bg-raise/95">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 px-2.5 py-2"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-acc/15 text-acc">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold">{names[idx]}</p>
                  <p className="flex items-center gap-1 text-[9px] text-fg/50">
                    <MapPin className="h-2.5 w-2.5" /> Geo-verified · order booked
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <MiniStat label="Orders booked" tone="azure">
            <AnimNum value={48200 + tick * 3150} prefix="₹" />
          </MiniStat>
          <MiniStat label="Lines / call">
            <AnimNum value={5.2 + (tick % 4) * 0.2} decimals={1} />
          </MiniStat>
          <MiniStat label="Strike rate" tone="jade">
            <AnimNum value={78 + (tick % 5) * 2} suffix="%" />
          </MiniStat>
        </div>
      </div>
    </Frame>
  );
}
