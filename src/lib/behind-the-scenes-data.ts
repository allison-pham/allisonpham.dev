/**
 * Research / Behind the Scenes Data
 * Documents research projects, iterations, messy process, and findings.
 * Used by the Research component on /lab.
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
  category: "HCI" | "Product" | "Systems" | "Design" | "Community" | string
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
    subtitle: "Interaction design for astronaut workflows",
    category: "HCI",
    description:
      "Researching human-computer interaction in microgravity - how do astronauts interact with systems when fine motor control, pressure suits, and cognitive overload are all working against them?",
    startDate: "Mar 2026",
    status: "iterating",
    totalTime: "~80 hrs",
    featured: true,
    messyNotes: `Starting question: "How do astronauts actually interact with systems in microgravity?"
Early designs were too Earth-centric - I kept defaulting to touchscreen assumptions.
Breakthrough: watching hand-gesture communication in zero-g training footage shifted everything.
Key realization: haptic feedback > visual feedback in a pressurized suit.
Open question: how do you design for one-handed use when the other hand is holding a tool?`,
    keyLessons: [
      "Cognitive load is everything when lives depend on the interface",
      "You can't use touchscreens in EVA gloves - constraints breed entirely different solutions",
      "Design for the actual context, not idealized lab conditions",
      "Existing EVA communication protocols are an underused design resource",
    ],
    iterations: [
      {
        version: 1,
        date: "Mar 2026",
        title: "Research Sprint",
        description:
          "Understanding EVA workflows, current ISS interfaces, and human factors literature in extreme environments.",
        changes: [
          "Reviewed NASA ExoGlove specifications and EVA suit constraints",
          "Watched ISS EVA training footage and crew debriefs",
          "Read through human factors research in aerospace contexts",
        ],
        timeSpent: "15 hrs",
        tags: ["research", "discovery"],
      },
      {
        version: 2,
        date: "Mar 2026",
        title: "Touchscreen Concept (Rejected)",
        description:
          "Initial design direction: large touchscreen interface adapted for suit-glove use.",
        decisionLog:
          "Abandoned early. Fine motor movements are unreliable in a pressurized suit - too many false activations, eye strain in bright environments, and multi-touch is undetectable through glove sensors.",
        feedback: [
          "Glove sensors can't reliably detect multi-touch",
          "Bright lunar/orbital light causes significant screen glare and eye strain",
        ],
        timeSpent: "8 hrs",
        tags: ["concept", "failed-experiment"],
      },
      {
        version: 3,
        date: "Apr 2026",
        title: "Gesture-Based Interaction",
        description:
          "Redesigned around hand gesture recognition built on top of existing EVA communication signals.",
        changes: [
          "12 core gestures mapped from real EVA hand signal protocols",
          "Haptic confirmation feedback for each recognized gesture",
          "Proximity-based context switching between task modes",
        ],
        feedback: [
          "Positive: aligns with how astronauts already communicate in EVA",
          "Challenge: detecting subtle gestures reliably through thick outer gloves",
        ],
        decisionLog:
          "Why reinvent communication from scratch? EVA hand signals already work under extreme conditions. Building on them reduces cognitive load and training overhead.",
        timeSpent: "22 hrs",
        tags: ["breakthrough", "human-centered"],
      },
      {
        version: 4,
        date: "Apr 2026",
        title: "Haptic Feedback Layer",
        description:
          "Visual-only confirmation doesn't work when visually overloaded - added a full haptic response system.",
        changes: [
          "8 distinct haptic patterns for different action types",
          "Pressure-sensitive areas replacing discrete buttons",
          "Notification integration with suit life support system",
        ],
        decisionLog:
          "Astronauts report relying on tactile feedback when visually overwhelmed during EVA. This was the missing piece for reliable confirmation without adding visual burden.",
        timeSpent: "18 hrs",
        tags: ["usability", "accessibility"],
      },
      {
        version: 5,
        date: "May 2026",
        title: "Constrained Glove Simulation",
        description:
          "Motion capture study simulating glove constraints to test gesture recognition accuracy.",
        feedback: [
          "94% gesture recognition accuracy with simulated gloved hands",
          "Wrist rotation limited during tool use - blocked 3 gestures",
          "Discovery: need one-handed variants for all core actions",
        ],
        decisionLog:
          "The constraint became the feature. One-handed finger-combination variants solved tool-use conflicts and also improved accessibility broadly.",
        timeSpent: "12 hrs",
        tags: ["testing", "validation"],
      },
    ],
  },

  {
    id: "human-robot-interaction",
    title: "Human-Robot Interaction in Microgravity",
    subtitle: "Coordination protocols for astronaut-robot teams",
    category: "HCI",
    description:
      "Exploring how astronauts and robotic systems communicate and coordinate during EVA tasks - focusing on shared situational awareness and handoff protocols.",
    startDate: "Mar 2026",
    status: "drafting",
    totalTime: "~20 hrs",
    featured: false,
    messyNotes: `Branched off from HCI in Space work.
Question: when a robot and an astronaut are working on the same task, who's in charge and how does the human know?
Current robots have terrible feedback loops - no clear signal when the robot is "thinking" vs stuck.
Concept: ambient status indicators built into the robot's physical form (LEDs, motion patterns) instead of screens.`,
    keyLessons: [
      "Shared situational awareness is harder than individual interface design",
      "Robots need to communicate state even when no one is looking at a screen",
    ],
    iterations: [
      {
        version: 1,
        date: "Mar 2026",
        title: "Literature Review",
        description:
          "Surveying existing research on human-robot teaming, handoff protocols, and shared autonomy.",
        changes: [
          "Reviewed NASA robotics EVA assist studies",
          "Read shared autonomy literature from CMU Robotics",
          "Mapped current ISS robotic arm (SSRMS) interaction patterns",
        ],
        timeSpent: "10 hrs",
        tags: ["research", "literature"],
      },
      {
        version: 2,
        date: "Apr 2026",
        title: "Ambient Status Concepts",
        description:
          "Early ideation on non-screen status communication for robotic systems.",
        changes: [
          "LED ring concepts for robot joint state communication",
          "Motion-based 'readiness' signals",
          "Sketched 3 handoff protocol flows",
        ],
        timeSpent: "10 hrs",
        tags: ["ideation", "concept"],
      },
    ],
  },

  {
    id: "eevi-product",
    title: "Eevi - Side Quests",
    subtitle: "From feature bloat to focused MVP",
    category: "Product",
    description:
      "Gamified task manager - the full journey from an overcomplicated concept to a shipped product with actual personality.",
    startDate: "Jun 2024",
    status: "shipped",
    totalTime: "~120 hrs",
    featured: true,
    messyNotes: `Started with: "What if productivity had an RPG personality?"
Got lost in features - skill trees, multiplayer, experience tiers, item drops.
Hit a wall around v3: too many half-built features, none of them compelling alone.
Breakthrough: scope ruthlessly to the core loop. Create → Complete → Reward. Nothing else.
Result: personality > features. The tone changed everything, the mechanics barely changed at all.`,
    keyLessons: [
      "Shipping a focused MVP teaches more than perfect planning",
      "Tone and personality matter as much as functionality - people connect with voice",
      "Constraints force creativity: limiting to 3 reward types made each one feel special",
      "Cut features ruthlessly - I removed 5 to ship 1 well",
    ],
    iterations: [
      {
        version: 1,
        date: "Jun 2024",
        title: "Initial Concept",
        description: "RPG mechanics + task management. Extremely ambitious scope.",
        decisionLog: "Way too much: skill trees, leveling system, multiplayer guilds, item drops. None of it scoped.",
        timeSpent: "8 hrs",
        tags: ["ideation", "scope-creep"],
      },
      {
        version: 2,
        date: "Jun 2024",
        title: "User Research",
        description: "What makes task apps stick? What makes people abandon them?",
        changes: [
          "Analyzed completion rates across different reward timing",
          "Found sweet spot: reward feedback within 3-5 seconds of completion",
          "Mapped the emotional arc of a completed task",
        ],
        timeSpent: "12 hrs",
        tags: ["research", "psychology"],
      },
      {
        version: 3,
        date: "Jul 2024",
        title: "Strip to Core Loop",
        description: "Cut everything. Create → Complete → Reward. That's the whole product.",
        changes: [
          "Removed skill trees, multiplayer, item system",
          "Simplified to 3 reward types",
          "Basic XP bar as the only progression indicator",
        ],
        feedback: [
          "Simple XP bar was more motivating than the complex system it replaced",
          "Removing choices made the app faster to use",
        ],
        decisionLog: "People don't want to think about their task app. Immediate feedback beats complex progression.",
        timeSpent: "20 hrs",
        tags: ["simplification", "breakthrough"],
      },
      {
        version: 4,
        date: "Jul 2024",
        title: "Add Personality",
        description: "Same mechanics. RPG framing applied to everything.",
        changes: [
          "Quest naming template: 'The {action} {obstacle}'",
          "Witty completion and failure messages",
          "Satisfying animation + sound on completion",
        ],
        decisionLog: "The mechanics didn't change. The vibe changed completely. Personality is a product feature.",
        timeSpent: "10 hrs",
        tags: ["polish", "voice"],
      },
      {
        version: 5,
        date: "Aug 2024",
        title: "Beta → Public",
        description: "Real users, real edge cases, unexpected delights.",
        feedback: [
          "Loved: the failed quest screen that sympathizes with you",
          "Requested: chaining quests into sequences",
          "Discovered: users invented their own 'hard mode' challenge",
        ],
        timeSpent: "15 hrs",
        tags: ["user-feedback", "shipped"],
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