"use client";

import { useTranslations } from "next-intl";
import { FEATURE_META } from "./featureMeta";

interface Props {
  activeIndex: number;
  visible: boolean;
  onSelect: (idx: number) => void;
}

export default function ChapterRail({ activeIndex, visible, onSelect }: Props) {
  const t = useTranslations();
  const tTour = useTranslations("product.tour");
  return (
    <nav
      className={`avt-chapter-rail${visible ? " is-visible" : ""}`}
      aria-label={tTour("chapterAria")}
    >
      <ul>
        {FEATURE_META.map((f, idx) => {
          const isActive = idx === activeIndex;
          const isTraveled = idx < activeIndex;
          const label = t(`product.${f.id}.title1` as never) as string;
          return (
            <li key={f.id}>
              <button
                type="button"
                className={`avt-chapter-dot${isActive ? " is-active" : ""}${
                  isTraveled ? " is-traveled" : ""
                }`}
                onClick={() => onSelect(idx)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${idx + 1}. ${label}`}
                title={`${idx + 1}. ${label}`}
              >
                <span className="avt-chapter-num">{idx + 1}</span>
                <span className="avt-chapter-label">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
