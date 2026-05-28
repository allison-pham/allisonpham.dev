"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/src/lib/utils"
import { Github, ExternalLink, Sparkles, Search, Filter, X } from "lucide-react"
import { Input } from "@/src/components/ui/Input"
import { allProjectTags, projectFilters, projects, getProjectCaseStudy, type Project, type ProjectFilter } from "@/src/lib/main-pages/projects-data"
import { TechIcon } from "@/src/components/TechStackIcons"

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const caseStudy = getProjectCaseStudy(project)
  const githubUrl = project.url.trim()
  const liveUrl = project.homepage.trim()

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/60 bg-card/95 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-border/60 bg-card p-1.5 text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground cursor-pointer"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {project.thumbnailSrc && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl border-b border-border/60">
            <Image
              src={project.thumbnailSrc}
              alt={project.thumbnailAlt || project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-3">
              <span className={cn(
                "h-2 w-2 rounded-full",
                project.status === "shipped" && "bg-primary",
                project.status === "in progress" && "animate-pulse bg-yellow-500",
                project.status === "ideation" && "bg-blue-500",
                project.status === "archived" && "bg-muted-foreground",
              )} />
              <span className="font-mono text-xs text-muted-foreground">{project.status}</span>
              {project.year && <span className="font-mono text-xs text-muted-foreground">· {project.year}</span>}
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">{project.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          </div>

          <div className="mb-6 grid grid-cols-3 gap-3">
            {[
              { label: "Role", value: caseStudy.role },
              { label: "Duration", value: caseStudy.duration },
              { label: "Focus", value: caseStudy.specialization },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg border border-border/60 bg-secondary/30 p-3">
                <p className="mb-1 font-mono text-[10px] tracking-widest text-muted-foreground">{label}</p>
                <p className="text-xs font-medium">{value}</p>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <p className="mb-2 font-mono text-[10px] tracking-widest text-muted-foreground">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TechIcon key={tag} tag={tag} />
              ))}
            </div>
          </div>

          {caseStudy.sections.length > 0 && (
            <div className="mb-6 space-y-4">
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground">Case Study</p>
              {caseStudy.sections.map((section) => (
                <div key={section.id} className="rounded-lg border border-border/60 bg-secondary/20 p-4">
                  <h3 className="mb-1.5 text-sm font-semibold">{section.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{section.description}</p>
                  {section.images && section.images.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {section.images.map((img, i) => (
                        <div key={i} className="relative aspect-video overflow-hidden rounded-md border border-border/60">
                          <Image src={img.src} alt={img.alt} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {(githubUrl || liveUrl) && (
            <div className="flex flex-wrap gap-4 border-t border-border/60 pt-5">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-2 font-mono text-xs text-muted-foreground transition-all hover:text-primary"
                >
                  <Github className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                  <span className="underline-animate">GitHub</span>
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-2 font-mono text-xs text-primary transition-all hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110 group-hover/link:rotate-12" />
                  <span className="underline-animate">Live</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export function ProjectsPageContent() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [modalProject, setModalProject] = useState<Project | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => { setIsVisible(true) }, [])

  const closeModal = useCallback(() => setModalProject(null), [])

  const filterCount = (filter: ProjectFilter) => {
    if (filter === "all") return projects.length
    return projects.filter((p) => p.status === filter).length
  }

  const filteredProjects = projects
    .filter((project) => {
      const matchesFilter = activeFilter === "all" || project.status === activeFilter
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag))
      return matchesFilter && matchesSearch && matchesTags
    })
    .sort((l, r) => Number(r.featured) - Number(l.featured))

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])
  }

  return (
    <>
      {modalProject && <ProjectModal project={modalProject} onClose={closeModal} />}

      <section ref={sectionRef} className="overflow-x-clip px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className={cn("mb-12 space-y-4 opacity-0 sm:mb-16", isVisible && "animate-fade-in-up")}>
            <p className="font-mono text-xs tracking-[0.25em] text-primary sm:tracking-[0.35em]">pieces of building;</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Projects ★</h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Collection of projects across CS, engineering, and design
            </p>
          </div>

          <div className={cn("mb-10 space-y-4 opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {projectFilters.map((filter) => {
                  const isActive = activeFilter === filter
                  const count = filterCount(filter)
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs tracking-wide transition-all active:scale-[0.98]",
                        isActive
                          ? "border-primary/50 bg-primary/15 text-primary"
                          : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                      )}
                    >
                      {filter.toLowerCase()}
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

              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-border/60 bg-card/40 pl-10 focus:border-primary/50"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Filter className="mr-2 h-4 w-4 self-center text-muted-foreground" />
              {allProjectTags.slice(0, 12).map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 font-mono text-xs transition-all duration-200",
                    selectedTags.includes(tag)
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border/60 bg-secondary/40 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  {tag.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 items-stretch sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => {
              const githubUrl = project.url.trim()
              const liveUrl = project.homepage.trim()
              const hasCaseStudyPage = project.hasCaseStudy
              const isFeaturedProject = project.highlight

              return (
                <article
                  key={project.id}
                  className={cn(
                    "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border bg-card/40 p-6 glass transition-all duration-400 hover-lift active:scale-[0.99] sm:p-7 opacity-0",
                    isVisible && "animate-fade-in-up",
                    hoveredProject === project.id && "border-primary/40 bg-card/70",
                    project.featured
                      ? "border-primary/30 bg-linear-to-br from-primary/8 via-card/50 to-primary/8"
                      : "border-border/60",
                    isFeaturedProject && "sm:col-span-2 lg:col-span-2",
                  )}
                  style={{ animationDelay: `${(index % 6) * 80 + 200}ms` }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="absolute right-5 top-5 flex items-center gap-2.5">
                    <span className={cn(
                      "h-2.5 w-2.5 rounded-full transition-shadow duration-300",
                      project.status === "shipped" && "bg-primary shadow-sm shadow-primary/50",
                      project.status === "in progress" && "animate-pulse bg-yellow-500 shadow-sm shadow-yellow-500/50",
                      project.status === "ideation" && "bg-blue-500 shadow-sm shadow-blue-500/50",
                      project.status === "archived" && "bg-muted-foreground",
                    )} />
                    <span className="max-w-30 truncate font-mono text-xs text-muted-foreground">{project.status}</span>
                  </div>

                  <div className="mb-4 font-mono text-xs text-muted-foreground">
                    {project.status === "in progress" && project.year ? `${project.year} → present` : project.year}
                  </div>

                  <div className={cn(
                    "relative mb-5 overflow-hidden rounded-lg border border-border/60 bg-secondary/35",
                    isFeaturedProject ? "aspect-16/10 sm:aspect-28/9" : "aspect-video",
                  )}>
                    {project.featured && (
                      <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 backdrop-blur-sm px-3 py-1.5 animate-pulse-glow">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span className="font-mono text-[10px] font-medium tracking-wider text-primary">featured</span>
                      </div>
                    )}
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
                        <span className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground">cover image coming soon</span>
                      </div>
                    )}
                  </div>

                  <h3 className="mb-3 text-lg font-bold tracking-tight transition-all duration-300 group-hover:text-gradient sm:text-xl">
                    {project.title}
                  </h3>

                  <p className="mb-5 line-clamp-5 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap items-center gap-2 pb-4">
                      {project.tags.map((tag) => (
                        <TechIcon key={tag} tag={tag} />
                      ))}
                    </div>

                    <div className="flex min-h-6 flex-wrap items-center gap-4">
                      {hasCaseStudyPage && (
                        <button
                          onClick={() => setModalProject(project)}
                          className="group/link flex items-center gap-2 font-mono text-xs text-primary transition-all duration-300 hover:text-foreground cursor-pointer"
                        >
                          <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                          <span className="underline-animate">Case Study</span>
                        </button>
                      )}

                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 font-mono text-xs text-muted-foreground transition-all duration-300 hover:text-primary"
                        >
                          <Github className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                          <span className="underline-animate">GitHub</span>
                        </a>
                      )}

                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link flex items-center gap-2 font-mono text-xs text-primary transition-all duration-300 hover:text-foreground"
                        >
                          <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110 group-hover/link:rotate-12" />
                          <span className="underline-animate">Live</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
                </article>
              )
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-mono text-sm text-muted-foreground">No projects under this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}