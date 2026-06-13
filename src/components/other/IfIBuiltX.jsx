"use client";
import { useState } from "react";

const concepts = [
  {
    id: "subway-ui",
    title: "The NYC Subway Interface",
    subtitle: "If I redesigned the MTA experience end-to-end",
    category: "transit",
    color: "#2563eb",
    coverEmoji: "🚇",
    problem:
      "The MTA's digital touchpoints are fragmented, inconsistent, and designed in isolation from each other. The app doesn't talk to the kiosk. The kiosk doesn't reflect real-time conditions. The signage uses three different wayfinding systems simultaneously.",
    principles: [
      "One data source. Every touchpoint - app, kiosk, signage - pulls from the same real-time feed.",
      "Design for the 30-second decision. You have 30 seconds on a platform to decide if you're on the right train. Every interface should answer that question first.",
      "Offline-first. The subway is underground. The interface has to work without a connection.",
      "Cognitive load scales with urgency. When you're running late, you need less information, not more.",
    ],
    keyDecisions: [
      {
        decision: "Replace the line map with a journey map",
        rationale:
          "Nobody looks at the full subway map when they just need to get from A to B. Show the journey, not the network.",
      },
      {
        decision: "Live platform conditions as the home screen",
        rationale:
          "The question everyone has when they open the app is 'is my train coming?' Answer that before anything else.",
      },
      {
        decision: "Haptic alerts for connection warnings",
        rationale:
          "When you're listening to music and about to miss your transfer, a visual notification doesn't reach you. A distinct haptic pattern does.",
      },
    ],
    status: "speculative",
    connection: "MetroSync",
  },
  {
    id: "astronaut-toolkit",
    title: "An Astronaut's Interface Toolkit",
    subtitle: "If I designed the EVA interaction system from scratch",
    category: "space",
    color: "#7c3aed",
    coverEmoji: "🛰️",
    problem:
      "Current EVA interfaces are adaptations of shirtsleeve-environment tools. The gloves, the lighting, the cognitive load, the life-support noise - none of these conditions were the design environment. They were afterthoughts.",
    principles: [
      "Gloves first. Every interaction must be achievable with a pressurized glove. This eliminates touchscreens, fine motor gestures, and anything requiring bimanual coordination.",
      "Haptic as primary channel. Visual bandwidth is saturated during EVA. Haptic confirmation is the underused high-bandwidth signal.",
      "Fail audibly. In a life-support environment, silent failures are unacceptable. Every critical state change has a distinct audio signature.",
      "Cognitive load budget. An astronaut doing an EVA has a fixed cognitive budget. Every interface element spends some of it. Spend it wisely.",
    ],
    keyDecisions: [
      {
        decision: "6-gesture vocabulary, not 12",
        rationale:
          "Reliability under cognitive load matters more than expressiveness. 6 patterns with 99% accuracy beats 12 at 80%.",
      },
      {
        decision: "Wrist rotation as primary input axis",
        rationale:
          "Proprioceptively available through gloves even when vision is occupied. The most reliable physical signal we found in testing.",
      },
      {
        decision: "No touchscreen anywhere in the primary interface",
        rationale:
          "Tested and eliminated in EVA-05. The mechanical resistance of pressurized gloves makes fine positional control structurally impossible.",
      },
    ],
    status: "research-backed",
    connection: "HCI in space research",
  },
  {
    id: "pkm-tool",
    title: "A Second Brain for Builders",
    subtitle: "If I designed the PKM tool I actually want",
    category: "tools",
    color: "#059669",
    coverEmoji: "🧠",
    problem:
      "Existing PKM tools optimize for storage, not retrieval. Notion is a database. Obsidian is a filesystem. Roam is a graph. None of them are designed around the actual cognitive experience of building something - the half-formed ideas, the connections you haven't made yet, the questions you don't know how to answer.",
    principles: [
      "Surface, don't store. The goal isn't to put ideas somewhere safe. It's to bring them back at the right moment.",
      "Connections over hierarchy. Ideas don't live in folders in your brain. The tool shouldn't impose folders either.",
      "Frictionless capture. If it's harder to capture than to forget, you'll forget. The capture UX is the whole product.",
      "Temporal awareness. Ideas have a when. The best tools know what you were thinking about on the same day you had a connected thought.",
    ],
    keyDecisions: [
      {
        decision: "Daily note as the primary interface",
        rationale:
          "You're always in today. Start there and let everything else connect outward.",
      },
      {
        decision: "Automatic connection suggestions based on overlap",
        rationale:
          "You shouldn't have to remember that two notes are related. The system should notice.",
      },
      {
        decision: "No folders, ever",
        rationale:
          "Folders are a filing cabinet metaphor. Your brain doesn't have filing cabinets. The tool shouldn't either.",
      },
    ],
    status: "speculative",
    connection: "organizing systems hobby",
  },
];

