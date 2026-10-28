"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { AnimNum, Frame, MiniStat, col, useTick } from "./shared";

const stages = ["Received", "Confirmed", "Picking", "Shipped", "Invoiced"];
const stageColor = ["fg", "azure", "honey", "grape", "acc"];

const orders = [
  { id: "#8841", ch: "SFA App", amt: 48200 },
  { id: "#8842", ch: "Dealer Portal", amt: 126500 },
  { id: "#8843", ch: "Web", amt: 18900 },
  { id: "#8844", ch: "EDI", amt: 352000 },
  { id: "#8845", ch: "Phone", amt: 9400 },
  { id: "#8846", ch: "SFA App", amt: 72300 },
];

const fmt = (n: number) => (n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(1)}K`);

export default function OmsVisual() {
  const tick = useTick(1700, 1000);
  const cycle = stages.length + 2;

  const placed = orders.map((o, i) => ({ ...o, stage: (tick + i) % cycle }));

  return (
    <Frame title="BudgeTree OMS · Order pipeline · All channels">
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-2">
          <MiniStat label="Orders today" tone="grape">
            <AnimNum value={1284 + tick * 3} />
          </MiniStat>
          <MiniStat label="Fill rate" tone="jade">
            <AnimNum value={98.2 + (tick % 3) * 0.1} decimals={1} suffix="%" />
          </MiniStat>
          <MiniStat label="Avg. cycle" tone="azure">
            2h 14m
          </MiniStat>
        </div>

        <LayoutGroup>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {stages.map((s, si) => {
              const inCol = placed.filter((o) => o.stage === si);
              return (
                <div key={s} className="rounded-xl border border-line/10 bg-sunken/40 p-1.5">
                  <div className="mb-1.5 flex items-center justify-between px-0.5">
                    <span className="truncate text-[8px] font-bold uppercase tracking-wider sm:text-[9px]" style={{ color: col(stageColor[si], si === 0 ? 0.6 : 1) }}>
                      {s}
                    </span>
                    <span className="text-[9px] font-semibold text-fg/40">{inCol.length}</span>
                  </div>
                  <div className="min-h-[140px] space-y-1.5 sm:min-h-[168px]">
                    <AnimatePresence initial={false}>
                      {inCol.map((o) => (
                        <motion.div
                          key={o.id}
                          layout
                          layoutId={o.id}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ type: "spring", stiffness: 260, damping: 26 }}
                          className="rounded-lg border bg-raise p-1.5"
                          style={{ borderColor: col(stageColor[si], 0.35) }}
                        >
                          <p className="font-mono text-[9px] font-semibold text-fg/80">{o.id}</p>
                          <p className="mt-0.5 font-display text-[11px] font-semibold sm:text-xs">{fmt(o.amt)}</p>
                          <p className="mt-0.5 truncate text-[8px] text-fg/45">{o.ch}</p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="mt-3 flex items-center gap-3 rounded-lg border border-line/10 bg-sunken/50 px-3 py-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-fg/45">SLA</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line/10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: col("grape") }}
              animate={{ width: ["12%", "100%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <span className="text-[10px] text-fg/50">Credit ✓ · Price ✓ · Stock ✓</span>
        </div>
      </div>
    </Frame>
  );
}
