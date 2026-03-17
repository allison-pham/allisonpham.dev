"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  Sparkles, Calendar, TrendingUp, TrendingDown, Target, Heart,
  Code2, BookOpen, Plane, Music, ChevronDown, Trophy,
  Lightbulb, AlertCircle, ArrowRight
} from "lucide-react"

interface YearlyReview {
  year: number
  theme: string
  themeColor: string
  summary: string
  highlights: { icon: React.ReactNode; label: string; value: string }[]
  wins: string[]
  lessons: string[]
  gratefulFor: string[]
  stats: { label: string; value: string | number; comparison?: string; trend?: "up" | "down" | "neutral" }[]
  topProjects: string[]
  booksRead: number
  countriesVisited: string[]
  wordOfTheYear: string
  nextYearGoals: string[]
}

// Colors: pink, violet, indigo, purple, blue, cyan, teal, emerald
const yearlyReviews: YearlyReview[] = [
  {
    year: 2026,
    theme: "Year of #",
    themeColor: "from-pink-500 to-pink-300",
    summary: "",
    highlights: [
      { icon: <Code2 className="h-4 w-4" />, label: "Projects Shipped", value: "0" },
      { icon: <BookOpen className="h-4 w-4" />, label: "Books Read", value: "0" },
      { icon: <Plane className="h-4 w-4" />, label: "Countries", value: "0" },
      { icon: <Music className="h-4 w-4" />, label: "Hours of Music", value: "0" },
    ],
    wins: [
      "",
    ],
    lessons: [
      "",
    ],
    gratefulFor: [
      "",
    ],
    stats: [
      { label: "GitHub Commits", value: 564, comparison: "-15% vs 2021", trend: "down" },
    ],
    topProjects: [
      "",
    ],
    booksRead: 0,
    countriesVisited: [""],
    wordOfTheYear: "",
    nextYearGoals: [
      "",
    ],
  },

  // {
  //   year: 2025,
  //   theme: "Year of #",
  //   themeColor: "from-violet-500 to-violet-300",
  //   summary: "",
  //   highlights: [
  //     { icon: <Code2 className="h-4 w-4" />, label: "Projects Shipped", value: "4" },
  //     { icon: <BookOpen className="h-4 w-4" />, label: "Books Read", value: "12" },
  //     { icon: <Plane className="h-4 w-4" />, label: "Countries", value: "3" },
  //     { icon: <Music className="h-4 w-4" />, label: "Hours of Music", value: "980" },
  //   ],
  //   wins: [
  //     "",
  //   ],
  //   lessons: [
  //     "",
  //   ],
  //   gratefulFor: [
  //     "",
  //   ],
  //   stats: [
  //     { label: "GitHub Commits", value: 564, comparison: "-15% vs 2021", trend: "down" },
  //   ],
  //   topProjects: [
  //     "",
  //   ],
  //   booksRead: 0,
  //   countriesVisited: [""],
  //   wordOfTheYear: "",
  //   nextYearGoals: [
  //     "",
  //   ],
  // },

  // {
  //   year: 2024,
  //   theme: "Year of #",
  //   themeColor: "from-indigo-500 to-indigo-300",
  //   summary: "",
  //   highlights: [
  //     { icon: <Code2 className="h-4 w-4" />, label: "Projects Shipped", value: "4" },
  //     { icon: <BookOpen className="h-4 w-4" />, label: "Books Read", value: "12" },
  //     { icon: <Plane className="h-4 w-4" />, label: "Countries", value: "3" },
  //     { icon: <Music className="h-4 w-4" />, label: "Hours of Music", value: "980" },
  //   ],
  //   wins: [
  //     "",
  //   ],
  //   lessons: [
  //     "",
  //   ],
  //   gratefulFor: [
  //     "",
  //   ],
  //   stats: [
  //     { label: "GitHub Commits", value: 564, comparison: "-15% vs 2021", trend: "down" },
  //   ],
  //   topProjects: [
  //     "",
  //   ],
  //   booksRead: 0,
  //   countriesVisited: [""],
  //   wordOfTheYear: "",
  //   nextYearGoals: [
  //     "",
  //   ],
  // },

  // {
  //   year: 2023,
  //   theme: "Year of #",
  //   themeColor: "from-purple-500 to-purple-300",
  //   summary: "",
  //   highlights: [
  //     { icon: <Code2 className="h-4 w-4" />, label: "Projects Shipped", value: "4" },
  //     { icon: <BookOpen className="h-4 w-4" />, label: "Books Read", value: "12" },
  //     { icon: <Plane className="h-4 w-4" />, label: "Countries", value: "3" },
  //     { icon: <Music className="h-4 w-4" />, label: "Hours of Music", value: "980" },
  //   ],
  //   wins: [
  //     "",
  //   ],
  //   lessons: [
  //     "",
  //   ],
  //   gratefulFor: [
  //     "",
  //   ],
  //   stats: [
  //     { label: "GitHub Commits", value: 564, comparison: "-15% vs 2021", trend: "down" },
  //   ],
  //   topProjects: [
  //     "",
  //   ],
  //   booksRead: 0,
  //   countriesVisited: [""],
  //   wordOfTheYear: "",
  //   nextYearGoals: [
  //     "",
  //   ],
  // },

  // {
  //   year: 2022,
  //   theme: "Year of #",
  //   themeColor: "from-blue-500 to-blue-300",
  //   summary: "",
  //   highlights: [
  //     { icon: <Code2 className="h-4 w-4" />, label: "Projects Shipped", value: "4" },
  //     { icon: <BookOpen className="h-4 w-4" />, label: "Books Read", value: "12" },
  //     { icon: <Plane className="h-4 w-4" />, label: "Countries", value: "3" },
  //     { icon: <Music className="h-4 w-4" />, label: "Hours of Music", value: "980" },
  //   ],
  //   wins: [
  //     "",
  //   ],
  //   lessons: [
  //     "",
  //   ],
  //   gratefulFor: [
  //     "",
  //   ],
  //   stats: [
  //     { label: "GitHub Commits", value: 564, comparison: "-15% vs 2021", trend: "down" },
  //   ],
  //   topProjects: [
  //     "",
  //   ],
  //   booksRead: 0,
  //   countriesVisited: [""],
  //   wordOfTheYear: "",
  //   nextYearGoals: [
  //     "",
  //   ],
  // },

  // {
  //   year: 2021,
  //   theme: "Year of #",
  //   themeColor: "from-cyan-500 to-cyan-300",
  //   summary: "",
  //   highlights: [
  //     { icon: <Code2 className="h-4 w-4" />, label: "Projects Shipped", value: "4" },
  //     { icon: <BookOpen className="h-4 w-4" />, label: "Books Read", value: "12" },
  //     { icon: <Plane className="h-4 w-4" />, label: "Countries", value: "3" },
  //     { icon: <Music className="h-4 w-4" />, label: "Hours of Music", value: "980" },
  //   ],
  //   wins: [
  //     "",
  //   ],
  //   lessons: [
  //     "",
  //   ],
  //   gratefulFor: [
  //     "",
  //   ],
  //   stats: [
  //     { label: "GitHub Commits", value: 564, comparison: "-15% vs 2021", trend: "down" },
  //   ],
  //   topProjects: [
  //     "",
  //   ],
  //   booksRead: 0,
  //   countriesVisited: [""],
  //   wordOfTheYear: "",
  //   nextYearGoals: [
  //     "",
  //   ],
  // },

  // {
  //   year: 2020,
  //   theme: "Year of #",
  //   themeColor: "from-teal-500 to-teal-300",
  //   summary: "",
  //   highlights: [
  //     { icon: <Code2 className="h-4 w-4" />, label: "Projects Shipped", value: "4" },
  //     { icon: <BookOpen className="h-4 w-4" />, label: "Books Read", value: "12" },
  //     { icon: <Plane className="h-4 w-4" />, label: "Countries", value: "3" },
  //     { icon: <Music className="h-4 w-4" />, label: "Hours of Music", value: "980" },
  //   ],
  //   wins: [
  //     "",
  //   ],
  //   lessons: [
  //     "",
  //   ],
  //   gratefulFor: [
  //     "",
  //   ],
  //   stats: [
  //     { label: "GitHub Commits", value: 564, comparison: "-15% vs 2021", trend: "down" },
  //   ],
  //   topProjects: [
  //     "",
  //   ],
  //   booksRead: 0,
  //   countriesVisited: [""],
  //   wordOfTheYear: "",
  //   nextYearGoals: [
  //     "",
  //   ],
  // },

  // {
  //   year: 2019,
  //   theme: "Year of #",
  //   themeColor: "from-emerald-500 to-emerald-300",
  //   summary: "",
  //   highlights: [
  //     { icon: <Code2 className="h-4 w-4" />, label: "Projects Shipped", value: "4" },
  //     { icon: <BookOpen className="h-4 w-4" />, label: "Books Read", value: "12" },
  //     { icon: <Plane className="h-4 w-4" />, label: "Countries", value: "3" },
  //     { icon: <Music className="h-4 w-4" />, label: "Hours of Music", value: "980" },
  //   ],
  //   wins: [
  //     "",
  //   ],
  //   lessons: [
  //     "",
  //   ],
  //   gratefulFor: [
  //     "",
  //   ],
  //   stats: [
  //     { label: "GitHub Commits", value: 564, comparison: "-15% vs 2021", trend: "down" },
  //   ],
  //   topProjects: [
  //     "",
  //   ],
  //   booksRead: 0,
  //   countriesVisited: [""],
  //   wordOfTheYear: "",
  //   nextYearGoals: [
  //     "",
  //   ],
  // },
]

