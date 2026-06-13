"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/core-features/utils"
import { ExternalLink } from "lucide-react"
import { influences, influenceDomainConfig, influenceTypeIcon, type InfluenceDomain, type InfluenceType } from "@/src/lib/influence-data"

export function InfluenceMap() {
  const [isVisible, setIsVisible] = useState(false)
  const [domainFilter, setDomainFilter] = useState<InfluenceDomain | "all">("all")
  const [typeFilter, setTypeFilter] = useState<InfluenceType | "all">("all")
  const [selected, setSelected] = useState<typeof influences[0] | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filtered = influences.filter((inf) =>
    (domainFilter === "all" || inf.domain === domainFilter) &&
    (typeFilter === "all" || inf.type === typeFilter)
  )

  const grouped = filtered.reduce<Record<InfluenceDomain, typeof influences>>((acc, inf) => {
    if (!acc[inf.domain]) acc[inf.domain] = []
    acc[inf.domain].push(inf)
    return acc
  }, {} as Record<InfluenceDomain, typeof influences>)

  const domains = Object.keys(grouped) as InfluenceDomain[]
  const types: Array<InfluenceType | "all"> = ["all", "person", "book", "paper", "project", "concept"]

  return (
    <section ref={sectionRef} className="overflow-x-clip px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-7xl">

        <div className={cn("mb-10 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">intellectual lineage;</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Influence Map ◉</h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            The people, books, papers, and projects that shaped how I think. One sentence on what each one changed.
          </p>
        </div>

        {/* Filters */}
        <div className={cn("mb-8 flex flex-wrap gap-6 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "80ms" }}>
          <div className="flex flex-wrap gap-2">
            <span className="self-center font-mono text-[10px] tracking-widest text-muted-foreground">domain</span>
            <button onClick={() => setDomainFilter("all")}
              className={cn("rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all",
                domainFilter === "all" ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-foreground/40")}>all</button>
            {(Object.keys(influenceDomainConfig) as InfluenceDomain[]).map((d) => (
              <button key={d} onClick={() => setDomainFilter(domainFilter === d ? "all" : d)}
                className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all"
                style={{ borderColor: domainFilter === d ? influenceDomainConfig[d].color : undefined, background: domainFilter === d ? influenceDomainConfig[d].bg : undefined, color: domainFilter === d ? influenceDomainConfig[d].color : undefined }}>
                {d}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="self-center font-mono text-[10px] tracking-widest text-muted-foreground">type</span>
            {types.map((t) => (
              <button key={t} onClick={() => setTypeFilter(typeFilter === t ? "all" : t)}
                className={cn("rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all",
                  typeFilter === t ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-foreground/40")}>
                {t !== "all" && <span className="mr-1">{influenceTypeIcon[t]}</span>}{t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Grid of domain clusters */}
          <div className="lg:col-span-2 space-y-6">
            {domains.map((domain, di) => {
              const cfg = influenceDomainConfig[domain]
              return (
                <div
                  key={domain}
                  className={cn("rounded-xl border bg-card/30 glass p-5 opacity-0", isVisible && "animate-fade-in-up")}
                  style={{ borderColor: cfg.border, animationDelay: `${di * 60 + 120}ms` }}
                >
                  <p className="mb-4 font-mono text-[10px] tracking-[0.2em]" style={{ color: cfg.color }}>{domain}</p>
                  <div className="flex flex-wrap gap-2">
                    {grouped[domain].map((inf) => (
                      <button
                        key={inf.id}
                        onClick={() => setSelected(selected?.id === inf.id ? null : inf)}
                        className={cn(
                          "group flex items-center gap-2 rounded-lg border px-3 py-2 text-left transition-all duration-200 hover-lift active:scale-[0.98]",
                          selected?.id === inf.id
                            ? "bg-card/80 shadow-sm"
                            : "border-border/50 bg-card/20 hover:border-opacity-50"
                        )}
                        style={selected?.id === inf.id ? { borderColor: cfg.color, background: cfg.bg } : undefined}
                      >
                        <span className="text-[11px]" style={{ color: cfg.color }}>{influenceTypeIcon[inf.type]}</span>
                        <span className={cn("font-mono text-[11px] font-medium tracking-wide transition-colors",
                          selected?.id === inf.id ? "" : "text-muted-foreground group-hover:text-foreground")}
                          style={selected?.id === inf.id ? { color: cfg.color } : undefined}>
                          {inf.name}
                        </span>
                        {inf.year && (
                          <span className="font-mono text-[9px] text-muted-foreground">{inf.year}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Detail panel */}
          <div className="space-y-4">
            {selected ? (
              <div
                className="rounded-xl border bg-card/40 glass p-6 space-y-4 animate-fade-in-up"
                style={{ borderColor: influenceDomainConfig[selected.domain].border }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: influenceDomainConfig[selected.domain].color }}>
                        {influenceTypeIcon[selected.type]}
                      </span>
                      <span className="font-mono text-[9px] tracking-widest" style={{ color: influenceDomainConfig[selected.domain].color }}>
                        {selected.type} · {selected.domain}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground">{selected.name}</h3>
                  </div>
                  <button onClick={() => setSelected(null)} className="font-mono text-xs text-muted-foreground hover:text-primary shrink-0">×</button>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{selected.what}</p>

                <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                  <p className="mb-1 font-mono text-[10px] tracking-widest text-primary">what it changed</p>
                  <p className="text-sm leading-relaxed text-muted-foreground italic">{selected.changed}</p>
                </div>

                {selected.url && (
                  <a href={selected.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary">
                    <ExternalLink className="h-3.5 w-3.5" />
                    visit
                  </a>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border/40 bg-card/20 p-10 text-center">
                <span className="text-3xl">◉</span>
                <p className="font-mono text-xs text-muted-foreground">click any influence to see what it changed</p>
              </div>
            )}

            {/* Type legend */}
            <div className="rounded-xl border border-border/40 bg-card/20 p-4 space-y-2">
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground">legend</p>
              <div className="space-y-1">
                {(Object.entries(influenceTypeIcon) as [InfluenceType, string][]).map(([type, icon]) => (
                  <div key={type} className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground w-4">{icon}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className={cn("mt-6 text-sm leading-relaxed text-muted-foreground max-w-2xl opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "600ms" }}>
          Not a reading list. These are the things that actually changed how I think - which is a much shorter list.
        </p>
      </div>
    </section>
  )
}
