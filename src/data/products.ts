import type { ComponentType } from "react";
import {
  Gift,
  Receipt,
  Sparkles,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  BillVisual,
  LoyaltyVisual,
  PayoutVisual,
  RewardXVisual,
  UpiVisual,
} from "@/components/ProductStack";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  long: string[];
  image: string;
  chip: string;
  soft: string;
  gradient: string;
  glow: string;
  icon: LucideIcon;
  features: Array<{ title: string; desc: string }>;
  stats: Array<{ value: string; label: string }>;
  steps: Array<{ title: string; desc: string }>;
  quote: { text: string; name: string; role: string };
  Visual: ComponentType;
};

export const PRODUCTS: Product[] = [
  {
    slug: "rewardx",
    name: "RewardX",
    tagline: "Recognize. Reward. Repeat.",
    desc: "Effortless employee & customer recognition — auto-linked to email or phone, delivered instantly via email or SMS.",
    long: [
      "RewardX turns every thank-you into a moment that lands. Upload a list or connect your HRMS, pick from 350+ gift cards or UPI cash, and rewards go out in seconds — personalized with your branding.",
      "Managers get one-click spot awards, HR gets automated milestone journeys, and finance gets clean TDS-ready reports. Everyone sees the same live dashboard.",
    ],
    image: "/images/product-rewardx.png",
    chip: "bg-volt text-coal",
    soft: "bg-acc/15 text-acc",
    gradient: "from-[#1E3527] via-[#14231B] to-[#0C1512]",
    glow: "glow-volt",
    icon: Gift,
    features: [
      {
        title: "Auto-linked rewards",
        desc: "Rewards attach to email or phone — recipients claim with one tap, no account needed.",
      },
      {
        title: "Smart redemption",
        desc: "Split across brands, stack multiple codes, or redeem partially. Your rules, our rails.",
      },
      {
        title: "Instant delivery",
        desc: "Email, SMS and WhatsApp delivery with 99.99% success tracking in real time.",
      },
      {
        title: "Milestone journeys",
        desc: "Birthdays, anniversaries, onboarding — automate the moments managers always forget.",
      },
    ],
    stats: [
      { value: "3s", label: "Median delivery time" },
      { value: "350+", label: "Gift cards & brands" },
      { value: "68%", label: "Avg. redemption rate" },
    ],
    steps: [
      { title: "Pick a template", desc: "Spot award, festive gift, onboarding kit — start in one click." },
      { title: "Add people", desc: "Upload a sheet or sync HRMS. Duplicates auto-merge." },
      { title: "Brand & send", desc: "Your logo, your message, your rules. Hit launch." },
      { title: "Track ROI", desc: "Watch delivery, redemption and engagement roll in live." },
    ],
    quote: {
      text: "BudgeTree made our employee appreciation program effortless. The platform is super user-friendly.",
      name: "Ananya Rao",
      role: "Head of People · BFSI",
    },
    Visual: RewardXVisual,
  },
  {
    slug: "loyaltyx",
    name: "LoyaltyX",
    tagline: "Smart loyalty. Instant rewards.",
    desc: "AI-powered redemption tailored for every customer, every time — fully white-labeled for your brand.",
    long: [
      "LoyaltyX is a loyalty engine that thinks. It scores every customer, predicts churn, and serves the reward most likely to bring them back — points, perks or instant cash.",
      "Launch tiered programs, coalition points or paid memberships with a fully white-labeled experience: your app, your brand, our AI under the hood.",
    ],
    image: "/images/product-loyaltyx.png",
    chip: "bg-lilac text-coal",
    soft: "bg-grape/15 text-grape",
    gradient: "from-[#2A2145] via-[#1C1830] to-[#0C1512]",
    glow: "glow-lilac",
    icon: Sparkles,
    features: [
      {
        title: "AI redemption picks",
        desc: "ML models choose the perfect reward per customer to maximize repeat purchase.",
      },
      {
        title: "Plug & play integration",
        desc: "API-ready setup with SDKs for web, Android and iOS. Go live in days.",
      },
      {
        title: "Fully white-labeled",
        desc: "Your brand, rules and audiences — LoyaltyX stays invisible.",
      },
      {
        title: "Dynamic rewards catalog",
        desc: "A curated catalog that re-ranks itself by season, region and behavior.",
      },
    ],
    stats: [
      { value: "2.1x", label: "Repeat purchase lift" },
      { value: "41%", label: "Lower churn in 6 months" },
      { value: "175+", label: "Countries supported" },
    ],
    steps: [
      { title: "Design tiers", desc: "Points, slabs and perks — visual builder, no code." },
      { title: "Connect events", desc: "Pipe in purchases via API, SDK or webhooks." },
      { title: "Let AI optimize", desc: "Redemption offers auto-tune per cohort weekly." },
      { title: "Measure LTV", desc: "Cohort dashboards prove loyalty pays for itself." },
    ],
    quote: {
      text: "Our employees love BudgeTree! We saw a huge increase in engagement thanks to seamless rewards.",
      name: "Vikram Mehta",
      role: "CHRO · Retail",
    },
    Visual: LoyaltyVisual,
  },
  {
    slug: "upi-rewards",
    name: "UPI Rewards",
    tagline: "Instant. Effortless. Secure.",
    desc: "Cash rewards via UPI in seconds — one link, no app or sign-up. Straight to any bank account.",
    long: [
      "UPI Cash Tokens are the fastest way to say thanks in India. Generate a secure claim link, send it over SMS or WhatsApp, and the money lands in any bank account in seconds.",
      "No app downloads, no wallet lock-in, no expiry drama. Just cash — with full audit trails and TDS handling built in.",
    ],
    image: "/images/product-upi.png",
    chip: "bg-gold text-coal",
    soft: "bg-honey/15 text-honey",
    gradient: "from-[#3A2E14] via-[#241D0E] to-[#0C1512]",
    glow: "glow-gold",
    icon: Zap,
    features: [
      {
        title: "Instant UPI transfers",
        desc: "Cash rewards in seconds — straight to bank, 24×7 including holidays.",
      },
      {
        title: "Frictionless redemption",
        desc: "One link. No app, no sign-up, no passwords. Claim rates above 90%.",
      },
      {
        title: "Trusted & secure",
        desc: "RBI-compliant rails, device fingerprinting and instant fraud checks.",
      },
      {
        title: "Bulk token engine",
        desc: "Generate 1M+ unique tokens in minutes with per-link limits and expiry.",
      },
    ],
    stats: [
      { value: "3s", label: "Median settlement" },
      { value: "90%+", label: "Claim rate" },
      { value: "₹0", label: "App cost for recipients" },
    ],
    steps: [
      { title: "Create tokens", desc: "Set value, expiry and audience in one screen." },
      { title: "Distribute links", desc: "SMS, email, WhatsApp or QR at events." },
      { title: "Recipients claim", desc: "Tap link, verify, cash in bank. Done." },
      { title: "Reconcile auto", desc: "Unclaimed value returns; reports write themselves." },
    ],
    quote: {
      text: "Seamless UPI rewards that just land in bank accounts — engagement jumped within weeks.",
      name: "Sarah D'Souza",
      role: "Sales Ops Director · Pharma",
    },
    Visual: UpiVisual,
  },
  {
    slug: "payouts",
    name: "Payouts",
    tagline: "Fast. Flexible. Trusted.",
    desc: "Bulk and individual payouts to bank, UPI or wallet — encrypted, compliant and fully transparent.",
    long: [
      "Run payroll-like payouts for anyone: gig workers, channel partners, winners, vendors. One upload, thousands of transfers — validated, deduplicated and reconciled automatically.",
      "Smart routing picks the fastest rail per beneficiary, retries failures intelligently, and every rupee is traceable from ledger to bank statement.",
    ],
    image: "/images/product-payouts.png",
    chip: "bg-mint text-coal",
    soft: "bg-jade/15 text-jade",
    gradient: "from-[#123527] via-[#0E231C] to-[#0C1512]",
    glow: "glow-mint",
    icon: Wallet,
    features: [
      {
        title: "Lightning-fast disbursal",
        desc: "Real-time transfers to bank, UPI or wallet — one beneficiary or 100,000.",
      },
      {
        title: "Versatile destinations",
        desc: "UPI, bank transfer or gift cards — pick per audience, per campaign.",
      },
      {
        title: "Secure & compliant",
        desc: "Encrypted, regulation-ready with PAN verification and audit logs.",
      },
      {
        title: "Auto reconciliation",
        desc: "UTRs matched to beneficiaries; failures retried and escalated for you.",
      },
    ],
    stats: [
      { value: "100K+", label: "Payouts per batch" },
      { value: "99.98%", label: "Success rate" },
      { value: "<24h", label: "Enterprise onboarding" },
    ],
    steps: [
      { title: "Upload once", desc: "Sheet, API or HRMS sync with auto-validation." },
      { title: "Approve securely", desc: "Maker-checker flows with OTP and roles." },
      { title: "Disburse live", desc: "Watch thousands settle in real time." },
      { title: "Download reports", desc: "TDS, GST and audit packs in one click." },
    ],
    quote: {
      text: "Real-time payouts and clear reporting gave leadership the confidence to scale across regions.",
      name: "Sarah D'Souza",
      role: "Sales Ops Director · Pharma",
    },
    Visual: PayoutVisual,
  },
  {
    slug: "bill-payments",
    name: "Bill Payments",
    tagline: "Every bill. One flow.",
    desc: "Utilities, mobile and broadband in a single dashboard — pay your way with UPI, cards or net banking.",
    long: [
      "Give teams a bill-pay Superpower: electricity, gas, mobile, broadband and DTH for the whole company — paid in one flow, split by cost center automatically.",
      "Perfect for WFH reimbursements, facility management and employee perks. Set budgets, approve exceptions, and never chase a receipt again.",
    ],
    image: "/images/product-bills.png",
    chip: "bg-sky text-coal",
    soft: "bg-azure/15 text-azure",
    gradient: "from-[#173042] via-[#101F2B] to-[#0C1512]",
    glow: "glow-sky",
    icon: Receipt,
    features: [
      {
        title: "One-tap bill pay",
        desc: "Utilities, mobile and broadband for thousands of connections at once.",
      },
      {
        title: "Pay your way",
        desc: "UPI, cards, wallets or net banking — routed for lowest cost.",
      },
      {
        title: "Safe & transparent",
        desc: "Real-time tracking, encrypted and verified with BBPS compliance.",
      },
      {
        title: "Cost-center split",
        desc: "Auto-tag every bill to teams, sites or projects for clean books.",
      },
    ],
    stats: [
      { value: "20K+", label: "Billers supported" },
      { value: "1-tap", label: "Bulk monthly run" },
      { value: "100%", label: "Receipt capture" },
    ],
    steps: [
      { title: "Fetch bills", desc: "Auto-pull due amounts for all connections." },
      { title: "Set budgets", desc: "Caps per team with exception approvals." },
      { title: "Pay in bulk", desc: "One approval clears the entire month." },
      { title: "Reimburse easy", desc: "WFH bills flow straight into payroll inputs." },
    ],
    quote: {
      text: "We replaced three vendors with BudgeTree. Launches went from weeks to a single afternoon.",
      name: "Rahul Khanna",
      role: "Growth Head · D2C",
    },
    Visual: BillVisual,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
