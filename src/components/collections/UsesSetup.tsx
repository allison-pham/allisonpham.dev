"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/utils"
import { ExternalLink } from "lucide-react"

type UseItem = {
  id: string
  name: string
  description: string
  link?: string
  favorite?: boolean
}

type UseCategory = {
  id: string
  label: string
  icon: string
  items: UseItem[]
}

const categories: UseCategory[] = [
  {
    id: "design",
    label: "Design",
    icon: "◈",
    items: [
      { id: "figma", name: "Figma", description: "Primary design tool. Everything from wireframes to final comps.", link: "https://figma.com", favorite: true },
      { id: "freeform", name: "Freeform", description: "Messy early-stage ideation and system mapping.", },
      { id: "framer", name: "Framer", description: "Prototyping and interactive design work.", link: "https://framer.com" },
    ],
  },
  {
    id: "dev",
    label: "Development",
    icon: "⌥",
    items: [
      { id: "vscode", name: "VS Code", description: "Main editor. Minimal setup, mostly just the essentials.", favorite: true },
      { id: "nextjs", name: "Next.js + TypeScript", description: "Default stack for web projects.", link: "https://nextjs.org" },
      { id: "tailwind", name: "Tailwind CSS", description: "Utility-first CSS. Pairs well with how I think about design tokens." },
      { id: "vercel", name: "Vercel", description: "Deploy everything here. Zero friction." },
    ],
  },
  {
    id: "thinking",
    label: "Thinking & Notes",
    icon: "▤",
    items: [
      { id: "notion", name: "Notion", description: "Where everything lives — research, notes, planning, brain dumps.", link: "https://notion.so", favorite: true },
      { id: "obsidian", name: "Obsidian", description: "For connected thought and research webs.", link: "https://obsidian.md" },
      { id: "paper", name: "Paper + pencil", description: "Interfaces first. Sketching before pixels, always.", favorite: false },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    icon: "◻",
    items: [
      { id: "mac", name: "MacBook Pro M3", description: "Main machine. Does everything I need without getting in the way." },
      { id: "ipad", name: "iPad Pro + Apple Pencil", description: "Sketching, reading papers, annotating designs." },
      { id: "tea", name: "A good cup of tea", description: "Non-negotiable. Oolong preferred.", favorite: true },
    ],
  },
]

export function UsesSetup() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const active = categories.find(c => c.id === activeCategory)!

  return (
    <section ref={sectionRef} className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">

        <div className={cn("mb-10 sm:mb-14 opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">tools of the trade;</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Uses + Setup ⌥</h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              The tools I actually reach for. Updated when something changes.
            </p>
          </div>
        </div>

        <div className={cn("grid gap-8 lg:grid-cols-[200px_1fr] opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "100ms" }}>

          {/* Category tabs — vertical on desktop */}
          <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:pb-0 lg:overflow-x-visible">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 rounded-lg border px-4 py-2.5 font-mono text-xs tracking-wide transition-all duration-300 text-left active:scale-[0.98]",
                  activeCategory === cat.id
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground bg-card/40"
                )}
              >
                <span className="text-sm select-none">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Items */}
          <div className="space-y-3">
            {active.items.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "group relative flex items-start gap-4 rounded-xl border border-border/60 bg-card/40 glass p-5 sm:p-6 transition-all duration-300 hover-lift hover:border-primary/40",
                )}
              >
                {item.favorite && (
                  <div className="absolute top-4 right-4 font-mono text-[10px] text-primary/60">★ fav</div>
                )}

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold tracking-tight text-sm transition-colors group-hover:text-primary">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground pr-12">
                    {item.description}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {item.link.replace("https://", "")}
                    </a>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full rounded-b-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}