"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { BookOpen, TrendingUp, Clock, ExternalLink, ChevronRight } from "lucide-react"

type SkillLevel = "learning" | "comfortable" | "proficient" | "deep"

interface Resource {
  title: string
  type: "book" | "course" | "article" | "project"
  url?: string
}

interface KnowledgeItem {
  name: string
  level: SkillLevel
  yearsActive?: string
  lastTouched?: string
  notes?: string
  resources?: Resource[]
  connections?: string[] // links to other knowledge items
}

interface TopicGroup {
  category: string
  description?: string
  items: KnowledgeItem[]
}

interface KnowledgeCategory {
  id: string
  label: string
  icon: string
  color: string
  topics: TopicGroup[]
  currentFocus?: string
  futureGoals?: string[]
}

const skillLevelConfig: Record<SkillLevel, { label: string; color: string; width: string }> = {
  learning: { label: "Learning", color: "bg-yellow-500/60", width: "w-1/4" },
  comfortable: { label: "Comfortable", color: "bg-blue-500/60", width: "w-2/4" },
  proficient: { label: "Proficient", color: "bg-primary/60", width: "w-3/4" },
  deep: { label: "Deep", color: "bg-primary", width: "w-full" },
}

const knowledgeCategories: KnowledgeCategory[] = [
  {
    id: "computer-science",
    label: "Computer Science",
    icon: "01",
    color: "from-purple-200 to-purple-100",
    currentFocus: "developing interactive systems that are efficient, scalable, & user-friendly",
    futureGoals: ["software engineering (swe)", "machine learning (ml)", "human-computer interaction (hci)"],

    topics: [
      {
        category: "Growing In",
        description: "Active areas of deep investment",
        items: [
          { name: "Software engineering (SWE)", level: "proficient", yearsActive: "", lastTouched: "today", notes: "To be added" },
          { name: "Machine learning (ML)", level: "proficient", yearsActive: "", lastTouched: "last week", notes: "To be added" },
          { name: "Human-computer interaction (HCI)", level: "comfortable", yearsActive: "", lastTouched: "today", notes: "To be added" },
        ],
      },

      {
        category: "Foundations & Specializations",
        description: "Core competencies I rely on daily",
        items: [
          { name: "Full-stack development", level: "proficient", yearsActive: "", lastTouched: "today", notes: "Frontend & backend", connections: ["product-design"] },
          { name: "Systems programming", level: "learning", yearsActive: "", lastTouched: "this week", notes: "Memory management, low-level optimization" },
          { name: "Distributed systems", level: "comfortable", yearsActive: "", lastTouched: "2 weeks ago", notes: "Message queues, consensus algorithms, CAP theorem" },    
          { name: "Data structures & algorithms", level: "proficient", yearsActive: "", resources: [{ title: "CLRS", type: "book" }] },
          { name: "Databases", level: "proficient", yearsActive: "", notes: "SQL" },
          { name: "Networks", level: "learning", notes: "Network fundamentals" },
        ],
      },
    ],
  },

  {
    id: "engineering",
    label: "Engineering",
    icon: "02",
    color: "from-blue-200 to-blue-100",
    currentFocus: "intersecting hardware with software",
    futureGoals: ["electronics & circuit design", "embedded systems", "robotics"],

    topics: [
      {
        category: "Hardware",
        items: [
          { name: "Electronics & circuit design", level: "learning", notes: "To be added" },
          { name: "Embedded systems", level: "learning", notes: "To be added" },
          { name: "Robotics", level: "learning", notes: "To be added" },
        ],
      },
    ],
  },

  {
    id: "product-design",
    label: "Product & Design",
    icon: "03",
    color: "from-pink-200 to-pink-100",
    currentFocus: "crafting intuitive interfaces that look & feel cohesive for beautiful UX",
    futureGoals: ["human-centered design (hcd)", "ui/ux", "prototyping"],

    topics: [
      {
        category: "Growing In",
        description: "Active areas of deep investment",
        items: [
          { name: "Human-centered design (HCD)", level: "comfortable", notes: "To be added" },
          { name: "UI/UX", level: "proficient", notes: "To be added" },
          { name: "Prototyping", level: "proficient", notes: "To be added" },
        ],
      },

      {
        category: "Foundations & Specializations",
        description: "Core competencies I rely on daily",
        items: [
          { name: "Design systems", level: "proficient", notes: "To be added" },
          { name: "Motion design", level: "learning", notes: "To be added" },
          { name: "3D interfaces", level: "learning", notes: "To be added" },
        ],
      },
    ],
  },

  {
    id: "business",
    label: "Business",
    icon: "04",
    color: "from-emerald-200 to-emerald-100",

    topics: [
      {
        category: "Operations",
        items: [
          { name: "Project management", level: "proficient", notes: "To be added" },
          { name: "Finance", level: "proficient", notes: "To be added" },
          { name: "Strategy & operations", level: "proficient", notes: "To be added" },
        ],
      },
    ],
  },

  {
    id: "cog-science",
    label: "Cognitive Science & Psych",
    icon: "05",
    color: "from-indigo-200 to-indigo-100",
    currentFocus: "decision-making under uncertainty",

    topics: [
      {
        category: "Cognitive Science",
        items: [
          { name: "Behavioral patterns", level: "comfortable", notes: "To be added" },
          { name: "Decision making", level: "comfortable", notes: "To be added" },
          { name: "Learning & memory", level: "learning", notes: "To be added" },
        ],
      },
    ],
  },

  {
    id: "space-systems",
    label: "Space Systems",
    icon: "06",
    color: "from-cyan-500/20 to-cyan-500/5",

    topics: [
      {
        category: "Space",
        items: [
          { name: "Orbital mechanics", level: "learning", notes: "To be added" },
          { name: "Satellite systems", level: "learning", notes: "To be added" },
          { name: "Space mission design", level: "learning", notes: "To be added" },
        ],
      },
    ],
  },

  {
    id: "social-good",
    label: "Social Good",
    icon: "07",
    color: "from-emerald-500/20 to-emerald-500/5",

    topics: [
      {
        category: "Impact",
        items: [
          { name: "Tech for social impact", level: "proficient", notes: "To be added" },
          { name: "Accessibility (a11y)", level: "proficient", notes: "To be added" },
        ],
      },
    ],
  },

  // {
  //   id: "law",
  //   label: "Law",
  //   icon: "08",
  //   color: "from-slate-500/20 to-slate-500/5",

  //   topics: [
  //     {
  //       category: "Tech Law",
  //       items: [
  //         { name: "Tech policy", level: "learning", notes: "To be added" },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   id: "healthcare",
  //   label: "Healthcare",
  //   icon: "09",
  //   color: "from-red-500/20 to-red-500/5",

  //   topics: [
  //     {
  //       category: "Health Tech",
  //       items: [
  //         { name: "Digital health systems", level: "learning", notes: "To be added" },
  //         { name: "Medical data", level: "learning", notes: "To be added" },
  //         { name: "Healthcare UX", level: "comfortable", notes: "To be added" },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   id: "productivity",
  //   label: "Productivity",
  //   icon: "10",
  //   color: "from-amber-500/20 to-amber-500/5",
  //   currentFocus: "Building second brain systems",

  //   topics: [
  //     {
  //       category: "Personal Systems",
  //       items: [
  //         { name: "Knowledge management", level: "proficient", notes: "To be added" },
  //         { name: "Habit building", level: "comfortable", notes: "To be added" },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   id: "literature",
  //   label: "Literature & Writing",
  //   icon: "11",
  //   color: "from-indigo-500/20 to-indigo-500/5",

  //   topics: [
  //     {
  //       category: "Writing",
  //       items: [
  //         { name: "Technical writing", level: "proficient", notes: "To be added" },
  //         { name: "Storytelling", level: "comfortable", notes: "To be added" },
  //         { name: "Documentation", level: "deep", notes: "To be added" },
  //       ],
  //     },
  //   ],
  // },
]

