"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Building2, ChevronLeft, ChevronRight,
  CircleHelp, Code2, Compass, CreditCard, Gift, Layers3, Network, Package,
  Play, Plus, ShieldCheck, Sparkles, Target, TrendingUp, Users, Wallet, Zap
} from "lucide-react";
import { useState } from "react";
import { CtaBand } from "@/components/PageBits";
import { EASE, Reveal, SectionTag, cn } from "@/components/ui";

const STORY = [
  {
    year: "2019", number: "01", label: "The beginning",
    title: "An idea that started with a real business problem.",
    text: "Budgetree began in 2019 with a focus on making enterprise rewards and partner incentives easier to deliver, track and manage. One of our earliest areas of work was UPI-linked channel loyalty, developed with a partner bank.",
    tags: ["Founded in India", "B2B loyalty", "UPI-linked incentives"],
  },
  {
    year: "2024", number: "02", label: "A broader rewards universe",
    title: "From digital incentives to meaningful choice.",
    text: "Our offering grew across corporate gifting and digital rewards. SiriPay's gift-card marketplace and our work on employee, customer and channel engagement expanded the ways businesses could recognize the people who move them forward.",
    tags: ["SiriPay", "Corporate gifting", "Digital gift cards"],
  },
  {
    year: "2025", number: "03", label: "Rewards meet real-time payments",
    title: "Connecting the moment of action with the moment of reward.",
    text: "We continued building cashback and loyalty experiences for trade partners and enterprise campaigns, including UPI-based rewards in industries such as automotive. The focus stayed on faster, simpler and more measurable engagement.",
    tags: ["QR campaigns", "UPI rewards", "Channel engagement"],
  },
  {
    year: "2026", number: "04", label: "An expanding platform",
    title: "Seven years in. More connected than ever.",
    text: "Our portfolio now spans RewardX, LoyaltyX, payouts, gift-card APIs and enterprise operations. Alongside our established rewards products, we're developing connected experiences across Dealer One, VyapaarX, Omnism and our DMS offering.",
    tags: ["7 years", "Gift Card API", "Enterprise platforms"],
  },
];

const CAPABILITIES = [
  { icon: Gift, label: "Rewards & Gifting", title: "RewardX", detail: "Digital rewards, points, links, codes and experiences that make recognition easier.", href: "/products/rewardx", number: "01" },
  { icon: Users, label: "Engagement", title: "LoyaltyX", detail: "Dealer, distributor, retail, customer and employee loyalty programs designed around performance.", href: "/products/loyaltyx", number: "02" },
  { icon: Zap, label: "Instant incentives", title: "UPI Rewards", detail: "Payment-linked cashback, QR-driven campaigns and direct incentive journeys.", href: "/products/upi-rewards", number: "03" },
  { icon: Wallet, label: "Business payments", title: "Payouts", detail: "Business disbursements, incentives, vendor payments and operational reconciliation.", href: "/products/payouts", number: "04" },
  { icon: CreditCard, label: "Digital marketplace", title: "SiriPay", detail: "Gift cards and gifting experiences across leading consumer categories.", href: "https://siripay.co/", number: "05" },
  { icon: Layers3, label: "Enterprise operations", title: "Management Suite", detail: "Connected workflows for sales, inventory, orders, pricing, targets and incentives.", href: "/#management-suite", number: "06" },
];

