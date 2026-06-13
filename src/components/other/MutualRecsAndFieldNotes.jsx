"use client";
import { useState } from "react";

const myRecs = [
  {
    id: "flow",
    type: "book",
    title: "Flow",
    author: "Mihály Csíkszentmihályi",
    reason:
      "Changed how I think about design. The autotelic experience is what every interface should aim for.",
    tag: "psychology",
  },
  {
    id: "everyday-things",
    type: "book",
    title: "The Design of Everyday Things",
    author: "Donald Norman",
    reason:
      "Read this before you design anything. Affordance theory lives rent-free in my head permanently.",
    tag: "design",
  },
  {
    id: "obsidian",
    type: "tool",
    title: "Obsidian",
    author: "tool",
    reason:
      "For networked notes. The graph view changed how I think about connecting ideas. Free, local-first, yours forever.",
    tag: "tools",
  },
  {
    id: "excalidraw",
    type: "tool",
    title: "Excalidraw",
    author: "tool",
    reason:
      "Lowest friction whiteboard I've found. Great for thinking out loud with sketches before code.",
    tag: "tools",
  },
  {
    id: "hci-nasa",
    type: "paper",
    title: "Computer Human Interface Challenges in Space Exploration",
    author: "NASA NTRS",
    reason:
      "Core to my research. A survey of interaction design for extreme environments. ntrs.nasa.gov",
    tag: "research",
  },
];

const visitorRecs = [
  {
    id: "v1",
    submittedBy: "a visitor from Berlin",
    type: "book",
    title: "The Design of Design",
    author: "Frederick Brooks",
    reason:
      "Pairs well with Norman. Brooks on why design problems are inherently wicked.",
    tag: "design",
    time: "2 days ago",
  },
  {
    id: "v2",
    submittedBy: "a visitor from Tokyo",
    type: "tool",
    title: "Raycast",
    author: "tool",
    reason:
      "If you're building keyboard shortcuts into your site, you'll love Raycast for the same reason. Launcher that gets out of the way.",
    tag: "tools",
    time: "5 days ago",
  },
  {
    id: "v3",
    submittedBy: "a visitor from NYC",
    type: "book",
    title: "Thinking in Systems",
    author: "Donella Meadows",
    reason:
      "You mentioned systems thinking a lot. This is the canonical book. The bathtub metaphor will break your brain.",
    tag: "systems",
    time: "1 week ago",
  },
];

const collabNotes = [
  {
    id: "cn1",
    note: "The autotelic experience Csíkszentmihályi describes is exactly what I feel when I'm deep in a debugging session that's going well. Never connected those two things before.",
    location: "London",
    time: "3 hours ago",
  },
  {
    id: "cn2",
    note: "HCI for astronauts and HCI for surgeons feel like they must share a lot. Have you looked at surgical interface research?",
    location: "Boston",
    time: "yesterday",
  },
  {
    id: "cn3",
    note: "The constellation map is the first website feature I've seen that made me rethink how I organize my own notes. Going to try this format.",
    location: "Singapore",
    time: "2 days ago",
  },
  {
    id: "cn4",
    note: "Reading your space log and thinking about how much of interface design is just designing for the wrong assumptions about the user's context.",
    location: "Amsterdam",
    time: "3 days ago",
  },
  {
    id: "cn5",
    note: "Force-directed graphs for knowledge maps. I've been looking for the right metaphor for six months. This is it.",
    location: "Melbourne",
    time: "1 week ago",
  },
];

const tagColors = {
  psychology: {
    bg: "rgba(124,58,237,0.08)",
    text: "#7c3aed",
    border: "rgba(124,58,237,0.2)",
  },
  design: {
    bg: "rgba(219,39,119,0.08)",
    text: "#db2777",
    border: "rgba(219,39,119,0.2)",
  },
  tools: {
    bg: "rgba(5,150,105,0.08)",
    text: "#059669",
    border: "rgba(5,150,105,0.2)",
  },
  research: {
    bg: "rgba(37,99,235,0.08)",
    text: "#2563eb",
    border: "rgba(37,99,235,0.2)",
  },
  systems: {
    bg: "rgba(217,119,6,0.08)",
    text: "#d97706",
    border: "rgba(217,119,6,0.2)",
  },
};

