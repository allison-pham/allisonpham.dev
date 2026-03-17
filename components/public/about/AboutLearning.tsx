"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  Clock, CheckCircle2, Circle, Pause,
  Zap, BookOpen, Code2, Palette, Brain
} from "lucide-react"

interface LearningItem {
  id: string
  title: string
  category: "tech" | "design" | "soft-skills" | "other"
  status: "active" | "queued" | "paused" | "completed"
  progress?: number
  resources?: string[]
  why: string
  startedAt?: string
  completedAt?: string
}

const learningItems: LearningItem[] = [
  {
    id: "1",
    title: "Motion design",
    category: "design",
    status: "active",
    progress: 5,
    why: "Make UI animations feel intentional",
    resources: ["The Illusion of Life"],
    startedAt: "",
  },
]

export function LearningQueue() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "queued" | "completed">("all")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const categoryIcons = {
    tech: <Code2 className="h-3.5 w-3.5" />,
    design: <Palette className="h-3.5 w-3.5" />,
    "soft-skills": <Brain className="h-3.5 w-3.5" />,
    other: <BookOpen className="h-3.5 w-3.5" />,
  }

  const categoryColors = {
    tech: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    design: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
    "soft-skills": "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
    other: "bg-secondary text-muted-foreground border-border",
  }

  const statusIcons = {
    active: <Zap className="h-3.5 w-3.5 text-primary" />,
    queued: <Clock className="h-3.5 w-3.5 text-muted-foreground" />,
    paused: <Pause className="h-3.5 w-3.5 text-yellow-500" />,
    completed: <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />,
  }

  const filteredItems = activeFilter === "all"
    ? learningItems
    : learningItems.filter((item) => item.status === activeFilter)

  const activeCount = learningItems.filter((i) => i.status === "active").length
  const queuedCount = learningItems.filter((i) => i.status === "queued").length
  const completedCount = learningItems.filter((i) => i.status === "completed").length

  return (
    <section ref={ref} className="px-4 sm:px-6 py-16 sm:py-16">
      <div className={cn("mx-auto max-w-7xl opacity-0", isVisible && "animate-fade-in-up")}>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Learning Queue</h2>
        </div>
        <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Actively learning, what's next/upcoming, & completion.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 mb-6">
          <div className="rounded-lg bg-primary/10 border border-primary/30 p-3 text-center">
            <p className="text-2xl font-bold text-primary">{activeCount}</p>
            <p className="font-mono text-[10px] text-muted-foreground">Active</p>
          </div>
          <div className="rounded-lg bg-secondary/50 border border-border p-3 text-center">
            <p className="text-2xl font-bold">{queuedCount}</p>
            <p className="font-mono text-[10px] text-muted-foreground">Queued</p>
          </div>
          <div className="rounded-lg bg-green-500/10 border border-green-500/30 p-3 text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{completedCount}</p>
            <p className="font-mono text-[10px] text-muted-foreground">Completed</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(["all", "active", "queued", "completed"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-3 py-1.5 rounded-full font-mono text-[10px] tracking-wider transition-all whitespace-nowrap",
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="space-y-3">
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              className={cn(
                "rounded-xl border border-border bg-card/40 glass p-4 opacity-0",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{statusIcons[item.status]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <span className={cn(
                      "flex items-center gap-1 px-2 py-0.5 rounded-full border font-mono text-[10px]",
                      categoryColors[item.category]
                    )}>
                      {categoryIcons[item.category]}
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.why}</p>

                  {item.progress !== undefined && item.status !== "completed" && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] text-muted-foreground">Progress</span>
                        <span className="font-mono text-[10px] text-primary">{item.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {item.resources && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.resources.map((resource) => (
                        <span
                          key={resource}
                          className="px-2 py-0.5 rounded bg-secondary/50 border border-border/50 font-mono text-[10px] text-muted-foreground"
                        >
                          {resource}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.completedAt && (
                    <p className="mt-2 font-mono text-[10px] text-green-600 dark:text-green-400">
                      Completed {item.completedAt}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}