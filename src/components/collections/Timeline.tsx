"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/utils"

type TimelineEvent = {
  id: string
  year: string
  title: string
  description: string
  tag: string
  highlight?: boolean
}

const events: TimelineEvent[] = [
  {
    id: "start",
    year: "2019",
    title: "First line of code",
    description: "Wrote my first program and immediately wanted to understand how everything underneath it worked.",
    tag: "origin",
    highlight: false,
  },
  {
    id: "ucr",
    year: "2022",
    title: "UC Riverside — Computer Engineering",
    description: "Started studying at the intersection of CS, EE, and design. Realized I cared as much about how things felt as how they worked.",
    tag: "education",
    highlight: false,
  },
  {
    id: "nasa",
    year: "2023",
    title: "Built at NASA",
    description: "Worked on real systems under real constraints. Learned what it means to design for environments where failure isn't an option.",
    tag: "experience",
    highlight: true,
  },
  {
    id: "nucleo",
    year: "2023",
    title: "Nucleo",
    description: "Early product work — going from idea to shipped interface. First taste of the 0→1 problem.",
    tag: "experience",
    highlight: false,
  },
  {
    id: "acm",
    year: "2024",
    title: "ACM President + Hackathon Director",
    description: "Led ACM at UCR, directed Citrus Hack and Cutie Hack. Built the instinct for leading systems of people, not just code.",
    tag: "leadership",
    highlight: true,
  },
  {
    id: "notion",
    year: "2024",
    title: "Notion Campus Leader",
    description: "Joined Notion's campus program — thinking about how tools shape the way people organize thought.",
    tag: "community",
    highlight: false,
  },
  {
    id: "hci-research",
    year: "2025",
    title: "HCI research — space interfaces",
    description: "Started researching human-computer interaction for extreme environments. What does it mean to design cognition under pressure?",
    tag: "research",
    highlight: true,
  },
  {
    id: "now",
    year: "now",
    title: "Building at the intersection",
    description: "Designing systems that feel like extensions of the mind. Somewhere between software, cognition, and product.",
    tag: "present",
    highlight: true,
  },
]

const tagColors: Record<string, string> = {
  origin: "border-primary/40 bg-primary/10 text-primary",
  education: "border-border/80 bg-secondary/60 text-secondary-foreground",
  experience: "border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  leadership: "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  community: "border-border/80 bg-secondary/60 text-secondary-foreground",
  research: "border-primary/40 bg-primary/10 text-primary",
  present: "border-primary/60 bg-primary/15 text-primary",
}

export function Timeline() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
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
            <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">origin story;</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">How I Got Here ↯</h2>
          </div>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] sm:left-1/2 top-0 bottom-0 w-px bg-border/50 sm:-translate-x-px" />

          <div className="space-y-0">
            {events.map((event, index) => {
              const isRight = index % 2 === 0
              return (
                <div
                  key={event.id}
                  className={cn(
                    "relative flex gap-6 sm:gap-0 pb-10 opacity-0",
                    isVisible && "animate-fade-in-up",
                    "sm:grid sm:grid-cols-2",
                  )}
                  style={{ animationDelay: `${index * 80 + 200}ms` }}
                  onMouseEnter={() => setActiveId(event.id)}
                  onMouseLeave={() => setActiveId(null)}
                >
                  {/* Dot */}
                  <div className={cn(
                    "absolute left-0 sm:left-1/2 top-1 h-3.5 w-3.5 rounded-full border-2 z-10 transition-all duration-300 sm:-translate-x-1/2",
                    event.highlight
                      ? "border-primary bg-primary/40"
                      : "border-border bg-background",
                    activeId === event.id && "border-primary bg-primary scale-125",
                  )} />

                  {/* Content — alternates sides on desktop */}
                  <div className={cn(
                    "pl-8 sm:pl-0 sm:pr-10",
                    !isRight && "sm:col-start-2 sm:pl-10 sm:pr-0",
                    isRight && "sm:col-start-1 sm:text-right",
                  )}>
                    <div className={cn(
                      "group rounded-xl border bg-card/40 glass p-5 transition-all duration-300 hover:border-primary/40 hover-lift",
                      event.highlight ? "border-primary/25" : "border-border/50",
                    )}>
                      <div className={cn("mb-3 flex items-center gap-3 flex-wrap", isRight && "sm:justify-end")}>
                        <span className="font-mono text-xs font-bold text-primary">{event.year}</span>
                        <span className={cn(
                          "rounded-md border px-2 py-0.5 font-mono text-[10px]",
                          tagColors[event.tag] ?? "border-border/80 bg-secondary/60 text-secondary-foreground"
                        )}>
                          {event.tag}
                        </span>
                      </div>
                      <h3 className="mb-2 font-bold tracking-tight text-sm sm:text-base transition-colors group-hover:text-primary">
                        {event.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty cell for alternating layout */}
                  {isRight && <div className="hidden sm:block" />}
                  {!isRight && <div className="hidden sm:block sm:col-start-1" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}