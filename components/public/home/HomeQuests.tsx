"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Briefcase, Laptop, Satellite } from "lucide-react"

const values = [
  {
    icon: Satellite,
    title: "Researching autonomous traversal for space exploration",
    description:
      "Leading @ NASA program",
  },

  {
    icon: Laptop,
    title: "Project sightings - machine learning & HCI",
    description:
      "Building systems from the ground up, tinkering with new ideas",
  },

  {
    icon: Briefcase,
    title: "Leading orgs across campus & internationally",
    description:
      "Currently: President @ ACM at UCR, Director @ Citrus & Cutie Hack, etc.",
  },

  // {
  //   icon: Hammer,
  //   title: "Misc.",
  //   description:
  //     "Avid polymath & hobbyist, currently buildling & designing in the context of space",
  // },
]

export function CurrentQuests() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12\">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-10 sm:mb-14 space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">missions;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Current Quests ⋆｡°</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={cn(
                "group flex gap-6 rounded-xl border border-border/50 bg-card/40 glass p-7 hover-lift transition-all duration-400 hover:border-primary/40 opacity-0",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <value.icon className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-semibold tracking-wider text-foreground transition-colors group-hover:text-primary">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}