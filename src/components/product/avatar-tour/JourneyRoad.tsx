"use client";

interface Geometry {
  cardX: number;
  cardY: number;
  cardWidth: number;
  cardHeight: number;
  sheikhX: number;
  sheikhY: number;
  side: "left" | "right";
}

interface Props {
  geometries: Geometry[];
  activeIndex: number;
  stationSides: Array<"left" | "right">;
}

export default function JourneyRoad({ geometries, activeIndex }: Props) {
  if (geometries.length === 0) return null;

  const points = geometries
    .map((g) =>
      g
        ? {
            x: g.sheikhX,
            y: g.sheikhY,
          }
        : null
    )
    .filter(Boolean) as Array<{ x: number; y: number }>;

  if (points.length === 0) return null;

  const buildPath = (pts: Array<{ x: number; y: number }>) => {
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i += 1) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const midY = (prev.y + curr.y) / 2;
      d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
    }
    return d;
  };

  const fullPath = buildPath(points);
  const traveledPath =
    activeIndex > 0 ? buildPath(points.slice(0, activeIndex + 1)) : "";

  const totalHeight =
    points.reduce((max, p) => (p.y > max ? p.y : max), 0) + 200;

  return (
    <svg
      className="avt-journey-road"
      width="100%"
      height={totalHeight}
      style={{ height: totalHeight }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="avt-road-shoulder" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bca87a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8e7a4f" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="avt-road-surface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3528" />
          <stop offset="50%" stopColor="#2c2820" />
          <stop offset="100%" stopColor="#1f1c16" />
        </linearGradient>
        <linearGradient id="avt-road-traveled" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8b84b" />
          <stop offset="100%" stopColor="#c8a951" />
        </linearGradient>
      </defs>

      {/* road shoulder (outer outline) */}
      <path
        d={fullPath}
        fill="none"
        stroke="url(#avt-road-shoulder)"
        strokeWidth="58"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />

      {/* road asphalt */}
      <path
        d={fullPath}
        fill="none"
        stroke="url(#avt-road-surface)"
        strokeWidth="46"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* dashed center line */}
      <path
        d={fullPath}
        fill="none"
        stroke="#f0e9c0"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="14 18"
        opacity="0.85"
      />

      {/* traveled (gold) overlay up to the active station */}
      {traveledPath && (
        <path
          d={traveledPath}
          fill="none"
          stroke="url(#avt-road-traveled)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.65"
        />
      )}

      {/* station markers */}
      {points.map((p, i) => {
        const isActive = i === activeIndex;
        const isTraveled = i < activeIndex;
        const fill = isActive ? "#e8b84b" : isTraveled ? "#1f8060" : "#0e3f2e";
        const textFill = "#0a1f17";
        return (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={isActive ? 22 : 18}
              fill="#fefcf5"
              stroke={fill}
              strokeWidth="3"
            />
            <text
              x={p.x}
              y={p.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fontWeight="700"
              fontFamily="var(--f-mono)"
              fill={textFill}
            >
              {i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
