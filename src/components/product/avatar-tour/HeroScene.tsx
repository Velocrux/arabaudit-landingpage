/**
 * Hero inline scene — small SVG vignette showing the journey concept:
 * a sheikh on a sand road with the sun, distant mountains, palms,
 * and a glowing first checkpoint. Pure SVG, no client JS.
 */
export default function HeroScene() {
  return (
    <div className="avt-hero-scene" aria-hidden="true">
      <svg viewBox="0 0 980 320" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#073727" />
            <stop offset="60%" stopColor="#0d4a36" />
            <stop offset="100%" stopColor="#1f8060" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hs-sun-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff4cf" />
            <stop offset="70%" stopColor="#f9c065" />
            <stop offset="100%" stopColor="#e88d4a" />
          </radialGradient>
          <radialGradient id="hs-sun-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 220, 140, 0.55)" />
            <stop offset="100%" stopColor="rgba(255, 220, 140, 0)" />
          </radialGradient>
          <linearGradient id="hs-mtn-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a26a52" />
            <stop offset="100%" stopColor="#7a4a3a" />
          </linearGradient>
          <linearGradient id="hs-mtn-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c98a64" />
            <stop offset="100%" stopColor="#a4684a" />
          </linearGradient>
          <linearGradient id="hs-sand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbe8c0" />
            <stop offset="55%" stopColor="#f1cf90" />
            <stop offset="100%" stopColor="#d8b06a" />
          </linearGradient>
          <linearGradient id="hs-road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3528" />
            <stop offset="100%" stopColor="#1f1c16" />
          </linearGradient>
          <linearGradient id="hs-road-traveled" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e8b84b" />
            <stop offset="100%" stopColor="#c8a951" />
          </linearGradient>
          <radialGradient id="hs-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(232, 184, 75, 0.5)" />
            <stop offset="100%" stopColor="rgba(232, 184, 75, 0)" />
          </radialGradient>
        </defs>

        {/* upper sky / dome of hero color */}
        <rect width="980" height="200" fill="url(#hs-sky)" />

        {/* sun + halo */}
        <g transform="translate(820 70)">
          <circle r="80" fill="url(#hs-sun-halo)" />
          <g>
            {Array.from({ length: 14 }).map((_, i) => {
              const angle = (i / 14) * 360;
              const len = i % 2 === 0 ? 44 : 32;
              return (
                <line
                  key={`ray-${i}`}
                  x1="0"
                  y1="0"
                  x2={Math.cos((angle * Math.PI) / 180) * len}
                  y2={Math.sin((angle * Math.PI) / 180) * len}
                  stroke="#f9c065"
                  strokeWidth={i % 2 === 0 ? "1.6" : "1"}
                  strokeLinecap="round"
                  opacity={i % 2 === 0 ? 0.6 : 0.35}
                />
              );
            })}
          </g>
          <circle r="26" fill="url(#hs-sun-core)" />
        </g>

        {/* distant mountains */}
        <path
          d="M 0 188 Q 80 150 160 168 Q 240 184 320 152 Q 400 128 480 158 Q 560 184 640 156 Q 720 132 800 162 Q 880 188 980 168 L 980 220 L 0 220 Z"
          fill="url(#hs-mtn-far)"
          opacity="0.72"
        />
        <path
          d="M 0 200 Q 100 178 200 188 Q 300 196 380 174 Q 460 156 540 186 Q 620 208 720 184 Q 820 162 900 188 L 980 200 L 980 230 L 0 230 Z"
          fill="url(#hs-mtn-mid)"
          opacity="0.82"
        />

        {/* sand foreground */}
        <path
          d="M 0 220 Q 240 196 490 210 Q 740 224 980 208 L 980 320 L 0 320 Z"
          fill="url(#hs-sand)"
        />

        {/* dunes */}
        <path
          d="M 0 240 Q 90 220 180 244 Q 240 256 280 246 L 280 320 L 0 320 Z"
          fill="#e09a6c"
          opacity="0.45"
        />
        <path
          d="M 720 252 Q 820 232 920 254 L 980 258 L 980 320 L 720 320 Z"
          fill="#e09a6c"
          opacity="0.45"
        />

        {/* the road — receding from foreground (centered) to the first station */}
        <path
          d="M 100 320 Q 420 280 560 200"
          stroke="url(#hs-road)"
          strokeWidth="46"
          strokeLinecap="round"
          fill="none"
          opacity="0.95"
        />
        <path
          d="M 100 320 Q 420 280 560 200"
          stroke="#bca87a"
          strokeWidth="58"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />
        {/* dashed centerline */}
        <path
          d="M 100 320 Q 420 280 560 200"
          stroke="#f0e9c0"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="14 16"
          fill="none"
          opacity="0.85"
        />
        {/* traveled overlay (gold) */}
        <path
          d="M 100 320 Q 280 304 360 286"
          stroke="url(#hs-road-traveled)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />

        {/* foreground palm — left */}
        <g transform="translate(72 296)">
          <path d="M -3 0 Q -2 -36 -2 -78" stroke="#5a3a14" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M -2 -78 Q -28 -86 -42 -72" stroke="#3a6224" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M -2 -78 Q 24 -86 38 -72" stroke="#5a8a3a" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M -2 -78 Q -22 -106 -14 -118" stroke="#3a6224" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M -2 -78 Q 18 -106 10 -118" stroke="#86b056" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M -2 -78 Q -4 -100 -2 -112" stroke="#86b056" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="-6" cy="-74" r="2.6" fill="#3a2410" />
          <circle cx="2" cy="-72" r="2.6" fill="#3a2410" />
        </g>

        {/* small palm — right */}
        <g transform="translate(900 304)">
          <path d="M -3 0 Q -2 -28 -2 -60" stroke="#5a3a14" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M -2 -60 Q -22 -68 -32 -56" stroke="#3a6224" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M -2 -60 Q 20 -68 30 -56" stroke="#5a8a3a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M -2 -60 Q -16 -82 -10 -94" stroke="#3a6224" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M -2 -60 Q 14 -82 8 -94" stroke="#86b056" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>

        {/* first checkpoint card (preview of the journey ahead) */}
        <g transform="translate(560 200)">
          <circle r="40" fill="url(#hs-glow)" />
          <circle r="14" fill="#fefcf5" stroke="#e8b84b" strokeWidth="3" />
          <text
            x="0"
            y="1"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fontWeight="700"
            fontFamily="ui-monospace, SFMono-Regular, monospace"
            fill="#0a1f17"
          >
            1
          </text>
          {/* tiny card silhouette beside checkpoint */}
          <g transform="translate(28 -28)">
            <rect width="120" height="68" rx="8" fill="#fefcf5" stroke="rgba(232,184,75,0.6)" />
            <rect x="10" y="10" width="44" height="6" rx="2" fill="#0d4a36" />
            <rect x="10" y="22" width="80" height="3" rx="1.5" fill="rgba(10,31,23,0.35)" />
            <rect x="10" y="30" width="68" height="3" rx="1.5" fill="rgba(10,31,23,0.25)" />
            <rect x="10" y="38" width="74" height="3" rx="1.5" fill="rgba(10,31,23,0.25)" />
            <rect x="10" y="52" width="28" height="8" rx="3" fill="#e8b84b" />
          </g>
        </g>

        {/* tiny sheikh silhouette walking the foreground road */}
        <g transform="translate(296 286) scale(0.5)">
          <ellipse cx="0" cy="36" rx="22" ry="3" fill="rgba(0,0,0,0.35)" />
          <path d="M -22 30 L -16 -36 Q -8 -50 8 -50 Q 16 -50 22 -36 L 30 30 Z" fill="#ffffff" stroke="#a59a7a" strokeWidth="1.2" />
          <ellipse cx="6" cy="-58" rx="14" ry="16" fill="#d2a07a" />
          <path d="M -8 -76 Q 0 -90 14 -76 Q 24 -54 14 -36 L -10 -36 Q -22 -56 -8 -76 Z" fill="#fefcf5" stroke="#a59a7a" strokeWidth="1.2" />
          <ellipse cx="6" cy="-78" rx="16" ry="3" fill="#0a0a0a" />
          {/* small sash hint */}
          <line x1="-16" y1="-30" x2="22" y2="14" stroke="#5a3520" strokeWidth="3" />
          <circle cx="-4" cy="-12" r="2.4" fill="#e8b84b" />
          <circle cx="4" cy="-2" r="2.4" fill="#e8b84b" />
          <circle cx="12" cy="8" r="2.4" fill="#e8b84b" />
        </g>

        {/* tiny shimmer dots above the sand on the right */}
        <g opacity="0.6">
          <circle cx="720" cy="218" r="1.8" fill="#fff" />
          <circle cx="750" cy="222" r="1.4" fill="#fff" />
          <circle cx="780" cy="216" r="1.2" fill="#fff" />
        </g>
      </svg>
    </div>
  );
}
