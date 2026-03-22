"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, Sparkles, BookOpen, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BehindTheScenesItem, Iteration } from "@/lib/behind-the-scenes-data"

interface IterationCardProps {
  iteration: Iteration
  index: number
}

function IterationCard({ iteration, index }: IterationCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 rounded-full border-2 border-primary bg-background flex items-center justify-center text-xs font-semibold text-primary">
          v{iteration.version}
        </div>
        <div className="w-0.5 h-16 bg-border/30 my-2" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left hover:opacity-75 transition-opacity"
        >
          <div
            className={cn(
              "rounded-lg border px-4 py-3 transition-all",
              isOpen ? "border-primary/50 bg-primary/5" : "border-border/40 bg-secondary/15 hover:border-primary/30"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm mb-1">{iteration.title}</h4>
                <p className="text-xs text-muted-foreground">{iteration.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[10px] font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
                    {iteration.date}
                  </span>
                  {iteration.timeSpent && (
                    <span className="text-[10px] font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
                      {iteration.timeSpent}
                    </span>
                  )}
                  {iteration.tags?.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono text-primary/60 bg-primary/10 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
              )}
            </div>
          </div>
        </button>

        {isOpen && (
          <div className="mt-3 ml-4 space-y-3 pl-3 border-l border-primary/20 text-sm animate-fade-in-up">
            {iteration.changes && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Changes</p>
                <ul className="space-y-1">
                  {iteration.changes.map((change, i) => (
                    <li key={i} className="text-xs text-foreground/70 flex gap-2">
                      <span className="text-primary/50">▸</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {iteration.feedback && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-2">Feedback</p>
                <div className="space-y-2">
                  {iteration.feedback.map((f, i) => (
                    <div key={i} className="text-xs italic text-foreground/60 bg-secondary/40 border border-border/30 rounded p-2">
                      "{f}"
                    </div>
                  ))}
                </div>
              </div>
            )}

            {iteration.decisionLog && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Why this change?</p>
                <div className="text-xs text-foreground/70 bg-primary/5 border border-primary/15 rounded p-2 italic">
                  {iteration.decisionLog}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface BehindTheScenesItemCardProps {
  item: BehindTheScenesItem
  expandedId: string | null
  onExpand: (id: string) => void
}

function BehindTheScenesItemCard({ item, expandedId, onExpand }: BehindTheScenesItemCardProps) {
  const isExpanded = expandedId === item.id

  return (
    <article className="rounded-xl border border-border/40 bg-gradient-to-br from-secondary/10 via-card/30 to-secondary/5 overflow-hidden transition-all hover:border-primary/30">
      <button
        onClick={() => onExpand(isExpanded ? "" : item.id)}
        className="w-full text-left p-6 hover:bg-primary/5 transition-colors group"
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded">
                {item.category}
              </span>
              {item.featured && (
                <span className="text-[10px] font-mono text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 px-2.5 py-0.5 rounded flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" />
                  Featured
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold tracking-tight group-hover:text-gradient transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-foreground/60 mt-1">{item.subtitle}</p>
            <p className="text-xs text-muted-foreground mt-2">{item.description}</p>
          </div>
          <div className="shrink-0 mt-1">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Started {item.startDate}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {item.iterations.length} iteration{item.iterations.length !== 1 ? "s" : ""}
          </span>
          {item.totalTime && <span>{item.totalTime}</span>}
          <span className="capitalize">{item.status}</span>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border/30 p-6 space-y-6 animate-fade-in-up bg-background/20 backdrop-blur-sm">
          {item.messyNotes && (
            <div className="space-y-2">
              <p className="text-xs font-mono tracking-wider text-primary">Raw Thinking</p>
              <div className="text-sm text-foreground/80 leading-relaxed bg-secondary/30 border border-border/30 rounded-lg p-4 whitespace-pre-wrap font-mono text-[13px]">
                {item.messyNotes}
              </div>
            </div>
          )}

          {/* Iterations Timeline */}
          <div className="space-y-4">
            <p className="text-xs font-mono tracking-wider text-primary">Iteration Timeline</p>
            <div className="space-y-4">
              {item.iterations.map((iteration, index) => (
                <IterationCard key={iteration.version} iteration={iteration} index={index} />
              ))}
            </div>
          </div>

          {/* Key Lessons */}
          {item.keyLessons && item.keyLessons.length > 0 && (
            <div className="space-y-3 bg-primary/5 border border-primary/15 rounded-lg p-4">
              <p className="text-xs font-mono tracking-wider text-primary">Lessons Learned</p>
              <ul className="space-y-2">
                {item.keyLessons.map((lesson, i) => (
                  <li key={i} className="flex gap-3 text-sm text-foreground/80">
                    <span className="text-primary/50 shrink-0">→</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

interface BehindTheScenesProps {
  items: BehindTheScenesItem[]
}

export function BehindTheScenesSection({ items }: BehindTheScenesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const featured = items.filter((item) => item.featured)
  const others = items.filter((item) => !item.featured)

  return (
    <section ref={ref} className="relative px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Header */}
        <div className={cn("space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs tracking-widest text-primary">Behind the Scenes</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            How Things Actually Get Made
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            The messy process, iterations, feedback, and real decisions. Drafts, pivots, and lessons learned. 
            People love seeing how things actually get built.
          </p>
        </div>

        {/* Featured Items */}
        {featured.length > 0 && (
          <div className={cn("space-y-4 opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
            <p className="text-xs font-mono tracking-widest text-primary/70">Featured Processes</p>
            <div className="grid gap-6 lg:grid-cols-2">
              {featured.map((item) => (
                <BehindTheScenesItemCard
                  key={item.id}
                  item={item}
                  expandedId={expandedId}
                  onExpand={setExpandedId}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Other Items */}
        {others.length > 0 && (
          <div className={cn("space-y-4 opacity-0", isVisible && "animate-fade-in-up stagger-3")}>
            <p className="text-xs font-mono tracking-widest text-primary/70">More Processes</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item) => (
                <BehindTheScenesItemCard
                  key={item.id}
                  item={item}
                  expandedId={expandedId}
                  onExpand={setExpandedId}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default BehindTheScenesSection
