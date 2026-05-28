"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/src/lib/utils"
import { ArrowRight, Briefcase, Laptop, Satellite, Telescope } from "lucide-react"
import Link from "next/link"
import { FlipBook } from "./HomeBook"

const values = [
  {
    icon: Laptop,
    title: "Project sightings",
    description: "Building systems from the ground up, tinkering with new ideas",
  },
  {
    icon: Briefcase,
    title: "Leading across campus + internationally",
    description: "Involvement: Notion, ACM at UCR, Citrus Hack, Cutie Hack, etc.",
  },
  {
    icon: Telescope,
    title: "Builder at heart",
    description: "Always making something at the intersection of technology and design",
  },
  {
    icon: Satellite,
    title: "Research",
    description: "Machine learning, HCI, and 0→1 systems",
  },
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
    <section ref={sectionRef} className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-10 sm:mb-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="space-y-3 sm:flex-1 sm:min-w-0">
            <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">missions;</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Current Quests ⋆｡°</h2>
          </div>
          <Link
            href="/about"
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            Explore more @ about
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* About blurb */}
        <div className={cn("mb-10 sm:mb-14 grid gap-12 lg:grid-cols-2 lg:items-start opacity-0", isVisible && "animate-fade-in-up")}>
        {/* <div className={cn("mb-10 sm:mb-14 max-w-2xl space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground opacity-0", isVisible && "animate-fade-in-up")}> */}
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
            <p>
              Good design is sometimes invisible. It signifies the difference between a system that constrains and extends
              people. The best interfaces don't just respond to people, they think with them.
            </p>

            <p>
              Previously I've built at Nucleo, NASA, research labs for CS and HCI, etc. Currently I'm designing at the intersection of software, cognition, and product. I'm a researcher
              (located in the West Coast) and study computer engineering at UC Riverside{" "}
              through the intersection of computer science, electrical engineering, human-computer interaction, and product design.
            </p>

            <p>
              I lead{" "}
              <a
                href="https://acm.cs.ucr.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-wavy decoration-current/45 underline-offset-3 transition-colors hover:decoration-current/80"
              >
                ACM
              </a>{" "}
              as President, direct{" "}
              <a
                href="https://www.citrushack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-wavy decoration-current/45 underline-offset-3 transition-colors hover:decoration-current/80"
              >
                Citrus Hack
              </a>{" "}
              and{" "}
              <a
                href="https://www.cutiehack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-wavy decoration-current/45 underline-offset-3 transition-colors hover:decoration-current/80"
              >
                Cutie Hack
              </a>
              , serve as a Campus Leader at{" "}
              <a
                href="https://notion.so"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-wavy decoration-current/45 underline-offset-3 transition-colors hover:decoration-current/80"
              >
                Notion
              </a>
              , and engage further through campus and international initiatives. I'm currently researching HCI for systems
              by designing interfaces that hold up in different environments.
            </p>

            <p>
              In my childhood, I explored as much as I could find just to understand how it worked.
              That instinct became a passion with how systems shape the way people think, decide, and act.
              My target is to build things that feel extensions of the mind - not obstacles to it.
            </p>

            <p>
              My current rabbit holes: cognitive load in interface design, space systems, what it means to design for
              cognition under pressure, and whatever I find at the bottom of a good cup of tea.
            </p>
        </div>

        <div className="flex justify-center lg:justify-start lg:pt-2">
          <FlipBook />
        </div>
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