"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ExternalLink, Sparkles } from "lucide-react"

interface Experience {
  id: string
  role: string
  company: string
  companyUrl?: string
  logo?: string
  period: string
  type: string
  current: boolean
  description: string
  highlights: string[]
  tags: string[]
  labels?: string[]
}

const experiences: Experience[] = [
  {
    id: "research",
    role: "Research",
    company: "Lab",
    companyUrl: "",
    logo: "",
    period: "Mar 2026 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Research projects and initiatives in the context of HCI in space and neurotech",
      "Interaction in microgravity environments",
      "Conducting user research, designing experiments, and developing prototypes to explore human-robot interaction in microgravity environments"
    ],
    tags: ["HCI"],
  },

  {
    id: "nasa-research",
    role: "Design & Research (Autonomous Traversal)",
    company: "NASA",
    companyUrl: "https://nasa.gov",
    logo: "/logos/nasa.svg",
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
    id: "notion",
    role: "Campus Leader",
    company: "Notion",
    logo: "/logos/notion.svg",
    companyUrl: "https://notion.so",
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
    id: "citrus-hack",
    role: "Director",
    company: "Citrus Hack",
    logo: "/logos/citrus-hack.svg",
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
    id: "cutie-hack",
    role: "Director",
    company: "Cutie Hack",
    logo: "/logos/cutie-hack.svg",
    companyUrl: "https://cutiehack.com",
    period: "May 2025 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Previous Operations Lead (Jun 2024 - Jun 2025) & Operations Committee (Oct 2023 - May 2024)"
    ],
    tags: ["Hackathon"],
  },

  {
    id: "acm",
    role: "President",
    company: "ACM at UCR",
    logo: "/logos/acm.svg",
    companyUrl: "https://acm.cs.ucr.edu",
    period: "Apr 2025 - Present",
    type: "",
    current: true,
    description:
      "ACM = Association for Computing Machinery",
    highlights: [
      "Previous Event Chair (Feb 2024 - Jun 2025) & Board Intern (Oct 2023 - Mar 2024)"
    ],
    tags: ["Computer Science", "Engineering"],
  },

  {
    id: "gamespawn",
    role: "Treasurer",
    company: "Gamespawn",
    logo: "/logos/gamespawn.svg",
    companyUrl: "https://gamespawn.cs.ucr.edu",
    period: "Mar 2025 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Previous Project + Workshop Coordinator (Mar 2024 - Jun 2025) & Junior Officer (Dec 2023 - Mar 2024)"
    ],
    tags: [],
  },

  {
    id: "asucr",
    role: "College of Engineering Senator",
    company: "Associated Students of UCR (ASUCR)",
    logo: "/logos/asucr.svg",
    companyUrl: "",
    period: "May 2024 - Apr 2025",
    type: "Previous",
    current: false,
    description:
      "Full title: Bourns College of Engineering (BCOE) Senator",
    highlights: [
      "Previous Executive Fellow (Oct 2023 - Jun 2024), Senate Intern (Nov 2023 - Jun 2024), etc."
    ],
    tags: [],
  },

  {
    id: "nasa-engineering",
    role: "Lead Systems Engineer (L'SPACE)",
    company: "NASA",
    logo: "/logos/nasa.svg",
    companyUrl: "https://nasa.gov",
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
    id: "nucleo",
    role: "Software Engineer & Research Intern",
    company: "Nucleo Research",
    logo: "/logos/nucleo.svg",
    companyUrl: "https://nucleoresearch.com",
    period: "Aug 2024 - Sep 2024",
    type: "Previous",
    current: false,
    description:
      "Full title: Software Engineer & Research Development Intern",
    highlights: [
    ],
    tags: ["Neurotech"],
  },

  {
    id: "ucr",
    role: "Computer Science Grader",
    company: "University of California, Riverside",
    logo: "/logos/ucr.svg",
    companyUrl: "https://ucr.edu",
    period: "Jan 2024 - Mar 2024",
    type: "Previous",
    current: false,
    description:
      "",
    highlights: [
      "Department of CS & Engineering",
    ],
    tags: ["Computer Science", "Education"],
  },
]

