"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/src/lib/core-features/utils";

type BookStatus = "reading" | "done" | "queue";
type ActivityType = "finish" | "start" | "progress" | "add";

interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  progress: number;
  rating: number | null;
  category: string;
  started: string | null;
  finished: string | null;
  coverColor: string;
  note: string;
  environment: string | null;
  concepts: string[];
}

interface ActivityItem {
  text: string;
  time: string;
  type: ActivityType;
  detail?: string;
}

interface CategoryConfig {
  bg: string;
  text: string;
  border: string;
}

interface ReadingTrackerProps {
  books?: Book[];
}

const mockBooks: Book[] = [
  {
    id: "flow",
    title: "Flow",
    author: "Mihály Csíkszentmihályi",
    status: "reading",
    progress: 42,
    rating: null,
    category: "psychology",
    started: "May 14, 2026",
    finished: null,
    coverColor: "#a8d8ea",
    note: "The section on autotelic experience is making me rethink how I design for focus.",
    environment: "late night · tea · desk",
    concepts: ["focus", "immersion", "cognition", "optimal experience", "systems", "happiness"],
  },
  {
    id: "envisioning",
    title: "Envisioning Information",
    author: "Edward R. Tufte",
    status: "reading",
    progress: 67,
    rating: null,
    category: "design",
    started: "May 20, 2026",
    finished: null,
    coverColor: "#f7c5c5",
    note: "",
    environment: "morning · coffee · bedroom",
    concepts: ["information design", "visual communication", "data", "systems", "clarity"],
  },
  {
    id: "dorian",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    status: "done",
    progress: 100,
    rating: 4,
    category: "fiction",
    started: "Apr 28, 2026",
    finished: "May 12, 2026",
    coverColor: "#b8d4f0",
    note: "Decadence as a design philosophy. Everything beautiful eventually reveals its cost.",
    environment: "late night · tea · couch",
    concepts: ["beauty", "morality", "identity", "duality", "aesthetics", "transformation"],
  },
  {
    id: "zero-to-one",
    title: "Zero to One",
    author: "Peter Thiel",
    status: "done",
    progress: 100,
    rating: 4,
    category: "business",
    started: "Apr 10, 2026",
    finished: "Apr 28, 2026",
    coverColor: "#ffd6a5",
    note: "",
    environment: "morning · desk",
    concepts: ["innovation", "0→1", "systems", "monopoly", "future", "building"],
  },
  {
    id: "thinking",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    status: "done",
    progress: 100,
    rating: 5,
    category: "psychology",
    started: "Mar 1, 2026",
    finished: "Apr 10, 2026",
    coverColor: "#d4edda",
    note: "System 1 and System 2 show up everywhere once you know to look.",
    environment: "morning · tea · desk",
    concepts: ["cognition", "decision making", "bias", "systems", "psychology", "behavior"],
  },
  {
    id: "alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    status: "done",
    progress: 100,
    rating: 4,
    category: "fiction",
    started: "Feb 1, 2026",
    finished: "Feb 20, 2026",
    coverColor: "#ffe8a1",
    note: "",
    environment: "afternoon · sunlight · couch",
    concepts: ["journey", "transformation", "destiny", "immersion", "identity", "purpose"],
  },
  {
    id: "everyday-things",
    title: "Design of Everyday Things",
    author: "Donald Norman",
    status: "queue",
    progress: 0,
    rating: null,
    category: "design",
    started: null,
    finished: null,
    coverColor: "#f9c6d0",
    note: "",
    environment: null,
    concepts: ["design", "affordances", "usability", "cognition", "systems", "human behavior"],
  },
  {
    id: "mastery",
    title: "Mastery",
    author: "Robert Greene",
    status: "queue",
    progress: 0,
    rating: null,
    category: "self-improvement",
    started: null,
    finished: null,
    coverColor: "#ffe0b2",
    note: "",
    environment: null,
    concepts: ["mastery", "learning", "focus", "building", "transformation", "purpose"],
  },
];

