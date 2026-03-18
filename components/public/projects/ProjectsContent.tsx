"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Github, Star, GitFork, ExternalLink, Sparkles, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

const projects = [
  {
    id: 0,
    title: "HCI in Space",
    description:
      "",
    tags: [],
    status: "ideation",
    year: "2026",
    url: "",
    homepage: "",
    featured: true,
    highlight: true,
  },

  {
    id: 1,
    title: "AI Agent",
    description:
      "",
    tags: [],
    status: "ideation",
    year: "2026",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 2,
    title: "Personality Quiz",
    description:
      "",
    tags: [],
    status: "archived",
    year: "2026",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 3,
    title: "ML Models",
    description:
      "",
    tags: [],
    status: "ideation",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 4,
    title: "NeuroWell",
    description:
      "",
    tags: [],
    status: "archived",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 5,
    title: "MissionSync",
    description:
      "",
    tags: [],
    status: "archived",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 6,
    title: "AstroTrade",
    description:
      "",
    tags: [],
    status: "ideation",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },

    {
    id: 7,
    title: "OrbitIntel",
    description:
      "",
    tags: [],
    status: "ideation",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 8,
    title: "ThinkSync",
    description:
      "",
    tags: [],
    status: "ideation",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 9,
    title: "Musely",
    description:
      "",
    tags: [],
    status: "archived",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 10,
    title: "FinFlow",
    description:
      "",
    tags: [],
    status: "archived",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 11,
    title: "Assistify",
    description:
      "Receive tailored support with quality responses",
    tags: ["Next.js", "TypeScript", "Material UI"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/assistify",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 12,
    title: "WellNest",
    description:
      "Pantry tracker for effortless nutrition",
    tags: ["Next.js", "Firebase", "Material UI"],
    status: "shipped",
    year: "2024",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 13,
    title: "Eevi",
    description:
      "The 0-> 1 software tool",
    tags: ["React"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/eevi-side-quests",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 14,
    title: "YouFlow",
    description:
      "",
    tags: [],
    status: "archived",
    year: "2024",
    url: "https://github.com/allison-pham/youflow-data-analyzer",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 15,
    title: "BioQuest",
    description:
      "",
    tags: [],
    status: "archived",
    year: "2024",
    url: "https://github.com/allison-pham/bioquest",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 16,
    title: "Quick Study",
    description:
      "Reduce and optimize study sessions",
    tags: ["Python"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/quick-study",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 17,
    title: "AppSort",
    description:
      "Streamline the application review process",
    tags: ["Python", "pandas"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/appsort",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 18,
    title: "PantryPilot",
    description:
      "Streamline grocery shopping with a few clicks",
    tags: ["Python", "scikit-learn", "pandas", "NumPy"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/grocery-in-one",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 19,
    title: "Life Dev",
    description:
      "Increase life optimization - set goals, improve study habits, plan out projects, and enhance skill development",
    tags: ["C++"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/weather-reminder-system",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 20,
    title: "WeatherWise",
    description:
      "Receive notifications of weather changes to prepare for all situations",
    tags: ["Python"],
    status: "shipped",
    year: "2023",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 21,
    title: "ShelfSense",
    description:
      "Data analysis for books to seamlessly conclude with effective conclusions",
    tags: ["Python", "NumPy", "pandas", "Matplotlib"],
    status: "shipped",
    year: "2023",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 22,
    title: "QR Connect",
    description:
      "Save wifi logins -> save time",
    tags: ["Python"],
    status: "shipped",
    year: "2023",
    url: "https://github.com/allison-pham/qr-connect",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 23,
    title: "Cozy Chat",
    description:
      "All-in-one learning x social media platform",
    tags: [],
    status: "archived",
    year: "2023",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },

  {
    id: 24,
    title: "Thin Ice",
    description:
      "Recreation of being a fire puffle that traverses an ice maze",
    tags: ["Java", "libGDX"],
    status: "shipped",
    year: "2023",
    url: "https://github.com/allison-pham/thin-ice",
    homepage: "",
    featured: false,
    highlight: false,
  },
]

const filters = ["all", "shipped", "in progress", "ideation", "archived"]
const allTags = [...new Set(projects.flatMap((p) => p.tags))]

export function ProjectsPageContent() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProjects = projects.filter((p) => {
    const matchesFilter = activeFilter === "all" || p.status === activeFilter
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => p.tags.includes(tag))
    return matchesFilter && matchesSearch && matchesTags
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <section ref={sectionRef} className="overflow-x-clip px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className={cn("mb-12 sm:mb-16 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">pieces of building;</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Projects ★</h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Collection of projects across CS, engineering, & design.
          </p>
        </div>

        {/* Search and Filters */}
        <div className={cn("mb-10 space-y-6 opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/40 border-border/60 focus:border-primary/50"
            />
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-lg border px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 active:scale-[0.98]",
                  activeFilter === filter
                    ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20"
                    : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground hover:bg-secondary/50",
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            <Filter className="h-4 w-4 text-muted-foreground mr-2 self-center" />
            {allTags.slice(0, 10).map((tag) => (
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

        {/* Projects Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={cn(
                "group relative min-w-0 overflow-hidden rounded-xl border bg-card/40 p-6 sm:p-7 glass transition-all duration-400 active:scale-[0.99] hover-lift opacity-0",
                isVisible && "animate-fade-in-up",
                hoveredProject === project.id && "border-primary/40 bg-card/70",
                "highlight" in project && project.highlight
                  ? "sm:col-span-2 lg:col-span-2 border-primary/30 bg-gradient-to-br from-primary/8 via-card/50 to-primary/8"
                  : "border-border/60",
                project.featured && !("highlight" in project && project.highlight) && "sm:col-span-2 lg:col-span-1",
              )}
              style={{ animationDelay: `${(index % 6) * 80 + 200}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {"highlight" in project && project.highlight && (
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5 animate-pulse-glow">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-[10px] tracking-wider text-primary font-medium">
                    featured
                  </span>
                </div>
              )}

              <div
                className={cn(
                  "absolute right-5 top-5 flex items-center gap-2.5",
                  "highlight" in project && project.highlight && "top-5",
                )}
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-shadow duration-300",
                    project.status === "shipped" && "bg-primary shadow-sm shadow-primary/50",
                    project.status === "in progress" && "bg-yellow-500 animate-pulse shadow-sm shadow-yellow-500/50",
                    project.status === "ideation" && "bg-blue-500 shadow-sm shadow-blue-500/50",
                    project.status === "archived" && "bg-muted-foreground",
                  )}
                />
                <span className="max-w-[7.5rem] truncate font-mono text-xs text-muted-foreground">{project.status}</span>
              </div>

              <div
                className={cn(
                  "mb-5 font-mono text-xs text-muted-foreground",
                  "highlight" in project && project.highlight && "mt-10",
                )}
              >
                {project.year}
              </div>

              <h3
                className={cn(
                  "mb-3 font-bold tracking-tight transition-all duration-300 group-hover:text-gradient",
                  "highlight" in project && project.highlight ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
                )}
              >
                {project.title}
              </h3>

              <p
                className={cn(
                  "mb-5 text-sm leading-relaxed text-muted-foreground",
                  "highlight" in project && project.highlight ? "line-clamp-3" : "line-clamp-2",
                )}
              >
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

              <div className="flex items-center gap-4">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-all duration-300 group/link"
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
                    className="flex items-center gap-2 font-mono text-xs text-primary hover:text-foreground transition-all duration-300 group/link"
                  >
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110 group-hover/link:rotate-12" />
                    <span className="underline-animate">Live</span>
                  </a>
                )}
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-sm text-muted-foreground">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}