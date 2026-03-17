"use client"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

export function CollectionsIntro() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="px-4 sm:px-6 pt-28 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className={cn("mb-12 sm:mb-16 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            curated treasures;
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">Collections</h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Adventuring on Goodreads, Substack, & more. Tools, reading, lessons, & things I keep returning to.
          </p>
        </div>
      </div>
    </section>
  )
}
