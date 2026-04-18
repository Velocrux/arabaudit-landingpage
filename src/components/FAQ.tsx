"use client";

import { useState, type ReactNode } from "react";

export interface FAQEntry {
  q: string;
  a: ReactNode;
}

export function FAQList({
  items,
  firstOpen = false,
}: {
  items: FAQEntry[];
  firstOpen?: boolean;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(firstOpen ? 0 : null);

  return (
    <div>
      {items.map((item, i) => (
        <div
          key={i}
          className={`faq-item${openIdx === i ? " open" : ""}`}
        >
          <button
            type="button"
            className="faq-q"
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
          >
            {item.q}
            <span className="plus" />
          </button>
          <div className="faq-a">{item.a}</div>
        </div>
      ))}
    </div>
  );
}
