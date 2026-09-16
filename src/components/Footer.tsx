import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

const COLS: Array<{
  head: string;
  links: Array<{ label: string; href: string }>;
}> = [
  {
    head: "Products",
    links: [
      { label: "RewardX", href: "/products/rewardx" },
      { label: "LoyaltyX", href: "/products/loyaltyx" },
      { label: "UPI Rewards", href: "/products/upi-rewards" },
      { label: "Payouts", href: "/products/payouts" },
      { label: "Bill Payments", href: "/products/bill-payments" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Solutions", href: "/solutions" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    head: "Services",
    links: [
      { label: "SuperGift Card", href: "/services/supergift" },
      { label: "Corporate Gifts", href: "/services/corporate-gifts" },
      { label: "Digital QR", href: "/services/digital-qr" },
      { label: "Gift Card API", href: "/services/gift-card-api" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "Software Services", href: "/services/software-services" },
    ],
  },
  {
    head: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy-policy" },
      { label: "Terms & Conditions", href: "/legal/terms-conditions" },
      { label: "Refund Policy", href: "/legal/refund-policy" },
      { label: "Disclaimer", href: "/legal/disclaimer" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line/10 bg-raise">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <a href="/" aria-label="BudgeTree home">
              <Logo />
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg/55">
              Intelligent rewards, loyalty & payout automation for modern
              enterprises. Grow engagement like never before.
            </p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-fg/40">
              Get growth tactics monthly
            </p>
            <NewsletterForm />
            <div className="mt-6 flex gap-2.5">
              {[Linkedin, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="/"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line/10 text-fg/60 transition hover:-translate-y-1 hover:border-acc hover:bg-volt hover:text-coal"
                >
                  <Icon style={{ height: 18, width: 18 }} />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLS.map((c) => (
              <div key={c.head}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-fg/40">
                  {c.head}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-fg/65 transition hover:text-acc"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line/10 pt-6 text-xs text-fg/40 sm:flex-row">
          <p>© 2026 BudgeTree. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Crafted in India
            <span className="h-1.5 w-1.5 rounded-full bg-volt" />
          </p>
        </div>
      </div>
    </footer>
  );
}
