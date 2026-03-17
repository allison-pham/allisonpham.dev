"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Lightbulb, Quote, ExternalLink, Tag } from "lucide-react"

type InspirationCategory = "design" | "code" | "philosophy" | "art" | "quote"

interface InspirationItem {
  id: number
  category: InspirationCategory
  title: string
  source?: string
  description: string
  url?: string
  accentColor: string
  size?: "normal" | "wide" | "tall"
}

const categoryConfig: Record<InspirationCategory, { label: string; color: string }> = {
  design:     { label: "design",      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30" },
  code:       { label: "code",        color: "bg-primary/10 text-primary border-primary/30" },
  philosophy: { label: "philosophy",  color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
  art:        { label: "art",         color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30" },
  quote:      { label: "quote",       color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30" },
}

const inspirationItems: InspirationItem[] = [
  {
    id: 1, category: "quote", size: "wide",
    title: "It's not about ideas. It's about making ideas happen.",
    source: "Scott Belsky",
    description: "The execution gap is where most ideas die. Ship it, then refine.",
    accentColor: "border-l-yellow-500",
  },
]

const allCategories = Object.keys(categoryConfig) as InspirationCategory[]

export function InspirationBoard() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState<InspirationCategory | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const filtered = activeCategory
    ? inspirationItems.filter((i) => i.category === activeCategory)
    : inspirationItems

  return (
    <section ref={ref} className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className={cn("mb-10 space-y-2 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">
            <Lightbulb className="h-3.5 w-3.5" />
            collected sparks;
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Inspiration Board</h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Ideas, quotes, people, & concepts that keep showing up in how I think & build.</p>
        </div>

        {/* Category filter */}
        <div className={cn("flex flex-wrap gap-2 mb-10 opacity-0", isVisible && "animate-fade-in-up stagger-1")}>
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all duration-200",
              !activeCategory ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            )}
          >
            <Tag className="h-3 w-3" /> all
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all duration-200",
                activeCategory === cat ? categoryConfig[cat].color : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              )}
            >
              {categoryConfig[cat].label}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-0">
          {filtered.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "break-inside-avoid mb-4 rounded-xl border border-l-4 bg-card/40 glass p-5 hover:border-primary/40 transition-all duration-300 opacity-0",
                item.accentColor,
                "border-border",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 60 + 200}ms` }}
            >
              {/* Category tag */}
              <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-mono text-[10px] mb-3", categoryConfig[item.category].color)}>
                {item.category === "quote" ? <Quote className="h-2.5 w-2.5" /> : <Tag className="h-2.5 w-2.5" />}
                {categoryConfig[item.category].label}
              </span>

              {/* Content */}
              <h3 className={cn("font-medium mb-2 leading-snug", item.category === "quote" ? "italic text-base" : "text-sm")}>
                {item.category === "quote" ? `"${item.title}"` : item.title}
              </h3>

              {item.source && (
                <p className="font-mono text-xs text-primary mb-2">— {item.source}</p>
              )}

              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}