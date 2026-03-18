"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Github, ExternalLink, Sparkles, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { allProjectTags, projectFilters, projects, type ProjectFilter } from "@/lib/projects-data"

export function ProjectsPageContent() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === "all" || project.status === activeFilter
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag))

    return matchesFilter && matchesSearch && matchesTags
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((previousTags) =>
      previousTags.includes(tag)
        ? previousTags.filter((existingTag) => existingTag !== tag)
        : [...previousTags, tag],
    )
  }

  return (
    <section ref={sectionRef} className="overflow-x-clip px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-12 space-y-4 opacity-0 sm:mb-16", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] text-primary sm:tracking-[0.35em]">pieces of building;</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Projects ★</h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Collection of projects across CS, engineering, and design.
          </p>
        </div>

        <div className={cn("mb-10 space-y-6 opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="border-border/60 bg-card/40 pl-10 focus:border-primary/50"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-lg border px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 active:scale-[0.98]",
                  activeFilter === filter
                    ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20"
                    : "border-border text-muted-foreground hover:border-foreground/50 hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Filter className="mr-2 h-4 w-4 self-center text-muted-foreground" />
            {allProjectTags.slice(0, 12).map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "rounded-md border px-2.5 py-1 font-mono text-xs transition-all duration-200",
                  selectedTags.includes(tag)
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border/60 bg-secondary/40 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={cn(
                "group relative min-w-0 overflow-hidden rounded-xl border bg-card/40 p-6 glass transition-all duration-400 hover-lift active:scale-[0.99] sm:p-7 opacity-0",
                isVisible && "animate-fade-in-up",
                hoveredProject === project.id && "border-primary/40 bg-card/70",
                project.highlight
                  ? "border-primary/30 bg-linear-to-br from-primary/8 via-card/50 to-primary/8 sm:col-span-2 lg:col-span-2"
                  : "border-border/60",
                project.featured && !project.highlight && "sm:col-span-2 lg:col-span-1",
              )}
              style={{ animationDelay: `${(index % 6) * 80 + 200}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {project.highlight && (
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5 animate-pulse-glow">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-[10px] font-medium tracking-wider text-primary">featured</span>
                </div>
              )}

              <div className="absolute right-5 top-5 flex items-center gap-2.5">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-shadow duration-300",
                    project.status === "shipped" && "bg-primary shadow-sm shadow-primary/50",
                    project.status === "in progress" && "animate-pulse bg-yellow-500 shadow-sm shadow-yellow-500/50",
                    project.status === "ideation" && "bg-blue-500 shadow-sm shadow-blue-500/50",
                    project.status === "archived" && "bg-muted-foreground",
                  )}
                />
                <span className="max-w-30 truncate font-mono text-xs text-muted-foreground">{project.status}</span>
              </div>

              <div className={cn("mb-4 font-mono text-xs text-muted-foreground", project.highlight && "mt-10")}>{project.year}</div>

              <div className="relative mb-5 overflow-hidden rounded-lg border border-border/60 bg-secondary/35 aspect-video">
                {project.thumbnailSrc ? (
                  <Image
                    src={project.thumbnailSrc}
                    alt={project.thumbnailAlt || `${project.title} thumbnail`}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-1.5 px-4 text-center">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">add project image</span>
                    <span className="text-xs text-muted-foreground/80">/public/projects/{project.slug}/cover.jpg</span>
                  </div>
                )}
              </div>

              <h3
                className={cn(
                  "mb-3 font-bold tracking-tight transition-all duration-300 group-hover:text-gradient",
                  project.highlight ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
                )}
              >
                {project.title}
              </h3>

              <p className={cn("mb-5 text-sm leading-relaxed text-muted-foreground", project.highlight ? "line-clamp-3" : "line-clamp-2")}>
                {project.description}
              </p>

              <div className="mb-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group/link flex items-center gap-2 font-mono text-xs text-primary transition-all duration-300 hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                  <span className="underline-animate">Case Study</span>
                </Link>

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 font-mono text-xs text-muted-foreground transition-all duration-300 hover:text-primary"
                  >
                    <Github className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                    <span className="underline-animate">GitHub</span>
                  </a>
                )}

                {project.homepage && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center gap-2 font-mono text-xs text-primary transition-all duration-300 hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110 group-hover/link:rotate-12" />
                    <span className="underline-animate">Live</span>
                  </a>
                )}
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-mono text-sm text-muted-foreground">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}
