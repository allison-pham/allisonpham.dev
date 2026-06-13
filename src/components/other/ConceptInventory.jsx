"use client";
import { useState } from "react";

const concepts = [
  {
    id: "cognitive-load",
    name: "Cognitive Load Theory",
    domain: "HCI",
    origin: "Sweller, 1988",
    description:
      "Working memory has limited capacity. Every interface element spends some of that capacity. The goal is to spend it on the task, not the interface.",
    usedFor:
      "Every interface decision I make runs through this. Is this element earning its cognitive cost?",
    strength: 5,
  },
  {
    id: "affordances",
    name: "Affordances",
    domain: "design",
    origin: "Gibson → Norman",
    description:
      "The properties of an object that suggest how it should be used. A button affords pressing. A handle affords pulling. Bad design creates false affordances.",
    usedFor:
      "Evaluating why an interface feels wrong even when I can't articulate it yet.",
    strength: 5,
  },
  {
    id: "first-principles",
    name: "First Principles Thinking",
    domain: "thinking",
    origin: "Aristotle → Musk",
    description:
      "Break everything down to its fundamental truths, then build back up. Don't reason by analogy - reason from the ground.",
    usedFor:
      "Starting research projects and redesigns. Ask: what do I actually know is true here?",
    strength: 5,
  },
  {
    id: "system1-2",
    name: "System 1 / System 2",
    domain: "psychology",
    origin: "Kahneman",
    description:
      "System 1 is fast, automatic, intuitive. System 2 is slow, deliberate, effortful. Most interfaces assume System 2. Most users are in System 1.",
    usedFor:
      "Designing for real use, not idealized use. People are usually rushed, distracted, and tired.",
    strength: 5,
  },
  {
    id: "second-order",
    name: "Second-Order Thinking",
    domain: "thinking",
    origin: "Howard Marks",
    description:
      "Ask not just 'what happens if I do this?' but 'what happens next, and then what?' First-order consequences are obvious. Second-order ones are where the interesting stuff is.",
    usedFor:
      "Product decisions, research design, interface changes with side effects.",
    strength: 4,
  },
  {
    id: "flow-state",
    name: "Flow / Autotelic Experience",
    domain: "psychology",
    origin: "Csíkszentmihályi",
    description:
      "Deep engagement where challenge matches skill and the activity is its own reward. The goal of good interface design: get out of the way so flow can happen.",
    usedFor:
      "Framing what I'm actually trying to produce when I design for focus.",
    strength: 5,
  },
  {
    id: "dual-coding",
    name: "Dual Coding Theory",
    domain: "HCI",
    origin: "Paivio",
    description:
      "People learn better from words + pictures than from words alone. Two channels - verbal and visual - encode information differently and reinforce each other.",
    usedFor: "Any time I'm deciding whether to add a visual to an explanation.",
    strength: 4,
  },
  {
    id: "inversion",
    name: "Inversion",
    domain: "thinking",
    origin: "Stoics → Munger",
    description:
      "Instead of asking how to achieve a goal, ask what would guarantee failure - then avoid that. Often clearer and more actionable than forward reasoning.",
    usedFor:
      "Research design, risk assessment, debugging why something isn't working.",
    strength: 4,
  },
  {
    id: "fitts-law",
    name: "Fitts' Law",
    domain: "HCI",
    origin: "Fitts, 1954",
    description:
      "The time to move to a target is a function of its size and distance. Big, close targets are faster. Small, far ones are slower. This is physics, not preference.",
    usedFor:
      "Any spatial interface decision - button placement, target sizes, navigation layout.",
    strength: 5,
  },
  {
    id: "feedback-loops",
    name: "Feedback Loops",
    domain: "systems",
    origin: "Cybernetics",
    description:
      "Systems with feedback loops are self-correcting. Without feedback, there's no learning, no adaptation, no improvement. The loop is the mechanism.",
    usedFor:
      "Designing research methodology, building products, structuring my own habits.",
    strength: 5,
  },
  {
    id: "htmss",
    name: "Hick's Law",
    domain: "HCI",
    origin: "Hick, 1952",
    description:
      "The time to make a decision increases with the number and complexity of choices. More options = slower decisions. Sometimes the best design removes options.",
    usedFor:
      "Navigation design, settings pages, any interface with multiple paths.",
    strength: 4,
  },
  {
    id: "zero-to-one",
    name: "0→1 vs 1→N",
    domain: "building",
    origin: "Thiel",
    description:
      "Creating something from nothing is fundamentally different from scaling something that exists. The skills, the risks, and the rewards are different. Know which problem you're solving.",
    usedFor:
      "Deciding how to approach a new project vs. improving an existing one.",
    strength: 4,
  },
];

