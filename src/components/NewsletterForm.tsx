"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { EASE } from "./ui";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">(
    "idle"
  );

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "busy" || status === "done") return;
    setStatus("busy");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-3 max-w-xs">
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex items-center gap-2 rounded-2xl border border-jade/40 bg-jade/10 px-4 py-3 text-sm font-semibold text-jade"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            You&apos;re in! First issue lands soon.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, y: -8 }}
            onSubmit={submit}
            className="flex gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="you@company.com"
              className="min-w-0 flex-1 rounded-full border border-line/15 bg-line/5 px-4 py-2.5 text-sm text-fg placeholder:text-fg/35 focus:border-acc/60 focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "busy"}
              aria-label="Subscribe"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-volt text-coal transition hover:scale-105 disabled:opacity-70"
            >
              {status === "busy" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {status === "error" && (
        <p className="mt-2 text-xs font-semibold text-honey">
          That email looks off — please check and retry.
        </p>
      )}
    </div>
  );
}
