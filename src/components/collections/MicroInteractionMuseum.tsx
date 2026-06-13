"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/core-features/utils"
import { exhibits, categoryConfig, type ExhibitCategory } from "@/src/lib/micro-interaction-data"

function HoldToConfirm() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = () => {
    if (done) return
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(intervalRef.current!)
          setDone(true)
          setTimeout(() => { setDone(false); setProgress(0) }, 1800)
          return 100
        }
        return p + 4
      })
    }, 30)
  }
  const stop = () => {
    clearInterval(intervalRef.current!)
    if (!done) setProgress(0)
  }

  return (
    <button
      onMouseDown={start} onMouseUp={stop} onMouseLeave={stop}
      onTouchStart={start} onTouchEnd={stop}
      className="relative flex h-12 w-48 items-center justify-center overflow-hidden rounded-lg border border-red-500/40 bg-red-500/10 select-none cursor-pointer"
    >
      <div className="absolute left-0 top-0 h-full bg-red-500/25 transition-none" style={{ width: `${progress}%` }} />
      <span className={cn("relative font-mono text-xs font-medium transition-colors", done ? "text-red-400" : "text-red-400/80")}>
        {done ? "✓ confirmed" : progress > 0 ? "hold…" : "hold to delete"}
      </span>
    </button>
  )
}

function SkeletonPulse() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 2500)
    return () => clearTimeout(t)
  }, [])
  const reset = () => setLoaded(false)

  if (loaded) {
    return (
      <div className="w-48 rounded-lg border border-border/50 bg-card/40 p-3 space-y-2 cursor-pointer" onClick={reset}>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-mono text-xs text-primary">A</div>
          <div>
            <p className="font-mono text-xs text-foreground">Allison Pham</p>
            <p className="font-mono text-[9px] text-muted-foreground">UC Riverside</p>
          </div>
        </div>
        <p className="font-mono text-[9px] text-muted-foreground">tap to replay →</p>
      </div>
    )
  }

  return (
    <div className="w-48 rounded-lg border border-border/40 bg-card/30 p-3 space-y-2">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-secondary/60 animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-2.5 w-24 rounded bg-secondary/60 animate-pulse" />
          <div className="h-2 w-16 rounded bg-secondary/40 animate-pulse" />
        </div>
      </div>
      <div className="h-2 w-full rounded bg-secondary/40 animate-pulse" style={{ animationDelay: "100ms" }} />
    </div>
  )
}

function SpringButton() {
  const [pressed, setPressed] = useState(false)
  const [clicked, setClicked] = useState(0)
  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => { setPressed(false); setClicked((c) => c + 1) }}
      onMouseLeave={() => setPressed(false)}
      className={cn(
        "relative h-12 w-36 rounded-xl border border-primary/40 bg-primary/10 font-mono text-xs text-primary select-none cursor-pointer",
        "transition-transform duration-100",
        pressed ? "scale-90" : "scale-100 hover:scale-105"
      )}
      style={{ transition: pressed ? "transform 0.08s ease" : "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
    >
      {clicked > 0 ? `clicked ${clicked}×` : "press me"}
    </button>
  )
}

function FocusRingDemo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="text"
        placeholder="click to focus"
        className="w-44 rounded-lg border border-border/50 bg-secondary/30 px-3 py-2 font-mono text-xs text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
      />
      <p className="font-mono text-[9px] text-muted-foreground">tab or click to focus</p>
    </div>
  )
}

