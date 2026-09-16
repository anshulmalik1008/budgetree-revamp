"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import LiveTicker from "@/components/LiveTicker";
import { LogoMarquee, Strip } from "@/components/Marquee";
import WhyUs from "@/components/WhyUs";
import LaunchSteps from "@/components/LaunchSteps";
import ProductStack from "@/components/ProductStack";
import DragRail from "@/components/DragRail";
import Calculator from "@/components/Calculator";
import Testimonials from "@/components/Testimonials";
import Integrations from "@/components/Integrations";
import SiriPay from "@/components/SiriPay";
import Faq from "@/components/Faq";
import CtaFooter from "@/components/CtaFooter";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onDone={done} />}
      </AnimatePresence>

      {!loading && (
        <main>
          <Hero />
          <LiveTicker />
          <LogoMarquee />
          <Strip
            dark
            items={[
              "Rewards",
              "Loyalty",
              "UPI Cash",
              "Payouts",
              "Bill Pay",
              "Gifting",
            ]}
          />
          <WhyUs />
          <LaunchSteps />
          <ProductStack />
          <DragRail />
          <Strip
            outline
            items={[
              "Go live in 24h",
              "10M+ rewards",
              "99.99% uptime",
              "175+ countries",
            ]}
          />
          <Calculator />
          <Testimonials />
          <Integrations />
          <SiriPay />
          <Faq />
          <CtaFooter />
        </main>
      )}
    </>
  );
}
