"use client";

import dynamic from "next/dynamic";

const AvatarTour = dynamic(() => import("./AvatarTour"), {
  ssr: false,
  loading: () => (
    <section className="avt-stage avt-stage-loading" aria-hidden="true">
      <div className="avt-stage-inner">
        <div className="avt-narrator">
          <div className="avt-skeleton-bubble" />
          <div className="avt-skeleton-avatar" />
        </div>
        <div className="avt-theater">
          <div className="avt-skeleton-theater" />
        </div>
      </div>
    </section>
  ),
});

export default function AvatarTourLoader() {
  return <AvatarTour />;
}
