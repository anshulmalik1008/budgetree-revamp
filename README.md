# BudgeTree — Interactive Revamp

A from-scratch rebuild of **budgetree.in** as a highly interactive, animated
marketing site. Built with **Next.js 14 + Tailwind CSS + TypeScript + Framer Motion**.

## Animation references

- **Sanyam portfolio** — preloader with 0→100% counter, staggered display type
  with italic-serif accents, numbered sections (01–07), marquee ribbons,
  drag-to-explore rail.
- **Pine Labs** — sticky stacking product cards on scroll, pill cards,
  clean fintech mock-UI visuals.

## Original additions

- Live hero dashboard with animated bars, donut chart, mouse parallax and a
  real-time payout activity feed.
- Interactive **ROI calculator** with sliders + animated numbers + SVG growth curve.
- Cursor glow, scroll progress hairline, magnetic buttons, 3D tilt cards,
  auto-playing testimonial carousel, tabbed integrations, FAQ accordion.

## Run it

```bash
cd budgetree-revamp
npm install
npm run dev
```

Then open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Pages & backend

- `/` — animated homepage (preloader-gated)
- `/products/[slug]` — dedicated RewardX / LoyaltyX / UPI Rewards / Payouts / Bill Payments pages
- `/pricing` — monthly/annual toggle, plan cards, comparison table
- `/demo` — working slot-booking form (writes to `data/leads.json`)
- `POST /api/demo`, `POST /api/newsletter` — validated JSON APIs with file persistence
- Footer newsletter form wired to `/api/newsletter`

## Theming

Dark (default) + light (Pine Labs-style) via CSS-variable tokens in
`tailwind.config.ts` (`base/raise/sunken/fg/line/acc/jade/…`). Toggle in the
navbar, persisted to `localStorage`, applied pre-paint to avoid flashes.

## Structure

```
src/
  app/
    layout.tsx      # fonts + metadata + navbar/footer/chrome + theme init
    page.tsx        # homepage composition + preloader gate
    globals.css     # theme vars + tailwind + marquee/slider/scrollbar styling
    products/[slug]/page.tsx
    pricing/page.tsx
    demo/page.tsx
    api/demo/route.ts
    api/newsletter/route.ts
  data/products.ts  # shared product content model
  components/
    ui.tsx          # Reveal, CountUp, Magnetic, Tilt, SectionTag
    Logo.tsx        # official BudgeTree wordmark
    ThemeToggle.tsx # dark/light switch
    Preloader.tsx   # counter loader
    Navbar.tsx      # announcement bar, dropdown, hide-on-scroll, mobile menu
    Hero.tsx        # staggered headline, rotating words, live dashboard
    Marquee.tsx     # logo rows + ribbon strips
    WhyUs.tsx       # USP cards with cursor spotlight
    ProductStack.tsx# sticky stacking product cards (+ reusable mock UIs)
    DragRail.tsx    # drag-to-explore motions rail
    Calculator.tsx  # interactive ROI estimator
    Testimonials.tsx# auto carousel with drag
    Integrations.tsx# animated tabs
    SiriPay.tsx     # gifting banner with tilt cards
    Faq.tsx         # accordion
    CtaFooter.tsx   # final CTA band
    Footer.tsx      # footer + newsletter
    NewsletterForm.tsx
    Extras.tsx      # scroll progress, cursor glow, back-to-top
public/images/      # official logo + AI-generated product visuals
data/               # lead + newsletter storage (JSON lines, git-ignored in real use)
```
