"use client";

import { useTranslations } from "next-intl";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  PauseIcon,
  PlayIcon,
  Cancel01Icon,
  Refresh01Icon,
} from "hugeicons-react";

interface Props {
  total: number;
  activeIndex: number;
  isPaused: boolean;
  isFinished: boolean;
  isRtl: boolean;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSkip: () => void;
  onRestart: () => void;
}

export default function TourControls({
  total,
  activeIndex,
  isPaused,
  isFinished,
  isRtl,
  onPlay,
  onPause,
  onResume,
  onPrev,
  onNext,
  onSkip,
  onRestart,
}: Props) {
  const t = useTranslations("product.tour.controls");
  const tTour = useTranslations("product.tour");

  if (isFinished) return null;

  const PrevIcon = isRtl ? ArrowRight01Icon : ArrowLeft01Icon;
  const NextIcon = isRtl ? ArrowLeft01Icon : ArrowRight01Icon;

  return (
    <div className="avt-controls" role="group" aria-label={tTour("controlsAria")}>
      <div className="avt-progress" aria-live="polite">
        <span className="avt-progress-label">
          {tTour("featureLabel", { n: activeIndex + 1, total })}
        </span>
        <div className="avt-progress-bar" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`avt-progress-dot${i <= activeIndex ? " active" : ""}${
                i === activeIndex ? " current" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className="avt-controls-buttons">
        <button
          type="button"
          className="avt-ctrl"
          onClick={onPrev}
          aria-label={t("prev")}
          disabled={activeIndex === 0}
        >
          <PrevIcon size={18} />
        </button>

        {isPaused ? (
          <button
            type="button"
            className="avt-ctrl avt-ctrl-primary"
            onClick={onResume}
            aria-label={t("play")}
          >
            <PlayIcon size={18} />
          </button>
        ) : (
          <button
            type="button"
            className="avt-ctrl avt-ctrl-primary"
            onClick={onPause}
            aria-label={t("pause")}
          >
            <PauseIcon size={18} />
          </button>
        )}

        <button
          type="button"
          className="avt-ctrl"
          onClick={onNext}
          aria-label={t("next")}
        >
          <NextIcon size={18} />
        </button>

        <button
          type="button"
          className="avt-ctrl avt-ctrl-ghost"
          onClick={onRestart}
          aria-label={t("replay")}
          title={t("replay")}
        >
          <Refresh01Icon size={16} />
        </button>

        <button
          type="button"
          className="avt-ctrl avt-ctrl-ghost"
          onClick={onSkip}
          aria-label={t("skip")}
          title={t("skip")}
        >
          <Cancel01Icon size={16} />
        </button>
      </div>
    </div>
  );
}
