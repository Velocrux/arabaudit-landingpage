"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MagicWand01Icon, Refresh01Icon, Tick02Icon } from "hugeicons-react";

type FieldKey = "title" | "desc" | "root" | "impact" | "rec";

export default function FindingDemo() {
  const t = useTranslations("product.finding");

  const fieldKeys: FieldKey[] = ["title", "desc", "root", "impact", "rec"];

  const data = {
    en: {
      title: t("en_title"),
      desc: t("en_desc"),
      root: t("en_root"),
      impact: t("en_impact"),
      rec: t("en_rec"),
    },
    ar: {
      title: t("ar_title"),
      desc: t("ar_desc"),
      root: t("ar_root"),
      impact: t("ar_impact"),
      rec: t("ar_rec"),
    },
  };

  const labels = {
    en: { title: t("lbl_title"), desc: t("lbl_desc"), root: t("lbl_root"), impact: t("lbl_impact"), rec: t("lbl_rec") },
    ar: { title: t("lblAr_title"), desc: t("lblAr_desc"), root: t("lblAr_root"), impact: t("lblAr_impact"), rec: t("lblAr_rec") },
  };

  const [lang, setLang] = useState<"en" | "ar">("en");
  const [enVals, setEnVals] = useState<Record<FieldKey, string>>({
    title: t("placeholder"),
    desc: t("placeholder"),
    root: t("placeholder"),
    impact: t("placeholder"),
    rec: t("placeholder"),
  });
  const [arVals, setArVals] = useState<Record<FieldKey, string>>({
    title: "",
    desc: "",
    root: "",
    impact: "",
    rec: "",
  });
  const [visibleFields, setVisibleFields] = useState<Record<FieldKey, boolean>>({
    title: true,
    desc: true,
    root: true,
    impact: true,
    rec: true,
  });
  const [severity, setSeverity] = useState<{ label: string; cls: string }>({ label: t("sevMedium"), cls: "severity-medium" });
  const [running, setRunning] = useState(false);
  const [placeholderMode, setPlaceholderMode] = useState(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  const generate = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(true);
    setPlaceholderMode(false);
    setSeverity({ label: t("sevAnalyzing"), cls: "severity-medium" });
    setEnVals({ title: "", desc: "", root: "", impact: "", rec: "" });
    setArVals({ title: "", desc: "", root: "", impact: "", rec: "" });
    setVisibleFields({ title: false, desc: false, root: false, impact: false, rec: false });

    let idx = 0;
    const typeNext = () => {
      if (idx >= fieldKeys.length) {
        setSeverity({ label: t("sevCritical"), cls: "severity-critical" });
        setRunning(false);
        return;
      }
      const key = fieldKeys[idx];
      setVisibleFields((v) => ({ ...v, [key]: true }));
      const fullText = data.en[key];
      const speed = Math.max(8, 40 - fullText.length / 10);
      let i = 0;
      const interval = setInterval(() => {
        i += 3;
        setEnVals((v) => ({ ...v, [key]: fullText.slice(0, i) }));
        if (i >= fullText.length) {
          clearInterval(interval);
          setEnVals((v) => ({ ...v, [key]: fullText }));
          setArVals((v) => ({ ...v, [key]: data.ar[key] }));
          idx++;
          timers.current.push(setTimeout(typeNext, 250));
        }
      }, speed);
    };
    timers.current.push(setTimeout(typeNext, 400));
  };

  const vals = lang === "en" ? enVals : arVals;
  const labs = lang === "en" ? labels.en : labels.ar;

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
          <button className="btn-ai" onClick={generate} disabled={running}>
            {running ? (
              <>
                <span className="ai-pulse" style={{ display: "inline-flex" }}>
                  <MagicWand01Icon size={16} />
                </span>{" "}
                {t("generatingBtn")}
              </>
            ) : placeholderMode ? (
              <>
                <span className="ai-pulse" style={{ display: "inline-flex" }}>
                  <MagicWand01Icon size={16} />
                </span>{" "}
                {t("generateBtn")}
              </>
            ) : (
              <>
                <Refresh01Icon size={16} /> {t("regenBtn")}
              </>
            )}
          </button>
        </div>
      </div>
      <div className="demo-app">
        <div className="finding-modal">
          <div className="finding-header">
            <h4>
              <MagicWand01Icon size={18} /> {t("headerTitle")}
            </h4>
            <div className={`severity-badge ${severity.cls}`}>{severity.label}</div>
          </div>
          <div className="lang-tabs">
            <div
              className={`lang-tab ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
            >
              English
            </div>
            <div
              className={`lang-tab ${lang === "ar" ? "active" : ""}`}
              onClick={() => setLang("ar")}
            >
              عربي
            </div>
          </div>
          <div className="finding-body">
            {fieldKeys.map((k) => (
              <div key={k} className={`finding-field ${visibleFields[k] ? "visible" : ""}`}>
                <div className="finding-field-label">{labs[k]}</div>
                <div
                  className={`finding-field-value${lang === "ar" ? " ar" : ""}`}
                  style={placeholderMode && lang === "en" ? { color: "var(--aa-slate-400)" } : undefined}
                >
                  {vals[k]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
