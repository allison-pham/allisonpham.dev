"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/core-features/utils"
import { CheckCircle2, Clock, Circle, ChevronDown, ChevronUp, FlaskConical } from "lucide-react"

type Status = "done" | "in-progress" | "todo"
type Impact = "high" | "medium"

type AccessibilityNote = {
  id: number
  area: string
  status: Status
  impact: Impact
  description: string
  tool: string
}

const notes: AccessibilityNote[] = [
  {
    id: 1,
    area: "Color contrast",
    status: "done",
    impact: "high",
    description:
      "All text meets WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large). Purple primary on white passes. Muted gray on white background checked and passes at 4.6:1.",
    tool: "Colour Contrast Analyser",
  },
  {
    id: 2,
    area: "Keyboard navigation",
    status: "done",
    impact: "high",
    description:
      "All interactive elements reachable via Tab. Focus indicators visible on all buttons, links, and form elements. Skip-to-content link present in layout.",
    tool: "Manual testing",
  },
  {
    id: 3,
    area: "Screen reader labels",
    status: "in-progress",
    impact: "high",
    description:
      "Most icon-only buttons have aria-labels. The constellation map canvas needs a proper text alternative. The D3 force graph has no accessible equivalent yet - working on a table fallback.",
    tool: "VoiceOver / NVDA",
  },
  {
    id: 4,
    area: "Motion / reduced motion",
    status: "done",
    impact: "medium",
    description:
      "All animations respect prefers-reduced-motion. The canvas animations pause, the card flips use opacity instead of transforms, the ambient mode clock still updates but without fade transitions.",
    tool: "OS preference toggle",
  },
  {
    id: 5,
    area: "Font sizing",
    status: "done",
    impact: "medium",
    description:
      "No text below 11px (except SVG labels which are a known exception). All font sizes specified in rem for user scaling. Body text at 14–16px across the site.",
    tool: "Browser zoom test",
  },
  {
    id: 6,
    area: "Canvas accessibility",
    status: "todo",
    impact: "high",
    description:
      "The constellation map, connections graph, and digital garden are all canvas-based with no accessible alternative. Plan: add role='img' with aria-label on each canvas, and a hidden data table as an accessible equivalent for the graph data.",
    tool: "Pending",
  },
  {
    id: 7,
    area: "Form labels",
    status: "done",
    impact: "high",
    description:
      "All form inputs have associated labels or aria-label attributes. The visitor field notes textarea, fortune cookie compose area, and question box are all properly labeled.",
    tool: "Manual + axe DevTools",
  },
  {
    id: 8,
    area: "Color-only information",
    status: "in-progress",
    impact: "medium",
    description:
      "Some status indicators use color alone (status dots on projects). Adding text labels as fallback. The streak tracker grid needs pattern fills as an alternative to color depth coding.",
    tool: "Colorblind simulation",
  },
  {
    id: 9,
    area: "Link text",
    status: "done",
    impact: "medium",
    description:
      'All links have descriptive text - no "click here" or "read more". External links marked with ↗ indicator and aria-label specifying destination.',
    tool: "Manual review",
  },
  {
    id: 10,
    area: "Touch targets",
    status: "in-progress",
    impact: "high",
    description:
      "Most interactive elements meet the 44×44px minimum. The stamp card stamps and the constellation map nodes are below threshold on mobile. Need to increase hit areas without changing visual size.",
    tool: "Mobile device testing",
  },
]

const STATUS_CONFIG: Record<Status, {
  label: string
  icon: React.ComponentType<{ className?: string }>
  pill: string
  dot: string
}> = {
  done: {
    label: "done",
    icon: CheckCircle2,
    pill: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
    dot: "bg-green-500",
  },
  "in-progress": {
    label: "in progress",
    icon: Clock,
    pill: "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    dot: "bg-yellow-500 animate-pulse",
  },
  todo: {
    label: "to do",
    icon: Circle,
    pill: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
    dot: "bg-red-500",
  },
}

const IMPACT_CONFIG: Record<Impact, { pill: string }> = {
  high:   { pill: "border-primary/30 bg-primary/10 text-primary" },
  medium: { pill: "border-border/60 bg-secondary/50 text-muted-foreground" },
}

type FilterValue = Status | "all"

