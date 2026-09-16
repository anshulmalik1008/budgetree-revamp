"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Check,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
  Users,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { EASE, Reveal, SectionTag } from "@/components/ui";

const REGIONS = ["Asia", "Europe", "America", "Africa", "Oceania"] as const;
type Region = (typeof REGIONS)[number];

const COUNTRIES: Record<Region, string[]> = {
  Asia: ["India", "Singapore", "Malaysia", "Indonesia", "Thailand", "Japan", "South Korea", "China"],
  Europe: ["United Kingdom", "Germany", "France", "Netherlands", "UAE", "Saudi Arabia"],
  America: ["United States", "Canada", "Brazil", "Mexico"],
  Africa: ["South Africa", "Nigeria", "Kenya", "Egypt"],
  Oceania: ["Australia", "New Zealand", "Fiji"],
};

const USER_SIZES = ["1–50", "51–200", "201–1,000", "1,001–5,000", "5,000+"];
const SOLUTIONS = [
  "Dealer & Channel Loyalty",
  "UPI Cashtoken Program",
  "Payout",
  "Rewards & Giftcards",
  "API Services",
  "White Label Solution",
  "Employee Engagement",
  "Corporate Gifting",
];

const inputCls =
  "w-full rounded-2xl border border-line/15 bg-line/5 py-3 pl-11 pr-4 text-sm text-fg placeholder:text-fg/35 focus:border-acc/60 focus:outline-none transition";
const selectCls =
  "w-full appearance-none rounded-2xl border border-line/15 bg-line/5 px-4 py-3 text-sm text-fg focus:border-acc/60 focus:outline-none";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    region: "Asia" as Region,
    country: "India",
    phone: "",
    users: USER_SIZES[1],
    solution: SOLUTIONS[0],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "busy") return;
    setError("");
    setStatus("busy");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again.");
      setStatus("error");
    }
  }

  return (
    <main className="overflow-hidden">
      <section className="relative pb-24 pt-36 sm:pt-40">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_50%_at_50%_0%,black,transparent)]" />
        <div className="glow-volt pointer-events-none absolute -top-24 left-0 h-[380px] w-[380px] rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* Left pitch */}
            <div>
              <SectionTag index="◆" label="Contact" />
              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="mt-5 font-display text-5xl font-bold leading-[0.98] tracking-tight text-fg sm:text-6xl"
              >
                Fly high with{" "}
                <span className="font-serifit font-normal italic text-acc">
                  BudgeTree.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
                className="mt-5 max-w-md text-base leading-relaxed text-fg/65 sm:text-lg"
              >
                Intelligent rewards & seamless payouts for employees, customers
                and partners — with expert guidance from first call to launch.
              </motion.p>

              <motion.ul
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                className="mt-8 space-y-4"
              >
                {[
                  { icon: Mail, t: "hello@budgetree.in", s: "Sales, support & partnerships" },
                  { icon: Phone, t: "+91 98-7654-3210", s: "Mon–Sat · 9:30–18:30 IST" },
                  { icon: MapPin, t: "New Delhi, India", s: "Serving 175+ countries" },
                ].map((c) => (
                  <li
                    key={c.t}
                    className="flex items-center gap-4 rounded-2xl border border-line/10 bg-raise p-4 transition hover:border-acc/40"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-volt text-coal shadow-glow">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-display text-sm font-bold text-fg">{c.t}</span>
                      <span className="block text-xs text-fg/55">{c.s}</span>
                    </span>
                  </li>
                ))}
              </motion.ul>
              <Reveal delay={0.35}>
                <p className="mt-6 flex items-center gap-2 text-sm text-fg/55">
                  <MessageSquare className="h-4 w-4 text-acc" />
                  Response within one business day — usually much faster.
                </p>
              </Reveal>
            </div>

            {/* Right form */}
            <Reveal delay={0.1}>
              {status === "done" ? (
                <div className="rounded-[2rem] border border-line/10 bg-raise p-8 text-center shadow-card sm:p-12">
                  <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-volt shadow-glow">
                    <Check className="h-10 w-10 text-coal" strokeWidth={3} />
                  </span>
                  <h2 className="mt-6 font-display text-3xl font-bold text-fg">
                    Message received!
                  </h2>
                  <p className="mx-auto mt-3 max-w-sm text-fg/60">
                    Thanks, {form.name.split(" ")[0]}. Our team will reach out
                    at <span className="font-semibold text-fg">{form.email}</span> within
                    one business day.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-7 text-sm font-semibold text-fg/50 underline-offset-4 hover:text-fg hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  className="rounded-[2rem] border border-line/10 bg-raise p-6 shadow-card sm:p-8"
                >
                  <h2 className="font-display text-2xl font-bold text-fg">
                    Send us a message
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="relative block">
                      <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/35" />
                      <input
                        required
                        value={form.name}
                        onChange={(e) => set("name")(e.target.value)}
                        placeholder="Your name"
                        className={inputCls}
                      />
                    </label>
                    <label className="relative block">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/35" />
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email")(e.target.value)}
                        placeholder="Work email"
                        className={inputCls}
                      />
                    </label>
                    <label className="relative block">
                      <select
                        value={form.region}
                        onChange={(e) => {
                          const region = e.target.value as Region;
                          setForm((f) => ({
                            ...f,
                            region,
                            country: COUNTRIES[region][0],
                          }));
                        }}
                        className={selectCls}
                        aria-label="Region"
                      >
                        {REGIONS.map((r) => (
                          <option key={r} className="bg-raise">
                            {r}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/35" />
                    </label>
                    <label className="relative block">
                      <select
                        value={form.country}
                        onChange={(e) => set("country")(e.target.value)}
                        className={selectCls}
                        aria-label="Country"
                      >
                        {COUNTRIES[form.region].map((c) => (
                          <option key={c} className="bg-raise">
                            {c}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/35" />
                    </label>
                    <label className="relative block">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/35" />
                      <input
                        value={form.phone}
                        onChange={(e) => set("phone")(e.target.value)}
                        placeholder="+91 phone number"
                        className={inputCls}
                      />
                    </label>
                    <label className="relative block">
                      <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/35" />
                      <select
                        value={form.users}
                        onChange={(e) => set("users")(e.target.value)}
                        className={`${selectCls} pl-11`}
                        aria-label="Number of users"
                      >
                        {USER_SIZES.map((s) => (
                          <option key={s} className="bg-raise">
                            {s} users
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="relative block sm:col-span-2">
                      <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg/35" />
                      <select
                        value={form.solution}
                        onChange={(e) => set("solution")(e.target.value)}
                        className={`${selectCls} pl-11`}
                        aria-label="Solution"
                      >
                        {SOLUTIONS.map((s) => (
                          <option key={s} className="bg-raise">
                            {s}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => set("message")(e.target.value)}
                    placeholder="Tell us about your use case, team size and timeline…"
                    rows={4}
                    className="mt-4 w-full resize-none rounded-2xl border border-line/15 bg-line/5 px-4 py-3 text-sm text-fg placeholder:text-fg/35 focus:border-acc/60 focus:outline-none"
                  />
                  {status === "error" && (
                    <p className="pt-3 text-sm font-semibold text-honey">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "busy"}
                    className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-volt py-4 font-display text-base font-bold text-coal shadow-glow transition hover:bg-paper disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                  >
                    {status === "busy" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Submit message
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