const PLATFORMS = [
  { key: "omnism", name: "Omnism", type: "Loyalty & partner engagement", image: "/images/portals/omnism.webp",
    description: "A digital environment for partner engagement, rewards journeys and performance-linked programs.",
    points: ["Partner journeys", "Reward experiences", "Campaign visibility"] },
  { key: "vyapaarx", name: "VyapaarX", type: "Trade & distribution", image: "/images/portals/vyapaarx.webp",
    description: "A business-facing experience designed around the needs of trade and distribution networks.",
    points: ["Trade operations", "Connected workflows", "Business visibility"] },
  { key: "siripay", name: "SiriPay", type: "Digital gifting marketplace", image: "/images/portals/siripay.webp",
    description: "Our gifting experience for exploring digital gift cards and rewards in one place.",
    points: ["Gift-card discovery", "Brand choice", "Digital delivery"] },
  { key: "business-portal", name: "Business Portal", type: "Enterprise dashboard", image: "/images/portals/business-portal.webp",
    description: "A central workspace for business teams to access digital programs and day-to-day operations.",
    points: ["Centralized access", "Operational views", "Program management"] },
  { key: "intellicore", name: "Intellicore AI", type: "Intelligent engagement", image: "/images/portals/intellicore.webp",
    description: "An exploration of AI-enabled experiences across rewards, engagement, loyalty and payouts.",
    points: ["Connected experiences", "Product innovation", "AI-first thinking"] },
];

const OPERATIONS = [
  { icon: Network, name: "Dealer One", tag: "Dealer portal", copy: "A dedicated direction for dealer relationships and partner engagement." },
  { icon: Building2, name: "DMS", tag: "Distribution Management", copy: "Supporting connected distribution workflows and operational coordination." },
  { icon: Package, name: "Enterprise Suite", tag: "Business operations", copy: "Warehouse, order, inventory, target, pricing, schemes and incentive management." },
  { icon: Code2, name: "APIs & Integration", tag: "Developer-ready", copy: "Building bridges between enterprise platforms, digital rewards and payouts." },
];

const PRINCIPLES = [
  { num: "01", icon: Compass, title: "Start with the real problem", copy: "Every product should solve a genuine challenge for a customer, a partner or an enterprise team." },
  { num: "02", icon: ShieldCheck, title: "Build for trust", copy: "Thoughtful controls, visibility, responsible data handling and reliable business processes matter." },
  { num: "03", icon: Target, title: "Make engagement measurable", copy: "A reward means more when businesses can understand the behavior, participation and outcomes behind it." },
  { num: "04", icon: TrendingUp, title: "Keep moving forward", copy: "We learn from customers, improve our technology and evolve the experiences we build." },
];

const FAQS = [
  { q: "When was Budgetree founded?", a: "Budgetree was founded in 2019. In 2026, we marked seven years of work across loyalty, rewards, payments and enterprise technology." },
  { q: "What does Budgetree do?", a: "We help enterprises design and manage rewards, loyalty programs, cashback campaigns, payouts, gift-card solutions and connected business workflows." },
  { q: "Who uses Budgetree solutions?", a: "Our solutions serve enterprises working with employees, customers, dealers, distributors, retailers and other channel partners, including organizations across BFSI, retail, FMCG, automotive and related industries." },
  { q: "What are Dealer One, VyapaarX, Omnism and DMS?", a: "These are parts of Budgetree's evolving dealer, trade, loyalty and distribution technology portfolio. Exact features and availability vary by platform and implementation; our team can walk you through the right solution." },
  { q: "How can a company start working with Budgetree?", a: "Explore the relevant product, discuss your use case with our team and book a tailored demo. Implementation scope, commercials and timelines depend on the solution." },
];

