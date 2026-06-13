"use client";
import { useState } from "react";

const people = [
  {
    id: 1,
    description:
      "Someone who has done UX research in genuinely extreme environments - surgical suites, deep-sea, high-altitude, military. Not hypothetical constraints. Real ones.",
    why: "I want to know what actually breaks when you design for a person under maximum stress, and what you'd never have guessed from a lab study.",
    category: "research",
    open: true,
  },
  {
    id: 2,
    description:
      "A transit systems designer who has shipped something that millions of people use every day - and has opinions about what they'd do differently.",
    why: "MetroSync started as a design exercise. I want to know where the real constraints are, from someone who's hit them.",
    category: "design",
    open: true,
  },
  {
    id: 3,
    description:
      "Someone building tools specifically for how people think - not productivity apps, but tools that extend or augment cognition in some meaningful way.",
    why: "This is the intersection I keep coming back to. I want to find the other people who are obsessed with it.",
    category: "building",
    open: true,
  },
  {
    id: 4,
    description:
      "A researcher who has worked on the human factors side of space missions - not interface design specifically, but the broader question of how people function in isolation and confinement.",
    why: "The HCI problems I'm studying live inside a larger human factors context. I need to understand that context better.",
    category: "research",
    open: true,
  },
  {
    id: 5,
    description:
      "Someone who has run a hackathon for 500+ people and is willing to be honest about what went wrong.",
    why: "I've directed Citrus Hack and Cutie Hack. I want to compare notes with someone who's been further down that road.",
    category: "community",
    open: true,
  },
  {
    id: 6,
    description:
      "A designer who has worked on both consumer products and safety-critical systems - and has thoughts on what each context gets wrong about the other.",
    why: "I keep feeling like consumer product design and safety-critical design are talking past each other. Someone who has done both would have the translation layer I'm missing.",
    category: "design",
    open: true,
  },
  {
    id: 7,
    description:
      "Someone who has read both Norman and Csíkszentmihályi and has an opinion on where they disagree.",
    why: "This is a litmus test question. I want to find people who have thought hard about the same intersection I'm in.",
    category: "intellectual",
    open: true,
  },
];

const categoryColors = {
  research: {
    bg: "rgba(37,99,235,0.08)",
    text: "#2563eb",
    border: "rgba(37,99,235,0.2)",
  },
  design: {
    bg: "rgba(219,39,119,0.08)",
    text: "#db2777",
    border: "rgba(219,39,119,0.2)",
  },
  building: {
    bg: "rgba(124,58,237,0.08)",
    text: "#7c3aed",
    border: "rgba(124,58,237,0.2)",
  },
  community: {
    bg: "rgba(5,150,105,0.08)",
    text: "#059669",
    border: "rgba(5,150,105,0.2)",
  },
  intellectual: {
    bg: "rgba(217,119,6,0.08)",
    text: "#d97706",
    border: "rgba(217,119,6,0.2)",
  },
};