function CounterTick() {
  const [count, setCount] = useState(0)
  const [dir, setDir] = useState<"up" | "down">("up")
  const [animating, setAnimating] = useState(false)

  const change = (d: "up" | "down") => {
    setDir(d)
    setAnimating(true)
    setTimeout(() => {
      setCount((c) => d === "up" ? c + 1 : Math.max(0, c - 1))
      setAnimating(false)
    }, 120)
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={() => change("down")}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-secondary/40 font-mono text-sm text-foreground hover:border-primary/40 hover:text-primary transition-colors">
        −
      </button>
      <div className="w-12 overflow-hidden text-center">
        <span className={cn("block font-mono text-2xl font-bold text-foreground transition-all duration-120",
          animating && dir === "up" && "-translate-y-3 opacity-0",
          animating && dir === "down" && "translate-y-3 opacity-0")}>
          {count}
        </span>
      </div>
      <button onClick={() => change("up")}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-secondary/40 font-mono text-sm text-foreground hover:border-primary/40 hover:text-primary transition-colors">
        +
      </button>
    </div>
  )
}

function ToggleDemo() {
  const [on, setOn] = useState(false)
  return (
    <button onClick={() => setOn((v) => !v)}
      className={cn("relative flex h-7 w-14 items-center rounded-full border-2 transition-all duration-300 cursor-pointer",
        on ? "border-primary bg-primary/20" : "border-border bg-secondary/40")}
      style={{ padding: "2px" }}>
      <span className={cn("h-5 w-5 rounded-full shadow-sm transition-all",
        on ? "bg-primary translate-x-7" : "bg-muted-foreground translate-x-0")}
        style={{ transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)" }} />
    </button>
  )
}

function MagneticButton() {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const onMove = (e: React.MouseEvent) => {
    const r = btnRef.current!.getBoundingClientRect()
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2
    setOffset({ x: (e.clientX - cx) * 0.25, y: (e.clientY - cy) * 0.25 })
  }
  const onLeave = () => setOffset({ x: 0, y: 0 })
  return (
    <button ref={btnRef} onMouseMove={onMove} onMouseLeave={onLeave}
      className="h-12 w-36 rounded-xl border border-primary/40 bg-primary/10 font-mono text-xs text-primary transition-transform duration-150 cursor-pointer"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
      hover near me
    </button>
  )
}

function CheckmarkDraw() {
  const [done, setDone] = useState(false)
  return (
    <button onClick={() => { setDone(false); setTimeout(() => setDone(true), 50) }}
      className="flex h-12 w-36 items-center justify-center gap-2 rounded-xl border border-border/50 bg-secondary/30 font-mono text-xs text-muted-foreground hover:border-green-500/40 hover:text-foreground transition-colors cursor-pointer">
      {done ? (
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M3 8 L6.5 11.5 L13 5"
            fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="20" strokeDashoffset={done ? 0 : 20}
            style={{ transition: "stroke-dashoffset 0.4s ease" }} />
        </svg>
      ) : (
        <span className="h-4 w-4 rounded-sm border-2 border-border/60" />
      )}
      {done ? <span className="text-green-400">complete!</span> : "mark complete"}
    </button>
  )
}

function InputShake() {
  const [val, setVal] = useState("")
  const [shaking, setShaking] = useState(false)
  const [success, setSuccess] = useState(false)

  const submit = () => {
    if (val.length < 3) {
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    } else {
      setSuccess(true)
      setTimeout(() => { setSuccess(false); setVal("") }, 1500)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className={cn("flex gap-2", shaking && "animate-[shake_0.5s_ease]")}>
        <input value={val} onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="type 3+ chars"
          className={cn("w-32 rounded-lg border bg-secondary/30 px-3 py-2 font-mono text-xs outline-none transition-colors",
            shaking ? "border-red-500/60 text-red-400" : success ? "border-green-500/50 text-green-400" : "border-border/50 text-foreground",
            "focus:border-primary")} />
        <button onClick={submit}
          className="rounded-lg border border-border/50 bg-secondary/40 px-3 py-2 font-mono text-xs text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
          go
        </button>
      </div>
      <p className="font-mono text-[9px] text-muted-foreground">
        {shaking ? "⚡ too short!" : success ? "✓ ok!" : "enter ≥3 chars"}
      </p>
      <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-6px)} 40%,80%{transform:translateX(6px)} }`}</style>
    </div>
  )
}

// Map exhibit id → demo component
const DEMOS: Record<string, React.ComponentType> = {
  "hold-to-confirm": HoldToConfirm,
  "skeleton-pulse":  SkeletonPulse,
  "spring-button":   SpringButton,
  "focus-ring":      FocusRingDemo,
  "count-tick":      CounterTick,
  "toggle-slide":    ToggleDemo,
  "cursor-follow":   MagneticButton,
  "checkmark-draw":  CheckmarkDraw,
  "input-shake":     InputShake,
}

const CATEGORIES: Array<ExhibitCategory | "all"> = ["all", "button", "feedback", "transition", "input", "gesture", "state"]

export function MicroInteractionMuseum() {
  const [isVisible, setIsVisible] = useState(false)
  const [catFilter, setCatFilter] = useState<ExhibitCategory | "all">("all")
  const [expanded, setExpanded] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filtered = exhibits.filter((e) => catFilter === "all" || e.category === catFilter)

  return (
    <section ref={sectionRef} className="overflow-x-clip px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-10 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">interaction design;</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Micro-Interaction Museum ✦</h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Live demos of micro-interactions worth studying. Each one is interactive - play with it, then read why it works.
          </p>
        </div>

        <div className={cn("mb-8 flex flex-wrap gap-2 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "80ms" }}>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={cn("rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-wider transition-all active:scale-[0.98]")}
              style={c !== "all" && catFilter === c
                ? { borderColor: categoryConfig[c].color, background: categoryConfig[c].bg, color: categoryConfig[c].color }
                : catFilter === c
                  ? undefined
                  : {}}>
              <span className={cn(catFilter === c && c === "all" ? "text-primary" : catFilter !== c ? "text-muted-foreground" : "")}>
                {c}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((exhibit, i) => {
            const cfg = categoryConfig[exhibit.category]
            const Demo = DEMOS[exhibit.id]
            const isOpen = expanded === exhibit.id

            return (
              <div key={exhibit.id}
                className={cn("group relative overflow-hidden rounded-xl border bg-card/40 glass transition-all duration-300 opacity-0",
                  isVisible && "animate-fade-in-up",
                  isOpen ? "border-primary/30" : "border-border/50 hover:border-primary/20")}
                style={{ animationDelay: `${i * 50 + 150}ms` }}>

                {/* Category badge */}
                <div className="flex items-center justify-between px-5 pt-4 pb-2">
                  <span className="rounded-md border px-2 py-0.5 font-mono text-[9px] tracking-wider"
                    style={{ color: cfg.color, borderColor: cfg.border, background: cfg.bg }}>
                    {exhibit.category}
                  </span>
                  <span className="font-mono text-[9px] text-muted-foreground">{exhibit.principle.split(" ")[0]}</span>
                </div>

                {/* Live demo area */}
                {Demo && (
                  <div className="flex items-center justify-center px-5 py-6 min-h-[100px]">
                    <Demo />
                  </div>
                )}

                {/* Title + expand */}
                <button onClick={() => setExpanded(isOpen ? null : exhibit.id)}
                  className="flex w-full items-center justify-between gap-3 border-t border-border/30 px-5 py-3 text-left">
                  <p className={cn("font-mono text-xs font-semibold tracking-wider transition-colors",
                    isOpen ? "text-primary" : "text-foreground group-hover:text-primary")}>
                    {exhibit.title}
                  </p>
                  <span className="font-mono text-[10px] text-muted-foreground shrink-0">
                    {isOpen ? "hide ↑" : "why ↓"}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-border/30 px-5 pb-5 pt-3 animate-fade-in-up space-y-2">
                    <p className="font-mono text-[10px] text-primary">{exhibit.principle}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{exhibit.why}</p>
                    {exhibit.source && (
                      <p className="font-mono text-[9px] text-muted-foreground">seen in: {exhibit.source}</p>
                    )}
                  </div>
                )}

                <div className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
