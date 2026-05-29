"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/utils"
import { ChevronDown, ExternalLink, Sparkles } from "lucide-react"
import { type Experience, experiences, filterTags, getFilterCount, filterExperiences, getSafeExternalUrl } from "@/src/lib/main-pages/experiences-data"

interface LogoBadgeProps {
  company: string
  logo?: string
  size?: "sm" | "md"
}

function LogoBadge({ company, logo, size = "md" }: LogoBadgeProps) {
  const dim = size === "sm" ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-xs"

  if (logo) {
    return (
      <div className={cn("flex shrink-0 items-center justify-center rounded-[12px] border border-border/60 bg-secondary/60 p-1", dim)}>
        <img src={logo} alt={company} className="h-full w-full object-contain" />
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

  const toggleFilter = (filter: string) => setActiveFilters([filter])

  const filteredExperiences = filterExperiences(activeFilters, experiences)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative px-4 sm:px-6 pt-28 sm:pt-36 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">

        <div className={cn("space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            interdisciplinary;
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
            Experiences ✩
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            CS • EE • Design • PM
          </p>
        </div>

        <div className={cn("mt-6 flex flex-wrap gap-2 opacity-0", isVisible && "animate-fade-in-up stagger-1")}>
          {filterTags.map((tag: string) => {
            const isActive = activeFilters.includes(tag)
            const count = getFilterCount(tag, experiences)
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
                <span className={cn(
                  "rounded-full px-1.5 py-0.5 font-mono text-[10px] font-semibold",
                  isActive ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground",
                )}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className={cn("mt-8 opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
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
                Building across systems, tech, design, community, and research
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 items-start">
                {filteredExperiences.map((exp: Experience) => {
                  const companyLink = getSafeExternalUrl(exp.companyUrl)
                  const isExpanded = expandedIds.includes(exp.id)

                  return (
                    <div
                      key={exp.id}
                      className="rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm transition-colors hover:border-primary/30"
                    >
                      <button
                        type="button"
                        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpandedIds(
                            isExpanded
                              ? expandedIds.filter((id) => id !== exp.id)
                              : [...expandedIds, exp.id]
                          )
                        }
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
                                  onClick={(e) => e.stopPropagation()}
                                  onMouseDown={(e) => e.stopPropagation()}
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
                          <span className={cn(
                            "rounded-md border px-2 py-0.5 font-mono text-xs font-medium",
                            exp.current
                              ? "border-primary/40 bg-primary/15 text-primary"
                              : "border-border/60 bg-secondary/50 text-muted-foreground",
                          )}>
                            {exp.current ? "Current" : "Previous"}
                          </span>
                          <ChevronDown className={cn(
                            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                            isExpanded && "rotate-180 text-primary",
                          )} />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-border/40 px-4 pb-4 pt-3 space-y-3">
                          {exp.description && (
                            <p className="text-sm text-muted-foreground">{exp.description}</p>
                          )}
                          {exp.highlights.length > 0 && (
                            <ul className="space-y-2">
                              {exp.highlights.map((highlight: string) => (
                                <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          )}
                          {exp.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {exp.tags.map((tag: string) => (
                                <span
                                  key={tag}
                                  className="rounded-md border border-border/60 bg-secondary/50 px-2 py-1 font-mono text-xs text-secondary-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          {exp.hasReadMore && (
                            <a
                              href={`/experiences/${exp.id}`}
                              className="inline-block mt-2 rounded border border-primary/70 bg-primary/60 px-3 py-1 text-xs font-semibold text-foreground hover:bg-primary/80 transition-colors"
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