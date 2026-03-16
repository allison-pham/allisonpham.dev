"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/-archive/lib/utils"

const pastRoles = [
  { role: "Board", org: "Design Services Org", period: "'23", category: "org", featured: false },
  { role: "Finance", org: "Voices x Justice Org", period: "'23", category: "org", featured: false },
  { role: "Curriculum x Content", org: "Education Org", period: "'23", category: "org", featured: false },
  { role: "Communications", org: "Sustainable Dev Org", period: "'23", category: "org", featured: false },
  { role: "Designer", org: "Current Events Reporting Project", period: "'23", category: "org", featured: false },  
  { role: "Writer", org: "Cultural Magazine", period: "'23-24", category: "org", featured: false },
  { role: "Exec Board", org: "STEM x Art Org", period: "'22-23", category: "org", featured: false },
  { role: "Editor", org: "Literary Magazine", period: "'22-23", category: "org", featured: false },
  { role: "Board", org: "Community Service Org", period: "'22-23", category: "org", featured: false },
  { role: "Founder", org: "Mental Health x Justice Nonprofit", period: "'22-24", category: "org", featured: false },
  { role: "Exec Board", org: "Music for Retirement Homes Org", period: "'21-23", category: "org", featured: false },
  { role: "Content", org: "Sports News", period: "'19-20", category: "org", featured: false },
]

const categoryColors: Record<string, string> = {
  org: "border-primary/30 bg-primary/8 text-primary",
  event: "border-border/60 bg-secondary/40 text-muted-foreground",
  work: "border-primary/50 bg-primary/12 text-primary",
  competition: "border-border/60 bg-secondary/40 text-muted-foreground",
}

const categoryLabels: Record<string, string> = {
  org: "org",
  event: "event",
  work: "work",
  competition: "competition",
}

export function PastLife() {
  const [isVisible, setIsVisible] = useState(false)
  const [filter, setFilter] = useState<string>("all")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.05 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filters = ["all", "org", "event", "work", "competition"]

  const filtered = filter === "all" ? pastRoles : pastRoles.filter((r) => r.category === filter)

  return (
    <section ref={sectionRef} className="relative px-4 sm:px-6 pb-20 sm:pb-28">
      <div className="mx-auto max-w-4xl">

        {/* Terminal header */}
        <div className={cn("mb-10 opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="rounded-xl border border-border/50 bg-card/40 glass overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border/40 px-4 py-3">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="ml-2 font-mono text-xs text-muted-foreground/60 tracking-widest">
                ~/past-life
              </span>
            </div>
            <div className="px-5 py-5 space-y-1">
              <p className="font-mono text-xs tracking-[0.25em] text-primary">past life;</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">
                Everything else I've been part of
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed pt-1 max-w-xl">
                Additional things I've done across the past several years (orgs & work). They shape how I think & work.
              </p>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className={cn("mb-6 flex flex-wrap gap-2 opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg border px-3 py-1.5 font-mono text-xs tracking-widest transition-all duration-200",
                filter === f
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-border/50 bg-card/40 text-muted-foreground hover:border-primary/30 hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Pill cloud */}
        <div className={cn("flex flex-wrap gap-2.5 opacity-0", isVisible && "animate-fade-in-up stagger-3")}>
          {filtered.map((item, index) => (
            <div
              key={`${item.org}-${item.role}-${index}`}
              className={cn(
                "group flex items-center gap-2 rounded-full border px-3.5 py-1.5 transition-all duration-200 hover-lift cursor-default",
                item.featured
                  ? "border-primary/60 bg-primary/15 text-primary"
                  : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-border hover:text-foreground",
              )}
            >
              <span className="text-sm font-medium tracking-tight">
                {item.role}
              </span>
              <span className="text-muted-foreground/50 text-xs">@</span>
              <span className="font-mono text-xs text-foreground/80">
                {item.org}
              </span>
              <span
                className={cn(
                  "ml-1 rounded font-mono text-[10px] tracking-wider opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                  "text-muted-foreground",
                )}
              >
                {item.period}
              </span>
            </div>
          ))}
        </div>

        {/* Footer count */}
        <p className={cn("mt-6 font-mono text-xs text-muted-foreground/50 opacity-0", isVisible && "animate-fade-in-up stagger-4")}>
          {filtered.length} {filter === "all" ? "entries" : filter + "s"} — hover to see year
        </p>

      </div>
    </section>
  )
}
