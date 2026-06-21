"use client";
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, ExternalLink, Eye, FlaskConical, Lightbulb, Monitor, Puzzle, Wrench, Zap } from "lucide-react";
import { cn } from "@/src/lib/core-features/utils";
import { useEffect, useRef, useState } from "react";

function useVisible(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

// Tools I'm testing
type ToolVerdict = "keeping" | "testing" | "dropped" | "maybe";

type Tool = {
  id: string;
  name: string;
  category: string;
  url: string;
  startedTesting: string;
  verdict: ToolVerdict;
  what: string;
  why: string;
  verdict_note: string;
  rating?: number;
  replaces?: string;
};

const VERDICT_CONFIG: Record<ToolVerdict, { label: string; pill: string; dot: string }> = {
  keeping: { label: "keeping", pill: "border-green-500/30 bg-green-500/8 text-green-500", dot: "bg-green-500" },
  testing: { label: "testing", pill: "border-yellow-500/30 bg-yellow-500/8 text-yellow-500", dot: "bg-yellow-500 animate-pulse" },
  dropped: { label: "dropped", pill: "border-red-500/30 bg-red-500/8 text-red-400", dot: "bg-red-400" },
  maybe: { label: "maybe", pill: "border-blue-500/30 bg-blue-500/8 text-blue-400", dot: "bg-blue-400" },
};

const tools: Tool[] = [
  {
    id: "anki",
    name: "Anki",
    category: "Learning",
    url: "https://apps.ankiweb.net",
    startedTesting: "Jan 2026",
    verdict: "keeping",
    what: "Spaced repetition flashcard system. Open source, algorithm-driven review scheduling.",
    why: "Testing for Japanese kanji retention. Wanted to know if SRS actually works vs. just feeling productive.",
    verdict_note: "It works. Retention at 4 weeks is noticeably better than passive review. The UI is terrible but the algorithm earns its place.",
    rating: 8,
    replaces: "Duolingo for serious vocab work",
  },
  {
    id: "raycast",
    name: "Raycast",
    category: "Productivity",
    url: "https://raycast.com",
    startedTesting: "Feb 2026",
    verdict: "keeping",
    what: "macOS launcher / command palette. Replaces Spotlight with extensible plugin system.",
    why: "Saw it mentioned in too many developer setups to ignore. Wanted to see if it actually saved time or just felt faster.",
    verdict_note: "Window management + clipboard history alone justified it. The extensions ecosystem is genuinely useful. Switched permanently within a week.",
    rating: 9,
    replaces: "Spotlight, clipboard manager",
  },
  {
    id: "arc",
    name: "Arc Browser",
    category: "Browser",
    url: "https://arc.net",
    startedTesting: "Mar 2026",
    verdict: "testing",
    what: "Chromium-based browser with a radically different tab and space management model.",
    why: "Chrome tab overload was real. Wanted to test if spatial organization of tabs actually reduces context-switching cost.",
    verdict_note: "The space model is genuinely good for separating contexts (school / personal / research). Still adjusting to the sidebar. Verdict pending another few weeks.",
    rating: 7,
  },
  {
    id: "linear",
    name: "Linear",
    category: "Project Management",
    url: "https://linear.app",
    startedTesting: "Jan 2026",
    verdict: "maybe",
    what: "Issue tracker with a keyboard-first design philosophy and strong opinionated UX.",
    why: "Testing for hackathon organizing - wanted something faster than Notion for tracking organizer tasks.",
    verdict_note: "The speed is real, keyboard shortcuts are excellent. But it's overkill for a team of 12 running an event twice a year. Might revisit for research project tracking.",
    replaces: "Notion task views",
  },
  {
    id: "obsidian",
    name: "Obsidian",
    category: "Note-taking",
    url: "https://obsidian.md",
    startedTesting: "Nov 2025",
    verdict: "dropped",
    what: "Local-first markdown note editor with graph view and plugin ecosystem.",
    why: "Wanted a second brain / digital garden tool. Tested for 3 months as a Notion replacement for personal notes.",
    verdict_note: "The graph view is beautiful and mostly useless in practice. Maintenance overhead (plugins breaking, vault organization) cost more time than it saved. Went back to Notion for notes, kept it only for literature review files.",
    rating: 5,
    replaces: "Nothing - returned to Notion",
  },
  {
    id: "warp",
    name: "Warp Terminal",
    category: "Dev Tools",
    url: "https://warp.dev",
    startedTesting: "Feb 2026",
    verdict: "keeping",
    what: "Modern terminal with block-based output, AI command suggestions, and shared runbooks.",
    why: "Testing whether a better terminal actually improves workflow or is just aesthetics.",
    verdict_note: "Block-based output makes scanning build logs much faster. AI suggestions are occasionally useful, mostly ignorable. The UX improvements are real, not just visual.",
    rating: 8,
    replaces: "iTerm2",
  },
];

const TOOL_CATEGORIES = ["All", ...Array.from(new Set(tools.map((t) => t.category)))];
const TOOL_VERDICTS: { value: ToolVerdict | "all"; label: string }[] = [
  { value: "all", label: "all" },
  { value: "keeping", label: "keeping" },
  { value: "testing", label: "testing" },
  { value: "maybe", label: "maybe" },
  { value: "dropped", label: "dropped" },
];

export function ToolsTesting() {
  const { ref, isVisible } = useVisible();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVerdict, setActiveVerdict] = useState<ToolVerdict | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = tools.filter((t) => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchVerdict = activeVerdict === "all" || t.verdict === activeVerdict;
    return matchCat && matchVerdict;
  });

  return (
    <section ref={ref} className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-10 sm:mb-14 space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">active experiments;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Tools I'm Testing ⚗</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">Software and methods I'm actively evaluating - what I'm trying, whether it's working, and what I've dropped</p>
        </div>

        {/* summary row */}
        <div className={cn("mb-8 flex flex-wrap gap-4 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "80ms" }}>
          {(["keeping", "testing", "maybe", "dropped"] as ToolVerdict[]).map((v) => {
            const cfg = VERDICT_CONFIG[v];
            const count = tools.filter((t) => t.verdict === v).length;
            return (
              <div key={v} className="flex items-center gap-2">
                <span className={cn("h-2 w-2 rounded-full", cfg.dot)} />
                <span className="font-mono text-xs text-muted-foreground">
                  {count} {cfg.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* filters */}
        <div className={cn("mb-8 space-y-3 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "120ms" }}>
          <div className="flex flex-wrap gap-2">
            {TOOL_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-mono text-xs tracking-wider transition-all duration-200",
                  activeCategory === c ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-foreground/50 hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                {c.toLowerCase()}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {TOOL_VERDICTS.map((v) => {
              const cfg = v.value !== "all" ? VERDICT_CONFIG[v.value] : null;
              return (
                <button
                  key={v.value}
                  onClick={() => setActiveVerdict(v.value)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all duration-200",
                    activeVerdict === v.value ? "border-primary/50 bg-primary/10 text-primary" : "border-border/60 bg-secondary/40 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  {cfg && <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />}
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* tool cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool, i) => {
            const cfg = VERDICT_CONFIG[tool.verdict];
            const isOpen = expanded === tool.id;
            return (
              <article
                key={tool.id}
                className={cn(
                  "group relative overflow-hidden rounded-xl border bg-card/40 glass transition-all duration-300 opacity-0",
                  isVisible && "animate-fade-in-up",
                  isOpen ? "border-primary/30 sm:col-span-2 lg:col-span-1" : "border-border/60 hover:border-primary/20",
                  tool.verdict === "dropped" && "opacity-70",
                )}
                style={{ animationDelay: `${i * 60 + 150}ms` }}
              >
                <button onClick={() => setExpanded(isOpen ? null : tool.id)} className="flex w-full flex-col gap-3 p-5 sm:p-6 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={cn("font-bold tracking-tight transition-colors", isOpen ? "text-primary" : "text-foreground group-hover:text-primary")}>{tool.name}</h3>
                        <a href={tool.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground/40 hover:text-primary transition-colors">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                      <p className="font-mono text-[10px] text-muted-foreground">
                        {tool.category} · since {tool.startedTesting}
                      </p>
                    </div>
                    <span className={cn("shrink-0 flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-wider", cfg.pill)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />
                      {cfg.label}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-muted-foreground">{tool.what}</p>

                  {tool.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 10 }).map((_, j) => (
                          <div key={j} className={cn("h-1 w-3 rounded-full transition-colors", j < tool.rating! ? "bg-primary" : "bg-secondary")} />
                        ))}
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground">{tool.rating}/10</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground mt-auto">
                    {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    {isOpen ? "collapse" : "my verdict"}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-border/40 px-5 sm:px-6 pb-5 pt-4 space-y-3 animate-fade-in-up">
                    <div className="space-y-1">
                      <p className="font-mono text-[10px] tracking-widest text-muted-foreground">why i tested it</p>
                      <p className="text-xs leading-relaxed text-foreground/80">{tool.why}</p>
                    </div>
                    <div className="rounded-md border-l-2 border-primary/40 bg-primary/5 pl-3 py-2">
                      <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1">verdict</p>
                      <p className="text-xs leading-relaxed text-foreground/80">{tool.verdict_note}</p>
                    </div>
                    {tool.replaces && (
                      <p className="font-mono text-[10px] text-muted-foreground">
                        replaces: <span className="text-foreground/60">{tool.replaces}</span>
                      </p>
                    )}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
