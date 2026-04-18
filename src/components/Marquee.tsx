"use client";

import { frameworks, marqueeExtras } from "@/lib/data";

export default function Marquee() {
  const labels = [...frameworks.map((f) => f.shortCode), ...marqueeExtras];
  const row = labels.flatMap((t, i) => [
    <span key={`${i}-t`}>{t}</span>,
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
