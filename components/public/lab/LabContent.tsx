"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Github, ExternalLink, Clock, GitBranch, Activity, Archive, Sparkles, Lightbulb } from "lucide-react"

interface LabItem {
  id: number
  name: string
  description: string
  progress: number
  lastUpdated: string
  url: string
  branch: string
  commits: number
}

const currentPieces: LabItem[] = [
  {
    id: 1,
    name: "hci-in-space",
    description: "Cognitive load in environments & microgravity interaction design",
    progress: 5,
    lastUpdated: "Mar 2026",
    url: "",
    branch: "main",
    commits: 0,
  },

  {
    id: 2,
    name: "cs-ee-learning-system",
    description: "Interactive learning platform for CS, engineering, & product fundamentals",
    progress: 35,
    lastUpdated: "Mar 2026",
    url: "",
    branch: "main",
    commits: 0,
  },
  
  {
    id: 3,
    name: "mini-database",
    description: "Building a database from scratch to understand internals",
    progress: 20,
    lastUpdated: "Mar 2026",
    url: "",
    branch: "main",
    commits: 0,
  },
]

const previousIterations: LabItem[] = [
]

const ideasQueue: LabItem[] = [
]

const recentActivity = [
  { type: "commit", project: "cs-ee-learning-system", message: "Add interactive quiz component", time: "# days ago" },
  { type: "branch", project: "cs-ee-learning-system", message: "Updated curriculum structure", time: "# days ago" },
]

interface TerminalBoxProps {
  title: string
  path: string
  icon: React.ReactNode
  items: LabItem[]
  statusLabel: string
  isVisible: boolean
  staggerClass: string
}

function TerminalBox({ title, path, icon, items, statusLabel, isVisible, staggerClass }: TerminalBoxProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden hover-lift opacity-0",
        isVisible && `animate-scale-in ${staggerClass}`
      )}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/40 px-4 sm:px-5 py-3.5 sm:py-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive cursor-pointer" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500 cursor-pointer" />
          <div className="h-3 w-3 rounded-full bg-primary/60 transition-colors hover:bg-primary cursor-pointer" />
        </div>
        <span className="ml-4 font-mono text-xs text-muted-foreground truncate">{path}</span>
        <div className="ml-auto flex items-center gap-2 text-muted-foreground">
          {icon}
          <span className="font-mono text-xs">{statusLabel}</span>
        </div>
      </div>

      {/* Section Title */}
      <div className="px-5 py-4 border-b border-border/30 bg-secondary/20">
        <h3 className="font-mono text-sm font-medium text-foreground flex items-center gap-2">
          {icon}
          {title}
        </h3>
      </div>

      <div className="divide-y divide-border/30">
        {items.map((item, index) => (
          <a
            key={item.id}
            href={item.url || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex flex-col gap-4 p-5 sm:p-6 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between",
              hoveredItem === item.id && "bg-secondary/30",
              !item.url && "cursor-default"
            )}
            style={{ animationDelay: `${index * 80 + 300}ms` }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={(e) => !item.url && e.preventDefault()}
          >
            <div className="flex-1 space-y-2 min-w-0">
              <div className="flex items-center gap-3">
                <span className="text-primary font-mono text-sm shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  $
                </span>
                <h4 className="font-mono text-sm font-medium tracking-tight transition-colors group-hover:text-gradient truncate">
                  {item.name}
                </h4>
                {item.url && (
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Github className="h-3.5 w-3.5 text-muted-foreground" />
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                )}
              </div>
              <p className="pl-6 text-xs text-muted-foreground line-clamp-2 sm:line-clamp-1">
                {item.description}
              </p>
              <div className="pl-6 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <GitBranch className="h-3 w-3" />
                  {item.branch}
                </span>
                <span>{item.commits} commits</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 pl-6 sm:pl-0 sm:justify-end">
              <div className="flex items-center gap-3 flex-1 sm:flex-none">
                <div className="h-2 w-full sm:w-28 overflow-hidden rounded-full bg-secondary/80 relative">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-700 ease-out",
                      item.progress >= 80
                        ? "bg-primary"
                        : item.progress >= 50
                          ? "bg-yellow-500"
                          : item.progress > 0
                            ? "bg-orange-500"
                            : "bg-muted-foreground/30"
                    )}
                    style={{ width: `${Math.max(item.progress, 5)}%` }}
                  />
                  <div className="absolute inset-0 animate-shimmer opacity-30" />
                </div>
                <span
                  className={cn(
                    "font-mono text-xs w-10 shrink-0 transition-colors",
                    item.progress >= 80 ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.progress}%
                </span>
              </div>
              <span className="font-mono text-xs text-muted-foreground shrink-0">{item.lastUpdated}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="border-t border-border/50 bg-secondary/30 px-4 sm:px-5 py-4">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="text-primary">{">"}</span>
          <span className="typing-cursor truncate">git status --all</span>
          <span className="ml-auto text-primary/50 hidden sm:block">press enter to run</span>
        </div>
      </div>
    </div>
  )
}

