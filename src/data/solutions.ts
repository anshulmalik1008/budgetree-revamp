import {
  Building2,
  Car,
  Code2,
  Fuel,
  GraduationCap,
  HeartPulse,
  Landmark,
  Package,
  Plane,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

export type Solution = {
  id: string;
  label: string;
  icon: LucideIcon;
  intro: string;
  bullets: string[];
  challenges: Array<{ title: string; desc: string }>;
  how: Array<{ title: string; desc: string }>;
  stat: { value: string; label: string };
};

export const SOLUTIONS: Solution[] = [
  {
    id: "bfsi",
    label: "BFSI & Fintech",
    icon: Landmark,
    intro: "Secure, automated rewards for banks, NBFCs and fintechs.",
    bullets: [
      "Boost loyalty & product usage",
      "Stand out in competitive markets",
      "Compliance-ready automation",
    ],
    challenges: [
      { title: "Digital transformation", desc: "Tech growth vs. compliance pressure." },
      { title: "Customer value", desc: "High churn in digital-first markets." },
      { title: "Personalized value", desc: "Need lifecycle-based personalization." },
    ],
    how: [
      { title: "Behaviour-based rewards", desc: "Rewards on transactions, referrals & milestones." },
      { title: "API-first integrations", desc: "Plug into core banking & fintech stacks." },
      { title: "Real-time payouts & analytics", desc: "Instant UPI rewards + live dashboards." },
    ],
    stat: { value: "40%", label: "faster reward fulfillment" },
  },
  {
    id: "retail",
    label: "Retail & E-Commerce",
    icon: ShoppingCart,
    intro: "Omnichannel loyalty that turns shoppers into regulars.",
    bullets: [
      "Unified earn & burn across online + stores",
      "Personalized tier benefits",
      "QR & UPI cashback on purchases",
    ],
    challenges: [
      { title: "Fragmented journeys", desc: "Points split between online & offline." },
      { title: "Low redemption", desc: "Coupons expire before they're used." },
      { title: "Discount fatigue", desc: "Price-led loyalty erodes your margins." },
    ],
    how: [
      { title: "Unified points ledger", desc: "One balance across every channel & store." },
      { title: "QR + UPI cashback", desc: "Instant value at the moment of purchase." },
      { title: "Smart segmentation", desc: "AI-ranked offers per cohort & season." },
    ],
    stat: { value: "32%", label: "higher repeat purchase rate" },
  },
  {
    id: "travel",
    label: "Travel & Hospitality",
    icon: Plane,
    intro: "Rewards that smooth out seasons and win back travellers.",
    bullets: [
      "Trip & booking milestone rewards",
      "Instant partner & agent payouts",
      "Seasonal campaign automation",
    ],
    challenges: [
      { title: "Seasonal demand", desc: "Bookings swing hard across the year." },
      { title: "OTA price wars", desc: "Competing on price kills loyalty." },
      { title: "Fragmented partners", desc: "Hotels, cabs & agents on different rails." },
    ],
    how: [
      { title: "Milestone rewards", desc: "Per-trip, per-stay & per-booking incentives." },
      { title: "Instant partner settlements", desc: "UPI & bank payouts with audit trails." },
      { title: "Dynamic seasonal campaigns", desc: "Launch lean-season offers in hours." },
    ],
    stat: { value: "28%", label: "improved partner retention" },
  },
  {
    id: "healthcare",
    label: "Healthcare & Pharma",
    icon: HeartPulse,
    intro: "Compliance-safe incentives across your value chain.",
    bullets: [
      "Chemist & doctor program automation",
      "Audit-ready, approval-gated payouts",
      "Patient adherence nudges that reward",
    ],
    challenges: [
      { title: "Compliance boundaries", desc: "Strict promotion & disclosure rules." },
      { title: "Field-force ROI", desc: "Hard to tie visits to outcomes." },
      { title: "Patient adherence", desc: "Drop-offs after the first prescription." },
    ],
    how: [
      { title: "Compliance-ready workflows", desc: "Approvals, caps & audit logs built in." },
      { title: "Field-force incentives", desc: "Reward verified visits & outcomes live." },
      { title: "Adherence rewards", desc: "Gentle, rewarded reminders that work." },
    ],
    stat: { value: "21%", label: "lift in field-force productivity" },
  },
  {
    id: "education",
    label: "Education & EdTech",
    icon: GraduationCap,
    intro: "From enrolment referrals to completion streaks.",
    bullets: [
      "Referral rewards for enrolments",
      "Learning streak & milestone rewards",
      "Counselor & center payouts",
    ],
    challenges: [
      { title: "Enrolment seasons", desc: "Feast-or-funnel admissions cycles." },
      { title: "Learner engagement", desc: "Completion rates stall mid-course." },
      { title: "Counselor networks", desc: "Manual commissions, slow settlements." },
    ],
    how: [
      { title: "Referral engines", desc: "Reward students & parents who refer." },
      { title: "Streak rewards", desc: "Points for lessons, tests & milestones." },
      { title: "Automated counselor payouts", desc: "TDS-ready settlements in under 24h." },
    ],
    stat: { value: "2.1x", label: "referral-driven enrolments" },
  },
  {
    id: "oil",
    label: "Oil & Gas",
    icon: Fuel,
    intro: "Dealer, pump & consumer loyalty on one rail.",
    bullets: [
      "Volume-based dealer incentives",
      "Pump-level QR consumer cashback",
      "Automated reconciliation",
    ],
    challenges: [
      { title: "Dealer network scale", desc: "Thousands of outlets, one program." },
      { title: "Manual reconciliation", desc: "Fuel-card & scheme accounting pain." },
      { title: "Low digital adoption", desc: "Simple UX needed at the pump." },
    ],
    how: [
      { title: "Dealer & pump loyalty", desc: "Slabs, streaks & volume bonuses." },
      { title: "QR consumer cashback", desc: "Scan-to-earn with instant UPI value." },
      { title: "Auto reconciliation", desc: "Every rupee matched & reportable." },
    ],
    stat: { value: "18%", label: "lift in dealer volumes" },
  },
  {
    id: "automotive",
    label: "Automotive",
    icon: Car,
    intro: "Owner lifecycle rewards from test-drive to trade-in.",
    bullets: [
      "Service-reminder rewards",
      "Dealer & salesperson SPIFs",
      "Owner community perks",
    ],
    challenges: [
      { title: "Long purchase cycles", desc: "Years between two conversions." },
      { title: "Service drop-offs", desc: "Owners vanish after warranty." },
      { title: "Manual SPIFs", desc: "Dealer incentives run on spreadsheets." },
    ],
    how: [
      { title: "Service retention rewards", desc: "Cashback on every paid service." },
      { title: "Automated SPIFs", desc: "Verified sales & deliveries, paid instantly." },
      { title: "Owner perks", desc: "Referral & accessory rewards that stick." },
    ],
    stat: { value: "31%", label: "better service retention" },
  },
  {
    id: "it",
    label: "IT, BPO & SaaS",
    icon: Code2,
    intro: "Recognition culture that cuts attrition.",
    bullets: [
      "Peer-to-peer kudos → UPI cash",
      "Onboarding & milestone journeys",
      "HRMS-integrated recognition",
    ],
    challenges: [
      { title: "Attrition pressure", desc: "Talent moves fast in tech." },
      { title: "Remote recognition", desc: "Kudos get lost across locations." },
      { title: "Tool sprawl", desc: "Another login nobody opens." },
    ],
    how: [
      { title: "Kudos that convert", desc: "Peer praise becomes UPI cash in seconds." },
      { title: "Milestone journeys", desc: "Birthdays, anniversaries, spot awards." },
      { title: "HRMS-native", desc: "Runs inside tools your teams already use." },
    ],
    stat: { value: "3.2x", label: "engagement lift" },
  },
  {
    id: "consumer",
    label: "Consumer Goods",
    icon: Package,
    intro: "See your end consumer — and reward every pack.",
    bullets: [
      "Pack-to-consumer QR cashback",
      "Retailer & distributor tiers",
      "Festival campaign engine",
    ],
    challenges: [
      { title: "Invisible consumers", desc: "Sales happen through layers of trade." },
      { title: "Seasonal offtake", desc: "Festive pressure, post-festive slumps." },
      { title: "Trade loyalty leakage", desc: "Retailers push competitor margins." },
    ],
    how: [
      { title: "QR pack rewards", desc: "Scan → instant UPI cashback for buyers." },
      { title: "Trade tier programs", desc: "Retailers & distributors earn on volume." },
      { title: "Festival engine", desc: "Pre-built Diwali/summer campaign kits." },
    ],
    stat: { value: "26%", label: "lift in repeat offtake" },
  },
  {
    id: "realestate",
    label: "Real Estate & Infra",
    icon: Building2,
    intro: "Broker motivation and buyer delight, automated.",
    bullets: [
      "Site-visit & milestone rewards",
      "Broker payouts with audit trails",
      "Move-in welcome journeys",
    ],
    challenges: [
      { title: "Long sales cycles", desc: "Months from visit to booking." },
      { title: "Broker motivation", desc: "Slow commissions, split loyalties." },
      { title: "Post-sale silence", desc: "Buyers hear nothing after possession." },
    ],
    how: [
      { title: "Milestone rewards", desc: "Visit → booking → registry, all rewarded." },
      { title: "Instant broker payouts", desc: "Verified, documented, TDS-ready." },
      { title: "Welcome journeys", desc: "Move-in gift cards that earn referrals." },
    ],
    stat: { value: "2.3x", label: "faster broker settlements" },
  },
];

export const getSolution = (id: string) => SOLUTIONS.find((s) => s.id === id);
