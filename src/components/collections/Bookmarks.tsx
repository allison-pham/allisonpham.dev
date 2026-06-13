"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { cn } from "@/src/lib/core-features/utils"
import { Atom, BookOpen, Brain, ChevronDown, ChevronLeft, ChevronRight, FileText, Heart, Lightbulb, Music, Palette, Quote, Sparkles, Star, Tag, Video, Puzzle } from "lucide-react"

type InspirationCategory = "art" | "code" | "design" | "philosophy" | "quote"

interface InspirationItem {
  id: string
  category: InspirationCategory
  title: string
  source?: string
  description: string
  accentColor: string
}

const inspirationCategoryConfig: Record<InspirationCategory, { label: string; color: string }> = {
  design: { label: "design", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30" },
  code: { label: "code", color: "bg-primary/10 text-primary border-primary/30" },
  philosophy: { label: "philosophy", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
  art: { label: "art", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30" },
  quote: { label: "quote", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30" },
}

const inspirationItems: InspirationItem[] = [
  { id: "alan-kay", category: "quote", title: "The best way to predict the future is to invent it.", source: "Alan Kay", description: "Innovation comes from taking action and creating the future you envision.", accentColor: "border-l-emerald-300" },
  { id: "scott-belsky", category: "quote", title: "It's not about ideas. It's about making ideas happen.", source: "Scott Belsky", description: "The execution gap is where most ideas don't go on. Ship it, then refine.", accentColor: "border-l-blue-300" },
  { id: "don-norman", category: "design", title: "", source: "Don Norman", description: "Taught that design is about people, not solely aesthetics", accentColor: "border-l-blue-300" },
  { id: "robert-greene", category: "quote", title: "", source: "Robert Greene", description: "Mastery as a lifelong pursuit, not a destination", accentColor: "border-l-blue-300" },
]

const allInspirationCategories = Object.keys(inspirationCategoryConfig) as InspirationCategory[]

interface ReadingBook {
  id: string
  title: string
  author: string
  status: "reading" | "done" | "queue"
  rating?: 1 | 2 | 3 | 4 | 5
  category?: string
  coverColor?: string
  summary?: string
  keyTakeaways?: string[]
  favoriteQuotes?: string[]
}

const readingBooks: ReadingBook[] = [
  { id: "atomic-habits", title: "Atomic Habits", author: "James Clear", status: "queue", category: "self-improvement", coverColor: "bg-yellow-300", summary: "N/A", keyTakeaways: ["N/A"], favoriteQuotes: ["N/A"] },
  { id: "envelope-poems", title: "Envelope Poems", author: "Emily Dickinson", status: "done", category: "self-improvement", coverColor: "bg-gray-300", summary: "N/A", keyTakeaways: ["N/A"], favoriteQuotes: ["N/A"] },
  { id: "envisioning-information", title: "Envisioning Information", author: "Edward R. Tufte", status: "queue", category: "", coverColor: "bg-gray-300", summary: "The density and precision of information design. Every page is a lesson.", keyTakeaways: [""], favoriteQuotes: ["N/A"] },
  { id: "flow", title: "Flow: The Psychology of Optimal Experience", author: "Mihály Csíkszentmihályi", status: "queue", category: "", coverColor: "bg-gray-300", summary: "The psychology of optimal experience and how design can get out of the way.", keyTakeaways: [""], favoriteQuotes: ["N/A"] },
  { id: "mastery", title: "Mastery", author: "Robert Greene", status: "queue", category: "", coverColor: "bg-orange-300", summary: "N/A", keyTakeaways: ["N/A"], favoriteQuotes: ["N/A"] },
  { id: "the-alchemist", title: "The Alchemist", author: "Paulo Coelho", status: "done", category: "", coverColor: "bg-gray-300", summary: "", keyTakeaways: ["N/A"], favoriteQuotes: ["N/A"] },
  { id: "the-design-of-everyday-things", title: "The Design of Everyday Things", author: "Donald A. Norman", status: "queue", category: "", coverColor: "bg-pink-300", summary: "Norman on affordances and feedback.", keyTakeaways: ["N/A"], favoriteQuotes: ["N/A"] },
  { id: "great-gatsby", title: "The Great Gatsby", author: "F. Scott Fitzgerald", status: "done", category: "literary-fiction", coverColor: "bg-emerald-300", summary: "N/A", keyTakeaways: ["N/A"], favoriteQuotes: ["N/A"] },
  { id: "earnest", title: "The Importance of Being Earnest", author: "Oscar Wilde", status: "done", category: "satirical-play", coverColor: "bg-purple-300", summary: "N/A", keyTakeaways: ["N/A"], favoriteQuotes: ["N/A"] },
  { id: "dorian-gray", title: "The Picture of Dorian Gray", author: "Oscar Wilde", status: "done", category: "gothic-fiction", coverColor: "bg-blue-300", summary: "As Dorian Gray sinks into a worse life, his body retains his youth, while his painted portrait decays to reflect his inner self.", keyTakeaways: ["N/A"], favoriteQuotes: ["N/A"] },
  { id: "thinking-fast-and-slow", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", status: "queue", category: "", coverColor: "bg-gray-300", summary: "How System 1 and System 2 shape every decision and interface.", keyTakeaways: [""], favoriteQuotes: ["N/A"] },
  { id: "zero-to-one", title: "Zero to One: Notes on Startups, or How to Build the Future", author: "Peter Thiel", status: "queue", category: "", coverColor: "bg-red-300", summary: "Thiel on creating unique value, building successful startups, and innovating things that didn't exist before.", keyTakeaways: ["Changed how I think about 0→1."], favoriteQuotes: ["N/A"] },
]

type NostalgiaItem = {
  id: string
  title: string
  emoji: string
  type: "game" | "show" | "movie" | "activity" | "place" | "thing"
  note: string
  era: string
}

const nostalgiaItems: NostalgiaItem[] = [
  { id: "club-penguin", title: "Club Penguin", emoji: "🐧", type: "game", note: "Decorate igloos, waddle around, and play mini games. First sense of a digital community. The fire puffle maze game (Thin Ice) is the reason I eventually built my own version of it!", era: "early" },
  { id: "lego", title: "Lego sets", emoji: "🛠️", type: "thing", note: "Building, taking apart, then building something else. Early prototyping of building worlds brick by brick, from castles to magic sets. Countless hours spent creating and imagining.", era: "several years" },
  { id: "films", title: "Films", emoji: "🌿", type: "movie", note: "Various movies and TV shows that I still re-watch each year", era: "each year" },
  { id: "library-visits", title: "Library visits", emoji: "📚", type: "activity", note: "Picking out a stack of books taller than reasonable. Still the best kind of afternoon.", era: "always / timeless" },
  { id: "pokemon", title: "Pokémon", emoji: "🐈", type: "game", note: "Trading cards and watching the anime. Still runs through my head.", era: "early" },
  { id: "retro-games", title: "Retro Games", emoji: "🎮", type: "game", note: "Fun and friendly interactive games consisting of chasing high scores and sharing laughs.", era: "early" },
  { id: "storybooks", title: "Storybooks", emoji: "📖", type: "activity", note: "The magic of turning pages and getting lost in stories (classic tales and bedtime adventures).", era: "early" },
]

const typeColors: Record<NostalgiaItem["type"], string> = {
  game: "border-primary/40 bg-primary/10 text-primary",
  show: "border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  movie: "border-pink-500/40 bg-pink-500/10 text-pink-600 dark:text-pink-400",
  activity: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  place: "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  thing: "border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400",
}

type FunFact = { id: string; emoji: string; fact: string; tag: string }

const funFacts: FunFact[] = [
  { id: "tea", emoji: "🍵", fact: "I think better with tea, specifically jasmine green tea.", tag: "daily ritual" },
  { id: "design", emoji: "✏️", fact: "I always sketch interfaces before I write code!", tag: "building" },
  { id: "space-design", emoji: "🌌", fact: "I've been designing for space longer than I've been to space (which is 0 times).", tag: "space" },
  { id: "personal-website", emoji: "💻", fact: "I've built several versions of my personal portfolio website, reflecting my desire to always iterate and make improvements. Each version taught me something the last one couldn't.", tag: "building" },
  { id: "builder", emoji: "🧩", fact: "I take things apart to understand how they work. This started with legos and puzzles as a kid, to software, systems, and organizations in later years.", tag: "curiosity" },
  { id: "night-ideas", emoji: "🌙", fact: "Most of my best ideas show up after midnight.", tag: "habits" },
  { id: "typing", emoji: "📐", fact: "I learned to type faster specifically so I could think faster.", tag: "productivity" },
  { id: "sunrise", emoji: "🌅", fact: "I'm not a morning person but I am a sunrise person (yes there's a difference).", tag: "personality" },
  { id: "organized", emoji: "🗂️", fact: "I have a folder and system for everything. Color-coded, cross-linked, probably over-engineered.", tag: "organization" },
  { id: "space-constraints", emoji: "🛰️", fact: "I find space constraints more interesting than space itself - what do you build when everything is limited?", tag: "space" },
]

type HobbyLevel = "emerging" | "growing" | "thriving"
type HobbyTab = "current" | "past" | "future"
type HobbyCategory = "creative" | "physical" | "intellectual" | "social" | "digital"

interface HobbyItem {
  id: string
  title: string
  emoji: string
  category: HobbyCategory
  frequency: "daily" | "often" | "weekly" | "ongoing" | "sometimes"
  level: HobbyLevel
  progress: number
  description: string
  startedYear?: string
  notes: string
  milestones: { label: string; done: boolean }[]
  tags: string[]
  connections: string[]
}

const hobbyCategoryColors: Record<HobbyCategory, string> = {
  creative: "border-pink-500/40 bg-pink-500/10 text-pink-600 dark:text-pink-400",
  physical: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  intellectual: "border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  social: "border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  digital: "border-primary/40 bg-primary/10 text-primary",
}

const hobbyFrequencyColors: Record<string, string> = {
  daily: "border-primary/30 bg-primary/10 text-primary",
  often: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  weekly: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  ongoing: "border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  sometimes: "border-border bg-secondary/60 text-muted-foreground",
}

const hobbyGroups: Record<HobbyTab, HobbyItem[]> = {
  current: [
    {
      id: "chess",
      title: "Chess",
      emoji: "♟️",
      category: "intellectual",
      frequency: "often",
      level: "growing",
      progress: 35,
      description: "Slow, deliberate strategy. Every game is a design problem.",
      startedYear: "",
      notes: "The queen ♛ and bishop ♝ are my go-to's\nLove the strategic aspect - every game is a new system to understand.",
      milestones: [
        { label: "Learn classic opening strategies", done: false },
        { label: "Study endgame techniques", done: false },
      ],
      tags: ["strategy", "cognition", "patterns"],
      connections: ["organizing", "writing"],
    },

    {
      id: "music",
      title: "Music",
      emoji: "🎵",
      category: "creative",
      frequency: "daily",
      level: "thriving",
      progress: 80,
      description: "Soundtracks for different modes - flow, focus, reflection.",
      startedYear: "",
      notes: "Music is how I set the environment for whatever mode I need.",
      milestones: [{ label: "Build a playlist per mood", done: true }],
      tags: ["flow", "atmosphere", "creative"],
      connections: ["writing", "scrapbooking"],
    },

    {
      id: "reading",
      title: "Reading",
      emoji: "📚",
      category: "intellectual",
      frequency: "daily",
      level: "thriving",
      progress: 60,
      description: "Mostly non-fiction, design, and the occasional novel. The physical kind - I like the weight of a book.",
      startedYear: "",
      notes: "Best way to absorb other people's years of thinking in a few days.",
      milestones: [{ label: "Read 12 books this year", done: false }, { label: "Build a reading tracker", done: true }],
      tags: ["learning", "cognition", "knowledge"],
      connections: ["writing", "chess", "organizing"],
    },

    {
      id: "scrapbooking",
      title: "Scrapbooking",
      emoji: "📋",
      category: "creative",
      frequency: "often",
      level: "thriving",
      progress: 75,
      description: "Capturing memories, ideas, and moments in a physical archive.",
      startedYear: "",
      notes: "The analog version of a second brain. Every page is a moment preserved.",
      milestones: [{ label: "Fill first full book", done: true }],
      tags: ["memory", "archive", "creative"],
      connections: ["writing", "music"],
    },

    {
      id: "writing",
      title: "Writing",
      emoji: "✍️",
      category: "creative",
      frequency: "often",
      level: "thriving",
      progress: 60,
      description: "Field notes, brain dumps, and longer-form thinking.",
      startedYear: "",
      notes: "Writing is thinking made visible. I write to understand, not to publish.",
      milestones: [{ label: "Start a field notes practice", done: true }, { label: "Write 1 longer essay", done: false }],
      tags: ["thinking", "clarity", "creative"],
      connections: ["reading", "chess", "music", "sketching"],
    },

    {
      id: "sketching",
      title: "Sketching and wireframing",
      emoji: "✏️",
      category: "creative",
      frequency: "often",
      level: "thriving",
      progress: 70,
      description: "Low-fidelity thinking. I sketch systems, interfaces, and random ideas on paper before touching a screen.",
      startedYear: "",
      notes: "The fastest way from thought to form. Always on paper first.",
      milestones: [{ label: "Sketch daily for 30 days", done: false }],
      tags: ["design", "visual", "thinking"],
      connections: ["writing", "building-things"],
    },

    {
      id: "tea",
      title: "Tea exploration",
      emoji: "🍵",
      category: "creative",
      frequency: "daily",
      level: "thriving",
      progress: 65,
      description: "Brewing and collecting loose-leaf teas. Current favorites: jasmine green, oolong, and hojicha.",
      startedYear: "",
      notes: "Tea is ritual. It marks the transition into a focused mode.\n175°F exactly - too hot ruins jasmine green.",
      milestones: [{ label: "Try 10 different teas", done: true }],
      tags: ["ritual", "sensory", "focus"],
      connections: ["reading", "writing"],
    },

    {
      id: "walking",
      title: "Long walks",
      emoji: "🌿",
      category: "physical",
      frequency: "weekly",
      level: "growing",
      progress: 50,
      description: "Best way to unstick a problem. No podcasts, no music - just thinking and noticing things.",
      startedYear: "",
      notes: "Most of my best ideas arrive mid-walk, not mid-work.",
      milestones: [],
      tags: ["movement", "thinking", "clarity"],
      connections: ["stargazing"],
    },

    {
      id: "building-things",
      title: "Building things",
      emoji: "🛠️",
      category: "digital",
      frequency: "ongoing",
      level: "thriving",
      progress: 80,
      description: "Projects, prototypes, small tools that scratch an itch. The process of making something from nothing.",
      startedYear: "",
      notes: "The 0→1 phase is always the most interesting part.",
      milestones: [{ label: "Ship a solo side project", done: true }],
      tags: ["craft", "0→1", "systems"],
      connections: ["sketching", "organizing"],
    },

    {
      id: "organizing",
      title: "Organizing systems",
      emoji: "🗂️",
      category: "intellectual",
      frequency: "often",
      level: "thriving",
      progress: 75,
      description: "Building PKM systems, organizing notes, designing workflows. It's hobby-level at this point.",
      startedYear: "",
      notes: "I have a folder and system for everything. Color-coded, cross-linked, probably over-engineered.",
      milestones: [{ label: "Build a second brain system", done: true }],
      tags: ["PKM", "systems", "productivity"],
      connections: ["chess", "reading", "building-things"],
    },

    {
      id: "games",
      title: "Games",
      emoji: "🎮",
      category: "digital",
      frequency: "sometimes",
      level: "growing",
      progress: 40,
      description: "Puzzle games, strategy, and anything with good world-building. Currently interested in games as design systems.",
      startedYear: "",
      notes: "Games are the best user experience labs - you can feel design decisions in real time.",
      milestones: [],
      tags: ["design", "strategy", "systems"],
      connections: ["chess", "building-things"],
    },
    
    {
      id: "stargazing",
      title: "Stargazing",
      emoji: "🌌",
      category: "physical",
      frequency: "sometimes",
      level: "emerging",
      progress: 20,
      description: "Quiet nights, wide skies. Pairs well with questions about scale and what it means to build things that last.",
      startedYear: "",
      notes: "Space is a good place to put things in perspective.",
      milestones: [],
      tags: ["scale", "space", "reflection"],
      connections: ["walking"],
    },
  ],
  past: [],
  future: [],
}

const hobbyLevelConfig: Record<HobbyLevel, string> = {
  emerging: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
  growing: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
  thriving: "bg-primary/10 text-primary border-primary/30",
}

const hobbyTabLabels: Record<HobbyTab, string> = {
  current: "Current Pursuits",
  past: "Archives",
  future: "Future",
}

const levelFilters: Array<"all" | HobbyLevel> = ["all", "emerging", "growing", "thriving"]

const levelFilterStyles: Record<"all" | HobbyLevel, string> = {
  all: "border-primary/30 bg-primary/10 text-primary",
  emerging: "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  growing: "border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  thriving: "border-primary/30 bg-primary/10 text-primary",
}

// ─── GARDEN DATA (mirrors hobbyGroups.current but with connections + canvas props) ───
interface GardenNode {
  id: string
  title: string
  emoji: string
  level: number
  category: string
  color: string
  description: string
  connections: string[]
  notes: string
  milestones: { label: string; done: boolean }[]
  tags: string[]
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

const gardenNodes: Omit<GardenNode, "x"|"y"|"vx"|"vy"|"r">[] = [
  { id: "chess", title: "Chess", emoji: "♟️", level: 35, category: "intellectual", color: "#a8d8ea", description: "Strategic thinking, pattern recognition, and the beauty of endgames.", connections: ["systems-thinking", "writing"], notes: "The queen and bishop are my go-to pieces.", milestones: [{ label: "Learn opening strategies", done: false }, { label: "Study endgame techniques", done: false }], tags: ["strategy", "cognition", "patterns"] },
  { id: "music", title: "Music", emoji: "🎵", level: 80, category: "creative", color: "#f7c5c5", description: "Soundtracks for different modes - flow, focus, deep work, and reflection.", connections: ["writing", "scrapbooking"], notes: "Music sets the environment for whatever mode I need.", milestones: [{ label: "Build a playlist per mood", done: true }], tags: ["creative", "flow", "atmosphere"] },
  { id: "reading", title: "Reading", emoji: "📚", level: 65, category: "intellectual", color: "#b8d4f0", description: "Mostly non-fiction, design, and the occasional novel. The physical kind.", connections: ["writing", "systems-thinking", "chess"], notes: "Best way to absorb other people's years of thinking in a few days.", milestones: [{ label: "Read 12 books this year", done: false }, { label: "Build a reading tracker", done: true }], tags: ["learning", "cognition", "knowledge"] },
  { id: "scrapbooking", title: "Scrapbooking", emoji: "📋", level: 75, category: "creative", color: "#ffd6a5", description: "Capturing memories, ideas, and moments in a physical archive.", connections: ["writing", "music"], notes: "The analog version of a second brain.", milestones: [{ label: "Fill first full book", done: true }], tags: ["memory", "creative", "archive"] },
  { id: "writing", title: "Writing", emoji: "✍️", level: 60, category: "creative", color: "#d4edda", description: "Field notes, brain dumps, and longer-form thinking on paper.", connections: ["reading", "chess", "music", "systems-thinking"], notes: "Writing is thinking made visible.", milestones: [{ label: "Start a field notes practice", done: true }, { label: "Write 1 longer essay", done: false }], tags: ["thinking", "clarity", "creative"] },
  { id: "systems-thinking", title: "Systems", emoji: "⚙️", level: 70, category: "intellectual", color: "#e8d5f7", description: "Understanding how things connect and produce emergent behaviors.", connections: ["chess", "reading", "writing"], notes: "Everything is a system once you know to look.", milestones: [{ label: "Map a complex system visually", done: false }], tags: ["systems", "cognition", "patterns"] },
  { id: "sketching", title: "Sketching", emoji: "✏️", level: 55, category: "creative", color: "#ffeaa7", description: "Low-fidelity thinking before touching a screen.", connections: ["writing", "systems-thinking"], notes: "The fastest way from thought to form. Always on paper first.", milestones: [{ label: "Sketch daily for 30 days", done: false }], tags: ["design", "visual", "thinking"] },
  { id: "tea", title: "Tea", emoji: "🍵", level: 70, category: "sensory", color: "#dfe6e9", description: "Collecting and brewing loose-leaf teas. Jasmine green, oolong, hojicha.", connections: ["reading", "writing"], notes: "Tea is ritual. It marks the transition into a focused mode.", milestones: [{ label: "Try 10 different teas", done: true }], tags: ["ritual", "sensory", "focus"] },
]

const gardenCategoryColors: Record<string, { bg: string; text: string; border: string }> = {
  intellectual: { bg: "rgba(96,165,250,0.15)", text: "#2563eb", border: "rgba(96,165,250,0.3)" },
  creative: { bg: "rgba(244,114,182,0.15)", text: "#db2777", border: "rgba(244,114,182,0.3)" },
  sensory: { bg: "rgba(52,211,153,0.15)", text: "#059669", border: "rgba(52,211,153,0.3)" },
}

function getGardenNodeSize(level: number) { return 26 + (level / 100) * 26 }

function HobbyGardenView({ onSelect, selected, nodes }: { onSelect: (n: GardenNode | null) => void; selected: GardenNode | null; nodes: GardenNode[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<GardenNode[]>([])
  const animRef = useRef<number | null>(null)
  const isDragging = useRef(false)
  const dragNode = useRef<GardenNode | null>(null)
  const hoveredRef = useRef<string | null>(null)
  const W = 620, H = 380

  // Reinitialise positions whenever the node list changes
  useEffect(() => {
    nodesRef.current = nodes.map((h, i) => ({
      ...h,
      x: W / 2 + Math.cos(i / nodes.length * Math.PI * 2) * 160,
      y: H / 2 + Math.sin(i / nodes.length * Math.PI * 2) * 130,
      vx: 0, vy: 0,
      r: getGardenNodeSize(h.level),
    }))
  }, [nodes])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    // DPR fix - scale canvas for retina/high-DPI screens
    const dpr = window.devicePixelRatio || 1
    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`
    ctx.scale(dpr, dpr)

    const simulate = () => {
      const nodes = nodesRef.current
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x, dy = nodes[j].y - nodes[i].y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const minDist = nodes[i].r + nodes[j].r + 18
          if (dist < minDist) {
            const force = (minDist - dist) / dist * 0.35
            nodes[i].vx -= dx * force; nodes[i].vy -= dy * force
            nodes[j].vx += dx * force; nodes[j].vy += dy * force
          }
        }
      }
      nodes.forEach(node => {
        node.connections.forEach(cid => {
          const other = nodes.find(n => n.id === cid)
          if (!other) return
          const dx = other.x - node.x, dy = other.y - node.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const force = (dist - 160) * 0.012
          node.vx += (dx / dist) * force; node.vy += (dy / dist) * force
        })
        node.vx += (W / 2 - node.x) * 0.007; node.vy += (H / 2 - node.y) * 0.007
        node.vx *= 0.8; node.vy *= 0.8
        node.x += node.vx; node.y += node.vy
        node.x = Math.max(node.r + 6, Math.min(W - node.r - 6, node.x))
        node.y = Math.max(node.r + 6, Math.min(H - node.r - 6, node.y))
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const nodes = nodesRef.current
      const sel = selected

      // edges
      nodes.forEach(node => {
        node.connections.forEach(cid => {
          const other = nodes.find(n => n.id === cid)
          if (!other || cid < node.id) return
          const isHl = sel && (sel.id === node.id || sel.id === cid)
          ctx.setLineDash(isHl ? [] : [4, 6])
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          const mx = (node.x + other.x) / 2 + (other.y - node.y) * 0.1
          const my = (node.y + other.y) / 2 - (other.x - node.x) * 0.1
          ctx.quadraticCurveTo(mx, my, other.x, other.y)
          ctx.strokeStyle = isHl ? "rgba(124,58,237,0.5)" : "rgba(124,58,237,0.1)"
          ctx.lineWidth = isHl ? 2 : 1
          ctx.stroke()
          ctx.setLineDash([])
        })
      })

      // nodes
      nodes.forEach(node => {
        const isSel = sel?.id === node.id
        const isHov = hoveredRef.current === node.id
        const isConn = sel && (node.connections.includes(sel.id) || sel.connections.includes(node.id))
        const alpha = sel ? (isSel || isConn ? 1 : 0.22) : 1
        const r = node.r
        ctx.globalAlpha = alpha

        // rings
        const rings = Math.floor(node.level / 25)
        for (let i = rings; i > 0; i--) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, r * (0.5 + i * 0.15), 0, Math.PI * 2)
          ctx.strokeStyle = node.color
          ctx.lineWidth = 1
          ctx.globalAlpha = alpha * (0.07 + i * 0.06)
          ctx.stroke()
        }
        ctx.globalAlpha = alpha

        ctx.beginPath()
        ctx.arc(node.x, node.y, r * 0.55, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()
        ctx.strokeStyle = isSel ? "#7c3aed" : isHov ? "rgba(124,58,237,0.5)" : "rgba(0,0,0,0.1)"
        ctx.lineWidth = isSel ? 2.5 : 1.5
        ctx.stroke()

        ctx.font = `${Math.floor(r * 0.38)}px serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(node.emoji, node.x, node.y)

        ctx.font = `${isSel ? "bold " : ""}10px monospace`
        ctx.fillStyle = "#1a1a2e"
        ctx.textBaseline = "top"
        ctx.fillText(node.title, node.x, node.y + r * 0.58 + 3)
        ctx.font = "9px monospace"
        ctx.fillStyle = "rgba(124,58,237,0.55)"
        ctx.fillText(`${node.level}%`, node.x, node.y + r * 0.58 + 15)
        ctx.globalAlpha = 1
      })
    }

    const loop = () => { simulate(); draw(); animRef.current = requestAnimationFrame(loop) }
    loop()
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [selected])

  const getNodeAt = (x: number, y: number) =>
    nodesRef.current.find(n => Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2) < n.r * 0.6 + 8)

  const toCanvas = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: (e.clientX - rect.left) * (W / rect.width), y: (e.clientY - rect.top) * (H / rect.height) }
  }

  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] text-muted-foreground">
        Node size = growth level · rings = milestones · click to explore · drag to rearrange
      </p>
      <div className="rounded-xl overflow-hidden border border-border/50" style={{ background: "linear-gradient(135deg,#f8fff8,#f8f7ff)" }}>
        <canvas
          ref={canvasRef} style={{ width: "100%", display: "block" }}
          onMouseMove={e => {
            const { x, y } = toCanvas(e)
            if (isDragging.current && dragNode.current) {
              dragNode.current.x = x; dragNode.current.y = y
              dragNode.current.vx = 0; dragNode.current.vy = 0
            } else {
              const node = getNodeAt(x, y)
              hoveredRef.current = node?.id ?? null
              canvasRef.current!.style.cursor = node ? "pointer" : "default"
            }
          }}
          onMouseDown={e => {
            const { x, y } = toCanvas(e)
            const node = getNodeAt(x, y)
            if (node) { isDragging.current = true; dragNode.current = nodesRef.current.find(n => n.id === node.id) ?? null }
          }}
          onMouseUp={e => {
            const { x, y } = toCanvas(e)
            const node = getNodeAt(x, y)
            if (node) onSelect(selected?.id === node.id ? null : { ...node })
            isDragging.current = false; dragNode.current = null
          }}
          onMouseLeave={() => { hoveredRef.current = null; isDragging.current = false }}
        />
      </div>
    </div>
  )
}