export function YearlyReviews() {
  const [isVisible, setIsVisible] = useState(false)
  const [expandedYear, setExpandedYear] = useState<number | null>(2026)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="px-4 sm:px-6 pt-16 sm:pt-16 pb-8 sm:pb-12">
      <div className={cn("mx-auto max-w-7xl opacity-0", isVisible && "animate-fade-in-up")}>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Yearly Reviews
            </h2>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Annual wrapped - wins, lessons, stats, & reflections.
            My version of yearly recaps (inspiration: Spotify Wrapped), but for life.
            A way to celebrate progress, reflect on growth, & set intentions for the year ahead.
          </p>
        </div>

        {/* Year Cards */}
        <div className="mt-8 space-y-4">
          {yearlyReviews.map((review, i) => (
            <div
              key={review.year}
              className={cn(
                "rounded-xl border border-border bg-card/40 glass overflow-hidden opacity-0",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedYear(expandedYear === review.year ? null : review.year)}
                className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-secondary/30 transition-colors"
              >
                <div className={cn(
                  "w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl bg-gradient-to-br shrink-0",
                  review.themeColor
                )}>
                  {review.year.toString().slice(-2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{review.year}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 font-mono text-[10px] text-primary">
                      {review.theme}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{review.summary}</p>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  expandedYear === review.year && "rotate-180"
                )} />
              </button>

              {/* Expanded Content */}
              {expandedYear === review.year && (
                <div className="px-5 pb-6 border-t border-border/50 pt-5 space-y-6">
                  {/* Summary */}
                  <p className="text-muted-foreground leading-relaxed">{review.summary}</p>

                  {/* Highlight Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {review.highlights.map((h) => (
                      <div key={h.label} className="rounded-lg bg-secondary/30 border border-border/50 p-3 text-center">
                        <div className="flex justify-center text-primary mb-2">{h.icon}</div>
                        <p className="text-xl font-bold">{h.value}</p>
                        <p className="font-mono text-[10px] text-muted-foreground">{h.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Word of the Year */}
                  <div className={cn(
                    "rounded-lg p-4 text-center bg-gradient-to-br text-white",
                    review.themeColor
                  )}>
                    <p className="font-mono text-xs tracking-widest opacity-80 mb-1">Word of the Year</p>
                    <p className="text-3xl font-bold">{review.wordOfTheYear}</p>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Wins */}
                    <div>
                      <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                        <Trophy className="h-3.5 w-3.5 text-yellow-500" />
                        Wins
                      </h4>
                      <ul className="space-y-2">
                        {review.wins.map((win, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-green-500 mt-0.5">+</span>
                            <span>{win}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Lessons */}
                    <div>
                      <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                        <Lightbulb className="h-3.5 w-3.5 text-primary" />
                        Lessons Learned
                      </h4>
                      <ul className="space-y-2">
                        {review.lessons.map((lesson, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-primary font-mono text-xs mt-0.5">{idx + 1}.</span>
                            <span>{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Stats */}
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3">
                      By the Numbers
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {review.stats.map((stat) => (
                        <div key={stat.label} className="rounded-lg bg-secondary/20 border border-border/50 p-3">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-mono text-[10px] text-muted-foreground">{stat.label}</p>
                            {stat.trend && (
                              <span className={cn(
                                stat.trend === "up" && "text-green-500",
                                stat.trend === "down" && "text-red-500",
                                stat.trend === "neutral" && "text-muted-foreground"
                              )}>
                                {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                                {stat.trend === "down" && <TrendingDown className="h-3 w-3" />}
                              </span>
                            )}
                          </div>
                          <p className="font-bold">{stat.value}</p>
                          {stat.comparison && (
                            <p className="font-mono text-[9px] text-muted-foreground">{stat.comparison}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grateful For */}
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                    <h4 className="font-mono text-[10px] tracking-widest text-primary mb-3 flex items-center gap-2">
                      <Heart className="h-3.5 w-3.5" />
                      Grateful For
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {review.gratefulFor.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <span className="text-primary">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Next Year Goals */}
                  <div>
                    <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                      <Target className="h-3.5 w-3.5" />
                      Goals for {review.year + 1}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {review.nextYearGoals.map((goal, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-full bg-secondary/50 border border-border text-sm">
                          {goal}
                        </span>
                      ))}
                    </div>
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