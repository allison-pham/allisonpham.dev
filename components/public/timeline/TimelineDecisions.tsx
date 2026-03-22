"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { X, Anchor, GitFork, Zap, Flame, Sparkles, Compass } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "origin" | "pivot" | "leap" | "loss" | "discovery" | "build"

interface Decision {
  id: number
  year: string
  chapter: string
  title: string
  tagline: string
  story: string
  category: Category
  /** Controls visual weight in the bento grid */
  size: "sm" | "md" | "lg"
}

// ─── Config ───────────────────────────────────────────────────────────────────

const categoryConfig: Record<
  Category,
  { icon: React.ElementType; label: string; color: string; bg: string; ring: string }
> = {
  origin:    { icon: Anchor,   label: "origin",    color: "text-violet-400", bg: "bg-violet-500/10",  ring: "ring-violet-500/30" },
  pivot:     { icon: GitFork,  label: "pivot",     color: "text-orange-400", bg: "bg-orange-500/10",  ring: "ring-orange-500/30" },
  leap:      { icon: Zap,      label: "leap",      color: "text-yellow-400", bg: "bg-yellow-500/10",  ring: "ring-yellow-500/30" },
  loss:      { icon: Flame,    label: "loss",      color: "text-rose-400",   bg: "bg-rose-500/10",    ring: "ring-rose-500/30"   },
  discovery: { icon: Sparkles, label: "discovery", color: "text-cyan-400",   bg: "bg-cyan-500/10",    ring: "ring-cyan-500/30"   },
  build:     { icon: Compass,  label: "build",     color: "text-primary",    bg: "bg-primary/10",     ring: "ring-primary/30"    },
}

// ─── Data ─────────────────────────────────────────────────────────────────────
// Fill in `year`, `chapter`, `title`, `tagline`, and `story` with your own moments.

const decisions: Decision[] = [
  {
    id: 1,
    year: "????",
    chapter: "chapter one",
    title: "The First Computer",
    tagline: "before this, I didn't know what I could become.",
    story:
      "Origin story - 1st moment I encountered what would shape my entire path. What it felt like the 1st time, what I stayed up late doing, & what I didn't yet know",
    category: "origin",
    size: "lg",
  },

  {
    id: 2,
    year: "????",
    chapter: "the declaration",
    title: "I'm Doing This",
    tagline: "the first real commitment.",
    story:
      "Moment I stopped exploring & started committing. When I decided my direction wasn't a phase",
    category: "build",
    size: "sm",
  },

  {
    id: 3,
    year: "????",
    chapter: "the hard year",
    title: "The One That Was Difficult",
    tagline: "it didn't kill me. mostly.",
    story:
      "Every story needs this chapter. The moment that challenged everything - a rejection, a failure, a year I wouldn't repeat but couldn't undo.",
    category: "loss",
    size: "sm",
  },

  {
    id: 4,
    year: "????",
    chapter: "the revelation",
    title: "Oh. That's What I Want.",
    tagline: "clarity came out of nowhere.",
    story:
      "The moment I discovered what actually matters to me. A late-night conversation, a random project, something that made the noise disappear.",
    category: "discovery",
    size: "md",
  },

  {
    id: 5,
    year: "????",
    chapter: "the swerve",
    title: "This Wasn't the Plan",
    tagline: "detoured. landed somewhere better.",
    story:
      "An unexpected turn - a pivot that looked like a setback & turned out to be the whole point.",
    category: "pivot",
    size: "sm",
  },

  {
    id: 6,
    year: "????",
    chapter: "the jump",
    title: "I Said Yes Anyway",
    tagline: "terrified and going for it.",
    story:
      "A leap - when I showed up before I was ready & it worked out differently than expected (in the best way).",
    category: "leap",
    size: "sm",
  },
  
  {
    id: 7,
    year: "now",
    chapter: "still writing",
    title: "This Chapter Is Unfinished",
    tagline: "TBD. come back later.",
    story:
      "Some chapters don't have endings yet. This is one of them. The only thing certain is that something is being built.",
    category: "build",
    size: "md",
  },
]

// ─── Decision Card ─────────────────────────────────────────────────────────────

