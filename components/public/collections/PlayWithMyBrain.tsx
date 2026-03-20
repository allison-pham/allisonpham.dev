"use client"

import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react"
import { BrainCircuit, Dices, Sparkles, TimerReset, WandSparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const CHAOS_SYMBOLS = ["@", "#", "*", "~", "%", "&", "?", "+"]
const BASE_PHRASE = "intentional weirdness as a playground for curiosity"
const GLYPH_SIZE = 20
const GLYPH_PAIRS = [
  { base: "○", odd: "◌" },
  { base: "□", odd: "▢" },
  { base: "◇", odd: "◈" },
  { base: "△", odd: "▵" },
  { base: "✦", odd: "✧" },
]

interface StarPoint {
  id: string
  x: number
  y: number
}

interface GlyphRound {
  base: string
  odd: string
  oddIndex: number
}

type HunterMode = "idle" | "playing" | "done"

function scramblePhrase(phrase: string, intensity: number) {
  const probability = intensity / 100
  return phrase
    .split("")
    .map((char) => {
      if (char === " ") return " "
      if (Math.random() < probability) {
        const randomSymbol = CHAOS_SYMBOLS[Math.floor(Math.random() * CHAOS_SYMBOLS.length)]
        return randomSymbol
      }
      return char
    })
    .join("")
}

function createStarPoint(x: number, y: number) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    x,
    y,
  }
}

function createGlyphRound() {
  const pair = GLYPH_PAIRS[Math.floor(Math.random() * GLYPH_PAIRS.length)]
  return {
    base: pair.base,
    odd: pair.odd,
    oddIndex: Math.floor(Math.random() * GLYPH_SIZE),
  }
}

