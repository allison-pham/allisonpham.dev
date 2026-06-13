"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/core-features/utils"
import { BookOpen, ExternalLink } from "lucide-react"

type Level = "beginner" | "learning" | "conversational" | "fluent"

type Language = {
  name: string
  flag: string
  level: Level
  note: string
  phrases: { native: string; meaning: string }[]
  resources: { label: string; href: string }[]
}

const LEVEL_CONFIG: Record<Level, { label: string; color: string; bar: number }> = {
  beginner:      { label: "beginner",      color: "bg-blue-500/30 text-blue-400 border-blue-500/30",      bar: 15  },
  learning:      { label: "learning",      color: "bg-yellow-500/30 text-yellow-400 border-yellow-500/30", bar: 40  },
  conversational:{ label: "conversational",color: "bg-primary/20 text-primary border-primary/30",          bar: 70  },
  fluent:        { label: "fluent",         color: "bg-green-500/20 text-green-400 border-green-500/30",   bar: 95  },
}

const LANGUAGES: Language[] = [
  {
    name: "Vietnamese",
    flag: "🇻🇳",
    level: "fluent",
    note: "Heritage language. Thinking in it comes naturally.",
    phrases: [
      { native: "Cảm ơn bạn", meaning: "Thank you" },
      { native: "Xin chào", meaning: "Hello" },
      { native: "Tôi đang học", meaning: "I am studying" },
    ],
    resources: [
      { label: "Duolingo", href: "https://duolingo.com" },
    ],
  },
  {
    name: "Japanese",
    flag: "🇯🇵",
    level: "learning",
    note: "Actively studying. Currently drilling kanji + sentence patterns.",
    phrases: [
      { native: "よろしくお願いします", meaning: "Nice to meet you / Please take care of me" },
      { native: "頑張ります", meaning: "I'll do my best" },
      { native: "面白い", meaning: "Interesting / fun" },
    ],
    resources: [
      { label: "Anki", href: "https://apps.ankiweb.net" },
      { label: "WaniKani", href: "https://wanikani.com" },
      { label: "Bunpro", href: "https://bunpro.jp" },
    ],
  },
  {
    name: "Korean",
    flag: "🇰🇷",
    level: "beginner",
    note: "Just started. Hangul clicks - grammar is next.",
    phrases: [
      { native: "안녕하세요", meaning: "Hello" },
      { native: "감사합니다", meaning: "Thank you" },
      { native: "잘 부탁드립니다", meaning: "Please take care of me" },
    ],
    resources: [
      { label: "Talk To Me In Korean", href: "https://talktomeinkorean.com" },
    ],
  },
]

export function LanguageLearning() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeLanguage, setActiveLanguage] = useState(0)
  const [flippedPhrases, setFlippedPhrases] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Reset flipped cards when switching language
  useEffect(() => {
    setFlippedPhrases(new Set())
  }, [activeLanguage])

  const togglePhrase = (index: number) => {
    setFlippedPhrases((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const lang = LANGUAGES[activeLanguage]
  const level = LEVEL_CONFIG[lang.level]

  return (
    <section
      ref={sectionRef}
      className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className={cn("mb-10 sm:mb-14 space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            language logs;
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Languages 言語 언어
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Languages I speak, study, and slowly acquire - one phrase card at a time.
          </p>
        </div>

        {/* Language tabs */}
        <div className={cn("mb-8 flex flex-wrap gap-3 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "100ms" }}>
          {LANGUAGES.map((l, i) => (
            <button
              key={l.name}
              onClick={() => setActiveLanguage(i)}
              className={cn(
                "flex items-center gap-2.5 rounded-full border px-4 py-2 font-mono text-xs tracking-wider transition-all duration-300 active:scale-[0.98]",
                activeLanguage === i
                  ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20"
                  : "border-border text-muted-foreground hover:border-foreground/50 hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <span>{l.flag}</span>
              <span>{l.name.toLowerCase()}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">

          {/* Left: level + note + resources */}
          <div
            className={cn(
              "lg:col-span-2 flex flex-col gap-5 rounded-xl border border-border/50 bg-card/40 glass p-6 sm:p-7 opacity-0",
              isVisible && "animate-fade-in-up"
            )}
            style={{ animationDelay: "150ms" }}
          >
            {/* Flag + name */}
            <div className="flex items-center gap-3">
              <span className="text-4xl">{lang.flag}</span>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">{lang.name}</h3>
                <span className={cn("mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wider", level.color)}>
                  {level.label}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5">
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground">proficiency</p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{ width: `${level.bar}%` }}
                />
              </div>
            </div>

            {/* Personal note */}
            <p className="text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/30 pl-3 italic">
              {lang.note}
            </p>

            {/* Resources */}
            {lang.resources.length > 0 && (
              <div className="space-y-2">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  resources i use
                </p>
                <div className="flex flex-wrap gap-2">
                  {lang.resources.map((r) => (
                    <a
                      key={r.label}
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-1.5 rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary"
                    >
                      <BookOpen className="h-3 w-3" />
                      {r.label}
                      <ExternalLink className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: phrase flip cards */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <p className={cn("font-mono text-[10px] tracking-widest text-muted-foreground opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "200ms" }}>
              tap a card to reveal translation →
            </p>
            {lang.phrases.map((phrase, i) => {
              const isFlipped = flippedPhrases.has(i)
              return (
                <button
                  key={phrase.native}
                  onClick={() => togglePhrase(i)}
                  className={cn(
                    "group relative w-full rounded-xl border bg-card/40 glass p-6 text-left hover-lift transition-all duration-300 opacity-0",
                    isVisible && "animate-fade-in-up",
                    isFlipped
                      ? "border-primary/40 bg-primary/5"
                      : "border-border/50 hover:border-primary/30"
                  )}
                  style={{ animationDelay: `${i * 80 + 250}ms` }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5 min-w-0">
                      <p className={cn(
                        "text-lg font-bold tracking-tight transition-colors duration-300",
                        isFlipped ? "text-primary" : "text-foreground group-hover:text-primary"
                      )}>
                        {phrase.native}
                      </p>
                      {isFlipped && (
                        <p className="font-mono text-sm text-muted-foreground animate-fade-in-up">
                          ↳ {phrase.meaning}
                        </p>
                      )}
                    </div>
                    <span className={cn(
                      "shrink-0 font-mono text-[10px] tracking-widest transition-colors duration-300",
                      isFlipped ? "text-primary" : "text-muted-foreground"
                    )}>
                      {isFlipped ? "hide" : "reveal"}
                    </span>
                  </div>
                  {/* bottom bar */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
                </button>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}