export function LabContent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className={cn("mb-12 sm:mb-16 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            work in progress;
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Lab</h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Current tinkering for experiments & prototypes. Building with design curiosity. Progress on ideation.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content - 3 Terminal Boxes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Pieces */}
            <TerminalBox
              title="Current Pieces"
              path="~/allison/lab-progress/current"
              icon={<Sparkles className="h-3.5 w-3.5 text-primary" />}
              items={currentPieces}
              statusLabel="active"
              isVisible={isVisible}
              staggerClass="stagger-2"
            />

            {/* Previous Iterations */}
            <TerminalBox
              title="Previous Iterations"
              path="~/allison/lab-progress/archive"
              icon={<Archive className="h-3.5 w-3.5 text-muted-foreground" />}
              items={previousIterations}
              statusLabel="completed"
              isVisible={isVisible}
              staggerClass="stagger-3"
            />

            {/* Ideas Queue */}
            <TerminalBox
              title="Ideas Queue"
              path="~/allison/lab-progress/ideas"
              icon={<Lightbulb className="h-3.5 w-3.5 text-yellow-500" />}
              items={ideasQueue}
              statusLabel="planned"
              isVisible={isVisible}
              staggerClass="stagger-4"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div
              className={cn(
                "rounded-xl border border-border bg-card/40 glass p-5 opacity-0",
                isVisible && "animate-fade-in-up stagger-3"
              )}
            >
              <h3 className="font-mono text-xs tracking-wider text-primary mb-4">Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-secondary/30">
                  <p className="text-2xl font-bold text-foreground">{currentPieces.length}</p>
                  <p className="font-mono text-xs text-muted-foreground">Active</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/30">
                  <p className="text-2xl font-bold text-primary">
                    {Math.round(currentPieces.reduce((a, b) => a + b.progress, 0) / currentPieces.length)}%
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">Avg Progress</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/30">
                  <p className="text-2xl font-bold text-foreground">{previousIterations.length}</p>
                  <p className="font-mono text-xs text-muted-foreground">Completed</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/30">
                  <p className="text-2xl font-bold text-yellow-500">{ideasQueue.length}</p>
                  <p className="font-mono text-xs text-muted-foreground">Queued</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div
              className={cn(
                "rounded-xl border border-border bg-card/40 glass p-5 opacity-0",
                isVisible && "animate-fade-in-up stagger-4"
              )}
            >
              <h3 className="font-mono text-xs tracking-wider text-primary mb-4 flex items-center gap-2">
                <Activity className="h-3.5 w-3.5" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 text-xs">
                    <span
                      className={cn(
                        "shrink-0 w-1.5 h-1.5 rounded-full mt-1.5",
                        activity.type === "commit" ? "bg-primary" : "bg-yellow-500"
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-foreground truncate">{activity.message}</p>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div
              className={cn(
                "rounded-xl border border-border bg-card/40 glass p-5 opacity-0",
                isVisible && "animate-fade-in-up stagger-5"
              )}
            >
              <h3 className="font-mono text-xs tracking-wider text-primary mb-4">Progress Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">80-100% = complete</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-muted-foreground">50-79% = in progress</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-muted-foreground">1-49% = early stage</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <span className="text-muted-foreground">0% = planned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}