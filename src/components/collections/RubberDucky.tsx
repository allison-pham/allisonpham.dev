"use client"
import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/src/lib/core-features/utils"
import { MessageSquare, RotateCcw, ChevronDown, ChevronUp, Lightbulb } from "lucide-react"

const PROMPTS = [
  "What exactly am I trying to accomplish?",
  "What do I already know about this problem?",
  "What assumptions am I making?",
  "Can I break this into smaller pieces?",
  "Where does it go wrong, step by step?",
  "What would need to be true for my solution to work?",
  "Have I seen something like this before?",
  "What's the simplest version of this problem?",
]

const STEPS = [
  {
    number: "01",
    title: "Set the scene",
    description: "Explain the full context out loud - what you're building, what it should do, and what the goal is.",
  },
  {
    number: "02",
    title: "Walk through your logic",
    description: "Narrate every step of your thinking as if the duck has zero context. No skipping, no shortcuts.",
  },
  {
    number: "03",
    title: "Spot the gap",
    description: "Usually somewhere in the explanation, you'll hear yourself say something that doesn't add up.",
  },
  {
    number: "04",
    title: "Solve it",
    description: "The act of articulating the problem is often enough to surface the answer. Trust the process.",
  },
]

export function RubberDucky() {
  const [isVisible, setIsVisible] = useState(false)
  const [activePromptIndex, setActivePromptIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [quackCount, setQuackCount] = useState(0)
  const [isQuacking, setIsQuacking] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePromptIndex((prev) => (prev + 1) % PROMPTS.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const handleQuack = useCallback(() => {
    setQuackCount((c) => c + 1)
    setIsQuacking(true)
    setTimeout(() => setIsQuacking(false), 600)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className={cn("mb-10 sm:mb-14 space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            debug ritual;
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Rubber Duck Method 🐥
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            Explain your problem out loud to an inanimate object. It works embarrassingly well.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">

          {/* Duck + rotating prompt - left col */}
          <div
            className={cn(
              "lg:col-span-2 flex flex-col items-center justify-center gap-6 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/8 via-card/50 to-primary/8 glass p-8 sm:p-10 opacity-0",
              isVisible && "animate-fade-in-up"
            )}
          >
            {/* Duck */}
            <button
              onClick={handleQuack}
              aria-label="Quack the duck"
              className={cn(
                "group relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/40 bg-primary/10 text-5xl transition-all duration-300 hover:border-primary hover:bg-primary/20 active:scale-90 cursor-pointer select-none",
                isQuacking && "scale-110 border-primary bg-primary/20"
              )}
            >
              <span
                className={cn(
                  "transition-transform duration-150",
                  isQuacking && "-rotate-12 scale-110"
                )}
              >
                🐥
              </span>
              {isQuacking && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 animate-fade-in font-mono text-xs text-primary">
                  quack!
                </span>
              )}
            </button>

            {/* Quack counter */}
            <p className="font-mono text-xs text-muted-foreground">
              {quackCount === 0
                ? "tap to summon"
                : `quacked ${quackCount}×`}
            </p>

            {/* Rotating question */}
            <div className="w-full rounded-lg border border-border/60 bg-card/60 p-4 text-center">
              <p className="mb-2 font-mono text-[10px] tracking-widest text-muted-foreground">
                duck asks:
              </p>
              <p
                key={activePromptIndex}
                className="text-sm font-medium leading-relaxed text-foreground animate-fade-in-up"
              >
                {PROMPTS[activePromptIndex]}
              </p>
            </div>

            <button
              onClick={() => setActivePromptIndex((prev) => (prev + 1) % PROMPTS.length)}
              className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <RotateCcw className="h-3 w-3" />
              next question
            </button>
          </div>

          {/* Steps - right col */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {STEPS.map((step, index) => (
              <div
                key={step.number}
                className={cn(
                  "group flex gap-5 rounded-xl border border-border/50 bg-card/40 glass p-6 hover-lift transition-all duration-300 hover:border-primary/40 opacity-0",
                  isVisible && "animate-fade-in-up"
                )}
                style={{ animationDelay: `${index * 80 + 150}ms` }}
              >
                <span className="mt-0.5 font-mono text-xs font-semibold text-primary/60 transition-colors group-hover:text-primary">
                  {step.number}
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-mono text-sm font-semibold tracking-wider text-foreground transition-colors group-hover:text-primary">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable "why it works" */}
        <div className={cn("mt-6 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "400ms" }}>
          <button
            onClick={() => setIsExpanded((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl border border-border/50 bg-card/40 glass px-6 py-4 transition-all duration-300 hover:border-primary/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                <Lightbulb className="h-4 w-4" />
              </div>
              <span className="font-mono text-sm font-semibold tracking-wider text-foreground">
                why this actually works
              </span>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {isExpanded && (
            <div className="mt-2 rounded-xl border border-border/40 bg-card/30 px-6 py-5 animate-fade-in-up">
              <div className="grid gap-4 sm:grid-cols-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                  <span className="font-mono font-semibold text-foreground">Articulation forces clarity.</span>{" "}
                  Vague mental models feel complete until you have to verbalize them.
                </p>
                <p>
                  <span className="font-mono font-semibold text-foreground">No judgment, no pressure.</span>{" "}
                  The duck never interrupts. You hear your own assumptions without the filter of how they'll land.
                </p>
                <p>
                  <span className="font-mono font-semibold text-foreground">Explaining is understanding.</span>{" "}
                  Teaching is the highest form of learning. Even to a duck.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}