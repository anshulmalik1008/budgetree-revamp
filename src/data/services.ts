import {
  Boxes,
  Gift,
  Megaphone,
  Package,
  QrCode,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  desc: string;
  icon: LucideIcon;
  chip: string;
  glow: string;
  features: Array<{ title: string; desc: string }>;
  stats: Array<{ value: string; label: string }>;
  steps: Array<{ title: string; desc: string }>;
  image?: string;
};

export const SERVICES: Service[] = [
  {
    slug: "supergift",
    name: "SuperGift Card",
    tagline: "One card. Every brand they love.",
    desc: "A single gift card your recipients spend across top brands — digital or physical, personalized with your branding. Perfect for employees, dealers, clients and customers.",
    icon: Gift,
    chip: "bg-volt text-coal",
    glow: "glow-volt",
    features: [
      { title: "Choice-led redemption", desc: "Recipients pick from top brands — no wrong gifts, ever." },
      { title: "Digital + physical", desc: "Instant e-cards or premium physical cards for big moments." },
      { title: "Your brand on it", desc: "Logo, message and occasions — fully personalized." },
      { title: "Bulk corporate orders", desc: "Upload a sheet, deliver thousands in minutes." },
    ],
    stats: [
      { value: "19+", label: "top brands on one card" },
      { value: "54%", label: "discounts up to" },
      { value: "24h", label: "express delivery" },
    ],
    steps: [
      { title: "Pick & brand", desc: "Choose value, design and message." },
      { title: "Upload recipients", desc: "Sheet or API — duplicates auto-merge." },
      { title: "Deliver instantly", desc: "SMS, email or physical dispatch." },
      { title: "Track redemption", desc: "Live status per recipient." },
    ],
    image: "/images/live/siripay.svg",
  },
  {
    slug: "corporate-gifts",
    name: "Corporate Gifts",
    tagline: "Gifting that feels personal, at enterprise scale.",
    desc: "Festive kits, onboarding boxes, milestone hampers and client appreciation — curated, branded and delivered across India with zero ops load on your team.",
    icon: Package,
    chip: "bg-lilac text-coal",
    glow: "glow-lilac",
    features: [
      { title: "Curated catalogs", desc: "Season-wise catalogs from premium brands." },
      { title: "Branded merchandise", desc: "Your logo on swag that people actually keep." },
      { title: "Pan-India logistics", desc: "Doorstep delivery with tracking & confirmations." },
      { title: "Zero ops load", desc: "We run the program; you take the credit." },
    ],
    stats: [
      { value: "350+", label: "gift brands & SKUs" },
      { value: "1M+", label: "gifts per season" },
      { value: "98%", label: "on-time delivery" },
    ],
    steps: [
      { title: "Choose catalog", desc: "Festive, onboarding or custom themes." },
      { title: "Approve designs", desc: "Branding proofs in 48 hours." },
      { title: "We deliver", desc: "Pan-India dispatch with live tracking." },
      { title: "Report & repeat", desc: "Delivery confirmations & savings report." },
    ],
  },
  {
    slug: "digital-qr",
    name: "Digital QR",
    tagline: "Scan. Earn. Instant UPI cashback.",
    desc: "QR-powered loyalty for retail, FMCG and QSR — customers scan at the counter or on the pack and earn instant UPI cashback. No app, no friction, full analytics.",
    icon: QrCode,
    chip: "bg-mint text-coal",
    glow: "glow-mint",
    features: [
      { title: "App-free UX", desc: "Scan → verify → cash in bank. Three taps." },
      { title: "Pack & counter QRs", desc: "Tamper-safe codes for packs, posters & counters." },
      { title: "Dynamic rewards", desc: "Cashback slabs by product, region & season." },
      { title: "First-party data", desc: "See who buys where, when and how often." },
    ],
    stats: [
      { value: "3s", label: "median cashback time" },
      { value: "90%+", label: "scan-to-claim rate" },
      { value: "26%", label: "repeat offtake lift" },
    ],
    steps: [
      { title: "Generate QRs", desc: "Per pack, per store or per campaign." },
      { title: "Set cashback rules", desc: "Slabs, caps & geo-targeting." },
      { title: "Customers scan", desc: "Instant UPI cashback, no app." },
      { title: "Read the dashboard", desc: "Cohorts, heatmaps & ROI live." },
    ],
    image: "/images/live/payouts.png",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    tagline: "Campaigns that don't just reach — they reward.",
    desc: "Performance marketing fused with rewards: lead-gen journeys, WhatsApp & SMS flows, landing pages and retargeting — every touchpoint tied to an incentive that converts.",
    icon: Megaphone,
    chip: "bg-gold text-coal",
    glow: "glow-gold",
    features: [
      { title: "Reward-linked funnels", desc: "Incentives baked into every conversion step." },
      { title: "WhatsApp & SMS journeys", desc: "Conversational flows with instant rewards." },
      { title: "Landing pages that convert", desc: "Built, tested and shipped in days." },
      { title: "Full-funnel analytics", desc: "From click to claimed reward to revenue." },
    ],
    stats: [
      { value: "45%", label: "avg. engagement uplift" },
      { value: "2.4x", label: "campaign CTR lift" },
      { value: "7d", label: "average launch time" },
    ],
    steps: [
      { title: "Audit & strategy", desc: "Funnel review with reward mechanics." },
      { title: "Build journeys", desc: "Creative, pages, flows & rewards." },
      { title: "Launch & optimize", desc: "Weekly experiments & scale rules." },
      { title: "Report ROI", desc: "Revenue-tied dashboards, not vanity metrics." },
    ],
  },
  {
    slug: "gift-card-api",
    name: "Gift Card API",
    tagline: "350+ brands. One REST API.",
    desc: "Issue, manage and track gift cards from any system — a clean REST API with webhooks, sandbox and 99.99% uptime. Built for banks, fintechs and HRMS platforms.",
    icon: Boxes,
    chip: "bg-sky text-coal",
    glow: "glow-sky",
    features: [
      { title: "REST-first", desc: "Issue, balance, redeem & reverse via clean endpoints." },
      { title: "Webhooks", desc: "Real-time delivery & redemption events." },
      { title: "Sandbox included", desc: "Test every brand flow before going live." },
      { title: "Enterprise SLAs", desc: "99.99% uptime, role-based keys, audit logs." },
    ],
    stats: [
      { value: "350+", label: "brands on the API" },
      { value: "99.99%", label: "uptime SLA" },
      { value: "<24h", label: "integration go-live" },
    ],
    steps: [
      { title: "Get keys", desc: "Sandbox credentials in minutes." },
      { title: "Integrate", desc: "SDK-style docs & webhook guides." },
      { title: "Go live", desc: "Flip to production with one flag." },
      { title: "Monitor", desc: "Live logs, alerts & reconciliation." },
    ],
    image: "/images/live/loyaltyx-home.png",
  },
  {
    slug: "software-services",
    name: "Software Services",
    tagline: "White-label builds on proven rails.",
    desc: "Custom reward engines, white-label apps and deep integrations — delivered by the team behind BudgeTree's platform, so you ship in weeks, not quarters.",
    icon: Wrench,
    chip: "bg-grape text-coal",
    glow: "glow-lilac",
    features: [
      { title: "White-label apps", desc: "Your brand, our rails — web, Android & iOS." },
      { title: "Custom reward engines", desc: "Rules, tiers & economics built your way." },
      { title: "Deep integrations", desc: "HRMS, CRM, core banking & ERP connectors." },
      { title: "Managed support", desc: "SLA-backed ops, monitoring & upgrades." },
    ],
    stats: [
      { value: "6 wks", label: "typical white-label ship" },
      { value: "100%", label: "code & IP handover options" },
      { value: "24/7", label: "production monitoring" },
    ],
    steps: [
      { title: "Scope", desc: "Workshop → SOW in one week." },
      { title: "Build", desc: "Weekly demos on staging." },
      { title: "Launch", desc: "Hardened, load-tested, documented." },
      { title: "Operate", desc: "Optional managed SLA & roadmap." },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
