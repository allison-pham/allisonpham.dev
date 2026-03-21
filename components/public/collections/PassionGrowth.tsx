"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Target, Sparkles, ChevronDown } from "lucide-react"

type HobbyTab = "current" | "past" | "future"
type HobbyLevel = "emerging" | "growing" | "thriving"

interface PassionItem {
  id: string
  passion: string
  icon: React.ReactNode
  level: HobbyLevel
  progress: number
  description: string
  startedYear: string
  notes: string
  milestones: { label: string; done: boolean }[]
}

const hobbyGroups: Record<HobbyTab, PassionItem[]> = {
  current: [
    {
      id: "chess",
      passion: "Chess",
      icon: <Target className="h-5 w-5" />,
      level: "growing",
      progress: 35,
      description: "",
      startedYear: "",
      notes: [
        "The queen ♛ & bishop ♝ are my go to's",
        "Love the strategic aspect!",
      ].join("\n"),
      milestones: [
        { label: "Further learn chess strategies (for classic + endgame)", done: false },
      ],
    },
  ],
  past: [],
  future: [],
}

const levelConfig: Record<HobbyLevel, { badge: string }> = {
  emerging: { badge: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30" },
  growing: { badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30" },
  thriving: { badge: "bg-primary/10 text-primary border-primary/30" },
}

const hobbyTabLabels: Record<HobbyTab, string> = {
  current: "Current Pursuits",
  past: "Archives",
  future: "Future",
}

const levelFilters: Array<"all" | HobbyLevel> = ["all", "emerging", "growing", "thriving"]

const levelFilterStyles: Record<"all" | HobbyLevel, string> = {
  all: "border-primary/30 bg-primary/10 text-primary",
  emerging: "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  growing: "border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  thriving: "border-primary/30 bg-primary/10 text-primary",
}

export function PassionGrowth() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<HobbyTab>("current")
  const [levelFilter, setLevelFilter] = useState<"all" | HobbyLevel>("all")
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const hobbyTabs: HobbyTab[] = ["current", "past", "future"]
  const tabPassions = hobbyGroups[activeTab]
  const filteredPassions = levelFilter === "all"
    ? tabPassions
    : tabPassions.filter((passion) => passion.level === levelFilter)

  return (
    <section ref={ref} className="relative px-4 sm:px-6 pt-16 sm:pt-16 pb-8 sm:pb-12">
      <div className={cn("mx-auto w-full max-w-7xl opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
        <div className="space-y-2 mb-8">
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">
            hobbies & passions;
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Passion Growth ‧₊˚♪ 𝄞₊˚⊹</h2>
          <p className="w-full text-base sm:text-lg text-muted-foreground leading-relaxed">
            Side quests (years of hobbies) + how I pursue them (projects, learning, & more).
            Tracking the evolution of interests over time.
            Hobbies & interests that keep exploration alive & life interesting.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {levelFilters.map((filter) => {
            const count = filter === "all"
              ? tabPassions.length
              : tabPassions.filter((passion) => passion.level === filter).length

            return (
              <button
                key={filter}
                onClick={() => {
                  setLevelFilter(filter)
                  setExpandedId(null)
                }}
                className={cn(
                  "rounded-lg border px-3 py-1.5 font-mono text-xs tracking-widest",
                  levelFilter === filter
                    ? levelFilterStyles[filter]
                    : "border-border/50 bg-card/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {filter} ({count})
              </button>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-6">
          <aside className={cn(
            "rounded-xl border border-border bg-card/40 glass p-3 space-y-1 opacity-0 h-fit",
            isVisible && "animate-fade-in-up"
          )} style={{ animationDelay: "120ms" }}>
            {hobbyTabs.map((tab) => {
              const count = hobbyGroups[tab].length

              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    setLevelFilter("all")
                    setExpandedId(null)
                  }}
                  className={cn(
                    "flex items-center justify-between gap-3 w-full px-3 py-2.5 rounded-lg font-mono text-xs border",
                    activeTab === tab
                      ? "bg-primary/15 text-primary border-primary/30"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground border-transparent"
                  )}
                >
                  <span>{hobbyTabLabels[tab]}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{count}</span>
                </button>
              )
            })}
          </aside>

          <div className="rounded-xl border border-border bg-card/40 glass overflow-hidden flex flex-col lg:self-start">
            <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-6 py-4">
              <span className="font-mono text-sm font-medium">{hobbyTabLabels[activeTab]}</span>
              <span className="font-mono text-xs text-muted-foreground">{filteredPassions.length} hobbies</span>
            </div>

            <div className="p-6">
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredPassions.map((passion) => (
                  <div
                    key={passion.id}
                    className={cn(
                      "group rounded-xl border border-border bg-card/40 glass overflow-hidden",
                      expandedId === passion.id && "border-primary/50 bg-primary/5"
                    )}
                  >
                    <button
                      onClick={() => setExpandedId(expandedId === passion.id ? null : passion.id)}
                      className="w-full p-5 text-left hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="-ml-1 p-2 rounded-lg bg-primary/10 text-primary shrink-0">{passion.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-bold whitespace-nowrap truncate">{passion.passion}</h3>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className={cn("px-2 py-0.5 rounded-full border font-mono text-[10px]", levelConfig[passion.level].badge)}>
                                {passion.level}
                              </span>
                              <ChevronDown
                                className={cn(
                                  "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                                  expandedId === passion.id && "rotate-180 text-primary"
                                )}
                              />
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{passion.description}</p>
                        </div>
                      </div>

                      <div className="flex min-w-0 items-center gap-2">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/80 relative">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-700 ease-out",
                              passion.progress === 100
                                ? "bg-emerald-300"
                                : passion.progress >= 75
                                  ? "bg-lime-300"
                                  : passion.progress >= 50
                                    ? "bg-yellow-300"
                                    : passion.progress >= 25
                                      ? "bg-amber-300"
                                      : passion.progress > 0
                                        ? "bg-orange-300"
                                        : "bg-zinc-300"
                            )}
                            style={{ width: `${Math.max(passion.progress, 5)}%` }}
                          />
                        </div>
                        <span className="w-10 shrink-0 text-left font-mono tabular-nums text-xs text-muted-foreground">
                          {passion.progress}%
                        </span>
                      </div>
                    </button>

                    {expandedId === passion.id && (
                      <div className="px-5 pb-5 border-t border-border/50 pt-4 space-y-4">
                        <div className={cn(
                          "flex items-center text-xs text-muted-foreground",
                          passion.startedYear.trim() ? "justify-between" : "justify-end"
                        )}>
                          {passion.startedYear.trim() && <span className="font-mono">Started: {passion.startedYear}</span>}
                        </div>

                        {passion.notes.trim() && (
                          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                            <p className="font-mono text-[10px] tracking-widest text-primary mb-1 flex items-center gap-1">
                              <Sparkles className="h-3 w-3" />
                              Notes
                            </p>
                            <div className="space-y-1.5">
                              {passion.notes
                                .split("\n")
                                .map((note) => note.trim())
                                .filter(Boolean)
                                .map((note, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    <span className="text-sm text-muted-foreground leading-relaxed">{note}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <p className="font-mono text-[10px] tracking-widest text-primary flex items-center gap-1">
                              <Sparkles className="h-3 w-3" />
                              Milestone Tracker
                            </p>
                            <span className="font-mono text-[10px] text-primary">
                              {passion.milestones.filter((m) => m.done).length}/{passion.milestones.length} done
                            </span>
                          </div>
                          <div className="space-y-1.5">
                            {passion.milestones.map((milestone, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <div className={cn(
                                  "mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                                  milestone.done
                                    ? "border-primary bg-primary"
                                    : "border-muted-foreground/30"
                                )}>
                                  {milestone.done && (
                                    <svg
                                      className="w-2.5 h-2.5 text-primary-foreground"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={3}
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className={cn(
                                  "text-sm",
                                  milestone.done ? "text-muted-foreground line-through" : ""
                                )}>
                                  {milestone.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {filteredPassions.length === 0 && (
                  <div className="sm:col-span-2 xl:col-span-3 rounded-xl border border-dashed border-border/50 bg-card/20 p-6 text-center">
                    <p className="font-mono text-xs tracking-wider text-muted-foreground mb-1">No hobbies in this tab yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
