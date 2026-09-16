import type { Metadata } from "next";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BackToTop, CursorGlow, ScrollProgress } from "@/components/Extras";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: "BudgeTree — Intelligent Rewards, Loyalty & Payout Automation",
    template: "%s · BudgeTree",
  },
  description:
    "One platform for campaigns, incentives, UPI rewards, payouts and ROI. Trusted by 250+ enterprises.",
  icons: { icon: "/images/budgetree-logo.png" },
};

const themeInit = `(function(){try{var t=localStorage.getItem('bt-theme');if(t==='light'||(!t&&window.matchMedia('(prefers-color-scheme: light)').matches)){document.documentElement.classList.add('light')}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body
        className={`${inter.variable} ${grotesk.variable} ${instrumentSerif.variable}`}
      >
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
