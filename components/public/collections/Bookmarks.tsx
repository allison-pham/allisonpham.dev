"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  Atom, BookOpen, FileText, Quote, Video, Wrench, Sparkles, Palette,
  ChevronLeft, ChevronRight, Users, Brain, Music,
  Star, ChevronDown, Lightbulb, Tag,
} from "lucide-react"

type InspirationCategory = "design" | "code" | "philosophy" | "art" | "quote"

interface InspirationItem {
  id: string
  category: InspirationCategory
  title: string
  source?: string
  description: string
  accentColor: string
}

const inspirationCategoryConfig: Record<InspirationCategory, { label: string; color: string }> = {
  design: { label: "design", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30" },
  code: { label: "code", color: "bg-primary/10 text-primary border-primary/30" },
  philosophy: { label: "philosophy", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
  art: { label: "art", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30" },
  quote: { label: "quote", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30" },
}

const inspirationItems: InspirationItem[] = [
  {
    id: "alan-kay",
    category: "quote",
    title: "The best way to predict the future is to invent it.",
    source: "Alan Kay",
    description: "Innovation comes from taking action & creating the future you envision.",
    accentColor: "border-l-emerald-300",
  },

  {
    id: "scott-belsky",
    category: "quote",
    title: "It's not about ideas. It's about making ideas happen.",
    source: "Scott Belsky",
    description: "The execution gap is where most ideas don't go on. Ship it, then refine.",
    accentColor: "border-l-blue-300",
  },
]

const allInspirationCategories = Object.keys(inspirationCategoryConfig) as InspirationCategory[]

interface ReadingBook {
  id: string
  title: string
  author: string
  status: "reading" | "done" | "queue"
  rating?: 1 | 2 | 3 | 4 | 5
  category?: string
  coverColor?: string
  summary?: string
  keyTakeaways?: string[]
  favoriteQuotes?: string[]
}

const readingBooks: ReadingBook[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    status: "queue",
    // rating: N/A,
    category: "self-improvement",
    coverColor: "bg-yellow-300",
    summary: "N/A",
    keyTakeaways: ["N/A"],
    favoriteQuotes: ["N/A"],
  },
  
  {
    id: "dorian-gray",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    status: "done",
    // rating: N/A,
    category: "gothic-fiction",
    coverColor: "bg-blue-300",
    summary: "N/A",
    keyTakeaways: ["N/A"],
    favoriteQuotes: ["N/A"],
  },

  {
    id: "earnest",
    title: "The Importance of Being Earnest",
    author: "Oscar Wilde",
    status: "done",
    // rating: N/A,
    category: "satirical-play",
    coverColor: "bg-purple-300",
    summary: "N/A",
    keyTakeaways: ["N/A"],
    favoriteQuotes: ["N/A"],
  },

  {
    id: "frankenstein",
    title: "Frankenstein",
    author: "Mary Shelley",
    status: "done",
    // rating: N/A,
    category: "gothic-sci-fi",
    coverColor: "bg-orange-300",
    summary: "N/A",
    keyTakeaways: ["N/A"],
    favoriteQuotes: ["N/A"],
  },
  
  {
    id: "great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    status: "done",
    // rating: N/A,
    category: "literary-fiction",
    coverColor: "bg-emerald-300",
    summary: "N/A",
    keyTakeaways: ["N/A"],
    favoriteQuotes: ["N/A"],
  },
]

interface FlipPage {
  id: string
  icon: React.ReactNode
  label: string
  content: React.ReactNode
}

export function BookmarksFlipbook() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null)
  const [activeInspirationCategory, setActiveInspirationCategory] = useState<InspirationCategory | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const [navHeight, setNavHeight] = useState<number | null>(null)

  const filteredInspirationItems = activeInspirationCategory
    ? inspirationItems.filter((item) => item.category === activeInspirationCategory)
    : inspirationItems

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!navRef.current) return

    const updateHeight = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight)
    }

    updateHeight()
    const resizeObserver = new ResizeObserver(() => updateHeight())
    resizeObserver.observe(navRef.current)
    window.addEventListener("resize", updateHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateHeight)
    }
  }, [])

  const pages: FlipPage[] = [
    // Overview
    {
      id: "overview",
      icon: <Tag className="h-4 w-4" />,
      label: "Overview",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="font-mono text-xs text-muted-foreground tracking-wider">Each tab captures a different kind of bookmark</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: <Palette className="h-4 w-4" />, label: "Art", note: "Visual inspiration I admire" },
              { icon: <Brain className="h-4 w-4" />, label: "Concepts & Models", note: "Frameworks, principles, & lines of thinking that shape how I learn, design, & decide" },
              { icon: <Lightbulb className="h-4 w-4" />, label: "Inspiration Board", note: "Collected sparks: ideas & references (sorted by category)" },
              { icon: <Music className="h-4 w-4" />, label: "Music & Playlists", note: "Soundtracks for different modes (e.g. flow, focus, & reflection)" },
              { icon: <BookOpen className="h-4 w-4" />, label: "Reading Library", note: "Some of the books I'm reading or have finished, along with notes, takeaways, & quotes" },
              { icon: <Video className="h-4 w-4" />, label: "Talks & Videos", note: "Talks worth revisiting for ideas, perspective, or explanation clarity" },
              { icon: <Atom className="h-4 w-4" />, label: "Tiny Experiments", note: "Small bets, ongoing trials, & side explorations with clear outcomes" },
              { icon: <Wrench className="h-4 w-4" />, label: "Tools", note: "The tools I use for writing, building, & thinking" },
              { icon: <FileText className="h-4 w-4" />, label: "Writing & Research", note: "Articles, essays, & papers I enjoy" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border/50 bg-secondary/30 px-4 py-3 transition-colors hover:border-primary/30">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-primary">{item.icon}</span>
                  <p className="text-sm font-semibold">{item.label}</p>
                </div>
                <p className="font-mono text-xs leading-relaxed text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // Art
    {
      id: "art",
      icon: <Palette className="h-4 w-4" />,
      label: "Art",
      content: (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">Visual references, creative influences, & makers whose work I keep studying</p>
          {[
            { piece: "Almond Blossoms", creator: "Vincent van Gogh" },
          ].map((a) => (
            <div key={a.piece} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-semibold">{a.piece}</p>
              </div>
              <p className="font-mono text-xs text-muted-foreground">{a.creator}</p>
            </div>
          ))}
        </div>
      ),
    },

    // Concepts & Models
    {
      id: "concepts-library",
      icon: <Brain className="h-4 w-4" />,
      label: "Concepts & Models",
      content: (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">Core ideas I revisit often, frameworks I use to think clearly (e.g. for decision-making), lessons learned (hard-won insights), & questions I'm exploring that guide my current work. Reusable principles connected across projects & seasons.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { concept: "2nd brain", note: "Personal knowledge management (PKM) system to capture & organize info (files, ideas, notes, etc.)", domain: "productivity" },
              { concept: "Deep work", note: "Focus without distraction for productivity", domain: "productivity" },
              { concept: "Design principles", note: "My working design philosophy: details matter → start with why", domain: "product" },
              { concept: "Documentation", note: "Document everything", domain: "building" },
              { concept: "Feedback loops", note: "Create mechanisms to learn & adapt quickly", domain: "systems" },
              { concept: "First principles", note: "Break down complex problems into fundamental truths", domain: "systems" },
              { concept: "Inversion", note: "Ask what could fail first, then design around it", domain: "design" },
              { concept: "Learning how to learn", note: "Interleaving - learning efficiently", domain: "knowledge" },
              { concept: "Leverage", note: "Build once, benefit repeatedly", domain: "building" },
              { concept: "Rest", note: "Prioritize scheduled recovery to maintain sustainable output", domain: "productivity" },
              { concept: "Second-order thinking", note: "Analyze the long-term effects of actions instead of immediate results", domain: "mindset" },
              { concept: "Systems", note: "Build systems that stay useful at higher complexity", domain: "systems" },
              { concept: "UI/UX patterns", note: "Strategic & tactical design", domain: "design" },
            ].map((c) => (
              <div key={c.concept} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold">{c.concept}</p>
                  <span className="shrink-0 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 font-mono text-[10px] text-primary">{c.domain}</span>
                </div>
                <p className="font-mono text-xs text-muted-foreground">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // Inspiration Board
    {
      id: "inspiration-board",
      icon: <Lightbulb className="h-4 w-4" />,
      label: "Inspiration Board",
      content: (
        <div className="space-y-4">
          <p className="font-mono text-xs text-muted-foreground tracking-wider">Ideas, people, & quotes (words that stuck with me) that keep showing up in how I think & build</p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveInspirationCategory(null)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all duration-200",
                !activeInspirationCategory
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              )}
            >
              <Tag className="h-3 w-3" /> all
            </button>

            {allInspirationCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveInspirationCategory(activeInspirationCategory === category ? null : category)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all duration-200",
                  activeInspirationCategory === category
                    ? inspirationCategoryConfig[category].color
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                )}
              >
                {inspirationCategoryConfig[category].label}
              </button>
            ))}
          </div>

          <div className="columns-1 gap-3 sm:columns-2">
            {filteredInspirationItems.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "mb-3 break-inside-avoid rounded-xl border border-l-4 border-border bg-card/40 p-5 transition-colors hover:border-primary/40",
                  item.accentColor
                )}
              >
                <span className={cn("mb-3 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px]", inspirationCategoryConfig[item.category].color)}>
                  {item.category === "quote" ? <Quote className="h-2.5 w-2.5" /> : <Tag className="h-2.5 w-2.5" />}
                  {inspirationCategoryConfig[item.category].label}
                </span>

                <h3 className={cn("mb-2 font-medium leading-snug", item.category === "quote" ? "text-base italic" : "text-sm")}>
                  {item.category === "quote" ? `"${item.title}"` : item.title}
                </h3>

                {item.source && (
                  <p className="mb-2 font-mono text-xs text-primary">- {item.source}</p>
                )}

                <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    // Music & Playlists
    {
      id: "music-playlists",
      icon: <Music className="h-4 w-4" />,
      label: "Music & Playlists",
      content: (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">Curated for different modes</p>
          {[
            { name: "Deep Work", mood: "flow state", tracks: "Lo-fi, ambient, no lyrics", color: "bg-primary/10 text-primary border-primary/30" },
          ].map((pl) => (
            <div key={pl.name} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-semibold">{pl.name}</p>
                <span className={cn("shrink-0 px-2 py-0.5 rounded-full border font-mono text-[10px]", pl.color)}>{pl.mood}</span>
              </div>
              <p className="font-mono text-xs text-muted-foreground">{pl.tracks}</p>
            </div>
          ))}
        </div>
      ),
    },

    // Reading Library
    {
      id: "reading",
      icon: <BookOpen className="h-4 w-4" />,
      label: "Reading Library",
      content: (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">Currently reading + notes & learnings</p>
          {readingBooks.map((book) => {
            const hasNotes = !!book.summary
            const isExpanded = expandedBookId === book.id
            return (
              <div key={book.id} className="rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors overflow-hidden">
                <button
                  onClick={() => hasNotes && setExpandedBookId(isExpanded ? null : book.id)}
                  className={cn("w-full flex items-center gap-3 px-4 py-3 text-left", hasNotes ? "cursor-pointer" : "cursor-default")}
                >
                  <div className={cn("w-3 h-16 rounded-sm shrink-0", book.coverColor ?? "bg-secondary")} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium truncate">{book.title}</p>
                      {book.rating && (
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={cn("h-3 w-3", star <= book.rating! ? "fill-primary text-primary" : "text-muted-foreground/30")} />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <p className="font-mono text-xs text-muted-foreground">{book.author}</p>
                      {book.category && (
                        <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                          <Tag className="h-3 w-3" />{book.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn("px-2 py-0.5 rounded-full border font-mono text-[10px]",
                      book.status === "reading" ? "bg-primary/10 text-primary border-primary/30" :
                      book.status === "done" ? "bg-secondary text-muted-foreground border-border" :
                      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
                    )}>
                      {book.status === "queue" ? "antilibrary" : book.status}
                    </span>
                    {hasNotes && (
                      <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isExpanded && "rotate-180")} />
                    )}
                  </div>
                </button>

                {hasNotes && isExpanded && (
                  <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-4">
                    <div>
                      <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1">Summary</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{book.summary}</p>
                    </div>
                    {book.keyTakeaways && book.keyTakeaways.length > 0 && (
                      <div>
                        <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Lightbulb className="h-3 w-3 text-primary" />Key Takeaways
                        </h4>
                        <ul className="space-y-1.5">
                          {book.keyTakeaways.map((t, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-primary font-mono text-xs mt-0.5">{idx + 1}.</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {book.favoriteQuotes && book.favoriteQuotes.length > 0 && (
                      <div>
                        <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Quote className="h-3 w-3 text-primary" />Favorite Quotes
                        </h4>
                        <div className="space-y-2">
                          {book.favoriteQuotes.map((q, idx) => (
                            <blockquote key={idx} className="pl-3 border-l-2 border-primary/50 text-sm italic text-muted-foreground">
                              &ldquo;{q}&rdquo;
                            </blockquote>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ),
    },

    // Talks & Videos
    {
      id: "talks-videos",
      icon: <Video className="h-4 w-4" />,
      label: "Talks & Videos",
      content: (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">Talks worth watching twice</p>
          {[
            { title: "Why you keep rewatching the same TV show", speaker: "Michael Smith", event: "TEDx Talks" },
          ].map((t) => (
            <div key={t.title} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <p className="text-sm font-medium">{t.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="font-mono text-xs text-muted-foreground">{t.speaker}</p>
                <span className="text-muted-foreground">·</span>
                <p className="font-mono text-xs text-muted-foreground">{t.event}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },

    // Tiny Experiments
    {
      id: "tiny-experiments",
      icon: <Atom className="h-4 w-4" />,
      label: "Tiny Experiments",
      content: (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">An extension of my lab & projects pages - small bets with clear outcomes</p>
          {[
            { experiment: "Daily design notes", notes: "Building consistency", status: "active" },
          ].map((e) => (
            <div key={e.experiment} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-semibold">{e.experiment}</p>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-secondary border border-border font-mono text-[10px] text-muted-foreground">{e.status}</span>
              </div>
              <p className="font-mono text-xs text-muted-foreground">{e.notes}</p>
            </div>
          ))}
        </div>
      ),
    },

    // Tools
    {
      id: "tools",
      icon: <Wrench className="h-4 w-4" />,
      label: "Tools",
      content: (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">Toolkit by context (what I use for different modes) & useful tools I keep coming back to</p>
          {[
            { context: "Productivity", tools: "Notion, Obsidian" },
            { context: "Building", tools: "GitHub" },
            { context: "Thinking", tools: "Excalidraw" },
            // { name: "Excalidraw", purpose: "Hand-drawn diagrams + wireframes", type: "design" },
            // { name: "Notion", purpose: "Docs, wikis, project tracking", type: "productivity" },
          ].map((t) => (
            <div key={t.context} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <p className="text-sm font-semibold mb-1">{t.context}</p>
              <p className="font-mono text-xs text-muted-foreground">{t.tools}</p>
            </div>
          ))}
        </div>
      ),
    },

    {
      id: "writing",
      icon: <FileText className="h-4 w-4" />,
      label: "Writing & Research",
      content: (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">Articles, essays, & papers worth keeping</p>
          {[
            { title: "Cognitive Load Theory in HCI", source: "Research paper", type: "paper" },
          ].map((w) => (
            <div key={w.title} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{w.title}</p>
                  <p className="font-mono text-xs text-muted-foreground mt-0.5">{w.source}</p>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-secondary border border-border font-mono text-[10px] text-muted-foreground">{w.type}</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ]

  const totalPages = pages.length
  const current = pages[currentPage]

  return (
    <section ref={ref} className="relative px-4 sm:px-6 pt-16 sm:pt-16 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
      <div className={cn("space-y-3 mb-6 opacity-0", isVisible && "animate-fade-in-up")}>
        <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">
            a bit of everything;
          </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Bookmarks</h2>
        <p className="w-fit max-w-none text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-nowrap">Mini flipbook that works like a small index of artifacts, ideas, & references I return to often.</p>
      </div>

      <div className={cn("opacity-0", isVisible && "animate-fade-in-up stagger-1")}>
      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar Nav */}
        <div ref={navRef} className="rounded-xl border border-border bg-card/40 glass p-3 space-y-1 h-fit">
          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => setCurrentPage(index)}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-mono text-xs transition-all duration-200",
                currentPage === index
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-transparent"
              )}
            >
              <span className={cn(currentPage === index ? "text-primary" : "text-muted-foreground")}>
                {page.icon}
              </span>
              {page.label}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="rounded-xl border border-border bg-card/40 glass overflow-hidden flex flex-col lg:self-start" style={navHeight ? { height: `${navHeight}px` } : undefined}>
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-6 py-4">
            <div className="flex items-center gap-2">
              {current.icon}
              <span className="font-mono text-sm font-medium">{current.label}</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">{currentPage + 1} / {totalPages}</span>
          </div>

          {/* Panel Content */}
          <div className="p-6 flex-1 overflow-y-auto">
            {current.content}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-border/50 bg-secondary/30 px-6 py-4">
            <button
              onClick={() => setCurrentPage((p) => (p - 1 + totalPages) % totalPages)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors font-mono text-xs"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>

            <div className="flex gap-1">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-200",
                    currentPage === i ? "bg-primary w-6" : "bg-border hover:bg-muted-foreground w-2"
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => (p + 1) % totalPages)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors font-mono text-xs"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      </div>
      </div>
    </section>
  )
}
