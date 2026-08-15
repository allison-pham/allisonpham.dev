"use client";
import { useState } from "react";

interface DayData {
  date: string;
  activity: number;
  isPast: boolean;
}

interface Tracker {
  id: string;
  label: string;
  emoji: string;
  color: string;
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  data: DayData[][];
  source?: string;
  description?: string;
}

function generateData(density = 0.6): DayData[][] {
  const weeks: DayData[][] = [];
  const today = new Date();
  for (let w = 51; w >= 0; w--) {
    const days: DayData[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));
      const isPast = date <= today;
      const rand = Math.random();
      const activity = !isPast ? 0 : w > 40 ? (rand > 1 - density * 0.5 ? 0 : Math.ceil(rand * 3)) : w > 20 ? (rand > 1 - density * 0.7 ? 0 : Math.ceil(rand * 4)) : rand > 1 - density ? Math.ceil(rand * 4) : 0;
      days.push({ date: date.toISOString().split("T")[0], activity, isPast });
    }
    weeks.push(days);
  }
  return weeks;
}

// Individual habit trackers
const habitTrackers: Tracker[] = [
  { id: "reading", label: "Reading", emoji: "📚", color: "#7c3aed", currentStreak: 8, longestStreak: 23, totalDays: 94, data: generateData(0.65), description: "Daily reading sessions" },
  { id: "sketching", label: "Sketching", emoji: "✏️", color: "#db2777", currentStreak: 3, longestStreak: 14, totalDays: 47, data: generateData(0.45), description: "Sketching & wireframing" },
  { id: "tea", label: "Tea ritual", emoji: "🍵", color: "#d97706", currentStreak: 31, longestStreak: 62, totalDays: 180, data: generateData(0.85), description: "175°F exactly, every day" },
  { id: "writing", label: "Writing", emoji: "✍️", color: "#059669", currentStreak: 5, longestStreak: 19, totalDays: 63, data: generateData(0.5), description: "Field notes & brain dumps" },
];

type TabId = string;

interface Tab {
  id: TabId;
  label: string;
  emoji: string;
  color: string;
  trackers: Tracker[];
}

const ALL_TABS: Tab[] = [
  {
    id: "overall",
    label: "Overall",
    emoji: "◎",
    color: "#7c3aed",
    trackers: [{ id: "overall", label: "Overall", emoji: "◎", color: "#7c3aed", currentStreak: 12, longestStreak: 31, totalDays: 384, data: generateData(0.75) }],
  },
  {
    id: "code",
    label: "Code",
    emoji: "⬡",
    color: "#2563eb",
    trackers: [{ id: "code", label: "Code", emoji: "⬡", color: "#2563eb", currentStreak: 6, longestStreak: 31, totalDays: 142, data: generateData(0.7) }],
  },
  {
    id: "design",
    label: "Design",
    emoji: "◻",
    color: "#db2777",
    trackers: [{ id: "design", label: "Design", emoji: "◻", color: "#db2777", currentStreak: 5, longestStreak: 18, totalDays: 87, data: generateData(0.6) }],
  },
  ...habitTrackers.map((t) => ({
    id: t.id,
    label: t.label,
    emoji: t.emoji,
    color: t.color,
    trackers: [t],
  })),
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function hexToAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function StreakTracker() {
  const [activeTab, setActiveTab] = useState<TabId>("overall");
  const [hovered, setHovered] = useState<DayData | null>(null);

  const tab = ALL_TABS.find((t) => t.id === activeTab) ?? ALL_TABS[0];

  // Derive display data from tab
  const grid = tab.trackers[0].data;
  const color = tab.color;
  const currentStreak = tab.trackers[0].currentStreak;
  const longestStreak = tab.trackers[0].longestStreak;
  const totalDays = tab.trackers[0].totalDays;

  const getColor = (activity: number) => (activity === 0 ? "rgba(0,0,0,0.05)" : hexToAlpha(color, 0.15 + (activity / 4) * 0.75));

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", background: "#f8f7ff", minHeight: "100vh", padding: "2rem 1rem", color: "#1a1a2e" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.25em", color: "#7c3aed", marginBottom: 6 }}>consistency;</p>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>Streak Tracker ◎</h1>
          <p style={{ color: "#6b7280", fontSize: 14 }}>GitHub-style contribution graphs across habits, code, and design.</p>
        </div>

        {/* Tab row - all tabs same style */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {ALL_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id);
                setHovered(null);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                borderRadius: 10,
                border: "1px solid",
                cursor: "pointer",
                transition: "all 0.15s",
                background: activeTab === t.id ? t.color + "18" : "#fff",
                borderColor: activeTab === t.id ? t.color + "60" : "rgba(0,0,0,0.08)",
                color: activeTab === t.id ? t.color : "#6b7280",
              }}
            >
              <span style={{ fontSize: 14 }}>{t.emoji}</span>
              <span style={{ fontFamily: "monospace", fontSize: 11 }}>{t.label}</span>
              {activeTab === t.id && <span style={{ fontFamily: "monospace", fontSize: 10, background: t.color + "25", borderRadius: 999, padding: "1px 6px" }}>{t.trackers[0].currentStreak}🔥</span>}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
          {[
            { label: "current streak", value: `${currentStreak} days` },
            { label: "longest streak", value: `${longestStreak} days` },
            { label: "total days", value: totalDays },
          ].map((s) => (
            <div key={s.label} style={{ padding: "14px 16px", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, textAlign: "center" }}>
              <p style={{ fontSize: 20, fontWeight: 700, color, marginBottom: 3 }}>{s.value}</p>
              <p style={{ fontFamily: "monospace", fontSize: 9, color: "#9ca3af", letterSpacing: "0.1em" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Contribution grid */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)", padding: "20px 24px" }}>
          <div style={{ display: "flex", gap: 3, overflowX: "auto" }}>
            {grid.map((week, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {week.map((day, di) => (
                  <div
                    key={di}
                    onMouseEnter={() => setHovered(day)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 2,
                      background: getColor(day.activity),
                      cursor: day.activity > 0 ? "pointer" : "default",
                      transition: "transform 0.1s",
                      transform: hovered?.date === day.date ? "scale(1.3)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            {months.map((m) => (
              <span key={m} style={{ fontFamily: "monospace", fontSize: 9, color: "#9ca3af" }}>
                {m}
              </span>
            ))}
          </div>

          {hovered ? (
            <div style={{ marginTop: 8, fontFamily: "monospace", fontSize: 11, color: "#9ca3af" }}>
              {hovered.date} · {hovered.activity === 0 ? "no activity" : `${hovered.activity} session${hovered.activity > 1 ? "s" : ""}`}
            </div>
          ) : (
            <div style={{ marginTop: 8, height: 16 }} />
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
            <span style={{ fontFamily: "monospace", fontSize: 9, color: "#9ca3af" }}>less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <div key={l} style={{ width: 11, height: 11, borderRadius: 2, background: getColor(l) }} />
            ))}
            <span style={{ fontFamily: "monospace", fontSize: 9, color: "#9ca3af" }}>more</span>
          </div>
        </div>
      </div>
    </div>
  );
}
