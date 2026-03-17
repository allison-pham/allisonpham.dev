"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  BookOpen, FileText, Quote, Video, Wrench, Sparkles, Palette,
  ChevronLeft, ChevronRight, Users, Brain, Music,
} from "lucide-react"

interface FlipPage {
  id: string
  icon: React.ReactNode
  label: string
  content: React.ReactNode
}

export function BookmarksFlipbook() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const pages: FlipPage[] = [
    {
      id: "reading",
      icon: <BookOpen className="h-4 w-4" />,
      label: "Reading List",
      content: (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">Currently reading + antilibrary</p>
          {[
            { title: "The Pragmatic Programmer", author: "Hunt & Thomas", status: "reading" },
          ].map((book) => (
            <div key={book.title} className="flex items-center gap-3 rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{book.title}</p>
                <p className="font-mono text-xs text-muted-foreground">{book.author}</p>
              </div>
              <span className={cn("shrink-0 px-2 py-0.5 rounded-full border font-mono text-[10px]",
                book.status === "reading" ? "bg-primary/10 text-primary border-primary/30" :
                book.status === "done" ? "bg-secondary text-muted-foreground border-border" :
                "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
              )}>
                {book.status === "queue" ? "antilibrary" : book.status}
              </span>
            </div>
          ))}
        </div>
      ),
    },

    {
      id: "lessons",
      icon: <Brain className="h-4 w-4" />,
      label: "Lessons Learned",
      content: (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">Hard-won insights</p>
          {[
            { lesson: "Document everything", category: "building", insight: "Future you will thank present you every single time." },
            { lesson: "Rest is productive", category: "health", insight: "Sustainable output requires scheduled recovery." },
          ].map((l) => (
            <div key={l.lesson} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-semibold">{l.lesson}</p>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 font-mono text-[10px] text-primary">{l.category}</span>
              </div>
              <p className="font-mono text-xs text-muted-foreground italic">&ldquo;{l.insight}&rdquo;</p>
            </div>
          ))}
        </div>
      ),
    },

    {
      id: "influences",
      icon: <Users className="h-4 w-4" />,
      label: "Influences",
      content: (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">People &amp; ideas that shaped my thinking</p>
          {[
            { name: "Paul Graham", role: "Essays on startups + thinking clearly", tags: ["writing", "startups"] },
          ].map((p) => (
            <div key={p.name} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <p className="text-sm font-semibold">{p.name}</p>
                <div className="flex gap-1 shrink-0">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-secondary border border-border font-mono text-[10px] text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{p.role}</p>
            </div>
          ))}
        </div>
      ),
    },

    {
      id: "playlists",
      icon: <Music className="h-4 w-4" />,
      label: "Playlists",
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

    {
      id: "quotes",
      icon: <Quote className="h-4 w-4" />,
      label: "Quotes",
      content: (
        <div className="space-y-4">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">Words that stuck with me</p>
          {[
            { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
          ].map((q) => (
            <div key={q.author} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-4 hover:border-primary/30 transition-colors">
              <p className="text-sm italic text-foreground leading-relaxed mb-2">&ldquo;{q.text}&rdquo;</p>
              <p className="font-mono text-xs text-primary">— {q.author}</p>
            </div>
          ))}
        </div>
      ),
    },

    {
      id: "talks",
      icon: <Video className="h-4 w-4" />,
      label: "Talks / Videos",
      content: (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">Talks worth watching twice</p>
          {[
            { title: "TED Talk", speaker: "N/A", event: "TED Talk" },
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

    {
      id: "tools",
      icon: <Wrench className="h-4 w-4" />,
      label: "Tools",
      content: (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">Useful tools I keep coming back to</p>
          {[
            { name: "Notion", purpose: "Docs, wikis, project tracking", type: "productivity" },
            { name: "Excalidraw", purpose: "Hand-drawn diagrams + wireframes", type: "design" },
          ].map((t) => (
            <div key={t.name} className="flex items-center justify-between rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{t.purpose}</p>
              </div>
              <span className="shrink-0 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 font-mono text-[10px] text-primary">{t.type}</span>
            </div>
          ))}
        </div>
      ),
    },

    {
      id: "art",
      icon: <Palette className="h-4 w-4" />,
      label: "Art",
      content: (
        <div className="space-y-3">
          <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">Visual inspiration &amp; creators I admire</p>
          {[
            { creator: "Pentagram", medium: "Brand identity + design systems", note: "Timeless approach to visual language" },
          ].map((a) => (
            <div key={a.creator} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-semibold">{a.creator}</p>
                <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{a.medium}</span>
              </div>
              <p className="font-mono text-xs text-muted-foreground italic">{a.note}</p>
            </div>
          ))}
        </div>
      ),
    },
  ]

  const totalPages = pages.length
  const current = pages[currentPage]

  return (
    <div ref={ref} className={cn("opacity-0 mx-auto max-w-7xl px-4", isVisible && "animate-fade-in-up stagger-1")}>
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Bookmarks</h2>
      </div>
      <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">Mini flipbook.</p>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar Nav */}
        <div className="rounded-xl border border-border bg-card/40 glass p-3 space-y-1 h-fit">
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
        <div className="rounded-xl border border-border bg-card/40 glass overflow-hidden flex flex-col">
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-6 py-4">
            <div className="flex items-center gap-2">
              {current.icon}
              <span className="font-mono text-sm font-medium">{current.label}</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">{currentPage + 1} / {totalPages}</span>
          </div>

          {/* Panel Content */}
          <div className="p-6 flex-1 overflow-y-auto max-h-[560px]">
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
  )
}