const domainColors = {
  HCI: {
    bg: "rgba(37,99,235,0.08)",
    text: "#2563eb",
    border: "rgba(37,99,235,0.2)",
  },
  design: {
    bg: "rgba(219,39,119,0.08)",
    text: "#db2777",
    border: "rgba(219,39,119,0.2)",
  },
  thinking: {
    bg: "rgba(217,119,6,0.08)",
    text: "#d97706",
    border: "rgba(217,119,6,0.2)",
  },
  psychology: {
    bg: "rgba(124,58,237,0.08)",
    text: "#7c3aed",
    border: "rgba(124,58,237,0.2)",
  },
  systems: {
    bg: "rgba(5,150,105,0.08)",
    text: "#059669",
    border: "rgba(5,150,105,0.2)",
  },
  building: {
    bg: "rgba(8,145,178,0.08)",
    text: "#0891b2",
    border: "rgba(8,145,178,0.2)",
  },
};

export default function ConceptInventory() {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState(null);
  const [search, setSearch] = useState("");
  const domains = [...new Set(concepts.map((c) => c.domain))];

  const filtered = concepts
    .filter((c) => !filter || c.domain === filter)
    .filter(
      (c) =>
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()),
    );

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
      <style>{`* { box-sizing:border-box;margin:0;padding:0; } input{outline:none;font-family:system-ui,sans-serif;}`}</style>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
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
            mental models;
          </p>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            Concept Inventory ▤
          </h1>
          <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
            Every mental model, framework, and lens I actively use to think. Not
            a reading list - the residue of what actually stuck.
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search concepts..."
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.1)",
            fontSize: 13,
            marginBottom: 14,
            background: "#fff",
          }}
        />

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
            all ({concepts.length})
          </button>
          {domains.map((d) => {
            const c = domainColors[d] ?? domainColors.building;
            return (
              <button
                key={d}
                onClick={() => setFilter(filter === d ? null : d)}
                style={{
                  padding: "3px 12px",
                  borderRadius: 999,
                  border: "1px solid",
                  fontFamily: "monospace",
                  fontSize: 10,
                  cursor: "pointer",
                  background: filter === d ? c.bg : "transparent",
                  borderColor: filter === d ? c.border : "rgba(0,0,0,0.1)",
                  color: filter === d ? c.text : "#9ca3af",
                }}
              >
                {d}
              </button>
            );
          })}
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          {filtered.map((concept) => {
            const c = domainColors[concept.domain] ?? domainColors.building;
            const isOpen = expanded === concept.id;
            return (
              <div
                key={concept.id}
                onClick={() => setExpanded(isOpen ? null : concept.id)}
                style={{
                  padding: "14px 18px",
                  background: "#fff",
                  border: `1px solid ${isOpen ? c.border : "rgba(0,0,0,0.08)"}`,
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    marginBottom: isOpen ? 12 : 0,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 4,
                      }}
                    >
                      <p style={{ fontWeight: 600, fontSize: 14 }}>
                        {concept.name}
                      </p>
                      <span
                        style={{
                          fontSize: 9,
                          fontFamily: "monospace",
                          padding: "1px 7px",
                          borderRadius: 999,
                          background: c.bg,
                          border: `1px solid ${c.border}`,
                          color: c.text,
                        }}
                      >
                        {concept.domain}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "monospace",
                        fontSize: 10,
                        color: "#c4b5fd",
                      }}
                    >
                      {concept.origin}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 2,
                      flexShrink: 0,
                      alignItems: "center",
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div
                        key={s}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 1,
                          background:
                            s <= concept.strength ? c.text : "rgba(0,0,0,0.08)",
                        }}
                      />
                    ))}
                  </div>
                </div>
                {isOpen && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 13,
                        color: "#4b5563",
                        lineHeight: 1.7,
                      }}
                    >
                      {concept.description}
                    </p>
                    <div
                      style={{
                        padding: "10px 12px",
                        background: c.bg,
                        borderRadius: 8,
                        border: `1px solid ${c.border}`,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "monospace",
                          fontSize: 9,
                          color: c.text,
                          letterSpacing: "0.12em",
                          marginBottom: 4,
                        }}
                      >
                        HOW I USE IT
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: "#4b5563",
                          lineHeight: 1.6,
                        }}
                      >
                        {concept.usedFor}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
