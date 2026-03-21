/**
 * Behind the Scenes Data
 * Independent content showcase page
 * Shows drafts, iterations, messy process for various work
 */

export interface Iteration {
  version: number
  date: string
  title: string
  description: string
  changes?: string[]
  feedback?: string[]
  timeSpent?: string
  decisionLog?: string
  tags?: string[]
}

export interface BehindTheScenesItem {
  id: string
  title: string
  subtitle: string
  description: string
  category: string
  startDate: string
  status: "drafting" | "iterating" | "refining" | "shipped" | "archived"
  totalTime?: string
  iterations: Iteration[]
  messyNotes?: string
  keyLessons?: string[]
  featured?: boolean
}

export const behindTheScenesItems: BehindTheScenesItem[] = [
  {
    id: "hci-in-space",
    title: "HCI in Space",
    subtitle: "Interaction design for astronauts",
    category: "Research",
    description: "Human-computer interaction concepts adapted for astronaut workflows and microgravity environments",
    startDate: "Jan 2026",
    status: "iterating",
    totalTime: "~80 hours",
    featured: true,
    messyNotes: `Started with: "How do astronauts actually interact with systems in microgravity?"
Early designs were too Earth-centric. Realized I needed to completely rethink spatial interactions.
Breakthrough: studying hand-gesture communication in zero-g training videos changed everything.
Key insight: Haptic feedback > visual feedback in a pressurized suit.`,
    keyLessons: [
      "Cognitive load is everything when lives depend on it",
      "Constraints breed innovation - can't use touchscreens in gloves",
      "Design for the actual context, not idealized conditions",
      "User research with real constraints (motion capture sim) reveals hidden issues",
    ],
    iterations: [
      {
        version: 1,
        date: "Jan 15, 2026",
        title: "Research Sprint",
        description: "Understanding EVA workflows, current interfaces, human factors in space",
        changes: [
          "Reviewed NASA ExoGlove specifications",
          "Watched ISS EVA training footage",
          "Researched human factors in extreme environments",
        ],
        timeSpent: "15 hours",
        tags: ["research", "discovery"],
      },
      {
        version: 2,
        date: "Jan 25, 2026",
        title: "Touchscreen Concept (Rejected)",
        description: "Early design: large touchscreen interface adapted for suits",
        decisionLog: "Abandoned - fine motor movements impossible in pressurized suit. Too many false touches.",
        feedback: [
          "HCI consultant: 'Eye strain in bright lunar light environments'",
          "Glove sensors can't reliably detect multi-touch",
        ],
        timeSpent: "18 hours",
        tags: ["concept", "failed-experiment"],
      },
      {
        version: 3,
        date: "Feb 8, 2026",
        title: "Gesture-Based Interaction",
        description: "Hand gesture recognition built on existing EVA communication",
        changes: [
          "12 core gestures based on real EVA hand signals",
          "Haptic confirmation for each gesture",
          "Proximity-based context switching",
        ],
        feedback: [
          "Positive: Aligns with how astronauts already communicate",
          "Challenge: Detecting gestures through thick gloves",
        ],
        timeSpent: "22 hours",
        decisionLog: "Why reinvent? Built on NASA's existing EVA protocols - they already work.",
        tags: ["breakthrough", "human-centered"],
      },
      {
        version: 4,
        date: "Feb 20, 2026",
        title: "Haptic Feedback Layer",
        description: "Visual-only feedback won't work in space - added complete haptic system",
        changes: [
          "8 distinct haptic patterns for different actions",
          "Pressure-sensitive areas instead of buttons",
          "Integration with PLSS notifications",
        ],
        timeSpent: "18 hours",
        decisionLog: "Astronauts rely on tactile feedback when visually overloaded. This was the missing piece.",
        tags: ["usability", "accessibility"],
      },
      {
        version: 5,
        date: "Mar 5, 2026",
        title: "Validation Testing",
        description: "Motion capture study with constrained glove simulation",
        feedback: [
          "94% gesture recognition accuracy with gloved hands ✓",
          "Wrist rotation limited - some gestures blocked during tool use",
          "Discovery: Need one-handed gesture variants",
        ],
        timeSpent: "12 hours",
        decisionLog: "Constraints became features. One-handed variants using finger combinations solved the problem.",
        tags: ["testing", "validation"],
      },
    ],
  },

  {
    id: "eevi-launch",
    title: "Eevi - Side Quests",
    subtitle: "From ambitious to shipped MVP",
    category: "Product",
    description: "Gamified task manager - the journey from feature bloat to focused product",
    startDate: "Jun 2024",
    status: "shipped",
    totalTime: "~120 hours",
    featured: true,
    messyNotes: `Started asking: "What if productivity had personality?"
Got distracted by features - skill trees, multiplayer, experience systems.
Hit a wall around v3 with too many half-baked features.
Breakthrough: Scope to core loop only. Tasks + Rewards. Everything else went away.
Result: Simple beats complex. Personality over features.`,
    keyLessons: [
      "Shipping a focused MVP teaches more than perfect planning ever will",
      "People connect with personality - tone matters as much as functionality",
      "Constraints force creativity - limiting to 3 reward types made them special",
      "Kill features ruthlessly. I cut 5 features to ship one good one.",
    ],
    iterations: [
      {
        version: 1,
        date: "Jun 1, 2024",
        title: "Brainstorm",
        description: "Initial concept: RPG mechanics + task management",
        decisionLog: "Way too ambitious. Tried to pack in: skill trees, leveling, multiplayer.",
        timeSpent: "8 hours",
        tags: ["ideation", "scope-creep"],
      },
      {
        version: 2,
        date: "Jun 15, 2024",
        title: "Research",
        description: "What makes task apps stick? What makes them abandoned?",
        changes: [
          "Analyzed completion rates across different reward systems",
          "Found sweet spot: 3-5 hour tasks for dopamine hits",
          "Tested notification timing",
        ],
        timeSpent: "12 hours",
        tags: ["research", "psychology"],
      },
      {
        version: 3,
        date: "Jul 5, 2024",
        title: "Core Loop Only",
        description: "Stripped EVERYTHING. Create → Complete → Reward. That's it.",
        changes: [
          "Killed skill trees",
          "Removed multiplayer",
          "Simplified to 3 reward types",
          "Basic XP bar visualization",
        ],
        feedback: [
          "User: 'Why no progression?' Me: Keeping it simple kills complexity.",
          "Surprise: Simple XP bar more motivating than complex system",
        ],
        timeSpent: "20 hours",
        decisionLog: "Less is more. People don't need complex progression. They need immediate feedback.",
        tags: ["simplification", "breakthrough"],
      },
      {
        version: 4,
        date: "Jul 20, 2024",
        title: "Add Personality",
        description: "Same mechanics, but now quests feel like actual RPGs",
        changes: [
          "Quest names: 'The {action} {obstacle}' template",
          "Witty reward descriptions",
          "Satisfying completion animations + sounds",
        ],
        timeSpent: "10 hours",
        decisionLog: "Personality changed everything. Mechanics haven't changed. Vibes completely different.",
        tags: ["polish", "voice"],
      },
      {
        version: 6,
        date: "Aug 2, 2024",
        title: "Beta → Public",
        description: "Real users found edge cases and unexpected delights",
        feedback: [
          "Loved: Failed quest screen that sympathizes with you",
          "Requested: Ability to chain quests together",
          "Discovered: Users created their own 'hard mode'",
        ],
        timeSpent: "15 hours",
        tags: ["user-feedback", "shipped"],
      },
    ],
  },

  {
    id: "bookmarks-evolution",
    title: "Bookmarks Collection",
    subtitle: "How a bookmark folder became a thinking tool",
    category: "System",
    description: "Evolution from random saved links to intentional thinking framework",
    startDate: "2025",
    status: "iterating",
    featured: false,
    messyNotes: `Started as: browser bookmarks. Chaotic organization.
Evolved into: curated thinking framework organized by mode.
Currently: monthly snapshots, concept library, experiment tracking.
Realization: Organization systems are products. They deserve care.`,
    keyLessons: [
      "Organization systems are tools - they deserve UX attention",
      "Revisiting old ideas often more valuable than collecting new ones",
      "Different life seasons need different frameworks",
      "Tagging + linking > folders. Easier to rediscover patterns.",
    ],
    iterations: [
      {
        version: 1,
        date: "2025-01",
        title: "Clean Up",
        description: "Moved from browser bookmarks to intentional collection",
        timeSpent: "2 hours",
        tags: ["organization"],
      },
      {
        version: 2,
        date: "2025-04",
        title: "Domain Organization",
        description: "Grouped bookmarks by thinking mode: building, decision-making, health, learning",
        changes: [
          "5 main domains",
          "Search across all domains",
          "Better discoverability",
        ],
        timeSpent: "4 hours",
        tags: ["structure"],
      },
      {
        version: 3,
        date: "2025-07",
        title: "Monthly Snapshots",
        description: "Track what's on my mind each month + concepts + experiments",
        changes: [
          "Monthly snapshot page",
          "Concepts library - frameworks I actually use",
          "Experiments section - small bets",
        ],
        timeSpent: "8 hours",
        decisionLog: "Realized: bookmarks should show thinking evolution, not just be a list.",
        tags: ["thinking-tool", "meta"],
      },
      {
        version: 4,
        date: "2025-10",
        title: "Linking & Patterns",
        description: "Connect related ideas across domains",
        changes: [
          "Links between related concepts",
          "Pattern detection across domains",
          "Easier to surface connections",
        ],
        timeSpent: "6 hours",
        tags: ["connections"],
      },
    ],
  },
]

export function getBehindTheScenesItem(id: string): BehindTheScenesItem | undefined {
  return behindTheScenesItems.find((item) => item.id === id)
}

export function getFeaturedItems(): BehindTheScenesItem[] {
  return behindTheScenesItems.filter((item) => item.featured)
}

export function getItemsByCategory(category: string): BehindTheScenesItem[] {
  return behindTheScenesItems.filter((item) => item.category === category)
}