const pageNotes: Record<string, string> = {
  overview: "Each tab captures a different kind of bookmark (always tinkering - this list updates as things ship or new rabbit holes appear).",
  art: "Visual references, creative influences, and makers whose work I keep studying.",
  "concepts-library": "Core ideas I revisit often, frameworks I use to think clearly, lessons learned, and questions I'm exploring. Reusable principles connected across projects and seasons. Fragments and field notes (shorter than essays).",
  "fun-facts": "Random things about me - the kind of stuff that doesn't fit anywhere else.",
  hobbies: "Things I do for the joy of it - what I reach for when there's no deadline.",
  "inspiration-board": "Ideas, people, and quotes that keep showing up in how I think and build.",
  "music-playlists": "Curated for different modes.",
  "nostalgia-whimsy": "A playful childhood collection of games, memories, shows, stories, toys, and things that still live rent-free in my head - what shaped my early years and made me, me.",
  reading: "Current books, learnings, and notes that shape how I think about building, design, and systems.",
  "talks-videos": "Talks worth watching twice.",
  "tiny-experiments": "An extension of my lab and projects pages - small bets with clear outcomes.",
  writing: "Articles, essays, and papers worth keeping.",
}

const overviewItems = [
  { icon: <Palette className="h-4 w-4" />, label: "Art", id: "art" },
  { icon: <Brain className="h-4 w-4" />, label: "Concepts & Models", id: "concepts-library" },
  { icon: <Sparkles className="h-4 w-4" />, label: "Fun Facts", id: "fun-facts" },
  { icon: <Puzzle className="h-4 w-4" />, label: "Hobbies", id: "hobbies" },
  { icon: <Lightbulb className="h-4 w-4" />, label: "Inspiration Board", id: "inspiration-board" },
  { icon: <Music className="h-4 w-4" />, label: "Music & Playlists", id: "music-playlists" },
  { icon: <Heart className="h-4 w-4" />, label: "Nostalgia & Whimsy", id: "nostalgia-whimsy" },
  { icon: <BookOpen className="h-4 w-4" />, label: "Reading Library", id: "reading" },
  { icon: <Video className="h-4 w-4" />, label: "Talks & Videos", id: "talks-videos" },
  { icon: <Atom className="h-4 w-4" />, label: "Tiny Experiments", id: "tiny-experiments" },
  { icon: <FileText className="h-4 w-4" />, label: "Writing & Research", id: "writing" },
]