export function KnowledgeRepertoire() {
  const [activeCategory, setActiveCategory] = useState("computer-science")
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"detail" | "graph">("detail")
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

  const currentCategory = knowledgeCategories.find((c) => c.id === activeCategory) || knowledgeCategories[0]

  const totalItems = knowledgeCategories.reduce(
    (acc, cat) => acc + cat.topics.reduce((a, t) => a + t.items.length, 0),
    0
  )

  const levelCounts = knowledgeCategories.reduce(
    (acc, cat) => {
      cat.topics.forEach((t) => {
        t.items.forEach((item) => {
          acc[item.level] = (acc[item.level] || 0) + 1
        })
      })
      return acc
    },
    {} as Record<SkillLevel, number>
  )

  return (
    <section ref={sectionRef} className="overflow-x-clip px-4 sm:px-6 py-16 sm:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className={cn("opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Knowledge Repertoire ⋆˚</h2>
          </div>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            A living map of the areas & topics I'm passionate about & pursue through learning, projects, & more.
          </p>
        </div>

        {/* Stats bar */}
        <div className={cn("mt-8 mb-8 flex flex-wrap gap-4 opacity-0", isVisible && "animate-fade-in-up stagger-1")}>
          <div className="rounded-lg border border-border bg-card/40 glass px-4 py-2 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm">{totalItems} topics</span>
          </div>
          <div className="rounded-lg border border-border bg-card/40 glass px-4 py-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="font-mono text-sm">{levelCounts.deep || 0} deep expertise</span>
          </div>
          <div className="rounded-lg border border-border bg-card/40 glass px-4 py-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-500" />
            <span className="font-mono text-sm">{levelCounts.learning || 0} actively learning</span>
          </div>
          <div className="flex w-full gap-2 sm:ml-auto sm:w-auto">
            <button
              onClick={() => setViewMode("detail")}
              className={cn(
                "flex-1 px-3 py-1.5 rounded-lg font-mono text-xs transition-all sm:flex-none",
                viewMode === "detail" ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
            >
              detail
            </button>
            <button
              onClick={() => setViewMode("graph")}
              className={cn(
                "flex-1 px-3 py-1.5 rounded-lg font-mono text-xs transition-all sm:flex-none",
                viewMode === "graph" ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
            >
              graph
            </button>
          </div>
        </div>

        {viewMode === "detail" ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* Content panel */}
            <div
              className={cn(
                "min-w-0 rounded-xl border border-border bg-card/40 glass overflow-hidden opacity-0",
                isVisible && "animate-scale-in stagger-2",
              )}
            >
              {/* Category header */}
              <div className={cn("p-6 border-b border-border bg-gradient-to-r", currentCategory.color)}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs text-muted-foreground mb-1 block">/{currentCategory.icon}</span>
                    <h3 className="text-xl font-semibold">{currentCategory.label}</h3>
                    {currentCategory.currentFocus && (
                      <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Currently focused on: {currentCategory.currentFocus}
                      </p>
                    )}
                  </div>
                </div>
                {currentCategory.futureGoals && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {currentCategory.futureGoals.map((goal) => (
                      <span key={goal} className="px-2 py-1 rounded-full bg-background/50 text-xs font-mono text-muted-foreground">
                        {goal}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Topics */}
              <div className="p-6 space-y-8">
                {currentCategory.topics.map((topicGroup, idx) => (
                  <div key={idx} className="space-y-4">
                    <div>
                      <h4 className="font-mono text-sm font-medium text-primary">
                        {topicGroup.category}
                      </h4>
                      {topicGroup.description && (
                        <p className="text-xs text-muted-foreground mt-1">{topicGroup.description}</p>
                      )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {topicGroup.items.map((item, itemIdx) => {
                        const isExpanded = expandedItem === `${idx}-${itemIdx}`
                        const levelInfo = skillLevelConfig[item.level]
                        return (
                          <div
                            key={itemIdx}
                            className={cn(
                              "rounded-lg border border-border/50 bg-secondary/20 overflow-hidden transition-all duration-200",
                              isExpanded && "border-primary/30 bg-secondary/40"
                            )}
                          >
                            <button
                              onClick={() => setExpandedItem(isExpanded ? null : `${idx}-${itemIdx}`)}
                              className="w-full p-4 flex items-center gap-4 text-left hover:bg-secondary/30 transition-colors"
                            >
                              <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform", isExpanded && "rotate-90")} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 min-w-0">
                                  <span className="font-medium text-sm truncate">{item.name}</span>
                                  {item.lastTouched && (
                                    <span className="shrink-0 text-xs text-muted-foreground">
                                      {item.lastTouched === "today" ? (
                                        <span className="text-green-500">active today</span>
                                      ) : (
                                        item.lastTouched
                                      )}
                                    </span>
                                  )}
                                </div>
                                {/* Skill Level Bar */}
                                <div className="mt-2 flex items-center gap-3">
                                  <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden max-w-[120px]">
                                    <div className={cn("h-full rounded-full transition-all", levelInfo.color, levelInfo.width)} />
                                  </div>
                                  <span className="text-xs text-muted-foreground font-mono">{levelInfo.label}</span>
                                  {item.yearsActive && (
                                    <span className="text-xs text-muted-foreground">{item.yearsActive}</span>
                                  )}
                                </div>
                              </div>
                            </button>
                            {isExpanded && (
                              <div className="px-4 pb-4 pl-12 space-y-3 animate-fade-in">
                                {item.notes && (
                                  <p className="text-sm text-muted-foreground">{item.notes}</p>
                                )}
                                {item.connections && item.connections.length > 0 && (
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs text-muted-foreground">Connects to:</span>
                                    {item.connections.map((conn) => {
                                      const connCat = knowledgeCategories.find((c) => c.id === conn)
                                      return (
                                        <button
                                          key={conn}
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            setActiveCategory(conn)
                                            setExpandedItem(null)
                                          }}
                                          className="text-xs text-primary hover:underline"
                                        >
                                          {connCat?.label || conn}
                                        </button>
                                      )
                                    })}
                                  </div>
                                )}
                                {item.resources && item.resources.length > 0 && (
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs text-muted-foreground">Resources:</span>
                                    {item.resources.map((res, rIdx) => (
                                      <span key={rIdx} className="inline-flex items-center gap-1 text-xs bg-secondary/50 px-2 py-1 rounded">
                                        {res.title}
                                        {res.url && <ExternalLink className="h-3 w-3" />}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category sidebar */}
            <div
              className={cn(
                "min-w-0 space-y-2 opacity-0",
                isVisible && "animate-fade-in-up stagger-3",
              )}
            >
              {knowledgeCategories.map((category) => {
                const itemCount = category.topics.reduce((a, t) => a + t.items.length, 0)
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id)
                      setExpandedItem(null)
                    }}
                    className={cn(
                      "w-full rounded-lg border p-4 text-left transition-all duration-200 group",
                      activeCategory === category.id
                        ? "bg-primary/10 border-primary/40"
                        : "bg-card/40 glass border-border hover:border-primary/30 hover:bg-secondary/30",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-muted-foreground">{category.icon}</span>
                        <span className={cn(
                          "font-mono text-sm transition-colors",
                          activeCategory === category.id ? "text-primary" : "text-foreground"
                        )}>
                          <span className="block truncate">{category.label}</span>
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{itemCount}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          /* Graph view */
          <div className={cn("opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
            <div className="rounded-xl border border-border bg-card/40 glass p-8 min-h-[500px] flex items-center justify-center">
              <div className="relative w-full max-w-3xl aspect-square">
                {/* Center node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center z-10">
                  <span className="font-mono text-xs text-primary">me</span>
                </div>
                {/* Orbiting nodes */}
                {knowledgeCategories.map((cat, idx) => {
                  const angle = (idx / knowledgeCategories.length) * 2 * Math.PI - Math.PI / 2
                  const radius = 42 // percent
                  const x = 50 + radius * Math.cos(angle)
                  const y = 50 + radius * Math.sin(angle)
                  const itemCount = cat.topics.reduce((a, t) => a + t.items.length, 0)
                  const size = 12 + itemCount * 2

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id)
                        setViewMode("detail")
                      }}
                      className={cn(
                        "absolute rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 group",
                        activeCategory === cat.id
                          ? "bg-primary/30 border-primary"
                          : "bg-secondary/50 border-border hover:border-primary/50"
                      )}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        width: `${size}%`,
                        height: `${size}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <span className="font-mono text-[10px] sm:text-xs text-center px-1 opacity-80 group-hover:opacity-100">
                        {cat.label}
                      </span>
                    </button>
                  )
                })}
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                  {knowledgeCategories.map((cat, idx) => {
                    const angle = (idx / knowledgeCategories.length) * 2 * Math.PI - Math.PI / 2
                    const radius = 42
                    const x = 50 + radius * Math.cos(angle)
                    const y = 50 + radius * Math.sin(angle)
                    return (
                      <line
                        key={cat.id}
                        x1="50%"
                        y1="50%"
                        x2={`${x}%`}
                        y2={`${y}%`}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-border"
                        strokeDasharray="4 4"
                      />
                    )
                  })}
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}