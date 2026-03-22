"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, Lock, Trophy, Stars, Flag, Sparkles } from "lucide-react"

type StageTone = "origin" | "craft" | "impact" | "edge" | "future"

interface LifeLevel {
  id: number
  level: number
  title: string
  subtitle: string
  years: string
  tone: StageTone
  mission: string
  unlockedByDefault?: boolean
}

const toneStyles: Record<StageTone, { border: string; glow: string; dot: string }> = {
  origin: {
    border: "border-cyan-500/30",
    glow: "from-cyan-500/15 via-cyan-500/5 to-transparent",
    dot: "bg-cyan-400",
  },
  craft: {
    border: "border-amber-500/30",
    glow: "from-amber-500/15 via-amber-500/5 to-transparent",
    dot: "bg-amber-400",
  },
  impact: {
    border: "border-emerald-500/30",
    glow: "from-emerald-500/15 via-emerald-500/5 to-transparent",
    dot: "bg-emerald-400",
  },
  edge: {
    border: "border-fuchsia-500/30",
    glow: "from-fuchsia-500/15 via-fuchsia-500/5 to-transparent",
    dot: "bg-fuchsia-400",
  },
  future: {
    border: "border-primary/30",
    glow: "from-primary/15 via-primary/5 to-transparent",
    dot: "bg-primary",
  },
}

const levels: LifeLevel[] = [
  {
    id: 1,
    level: 1,
    title: "Spawn Point",
    subtitle: "the beginning of curiosity",
    years: "20XX",
    tone: "origin",
    mission: "My 1st spark moment here: what pulled me in & why I kept going.",
    unlockedByDefault: true,
  },

  {
    id: 2,
    level: 2,
    title: "Build Mode",
    subtitle: "learning by shipping",
    years: "20XX",
    tone: "craft",
    mission: "The chapter where I leveled up through consistent output & hard reps.",
  },

  {
    id: 3,
    level: 3,
    title: "Boss Fight",
    subtitle: "pressure, doubt, and the hard pivot",
    years: "20XX",
    tone: "edge",
    mission: "The challenge that forced me to evolve: a setback, rejection, identity shift.",
  },

  {
    id: 4,
    level: 4,
    title: "Contribution Arc",
    subtitle: "building beyond yourself",
    years: "20XX",
    tone: "impact",
    mission: "My impact chapter: leading, mentoring, building things that helped others.",
  },

  {
    id: 5,
    level: 5,
    title: "Open World",
    subtitle: "current chapter",
    years: "now",
    tone: "future",
    mission: "What I'm pursuing right now & what I'm intentionally exploring next.",
  },
]

export function TimelineLevels() {
  const initiallyUnlocked = useMemo(
    () => new Set(levels.filter((item) => item.unlockedByDefault).map((item) => item.id)),
    [],
  )

  const [unlockedIds, setUnlockedIds] = useState<Set<number>>(initiallyUnlocked)
  const [activeId, setActiveId] = useState<number>(levels[0]?.id ?? 1)

  const unlockedCount = unlockedIds.size

  const handleLevelOpen = (id: number) => {
    setActiveId(id)
    setUnlockedIds((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  return (
    <section className="px-4 sm:px-6 py-20 border-t border-border/40">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-4 mb-10">
          <p className="font-mono text-xs tracking-[0.35em] text-primary uppercase">origin story / levels mode</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Life (as Unlockable Stages)</h2>
          <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Scroll less, explore more. Each level is a chapter you can open in any order.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="h-2 w-40 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-primary/70 to-primary transition-all duration-500"
                style={{ width: `${(unlockedCount / levels.length) * 100}%` }}
              />
            </div>
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              {unlockedCount}/{levels.length} stages unlocked
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {levels.map((item) => {
            const isActive = activeId === item.id
            const isUnlocked = unlockedIds.has(item.id)
            const style = toneStyles[item.tone]

            return (
              <article
                key={item.id}
                className={cn(
                  "relative rounded-2xl border bg-card/50 glass p-5 transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-xl",
                  isActive ? `${style.border} ring-1 ring-primary/30` : "border-border/70",
                )}
              >
                <div className={cn("pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br opacity-0 transition-opacity duration-300", style.glow, isActive && "opacity-100")} />

                <div className="relative z-10 flex h-full flex-col justify-between gap-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                        <span className={cn("h-2 w-2 rounded-full", style.dot)} />
                        lvl {item.level}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground/70">{item.years}</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
                      <p className="text-xs text-muted-foreground italic">{item.subtitle}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLevelOpen(item.id)}
                    className={cn(
                      "group inline-flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-xs font-mono tracking-wider uppercase transition-colors",
                      isUnlocked
                        ? "border-primary/40 text-primary hover:bg-primary/10"
                        : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30",
                    )}
                    type="button"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {isUnlocked ? <Trophy className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                      {isUnlocked ? "review" : "unlock"}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card/40 glass p-6 sm:p-7">
          {levels.map((item) => {
            if (item.id !== activeId) return null
            const style = toneStyles[item.tone]
            return (
              <div key={item.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className={cn("h-2 w-2 rounded-full", style.dot)} />
                  <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                    active mission: level {item.level}
                  </p>
                </div>

                <h4 className="text-2xl sm:text-3xl font-bold tracking-tight">{item.title}</h4>

                <p className="max-w-3xl text-sm sm:text-base text-foreground/85 leading-relaxed">
                  {item.mission}
                </p>

                <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                  <Stars className="h-3.5 w-3.5" />
                  <span>Replace this copy with your real story moments.</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          <Flag className="h-3.5 w-3.5" />
          designed for exploration, not chronology
          <Sparkles className="h-3.5 w-3.5 text-primary/70" />
        </div>
      </div>
    </section>
  )
}