function PortalShowcase() {
  const [active, setActive] = useState(0);
  const portal = PLATFORMS[active];
  return (
    <div className="overflow-hidden rounded-[2rem] border border-line/15 bg-raise shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/10 px-5 py-5 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-acc/10 text-acc"><Layers3 className="h-5 w-5" /></span>
          <div><div className="font-display text-sm font-bold text-fg">Inside our ecosystem</div><p className="text-xs text-fg/55">Actual product-interface previews</p></div>
        </div>
        <span className="rounded-full border border-line/15 px-3 py-1 text-xs font-semibold text-fg/60">0{active+1} / 0{PLATFORMS.length}</span>
      </div>
      <div className="grid lg:grid-cols-[0.38fr_0.62fr]">
        <div className="flex flex-col justify-between border-b border-line/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.19em] text-acc">{portal.type}</span>
            <AnimatePresence mode="wait">
              <motion.div key={portal.key} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                <h3 className="mt-4 font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">{portal.name}</h3>
                <p className="mt-5 max-w-sm text-base leading-relaxed text-fg/70">{portal.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">{portal.points.map((item) => (
                  <span key={item} className="rounded-full border border-line/15 bg-sunken/40 px-3 py-1.5 text-xs font-medium text-fg/75">{item}</span>
                ))}</div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-10 flex items-center gap-2">
            <button type="button" aria-label="Previous platform" onClick={() => setActive((active-1+PLATFORMS.length)%PLATFORMS.length)} className="grid h-11 w-11 place-items-center rounded-full border border-line/20 text-fg transition hover:border-acc/50 hover:bg-acc/10"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" aria-label="Next platform" onClick={() => setActive((active+1)%PLATFORMS.length)} className="grid h-11 w-11 place-items-center rounded-full border border-line/20 text-fg transition hover:border-acc/50 hover:bg-acc/10"><ChevronRight className="h-5 w-5" /></button>
            <span className="ml-3 text-xs font-semibold text-fg/50">Explore platforms</span>
          </div>
        </div>
        <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-sunken/35 p-5 sm:min-h-[460px] sm:p-8">
          <div className="pointer-events-none absolute inset-0 dot-grid opacity-45" />
          <div className="pointer-events-none absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-jade/10 blur-3xl" />
          <AnimatePresence mode="wait">
            <motion.div key={portal.image} initial={{ opacity: 0, scale: 0.96, x: 15 }}
              animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.98, x: -15 }}
              transition={{ duration: 0.36, ease: EASE }} className="relative flex h-full w-full items-center justify-center">
              <img src={portal.image} alt={portal.name + " platform interface preview"} loading="lazy"
                className="block max-h-[530px] w-full rounded-2xl border border-line/15 bg-raise object-contain shadow-[0_20px_70px_rgba(0,0,0,.15)]" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/10 px-6 py-4 sm:px-8">
        <div className="flex flex-wrap gap-2">{PLATFORMS.map((item, i) => (
          <button key={item.key} onClick={() => setActive(i)} type="button" aria-label={"Show " + item.name}
            aria-pressed={i===active} className={cn("h-2 rounded-full transition-all duration-300", i===active ? "w-9 bg-acc" : "w-2 bg-line/25 hover:bg-acc/50")} />
        ))}</div>
        <a href="/demo" className="inline-flex items-center gap-2 text-xs font-bold text-acc">Explore a demo <ArrowUpRight className="h-4 w-4" /></a>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [selectedYear, setSelectedYear] = useState(3);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const selected = STORY[selectedYear];

  return (
    <main className="overflow-hidden bg-base">
      {/* Hero: typography and an editorial 7-year graphic replace stock character artwork. */}
      <section className="relative isolate overflow-hidden pb-20 pt-36 sm:pb-24 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-35 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_20%,black,transparent)]" />
        <div className="pointer-events-none absolute -right-24 top-4 h-[480px] w-[480px] glow-volt" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.06fr_0.94fr]">
          <div>
            <SectionTag index="2019 — 2026" label="Our story · Seven years" />
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE }}
              className="mt-7 max-w-3xl font-display text-[clamp(3.15rem,6.1vw,6.4rem)] font-bold leading-[0.99] tracking-[-0.055em] text-fg">
              Seven years of <span className="font-serifit font-normal italic tracking-normal text-acc">building what matters.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16, duration: 0.65 }}
              className="mt-7 max-w-xl text-base leading-[1.85] text-fg/70 sm:text-lg">
              From our early work in UPI-linked loyalty to a connected world of rewards, payouts,
              digital gifting and enterprise technology. Our journey is shaped by the businesses
              we work with and the challenges we help them solve.
            </motion.p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#journey" className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-volt px-6 py-3.5 text-sm font-bold text-coal shadow-glow transition hover:scale-[1.02]">
                Explore our journey <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#ecosystem" className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line/20 px-6 py-3.5 text-sm font-semibold text-fg transition hover:border-acc/55">
                Our ecosystem <ArrowUpRight className="h-4 w-4 text-acc" />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4 border-t border-line/15 pt-6">
              {["Founded 2019", "Loyalty · Rewards · Payments", "Built for enterprise"].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-2 text-xs font-semibold text-fg/65">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-acc" /> {tag}
                </span>
              ))}
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 20, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.8, ease: EASE }} className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-line/15 bg-raise p-6 shadow-card sm:p-9">
              <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-acc/10 blur-[65px]" />
              <div className="relative flex items-start justify-between gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-fg/55">The Budgetree journey</span>
                <span className="rounded-full border border-acc/25 bg-acc/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-acc">Since 2019</span>
              </div>
              <div className="relative mt-10 flex items-end gap-2">
                <span className="font-display text-[clamp(8rem,16vw,13rem)] font-black leading-[0.75] tracking-[-0.11em] text-fg">07</span>
                <div className="pb-1 sm:pb-3"><p className="font-display text-xl font-extrabold uppercase leading-tight tracking-tight text-acc sm:text-2xl">Years</p><p className="mt-2 text-xs font-medium text-fg/55">Of building trust</p></div>
              </div>
              <div className="relative mt-11 grid grid-cols-3 gap-2 border-t border-line/15 pt-7">
                {[{ title: "Rewards", icon: Gift }, { title: "Loyalty", icon: Users }, { title: "Payments", icon: Wallet }].map((x) => (
                  <div key={x.title} className="rounded-xl border border-line/10 bg-sunken/40 px-2 py-4 text-center">
                    <x.icon className="mx-auto h-5 w-5 text-acc" />
                    <p className="mt-2 text-xs font-bold text-fg">{x.title}</p>
                  </div>
                ))}
              </div>
              <div className="relative mt-6 flex items-center justify-between gap-3 rounded-2xl bg-sunken/50 p-4">
                <p className="max-w-[230px] text-sm font-medium leading-snug text-fg/75">Built in India. Growing with the businesses we serve.</p>
                <Sparkles className="h-7 w-7 shrink-0 text-acc" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story / grounded milestones. */}
      <section id="journey" className="scroll-mt-28 border-y border-line/10 bg-raise/50 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTag index="01" label="The journey" />
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-5xl">
              Every chapter built <span className="font-serifit font-normal italic text-acc">on the last.</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-fg/65">A look at the milestones that shaped the platform we are building today.</p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {STORY.map((year, i) => (
                <button key={year.year} type="button" onClick={() => setSelectedYear(i)} aria-pressed={i===selectedYear}
                  className={cn("rounded-2xl border px-5 py-5 text-left transition-all sm:py-6",
                    i===selectedYear ? "border-acc/45 bg-acc/10 shadow-[inset_0_0_0_1px_rgba(150,200,40,.08)]" : "border-line/15 bg-base/60 hover:border-acc/30")}>
                  <span className={cn("block font-display text-3xl font-extrabold", i===selectedYear ? "text-acc" : "text-fg")}>{year.year}</span>
                  <span className="mt-2 block text-[11px] font-semibold text-fg/60">{year.label}</span>
                </button>
              ))}
            </div>
            <div className="relative flex min-h-[355px] flex-col justify-between overflow-hidden rounded-[2rem] border border-line/15 bg-base p-7 shadow-card sm:min-h-[380px] sm:p-10">
              <div className="pointer-events-none absolute -right-10 -top-12 select-none font-display text-[160px] font-black leading-none text-acc/[0.07]">{selected.number}</div>
              <AnimatePresence mode="wait">
                <motion.div key={selected.year} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="relative">
                  <span className="text-xs font-bold uppercase tracking-[0.17em] text-acc">{selected.year} / {selected.label}</span>
                  <h3 className="mt-6 max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl">{selected.title}</h3>
                  <p className="mt-5 max-w-2xl text-base leading-[1.85] text-fg/70">{selected.text}</p>
                  <div className="mt-8 flex flex-wrap gap-2">{selected.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-line/15 bg-raise px-3 py-2 text-xs font-semibold text-fg/75">{tag}</span>
                  ))}</div>
                </motion.div>
              </AnimatePresence>
              <div className="relative mt-9 flex items-center justify-between border-t border-line/15 pt-5">
                <div className="flex items-center gap-2">{STORY.map((x, i) => (
                  <button type="button" key={x.year} onClick={() => setSelectedYear(i)} aria-label={"View " + x.year} className={cn("h-1.5 rounded-full transition-all", i===selectedYear ? "w-8 bg-acc" : "w-2 bg-line/25")} />
                ))}</div>
                <span className="text-xs font-semibold text-fg/50">2019 — 2026</span>
              </div>
            </div>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-fg/45">Milestones summarize publicly described initiatives and our product journey; not every launch is tied to an independently verified exact date.</p>
        </div>
      </section>

      {/* Why we are here */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[0.55fr_0.45fr]">
          <div>
            <SectionTag index="02" label="The idea behind Budgetree" />
            <Reveal><h2 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-fg sm:text-5xl">
              The reward should be simple. <span className="font-serifit font-normal italic text-acc">The technology behind it doesn't have to be.</span>
            </h2></Reveal>
            <Reveal delay={0.1}><p className="mt-7 max-w-2xl text-base leading-[1.95] text-fg/70">
              We saw how much time businesses spent coordinating incentive campaigns, gift-card vendors,
              partner lists, payments and reporting. Rather than asking teams to manage disconnected
              systems, we chose to build technology that brings these experiences closer together.
            </p></Reveal>
            <Reveal delay={0.16}><p className="mt-4 max-w-2xl text-base leading-[1.95] text-fg/70">
              Today, that thinking extends from an individual reward all the way to the trade,
              distribution and enterprise workflows around it. Seven years later, our direction is
              still the same: build practical products, learn from our customers and earn their trust.
            </p></Reveal>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:pt-7">
            {PRINCIPLES.map((p) => (
              <Reveal key={p.num}>
                <div className="h-full rounded-2xl border border-line/15 bg-raise p-5 transition hover:border-acc/35 sm:p-6">
                  <div className="flex items-center justify-between"><p.icon className="h-6 w-6 text-acc" /><span className="text-xs font-bold text-fg/35">{p.num}</span></div>
                  <h3 className="mt-5 font-display text-lg font-bold text-fg">{p.title}</h3>
                  <p className="mt-3 text-sm leading-[1.75] text-fg/65">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="ecosystem" className="scroll-mt-28 border-y border-line/10 bg-raise/40 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTag index="03" label="What we build" />
          <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
            <h2 className="max-w-2xl font-display text-4xl font-bold leading-tight text-fg sm:text-5xl">One ecosystem. <span className="font-serifit font-normal italic text-acc">Many ways to grow.</span></h2>
            <p className="max-w-xs text-sm leading-relaxed text-fg/60">Explore the products that connect business engagement with reward delivery.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((p) => (
              <Reveal key={p.title}>
                <a href={p.href} target={p.href.startsWith("http") ? "_blank" : undefined}
                  rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl border border-line/15 bg-base p-7 transition-all duration-300 hover:-translate-y-1 hover:border-acc/40 hover:shadow-card">
                  <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-acc/10 text-acc"><p.icon className="h-6 w-6" /></span><span className="font-display text-sm font-bold text-fg/30">{p.number}</span></div>
                  <span className="mt-7 text-[10px] font-bold uppercase tracking-[0.16em] text-acc">{p.label}</span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-fg">{p.title}</h3>
                  <p className="mt-3 text-sm leading-[1.8] text-fg/65">{p.detail}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-acc">Discover more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Product visuals instead of oversized stock characters. */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTag index="04" label="Inside the platform" />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-3xl font-display text-4xl font-bold leading-tight text-fg sm:text-5xl">A closer look at <span className="font-serifit font-normal italic text-acc">what we actually build.</span></h2>
            <p className="max-w-xs text-sm leading-[1.85] text-fg/65">Product interface previews from the Budgetree ecosystem—not generic stock photography.</p>
          </div>
          <div className="mt-10"><PortalShowcase /></div>
        </div>
      </section>

      {/* Dealer / distribution direction */}
      <section className="border-y border-line/10 bg-raise/40 py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTag index="05" label="Beyond rewards" />
          <div className="mt-6 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="max-w-lg font-display text-4xl font-bold leading-[1.08] text-fg sm:text-5xl">
                From the reward <span className="font-serifit font-normal italic text-acc">to the entire workflow.</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-[1.85] text-fg/70">
                Loyalty doesn't operate in isolation. Dealer activity, sales, distribution,
                campaign operations and fulfilment all matter. Our expanding platform portfolio
                reflects that bigger picture.
              </p>
              <a href="/solutions" className="mt-7 inline-flex items-center gap-2 font-bold text-acc">View enterprise solutions <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {OPERATIONS.map((op) => (
                <Reveal key={op.name}>
                  <div className="h-full rounded-2xl border border-line/15 bg-base p-6 transition hover:border-acc/35">
                    <op.icon className="h-6 w-6 text-acc" />
                    <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-acc">{op.tag}</p>
                    <h3 className="mt-2 font-display text-xl font-bold text-fg">{op.name}</h3>
                    <p className="mt-3 text-sm leading-[1.8] text-fg/65">{op.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next chapter */}
      <section className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-line/15 bg-sunken/40 p-8 shadow-card sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -right-28 top-0 h-96 w-96 glow-volt" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div><span className="text-[11px] font-bold uppercase tracking-[0.2em] text-acc">The next chapter</span>
                <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.1] text-fg sm:text-5xl">Seven years completed. <span className="font-serifit font-normal italic text-acc">Still just getting started.</span></h2>
                <p className="mt-6 max-w-2xl text-base leading-[1.85] text-fg/70">What matters most is not a milestone on a calendar. It's the relationships we've built and the trust placed in our team. Our next chapter is about better technology, connected enterprise products and more useful experiences for the businesses we serve.</p>
              </div>
              <a href="/contact" className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-volt px-7 py-4 font-display text-sm font-bold text-coal">Build with us <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Honest FAQ */}
      <section className="border-t border-line/10 bg-raise/45 py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionTag index="06" label="Good to know" />
            <h2 className="mt-5 max-w-md font-display text-4xl font-bold leading-tight text-fg sm:text-5xl">Questions about <span className="font-serifit font-normal italic text-acc">our journey.</span></h2>
            <p className="mt-5 max-w-sm text-sm leading-[1.9] text-fg/65">A few answers about Budgetree and the work we do today.</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const expanded = openFaq === i;
              return (
                <div key={f.q} className={cn("overflow-hidden rounded-2xl border transition-colors", expanded ? "border-acc/40 bg-sunken/45" : "border-line/15 bg-base/50 hover:border-acc/25")}>
                  <button type="button" aria-expanded={expanded} onClick={() => setOpenFaq(expanded ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6">
                    <span className="font-display text-base font-bold text-fg sm:text-lg">{f.q}</span>
                    <motion.span animate={{ rotate: expanded ? 45 : 0 }} className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full", expanded ? "bg-volt text-coal" : "bg-line/10 text-fg")}><Plus className="h-4 w-4" /></motion.span>
                  </button>
                  <AnimatePresence initial={false}>{expanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <p className="px-5 pb-6 text-sm leading-[1.9] text-fg/70 sm:px-6">{f.a}</p>
                    </motion.div>
                  )}</AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
