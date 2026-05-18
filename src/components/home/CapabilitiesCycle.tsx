"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const NODE_POSITIONS = [
  { top: "8%",  left: "50%", phase: "01 · Preparation", feature: true },   // p0 – top
  { top: "27%", left: "92%", phase: "02 · Preparation", feature: false },  // p1 – top-right
  { top: "73%", left: "92%", phase: "03 · Execution",   feature: false },  // p2 – bottom-right
  { top: "92%", left: "50%", phase: "04 · Execution",   feature: true },   // p3 – bottom
  { top: "73%", left: "8%",  phase: "05 · Findings",    feature: false },  // p4 – bottom-left
  { top: "27%", left: "8%",  phase: "06 · Reporting",   feature: true },   // p5 – top-left
];

export default function CapabilitiesCycle() {
  const t = useTranslations("home.capabilities");

  const nodes = [
    { title: t("c1Title"), desc: t("c1Desc"), phase: t("c1Num") },
    { title: t("c2Title"), desc: t("c2Desc"), phase: t("c2Num") },
    { title: t("c3Title"), desc: t("c3Desc"), phase: t("c3Num") },
    { title: t("c4Title"), desc: t("c4Desc"), phase: t("c4Num") },
    { title: t("c5Title"), desc: t("c5Desc"), phase: t("c5Num") },
    { title: t("c6Title"), desc: t("c6Desc"), phase: t("c6Num") },
  ];

  const legend = [
    { n: "01", x: t("c1Title") },
    { n: "02", x: t("c2Title") },
    { n: "03", x: t("c3Title") },
    { n: "04", x: t("c4Title") },
    { n: "05", x: t("c5Title") },
    { n: "06", x: t("c6Title") },
  ];

  return (
    <section className="section">
      <div className="wrap">
        <div className="cap-cycle-wrap">
          {/* LEFT: heading + legend */}
          <div className="cap-lede">
            <div className="eyebrow">{t("eyebrow")}</div>
            <h2 className="h1" style={{ marginTop: 16, letterSpacing: "-0.025em" }}>
              {t.rich("titleRich", {
                em: (chunks) => (
                  <span style={{ color: "var(--gold-3)", fontStyle: "italic" }}>{chunks}</span>
                ),
              })}
            </h2>
            <p className="body" style={{ marginTop: 20 }}>
              {t("lede")}
            </p>

            <div className="cap-legend">
              {legend.map((li) => (
                <div key={li.n} className="cap-legend-li">
                  <span className="cap-legend-n">{li.n}</span>
                  <span className="cap-legend-x">{li.x}</span>
                </div>
              ))}
            </div>

            <Link
              href="/product"
              className="btn-link"
              style={{ marginTop: 28, display: "inline-block" }}
            >
              {t("readMore")}
            </Link>
          </div>

          {/* RIGHT: cycle diagram */}
          <div className="cap-cycle">
            {/* SVG orbits + arcs */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
            >
              <defs>
                <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#1f8060" stopOpacity=".8" />
                  <stop offset="50%" stopColor="#2f9a7a" stopOpacity=".9" />
                  <stop offset="100%" stopColor="#e8b84b" stopOpacity=".8" />
                </linearGradient>
                <marker
                  id="arcHead"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="4"
                  markerHeight="4"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 Z" fill="#e8b84b" />
                </marker>
              </defs>

              {/* main orbit ring (dashed) */}
              <circle
                cx="50" cy="50" r="34"
                fill="none"
                stroke="url(#arcGrad)"
                strokeWidth=".4"
                strokeDasharray="1 1.5"
                opacity=".55"
              />

              {/* 6 curved arrows between nodes */}
              <g
                fill="none"
                stroke="url(#arcGrad)"
                strokeWidth=".8"
                strokeLinecap="round"
                markerEnd="url(#arcHead)"
              >
                <path d="M 52 16.5 A 34 34 0 0 1 77.4 33.5" />
                <path d="M 79.4 35 A 34 34 0 0 1 79.4 65" />
                <path d="M 77.4 66.5 A 34 34 0 0 1 52 83.5" />
                <path d="M 48 83.5 A 34 34 0 0 1 22.6 66.5" />
                <path d="M 20.6 65 A 34 34 0 0 1 20.6 35" />
                <path d="M 22.6 33.5 A 34 34 0 0 1 48 16.5" />
              </g>

              {/* spokes from core to each node */}
              <g stroke="rgba(14,63,46,.08)" strokeWidth=".3" strokeDasharray=".6 .6">
                <line x1="50" y1="50" x2="50"   y2="16" />
                <line x1="50" y1="50" x2="79.4" y2="33" />
                <line x1="50" y1="50" x2="79.4" y2="67" />
                <line x1="50" y1="50" x2="50"   y2="84" />
                <line x1="50" y1="50" x2="20.6" y2="67" />
                <line x1="50" y1="50" x2="20.6" y2="33" />
              </g>
            </svg>

            {/* Center core */}
            <div className="cap-core">
              <div className="cap-core-label">{t("coreLabel")}</div>
              <div className="cap-core-title">
                One <em>{t("coreTitle").replace("One ", "")}</em>
              </div>
              <div className="cap-core-sub">{t("coreSub")}</div>
            </div>

            {/* 6 Nodes */}
            {nodes.map((node, i) => (
              <div
                key={i}
                className={`cap-node${NODE_POSITIONS[i].feature ? " feature" : ""}`}
                style={{ top: NODE_POSITIONS[i].top, left: NODE_POSITIONS[i].left }}
              >
                <div className="cap-node-ix">
                  <span className="cap-node-dot" />
                  {node.phase}
                </div>
                <div className="cap-node-t">{node.title}</div>
                <div className="cap-node-d">{node.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cap-cycle-wrap {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 72px;
          align-items: center;
        }

        /* ---------- cycle diagram ---------- */
        .cap-cycle {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-width: 720px;
          margin: 0 auto;
        }

        /* ---------- center core ---------- */
        .cap-core {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 32%;
          aspect-ratio: 1/1;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #1a6b4f 0%, #0e3f2e 55%, #061a13 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--cream-1);
          box-shadow:
            0 0 0 1px rgba(232,184,75,.3) inset,
            0 0 0 8px rgba(232,184,75,.06),
            0 0 0 18px rgba(232,184,75,.03),
            0 30px 80px -20px rgba(0,0,0,.4);
          z-index: 5;
          padding: 6% 4%;
          text-align: center;
        }
        .cap-core::before {
          content: '';
          position: absolute;
          inset: 8%;
          border-radius: 50%;
          border: 1px dashed rgba(232,184,75,.4);
          animation: capSpin 40s linear infinite;
        }
        .cap-core::after {
          content: '';
          position: absolute;
          inset: -14%;
          border-radius: 50%;
          border: 1px solid rgba(232,184,75,.12);
          animation: capSpin 80s linear infinite reverse;
        }
        @keyframes capSpin { to { transform: rotate(360deg); } }

        .cap-core-label {
          font-family: var(--f-mono);
          font-size: clamp(8px, 1vw, 11px);
          letter-spacing: .18em;
          color: var(--gold-3);
          text-transform: uppercase;
        }
        .cap-core-title {
          font-family: var(--f-serif);
          font-size: clamp(18px, 2.4vw, 32px);
          font-weight: 400;
          letter-spacing: -0.02em;
          margin-top: 8px;
          line-height: 1;
          white-space: nowrap;
        }
        .cap-core-title em {
          color: var(--gold-3);
          font-style: italic;
        }
        .cap-core-sub {
          font-family: var(--f-mono);
          font-size: clamp(7px, .85vw, 10px);
          color: rgba(247,243,234,.55);
          letter-spacing: .14em;
          text-transform: uppercase;
          margin-top: 10px;
        }

        /* ---------- nodes ---------- */
        .cap-node {
          position: absolute;
          width: 30%;
          transform: translate(-50%, -50%);
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 14px 16px;
          box-shadow:
            0 10px 32px -12px rgba(14,63,46,.18),
            0 2px 0 rgba(232,184,75,.15) inset;
          z-index: 3;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .cap-node:hover {
          transform: translate(-50%, -50%) scale(1.04);
          box-shadow: 0 20px 40px -10px rgba(14,63,46,.25);
          z-index: 6;
        }
        .cap-node.feature {
          background: linear-gradient(180deg, #fff 0%, var(--cream-1) 100%);
          border-color: rgba(232,184,75,.35);
        }

        .cap-node-ix {
          font-family: var(--f-mono);
          font-size: 10px;
          letter-spacing: .14em;
          color: var(--gold-1);
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cap-node-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold-3);
          flex-shrink: 0;
        }
        .cap-node-t {
          font-family: var(--f-serif);
          font-size: 17px;
          font-weight: 500;
          color: var(--emerald-3);
          letter-spacing: -0.01em;
          margin-top: 6px;
          line-height: 1.15;
        }
        .cap-node.feature .cap-node-t {
          color: var(--emerald-2);
        }
        .cap-node-d {
          font-size: 12px;
          color: var(--ink-3);
          margin-top: 6px;
          line-height: 1.45;
        }

        /* ---------- lede side ---------- */
        .cap-legend {
          margin-top: 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px 20px;
        }
        .cap-legend-li {
          display: flex;
          gap: 10px;
          align-items: baseline;
          padding: 10px 0;
          border-top: 1px solid var(--line);
        }
        .cap-legend-n {
          font-family: var(--f-mono);
          font-size: 11px;
          color: var(--gold-1);
          letter-spacing: .08em;
          flex-shrink: 0;
        }
        .cap-legend-x {
          font-family: var(--f-serif);
          font-size: 14px;
          color: var(--emerald-3);
          font-weight: 500;
        }

        /* ---------- responsive ---------- */
        @media (max-width: 1024px) {
          .cap-cycle-wrap { grid-template-columns: 1fr; gap: 48px; }
          .cap-cycle { max-width: 520px; }
          .cap-node { padding: 10px 12px; }
          .cap-node-t { font-size: 14px; }
          .cap-node-d { display: none; }
        }
        @media (max-width: 600px) {
          .cap-cycle { max-width: 360px; }
          .cap-node { padding: 7px 9px; border-radius: 10px; }
          .cap-node-ix { font-size: 8px; }
          .cap-node-t { font-size: 11px; margin-top: 3px; }
          .cap-legend { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
