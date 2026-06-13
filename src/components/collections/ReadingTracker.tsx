"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"

type BookStatus = "reading" | "done" | "queue"
type ActivityType = "finish" | "start" | "progress" | "add"

interface Book {
  id: string
  title: string
  author: string
  status: BookStatus
  progress: number
  rating: number | null
  category: string
  started: string | null
  finished: string | null
  coverColor: string
  note: string
  environment: string | null
  concepts: string[]
}

interface ActivityItem {
  text: string
  time: string
  type: ActivityType
  detail?: string
}

interface CategoryConfig {
  bg: string
  text: string
  border: string
}

interface BadgeProps {
  label: string
  style: React.CSSProperties & { bg: string; text: string; border: string }
}

interface EnvTagProps { env: string | null }
interface BookSpineProps { color: string; height?: number }
interface StarsProps { rating: number | null }

interface ReadingTrackerProps {
  books?: Book[]
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const mockBooks: Book[] = [
  { id: "flow", title: "Flow", author: "Mihály Csíkszentmihályi", status: "reading", progress: 42, rating: null, category: "psychology", started: "May 14, 2026", finished: null, coverColor: "#a8d8ea", note: "The section on autotelic experience is making me rethink how I design for focus.", environment: "late night · tea · desk", concepts: ["focus", "immersion", "cognition", "optimal experience", "systems", "happiness"] },
  { id: "envisioning", title: "Envisioning Information", author: "Edward R. Tufte", status: "reading", progress: 67, rating: null, category: "design", started: "May 20, 2026", finished: null, coverColor: "#f7c5c5", note: "", environment: "morning · coffee · bedroom", concepts: ["information design", "visual communication", "data", "systems", "clarity"] },
  { id: "dorian", title: "The Picture of Dorian Gray", author: "Oscar Wilde", status: "done", progress: 100, rating: 4, category: "fiction", started: "Apr 28, 2026", finished: "May 12, 2026", coverColor: "#b8d4f0", note: "Decadence as a design philosophy. Everything beautiful eventually reveals its cost.", environment: "late night · tea · couch", concepts: ["beauty", "morality", "identity", "duality", "aesthetics", "transformation"] },
  { id: "zero-to-one", title: "Zero to One", author: "Peter Thiel", status: "done", progress: 100, rating: 4, category: "business", started: "Apr 10, 2026", finished: "Apr 28, 2026", coverColor: "#ffd6a5", note: "", environment: "morning · desk", concepts: ["innovation", "0→1", "systems", "monopoly", "future", "building"] },
  { id: "thinking", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", status: "done", progress: 100, rating: 5, category: "psychology", started: "Mar 1, 2026", finished: "Apr 10, 2026", coverColor: "#d4edda", note: "System 1 and System 2 show up everywhere once you know to look.", environment: "morning · tea · desk", concepts: ["cognition", "decision making", "bias", "systems", "psychology", "behavior"] },
  { id: "alchemist", title: "The Alchemist", author: "Paulo Coelho", status: "done", progress: 100, rating: 4, category: "fiction", started: "Feb 1, 2026", finished: "Feb 20, 2026", coverColor: "#ffe8a1", note: "", environment: "afternoon · sunlight · couch", concepts: ["journey", "transformation", "destiny", "immersion", "identity", "purpose"] },
  { id: "everyday-things", title: "Design of Everyday Things", author: "Donald Norman", status: "queue", progress: 0, rating: null, category: "design", started: null, finished: null, coverColor: "#f9c6d0", note: "", environment: null, concepts: ["design", "affordances", "usability", "cognition", "systems", "human behavior"] },
  { id: "mastery", title: "Mastery", author: "Robert Greene", status: "queue", progress: 0, rating: null, category: "self-improvement", started: null, finished: null, coverColor: "#ffe0b2", note: "", environment: null, concepts: ["mastery", "learning", "focus", "building", "transformation", "purpose"] },
]

// Activity now reflects actual book data with real dates and detail lines
const mockActivity: ActivityItem[] = [
  { text: "Finished The Picture of Dorian Gray", time: "May 12", type: "finish", detail: "Finished in 14 days · rated 4★" },
  { text: "Started Flow", time: "May 14", type: "start", detail: "Psychology · target: end of May" },
  { text: "Reached 67% of Envisioning Information", time: "May 24", type: "progress", detail: "Up from 40% · on pace" },
  { text: "Added Mastery to antilibrary", time: "May 27", type: "add", detail: "Robert Greene · self-improvement" },
  { text: "Reached 42% of Flow", time: "May 28", type: "progress", detail: "42% complete · 3 sessions this week" },
]

const categoryColors: Record<string, CategoryConfig> = {
  design: { bg: "rgba(167,139,250,0.15)", text: "#7c3aed", border: "rgba(167,139,250,0.4)" },
  psychology: { bg: "rgba(96,165,250,0.15)", text: "#2563eb", border: "rgba(96,165,250,0.4)" },
  fiction: { bg: "rgba(244,114,182,0.15)", text: "#db2777", border: "rgba(244,114,182,0.4)" },
  business: { bg: "rgba(251,191,36,0.15)", text: "#d97706", border: "rgba(251,191,36,0.4)" },
  "self-improvement": { bg: "rgba(52,211,153,0.15)", text: "#059669", border: "rgba(52,211,153,0.4)" },
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function Badge({ label, style }: BadgeProps) {
  return (
    <span style={{
      fontSize: 10, fontFamily: "monospace", padding: "2px 8px",
      borderRadius: 999, border: `1px solid ${style.border}`,
      background: style.bg, color: style.text, whiteSpace: "nowrap",
      ...style
    }}>{label}</span>
  )
}

function CategoryBadge({ category }: { category: string }) {
  const c = categoryColors[category] ?? { bg: "rgba(0,0,0,0.06)", text: "#6b7280", border: "rgba(0,0,0,0.1)" }
  return <Badge label={category} style={c as BadgeProps["style"]} />
}

function Stars({ rating }: StarsProps) {
  if (!rating) return null
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ fontSize: 11, color: s <= rating ? "#7c3aed" : "#e5e7eb" }}>★</span>
      ))}
    </div>
  )
}

