export type FieldNote = {
  id: string
  date: string // YYYY-MM-DD
  location: string
  observation: string
  /** The HCI principle it illustrates */
  principle: string
  /** "friction" | "delight" | "confusion" | "invisible" */
  type: FieldNoteType
  tags: string[]
}

export type FieldNoteType = "friction" | "delight" | "confusion" | "invisible"

export const fieldNotes: FieldNote[] = [
  {
    id: "fn-001",
    date: "2026-05-29",
    location: "UCR Engineering Building, elevator",
    observation:
      "The elevator close-door button has no tactile feedback and a 400ms delay before it registers. Everyone presses it twice, then wonders if they broke it.",
    principle: "Feedback - Norman's action cycle requires perceivable system response within 100ms for the action to feel acknowledged.",
    type: "friction",
    tags: ["feedback", "affordance", "physical UI"],
  },
  {
    id: "fn-002",
    date: "2026-05-25",
    location: "Campus café, ordering kiosk",
    observation:
      "The 'confirm order' button is green and in the same position as 'add to cart' on the previous screen. Three people I watched accidentally confirmed before reviewing.",
    principle: "Consistency & standards - same visual weight + position implies same action type. Destructive or committing actions need visual distinction.",
    type: "confusion",
    tags: ["consistency", "visual hierarchy", "error prevention"],
  },
  {
    id: "fn-003",
    date: "2026-05-20",
    location: "Notion mobile app",
    observation:
      "Swiping a block left reveals a color picker that slides in at exactly the speed your thumb moved. The motion latency matches gesture velocity - it feels like pulling something physical.",
    principle: "Direct manipulation - when digital response mirrors physical gesture physics, cognitive load drops because the interface becomes a mental model extension.",
    type: "delight",
    tags: ["direct manipulation", "gesture", "motion design"],
  },
  {
    id: "fn-004",
    date: "2026-05-14",
    location: "University library turnstile",
    observation:
      "The turnstile accepts both tap-in and a backup barcode scan. Most people don't know the barcode option exists - there's no affordance pointing to it. When cards fail, people give up instead of trying the backup.",
    principle: "Visibility of system status + discoverability - hidden affordances don't exist for most users even if technically present.",
    type: "invisible",
    tags: ["discoverability", "affordance", "physical UI"],
  },
  {
    id: "fn-005",
    date: "2026-05-08",
    location: "GitHub pull request review",
    observation:
      "The 'resolve conversation' button disappears after you click it and the thread collapses - but there's no undo. I've accidentally resolved threads I meant to keep open multiple times.",
    principle: "Error recovery - irreversible actions with no undo violate the principle of forgiving interfaces, especially in collaborative tools where mistakes affect others.",
    type: "friction",
    tags: ["error recovery", "collaborative tools", "undo"],
  },
  {
    id: "fn-006",
    date: "2026-05-01",
    location: "Linear issue tracker",
    observation:
      "Pressing 'C' anywhere creates a new issue. The keyboard shortcut works even when focus is on a text field I'm actively typing in - it hijacked my description mid-sentence.",
    principle: "Context-sensitivity - global hotkeys that don't respect input context create mode errors; the system has no model of what the user is currently doing.",
    type: "confusion",
    tags: ["keyboard shortcuts", "context", "mode errors"],
  },
]

export const allFieldNoteTags = [...new Set(fieldNotes.flatMap((n) => n.tags))]

export const fieldNoteTypeConfig: Record<FieldNoteType, { label: string; color: string; pill: string; dot: string }> = {
  friction:  { label: "friction",  color: "text-red-500",    pill: "border-red-500/30 bg-red-500/10 text-red-500",    dot: "bg-red-500" },
  delight:   { label: "delight",   color: "text-green-500",  pill: "border-green-500/30 bg-green-500/10 text-green-500", dot: "bg-green-500" },
  confusion: { label: "confusion", color: "text-yellow-500", pill: "border-yellow-500/30 bg-yellow-500/10 text-yellow-500", dot: "bg-yellow-500" },
  invisible: { label: "invisible", color: "text-blue-400",   pill: "border-blue-400/30 bg-blue-400/10 text-blue-400",  dot: "bg-blue-400" },
}
