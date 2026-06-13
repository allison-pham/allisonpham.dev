export type ThoughtNode = {
  id: string
  label: string
  description: string
  domain: "hci" | "engineering" | "design" | "research" | "personal" | "space"
  connections: string[] // ids of connected nodes
  strength: number // 1–3, controls node size
}

export const thoughtNodes: ThoughtNode[] = [
  {
    id: "cognitive-load",
    label: "Cognitive Load",
    description: "How much mental effort an interface demands - and how to reduce it without dumbing things down.",
    domain: "hci",
    connections: ["working-memory", "interface-design", "zero-gravity-ui", "hick-law"],
    strength: 3,
  },
  {
    id: "working-memory",
    label: "Working Memory",
    description: "Miller's 7±2 still holds. Most UIs ignore it entirely.",
    domain: "research",
    connections: ["cognitive-load", "information-density"],
    strength: 2,
  },
  {
    id: "interface-design",
    label: "Interface Design",
    description: "The gap between what a system can do and what a person can confidently do with it.",
    domain: "design",
    connections: ["cognitive-load", "affordance", "direct-manipulation", "systems-thinking"],
    strength: 3,
  },
  {
    id: "affordance",
    label: "Affordance",
    description: "Gibson's original definition vs Norman's - the distinction matters more than most designers admit.",
    domain: "hci",
    connections: ["interface-design", "physical-ui"],
    strength: 2,
  },
  {
    id: "zero-gravity-ui",
    label: "Zero-G Interfaces",
    description: "What changes about interaction design when the human body has no stable orientation reference?",
    domain: "space",
    connections: ["cognitive-load", "space-systems", "hci-under-pressure"],
    strength: 3,
  },
  {
    id: "space-systems",
    label: "Space Systems",
    description: "Orbital mechanics, mission architecture, the engineering constraints that make space hard.",
    domain: "space",
    connections: ["zero-gravity-ui", "hci-under-pressure", "systems-thinking"],
    strength: 2,
  },
  {
    id: "hci-under-pressure",
    label: "HCI Under Pressure",
    description: "How stress, time pressure, and high stakes change how people interact with interfaces.",
    domain: "research",
    connections: ["zero-gravity-ui", "cognitive-load", "space-systems"],
    strength: 2,
  },
  {
    id: "direct-manipulation",
    label: "Direct Manipulation",
    description: "Shneiderman's principle: visible objects, rapid reversible actions, immediate feedback.",
    domain: "hci",
    connections: ["interface-design", "affordance"],
    strength: 2,
  },
  {
    id: "systems-thinking",
    label: "Systems Thinking",
    description: "Everything is connected. The failure mode is optimizing a node at the expense of the whole.",
    domain: "research",
    connections: ["interface-design", "space-systems", "software-architecture"],
    strength: 3,
  },
  {
    id: "software-architecture",
    label: "Software Architecture",
    description: "The decisions that are hardest to reverse - which is exactly why they need to be made explicitly.",
    domain: "engineering",
    connections: ["systems-thinking", "0-to-1"],
    strength: 2,
  },
  {
    id: "0-to-1",
    label: "0 → 1 Building",
    description: "The specific chaos and clarity of starting something from nothing.",
    domain: "personal",
    connections: ["software-architecture", "design-process"],
    strength: 2,
  },
  {
    id: "design-process",
    label: "Design Process",
    description: "Not a methodology - a disposition. Iterate, externalize, test, discard, repeat.",
    domain: "design",
    connections: ["0-to-1", "interface-design"],
    strength: 2,
  },
  {
    id: "hick-law",
    label: "Hick's Law",
    description: "Decision time grows logarithmically with number of choices. Menus are never neutral.",
    domain: "hci",
    connections: ["cognitive-load", "information-density"],
    strength: 1,
  },
  {
    id: "information-density",
    label: "Information Density",
    description: "Tufte was right - chartjunk is a moral failing. But so is hiding data behind progressive disclosure theater.",
    domain: "design",
    connections: ["hick-law", "working-memory", "interface-design"],
    strength: 2,
  },
  {
    id: "physical-ui",
    label: "Physical UI",
    description: "Buttons, knobs, tactile surfaces - the parts of interface design that HCI researchers underindex on.",
    domain: "hci",
    connections: ["affordance", "zero-gravity-ui"],
    strength: 1,
  },
]

export const domainConfig: Record<ThoughtNode["domain"], { label: string; color: string; bg: string; border: string }> = {
  hci:         { label: "HCI",         color: "#a78bfa", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.35)" },
  engineering: { label: "Engineering", color: "#60a5fa", bg: "rgba(96,165,250,0.12)",  border: "rgba(96,165,250,0.35)"  },
  design:      { label: "Design",      color: "#f472b6", bg: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.35)" },
  research:    { label: "Research",    color: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.35)"  },
  personal:    { label: "Personal",    color: "#fbbf24", bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.35)"  },
  space:       { label: "Space",       color: "#818cf8", bg: "rgba(129,140,248,0.12)", border: "rgba(129,140,248,0.35)" },
}
