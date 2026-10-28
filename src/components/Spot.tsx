
"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";

type SpotProps = {
  children: ReactNode;
  accent?: string;
  className?: string;
};

export default function Spot({
  children,
  accent = "volt",
  className = "",
}: SpotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative h-full overflow-hidden rounded-2xl border border-line/15 bg-raise transition-all duration-300 hover:-translate-y-1 hover:border-line/30 hover:shadow-card ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgb(var(--c-${accent}) / 0.12), transparent 70%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
