"use client";
import { cn } from "@/src/lib/core-features/utils";
import { fieldNotes, allFieldNoteTags, fieldNoteTypeConfig, type FieldNoteType } from "@/src/lib/hci-field-notes";
import { MapPin, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TYPE_FILTERS: Array<{ value: FieldNoteType | "all"; label: string }> = [
  { value: "all", label: "all" },
  { value: "friction", label: "friction" },
  { value: "delight", label: "delight" },
  { value: "confusion", label: "confusion" },
  { value: "invisible", label: "invisible" },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function HCIFieldNotes() {
  const [isVisible, setIsVisible] = useState(false);
  const [typeFilter, setTypeFilter] = useState<FieldNoteType | "all">("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
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

  const filtered = fieldNotes
    .filter((n) => typeFilter === "all" || n.type === typeFilter)
    .filter((n) => !activeTag || n.tags.includes(activeTag))
    .sort((a, b) => b.date.localeCompare(a.date));

  // Counts per type
  const counts = TYPE_FILTERS.slice(1).reduce<Record<string, number>>((acc, f) => {
    acc[f.value] = fieldNotes.filter((n) => n.type === f.value).length;
    return acc;
  }, {});

  return (
    <section ref={sectionRef} className="overflow-x-clip px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className={cn("mb-12 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">observations in the wild;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">HCI Field Notes ⌖</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">Interfaces I've used, broken, been delighted by, or confused by - annotated with the principle they illustrate</p>
        </div>

        {/* Type counts */}
        <div className={cn("mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "80ms" }}>
          {TYPE_FILTERS.slice(1).map((f) => {
            const cfg = fieldNoteTypeConfig[f.value as FieldNoteType];
            return (
              <button
                key={f.value}
                onClick={() => setTypeFilter(typeFilter === f.value ? "all" : (f.value as FieldNoteType))}
                className={cn(
                  "flex flex-col gap-2 rounded-xl border p-4 text-left transition-all duration-300 hover-lift active:scale-[0.98]",
                  typeFilter === f.value ? cfg.pill : "border-border/50 bg-card/40 glass hover:border-primary/20",
                )}
              >
                <span className={cn("h-2 w-2 rounded-full", cfg.dot)} />
                <p className="text-xl font-bold text-foreground">{counts[f.value]}</p>
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground">{f.label}</p>
              </button>
            );
          })}
        </div>

        {/* Tag filter */}
        <div className={cn("mb-8 flex flex-wrap items-center gap-2 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "130ms" }}>
          <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          {allFieldNoteTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={cn(
                "rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider transition-all duration-200",
                activeTag === tag ? "border-primary/50 bg-primary/10 text-primary" : "border-border/60 bg-secondary/30 text-muted-foreground hover:border-primary/30 hover:text-foreground",
              )}
            >
              {tag}
            </button>
          ))}
          {activeTag && (
            <button onClick={() => setActiveTag(null)} className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors">
              clear ×
            </button>
          )}
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-4">
          {filtered.map((note, i) => {
            const cfg = fieldNoteTypeConfig[note.type];
            const isOpen = expanded === note.id;

            return (
              <div
                key={note.id}
                className={cn(
                  "group relative overflow-hidden rounded-xl border bg-card/40 glass transition-all duration-300 opacity-0",
                  isVisible && "animate-fade-in-up",
                  isOpen ? "border-primary/30" : "border-border/50 hover:border-primary/20",
                )}
                style={{ animationDelay: `${i * 60 + 200}ms` }}
              >
                <button onClick={() => setExpanded(isOpen ? null : note.id)} className="flex w-full items-start gap-4 px-6 py-5 text-left" aria-expanded={isOpen}>
                  {/* Type dot */}
                  <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", cfg.dot, note.type === "confusion" && "animate-pulse")} />

                  <div className="flex-1 min-w-0 space-y-1.5">
                    {/* Observation preview */}
                    <p className={cn("text-sm leading-relaxed text-foreground transition-colors", isOpen ? "text-foreground" : "line-clamp-2 text-muted-foreground group-hover:text-foreground")}>
                      {note.observation}
                    </p>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="font-mono text-[10px] truncate max-w-[180px]">{note.location}</span>
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground">·</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{formatDate(note.date)}</span>
                    </div>
                  </div>

                  {/* Badges + chevron */}
                  <div className="flex shrink-0 items-center gap-2">
                    <span className={cn("hidden sm:inline-flex rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wider", cfg.pill)}>{cfg.label}</span>
                    {isOpen ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                </button>

                {/* Expanded: principle + tags */}
                {isOpen && (
                  <div className="border-t border-border/40 px-6 pb-5 pt-4 space-y-4 animate-fade-in-up">
                    <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                      <p className="mb-1 font-mono text-[10px] tracking-widest text-primary">principle</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{note.principle}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {note.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                          className={cn(
                            "rounded-md border px-2 py-0.5 font-mono text-[9px] tracking-wider transition-colors",
                            activeTag === tag ? "border-primary/50 bg-primary/10 text-primary" : "border-border/60 bg-secondary/40 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                          )}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-mono text-sm text-muted-foreground">No field notes match those filters.</p>
          </div>
        )}

        {/* Footer note */}
        <div className={cn("mt-8 rounded-xl border border-primary/20 bg-primary/5 px-6 py-5 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "600ms" }}>
          <p className="text-sm leading-relaxed text-muted-foreground">
            These are real observations from daily life - not curated examples from a textbook. The point is to notice the interfaces that shape how people think, even the ones nobody talks about.
          </p>
        </div>
      </div>
    </section>
  );
}
