"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { BookOpen, Compass, FolderGit2, Headphones, Lightbulb, Rocket, Star } from "lucide-react"

type MemoryTone = "origin" | "craft" | "pivot" | "growth" | "future"

interface MemoryNode {
  id: number
  label: string
  title: string
  year: string
  tone: MemoryTone
  icon: React.ElementType
  x: string
  y: string
  detail: string
}

const toneClasses: Record<MemoryTone, { chip: string; ring: string; glow: string }> = {
  origin: {
    chip: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    ring: "ring-cyan-500/35",
    glow: "from-cyan-500/20 to-transparent",
  },
  craft: {
    chip: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    ring: "ring-amber-500/35",
    glow: "from-amber-500/20 to-transparent",
  },
  pivot: {
    chip: "text-rose-400 bg-rose-500/10 border-rose-500/30",
    ring: "ring-rose-500/35",
    glow: "from-rose-500/20 to-transparent",
  },
  growth: {
    chip: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    ring: "ring-emerald-500/35",
    glow: "from-emerald-500/20 to-transparent",
  },
  future: {
    chip: "text-primary bg-primary/10 border-primary/30",
    ring: "ring-primary/35",
    glow: "from-primary/20 to-transparent",
  },
}

// Photos, places, tools, people
const memoryNodes: MemoryNode[] = [
  {
    id: 1,
    label: "Object 01",
    title: "Old Notebook",
    year: "20XX",
    tone: "origin",
    icon: BookOpen,
    x: "12%",
    y: "32%",
    detail: "The first place I wrote ideas that actually made me feel like I had a direction.",
  },

  {
    id: 2,
    label: "Object 02",
    title: "Messy Repo",
    year: "20XX",
    tone: "craft",
    icon: FolderGit2,
    x: "30%",
    y: "67%",
    detail: "A chaotic project that taught me more than any polished portfolio piece ever could.",
  },

  {
    id: 3,
    label: "Object 03",
    title: "Train Ticket",
    year: "20XX",
    tone: "pivot",
    icon: Compass,
    x: "48%",
    y: "24%",
    detail: "A decision to say yes to something uncertain. That detour became the real path.",
  },

  {
    id: 4,
    label: "Object 04",
    title: "Late-Night Playlist",
    year: "20XX",
    tone: "growth",
    icon: Headphones,
    x: "66%",
    y: "58%",
    detail: "Hours of focused work and reflection; this is where consistency started to compound.",
  },

  {
    id: 5,
    label: "Object 05",
    title: "Unsent Pitch",
    year: "20XX",
    tone: "pivot",
    icon: Lightbulb,
    x: "80%",
    y: "30%",
    detail: "A bold idea I almost never shipped. Even unrealized, it changed what I believed possible.",
  },

  {
    id: 6,
    label: "Object 06",
    title: "Current Build",
    year: "now",
    tone: "future",
    icon: Rocket,
    x: "85%",
    y: "72%",
    detail: "This chapter is still loading. Replace with what you are building right now.",
  },
]

export function TimelineMemoryMap() {
  const [activeId, setActiveId] = useState<number>(memoryNodes[0]?.id ?? 1)

  const activeNode = useMemo(
    () => memoryNodes.find((node) => node.id === activeId) ?? memoryNodes[0],
    [activeId],
  )

  return (
    <section className="px-4 sm:px-6 py-20 border-t border-border/40">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-4">
          <p className="font-mono text-xs tracking-[0.35em] text-primary">memory mode / origin story;</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Memory Field</h2>
          <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Room of artifacts (interactive). Click any object to reveal a chapter.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <div className="relative rounded-3xl border border-border bg-card/40 glass overflow-hidden min-h-107.5 sm:min-h-130">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.75_0.18_296/0.09),transparent_45%),radial-gradient(circle_at_80%_70%,oklch(0.76_0.18_220/0.08),transparent_40%),linear-gradient(to_bottom,transparent,oklch(0.1_0.01_285/0.15))]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.5_0.01_285/0.1)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.5_0.01_285/0.1)_1px,transparent_1px)] bg-size-[36px_36px] opacity-25" />

            <div className="relative h-full w-full">
              {memoryNodes.map((node) => {
                const Icon = node.icon
                const isActive = activeId === node.id
                const tone = toneClasses[node.tone]

                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveId(node.id)}
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 backdrop-blur-sm transition-all duration-300",
                      "hover:scale-[1.03] active:scale-[0.98]",
                      tone.chip,
                      isActive ? `ring-2 ${tone.ring} shadow-xl` : "ring-0",
                    )}
                    style={{ left: node.x, top: node.y }}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5" />
                      <span className="font-mono text-[10px] tracking-wider">{node.label}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <aside className="rounded-3xl border border-border bg-card/45 glass p-6 sm:p-7">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs tracking-wider text-muted-foreground">Selected Memory</p>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                  <Star className="h-3.5 w-3.5 text-primary/80" />
                  {activeNode?.year}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight">{activeNode?.title}</h3>
                <p className="text-sm text-foreground/85 leading-relaxed">{activeNode?.detail}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                {memoryNodes.map((node) => {
                  const isActive = activeId === node.id
                  const tone = toneClasses[node.tone]
                  return (
                    <button
                      key={`dot-${node.id}`}
                      type="button"
                      onClick={() => setActiveId(node.id)}
                      className={cn(
                        "h-9 rounded-xl border text-[10px] font-mono tracking-wider uppercase transition-all",
                        isActive ? `${tone.chip} ring-1 ${tone.ring}` : "border-border text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {node.id}
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