export function PlayWithMyBrain() {
  const [isVisible, setIsVisible] = useState(false)
  const [chaosLevel, setChaosLevel] = useState(24)
  const [scrambledText, setScrambledText] = useState(BASE_PHRASE)
  const [stars, setStars] = useState<StarPoint[]>([])
  const [glyphRound, setGlyphRound] = useState<GlyphRound>(() => createGlyphRound())
  const [glyphStreak, setGlyphStreak] = useState(0)
  const [glyphBest, setGlyphBest] = useState(0)
  const [glyphMessage, setGlyphMessage] = useState("spot the odd glyph")
  const [reactionMode, setReactionMode] = useState<"idle" | "waiting" | "ready" | "result">("idle")
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [bestReactionTime, setBestReactionTime] = useState<number | null>(null)
  const [hunterMode, setHunterMode] = useState<HunterMode>("idle")
  const [hunterScore, setHunterScore] = useState(0)
  const [hunterBest, setHunterBest] = useState(0)
  const [hunterTimeLeft, setHunterTimeLeft] = useState(12)
  const [hunterTarget, setHunterTarget] = useState({ x: 46, y: 44 })

  const ref = useRef<HTMLElement>(null)
  const constellationRef = useRef<HTMLDivElement>(null)
  const reactionTimeoutRef = useRef<number | null>(null)
  const reactionStartRef = useRef<number | null>(null)
  const hunterScoreRef = useRef(0)
  const hunterMoveRef = useRef<number | null>(null)
  const hunterTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setScrambledText(scramblePhrase(BASE_PHRASE, chaosLevel))
    }, 360)

    return () => window.clearInterval(timer)
  }, [chaosLevel])

  useEffect(() => {
    return () => {
      if (reactionTimeoutRef.current !== null) window.clearTimeout(reactionTimeoutRef.current)
      if (hunterMoveRef.current !== null) window.clearInterval(hunterMoveRef.current)
      if (hunterTimerRef.current !== null) window.clearInterval(hunterTimerRef.current)
    }
  }, [])

  const links = useMemo(() => {
    if (stars.length < 2) return [] as Array<[StarPoint, StarPoint]>

    return stars
      .map((point, index) => {
        if (index === 0) return null
        let nearest = stars[0]
        let nearestDistance = Number.POSITIVE_INFINITY

        for (let i = 0; i < index; i += 1) {
          const target = stars[i]
          const dx = point.x - target.x
          const dy = point.y - target.y
          const distance = dx * dx + dy * dy
          if (distance < nearestDistance) {
            nearestDistance = distance
            nearest = target
          }
        }

        return [point, nearest] as [StarPoint, StarPoint]
      })
      .filter((pair): pair is [StarPoint, StarPoint] => pair !== null)
  }, [stars])

  const handleConstellationClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!constellationRef.current) return

    const rect = constellationRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    setStars((prev) => [createStarPoint(x, y), ...prev].slice(0, 20))
  }

  const handleGlyphPick = (index: number) => {
    if (index === glyphRound.oddIndex) {
      const nextStreak = glyphStreak + 1
      setGlyphStreak(nextStreak)
      setGlyphBest((prev) => Math.max(prev, nextStreak))
      setGlyphMessage("nice catch")
    } else {
      setGlyphStreak(0)
      setGlyphMessage("wrong tile, streak reset")
    }

    setGlyphRound(createGlyphRound())
  }

  const resetGlyphGame = () => {
    setGlyphRound(createGlyphRound())
    setGlyphStreak(0)
    setGlyphMessage("spot the odd glyph")
  }

  const startReactionGame = () => {
    if (reactionTimeoutRef.current !== null) {
      window.clearTimeout(reactionTimeoutRef.current)
      reactionTimeoutRef.current = null
    }

    setReactionMode("waiting")
    setReactionTime(null)
    const delay = 1200 + Math.floor(Math.random() * 2200)

    reactionTimeoutRef.current = window.setTimeout(() => {
      setReactionMode("ready")
      reactionStartRef.current = performance.now()
    }, delay)
  }

  const handleReactionClick = () => {
    if (reactionMode === "waiting") {
      if (reactionTimeoutRef.current !== null) {
        window.clearTimeout(reactionTimeoutRef.current)
        reactionTimeoutRef.current = null
      }
      setReactionMode("idle")
      setReactionTime(null)
      return
    }

    if (reactionMode === "ready" && reactionStartRef.current !== null) {
      const measured = Math.round(performance.now() - reactionStartRef.current)
      setReactionTime(measured)
      setBestReactionTime((prev) => (prev === null ? measured : Math.min(prev, measured)))
      setReactionMode("result")
      reactionStartRef.current = null
    }
  }

  const moveHunterTarget = () => {
    setHunterTarget({
      x: 10 + Math.random() * 80,
      y: 14 + Math.random() * 72,
    })
  }

  const startHunterGame = () => {
    if (hunterMoveRef.current !== null) window.clearInterval(hunterMoveRef.current)
    if (hunterTimerRef.current !== null) window.clearInterval(hunterTimerRef.current)

    setHunterMode("playing")
    setHunterScore(0)
    hunterScoreRef.current = 0
    setHunterTimeLeft(12)
    moveHunterTarget()

    hunterMoveRef.current = window.setInterval(() => {
      moveHunterTarget()
    }, 640)

    hunterTimerRef.current = window.setInterval(() => {
      setHunterTimeLeft((prev) => {
        if (prev <= 1) {
          if (hunterMoveRef.current !== null) window.clearInterval(hunterMoveRef.current)
          if (hunterTimerRef.current !== null) window.clearInterval(hunterTimerRef.current)
          hunterMoveRef.current = null
          hunterTimerRef.current = null
          setHunterMode("done")
          setHunterBest((best) => Math.max(best, hunterScoreRef.current))
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const hitHunterTarget = () => {
    if (hunterMode !== "playing") return
    setHunterScore((prev) => {
      const next = prev + 1
      hunterScoreRef.current = next
      return next
    })
    moveHunterTarget()
  }

  return (
    <section ref={ref} className="relative px-4 sm:px-6 pt-16 sm:pt-16 pb-8 sm:pb-12">
      <div className={cn("mx-auto max-w-7xl opacity-0", isVisible && "animate-fade-in-up")}>
        <div className="space-y-2 mb-8">
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">
            <BrainCircuit className="h-3.5 w-3.5" />
            play with my brain;
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Interactive Games Embedded Into The Site</h2>
          <p className="max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Tiny experimental games, weird interactions, and visual toys I made to turn this page into a playground.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <article className={cn("rounded-xl border border-border bg-card/40 glass p-5 space-y-4 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "90ms" }}>
            <p className="font-mono text-[10px] tracking-[0.2em] text-primary flex items-center gap-2">
              <WandSparkles className="h-3.5 w-3.5" />
              weird interaction;
            </p>
            <h3 className="text-lg font-semibold">Chaos Dial</h3>
            <p className="text-sm text-muted-foreground">Slide to inject controlled noise into a sentence.</p>
            <div className="rounded-lg border border-border/60 bg-secondary/30 p-4 min-h-24 flex items-center">
              <p className="font-mono text-sm leading-relaxed wrap-break-word">{scrambledText}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>calm</span>
                <span>chaos: {chaosLevel}%</span>
                <span>glitch</span>
              </div>
              <input type="range" min={0} max={100} value={chaosLevel} onChange={(event) => setChaosLevel(Number(event.target.value))} className="w-full accent-primary cursor-pointer" aria-label="Adjust chaos level" />
            </div>
            <p className="text-xs text-muted-foreground">Low values preserve meaning. High values make language feel like texture.</p>
          </article>

          <article className={cn("rounded-xl border border-border bg-card/40 glass p-5 space-y-4 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "180ms" }}>
            <p className="font-mono text-[10px] tracking-[0.2em] text-primary flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              visual toy;
            </p>
            <h3 className="text-lg font-semibold">Pocket Constellation</h3>
            <p className="text-sm text-muted-foreground">Tap or click to place stars. New stars link to their nearest neighbor.</p>
            <div
              ref={constellationRef}
              onClick={handleConstellationClick}
              className="relative h-56 rounded-lg border border-border/60 bg-[radial-gradient(circle_at_top,color-mix(in_oklch,var(--primary)_14%,transparent),transparent_56%),linear-gradient(to_bottom,transparent,color-mix(in_oklch,var(--foreground)_5%,transparent))] overflow-hidden cursor-crosshair"
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  const center = createStarPoint(50, 50)
                  setStars((prev) => [center, ...prev].slice(0, 20))
                }
              }}
              aria-label="Constellation canvas"
            >
              <svg className="absolute inset-0 h-full w-full">
                {links.map(([from, to]) => (
                  <line key={`${from.id}-${to.id}`} x1={`${from.x}%`} y1={`${from.y}%`} x2={`${to.x}%`} y2={`${to.y}%`} stroke="currentColor" className="text-primary/35" strokeWidth="1" />
                ))}
              </svg>
              {stars.map((star) => (
                <span key={star.id} className="absolute h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_16px_0_var(--glow-color-strong)]" style={{ left: `${star.x}%`, top: `${star.y}%`, transform: "translate(-50%, -50%)" }} />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs text-muted-foreground">stars: {stars.length} / 20</p>
              <button onClick={() => setStars([])} className="rounded-md border border-border px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">clear sky</button>
            </div>
          </article>

          <article className={cn("rounded-xl border border-border bg-card/40 glass p-5 space-y-4 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "270ms" }}>
            <p className="font-mono text-[10px] tracking-[0.2em] text-primary flex items-center gap-2">
              <Dices className="h-3.5 w-3.5" />
              tiny game;
            </p>
            <h3 className="text-lg font-semibold">Odd One Out</h3>
            <p className="text-sm text-muted-foreground">Find the single odd glyph hidden in the visual noise.</p>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: GLYPH_SIZE }).map((_, index) => (
                <button key={index} onClick={() => handleGlyphPick(index)} className="h-10 rounded-md border border-border bg-secondary/30 font-mono text-lg leading-none hover:border-primary/40 hover:bg-primary/10 transition-colors" aria-label={`Glyph tile ${index + 1}`}>
                  {index === glyphRound.oddIndex ? glyphRound.odd : glyphRound.base}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs text-muted-foreground">streak: {glyphStreak} · best: {glyphBest}</p>
              <button onClick={resetGlyphGame} className="rounded-md border border-border px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">new board</button>
            </div>
            <p className="text-xs text-muted-foreground">{glyphMessage}</p>
          </article>

          <article className={cn("rounded-xl border border-border bg-card/40 glass p-5 space-y-4 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "360ms" }}>
            <p className="font-mono text-[10px] tracking-[0.2em] text-primary flex items-center gap-2">
              <TimerReset className="h-3.5 w-3.5" />
              tiny game;
            </p>
            <h3 className="text-lg font-semibold">Reaction Sprint</h3>
            <p className="text-sm text-muted-foreground">Press start, wait for green, then click as fast as you can.</p>
            <button
              onClick={handleReactionClick}
              className={cn("w-full rounded-lg border p-6 text-left transition-all", reactionMode === "ready" ? "border-emerald-500/50 bg-emerald-500/15" : "border-border bg-secondary/30 hover:border-primary/40")}
              aria-label="Reaction target"
            >
              <p className="font-mono text-xs tracking-wider text-muted-foreground mb-2">reaction zone</p>
              {reactionMode === "idle" && <p className="text-sm">Click start to begin.</p>}
              {reactionMode === "waiting" && <p className="text-sm">Wait for green. Clicking now cancels the round.</p>}
              {reactionMode === "ready" && <p className="text-sm text-emerald-600 dark:text-emerald-400">NOW. Click.</p>}
              {reactionMode === "result" && reactionTime !== null && <p className="text-sm">{reactionTime} ms</p>}
            </button>
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs text-muted-foreground">best: {bestReactionTime !== null ? `${bestReactionTime} ms` : "-"}</p>
              <button onClick={startReactionGame} className="rounded-md border border-border px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">start</button>
            </div>
          </article>

          <article className={cn("rounded-xl border border-border bg-card/40 glass p-5 space-y-4 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "450ms" }}>
            <p className="font-mono text-[10px] tracking-[0.2em] text-primary flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              standout game;
            </p>
            <h3 className="text-lg font-semibold">Target Hunter</h3>
            <p className="text-sm text-muted-foreground">12-second arcade challenge. Hit the moving target as many times as possible.</p>
            <div className="relative h-44 rounded-lg border border-border/60 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_48%),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_5%,transparent),transparent)] overflow-hidden">
              <button
                onClick={hitHunterTarget}
                className={cn("absolute h-8 w-8 rounded-full border border-primary/60 bg-primary/20 transition-transform hover:scale-110", hunterMode !== "playing" && "pointer-events-none opacity-50")}
                style={{ left: `${hunterTarget.x}%`, top: `${hunterTarget.y}%`, transform: "translate(-50%, -50%)" }}
                aria-label="Hit moving target"
              />
              {hunterMode !== "playing" && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/45 backdrop-blur-[1px]">
                  <p className="font-mono text-xs tracking-wider text-muted-foreground">{hunterMode === "done" ? "round over" : "ready"}</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs text-muted-foreground">score: {hunterScore} · best: {hunterBest} · t-{hunterTimeLeft}s</p>
              <button onClick={startHunterGame} className="rounded-md border border-border px-3 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">start run</button>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
