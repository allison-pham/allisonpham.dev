"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Compass, GitBranch, Rabbit, Search, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface RabbitHolePath {
  id: string
  theme: string
  category: "niche topics" | "random skills" | "deep dives" | "curiosity trails"
  stages: [string, string, string]
}

const rabbitHolePaths: RabbitHolePath[] = [
  {
    id: "taste-path",
    theme: "Perception + Taste",
    category: "curiosity trails",
    stages: [
      "Why taste is subjective",
      "Psychology of preference",
      "Design & perception",
    ],
  },
  {
    id: "memory-path",
    theme: "Mind + Recall",
    category: "deep dives",
    stages: [
      "Why we misremember details",
      "Memory distortions in daily life",
      "Building systems for better recall",
    ],
  },
  {
    id: "signal-path",
    theme: "Culture + Signals",
    category: "niche topics",
    stages: [
      "How trends mutate online",
      "Memetics & group identity",
      "Taste clusters in digital spaces",
    ],
  },
]

const categoryStyleMap: Record<RabbitHolePath["category"], string> = {
  "niche topics": "bg-violet-500/10 text-violet-600 dark:text-violet-300 border-violet-500/35",
  "random skills": "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/35",
  "deep dives": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/35",
  "curiosity trails": "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/35",
}

export function RabbitHoles() {
  const [isVisible, setIsVisible] = useState(false)
  const [activePathId, setActivePathId] = useState(rabbitHolePaths[0]?.id ?? "")
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative px-4 sm:px-6 pt-16 sm:pt-16 pb-8 sm:pb-12">
      <div className={cn("mx-auto max-w-7xl opacity-0", isVisible && "animate-fade-in-up")}>
        <div className="space-y-2 mb-8">
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">
            <Rabbit className="h-3.5 w-3.5" />
            rabbit holes;
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Curiosity Trails</h2>
          <p className="w-full whitespace-normal text-base sm:text-lg text-muted-foreground leading-relaxed">
            Curate fascinating things I keep falling into: niche topics, random skills, deep dives,
            & open-ended curiosity trails
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card/40 glass p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/30 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
              <GitBranch className="h-3.5 w-3.5" />
              branching paths;
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/30 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
              <Search className="h-3.5 w-3.5" />
              falling deeper;
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/30 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
              <Compass className="h-3.5 w-3.5" />
              nonlinear learning;
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {rabbitHolePaths.map((path, index) => {
              const isActive = activePathId === path.id

              return (
                <article
                  key={path.id}
                  onMouseEnter={() => setActivePathId(path.id)}
                  onFocus={() => setActivePathId(path.id)}
                  className={cn(
                    "rounded-xl border p-4 sm:p-5 transition-all duration-300 opacity-0",
                    "bg-background/55 border-border/70",
                    isActive && "border-primary/50 bg-primary/5 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_28%,transparent)]",
                    isVisible && "animate-fade-in-up"
                  )}
                  style={{ animationDelay: `${120 + index * 110}ms` }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-lg tracking-tight">{path.theme}</h3>
                    <span className={cn("rounded-full border px-2.5 py-1 text-[10px] font-mono tracking-[0.18em]", categoryStyleMap[path.category])}>
                      {path.category}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {path.stages.map((stage, stageIndex) => (
                      <div key={stage} className="space-y-2">
                        <div
                          className={cn(
                            "rounded-lg border px-3 py-3 text-sm leading-relaxed",
                            stageIndex === 0 && "bg-secondary/35 border-border/70",
                            stageIndex === 1 && "bg-secondary/20 border-border/60",
                            stageIndex === 2 && "bg-primary/8 border-primary/35"
                          )}
                        >
                          {stage}
                        </div>
                        {stageIndex < path.stages.length - 1 && (
                          <div className="flex items-center justify-center text-primary/80">
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>

          <div
            className={cn(
              "mt-5 rounded-lg border border-dashed border-primary/35 bg-primary/5 px-4 py-3 text-sm text-muted-foreground opacity-0",
              isVisible && "animate-fade-in-up"
            )}
            style={{ animationDelay: "560ms" }}
          >
            <p className="font-mono text-[10px] tracking-[0.2em] text-primary flex items-center gap-1.5 mb-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              rabbit-hole logic;
            </p>
            <p>
              One question opens another, then another. The goal is not to finish quickly. It is to follow the thread
              until a new angle appears.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
