
"use client";

import type { VisualKey } from "@/data/suiteProducts";

import WmsVisual from "./WmsVisual";
import SfaVisual from "./SfaVisual";
import OmsVisual from "./OmsVisual";
import PimVisual from "./PimVisual";
import InventoryVisual from "./InventoryVisual";
import TargetVisual from "./TargetVisual";
import SchemeVisual from "./SchemeVisual";
import PricingVisual from "./PricingVisual";
import IncentiveVisual from "./IncentiveVisual";

const visuals = {
  wms: WmsVisual,
  sfa: SfaVisual,
  oms: OmsVisual,
  pim: PimVisual,
  inventory: InventoryVisual,
  target: TargetVisual,
  scheme: SchemeVisual,
  pricing: PricingVisual,
  incentive: IncentiveVisual,
};

export default function ProductVisual({
  name,
}: {
  name: VisualKey;
}) {
  const Visual = visuals[name];
  return <Visual />;
}
