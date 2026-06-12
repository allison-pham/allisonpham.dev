"use client"

import { useState, useEffect } from "react"
import { cn } from "@/src/lib/utils"
import { Github, ExternalLink, GitBranch, Archive, Sparkles, Lightbulb } from "lucide-react"
import { currentPieces, previousIterations, ideasQueue, type LabItem } from "@/src/lib/main-pages/lab-data"

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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden hover-lift opacity-0",
        isVisible && `animate-scale-in ${staggerClass}`
      )}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 sm:gap-3 border-b border-border/50 bg-secondary/40 px-3 sm:px-5 py-3.5 sm:py-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive cursor-pointer" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500 cursor-pointer" />
          <div className="h-3 w-3 rounded-full bg-primary/60 transition-colors hover:bg-primary cursor-pointer" />
        </div>
        <span className="ml-2 sm:ml-4 flex-1 min-w-0 font-mono text-[10px] sm:text-xs text-muted-foreground truncate">{path}</span>
        <div className="shrink-0 flex items-center gap-2 text-muted-foreground">
          {icon}
          <span className="hidden min-[380px]:inline font-mono text-xs">{statusLabel}</span>
        </div>
      </div>

      {/* Section title */}
      <div className="px-4 sm:px-5 py-4 border-b border-border/30 bg-secondary/20">
        <h3 className="font-mono text-sm font-medium text-foreground flex items-center gap-2 min-w-0">
          {icon}
          <span className="truncate">{title}</span>
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
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="text-primary font-mono text-sm shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                  $
                </span>
                <h4 className="min-w-0 flex-1 font-mono text-sm font-medium tracking-tight transition-colors group-hover:text-gradient truncate">
                  {item.name}
                </h4>
                {item.url && (
                  <div className="hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Github className="h-3.5 w-3.5 text-muted-foreground" />
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                )}
              </div>
              <p className="w-full pl-6 text-xs leading-relaxed text-muted-foreground whitespace-normal wrap-break-word">
                {item.description}
              </p>
              <div className="pl-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <GitBranch className="h-3 w-3" />
                  {item.branch}
                </span>
                <span>{item.commits} commits</span>
              </div>
            </div>

            <div className="grid w-full grid-cols-1 gap-3 pl-6 sm:w-auto sm:grid-cols-[minmax(0,1fr)_10rem] sm:items-center sm:gap-4 sm:pl-0">
              <div className="flex min-w-0 items-center gap-1">
                <div className="h-2 w-full sm:w-28 overflow-hidden rounded-full bg-secondary/80 relative">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-700 ease-out",
                      item.progress === 100
                        ? "bg-emerald-300"
                        : item.progress >= 75
                          ? "bg-lime-300"
                          : item.progress >= 50
                            ? "bg-yellow-300"
                            : item.progress >= 25
                              ? "bg-amber-300"
                              : item.progress > 0
                                ? "bg-orange-300"
                                : "bg-zinc-300"
                    )}
                    style={{ width: `${Math.max(item.progress, 5)}%` }}
                  />
                  <div className="absolute inset-0 animate-shimmer opacity-30" />
                </div>
                <span
                  className={cn(
                    "w-10 shrink-0 text-left font-mono tabular-nums text-xs transition-colors",
                    item.progress >= 80 ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.progress}%
                </span>
              </div>
              <div className="flex shrink-0 flex-col items-start text-left font-mono text-[11px] leading-tight text-muted-foreground sm:items-end sm:text-right sm:text-xs">
                <span>last updated</span>
                <span className="tabular-nums">{item.lastUpdated}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="border-t border-border/50 bg-secondary/30 px-4 sm:px-5 py-4">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="text-primary">{">"}</span>
          <span className="typing-cursor min-w-0 flex-1 truncate">git status --all</span>
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
    <section className="overflow-x-clip px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className={cn("mb-12 sm:mb-16 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            work in progress;
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Lab</h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Current tinkering on experiments and prototypes through a mini tinker lab.
            Building with design curiosity while showcasing progress on ideation.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content - terminal boxes */}
          <div className="min-w-0 lg:col-span-2 space-y-6">
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
          <div className="min-w-0 space-y-6">
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

            {/* Progress legend */}
            <div
              className={cn(
                "rounded-xl border border-border bg-card/40 glass p-5 opacity-0",
                isVisible && "animate-fade-in-up stagger-5"
              )}
            >
              <h3 className="font-mono text-xs tracking-wider text-primary mb-4">Progress Legend</h3>
              <div className="space-y-2">
                {[
                  { color: "bg-emerald-300", label: "100% = complete" },
                  { color: "bg-lime-300",    label: "75-99% = near complete" },
                  { color: "bg-yellow-300",  label: "50-74% = in progress" },
                  { color: "bg-amber-300",   label: "25-49% = early build" },
                  { color: "bg-orange-300",  label: "1-24% = idea forming" },
                  { color: "bg-zinc-300",    label: "0% = planned" },
                ].map(({ color, label }) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <span className={`w-3 h-3 rounded-full ${color}`} />
                    <span className="text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}