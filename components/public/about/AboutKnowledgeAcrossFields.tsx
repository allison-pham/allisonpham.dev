"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Code2, Layers3, Wrench, Library, Cpu, Palette } from "lucide-react"

const skillGroups = [
  {
    category: "Computer Science",
    icon: Code2,
    skills: ["Full-Stack Development", "System Design", "AI/ML", "Data Science", "NLP", "Computer Vision", "Mobile Development", "Databases", "Networks", "APIs"],
  },

  {
    category: "Product (Design)",
    icon: Palette,
    skills: ["Design Engineering", "Human-Computer Interaction (HCI)", "Cognitive UX", "Information Architecture", "Interaction Design", "Wireframing & Prototyping", "UI/UX Design", "Visual Design", "Design Systems"],
  },

  {
    category: "Product (Management)",
    icon: Library,
    skills: ["Product Strategy", "User Research & Testing", "Usability Testing", "Experimentation & Iteration", "Impact Evaluation", "Analytics & Insight"],
  },

  {
    category: "Electrical Engineering",
    icon: Cpu,
    skills: ["Signals & Systems", "Spectral Analysis", "Analog Electronics", "Sensing & Actuation", "Semiconductors", "Hardware Design", "Register-Transfer Level (RTL) Design", "Engineering Simulation & Testing", "Applied Quantum Mechanics"],
  },
]

export function AboutKnowledgeAcrossFields() {
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
    <section ref={sectionRef} className="border-t border-border/30 overflow-x-clip px-4 sm:px-6 py-16 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className={cn("space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">knowledge;</p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Knowledge Across Fields</h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            CS • Product (Design & Management) • EE
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, groupIndex) => (
            <div
              key={group.category}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-border/50 bg-card/40 glass p-6 hover-lift transition-all duration-400 hover:border-primary/40 opacity-0",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: `${groupIndex * 100 + 200}ms` }}
            >
              <div className="relative z-10">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <group.icon className="h-4 w-4" />
                    </span>
                    <span className="rounded-lg border border-border/80 bg-secondary/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-foreground">
                      {group.category}
                    </span>
                  </div>

                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-xs text-secondary-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}