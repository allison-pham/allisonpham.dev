"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const pastRoles = [
  { role: "Co-Founder", org: "Literature x Community Org", period: "", category: "org", featured: false },
  { role: "Software Engineering", org: "Community Org", period: "", category: "org", featured: false },
  { role: "Neuro Research", org: "Pediatrics Org", period: "", category: "org", featured: false },
  { role: "Exec Board", org: "Justice Org", period: "", category: "org", featured: false },
  { role: "Designer", org: "Justice Org", period: "", category: "org", featured: false },
  { role: "Engineering Representative", org: "Student Gov", period: "", category: "org", featured: true },
  { role: "Designer", org: "Event Org", period: "", category: "org", featured: false },
  { role: "Marketing", org: "Justice Org", period: "", category: "org", featured: false },
  { role: "Media Content", org: "Cultural Magazine", period: "", category: "org", featured: false },
  { role: "Transcriber", org: "Speaking Org", period: "", category: "org", featured: false },
  { role: "Events & Community", org: "Accessible Opportunities Org", period: "", category: "org", featured: true },
  { role: "Designer & Editor", org: "Mental Health Org", period: "", category: "org", featured: false },
  { role: "Content", org: "Justice Magazine", period: "", category: "org", featured: false },
  { role: "Events", org: "Creativity Org", period: "", category: "org", featured: true },
  { role: "Finance", org: "Health x Story Org", period: "", category: "org", featured: false },
  { role: "Board", org: "Design Services Org", period: "", category: "org", featured: false },
  { role: "Finance", org: "Voices x Justice Org", period: "", category: "org", featured: false },
  { role: "Curriculum x Content", org: "Education Org", period: "", category: "org", featured: false },
  { role: "Communications", org: "Sustainable Dev Org", period: "", category: "org", featured: false },
  { role: "Designer", org: "Current Events Reporting Project", period: "", category: "org", featured: false },  
  { role: "Writer", org: "Cultural Magazine", period: "", category: "org", featured: false },
  { role: "Exec Board", org: "STEM x Art Org", period: "", category: "org", featured: false },
  { role: "Editor", org: "Literary Magazine", period: "", category: "org", featured: false },
  { role: "Board", org: "Community Service Org", period: "", category: "org", featured: false },
  { role: "Founder", org: "Mental Health x Justice Nonprofit", period: "", category: "org", featured: false },
  { role: "Exec Board", org: "Music for Retirement Homes Org", period: "", category: "org", featured: false },
  { role: "Content", org: "Sports News", period: "", category: "org", featured: false },
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
    <section ref={sectionRef} className="relative px-4 sm:px-6 pt-16 sm:pt-16 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">

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
            <div className="px-5 py-5 space-y-3">
              <p className="font-mono text-xs tracking-[0.25em] text-primary">past life;</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Everything else I've been part of
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
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
          {filtered.length} {filter === "all" ? "entries" : filter + "s"}
          {/* hover to see year */}
        </p>

      </div>
    </section>
  )
}