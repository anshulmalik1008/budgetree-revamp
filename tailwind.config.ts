import type { Config } from "tailwindcss";

/* Theme-aware tokens resolve through CSS vars (see globals.css :root / .light).
   Dark mode = default. Light mode = `light` class on <html>. */
const v = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* ---- adaptive (dark ⇄ light) ---- */
        base: v("--c-base"), // page background
        raise: v("--c-raise"), // cards, nav, panels
        sunken: v("--c-sunken"), // deep tint sections
        fg: v("--c-fg"), // primary text
        line: v("--c-line"), // borders + subtle fills
        contrast: v("--c-contrast"), // light-section background
        contrastfg: v("--c-contrastfg"), // text on contrast
        lift: v("--c-lift"), // cards sitting on contrast
        acc: v("--c-acc"), // volt → deep lime (text/icons on theme bg)
        jade: v("--c-jade"), // mint → deep green
        grape: v("--c-grape"), // lilac → deep violet
        honey: v("--c-honey"), // gold → deep amber
        azure: v("--c-azure"), // sky → deep blue
        /* ---- fixed: identical in both themes ---- */
        coal: v("--c-coal"), // near-black (text on volt, dark fills)
        paper: v("--c-paper"), // warm white (text on dark)
        volt: "#CDFB47",
        voltdark: "#A8D92E",
        mint: "#8CF0B3",
        gold: "#FFC24B",
        lilac: "#C9B8FF",
        sky: "#9FD8FF",
        /* ---- legacy fixed (dark showcase pieces) ---- */
        ink: "#070C0A",
        pine: "#0C1512",
        moss: "#14231B",
        fern: "#1E3527",
        cream: "#F4F0E6",
        sand: "#E7DFCE",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        serifit: ["var(--font-serif)", "Georgia", "serif"],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        float2: {
          "0%, 100%": { transform: "translateY(0px) rotate(-2deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-40px) scale(1.1)" },
          "66%": { transform: "translate(-25px,25px) scale(0.95)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "marquee-fast": "marquee 18s linear infinite",
        "marquee-slow": "marquee 44s linear infinite",
        "marquee-rev": "marquee-rev 36s linear infinite",
        float: "float 5s ease-in-out infinite",
        float2: "float2 6s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        shimmer: "shimmer 2.6s linear infinite",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
        blob: "blob 14s ease-in-out infinite",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(205, 251, 71, 0.45)",
        card: "0 24px 60px -24px rgba(0,0,0,0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
