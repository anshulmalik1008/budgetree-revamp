"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Blocks, Plug2 } from "lucide-react";
import { useState } from "react";
import { EASE, Reveal, SectionTag, cn } from "./ui";

type Tool = { name: string; letter: string; color: string };

const TABS: Array<{
  id: string;
  label: string;
  desc: string;
  tools: Tool[];
}> = [
  {
    id: "crm",
    label: "CRM",
    desc: "Sync CRM data to trigger personalized rewards the moment deals move.",
    tools: [
      { name: "HubSpot", letter: "H", color: "#FF7A45" },
      { name: "Salesforce", letter: "S", color: "#5AA9FF" },
      { name: "Zoho CRM", letter: "Z", color: "#FF5A5A" },
      { name: "Oracle", letter: "O", color: "#FF4D4D" },
    ],
  },
  {
    id: "sales",
    label: "Sales",
    desc: "Reward pipeline wins automatically from sheets and sales tools.",
    tools: [
      { name: "Google Sheets", letter: "G", color: "#4CC38A" },
      { name: "LeadSquared", letter: "L", color: "#B48CFF" },
      { name: "Freshsales", letter: "F", color: "#57D9A3" },
      { name: "Dynamics 365", letter: "D", color: "#5AA9FF" },
    ],
  },
  {
    id: "survey",
    label: "Survey",
    desc: "Incentivize NPS, feedback and survey completion in real time.",
    tools: [
      { name: "SurveyMonkey", letter: "S", color: "#9BE15D" },
      { name: "Typeform", letter: "T", color: "#F4F0E6" },
      { name: "Medallia", letter: "M", color: "#5AA9FF" },
      { name: "Jotform", letter: "J", color: "#7CC7FF" },
    ],
  },
  {
    id: "hrms",
    label: "HRMS",
    desc: "Recognize employees right from your HR platform — zero context switching.",
    tools: [
      { name: "BambooHR", letter: "B", color: "#7BD88F" },
      { name: "Workday", letter: "W", color: "#5AA9FF" },
      { name: "UKG", letter: "U", color: "#5EEAD4" },
      { name: "Zoho People", letter: "Z", color: "#FF5A5A" },
    ],
  },
];

export default function Integrations() {
  const [active, setActive] = useState(TABS[0]);

  return (
    <section id="integrations" className="relative overflow-hidden bg-base py-24 sm:py-32">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_55%_45%_at_50%_0%,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTag index="07" label="Integrations" />
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.05}>
            <h2 className="max-w-xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl">
              Connect{" "}
              <span className="font-serifit font-normal italic text-acc">
                sales, HRMS & more.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-md text-base leading-relaxed text-fg/60 sm:text-lg">
              Plug into 30+ tools your teams already use — CRM, sales stacks,
              HRMS, surveys and productivity apps.
            </p>
          </Reveal>
        </div>

        {/* Tabs */}
        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t)}
                className={cn(
                  "relative rounded-full px-6 py-2.5 font-display text-sm font-bold transition-colors",
                  active.id === t.id ? "text-coal" : "text-fg/60 hover:text-fg"
                )}
              >
                {active.id === t.id && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-volt"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Panel */}
        <div className="mt-6 min-h-[280px] overflow-hidden rounded-[2rem] border border-line/10 bg-sunken/40 p-7 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="max-w-xl text-base text-fg/65 sm:text-lg">{active.desc}</p>
              <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {active.tools.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: EASE }}
                    className="group flex cursor-pointer items-center gap-3.5 rounded-2xl border border-line/10 bg-base/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-acc/50"
                  >
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-lg font-bold text-coal"
                      style={{ background: tool.color }}
                    >
                      {tool.letter}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-fg">
                        {tool.name}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-acc opacity-0 transition-opacity group-hover:opacity-100">
                        Connect <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-fg/55">
            <span className="flex items-center gap-2 rounded-full border border-line/10 px-4 py-2">
              <Plug2 className="h-4 w-4 text-acc" /> REST API
            </span>
            <span className="flex items-center gap-2 rounded-full border border-line/10 px-4 py-2">
              <Blocks className="h-4 w-4 text-acc" /> Webhooks
            </span>
            <span className="rounded-full border border-line/10 px-4 py-2 font-semibold">
              + Zapier · Make · Custom SFTP
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
