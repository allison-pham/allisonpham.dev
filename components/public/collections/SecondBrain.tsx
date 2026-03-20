"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import {
  Brain,
  FolderOpen,
  Sprout,
  Leaf,
  Trees,
  Link2,
  FileText,
  Sparkles,
} from "lucide-react"

interface CoreNode {
  id: string
  title: string
  summary: string
}

interface GardenNote {
  id: string
  title: string
  kind: "note" | "idea" | "concept" | "half-finished"
  status: "seed" | "growing" | "rooted"
  lastUpdated: string
  connections: string[]
  preview: string
}

type FolderName = "thinking" | "design" | "life"

interface GardenFolder {
  id: FolderName
  path: string
  blurb: string
  notes: GardenNote[]
}

const coreNodes: CoreNode[] = [
  {
    id: "fragments",
    title: "Fragments",
    summary: "Loose pieces, fleeting sparks, & unfinished lines worth keeping",
  },

  {
    id: "notes",
    title: "Notes",
    summary: "Raw observations, references, & scratch thoughts",
  },
  
  {
    id: "thoughts",
    title: "Thoughts",
    summary: "Intentionally unfinished notes that are still evolving",
  },

  {
    id: "ideas",
    title: "Ideas",
    summary: "Early sparks worth revisiting before they fade",
  },
]

const gardenFolders: GardenFolder[] = [
  {
    id: "thinking",
    path: "/thinking/",
    blurb: "Systems, decision-making, & first-principles notes",
    notes: [
      {
        id: "decision-entropy",
        title: "Decision Entropy",
        kind: "concept",
        status: "growing",
        lastUpdated: "Mar 2026",
        connections: ["Leverage Loops", "Taste as a Moat"],
        preview: "How optionality collapses when context-switching is constant.",
      },
      {
        id: "feedback-latency",
        title: "Feedback Latency",
        kind: "note",
        status: "seed",
        lastUpdated: "Mar 2026",
        connections: ["Tiny Experiments"],
        preview: "Shortening the gap between action and reflection in personal systems.",
      },
    ],
  },
  {
    id: "design",
    path: "/design/",
    blurb: "Interface notes, composition studies, & visual pattern breakdowns",
    notes: [
      {
        id: "visual-rhythm",
        title: "Visual Rhythm in UI",
        kind: "idea",
        status: "growing",
        lastUpdated: "Feb 2026",
        connections: ["Whitespace as pacing", "Microcopy tone"],
        preview: "Why repeated spacing patterns make dense interfaces feel calm.",
      },
      {
        id: "anti-template-layout",
        title: "Anti-template Layouts",
        kind: "half-finished",
        status: "seed",
        lastUpdated: "Mar 2026",
        connections: ["Narrative Interfaces"],
        preview: "Designing pages that feel authored, not assembled from defaults.",
      },
    ],
  },
  {
    id: "life",
    path: "/life/",
    blurb: "Personal operating notes, routines, & life systems",
    notes: [
      {
        id: "energy-budgeting",
        title: "Energy Budgeting",
        kind: "concept",
        status: "rooted",
        lastUpdated: "Jan 2026",
        connections: ["Deep Work Windows", "Rest Protocol"],
        preview: "Treating attention like a finite budget for better weekly planning.",
      },
      {
        id: "sunday-reset",
        title: "Sunday Reset",
        kind: "note",
        status: "growing",
        lastUpdated: "Mar 2026",
        connections: ["Capture Inbox"],
        preview: "A lightweight weekly ritual for resetting mind, space, and queue.",
      },
    ],
  },
]

const kindStyles = {
  note: "bg-secondary text-muted-foreground border-border",
  idea: "bg-primary/10 text-primary border-primary/30",
  concept: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
  "half-finished": "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
}

const growthStyles = {
  seed: {
    label: "🌱",
    className: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    icon: Sprout,
  },
  growing: {
    label: "🌿",
    className: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30",
    icon: Leaf,
  },
  rooted: {
    label: "🌳",
    className: "bg-primary/10 text-primary border-primary/30",
    icon: Trees,
  },
}