export default function MutualRecsAndFieldNotes() {
  const [tab, setTab] = useState("mutual");
  const [myRec, setMyRec] = useState(null);
  const [form, setForm] = useState({
    title: "",
    type: "book",
    reason: "",
    tag: "design",
  });
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [noteSubmitted, setNoteSubmitted] = useState(false);
  const [notes, setNotes] = useState(collabNotes);
  const [visRecs, setVisRecs] = useState(visitorRecs);
  const [step, setStep] = useState(1);

  const handleRecSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const random = myRecs[Math.floor(Math.random() * myRecs.length)];
    setMyRec(random);
    setVisRecs((prev) => [
      {
        id: Date.now(),
        submittedBy: "you",
        type: form.type,
        title: form.title,
        reason: form.reason,
        tag: form.tag,
        time: "just now",
      },
      ...prev,
    ]);
    setSubmitted(true);
    setStep(3);
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    setNotes((prev) => [
      { id: Date.now(), note: note.trim(), location: "you", time: "just now" },
      ...prev,
    ]);
    setNote("");
    setNoteSubmitted(true);
    setTimeout(() => setNoteSubmitted(false), 3000);
  };

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
      <style>{`* { box-sizing:border-box;margin:0;padding:0; } textarea,input,select{font-family:system-ui,sans-serif;outline:none;}`}</style>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
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
            exchange;
          </p>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            Mutual Recs + Field Notes ◈
          </h1>
          <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
            Leave a recommendation, get one back. Or just leave a thought in the
            collective field notes.
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
            ["mutual", "🔄 mutual recs"],
            ["field", "📋 field notes"],
          ].map(([v, label]) => (
            <button
              key={v}
              onClick={() => setTab(v)}
              style={{
                background: tab === v ? "rgba(124,58,237,0.12)" : "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: 11,
                padding: "6px 16px",
                borderRadius: 8,
                color: tab === v ? "#7c3aed" : "#9ca3af",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "mutual" && (
          <div>
            {step === 1 && (
              <div>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "#9ca3af",
                    marginBottom: 20,
                  }}
                >
                  Leave a recommendation - a book, tool, paper, or idea - and
                  I'll give you one of mine back.
                </p>
                <form
                  onSubmit={() => setStep(2)}
                  style={{
                    padding: "20px 24px",
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 14,
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 10,
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <label
                        style={{
                          fontFamily: "monospace",
                          fontSize: 9,
                          color: "#9ca3af",
                          display: "block",
                          marginBottom: 6,
                        }}
                      >
                        TYPE
                      </label>
                      <select
                        value={form.type}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, type: e.target.value }))
                        }
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          borderRadius: 8,
                          border: "1px solid rgba(0,0,0,0.1)",
                          fontSize: 13,
                          background: "#fafafa",
                        }}
                      >
                        <option value="book">Book</option>
                        <option value="tool">Tool</option>
                        <option value="paper">Paper</option>
                        <option value="idea">Idea</option>
                      </select>
                    </div>
                    <div>
                      <label
                        style={{
                          fontFamily: "monospace",
                          fontSize: 9,
                          color: "#9ca3af",
                          display: "block",
                          marginBottom: 6,
                        }}
                      >
                        CATEGORY
                      </label>
                      <select
                        value={form.tag}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, tag: e.target.value }))
                        }
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          borderRadius: 8,
                          border: "1px solid rgba(0,0,0,0.1)",
                          fontSize: 13,
                          background: "#fafafa",
                        }}
                      >
                        {Object.keys(tagColors).map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label
                      style={{
                        fontFamily: "monospace",
                        fontSize: 9,
                        color: "#9ca3af",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      TITLE
                    </label>
                    <input
                      required
                      value={form.title}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, title: e.target.value }))
                      }
                      placeholder="What are you recommending?"
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid rgba(0,0,0,0.1)",
                        fontSize: 13,
                        background: "#fafafa",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label
                      style={{
                        fontFamily: "monospace",
                        fontSize: 9,
                        color: "#9ca3af",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      WHY (optional)
                    </label>
                    <textarea
                      value={form.reason}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, reason: e.target.value }))
                      }
                      placeholder="Why should someone read/use this?"
                      rows={2}
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid rgba(0,0,0,0.1)",
                        fontSize: 13,
                        resize: "none",
                        background: "#fafafa",
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!form.title.trim()}
                    style={{
                      padding: "9px 18px",
                      background: form.title.trim()
                        ? "rgba(124,58,237,0.1)"
                        : "rgba(0,0,0,0.04)",
                      border: "1px solid",
                      borderColor: form.title.trim()
                        ? "rgba(124,58,237,0.3)"
                        : "rgba(0,0,0,0.08)",
                      borderRadius: 8,
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: form.title.trim() ? "#7c3aed" : "#9ca3af",
                      cursor: form.title.trim() ? "pointer" : "default",
                    }}
                  >
                    submit + get a rec back →
                  </button>
                </form>

                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: "#9ca3af",
                    letterSpacing: "0.1em",
                    marginBottom: 12,
                    textTransform: "uppercase",
                  }}
                >
                  From visitors so far
                </p>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  {visitorRecs.map((rec) => {
                    const c = tagColors[rec.tag] ?? tagColors.design;
                    return (
                      <div
                        key={rec.id}
                        style={{
                          padding: "12px 16px",
                          background: "#fff",
                          border: "1px solid rgba(0,0,0,0.08)",
                          borderRadius: 12,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "flex-start",
                            marginBottom: 6,
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: 600, fontSize: 13 }}>
                              {rec.title}
                            </p>
                            {rec.author !== "tool" && (
                              <p
                                style={{
                                  fontFamily: "monospace",
                                  fontSize: 10,
                                  color: "#9ca3af",
                                }}
                              >
                                {rec.author}
                              </p>
                            )}
                          </div>
                          <span
                            style={{
                              fontSize: 9,
                              fontFamily: "monospace",
                              padding: "2px 7px",
                              borderRadius: 999,
                              background: c.bg,
                              border: `1px solid ${c.border}`,
                              color: c.text,
                            }}
                          >
                            {rec.tag}
                          </span>
                        </div>
                        {rec.reason && (
                          <p
                            style={{
                              fontSize: 12,
                              color: "#6b7280",
                              lineHeight: 1.6,
                              marginBottom: 6,
                            }}
                          >
                            {rec.reason}
                          </p>
                        )}
                        <p
                          style={{
                            fontFamily: "monospace",
                            fontSize: 9,
                            color: "#c4b5fd",
                          }}
                        >
                          {rec.submittedBy} · {rec.time}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <form
                  onSubmit={handleRecSubmit}
                  style={{
                    padding: "20px 24px",
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 14,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "monospace",
                      fontSize: 10,
                      color: "#7c3aed",
                      marginBottom: 16,
                    }}
                  >
                    Submitted. Here's a rec from me:
                  </p>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 20px",
                      background: "rgba(124,58,237,0.1)",
                      border: "1px solid rgba(124,58,237,0.3)",
                      borderRadius: 8,
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: "#7c3aed",
                      cursor: "pointer",
                    }}
                  >
                    reveal my recommendation →
                  </button>
                </form>
              </div>
            )}

            {step === 3 && myRec && (
              <div
                style={{
                  padding: "24px 28px",
                  background: "rgba(124,58,237,0.05)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  borderRadius: 14,
                }}
              >
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    color: "#7c3aed",
                    marginBottom: 14,
                  }}
                >
                  My recommendation for you ✦
                </p>
                <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                  {myRec.title}
                </p>
                {myRec.author !== "tool" && (
                  <p
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: "#9ca3af",
                      marginBottom: 10,
                    }}
                  >
                    {myRec.author}
                  </p>
                )}
                <p
                  style={{
                    fontSize: 13,
                    color: "#4b5563",
                    lineHeight: 1.7,
                    marginBottom: 12,
                  }}
                >
                  {myRec.reason}
                </p>
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: (tagColors[myRec.tag] ?? tagColors.design).bg,
                    border: `1px solid ${(tagColors[myRec.tag] ?? tagColors.design).border}`,
                    color: (tagColors[myRec.tag] ?? tagColors.design).text,
                  }}
                >
                  {myRec.tag}
                </span>
                <div style={{ marginTop: 16 }}>
                  <button
                    onClick={() => {
                      setStep(1);
                      setSubmitted(false);
                      setForm({
                        title: "",
                        type: "book",
                        reason: "",
                        tag: "design",
                      });
                      setMyRec(null);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: "#9ca3af",
                    }}
                  >
                    ← leave another
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "field" && (
          <div>
            <div
              style={{
                padding: "16px 20px",
                background: "#fff",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 14,
                marginBottom: 20,
              }}
            >
              {noteSubmitted ? (
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    color: "#059669",
                    textAlign: "center",
                    padding: "8px 0",
                  }}
                >
                  Note added ✦
                </p>
              ) : (
                <form onSubmit={handleNoteSubmit}>
                  <p
                    style={{
                      fontFamily: "monospace",
                      fontSize: 10,
                      color: "#9ca3af",
                      marginBottom: 10,
                    }}
                  >
                    ADD A THOUGHT TO THE COLLECTIVE
                  </p>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="A connection you made, a question this site raised, something you're thinking about..."
                    rows={3}
                    maxLength={280}
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 10,
                        color: "#9ca3af",
                      }}
                    >
                      {280 - note.length} left
                    </span>
                    <button
                      type="submit"
                      disabled={!note.trim()}
                      style={{
                        padding: "7px 16px",
                        background: note.trim()
                          ? "rgba(124,58,237,0.1)"
                          : "rgba(0,0,0,0.04)",
                        border: "1px solid",
                        borderColor: note.trim()
                          ? "rgba(124,58,237,0.3)"
                          : "rgba(0,0,0,0.08)",
                        borderRadius: 8,
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: note.trim() ? "#7c3aed" : "#9ca3af",
                        cursor: note.trim() ? "pointer" : "default",
                      }}
                    >
                      add →
                    </button>
                  </div>
                </form>
              )}
            </div>

            <p
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: "#9ca3af",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              {notes.length} notes in the collective
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {notes.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: "14px 18px",
                    background: "#fff",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 12,
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      color: "#374151",
                      lineHeight: 1.7,
                      marginBottom: 8,
                    }}
                  >
                    {n.note}
                  </p>
                  <div style={{ display: "flex", gap: 10 }}>
                    {n.location !== "you" && (
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: 10,
                          color: "#9ca3af",
                        }}
                      >
                        📍 {n.location}
                      </span>
                    )}
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 10,
                        color: "#c4b5fd",
                      }}
                    >
                      {n.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
