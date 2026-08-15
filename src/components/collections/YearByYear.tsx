"use client";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { cn } from "@/src/lib/core-features/utils";
import { projects } from "@/src/lib/main-pages/projects-data";
import { useEffect, useRef, useState } from "react";

// Year data
interface YearHighlight {
  year: string;
  headline: string;
  subline: string;
  milestones: { emoji: string; label: string; detail: string }[];
  theme: string;
  color: { bg: string; border: string; accent: string; text: string };
}

const YEAR_DATA: YearHighlight[] = [
  {
    year: "2026",
    headline: "building in public",
    subline: "president, director, founder - all at once",
    theme: "The year of doing too many things and learning which ones matter.",
    milestones: [
      { emoji: "👑", label: "ACM President", detail: "Leading the largest CS org at UCR" },
      { emoji: "🍊", label: "Citrus Hack director", detail: "Directed spring hackathon, 200+ hackers" },
      { emoji: "🔬", label: "Avenix Labs", detail: "Founded an independent research collective" },
      { emoji: "🌐", label: "Portfolio v3", detail: "The one you're on right now" },
      { emoji: "📖", label: "Drenith magazine", detail: "HCI + space design editorial launch" },
    ],
    color: { bg: "bg-primary/5", border: "border-primary/20", accent: "#7F77DD", text: "text-primary" },
  },
  {
    year: "2025",
    headline: "research + systems",
    subline: "going deeper on HCI and space interfaces",
    theme: "Traded breadth for depth. Fewer projects, more conviction.",
    milestones: [
      { emoji: "🛸", label: "NASA L'SPACE", detail: "Lead Systems Engineer on mission concept" },
      { emoji: "🧠", label: "HCI research begins", detail: "Cognitive load in high-stakes interfaces" },
      { emoji: "⬡", label: "Parallel graph work", detail: "Lock-free BFS/SSSP in C++" },
      { emoji: "🌸", label: "Cutie Hack co-director", detail: "Launched fall hackathon at UCR" },
      { emoji: "📚", label: "20+ books", detail: "Design, systems, cognition, language" },
    ],
    color: {
      bg: "bg-emerald-500/5",
      border: "border-emerald-500/20",
      accent: "#1D9E75",
      text: "text-emerald-600 dark:text-emerald-400",
    },
  },
  {
    year: "2024",
    headline: "first ships",
    subline: "going from 0 to deployed for the first time",
    theme: "The year everything clicked that software is just building things people use.",
    milestones: [
      { emoji: "🚀", label: "First deployment", detail: "Assistify - live on the web" },
      { emoji: "🤖", label: "Eevi", detail: "The 0→1 software tool" },
      { emoji: "🛒", label: "PantryPilot", detail: "ML-powered grocery streamlining" },
      { emoji: "🍵", label: "Tea log started", detail: "31-day streak, never stopped" },
      { emoji: "🗣️", label: "Language learning", detail: "Vietnamese, Japanese, Korean all at once" },
    ],
    color: {
      bg: "bg-pink-500/5",
      border: "border-pink-500/20",
      accent: "#ED93B1",
      text: "text-pink-600 dark:text-pink-400",
    },
  },
  {
    year: "2023",
    headline: "finding the thread",
    subline: "CS meets design meets space",
    theme: "Discovered HCI as the thing that connected all the other things.",
    milestones: [
      { emoji: "📊", label: "ShelfSense", detail: "Data analysis for reading insights" },
      { emoji: "📶", label: "QR Connect", detail: "WiFi QR code generator in Python" },
      { emoji: "🔭", label: "Space interest begins", detail: "Started following space systems design" },
      { emoji: "🎨", label: "Design systems", detail: "First deep dive into tokens and typography" },
      { emoji: "🌱", label: "Open source", detail: "First contributions to open source" },
    ],
    color: {
      bg: "bg-amber-500/5",
      border: "border-amber-500/20",
      accent: "#EF9F27",
      text: "text-amber-600 dark:text-amber-400",
    },
  },
];

