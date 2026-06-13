"use client"
import { useState, useRef, useCallback, useEffect } from "react"
import { cn } from "@/src/lib/core-features/utils"

type AppId = "articles" | "topics" | "about" | "terminal" | "projects"

type WindowState = {
  id: AppId
  title: string
  x: number
  y: number
  width: number
  height: number
  minimized: boolean
  focused: boolean
  zIndex: number
}

type DesktopIcon = {
  id: AppId
  icon: string
  label: string
}

const APP_CONTENT: Record<AppId, React.ReactNode> = {
  articles: (
    <div className="p-4 space-y-2">
      <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3">3 items</p>
      {[
        { title: "Cognitive Load in Zero-Gravity Interfaces", date: "May 2026" },
        { title: "Why I Design for the Extremes First", date: "Apr 2026" },
        { title: "HCI Lessons from Watching People Struggle with Elevators", date: "Mar 2026" },
      ].map((a) => (
        <div key={a.title} className="flex items-center gap-3 rounded-lg border border-border/40 bg-secondary/30 px-3 py-2.5 hover:bg-secondary/60 transition-colors cursor-pointer group">
          <span className="text-base">📄</span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate group-hover:text-primary transition-colors">{a.title}</p>
            <p className="font-mono text-[10px] text-muted-foreground">{a.date}</p>
          </div>
        </div>
      ))}
    </div>
  ),
  topics: (
    <div className="p-4">
      <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3">things on my mind</p>
      <div className="flex flex-wrap gap-2">
        {[
          "space systems", "cognitive load", "interface design", "HCI research",
          "language learning", "tea", "ambient computing", "0→1 building",
          "zero-gravity UX", "mental models", "design systems", "typography",
        ].map((topic) => (
          <span key={topic} className="rounded-full border border-primary/30 bg-primary/8 px-2.5 py-1 font-mono text-[10px] text-primary">
            {topic}
          </span>
        ))}
      </div>
    </div>
  ),
  about: (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-lg">✦</div>
        <div>
          <p className="text-sm font-semibold text-foreground">Allison Pham</p>
          <p className="font-mono text-[10px] text-muted-foreground">computer engineering @ UCR</p>
        </div>
      </div>
      <div className="rounded-lg border border-border/40 bg-secondary/20 px-3 py-2.5 space-y-1.5">
        {[
          ["role", "ACM President · Citrus Hack · Cutie Hack"],
          ["focus", "HCI, space systems, product design"],
          ["location", "West Coast"],
          ["status", "building something new"],
        ].map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <span className="font-mono text-[10px] text-muted-foreground w-14 shrink-0">{k}</span>
            <span className="font-mono text-[10px] text-foreground">{v}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  terminal: (
    <div className="p-4 font-mono text-[11px] bg-[#0d0d0d] h-full text-green-400 rounded-b-lg overflow-auto">
      <p className="text-green-600 mb-2">allie@portfolio ~ %</p>
      <p><span className="text-green-600">→</span> whoami</p>
      <p className="text-green-300 mb-2">allison pham - engineer, designer, builder</p>
      <p><span className="text-green-600">→</span> ls interests/</p>
      <p className="text-green-300 mb-2">hci/  space-systems/  design/  research/  tea/</p>
      <p><span className="text-green-600">→</span> cat current-quest.txt</p>
      <p className="text-green-300 mb-2">cognitive load in zero-gravity interfaces</p>
      <p><span className="text-green-600">→</span> uptime</p>
      <p className="text-green-300 mb-2">building since 2021, still going</p>
      <p className="text-green-600 animate-pulse">▊</p>
    </div>
  ),
  projects: (
    <div className="p-4 space-y-2">
      <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3">recent builds</p>
      {[
        { name: "Assistify", tag: "shipped", color: "text-green-500" },
        { name: "PantryPilot", tag: "shipped", color: "text-green-500" },
        { name: "ShelfSense", tag: "shipped", color: "text-green-500" },
        { name: "QR Connect", tag: "shipped", color: "text-green-500" },
      ].map((p) => (
        <div key={p.name} className="flex items-center justify-between rounded-lg border border-border/40 bg-secondary/30 px-3 py-2 hover:border-primary/30 transition-colors cursor-pointer group">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">{p.name}</span>
          </div>
          <span className={cn("font-mono text-[10px]", p.color)}>{p.tag}</span>
        </div>
      ))}
    </div>
  ),
}

const DESKTOP_ICONS: DesktopIcon[] = [
  { id: "about", icon: "👤", label: "about.txt" },
  { id: "articles", icon: "📝", label: "articles" },
  { id: "topics", icon: "💡", label: "topics" },
  { id: "projects", icon: "🗂️", label: "projects" },
  { id: "terminal", icon: "💻", label: "terminal" },
]

const APP_META: Record<AppId, { title: string; width: number; height: number }> = {
  about:     { title: "about.txt",       width: 300, height: 220 },
  articles:  { title: "article writings", width: 340, height: 260 },
  topics:    { title: "topics i like",    width: 320, height: 240 },
  projects:  { title: "projects",         width: 300, height: 240 },
  terminal:  { title: "terminal",         width: 360, height: 260 },
}

// Draggable window
function Window({
  win,
  onClose,
  onMinimize,
  onFocus,
  onMove,
}: {
  win: WindowState
  onClose: (id: AppId) => void
  onMinimize: (id: AppId) => void
  onFocus: (id: AppId) => void
  onMove: (id: AppId, x: number, y: number) => void
}) {
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      dragging.current = true
      offset.current = { x: e.clientX - win.x, y: e.clientY - win.y }
      onFocus(win.id)

      const handleMouseMove = (ev: MouseEvent) => {
        if (!dragging.current) return
        onMove(win.id, ev.clientX - offset.current.x, ev.clientY - offset.current.y)
      }
      const handleMouseUp = () => {
        dragging.current = false
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
      }
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    },
    [win.id, win.x, win.y, onFocus, onMove],
  )

  if (win.minimized) return null

  return (
    <div
      className={cn(
        "absolute overflow-hidden rounded-xl border transition-shadow duration-150 select-none",
        win.focused
          ? "border-primary/40 shadow-lg shadow-primary/10"
          : "border-border/50 shadow-md",
      )}
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        zIndex: win.zIndex,
      }}
      onMouseDown={() => onFocus(win.id)}
    >
      {/* Title bar */}
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2 cursor-move select-none",
          win.focused
            ? "bg-card border-b border-primary/20"
            : "bg-secondary/80 border-b border-border/40",
        )}
        onMouseDown={handleMouseDown}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); onClose(win.id) }}
            className="h-2.5 w-2.5 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
            aria-label="Close"
          />
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(win.id) }}
            className="h-2.5 w-2.5 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
            aria-label="Minimize"
          />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/50 cursor-not-allowed" />
        </div>
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground absolute left-1/2 -translate-x-1/2">
          {win.title}
        </span>
      </div>

      {/* Content */}
      <div
        className="bg-card/95 backdrop-blur-sm overflow-auto"
        style={{ height: win.height }}
      >
        {APP_CONTENT[win.id]}
      </div>
    </div>
  )
}

