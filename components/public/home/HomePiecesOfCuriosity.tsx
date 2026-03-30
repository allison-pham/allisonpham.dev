"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const curiosityTopics = [
  {
    id: "overview",
    label: "Overview",
    title: "My Curiosities",
    tags: ["exploration", "growth", "learning"],
    description: "A collection of my core focus areas that I'm exploring, learning about, and building.",
    history: "Began documenting my curiosities as a way to track growth and connect ideas cohesively.",
    futureProjects: "Building systems that bridge across multiple fields for impact.",
  },

  {
    id: "computer-science",
    label: "Computer Science",
    title: "Computer Science",
    tags: ["software engineering (swe)", "machine learning (ml)", "human-computer interaction (hci)"],
    description: "Developing interactive systems that are efficient, scalable, and user-friendly.",
    history: "Building systems, how computers think, and how software scales.",
    futureProjects: "Exploring compiler design and designing a mini operating system.",
  },

  {
    id: "electrical-engineering",
    label: "Electrical Engineering",
    title: "Electrical Engineering",
    tags: ["electronics & circuit design", "embedded systems", "robotics"],
    description: "Intersecting hardware with software.",
    history: "Tinkering to explore my curiosity of how physical systems interact with computation.",
    futureProjects: "Building a circuit board and mini desk robot.",
  },

  {
    id: "product-design",
    label: "Product (Design)",
    title: "Product (Design)",
    tags: ["human-centered design (hcd)", "ui/ux", "prototyping"],
    description: "Crafting intuitive interfaces that look and feel cohesive for beautiful UX.",
    history: "Learned through building and designing. Intersecting design and engineering showed me how intertwined they are.",
    futureProjects: "Creating a design system with a focus in accessibility and intersecting with healthcare.",
  },

  {
    id: "product-management",
    label: "Product (Management)",
    title: "Product (Management)",
    tags: ["strategy", "development", "analysis & growth"],
    description: "Understanding user needs to transform them into thoughtful, yet impactful product decisions.",
    history: "Managing projects and initiatives taught me prioritization and building iteratively.",
    futureProjects: "Designing a framework to validate ideas quicker.",
  },
]

export function PiecesOfCuriosity() {
  const [activeTopic, setActiveTopic] = useState("overview")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const currentTopic = curiosityTopics.find((t) => t.id === activeTopic) || curiosityTopics[0]

  return (
    <section ref={sectionRef} id="curiosity" className="px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className={cn("mb-10 sm:mb-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="space-y-2 sm:flex-1 sm:min-w-0">
            <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">
              learning;
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Pieces of Curiosity ⟡</h2>
          </div>
          <Link
            href="/about"
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            Explore more @ about
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Content Panel */}
          <div
            className={cn(
              "lg:col-span-2 rounded-xl border border-border bg-card/40 glass p-6 sm:p-8 hover-lift opacity-0",
              isVisible && "animate-scale-in stagger-2",
            )}
          >
            <div className="space-y-6">
              {/* Topic Title */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{currentTopic.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {currentTopic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-primary">{">"}</span>
                    About
                  </p>
                  <p className="pl-4 text-foreground leading-relaxed">{currentTopic.description}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-primary">{">"}</span>
                    My History
                  </p>
                  <p className="pl-4 text-foreground leading-relaxed">{currentTopic.history}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-primary">{">"}</span>
                    Current Projects & Future Plans
                  </p>
                  <p className="pl-4 text-foreground leading-relaxed">{currentTopic.futureProjects}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Panel */}
          <div
            className={cn(
              "rounded-xl border border-border bg-secondary/30 p-5 sm:p-6 opacity-0",
              isVisible && "animate-fade-in-up stagger-3",
            )}
          >
            <h4 className="font-mono text-xs tracking-wider text-primary mb-4">Curiosity Nav</h4>
            <div className="space-y-2">
              {curiosityTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setActiveTopic(topic.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg font-mono text-sm transition-all duration-200 flex items-center gap-2",
                    activeTopic === topic.id
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  )}
                >
                  <ArrowRight className={cn("h-3.5 w-3.5 transition-opacity", activeTopic === topic.id ? "opacity-100" : "opacity-0")} />
                  {topic.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}