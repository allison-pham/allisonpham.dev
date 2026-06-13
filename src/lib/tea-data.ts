export type TeaType = "green" | "black" | "oolong" | "white" | "puerh" | "herbal" | "matcha"

export type TeaEntry = {
  id: string
  name: string
  type: TeaType
  origin: string
  originCoords: [number, number] // [lat, lng] for map
  brewTemp: number  // celsius
  steepTime: number // seconds
  date: string      // YYYY-MM-DD
  mood: "focused" | "calm" | "tired" | "energized" | "reflective"
  moodAfter: "focused" | "calm" | "tired" | "energized" | "reflective"
  focusRating: number  // 1–5
  tasteRating: number  // 1–5
  // Flavor notes - 0–5 intensity each
  flavors: {
    floral: number
    grassy: number
    earthy: number
    roasted: number
    sweet: number
    bitter: number
    umami: number
    fruity: number
  }
  notes: string
}

export const teaLog: TeaEntry[] = [
  {
    id: "t001",
    name: "Dragon Well (Longjing)",
    type: "green",
    origin: "Hangzhou, China",
    originCoords: [30.2741, 120.1551],
    brewTemp: 75,
    steepTime: 90,
    date: "2026-05-28",
    mood: "tired",
    moodAfter: "focused",
    focusRating: 5,
    tasteRating: 5,
    flavors: { floral: 3, grassy: 5, earthy: 1, roasted: 2, sweet: 3, bitter: 1, umami: 4, fruity: 1 },
    notes: "The best green tea I've had. Nutty, vegetal, almost buttery. Works faster than coffee.",
  },
  {
    id: "t002",
    name: "Gyokuro",
    type: "green",
    origin: "Uji, Japan",
    originCoords: [34.8839, 135.7985],
    brewTemp: 60,
    steepTime: 120,
    date: "2026-05-24",
    mood: "reflective",
    moodAfter: "focused",
    focusRating: 5,
    tasteRating: 5,
    flavors: { floral: 2, grassy: 4, earthy: 1, roasted: 1, sweet: 4, bitter: 1, umami: 5, fruity: 0 },
    notes: "Shade-grown, absurdly umami. Requires patience - 60°C is not a mistake.",
  },
  {
    id: "t003",
    name: "Darjeeling First Flush",
    type: "black",
    origin: "Darjeeling, India",
    originCoords: [27.0360, 88.2627],
    brewTemp: 90,
    steepTime: 180,
    date: "2026-05-20",
    mood: "calm",
    moodAfter: "energized",
    focusRating: 4,
    tasteRating: 4,
    flavors: { floral: 4, grassy: 2, earthy: 1, roasted: 2, sweet: 3, bitter: 2, umami: 1, fruity: 3 },
    notes: "Muscatel grape notes, almost Champagne-like. Doesn't taste like black tea.",
  },
  {
    id: "t004",
    name: "Tie Guan Yin",
    type: "oolong",
    origin: "Fujian, China",
    originCoords: [24.4798, 117.9598],
    brewTemp: 90,
    steepTime: 45,
    date: "2026-05-15",
    mood: "focused",
    moodAfter: "calm",
    focusRating: 3,
    tasteRating: 4,
    flavors: { floral: 5, grassy: 1, earthy: 1, roasted: 3, sweet: 4, bitter: 1, umami: 2, fruity: 2 },
    notes: "Orchid florals, creamy finish. Good for evening work - calms without sedating.",
  },
  {
    id: "t005",
    name: "Silver Needle (Bai Hao Yin Zhen)",
    type: "white",
    origin: "Fujian, China",
    originCoords: [27.3191, 118.9430],
    brewTemp: 75,
    steepTime: 240,
    date: "2026-05-10",
    mood: "energized",
    moodAfter: "calm",
    focusRating: 3,
    tasteRating: 5,
    flavors: { floral: 4, grassy: 1, earthy: 0, roasted: 0, sweet: 5, bitter: 0, umami: 2, fruity: 3 },
    notes: "Delicate, almost imperceptibly sweet. Like drinking spring air.",
  },
  {
    id: "t006",
    name: "Aged Sheng Puerh (2018)",
    type: "puerh",
    origin: "Yunnan, China",
    originCoords: [23.3417, 101.0344],
    brewTemp: 95,
    steepTime: 30,
    date: "2026-05-05",
    mood: "reflective",
    moodAfter: "reflective",
    focusRating: 4,
    tasteRating: 4,
    flavors: { floral: 1, grassy: 2, earthy: 5, roasted: 2, sweet: 2, bitter: 3, umami: 3, fruity: 1 },
    notes: "Forest floor, camphor, a slight tobacco finish. The most meditative tea I've found.",
  },
  {
    id: "t007",
    name: "Ceremonial Matcha",
    type: "matcha",
    origin: "Nishio, Japan",
    originCoords: [34.8605, 137.0724],
    brewTemp: 70,
    steepTime: 0,
    date: "2026-04-28",
    mood: "tired",
    moodAfter: "focused",
    focusRating: 5,
    tasteRating: 4,
    flavors: { floral: 2, grassy: 5, earthy: 2, roasted: 1, sweet: 3, bitter: 2, umami: 5, fruity: 0 },
    notes: "The L-theanine + caffeine combination is genuinely different from coffee. Focused without the jitter.",
  },
  {
    id: "t008",
    name: "Chamomile & Honey",
    type: "herbal",
    origin: "Egypt",
    originCoords: [27.0, 30.0],
    brewTemp: 95,
    steepTime: 300,
    date: "2026-04-20",
    mood: "tired",
    moodAfter: "calm",
    focusRating: 1,
    tasteRating: 3,
    flavors: { floral: 5, grassy: 1, earthy: 1, roasted: 0, sweet: 5, bitter: 0, umami: 0, fruity: 2 },
    notes: "Not for focus. For the end of a long day when the brain needs to stop.",
  },
]

export const teaTypeConfig: Record<TeaType, { color: string; bg: string; border: string; label: string }> = {
  green:  { color: "#4ade80", bg: "rgba(74,222,128,0.1)",  border: "rgba(74,222,128,0.3)",  label: "Green"  },
  black:  { color: "#a78bfa", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)", label: "Black"  },
  oolong: { color: "#fb923c", bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.3)",  label: "Oolong" },
  white:  { color: "#e2e8f0", bg: "rgba(226,232,240,0.1)", border: "rgba(226,232,240,0.3)", label: "White"  },
  puerh:  { color: "#78350f", bg: "rgba(120,53,15,0.15)",  border: "rgba(120,53,15,0.3)",   label: "Puerh"  },
  herbal: { color: "#34d399", bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)",  label: "Herbal" },
  matcha: { color: "#86efac", bg: "rgba(134,239,172,0.1)", border: "rgba(134,239,172,0.3)", label: "Matcha" },
}

export const moodEmoji: Record<TeaEntry["mood"], string> = {
  focused: "⚡",
  calm: "🌊",
  tired: "😴",
  energized: "✨",
  reflective: "🌙",
}

export const flavorKeys: Array<keyof TeaEntry["flavors"]> = [
  "floral", "grassy", "earthy", "roasted", "sweet", "bitter", "umami", "fruity"
]