function DecisionCard({
  decision,
  isUnlocked,
  onOpen,
}: {
  decision: Decision
  isUnlocked: boolean
  onOpen: () => void
}) {
  const config = categoryConfig[decision.category]
  const Icon = config.icon

  const sizeClasses = {
    lg: "sm:col-span-2 sm:row-span-2",
    md: "sm:col-span-1 sm:row-span-2",
    sm: "sm:col-span-1 sm:row-span-1",
  }

  return (
    <button
      onClick={onOpen}
      className={cn(
        "group relative text-left rounded-2xl border bg-card/40 glass overflow-hidden",
        "transition-all duration-300 cursor-pointer",
        "hover:scale-[1.02] hover:shadow-lg active:scale-[0.99]",
        sizeClasses[decision.size],
        isUnlocked
          ? "border-border/60"
          : "border-border hover:ring-2 hover:ring-offset-2 hover:ring-offset-background",
        !isUnlocked && `hover:${config.ring}`,
        decision.size === "lg" ? "p-7 min-h-55" : decision.size === "md" ? "p-6 min-h-40" : "p-5 min-h-32.5"
      )}
    >
      {/* Glow blob - only on locked cards */}
      {!isUnlocked && (
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
            config.bg
          )}
        />
      )}

      {/* Unlocked shimmer */}
      {isUnlocked && (
        <span
          aria-hidden
          className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary/60 shadow-[0_0_6px_2px_var(--color-primary,#a855f7)]"
        />
      )}

      <div className="relative z-10 h-full flex flex-col justify-between gap-4">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center justify-center w-7 h-7 rounded-lg",
                config.bg,
                "transition-transform duration-300 group-hover:scale-110"
              )}
            >
              <Icon className={cn("h-3.5 w-3.5", config.color)} />
            </span>
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              {config.label}
            </span>
          </div>

          <span className="font-mono text-xs text-muted-foreground/60 tabular-nums shrink-0">
            {decision.year}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/80 uppercase">
            {decision.chapter}
          </p>
          <h3
            className={cn(
              "font-bold transition-colors duration-300",
              decision.size === "lg" ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
              "group-hover:text-primary"
            )}
          >
            {decision.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed italic">
            {decision.tagline}
          </p>
        </div>

        {/* Tap hint */}
        <div
          className={cn(
            "flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase transition-opacity duration-300",
            isUnlocked ? "text-primary/60 opacity-100" : "text-muted-foreground/50 opacity-0 group-hover:opacity-100"
          )}
        >
          <span className="w-4 h-px bg-current" />
          {isUnlocked ? "revisit" : "reveal"}
        </div>
      </div>
    </button>
  )
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export function TimelineDecisions() {
  const [unlockedIds, setUnlockedIds] = useState<Set<number>>(new Set())
  const [activeDecision, setActiveDecision] = useState<Decision | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const openDecision = (decision: Decision) => {
    setActiveDecision(decision)
    setUnlockedIds((prev) => new Set(prev).add(decision.id))
  }

  const unlockedCount = unlockedIds.size

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 py-20 border-t border-border/40">
      <div className="mx-auto max-w-5xl">

        {/* Section header */}
        <div
          className={cn(
            "mb-12 space-y-4 opacity-0",
            isVisible && "animate-fade-in-up"
          )}
        >
          <p className="font-mono text-xs tracking-[0.35em] text-primary uppercase">
            ✦ another way to look at it
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The Turning Points
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <p className="max-w-xl text-sm text-muted-foreground leading-relaxed">
              Not a timeline. A map of decisions - the moments that split the road.{" "}
              <span className="text-foreground/70 italic">Click to explore.</span>
            </p>
            {/* Progress */}
            <div
              className={cn(
                "flex items-center gap-2 font-mono text-xs text-muted-foreground shrink-0 transition-opacity duration-500",
                unlockedCount > 0 ? "opacity-100" : "opacity-40"
              )}
            >
              <span className="inline-flex gap-1">
                {decisions.map((d) => (
                  <span
                    key={d.id}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-300",
                      unlockedIds.has(d.id) ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                  />
                ))}
              </span>
              <span>{unlockedCount}/{decisions.length} unlocked</span>
            </div>
          </div>
        </div>

        {/* Bento grid */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-3 gap-3 auto-rows-min opacity-0",
            isVisible && "animate-fade-in-up stagger-1"
          )}
        >
          {decisions.map((decision) => (
            <DecisionCard
              key={decision.id}
              decision={decision}
              isUnlocked={unlockedIds.has(decision.id)}
              onOpen={() => openDecision(decision)}
            />
          ))}
        </div>
      </div>

      {/* Reveal modal */}
      <Dialog.Root
        open={activeDecision !== null}
        onOpenChange={(open) => { if (!open) setActiveDecision(null) }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content
            className={cn(
              "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
              "w-[calc(100vw-2rem)] max-w-lg",
              "rounded-2xl border border-border bg-card/95 glass p-8 shadow-2xl",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
              "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
              "duration-200"
            )}
          >
            {activeDecision && (() => {
              const config = categoryConfig[activeDecision.category]
              const Icon = config.icon
              return (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={cn("inline-flex items-center justify-center w-9 h-9 rounded-xl", config.bg)}>
                        <Icon className={cn("h-4.5 w-4.5", config.color)} />
                      </span>
                      <div>
                        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                          {config.label} · {activeDecision.year}
                        </p>
                        <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/70 uppercase mt-0.5">
                          {activeDecision.chapter}
                        </p>
                      </div>
                    </div>
                    <Dialog.Close asChild>
                      <button className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                        <X className="h-3.5 w-3.5" />
                        <span className="sr-only">Close</span>
                      </button>
                    </Dialog.Close>
                  </div>

                  {/* Divider */}
                  <div className={cn("h-px w-full", config.bg)} />

                  {/* Title */}
                  <div className="space-y-2">
                    <Dialog.Title className="text-2xl font-bold tracking-tight">
                      {activeDecision.title}
                    </Dialog.Title>
                    <p className="text-sm text-muted-foreground italic">
                      {activeDecision.tagline}
                    </p>
                  </div>

                  {/* Story */}
                  <Dialog.Description className="text-sm text-foreground/80 leading-[1.85]">
                    {activeDecision.story}
                  </Dialog.Description>

                  {/* Footer - progress hint */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                    <span className="flex gap-1">
                      {decisions.map((d) => (
                        <span
                          key={d.id}
                          className={cn(
                            "w-1 h-1 rounded-full transition-all duration-300",
                            unlockedIds.has(d.id) ? "bg-primary" : "bg-muted-foreground/20"
                          )}
                        />
                      ))}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground ml-1">
                      {unlockedIds.size}/{decisions.length} moments revealed
                    </span>
                  </div>
                </div>
              )
            })()}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  )
}
