"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/* Thin progress hairline at the very top */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-mint via-volt to-gold"
      style={{ scaleX }}
    />
  );
}

/* Soft glow that follows the cursor (desktop only) */
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -600, y: -600 });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    if (!mq.matches) return;
    let raf = 0;
    const onMove = (e: globalThis.MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setPos({ x: e.clientX, y: e.clientY })
      );
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!fine) return null;
  return (
    <div
      className="pointer-events-none fixed z-[4] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/[0.055] blur-[110px]"
      style={{ left: pos.x, top: pos.y }}
    />
  );
}

/* Back-to-top pill */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#top"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-volt text-coal shadow-glow transition-transform hover:scale-110"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