export function SecondBrain() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFolder, setActiveFolder] = useState<FolderName>("thinking")
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true)
    }, { threshold: 0.1 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const currentFolder = gardenFolders.find((folder) => folder.id === activeFolder) ?? gardenFolders[0]

  return (
    <section ref={ref} className="relative px-4 sm:px-6 pt-16 sm:pt-16 pb-8 sm:pb-12">
      <div className={cn("mx-auto w-full max-w-7xl opacity-0", isVisible && "animate-fade-in-up")}
      >
        <div className="space-y-2 mb-8">
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">
            thinking systems;
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Brain System</h2>
            <p className="w-full whitespace-normal text-base sm:text-lg text-muted-foreground leading-relaxed">
            2nd brain (store & organize) x digital garden (where my thoughts grow over time). 
            A collection of ongoing thoughts: half-formed ideas, small notes, etc.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {coreNodes.map((node, index) => (
            <article
              key={node.id}
              className={cn(
                "rounded-xl border border-border bg-card/40 glass p-5 space-y-3 opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${index * 90 + 100}ms` }}
            >
              <p className="font-semibold">{node.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{node.summary}</p>
              {/* <div className="rounded-lg border border-border/50 bg-secondary/30 px-3 py-2">
                <p className="font-mono text-[10px] tracking-wider text-muted-foreground">core system</p>
              </div> */}
            </article>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
          <div className={cn(
            "rounded-xl border border-border bg-card/40 glass p-4 space-y-2 opacity-0",
            isVisible && "animate-fade-in-up"
          )} style={{ animationDelay: "380ms" }}>
            <p className="font-mono text-[10px] tracking-[0.22em] text-primary px-2 py-1">open folders;</p>
            {gardenFolders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                className={cn(
                  "w-full rounded-lg border px-3 py-2.5 text-left transition-all duration-200",
                  activeFolder === folder.id
                    ? "border-primary/50 bg-primary/10"
                    : "border-border/50 bg-secondary/30 hover:border-primary/30"
                )}
              >
                <p className="font-mono text-xs tracking-widest text-foreground flex items-center gap-2">
                  <FolderOpen className={cn("h-3.5 w-3.5", activeFolder === folder.id ? "text-primary" : "text-muted-foreground")} />
                  {folder.path}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{folder.blurb}</p>
              </button>
            ))}
            <div className="rounded-lg border border-dashed border-border/50 px-3 py-2 mt-2">
              <p className="font-mono text-[10px] text-muted-foreground">wikipedia meets my brain</p>
            </div>
          </div>

          <div className={cn(
            "rounded-xl border border-border bg-card/40 glass p-5 space-y-4 opacity-0",
            isVisible && "animate-fade-in-up"
          )} style={{ animationDelay: "460ms" }}>
            <div className="flex items-center justify-between gap-3 border-b border-border/50 pb-3">
              <div>
                <p className="font-mono text-xs text-primary tracking-widest">{currentFolder.path}</p>
                <h3 className="text-lg font-semibold mt-1">Evolving Notes</h3>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{currentFolder.notes.length} notes</span>
            </div>

            <div className="space-y-3">
              {currentFolder.notes.map((note) => {
                const growth = growthStyles[note.status]
                const GrowthIcon = growth.icon
                return (
                  <article key={note.id} className="rounded-lg border border-border/50 bg-secondary/30 px-4 py-3 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-semibold">{note.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{note.preview}</p>
                      </div>
                      <span className={cn("shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px]", kindStyles[note.kind])}>
                        {note.kind}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[10px] flex items-center gap-1", growth.className)}>
                        <GrowthIcon className="h-3 w-3" />
                        {growth.label}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">last updated: {note.lastUpdated}</span>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Link2 className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />
                      <div className="flex flex-wrap gap-1.5">
                        {note.connections.map((connection) => (
                          <span key={connection} className="rounded-full border border-border/50 bg-card/40 px-2 py-0.5 font-mono text-[10px]">
                            {connection}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
              <p className="font-mono text-[10px] tracking-widest text-primary mb-1 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                not a blog
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Small notes, half-formed ideas, and ongoing thoughts. More organic, less polished.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}