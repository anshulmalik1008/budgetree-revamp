"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Gift,
  Menu,
  Receipt,
  Sparkles,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { EASE, Magnetic, cn } from "./ui";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const PRODUCTS = [
  {
    icon: Gift,
    name: "RewardX",
    slug: "rewardx",
    desc: "Recognize teams & customers instantly",
    color: "bg-acc/15 text-acc",
  },
  {
    icon: Sparkles,
    name: "LoyaltyX",
    slug: "loyaltyx",
    desc: "AI-powered loyalty & redemption",
    color: "bg-grape/15 text-grape",
  },
  {
    icon: Zap,
    name: "UPI Rewards",
    slug: "upi-rewards",
    desc: "Cash tokens straight to bank accounts",
    color: "bg-honey/15 text-honey",
  },
  {
    icon: Wallet,
    name: "Payouts",
    slug: "payouts",
    desc: "Bulk disbursements at scale",
    color: "bg-jade/15 text-jade",
  },
  {
    icon: Receipt,
    name: "Bill Payments",
    slug: "bill-payments",
    desc: "Utilities & bills in one flow",
    color: "bg-azure/15 text-azure",
  },
];

const LINKS = [
  { label: "Why BudgeTree", href: "/#why" },
  { label: "Products", href: "/#products", dropdown: true },
  { label: "ROI", href: "/#roi" },
  { label: "Customers", href: "/#customers" },
  { label: "Integrations", href: "/#integrations" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 30);
    setHidden(y > prev && y > 260 && !open);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Announcement bar */}
        <motion.div
          animate={{ height: scrolled ? 0 : "auto", opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="overflow-hidden bg-volt text-coal"
        >
          <a
            href="/#products"
            className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-center text-[11px] font-bold uppercase tracking-[0.18em] sm:text-xs"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="truncate">
              New · UPI Cash Tokens 2.0 is live — instant, app-free rewards
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
          </a>
        </motion.div>

        {/* Nav pill */}
        <div
          className={cn(
            "transition-all duration-300",
            scrolled
              ? "border-b border-line/10 bg-base/90"
              : "border-b border-transparent bg-transparent"
          )}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            <a href="/" aria-label="BudgeTree home">
              <Logo />
            </a>

            {/* Desktop links */}
            <div className="hidden items-center gap-1 lg:flex">
              {LINKS.map((l) =>
                l.dropdown ? (
                  <div
                    key={l.label}
                    className="relative"
                    onMouseEnter={() => setDrop(true)}
                    onMouseLeave={() => setDrop(false)}
                  >
                    <a
                      href={l.href}
                      className="rounded-full px-4 py-2 text-sm font-medium text-fg/75 transition hover:bg-line/10 hover:text-fg"
                    >
                      {l.label}
                    </a>
                    <AnimatePresence>
                      {drop && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.22, ease: EASE }}
                          className="absolute left-1/2 top-full w-[380px] -translate-x-1/2 pt-3"
                        >
                          <div className="overflow-hidden rounded-2xl border border-line/10 bg-raise p-2 shadow-card">
                            {PRODUCTS.map((p, i) => (
                              <motion.a
                                key={p.name}
                                href={`/products/${p.slug}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.04 }}
                                onClick={() => setDrop(false)}
                                className="group flex items-center gap-3 rounded-xl p-3 transition hover:bg-line/5"
                              >
                                <span
                                  className={cn(
                                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                                    p.color
                                  )}
                                >
                                  <p.icon className="h-5 w-5" />
                                </span>
                                <span>
                                  <span className="flex items-center gap-1.5 text-sm font-semibold text-fg">
                                    {p.name}
                                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                                  </span>
                                  <span className="block text-xs text-fg/55">
                                    {p.desc}
                                  </span>
                                </span>
                              </motion.a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={l.label}
                    href={l.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-fg/75 transition hover:bg-line/10 hover:text-fg"
                  >
                    {l.label}
                  </a>
                )
              )}
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <ThemeToggle />
              <a
                href="/pricing"
                className="rounded-full px-4 py-2 text-sm font-medium text-fg/75 transition hover:text-fg"
              >
                Pricing
              </a>
              <Magnetic strength={0.25}>
                <a
                  href="/demo"
                  className="group flex items-center gap-2 rounded-full bg-volt px-5 py-2.5 text-sm font-bold text-coal shadow-glow transition hover:bg-paper"
                >
                  Book Demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-line/15 text-fg"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="noise fixed inset-0 z-40 flex flex-col overflow-y-auto bg-raise px-6 pb-10 pt-28 lg:hidden"
          >
            <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full glow-volt" />
            <div className="mt-auto space-y-1">
              {[
                { label: "Home", href: "/" },
                ...LINKS,
                { label: "Pricing", href: "/pricing" },
              ].map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.45, ease: EASE }}
                  className="group flex items-center justify-between border-b border-line/10 py-4"
                >
                  <span className="font-display text-3xl font-bold text-fg">
                    {l.label}
                  </span>
                  <ArrowUpRight className="h-6 w-6 text-acc transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>
              ))}
            </div>
            <motion.a
              href="/demo"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-volt py-4 font-display text-lg font-bold text-coal"
            >
              Book Instant Demo <ArrowRight className="h-5 w-5" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