// Project card
function YearProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 p-4 hover:border-primary/20 hover:bg-card/70 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-medium text-sm leading-tight">{project.title}</h4>
        <div className="flex items-center gap-2 shrink-0">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
              <Github className="h-3.5 w-3.5" />
            </a>
          )}
          {project.homepage && (
            <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-2">{project.description}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 font-mono text-[9px]",
            project.status === "shipped"
              ? "bg-primary/10 text-primary border-primary/30"
              : project.status === "in progress"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                : project.status === "ideation"
                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
                  : "bg-border/40 text-muted-foreground border-border/30",
          )}
        >
          {project.status}
        </span>
        {project.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="font-mono text-[9px] text-muted-foreground/70">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// Main
export function YearByYear() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeYear, setActiveYear] = useState(0); // index into YEAR_DATA
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

  const yearInfo = YEAR_DATA[activeYear];
  const yearProjects = projects.filter((p) => p.year === yearInfo.year);
  const shippedCount = yearProjects.filter((p) => p.status === "shipped").length;

  return (
    <section ref={ref} className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-10 sm:mb-14 space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">archive;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Year by Year</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">A personal annual review - what I built, learned, shipped, and led each year</p>
        </div>

        <div className={cn("opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "150ms" }}>
          {/* Year selector */}
          <div className="flex items-center gap-2 mb-8">
            <button
              onClick={() => setActiveYear((i) => Math.min(YEAR_DATA.length - 1, i + 1))}
              disabled={activeYear === YEAR_DATA.length - 1}
              className="rounded-full border border-border/60 p-1.5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-2">
              {YEAR_DATA.map((y, i) => (
                <button
                  key={y.year}
                  onClick={() => setActiveYear(i)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 font-mono text-sm font-bold transition-all duration-200",
                    i === activeYear ? cn(yearInfo.color.bg, yearInfo.color.border, yearInfo.color.text) : "border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  {y.year}
                </button>
              ))}
            </div>

            <button
              onClick={() => setActiveYear((i) => Math.max(0, i - 1))}
              disabled={activeYear === 0}
              className="rounded-full border border-border/60 p-1.5 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Year content */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            {/* Left - headline + milestones */}
            <div className={cn("rounded-2xl border p-6 space-y-5 transition-all duration-300", yearInfo.color.bg, yearInfo.color.border)}>
              <div>
                <p className={cn("font-mono text-xs tracking-wider mb-1", yearInfo.color.text)}>{yearInfo.year}</p>
                <h3 className="text-2xl font-bold tracking-tight mb-1">{yearInfo.headline}</h3>
                <p className="text-sm text-muted-foreground">{yearInfo.subline}</p>
              </div>

              <div className={cn("rounded-xl border px-4 py-3 font-mono text-xs italic text-muted-foreground", yearInfo.color.border, "bg-card/40")}>"{yearInfo.theme}"</div>

              <div className="space-y-2">
                <p className="font-mono text-[11px] text-muted-foreground tracking-wider">highlights;</p>
                {yearInfo.milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/40 px-3 py-2.5">
                    <span className="text-lg shrink-0 leading-none mt-0.5">{m.emoji}</span>
                    <div>
                      <p className="font-medium text-sm">{m.label}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">{m.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="text-center rounded-xl border border-border/40 bg-card/40 py-3">
                  <p className="text-xl font-bold">{yearProjects.length}</p>
                  <p className="font-mono text-[9px] text-muted-foreground mt-0.5">projects</p>
                </div>
                <div className="text-center rounded-xl border border-border/40 bg-card/40 py-3">
                  <p className="text-xl font-bold">{shippedCount}</p>
                  <p className="font-mono text-[9px] text-muted-foreground mt-0.5">shipped</p>
                </div>
                <div className="text-center rounded-xl border border-border/40 bg-card/40 py-3">
                  <p className="text-xl font-bold">{yearInfo.milestones.length}</p>
                  <p className="font-mono text-[9px] text-muted-foreground mt-0.5">milestones</p>
                </div>
              </div>
            </div>

            {/* Right - project grid */}
            <div className="space-y-3">
              <p className="font-mono text-xs text-muted-foreground tracking-wider">projects from {yearInfo.year};</p>
              {yearProjects.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {yearProjects.map((p) => (
                    <YearProjectCard key={p.id} project={p} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center rounded-2xl border border-border/40 bg-secondary/20">
                  <p className="font-mono text-sm text-muted-foreground">no projects logged for {yearInfo.year}</p>
                </div>
              )}
            </div>
          </div>

          {/* Timeline bar at bottom */}
          <div className="mt-8 flex items-center gap-3">
            <span className="font-mono text-[11px] text-muted-foreground">2023</span>
            <div className="flex-1 flex gap-1">
              {YEAR_DATA.slice()
                .reverse()
                .map((y, i) => {
                  const count = projects.filter((p) => p.year === y.year).length;
                  const maxCount = Math.max(...YEAR_DATA.map((yd) => projects.filter((p) => p.year === yd.year).length));
                  return (
                    <button
                      key={y.year}
                      onClick={() => setActiveYear(YEAR_DATA.length - 1 - i)}
                      className="flex-1 rounded-full transition-all duration-200 hover:opacity-80"
                      style={{
                        height: `${8 + (count / maxCount) * 16}px`,
                        background: y.color.accent,
                        opacity: YEAR_DATA[activeYear].year === y.year ? 1 : 0.35,
                      }}
                    />
                  );
                })}
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