export function AccessibilityNotes() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState<FilterValue>("all")
  const [expanded, setExpanded] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const counts = {
    done: notes.filter((n) => n.status === "done").length,
    "in-progress": notes.filter((n) => n.status === "in-progress").length,
    todo: notes.filter((n) => n.status === "todo").length,
  }
  const pct = Math.round((counts.done / notes.length) * 100)

  const filtered = filter === "all" ? notes : notes.filter((n) => n.status === filter)

  const filterOptions: { value: FilterValue; label: string }[] = [
    { value: "all", label: "all" },
    { value: "done", label: "done" },
    { value: "in-progress", label: "in progress" },
    { value: "todo", label: "to do" },
  ]

  return (
    <section
      ref={sectionRef}
      className="overflow-x-clip px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className={cn("mb-12 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">building for all;</p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Accessibility Notes</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">Current status of accessibility efforts, areas I'm actively working on, and notes on specific issues</p>
        </div>

        {/* Stat cards */}
        <div
          className={cn("mb-8 grid grid-cols-3 gap-4 opacity-0", isVisible && "animate-fade-in-up")}
          style={{ animationDelay: "80ms" }}
        >
          {(["done", "in-progress", "todo"] as const).map((status) => {
            const cfg = STATUS_CONFIG[status]
            const Icon = cfg.icon
            return (
              <div
                key={status}
                className="flex flex-col gap-3 rounded-xl border border-border/50 bg-card/40 glass p-5"
              >
                <Icon className={cn("h-4 w-4", status === "done" && "text-green-500", status === "in-progress" && "text-yellow-500", status === "todo" && "text-red-500")} />
                <div>
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    {counts[status]}
                  </p>
                  <p className="font-mono text-[10px] tracking-widest text-muted-foreground">
                    {cfg.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div
          className={cn("mb-8 rounded-xl border border-border/50 bg-card/40 glass p-5 opacity-0", isVisible && "animate-fade-in-up")}
          style={{ animationDelay: "130ms" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-xs tracking-widest text-muted-foreground">
              accessibility coverage
            </p>
            <span className="font-mono text-xs font-semibold text-green-500">
              {pct}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 font-mono text-[10px] text-muted-foreground">
            {counts.done} of {notes.length} areas addressed
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className={cn("mb-6 flex flex-wrap gap-2 opacity-0", isVisible && "animate-fade-in-up")}
          style={{ animationDelay: "180ms" }}
        >
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 active:scale-[0.98]",
                filter === opt.value
                  ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20"
                  : "border-border text-muted-foreground hover:border-foreground/50 hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Notes list */}
        <div className="flex flex-col gap-3">
          {filtered.map((note, index) => {
            const s = STATUS_CONFIG[note.status]
            const imp = IMPACT_CONFIG[note.impact]
            const isOpen = expanded === note.id
            const Icon = s.icon

            return (
              <div
                key={note.id}
                className={cn(
                  "group relative overflow-hidden rounded-xl border bg-card/40 glass transition-all duration-300 opacity-0",
                  isVisible && "animate-fade-in-up",
                  isOpen
                    ? "border-primary/30 bg-card/70"
                    : "border-border/50 hover:border-primary/20"
                )}
                style={{ animationDelay: `${index * 50 + 200}ms` }}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : note.id)}
                  className="flex w-full items-start gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  {/* Status icon */}
                  <div className="mt-0.5 shrink-0">
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        note.status === "done" && "text-green-500",
                        note.status === "in-progress" && "text-yellow-500",
                        note.status === "todo" && "text-red-500/70"
                      )}
                    />
                  </div>

                  {/* Title + tool */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className={cn(
                      "font-mono text-sm font-semibold tracking-wider transition-colors",
                      isOpen ? "text-primary" : "text-foreground group-hover:text-primary"
                    )}>
                      {note.area}
                    </p>
                    {!isOpen && (
                      <p className="font-mono text-[10px] tracking-widest text-muted-foreground truncate">
                        tested with: {note.tool}
                      </p>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex shrink-0 items-center gap-2">
                    <span className={cn(
                      "hidden sm:inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wider",
                      imp.pill
                    )}>
                      {note.impact}
                    </span>
                    <span className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wider",
                      s.pill
                    )}>
                      {s.label}
                    </span>
                    {isOpen
                      ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                      : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    }
                  </div>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="border-t border-border/40 px-6 pb-5 pt-4 animate-fade-in-up">
                    <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                      {note.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <FlaskConical className="h-3 w-3 text-muted-foreground" />
                      <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                        tested with: {note.tool}
                      </span>
                    </div>
                  </div>
                )}

                {/* Hover bar */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
              </div>
            )
          })}
        </div>

        {/* Footer note */}
        <div
          className={cn(
            "mt-6 rounded-xl border border-primary/20 bg-primary/5 px-6 py-5 opacity-0",
            isVisible && "animate-fade-in-up"
          )}
          style={{ animationDelay: "500ms" }}
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            Accessibility is a craft, not a checklist. This page exists to hold me accountable and to be honest about what's still missing. If you find something that's not working, the question box is open.
          </p>
        </div>

      </div>
    </section>
  )
}