function LogoBadge({ company, logo, size = "md" }: { company: string; logo?: string; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-xs"
  if (logo) {
    return (
      <div className={cn("flex shrink-0 items-center justify-center rounded-[12px] border border-border/60 bg-secondary/60 p-1", dim)}>
        <img
          src={logo}
          alt={company}
          className="h-full w-full object-contain"
        />
      </div>
    )
  }
  return (
    <div className={cn("flex shrink-0 items-center justify-center rounded-[12px] border border-border/60 bg-secondary/60 font-mono font-bold text-muted-foreground", dim)}>
      {company[0]}
    </div>
  )
}

export function ExperiencesTimeline() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedIds, setExpandedIds] = useState<string[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>(["all"])
  const sectionRef = useRef<HTMLElement>(null)

  const currentExperiences = experiences.filter((exp) => exp.current)
  const previousExperiences = experiences.filter((exp) => !exp.current)
  const focusAreas = [...new Set(experiences.flatMap((exp) => exp.tags))]
  const filterTags = ["all", "current", "previous", ...focusAreas]

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => {
      if (filter === "all") return ["all"]
      const withoutAll = prev.filter((f) => f !== "all")
      const next = withoutAll.includes(filter)
        ? withoutAll.filter((f) => f !== filter)
        : [...withoutAll, filter]
      return next.length === 0 ? ["all"] : next
    })
  }

  const filterCount = (filter: string) => {
    if (filter === "all") return experiences.length
    if (filter === "current") return currentExperiences.length
    if (filter === "previous") return previousExperiences.length
    return experiences.filter((exp) => exp.tags.includes(filter)).length
  }

  const filteredExperiences = activeFilters.includes("all")
    ? experiences
    : experiences.filter((exp) =>
        activeFilters.some((f) => {
          if (f === "current") return exp.current
          if (f === "previous") return !exp.current
          return exp.tags.includes(f)
        }),
      )

  const getSafeExternalUrl = (url?: string) => {
    if (!url) return undefined
    const normalizedUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`

    try {
      const parsed = new URL(normalizedUrl)
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return undefined
      return parsed.toString()
    } catch {
      return undefined
    }
  }

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
    <section ref={sectionRef} className="relative px-4 sm:px-6 pt-28 sm:pt-36 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className={cn("space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
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

        {/* Filter tags */}
        <div className={cn("mt-6 flex flex-wrap gap-2 opacity-0", isVisible && "animate-fade-in-up stagger-1")}>
          {filterTags.map((tag) => {
            const isActive = activeFilters.includes(tag)
            const count = filterCount(tag)
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleFilter(tag)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs tracking-wide transition-all",
                  isActive
                    ? "border-primary/50 bg-primary/15 text-primary"
                    : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
              >
                {tag.toLowerCase()}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 font-mono text-[10px] font-semibold",
                    isActive ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div
          className={cn(
            "mt-8 opacity-0",
            isVisible && "animate-fade-in-up stagger-2",
          )}
        >
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 via-card/60 to-card/40 p-6 sm:p-7">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] tracking-[0.25em] text-primary">
                  my orbit
                </span>
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <p className="w-full text-lg leading-relaxed text-foreground sm:text-xl">
                Building across systems, tech, design, community, and research. Each toggle includes details and some have a link to an external page with further insight.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 items-start">
                {filteredExperiences.map((exp) => {
                  const companyLink = getSafeExternalUrl(exp.companyUrl)

                  return (
                  <div
                    key={exp.id}
                    className="rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm transition-colors hover:border-primary/30"
                  >
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
                      aria-expanded={expandedIds.includes(exp.id)}
                      onClick={() => setExpandedIds(expandedIds.includes(exp.id) ? expandedIds.filter((id) => id !== exp.id) : [...expandedIds, exp.id])}
                    >
                      <div className="flex items-start gap-2.5">
                        <LogoBadge company={exp.company} logo={exp.logo} size="sm" />
                        <div>
                          <p className="text-sm font-semibold tracking-tight text-foreground">{exp.role}</p>
                          <div className="mt-1 flex items-center gap-1.5 font-mono text-xs text-primary">
                            {companyLink ? (
                              <a
                                href={companyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(event) => event.stopPropagation()}
                                onMouseDown={(event) => event.stopPropagation()}
                                className="inline-flex items-center gap-1.5 hover:underline"
                                aria-label={`${exp.company} company page (opens in a new tab)`}
                              >
                                <span>{exp.company}</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              <span>{exp.company}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">{exp.period}</span>
                        <span
                          className={cn(
                            "rounded-md border px-2 py-0.5 font-mono text-xs font-medium",
                            exp.current
                              ? "border-primary/40 bg-primary/15 text-primary"
                              : "border-border/60 bg-secondary/50 text-muted-foreground",
                          )}
                        >
                          {exp.current ? "Current" : "Previous"}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                            expandedIds.includes(exp.id) && "rotate-180 text-primary",
                          )}
                        />
                      </div>
                    </button>

                    {expandedIds.includes(exp.id) && (
                      <div className="border-t border-border/40 px-4 pb-4 pt-3 space-y-3">
                        {exp.description && (
                          <p className="text-sm text-muted-foreground">{exp.description}</p>
                        )}
                        {exp.highlights.length > 0 && (
                          <ul className="space-y-2">
                            {exp.highlights.slice(0, 2).map((highlight) => (
                              <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        )}
                        {exp.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {exp.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md border border-border/60 bg-secondary/50 px-2 py-1 font-mono text-xs text-secondary-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {/* Link to full ACM experience page */}
                        {exp.id === "acm" && (
                          <a
                            href="/experiences/acm"
                            className="inline-block mt-2 rounded border border-primary/70 bg-primary/60 px-3 py-1 text-xs font-semibold text-foreground hover:bg-primary/80 transition-colors"
                            target="_self"
                          >
                            Read more →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}