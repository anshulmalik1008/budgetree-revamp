"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck,
  Check,
  ChevronDown,
  Download,
  Loader2,
  Mail,
  Star,
  User,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { EASE, Reveal, cn } from "@/components/ui";

const SIZES = ["1–50", "51–200", "201–1,000", "1,001–5,000", "5,000+"];
const INTERESTS = [
  "RewardX",
  "LoyaltyX",
  "UPI Rewards",
  "Payouts",
  "Bill Payments",
  "Siri Pay",
];
const SLOTS = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

type Day = { value: string; dow: string; num: string; mon: string };

function nextDays(): Day[] {
  const out: Day[] = [];
  const d = new Date();
  while (out.length < 12) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue; // skip Sundays
    out.push({
      value: d.toISOString().slice(0, 10),
      dow: d.toLocaleDateString("en-IN", { weekday: "short" }),
      num: String(d.getDate()),
      mon: d.toLocaleDateString("en-IN", { month: "short" }),
    });
  }
  return out;
}

const inputCls =
  "w-full rounded-2xl border border-line/15 bg-line/5 py-3 pl-11 pr-4 text-sm text-fg placeholder:text-fg/35 focus:border-acc/60 focus:outline-none transition";

export default function DemoPage() {
  const days = useMemo(nextDays, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [size, setSize] = useState(SIZES[1]);
  const [interests, setInterests] = useState<string[]>(["RewardX"]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const [refId, setRefId] = useState("");

  const particles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        x: Math.cos((i / 16) * Math.PI * 2) * (90 + (i % 4) * 26),
        y: Math.sin((i / 16) * Math.PI * 2) * (90 + (i % 4) * 26),
        c: ["#CDFB47", "#8CF0B3", "#FFC24B", "#C9B8FF"][i % 4],
        d: 0.5 + (i % 5) * 0.12,
      })),
    []
  );

  function toggleInterest(t: string) {
    setInterests((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "busy") return;
    setError("");
    setStatus("busy");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          size,
          interests,
          date,
          slot,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      setRefId(data.id);
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
      setStatus("error");
    }
  }

  function gcalUrl() {
    const day = date.replace(/-/g, "");
    const [h, m] = slot.split(":").map(Number);
    const end = new Date(2000, 0, 1, h, m + 30);
    const pad = (n: number) => String(n).padStart(2, "0");
    const start = `${day}T${pad(h)}${pad(m)}00`;
    const endS = `${day}T${pad(end.getHours())}${pad(end.getMinutes())}00`;
    const text = encodeURIComponent(`BudgeTree demo — ${company}`);
    const details = encodeURIComponent(
      `Booking ${refId}. Products: ${interests.join(", ")}. We'll call ${email}.`
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${endS}&details=${details}`;
  }

  function downloadIcs() {
    const [h, m] = slot.split(":").map(Number);
    const end = new Date(2000, 0, 1, h, m + 30);
    const pad = (n: number) => String(n).padStart(2, "0");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `UID:${refId}@budgetree.in`,
      `DTSTAMP:${date.replace(/-/g, "")}T000000`,
      `DTSTART:${date.replace(/-/g, "")}T${pad(h)}${pad(m)}00`,
      `DTEND:${date.replace(/-/g, "")}T${pad(end.getHours())}${pad(end.getMinutes())}00`,
      `SUMMARY:BudgeTree demo — ${company}`,
      `DESCRIPTION:Booking ${refId}. Products: ${interests.join(", ")}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = `budgetree-demo-${refId}.ics`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const dayLabel = date
    ? (() => {
        const d = days.find((x) => x.value === date);
        return d ? `${d.dow}, ${d.num} ${d.mon}` : date;
      })()
    : "";

  return (
    <main className="overflow-hidden">
      <section className="relative pb-20 pt-36 sm:pt-40">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_50%_at_50%_0%,black,transparent)]" />
        <div className="pointer-events-none absolute -top-24 right-0 h-[380px] w-[380px] rounded-full bg-volt/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatePresence mode="wait">
            {status === "done" ? (
              /* ---------------- Success ---------------- */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mx-auto max-w-2xl text-center"
              >
                <div className="relative mx-auto grid h-28 w-28 place-items-center">
                  {particles.map((p, i) => (
                    <motion.span
                      key={i}
                      className="absolute left-1/2 top-1/2 h-2.5 w-2.5 rounded-full"
                      style={{ background: p.c }}
                      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                      animate={{ x: p.x, y: p.y, scale: [0, 1, 0.6], opacity: [1, 1, 0] }}
                      transition={{ duration: 1.4, delay: 0.25, ease: EASE }}
                    />
                  ))}
                  <motion.span
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                    className="grid h-24 w-24 place-items-center rounded-full bg-volt shadow-glow"
                  >
                    <Check className="h-12 w-12 text-coal" strokeWidth={3} />
                  </motion.span>
                </div>
                <h1 className="mt-8 font-display text-4xl font-bold text-fg sm:text-5xl">
                  You&apos;re booked,{" "}
                  <span className="font-serifit font-normal italic text-acc">
                    {name.split(" ")[0]}!
                  </span>
                </h1>
                <p className="mt-4 text-fg/60 sm:text-lg">
                  Our team will reach out at <span className="font-semibold text-fg">{email}</span> shortly.
                </p>
                <div className="mx-auto mt-8 grid max-w-md gap-3 rounded-3xl border border-line/10 bg-raise p-6 text-left">
                  {[
                    ["Booking ref", refId],
                    ["When", `${dayLabel} · ${slot} IST`],
                    ["Company", `${company} (${size} people)`],
                    ["Interests", interests.join(", ") || "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-fg/50">{k}</span>
                      <span className="text-right font-bold text-fg">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a
                    href={gcalUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full bg-volt px-6 py-3 font-display text-sm font-bold text-coal transition hover:bg-paper"
                  >
                    <CalendarCheck className="h-4 w-4" /> Add to Google Calendar
                  </a>
                  <button
                    onClick={downloadIcs}
                    className="flex items-center gap-2 rounded-full border border-line/20 px-6 py-3 font-display text-sm font-bold text-fg transition hover:border-acc/60"
                  >
                    <Download className="h-4 w-4" /> Download .ics
                  </button>
                </div>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setDate("");
                    setSlot("");
                  }}
                  className="mt-6 text-sm font-semibold text-fg/50 underline-offset-4 hover:text-fg hover:underline"
                >
                  Book another slot
                </button>
              </motion.div>
            ) : (
              /* ---------------- Form ---------------- */
              <motion.div
                key="form"
                exit={{ opacity: 0, y: -20 }}
                className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14"
              >
                {/* Left pitch */}
                <div>
                  <Reveal>
                    <span className="inline-flex items-center gap-2 rounded-full border border-acc/30 bg-acc/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-acc">
                      <CalendarCheck className="h-4 w-4" /> 20-minute live demo
                    </span>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h1 className="mt-5 font-display text-4xl font-bold leading-[1.0] tracking-tight text-fg sm:text-6xl">
                      See it running on{" "}
                      <span className="font-serifit font-normal italic text-acc">
                        your data.
                      </span>
                    </h1>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <ul className="mt-7 space-y-3">
                      {[
                        "Live walkthrough of RewardX, LoyaltyX & payouts",
                        "ROI estimate built from your team size",
                        "Answers on compliance, TDS & security",
                        "Zero pressure — no 47-email follow-up sequence",
                      ].map((t) => (
                        <li key={t} className="flex items-start gap-2.5 text-sm text-fg/75 sm:text-base">
                          <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-jade" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <div className="relative mt-8 overflow-hidden rounded-3xl border border-line/10">
                      <img
                        src="/images/demo-side.png"
                        alt="BudgeTree demo"
                        className="aspect-[16/8] w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-coal/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                          ))}
                        </div>
                        <p className="text-xs font-semibold text-paper/90">
                          “Campaign launches went from weeks to a single afternoon.” — Rahul K.
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* Right form */}
                <Reveal delay={0.1}>
                  <form
                    onSubmit={submit}
                    className="rounded-[2rem] border border-line/10 bg-raise p-6 shadow-card sm:p-8"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="relative block">
                        <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/35" />
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name"
                          className={inputCls}
                        />
                      </label>
                      <label className="relative block">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/35" />
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Work email"
                          className={inputCls}
                        />
                      </label>
                      <label className="relative block">
                        <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/35" />
                        <input
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Company"
                          className={inputCls}
                        />
                      </label>
                      <label className="relative block">
                        <select
                          value={size}
                          onChange={(e) => setSize(e.target.value)}
                          className="w-full appearance-none rounded-2xl border border-line/15 bg-line/5 px-4 py-3 text-sm text-fg focus:border-acc/60 focus:outline-none"
                          aria-label="Team size"
                        >
                          {SIZES.map((s) => (
                            <option key={s} value={s} className="bg-raise">
                              {s} people
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/35" />
                      </label>
                    </div>

                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-fg/45">
                      I&apos;m interested in
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {INTERESTS.map((t) => {
                        const on = interests.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => toggleInterest(t)}
                            className={cn(
                              "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition",
                              on
                                ? "border-acc/60 bg-acc/15 text-fg"
                                : "border-line/15 text-fg/55 hover:border-line/30 hover:text-fg"
                            )}
                          >
                            {on && <Check className="h-3.5 w-3.5 text-acc" />}
                            {t}
                          </button>
                        );
                      })}
                    </div>

                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-fg/45">
                      Pick a day
                    </p>
                    <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                      {days.map((d) => (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => setDate(d.value)}
                          className={cn(
                            "rounded-2xl border py-2.5 text-center transition",
                            date === d.value
                              ? "border-volt bg-volt text-coal"
                              : "border-line/15 text-fg hover:border-acc/50"
                          )}
                        >
                          <span className="block text-[10px] font-bold uppercase tracking-widest opacity-70">
                            {d.dow}
                          </span>
                          <span className="block font-display text-lg font-bold leading-tight">
                            {d.num}
                          </span>
                          <span className="block text-[10px] font-semibold opacity-70">
                            {d.mon}
                          </span>
                        </button>
                      ))}
                    </div>

                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-fg/45">
                      Pick a time <span className="normal-case tracking-normal">(IST)</span>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SLOTS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSlot(s)}
                          className={cn(
                            "rounded-full border px-5 py-2 font-display text-sm font-bold tabular-nums transition",
                            slot === s
                              ? "border-volt bg-volt text-coal"
                              : "border-line/15 text-fg hover:border-acc/50"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Anything we should prepare? (team size, use case, timeline…)"
                      rows={3}
                      className="mt-6 w-full resize-none rounded-2xl border border-line/15 bg-line/5 px-4 py-3 text-sm text-fg placeholder:text-fg/35 focus:border-acc/60 focus:outline-none"
                    />

                    <AnimatePresence>
                      {(status === "error" || (!date || !slot)) && status !== "busy" && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden text-sm font-semibold text-honey"
                        >
                          <span className="block pt-3">
                            {status === "error" && error
                              ? error
                              : "Select a day and time slot to continue."}
                          </span>
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <button
                      type="submit"
                      disabled={status === "busy" || !date || !slot}
                      className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-volt py-4 font-display text-base font-bold text-coal shadow-glow transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                    >
                      {status === "busy" ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" /> Booking your slot…
                        </>
                      ) : (
                        <>
                          Confirm demo slot
                          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-xs text-fg/40">
                      No spam, ever. Reschedule anytime from your inbox.
                    </p>
                  </form>
                </Reveal>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
