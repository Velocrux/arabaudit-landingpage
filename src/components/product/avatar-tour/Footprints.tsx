"use client";

interface Geometry {
  sheikhX: number;
  sheikhY: number;
}

interface Props {
  geometries: Geometry[];
  activeIndex: number;
  totalHeight: number;
}

/**
 * Renders subtle footprint dots along the sheikh's traveled path.
 * Each pair of footprints sits between consecutive station points
 * along the journey-road curve, fading in for traveled segments.
 */
export default function Footprints({ geometries, activeIndex, totalHeight }: Props) {
  if (geometries.length < 2 || totalHeight === 0) return null;

  // For each segment up to activeIndex, distribute footprints along a
  // cubic-ish curve consistent with JourneyRoad.
  const segments: Array<{
    x: number;
    y: number;
    angle: number;
    side: "L" | "R";
    segmentIdx: number;
  }> = [];

  for (let i = 0; i < geometries.length - 1; i += 1) {
    const a = geometries[i];
    const b = geometries[i + 1];
    if (!a || !b) continue;
    const steps = 6;
    for (let s = 1; s < steps; s += 1) {
      const t = s / steps;
      const midY = (a.sheikhY + b.sheikhY) / 2;
      // cubic Bezier matching JourneyRoad buildPath
      // C ax,midY  bx,midY  bx,by   from a → b
      const u = 1 - t;
      const x =
        u * u * u * a.sheikhX +
        3 * u * u * t * a.sheikhX +
        3 * u * t * t * b.sheikhX +
        t * t * t * b.sheikhX;
      const y =
        u * u * u * a.sheikhY +
        3 * u * u * t * midY +
        3 * u * t * t * midY +
        t * t * t * b.sheikhY;
      // derivative for angle
      const dx =
        3 * u * u * (a.sheikhX - a.sheikhX) +
        6 * u * t * (b.sheikhX - a.sheikhX) +
        3 * t * t * (b.sheikhX - b.sheikhX);
      const dy =
        3 * u * u * (midY - a.sheikhY) +
        6 * u * t * (midY - midY) +
        3 * t * t * (b.sheikhY - midY);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const side: "L" | "R" = s % 2 === 0 ? "L" : "R";
      segments.push({ x, y, angle, side, segmentIdx: i });
    }
  }

  return (
    <svg
      className="avt-footprints"
      width="100%"
      height={totalHeight}
      style={{ height: totalHeight }}
      aria-hidden="true"
    >
      {segments.map((p, i) => {
        const traveled = p.segmentIdx < activeIndex;
        const opacity = traveled ? 0.55 : 0;
        const offsetPerp = p.side === "L" ? -12 : 12;
        // offset perpendicular to direction
        const rad = (p.angle * Math.PI) / 180;
        const ox = -Math.sin(rad) * offsetPerp;
        const oy = Math.cos(rad) * offsetPerp;
        return (
          <g
            key={`fp-${i}`}
            transform={`translate(${p.x + ox} ${p.y + oy}) rotate(${p.angle + 90})`}
            style={{
              opacity,
              transition: "opacity 600ms ease",
              transitionDelay: `${(i % 5) * 60}ms`,
            }}
          >
            <ellipse cx="0" cy="0" rx="3" ry="5" fill="#5a3a1c" opacity="0.85" />
            <ellipse cx="0" cy="-6" rx="1.3" ry="1.8" fill="#5a3a1c" opacity="0.7" />
            <ellipse cx="-2" cy="-5" rx="0.9" ry="1.4" fill="#5a3a1c" opacity="0.6" />
            <ellipse cx="2" cy="-5" rx="0.9" ry="1.4" fill="#5a3a1c" opacity="0.6" />
          </g>
        );
      })}
    </svg>
  );
}
