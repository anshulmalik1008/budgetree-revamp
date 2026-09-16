export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  read: string;
  excerpt: string;
  accent: string;
  content: Array<{ h?: string; p: string }>;
};

export const CATEGORIES = [
  "All",
  "UPI & Payouts",
  "Loyalty Programs",
  "Corporate Gifting",
  "Rewards & Recognition",
  "General",
];

export const POSTS: Post[] = [
  {
    slug: "why-budgetree-is-one-of-the-best-loyalty-companies-in-india",
    title: "Why Budgetree Is One of the Best Loyalty Companies in India",
    category: "Loyalty Programs",
    date: "Sep 7, 2026",
    read: "4 min read",
    excerpt:
      "Loyalty is no longer just about points, cashback or rewards. Brands need a complete ecosystem that can engage, incentivize, retain and grow their entire network.",
    accent: "from-lilac/80 to-[#7C5CFF]/60",
    content: [
      {
        p: "Loyalty in India has moved far beyond stamp cards and points wallets. Today's brands need an ecosystem: one that engages customers, incentivizes channel partners, retains employees and grows revenue — without stitching together five vendors.",
      },
      {
        h: "An ecosystem, not a points wallet",
        p: "Budgetree unifies RewardX, LoyaltyX, UPI Cash Tokens, Payouts and Bill Payments under one dashboard, one API and one catalog. A customer earns on purchase, a dealer earns on volume and an employee earns on a milestone — all settled over the same rails.",
      },
      {
        h: "Instant is the new loyal",
        p: "The programs that win are the ones that reward in seconds, not statements. UPI cashback that lands before the customer leaves the counter changes how loyalty feels — and how often they come back.",
      },
      {
        h: "Built for Indian scale",
        p: "With 10M+ rewards delivered, 175+ countries served and 99.99% uptime, Budgetree is trusted by 250+ enterprises across BFSI, retail, pharma and auto — the reason it consistently ranks among India's top loyalty companies.",
      },
    ],
  },
  {
    slug: "upi-mdr-2026-explained-guide-for-businesses",
    title: "UPI MDR 2026 Explained: The Complete Guide for Merchants and Businesses",
    category: "UPI & Payouts",
    date: "Sep 16, 2026",
    read: "5 min read",
    excerpt:
      "NPCI's new 0.4% UPI MDR takes effect 15 October 2026 on merchant payments above ₹2,000, capped at ₹300. Consumers and small merchants stay exempt — here's what businesses must know.",
    accent: "from-gold/80 to-[#FF8A3D]/60",
    content: [
      {
        p: "From 15 October 2026, a 0.4% merchant discount rate (MDR) applies to UPI transactions above ₹2,000, capped at ₹300 per transaction. Consumer-to-consumer payments and small merchants remain exempt.",
      },
      {
        h: "Who actually pays?",
        p: "The charge lands on merchants receiving large UPI payments — think high-ticket retail, B2B collections and service businesses. For a ₹50,000 invoice, that's the full ₹300 cap; for ₹3,000, it's ₹12.",
      },
      {
        h: "What smart businesses are doing",
        p: "Three moves dominate: routing micro-payments below the ₹2,000 threshold where possible, negotiating blended rates on payout rails, and offsetting the cost by folding UPI cashback into loyalty economics — rewarded customers accept fees far more gracefully.",
      },
      {
        h: "The Budgetree angle",
        p: "Our payouts engine auto-routes each disbursement across UPI, IMPS and wallet rails for the lowest effective cost, and reconciliation shows MDR line-by-line — so finance sees the true cost of every rupee moved.",
      },
    ],
  },
  {
    slug: "budgetree-digital-payments-rewards-loyalty",
    title: "How Budgetree is Connecting Digital Payments, Rewards & Loyalty for Modern Businesses",
    category: "General",
    date: "Sep 4, 2026",
    read: "4 min read",
    excerpt:
      "Payments are no longer just about moving money. Customers expect every transaction to carry value — and rewards are how modern brands deliver it.",
    accent: "from-mint/80 to-[#0EA472]/60",
    content: [
      {
        p: "As India accelerates its digital transformation, a payment is no longer the end of a customer journey — it's the best moment to start the next one. Every UPI transaction is a chance to reward, re-engage and retain.",
      },
      {
        h: "The convergence",
        p: "Payments, rewards and loyalty used to live in separate systems. Budgetree converges them: a purchase triggers points, a QR scan triggers cashback, a milestone triggers a payout — all settled instantly over UPI rails.",
      },
      {
        h: "What this means for your P&L",
        p: "Brands using reward-linked payments report 30–45% engagement uplifts and materially higher repeat rates, because the incentive arrives at the emotional peak — the moment of purchase — instead of a month-end statement.",
      },
      {
        p: "Whether you run a bank, a D2C brand or a dealer network, the playbook is the same: make every payment a loyalty event. That's the infrastructure Budgetree exists to provide.",
      },
    ],
  },
  {
    slug: "best-payout-apis-in-india-budgetree",
    title: "Best Payout APIs in India: RazorpayX, SiriPay, Cashfree, Bulkpe, Paytm & Decentro",
    category: "UPI & Payouts",
    date: "Sep 4, 2026",
    read: "6 min read",
    excerpt:
      "Indian businesses have moved from manual payments to automated payouts. Here's how the leading payout APIs compare for NBFCs, marketplaces, logistics and e-commerce.",
    accent: "from-sky/80 to-[#3D7BFF]/60",
    content: [
      {
        p: "Payout automation is now table stakes for marketplaces, gig platforms, NBFCs and logistics companies. The leaders in India — RazorpayX, Cashfree, Paytm, Decentro, Bulkpe and SiriPay — each shine in different corners: breadth of rails, pricing, or vertical depth.",
      },
      {
        h: "What to evaluate",
        p: "Look beyond the headline fee: success rates on odd-hour UPI, retry intelligence, beneficiary validation, TDS/GST paperwork, and how reconciliation surfaces UTRs. A 0.5% cheaper API that fails 2% more often costs you support tickets and trust.",
      },
      {
        h: "Where Budgetree fits",
        p: "Budgetree's payout engine is built for reward-flavored disbursements: bulk UPI cash, gift-card value and incentives with maker-checker approvals, auto-retries and audit-ready reports — plus the rewards catalog on top, which pure payout rails don't offer.",
      },
      {
        p: "Shortlist two or three, run a 500-transfer sandbox test at 2 a.m. (when rails are flakiest), and pick the one your finance team can reconcile without spreadsheets.",
      },
    ],
  },
  {
    slug: "what-is-upi-how-unified-payments-interface-works-in-india",
    title: "What Is UPI? How Unified Payments Interface Works in India",
    category: "UPI & Payouts",
    date: "Sep 4, 2026",
    read: "4 min read",
    excerpt:
      "UPI changed how India sends and receives money — from kirana stores to enterprise payouts. A plain-English explainer on how it works under the hood.",
    accent: "from-volt/80 to-mint/60",
    content: [
      {
        p: "Unified Payments Interface (UPI), built by NPCI, lets money move between bank accounts using a simple address — a VPA like name@bank — instead of account numbers and IFSC codes. It runs 24×7, settles in seconds and is free for consumers.",
      },
      {
        h: "The flow in one breath",
        p: "Your app sends a collect or pay request to NPCI's switch, which routes it to the payer's and payee's banks over IMPS rails; both banks authenticate and confirm; the switch returns a UTR. End to end: usually under three seconds.",
      },
      {
        h: "Why businesses love it",
        p: "Instant settlement, near-zero friction and universal adoption make UPI the default rail for rewards and payouts too — which is why UPI cash tokens have become India's favorite reward format.",
      },
      {
        p: "Budgetree settles rewards over UPI around the clock, including holidays, with per-link limits, expiry handling and automatic reconciliation of every UTR.",
      },
    ],
  },
  {
    slug: "planning-janmashtami-gifts-for-your-team-supergift-card",
    title: "Planning Janmashtami Gifts for Your Team? Here's Why SuperGift Card Wins",
    category: "Corporate Gifting",
    date: "Sep 3, 2026",
    read: "3 min read",
    excerpt:
      "SuperGift Card makes festive corporate gifting simple and personalized — recipients choose what they want, across digital or physical options.",
    accent: "from-[#FF8AB2]/80 to-[#B44DFF]/60",
    content: [
      {
        p: "Festive gifting usually means guessing: one sweet box, five hundred opinions. SuperGift Card flips the model — you set the value and the branding; each recipient chooses from top brands they actually love.",
      },
      {
        h: "Why it works for festivals",
        p: "Choice respects every preference and region; digital delivery reaches field teams and remote staff instantly; physical cards add ceremony for office moments. One program, zero leftover inventory.",
      },
      {
        h: "The ops view",
        p: "Upload a sheet, hit send, and watch delivery and redemption track themselves. HR saves a week of logistics; finance gets one clean invoice instead of forty vendor bills.",
      },
      {
        p: "For Janmashtami — or Diwali, Holi, onboarding week — SuperGift turns gifting from a logistics project into a two-minute task that people remember.",
      },
    ],
  },
  {
    slug: "upi-engage",
    title: "UPI Engage: Turning Every UPI Transaction into an Opportunity",
    category: "UPI & Payouts",
    date: "Sep 2, 2026",
    read: "4 min read",
    excerpt:
      "Payments are becoming instant. Rewards should be too. UPI Engage turns everyday transactions into loyalty moments that bring customers back.",
    accent: "from-gold/80 to-[#FF8A3D]/60",
    content: [
      {
        p: "India runs on UPI — billions of transactions a month. Yet most brands treat each payment as an endpoint. UPI Engage treats it as a trigger: every transaction can start a reward, a streak or a surprise.",
      },
      {
        h: "How it works",
        p: "Connect your payment events; define rules (first transaction, fifth this week, above ₹500, festive window); Budgetree delivers instant cashback or points over the same UPI rail. No app download, no forms.",
      },
      {
        h: "The compounding effect",
        p: "Because the reward lands seconds after the payment, the brain links your brand with the win. Merchants using transaction-triggered rewards see visit frequency climb within weeks — loyalty measured in behavior, not points balances.",
      },
      {
        p: "Every tap is a conversation. UPI Engage makes sure your brand answers it.",
      },
    ],
  },
  {
    slug: "how-to-design-a-rewards-program-that-actually-works",
    title: "How to Design a Rewards Program That Actually Works",
    category: "Rewards & Recognition",
    date: "Aug 18, 2026",
    read: "5 min read",
    excerpt:
      "A rewards program is easy to launch. One that customers, employees or partners actually use is much harder. Here's the playbook.",
    accent: "from-lilac/80 to-[#7C5CFF]/60",
    content: [
      {
        p: "Most reward programs die of irrelevance, not budget. The ones that work share four traits: instant value, visible progress, personal choice and honest economics.",
      },
      {
        h: "Instant beats big",
        p: "A ₹100 cashback in three seconds outperforms a ₹500 voucher in thirty days. Speed is the feature — it's why UPI-first programs redeem at 2–3x the rate of catalog-only schemes.",
      },
      {
        h: "Progress & choice",
        p: "Show the path ('2 more visits to Gold') and let people pick their reward. Choice converts obligation into desire; progress turns transactions into games people want to win.",
      },
      {
        h: "Keep the economics honest",
        p: "Fund the program from measurable outcomes — repeat rate, retention, referral — and watch dashboards, not vanity metrics. Budgetree ties every rupee rewarded to the behavior it bought, so ROI is a report, not a hope.",
      },
    ],
  },
  {
    slug: "the-future-of-consumer-retailer-loyalty-in-india-is-instant",
    title: "The Future of Consumer & Retailer Loyalty in India Is Instant",
    category: "Loyalty Programs",
    date: "Aug 19, 2026",
    read: "4 min read",
    excerpt:
      "With UPI as the preferred way to pay, brands can make loyalty more immediate, simpler and far more effective than points-on-a-card.",
    accent: "from-mint/80 to-[#0EA472]/60",
    content: [
      {
        p: "India's loyalty landscape is changing rapidly. With UPI the default payment rail, the expectation of immediacy has bled into everything else — including rewards. Monthly point credits feel like a paper statement in a UPI world.",
      },
      {
        h: "Consumer side",
        p: "QR cashback on-pack and at-counter turns anonymous buyers into first-party relationships: scan, earn, repeat. The brand finally sees its end consumer — and can reward frequency, not just volume.",
      },
      {
        h: "Retailer side",
        p: "Kirana and distributor loyalty moves from quarterly schemes to instant slabs: every verified invoice earns, every milestone pays out the same day. Trade partners push what pays them fastest — make it you.",
      },
      {
        p: "The winners of the next decade will be brands whose loyalty feels like UPI itself: instant, invisible and everywhere. That's the standard Budgetree is built to.",
      },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
