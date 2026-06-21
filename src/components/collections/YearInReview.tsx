"use client";
import { BookOpen, Coffee, Globe, Rocket, Trophy, LayoutGrid, BookMarked } from "lucide-react";
import { cn } from "@/src/lib/core-features/utils";
import { useEffect, useRef, useState } from "react";

type ViewMode = "wrapped" | "editorial";

const DATA_2025 = {
  year: "2025",
  headline: "the year of shipping",
  subline: "systems built, teas brewed, languages spoken, pages turned",
  stats: [
    {
      id: "projects",
      icon: Rocket,
      label: "projects shipped",
      value: 12,
      unit: "",
      detail: "from hackathon tools to research interfaces",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/30",
      gradient: "from-primary/20 to-primary/5",
      bar: 80,
    },
    {
      id: "hackathons",
      icon: Trophy,
      label: "hackathons directed",
      value: 2,
      unit: "",
      detail: "Citrus Hack + Cutie Hack - 400+ hackers combined",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-400/30",
      gradient: "from-orange-500/20 to-orange-500/5",
      bar: 100,
    },
    {
      id: "tea",
      icon: Coffee,
      label: "cups of tea",
      value: 247,
      unit: "",
      detail: "oolong: 142 · matcha: 61 · others: 44",
      color: "text-teal-500",
      bg: "bg-teal-500/10",
      border: "border-teal-400/30",
      gradient: "from-teal-500/20 to-teal-500/5",
      bar: 68,
    },
    {
      id: "books",
      icon: BookOpen,
      label: "books read",
      value: 23,
      unit: "",
      detail: "HCI · design · sci-fi · cognitive science",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-400/30",
      gradient: "from-emerald-500/20 to-emerald-500/5",
      bar: 58,
    },
    {
      id: "languages",
      icon: Globe,
      label: "languages studied",
      value: 3,
      unit: "",
      detail: "Vietnamese · Japanese · Korean",
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      border: "border-pink-400/30",
      gradient: "from-pink-500/20 to-pink-500/5",
      bar: 45,
    },
  ],
  topBook: "The Design of Everyday Things",
  topTea: "oolong - 142 cups",
  highlight: "directed Citrus Hack with 300+ attendees",
  words: ["systems", "clarity", "curiosity", "tea", "orbit"],
};

