export type EntryType = "event" | "daily" | "schedule"

export type CalendarEntry = {
  id: string
  date: string           // YYYY-MM-DD
  time?: string          // "HH:MM" 24h, optional
  endTime?: string       // "HH:MM" 24h, optional
  title: string
  description?: string
  type: EntryType
  /** sub-tag for display */
  tag: string
  emoji: string
  location?: string
  url?: string
}

// ─── Type display config ──────────────────────────────────────────────────────

export const typeConfig: Record<EntryType, {
  label: string
  pill: string
  dot: string
  bg: string
}> = {
  event: {
    label: "event",
    pill: "border-primary/40 bg-primary/10 text-primary",
    dot: "bg-primary",
    bg: "from-primary/8 to-transparent",
  },
  daily: {
    label: "daily ritual",
    pill: "border-amber-500/40 bg-amber-500/10 text-amber-500",
    dot: "bg-amber-500",
    bg: "from-amber-500/8 to-transparent",
  },
  schedule: {
    label: "schedule",
    pill: "border-green-500/40 bg-green-500/10 text-green-500",
    dot: "bg-green-500",
    bg: "from-green-500/8 to-transparent",
  },
}

// ─── Entries ──────────────────────────────────────────────────────────────────
// Update these as things happen. Add freely - the calendar renders whatever is here.

export const entries: CalendarEntry[] = [
  // ── Events ──
  {
    id: "ev-001",
    date: "2026-06-07",
    title: "Citrus Hack organizing meeting",
    description: "Weekly sync with the organizing team - logistics, sponsor outreach, venue.",
    type: "event",
    tag: "hackathon",
    emoji: "🍊",
    location: "UCR",
  },
  {
    id: "ev-002",
    date: "2026-06-12",
    title: "ACM officer transition",
    description: "Handing off president duties to the incoming team. A little bittersweet.",
    type: "event",
    tag: "ACM",
    emoji: "🎓",
    location: "UCR",
  },
  {
    id: "ev-003",
    date: "2026-11-14",
    title: "Cutie Hack 2026",
    description: "Annual beginner-friendly hackathon. Directing for the second year.",
    type: "event",
    tag: "hackathon",
    emoji: "🌸",
    location: "UC Riverside",
    url: "https://www.cutiehack.com",
  },
  {
    id: "ev-004",
    date: "2026-08-03",
    title: "HCI research presentation",
    description: "Presenting current findings on cognitive load in interface design to the lab.",
    type: "event",
    tag: "research",
    emoji: "🔬",
    location: "Research Lab",
  },

  // ── Schedule / what I'm up to ──
  {
    id: "sc-001",
    date: "2026-06-01",
    endTime: "2026-08-31",
    title: "Researching HCI for space systems",
    description: "Designing interfaces for high-stakes, time-constrained environments. Specifically cognitive load in zero-gravity workflows.",
    type: "schedule",
    tag: "research",
    emoji: "🛰️",
  },
  {
    id: "sc-002",
    date: "2026-06-01",
    title: "Building portfolio v4",
    description: "Iterating on the personal site. Each version teaches something the last couldn't.",
    type: "schedule",
    tag: "building",
    emoji: "💻",
  },
  {
    id: "sc-003",
    date: "2026-06-15",
    title: "Japanese study sprint",
    description: "Daily Anki + Bunpro sessions. Goal: reach N4 by end of summer.",
    type: "schedule",
    tag: "language",
    emoji: "🇯🇵",
  },

  // ── Daily rituals ──
  {
    id: "dy-001",
    date: "2026-06-01",
    time: "07:30",
    title: "Morning tea",
    description: "Jasmine green. 175°F exactly. Non-negotiable.",
    type: "daily",
    tag: "ritual",
    emoji: "🍵",
  },
  {
    id: "dy-002",
    date: "2026-06-01",
    time: "08:00",
    title: "Sketch session",
    description: "Paper first. Whatever is in my head - systems, interfaces, random ideas.",
    type: "daily",
    tag: "ritual",
    emoji: "✏️",
  },
  {
    id: "dy-003",
    date: "2026-06-01",
    time: "13:00",
    title: "Tea break #2",
    description: "Oolong or hojicha depending on mood. The afternoon reset.",
    type: "daily",
    tag: "ritual",
    emoji: "🫖",
  },
  {
    id: "dy-004",
    date: "2026-06-01",
    time: "14:00",
    title: "Deep work block",
    description: "Research or building. Phone face down, lo-fi on, do not disturb.",
    type: "daily",
    tag: "focus",
    emoji: "🌿",
  },
  {
    id: "dy-005",
    date: "2026-06-01",
    time: "19:00",
    title: "Reading hour",
    description: "The physical kind. Usually HCI, design theory, or whatever fell off the antilibrary shelf.",
    type: "daily",
    tag: "ritual",
    emoji: "📚",
  },
  {
    id: "dy-006",
    date: "2026-06-01",
    time: "21:30",
    title: "Field notes",
    description: "Brain dump. What I noticed today, what I'm thinking about, loose ends.",
    type: "daily",
    tag: "writing",
    emoji: "📓",
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getEntriesForMonth(year: number, month: number): CalendarEntry[] {
  const prefix = `${year}-${String(month).padStart(2, "0")}`
  return entries.filter((e) => e.date.startsWith(prefix))
}

export function getEntriesForDate(dateStr: string): CalendarEntry[] {
  return entries.filter((e) => e.date === dateStr)
}

export function getDatesWithEntries(year: number, month: number): Set<string> {
  return new Set(getEntriesForMonth(year, month).map((e) => e.date))
}

export const allEntryTags = [...new Set(entries.map((e) => e.tag))]