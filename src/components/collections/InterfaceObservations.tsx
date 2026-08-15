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

// Interface observations
type ObservationType = "friction" | "delight" | "invisible" | "question";

type InterfaceObservation = {
  id: string;
  date: string;
  where: string;
  type: ObservationType;
  observation: string;
  why: string;
  tags: string[];
};

const OBS_TYPE_CONFIG: Record<ObservationType, { label: string; pill: string; dot: string }> = {
  friction: { label: "friction", pill: "border-red-500/30 bg-red-500/8 text-red-500", dot: "bg-red-500" },
  delight: { label: "delight", pill: "border-green-500/30 bg-green-500/8 text-green-500", dot: "bg-green-500" },
  invisible: { label: "invisible", pill: "border-primary/30 bg-primary/8 text-primary", dot: "bg-primary" },
  question: { label: "question", pill: "border-yellow-500/30 bg-yellow-500/8 text-yellow-500", dot: "bg-yellow-500" },
};

const observations: InterfaceObservation[] = [
  {
    id: "elevator-buttons",
    date: "2026-04-12",
    where: "UCR Engineering building elevator",
    type: "friction",
    observation: "The door-open button is the same size, shape, and position as the floor buttons - nothing differentiates it visually or tactilely.",
    why: "In a moment of urgency (holding the door for someone), affordance matters. The button's design assumes you already know where it is. First-time users have to read every button. That's a failure of habituation design.",
    tags: ["affordance", "physical UI", "habituation"],
  },
  {
    id: "notion-slash-command",
    date: "2026-03-28",
    where: "Notion",
    type: "delight",
    observation: "The slash command menu appears exactly where your cursor is - not in a fixed toolbar location.",
    why: "Reduces the distance between intent and action to nearly zero. Your eyes never leave the content you're writing. This is Fitts's Law applied perfectly - the target appears at the point of need.",
    tags: ["Fitts's law", "command interface", "cursor-proximity"],
  },
  {
    id: "apple-recovery-mode",
    date: "2026-03-15",
    where: "macOS recovery mode",
    type: "friction",
    observation: "Recovery mode gives you four options with no indication of which one you need or what each one does to your system.",
    why: "Error recovery is the highest-stakes UX moment - the user is already distressed. Presenting four ambiguous options with no guidance compounds the cognitive load exactly when it hurts most.",
    tags: ["error states", "cognitive load", "recovery UX"],
  },
  {
    id: "duolingo-streak",
    date: "2026-02-20",
    where: "Duolingo",
    type: "question",
    observation: "The streak counter makes me do a lesson I don't actually want to do, just to not lose a number.",
    why: "Is this good design or manipulative design? It drives behavior effectively but decouples the action from intrinsic motivation. I'm curious whether streak-protected users actually learn better or just stay subscribed longer.",
    tags: ["gamification", "motivation", "dark patterns?"],
  },
  {
    id: "google-maps-haptic",
    date: "2026-02-08",
    where: "Google Maps navigation",
    type: "invisible",
    observation: "A subtle haptic pulse happens right before a turn instruction is spoken. I only noticed it after months of daily use.",
    why: "This is ambient feedback at its best - it primes your attention without demanding it. The haptic and audio together create redundant channels so you never miss a turn. You don't notice it working, which means it's working perfectly.",
    tags: ["haptic feedback", "ambient UI", "redundant channels"],
  },
  {
    id: "vercel-deploy-log",
    date: "2026-01-30",
    where: "Vercel deployment logs",
    type: "delight",
    observation: "The build log streams in real time with color-coded lines and a timestamp on each step. Failed lines turn red immediately.",
    why: "It makes a process that would otherwise be a black box feel transparent and legible. You know exactly what's happening and where it broke. That transparency builds trust even when things fail.",
    tags: ["feedback loops", "system visibility", "developer UX"],
  },
];

const OBS_FILTERS: { value: ObservationType | "all"; label: string }[] = [
  { value: "all", label: "all" },
  { value: "friction", label: "friction" },
  { value: "delight", label: "delight" },
  { value: "invisible", label: "invisible" },
  { value: "question", label: "question" },
];

export function InterfaceObservations() {
  const { ref, isVisible } = useVisible();
  const [typeFilter, setTypeFilter] = useState<ObservationType | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = observations.filter((o) => typeFilter === "all" || o.type === typeFilter).sort((a, b) => b.date.localeCompare(a.date));

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <section ref={ref} className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-10 sm:mb-14 space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">noticing things;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Interface Observations 〇</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">A running log of UI friction, delight, and invisible design I notice in the wild (with a note on why it works or doesn't)</p>
        </div>

        {/* type filter */}
        <div className={cn("mb-8 flex flex-wrap gap-2 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "80ms" }}>
          {OBS_FILTERS.map((f) => {
            const cfg = f.value !== "all" ? OBS_TYPE_CONFIG[f.value] : null;
            return (
              <button
                key={f.value}
                onClick={() => setTypeFilter(f.value)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-xs tracking-wider transition-all duration-200 active:scale-[0.98]",
                  typeFilter === f.value ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20" : "border-border text-muted-foreground hover:border-foreground/50 hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                {cfg && <span className={cn("h-1.5 w-1.5 rounded-full", cfg.dot)} />}
                {f.label}
                <span className="opacity-50">{f.value === "all" ? observations.length : observations.filter((o) => o.type === f.value).length}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          {filtered.map((obs, i) => {
            const cfg = OBS_TYPE_CONFIG[obs.type];
            const isOpen = expanded === obs.id;
            return (
              <article
                key={obs.id}
                className={cn("group relative overflow-hidden rounded-xl border bg-card/40 glass transition-all duration-300 opacity-0", isVisible && "animate-fade-in-up", isOpen ? "border-primary/30" : "border-border/60 hover:border-primary/20")}
                style={{ animationDelay: `${i * 60 + 150}ms` }}
              >
                <button onClick={() => setExpanded(isOpen ? null : obs.id)} className="flex w-full items-start gap-4 px-5 sm:px-6 py-4 text-left">
                  <div className="mt-1 shrink-0">
                    <span className={cn("flex h-2 w-2 rounded-full", cfg.dot)} />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wider", cfg.pill)}>{cfg.label}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{obs.where}</span>
                      <span className="font-mono text-[10px] text-muted-foreground/50">{formatDate(obs.date)}</span>
                    </div>
                    <p className={cn("text-sm font-medium leading-snug transition-colors", isOpen ? "text-primary" : "text-foreground group-hover:text-primary")}>{obs.observation}</p>
                    {!isOpen && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {obs.tags.map((t) => (
                          <span key={t} className="rounded-md border border-border/50 bg-secondary/40 px-2 py-0.5 font-mono text-[9px] text-muted-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="shrink-0 mt-1">{isOpen ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}</div>
                </button>

                {isOpen && (
                  <div className="border-t border-border/40 px-5 sm:px-6 pb-5 pt-4 space-y-3 animate-fade-in-up">
                    <div className="rounded-md border-l-2 border-primary/40 bg-primary/5 pl-3 py-2">
                      <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1">why this matters</p>
                      <p className="text-sm leading-relaxed text-foreground/80">{obs.why}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {obs.tags.map((t) => (
                        <span key={t} className="rounded-md border border-border/50 bg-secondary/40 px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
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
