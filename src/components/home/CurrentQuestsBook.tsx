"use client"
import { useState } from "react"
import { ArrowLeft, ArrowRight, BarChart2, Book, BookOpen, Brain, Coffee, Compass, Cpu, FileText, Flag, Leaf, Hammer, Layers, Lightbulb, Rocket, Satellite, Smile, Target, TrendingUp, Trophy, Tv, Wrench, Zap } from "lucide-react"
import { cn } from "@/src/lib/core-features/utils"

type PageItem = {
  icon: React.ElementType
  title: string
  desc: string
}

type TocEntry = {
  title: string
  spread: number
  icon: React.ElementType
  pageNum: number
}

type PageData = {
  label: string
  title: string
  items?: PageItem[]
  stats?: { val: string; lbl: string }[]
  toc?: TocEntry[]
  overview?: string
  pageNum: string
}

type Spread = {
  left: PageData
  right: PageData
}

const tabs: { icon: React.ElementType; label: string; spread: number }[] = [
  { icon: BookOpen, label: "Contents", spread: 0 },
  { icon: Flag, label: "Goals", spread: 0 },
  { icon: Hammer, label: "Building", spread: 1 },
  { icon: BarChart2, label: "Numbers", spread: 1 },
  { icon: Brain, label: "Rabbit holes", spread: 2 },
  { icon: Layers, label: "Stack", spread: 2 },
  { icon: Book, label: "Shelf", spread: 3 },
  { icon: Smile, label: "Fun facts", spread: 3 },
]

const spreads: Spread[] = [
  {
    left: {
      label: "00 / contents",
      title: "Table of Contents",
      pageNum: "i",
      overview: "A little field guide to who I am, what I'm building, and what keeps me up at night! Flip through or jump to any section.",
      toc: [
        { title: "Goals", spread: 0, icon: Flag, pageNum: 1 },
        { title: "Currently Building", spread: 1, icon: Hammer, pageNum: 2 },
        { title: "By the Numbers", spread: 1, icon: BarChart2, pageNum: 3 },
        { title: "Rabbit Holes", spread: 2, icon: Brain, pageNum: 4 },
        { title: "Current Stack", spread: 2, icon: Layers, pageNum: 5 },
        { title: "On the Shelf", spread: 3, icon: Book, pageNum: 6 },
        { title: "Fun Facts", spread: 3, icon: Smile, pageNum: 7 },
      ],
    },

    right: {
      label: "01 / goals",
      title: "What I'm Working Toward",
      pageNum: "1",
      items: [
        { icon: Rocket, title: "My mission", desc: "Make systems feel like extensions of the mind" },
        { icon: Compass, title: "Long term", desc: "Build at the intersection of space, cognition, and interface design" },
        { icon: TrendingUp, title: "Medium term", desc: "Work on products that extend how people think" },
        { icon: Zap, title: "Short term", desc: "Ship meaningful 0→1 projects and publish HCI research" },
      ],
    },
  },

  {
    left: {
      label: "02 / currently building",
      title: "Projects in Progress",
      pageNum: "2",
      items: [
        { icon: Hammer, title: "Personal Website", desc: "Always iterating" },
        { icon: Wrench, title: "HCI Research", desc: "Interfaces for system operators" },
        { icon: Rocket, title: "Awesome Engineering Resources", desc: "Open resources for CS, EE, product (design + management)" },
        { icon: Lightbulb, title: "Side Quests", desc: "Always building something in the background" },
      ],
    },

    right: {
      label: "03 / by the numbers",
      title: "Fun Stats",
      pageNum: "3",
      stats: [
        { val: "30+", lbl: "Orgs" },
        { val: "20+", lbl: "Projects" },
        { val: "0→1", lbl: "Builds" },
        { val: "∞", lbl: "Cups of tea" },
      ],
      items: [
        { icon: Rocket, title: "Space", desc: "HCI for astronaut interfaces" },
        { icon: Trophy, title: "Orgs", desc: "ACM, Citrus Hack, Cutie Hack, Gamespawn, ASUCR, etc." },
      ],
    },
  },

  {
    left: {
      label: "04 / rabbit holes",
      title: "Currently Obsessing Over",
      pageNum: "4",
      items: [
        { icon: Brain, title: "Cognitive load in interfaces", desc: "How UI shapes decisions under pressure" },
        { icon: Satellite, title: "Space systems & HCI", desc: "Designing for zero-gravity workflows" },
        { icon: Rocket, title: "0→1 product building", desc: "The craft of making something from nothing" },
        { icon: Leaf, title: "Finding good tea", desc: "The eternal quest continues" },
      ],
    },

    right: {
      label: "05 / current stack",
      title: "Tools & Tech",
      pageNum: "5",
      items: [
        { icon: Brain, title: "Currently learning", desc: "HCI research methods and neuro" },
        { icon: FileText, title: "Next.js, Tailwind CSS, TypeScript, Supabase", desc: "My main tools for full-stack" },
        { icon: Brain, title: "Python", desc: "ML, data, scripting" },
        { icon: FileText, title: "Figma", desc: "Design and prototyping" },
        { icon: Cpu, title: "Verilog + Assembly", desc: "EE and systems" },
      ],
    },
  },

  {
    left: {
      label: "06 / on the shelf",
      title: "Reading & Watching",
      pageNum: "6",
      items: [
        { icon: Book, title: "Mastery - Robert Greene", desc: "On craft, time, and deep work" },
        { icon: Book, title: "The Design of Everyday Things", desc: "Norman on affordances and feedback" },
        { icon: Tv, title: "Space history documentaries", desc: "Apollo, Voyager, ISS ops" },
        { icon: FileText, title: "HCI research papers", desc: "Cognitive load, adaptive interfaces" },
      ],
    },

    right: {
      label: "07 / fun facts",
      title: "A Few Things",
      pageNum: "7",
      items: [
        { icon: Smile, title: "I name projects before building them", desc: "The name comes first, always" },
        { icon: Book, title: "I read product teardowns for fun", desc: "Figma, Notion, Linear - dissecting everything" },
        { icon: Satellite, title: "I think about space way too much", desc: "Occupational hazard of HCI research" },
        { icon: Coffee, title: "Tea > coffee, always", desc: "Currently on a loose-leaf obsession" },
      ],
    },
  },
]

