"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/core-features/utils"
import { teaLog, teaTypeConfig, moodEmoji, flavorKeys } from "@/src/lib/tea-data"

type VizMode = "flavor" | "focus" | "mood" | "origin"

const MODES: Array<{ value: VizMode; label: string; desc: string }> = [
  { value: "flavor",  label: "flavor profiles",   desc: "Radar comparison across all teas" },
  { value: "focus",   label: "focus ratings",      desc: "Which teas boosted focus most" },
  { value: "mood",    label: "mood shifts",        desc: "Before vs after mood transitions" },
  { value: "origin",  label: "origin map",         desc: "Where in the world my teas come from" },
]

// ---------- Flavor overlay radar ----------
function FlavorOverlay() {
  const size = 280
  const cx = size / 2, cy = size / 2
  const r = 95
  const keys = flavorKeys
  const n = keys.length
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0]

  const axisPoints = keys.map((_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
  })

  const teaPolygons = teaLog.map((entry) => {
    const pts = keys.map((k, i) => {
      const val = (entry.flavors as Record<string, number>)[k] / 5
      const a = (i / n) * Math.PI * 2 - Math.PI / 2
      return `${cx + Math.cos(a) * r * val},${cy + Math.sin(a) * r * val}`
    })
    return { entry, pts: pts.join(" ") }
  })

  return (
    <svg width="100%" viewBox={`0 0 ${size} ${size}`} className="mx-auto max-w-xs">
      {gridLevels.map((lv) => (
        <polygon key={lv}
          points={axisPoints.map(({ x, y }) => `${cx + (x - cx) * lv},${cy + (y - cy) * lv}`).join(" ")}
          fill="none" stroke="rgba(167,139,250,0.12)" strokeWidth="0.8" />
      ))}
      {axisPoints.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(167,139,250,0.15)" strokeWidth="0.8" />
      ))}
      {teaPolygons.map(({ entry, pts }) => {
        const cfg = teaTypeConfig[entry.type]
        return (
          <polygon key={entry.id} points={pts}
            fill={cfg.bg} stroke={cfg.color} strokeWidth="1.2" opacity={0.6} />
        )
      })}
      {keys.map((k, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2
        const lx = cx + Math.cos(a) * (r + 16)
        const ly = cy + Math.sin(a) * (r + 16)
        return (
          <text key={k} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            fontSize="8.5" fill="rgba(160,160,185,0.85)" fontFamily="'Geist Mono',monospace">{k}</text>
        )
      })}
    </svg>
  )
}

