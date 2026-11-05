/**
 * Curated public Budgetree site information checked 2026-11-05.
 * Update alongside website changes. Do not include private client data here.
 */
export type KnowledgeItem = {
  id: string;
  name: string;
  aliases: string[];
  summary: string;
  details: string[];
  keywords: string[];
  source: string;
  page: string;
};

export const LIVE_KNOWLEDGE: KnowledgeItem[] = [
  {
    id: "company", name: "Budgetree", aliases: ["budgetree", "budget tree", "बजट्री", "बजेट्री", "company", "business"],
    summary: "Budgetree is a B2B and B2C rewards, loyalty and payouts platform that helps companies engage employees, customers and channel partners.",
    details: [
      "It unifies digital rewards, loyalty campaigns, UPI cash rewards, payouts, bill payments and gift-card solutions.",
      "Teams can configure campaigns, onboard audiences and track rewards, redemptions, engagement and ROI in dashboards.",
      "The website promotes API-first onboarding, guided implementation and a typical go-live target of under 24 hours; custom integrations may take longer.",
      "It serves enterprise use cases across BFSI, retail, e-commerce, automotive, healthcare, travel, education and other sectors."
    ],
    keywords: ["about", "kaam", "kya", "company", "business", "services", "products", "overview", "काम", "क्या करता", "features"],
    source: "https://budgetree.in/", page: "/about"
  },
  {
    id: "rewardx", name: "RewardX", aliases: ["rewardx", "reward x", "रिवार्ड एक्स", "रिवॉर्डएक्स", "reward points"],
    summary: "RewardX is Budgetree's rewards and incentives platform for delivering employee, customer and partner rewards.",
    details: [
      "Reward Points: issue points linked to phone numbers or email addresses for later redemption.",
      "Reward Codes: distribute unique codes that recipients can combine or partially redeem.",
      "Reward Links: personalized reward links delivered by SMS or email, with no recipient signup needed for supported flows.",
      "Reward API: integrate reward redemption with HRMS, learning, gaming and other applications.",
      "Reward Marketplace and embedded commerce: gift cards, experiences, merchandise and travel experiences.",
      "Typical onboarding steps: complete KYC, load the wallet and send rewards manually or through automation."
    ],
    keywords: ["employee", "recognition", "reward", "gift", "codes", "links", "points", "marketplace", "redeem", "incentive"],
    source: "https://budgetree.in/product-reward", page: "/products/rewardx"
  },
  {
    id: "loyaltyx", name: "LoyaltyX", aliases: ["loyaltyx", "loyalty x", "लॉयल्टी", "loyalty", "dealer loyalty"],
    summary: "LoyaltyX helps companies run loyalty and engagement programs for dealers, distributors, retailers, employees and consumers.",
    details: [
      "Dealer loyalty rewards performance milestones and sales achievements.",
      "Channel loyalty supports multiple distributor tiers with targeted rewards, invoice validation and analytics.",
      "Retail and consumer loyalty include points, cashback, gift-card redemptions, referrals and membership offers.",
      "Employee rewards and recognition covers festive gifts, milestones and sales incentives.",
      "Core features include QR validation, campaign dashboards, tiered points, reporting and APIs.",
      "Supported benefit categories described on the live website include dining, travel, sports, health, lifestyle and digital perks."
    ],
    keywords: ["points", "tier", "dealer", "distributor", "retailer", "retention", "channel", "reward", "loyalty program", "earn burn"],
    source: "https://budgetree.in/product-loyaltyx", page: "/products/loyaltyx"
  },
  {
    id: "upi", name: "UPI Rewards", aliases: ["upi", "cash token", "cashback", "यूपीआई", "कैशबैक", "upi cash"],
    summary: "UPI Rewards powers app-free cash rewards and cashback campaigns, with payment tracking and integrations.",
    details: [
      "Businesses can trigger rewards through UPI integrations and campaign dashboards.",
      "The live website describes instant transfers, bulk rewards and real-time tracking.",
      "Consumers can redeem supported reward links without installing a separate app.",
      "Use cases include retailer incentives, referral campaigns, marketing activations and customer cashback."
    ],
    keywords: ["qr", "cash token", "payment", "upi payout", "instant", "bank", "upi transfer", "reward"],
    source: "https://budgetree.in/product-upireward", page: "/products/upi-rewards"
  },
  {
    id: "payouts", name: "Payouts", aliases: ["payout", "payouts", "पेआउट", "payment", "transfer", "bulk"],
    summary: "Budgetree Payouts handles individual and bulk business disbursements such as vendor payments, salaries, incentives, cashback and commissions.",
    details: [
      "Supports bank payouts including NEFT and IMPS as well as UPI disbursements.",
      "Vendor payouts include ledger and reconciliation workflows.",
      "Salary and incentive payments support teams and distributors.",
      "Cashback payouts, referral commissions, expense reimbursements and eligible loan disbursement are listed use cases.",
      "Payout dashboards help monitor transaction status, failures and detailed reporting.",
      "Payouts connect to RewardX and LoyaltyX for end-to-end reward delivery."
    ],
    keywords: ["salary", "vendor", "bank", "neft", "imps", "reconcile", "bulk transfer", "settlement", "upi", "disbursement"],
    source: "https://budgetree.in/product-payout", page: "/products/payouts"
  },
  {
    id: "bills", name: "Bill Payments", aliases: ["bill payments", "billpayment", "bills", "bbps", "बिल"],
    summary: "Budgetree Bill Payments combines supported utility and bill payment workflows in one dashboard.",
    details: [
      "Live-site descriptions include utilities, mobile and broadband bill payments.",
      "Supported payment methods described include UPI, cards, wallets and net banking.",
      "Transactions can be tracked through dashboards and notifications.",
      "Bharat Connect bill-payment workflows are also listed in Budgetree's payouts section."
    ],
    keywords: ["utility", "mobile", "recharge", "electricity", "broadband", "bharat connect", "bill pay"],
    source: "https://budgetree.in/", page: "/products/bill-payments"
  },
  {
    id: "security", name: "Security & Compliance", aliases: ["security", "compliance", "privacy", "secure", "सिक्योरिटी"],
    summary: "Budgetree's live website describes enterprise security controls for reward and payout operations.",
    details: [
      "Published controls include encryption, granular roles and audit-ready logs.",
      "The site describes secure APIs, data minimization and compliance-ready payouts.",
      "Do not treat marketing labels as evidence of a particular ISO, SOC or PCI certification; request the current certificate or audit documents from Budgetree."
    ],
    keywords: ["iso", "gdpr", "pci", "certificate", "data", "audit", "encryption", "regulation", "secure"],
    source: "https://budgetree.in/", page: "/about"
  },
  {
    id: "onboarding", name: "Getting Started", aliases: ["onboarding", "get started", "start", "signup", "demo", "शुरू"],
    summary: "Budgetree generally starts with a product discussion and onboarding, then sets up a campaign or integration, then tracks results.",
    details: [
      "Step 1: select the rewards, loyalty or payout use case and complete required onboarding/KYC.",
      "Step 2: configure reward type, audience, budgets and integrations.",
      "Step 3: launch the program and monitor rewards, redemptions and ROI.",
      "The public website describes guided onboarding and a typical launch target of under 24 hours, depending on scope.",
      "Use the Book Demo page for a walkthrough and discuss commercial terms with sales."
    ],
    keywords: ["onboard", "onboarding", "kyc", "how works", "kaise", "process", "start", "setup", "demo"],
    source: "https://budgetree.in/", page: "/demo"
  },
  {
    id: "contact", name: "Contact Budgetree", aliases: ["contact", "support", "sales", "help", "email", "phone", "number", "संपर्क"],
    summary: "For Budgetree sales enquiries email sales@budgetree.in. For support email support@budgetree.in.",
    details: [
      "The public website lists +91 9193911100 as a contact number.",
      "Product demos and integration discussions can be requested via the Budgetree contact and demo pages."
    ],
    keywords: ["email", "phone", "call", "talk", "help", "support", "sales", "whatsapp", "address"],
    source: "https://budgetree.in/contact", page: "/contact"
  },
  {
    id: "siripay", name: "SiriPay", aliases: ["siripay", "siri pay", "सिरीपे", "gift cards", "giftcard"],
    summary: "SiriPay is a digital gifting marketplace connected with Budgetree, offering gift cards and categories such as shopping, dining and travel.",
    details: [
      "Use the SiriPay website to view currently listed brands, categories, card terms and discounts.",
      "Specific discounts and stock can change; the assistant should not promise a live offer without checking.",
      "Explore the marketplace at https://siripay.co/."
    ],
    keywords: ["gift", "voucher", "brands", "shopping", "food", "travel", "fashion", "discount"],
    source: "https://budgetree.in/", page: "https://siripay.co/"
  }
];

export const getKnowledge = (id: string) => LIVE_KNOWLEDGE.find((k) => k.id === id);
