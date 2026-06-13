"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/core-features/utils"
import { ExternalLink, Filter } from "lucide-react"
import { reads, allReadTags, groupReadsByWeek, type Read } from "@/src/lib/reads"

function formatWeekLabel(weekKey: string): string {
  // weekKey = "2026-W22"
  const [year, w] = weekKey.split("-W")
  const weekNum = parseInt(w, 10)
  // Get Monday of that ISO week
  const jan4 = new Date(parseInt(year, 10), 0, 4)
  const monday = new Date(jan4)
  monday.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7) + (weekNum - 1) * 7)
  return monday.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export function WhatIRead() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filtered = activeTag ? reads.filter((r) => r.tags.includes(activeTag)) : reads
  const grouped = groupReadsByWeek(filtered)
  const sortedWeeks = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <section
      ref={sectionRef}
      className="overflow-x-clip px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-20"
    >
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className={cn("mb-12 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            reading log;
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            What I Read ✦
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Things I've read that shifted something. One sentence per link - the constraint keeps it honest.
          </p>
        </div>

        {/* Tag filter */}
        <div
          className={cn("mb-10 flex flex-wrap items-center gap-2 opacity-0", isVisible && "animate-fade-in-up")}
          style={{ animationDelay: "80ms" }}
        >
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <button
            onClick={() => setActiveTag(null)}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all duration-200 active:scale-[0.98]",
              activeTag === null
                ? "border-primary bg-primary/15 text-primary"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            )}
          >
            all
          </button>
          {allReadTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={cn(
                "rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all duration-200 active:scale-[0.98]",
                activeTag === tag
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grouped by week */}
        <div className="space-y-12">
          {sortedWeeks.map((week, wi) => (
            <div
              key={week}
              className={cn("opacity-0", isVisible && "animate-fade-in-up")}
              style={{ animationDelay: `${wi * 60 + 120}ms` }}
            >
              {/* Week label */}
              <div className="mb-5 flex items-center gap-4">
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground whitespace-nowrap">
                  week of {formatWeekLabel(week)}
                </p>
                <div className="h-px flex-1 bg-border/40" />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {grouped[week].length} read{grouped[week].length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Reads */}
              <div className="flex flex-col gap-3">
                {grouped[week].map((read, i) => (
                  <ReadCard
                    key={read.url}
                    read={read}
                    index={i}
                    isVisible={isVisible}
                    delay={wi * 60 + i * 50 + 160}
                    activeTag={activeTag}
                    onTagClick={(tag) => setActiveTag(activeTag === tag ? null : tag)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-mono text-sm text-muted-foreground">No reads tagged with "{activeTag}".</p>
          </div>
        )}

      </div>
    </section>
  )
}

function ReadCard({
  read,
  isVisible,
  delay,
  activeTag,
  onTagClick,
}: {
  read: Read
  index: number
  isVisible: boolean
  delay: number
  activeTag: string | null
  onTagClick: (tag: string) => void
}) {
  return (
    <a
      href={read.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl border border-border/50 bg-card/40 glass p-5 sm:p-6 hover-lift transition-all duration-300 hover:border-primary/30 opacity-0",
        isVisible && "animate-fade-in-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Title row */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-0.5 min-w-0">
          <p className="font-mono text-sm font-semibold tracking-wider text-foreground transition-colors group-hover:text-primary line-clamp-1">
            {read.title}
          </p>
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground">
            {read.source}
          </p>
        </div>
        <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110 mt-0.5" />
      </div>

      {/* Why sentence */}
      <p className="text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/25 pl-3">
        {read.why}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {read.tags.map((tag) => (
          <button
            key={tag}
            onClick={(e) => { e.preventDefault(); onTagClick(tag) }}
            className={cn(
              "rounded-md border px-2 py-0.5 font-mono text-[9px] tracking-wider transition-colors duration-200",
              activeTag === tag
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border/60 bg-secondary/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
    </a>
  )
}