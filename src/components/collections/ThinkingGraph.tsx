"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/core-features/utils"
import { thoughtNodes, domainConfig, type ThoughtNode } from "@/src/lib/thinking-graph-data"

type SimNode = ThoughtNode & { x: number; y: number; vx: number; vy: number }
type SimLink = { source: SimNode; target: SimNode }

const NODE_BASE = 18
const STRENGTH_SCALE = [0, 8, 14, 22]
const REPEL = 260
const LINK_DISTANCE = 130
const CENTER_STRENGTH = 0.035
const DAMPING = 0.88
const ITERATIONS_PER_FRAME = 3

function nodeRadius(n: SimNode) {
  return NODE_BASE + STRENGTH_SCALE[n.strength]
}

export function ThinkingGraph() {
  const [isVisible, setIsVisible] = useState(false)
  const [selected, setSelected] = useState<SimNode | null>(null)
  const [activeDomain, setActiveDomain] = useState<ThoughtNode["domain"] | "all">("all")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const nodesRef = useRef<SimNode[]>([])
  const linksRef = useRef<SimLink[]>([])
  const rafRef = useRef<number>(0)
  const hoveredRef = useRef<SimNode | null>(null)
  const isDraggingRef = useRef<SimNode | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width = W * devicePixelRatio
    canvas.height = H * devicePixelRatio
    ctx.scale(devicePixelRatio, devicePixelRatio)

    // Init nodes
    const nodes: SimNode[] = thoughtNodes.map((n, i) => ({
      ...n,
      x: W / 2 + Math.cos((i / thoughtNodes.length) * Math.PI * 2) * 160,
      y: H / 2 + Math.sin((i / thoughtNodes.length) * Math.PI * 2) * 160,
      vx: 0,
      vy: 0,
    }))
    nodesRef.current = nodes

    const links: SimLink[] = []
    nodes.forEach((n) => {
      n.connections.forEach((cid) => {
        const target = nodes.find((t) => t.id === cid)
        if (target && n.id < cid) links.push({ source: n, target })
      })
    })
    linksRef.current = links

    function simulate() {
      for (let iter = 0; iter < ITERATIONS_PER_FRAME; iter++) {
        // Repulsion
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j]
            const dx = b.x - a.x
            const dy = b.y - a.y
            const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
            const force = REPEL / (dist * dist)
            const fx = (dx / dist) * force
            const fy = (dy / dist) * force
            a.vx -= fx; a.vy -= fy
            b.vx += fx; b.vy += fy
          }
        }
        // Attraction along links
        links.forEach(({ source, target }) => {
          const dx = target.x - source.x
          const dy = target.y - source.y
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
          const force = (dist - LINK_DISTANCE) * 0.04
          const fx = (dx / dist) * force
          const fy = (dy / dist) * force
          source.vx += fx; source.vy += fy
          target.vx -= fx; target.vy -= fy
        })
        // Center gravity
        nodes.forEach((n) => {
          n.vx += (W / 2 - n.x) * CENTER_STRENGTH
          n.vy += (H / 2 - n.y) * CENTER_STRENGTH
        })
        // Integrate
        nodes.forEach((n) => {
          if (isDraggingRef.current?.id === n.id) return
          n.vx *= DAMPING; n.vy *= DAMPING
          n.x += n.vx; n.y += n.vy
          n.x = Math.max(nodeRadius(n) + 4, Math.min(W - nodeRadius(n) - 4, n.x))
          n.y = Math.max(nodeRadius(n) + 4, Math.min(H - nodeRadius(n) - 4, n.y))
        })
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)
      const sel = hoveredRef.current ?? selected

      // Draw links
      links.forEach(({ source, target }) => {
        const isConnectedToSel = sel && (source.id === sel.id || target.id === sel.id)
        const alpha = sel ? (isConnectedToSel ? 0.6 : 0.08) : 0.2
        ctx.beginPath()
        ctx.strokeStyle = `rgba(167,139,250,${alpha})`
        ctx.lineWidth = isConnectedToSel ? 1.5 : 1
        ctx.moveTo(source.x, source.y)
        ctx.lineTo(target.x, target.y)
        ctx.stroke()
      })

      // Draw nodes
      nodes.forEach((n) => {
        const cfg = domainConfig[n.domain]
        const r = nodeRadius(n)
        const isSelected = sel?.id === n.id
        const isConnected = sel && sel.connections.includes(n.id)
        const isDimmed = sel && !isSelected && !isConnected
        const domainMatch = activeDomain === "all" || n.domain === activeDomain
        const globalAlpha = isDimmed || !domainMatch ? 0.25 : 1

        ctx.save()
        ctx.globalAlpha = globalAlpha

        // Outer ring for selected
        if (isSelected) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2)
          ctx.strokeStyle = cfg.color
          ctx.lineWidth = 1.5
          ctx.setLineDash([3, 3])
          ctx.stroke()
          ctx.setLineDash([])
        }

        // Node fill
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = cfg.bg
        ctx.fill()
        ctx.strokeStyle = isSelected || isConnected ? cfg.color : cfg.border
        ctx.lineWidth = isSelected ? 2 : 1
        ctx.stroke()

        // Label
        const fontSize = n.strength === 3 ? 11 : n.strength === 2 ? 10 : 9
        ctx.font = `${isSelected ? 600 : 400} ${fontSize}px "Geist Mono", monospace`
        ctx.fillStyle = isSelected || isConnected ? cfg.color : "rgba(200,200,220,0.85)"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Wrap label for big nodes
        const words = n.label.split(" ")
        if (words.length > 2 && r > 30) {
          const mid = Math.ceil(words.length / 2)
          ctx.fillText(words.slice(0, mid).join(" "), n.x, n.y - 6)
          ctx.fillText(words.slice(mid).join(" "), n.x, n.y + 6)
        } else {
          ctx.fillText(n.label, n.x, n.y)
        }

        ctx.restore()
      })
    }

    function tick() {
      simulate()
      draw()
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    // Mouse interactions
    function getNode(x: number, y: number) {
      return nodesRef.current.find((n) => {
        const dx = n.x - x, dy = n.y - y
        return Math.sqrt(dx * dx + dy * dy) <= nodeRadius(n) + 4
      }) ?? null
    }

    function getPos(e: MouseEvent | TouchEvent): { x: number; y: number } {
      const rect = canvas.getBoundingClientRect()
      const src = "touches" in e ? e.touches[0] : e
      return { x: src.clientX - rect.left, y: src.clientY - rect.top }
    }

    function onMouseMove(e: MouseEvent) {
      const { x, y } = getPos(e)
      const hit = getNode(x, y)
      hoveredRef.current = hit
      canvas.style.cursor = hit ? "pointer" : "default"
      if (isDraggingRef.current) {
        isDraggingRef.current.x = x
        isDraggingRef.current.y = y
        isDraggingRef.current.vx = 0
        isDraggingRef.current.vy = 0
      }
    }

    function onMouseDown(e: MouseEvent) {
      const { x, y } = getPos(e)
      const hit = getNode(x, y)
      if (hit) isDraggingRef.current = hit
    }

    function onMouseUp(e: MouseEvent) {
      const { x, y } = getPos(e)
      const hit = getNode(x, y)
      if (hit && !isDraggingRef.current?.id) setSelected((prev) => prev?.id === hit.id ? null : hit as SimNode)
      else if (hit) setSelected((prev) => prev?.id === hit.id ? null : hit as SimNode)
      isDraggingRef.current = null
    }

    function onClick(e: MouseEvent) {
      const { x, y } = getPos(e)
      const hit = getNode(x, y)
      setSelected((prev) => hit ? (prev?.id === hit.id ? null : hit as SimNode) : null)
    }

    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", onMouseDown)
    canvas.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("click", onClick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener("mousemove", onMouseMove)
      canvas.removeEventListener("mousedown", onMouseDown)
      canvas.removeEventListener("mouseup", onMouseUp)
      canvas.removeEventListener("click", onClick)
    }
  }, [activeDomain, selected])

  return (
    <section ref={sectionRef} className="overflow-x-clip px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-10 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">concept map;</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">What I'm Thinking About ✦</h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            A live graph of the ideas I keep coming back to. Click any node to explore its connections.
          </p>
        </div>

        {/* Domain filters */}
        <div className={cn("mb-6 flex flex-wrap gap-2 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "80ms" }}>
          <button
            onClick={() => setActiveDomain("all")}
            className={cn("rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all",
              activeDomain === "all" ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-foreground/40")}
          >all</button>
          {(Object.entries(domainConfig) as [ThoughtNode["domain"], typeof domainConfig[keyof typeof domainConfig]][]).map(([domain, cfg]) => (
            <button
              key={domain}
              onClick={() => setActiveDomain(activeDomain === domain ? "all" : domain)}
              className={cn("rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all")}
              style={{
                borderColor: activeDomain === domain ? cfg.color : undefined,
                background: activeDomain === domain ? cfg.bg : undefined,
                color: activeDomain === domain ? cfg.color : undefined,
              }}
            >{cfg.label.toLowerCase()}</button>
          ))}
        </div>

        <div className={cn("grid gap-6 lg:grid-cols-3 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "130ms" }}>
          {/* Canvas */}
          <div className="lg:col-span-2 rounded-xl border border-border/50 bg-card/20 overflow-hidden" style={{ height: 480 }}>
            <canvas ref={canvasRef} className="w-full h-full" style={{ background: "transparent" }} />
          </div>

          {/* Selected node detail */}
          <div className="flex flex-col gap-4">
            {selected ? (
              <div className="rounded-xl border border-primary/30 bg-card/40 glass p-6 space-y-4 animate-fade-in-up">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span
                      className="mb-2 inline-block rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wider"
                      style={{ color: domainConfig[selected.domain].color, borderColor: domainConfig[selected.domain].border, background: domainConfig[selected.domain].bg }}
                    >
                      {domainConfig[selected.domain].label.toLowerCase()}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-foreground">{selected.label}</h3>
                  </div>
                  <button onClick={() => setSelected(null)} className="font-mono text-xs text-muted-foreground hover:text-primary">×</button>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{selected.description}</p>
                <div>
                  <p className="mb-2 font-mono text-[10px] tracking-widest text-muted-foreground">connects to</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.connections.map((cid) => {
                      const node = thoughtNodes.find((n) => n.id === cid)
                      if (!node) return null
                      return (
                        <button
                          key={cid}
                          onClick={() => setSelected(nodesRef.current.find((n) => n.id === cid) ?? null)}
                          className="rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                        >{node.label}</button>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border/40 bg-card/20 p-10 text-center">
                <span className="text-3xl">✦</span>
                <p className="font-mono text-xs text-muted-foreground">click a node to explore its connections</p>
              </div>
            )}

            {/* Legend */}
            <div className="rounded-xl border border-border/40 bg-card/20 p-4 space-y-2">
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground">domains</p>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.entries(domainConfig) as [string, typeof domainConfig[keyof typeof domainConfig]][]).map(([domain, cfg]) => (
                  <div key={domain} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: cfg.color }} />
                    <span className="font-mono text-[10px] text-muted-foreground">{cfg.label.toLowerCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
