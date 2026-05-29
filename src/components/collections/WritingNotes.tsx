"use client"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/utils"
import { ArrowRight, PenLine } from "lucide-react"

type Note = {
  id: string
  title: string
  excerpt: string
  tag: string
  date: string
  slug: string
}

const notes: Note[] = [
  {
    id: "1",
    title: "Cognitive load & interface design",
    excerpt: "Why the best interfaces feel effortless — and what happens when they don't. Notes on mental models, working memory, and the hidden cost of a bad UI.",
    tag: "HCI",
    date: "May 2026",
    slug: "cognitive-load-interfaces",
  },
  {
    id: "2",
    title: "Designing under pressure: space systems",
    excerpt: "What astronaut UX teaches us about designing for high-stakes, time-constrained environments. The overlap with everyday product design is surprising.",
    tag: "research",
    date: "Apr 2026",
    slug: "designing-for-space",
  },
  {
    id: "3",
    title: "The 0→1 problem",
    excerpt: "Getting from nothing to something is a different skill than scaling. Reflections on starting projects, building conviction, and knowing when to ship.",
    tag: "building",
    date: "Mar 2026",
    slug: "zero-to-one",
  },
]

export function WritingNotes() {
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

        <div className={cn("mb-10 sm:mb-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">brain dumps;</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Writing ✦ Notes</h2>
          </div>
          <Link
            href="/writing"
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            See all notes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="space-y-4">
          {notes.map((note, index) => (
            <Link
              key={note.id}
              href={`/writing/${note.slug}`}
              className={cn(
                "group relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 rounded-xl border border-border/60 bg-card/40 glass p-6 sm:p-7 hover-lift transition-all duration-400 hover:border-primary/40 opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <span className="hidden sm:block font-mono text-3xl font-bold text-primary/15 select-none shrink-0 leading-none mt-0.5 transition-colors group-hover:text-primary/30">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="rounded-md border border-border/80 bg-secondary/60 px-2 py-0.5 font-mono text-[10px] text-secondary-foreground">
                    {note.tag}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60">{note.date}</span>
                </div>
                <h3 className="font-bold tracking-tight text-base sm:text-lg transition-colors group-hover:text-primary">
                  {note.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {note.excerpt}
                </p>
              </div>

              <ArrowRight className="hidden sm:block h-4 w-4 text-muted-foreground/40 shrink-0 mt-1 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1" />

              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full rounded-b-xl" />
            </Link>
          ))}
        </div>

        <div className={cn("mt-8 flex items-center gap-3 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "500ms" }}>
          <PenLine className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />
          <p className="font-mono text-xs text-muted-foreground/60">
            notes on HCI, building, cognition, and whatever ends up at the bottom of a good cup of tea
          </p>
        </div>
      </div>
    </section>
  )
}