"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/core-features/utils"
import { skillNodes, skillDomainConfig, skillLevelConfig, type SkillDomain, type SkillLevel, type SkillNode } from "@/src/lib/skills-data"

type SimNode = SkillNode & { x: number; y: number; vx: number; vy: number }
type SimLink = { source: SimNode; target: SimNode }

const REPEL = 220
const LINK_DIST = 110
const CENTER = 0.03
const DAMP = 0.86
const ITERS = 3

function radius(n: SimNode) {
  return n.level === "advanced" ? 28 : n.level === "proficient" ? 22 : 16
}

export function SkillsDependencyMap() {
  const [isVisible, setIsVisible] = useState(false)
  const [selected, setSelected] = useState<SimNode | null>(null)
  const [domainFilter, setDomainFilter] = useState<SkillDomain | "all">("all")
  const [levelFilter, setLevelFilter] = useState<SkillLevel | "all">("all")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const nodesRef = useRef<SimNode[]>([])
  const hoveredRef = useRef<SimNode | null>(null)
  const dragRef = useRef<SimNode | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const W = canvas.offsetWidth, H = canvas.offsetHeight
    canvas.width = W * devicePixelRatio; canvas.height = H * devicePixelRatio
    ctx.scale(devicePixelRatio, devicePixelRatio)

    const nodes: SimNode[] = skillNodes.map((n, i) => ({
      ...n,
      x: W / 2 + Math.cos((i / skillNodes.length) * Math.PI * 2) * 150,
      y: H / 2 + Math.sin((i / skillNodes.length) * Math.PI * 2) * 150,
      vx: 0, vy: 0,
    }))
    nodesRef.current = nodes

    const links: SimLink[] = []
    nodes.forEach((n) => {
      n.requires.forEach((rid) => {
        const target = nodes.find((t) => t.id === rid)
        if (target) links.push({ source: target, target: n }) // arrow: requires → skill
      })
    })

    function tick() {
      for (let iter = 0; iter < ITERS; iter++) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j]
            const dx = b.x - a.x, dy = b.y - a.y
            const d = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
            const f = REPEL / (d * d)
            a.vx -= dx / d * f; a.vy -= dy / d * f
            b.vx += dx / d * f; b.vy += dy / d * f
          }
        }
        links.forEach(({ source, target }) => {
          const dx = target.x - source.x, dy = target.y - source.y
          const d = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
          const f = (d - LINK_DIST) * 0.04
          source.vx += dx / d * f; source.vy += dy / d * f
          target.vx -= dx / d * f; target.vy -= dy / d * f
        })
        nodes.forEach((n) => {
          n.vx += (W / 2 - n.x) * CENTER; n.vy += (H / 2 - n.y) * CENTER
        })
        nodes.forEach((n) => {
          if (dragRef.current?.id === n.id) return
          n.vx *= DAMP; n.vy *= DAMP
          n.x = Math.max(radius(n) + 4, Math.min(W - radius(n) - 4, n.x + n.vx))
          n.y = Math.max(radius(n) + 4, Math.min(H - radius(n) - 4, n.y + n.vy))
        })
      }

      ctx.clearRect(0, 0, W, H)
      const sel = hoveredRef.current ?? selected
      const domF = domainFilter, levF = levelFilter

      // Links with arrowheads
      links.forEach(({ source, target }) => {
        const isConn = sel && (source.id === sel.id || target.id === sel.id)
        const srcVisible = (domF === "all" || source.domain === domF) && (levF === "all" || source.level === levF)
        const tgtVisible = (domF === "all" || target.domain === domF) && (levF === "all" || target.level === levF)
        const alpha = sel ? (isConn ? 0.6 : 0.06) : (!srcVisible || !tgtVisible) ? 0.05 : 0.18
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.strokeStyle = "#a78bfa"
        ctx.lineWidth = isConn ? 1.5 : 1
        // Arrow
        const dx = target.x - source.x, dy = target.y - source.y
        const d = Math.sqrt(dx * dx + dy * dy)
        const r = radius(target) + 4
        const ex = target.x - dx / d * r, ey = target.y - dy / d * r
        const angle = Math.atan2(dy, dx)
        ctx.moveTo(source.x, source.y)
        ctx.lineTo(ex, ey)
        ctx.stroke()
        // Arrowhead
        ctx.beginPath()
        ctx.fillStyle = "#a78bfa"
        ctx.moveTo(ex, ey)
        ctx.lineTo(ex - 7 * Math.cos(angle - 0.4), ey - 7 * Math.sin(angle - 0.4))
        ctx.lineTo(ex - 7 * Math.cos(angle + 0.4), ey - 7 * Math.sin(angle + 0.4))
        ctx.closePath()
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // Nodes
      nodes.forEach((n) => {
        const cfg = skillDomainConfig[n.domain]
        const r = radius(n)
        const isSelected = sel?.id === n.id
        const isConnected = sel && (sel.requires.includes(n.id) || n.requires.includes(sel.id))
        const domainMatch = domF === "all" || n.domain === domF
        const levelMatch = levF === "all" || n.level === levF
        const dim = sel ? (!isSelected && !isConnected) : (!domainMatch || !levelMatch)
        ctx.globalAlpha = dim ? 0.2 : skillLevelConfig[n.level].opacity

        if (isSelected) {
          ctx.beginPath(); ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2)
          ctx.strokeStyle = cfg.color; ctx.lineWidth = 1.5
          ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([])
        }
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = cfg.bg; ctx.fill()
        ctx.strokeStyle = isSelected || isConnected ? cfg.color : cfg.border
        ctx.lineWidth = isSelected ? 2 : 1; ctx.stroke()

        const fs = n.level === "advanced" ? 10 : 9
        ctx.font = `${isSelected ? 500 : 400} ${fs}px "Geist Mono", monospace`
        ctx.fillStyle = isSelected || isConnected ? cfg.color : "rgba(200,200,220,0.8)"
        ctx.textAlign = "center"; ctx.textBaseline = "middle"
        ctx.fillText(n.label, n.x, n.y)
        ctx.globalAlpha = 1
      })

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    function getNode(x: number, y: number) {
      return nodesRef.current.find((n) => {
        const dx = n.x - x, dy = n.y - y
        return Math.sqrt(dx * dx + dy * dy) <= radius(n) + 4
      }) ?? null
    }
    function pos(e: MouseEvent) {
      const r = canvas.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onMove = (e: MouseEvent) => {
      const { x, y } = pos(e)
      hoveredRef.current = getNode(x, y)
      canvas.style.cursor = hoveredRef.current ? "pointer" : "default"
      if (dragRef.current) { dragRef.current.x = x; dragRef.current.y = y; dragRef.current.vx = 0; dragRef.current.vy = 0 }
    }
    const onDown = (e: MouseEvent) => { const { x, y } = pos(e); dragRef.current = getNode(x, y) }
    const onUp = () => { dragRef.current = null }
    const onClick = (e: MouseEvent) => {
      const { x, y } = pos(e)
      const hit = getNode(x, y)
      setSelected((prev) => hit ? (prev?.id === hit.id ? null : hit as SimNode) : null)
    }
    canvas.addEventListener("mousemove", onMove)
    canvas.addEventListener("mousedown", onDown)
    canvas.addEventListener("mouseup", onUp)
    canvas.addEventListener("click", onClick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener("mousemove", onMove)
      canvas.removeEventListener("mousedown", onDown)
      canvas.removeEventListener("mouseup", onUp)
      canvas.removeEventListener("click", onClick)
    }
  }, [domainFilter, levelFilter, selected])

  const levels: Array<SkillLevel | "all"> = ["all", "advanced", "proficient", "foundational", "building"]

  return (
    <section ref={sectionRef} className="overflow-x-clip px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-10 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">skill graph;</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Dependency Map ⬡</h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            How my skills build on each other. Arrows show prerequisites - click any node to trace the chain.
          </p>
        </div>

        <div className={cn("mb-5 flex flex-wrap gap-2 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "70ms" }}>
          {(Object.keys(skillDomainConfig) as SkillDomain[]).concat().map((d) => (
            <button key={d} onClick={() => setDomainFilter(domainFilter === d ? "all" : d)}
              className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all"
              style={{ borderColor: domainFilter === d ? skillDomainConfig[d].color : undefined, background: domainFilter === d ? skillDomainConfig[d].bg : undefined, color: domainFilter === d ? skillDomainConfig[d].color : undefined }}>
              {skillDomainConfig[d].label.toLowerCase()}
            </button>
          ))}
          <div className="h-5 w-px bg-border/50 self-center" />
          {levels.map((l) => (
            <button key={l} onClick={() => setLevelFilter(levelFilter === l ? "all" : l)}
              className={cn("rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all",
                levelFilter === l ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-foreground/40")}>
              {l}
            </button>
          ))}
        </div>

        <div className={cn("grid gap-6 lg:grid-cols-3 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "130ms" }}>
          <div className="lg:col-span-2 rounded-xl border border-border/50 bg-card/20 overflow-hidden" style={{ height: 500 }}>
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
          <div className="space-y-4">
            {selected ? (
              <div className="rounded-xl border border-primary/30 bg-card/40 glass p-6 space-y-4 animate-fade-in-up">
                <div className="flex justify-between">
                  <div>
                    <span className="mb-2 inline-block rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wider"
                      style={{ color: skillDomainConfig[selected.domain].color, borderColor: skillDomainConfig[selected.domain].border, background: skillDomainConfig[selected.domain].bg }}>
                      {skillDomainConfig[selected.domain].label.toLowerCase()}
                    </span>
                    <h3 className="text-lg font-bold">{selected.label}</h3>
                    <p className="font-mono text-[10px] text-muted-foreground">{skillLevelConfig[selected.level].label}</p>
                  </div>
                  <button onClick={() => setSelected(null)} className="font-mono text-xs text-muted-foreground hover:text-primary">×</button>
                </div>
                {selected.note && <p className="text-sm leading-relaxed text-muted-foreground border-l-2 border-primary/30 pl-3">{selected.note}</p>}
                {selected.requires.length > 0 && (
                  <div>
                    <p className="mb-2 font-mono text-[10px] tracking-widest text-muted-foreground">requires</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.requires.map((rid) => {
                        const n = skillNodes.find((s) => s.id === rid)
                        return n ? <span key={rid} className="rounded-md border border-border/60 bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{n.label}</span> : null
                      })}
                    </div>
                  </div>
                )}
                {skillNodes.filter((n) => n.requires.includes(selected.id)).length > 0 && (
                  <div>
                    <p className="mb-2 font-mono text-[10px] tracking-widest text-muted-foreground">unlocks</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skillNodes.filter((n) => n.requires.includes(selected.id)).map((n) => (
                        <span key={n.id} className="rounded-md border border-primary/30 bg-primary/5 px-2 py-0.5 font-mono text-[10px] text-primary">{n.label}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border/40 bg-card/20 p-10 text-center">
                <span className="text-3xl">⬡</span>
                <p className="font-mono text-xs text-muted-foreground">click a skill to see what it requires and what it unlocks</p>
              </div>
            )}
            <div className="rounded-xl border border-border/40 bg-card/20 p-4 space-y-2">
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground">node size = proficiency</p>
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground">arrows = prerequisites</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
