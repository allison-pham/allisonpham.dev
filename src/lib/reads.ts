export type Read = {
  title: string
  url: string
  source: string
  /** One sentence. The discipline is the point. */
  why: string
  date: string // YYYY-MM-DD
  tags: string[]
}

export const reads: Read[] = [
  {
    title: "The Humane Interface",
    url: "https://en.wikipedia.org/wiki/The_Humane_Interface",
    source: "Jef Raskin",
    why: "Argues that interfaces should eliminate modes entirely - changed how I think about state visibility in UI.",
    date: "2026-05-28",
    tags: ["HCI", "design"],
  },
  {
    title: "Fitts's Law and the Design of Touch Interfaces",
    url: "https://www.interaction-design.org/literature/topics/fitts-law",
    source: "Interaction Design Foundation",
    why: "The math behind why big buttons matter - surprisingly applicable to space systems where precision inputs are hard.",
    date: "2026-05-24",
    tags: ["HCI", "research"],
  },
  {
    title: "Attention and Effort - Daniel Kahneman",
    url: "https://en.wikipedia.org/wiki/Attention_and_Effort",
    source: "Daniel Kahneman",
    why: "Pre-Thinking Fast and Slow, this is where his dual-process theory started - denser but more precise.",
    date: "2026-05-20",
    tags: ["cognition", "research"],
  },
  {
    title: "Why Figma Bet on Multiplayer",
    url: "https://www.figma.com/blog/multiplayer-editing-in-figma/",
    source: "Figma Blog",
    why: "CRDTs explained accessibly - real-time collaboration as a design constraint, not just an engineering one.",
    date: "2026-05-15",
    tags: ["product", "engineering"],
  },
  {
    title: "Designing for the Extremes",
    url: "https://uxdesign.cc/designing-for-the-extremes-3e4f8a4a3d5b",
    source: "UX Collective",
    why: "Inclusive design framed as a forcing function: edge cases reveal the assumptions baked into the default.",
    date: "2026-05-10",
    tags: ["accessibility", "design"],
  },
  {
    title: "The Cathedral and the Bazaar",
    url: "http://www.catb.org/~esr/writings/cathedral-bazaar/cathedral-bazaar/",
    source: "Eric S. Raymond",
    why: "Open source as a social system, not just a licensing model - still the clearest articulation of why public building works.",
    date: "2026-05-05",
    tags: ["engineering", "culture"],
  },
]

export const allReadTags = [...new Set(reads.flatMap((r) => r.tags))]

/** Returns reads grouped by ISO week string e.g. "2026-W22" */
export function groupReadsByWeek(items: Read[]): Record<string, Read[]> {
  return items.reduce<Record<string, Read[]>>((acc, read) => {
    const d = new Date(read.date)
    const week = `${d.getFullYear()}-W${String(getISOWeek(d)).padStart(2, "0")}`
    acc[week] = [...(acc[week] ?? []), read]
    return acc
  }, {})
}

function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}