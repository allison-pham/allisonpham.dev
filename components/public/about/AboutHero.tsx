"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { MapPin, Coffee, Terminal } from "lucide-react"
import Image from "next/image"

const stats = [
  { label: "Engineering", value: "Resources" },
  { label: "Design", value: "Accessibility" },
  { label: "Research", value: "HCI in space" },
  { label: "Cups of tea", value: "∞" },
]

export function AboutHero() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-x-clip px-4 sm:px-6 pt-24 sm:pt-36 pb-12 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          {/* Left */}
          <div className="min-w-0 space-y-8">
            <div className={cn("space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
              <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">
                about;
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                Allison Pham ✦
              </h1>
            </div>

            <div
              className={cn(
                "flex flex-wrap items-center gap-3 opacity-0",
                isVisible && "animate-fade-in-up stagger-2",
              )}
            >
              {/* <span className="flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 text-primary" />
                United States
              </span> */}
              <span className="flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                <Terminal className="h-3 w-3 text-primary" />
                Engineering & design
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                <Coffee className="h-3 w-3 text-primary" />
                HCI & space systems
              </span>
            </div>

            <div
              className={cn(
                "space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground opacity-0",
                isVisible && "animate-fade-in-up stagger-3",
              )}
            >
              <p>
                I build through the intersection of tech, engineering, and{" "}
                <span className="font-bold italic underline decoration-wavy">product</span> to develop projects and initiatives geared towards impact from the ground up.
              </p>
              
              <p>
                I work on designing products that target the architecture behind how others think, decide, and act.
                I'm driven by the desire to ensure every system feeling like an{" "}
                <span className="font-bold italic underline decoration-wavy">extension</span> of the{" "}
                <span className="font-bold italic underline decoration-wavy">mind</span>, not a constraint on it.
              </p>

              <p>
                Productivity mixed in with resilient serendipity and serenity are my current targets.
                Thoughtful design and product engineering are a constant passion of mine.
              </p>
            </div>

            {/* Stats row */}
            <div
              className={cn(
                "grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:grid-cols-4 opacity-0",
                isVisible && "animate-fade-in-up stagger-4",
              )}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border/50 bg-card/50 glass p-4 text-center hover-lift transition-all duration-300 hover:border-primary/40"
                >
                  {stat.value}
                  <div className="mt-1 font-mono text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className={cn("relative min-w-0 opacity-0", isVisible && "animate-scale-in stagger-4")}>
            <div className="relative rounded-2xl border border-border/60 bg-card/60 glass p-4 sm:p-8 hover-lift">
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-primary/60" />
              </div>
              <div className="absolute top-3.5 left-1/2 hidden -translate-x-1/2 rounded-md bg-background/50 px-3 py-1 font-mono text-xs text-muted-foreground sm:block">
                about-allison.json
              </div>

              <pre className="mt-6 max-w-full overflow-x-auto font-mono text-xs leading-6 text-foreground/80 sm:mt-8">
                <code className="block min-w-max">{`
{
  "name": "Allison Pham",

  "current missions & targets": [
    "Computer science",
    "Electrical engineering",
    "Product design & management",
    "Human-computer interaction (HCI)",
    "Space systems"
  ],

  "involvement": [
    "President @ ACM",
    "Design & Research (Autonomous Traversal) @ NASA",
    "Director @ Citrus Hack",
    "Director @ Cutie Hack",
    "Campus Leader @ Notion"
  ],

  "status": "designing products"  
}
`}</code>
              </pre>
            </div>

            <div className="hidden sm:block absolute -right-4 -top-4 rounded-lg border border-primary/40 bg-primary/15 glass px-4 py-1.5 font-mono text-xs text-primary animate-float">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                night code sessions, fueled by tea & design curiosity 🌙
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}