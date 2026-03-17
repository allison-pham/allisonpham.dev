"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Calendar, Briefcase, GraduationCap, Rocket, Heart, Code2, Award, MapPin } from "lucide-react"

interface TimelineEvent {
  id: number
  year: string
  month?: string
  title: string
  description: string
  category: "work" | "education" | "project" | "personal" | "achievement"
  location?: string
  highlight?: boolean
}

const timelineData: TimelineEvent[] = [
  {
    id: 1,
    year: "2026",
    month: "Present",
    title: "Building New Projects",
    description: "To be added.",
    category: "project",
    highlight: true,
  },
]

const categoryIcons = {
  work: Briefcase,
  education: GraduationCap,
  project: Rocket,
  personal: Heart,
  achievement: Award,
}

const categoryColors = {
  work: "bg-blue-500",
  education: "bg-yellow-500",
  project: "bg-primary",
  personal: "bg-pink-500",
  achievement: "bg-orange-500",
}

export function TimelineContent() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const years = [...new Set(timelineData.map((e) => e.year))].sort((a, b) => Number(b) - Number(a))
  const filteredEvents = selectedYear
    ? timelineData.filter((e) => e.year === selectedYear)
    : timelineData

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 pt-28 pb-20">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <div className={cn("mb-12 sm:mb-16 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            journey through time;
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Timeline of Years</h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            A chronological journey through milestones, projects, and pivotal moments that shaped who I am today.
          </p>
        </div>

        {/* Year Filter */}
        <div
          className={cn(
            "flex gap-2 flex-wrap mb-10 opacity-0",
            isVisible && "animate-fade-in-up stagger-1"
          )}
        >
          <button
            onClick={() => setSelectedYear(null)}
            className={cn(
              "px-4 py-2 rounded-lg border font-mono text-xs uppercase tracking-wider transition-all duration-300",
              !selectedYear
                ? "border-primary bg-primary/15 text-primary"
                : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
            )}
          >
            All
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={cn(
                "px-4 py-2 rounded-lg border font-mono text-xs uppercase tracking-wider transition-all duration-300",
                selectedYear === year
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
              )}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div
          className={cn(
            "flex flex-wrap gap-4 mb-10 p-4 rounded-xl border border-border bg-card/40 glass opacity-0",
            isVisible && "animate-fade-in-up stagger-2"
          )}
        >
          {(Object.keys(categoryColors) as Array<keyof typeof categoryColors>).map((cat) => {
            const Icon = categoryIcons[cat]
            return (
              <div key={cat} className="flex items-center gap-2 text-xs">
                <span className={cn("w-3 h-3 rounded-full", categoryColors[cat])} />
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground capitalize">{cat}</span>
              </div>
            )
          })}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border sm:-translate-x-px" />

          <div className="space-y-8">
            {filteredEvents.map((event, index) => {
              const Icon = categoryIcons[event.category]
              const isLeft = index % 2 === 0

              return (
                <div
                  key={event.id}
                  className={cn(
                    "relative grid gap-4 opacity-0",
                    isVisible && "animate-fade-in-up",
                    "sm:grid-cols-2"
                  )}
                  style={{ animationDelay: `${index * 100 + 300}ms` }}
                >
                  {/* Content */}
                  <div
                    className={cn(
                      "pl-12 sm:pl-0",
                      isLeft ? "sm:pr-12 sm:text-right" : "sm:col-start-2 sm:pl-12"
                    )}
                  >
                    <div
                      className={cn(
                        "group rounded-xl border bg-card/40 p-5 glass transition-all duration-300 hover:border-primary/40",
                        event.highlight && "border-primary/30 bg-gradient-to-br from-primary/5 to-transparent"
                      )}
                    >
                      <div className={cn("flex items-center gap-2 mb-2", isLeft && "sm:justify-end")}>
                        <span className="font-mono text-xs text-primary">{event.year}</span>
                        {event.month && (
                          <>
                            <span className="text-muted-foreground">/</span>
                            <span className="font-mono text-xs text-muted-foreground">{event.month}</span>
                          </>
                        )}
                      </div>

                      <h3 className="font-bold text-lg mb-2 group-hover:text-gradient transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {event.description}
                      </p>

                      {event.location && (
                        <div className={cn("flex items-center gap-1 text-xs text-muted-foreground", isLeft && "sm:justify-end")}>
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Empty space for alternating layout on desktop */}
                  {!isLeft && <div className="hidden sm:block" />}

                  {/* Timeline Node */}
                  <div
                    className={cn(
                      "absolute left-4 sm:left-1/2 w-8 h-8 -translate-x-1/2 flex items-center justify-center",
                      "rounded-full border-2 bg-background transition-all duration-300",
                      categoryColors[event.category].replace("bg-", "border-"),
                      event.highlight && "scale-110"
                    )}
                    style={{ top: "1.25rem" }}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        categoryColors[event.category].replace("bg-", "text-").replace("-500", "-500")
                      )}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <div
          className={cn(
            "mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 opacity-0",
            isVisible && "animate-fade-in-up"
          )}
          style={{ animationDelay: `${filteredEvents.length * 100 + 500}ms` }}
        >
          <div className="rounded-xl border border-border bg-card/40 p-5 glass text-center">
            <p className="text-3xl font-bold text-primary">{years.length}</p>
            <p className="font-mono text-xs text-muted-foreground mt-1">Years Tracked</p>
          </div>
          <div className="rounded-xl border border-border bg-card/40 p-5 glass text-center">
            <p className="text-3xl font-bold text-foreground">
              {timelineData.filter((e) => e.category === "project").length}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-1">Projects</p>
          </div>
          <div className="rounded-xl border border-border bg-card/40 p-5 glass text-center">
            <p className="text-3xl font-bold text-foreground">
              {timelineData.filter((e) => e.highlight).length}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-1">Highlights</p>
          </div>
          <div className="rounded-xl border border-border bg-card/40 p-5 glass text-center">
            <p className="text-3xl font-bold text-foreground">{timelineData.length}</p>
            <p className="font-mono text-xs text-muted-foreground mt-1">Total Events</p>
          </div>
        </div>
      </div>
    </section>
  )
}