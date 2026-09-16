"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "./ui";
import Logo from "./Logo";

const LETTERS = "BUDGETREE".split("");

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => {
        if (c >= 100) return 100;
        const next = c + Math.floor(Math.random() * 9) + 5;
        return next >= 100 ? 100 : next;
      });
    }, 95);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (count >= 100) {
      const t = setTimeout(onDone, 500);
      return () => clearTimeout(t);
    }
  }, [count, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-coal px-6 py-8 sm:px-12"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-volt/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-mint/10 blur-[120px]" />

      <div className="relative flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Logo />
        </motion.div>
        <span className="hidden text-[11px] font-semibold uppercase tracking-[0.28em] text-paper/50 sm:block">
          Est. India · 2024
        </span>
      </div>

      <div className="relative">
        <div className="flex overflow-hidden">
          {LETTERS.map((l, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
              className="font-display text-[13vw] font-bold leading-none tracking-tight text-paper sm:text-[9vw]"
            >
              {l}
            </motion.span>
          ))}
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 14 }}
            className="font-display text-[13vw] font-bold leading-none text-volt sm:text-[9vw]"
          >
            .
          </motion.span>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 font-serifit text-xl italic text-paper/60 sm:text-2xl"
        >
          growing rewards, beautifully…
        </motion.p>
      </div>

      <div className="relative">
        <div className="mb-4 flex items-end justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-paper/50">
            Loading experience
          </span>
          <span className="font-display text-6xl font-bold tabular-nums text-paper sm:text-7xl">
            {count}
            <span className="text-volt">%</span>
          </span>
        </div>
        <div className="h-[3px] w-full overflow-hidden rounded-full bg-paper/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-mint to-volt transition-[width] duration-150 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
