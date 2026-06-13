"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/core-features/utils"
import { Thermometer, Timer, ChevronDown, ChevronUp } from "lucide-react"
import { teaLog, teaTypeConfig, moodEmoji, flavorKeys, type TeaType } from "@/src/lib/tea-data"

const TYPE_FILTERS: Array<TeaType | "all"> = ["all", "green", "black", "oolong", "white", "puerh", "herbal", "matcha"]

function FlavorRadar({ flavors }: { flavors: Record<string, number> }) {
  const size = 120
  const cx = size / 2, cy = size / 2
  const r = 44
  const keys = flavorKeys
  const n = keys.length

  const points = keys.map((_, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r }
  })

  const dataPoints = keys.map((k, i) => {
    const val = flavors[k] / 5
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2
    return { x: cx + Math.cos(angle) * r * val, y: cy + Math.sin(angle) * r * val }
  })

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0]

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      {/* Grid rings */}
      {gridLevels.map((lv) => (
        <polygon key={lv}
          points={points.map(({ x, y }) => {
            const dx = x - cx, dy = y - cy
            return `${cx + dx * lv},${cy + dy * lv}`
          }).join(" ")}
          fill="none" stroke="rgba(167,139,250,0.15)" strokeWidth="0.5" />
      ))}
      {/* Axes */}
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(167,139,250,0.2)" strokeWidth="0.5" />
      ))}
      {/* Data polygon */}
      <polygon
        points={dataPoints.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="rgba(167,139,250,0.2)" stroke="rgba(167,139,250,0.7)" strokeWidth="1.5" />
      {/* Labels */}
      {keys.map((k, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2
        const lx = cx + Math.cos(angle) * (r + 14)
        const ly = cy + Math.sin(angle) * (r + 14)
        return (
          <text key={k} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            fontSize="7" fill="rgba(160,160,180,0.8)" fontFamily="'Geist Mono', monospace">
            {k}
          </text>
        )
      })}
    </svg>
  )
}

export function TeaLog() {
  const [isVisible, setIsVisible] = useState(false)
  const [typeFilter, setTypeFilter] = useState<TeaType | "all">("all")
  const [expanded, setExpanded] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filtered = teaLog
    .filter((t) => typeFilter === "all" || t.type === typeFilter)
    .sort((a, b) => b.date.localeCompare(a.date))

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  function formatTime(s: number) {
    if (s === 0) return "whisked"
    if (s < 60) return `${s}s`
    return `${Math.floor(s / 60)}m ${s % 60 > 0 ? `${s % 60}s` : ""}`.trim()
  }

  return (
    <section ref={sectionRef} className="overflow-x-clip px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-3xl">
        <div className={cn("mb-10 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">tasting log;</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Tea Log 🍵</h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Every tea I've brewed worth logging - origin, flavor profile, and what it did to my focus.
          </p>
        </div>

        {/* Type filters */}
        <div className={cn("mb-8 flex flex-wrap gap-2 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "80ms" }}>
          {TYPE_FILTERS.map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={cn("rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-wider transition-all active:scale-[0.98]")}
              style={t !== "all" && typeFilter === t
                ? { borderColor: teaTypeConfig[t].color, background: teaTypeConfig[t].bg, color: teaTypeConfig[t].color }
                : typeFilter === t
                  ? { borderColor: "hsl(var(--primary))", background: "rgba(var(--primary)/0.15)", color: "hsl(var(--primary))" }
                  : {}}>
              <span className={cn(typeFilter !== t && "text-muted-foreground")}>
                {t === "all" ? "all" : teaTypeConfig[t].label.toLowerCase()}
              </span>
            </button>
          ))}
        </div>

        {/* Log entries */}
        <div className="flex flex-col gap-3">
          {filtered.map((entry, i) => {
            const cfg = teaTypeConfig[entry.type]
            const isOpen = expanded === entry.id
            return (
              <div key={entry.id}
                className={cn("group relative overflow-hidden rounded-xl border bg-card/40 glass transition-all duration-300 opacity-0", isVisible && "animate-fade-in-up",
                  isOpen ? "border-primary/30" : "border-border/50 hover:border-primary/20")}
                style={{ animationDelay: `${i * 50 + 150}ms` }}>
                <button onClick={() => setExpanded(isOpen ? null : entry.id)}
                  className="flex w-full items-start gap-4 px-5 py-4 text-left sm:px-6">
                  {/* Type badge */}
                  <span className="mt-0.5 shrink-0 rounded-md border px-2 py-0.5 font-mono text-[9px] tracking-wider"
                    style={{ color: cfg.color, borderColor: cfg.border, background: cfg.bg }}>
                    {cfg.label.toLowerCase()}
                  </span>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className={cn("font-mono text-sm font-semibold tracking-wider transition-colors",
                      isOpen ? "text-primary" : "text-foreground group-hover:text-primary")}>
                      {entry.name}
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground">{entry.origin} · {formatDate(entry.date)}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="font-mono text-xs">{moodEmoji[entry.mood]} → {moodEmoji[entry.moodAfter]}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className={cn("h-1.5 w-1.5 rounded-full", j < entry.focusRating ? "bg-primary" : "bg-border/50")} />
                      ))}
                    </div>
                    {isOpen ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-border/40 px-5 pb-5 pt-4 sm:px-6 animate-fade-in-up">
                    <div className="grid gap-6 sm:grid-cols-2">
                      {/* Left: meta + notes */}
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Thermometer className="h-3.5 w-3.5" />
                            <span className="font-mono text-xs">{entry.brewTemp}°C</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Timer className="h-3.5 w-3.5" />
                            <span className="font-mono text-xs">{formatTime(entry.steepTime)}</span>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <p className="font-mono text-[10px] tracking-widest text-muted-foreground">mood shift</p>
                          <p className="text-sm text-muted-foreground">
                            {moodEmoji[entry.mood]} <span className="font-mono text-[10px]">{entry.mood}</span>
                            {" → "}
                            {moodEmoji[entry.moodAfter]} <span className="font-mono text-[10px]">{entry.moodAfter}</span>
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-mono text-[10px] tracking-widest text-muted-foreground">focus</p>
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <div key={j} className={cn("h-2 w-6 rounded-sm", j < entry.focusRating ? "bg-primary" : "bg-border/40")} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/30 pl-3 italic">
                          {entry.notes}
                        </p>
                      </div>
                      {/* Right: radar */}
                      <div className="flex flex-col items-center gap-2">
                        <p className="font-mono text-[10px] tracking-widest text-muted-foreground">flavor profile</p>
                        <FlavorRadar flavors={entry.flavors} />
                      </div>
                    </div>
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
