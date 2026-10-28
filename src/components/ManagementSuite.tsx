"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight, Boxes, ChartNoAxesCombined, ClipboardList,
  PackageSearch, Warehouse, Target, BadgePercent, Tags, Trophy,
} from "lucide-react";
import { Reveal, SectionTag } from "./ui";

const modules = [
  { name: "Warehouse Management", short: "Warehouse", slug: "warehouse-management", icon: Warehouse, desc: "Streamline storage, movement and dispatch.", color: "#8EE5C0", num: "01" },
  { name: "Sales Force Automation", short: "Sales Force", slug: "sales-force-automation", icon: ChartNoAxesCombined, desc: "Give field teams clearer, faster workflows.", color: "#A9B9FF", num: "02" },
  { name: "Order Management System", short: "Orders", slug: "order-management", icon: ClipboardList, desc: "Track orders from creation to fulfillment.", color: "#FFD39B", num: "03" },
  { name: "Product Information Management", short: "Product Info", slug: "product-information-management", icon: PackageSearch, desc: "Keep product information organized.", color: "#E4B8FF", num: "04" },
  { name: "Inventory Management", short: "Inventory", slug: "inventory-management", icon: Boxes, desc: "Stay on top of stock and availability.", color: "#9BDAFF", num: "05" },
  { name: "Target Management", short: "Targets", slug: "target-management", icon: Target, desc: "Set goals and follow team performance.", color: "#F5B5C7", num: "06" },
  { name: "Scheme & Offers", short: "Schemes", slug: "scheme-and-offers", icon: BadgePercent, desc: "Plan and manage promotional programs.", color: "#B9F08A", num: "07" },
  { name: "Pricing Management", short: "Pricing", slug: "pricing-management", icon: Tags, desc: "Manage prices with greater clarity.", color: "#F5D98B", num: "08" },
  { name: "Incentive Management", short: "Incentives", slug: "incentive-management", icon: Trophy, desc: "Recognize performance and track incentives.", color: "#A5E9E4", num: "09" },
];

export default function ManagementSuite() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="management-suite" className="relative overflow-hidden bg-base py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(ellipse at 80% 10%, #33517955, transparent 55%)" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTag index="04" label="Business management suite" />
        <Reveal>
          <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-fg sm:text-5xl lg:text-6xl">
                Every operation. <span className="font-serif font-normal italic text-acc">One connected suite.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg/60 sm:text-lg">
                Explore nine powerful modules designed for modern business operations.
              </p>
            </div>
            <span className="w-fit rounded-full border border-line/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-fg/60">09 modules</span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 38, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: reduceMotion ? 0 : (i % 3) * 0.12 }}
                whileHover={reduceMotion ? undefined : { y: -7 }}
                className="group"
              >
                <Link href={`/products/suite/${item.slug}`} className="relative flex h-full min-h-[265px] flex-col overflow-hidden rounded-[1.6rem] border border-line/15 bg-raise p-7 transition-colors duration-300 hover:border-line/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc">
                  <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25" style={{ backgroundColor: item.color }} />
                  <div className="flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ backgroundColor: `${item.color}18`, color: item.color }}>
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <span className="font-display text-4xl font-bold text-fg/10">{item.num}</span>
                  </div>
                  <h3 className="mt-7 font-display text-xl font-semibold text-fg">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg/60">{item.desc}</p>
                  <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold" style={{ color: item.color }}>
                    Explore module <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
