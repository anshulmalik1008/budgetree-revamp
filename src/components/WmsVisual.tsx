"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AnimNum, Frame, MiniStat, col, useTick } from "./shared";

const tasks = [
  { t: "PUTAWAY", d: "Pallet P-2041 → Bin A-12-03" },
  { t: "PICK", d: "SKU-4411 ×6 · Wave 14 · Zone B" },
  { t: "STAGE", d: "Order #88231 → Dock 4 (cut-off 16:30)" },
  { t: "REPLENISH", d: "Pick-face B-07 low → move 2 cartons" },
  { t: "DISPATCH", d: "Truck MH-12-4471 loaded · docs ready" },
];

const colX = [80, 122, 164, 206, 248, 290];
const aisleX = [112, 154, 196, 238, 280];

const pickers = [
  { x: [58, 112, 112, 112, 112, 58], y: [110, 110, 40, 180, 110, 110], color: "acc", d: 9 },
  { x: [338, 196, 196, 196, 196, 338], y: [110, 110, 52, 168, 110, 110], color: "azure", d: 11 },
  { x: [330, 280, 280, 280, 280, 330], y: [110, 110, 36, 184, 110, 110], color: "honey", d: 10 },
];

const hot = [
  { x: 122, y: 20, delay: 0.5 },
  { x: 206, y: 122, delay: 2.2 },
  { x: 290, y: 20, delay: 3.8 },
  { x: 80, y: 122, delay: 5.2 },
];

export default function WmsVisual() {
  const tick = useTick(1700, 1000);
  const task = tasks[tick % tasks.length];

  return (
    <Frame title="BudgeTree WMS · Warehouse floor · Shift A">
      <div className="p-3 sm:p-4">
        <div className="relative overflow-hidden rounded-xl border border-line/10 bg-base/60">
          <svg viewBox="0 0 400 220" className="block w-full">
            {/* aisles */}
            {aisleX.map((x) => (
              <line key={x} x1={x} y1={14} x2={x} y2={206} strokeDasharray="3 5" style={{ stroke: col("fg", 0.1) }} />
            ))}
            <line x1={50} y1={110} x2={352} y2={110} strokeDasharray="3 5" style={{ stroke: col("fg", 0.1) }} />

            {/* racks */}
            {colX.map((x) =>
              [20, 122].map((y) => (
                <rect
                  key={`${x}-${y}`}
                  x={x}
                  y={y}
                  width={22}
                  height={78}
                  rx={3}
                  style={{ fill: col("fg", 0.06), stroke: col("fg", 0.13) }}
                />
              ))
            )}
            {hot.map((h) => (
              <motion.rect
                key={`${h.x}-${h.y}`}
                x={h.x}
                y={h.y}
                width={22}
                height={78}
                rx={3}
                style={{ fill: col("acc") }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, delay: h.delay, repeat: Infinity, repeatDelay: 3 }}
              />
            ))}

            {/* docks */}
            {[22, 92, 162].map((y) => (
              <g key={y}>
                <rect x={4} y={y} width={36} height={44} rx={4} style={{ fill: col("fg", 0.05), stroke: col("fg", 0.15) }} strokeDasharray="3 3" />
                <rect x={360} y={y} width={36} height={44} rx={4} style={{ fill: col("fg", 0.05), stroke: col("fg", 0.15) }} strokeDasharray="3 3" />
              </g>
            ))}
            <text x={22} y={14} textAnchor="middle" fontSize={8} fontWeight={700} style={{ fill: col("fg", 0.45) }}>
              INBOUND
            </text>
            <text x={378} y={14} textAnchor="middle" fontSize={8} fontWeight={700} style={{ fill: col("fg", 0.45) }}>
              OUTBOUND
            </text>

            {/* trucks */}
            <motion.g
              initial={{ x: -48 }}
              animate={{ x: [-48, 0, 0, -48] }}
              transition={{ duration: 12, times: [0, 0.2, 0.75, 1], repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x={6} y={96} width={32} height={36} rx={5} style={{ fill: col("acc", 0.9) }} />
              <rect x={30} y={102} width={7} height={10} rx={2} style={{ fill: col("base") }} />
            </motion.g>
            <motion.g
              initial={{ x: 48 }}
              animate={{ x: [48, 0, 0, 48] }}
              transition={{ duration: 12, times: [0.3, 0.5, 0.9, 1].map((v, i) => (i === 0 ? 0 : v)), repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x={362} y={26} width={32} height={36} rx={5} style={{ fill: col("honey", 0.9) }} />
              <rect x={363} y={32} width={7} height={10} rx={2} style={{ fill: col("base") }} />
            </motion.g>

            {/* pickers */}
            {pickers.map((p, i) => (
              <g key={i}>
                <motion.circle
                  r={9}
                  style={{ fill: col(p.color, 0.22) }}
                  initial={{ cx: p.x[0], cy: p.y[0] }}
                  animate={{ cx: p.x, cy: p.y }}
                  transition={{ duration: p.d, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                  r={4}
                  style={{ fill: col(p.color) }}
                  initial={{ cx: p.x[0], cy: p.y[0] }}
                  animate={{ cx: p.x, cy: p.y }}
                  transition={{ duration: p.d, repeat: Infinity, ease: "linear" }}
                />
              </g>
            ))}
          </svg>

          <div className="absolute left-2 top-2 flex gap-1.5">
            <span className="rounded-full border border-line/10 bg-raise/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-acc">
              Floor active
            </span>
            <span className="hidden rounded-full border border-line/10 bg-raise/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-fg/60 sm:inline">
              3 pickers · 2 docks
            </span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <MiniStat label="Picks / hr">
            <AnimNum value={1240 + tick * 18} />
          </MiniStat>
          <MiniStat label="Pick accuracy" tone="jade">
            <AnimNum value={99.5 + (tick % 3) * 0.1} decimals={1} suffix="%" />
          </MiniStat>
          <MiniStat label="Dock utilisation" tone="azure">
            <AnimNum value={72 + (tick % 5) * 3} suffix="%" />
          </MiniStat>
        </div>

        <div className="mt-3 h-10 overflow-hidden rounded-lg border border-line/10 bg-sunken/50 px-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={tick % tasks.length}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex h-10 items-center gap-3 text-xs"
            >
              <span className="rounded bg-acc/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-acc">{task.t}</span>
              <span className="truncate text-fg/70">{task.d}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Frame>
  );
}
