export type LegalDoc = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: Array<{ h: string; body: string[] }>;
};

export const LEGAL: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    updated: "Last updated: 1 September 2026",
    intro:
      "Budgetree Technology Pvt. Ltd. (\"Budgetree\", \"we\") respects your privacy. This policy explains what we collect, why we collect it, and the choices you have — across our websites, dashboards and reward programs.",
    sections: [
      {
        h: "1. Information we collect",
        body: [
          "Account & business data: name, work email, phone, company details and program settings you provide when booking demos or using the platform.",
          "Recipient data processed on your behalf: names, phone numbers, email addresses or UPI/bank details needed to deliver rewards and payouts you instruct.",
          "Usage data: pages visited, device and diagnostic information collected via cookies and analytics to keep the service secure and improve it.",
        ],
      },
      {
        h: "2. How we use information",
        body: [
          "To operate the platform: delivering rewards, processing payouts, generating reports and providing support.",
          "To comply with law: KYC, TDS/GST reporting, audit trails and anti-fraud checks required for financial rails.",
          "To communicate: service messages, and marketing only where you've opted in. You can unsubscribe anytime.",
        ],
      },
      {
        h: "3. Sharing & processors",
        body: [
          "We share data only with regulated partners required to run the service — payment rails, banks, gift-card brands, SMS/email delivery — under contract, and with authorities where law demands.",
          "We never sell personal data. Recipient data belongs to you; we process it strictly on your instructions.",
        ],
      },
      {
        h: "4. Security & retention",
        body: [
          "Bank-level encryption in transit and at rest, role-based access, audit logs and continuous monitoring protect your data.",
          "We retain data only as long as needed for the purposes above or as required by law (for example, financial records), then delete or anonymize it.",
        ],
      },
      {
        h: "5. Your rights",
        body: [
          "You may access, correct, export or request deletion of your personal data, and withdraw consent where processing is consent-based, by writing to privacy@budgetree.in. We respond within 30 days.",
        ],
      },
    ],
  },
  {
    slug: "terms-conditions",
    title: "Terms & Conditions",
    updated: "Last updated: 1 September 2026",
    intro:
      "These terms govern your use of Budgetree's websites, products and APIs. By creating an account or using the service you agree to them.",
    sections: [
      {
        h: "1. The service",
        body: [
          "Budgetree provides a SaaS platform for rewards, loyalty, gifting, bill payments and payout automation, together with associated APIs, dashboards and support.",
          "Features, catalogs and limits are described in your plan or order form.",
        ],
      },
      {
        h: "2. Accounts & responsibilities",
        body: [
          "You must provide accurate business information, keep credentials secure, and ensure you have lawful consent to submit recipient data for reward delivery.",
          "You agree not to misuse the service: no unlawful incentives, spam, money-laundering or circumvention of platform controls.",
        ],
      },
      {
        h: "3. Fees, loads & taxes",
        body: [
          "Platform fees and per-transaction charges are billed as per your plan. Reward value you load is disbursed per your instructions; unused, unclaimed value is returned per the Refund Policy.",
          "Each party bears its own taxes; we deduct TDS and issue GST invoices where applicable.",
        ],
      },
      {
        h: "4. Intellectual property",
        body: [
          "The platform, software, design and content remain Budgetree's property. You retain all rights to your brand assets and data, granting us a limited license to use them solely to operate the service.",
        ],
      },
      {
        h: "5. Liability & termination",
        body: [
          "The service is provided with enterprise SLAs (99.99% uptime target). Our aggregate liability is limited to fees paid in the preceding 12 months; we are not liable for indirect losses.",
          "Either party may terminate for material breach with 30 days' notice. Sections on IP, liability and confidentiality survive termination.",
        ],
      },
      {
        h: "6. Governing law",
        body: [
          "These terms are governed by the laws of India; disputes are subject to the exclusive jurisdiction of courts in New Delhi.",
        ],
      },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    updated: "Last updated: 1 September 2026",
    intro:
      "We keep refunds simple and fair. This policy covers platform fees and loaded reward value.",
    sections: [
      {
        h: "1. Platform fees",
        body: [
          "New customers may request a full refund of the first month's platform fee within 30 days if the service materially fails to perform as documented and we cannot fix it within 15 days.",
          "Annual plans may be cancelled with pro-rata credit for unused full months after the first quarter.",
        ],
      },
      {
        h: "2. Loaded reward value",
        body: [
          "Unclaimed value (rewards never delivered or links expired) is refundable to your original payment method within 7–10 business days of request.",
          "Delivered rewards — redeemed gift cards, settled UPI cash, dispatched physical gifts — cannot be reversed or refunded, except where a delivery failure is proven on our side.",
        ],
      },
      {
        h: "3. Failed transactions",
        body: [
          "Any payout or delivery that fails technically is automatically returned to your wallet; you may re-disburse or request withdrawal at any time.",
        ],
      },
      {
        h: "4. How to request",
        body: [
          "Email billing@budgetree.in from your registered address with the invoice or campaign ID. Refunds are processed to the original payment method within 7–10 business days after approval.",
        ],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    updated: "Last updated: 1 September 2026",
    intro:
      "Important information about using this website and its content.",
    sections: [
      {
        h: "1. General information",
        body: [
          "Content on this site — including ROI calculators, benchmarks and blog articles — is provided for general information only and does not constitute financial, legal or tax advice. Evaluate outcomes with your own advisors.",
        ],
      },
      {
        h: "2. No warranty",
        body: [
          "While we work hard to keep everything accurate and current, the site and its content are provided \"as is\" without warranties of any kind. Metrics shown (engagement lifts, redemption rates) reflect customer benchmarks, not guarantees.",
        ],
      },
      {
        h: "3. Third parties",
        body: [
          "Brand names and logos referenced on this site belong to their respective owners and are used for identification only. External links are provided for convenience; we are not responsible for third-party content or availability.",
        ],
      },
      {
        h: "4. Compliance responsibilities",
        body: [
          "Customers remain responsible for the design of their incentive schemes and applicable labor, tax (including TDS/GST) and sectoral regulations. Budgetree provides tooling and reports to assist, not to replace, your compliance process.",
        ],
      },
    ],
  },
];

export const getLegal = (slug: string) => LEGAL.find((l) => l.slug === slug);
