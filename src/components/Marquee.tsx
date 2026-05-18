"use client";

import { useTranslations } from "next-intl";
import { buildFrameworks, buildMarqueeExtras } from "@/lib/data";

export default function Marquee() {
  const t = useTranslations("fwData");
  const frameworks = buildFrameworks(t);
  const marqueeExtras = buildMarqueeExtras(t);
  const labels = [...frameworks.map((f) => f.shortCode), ...marqueeExtras];
  const row = labels.flatMap((label, i) => [
    <span key={`${i}-t`}>{label}</span>,
    <span key={`${i}-d`}>·</span>,
  ]);

  return (
    <div className="dark" style={{ position: "relative" }}>
      <div className="marquee-wrap">
        <div className="marquee" aria-hidden>
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}
