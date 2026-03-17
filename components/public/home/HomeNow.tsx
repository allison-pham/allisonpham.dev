"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Radio, Book, Headphones, Code2, MapPin, Calendar } from "lucide-react"

const nowData = {
  updatedAt: "March 2026",
  location: "United States",

  focus: {
    title: "Main Focus",
    items: [
      // { label: "Building", text: "ML models" },
      { label: "Learning", text: "System design, Linux, & cloud computing" },
      // { label: "Ongoing", text: "Campus Leader @ Notion" },
    ],
  },

  reading: [
    { title: "Atomic Habits", author: "James Clear" },
  ],

  listening: [
    { title: "Lofi", type: "Playlist" },
  ],

  building: [
    "Machine learning model",
  ],
}

export function Now() {
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
    <section ref={sectionRef} id="now" className="px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className={cn("flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="space-y-2">
            <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              live snapshot;
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Now</h2>
            <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">What I'm currently working on, reading, & thinking.</p>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {nowData.updatedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {nowData.location}
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Focus */}
          <div
            className={cn(
              "lg:col-span-2 rounded-xl border border-border bg-card/40 glass p-6 opacity-0",
              isVisible && "animate-fade-in-up stagger-1"
            )}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 rounded-lg bg-primary/10">
                <Code2 className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-mono text-sm font-medium tracking-wider">Focus</h3>
            </div>
            <div className="space-y-4">
              {nowData.focus.items.map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="font-mono text-xs text-primary w-16 shrink-0 pt-0.5">{item.label}</span>
                  <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            {/* Live indicator */}
            <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-muted-foreground">currently active</span>
            </div>
          </div>

          {/* Reading */}
          <div
            className={cn(
              "rounded-xl border border-border bg-card/40 glass p-6 opacity-0",
              isVisible && "animate-fade-in-up stagger-2"
            )}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 rounded-lg bg-primary/10">
                <Book className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-mono text-sm font-medium tracking-wider">Reading</h3>
            </div>
            <div className="space-y-4">
              {nowData.reading.map((book) => (
                <div key={book.title} className="group rounded-lg bg-secondary/30 border border-border/50 p-3 hover:border-primary/30 transition-colors">
                  <p className="text-sm font-medium text-foreground leading-tight">{book.title}</p>
                  <p className="font-mono text-xs text-muted-foreground mt-1">{book.author}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Listening */}
          <div
            className={cn(
              "rounded-xl border border-border bg-card/40 glass p-6 opacity-0",
              isVisible && "animate-fade-in-up stagger-3"
            )}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 rounded-lg bg-primary/10">
                <Headphones className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-mono text-sm font-medium tracking-wider">Listening</h3>
            </div>
            <div className="space-y-4">
              {nowData.listening.map((item) => (
                <div key={item.title} className="group rounded-lg bg-secondary/30 border border-border/50 p-3 hover:border-primary/30 transition-colors">
                  <p className="text-sm font-medium text-foreground leading-tight">{item.title}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-primary/10 font-mono text-[10px] text-primary">{item.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Building */}
          <div
            className={cn(
              "sm:col-span-2 lg:col-span-4 rounded-xl border border-border bg-card/40 glass p-6 opacity-0",
              isVisible && "animate-fade-in-up stagger-4"
            )}
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="p-2 rounded-lg bg-primary/10">
                <Code2 className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-mono text-sm font-medium tracking-wider">Currently Building</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {nowData.building.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-4 py-2.5 hover:border-primary/30 transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}