"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Laptop, ExternalLink } from "lucide-react"

const experiences = [
  {
    id: 1,
    role: "Design & Research (Autonomous Traversal)",
    company: "NASA",
    period: "Jan 2026 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
    ],
    tags: ["Space"],
  },

  {
    id: 2,
    role: "Campus Leader",
    company: "Notion",
    companyUrl: "http://notion.so",
    period: "Sep 2025 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Building community and reaching students across campus via productivity tools",
      "Empowering students to bring impact and project visions to life"
    ],
    tags: ["Productivity", "Community"],
  },

  {
    id: 3,
    role: "Director",
    company: "Citrus Hack",
    companyUrl: "https://citrushack.com",
    period: "May 2025 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Previous UI/UX Design & Operations Lead (Dec 2024 - Jun 2025)"
    ],
    tags: ["Hackathon"],
  },

  {
    id: 4,
    role: "Director",
    company: "Cutie Hack",
    companyUrl: "https://citrushack.com",
    period: "May 2025 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Previous Operations Lead (Jun 2024 - Jun 2025), Operations Committee (Oct 2023 - May 2024)"
    ],
    tags: ["Hackathon"],
  },

  {
    id: 5,
    role: "President",
    company: "Association for Computing Machinery (ACM)",
    companyUrl: "https://acm.cs.ucr.edu",
    period: "April 2025 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Previous Event Chair (Feb 2024 - Jun 2025), Board Intern (Oct 2023 - Mar 2024)"
    ],
    tags: ["CS & Engineering"],
  },

  {
    id: 6,
    role: "Lead Systems Engineer (L'SPACE)",
    company: "NASA",
    companyUrl: "",
    period: "Sep 2024 - Nov 2024",
    type: "Previous",
    current: false,
    description:
      "",
    highlights: [
    ],
    tags: ["Space"],
  },

  {
    id: 7,
    role: "Software Engineer & Research Development Intern",
    company: "Nucleo",
    companyUrl: "",
    period: "Aug 2024 - Sep 2024",
    type: "Previous",
    current: false,
    description:
      "",
    highlights: [
    ],
    tags: ["Neurotech"],
  },

  {
    id: 8,
    role: "Computer Science Grader (Department of CS & Engineering)",
    company: "University of California, Riverside (UCR)",
    companyUrl: "",
    period: "Jan 2024 - Mar 2024",
    type: "Previous",
    current: false,
    description:
      "",
    highlights: [
    ],
    tags: ["Computer Science", "Education"],
  },
]

export function ExperiencesTimeline() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeId, setActiveId] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.05 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative px-4 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className={cn("mb-12 sm:mb-16 space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            interdisciplinary;
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
            Experiences ✩
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            CS • EE • Product • Design
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4.25 top-2 bottom-2 w-px bg-border/50 hidden sm:block" />

          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={cn(
                  "relative sm:pl-12 opacity-0",
                  isVisible && "animate-fade-in-up",
                )}
                style={{ animationDelay: `${index * 120 + 200}ms` }}
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-0 top-6 hidden sm:flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 z-10",
                    exp.current
                      ? "border-primary/60 bg-primary/20 text-primary animate-pulse-glow"
                      : "border-border/60 bg-card/60 text-muted-foreground",
                    activeId === exp.id && "border-primary bg-primary/20 text-primary",
                  )}
                >
                  <Laptop className="h-4 w-4" />
                </div>

                {/* Card */}
                <div
                  className={cn(
                    "group rounded-xl border bg-card/40 glass p-6 sm:p-7 transition-all duration-400 hover-lift cursor-default",
                    exp.current
                      ? "border-primary/30 bg-gradient-to-br from-primary/8 via-card/50 to-primary/8"
                      : "border-border/50 hover:border-primary/30",
                    activeId === exp.id && "border-primary/40",
                  )}
                  onMouseEnter={() => setActiveId(exp.id)}
                  onMouseLeave={() => setActiveId(null)}
                >
                  {/* Card header */}
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-bold tracking-tight transition-colors group-hover:text-gradient">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2">
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link flex items-center gap-1.5 font-mono text-sm text-primary hover:underline"
                          >
                            {exp.company}
                            <ExternalLink className="h-3 w-3 opacity-60 transition-opacity group-hover/link:opacity-100" />
                          </a>
                        ) : (
                          <span className="font-mono text-sm text-primary">{exp.company}</span>
                        )}
                        {/* <span className="text-muted-foreground/50">·</span> */}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-mono text-xs text-muted-foreground">{exp.period}</span>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wider border",
                          exp.current
                            ? "border-primary/40 bg-primary/15 text-primary"
                            : "border-border/60 bg-secondary/50 text-muted-foreground",
                        )}
                      >
                        {exp.current ? "Current" : exp.type}
                      </span>
                    </div>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>

                  {/* Highlights */}
                  <ul className="mb-5 space-y-2">
                    {exp.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border/60 bg-secondary/50 px-2.5 py-1 font-mono text-xs text-secondary-foreground hover:border-primary/50 hover:bg-primary/10 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}