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

// Design constraints
type ConstraintSeverity = "hard" | "soft" | "tradeoff";

type DesignConstraint = {
  id: string;
  title: string;
  context: string;
  constraint: string;
  implication: string;
  severity: ConstraintSeverity;
  domain: string;
  workaround?: string;
};

const SEVERITY_CONFIG: Record<ConstraintSeverity, { label: string; pill: string; icon: React.ComponentType<{ className?: string }> }> = {
  hard: { label: "hard limit", pill: "border-red-500/30 bg-red-500/10 text-red-500", icon: AlertTriangle },
  soft: { label: "soft limit", pill: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500", icon: Zap },
  tradeoff: { label: "tradeoff", pill: "border-blue-500/30 bg-blue-500/10 text-blue-400", icon: Puzzle },
};

const constraints: DesignConstraint[] = [
  {
    id: "eva-gloves",
    title: "No fine motor control in EVA gloves",
    context: "HCI in Space / EVA interface design",
    constraint: "Pressurized EVA gloves reduce dexterity to roughly that of thick oven mitts. Multi-touch, precise tapping, and any gesture requiring finger independence are unreliable.",
    implication: "Every interaction must work with gross motor input only - whole-hand gestures, wrist rotation, or arm-level movement.",
    severity: "hard",
    domain: "Space HCI",
    workaround: "Built gesture set from NASA's existing EVA hand signal protocols. They already work under constraints.",
  },
  {
    id: "cognitive-overload",
    title: "Cognitive load spikes during critical tasks",
    context: "HCI in Space / astronaut workflow design",
    constraint: "During EVA, astronauts are simultaneously managing suit telemetry, task checklists, communication, and physical orientation. Working memory is nearly saturated.",
    implication: "Any interface that requires reading, multi-step input, or decision-making during a task will fail. Feedback must be ambient, not attentional.",
    severity: "hard",
    domain: "Space HCI",
    workaround: "Haptic confirmation patterns instead of visual readouts. One gesture = one action, no confirmation dialogs.",
  },
  {
    id: "screen-glare",
    title: "Screen visibility in orbital lighting",
    context: "HCI in Space / display design",
    constraint: "Lighting in space shifts from full Sun to complete shadow in seconds during orbital transitions. Screens that look fine in one condition are unreadable in the other.",
    implication: "Visual feedback can't be the primary confirmation channel. Color contrast ratios designed for Earth environments don't apply.",
    severity: "hard",
    domain: "Space HCI",
    workaround: "Haptic and audio as primary feedback. Visual as secondary, with adaptive brightness.",
  },
  {
    id: "one-handed-use",
    title: "One-handed operation during tool use",
    context: "HCI in Space / EVA task design",
    constraint: "Astronauts frequently have one hand occupied with a tool or tethered to a structure. Interfaces requiring two-hand input create task interruption.",
    implication: "All core interactions need single-hand variants. This also applies to emergency situations where speed matters.",
    severity: "soft",
    domain: "Space HCI",
    workaround: "Finger-combination gestures as one-handed alternatives. Discovered in v5 testing - the constraint became a feature.",
  },
  {
    id: "accessibility-vs-aesthetics",
    title: "Aesthetic choices vs. accessibility requirements",
    context: "Personal site / portfolio design",
    constraint: "Glass morphism, low-contrast muted text, and small mono type - all hallmarks of the design system - push against WCAG contrast requirements.",
    implication: "Every design decision involving color or text size is a negotiation between visual coherence and accessibility compliance.",
    severity: "tradeoff",
    domain: "Web Design",
    workaround: "Muted foreground passes at 4.6:1 on the background. Glass elements avoid putting text on blur directly. Ongoing audit in AccessibilityNotes.",
  },
  {
    id: "canvas-accessibility",
    title: "Canvas-based visualizations have no accessible baseline",
    context: "Personal site / lab components",
    constraint: "D3 graphs, constellation maps, and particle animations rendered to canvas are invisible to screen readers by default.",
    implication: "Every canvas component needs a parallel accessible representation - either a hidden data table or role=img with a descriptive aria-label.",
    severity: "soft",
    domain: "Web Design",
    workaround: "Planned: hidden data table fallbacks. Currently flagged as todo in AccessibilityNotes.",
  },
];

const CONSTRAINT_DOMAINS = ["All", ...Array.from(new Set(constraints.map((c) => c.domain)))];

export function DesignConstraints() {
  const { ref, isVisible } = useVisible();
  const [activeDomain, setActiveDomain] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = constraints.filter((c) => activeDomain === "All" || c.domain === activeDomain);

  return (
    <section ref={ref} className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-10 sm:mb-14 space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">what i'm working within;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Design Constraints ⧖</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">The limits shaping my work - hard limits, soft limits, and tradeoffs I've had to make</p>
        </div>

        {/* domain filter */}
        <div className={cn("mb-8 flex flex-wrap gap-2 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "80ms" }}>
          {CONSTRAINT_DOMAINS.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDomain(d)}
              className={cn(
                "rounded-full border px-4 py-1.5 font-mono text-xs tracking-wider transition-all duration-200 active:scale-[0.98]",
                activeDomain === d ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20" : "border-border text-muted-foreground hover:border-foreground/50 hover:bg-secondary/50 hover:text-foreground",
              )}
            >
              {d.toLowerCase()}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => {
            const sev = SEVERITY_CONFIG[c.severity];
            const SevIcon = sev.icon;
            const isOpen = expanded === c.id;
            return (
              <article
                key={c.id}
                className={cn(
                  "group relative overflow-hidden rounded-xl border bg-card/40 glass transition-all duration-300 opacity-0",
                  isVisible && "animate-fade-in-up",
                  isOpen ? "border-primary/30 sm:col-span-2 lg:col-span-1" : "border-border/60 hover:border-primary/20",
                )}
                style={{ animationDelay: `${i * 60 + 150}ms` }}
              >
                <button onClick={() => setExpanded(isOpen ? null : c.id)} className="flex w-full flex-col gap-3 p-5 sm:p-6 text-left">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/8 text-primary">
                      <SevIcon className="h-4 w-4" />
                    </div>
                    <span className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-wider", sev.pill)}>{sev.label}</span>
                  </div>
                  <div className="space-y-1">
                    <p className={cn("font-mono text-[10px] tracking-widest", isOpen ? "text-primary" : "text-muted-foreground")}>{c.domain.toLowerCase()}</p>
                    <h3 className={cn("font-semibold tracking-tight leading-snug transition-colors", isOpen ? "text-primary" : "text-foreground group-hover:text-primary")}>{c.title}</h3>
                    <p className="font-mono text-[10px] text-muted-foreground/70">{c.context}</p>
                  </div>
                  {!isOpen && <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">{c.constraint}</p>}
                  <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground mt-auto">
                    {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    {isOpen ? "collapse" : "read more"}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-border/40 px-5 sm:px-6 pb-5 pt-4 space-y-3 animate-fade-in-up">
                    <div className="space-y-1">
                      <p className="font-mono text-[10px] tracking-widest text-muted-foreground">constraint</p>
                      <p className="text-sm leading-relaxed text-foreground/80">{c.constraint}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-mono text-[10px] tracking-widest text-muted-foreground">implication</p>
                      <p className="text-sm leading-relaxed text-foreground/80">{c.implication}</p>
                    </div>
                    {c.workaround && (
                      <div className="rounded-md border-l-2 border-primary/40 bg-primary/5 pl-3 py-2">
                        <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1">how i'm working around it</p>
                        <p className="text-xs leading-relaxed text-foreground/80">{c.workaround}</p>
                      </div>
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