const mockActivity: ActivityItem[] = [
  { text: "Finished The Picture of Dorian Gray", time: "May 12", type: "finish", detail: "Finished in 14 days · rated 4★" },
  { text: "Started Flow", time: "May 14", type: "start", detail: "Psychology · target: end of May" },
  { text: "Reached 67% of Envisioning Information", time: "May 24", type: "progress", detail: "Up from 40% · on pace" },
  { text: "Added Mastery to antilibrary", time: "May 27", type: "add", detail: "Robert Greene · self-improvement" },
  { text: "Reached 42% of Flow", time: "May 28", type: "progress", detail: "42% complete · 3 sessions this week" },
];

const categoryColors: Record<string, CategoryConfig> = {
  design: { bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400", border: "border-violet-500/30" },
  psychology: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/30" },
  fiction: { bg: "bg-pink-500/10", text: "text-pink-600 dark:text-pink-400", border: "border-pink-500/30" },
  business: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/30" },
  "self-improvement": { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/30" },
};

const ACTIVITY_COLORS: Record<ActivityType, string> = {
  finish: "text-primary border-primary/30 bg-primary/10",
  start: "text-blue-500 border-blue-500/30 bg-blue-500/10",
  progress: "text-amber-500 border-amber-500/30 bg-amber-500/10",
  add: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10",
};

const ACTIVITY_ICONS: Record<ActivityType, string> = {
  finish: "✓",
  start: "▶",
  progress: "◎",
  add: "+",
};

const TABS = ["reading", "finished", "up next", "graph", "activity"] as const;
type Tab = (typeof TABS)[number];

function CategoryBadge({ category }: { category: string }) {
  const c = categoryColors[category] ?? { bg: "bg-secondary", text: "text-muted-foreground", border: "border-border" };
  return <span className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[10px] whitespace-nowrap", c.bg, c.text, c.border)}>{category}</span>;
}

function Stars({ rating }: { rating: number | null }) {
  if (!rating) return null;
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={cn("text-[11px]", s <= rating ? "text-primary" : "text-border")}>
          ★
        </span>
      ))}
    </div>
  );
}

function BookSpine({ color, height = 56 }: { color: string; height?: number }) {
  return <div className="rounded-sm flex-shrink-0" style={{ width: 10, height, background: color, boxShadow: "inset -2px 0 4px rgba(0,0,0,0.12)" }} />;
}

function EnvTag({ env }: { env: string | null }) {
  if (!env) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {env.split("·").map((p, i) => (
        <span key={i} className="font-mono text-[10px] text-muted-foreground bg-secondary/60 border border-border/40 rounded-md px-1.5 py-0.5">
          {p.trim()}
        </span>
      ))}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 rounded-full bg-secondary/60 overflow-hidden">
      <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-700" style={{ width: `${value}%` }} />
    </div>
  );
}

