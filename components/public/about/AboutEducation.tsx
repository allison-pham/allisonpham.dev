"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { GraduationCap, Award } from "lucide-react"

const education = [
  {
    degree: "Bachelor's Degree - Computer Engineering",
    institution: "University of California, Riverside",
    period: "",
    description: "",
  },
]

const certifications = [
  {
    title: "Project Management",
    issuer: "Google",
    year: "2023",
  },
]

export function AboutEducation() {
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
    <section ref={sectionRef} className="border-t border-border/30 px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-10 sm:grid-cols-2">
          {/* Education */}
          <div>
            <div className={cn("mb-8 space-y-2 opacity-0", isVisible && "animate-fade-in-up")}>
              <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">
                academia;
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Education</h2>
            </div>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={edu.degree}
                  className={cn(
                    "group flex gap-4 rounded-xl border border-border/50 bg-card/40 glass p-6 hover-lift transition-all duration-400 hover:border-primary/40 opacity-0",
                    isVisible && "animate-fade-in-up",
                  )}
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold tracking-tight text-foreground">{edu.degree}</h3>
                    <p className="font-mono text-sm text-primary">{edu.institution}</p>
                    <p className="font-mono text-xs text-muted-foreground">{edu.period}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge */}
          <div>
            <div className={cn("mb-8 space-y-2 opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
              <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">
                exploration;
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Knowledge</h2>
            </div>

            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div
                  key={cert.title}
                  className={cn(
                    "group flex gap-4 rounded-xl border border-border/50 bg-card/40 glass p-5 hover-lift transition-all duration-400 hover:border-primary/40 opacity-0",
                    isVisible && "animate-fade-in-up",
                  )}
                  style={{ animationDelay: `${index * 100 + 300}ms` }}
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">{cert.title}</h3>
                    <p className="font-mono text-xs text-primary">{cert.issuer}</p>
                    <p className="font-mono text-xs text-muted-foreground">{cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}