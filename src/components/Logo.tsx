"use client";

import { cn } from "./ui";

/* Official BudgeTree wordmark on a white pill so it pops in both themes */
export default function Logo({
  className,
  imgClassName,
}: {
  className?: string;
  imgClassName?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xl bg-white px-3 py-2 shadow-card transition-transform duration-300 hover:scale-[1.03]",
        className
      )}
    >
      <img
        src="/images/budgetree-logo.png"
        alt="BudgeTree"
        className={cn("h-5 w-auto sm:h-6", imgClassName)}
        draggable={false}
      />
    </span>
  );
}
