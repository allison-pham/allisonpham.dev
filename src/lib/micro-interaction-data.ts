export type ExhibitCategory = "button" | "feedback" | "transition" | "input" | "gesture" | "state"

export type Exhibit = {
  id: string
  title: string
  category: ExhibitCategory
  principle: string
  why: string
  source?: string
}

export const exhibits: Exhibit[] = [
  {
    id: "hold-to-confirm",
    title: "Hold to confirm",
    category: "gesture",
    principle: "Error prevention (Norman)",
    why: "A press-and-hold for destructive actions adds deliberate friction. You can't accidentally trigger it. The filling ring gives real-time feedback of your commit.",
    source: "iOS delete gesture, Linear cancel subscription",
  },
  {
    id: "skeleton-pulse",
    title: "Skeleton loading pulse",
    category: "feedback",
    principle: "Perceived performance",
    why: "Layout doesn't shift when content arrives. The pulse sets the expectation of shape before data - users feel faster even if the network isn't.",
    source: "Facebook, Linear, GitHub",
  },
  {
    id: "spring-button",
    title: "Spring physics on press",
    category: "button",
    principle: "Direct manipulation (Shneiderman)",
    why: "A button that squishes on press and springs back mirrors physical button physics. The response feels satisfying because it echoes real-world causality.",
  },
  {
    id: "focus-ring",
    title: "Animated focus ring",
    category: "input",
    principle: "Gulf of evaluation (Norman)",
    why: "The focus ring communicates 'this element is listening.' An animated fade-in is more salient than a static outline - critical for keyboard navigation users.",
  },
  {
    id: "count-tick",
    title: "Counter tick animation",
    category: "feedback",
    principle: "Continuous feedback",
    why: "Numbers that roll rather than snap carry semantic weight. The motion communicates 'something changed by this much' rather than 'a new number appeared.'",
    source: "Stripe dashboard, GitHub contribution graph",
  },
  {
    id: "toggle-slide",
    title: "Toggle with momentum",
    category: "state",
    principle: "State visibility",
    why: "A toggle that overshoots slightly and settles communicates the state change with kinetic energy. The momentum signals: this action has weight.",
  },
  {
    id: "swipe-reveal",
    title: "Swipe-to-reveal actions",
    category: "gesture",
    principle: "Progressive disclosure",
    why: "Secondary actions hidden behind a swipe reduce visual noise without hiding functionality. The gesture is learnable once and universal in mobile contexts.",
    source: "iOS Mail, Notion mobile",
  },
  {
    id: "cursor-follow",
    title: "Magnetic cursor pull",
    category: "button",
    principle: "Fitts's Law",
    why: "Buttons that subtly pull the cursor toward them increase the effective target size. The magnetic effect is subliminal - users don't notice it, they just click more accurately.",
    source: "Linear, Vercel",
  },
  {
    id: "checkmark-draw",
    title: "Drawn checkmark on complete",
    category: "feedback",
    principle: "Closure & completion",
    why: "A checkmark that draws itself path-by-path creates a micro-moment of satisfaction. The temporal extension of the success state makes it feel earned.",
  },
  {
    id: "input-shake",
    title: "Shake on error",
    category: "input",
    principle: "Error feedback (ISO 9241)",
    why: "A horizontal shake communicates 'wrong' with a physical metaphor - head shaking no. It uses motion as semantic content, not decoration.",
  },
]

export const categoryConfig: Record<ExhibitCategory, { color: string; bg: string; border: string }> = {
  button:     { color: "#a78bfa", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)" },
  feedback:   { color: "#34d399", bg: "rgba(52,211,153,0.1)",  border: "rgba(52,211,153,0.3)"  },
  transition: { color: "#60a5fa", bg: "rgba(96,165,250,0.1)",  border: "rgba(96,165,250,0.3)"  },
  input:      { color: "#fbbf24", bg: "rgba(251,191,36,0.1)",  border: "rgba(251,191,36,0.3)"  },
  gesture:    { color: "#f472b6", bg: "rgba(244,114,182,0.1)", border: "rgba(244,114,182,0.3)" },
  state:      { color: "#fb923c", bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.3)"  },
}