function ConnectionsGraph({ books }: { books: Book[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selected, setSelected] = useState<Book | null>(null);
  const nodesRef = useRef<any[]>([]);
  const animRef = useRef<number | null>(null);
  const tickRef = useRef(0);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const dragNode = useRef<any>(null);
  const hoveredId = useRef<string | null>(null);
  const selectedRef = useRef<Book | null>(null);
  const W = 640,
    H = 400;

  const getConnections = useCallback(() => {
    const edges: { source: string; target: string; shared: string[]; strength: number }[] = [];
    for (let i = 0; i < books.length; i++) {
      for (let j = i + 1; j < books.length; j++) {
        const a = books[i],
          b = books[j];
        const shared = a.concepts.filter((c) => b.concepts.includes(c));
        if (shared.length > 0) edges.push({ source: a.id, target: b.id, shared, strength: shared.length });
      }
    }
    return edges;
  }, [books]);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    const edges = getConnections();
    const connectionCount: Record<string, number> = {};
    books.forEach((b) => {
      connectionCount[b.id] = edges.filter((e) => e.source === b.id || e.target === b.id).length;
    });

    nodesRef.current = books.map((book, i) => ({
      ...book,
      x: W / 2 + Math.cos((i / books.length) * Math.PI * 2) * 180,
      y: H / 2 + Math.sin((i / books.length) * Math.PI * 2) * 140,
      vx: 0,
      vy: 0,
      connections: connectionCount[book.id],
    }));
    tickRef.current = 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const simulate = () => {
      tickRef.current++;
      const damping = Math.max(0.3, 1 - tickRef.current * 0.004);
      const nodes = nodesRef.current;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x,
            dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = (2500 / (dist * dist)) * damping;
          nodes[i].vx -= (dx / dist) * force;
          nodes[i].vy -= (dy / dist) * force;
          nodes[j].vx += (dx / dist) * force;
          nodes[j].vy += (dy / dist) * force;
        }
      }
      edges.forEach((e) => {
        const src = nodes.find((n: any) => n.id === e.source);
        const tgt = nodes.find((n: any) => n.id === e.target);
        if (!src || !tgt) return;
        const dx = tgt.x - src.x,
          dy = tgt.y - src.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const target = 140 - e.strength * 12;
        const force = (dist - target) * 0.03 * damping;
        src.vx += (dx / dist) * force;
        src.vy += (dy / dist) * force;
        tgt.vx -= (dx / dist) * force;
        tgt.vy -= (dy / dist) * force;
      });
      nodes.forEach((n: any) => {
        if (dragNode.current?.id === n.id) return;
        n.vx += (W / 2 - n.x) * 0.008 * damping;
        n.vy += (H / 2 - n.y) * 0.008 * damping;
        n.vx *= 0.78;
        n.vy *= 0.78;
        n.x += n.vx;
        n.y += n.vy;
        n.x = Math.max(40, Math.min(W - 40, n.x));
        n.y = Math.max(40, Math.min(H - 40, n.y));
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const nodes = nodesRef.current;
      const sel = selectedRef.current;
      edges.forEach((e) => {
        const src = nodes.find((n: any) => n.id === e.source);
        const tgt = nodes.find((n: any) => n.id === e.target);
        if (!src || !tgt) return;
        const highlighted = sel && (sel.id === e.source || sel.id === e.target);
        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.lineTo(tgt.x, tgt.y);
        ctx.strokeStyle = highlighted ? "oklch(75.792% 0.13736 296.393 / 0.6)" : "oklch(75.792% 0.13736 296.393 / 0.1)";
        ctx.lineWidth = highlighted ? e.strength * 1.5 : 1;
        ctx.stroke();
        if (highlighted && e.shared.length > 0) {
          ctx.font = "9px monospace";
          ctx.fillStyle = "oklch(75.792% 0.13736 296.393 / 0.8)";
          ctx.textAlign = "center";
          ctx.fillText(e.shared[0], (src.x + tgt.x) / 2, (src.y + tgt.y) / 2 - 4);
        }
      });
      nodes.forEach((node: any) => {
        const r = 14 + node.connections * 3;
        const isSel = sel?.id === node.id;
        const isHov = hoveredId.current === node.id;
        const isConnected = sel && edges.some((e) => (e.source === sel.id && e.target === node.id) || (e.target === sel.id && e.source === node.id));
        ctx.globalAlpha = sel ? (isSel || isConnected ? 1 : 0.2) : 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.coverColor || "#a8d8ea";
        ctx.fill();
        ctx.strokeStyle = isSel ? "oklch(75.792% 0.13736 296.393)" : isHov ? "oklch(75.792% 0.13736 296.393 / 0.6)" : "rgba(0,0,0,0.1)";
        ctx.lineWidth = isSel ? 2.5 : 1.5;
        ctx.stroke();
        ctx.font = `${isSel ? "bold " : ""}10px monospace`;
        ctx.fillStyle = "#1a1a2e";
        ctx.textAlign = "center";
        const words = node.title.split(" ");
        let line = "",
          lines: string[] = [];
        words.forEach((w: string) => {
          const t = line + (line ? " " : "") + w;
          if (ctx.measureText(t).width > 80) {
            lines.push(line);
            line = w;
          } else line = t;
        });
        lines.push(line);
        lines.forEach((l, li) => ctx.fillText(l, node.x, node.y + r + 12 + li * 11));
        ctx.globalAlpha = 1;
      });
    };

    const loop = () => {
      simulate();
      draw();
      animRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [books, getConnections]);

  const getNodeAt = (x: number, y: number) => nodesRef.current.find((n: any) => Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2) < 14 + n.connections * 3);

  const toCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: (e.clientX - rect.left) * (W / rect.width), y: (e.clientY - rect.top) * (H / rect.height) };
  };

  const edges = getConnections();
  const selEdges = selected ? edges.filter((e) => e.source === selected.id || e.target === selected.id) : [];

  return (
    <div className="space-y-4">
      <p className="font-mono text-xs text-muted-foreground">Books connected by shared concepts. Click a node to explore. Drag to rearrange.</p>
      <div className="relative rounded-xl overflow-hidden border border-border/40 bg-secondary/20">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="w-full block"
          style={{ cursor: "default" }}
          onMouseMove={(e) => {
            const { x, y } = toCanvas(e);
            if (isDragging.current && dragNode.current) {
              dragNode.current.x = x;
              dragNode.current.y = y;
              dragNode.current.vx = 0;
              dragNode.current.vy = 0;
              dragMoved.current = true;
              canvasRef.current!.style.cursor = "grabbing";
            } else {
              const node = getNodeAt(x, y);
              hoveredId.current = node ? node.id : null;
              canvasRef.current!.style.cursor = node ? "pointer" : "default";
            }
          }}
          onMouseDown={(e) => {
            const { x, y } = toCanvas(e);
            const node = getNodeAt(x, y);
            if (node) {
              isDragging.current = true;
              dragMoved.current = false;
              dragNode.current = nodesRef.current.find((n: any) => n.id === node.id);
            }
          }}
          onMouseUp={(e) => {
            const { x, y } = toCanvas(e);
            if (!dragMoved.current) {
              const node = getNodeAt(x, y);
              if (node) setSelected((s) => (s?.id === node.id ? null : node));
            }
            isDragging.current = false;
            dragMoved.current = false;
            dragNode.current = null;
          }}
          onMouseLeave={() => {
            hoveredId.current = null;
            isDragging.current = false;
            dragNode.current = null;
          }}
        />
      </div>

      {selected && (
        <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 space-y-3">
          <div className="flex items-center gap-3">
            <BookSpine color={selected.coverColor} height={32} />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{selected.title}</p>
              <p className="font-mono text-[11px] text-muted-foreground">{selected.author}</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground text-lg leading-none">
              ×
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selected.concepts.map((c) => (
              <span key={c} className="font-mono text-[10px] rounded-full border border-primary/20 bg-primary/8 text-primary px-2 py-0.5">
                {c}
              </span>
            ))}
          </div>
          {selEdges.length > 0 && (
            <div className="space-y-2">
              <p className="font-mono text-[10px] text-muted-foreground">connects to:</p>
              {selEdges.map((e) => {
                const otherId = e.source === selected.id ? e.target : e.source;
                const other = books.find((b) => b.id === otherId);
                if (!other) return null;
                return (
                  <div key={otherId} className="flex items-center gap-3 rounded-lg border border-border/40 bg-card/40 px-3 py-2">
                    <BookSpine color={other.coverColor} height={20} />
                    <span className="text-xs font-medium flex-1">{other.title}</span>
                    <span className="font-mono text-[10px] text-primary">via: {e.shared.join(", ")}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ContribGraph({ books }: { books: Book[] }) {
  const finished = books.filter((b) => b.status === "done");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthData = months.map((m, i) => ({
    month: m,
    count: finished.filter((b) => b.finished && new Date(b.finished).getMonth() === i).length,
    books: finished.filter((b) => b.finished && new Date(b.finished).getMonth() === i),
  }));
  const maxCount = Math.max(...monthData.map((m) => m.count), 1);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs text-muted-foreground">books finished · {new Date().getFullYear()}</p>
        <p className="font-mono text-xs text-primary">{finished.length} books total</p>
      </div>

      <div className="grid grid-cols-12 gap-1.5">
        {monthData.map((m, i) => (
          <div key={m.month} className="cursor-pointer" onMouseEnter={() => m.count > 0 && setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <div
              className={cn("h-12 rounded-lg border flex items-center justify-center transition-all duration-150", hovered === i ? "border-primary" : "border-border/40")}
              style={{ background: m.count === 0 ? undefined : `oklch(75.792% 0.13736 296.393 / ${0.12 + (m.count / maxCount) * 0.6})`, backgroundColor: m.count === 0 ? "rgba(0,0,0,0.03)" : undefined }}
            >
              {m.count > 0 && <span className="font-bold text-base text-primary">{m.count}</span>}
            </div>
            <p className="font-mono text-[9px] text-muted-foreground text-center mt-1">{m.month}</p>
          </div>
        ))}
      </div>

      {hovered !== null && monthData[hovered].books.length > 0 && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 space-y-2">
          <p className="font-mono text-[10px] text-primary">
            {months[hovered]} {new Date().getFullYear()}
          </p>
          {monthData[hovered].books.map((b) => (
            <div key={b.id} className="flex items-center gap-2">
              <BookSpine color={b.coverColor} height={20} />
              <span className="text-xs">{b.title}</span>
              <Stars rating={b.rating} />
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <p className="font-mono text-[10px] text-muted-foreground">shelf · all books</p>
        <div className="flex items-end gap-0.5 px-4 py-3 rounded-lg border border-border/40 bg-secondary/20 overflow-x-auto">
          {books.map((b) => (
            <div key={b.id} title={b.title}>
              <div
                className="rounded-t-sm"
                style={{
                  width: 14,
                  height: 32 + (b.status === "done" ? 20 : b.status === "reading" ? 10 : 0),
                  background: b.coverColor,
                  opacity: b.status === "queue" ? 0.4 : 1,
                  boxShadow: "inset -2px 0 4px rgba(0,0,0,0.12)",
                  border: b.status === "reading" ? "2px solid oklch(75.792% 0.13736 296.393)" : "1px solid rgba(0,0,0,0.1)",
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          {[
            { label: "finished", cls: "bg-primary/70" },
            { label: "reading", cls: "bg-primary/35" },
            { label: "queue", cls: "bg-secondary" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={cn("w-2.5 h-2.5 rounded-sm", l.cls)} />
              <span className="font-mono text-[10px] text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ReadingTracker({ books: booksProp }: ReadingTrackerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tab, setTab] = useState<Tab>("reading");
  const [fetchedBooks, setFetchedBooks] = useState<Book[] | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/reading")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.length > 0) setFetchedBooks(data);
      })
      .catch(() => {});
  }, []);

  const books = fetchedBooks ?? (booksProp && booksProp.length > 0 ? booksProp : mockBooks);
  const currentlyReading = books.filter((b) => b.status === "reading");
  const finished = books.filter((b) => b.status === "done");
  const queue = books.filter((b) => b.status === "queue");

  const rated = finished.filter((b) => b.rating);
  const avgRating = rated.length > 0 ? (rated.reduce((a, b) => a + (b.rating ?? 0), 0) / rated.length).toFixed(1) + "★" : "-";
  const pagesThisWeek = Math.round(currentlyReading.reduce((a, b) => a + b.progress * 3, 0));
  const genreCounts: Record<string, number> = {};
  finished.forEach((b) => {
    genreCounts[b.category] = (genreCounts[b.category] ?? 0) + 1;
  });
  const topGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";

  const stats = [
    { label: "books this year", value: finished.length },
    { label: "reading", value: currentlyReading.length },
    { label: "antilibrary", value: queue.length },
    { label: "avg rating", value: avgRating },
    { label: "pages / week", value: pagesThisWeek },
    { label: "day streak", value: "12🔥" },
    { label: "top genre", value: topGenre },
  ];

  return (
    <section ref={ref} className="relative px-4 sm:px-6 pt-16 sm:pt-16 pb-8 sm:pb-12">
      <div className={cn("mx-auto w-full max-w-7xl opacity-0", isVisible && "animate-fade-in-up")}>
        {/* Header - matches PhotoDumps exactly */}
        <div className="space-y-2 mb-8">
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">currently reading;</p>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Reading Tracker</h2>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-primary bg-primary/10 border border-primary/25 rounded-full px-2.5 py-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              live
            </span>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">What I'm reading, finished, and connections between them</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 mb-8">
          {stats.map((s, i) => (
            <div key={s.label} className={cn("rounded-xl border border-border/60 bg-card/40 glass px-3 py-3 text-center opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: `${i * 50}ms` }}>
              <p className="text-lg font-bold text-primary mb-0.5">{s.value}</p>
              <p className="font-mono text-[9px] text-muted-foreground leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-secondary/40 rounded-xl p-1 w-fit">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn("px-3.5 py-1.5 rounded-lg font-mono text-xs tracking-wide transition-all duration-150", tab === t ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "reading" && (
          <div className="flex flex-col gap-4">
            {currentlyReading.length === 0 && <p className="font-mono text-xs text-muted-foreground">Nothing currently reading.</p>}
            {currentlyReading.map((book, i) => (
              <div key={book.id} className={cn("rounded-xl border border-border/60 bg-card/40 glass p-5 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex gap-4 items-start">
                  <BookSpine color={book.coverColor} height={64} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div>
                        <p className="font-semibold text-sm">{book.title}</p>
                        <p className="font-mono text-[11px] text-muted-foreground">{book.author}</p>
                      </div>
                      <CategoryBadge category={book.category} />
                    </div>
                    <div className="my-3 space-y-1">
                      <div className="flex justify-between mb-1.5">
                        <span className="font-mono text-[10px] text-muted-foreground">progress</span>
                        <span className="font-mono text-[10px] text-primary font-semibold">{book.progress}%</span>
                      </div>
                      <ProgressBar value={book.progress} />
                    </div>
                    <EnvTag env={book.environment} />
                    {book.note && (
                      <div className="mt-3 px-3 py-2 border-l-[3px] border-primary/35 bg-primary/5 rounded-r-lg">
                        <p className="text-xs text-muted-foreground italic leading-relaxed">&ldquo;{book.note}&rdquo;</p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {book.concepts.slice(0, 4).map((c) => (
                        <span key={c} className="font-mono text-[9px] rounded-full border border-primary/15 bg-primary/7 text-primary px-2 py-0.5">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "finished" && (
          <div className="flex flex-col gap-3">
            {finished.map((book, i) => (
              <div key={book.id} className={cn("rounded-xl border border-border/60 bg-card/40 glass p-4 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-center gap-4">
                  <BookSpine color={book.coverColor} height={44} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm mb-0.5">{book.title}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{book.author}</p>
                    {book.environment && <EnvTag env={book.environment} />}
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <Stars rating={book.rating} />
                    <CategoryBadge category={book.category} />
                    <span className="font-mono text-[10px] text-muted-foreground">{book.finished}</span>
                  </div>
                </div>
                {book.note && (
                  <div className="mt-3 px-3 py-2 border-l-[3px] border-primary/25 bg-primary/4 rounded-r-lg">
                    <p className="text-xs text-muted-foreground italic">&ldquo;{book.note}&rdquo;</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "up next" && (
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs text-muted-foreground mb-1">antilibrary - books queued up</p>
            {queue.map((book, i) => (
              <div key={book.id} className={cn("rounded-xl border border-border/60 bg-card/40 glass p-4 flex items-center gap-4 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: `${i * 60}ms` }}>
                <span className="font-mono text-xl font-bold text-primary/20 w-7 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <BookSpine color={book.coverColor} height={44} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm mb-0.5">{book.title}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">{book.author}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {book.concepts.slice(0, 3).map((c) => (
                      <span key={c} className="font-mono text-[9px] rounded-full border border-primary/15 bg-primary/7 text-primary px-2 py-0.5">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <CategoryBadge category={book.category} />
              </div>
            ))}
          </div>
        )}

        {tab === "graph" && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-border/60 bg-card/40 glass p-5">
              <p className="font-semibold text-sm mb-4">Connections Graph</p>
              <ConnectionsGraph books={books} />
            </div>
            <div className="rounded-xl border border-border/60 bg-card/40 glass p-5">
              <p className="font-semibold text-sm mb-4">Year in Books</p>
              <ContribGraph books={books} />
            </div>
          </div>
        )}

        {tab === "activity" && (
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-5">recent reading activity</p>
            <div className="flex flex-col gap-0">
              {mockActivity.map((item, i) => (
                <div key={i} className="flex gap-4 items-start pb-5 relative">
                  {i < mockActivity.length - 1 && <div className="absolute left-[13px] top-7 bottom-0 w-px bg-border/40" />}
                  <div className={cn("w-6 h-6 rounded-full border flex items-center justify-center font-mono text-[11px] font-bold flex-shrink-0 z-10 mt-0.5", ACTIVITY_COLORS[item.type])}>{ACTIVITY_ICONS[item.type]}</div>
                  <div className="pt-0.5">
                    <p className="text-sm font-medium mb-0.5">{item.text}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{item.time}</p>
                    {item.detail && <p className="font-mono text-[10px] text-muted-foreground/60 mt-0.5">{item.detail}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
