"use client";
import { useState } from "react";

const obsessions = [
  {
    id: 1,
    thing: "Force-directed graphs",
    category: "engineering",
    since: "May 2026",
    intensity: 95,
    description:
      "The physics of them. Repulsion, attraction, damping - four parameters that produce something that feels alive. I've been building them into everything.",
    why: "Because they're the closest visual metaphor I have for how ideas actually connect. Not hierarchies, not lists - a field of things pulling on each other.",
    connections: ["constellation map", "reading tracker", "digital garden"],
    color: "#7c3aed",
  },
  {
    id: 2,
    thing: "Haptic feedback as primary channel",
    category: "research",
    since: "May 2026",
    intensity: 88,
    description:
      "The realization from EVA-06 that visual confirmation is the wrong primary channel for astronaut interfaces. Haptic is the underused high-bandwidth signal.",
    why: "Because it completely reframes how I think about all interface feedback, not just space. What else are we using as a backup that should be primary?",
    connections: ["space log", "HCI research", "EVA-06"],
    color: "#2563eb",
  },
  {
    id: 3,
    thing: "Jasmine green tea at exactly 175°F",
    category: "personal",
    since: "always",
    intensity: 100,
    description:
      "Not a new obsession. But it keeps deepening. The ritual more than the tea. The transition it marks between unfocused and focused.",
    why: "Because ritual is underrated as a cognitive tool. You can't design focus directly. You can design the conditions for it.",
    connections: ["ambient mode", "rituals", "deep work"],
    color: "#059669",
  },
  {
    id: 4,
    thing: "The Apollo program's design decisions",
    category: "research",
    since: "April 2026",
    intensity: 72,
    description:
      "Going back through the original Apollo interface designs. Everything was designed around glove constraints from day one. Chunky, tactile, single-function. They were doing constraint-first design before it had a name.",
    why: "Because it proves that extreme constraints don't limit design - they clarify it. The Apollo keyboard is more honest than most modern interfaces.",
    connections: ["space log", "HCI", "design principles"],
    color: "#d97706",
  },
];

const categoryColors = {
  engineering: {
    bg: "rgba(124,58,237,0.08)",
    text: "#7c3aed",
    border: "rgba(124,58,237,0.2)",
  },
  research: {
    bg: "rgba(37,99,235,0.08)",
    text: "#2563eb",
    border: "rgba(37,99,235,0.2)",
  },
  personal: {
    bg: "rgba(5,150,105,0.08)",
    text: "#059669",
    border: "rgba(5,150,105,0.2)",
  },
  design: {
    bg: "rgba(219,39,119,0.08)",
    text: "#db2777",
    border: "rgba(219,39,119,0.2)",
  },
};

export default function CurrentlyObsessedWith() {
  const [active, setActive] = useState(obsessions[0].id);
  const current = obsessions.find((o) => o.id === active);

  return (
    <div
      style={{
        fontFamily: "system-ui,sans-serif",
        background: "#f8f7ff",
        minHeight: "100vh",
        padding: "2rem 1rem",
        color: "#1a1a2e",
      }}
    >
      <style>{`* { box-sizing:border-box;margin:0;padding:0; } @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}`}</style>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.25em",
              color: "#7c3aed",
              marginBottom: 6,
            }}
          >
            right now;
          </p>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            Currently Obsessed With ◎
          </h1>
          <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
            One rotating spotlight. What's occupying disproportionate mental
            real estate right now.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {obsessions.map((o) => {
            const c = categoryColors[o.category] ?? categoryColors.design;
            const isActive = active === o.id;
            return (
              <button
                key={o.id}
                onClick={() => setActive(o.id)}
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `1px solid ${isActive ? o.color + "50" : "rgba(0,0,0,0.08)"}`,
                  background: isActive ? o.color + "0d" : "#fff",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 13,
                      color: isActive ? o.color : "#1a1a2e",
                      lineHeight: 1.3,
                    }}
                  >
                    {o.thing}
                  </p>
                  <span
                    style={{
                      fontSize: 9,
                      fontFamily: "monospace",
                      padding: "2px 7px",
                      borderRadius: 999,
                      background: c.bg,
                      border: `1px solid ${c.border}`,
                      color: c.text,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {o.category}
                  </span>
                </div>
                <div
                  style={{
                    height: 3,
                    background: "rgba(0,0,0,0.06)",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${o.intensity}%`,
                      background: o.color,
                      borderRadius: 999,
                    }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 9,
                    color: "#9ca3af",
                    marginTop: 5,
                  }}
                >
                  intensity {o.intensity}% · since {o.since}
                </p>
              </button>
            );
          })}
        </div>

        {current && (
          <div
            style={{
              padding: "24px 28px",
              background: "#fff",
              border: `1px solid ${current.color}30`,
              borderRadius: 16,
              borderLeft: `4px solid ${current.color}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: current.color,
                  animation: "pulse 2s infinite",
                }}
              />
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: current.color,
                  letterSpacing: "0.15em",
                }}
              >
                ACTIVE OBSESSION
              </p>
            </div>

            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 12,
                letterSpacing: "-0.01em",
              }}
            >
              {current.thing}
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#4b5563",
                lineHeight: 1.75,
                marginBottom: 16,
              }}
            >
              {current.description}
            </p>

            <div
              style={{
                padding: "12px 14px",
                background: `${current.color}08`,
                borderLeft: `3px solid ${current.color}40`,
                borderRadius: "0 8px 8px 0",
                marginBottom: 16,
              }}
            >
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 9,
                  color: current.color,
                  letterSpacing: "0.12em",
                  marginBottom: 5,
                }}
              >
                WHY IT MATTERS
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "#6b7280",
                  lineHeight: 1.65,
                  fontStyle: "italic",
                }}
              >
                {current.why}
              </p>
            </div>

            <div>
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 9,
                  color: "#9ca3af",
                  letterSpacing: "0.12em",
                  marginBottom: 8,
                }}
              >
                CONNECTS TO
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {current.connections.map((c) => (
                  <span
                    key={c}
                    style={{
                      fontSize: 11,
                      fontFamily: "monospace",
                      padding: "3px 10px",
                      borderRadius: 8,
                      background: "rgba(0,0,0,0.04)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      color: "#6b7280",
                    }}
                  >
                    → {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