interface FlipPage {
  id: string
  icon: React.ReactNode
  label: string
  content: React.ReactNode
}

export function Bookmarks() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null)
  const [activeInspirationCategory, setActiveInspirationCategory] = useState<InspirationCategory | null>(null)
  const [activeNostalgiaType, setActiveNostalgiaType] = useState<NostalgiaItem["type"] | null>(null)
  const [activeHobbyTab, setActiveHobbyTab] = useState<HobbyTab>("current")
  const [activeHobbyLevel, setActiveHobbyLevel] = useState<"all" | HobbyLevel>("all")
  const [expandedHobbyId, setExpandedHobbyId] = useState<string | null>(null)
  const [hobbyView, setHobbyView] = useState<"cards" | "garden">("cards")
  const [gardenSelected, setGardenSelected] = useState<GardenNode | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [sidebarHeight, setSidebarHeight] = useState<number | undefined>(undefined)

  const filteredInspirationItems = activeInspirationCategory
    ? inspirationItems.filter((item) => item.category === activeInspirationCategory)
    : inspirationItems

  const filteredNostalgiaItems = activeNostalgiaType
    ? nostalgiaItems.filter((item) => item.type === activeNostalgiaType)
    : nostalgiaItems

  const tabHobbies = hobbyGroups[activeHobbyTab]
  const filteredHobbies = activeHobbyLevel === "all"
    ? tabHobbies
    : tabHobbies.filter((h) => h.level === activeHobbyLevel)

  const nostalgiaTypes = [...new Set(nostalgiaItems.map((i) => i.type))] as NostalgiaItem["type"][]

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const pages: FlipPage[] = [
    {
      id: "overview",
      icon: <Tag className="h-4 w-4" />,
      label: "Overview",
      content: (
        <div className="grid gap-3 sm:grid-cols-2">
          {overviewItems.map((item) => (
            <div key={item.id} className="rounded-lg border border-border/50 bg-secondary/30 px-4 py-3 transition-colors hover:border-primary/30">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-primary">{item.icon}</span>
                <p className="text-sm font-semibold">{item.label}</p>
              </div>
              <p className="font-mono text-xs leading-relaxed text-muted-foreground">{pageNotes[item.id]}</p>
            </div>
          ))}
        </div>
      ),
    },

    {
      id: "art",
      icon: <Palette className="h-4 w-4" />,
      label: "Art",
      content: (
        <div className="space-y-3">
          {[{ piece: "Almond Blossoms", creator: "Vincent van Gogh" }].map((a) => (
            <div key={a.piece} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <p className="text-sm font-semibold mb-1">{a.piece}</p>
              <p className="font-mono text-xs text-muted-foreground">{a.creator}</p>
            </div>
          ))}
        </div>
      ),
    },

    {
      id: "concepts-library",
      icon: <Brain className="h-4 w-4" />,
      label: "Concepts & Models",
      content: (
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { concept: "0→1", note: "The hardest transition in building - getting from nothing to something is different than scaling from something to something bigger. Getting from nothing to something is a different skill than scaling. Starting projects, building conviction, and knowing when to ship.", domain: "buildling" },
            { concept: "2nd brain", note: "Personal knowledge management (PKM) system to capture and organize info (files, ideas, notes, etc.).", domain: "productivity" },
            { concept: "Affordance", note: "The properties of an object that suggest how it should be used. A button affords pressing, while a handle affords pulling.", domain: "design" },
            { concept: "Architect", note: "Build something that didn't exist before and trust the blueprint in your mind.", domain: "" },
            { concept: "Artifact", note: "What you make outlasts the making. Build with the future reader in mind.", domain: "" },
            { concept: "Autotelic experience", note: "An activity done for its own sake, where the reward is in the doing. Flow states are almost always autotelic.", domain: "psychology" },
            { concept: "Building", note: "Shipping something imperfect is almost always better than not shipping something perfect.", domain: "building" },
            { concept: "Clarity", note: "The goal of both good writing and good design. Remove until nothing remains to remove.", domain: "" },
            { concept: "Cognitive and neuroscience", note: "Research on how the brain processes information and its applications in design.", domain: "knowledge" },
            { concept: "Cognitive load and interface design", note: "The total amount of mental effort being used in working memory. The best interfaces minimize it. Why the best interfaces feel effortless (and what happens when they don't). Mental models, working memory, and the hidden cost of a complex UI.", domain: "hci" },
            { concept: "Constraints", note: "The creative brief disguised as a limitation. Work within them first. Limitations are not obstacles. They are the brief. Work within them, not around them.", domain: "" },
            { concept: "Curiosity", note: "The engine of everything. Ask why one more time than feels comfortable.", domain: "" },
            { concept: "Deep work", note: "Focus without distraction for productivity.", domain: "productivity" },
            { concept: "Design interfaces", note: "The best interfaces don't respond to people, they think with them.", domain: "design" },
            { concept: "Design principles", note: "My working design philosophy: details matter → start with why.", domain: "product" },
            { concept: "Documentation", note: "Document everything.", domain: "building" },
            { concept: "Education", note: "Design learning experiences that are effective and enjoyable.", domain: "learning" },
            { concept: "Feedback loops", note: "Create mechanisms to learn and adapt quickly.", domain: "systems" },
            { concept: "First principles", note: "Break down complex problems into fundamental truths and every assumption down to its base truth. Build back up from there.", domain: "systems" },
            { concept: "Flow", note: "Resistance is information. Find where effort dissolves into motion.", domain: "" },
            { concept: "Human-computer interaction (HCI)", note: "HCI research methods, fostering the community, pushing the boundary of how humans + tech co-exist.", domain: "product" },
            { concept: "Inversion", note: "Instead of asking how to achieve a goal, ask what would guarantee failure. Then avoid that. Ask what could fail first, then design around it.", domain: "design" },
            { concept: "Iteration", note: "Ship, learn, repeat. The first version is never the real version.", domain: "" },
            { concept: "Learning how to learn", note: "Interleaving - learning efficiently.", domain: "knowledge" },
            { concept: "Leverage", note: "Build once, benefit repeatedly.", domain: "building" },
            { concept: "Mastery", note: "Years of deliberate practice compressed into intuition. The master makes it look effortless.", domain: "" },
            { concept: "Mind", note: "Make systems feel like extensions of the mind.", domain: "cognitive science" },
            { concept: "Observe", note: "Step back because the pattern you may be looking for is only visible from a distance.", domain: "" },
            { concept: "Product", note: "Build impactful 0→1 products - the craft of making something from nothing.", domain: "product" },
            { concept: "Rest", note: "Prioritize scheduled recovery to maintain sustainable output.", domain: "productivity" },
            { concept: "Second-order thinking", note: "Analyze the long-term effects of actions instead of immediate results. Ask not just \"What happens if I do this?\" but \"What happens next, and then what?\" Most stop at first-order.", domain: "productivity" },
            { concept: "Signal", note: "In the noise of input, one thing keeps returning. That's the one worth following.", domain: "" },
            { concept: "Space (Apollo Program)", note: "Proof that constraints foster extraordinary design.", domain: "building" },
            { concept: "Space (constraints)", note: "Space teaches that constraints aren't limitations, they're the design brief.", domain: "building" },
            { concept: "Space (HCI)", note: "Cognitive load in interfaces (HCI for astronaut interfaces) and designing for zero-gravity workflows. Design under pressure. What astronaut UX teaches us about designing for high-stakes and time-constrained environments. It overlaps with everyday product design.", domain: "building" },
            { concept: "Synthesis", note: "The ability to connect ideas across domains. Reading widely is how you get here.", domain: "" },
            { concept: "Systems", note: "Build systems that stay useful at higher complexity. Everything is connected. The edge case ignored is where the failure will begin. Design the system, not just the output. The container shapes what's inside it.", domain: "systems" },
            { concept: "Threshold", note: "The decision you keep postponing is the one that matters most right now.", domain: "" },
            { concept: "Tools", note: "You can tell a lot about how someone thinks by what tools they reach for.", domain: "productivity" },
            { concept: "UI/UX patterns", note: "Strategic and tactical design.", domain: "design" },
            { concept: "Writing", note: "Communicate ideas clearly and engagingly.", domain: "communication" },
          ].map((c) => (
            <div key={c.concept} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-semibold">{c.concept}</p>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 font-mono text-[10px] text-primary">{c.domain}</span>
              </div>
              <p className="font-mono text-xs text-muted-foreground">{c.note}</p>
            </div>
          ))}
        </div>
      ),
    },

    {
      id: "fun-facts",
      icon: <Sparkles className="h-4 w-4" />,
      label: "Fun Facts",
      content: (
        <div className="grid gap-3 sm:grid-cols-2">
          {funFacts.map((f) => (
            <div key={f.id} className="group flex items-start gap-3 rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <span className="text-xl select-none shrink-0 mt-0.5">{f.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed text-foreground/80">{f.fact}</p>
                <span className="mt-2 inline-block font-mono text-[10px] text-primary/60 bg-primary/8 border border-primary/20 px-2 py-0.5 rounded-full">
                  #{f.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      ),
    },

    {
      id: "hobbies",
      icon: <Puzzle className="h-4 w-4" />,
      label: "Hobbies",
      content: (
        <div className="space-y-4">
          {/* View switcher */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-1 rounded-lg border border-border/50 bg-secondary/30 p-1">
              {(["cards", "garden"] as const).map(v => (
                <button key={v} onClick={() => setHobbyView(v)}
                  className={cn("px-3 py-1.5 rounded-md font-mono text-xs transition-all duration-200",
                    hobbyView === v ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"
                  )}>
                  {v === "garden" ? "🌱 garden" : "☰ cards"}
                </button>
              ))}
            </div>

            {/* Only show tab/level filters in cards view */}
            {hobbyView === "cards" && (
              <div className="flex gap-1 rounded-lg border border-border/50 bg-secondary/30 p-1">
                {(["current", "past", "future"] as HobbyTab[]).map((tab) => (
                  <button key={tab} onClick={() => { setActiveHobbyTab(tab); setActiveHobbyLevel("all"); setExpandedHobbyId(null) }}
                    className={cn("px-3 py-1.5 rounded-md font-mono text-xs transition-all duration-200",
                      activeHobbyTab === tab ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground"
                    )}>
                    {hobbyTabLabels[tab]}
                    <span className="ml-1 font-mono text-[10px] text-muted-foreground">({hobbyGroups[tab].length})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cards view */}
          {hobbyView === "cards" && (
            <>
              <div className="flex flex-wrap gap-2">
                {levelFilters.map((filter) => {
                  const count = filter === "all" ? tabHobbies.length : tabHobbies.filter((h) => h.level === filter).length
                  return (
                    <button key={filter} onClick={() => { setActiveHobbyLevel(filter); setExpandedHobbyId(null) }}
                      className={cn("rounded-lg border px-3 py-1.5 font-mono text-xs tracking-wide transition-all",
                        activeHobbyLevel === filter ? levelFilterStyles[filter] : "border-border/50 bg-card/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      )}>
                      {filter} ({count})
                    </button>
                  )
                })}
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {filteredHobbies.map((hobby) => (
                  <div key={hobby.id} className={cn("rounded-xl border bg-card/40 overflow-hidden transition-colors",
                    expandedHobbyId === hobby.id ? "border-primary/50 bg-primary/5" : "border-border/50 hover:border-primary/30"
                  )}>
                    <button onClick={() => setExpandedHobbyId(expandedHobbyId === hobby.id ? null : hobby.id)}
                      className="w-full p-4 text-left hover:bg-secondary/30 transition-colors">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-xl select-none shrink-0 mt-0.5">{hobby.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-sm font-bold truncate">{hobby.title}</p>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className={cn("px-2 py-0.5 rounded-full border font-mono text-[10px]", hobbyLevelConfig[hobby.level])}>{hobby.level}</span>
                              <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform duration-200", expandedHobbyId === hobby.id && "rotate-180 text-primary")} />
                            </div>
                          </div>
                          {hobby.description && <p className="font-mono text-xs text-muted-foreground">{hobby.description}</p>}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            <span className={cn("px-2 py-0.5 rounded-full border font-mono text-[10px]", hobbyCategoryColors[hobby.category])}>{hobby.category}</span>
                            <span className={cn("px-2 py-0.5 rounded-full border font-mono text-[10px]", hobbyFrequencyColors[hobby.frequency])}>{hobby.frequency}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary/80">
                          <div className={cn("h-full rounded-full transition-all duration-700 ease-out",
                            hobby.progress === 100 ? "bg-emerald-300" : hobby.progress >= 75 ? "bg-lime-300" :
                            hobby.progress >= 50 ? "bg-yellow-300" : hobby.progress >= 25 ? "bg-amber-300" : "bg-orange-300"
                          )} style={{ width: `${Math.max(hobby.progress, 5)}%` }} />
                        </div>
                        <span className="w-8 shrink-0 font-mono text-xs text-muted-foreground">{hobby.progress}%</span>
                      </div>
                    </button>

                    {expandedHobbyId === hobby.id && (
                      <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-3">
                        {hobby.startedYear && <p className="font-mono text-[10px] text-muted-foreground">Started: {hobby.startedYear}</p>}

                        {/* Tags */}
                        {hobby.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {hobby.tags.map(t => (
                              <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-secondary/60 border border-border/50 text-muted-foreground">#{t}</span>
                            ))}
                          </div>
                        )}

                        {/* Notes */}
                        {hobby.notes.trim() && (
                          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                            <p className="font-mono text-[10px] tracking-widest text-primary mb-2 flex items-center gap-1"><Sparkles className="h-3 w-3" /> Notes</p>
                            <div className="space-y-1.5">
                              {hobby.notes.split("\n").map(n => n.trim()).filter(Boolean).map((note, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                  <span className="font-mono text-xs text-muted-foreground leading-relaxed">{note}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Milestones */}
                        {hobby.milestones.some(m => m.label) && (
                          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                            <div className="mb-2 flex items-center justify-between">
                              <p className="font-mono text-[10px] tracking-widest text-primary flex items-center gap-1"><Sparkles className="h-3 w-3" /> Milestones</p>
                              <span className="font-mono text-[10px] text-primary">{hobby.milestones.filter(m => m.done).length}/{hobby.milestones.filter(m => m.label).length} done</span>
                            </div>
                            <div className="space-y-1.5">
                              {hobby.milestones.filter(m => m.label).map((milestone, i) => (
                                <div key={i} className="flex items-start gap-2">
                                  <div className={cn("mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0", milestone.done ? "border-primary bg-primary" : "border-muted-foreground/30")}>
                                    {milestone.done && <svg className="w-2.5 h-2.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                                  </div>
                                  <span className={cn("font-mono text-xs", milestone.done ? "text-muted-foreground line-through" : "text-foreground/80")}>{milestone.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Connected to */}
                        {hobby.connections.length > 0 && (
                          <div>
                            <p className="font-mono text-[10px] text-muted-foreground tracking-widest mb-1.5">connected to</p>
                            <div className="flex flex-wrap gap-1.5">
                              {hobby.connections.map(cid => {
                                const connected = hobbyGroups[activeHobbyTab].find(h => h.id === cid)
                                if (!connected) return null
                                return (
                                  <button key={cid}
                                    onClick={() => setExpandedHobbyId(cid)}
                                    className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-primary/8 border border-primary/20 text-primary font-mono text-[11px] hover:bg-primary/15 transition-colors">
                                    {connected.emoji} {connected.title}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {filteredHobbies.length === 0 && (
                  <div className="sm:col-span-2 rounded-xl border border-dashed border-border/50 bg-card/20 p-6 text-center">
                    <p className="font-mono text-xs text-muted-foreground">Nothing here yet.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Garden view */}
          {hobbyView === "garden" && (
            <>
              <HobbyGardenView
                selected={gardenSelected}
                onSelect={setGardenSelected}
                nodes={filteredHobbies.map(h => ({
                  id: h.id,
                  title: h.title,
                  emoji: h.emoji,
                  level: h.progress,
                  category: h.category,
                  color: ({ creative: "#f7c5c5", intellectual: "#b8d4f0", physical: "#d4edda", digital: "#e8d5f7", social: "#ffd6a5" } as Record<string, string>)[h.category] ?? "#e5e7eb",
                  description: h.description,
                  connections: h.connections.filter(cid => filteredHobbies.some(f => f.id === cid)),
                  notes: h.notes,
                  milestones: h.milestones,
                  tags: h.tags,
                  x: 0, y: 0, vx: 0, vy: 0, r: getGardenNodeSize(h.progress),
                }))}
              />
              {gardenSelected && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{gardenSelected.emoji}</span>
                    <div className="flex-1">
                      <p className="font-bold text-sm">{gardenSelected.title}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">level {gardenSelected.level}%</p>
                    </div>
                    <button onClick={() => setGardenSelected(null)} className="text-muted-foreground hover:text-foreground text-base leading-none">×</button>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{gardenSelected.description}</p>
                  {gardenSelected.connections.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {gardenSelected.connections.map(cid => {
                        const c = gardenNodes.find(h => h.id === cid)
                        return c ? (
                          <button key={cid} onClick={() => setGardenSelected({ ...c, x: 0, y: 0, vx: 0, vy: 0, r: getGardenNodeSize(c.level) })}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-primary/8 border border-primary/20 text-primary font-mono text-[11px] cursor-pointer hover:bg-primary/15 transition-colors">
                            {c.emoji} {c.title}
                          </button>
                        ) : null
                      })}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

        </div>
      ),
    },

    {
      id: "inspiration-board",
      icon: <Lightbulb className="h-4 w-4" />,
      label: "Inspiration Board",
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveInspirationCategory(null)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all duration-200",
                !activeInspirationCategory ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              )}
            >
              <Tag className="h-3 w-3" /> all
            </button>
            {allInspirationCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveInspirationCategory(activeInspirationCategory === category ? null : category)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all duration-200",
                  activeInspirationCategory === category ? inspirationCategoryConfig[category].color : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                )}
              >
                {inspirationCategoryConfig[category].label}
              </button>
            ))}
          </div>
          <div className="columns-1 gap-3 sm:columns-2">
            {filteredInspirationItems.map((item) => (
              <div key={item.id} className={cn("mb-3 break-inside-avoid rounded-xl border border-l-4 border-border bg-card/40 p-5 transition-colors hover:border-primary/40", item.accentColor)}>
                <span className={cn("mb-3 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px]", inspirationCategoryConfig[item.category].color)}>
                  {item.category === "quote" ? <Quote className="h-2.5 w-2.5" /> : <Tag className="h-2.5 w-2.5" />}
                  {inspirationCategoryConfig[item.category].label}
                </span>
                <h3 className={cn("mb-2 font-medium leading-snug", item.category === "quote" ? "text-base italic" : "text-sm")}>
                  {item.category === "quote" ? `"${item.title}"` : item.title}
                </h3>
                {item.source && <p className="mb-2 font-mono text-xs text-primary">- {item.source}</p>}
                <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    {
      id: "music-playlists",
      icon: <Music className="h-4 w-4" />,
      label: "Music & Playlists",
      content: (
        <div className="space-y-3">
          {[{ name: "Deep Work", mood: "flow state", tracks: "Lo-fi, ambient, no lyrics", color: "bg-primary/10 text-primary border-primary/30" }].map((pl) => (
            <div key={pl.name} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-semibold">{pl.name}</p>
                <span className={cn("shrink-0 px-2 py-0.5 rounded-full border font-mono text-[10px]", pl.color)}>{pl.mood}</span>
              </div>
              <p className="font-mono text-xs text-muted-foreground">{pl.tracks}</p>
            </div>
          ))}
        </div>
      ),
    },

    {
      id: "nostalgia-whimsy",
      icon: <Heart className="h-4 w-4" />,
      label: "Nostalgia & Whimsy",
      content: (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveNostalgiaType(null)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all duration-200",
                !activeNostalgiaType ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
              )}
            >
              <Tag className="h-3 w-3" /> all
            </button>
            {nostalgiaTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveNostalgiaType(activeNostalgiaType === type ? null : type)}
                className={cn(
                  "px-3 py-1.5 rounded-lg border font-mono text-xs transition-all duration-200",
                  activeNostalgiaType === type ? typeColors[type] : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                )}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {filteredNostalgiaItems.map((item) => (
              <div key={item.id} className="group rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-2xl select-none mt-0.5">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <span className={cn("shrink-0 px-2 py-0.5 rounded-full border font-mono text-[10px]", typeColors[item.type])}>{item.type}</span>
                    </div>
                    <p className="font-mono text-xs text-muted-foreground leading-relaxed">{item.note}</p>
                    <p className="font-mono text-[10px] text-muted-foreground/50 mt-1.5">{item.era}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    {
      id: "reading",
      icon: <BookOpen className="h-4 w-4" />,
      label: "Reading Library",
      content: (
        <div className="space-y-3">
          {readingBooks.map((book) => {
            const hasNotes = !!book.summary
            const isExpanded = expandedBookId === book.id
            return (
              <div key={book.id} className="rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors overflow-hidden">
                <button
                  onClick={() => hasNotes && setExpandedBookId(isExpanded ? null : book.id)}
                  className={cn("w-full flex items-center gap-3 px-4 py-3 text-left", hasNotes ? "cursor-pointer" : "cursor-default")}
                >
                  <div className={cn("w-3 h-16 rounded-sm shrink-0", book.coverColor ?? "bg-secondary")} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium truncate">{book.title}</p>
                      {book.rating && (
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={cn("h-3 w-3", star <= book.rating! ? "fill-primary text-primary" : "text-muted-foreground/30")} />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <p className="font-mono text-xs text-muted-foreground">{book.author}</p>
                      {book.category && (
                        <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                          <Tag className="h-3 w-3" />{book.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn("px-2 py-0.5 rounded-full border font-mono text-[10px]",
                      book.status === "reading" ? "bg-primary/10 text-primary border-primary/30" :
                      book.status === "done" ? "bg-secondary text-muted-foreground border-border" :
                      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
                    )}>
                      {book.status === "queue" ? "antilibrary" : book.status}
                    </span>
                    {hasNotes && <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isExpanded && "rotate-180")} />}
                  </div>
                </button>
                {hasNotes && isExpanded && (
                  <div className="px-4 pb-4 border-t border-border/50 pt-3 space-y-4">
                    <div>
                      <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1">Summary</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{book.summary}</p>
                    </div>
                    {book.keyTakeaways && book.keyTakeaways.length > 0 && (
                      <div>
                        <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Lightbulb className="h-3 w-3 text-primary" />Key Takeaways
                        </h4>
                        <ul className="space-y-1.5">
                          {book.keyTakeaways.map((t, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-primary font-mono text-xs mt-0.5">{idx + 1}.</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {book.favoriteQuotes && book.favoriteQuotes.length > 0 && (
                      <div>
                        <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                          <Quote className="h-3 w-3 text-primary" />Favorite Quotes
                        </h4>
                        <div className="space-y-2">
                          {book.favoriteQuotes.map((q, idx) => (
                            <blockquote key={idx} className="pl-3 border-l-2 border-primary/50 text-sm italic text-muted-foreground">
                              &ldquo;{q}&rdquo;
                            </blockquote>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ),
    },

    {
      id: "talks-videos",
      icon: <Video className="h-4 w-4" />,
      label: "Talks & Videos",
      content: (
        <div className="space-y-3">
          {[{ title: "Why you keep rewatching the same TV show", speaker: "Michael Smith", event: "TEDx Talks" }].map((t) => (
            <div key={t.title} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <p className="text-sm font-medium">{t.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="font-mono text-xs text-muted-foreground">{t.speaker}</p>
                <span className="text-muted-foreground">·</span>
                <p className="font-mono text-xs text-muted-foreground">{t.event}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },

    {
      id: "tiny-experiments",
      icon: <Atom className="h-4 w-4" />,
      label: "Tiny Experiments",
      content: (
        <div className="space-y-3">
          {[{ experiment: "Daily design notes", notes: "Building consistency", status: "active" }].map((e) => (
            <div key={e.experiment} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-semibold">{e.experiment}</p>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-secondary border border-border font-mono text-[10px] text-muted-foreground">{e.status}</span>
              </div>
              <p className="font-mono text-xs text-muted-foreground">{e.notes}</p>
            </div>
          ))}
        </div>
      ),
    },

    {
      id: "writing",
      icon: <FileText className="h-4 w-4" />,
      label: "Writing & Research",
      content: (
        <div className="space-y-3">
          {[{ title: "Computer Human Interface Challenges in Space Exploration", source: "ntrs.nasa.gov/citations/20230009205 | Survey of interaction design for extreme environments core to my research", type: "paper" }].map((w) => (
            <div key={w.title} className="rounded-lg bg-secondary/30 border border-border/50 px-4 py-3 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{w.title}</p>
                  <p className="font-mono text-xs text-muted-foreground mt-0.5">{w.source}</p>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-secondary border border-border font-mono text-[10px] text-muted-foreground">{w.type}</span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ]

  const totalPages = pages.length
  const current = pages[currentPage]

  useEffect(() => {
    if (sidebarRef.current) {
      setSidebarHeight(sidebarRef.current.offsetHeight)
    }
  }, [pages.length])

  return (
    <section ref={ref} className="relative px-4 sm:px-6 pt-4 sm:pt-6 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        <div className={cn("space-y-3 mb-6 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">a bit of everything;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Bookmarks ‧₊˚♪ 𝄞₊˚⊹</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">Mini flipbook that works like a small index of artifacts, ideas, and references I return to often</p>
        </div>

        <div className={cn("opacity-0", isVisible && "animate-fade-in-up stagger-1")}>
          <div className="grid lg:grid-cols-[220px_1fr] gap-6 items-start">
            <div ref={sidebarRef} className="rounded-xl border border-border bg-card/40 glass p-3 space-y-1">
              {pages.map((page, index) => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(index)}
                  className={cn(
                    "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-mono text-xs transition-all duration-200",
                    currentPage === index
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-transparent"
                  )}
                >
                  <span className={cn(currentPage === index ? "text-primary" : "text-muted-foreground")}>{page.icon}</span>
                  {page.label}
                </button>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-card/40 glass overflow-hidden flex flex-col" style={{ height: sidebarHeight }}>
              <div className="flex items-center justify-between border-b border-border/50 bg-secondary/30 px-6 py-4 shrink-0">
                <div className="flex items-center gap-2">
                  {current.icon}
                  <span className="font-mono text-sm font-medium">{current.label}</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{currentPage + 1} / {totalPages}</span>
              </div>

              <div className="p-6 overflow-y-auto flex-1 min-h-0">
                {pageNotes[current.id] && (
                  <p className="font-mono text-xs text-muted-foreground tracking-wider mb-4">{pageNotes[current.id]}</p>
                )}
                {current.content}
              </div>

              <div className="flex items-center justify-between border-t border-border/50 bg-secondary/30 px-6 py-4 shrink-0">
                <button
                  onClick={() => setCurrentPage((p) => (p - 1 + totalPages) % totalPages)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors font-mono text-xs"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>
                <div className="flex gap-1">
                  {pages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={cn("h-2 rounded-full transition-all duration-200", currentPage === i ? "bg-primary w-6" : "bg-border hover:bg-muted-foreground w-2")}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => (p + 1) % totalPages)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors font-mono text-xs"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}