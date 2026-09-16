"use client";

import { useEffect, useState } from "react";

/* Slim live-stats band that ticks up in real time */
export default function LiveTicker() {
  const [today, setToday] = useState(42831500);
  const [hour, setHour] = useState(12400);
  const [launches, setLaunches] = useState(37);

  useEffect(() => {
    const t = setInterval(() => {
      setToday((v) => v + Math.floor(Math.random() * 9000) + 1200);
      if (Math.random() > 0.35)
        setHour((v) => v + Math.floor(Math.random() * 7) + 1);
      if (Math.random() > 0.88) setLaunches((v) => v + 1);
    }, 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative z-10 border-y border-coal/10 bg-volt text-coal">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-1 px-4 py-3 text-sm sm:px-6">
        <span className="flex items-center gap-2 rounded-full bg-coal px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-volt">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-full w-full animate-pulse-ring rounded-full bg-volt" />
            <span className="h-1.5 w-1.5 rounded-full bg-volt" />
          </span>
          Live
        </span>
        <span className="font-medium">
          <b className="font-display tabular-nums">
            ₹{today.toLocaleString("en-IN")}
          </b>{" "}
          rewarded today
        </span>
        <span className="hidden font-medium sm:inline">
          <b className="font-display tabular-nums">{hour.toLocaleString("en-IN")}</b>{" "}
          claimed this hour
        </span>
        <span className="hidden font-medium md:inline">
          <b className="font-display tabular-nums">{launches}</b> launches this
          week
        </span>
      </div>
    </div>
  );
}