export default function WhoIdLikeToMeet() {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const categories = [...new Set(people.map((p) => p.category))];
  const filtered = filter
    ? people.filter((p) => p.category === filter)
    : people;

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
      <style>{`* { box-sizing:border-box;margin:0;padding:0; } textarea{font-family:system-ui,sans-serif;outline:none;}`}</style>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
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
            intentional networking;
          </p>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            Who I'd Like to Meet ◈
          </h1>
          <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
            Specific types of people, not generic networking. If this sounds
            like you - or someone you know - the question box is right there.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 24,
          }}
        >
          <button
            onClick={() => setFilter(null)}
            style={{
              padding: "3px 12px",
              borderRadius: 999,
              border: "1px solid",
              fontFamily: "monospace",
              fontSize: 10,
              cursor: "pointer",
              background: !filter ? "rgba(124,58,237,0.1)" : "transparent",
              borderColor: !filter ? "rgba(124,58,237,0.3)" : "rgba(0,0,0,0.1)",
              color: !filter ? "#7c3aed" : "#9ca3af",
            }}
          >
            all
          </button>
          {categories.map((cat) => {
            const c = categoryColors[cat];
            return (
              <button
                key={cat}
                onClick={() => setFilter(filter === cat ? null : cat)}
                style={{
                  padding: "3px 12px",
                  borderRadius: 999,
                  border: "1px solid",
                  fontFamily: "monospace",
                  fontSize: 10,
                  cursor: "pointer",
                  background: filter === cat ? c.bg : "transparent",
                  borderColor: filter === cat ? c.border : "rgba(0,0,0,0.1)",
                  color: filter === cat ? c.text : "#9ca3af",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 28,
          }}
        >
          {filtered.map((person, i) => {
            const c = categoryColors[person.category];
            const isOpen = expanded === person.id;
            return (
              <div
                key={person.id}
                onClick={() => setExpanded(isOpen ? null : person.id)}
                style={{
                  padding: "16px 20px",
                  background: "#fff",
                  border: `1px solid ${isOpen ? c.border : "rgba(0,0,0,0.08)"}`,
                  borderRadius: 14,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div
                  style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "rgba(124,58,237,0.15)",
                      width: 24,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 8,
                        marginBottom: isOpen ? 10 : 0,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 14,
                          color: "#374151",
                          lineHeight: 1.6,
                        }}
                      >
                        {person.description}
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
                        {person.category}
                      </span>
                    </div>
                    {isOpen && (
                      <div
                        style={{
                          padding: "10px 12px",
                          background: "rgba(124,58,237,0.04)",
                          borderLeft: "3px solid rgba(124,58,237,0.25)",
                          borderRadius: "0 8px 8px 0",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "monospace",
                            fontSize: 9,
                            color: "#7c3aed",
                            marginBottom: 4,
                            letterSpacing: "0.1em",
                          }}
                        >
                          WHY
                        </p>
                        <p
                          style={{
                            fontSize: 13,
                            color: "#6b7280",
                            lineHeight: 1.65,
                            fontStyle: "italic",
                          }}
                        >
                          {person.why}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            padding: "20px 24px",
            background: "#fff",
            border: "1px solid rgba(124,58,237,0.15)",
            borderRadius: 14,
          }}
        >
          {!showForm ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                  That's you - or someone you know?
                </p>
                <p style={{ fontSize: 13, color: "#6b7280" }}>
                  Say hello. I read everything.
                </p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  padding: "9px 18px",
                  background: "rgba(124,58,237,0.1)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  borderRadius: 8,
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#7c3aed",
                  cursor: "pointer",
                }}
              >
                reach out →
              </button>
            </div>
          ) : sent ? (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                Sent ✦
              </p>
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: "#9ca3af",
                }}
              >
                Thank you for reaching out. I'll reply.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (message.trim()) setSent(true);
              }}
            >
              <p
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: "#9ca3af",
                  marginBottom: 10,
                }}
              >
                SEND A MESSAGE
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me who you are and why you're reaching out..."
                rows={4}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid rgba(0,0,0,0.1)",
                  fontSize: 13,
                  lineHeight: 1.6,
                  resize: "none",
                  marginBottom: 10,
                  background: "#fafafa",
                }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="submit"
                  disabled={!message.trim()}
                  style={{
                    padding: "8px 16px",
                    background: message.trim()
                      ? "rgba(124,58,237,0.1)"
                      : "rgba(0,0,0,0.04)",
                    border: "1px solid",
                    borderColor: message.trim()
                      ? "rgba(124,58,237,0.3)"
                      : "rgba(0,0,0,0.08)",
                    borderRadius: 8,
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: message.trim() ? "#7c3aed" : "#9ca3af",
                    cursor: message.trim() ? "pointer" : "default",
                  }}
                >
                  send →
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    padding: "8px 14px",
                    background: "none",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 8,
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "#9ca3af",
                    cursor: "pointer",
                  }}
                >
                  cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
