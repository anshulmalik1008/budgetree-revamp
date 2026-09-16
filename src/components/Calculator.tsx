"use client";

import { motion } from "framer-motion";
import { Calculator as CalcIcon, Clock3, IndianRupee, TrendingUp, Users } from "lucide-react";
import { useRef, useState, useEffect, type CSSProperties } from "react";
import { EASE, Reveal, SectionTag } from "./ui";

function AnimatedNumber({
  value,
  format,
}: {
  value: number;
  format: (n: number) => string;
}) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    if (from === to) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 650, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (to - from) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      prev.current = to;
    };
  }, [value]);

  return <>{format(display)}</>;
}

function Slider({
  label,
  icon: Icon,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  icon: typeof Users;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold text-fg/70">
          <Icon className="h-4 w-4 text-acc" /> {label}
        </span>
        <span className="rounded-full bg-acc/15 px-3.5 py-1 font-display text-sm font-bold text-acc">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full"
        style={{ "--fill": `${pct}%` } as CSSProperties}
        aria-label={label}
      />
      <div className="mt-1 flex justify-between text-[11px] font-medium text-fg/35">
        <span>{min.toLocaleString("en-IN")}</span>
        <span>{max.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}

const inr = (n: number) =>
  n >= 10000000
    ? `₹${(n / 10000000).toFixed(2)} Cr`
    : n >= 100000
      ? `₹${(n / 100000).toFixed(1)} L`
      : `₹${Math.round(n).toLocaleString("en-IN")}`;

export default function Calculator() {
  const [team, setTeam] = useState(1200);
  const [reward, setReward] = useState(800);
  const [campaigns, setCampaigns] = useState(6);

  const volume = team * reward * campaigns;
  const hoursSaved = Math.round(team * campaigns * 0.08);
  const costSaved = hoursSaved * 450;
  const lift = Math.min(28 + campaigns * 2.4 + (reward >= 1000 ? 6 : 0), 84);
  const fee = Math.max(volume * 0.02, 1);
  const roi = (volume * (lift / 100) * 0.35 + costSaved) / fee;

  const results = [
    {
      icon: IndianRupee,
      label: "Monthly reward volume",
      value: volume,
      format: (n: number) => inr(n),
    },
    {
      icon: Clock3,
      label: "Manual hours saved / mo",
      value: hoursSaved,
      format: (n: number) => `${Math.round(n).toLocaleString("en-IN")} hrs`,
    },
    {
      icon: TrendingUp,
      label: "Est. engagement lift",
      value: lift,
      format: (n: number) => `+${n.toFixed(0)}%`,
    },
    {
      icon: CalcIcon,
      label: "Projected ROI multiple",
      value: roi,
      format: (n: number) => `${n.toFixed(1)}x`,
    },
  ];

  return (
    <section id="roi" className="relative overflow-hidden bg-base py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full glow-volt" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTag index="05" label="ROI you can measure" />
        <div className="mt-5 max-w-2xl">
          <Reveal delay={0.05}>
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl">
              Drag the sliders.{" "}
              <span className="font-serifit font-normal italic text-acc">
                See the payoff.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-base leading-relaxed text-fg/60 sm:text-lg">
              A live estimate of what automation does to your rewards budget —
              no sales call required.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="grid overflow-hidden rounded-[2rem] border border-line/10 bg-sunken/40 lg:grid-cols-[1fr_1.15fr]">
            {/* Controls */}
            <div className="space-y-8 p-7 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-fg/45">
                Your program
              </p>
              <Slider
                label="People rewarded / month"
                icon={Users}
                value={team}
                min={50}
                max={10000}
                step={50}
                display={team.toLocaleString("en-IN")}
                onChange={setTeam}
              />
              <Slider
                label="Average reward value"
                icon={IndianRupee}
                value={reward}
                min={100}
                max={5000}
                step={50}
                display={`₹${reward.toLocaleString("en-IN")}`}
                onChange={setReward}
              />
              <Slider
                label="Campaigns / month"
                icon={TrendingUp}
                value={campaigns}
                min={1}
                max={30}
                step={1}
                display={`${campaigns}`}
                onChange={setCampaigns}
              />
              <p className="rounded-2xl bg-line/5 p-4 text-xs leading-relaxed text-fg/50">
                Estimates assume 6 min of manual effort saved per reward at
                ₹450/hr blended cost, plus retention gains modeled from
                BudgeTree customer benchmarks.
              </p>
            </div>

            {/* Results */}
            <div className="relative border-t border-line/10 bg-raise p-7 sm:p-10 lg:border-l lg:border-t-0">
              <div className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
              <p className="relative text-xs font-bold uppercase tracking-[0.22em] text-fg/45">
                Projected outcome
              </p>
              <div className="relative mt-6 grid grid-cols-2 gap-4">
                {results.map((r) => (
                  <div
                    key={r.label}
                    className="rounded-2xl border border-line/10 bg-line/[0.04] p-4 sm:p-5"
                  >
                    <r.icon className="h-5 w-5 text-acc" />
                    <p className="mt-3 font-display text-2xl font-bold tabular-nums text-fg sm:text-3xl">
                      <AnimatedNumber value={r.value} format={r.format} />
                    </p>
                    <p className="mt-1 text-xs text-fg/55 sm:text-sm">{r.label}</p>
                  </div>
                ))}
              </div>

              {/* Growth curve */}
              <div className="relative mt-4 overflow-hidden rounded-2xl border border-line/10 bg-line/[0.03] p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-fg/50">
                    Engagement trajectory
                  </p>
                  <span className="rounded-full bg-jade/15 px-2.5 py-1 text-[11px] font-bold text-jade">
                    {inr(costSaved)} saved / mo
                  </span>
                </div>
                <svg viewBox="0 0 400 120" className="mt-2 h-28 w-full">
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" style={{ stopColor: "rgb(var(--c-acc))" }} stopOpacity="0.35" />
                      <stop offset="100%" style={{ stopColor: "rgb(var(--c-acc))" }} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[30, 60, 90].map((y) => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} style={{ stroke: "rgb(var(--c-line) / 0.09)" }} strokeWidth="1" />
                  ))}
                  <motion.path
                    d="M0,105 C50,100 80,88 120,80 C170,68 200,72 250,52 C300,32 340,30 400,10 L400,120 L0,120 Z"
                    fill="url(#areaFill)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                  <motion.path
                    d="M0,105 C50,100 80,88 120,80 C170,68 200,72 250,52 C300,32 340,30 400,10"
                    fill="none"
                    style={{ stroke: "rgb(var(--c-acc))" }}
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: EASE }}
                  />
                  <motion.circle
                    cx="400" cy="10" r="5" style={{ fill: "rgb(var(--c-acc))" }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.7, type: "spring", stiffness: 300, damping: 12 }}
                  />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
