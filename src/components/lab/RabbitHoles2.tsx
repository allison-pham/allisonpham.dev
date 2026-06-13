"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/core-features/utils"
import { ExternalLink } from "lucide-react"

type RabbitHole = {
  id: string
  title: string
  description: string
  type: "concept" | "paper" | "tool" | "question"
  link?: string
  hot?: boolean // currently most active
}

const rabbitHoles: RabbitHole[] = [
  {
    id: "cognitive-load",
    title: "Cognitive load in interface design",
    description: "How much mental effort does a UI silently demand? Why do some products feel like thinking and others feel like flow?",
    type: "concept",
    hot: true,
  },
  {
    id: "space-hci",
    title: "Designing cognition under pressure",
    description: "Astronaut UX, emergency interfaces, and what extreme constraints reveal about everyday design decisions.",
    type: "concept",
    hot: true,
  },
  {
    id: "dual-process",
    title: "Dual-process theory × product design",
    description: "System 1 vs System 2 thinking - and how interfaces can either support or hijack both modes.",
    type: "concept",
  },
  {
    id: "notion-as-thought",
    title: "Tools that shape how people think",
    description: "Not just productivity tools - but how the structure of a tool becomes the structure of thought. Notion, Roam, Obsidian as case studies.",
    type: "question",
  },
  {
    id: "affordances",
    title: "Affordances & signifiers (Gibson → Norman)",
    description: "The gap between what something can do and what people perceive it can do. Still the most underused idea in product design.",
    type: "paper",
  },
  {
    id: "tea",
    title: "Whatever is at the bottom of a good cup of tea",
    description: "Unclassified. Updates without warning.",
    type: "question",
    hot: false,
  },
]

const typeConfig = {
  concept: { label: "concept", style: "border-primary/40 bg-primary/10 text-primary" },
  paper: { label: "paper", style: "border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" },
  tool: { label: "tool", style: "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  question: { label: "question", style: "border-border/80 bg-secondary/60 text-secondary-foreground" },
}

export function RabbitHoles2() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">

        <div className={cn("mb-10 sm:mb-14 opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">current obsessions;</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Rabbit Holes ↓</h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Things I'm actively thinking about, reading into, or unable to stop asking questions about.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rabbitHoles.map((hole, index) => {
            const type = typeConfig[hole.type]
            return (
              <div
                key={hole.id}
                className={cn(
                  "group relative flex flex-col gap-3 rounded-xl border bg-card/40 glass p-5 sm:p-6 transition-all duration-400 hover-lift hover:border-primary/40 opacity-0",
                  isVisible && "animate-fade-in-up",
                  hole.hot ? "border-primary/25" : "border-border/60",
                )}
                style={{ animationDelay: `${index * 80 + 200}ms` }}
              >
                {/* Hot indicator */}
                {hole.hot && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[10px] text-primary">active</span>
                  </div>
                )}

                <span className={cn(
                  "w-fit rounded-md border px-2 py-0.5 font-mono text-[10px]",
                  type.style
                )}>
                  {type.label}
                </span>

                <div className="flex-1 space-y-2">
                  <h3 className={cn(
                    "font-bold tracking-tight text-sm leading-snug transition-colors group-hover:text-primary",
                    hole.hot && "pr-14",
                  )}>
                    {hole.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {hole.description}
                  </p>
                </div>

                {hole.link && (
                  <a
                    href={hole.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ExternalLink className="h-3 w-3" />
                    source
                  </a>
                )}

                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full rounded-b-xl" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}