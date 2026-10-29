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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
          {modules.map((item, i) => {
            const Icon = item.icon;
            // Column 1 slides in from left, column 2 rises, column 3 from right.
            const direction = i % 3 === 0 ? -1 : i % 3 === 2 ? 1 : 0;
            return (
              <motion.div
                key={item.slug}
                initial={reduceMotion ? false : {
                  opacity: 0,
                  x: direction * 110,
                  y: direction === 0 ? 85 : 38,
                  rotateY: direction * -12,
                  scale: 0.90,
                  filter: "blur(8px)",
                }}
                whileInView={{
                  opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1, filter: "blur(0px)",
                }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  type: "spring",
                  stiffness: 95,
                  damping: 17,
                  mass: 0.95,
                  delay: reduceMotion ? 0 : (i % 3) * 0.13 + Math.floor(i / 3) * 0.07,
                }}
                whileHover={reduceMotion ? undefined : {
                  y: -14,
                  scale: 1.025,
                  rotateX: -3,
                  rotateY: direction === 0 ? 3 : direction * 3,
                  transition: { type: "spring", stiffness: 260, damping: 20 },
                }}
                className="group relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Link
                  href={`/products/suite/${item.slug}`}
                  className="relative flex h-full min-h-[270px] flex-col overflow-hidden rounded-[1.6rem] border border-line/15 bg-raise p-7 shadow-[0_10px_35px_rgba(0,0,0,0.03)] transition-[border-color,box-shadow] duration-500 hover:border-line/40 hover:shadow-[0_25px_65px_rgba(0,0,0,0.19)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acc"
                >
                  {/* Moving highlight / glow */}
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-1/2 -top-1/2 h-[220%] w-[55%] rotate-[25deg] bg-gradient-to-r from-transparent via-white/[0.075] to-transparent"
                    initial={false}
                    whileHover={reduceMotion ? undefined : { x: 750 }}
                    transition={{ duration: 0.85, ease: "easeInOut" }}
                  />
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                    style={{ backgroundColor: item.color }}
                  />
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full origin-left"
                    style={{ backgroundColor: item.color }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.15 + i * 0.055 }}
                  />
                  <div className="relative flex items-start justify-between">
                    <motion.span
                      className="grid h-14 w-14 place-items-center rounded-2xl"
                      style={{ backgroundColor: `${item.color}20`, color: item.color }}
                      whileHover={reduceMotion ? undefined : { rotate: [0, -12, 10, 0], scale: 1.16 }}
                      transition={{ duration: 0.55 }}
                    >
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </motion.span>
                    <span className="font-display text-4xl font-bold text-fg/10 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110">
                      {item.num}
                    </span>
                  </div>
                  <h3 className="relative mt-7 font-display text-xl font-semibold text-fg">
                    {item.name}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-fg/60">
                    {item.desc}
                  </p>
                  <div className="relative mt-auto flex items-center gap-2 pt-6 text-sm font-semibold" style={{ color: item.color }}>
                    Explore module
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
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
