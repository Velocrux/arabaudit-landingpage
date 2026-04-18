"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Tick02Icon } from "hugeicons-react";

interface Msg {
  text: string;
  isUser: boolean;
  isAr: boolean;
}

interface Resp {
  text: string;
  followups: string[];
}

export default function CopilotDemo() {
  const t = useTranslations("product.copilot");
  const bodyRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Msg[]>([
    { text: t("greeting"), isUser: false, isAr: false },
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([
    t("sug1"),
    t("sug2"),
    t("sug3"),
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");

  const responses: Record<string, Resp> = {
    [t("sug1")]: {
      text: t("resp1"),
      followups: [t("fu1_1"), t("fu1_2"), t("fu1_3")],
    },
    [t("sug2")]: {
      text: t("resp2"),
      followups: [t("fu2_1"), t("fu2_2"), t("fu2_3")],
    },
    [t("sug3")]: {
      text: t("resp3"),
      followups: [t("fu3_1"), t("fu3_2"), t("fu3_3")],
    },
    [t("fu1_1")]: {
      text: t("resp4"),
      followups: [t("fu4_1"), t("fu4_2"), t("fu4_3")],
    },
    [t("fu3_2")]: {
      text: t("resp5"),
      followups: [t("fu5_1"), t("fu5_2"), t("fu5_3")],
    },
  };

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  const handleMessage = (msg: string) => {
    if (!msg) return;
    const isAr = /[\u0600-\u06FF]/.test(msg);
    setMessages((m) => [...m, { text: msg, isUser: true, isAr }]);
    setInput("");
    setSuggestions([]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const resp =
        responses[msg] || {
          text: isAr ? t("fallbackAr") : t("fallbackEn"),
          followups: isAr
            ? [t("fallbackFuAr1"), t("fallbackFuAr2")]
            : [t("fallbackFu1"), t("fallbackFu2"), t("fallbackFu3")],
        };
      const respAr = /[\u0600-\u06FF]/.test(resp.text);
      setMessages((m) => [...m, { text: resp.text, isUser: false, isAr: respAr }]);
      setTimeout(() => setSuggestions(resp.followups), 200);
    }, 1400 + Math.random() * 800);
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
        <div
          style={{
            marginTop: 32,
            padding: "14px 18px",
            background: "rgba(200,169,81,.08)",
            borderRadius: 8,
            borderLeft: "3px solid var(--aa-gold)",
            fontSize: 13,
            color: "var(--aa-slate-800)",
          }}
        >
          <b>{t("tryItLabel")}</b> {t("tryItText")}
        </div>
      </div>
      <div className="demo-app">
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">AI</div>
            <div className="chat-info">
              <h4>{t("chatTitle")}</h4>
              <div className="sub">{t("chatSub")}</div>
            </div>
            <div
              style={{
                marginLeft: "auto",
                fontFamily: "var(--f-mono)",
                fontSize: 10,
                color: "var(--aa-gold-dark)",
                letterSpacing: ".1em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--aa-gold)",
                  animation: "liveDot 1.4s infinite",
                }}
              />{" "}
              LIVE
            </div>
          </div>
          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.isUser ? "msg-user" : "msg-ai"}`}>
                <div className="msg-avatar">{m.isUser ? "Y" : "AI"}</div>
                <div
                  className="msg-bubble"
                  dir={m.isAr ? "rtl" : "ltr"}
                  style={m.isAr ? { textAlign: "right" } : undefined}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="msg msg-ai">
                <div className="msg-avatar">AI</div>
                <div className="msg-typing">
                  <div className="typing-dots">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="chat-suggestions">
            {suggestions.map((q, i) => (
              <div key={i} className="chat-suggestion" onClick={() => handleMessage(q)}>
                {q}
              </div>
            ))}
          </div>
          <div className="chat-input-wrap">
            <input
              className="chat-input"
              placeholder={t("inputPh")}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleMessage(input.trim());
              }}
            />
            <button className="chat-send" onClick={() => handleMessage(input.trim())}>
              {t("sendBtn")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
