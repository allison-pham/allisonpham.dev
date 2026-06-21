"use client";
import { ArrowRight, BookOpen, ChevronDown, ChevronUp, Clock, FileText, FlaskConical, Lightbulb, Tag } from "lucide-react";
import { behindTheScenesItems, type BehindTheScenesItem, type Iteration } from "@/src/lib/behind-the-scenes-data";
import { cn } from "@/src/lib/core-features/utils";
import { useEffect, useRef, useState } from "react";

const researchItems: BehindTheScenesItem[] = behindTheScenesItems;

const STATUS_CONFIG = {
  drafting: { label: "drafting", dot: "bg-muted-foreground", pill: "border-border/60 bg-secondary/50 text-muted-foreground" },
  iterating: { label: "iterating", dot: "bg-yellow-500 animate-pulse", pill: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500" },
  refining: { label: "refining", dot: "bg-blue-500", pill: "border-blue-500/30 bg-blue-500/10 text-blue-400" },
  shipped: { label: "shipped", dot: "bg-primary", pill: "border-primary/30 bg-primary/10 text-primary" },
  archived: { label: "archived", dot: "bg-muted-foreground/50", pill: "border-border/40 bg-secondary/30 text-muted-foreground/60" },
};

const CATEGORIES = ["All", ...Array.from(new Set(researchItems.map((i) => i.category)))];

function IterationRow({ iter, isLast }: { iter: Iteration; isLast: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex gap-4">
      {/* Timeline spine */}
      <div className="flex flex-col items-center">
        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-primary bg-background" />
        {!isLast && <div className="mt-1 w-px flex-1 bg-border/50" />}
      </div>

      {/* Content */}
      <div className={cn("mb-4 flex-1 min-w-0 rounded-lg border bg-card/40 glass overflow-hidden transition-all duration-300", open ? "border-primary/30" : "border-border/50 hover:border-primary/20")}>
        <button onClick={() => setOpen((v) => !v)} className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[10px] text-primary">v{iter.version}</span>
              <span className="font-mono text-xs font-semibold text-foreground">{iter.title}</span>
            </div>
            <p className="font-mono text-[10px] text-muted-foreground">{iter.date}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 mt-0.5">
            {iter.timeSpent && (
              <span className="hidden sm:flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3" />
                {iter.timeSpent}
              </span>
            )}
            {iter.tags?.map((tag) => (
              <span key={tag} className="hidden sm:inline-flex items-center rounded-full border border-border/50 bg-secondary/40 px-2 py-0.5 font-mono text-[9px] text-muted-foreground">
                {tag}
              </span>
            ))}
            {open ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
          </div>
        </button>

        {open && (
          <div className="border-t border-border/40 px-4 pb-4 pt-3 space-y-3 animate-fade-in-up">
            <p className="text-xs leading-relaxed text-muted-foreground">{iter.description}</p>

            {iter.changes && iter.changes.length > 0 && (
              <div className="space-y-1.5">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground">changes</p>
                <ul className="space-y-1">
                  {iter.changes.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                      <span className="mt-0.5 text-primary shrink-0">+</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {iter.feedback && iter.feedback.length > 0 && (
              <div className="space-y-1.5">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground">feedback</p>
                <ul className="space-y-1">
                  {iter.feedback.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-0.5 text-primary/60 shrink-0">→</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {iter.decisionLog && (
              <div className="rounded-md border-l-2 border-primary/40 bg-primary/5 pl-3 py-2">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1">decision log</p>
                <p className="text-xs leading-relaxed text-foreground/80">{iter.decisionLog}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Research card
function ResearchCard({ item, index, isVisible }: { item: BehindTheScenesItem; index: number; isVisible: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"timeline" | "notes" | "lessons">("timeline");
  const s = STATUS_CONFIG[item.status];

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card/40 glass transition-all duration-400 opacity-0",
        isVisible && "animate-fade-in-up",
        expanded ? "border-primary/30" : "border-border/60 hover:border-primary/20",
        item.featured && "border-primary/20 bg-gradient-to-br from-primary/5 via-card/50 to-primary/5",
      )}
      style={{ animationDelay: `${index * 80 + 200}ms` }}
    >
      {/* card header */}
      <button onClick={() => setExpanded((v) => !v)} className="flex w-full items-start justify-between gap-4 p-6 sm:p-7 text-left">
        <div className="space-y-2 min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] tracking-widest text-primary">{item.category.toLowerCase()}</span>
            <span className="text-border/50">·</span>
            <span className="font-mono text-[10px] text-muted-foreground">{item.startDate}</span>
            {item.totalTime && (
              <>
                <span className="text-border/50">·</span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {item.totalTime}
                </span>
              </>
            )}
          </div>
          <h3 className={cn("font-bold tracking-tight text-lg transition-colors group-hover:text-primary", expanded && "text-primary")}>{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider", s.pill)}>
            <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
            {s.label}
          </span>
          <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
            <FlaskConical className="h-3 w-3" />
            {item.iterations.length} iterations
          </div>
          {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground mt-1" /> : <ChevronDown className="h-4 w-4 text-muted-foreground mt-1" />}
        </div>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="border-t border-border/40 animate-fade-in-up">
          {/* Tabs */}
          <div className="flex gap-0 border-b border-border/40">
            {(["timeline", "notes", "lessons"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex items-center gap-1.5 px-5 py-3 font-mono text-[11px] tracking-wider transition-all duration-200 border-b-2 -mb-px",
                  activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {tab === "timeline" && <FlaskConical className="h-3 w-3" />}
                {tab === "notes" && <FileText className="h-3 w-3" />}
                {tab === "lessons" && <Lightbulb className="h-3 w-3" />}
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-7">
            {/* Timeline tab */}
            {activeTab === "timeline" && (
              <div className="space-y-0">
                {item.iterations.map((iter, i) => (
                  <IterationRow key={iter.version} iter={iter} isLast={i === item.iterations.length - 1} />
                ))}
              </div>
            )}

            {/* Messy notes tab */}
            {activeTab === "notes" && (
              <div className="space-y-3">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground">raw notes · unfiltered</p>
                {item.messyNotes ? (
                  <pre className="whitespace-pre-wrap rounded-lg border border-border/50 bg-secondary/30 p-4 font-mono text-xs leading-relaxed text-foreground/80">{item.messyNotes}</pre>
                ) : (
                  <p className="text-sm text-muted-foreground italic">no notes yet.</p>
                )}
              </div>
            )}

            {/* Key lessons tab */}
            {activeTab === "lessons" && (
              <div className="space-y-3">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground">what i learned</p>
                {item.keyLessons && item.keyLessons.length > 0 ? (
                  <ul className="space-y-2.5">
                    {item.keyLessons.map((lesson, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-[10px] text-primary">{i + 1}</span>
                        <p className="text-sm leading-relaxed text-foreground/80">{lesson}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground italic">lessons still forming.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hover bar */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
    </article>
  );
}

// Main component
export function Research() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState<string>("all");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = researchItems.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchStatus = activeStatus === "all" || item.status === activeStatus;
    return matchCat && matchStatus;
  });

  const totalHours = researchItems.reduce((acc, item) => {
    const h = item.totalTime ? parseInt(item.totalTime.replace(/\D/g, "")) : 0;
    return acc + (isNaN(h) ? 0 : h);
  }, 0);

  return (
    <section ref={sectionRef} className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className={cn("mb-10 sm:mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">process & findings;</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Research</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">Work in progress - documenting iterations, decisions, and what actually happened</p>
          </div>

          {/* Quick stats */}
          <div className={cn("flex gap-4 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "100ms" }}>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{researchItems.length}</p>
              <p className="font-mono text-[10px] text-muted-foreground">projects</p>
            </div>
            <div className="w-px bg-border/50" />
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">~{totalHours}h</p>
              <p className="font-mono text-[10px] text-muted-foreground">total time</p>
            </div>
            <div className="w-px bg-border/50" />
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{researchItems.reduce((a, b) => a + b.iterations.length, 0)}</p>
              <p className="font-mono text-[10px] text-muted-foreground">iterations</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={cn("mb-8 space-y-3 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "150ms" }}>
          {/* Category */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-mono text-xs tracking-wider transition-all duration-200 active:scale-[0.98]",
                  activeCategory === cat ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20" : "border-border text-muted-foreground hover:border-foreground/50 hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                {cat.toLowerCase()}
              </button>
            ))}
          </div>

          {/* Status */}
          <div className="flex flex-wrap gap-2">
            {["all", "iterating", "refining", "shipped", "drafting", "archived"].map((s) => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={cn(
                  "rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all duration-200",
                  activeStatus === s ? "border-primary/50 bg-primary/10 text-primary" : "border-border/60 bg-secondary/40 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((item, i) => <ResearchCard key={item.id} item={item} index={i} isVisible={isVisible} />)
          ) : (
            <div className="py-16 text-center">
              <p className="font-mono text-sm text-muted-foreground">no research found matching those filters.</p>
            </div>
          )}
        </div>

        {/* Footer note */}
        <div className={cn("mt-8 rounded-xl border border-border/40 bg-card/30 px-6 py-4 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "400ms" }}>
          <div className="flex items-start gap-3">
            <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" />
            <p className="text-sm leading-relaxed text-muted-foreground">This is a living log - updated as research progresses. Messy notes and failed experiments included intentionally. The process is as important as the outcome.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
