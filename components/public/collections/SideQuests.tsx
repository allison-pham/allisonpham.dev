"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  Camera, Music, Plane, Coffee, Dumbbell,
  Palette, ChefHat, Mountain, Book, Sparkles
} from "lucide-react"

interface SideQuest {
  id: string
  title: string
  icon: React.ReactNode
  status: "active" | "dormant" | "completed"
  description: string
  started: string
  milestones: { label: string; done: boolean }[]
  currentFocus?: string
  gallery?: string[]
}

const sideQuests: SideQuest[] = [
  {
    id: "music",
    title: "Music",
    icon: <Music className="h-5 w-5" />,
    status: "active",
    description: "",
    started: "Before 2015",
    currentFocus: "",
    milestones: [
      { label: "Perform instruments", done: true },
    ],
  },
]

export function SideQuests() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "active" | "dormant">("all")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const filteredQuests = filter === "all"
    ? sideQuests
    : sideQuests.filter((q) => q.status === filter)

  const statusColors = {
    active: "bg-primary/10 text-primary border-primary/30",
    dormant: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    completed: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30",
  }

  return (
    <section ref={ref} className="relative px-4 sm:px-6 pt-16 sm:pt-16 pb-8 sm:pb-12">
      <div className={cn("mx-auto w-full max-w-7xl opacity-0", isVisible && "animate-fade-in-up")}>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Side Quests</h2>
        </div>
        <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Hobbies & interests that keep exploration alive & life interesting.
        </p>

        {/* Filter */}
        <div className="flex gap-2 mb-8">
          {(["all", "active", "dormant"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-full font-mono text-[10px] tracking-wider transition-all",
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Quests Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredQuests.map((quest, i) => {
            const completedMilestones = quest.milestones.filter((m) => m.done).length
            const progress = Math.round((completedMilestones / quest.milestones.length) * 100)

            return (
              <div
                key={quest.id}
                className={cn(
                  "rounded-xl border border-border bg-card/40 glass overflow-hidden opacity-0",
                  isVisible && "animate-fade-in-up",
                )}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <button
                  onClick={() => setExpandedId(expandedId === quest.id ? null : quest.id)}
                  className="w-full p-4 text-left hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      {quest.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold">{quest.title}</h3>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full border font-mono text-[9px]",
                          statusColors[quest.status]
                        )}>
                          {quest.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{quest.description}</p>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {completedMilestones}/{quest.milestones.length} milestones
                          </span>
                          <span className="font-mono text-[10px] text-primary">{progress}%</span>
                        </div>
                        <div className="h-1 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                {expandedId === quest.id && (
                  <div className="px-4 pb-4 border-t border-border/50 pt-4 space-y-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-mono">Started: {quest.started}</span>
                    </div>

                    {quest.currentFocus && (
                      <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                        <p className="font-mono text-[10px] tracking-widest text-primary mb-1 flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          Current Focus
                        </p>
                        <p className="text-sm">{quest.currentFocus}</p>
                      </div>
                    )}

                    <div>
                      <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2">Milestones</p>
                      <div className="space-y-1.5">
                        {quest.milestones.map((milestone, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className={cn(
                              "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                              milestone.done
                                ? "border-primary bg-primary"
                                : "border-muted-foreground/30"
                            )}>
                              {milestone.done && (
                                <svg className="w-2.5 h-2.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
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
            )
          })}
        </div>
      </div>
    </section>
  )
}