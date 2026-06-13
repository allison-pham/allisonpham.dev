"use client";
import { useState, useEffect } from "react";

const fortunes = [
  {
    id: 1,
    text: "The interface you're avoiding designing is the one that needs the most thought.",
    tag: "design",
  },
  {
    id: 2,
    text: "You already know what the problem is. You're just not ready to admit it yet.",
    tag: "building",
  },
  {
    id: 3,
    text: "The second cup of tea is always better. So is the second draft.",
    tag: "process",
  },
  {
    id: 4,
    text: "Ship the version that embarrasses you slightly. That's the right version.",
    tag: "building",
  },
  {
    id: 5,
    text: "The person who will use what you're building is tired, rushed, and not paying full attention. Design for them.",
    tag: "HCI",
  },
  {
    id: 6,
    text: "The constraint you're complaining about is the brief.",
    tag: "design",
  },
  {
    id: 7,
    text: "Whatever you're procrastinating on is probably the most important thing.",
    tag: "process",
  },
  {
    id: 8,
    text: "Good ideas don't come from thinking harder. They come from thinking about something else.",
    tag: "creativity",
  },
  {
    id: 9,
    text: "You are not your tools, but your tools are shaping you.",
    tag: "thinking",
  },
  {
    id: 10,
    text: "The documentation you're skipping will be the thing you desperately need in six months.",
    tag: "building",
  },
  {
    id: 11,
    text: "Rest is not a reward for finishing. It is part of the system.",
    tag: "process",
  },
  {
    id: 12,
    text: "The question you haven't asked yet is the most interesting one.",
    tag: "research",
  },
  { id: 13, text: "Write it down. You will not remember it.", tag: "process" },
  {
    id: 14,
    text: "Most systems fail at the edges. Design the edges first.",
    tag: "systems",
  },
  {
    id: 15,
    text: "The feeling that you're not ready is the feeling. Ship anyway.",
    tag: "building",
  },
  {
    id: 16,
    text: "What would you build if you knew it would fail? That's probably worth building.",
    tag: "creativity",
  },
  {
    id: 17,
    text: "Your assumptions are showing. Examine them.",
    tag: "thinking",
  },
  {
    id: 18,
    text: "The reason this feels hard is that it is hard. That's why it's worth doing.",
    tag: "process",
  },
  {
    id: 19,
    text: "Make the tea. The idea will still be there.",
    tag: "personal",
  },
  {
    id: 20,
    text: "Cognitive load is invisible until it isn't. Check for it before you ship.",
    tag: "HCI",
  },
  {
    id: 21,
    text: "The user you're designing for is not you. Remind yourself every hour.",
    tag: "design",
  },
  {
    id: 22,
    text: "The dead end you hit was not wasted. It was research.",
    tag: "research",
  },
];

const tagColors = {
  design: "#db2777",
  building: "#7c3aed",
  process: "#d97706",
  HCI: "#2563eb",
  thinking: "#6366f1",
  creativity: "#059669",
  research: "#0891b2",
  systems: "#374151",
  personal: "#9ca3af",
};

function getCookieOfDay() {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  return fortunes[seed % fortunes.length];
}

function CookieSVG({ open, color }) {
  return (
    <svg
      viewBox="0 0 120 80"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 120, height: 80 }}
    >
      {!open ? (
        <>
          <path
            d="M10 40 Q60 10 110 40"
            fill="none"
            stroke="#d97706"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M10 40 Q60 65 110 40"
            fill="none"
            stroke="#d97706"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse
            cx="60"
            cy="40"
            rx="50"
            ry="22"
            fill="#faeeda"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          <path
            d="M10 40 Q60 42 110 40"
            stroke="#d97706"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        </>
      ) : (
        <>
          <path
            d="M10 42 Q35 20 60 38"
            fill="#faeeda"
            stroke="#d97706"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M10 42 Q35 58 60 42"
            fill="#faeeda"
            stroke="#d97706"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M110 38 Q85 18 60 38"
            fill="#faeeda"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          <path
            d="M110 42 Q85 60 60 42"
            fill="#faeeda"
            stroke="#d97706"
            strokeWidth="1.5"
          />
          <rect
            x="42"
            y="36"
            width="36"
            height="8"
            rx="2"
            fill="white"
            stroke={color ?? "#d97706"}
            strokeWidth="0.5"
          />
        </>
      )}
    </svg>
  );
}

