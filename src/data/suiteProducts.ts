export type Accent = "acc" | "grape" | "azure" | "honey" | "jade" | "pink";

export type IconName =
  | "Warehouse"
  | "Truck"
  | "PackageCheck"
  | "ScanBarcode"
  | "Boxes"
  | "Route"
  | "MapPin"
  | "Smartphone"
  | "ClipboardList"
  | "ShoppingCart"
  | "Workflow"
  | "RotateCcw"
  | "Layers"
  | "Tags"
  | "Image"
  | "Share2"
  | "Database"
  | "BarChart3"
  | "Bell"
  | "RefreshCw"
  | "Target"
  | "Gauge"
  | "TrendingUp"
  | "Network"
  | "Percent"
  | "Gift"
  | "Ticket"
  | "IndianRupee"
  | "Scale"
  | "LineChart"
  | "ShieldCheck"
  | "Trophy"
  | "Wallet"
  | "Calculator"
  | "Users"
  | "Zap"
  | "Sparkles"
  | "CalendarClock"
  | "Lock"
  | "Store"
  | "Camera"
  | "Cpu"
  | "Radar"
  | "Siren"
  | "Handshake"
  | "FileCheck"
  | "Coins"
  | "Globe"
  | "Clock";

export type VisualKey =
  | "wms"
  | "sfa"
  | "oms"
  | "pim"
  | "inventory"
  | "target"
  | "scheme"
  | "pricing"
  | "incentive";

export type Category = "Supply chain" | "Sales execution" | "Commercial engine";

export type Product = {
  slug: string;
  name: string;
  short: string;
  category: Category;
  icon: IconName;
  accent: Accent;
  visual: VisualKey;
  eyebrow: string;
  headline: { a: string; em: string; b: string };
  tagline: string;
  description: string;
  stats: { value: number; prefix?: string; suffix?: string; decimals?: number; label: string }[];
  features: { icon: IconName; title: string; text: string }[];
  steps: { title: string; text: string }[];
  benefits: string[];
  related: string[];
  faqs: { q: string; a: string }[];
  outcomesNote?: string;
};

export const categories: { name: Category; blurb: string }[] = [
  { name: "Supply chain", blurb: "Know what you have, where it is, and move it faster." },
  { name: "Sales execution", blurb: "Plan, visit, sell and hit targets — in the field and online." },
  { name: "Commercial engine", blurb: "Price, promote and reward with precision and zero leakage." },
];

