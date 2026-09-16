"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import { useState } from "react";
import { EASE, Reveal, SectionTag, cn } from "./ui";

const FAQS = [
  {
    q: "How fast can we actually launch?",
    a: "Most teams go live in under 24 hours. Pick a pre-built template, connect your HRMS or CRM, load funds — and your first campaign is out the same day. Enterprise onboarding with SSO and custom workflows takes 3–5 days.",
  },
  {
    q: "Do reward recipients need to install an app?",
    a: "No. UPI cash tokens arrive as a secure link over SMS, email or WhatsApp. Recipients tap, verify and receive money straight in their bank account. Gift cards work the same way — zero downloads, zero sign-ups.",
  },
  {
    q: "Is BudgeTree compliant for Indian enterprises?",
    a: "Yes. We handle TDS deduction, GST invoicing, PAN verification and audit trails out of the box. Payouts run over RBI-compliant rails with bank-level encryption, and you get 99.99% uptime SLAs.",
  },
  {
    q: "Can we white-label the experience?",
    a: "Completely. Your logo, brand colors, custom domains and email templates — recipients only ever see your brand. LoyaltyX even supports fully native in-app redemption SDKs.",
  },
  {
    q: "What does pricing look like?",
    a: "Simple platform fee plus a small per-transaction charge that drops with volume. No setup fees, no lock-in on starter plans. Most customers recover the cost within their first campaign through automation savings alone.",
  },
  {
    q: "Which tools does it integrate with?",
    a: "30+ native integrations including HubSpot, Salesforce, Zoho, Workday, BambooHR, Typeform and Google Sheets — plus a full REST API, webhooks and Zapier/Make connectors for anything custom.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-base pb-24 sm:pb-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionTag index="08" label="FAQ" />
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-fg sm:text-5xl">
              Questions?{" "}
              <span className="font-serifit font-normal italic text-acc">
                Answered.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-sm leading-relaxed text-fg/60">
              Everything teams usually ask before switching. Still curious?
              Talk to a human — we reply within hours, not days.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a
              href="/demo"
              className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-line/15 px-6 py-3.5 font-display text-sm font-bold text-fg transition hover:border-acc/60 hover:bg-line/5"
            >
              <MessageCircle className="h-4 w-4 text-acc" />
              Chat with sales
            </a>
          </Reveal>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-colors duration-300",
                    isOpen
                      ? "border-acc/40 bg-sunken/60"
                      : "border-line/10 bg-line/[0.03] hover:border-line/25"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="font-display text-base font-bold text-fg sm:text-lg">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={cn(
                        "grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors",
                        isOpen ? "bg-volt text-coal" : "bg-line/10 text-fg"
                      )}
                    >
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        <p className="px-5 pb-6 leading-relaxed text-fg/65 sm:px-6">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