const statusConfig = {
  speculative: {
    label: "speculative",
    color: "#d97706",
    bg: "rgba(217,119,6,0.08)",
    border: "rgba(217,119,6,0.2)",
  },
  "research-backed": {
    label: "research-backed",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.2)",
  },
  "in-progress": {
    label: "in progress",
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    border: "rgba(5,150,105,0.2)",
  },
};

export default function IfIBuiltX() {
  const [active, setActive] = useState(concepts[0].id);
  const concept = concepts.find((c) => c.id === active);

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
      <style>{`* { box-sizing:border-box;margin:0;padding:0; }`}</style>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.25em",
              color: "#7c3aed",
              marginBottom: 6,
            }}
          >
            speculative design;
          </p>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            If I Built X ◈
          </h1>
          <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
            Things that don't exist yet - or exist poorly. How I'd approach
            them.
          </p>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {concepts.map((c) => {
              const isActive = active === c.id;
              const s = statusConfig[c.status];
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 10,
                    border: `1px solid ${isActive ? c.color + "40" : "rgba(0,0,0,0.08)"}`,
                    background: isActive ? c.color + "0d" : "#fff",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 6 }}>
                    {c.coverEmoji}
                  </div>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: isActive ? c.color : "#1a1a2e",
                      lineHeight: 1.3,
                      marginBottom: 4,
                    }}
                  >
                    {c.title}
                  </p>
                  <span
                    style={{
                      fontSize: 9,
                      fontFamily: "monospace",
                      padding: "1px 6px",
                      borderRadius: 999,
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                      color: s.color,
                    }}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>

          {concept && (
            <div
              style={{
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div style={{ height: 5, background: concept.color }} />
              <div style={{ padding: "24px 28px" }}>
                <div style={{ marginBottom: 20 }}>
                  <p
                    style={{
                      fontFamily: "monospace",
                      fontSize: 10,
                      color: "#9ca3af",
                      marginBottom: 6,
                    }}
                  >
                    {concept.category}
                  </p>
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      marginBottom: 4,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {concept.title}
                  </h2>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#9ca3af",
                      fontStyle: "italic",
                    }}
                  >
                    {concept.subtitle}
                  </p>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <p
                    style={{
                      fontFamily: "monospace",
                      fontSize: 9,
                      color: "#9ca3af",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    The Problem
                  </p>
                  <p
                    style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.75 }}
                  >
                    {concept.problem}
                  </p>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <p
                    style={{
                      fontFamily: "monospace",
                      fontSize: 9,
                      color: "#9ca3af",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    Design Principles
                  </p>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    {concept.principles.map((p, i) => (
                      <div key={i} style={{ display: "flex", gap: 10 }}>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: 11,
                            color: concept.color,
                            flexShrink: 0,
                            marginTop: 2,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p
                          style={{
                            fontSize: 13,
                            color: "#374151",
                            lineHeight: 1.65,
                          }}
                        >
                          {p}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <p
                    style={{
                      fontFamily: "monospace",
                      fontSize: 9,
                      color: "#9ca3af",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    Key Decisions
                  </p>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                  >
                    {concept.keyDecisions.map((d, i) => (
                      <div
                        key={i}
                        style={{
                          padding: "12px 14px",
                          background: `${concept.color}06`,
                          borderLeft: `3px solid ${concept.color}35`,
                          borderRadius: "0 8px 8px 0",
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 600,
                            fontSize: 12,
                            marginBottom: 4,
                            color: concept.color,
                          }}
                        >
                          → {d.decision}
                        </p>
                        <p
                          style={{
                            fontSize: 12,
                            color: "#6b7280",
                            lineHeight: 1.6,
                          }}
                        >
                          {d.rationale}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: "#c4b5fd",
                  }}
                >
                  connects to: {concept.connection}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