export function ExplorationGlimpse() {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [zCounter, setZCounter] = useState(10)
  const desktopRef = useRef<HTMLDivElement>(null)

  // Clock
  const [time, setTime] = useState("")
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }))
    update()
    const id = setInterval(update, 10000)
    return () => clearInterval(id)
  }, [])

  const openApp = useCallback(
    (id: AppId) => {
      setWindows((prev) => {
        const exists = prev.find((w) => w.id === id)
        if (exists) {
          // Un-minimize and focus
          return prev.map((w) =>
            w.id === id ? { ...w, minimized: false, focused: true, zIndex: zCounter + 1 } : { ...w, focused: false },
          )
        }
        const meta = APP_META[id]
        const desktop = desktopRef.current
        const dw = desktop?.offsetWidth ?? 600
        const dh = desktop?.offsetHeight ?? 400
        const x = Math.max(20, Math.min(dw - meta.width - 20, 40 + prev.length * 24))
        const y = Math.max(20, Math.min(dh - meta.height - 60, 40 + prev.length * 24))
        const newWin: WindowState = {
          id,
          title: meta.title,
          x,
          y,
          width: meta.width,
          height: meta.height,
          minimized: false,
          focused: true,
          zIndex: zCounter + 1,
        }
        setZCounter((z) => z + 1)
        return [...prev.map((w) => ({ ...w, focused: false })), newWin]
      })
    },
    [zCounter],
  )

  const closeApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }, [])

  const minimizeApp = useCallback((id: AppId) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true, focused: false } : w)))
  }, [])

  const focusApp = useCallback(
    (id: AppId) => {
      setZCounter((z) => z + 1)
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, focused: true, zIndex: zCounter + 1 } : { ...w, focused: false })),
      )
    },
    [zCounter],
  )

  const moveWindow = useCallback((id: AppId, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)))
  }, [])

  const openWindowIds = windows.filter((w) => !w.minimized).map((w) => w.id)
  const minimizedWindows = windows.filter((w) => w.minimized)

  return (
    <div className="flex flex-col items-center py-10 select-none">
      {/* ── Monitor shell ── */}
      <div
        className="relative w-full max-w-[580px] rounded-[18px] border-[3px] border-[#b8b5ae] bg-[#d0cec8] p-3 pb-0"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 32px rgba(0,0,0,0.18)" }}
      >
        {/* Camera dot */}
        <div className="mb-2 flex justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-[#999] border border-[#888]" />
        </div>

        {/* Screen bezel */}
        <div className="overflow-hidden rounded-[10px] border-2 border-[#888]">

      {/* Desktop */}
      <div
        ref={desktopRef}
        className="relative h-[380px] overflow-hidden"
        style={{ background: "#1a1040" }}
      >
        {/* Stars */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() > 0.8 ? 2 : 1,
              height: Math.random() > 0.8 ? 2 : 1,
              left: `${(i * 137.5) % 100}%`,
              top: `${(i * 97.3) % 85}%`,
              opacity: 0.2 + (i % 5) * 0.1,
            }}
          />
        ))}

        {/* Desktop icons */}
        <div className="absolute left-4 top-4 flex flex-col gap-4">
          {DESKTOP_ICONS.map((icon) => (
            <button
              key={icon.id}
              onDoubleClick={() => openApp(icon.id)}
              onClick={() => {}} // Single click = select (future)
              className={cn(
                "group flex flex-col items-center gap-1.5 rounded-lg p-2 transition-colors hover:bg-white/10 active:bg-white/15 w-16",
                openWindowIds.includes(icon.id) && "bg-white/5",
              )}
              aria-label={`Open ${icon.label}`}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-150">
                {icon.icon}
              </span>
              <span className="font-mono text-[9px] text-white/80 text-center leading-tight break-all">
                {icon.label}
              </span>
            </button>
          ))}
        </div>

        {/* Windows */}
        {windows.map((win) => (
          <Window
            key={win.id}
            win={win}
            onClose={closeApp}
            onMinimize={minimizeApp}
            onFocus={focusApp}
            onMove={moveWindow}
          />
        ))}

        {/* Empty state hint */}
        {windows.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="font-mono text-[11px] text-white/20 tracking-widest">
              double-click an icon to open
            </p>
          </div>
        )}
      </div>

      {/* Taskbar */}
      <div className="flex items-center justify-between border-t border-border/40 bg-card/90 backdrop-blur-xl px-4 py-2">
        {/* Left: start + open apps */}
        <div className="flex items-center gap-2">
          {/* Logo/start */}
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/20 border border-primary/30">
            <span className="text-sm">✦</span>
          </div>

          {/* Open app pills */}
          <div className="flex items-center gap-1">
            {windows.map((win) => (
              <button
                key={win.id}
                onClick={() => win.minimized ? openApp(win.id) : minimizeApp(win.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] transition-all duration-200",
                  win.focused && !win.minimized
                    ? "border-primary/50 bg-primary/15 text-primary"
                    : "border-border/40 bg-secondary/40 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
              >
                <span>{DESKTOP_ICONS.find((i) => i.id === win.id)?.icon}</span>
                <span className="hidden sm:inline max-w-[80px] truncate">{win.title}</span>
                {win.minimized && (
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: clock */}
        <div className="font-mono text-[10px] text-muted-foreground tabular-nums">
          {time}
        </div>
      </div>

        </div>{/* /screen bezel */}
      </div>{/* /monitor shell */}

      {/* Neck */}
      <div className="mx-auto h-5 w-20 bg-[#c4c1bb] border-x-[3px] border-[#b0ada6]" />

      {/* Stand */}
      <div
        className="mx-auto h-4 w-44 rounded-b-xl bg-[#c4c1bb] border-[3px] border-t-0 border-[#b0ada6]"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}
      />
    </div>
  )
}