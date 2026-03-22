"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { BookText, Compass, Newspaper, Sparkles, Tag } from "lucide-react"

interface FeatureStory {
  id: string
  title: string
  deck: string
  category: string
  readTime: string
}

interface SideColumnItem {
  id: string
  label: string
  detail: string
}

interface MiniIssue {
  id: string
  issue: string
  title: string
  blurb: string
}

const featureStory: FeatureStory = {
  id: "issue-001",
  title: "An Archive of Curiosity",
  deck:
    "A running magazine of references, fragments, and recurring ideas that keep shaping how I build, learn, and live.",
  category: "cover story",
  readTime: "8 min",
}

const sideColumnItems: SideColumnItem[] = [
  {
    id: "signal-01",
    label: "Signals",
    detail: "books that rewired my thinking",
  },
  {
    id: "signal-02",
    label: "Field Notes",
    detail: "moments worth preserving before they fade",
  },
  {
    id: "signal-03",
    label: "Recurring Themes",
    detail: "systems, taste, and playful experimentation",
  },
]

const miniIssues: MiniIssue[] = [
  {
    id: "issue-002",
    issue: "issue 002",
    title: "Bookmarks as a Living Library",
    blurb: "From essays to talks, references I revisit when I need clarity.",
  },
  {
    id: "issue-003",
    issue: "issue 003",
    title: "Second Brain, In Public",
    blurb: "Notes, fragments, and thoughts still in progress.",
  },
  {
    id: "issue-004",
    issue: "issue 004",
    title: "Photo Dumps as Memory Maps",
    blurb: "Snapshots and scenes that capture specific seasons of life.",
  },
]

export function CollectionsMagazine() {
  const [isVisible, setIsVisible] = useState(false)
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
    <section ref={ref} className="relative px-4 sm:px-6 pt-8 sm:pt-10 pb-8 sm:pb-12">
      <div className={cn("mx-auto w-full max-w-7xl opacity-0", isVisible && "animate-fade-in-up")}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-y border-border/70 py-3">
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-primary flex items-center gap-2">
            <Newspaper className="h-3.5 w-3.5" />
            collections journal;
          </p>
          <p className="font-mono text-[10px] sm:text-xs text-muted-foreground tracking-[0.18em]">
            vol. 1 • curated dispatches
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
          <article
            className={cn(
              "rounded-xl border border-border bg-card/40 glass p-6 sm:p-7 space-y-5 opacity-0",
              isVisible && "animate-fade-in-up"
            )}
            style={{ animationDelay: "80ms" }}
          >
            <p className="font-mono text-[10px] tracking-[0.22em] text-primary flex items-center gap-2">
              <Tag className="h-3.5 w-3.5" />
              {featureStory.category}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.7rem] leading-tight text-balance">
              {featureStory.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{featureStory.deck}</p>
            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <BookText className="h-3.5 w-3.5" />
                {featureStory.readTime}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/70" />
              <span className="flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5" />
                editorial opener
              </span>
            </div>
          </article>

          <aside
            className={cn(
              "rounded-xl border border-border bg-card/40 glass p-5 sm:p-6 space-y-4 opacity-0",
              isVisible && "animate-fade-in-up"
            )}
            style={{ animationDelay: "170ms" }}
          >
            <p className="font-mono text-[10px] tracking-[0.2em] text-primary flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              in this issue;
            </p>
            <div className="space-y-3">
              {sideColumnItems.map((item) => (
                <div key={item.id} className="rounded-lg border border-border/60 bg-secondary/20 px-4 py-3">
                  <p className="font-mono text-[10px] tracking-widest text-primary">{item.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {miniIssues.map((issue, index) => (
            <article
              key={issue.id}
              className={cn(
                "rounded-xl border border-border bg-card/35 glass px-5 py-4 space-y-2 opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${240 + index * 80}ms` }}
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-primary">{issue.issue}</p>
              <h3 className="font-semibold text-base leading-snug">{issue.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{issue.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
