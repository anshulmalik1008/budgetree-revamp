"use client";

import { animate } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** rgb(var(--c-name) / alpha) — theme aware colour helper */
export const col = (name: string, a = 1) => `rgb(var(--c-${name}) / ${a})`;

export function useTick(ms: number, mod = 1000) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 1) % mod), ms);
    return () => clearInterval(id);
  }, [ms, mod]);
  return t;
}

export function AnimNum({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 0.9,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [n, setN] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const ctl = animate(prev.current, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        prev.current = v;
        setN(v);
      },
    });
    return () => ctl.stop();
  }, [value, duration]);
  return (
    <span>
      {prefix}
      {n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export function Frame({ title, children, status = "Live" }: { title: string; children: ReactNode; status?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line/15 bg-raise shadow-card">
      <div className="flex items-center justify-between gap-3 border-b border-line/10 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-line/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-line/20" />
        </div>
        <p className="truncate text-[11px] font-medium tracking-wide text-fg/55">{title}</p>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-acc">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-acc" />
            <span className="relative h-2 w-2 rounded-full bg-acc" />
          </span>
          {status}
        </span>
      </div>
      {children}
    </div>
  );
}

export function MiniStat({ label, children, tone = "acc" }: { label: string; children: ReactNode; tone?: string }) {
  return (
    <div className="rounded-xl border border-line/10 bg-sunken/60 px-3 py-2">
      <p className="truncate text-[10px] uppercase tracking-wider text-fg/45">{label}</p>
      <p className="mt-0.5 font-display text-sm font-semibold sm:text-base" style={{ color: col(tone) }}>
        {children}
      </p>
    </div>
  );
}