// ---------- Focus bar chart ----------
function FocusChart() {
  const sorted = [...teaLog].sort((a, b) => b.focusRating - a.focusRating)
  return (
    <div className="space-y-2.5">
      {sorted.map((entry) => {
        const cfg = teaTypeConfig[entry.type]
        const pct = (entry.focusRating / 5) * 100
        return (
          <div key={entry.id} className="space-y-1">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[10px] text-muted-foreground truncate max-w-[60%]">{entry.name}</p>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px]" style={{ color: cfg.color }}>{cfg.label.toLowerCase()}</span>
                <span className="font-mono text-[10px] font-semibold text-foreground">{entry.focusRating}/5</span>
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary/50">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: cfg.color }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ---------- Mood sankey-style flow ----------
function MoodFlow() {
  const moods = ["focused", "calm", "tired", "energized", "reflective"] as const
  const matrix: Record<string, Record<string, number>> = {}
  moods.forEach((m) => { matrix[m] = {}; moods.forEach((n) => { matrix[m][n] = 0 }) })
  teaLog.forEach((e) => { matrix[e.mood][e.moodAfter]++ })

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 text-center">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground">before</p>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground">after</p>
      </div>
      {teaLog.map((entry) => (
        <div key={entry.id} className="flex items-center gap-3">
          <div className="flex-1 rounded-lg border border-border/40 bg-secondary/30 px-3 py-2 text-center">
            <p className="font-mono text-[10px] text-muted-foreground">{moodEmoji[entry.mood]} {entry.mood}</p>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <div className="h-px w-8 bg-primary/30" />
            <p className="font-mono text-[8px] text-muted-foreground max-w-[80px] truncate text-center">{entry.name.split(" ")[0]}</p>
            <div className="h-px w-8 bg-primary/30" />
          </div>
          <div className={cn("flex-1 rounded-lg border px-3 py-2 text-center",
            entry.mood !== entry.moodAfter ? "border-primary/30 bg-primary/5" : "border-border/40 bg-secondary/30")}>
            <p className={cn("font-mono text-[10px]", entry.mood !== entry.moodAfter ? "text-primary" : "text-muted-foreground")}>
              {moodEmoji[entry.moodAfter]} {entry.moodAfter}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ---------- Origin dot map (simplified equirectangular) ----------
function OriginMap() {
  const W = 500, H = 260
  function project([lat, lng]: [number, number]): [number, number] {
    const x = ((lng + 180) / 360) * W
    const y = ((90 - lat) / 180) * H
    return [x, y]
  }

  return (
    <div className="overflow-x-auto">
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-lg border border-border/30 bg-secondary/20">
        {/* Rough continent outlines as simplified paths - decorative only */}
        <rect width={W} height={H} fill="rgba(15,15,25,0.4)" rx="8" />
        {/* Grid lines */}
        {[-60, -30, 0, 30, 60].map((lat) => {
          const y = ((90 - lat) / 180) * H
          return <line key={lat} x1={0} y1={y} x2={W} y2={y} stroke="rgba(167,139,250,0.06)" strokeWidth="0.5" />
        })}
        {[-120, -60, 0, 60, 120].map((lng) => {
          const x = ((lng + 180) / 360) * W
          return <line key={lng} x1={x} y1={0} x2={x} y2={H} stroke="rgba(167,139,250,0.06)" strokeWidth="0.5" />
        })}
        {/* Origin dots */}
        {teaLog.map((entry) => {
          const [x, y] = project(entry.originCoords)
          const cfg = teaTypeConfig[entry.type]
          return (
            <g key={entry.id}>
              <circle cx={x} cy={y} r={7} fill={cfg.bg} stroke={cfg.color} strokeWidth="1.5" />
              <circle cx={x} cy={y} r={3} fill={cfg.color} />
              <text x={x} y={y - 11} textAnchor="middle" fontSize="6.5"
                fill="rgba(200,200,220,0.8)" fontFamily="'Geist Mono',monospace">
                {entry.name.split(" ")[0]}
              </text>
            </g>
          )
        })}
        {/* Axis labels */}
        <text x={4} y={H / 2} fontSize="7" fill="rgba(120,120,140,0.6)" fontFamily="'Geist Mono',monospace">0°</text>
        <text x={W / 2 - 8} y={H - 3} fontSize="7" fill="rgba(120,120,140,0.6)" fontFamily="'Geist Mono',monospace">180°</text>
      </svg>
    </div>
  )
}

export function TeaTastingViz() {
  const [isVisible, setIsVisible] = useState(false)
  const [mode, setMode] = useState<VizMode>("flavor")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const activeMode = MODES.find((m) => m.value === mode)!

  return (
    <section ref={sectionRef} className="overflow-x-clip px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-3xl">
        <div className={cn("mb-10 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">tasting data;</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Tea Tasting Viz 📊</h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            The tea log, visualized. Flavor overlays, focus ratings, mood shifts, and origins.
          </p>
        </div>

        {/* Mode switcher */}
        <div className={cn("mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "80ms" }}>
          {MODES.map((m) => (
            <button key={m.value} onClick={() => setMode(m.value)}
              className={cn("rounded-xl border p-3 text-left transition-all duration-300 active:scale-[0.98] hover-lift",
                mode === m.value ? "border-primary/40 bg-primary/10" : "border-border/50 bg-card/30 glass hover:border-primary/20")}>
              <p className={cn("font-mono text-[10px] font-semibold tracking-wider", mode === m.value ? "text-primary" : "text-muted-foreground")}>
                {m.label}
              </p>
            </button>
          ))}
        </div>

        {/* Viz panel */}
        <div className={cn("rounded-xl border border-border/50 bg-card/40 glass p-6 sm:p-8 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "130ms" }}>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="font-mono text-sm font-semibold text-foreground">{activeMode.label}</p>
              <p className="font-mono text-[10px] text-muted-foreground">{activeMode.desc}</p>
            </div>
            <p className="font-mono text-[10px] text-muted-foreground">{teaLog.length} entries</p>
          </div>

          {mode === "flavor"  && <FlavorOverlay />}
          {mode === "focus"   && <FocusChart />}
          {mode === "mood"    && <MoodFlow />}
          {mode === "origin"  && <OriginMap />}
        </div>

        {/* Type legend */}
        <div className={cn("mt-4 flex flex-wrap gap-3 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "200ms" }}>
          {(Object.entries(teaTypeConfig) as [string, typeof teaTypeConfig[keyof typeof teaTypeConfig]][]).map(([type, cfg]) => {
            const has = teaLog.some((t) => t.type === type)
            if (!has) return null
            return (
              <div key={type} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: cfg.color }} />
                <span className="font-mono text-[10px] text-muted-foreground">{cfg.label.toLowerCase()}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
