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
    <section ref={ref} className="relative overflow-x-clip px-4 sm:px-6 pt-28 sm:pt-36 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        <div className={cn("space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" />
            curated treasures;
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">Collections</h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-nowrap">
            Adventuring on Goodreads, Substack, & more. Tools, reading, lessons, & things I keep returning to.
          </p>
        </div>
      </div>
    </section>
  )
}