function WrappedView({ data }: { data: typeof DATA_2025 }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Hero card */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/8 to-transparent border border-primary/30 p-8 sm:p-10 text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 20%, oklch(75.792% 0.13736 296.393 / 0.12) 0%, transparent 50%), radial-gradient(circle at 70% 80%, oklch(75.792% 0.13736 296.393 / 0.08) 0%, transparent 50%)",
          }}
        />
        <p className="font-mono text-xs tracking-[0.3em] text-primary/60 mb-2">year in review</p>
        <h3 className="text-5xl sm:text-7xl font-bold tracking-tighter text-foreground mb-3">{data.year}</h3>
        <p className="text-xl font-bold text-primary mb-2">{data.headline}</p>
        <p className="font-mono text-xs text-muted-foreground">{data.subline}</p>
        {/* word cloud */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {data.words.map((w) => (
            <span key={w} className="font-mono text-[10px] tracking-wider text-primary/60 border border-primary/20 rounded-full px-2.5 py-1">
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* Stat cards - Spotify Wrapped style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.stats.map((stat, i) => {
          const Icon = stat.icon;
          const isActive = active === stat.id;
          return (
            <button
              key={stat.id}
              onClick={() => setActive(isActive ? null : stat.id)}
              className={cn("relative rounded-2xl border p-6 text-left overflow-hidden transition-all duration-300", `bg-gradient-to-br ${stat.gradient}`, stat.border, isActive ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01]")}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Big number */}
              <div className={cn("text-5xl font-bold tracking-tighter mb-1", stat.color)}>{stat.value.toLocaleString()}</div>
              <div className="flex items-center gap-2 mb-3">
                <Icon className={cn("h-3.5 w-3.5", stat.color)} />
                <p className="font-mono text-xs text-muted-foreground">{stat.label}</p>
              </div>
              {/* Progress bar */}
              <div className="h-1 rounded-full bg-secondary/60 overflow-hidden mb-3">
                <div className={cn("h-full rounded-full transition-all duration-700", stat.bg.replace("/10", "/60"))} style={{ width: `${stat.bar}%` }} />
              </div>
              {/* Detail (on expand) */}
              <p className={cn("font-mono text-[10px] text-muted-foreground transition-all duration-200", isActive ? "opacity-100 max-h-10" : "opacity-60 max-h-10")}>{stat.detail}</p>
            </button>
          );
        })}

        {/* Highlight card */}
        <div className="sm:col-span-2 lg:col-span-3 rounded-2xl border border-primary/20 bg-primary/5 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-wider text-primary/60 mb-0.5">highlight of the year</p>
            <p className="font-bold text-foreground">{data.highlight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Editorial
function EditorialView({ data }: { data: typeof DATA_2025 }) {
  return (
    <div className="space-y-8">
      {/* Magazine header */}
      <div className="border-b-2 border-foreground pb-4">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase mb-1">annual retrospective</p>
            <h3 className="text-4xl sm:text-6xl font-bold tracking-tighter">{data.year}</h3>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] text-muted-foreground">allisonpham.dev</p>
            <p className="font-mono text-[10px] text-muted-foreground">vol. {parseInt(data.year) - 2019}</p>
          </div>
        </div>
      </div>

      {/* Pull quote */}
      <div className="border-l-4 border-primary pl-6 py-2">
        <p className="text-xl sm:text-2xl font-bold italic text-foreground/80 leading-snug">&ldquo;{data.headline}&rdquo;</p>
        <p className="font-mono text-xs text-muted-foreground mt-2">{data.subline}</p>
      </div>

      {/* Stats in editorial table */}
      <div className="space-y-0 border border-border/40 rounded-xl overflow-hidden">
        <div className="grid grid-cols-3 sm:grid-cols-5 bg-secondary/40 px-4 py-2 border-b border-border/40">
          <p className="font-mono text-[10px] tracking-wider text-muted-foreground col-span-2">metric</p>
          <p className="font-mono text-[10px] tracking-wider text-muted-foreground text-right">count</p>
          <p className="font-mono text-[10px] tracking-wider text-muted-foreground text-right hidden sm:block">progress</p>
          <p className="font-mono text-[10px] tracking-wider text-muted-foreground hidden sm:block sm:col-span-1 pl-4">note</p>
        </div>
        {data.stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className={cn("grid grid-cols-3 sm:grid-cols-5 px-4 py-3 items-center gap-2 border-b border-border/20 last:border-0", i % 2 === 0 ? "bg-card/20" : "")}>
              <div className="flex items-center gap-2 col-span-2">
                <Icon className={cn("h-3.5 w-3.5 shrink-0", stat.color)} />
                <p className="text-sm font-medium text-foreground">{stat.label}</p>
              </div>
              <p className={cn("text-right font-bold text-lg", stat.color)}>{stat.value.toLocaleString()}</p>
              <div className="hidden sm:block">
                <div className="h-1.5 rounded-full bg-secondary/60 overflow-hidden ml-auto w-24">
                  <div className={cn("h-full rounded-full", stat.bg.replace("/10", "/60"))} style={{ width: `${stat.bar}%` }} />
                </div>
              </div>
              <p className="font-mono text-[10px] text-muted-foreground hidden sm:block pl-4 leading-tight">{stat.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Feature section */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 rounded-xl border border-border/40 bg-card/30 p-5">
          <p className="font-mono text-[10px] tracking-wider text-primary mb-3">highlight</p>
          <p className="text-lg font-bold mb-2">{data.highlight}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">A year defined by building in public, leading with intention, and finding that the best systems are the ones that make people feel capable.</p>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-border/40 bg-card/30 p-4">
            <p className="font-mono text-[10px] tracking-wider text-muted-foreground mb-1">top read</p>
            <p className="text-sm font-medium">{data.topBook}</p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card/30 p-4">
            <p className="font-mono text-[10px] tracking-wider text-muted-foreground mb-1">top tea</p>
            <p className="text-sm font-medium">{data.topTea}</p>
          </div>
          <div className="rounded-xl border border-border/40 bg-card/30 p-4">
            <p className="font-mono text-[10px] tracking-wider text-muted-foreground mb-1">words of the year</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.words.map((w) => (
                <span key={w} className="font-mono text-[9px] text-primary border border-primary/20 rounded px-1.5 py-0.5">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function YearInReview() {
  const [isVisible, setIsVisible] = useState(false);
  const [view, setView] = useState<ViewMode>("wrapped");
  const [year, setYear] = useState("2025");
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

  return (
    <section ref={ref} className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className={cn("mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">retrospective;</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Year in Review</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">Projects shipped, teas brewed, pages turned</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Year selector */}
            <div className="flex rounded-lg border border-border/60 overflow-hidden">
              {["2024", "2025"].map((y) => (
                <button key={y} onClick={() => setYear(y)} className={cn("px-3 py-1.5 font-mono text-xs transition-all", year === y ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground")}>
                  {y}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex rounded-lg border border-border/60 overflow-hidden">
              <button onClick={() => setView("wrapped")} className={cn("flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs transition-all", view === "wrapped" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground")}>
                <LayoutGrid className="h-3 w-3" /> wrapped
              </button>
              <button
                onClick={() => setView("editorial")}
                className={cn("flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs transition-all border-l border-border/60", view === "editorial" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground")}
              >
                <BookMarked className="h-3 w-3" /> editorial
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={cn("opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "150ms" }}>
          {year === "2024" ? (
            <div className="rounded-2xl border border-border/40 bg-secondary/20 p-8 text-center">
              <p className="font-mono text-sm text-muted-foreground">2024 retrospective coming soon ✦</p>
            </div>
          ) : view === "wrapped" ? (
            <WrappedView data={DATA_2025} />
          ) : (
            <EditorialView data={DATA_2025} />
          )}
        </div>
      </div>
    </section>
  );
}
