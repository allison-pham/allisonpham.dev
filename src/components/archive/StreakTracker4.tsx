"use client";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/src/lib/core-features/utils";

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

const habitTrackers: Tracker[] = [
  { id: "reading", label: "Reading", emoji: "📚", color: "#059669", currentStreak: 8, longestStreak: 23, totalDays: 94, data: generateData(0.65), description: "Daily reading sessions" },
  { id: "writing", label: "Writing", emoji: "✍️", color: "#db2777", currentStreak: 5, longestStreak: 19, totalDays: 63, data: generateData(0.5), description: "Field notes & brain dumps" },
  { id: "tea", label: "Tea ritual", emoji: "🍵", color: "#2563eb", currentStreak: 31, longestStreak: 62, totalDays: 180, data: generateData(0.85), description: "175°F exactly, every day" },
  { id: "sketching", label: "Sketching", emoji: "✏️", color: "#db2777", currentStreak: 3, longestStreak: 14, totalDays: 47, data: generateData(0.45), description: "Sketching & wireframing" },
];

const ALL_TABS = [
  { id: "overall", label: "Overall", emoji: "◎", color: "#7c3aed", trackers: [{ id: "overall", label: "Overall", emoji: "◎", color: "#7c3aed", currentStreak: 12, longestStreak: 31, totalDays: 384, data: generateData(0.75) }] },
  { id: "reading", label: "Reading", emoji: "📚", color: "#059669", trackers: [habitTrackers[0]] },
  { id: "writing", label: "Writing", emoji: "✍️", color: "#db2777", trackers: [habitTrackers[1]] },
  { id: "tea", label: "Tea", emoji: "🍵", color: "#2563eb", trackers: [habitTrackers[2]] },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function hexToAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function StreakTracker() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("overall");
  const [hovered, setHovered] = useState<DayData | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const tab = ALL_TABS.find((t) => t.id === activeTab) ?? ALL_TABS[0];
  const { data: grid, color, currentStreak, longestStreak, totalDays } = tab.trackers[0];

  const getColor = (activity: number) => (activity === 0 ? undefined : hexToAlpha(color, 0.15 + (activity / 4) * 0.75));

  const stats = [
    { label: "current streak", value: `${currentStreak} days` },
    { label: "longest streak", value: `${longestStreak} days` },
    { label: "total days", value: totalDays },
  ];

  return (
    <section ref={ref} className="relative px-4 sm:px-6 pt-16 sm:pt-16 pb-8 sm:pb-12">
      <div className={cn("mx-auto w-full max-w-7xl opacity-0", isVisible && "animate-fade-in-up")}>
        {/* Header */}
        <div className="space-y-2 mb-8">
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">consistency;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Streak Tracker</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">GitHub-style contribution graphs across habits, code, and design</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ALL_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id);
                setHovered(null);
              }}
              className={cn(
                "flex items-center gap-1.5 rounded-xl border px-3.5 py-2 font-mono text-xs transition-all duration-150 active:scale-[0.98]",
                activeTab === t.id ? "border-primary/40 bg-primary/10 text-primary" : "border-border/60 bg-card/40 text-muted-foreground hover:border-border hover:text-foreground",
              )}
              style={activeTab === t.id ? { borderColor: t.color + "60", background: t.color + "18", color: t.color } : {}}
            >
              <span className="text-sm">{t.emoji}</span>
              <span>{t.label}</span>
              {activeTab === t.id && (
                <span className="rounded-full px-1.5 py-0.5 font-mono text-[10px]" style={{ background: t.color + "25" }}>
                  {t.trackers[0].currentStreak}🔥
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className={cn("grid grid-cols-3 gap-3 mb-6 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "100ms" }}>
          {stats.map((s, i) => (
            <div key={s.label} className="rounded-xl border border-border/60 bg-card/40 glass px-4 py-3 text-center">
              <p className="text-xl font-bold mb-0.5" style={{ color }}>
                {s.value}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Contribution grid */}
        <div className={cn("rounded-xl border border-border/60 bg-card/40 glass p-5 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "150ms" }}>
          <div className="overflow-x-auto">
            <div className="flex gap-0.5 min-w-max">
              {grid.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-0.5">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      onMouseEnter={() => setHovered(day)}
                      onMouseLeave={() => setHovered(null)}
                      className={cn("w-3 h-3 rounded-sm transition-transform duration-100", day.activity > 0 ? "cursor-pointer" : "cursor-default")}
                      style={{
                        background: getColor(day.activity) ?? "rgba(0,0,0,0.05)",
                        transform: hovered?.date === day.date ? "scale(1.3)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Month labels */}
            <div className="flex justify-between mt-2">
              {MONTHS.map((m) => (
                <span key={m} className="font-mono text-[9px] text-muted-foreground">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Hover tooltip */}
          <div className="mt-3 h-5">
            {hovered ? (
              <p className="font-mono text-[11px] text-muted-foreground">
                {hovered.date} · {hovered.activity === 0 ? "no activity" : `${hovered.activity} session${hovered.activity > 1 ? "s" : ""}`}
              </p>
            ) : null}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1.5 mt-1">
            <span className="font-mono text-[9px] text-muted-foreground">less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <div key={l} className="w-3 h-3 rounded-sm" style={{ background: getColor(l) ?? "rgba(0,0,0,0.05)" }} />
            ))}
            <span className="font-mono text-[9px] text-muted-foreground">more</span>
          </div>
        </div>
      </div>
    </section>
  );
}
