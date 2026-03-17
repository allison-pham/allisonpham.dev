"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const skillGroups = [
  {
    category: "Languages",
    skills: ["C++", "Python", "Java", "TypeScript", "JavaScript", "C", "SQL", "Swift", "HTML/CSS"],
  },

  {
    category: "Frameworks",
    skills: ["Next.js", "React", "Vue.js", "Tailwind CSS", "Spring Boot", "Swift UI"],
  },

  {
    category: "Developer Tools",
    skills: ["Docker", "AWS", "Google Cloud", "Firebase"],
  },

  {
    category: "Libraries",
    skills: ["PyTorch", "TensorFlow", "scikit-learn", "NumPy", "pandas", "Matplotlib", "Three.js"],
  },

  {
    category: "Hardware / CAD",
    skills: ["MATLAB", "SPICE", "Verilog", "FPGA Tools", "Arduino", "Altium", "Autodesk", "Qt"],
  },

  {
    category: "Design",
    skills: ["Figma", "Framer", "Spline", "Canva", "Adobe"],
  },
]

export function AboutSkills() {
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
    <section ref={sectionRef} className="border-t border-border/30 px-4 sm:px-6 py-20 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className={cn("space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">tools;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Technical Skills ✧.*</h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            CS • EE • Product • Design
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
                  <span className="rounded-lg border border-border/80 bg-secondary/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-foreground">
                    {group.category}
                  </span>

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
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}