function Page({
  data,
  side,
  onTocClick,
}: {
  data: PageData
  side: "left" | "right"
  onTocClick?: (spread: number) => void
}) {
  return (
    <div
      className={cn(
        "flex-1 relative bg-card/80 flex flex-col",
        side === "left"
          ? "border-r border-border/60 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-1.5 after:bg-secondary/60 after:border-l after:border-border/30"
          : "",
      )}
    >
      <div className="p-5 sm:p-6 flex-1 overflow-hidden">
        <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground mb-3">{data.label}</p>
        <h3 className="text-sm font-bold text-foreground mb-3">{data.title}</h3>

        {data.overview && (
          <p className="text-[11px] text-muted-foreground leading-relaxed mb-4 italic">{data.overview}</p>
        )}

        {data.toc && (
          <div className="space-y-1.5">
            {data.toc.map((entry) => {
              const Icon = entry.icon
              return (
                <button
                  key={entry.title}
                  onClick={() => onTocClick?.(entry.spread)}
                  className="w-full flex items-center gap-2 group hover:text-primary transition-colors"
                >
                  <Icon className="h-3 w-3 text-primary shrink-0" />
                  <span className="text-xs text-foreground group-hover:text-primary transition-colors whitespace-nowrap">{entry.title}</span>
                  <div className="flex-1 border-b border-dashed border-border/40 mx-1" />
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {String(entry.pageNum).padStart(2, "0")}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {data.stats && (
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {data.stats.map((s) => (
              <div key={s.lbl} className="rounded-lg bg-secondary/60 p-2 text-center">
                <span className="block text-base font-bold text-primary">{s.val}</span>
                <span className="block font-mono text-[10px] text-muted-foreground mt-0.5">{s.lbl}</span>
              </div>
            ))}
          </div>
        )}

        {data.items && (
          <div className="space-y-2.5">
            {data.items.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex items-start gap-2">
                  <Icon className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-foreground leading-tight">{item.title}</p>
                    <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className={cn("px-5 pb-4 pt-2 flex", side === "left" ? "justify-start" : "justify-end")}>
        <span className="font-mono text-[10px] text-muted-foreground">{data.pageNum}</span>
      </div>
    </div>
  )
}

export function FlipBook() {
  const [current, setCurrent] = useState(0)

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full max-w-lg mb-0 px-1 gap-0.5 justify-end">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = tab.spread === current
          return (
            <button
              key={tab.label}
              onClick={() => setCurrent(tab.spread)}
              title={tab.label}
              className={cn(
                "flex items-center justify-center w-7 h-6 rounded-t-md border border-b-0 transition-all duration-200",
                isActive
                  ? "bg-card/80 border-border/60 text-primary"
                  : "bg-secondary/40 border-border/30 text-muted-foreground hover:text-primary hover:bg-secondary/70"
              )}
            >
              <Icon className="h-3 w-3" />
            </button>
          )
        })}
      </div>

      <div className="flex w-full max-w-lg h-96 rounded-r-xl rounded-l-sm border border-border/60 overflow-hidden">
        <Page
          data={spreads[current].left}
          side="left"
          onTocClick={(spread) => setCurrent(spread)}
        />
        <Page data={spreads[current].right} side="right" />
      </div>

      <div className="w-full max-w-lg h-1.5 bg-secondary/60 rounded-b-lg border border-border/30 border-t-0" />

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => setCurrent((p) => Math.max(0, p - 1))}
          disabled={current === 0}
          className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="h-3 w-3" /> prev
        </button>

        <div className="flex gap-1.5">
          {spreads.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                i === current ? "bg-primary w-3" : "bg-border w-1.5 hover:bg-primary/40"
              )}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrent((p) => Math.min(spreads.length - 1, p + 1))}
          disabled={current === spreads.length - 1}
          className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
        >
          next <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}