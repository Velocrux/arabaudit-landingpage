"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  MagicWand01Icon,
  Refresh01Icon,
  ArrowUp01Icon,
  Clock04Icon,
  Tick02Icon,
} from "hugeicons-react";

export default function InsightsDemo() {
  const t = useTranslations("product.insights");

  const [velocity, setVelocity] = useState("+0%");
  const [audits, setAudits] = useState(0);
  const [months, setMonths] = useState("—");
  const [conf, setConf] = useState("—");
  const [narrative, setNarrative] = useState(t("placeholder"));
  const [recs, setRecs] = useState<{ visible: boolean }[]>([]);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervals = useRef<ReturnType<typeof setInterval>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      intervals.current.forEach(clearInterval);
    },
    []
  );

  const recData = [
    { p: 1, title: t("rec1_title"), desc: t("rec1_desc"), hours: 48, controls: 5 },
    { p: 2, title: t("rec2_title"), desc: t("rec2_desc"), hours: 6, controls: 2 },
    { p: 3, title: t("rec3_title"), desc: t("rec3_desc"), hours: 160, controls: 4 },
  ];

  const run = () => {
    timers.current.forEach(clearTimeout);
    intervals.current.forEach(clearInterval);
    timers.current = [];
    intervals.current = [];
    setRunning(true);
    setStarted(true);
    setVelocity("+0%");
    setAudits(0);
    setMonths("—");
    setConf("—");
    setNarrative("");
    setRecs([]);

    const vStart = Date.now();
    const vInterval = setInterval(() => {
      const p = Math.min((Date.now() - vStart) / 1200, 1);
      setVelocity("+" + (p * 2.3).toFixed(1) + "%");
      if (p >= 1) clearInterval(vInterval);
    }, 30);
    intervals.current.push(vInterval);

    timers.current.push(
      setTimeout(() => {
        const start = Date.now();
        const duration = 1500;
        const ai = setInterval(() => {
          const p = Math.min((Date.now() - start) / duration, 1);
          setAudits(Math.round(p * 47));
          if (p >= 1) clearInterval(ai);
        }, 30);
        intervals.current.push(ai);
      }, 200)
    );
    timers.current.push(setTimeout(() => setMonths("4.2"), 700));
    timers.current.push(setTimeout(() => setConf("89%"), 1000));

    const narrativeText = t("narrative");
    let i = 0;
    const narrInterval = setInterval(() => {
      i += 4;
      setNarrative(narrativeText.slice(0, i));
      if (i >= narrativeText.length) {
        setNarrative(narrativeText);
        clearInterval(narrInterval);
      }
    }, 18);
    intervals.current.push(narrInterval);

    recData.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => {
          setRecs((prev) => {
            const next = [...prev];
            next[i] = { visible: false };
            return next;
          });
          timers.current.push(
            setTimeout(() => {
              setRecs((prev) => {
                const next = [...prev];
                next[i] = { visible: true };
                return next;
              });
            }, 30)
          );
        }, 1500 + i * 400)
      );
    });

    timers.current.push(setTimeout(() => setRunning(false), 3500));
  };

  return (
    <>
      <div className="demo-info">
        <div className="demo-header" style={{ marginBottom: 0 }}>
          <div className="demo-num">{t("num")}</div>
          <h2>
            {t("title1")}
            <br />
            <em>{t("title2")}</em>
          </h2>
          <p>{t("lede")}</p>
        </div>
        <ul className="demo-feature-list">
          <li><span className="fli-dot"><Tick02Icon size={10} /></span>{t("f1")}</li>
          <li><span className="fli-dot"><Tick02Icon size={10} /></span>{t("f2")}</li>
          <li><span className="fli-dot"><Tick02Icon size={10} /></span>{t("f3")}</li>
          <li><span className="fli-dot"><Tick02Icon size={10} /></span>{t("f4")}</li>
        </ul>
        <div style={{ marginTop: 32 }}>
          <button className="btn-ai" onClick={run} disabled={running}>
            {running ? (
              <>
                <span className="ai-pulse" style={{ display: "inline-flex" }}>
                  <MagicWand01Icon size={16} />
                </span>{" "}
                {t("analyzingBtn")}
              </>
            ) : started ? (
              <>
                <Refresh01Icon size={16} /> {t("regenBtn")}
              </>
            ) : (
              <>
                <span className="ai-pulse" style={{ display: "inline-flex" }}>
                  <MagicWand01Icon size={16} />
                </span>{" "}
                {t("genBtn")}
              </>
            )}
          </button>
        </div>
      </div>
      <div className="demo-app">
        <div className="app-frame">
          <div className="app-titlebar">
            <div className="dots"><span className="dot" /><span className="dot" /><span className="dot" /></div>
            <div className="url">arabaudit.com / admin / ai-insights</div>
            <div className="live">LIVE</div>
          </div>
          <div className="app-body">
            <div className="insights-hero">
              <div className="insights-trend">
                <ArrowUp01Icon size={28} />
                <span>{velocity}</span>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 10,
                    color: "var(--aa-gold-dark)",
                    letterSpacing: ".12em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {t("trendNarLabel")}
                </div>
                <div className="insights-narrative">{narrative}</div>
              </div>
            </div>

            <div className="insights-metrics">
              <div className="insights-metric"><div className="v">{audits}</div><div className="l">{t("mAudits")}</div></div>
              <div className="insights-metric"><div className="v">{months}</div><div className="l">{t("mMonths")}</div></div>
              <div className="insights-metric"><div className="v">{conf}</div><div className="l">{t("mConf")}</div></div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 10,
                  color: "var(--aa-gold-dark)",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                {t("focusHeading")}
              </div>
              <div>
                {recData.map((r, i) => {
                  const visible = recs[i]?.visible;
                  if (!recs[i]) return null;
                  return (
                    <div key={i} className={`insights-rec ${visible ? "visible" : ""}`}>
                      <div className="priority">{r.p}</div>
                      <div style={{ flex: 1 }}>
                        <h5>{r.title}</h5>
                        <p>{r.desc}</p>
                        <div className="impact">
                          <span>
                            <Clock04Icon size={11} /> {r.hours}h {t("effortWord")}
                          </span>
                          <span>
                            <Tick02Icon size={11} /> {r.controls} {t("controlsWord")}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
