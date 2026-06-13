"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/core-features/utils"
import { ChevronDown, ChevronUp, Info } from "lucide-react"

type Factor = {
  id: string
  label: string
  principle: string
  description: string
  min: number
  max: number
  unit: string
  defaultVal: number
  weight: number
  higherIsBetter: boolean // false = higher value = more load
  compute: (val: number) => number // returns 0–100 load contribution
}

const FACTORS: Factor[] = [
  {
    id: "word-count",
    label: "Word count",
    principle: "Miller's Law",
    description: "More words = more working memory demand. Threshold is roughly 300 words before cognitive cost compounds.",
    min: 0, max: 3000, unit: "words", defaultVal: 400, weight: 1.2,
    higherIsBetter: false,
    compute: (v) => Math.min(100, (v / 3000) * 100),
  },
  {
    id: "nav-items",
    label: "Navigation items",
    principle: "Hick's Law",
    description: "Decision time grows logarithmically with choices. More than 7 nav items measurably slows orientation.",
    min: 1, max: 20, unit: "items", defaultVal: 5, weight: 1.5,
    higherIsBetter: false,
    compute: (v) => Math.min(100, ((v - 1) / 19) * 100),
  },
  {
    id: "animations",
    label: "Concurrent animations",
    principle: "Attentional Resources",
    description: "Motion captures attention involuntarily. More than 2–3 simultaneous animations compete for attentional focus.",
    min: 0, max: 10, unit: "animations", defaultVal: 2, weight: 1.8,
    higherIsBetter: false,
    compute: (v) => Math.min(100, (v / 10) * 100),
  },
  {
    id: "color-count",
    label: "Distinct colors used",
    principle: "Visual Complexity",
    description: "More than 5 distinct hues increases categorization effort. Color should encode meaning, not decoration.",
    min: 1, max: 15, unit: "colors", defaultVal: 4, weight: 0.9,
    higherIsBetter: false,
    compute: (v) => Math.min(100, ((v - 1) / 14) * 100),
  },
  {
    id: "interactive-elements",
    label: "Interactive elements",
    principle: "Gulf of Execution",
    description: "Each interactive element requires users to form and test a mental model. More affordances = more overhead.",
    min: 0, max: 30, unit: "elements", defaultVal: 8, weight: 1.0,
    higherIsBetter: false,
    compute: (v) => Math.min(100, (v / 30) * 100),
  },
  {
    id: "avg-sentence",
    label: "Avg sentence length",
    principle: "Processing Fluency",
    description: "Longer sentences require more working memory to parse. Ideal prose stays under 20 words per sentence.",
    min: 5, max: 50, unit: "words", defaultVal: 18, weight: 1.1,
    higherIsBetter: false,
    compute: (v) => Math.min(100, ((v - 5) / 45) * 100),
  },
  {
    id: "familiar-patterns",
    label: "Familiar UI patterns used",
    principle: "Recognition over Recall",
    description: "Standard patterns reduce load because users already have the mental model. Novelty has a cognitive cost.",
    min: 0, max: 10, unit: "patterns", defaultVal: 5, weight: 1.3,
    higherIsBetter: true,
    compute: (v) => Math.max(0, 100 - (v / 10) * 100),
  },
]

function scoreColor(score: number) {
  if (score < 30) return "text-green-500"
  if (score < 55) return "text-yellow-500"
  if (score < 75) return "text-orange-500"
  return "text-red-500"
}
function barColor(score: number) {
  if (score < 30) return "bg-green-500"
  if (score < 55) return "bg-yellow-500"
  if (score < 75) return "bg-orange-500"
  return "bg-red-500"
}
function scoreLabel(score: number) {
  if (score < 30) return "low load ✓"
  if (score < 55) return "moderate"
  if (score < 75) return "high load"
  return "overloaded"
}

