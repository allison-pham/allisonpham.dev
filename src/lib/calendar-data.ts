export type EntryType = "event" | "daily" | "schedule";

export type CalendarEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  startTime?: string; // "HH:MM" 24h, optional
  endTime?: string; // "HH:MM" 24h, optional
  title: string;
  description?: string;
  type: EntryType;
  /** sub-tag for display */
  tag: string;
  emoji: string;
  location?: string;
  url?: string;
};

export const typeConfig: Record<
  EntryType,
  {
    label: string;
    pill: string;
    dot: string;
    bg: string;
  }
> = {
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
};

export const entries: CalendarEntry[] = [
  {
    id: "hci",
    date: "2026-08-20",
    title: "HCI research",
    description: "Presenting current findings on cognitive load in interface design to lab.",
    type: "event",
    tag: "research",
    emoji: "🔬",
    location: "Research Lab",
  },

  {
    id: "citrus-cutie-leads-meeting",
    date: "2026-08-23",
    title: "[Citrus & Cutie Hack] Leads Meeting",
    description: "Weekly sync with the organizing team - operations, finance, marketing, UI/UX design, and software engineering.",
    type: "event",
    tag: "hackathon",
    emoji: "🍊",
    location: "Online",
  },

  {
    id: "cutie-hack",
    date: "2026-11-21",
    title: "Cutie Hack 2026",
    description: "UCR's annual 12 hour, beginner-friendly hackathon.",
    type: "event",
    tag: "hackathon",
    emoji: "🐇",
    location: "UC Riverside - Winston Chung",
    url: "https://www.cutiehack.com",
  },

  // Schedule (what I'm up to)
  {
    id: "researching-hci",
    date: "2026-03-01",
    title: "Researching HCI for space systems",
    description: "Designing interfaces for time-constrained environments - cognitive load in zero-gravity workflows.",
    type: "schedule",
    tag: "research",
    emoji: "🛰️",
  },

  {
    id: "language",
    date: "2026-08-17",
    title: "Language study sprint",
    description: "Daily Anki + Bunpro sessions. Goal: reach N4 by end of summer.",
    type: "schedule",
    tag: "language",
    emoji: "🗣️",
  },

  {
    id: "portfolio",
    date: "2026-06-01",
    title: "Building portfolio [v7]",
    description: "Iterating personal site, where each version builds on the previous.",
    type: "schedule",
    tag: "building",
    emoji: "💻",
  },

  // Daily rituals
  {
    id: "tea",
    date: "2026-07-01",
    startTime: "06:00",
    endTime: "06:15",
    title: "Morning tea",
    description: "Jasmine green tea, quiet time to wake up and think about the day ahead.",
    type: "daily",
    tag: "ritual",
    emoji: "🍵",
  },

  {
    id: "productivity",
    date: "2026-07-01",
    startTime: "06:30",
    endTime: "07:00",
    title: "Planning session",
    description: "Plan the day ahead, review tasks, and set priorities. Whatever comes to mind - systems, interfaces, and random ideas.",
    type: "daily",
    tag: "ritual",
    emoji: "🌱",
  },

  {
    id: "building",
    date: "2026-07-01",
    startTime: "08:00",
    endTime: "16:00",
    title: "Building new systems + researching HCI",
    description: "Focus block of building and researching human-computer interaction (HCI) for space systems.",
    type: "daily",
    tag: "focus",
    emoji: "💼",
  },

  {
    id: "extracurriculars-projects",
    date: "2026-07-01",
    startTime: "17:00",
    endTime: "20:00",
    title: "Extracurriculars + projects",
    description: "Time set aside for org planning, project development, and more.",
    type: "daily",
    tag: "focus",
    emoji: "🧑‍💻",
  },

  {
    id: "reading",
    date: "2026-07-01",
    startTime: "20:00",
    endTime: "20:30",
    title: "Reading",
    description: "Reading from bookshelf - HCI, design theory, etc.",
    type: "daily",
    tag: "reading",
    emoji: "📖",
  },

  {
    id: "field-notes",
    date: "2026-07-01",
    startTime: "20:30",
    endTime: "21:00",
    title: "Field notes",
    description: "Brain dump session - what I noticed today, what I'm thinking about, etc.",
    type: "daily",
    tag: "writing",
    emoji: "📓",
  },

  {
    id: "hobbies",
    date: "2026-07-01",
    startTime: "21:00",
    endTime: "23:30",
    title: "Hobbies",
    description: "Time dedicated towards personal enjoyment activities - puzzles and games. Always looking for new hobbies to try!",
    type: "daily",
    tag: "enjoyment",
    emoji: "🤹",
  },
];

export function getEntriesForMonth(year: number, month: number): CalendarEntry[] {
  const prefix = `${year}-${String(month).padStart(2, "0")}`;
  return entries.filter((e) => e.date.startsWith(prefix));
}

export function getEntriesForDate(dateStr: string): CalendarEntry[] {
  return entries.filter((e) => e.date === dateStr);
}

export function getDatesWithEntries(year: number, month: number): Set<string> {
  return new Set(getEntriesForMonth(year, month).map((e) => e.date));
}

export const allEntryTags = [...new Set(entries.map((e) => e.tag))];
