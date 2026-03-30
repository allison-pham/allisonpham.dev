"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, ToyBrick, Gamepad2, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const nostalgiaItems = [
  {
    id: "lego",
    title: "LEGO Sets",
    icon: <ToyBrick className="h-5 w-5" />,
    description: "Building worlds brick by brick, from castles to spaceships.",
    memory: "Countless hours spent creating and imagining."
  },
  {
    id: "storybook",
    title: "Storybooks",
    icon: <BookOpen className="h-5 w-5" />,
    description: "Classic tales and bedtime adventures.",
    memory: "The magic of turning pages and getting lost in stories."
  },
  {
    id: "games",
    title: "Retro Games",
    icon: <Gamepad2 className="h-5 w-5" />,
    description: "Pixelated fun and friendly competition.",
    memory: "Chasing high scores and sharing laughs."
  },
  // Add more items as desired
]

export function ChildhoodNostalgiaWhimsy() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative px-4 sm:px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className={cn("space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>  
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            Childhood Nostalgia & Whimsy
          </h2>
          <p className="text-base text-muted-foreground">A playful collection of memories, toys, and stories that shaped my early years.</p>
          <ul className="grid gap-6 sm:grid-cols-2 mt-6">
            {nostalgiaItems.map(item => (
              <li key={item.id} className="rounded-lg border p-4 flex gap-4 items-start bg-background/80 shadow-sm">
                <span className="shrink-0 mt-1">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <p className="text-xs mt-2 italic text-primary/80">{item.memory}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
