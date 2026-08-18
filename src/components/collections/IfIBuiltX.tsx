"use client";
import { useState } from "react";
import { cn } from "@/src/lib/core-features/utils";

type ConceptStatus = "speculative" | "research-backed" | "in-progress";
type ConceptCategory = "transit" | "space" | "tools";

interface KeyDecision {
  decision: string;
  rationale: string;
}

interface Concept {
  id: string;
  title: string;
  subtitle: string;
  category: ConceptCategory;
  color: string;
  coverEmoji: string;
  problem: string;
  principles: string[];
  keyDecisions: KeyDecision[];
  status: ConceptStatus;
  connection: string;
}

const concepts: Concept[] = [
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
      { decision: "Replace the line map with a journey map", rationale: "Nobody looks at the full subway map when they just need to get from A to B. Show the journey, not the network." },
      { decision: "Live platform conditions as the home screen", rationale: "The question everyone has when they open the app is 'is my train coming?' Answer that before anything else." },
      { decision: "Haptic alerts for connection warnings", rationale: "When you're listening to music and about to miss your transfer, a visual notification doesn't reach you. A distinct haptic pattern does." },
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
    problem: "Current EVA interfaces are adaptations of shirtsleeve-environment tools. The gloves, the lighting, the cognitive load, the life-support noise - none of these conditions were the design environment. They were afterthoughts.",
    principles: [
      "Gloves first. Every interaction must be achievable with a pressurized glove. This eliminates touchscreens, fine motor gestures, and anything requiring bimanual coordination.",
      "Haptic as primary channel. Visual bandwidth is saturated during EVA. Haptic confirmation is the underused high-bandwidth signal.",
      "Fail audibly. In a life-support environment, silent failures are unacceptable. Every critical state change has a distinct audio signature.",
      "Cognitive load budget. An astronaut doing an EVA has a fixed cognitive budget. Every interface element spends some of it. Spend it wisely.",
    ],
    keyDecisions: [
      { decision: "6-gesture vocabulary, not 12", rationale: "Reliability under cognitive load matters more than expressiveness. 6 patterns with 99% accuracy beats 12 at 80%." },
      { decision: "Wrist rotation as primary input axis", rationale: "Proprioceptively available through gloves even when vision is occupied. The most reliable physical signal we found in testing." },
      { decision: "No touchscreen anywhere in the primary interface", rationale: "Tested and eliminated in EVA-05. The mechanical resistance of pressurized gloves makes fine positional control structurally impossible." },
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
      { decision: "Daily note as the primary interface", rationale: "You're always in today. Start there and let everything else connect outward." },
      { decision: "Automatic connection suggestions based on overlap", rationale: "You shouldn't have to remember that two notes are related. The system should notice." },
      { decision: "No folders, ever", rationale: "Folders are a filing cabinet metaphor. Your brain doesn't have filing cabinets. The tool shouldn't either." },
    ],
    status: "speculative",
    connection: "organizing systems hobby",
  },
];

const STATUS_CONFIG: Record<ConceptStatus, { label: string; color: string; bg: string; border: string }> = {
  speculative: { label: "speculative", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/8", border: "border-amber-400/30" },
  "research-backed": { label: "research-backed", color: "text-primary", bg: "bg-primary/8", border: "border-primary/30" },
  "in-progress": { label: "in progress", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/8", border: "border-emerald-500/30" },
};

export function IfIBuiltX() {
  const [active, setActive] = useState<string>(concepts[0].id);
  const concept = concepts.find((c) => c.id === active)!;
  const status = STATUS_CONFIG[concept.status];

  return (
    <section className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 space-y-3">
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">speculative design;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">If I Built X ◈</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">Things that don't exist yet - or exist poorly. How I'd approach them.</p>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-5">
          {/* Sidebar */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {concepts.map((c) => {
              const isActive = active === c.id;
              const s = STATUS_CONFIG[c.status];
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={cn("shrink-0 lg:shrink rounded-xl border p-3.5 text-left transition-all duration-200 min-w-[160px] lg:min-w-0", isActive ? "border-2 bg-card/60" : "border-border/50 bg-card/30 hover:border-border")}
                  style={isActive ? { borderColor: c.color + "50", backgroundColor: c.color + "08" } : {}}
                >
                  <div className="text-xl mb-2">{c.coverEmoji}</div>
                  <p className={cn("font-semibold text-xs leading-snug mb-2", isActive ? "" : "text-foreground")} style={isActive ? { color: c.color } : {}}>
                    {c.title}
                  </p>
                  <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[9px]", s.bg, s.color, s.border)}>{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div className="rounded-2xl border border-border/50 bg-card/40 overflow-hidden">
            <div className="h-1.5" style={{ backgroundColor: concept.color }} />
            <div className="p-6 sm:p-8 space-y-6">
              {/* Header */}
              <div>
                <p className="font-mono text-[10px] text-muted-foreground mb-1">{concept.category}</p>
                <h3 className="text-xl font-bold tracking-tight mb-1">{concept.title}</h3>
                <p className="text-sm text-muted-foreground italic">{concept.subtitle}</p>
              </div>

              {/* Problem */}
              <div>
                <p className="font-mono text-[10px] text-muted-foreground tracking-[0.15em] uppercase mb-2">The Problem</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{concept.problem}</p>
              </div>

              {/* Principles */}
              <div>
                <p className="font-mono text-[10px] text-muted-foreground tracking-[0.15em] uppercase mb-3">Design Principles</p>
                <div className="space-y-2.5">
                  {concept.principles.map((p, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="font-mono text-xs shrink-0 mt-0.5" style={{ color: concept.color }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm text-foreground/80 leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key decisions */}
              <div>
                <p className="font-mono text-[10px] text-muted-foreground tracking-[0.15em] uppercase mb-3">Key Decisions</p>
                <div className="space-y-2.5">
                  {concept.keyDecisions.map((d, i) => (
                    <div key={i} className="rounded-r-lg border-l-2 pl-4 py-2.5 pr-3" style={{ borderColor: concept.color + "40", backgroundColor: concept.color + "06" }}>
                      <p className="font-semibold text-xs mb-1" style={{ color: concept.color }}>
                        → {d.decision}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{d.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="font-mono text-[10px] text-primary/40">connects to: {concept.connection}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