export const products: Product[] = [
  /* ───────────────────────── WMS ───────────────────────── */
  {
    slug: "warehouse-management",
    name: "Warehouse Management",
    short: "WMS",
    category: "Supply chain",
    icon: "Warehouse",
    accent: "acc",
    visual: "wms",
    eyebrow: "Warehouse Management System",
    headline: { a: "Warehouses that", em: "sense & execute", b: "in real time." },
    tagline: "A live control layer across inbound, putaway, picking, packing and dispatch.",
    description:
      "BudgeTree WMS orchestrates every movement on the floor — bin, rack and zone-level control, guided pick paths and dock-aware dispatch — with stock synced to your ERP and order channels across one or many warehouses.",
    stats: [
      { value: 99.5, suffix: "%", decimals: 1, label: "Pick accuracy & dispatch reliability" },
      { value: 2.5, suffix: "x", decimals: 1, label: "Order processing throughput" },
      { value: 40, suffix: "%", label: "Less picking, staging & dock congestion" },
      { value: 30, suffix: "%", label: "Better labour productivity" },
    ],
    features: [
      { icon: "PackageCheck", title: "Inbound, GRN & putaway", text: "Dock scheduling, ASN matching, quality checks and directed putaway into the right bin the first time." },
      { icon: "Boxes", title: "Bin, rack & zone control", text: "Location-level inventory with zone rules, dynamic slotting by SKU velocity and pick-face replenishment." },
      { icon: "Route", title: "Wave & guided picking", text: "Wave, batch and zone picking with optimised paths that cut walking time and mis-picks." },
      { icon: "Truck", title: "Pack, stage & dispatch", text: "Stage packed orders against carrier cut-offs and release loads only when documents are ready." },
      { icon: "ScanBarcode", title: "RF guns & handhelds", text: "Standard RF scanners and Android handhelds validate item, bin and quantity on every scan." },
      { icon: "RefreshCw", title: "ERP & channel sync", text: "Bi-directional sync — every receipt, move, pick and dispatch updates stock instantly. No reconciliation." },
    ],
    steps: [
      { title: "Sense", text: "Captures live signals from docks, bins, picks, labour activity and equipment." },
      { title: "Prioritise", text: "Decides what needs attention first — receiving, replenishment, picking or dispatch." },
      { title: "Assign", text: "Distributes tasks by zone load, skill level and shift capacity." },
      { title: "Guide", text: "Guides pick paths, bin sequence and task order to reduce walking and errors." },
      { title: "Validate", text: "Confirms the correct item, bin, quantity and handling rules on every scan." },
      { title: "Dispatch & improve", text: "Releases shipments when loading sequence and paperwork are ready, then learns from every gap." },
    ],
    benefits: [
      "Multi-warehouse and 3PL visibility from one screen",
      "Only genuine exceptions get flagged — shortages, damages, repeat mis-picks",
      "Slotting that adapts to product velocity automatically",
      "Works with RF guns, tablets and Android handhelds",
      "FEFO/FIFO and batch rules enforced at pick time",
      "Audit-ready movement history for every unit",
    ],
    related: ["inventory-management", "order-management", "product-information-management"],
    faqs: [
      { q: "Does it support wave picking?", a: "Yes. The engine groups orders into waves to maximise bin density and minimise travel time, and also supports batch, zone and cluster picking." },
      { q: "How does slotting work?", a: "We map your warehouse layout and re-slot dynamically based on product velocity so fast-moving SKUs always sit in the easiest-to-reach locations." },
      { q: "Can we use our existing scanners?", a: "Yes — standard RF guns and modern Android handhelds are supported for scanning, validation and task management." },
      { q: "Will it connect to our ERP?", a: "BudgeTree WMS syncs bi-directionally with ERPs and order channels through APIs, so stock and order status stay accurate at all times." },
    ],
  },

  /* ───────────────────────── SFA ───────────────────────── */
  {
    slug: "sales-force-automation",
    name: "Sales Force Automation",
    short: "SFA",
    category: "Sales execution",
    icon: "Route",
    accent: "azure",
    visual: "sfa",
    eyebrow: "Sales Force Automation",
    headline: { a: "Field sales that", em: "plans, visits & sells", b: "on autopilot." },
    tagline: "AI-assisted beats, geo-validated visits and offline order booking.",
    description:
      "Give every rep a smart daily plan and every manager live visibility. BudgeTree SFA covers beat planning, outlet visits, order booking, merchandising audits and target tracking — and syncs straight into OMS, inventory and incentives.",
    stats: [
      { value: 35, suffix: "%", label: "More productive calls per day" },
      { value: 2, suffix: "x", label: "Faster order capture in outlet" },
      { value: 100, suffix: "%", label: "Geo-validated visits & check-ins" },
      { value: 5, prefix: "<", suffix: " min", label: "Daily sync, even from low-network areas" },
    ],
    outcomesNote: "Typical outcomes seen in FMCG & distribution field teams.",
    features: [
      { icon: "Route", title: "Beat & route planning", text: "Auto-built daily beats by outlet class, potential and distance — with visit frequency rules." },
      { icon: "MapPin", title: "Geo-tagged visits & attendance", text: "Selfie + GPS check-ins, time-in-outlet and route adherence tracked without paperwork." },
      { icon: "Smartphone", title: "Offline-first order booking", text: "Book orders, capture stock and collect payments with no network — it syncs the moment you're back." },
      { icon: "Store", title: "Retailer & outlet master", text: "Onboard retailers in minutes with KYC, geo-fence and classification, linked to distributors." },
      { icon: "Camera", title: "Merchandising & photo audits", text: "Shelf-share, planogram and POSM audits with image recognition and instant scoring." },
      { icon: "Sparkles", title: "AI nudges for every visit", text: "Suggested orders, scheme reminders and next-best-actions so reps pitch what actually sells." },
    ],
    steps: [
      { title: "Plan the beat", text: "System builds an optimised route for the day based on outlet value, last visit and targets." },
      { title: "Check in", text: "Geo-validated check-in with attendance and time-in-outlet recorded automatically." },
      { title: "Capture", text: "Orders, stock levels, collections, competitor intel and shelf photos — all in one flow." },
      { title: "Sync", text: "Orders flow to OMS and distributors instantly; stock and schemes update in real time." },
      { title: "Review & coach", text: "ASMs and RSMs see live dashboards for target vs achievement and coach on the spot." },
    ],
    benefits: [
      "Real-time visibility of every rep, route and outlet",
      "Eliminates paper DSRs and manual expense claims",
      "Live scheme and price view inside the outlet",
      "Target and incentive progress on the rep's home screen",
      "Hierarchy-based dashboards: rep → ASM → RSM → HQ",
      "Works in 10+ Indian languages",
    ],
    related: ["target-management", "order-management", "incentive-management"],
    faqs: [
      { q: "Does the app work without internet?", a: "Yes. The mobile app is offline-first — beats, outlet data, prices and schemes are cached, and every action syncs automatically when connectivity returns." },
      { q: "How are visits validated?", a: "Each visit uses GPS geo-fencing plus an optional selfie or shelf photo, so managers can trust time-in-outlet and route adherence." },
      { q: "Can it connect to our DMS or ERP?", a: "Yes. SFA orders flow into the BudgeTree OMS and can be pushed to your existing DMS, ERP or CRM via APIs." },
      { q: "Can reps see their incentives?", a: "Absolutely — target progress and projected incentive earnings are shown live, which is one of the strongest drivers of daily activity." },
    ],
  },

  /* ───────────────────────── OMS ───────────────────────── */
  {
    slug: "order-management",
    name: "Order Management",
    short: "OMS",
    category: "Supply chain",
    icon: "ShoppingCart",
    accent: "grape",
    visual: "oms",
    eyebrow: "Commerce & Order Management System",
    headline: { a: "Every order,", em: "orchestrated", b: "from click to cash." },
    tagline: "One engine for orders, pricing, fulfilment and returns across every channel.",
    description:
      "Capture orders from the field app, dealer portal, web, phone and EDI in one place. BudgeTree OMS validates credit and pricing, routes fulfilment to the right warehouse and manages returns and exceptions end to end.",
    stats: [
      { value: 3, suffix: "x", label: "Faster order processing" },
      { value: 98.5, suffix: "%", decimals: 1, label: "Order accuracy at dispatch" },
      { value: 60, suffix: "%", label: "Fewer manual touches" },
      { value: 100, suffix: "%", label: "Real-time order status visibility" },
    ],
    outcomesNote: "Typical outcomes seen in B2B & multi-channel distribution businesses.",
    features: [
      { icon: "Network", title: "Omni-channel order capture", text: "Field app, dealer portal, web, phone, marketplace and EDI orders land in one unified queue." },
      { icon: "ShieldCheck", title: "Credit & price validation", text: "Orders are checked against credit limits, price lists and scheme rules before they confirm." },
      { icon: "Workflow", title: "Approval workflows", text: "Configurable multi-level approvals for discounts, credit overrides and large orders." },
      { icon: "Warehouse", title: "Smart fulfilment routing", text: "Picks the best warehouse by stock, distance and service level — and splits shipments when needed." },
      { icon: "RotateCcw", title: "Returns & exceptions", text: "RMA, credit notes, short-shipments and damages handled with clear ownership and SLAs." },
      { icon: "Bell", title: "Live tracking & alerts", text: "Customers, reps and distributors get proactive status updates at every milestone." },
    ],
    steps: [
      { title: "Capture", text: "Orders arrive from every channel and are normalised into a single order record." },
      { title: "Validate", text: "Credit, price, scheme and stock checks run automatically in milliseconds." },
      { title: "Allocate", text: "Stock is reserved and the best-fit warehouse or distributor is selected." },
      { title: "Fulfil", text: "Pick, pack and dispatch tasks flow to WMS with carrier and route details." },
      { title: "Invoice & track", text: "E-invoice, e-way bill and tracking links are generated and shared." },
      { title: "Return & settle", text: "Returns, credit notes and exceptions close the loop with finance." },
    ],
    benefits: [
      "No more re-keying orders between systems",
      "Prevents overselling with live availability",
      "GST-ready invoicing and e-way bill support",
      "Partial, split and back-order handling built in",
      "Distributor and dealer self-serve portals",
      "SLA dashboards for every stage of the order",
    ],
    related: ["inventory-management", "warehouse-management", "pricing-management"],
    faqs: [
      { q: "Which order channels are supported?", a: "Mobile SFA app, dealer/distributor portal, web storefront, phone/back-office entry, bulk upload and EDI/API integrations." },
      { q: "How are credit limits enforced?", a: "Every order is checked against the customer's credit limit, outstanding and ageing; breaches route to a configurable approval workflow." },
      { q: "Can orders be split across warehouses?", a: "Yes. The routing engine can split by availability, distance or SLA and keep the customer informed with a single order view." },
      { q: "How do returns work?", a: "Returns are raised against the original invoice, validated, moved back into inventory (or scrapped) and settled through credit notes automatically." },
    ],
  },

  /* ───────────────────────── PIM ───────────────────────── */
  {
    slug: "product-information-management",
    name: "Product Information Management",
    short: "PIM",
    category: "Supply chain",
    icon: "Database",
    accent: "pink",
    visual: "pim",
    eyebrow: "Product Information Management",
    headline: { a: "One source of truth for", em: "every SKU,", b: "every channel." },
    tagline: "Create, enrich and syndicate product data once — everywhere, accurately.",
    description:
      "Stop chasing spreadsheets. BudgeTree PIM keeps your master catalogue — SKUs, variants, attributes, GST and HSN data, pricing hooks and rich media — clean, complete and instantly available to field apps, dealers, ERPs and marketplaces.",
    stats: [
      { value: 1, label: "Master catalogue for all channels" },
      { value: 5, suffix: "x", label: "Faster new-SKU launches" },
      { value: 95, suffix: "%", label: "Average attribute completeness" },
      { value: 0, label: "Spreadsheets in the loop" },
    ],
    outcomesNote: "Typical outcomes seen after catalogue consolidation.",
    features: [
      { icon: "Database", title: "Central product master", text: "A single governed catalogue for SKUs, brands, categories, packs and units of measure." },
      { icon: "Layers", title: "Families & variants", text: "Model sizes, flavours, pack-types and bundles with inheritance — edit once, update all." },
      { icon: "Tags", title: "Rich attributes & tax data", text: "Custom attributes plus HSN, GST, barcode (EAN), shelf-life and compliance fields." },
      { icon: "Image", title: "Digital asset library", text: "Images, videos and spec sheets linked to products and versioned automatically." },
      { icon: "Gauge", title: "Completeness scoring", text: "See what is missing per SKU and per channel with rule-based quality checks." },
      { icon: "Share2", title: "Channel syndication", text: "Push the right data to field app, dealer portal, ERP, marketplaces and your website in one click." },
    ],
    steps: [
      { title: "Import", text: "Bulk-load from Excel, ERP or supplier feeds with smart column mapping." },
      { title: "Enrich", text: "Add attributes, media, tax and pack data with templates by category." },
      { title: "Validate", text: "Quality rules score completeness and flag gaps before anything goes live." },
      { title: "Approve", text: "Role-based review and version history keep the master clean and auditable." },
      { title: "Syndicate", text: "Publish to every channel and keep them in sync automatically." },
    ],
    benefits: [
      "Consistent product data across SFA, OMS, WMS and dealers",
      "Fewer wrong shipments, wrong prices and wrong tax codes",
      "Faster onboarding for new brands and distributors",
      "Channel-specific views without duplicate data",
      "Full audit trail of who changed what, and when",
      "API-first for your own apps and storefronts",
    ],
    related: ["pricing-management", "inventory-management", "order-management"],
    faqs: [
      { q: "Can we import our existing catalogue?", a: "Yes — upload Excel/CSV or connect your ERP. Smart mapping and validation clean the data as it comes in." },
      { q: "Does it handle product variants and bundles?", a: "Yes. Families, variants, combo packs and kits are supported with attribute inheritance." },
      { q: "Which channels can it publish to?", a: "BudgeTree apps (SFA, dealer portal), ERPs, marketplaces such as Amazon and Flipkart, and your own website through APIs." },
      { q: "Is there approval and version control?", a: "Every change can go through a role-based approval workflow with complete version history and rollback." },
    ],
  },

  /* ───────────────────────── Inventory ───────────────────────── */
  {
    slug: "inventory-management",
    name: "Inventory Management",
    short: "Inventory",
    category: "Supply chain",
    icon: "Boxes",
    accent: "jade",
    visual: "inventory",
    eyebrow: "Inventory Management",
    headline: { a: "Know what you have,", em: "where it is", b: "and when it expires." },
    tagline: "Real-time stock visibility, intelligent allocation and precise control.",
    description:
      "BudgeTree Inventory gives you one live picture of stock across warehouses, distributors and channels — tracked down to batch, lot and serial, with AI-driven replenishment that keeps shelves full and capital free.",
    stats: [
      { value: 99, suffix: "%", label: "Stock record accuracy" },
      { value: 25, suffix: "%", label: "Lower excess & expiry write-offs" },
      { value: 30, suffix: "%", label: "Fewer stock-outs" },
      { value: 100, suffix: "%", label: "Batch-level traceability" },
    ],
    outcomesNote: "Typical outcomes seen in FMCG, pharma and consumer durables.",
    features: [
      { icon: "Boxes", title: "Live multi-location stock", text: "On-hand, in-transit and reserved stock across warehouses, distributors and channels." },
      { icon: "ScanBarcode", title: "Batch, lot & serial tracking", text: "Trace any unit forward and backward — essential for recalls, warranty and compliance." },
      { icon: "CalendarClock", title: "FEFO / FIFO & expiry control", text: "Nearest-expiry-first allocation and automated alerts before stock turns into write-off." },
      { icon: "Sparkles", title: "AI replenishment", text: "Demand-based reorder points and transfer suggestions tuned to seasonality and lead times." },
      { icon: "Lock", title: "Reservation & allocation", text: "Allocate stock to orders, schemes and channels with priority rules — no overselling." },
      { icon: "ClipboardList", title: "Cycle counts & shrinkage", text: "Scheduled counts, variance approvals and shrinkage analytics keep records honest." },
    ],
    steps: [
      { title: "Receive", text: "Stock enters with batch, expiry and quality status captured at GRN." },
      { title: "Track", text: "Every move, transfer and sale updates quantities across locations instantly." },
      { title: "Allocate", text: "Orders and schemes reserve the right batch using FEFO or FIFO rules." },
      { title: "Replenish", text: "Reorder and transfer suggestions are raised before stock-outs happen." },
      { title: "Optimise", text: "Ageing, slow-mover and expiry reports drive clearance and smarter buying." },
    ],
    benefits: [
      "One live inventory number across every channel",
      "Expiry and ageing alerts weeks ahead of time",
      "Safety stock tuned by SKU, region and season",
      "Distributor stock visibility with secondary-sales sync",
      "Recall-ready batch genealogy",
      "Native sync with WMS, OMS and ERP",
    ],
    related: ["warehouse-management", "order-management", "product-information-management"],
    faqs: [
      { q: "Can we track stock at distributor level?", a: "Yes. Distributor stock and secondary sales can be captured via DMS sync or the SFA app, giving you a complete network view." },
      { q: "How does replenishment work?", a: "The engine learns demand patterns and lead times, then suggests reorders and inter-warehouse transfers — you approve or auto-approve by rule." },
      { q: "Does it support serial numbers?", a: "Yes — batch, lot and serial-level tracking are supported with full traceability." },
      { q: "How are expiry rules handled?", a: "Define FEFO/FIFO per SKU. Alerts, near-expiry discounts and blocked allocation of expired stock are automatic." },
    ],
  },

  /* ───────────────────────── Target ───────────────────────── */
  {
    slug: "target-management",
    name: "Target Management",
    short: "Targets",
    category: "Sales execution",
    icon: "Target",
    accent: "honey",
    visual: "target",
    eyebrow: "Target Management",
    headline: { a: "Set targets that cascade,", em: "track them live,", b: "and hit them." },
    tagline: "Hierarchical, time-phased targets with real-time achievement tracking.",
    description:
      "Turn annual plans into daily clarity. BudgeTree Target Management cascades goals from company to region, area, distributor and rep — by SKU, category, channel and period — and tracks achievement against every one of them in real time.",
    stats: [
      { value: 4, suffix: " levels", label: "Cascade from HQ to individual rep" },
      { value: 22, suffix: "%", label: "Typical lift in target attainment" },
      { value: 80, suffix: "%", label: "Less time spent on target setting" },
      { value: 100, suffix: "%", label: "Live achievement visibility" },
    ],
    outcomesNote: "Typical outcomes seen in FMCG & distribution sales teams.",
    features: [
      { icon: "Network", title: "Multi-level cascade", text: "Break national targets into region, area, distributor, territory and rep — with top-down and bottom-up flows." },
      { icon: "Layers", title: "SKU, category & channel goals", text: "Volume, value, lines-per-call, new outlets, focus brands — any KPI you care about." },
      { icon: "CalendarClock", title: "Time-phased planning", text: "Annual → quarterly → monthly → weekly → daily, with seasonality weighting." },
      { icon: "Gauge", title: "Live achievement tracking", text: "Primary, secondary and field KPIs refresh automatically from OMS and SFA." },
      { icon: "TrendingUp", title: "Run-rate & forecasts", text: "Projected attainment and required run-rate tell managers where to intervene — today." },
      { icon: "Coins", title: "Linked to incentives", text: "Targets feed the incentive engine directly, so payouts always match performance." },
    ],
    steps: [
      { title: "Define", text: "Set company goals by KPI, product group, channel and period." },
      { title: "Cascade", text: "Distribute down the hierarchy using history, potential and rules — then fine-tune." },
      { title: "Assign", text: "Targets reach each rep, ASM and distributor on their app instantly." },
      { title: "Track", text: "Achievement, gap and run-rate update live from every order and visit." },
      { title: "Course-correct", text: "Alerts and reallocation tools help you rebalance before month-end." },
    ],
    benefits: [
      "No more Excel target sheets mailed around",
      "Fair targets based on potential, not guesswork",
      "Instant rebalancing when territories change",
      "Rep-level motivation with live progress bars",
      "Manager heatmaps for under-performing clusters",
      "Direct hand-off to incentive payouts",
    ],
    related: ["sales-force-automation", "incentive-management", "scheme-and-offers"],
    faqs: [
      { q: "Can targets be uploaded in bulk?", a: "Yes — upload by Excel or let the system propose a cascade from historical sales and outlet potential." },
      { q: "Which KPIs are supported?", a: "Sales volume and value, SKU/category mix, coverage, productive calls, lines per call, new outlets, collections and custom KPIs." },
      { q: "What happens when a territory changes mid-month?", a: "Targets can be re-split with pro-rating rules, and achievement history stays intact for incentive calculation." },
      { q: "Is it connected to incentives?", a: "Yes. Target achievement is the input for incentive plans so rewards are calculated and paid without manual effort." },
    ],
  },

  /* ───────────────────────── Schemes ───────────────────────── */
  {
    slug: "scheme-and-offers",
    name: "Scheme & Offers",
    short: "Schemes",
    category: "Commercial engine",
    icon: "Percent",
    accent: "pink",
    visual: "scheme",
    eyebrow: "Scheme & Offers Management",
    headline: { a: "Schemes & offers that", em: "drive volume", b: "without leaking margin." },
    tagline: "Design, apply and settle trade schemes automatically — with full ROI visibility.",
    description:
      "From buy-X-get-Y to slab discounts and combos, BudgeTree lets you launch region- and outlet-specific schemes in minutes. Offers auto-apply at order time, claims settle automatically, and every rupee is tracked back to ROI.",
    stats: [
      { value: 15, suffix: " min", label: "To launch a new scheme" },
      { value: 100, suffix: "%", label: "Auto-applied at order time" },
      { value: 70, suffix: "%", label: "Faster claim settlement" },
      { value: 0, label: "Manual scheme calculations" },
    ],
    outcomesNote: "Typical outcomes seen after automating trade schemes.",
    features: [
      { icon: "Ticket", title: "Flexible scheme types", text: "Buy X get Y, slab, value/volume, combo, free goods, cash discount, bill-wise and product-wise." },
      { icon: "Users", title: "Smart eligibility", text: "Target by region, channel, outlet class, distributor, product group or customer history." },
      { icon: "ShieldCheck", title: "Budget caps & guardrails", text: "Set spend limits and stacking rules so schemes never overrun or double-dip." },
      { icon: "Zap", title: "Auto-apply at order", text: "Reps and dealers see applicable schemes and the exact benefit right in the cart." },
      { icon: "FileCheck", title: "Claims & settlement", text: "Automated claim generation, validation and credit-note settlement with distributors." },
      { icon: "Gift", title: "Rewards on top", text: "Add BudgeTree vouchers, gift cards or UPI cash tokens as retailer loyalty incentives." },
    ],
    steps: [
      { title: "Design", text: "Pick a scheme type, products, slabs, benefit and validity — with live preview." },
      { title: "Target", text: "Select the regions, outlets and channels that should see the offer." },
      { title: "Publish", text: "Push to field app, dealer portal and OMS in one click." },
      { title: "Auto-apply", text: "Eligible orders get the benefit automatically, with stacking rules honoured." },
      { title: "Settle & learn", text: "Claims settle automatically and ROI dashboards show what actually worked." },
    ],
    benefits: [
      "No more scheme circulars or WhatsApp confusion",
      "Disputes drop because calculations are transparent",
      "Spot high-ROI and low-ROI schemes instantly",
      "Combine trade schemes with consumer loyalty rewards",
      "Fraud and anomaly flags on claims",
      "Works across primary, secondary and tertiary sales",
    ],
    related: ["pricing-management", "order-management", "incentive-management"],
    faqs: [
      { q: "Can multiple schemes apply to one order?", a: "Yes, based on stacking rules you control — exclusive, additive or best-benefit-wins." },
      { q: "How are claims settled?", a: "The system computes eligible benefit per distributor from actual invoices and generates claims or credit notes automatically." },
      { q: "Can schemes be limited by budget?", a: "Absolutely. Set caps by scheme, region or period; the engine stops applying benefit when the cap is reached." },
      { q: "Can we reward retailers with UPI cash or vouchers?", a: "Yes — scheme achievement can trigger BudgeTree UPI cash tokens, gift cards or loyalty points automatically." },
    ],
  },

  /* ───────────────────────── Pricing ───────────────────────── */
  {
    slug: "pricing-management",
    name: "Pricing Management",
    short: "Pricing",
    category: "Commercial engine",
    icon: "IndianRupee",
    accent: "azure",
    visual: "pricing",
    eyebrow: "Pricing Management",
    headline: { a: "Price with", em: "confidence", b: "across every channel and region." },
    tagline: "Multi-level price lists, margin guardrails and effective-dated changes.",
    description:
      "Manage MRP, PTR, PTD and customer-specific prices from one place. BudgeTree Pricing applies the right price by region, channel and customer group, protects margin with guardrails and shows exactly where value leaks in the price waterfall.",
    stats: [
      { value: 1, label: "Price engine for every channel" },
      { value: 3, suffix: "%", label: "Typical margin leakage recovered" },
      { value: 90, suffix: "%", label: "Faster price-change rollouts" },
      { value: 0, label: "Wrong-price invoices" },
    ],
    outcomesNote: "Typical outcomes seen after centralising price management.",
    features: [
      { icon: "Layers", title: "Multi-level price lists", text: "MRP, PTR, PTD and company price lists by region, channel, distributor and customer group." },
      { icon: "Scale", title: "Margin guardrails", text: "Floor and ceiling rules stop unprofitable discounts before an order is confirmed." },
      { icon: "CalendarClock", title: "Effective-dated changes", text: "Schedule price revisions, launch pricing and festive offers to go live exactly when you want." },
      { icon: "Calculator", title: "Tax-aware pricing", text: "GST-inclusive/exclusive views, HSN-based tax and automatic rounding rules." },
      { icon: "Workflow", title: "Approval workflows", text: "Multi-level approvals for exceptions, special-rate requests and bulk price updates." },
      { icon: "LineChart", title: "Price waterfall analytics", text: "See MRP → net realisation, including margins, schemes and discounts, for any SKU or region." },
    ],
    steps: [
      { title: "Model", text: "Define price structures and margin rules for each channel and region." },
      { title: "Upload or sync", text: "Bulk update from Excel or ERP; preview impact before publishing." },
      { title: "Approve", text: "Route changes and exceptions through configurable approvals." },
      { title: "Publish", text: "Prices reach SFA, dealer portal and OMS instantly — on the effective date." },
      { title: "Analyse", text: "Track realisation, discount leakage and competitive position over time." },
    ],
    benefits: [
      "Single source of price truth across every system",
      "Instant region-wise or customer-wise price revisions",
      "Margin protection on every order",
      "Special-rate requests handled digitally with audit trail",
      "Impact simulation before a price change goes live",
      "Seamless connection to schemes and order management",
    ],
    related: ["scheme-and-offers", "order-management", "product-information-management"],
    faqs: [
      { q: "Can prices differ by region or customer?", a: "Yes. Price lists can be assigned by region, channel, distributor, customer group or even individual accounts." },
      { q: "How are margin guardrails enforced?", a: "Define minimum margin or maximum discount per SKU or category. Orders breaching it are blocked or routed for approval." },
      { q: "Can we schedule price changes?", a: "Yes. Every price carries effective dates, so future revisions are staged and go live automatically." },
      { q: "Does it handle GST?", a: "Tax rates are derived from HSN data in PIM, and prices can be viewed tax-inclusive or exclusive." },
    ],
  },

  /* ───────────────────────── Incentive ───────────────────────── */
  {
    slug: "incentive-management",
    name: "Incentive Management",
    short: "Incentives",
    category: "Commercial engine",
    icon: "Trophy",
    accent: "acc",
    visual: "incentive",
    eyebrow: "Incentive Management",
    headline: { a: "Incentives that motivate,", em: "calculate themselves", b: "& pay instantly." },
    tagline: "Plan, compute and pay sales incentives — powered by BudgeTree payouts.",
    description:
      "Design slab, accelerator and team-based plans, compute earnings automatically from live sales, target and SFA data, and disburse instantly via UPI, bank transfer or gift cards using BudgeTree Payouts — with every rupee audit-ready.",
    stats: [
      { value: 90, suffix: "%", label: "Less time spent on payout calculation" },
      { value: 24, prefix: "<", suffix: "h", label: "From period close to payout" },
      { value: 99.99, suffix: "%", decimals: 2, label: "Payout platform uptime" },
      { value: 0, label: "Disputes from opaque calculations" },
    ],
    outcomesNote: "Platform uptime reflects BudgeTree payouts; other outcomes are typical for automated incentive programs.",
    features: [
      { icon: "Calculator", title: "Flexible plan builder", text: "Slabs, accelerators, multipliers, caps, gates and team splits — configured without code." },
      { icon: "RefreshCw", title: "Auto-calculation", text: "Earnings computed from live OMS, SFA, target and collection data. No spreadsheets." },
      { icon: "Trophy", title: "Leaderboards & gamification", text: "Live rankings, badges and contests keep teams motivated all month, not just at the end." },
      { icon: "Siren", title: "Disputes & adjustments", text: "Raise, review and resolve queries in-app with a full audit trail and approvals." },
      { icon: "Wallet", title: "Instant payouts", text: "Pay via UPI, bank, wallet or gift cards using BudgeTree Payouts — one rep or thousands." },
      { icon: "ShieldCheck", title: "Audit-ready & compliant", text: "Role-based access, versioned plans and reconciled payout reports for finance." },
    ],
    steps: [
      { title: "Design the plan", text: "Build slabs and rules per role — rep, ASM, distributor salesman or retailer." },
      { title: "Ingest KPIs", text: "Sales, targets, coverage and collections stream in from the suite." },
      { title: "Calculate", text: "Earnings and projections update daily, visible to the rep on their app." },
      { title: "Approve", text: "Managers review exceptions and adjustments before release." },
      { title: "Pay", text: "Bulk payout to UPI, bank or gift cards — reconciled automatically." },
    ],
    benefits: [
      "Reps see projected earnings every day",
      "Finance gets reconciled, audit-ready payout files",
      "Works for employees, distributors and retailers alike",
      "Combine cash incentives with loyalty and rewards",
      "Plan versioning with effective dates",
      "Real-time insight into payout vs performance",
    ],
    related: ["target-management", "sales-force-automation", "scheme-and-offers"],
    faqs: [
      { q: "How are incentives paid out?", a: "Through BudgeTree Payouts — instant UPI, bank transfer, wallet or gift cards, with bulk upload or fully automated runs." },
      { q: "Can we run different plans for different roles?", a: "Yes. Every role, geography or cohort can have its own plan, with effective dates and versioning." },
      { q: "Can reps see their earnings?", a: "Yes. Rep and manager apps show projected incentives and what it takes to reach the next slab." },
      { q: "Is the process auditable?", a: "Every calculation, adjustment and payout is logged and reconciled — ready for finance and internal audit." },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const rewardProducts = [
  { name: "RewardX", text: "Recognise. Reward. Repeat — instant employee & partner rewards.", href: "https://budgetree.in/product-reward" },
  { name: "LoyaltyX", text: "Smart, white-labelled loyalty with a dynamic rewards catalogue.", href: "https://budgetree.in/product-loyaltyx" },
  { name: "UPI Rewards", text: "Instant cash tokens straight to bank — no app, no sign-up.", href: "https://budgetree.in/product-upireward" },
  { name: "Payouts", text: "Fast, secure bulk and individual payouts with full compliance.", href: "https://budgetree.in/product-payout" },
  { name: "Gift Card API", text: "350+ digital gift cards with up to 54% discounts, delivered in 24h.", href: "https://budgetree.in/gift-card-api" },
];

export const accentVar = (a: Accent) => `var(--c-${a})`;