function BookSpine({ color, height = 56 }: BookSpineProps) {
  return (
    <div style={{
      width: 10, height, borderRadius: 2, background: color, flexShrink: 0,
      boxShadow: "inset -2px 0 4px rgba(0,0,0,0.12)"
    }} />
  )
}

function EnvTag({ env }: EnvTagProps) {
  if (!env) return null
  const parts = env.split("·").map(s => s.trim())
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
      {parts.map((p, i) => (
        <span key={i} style={{ fontSize: 10, fontFamily: "monospace", color: "#9ca3af", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 6, padding: "1px 6px" }}>
          {p}
        </span>
      ))}
    </div>
  )
}

// ─── CONNECTIONS GRAPH ───────────────────────────────────────────────────────
// Fix: time-based damping reduces forces as simulation settles, eliminating jitter on hover.
// Fix: drag detection separated from click so hover state doesn't re-trigger layout forces.
function ConnectionsGraph({ books }: { books: Book[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selected, setSelected] = useState<Book | null>(null)
  const nodesRef = useRef<any[]>([])
  const animRef = useRef<number | null>(null)
  const tickRef = useRef(0)
  const isDragging = useRef(false)
  const dragMoved = useRef(false)
  const dragNode = useRef<any>(null)
  const hoveredId = useRef<string | null>(null)
  const selectedRef = useRef<Book | null>(null)
  const W = 640, H = 420

  const getConnections = useCallback(() => {
    const edges: { source: string; target: string; shared: string[]; strength: number }[] = []
    for (let i = 0; i < books.length; i++) {
      for (let j = i + 1; j < books.length; j++) {
        const a = books[i], b = books[j]
        const shared = a.concepts.filter(c => b.concepts.includes(c))
        if (shared.length > 0) {
          edges.push({ source: a.id, target: b.id, shared, strength: shared.length })
        }
      }
    }
    return edges
  }, [books])

  // Keep selectedRef in sync so the draw loop can read it without re-running the effect
  useEffect(() => { selectedRef.current = selected }, [selected])

  useEffect(() => {
    const edges = getConnections()
    const connectionCount: Record<string, number> = {}
    books.forEach(b => { connectionCount[b.id] = edges.filter(e => e.source === b.id || e.target === b.id).length })

    nodesRef.current = books.map((book, i) => ({
      ...book,
      x: W / 2 + (Math.cos(i / books.length * Math.PI * 2) * 180),
      y: H / 2 + (Math.sin(i / books.length * Math.PI * 2) * 150),
      vx: 0, vy: 0,
      connections: connectionCount[book.id],
    }))
    tickRef.current = 0

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const simulate = () => {
      tickRef.current++
      // Damping factor: forces decay over time so nodes settle and stop jittering
      const damping = Math.max(0.3, 1 - tickRef.current * 0.004)
      const nodes = nodesRef.current
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const force = (2500 / (dist * dist)) * damping
          nodes[i].vx -= (dx / dist) * force
          nodes[i].vy -= (dy / dist) * force
          nodes[j].vx += (dx / dist) * force
          nodes[j].vy += (dy / dist) * force
        }
      }
      edges.forEach(e => {
        const src = nodes.find((n: any) => n.id === e.source)
        const tgt = nodes.find((n: any) => n.id === e.target)
        if (!src || !tgt) return
        const dx = tgt.x - src.x, dy = tgt.y - src.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const target = 140 - e.strength * 12
        const force = (dist - target) * 0.03 * damping
        src.vx += (dx / dist) * force; src.vy += (dy / dist) * force
        tgt.vx -= (dx / dist) * force; tgt.vy -= (dy / dist) * force
      })
      nodes.forEach((n: any) => {
        if (dragNode.current && dragNode.current.id === n.id) return
        n.vx += (W / 2 - n.x) * 0.008 * damping
        n.vy += (H / 2 - n.y) * 0.008 * damping
        // Stronger friction (0.78) reduces oscillation vs original 0.85
        n.vx *= 0.78; n.vy *= 0.78
        n.x += n.vx; n.y += n.vy
        n.x = Math.max(40, Math.min(W - 40, n.x))
        n.y = Math.max(40, Math.min(H - 40, n.y))
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const nodes = nodesRef.current
      const sel = selectedRef.current
      edges.forEach(e => {
        const src = nodes.find((n: any) => n.id === e.source)
        const tgt = nodes.find((n: any) => n.id === e.target)
        if (!src || !tgt) return
        const isHighlighted = sel && (sel.id === e.source || sel.id === e.target)
        ctx.beginPath()
        ctx.moveTo(src.x, src.y)
        ctx.lineTo(tgt.x, tgt.y)
        ctx.strokeStyle = isHighlighted ? "rgba(124,58,237,0.6)" : "rgba(124,58,237,0.1)"
        ctx.lineWidth = isHighlighted ? e.strength * 1.5 : 1
        ctx.stroke()
        if (isHighlighted && e.shared.length > 0) {
          const mx = (src.x + tgt.x) / 2, my = (src.y + tgt.y) / 2
          ctx.font = "9px monospace"
          ctx.fillStyle = "rgba(124,58,237,0.8)"
          ctx.textAlign = "center"
          ctx.fillText(e.shared[0], mx, my - 4)
        }
      })
      nodes.forEach((node: any) => {
        const r = 14 + node.connections * 3
        const isSel = sel && sel.id === node.id
        const isHov = hoveredId.current === node.id
        const isConnected = sel && edges.some(e => (e.source === sel.id && e.target === node.id) || (e.target === sel.id && e.source === node.id))
        const alpha = sel ? (isSel || isConnected ? 1 : 0.2) : 1
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.fillStyle = node.coverColor || "#a8d8ea"
        ctx.fill()
        ctx.strokeStyle = isSel ? "#7c3aed" : isHov ? "rgba(124,58,237,0.6)" : "rgba(0,0,0,0.1)"
        ctx.lineWidth = isSel ? 2.5 : 1.5
        ctx.stroke()
        ctx.font = `${isSel ? "bold " : ""}10px monospace`
        ctx.fillStyle = "#1a1a2e"
        ctx.textAlign = "center"
        const words = node.title.split(" ")
        let line = "", lines: string[] = []
        words.forEach((w: string) => {
          const test = line + (line ? " " : "") + w
          if (ctx.measureText(test).width > 80) { lines.push(line); line = w }
          else line = test
        })
        lines.push(line)
        lines.forEach((l, li) => ctx.fillText(l, node.x, node.y + r + 12 + li * 11))
        ctx.globalAlpha = 1
      })
    }

    const loop = () => { simulate(); draw(); animRef.current = requestAnimationFrame(loop) }
    loop()
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [books, getConnections])

  const getNodeAt = (x: number, y: number) => {
    return nodesRef.current.find((n: any) => {
      const r = 14 + n.connections * 3
      return Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2) < r
    })
  }

  const toCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return {
      x: (e.clientX - rect.left) * (W / rect.width),
      y: (e.clientY - rect.top) * (H / rect.height),
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = toCanvas(e)
    if (isDragging.current && dragNode.current) {
      dragNode.current.x = x; dragNode.current.y = y
      dragNode.current.vx = 0; dragNode.current.vy = 0
      dragMoved.current = true
      canvasRef.current!.style.cursor = "grabbing"
    } else {
      const node = getNodeAt(x, y)
      hoveredId.current = node ? node.id : null
      canvasRef.current!.style.cursor = node ? "pointer" : "default"
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = toCanvas(e)
    const node = getNodeAt(x, y)
    if (node) {
      isDragging.current = true
      dragMoved.current = false
      dragNode.current = nodesRef.current.find((n: any) => n.id === node.id)
    }
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = toCanvas(e)
    if (!dragMoved.current) {
      const node = getNodeAt(x, y)
      if (node) setSelected(s => s?.id === node.id ? null : node)
    }
    isDragging.current = false
    dragMoved.current = false
    dragNode.current = null
  }

  const edges = getConnections()
  const selEdges = selected ? edges.filter(e => e.source === selected.id || e.target === selected.id) : []

  return (
    <div>
      <p style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af", marginBottom: 12 }}>
        Books connected by shared concepts. Click a node to explore. Drag to rearrange.
      </p>
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", background: "#fafafa" }}>
        <canvas ref={canvasRef} width={W} height={H} style={{ width: "100%", display: "block" }}
          onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
          onMouseLeave={() => { hoveredId.current = null; isDragging.current = false; dragNode.current = null }} />
      </div>
      {selected && (
        <div style={{ marginTop: 14, padding: "14px 18px", borderRadius: 12, border: "1px solid rgba(124,58,237,0.25)", background: "rgba(124,58,237,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <BookSpine color={selected.coverColor} height={32} />
            <div>
              <p style={{ fontWeight: 600, fontSize: 14 }}>{selected.title}</p>
              <p style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af" }}>{selected.author}</p>
            </div>
            <button onClick={() => setSelected(null)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 16 }}>×</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
            {selected.concepts.map(c => (
              <span key={c} style={{ fontSize: 10, fontFamily: "monospace", padding: "2px 8px", borderRadius: 999, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", color: "#7c3aed" }}>{c}</span>
            ))}
          </div>
          {selEdges.length > 0 && (
            <div>
              <p style={{ fontFamily: "monospace", fontSize: 10, color: "#9ca3af", marginBottom: 6 }}>connects to:</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {selEdges.map(e => {
                  const otherId = e.source === selected.id ? e.target : e.source
                  const other = books.find(b => b.id === otherId)
                  if (!other) return null
                  return (
                    <div key={otherId} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 8, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.06)" }}>
                      <BookSpine color={other.coverColor} height={20} />
                      <span style={{ fontSize: 12, fontWeight: 500 }}>{other.title}</span>
                      <span style={{ marginLeft: "auto", fontSize: 10, fontFamily: "monospace", color: "#7c3aed" }}>via: {e.shared.join(", ")}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── CONTRIBUTIONS GRAPH ─────────────────────────────────────────────────────
function ContribGraph({ books }: { books: Book[] }) {
  const finishedBooks = books.filter(b => b.status === "done")
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const monthData = months.map((m, i) => ({
    month: m,
    count: finishedBooks.filter(b => b.finished && new Date(b.finished).getMonth() === i).length,
    books: finishedBooks.filter(b => b.finished && new Date(b.finished).getMonth() === i),
  }))
  const maxCount = Math.max(...monthData.map(m => m.count), 1)
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <p style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af" }}>books finished · {new Date().getFullYear()}</p>
        <p style={{ fontFamily: "monospace", fontSize: 11, color: "#7c3aed" }}>{finishedBooks.length} books total</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 6, marginBottom: 20 }}>
        {monthData.map((m, i) => (
          <div key={m.month} style={{ cursor: m.count > 0 ? "pointer" : "default" }}
            onMouseEnter={() => m.count > 0 && setHovered(i)}
            onMouseLeave={() => setHovered(null)}>
            <div style={{
              height: 48, borderRadius: 8,
              background: m.count === 0 ? "rgba(0,0,0,0.04)" : `rgba(124,58,237,${0.15 + (m.count / maxCount) * 0.7})`,
              border: hovered === i ? "2px solid #7c3aed" : "1px solid rgba(0,0,0,0.06)",
              transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {m.count > 0 && <span style={{ fontSize: 16, fontWeight: 700, color: "#7c3aed" }}>{m.count}</span>}
            </div>
            <p style={{ fontFamily: "monospace", fontSize: 9, color: "#9ca3af", textAlign: "center", marginTop: 4 }}>{m.month}</p>
          </div>
        ))}
      </div>
      {hovered !== null && monthData[hovered].books.length > 0 && (
        <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.2)", marginBottom: 16 }}>
          <p style={{ fontFamily: "monospace", fontSize: 10, color: "#7c3aed", marginBottom: 8 }}>{months[hovered]} {new Date().getFullYear()}</p>
          {monthData[hovered].books.map(b => (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <BookSpine color={b.coverColor} height={20} />
              <span style={{ fontSize: 12 }}>{b.title}</span>
              <Stars rating={b.rating} />
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: 8 }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, color: "#9ca3af", marginBottom: 10 }}>shelf · all books</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, padding: "12px 16px", background: "rgba(0,0,0,0.02)", borderRadius: 10, border: "1px solid rgba(0,0,0,0.06)", overflowX: "auto" }}>
          {books.map(b => {
            const h = 32 + (b.status === "done" ? 20 : b.status === "reading" ? 10 : 0)
            return (
              <div key={b.id} title={b.title}>
                <div style={{ width: 14, height: h, borderRadius: "3px 3px 0 0", background: b.coverColor, opacity: b.status === "queue" ? 0.4 : 1, boxShadow: "inset -2px 0 4px rgba(0,0,0,0.12)", border: b.status === "reading" ? "2px solid #7c3aed" : "1px solid rgba(0,0,0,0.1)" }} />
              </div>
            )
          })}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          {[{label:"finished",color:"rgba(124,58,237,0.7)"},{label:"reading",color:"rgba(124,58,237,0.4)"},{label:"queue",color:"rgba(0,0,0,0.15)"}].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
              <span style={{ fontFamily: "monospace", fontSize: 10, color: "#9ca3af" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const TABS = ["reading", "finished", "up next", "graph", "activity"]

export function ReadingTracker({ books: booksProp }: ReadingTrackerProps) {
  const [tab, setTab] = useState<string>("reading")
  const [fetchedBooks, setFetchedBooks] = useState<Book[] | null>(null)

  useEffect(() => {
    fetch("/api/reading")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.length > 0) setFetchedBooks(data) })
      .catch(() => {})
  }, [])

  const books = fetchedBooks ?? (booksProp && booksProp.length > 0 ? booksProp : mockBooks)

  const currentlyReading = books.filter(b => b.status === "reading")
  const finished = books.filter(b => b.status === "done")
  const queue = books.filter(b => b.status === "queue")

  const rated = finished.filter(b => b.rating)
  const avgRating = rated.length > 0
    ? (rated.reduce((a, b) => a + (b.rating ?? 0), 0) / rated.length).toFixed(1) + "★"
    : "-"

  // Pages this week: estimate from in-progress reading sessions
  const pagesThisWeek = Math.round(currentlyReading.reduce((a, b) => a + b.progress * 3, 0))

  // Day streak (replace with real logic if you track sessions)
  const dayStreak = 12

  // Top genre by finished book count
  const genreCounts: Record<string, number> = {}
  finished.forEach(b => { genreCounts[b.category] = (genreCounts[b.category] ?? 0) + 1 })
  const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-"

  const stats = [
    { label: "books this year", value: finished.length },
    { label: "currently reading", value: currentlyReading.length },
    { label: "antilibrary", value: queue.length },
    { label: "avg rating", value: avgRating },
    { label: "pages this week", value: pagesThisWeek },
    { label: "day streak", value: `${dayStreak}🔥` },
    { label: "top genre", value: topGenre },
  ]

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", padding: "2rem 1rem", color: "#1a1a2e" }}>
      <style>{`
        .rt-card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 14px; }
        .rt-progress-bar { height: 5px; background: #e9e9f5; border-radius: 999px; overflow: hidden; }
        .rt-progress-fill { height: 100%; border-radius: 999px; background: linear-gradient(to right, #7c3aed, #a78bfa); }
        .rt-tab-btn { background: none; border: none; cursor: pointer; font-family: monospace; font-size: 11px; letter-spacing: 0.06em; padding: 6px 14px; border-radius: 8px; transition: all 0.15s; }
        .rt-pulse { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #7c3aed; animation: rt-pulse 2s infinite; }
        @keyframes rt-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        <div style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.25em", color: "#7c3aed", marginBottom: 6 }}>currently reading;</p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>Reading Tracker</h2>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "monospace", fontSize: 10, color: "#7c3aed", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 999, padding: "3px 10px" }}>
              <span className="rt-pulse" /> live
            </span>
          </div>
          <p style={{ color: "#6b7280", fontSize: 14 }}>What I'm reading, finished, and connections between them.</p>
        </div>

        {/* Stats - 7 columns to match bookmarks flipbook width */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10, marginBottom: 24 }}>
          {stats.map(s => (
            <div key={s.label} className="rt-card" style={{ padding: "12px 14px", textAlign: "center" }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#7c3aed", marginBottom: 2 }}>{s.value}</p>
              <p style={{ fontFamily: "monospace", fontSize: 9, color: "#9ca3af", letterSpacing: "0.05em" }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(0,0,0,0.04)", borderRadius: 10, padding: 4, width: "fit-content" }}>
          {TABS.map(t => (
            <button key={t} className="rt-tab-btn" onClick={() => setTab(t)}
              style={{ color: tab === t ? "#7c3aed" : "#9ca3af", background: tab === t ? "rgba(124,58,237,0.12)" : "none" }}>
              {t}
            </button>
          ))}
        </div>

        {tab === "reading" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {currentlyReading.length === 0 && (
              <p style={{ fontFamily: "monospace", fontSize: 12, color: "#9ca3af" }}>Nothing currently reading.</p>
            )}
            {currentlyReading.map(book => (
              <div key={book.id} className="rt-card" style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <BookSpine color={book.coverColor} height={64} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{book.title}</p>
                        <p style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af" }}>{book.author}</p>
                      </div>
                      <CategoryBadge category={book.category} />
                    </div>
                    <div style={{ margin: "10px 0 6px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#9ca3af" }}>progress</span>
                        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#7c3aed", fontWeight: 600 }}>{book.progress}%</span>
                      </div>
                      <div className="rt-progress-bar"><div className="rt-progress-fill" style={{ width: `${book.progress}%` }} /></div>
                    </div>
                    <EnvTag env={book.environment} />
                    {book.note && (
                      <div style={{ marginTop: 10, padding: "8px 12px", background: "rgba(124,58,237,0.05)", borderLeft: "3px solid rgba(124,58,237,0.35)", borderRadius: "0 6px 6px 0" }}>
                        <p style={{ fontSize: 12, color: "#6b7280", fontStyle: "italic", lineHeight: 1.5 }}>"{book.note}"</p>
                      </div>
                    )}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                      {book.concepts.slice(0, 4).map(c => (
                        <span key={c} style={{ fontSize: 9, fontFamily: "monospace", padding: "1px 6px", borderRadius: 999, background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.15)", color: "#7c3aed" }}>{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "finished" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {finished.map(book => (
              <div key={book.id} className="rt-card" style={{ padding: "14px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <BookSpine color={book.coverColor} height={44} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{book.title}</p>
                    <p style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af" }}>{book.author}</p>
                    {book.environment && <EnvTag env={book.environment} />}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, flexShrink: 0 }}>
                    <Stars rating={book.rating} />
                    <CategoryBadge category={book.category} />
                    <span style={{ fontFamily: "monospace", fontSize: 10, color: "#c4b5fd" }}>{book.finished}</span>
                  </div>
                </div>
                {book.note && (
                  <div style={{ marginTop: 10, padding: "8px 12px", background: "rgba(124,58,237,0.04)", borderLeft: "3px solid rgba(124,58,237,0.25)", borderRadius: "0 6px 6px 0" }}>
                    <p style={{ fontSize: 12, color: "#6b7280", fontStyle: "italic" }}>"{book.note}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "up next" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>antilibrary - books queued up</p>
            {queue.map((book, i) => (
              <div key={book.id} className="rt-card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: "rgba(124,58,237,0.2)", width: 28, flexShrink: 0 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <BookSpine color={book.coverColor} height={44} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{book.title}</p>
                  <p style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af" }}>{book.author}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                    {book.concepts.slice(0, 3).map(c => (
                      <span key={c} style={{ fontSize: 9, fontFamily: "monospace", padding: "1px 6px", borderRadius: 999, background: "rgba(124,58,237,0.07)", border: "1px solid rgba(124,58,237,0.15)", color: "#7c3aed" }}>{c}</span>
                    ))}
                  </div>
                </div>
                <CategoryBadge category={book.category} />
              </div>
            ))}
          </div>
        )}

        {tab === "graph" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="rt-card" style={{ padding: "18px 20px" }}>
              <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Connections Graph</p>
              <ConnectionsGraph books={books} />
            </div>
            <div className="rt-card" style={{ padding: "18px 20px" }}>
              <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Year in Books</p>
              <ContribGraph books={books} />
            </div>
          </div>
        )}

        {tab === "activity" && (
          <div>
            <p style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af", marginBottom: 16 }}>recent reading activity</p>
            {mockActivity.map((item, i) => {
              const colors: Record<ActivityType, string> = { finish: "#7c3aed", start: "#2563eb", progress: "#d97706", add: "#059669" }
              const icons: Record<ActivityType, string> = { finish: "✓", start: "▶", progress: "◎", add: "+" }
              return (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: 16, position: "relative" }}>
                  {i < mockActivity.length - 1 && <div style={{ position: "absolute", left: 13, top: 26, bottom: 0, width: 1, background: "rgba(0,0,0,0.08)" }} />}
                  <div style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: `${colors[item.type]}22`, border: `1px solid ${colors[item.type]}44`, color: colors[item.type], fontSize: 11, fontWeight: 700, flexShrink: 0, zIndex: 1 }}>
                    {icons[item.type]}
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{item.text}</p>
                    <p style={{ fontFamily: "monospace", fontSize: 10, color: "#9ca3af" }}>{item.time}</p>
                    {item.detail && (
                      <p style={{ fontFamily: "monospace", fontSize: 10, color: "#9ca3af", marginTop: 2, opacity: 0.7 }}>{item.detail}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}