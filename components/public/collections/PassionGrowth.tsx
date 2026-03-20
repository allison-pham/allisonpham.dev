"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Target, Palette, Sparkles, Heart, FileText } from "lucide-react"

interface PassionItem {
  id: number
  passion: string
  icon: React.ReactNode
  level: "emerging" | "growing" | "thriving"
  description: string
  startedYear: string
  milestones: string[]
}

const passionData: PassionItem[] = [
  {
    id: 1,
    passion: "Systems Programming",
    icon: <Target className="h-5 w-5" />,
    level: "growing",
    description: "Building from scratch, understanding low-level computing",
    startedYear: "2024",
    milestones: ["Learned assembly basics"]
  }
]

const levelConfig = {
  emerging: { bar: "w-[30%] bg-yellow-500", badge: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30" },
  growing:  { bar: "w-[60%] bg-orange-500", badge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30" },
  thriving: { bar: "w-[90%] bg-primary",    badge: "bg-primary/10 text-primary border-primary/30" },
}

export function PassionGrowth() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative px-4 sm:px-6 pt-16 sm:pt-16 pb-8 sm:pb-12">
      <div className={cn("mx-auto w-full max-w-7xl opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Passion Growth</h2>
      </div>
      <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
        Tracking the evolution of interests over time.
      </p>

      <div className="flex flex-wrap gap-4 mb-8 p-4 rounded-xl border border-border bg-card/40 glass">
        {(["emerging", "growing", "thriving"] as const).map((level) => (
          <div key={level} className="flex items-center gap-2 text-xs">
            <span className={cn("w-3 h-3 rounded-full", level === "emerging" ? "bg-yellow-500" : level === "growing" ? "bg-orange-500" : "bg-primary")} />
            <span className="text-muted-foreground capitalize">{level}</span>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {passionData.map((passion, index) => (
          <div
            key={passion.id}
            className={cn("group rounded-xl border bg-card/40 p-5 glass transition-all duration-300 cursor-pointer hover:border-primary/40 opacity-0", isVisible && "animate-fade-in-up", expandedId === passion.id && "border-primary/50 bg-primary/5")}
            style={{ animationDelay: `${index * 100 + 200}ms` }}
            onClick={() => setExpandedId(expandedId === passion.id ? null : passion.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-secondary/60">{passion.icon}</div>
              <span className={cn("px-2 py-0.5 rounded-full border font-mono text-[10px] uppercase", levelConfig[passion.level].badge)}>
                {passion.level}
              </span>
            </div>
            <h3 className="font-bold mb-1">{passion.passion}</h3>
            <p className="text-sm text-muted-foreground mb-3">{passion.description}</p>
            <p className="font-mono text-xs text-muted-foreground mb-3">Since {passion.startedYear}</p>
            <div className="h-1.5 w-full rounded-full bg-secondary/80 overflow-hidden">
              <div className={cn("h-full rounded-full transition-all duration-700", levelConfig[passion.level].bar)} />
            </div>
            {expandedId === passion.id && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="font-mono text-xs text-muted-foreground mb-2">Milestones</p>
                <ul className="space-y-1">
                  {passion.milestones.map((m, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />{m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {(["thriving", "growing", "emerging"] as const).map((level) => (
          <div key={level} className="rounded-xl border border-border bg-card/40 p-5 glass text-center">
            <p className={cn("text-3xl font-bold", level === "thriving" ? "text-primary" : level === "growing" ? "text-orange-500" : "text-yellow-500")}>
              {passionData.filter((p) => p.level === level).length}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-1 capitalize">{level}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