export function CognitiveLoadMeter() {
  const [isVisible, setIsVisible] = useState(false)
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(FACTORS.map((f) => [f.id, f.defaultVal]))
  )
  const [expandedFactor, setExpandedFactor] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const totalWeight = FACTORS.reduce((sum, f) => sum + f.weight, 0)
  const score = Math.round(
    FACTORS.reduce((sum, f) => sum + f.compute(values[f.id]) * f.weight, 0) / totalWeight
  )

  const topContributors = [...FACTORS]
    .sort((a, b) => b.compute(values[b.id]) * b.weight - a.compute(values[a.id]) * a.weight)
    .slice(0, 3)

  return (
    <section ref={sectionRef} className="overflow-x-clip px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-10 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">hci tools;</p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Cognitive Load Meter</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">Score a page's cognitive demand using actual HCI principles (adjust the sliders to match your interface, read the theory underneath)</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Score display */}
          <div className={cn("lg:col-span-1 flex flex-col gap-5 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "80ms" }}>
            <div className="rounded-xl border border-border/50 bg-card/40 glass p-6 text-center space-y-4 sticky top-24">
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground">cognitive load score</p>
              <p className={cn("text-6xl font-bold tabular-nums transition-all duration-300", scoreColor(score))}>{score}</p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/50">
                <div className={cn("h-full rounded-full transition-all duration-500", barColor(score))}
                  style={{ width: `${score}%` }} />
              </div>
              <p className={cn("font-mono text-sm font-semibold transition-colors", scoreColor(score))}>
                {scoreLabel(score)}
              </p>

              {/* Top contributors */}
              <div className="border-t border-border/40 pt-4 space-y-2 text-left">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground">top contributors</p>
                {topContributors.map((f) => {
                  const contrib = Math.round(f.compute(values[f.id]))
                  return (
                    <div key={f.id} className="flex items-center justify-between gap-2">
                      <p className="font-mono text-[10px] text-muted-foreground truncate">{f.label}</p>
                      <span className={cn("font-mono text-[10px] font-semibold shrink-0", contrib > 60 ? "text-red-400" : contrib > 30 ? "text-yellow-400" : "text-green-400")}>
                        {contrib}
                      </span>
                    </div>
                  )
                })}
              </div>

              <button onClick={() => setValues(Object.fromEntries(FACTORS.map((f) => [f.id, f.defaultVal])))}
                className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors">
                reset to defaults
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className={cn("lg:col-span-2 space-y-3 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "130ms" }}>
            {FACTORS.map((factor, i) => {
              const val = values[factor.id]
              const contrib = Math.round(factor.compute(val))
              const isExpanded = expandedFactor === factor.id
              return (
                <div key={factor.id}
                  className={cn("rounded-xl border bg-card/40 glass transition-all duration-300 overflow-hidden",
                    isExpanded ? "border-primary/30" : "border-border/50")}
                  style={{ animationDelay: `${i * 40 + 150}ms` }}>
                  <div className="px-5 py-4 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <p className="font-mono text-xs font-semibold text-foreground truncate">{factor.label}</p>
                        <button onClick={() => setExpandedFactor(isExpanded ? null : factor.id)}
                          className="text-muted-foreground hover:text-primary transition-colors shrink-0">
                          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <Info className="h-3 w-3" />}
                        </button>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-xs font-semibold text-foreground">{val} {factor.unit}</span>
                        <span className={cn("font-mono text-[9px] rounded-full border px-1.5 py-0.5",
                          contrib > 60 ? "border-red-500/30 bg-red-500/10 text-red-400"
                          : contrib > 30 ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                          : "border-green-500/30 bg-green-500/10 text-green-400")}>
                          {contrib}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[9px] text-muted-foreground shrink-0">{factor.min}</span>
                      <input type="range" min={factor.min} max={factor.max} step={1} value={val}
                        onChange={(e) => setValues((prev) => ({ ...prev, [factor.id]: Number(e.target.value) }))}
                        className="flex-1 accent-primary h-1 cursor-pointer" />
                      <span className="font-mono text-[9px] text-muted-foreground shrink-0">{factor.max}</span>
                    </div>

                    {/* Contribution bar */}
                    <div className="h-1 w-full overflow-hidden rounded-full bg-secondary/40">
                      <div className={cn("h-full rounded-full transition-all duration-300", barColor(contrib))}
                        style={{ width: `${contrib}%` }} />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-border/40 px-5 pb-4 pt-3 animate-fade-in-up space-y-1.5">
                      <p className="font-mono text-[10px] text-primary">{factor.principle}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{factor.description}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <p className={cn("mt-6 text-sm leading-relaxed text-muted-foreground italic opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "500ms" }}>
          This is a model, not a measurement. Real cognitive load is context-dependent and personal. The value is in the principles behind each factor, not the number itself.
        </p>
      </div>
    </section>
  )
}
