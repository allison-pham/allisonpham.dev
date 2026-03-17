"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  Star, ChevronDown, Quote, Lightbulb,
  Calendar, Tag, ExternalLink
} from "lucide-react"

interface BookNote {
  id: string
  title: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
  dateRead: string
  category: string
  coverColor: string
  summary: string
  keyTakeaways: string[]
  favoriteQuotes: string[]
  wouldRecommendTo: string
}

const bookNotes: BookNote[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4,
    dateRead: "#",
    category: "self-improvement",
    coverColor: "bg-blue-300",
    summary: "N/A.",
    keyTakeaways: [
      "N/A.",
    ],
    favoriteQuotes: [
      "N/A.",
    ],
    wouldRecommendTo: "N/A.",
  },
]

export function BookNotes() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const categories = [...new Set(bookNotes.map((b) => b.category))]
  const filteredBooks = filterCategory
    ? bookNotes.filter((b) => b.category === filterCategory)
    : bookNotes

  return (
    <section ref={ref} className="px-4 sm:px-6 py-16 sm:py-20">
      <div className={cn("mx-auto max-w-5xl opacity-0", isVisible && "animate-fade-in-up")}>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Book Notes</h2>
        </div>
        <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Detailed notes and takeaways from books I've read. Not just a list, but learnings.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilterCategory(null)}
            className={cn(
              "px-3 py-1.5 rounded-full font-mono text-[10px] tracking-wider transition-all",
              !filterCategory
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            all ({bookNotes.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full font-mono text-[10px] tracking-wider transition-all",
                filterCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="space-y-4">
          {filteredBooks.map((book, i) => (
            <div
              key={book.id}
              className={cn(
                "rounded-xl border border-border bg-card/40 glass overflow-hidden opacity-0",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <button
                onClick={() => setExpandedId(expandedId === book.id ? null : book.id)}
                className="w-full px-5 py-4 flex items-start gap-4 text-left hover:bg-secondary/30 transition-colors"
              >
                {/* Book spine */}
                <div className={cn("w-3 h-16 rounded-sm shrink-0", book.coverColor)} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold">{book.title}</h3>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-3 w-3",
                            star <= book.rating ? "fill-primary text-primary" : "text-muted-foreground/30"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {book.dateRead}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                      <Tag className="h-3 w-3" />
                      {book.category}
                    </span>
                  </div>
                </div>

                <ChevronDown className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform shrink-0 mt-1",
                  expandedId === book.id && "rotate-180"
                )} />
              </button>

              {expandedId === book.id && (
                <div className="px-5 pb-5 border-t border-border/50 pt-4 space-y-5">
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2">Summary</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{book.summary}</p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                      <Lightbulb className="h-3 w-3 text-primary" />
                      Key Takeaways
                    </h4>
                    <ul className="space-y-2">
                      {book.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-primary font-mono text-xs mt-0.5">{idx + 1}.</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                      <Quote className="h-3 w-3 text-primary" />
                      Favorite Quotes
                    </h4>
                    <div className="space-y-3">
                      {book.favoriteQuotes.map((quote, idx) => (
                        <blockquote key={idx} className="pl-4 border-l-2 border-primary/50 text-sm italic text-muted-foreground">
                          &ldquo;{quote}&rdquo;
                        </blockquote>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg bg-secondary/30 border border-border/50 p-4">
                    <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2">
                      Would Recommend To
                    </h4>
                    <p className="text-sm">{book.wouldRecommendTo}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}