export default function FortuneCookies() {
  const [current, setCurrent] = useState(null);
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [history, setHistory] = useState([]);
  const [view, setView] = useState("cookie");
  const daily = getCookieOfDay();

  const crack = () => {
    if (open) {
      setOpen(false);
      setRevealed(false);
      setCurrent(null);
      return;
    }
    const remaining = fortunes.filter(
      (f) => !history.includes(f.id) && f.id !== daily.id,
    );
    const pool =
      remaining.length > 0
        ? remaining
        : fortunes.filter((f) => f.id !== daily.id);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setCurrent(pick);
    setOpen(true);
    setTimeout(() => setRevealed(true), 200);
    setHistory((h) => [...h, pick.id].slice(-10));
  };

  return (
    <div
      style={{
        fontFamily: "system-ui,sans-serif",
        background: "#fffdf7",
        minHeight: "100vh",
        padding: "2rem 1rem",
        color: "#1a1a2e",
      }}
    >
      <style>{`
        * { box-sizing:border-box;margin:0;padding:0; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)} }
        @keyframes crack { 0%{transform:scale(1)}40%{transform:scale(1.06) rotate(-2deg)}70%{transform:scale(0.97) rotate(1deg)}100%{transform:scale(1)} }
        .cookie-wrap { animation: crack 0.3s ease; }
      `}</style>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.25em",
              color: "#d97706",
              marginBottom: 6,
            }}
          >
            written by me;
          </p>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            Fortune Cookies 🥠
          </h1>
          <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
            Fortunes I wrote. Specific, honest, occasionally uncomfortable.
            Crack one open.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 28,
            background: "rgba(0,0,0,0.04)",
            borderRadius: 10,
            padding: 4,
            width: "fit-content",
          }}
        >
          {[
            ["cookie", "🥠 crack one"],
            ["daily", "☀️ daily fortune"],
            ["all", "📋 all fortunes"],
          ].map(([v, label]) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                background: view === v ? "rgba(217,119,6,0.12)" : "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: 11,
                padding: "6px 14px",
                borderRadius: 8,
                color: view === v ? "#d97706" : "#9ca3af",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {view === "cookie" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div
              className="cookie-wrap"
              onClick={crack}
              style={{ cursor: "pointer", transition: "transform 0.15s" }}
            >
              <CookieSVG
                open={open}
                color={current ? tagColors[current.tag] : "#d97706"}
              />
            </div>

            {open && current && (
              <div
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(10px)",
                  transition: "all 0.3s",
                  textAlign: "center",
                  maxWidth: 400,
                }}
              >
                <div
                  style={{
                    padding: "20px 28px",
                    background: "#fff",
                    border: "1px solid rgba(217,119,6,0.2)",
                    borderRadius: 14,
                    marginBottom: 12,
                  }}
                >
                  <p
                    style={{
                      fontSize: 16,
                      color: "#374151",
                      lineHeight: 1.75,
                      fontStyle: "italic",
                      marginBottom: 12,
                    }}
                  >
                    "{current.text}"
                  </p>
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      padding: "2px 9px",
                      borderRadius: 999,
                      background: `${tagColors[current.tag]}15`,
                      border: `1px solid ${tagColors[current.tag]}30`,
                      color: tagColors[current.tag],
                    }}
                  >
                    #{current.tag}
                  </span>
                </div>
                <button
                  onClick={crack}
                  style={{
                    background: "rgba(217,119,6,0.08)",
                    border: "1px solid rgba(217,119,6,0.2)",
                    borderRadius: 8,
                    padding: "7px 16px",
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "#d97706",
                    cursor: "pointer",
                  }}
                >
                  crack another →
                </button>
              </div>
            )}

            {!open && (
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#9ca3af",
                }}
              >
                click to crack open
              </p>
            )}
          </div>
        )}

        {view === "daily" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                color: "#9ca3af",
              }}
            >
              Today's fortune - changes at midnight.
            </p>
            <CookieSVG open={true} color={tagColors[daily.tag]} />
            <div
              style={{
                padding: "24px 32px",
                background: "#fff",
                border: "1px solid rgba(217,119,6,0.2)",
                borderRadius: 16,
                textAlign: "center",
                maxWidth: 400,
              }}
            >
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: "#9ca3af",
                  marginBottom: 12,
                }}
              >
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p
                style={{
                  fontSize: 17,
                  color: "#374151",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                  marginBottom: 14,
                }}
              >
                "{daily.text}"
              </p>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: "monospace",
                  padding: "2px 9px",
                  borderRadius: 999,
                  background: `${tagColors[daily.tag]}15`,
                  border: `1px solid ${tagColors[daily.tag]}30`,
                  color: tagColors[daily.tag],
                }}
              >
                #{daily.tag}
              </span>
            </div>
          </div>
        )}

        {view === "all" && (
          <div style={{ display: "grid", gap: 8 }}>
            {fortunes.map((f) => (
              <div
                key={f.id}
                style={{
                  padding: "12px 16px",
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 10,
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 14,
                    color: "rgba(217,119,6,0.3)",
                    width: 24,
                    flexShrink: 0,
                  }}
                >
                  {String(f.id).padStart(2, "0")}
                </span>
                <div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#374151",
                      lineHeight: 1.65,
                      marginBottom: 6,
                      fontStyle: "italic",
                    }}
                  >
                    "{f.text}"
                  </p>
                  <span
                    style={{
                      fontSize: 9,
                      fontFamily: "monospace",
                      padding: "1px 6px",
                      borderRadius: 999,
                      background: `${tagColors[f.tag]}12`,
                      border: `1px solid ${tagColors[f.tag]}25`,
                      color: tagColors[f.tag],
                    }}
                  >
                    #{f.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
