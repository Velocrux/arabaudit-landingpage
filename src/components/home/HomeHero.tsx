"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HomeHero() {
  const t = useTranslations("home.hero");
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const root = titleRef.current;
    if (!root) return;
    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-text]")
    );
    targets.forEach((el) => {
      el.dataset.full = el.dataset.text || el.textContent || "";
      el.textContent = "";
    });

    const caret = document.createElement("span");
    caret.className = "caret";

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      targets.forEach((el) => {
        el.textContent = el.dataset.full || "";
      });
      return;
    }

    const BASE = 145;
    const JITTER = 50;
    const PAUSE_BETWEEN = 620;
    const PUNCT_PAUSE = 280;

    let idx = 0;
    let cancelled = false;

    function typeNext() {
      if (cancelled) return;
      if (idx >= targets.length) {
        setTimeout(() => {
          caret.style.transition = "opacity .6s ease";
          caret.style.opacity = "0";
          setTimeout(() => caret.remove(), 700);
        }, 900);
        return;
      }
      const el = targets[idx];
      const full = el.dataset.full || "";
      el.after(caret);
      const next = targets[idx + 1];
      const sameLine =
        next && next.closest(".line") === el.closest(".line");
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        const ch = full.charAt(i);
        el.textContent = full.slice(0, ++i);
        if (i < full.length) {
          const warm = i < 4 ? 80 : 0;
          const punct = /[.,!?:؟،]/.test(ch) ? PUNCT_PAUSE : 0;
          const delay =
            BASE + warm + punct + (Math.random() * JITTER - JITTER / 2);
          setTimeout(tick, delay);
        } else {
          idx++;
          const gap =
            idx === targets.length ? 0 : sameLine ? BASE : PAUSE_BETWEEN;
          setTimeout(typeNext, gap);
        }
      };
      tick();
    }
    const startT = setTimeout(typeNext, 500);
    return () => {
      cancelled = true;
      clearTimeout(startT);
      caret.remove();
    };
  }, []);

  return (
    <section className="hero2" style={{ backgroundColor: "rgb(6, 62, 44)" }}>
      <svg className="arabesque" viewBox="0 0 400 400" fill="none" aria-hidden>
        <g stroke="currentColor" strokeWidth=".6" fill="none">
          <circle cx="200" cy="200" r="198" />
          <circle cx="200" cy="200" r="160" />
          <circle cx="200" cy="200" r="120" />
          <circle cx="200" cy="200" r="80" />
          <g transform="translate(200 200)">
            <polygon points="0,-170 40,-40 170,0 40,40 0,170 -40,40 -170,0 -40,-40" />
            <polygon
              points="0,-170 40,-40 170,0 40,40 0,170 -40,40 -170,0 -40,-40"
              transform="rotate(22.5)"
            />
            <polygon points="0,-120 28,-28 120,0 28,28 0,120 -28,28 -120,0 -28,-28" />
            <polygon
              points="0,-120 28,-28 120,0 28,28 0,120 -28,28 -120,0 -28,-28"
              transform="rotate(22.5)"
            />
          </g>
          <g transform="translate(200 200)" opacity=".65">
            <line x1="0" y1="-198" x2="0" y2="198" />
            <line x1="-198" y1="0" x2="198" y2="0" />
            <line x1="-140" y1="-140" x2="140" y2="140" />
            <line x1="-140" y1="140" x2="140" y2="-140" />
          </g>
        </g>
      </svg>
      <div className="grain" />

      <div className="hero2-grid">
        <div className="hero2-lede">
          <div className="hero2-eyebrow">
            <span className="pulse" />
            <span>{t("pill")}</span>
          </div>

          <h1 className="hero2-title" ref={titleRef}>
            <span className="line">
              <span data-text={t("line1")}>{t("line1")}</span>
            </span>
            <span className="line">
              <span data-text={t("line2a")}>{t("line2a")}</span>
              <span className="em" data-text={t("line2b")}>{t("line2b")}</span>
            </span>
            <span className="ar" data-text={t("arabicSub")}>{t("arabicSub")}</span>
          </h1>

          <p>
            {t("lede1")}
            <b>{t("ledeBold")}</b>
            {t("lede2")}
          </p>

          <div className="hero2-cta">
            <a href="#frameworks" className="primary">
              <span>{t("ctaFramework")}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 7 H12 M8 3 L12 7 L8 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <Link href="/contact" className="ghost">
              {t("ctaWorkingSession")}
            </Link>
          </div>

          <div className="hero2-meta">
            <div className="m">
              <div className="n">
                <span className="em">8</span>
              </div>
              <div className="l">{t("meta1")}</div>
            </div>
            <div className="m">
              <div className="n">1,847</div>
              <div className="l">{t("meta2")}</div>
            </div>
            <div className="m">
              <div className="n">{t("meta3Value")}</div>
              <div className="l">{t("meta3")}</div>
            </div>
            <div className="m">
              <div className="n">100%</div>
              <div className="l">{t("meta4")}</div>
            </div>
          </div>
        </div>

        <div className="hero2-proof">
          <div className="annot annot-a">
            <div className="tag">{t("annotATag")}</div>
            <div className="t">{t("annotA")}</div>
          </div>

          <div className="proof-card">
            <div className="proof-head">
              <div className="lbl">{t("proofSession")}</div>
              <div className="live">{t("proofLive")}</div>
            </div>
            <div className="proof-body">
              <div className="proof-row-top">
                <div>
                  <div className="sub">{t("proofSub")}</div>
                  <h4>{t("proofTitle")}</h4>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 10,
                      color: "rgba(247,243,234,.4)",
                      letterSpacing: ".1em",
                    }}
                  >
                    {t("proofSurvey")}
                  </div>
                </div>
              </div>

              <div className="proof-score">
                <div className="big">
                  74<span className="p">%</span>
                </div>
                <div className="delta">{t("proofDelta")}</div>
              </div>

              <div className="proof-domains">
                <div className="pdom">
                  <div className="name">{t("proofD1")}</div>
                  <div className="bar">
                    <i style={{ width: "94%" }} />
                  </div>
                  <div className="val">94</div>
                </div>
                <div className="pdom">
                  <div className="name">{t("proofD2")}</div>
                  <div className="bar">
                    <i style={{ width: "86%" }} />
                  </div>
                  <div className="val">86</div>
                </div>
                <div className="pdom warn">
                  <div className="name">{t("proofD3")}</div>
                  <div className="bar">
                    <i style={{ width: "68%" }} />
                  </div>
                  <div className="val">68</div>
                </div>
                <div className="pdom low">
                  <div className="name">{t("proofD4")}</div>
                  <div className="bar">
                    <i style={{ width: "52%" }} />
                  </div>
                  <div className="val">52</div>
                </div>
                <div className="pdom crit">
                  <div className="name">{t("proofD5")}</div>
                  <div className="bar">
                    <i style={{ width: "28%" }} />
                  </div>
                  <div className="val">28</div>
                </div>
              </div>

              <div className="proof-foot">
                <span>{t("proofFoot")}</span>
                <span className="hash">a3c2·f81d·5b90·22ee</span>
              </div>
            </div>
          </div>

          <div className="annot annot-b">
            <div className="tag">{t("annotBTag")}</div>
            <div className="t">{t("annotB")}</div>
          </div>
        </div>
      </div>

      <div className="hero2-strip">
        <div className="hero2-demos">
          <div className="label">
            {t("demoLabelA")}
            <b>{t("demoLabelB")}</b>
          </div>
          <Link className="tile" href="/demo-framework">
            <div className="n">01</div>
            <div style={{ flex: 1 }}>
              <div className="t">{t("demo1Title")}</div>
              <div className="s">{t("demo1Sub")}</div>
            </div>
            <div className="arrow">→</div>
          </Link>
          <Link className="tile" href="/demo-audit">
            <div className="n">02</div>
            <div style={{ flex: 1 }}>
              <div className="t">{t("demo2Title")}</div>
              <div className="s">{t("demo2Sub")}</div>
            </div>
            <div className="arrow">→</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
