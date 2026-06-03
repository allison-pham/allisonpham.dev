"use client"
import Link from "next/link"
import { ArrowRight, Briefcase, Laptop, Satellite, Telescope, type LucideIcon } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { FlipBook } from "./CurrentQuestsBook"
import { useEffect, useRef, useState } from "react"

interface QuestCard {
  suit: string
  value: string
  suitColor: string
  icon: LucideIcon
  title: string
  description: string
}

const questCards: QuestCard[] = [
  {
    suit: "♠",
    value: "A",
    suitColor: "#1a1a2e",
    icon: Laptop,
    title: "Project sightings",
    description: "Building systems from the ground up, tinkering with new ideas",
  },

  {
    suit: "♥",
    value: "K",
    suitColor: "#db2777",
    icon: Briefcase,
    title: "Leading at orgs",
    description: "Involvement: Notion, ACM at UCR, Citrus Hack, Cutie Hack, etc.",
  },

  {
    suit: "♦",
    value: "Q",
    suitColor: "#d97706",
    icon: Telescope,
    title: "Builder at heart",
    description: "Always making something at the intersection of technology and design",
  },

  {
    suit: "♣",
    value: "J",
    suitColor: "#059669",
    icon: Satellite,
    title: "Research",
    description: "Machine learning, HCI, and 0→1 systems",
  },
]

function QuestPlayingCard({ card, index, isVisible }: { card: QuestCard; index: number; isVisible: boolean }) {
  const [flipped, setFlipped] = useState(false)
  const Icon = card.icon

  return (
    <div
      className={cn("opacity-0", isVisible && "animate-fade-in-up")}
      style={{ animationDelay: `${index * 100 + 200}ms` }}
    >
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{ width: 140, height: 210, cursor: "pointer", perspective: 700 }}
        className="mx-auto"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.45s ease",
          }}
        >
          {/* Front */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: "#fff",
              borderRadius: 14,
              border: "1.5px solid rgba(0,0,0,0.09)",
              padding: "12px 12px 10px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: 18, fontWeight: 700, color: card.suitColor, lineHeight: 1 }}>{card.value}</p>
                <p style={{ fontSize: 15, color: card.suitColor, lineHeight: 1 }}>{card.suit}</p>
              </div>
              <p style={{ fontSize: 22, color: card.suitColor, opacity: 0.18 }}>{card.suit}</p>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${card.suitColor}15`,
                  border: `1px solid ${card.suitColor}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: card.suitColor,
                }}
              >
                <Icon size={20} />
              </div>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: 11,
                  color: "#1a1a2e",
                  textAlign: "center",
                  lineHeight: 1.3,
                  maxWidth: 100,
                }}
              >
                {card.title}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <p style={{ fontSize: 15, color: card.suitColor, transform: "rotate(180deg)" }}>{card.suit}</p>
            </div>
          </div>

          {/* Back */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: `${card.suitColor}10`,
              border: `1.5px solid ${card.suitColor}35`,
              borderRadius: 14,
              padding: "16px 13px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: `0 2px 6px ${card.suitColor}0d`
            }}
          >
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: card.suitColor, marginBottom: 8 }}>{card.title}</p>
              <p style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.55 }}>{card.description}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 18, color: card.suitColor }}>{card.suit}</span>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: `${card.suitColor}80` }}>{card.value}</span>
            </div>
          </div>
        </div>
      </div>

      <p
        className="mt-2 text-center font-mono text-[10px] text-muted-foreground"
        style={{ opacity: flipped ? 0 : 0.6, transition: "opacity 0.3s" }}
      >
        flip ↺
      </p>
    </div>
  )
}

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
        <div
          className={cn(
            "mb-10 sm:mb-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between opacity-0",
            isVisible && "animate-fade-in-up",
          )}
        >
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

        <div
          className={cn(
            "mb-12 sm:mb-16 grid gap-12 lg:grid-cols-2 lg:items-start opacity-0",
            isVisible && "animate-fade-in-up",
          )}
        >
          <div className="space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
            <p>
              Good design is sometimes invisible. It signifies the difference between a system that constrains and
              extends people. The best interfaces don't just respond to people, they think with them.
            </p>

            {/* <p>
              Previously I've built at Nucleo, NASA, research labs for CS and HCI, etc. Currently I'm designing at
              the intersection of software, cognition, and product. I'm a researcher (located in the West Coast) and
              study computer engineering at UC Riverside through the intersection of computer science, electrical
              engineering, human-computer interaction, and product design.
            </p> */}

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
              , and engage further through campus and international initiatives. I'm currently researching HCI for
              systems by designing interfaces that hold up in different environments.
            </p>

            {/* <p>
              In my childhood, I explored as much as I could find just to understand how it worked. That instinct
              became a passion with how systems shape the way people think, decide, and act. My target is to build
              things that feel extensions of the mind - not obstacles to it.
            </p> */}

            <p>
              My current rabbit holes: cognitive load in interface design, space systems, what it means to design for
              cognition under pressure, and whatever I find at the bottom of a good cup of tea.
            </p>
          </div>

          <div className="flex justify-center lg:justify-start lg:pt-2">
            <FlipBook />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {questCards.map((card, index) => (
            <QuestPlayingCard key={card.title} card={card} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}