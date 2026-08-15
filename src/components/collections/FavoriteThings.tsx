"use client";
import { cn } from "@/src/lib/core-features/utils";
import { ExternalLink, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Study buddy
type Mood = "focused" | "sleepy" | "happy" | "curious" | "hungry";

const MOODS: Record<Mood, { emoji: string; label: string; message: string; bg: string; dot: string }> = {
  focused: {
    emoji: "🌿",
    label: "focused",
    message: "in the zone. do not disturb (please).",
    bg: "bg-green-500/10 border-green-500/25",
    dot: "bg-green-500",
  },
  sleepy: {
    emoji: "🌙",
    label: "sleepy",
    message: "five more minutes…",
    bg: "bg-blue-400/10 border-blue-400/25",
    dot: "bg-blue-400 animate-pulse",
  },
  happy: {
    emoji: "🌸",
    label: "happy",
    message: "everything is soft and good today.",
    bg: "bg-pink-400/10 border-pink-400/25",
    dot: "bg-pink-400",
  },
  curious: {
    emoji: "🔭",
    label: "curious",
    message: "what if we looked at one more thing…",
    bg: "bg-primary/10 border-primary/25",
    dot: "bg-primary",
  },
  hungry: {
    emoji: "🍵",
    label: "hungry",
    message: "tea break. non-negotiable.",
    bg: "bg-amber-400/10 border-amber-400/25",
    dot: "bg-amber-400",
  },
};
const MOOD_ORDER: Mood[] = ["focused", "sleepy", "happy", "curious", "hungry"];

function getMoodFromTime(): Mood {
  const h = new Date().getHours();
  if (h >= 6 && h < 10) return "sleepy";
  if (h >= 10 && h < 13) return "focused";
  if (h >= 13 && h < 15) return "hungry";
  if (h >= 15 && h < 19) return "curious";
  if (h >= 19 && h < 22) return "happy";
  return "sleepy";
}

function StudyBuddy() {
  const [mood, setMood] = useState<Mood>(getMoodFromTime);
  const [blink, setBlink] = useState(false);
  const [wiggle, setWiggle] = useState(false);

  useEffect(() => {
    const schedule = (): ReturnType<typeof setTimeout> => {
      const delay = 3000 + Math.random() * 4000;
      return setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 150);
        schedule();
      }, delay);
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    setWiggle(true);
    setTimeout(() => setWiggle(false), 500);
    setMood(MOOD_ORDER[(MOOD_ORDER.indexOf(mood) + 1) % MOOD_ORDER.length]);
  };

  const cfg = MOODS[mood];
  return (
    <div className={cn("flex flex-col items-center gap-4 rounded-xl border p-6 transition-all duration-500", cfg.bg)}>
      <button
        onClick={handleClick}
        aria-label="Change study buddy mood"
        className={cn(
          "relative flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-current/20 bg-background/60 transition-transform duration-200 hover:scale-105 active:scale-95 select-none",
          wiggle && "animate-[wiggle_0.4s_ease-in-out]",
        )}
      >
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex gap-2 items-center">
            <div
              className={cn("w-1.5 rounded-full bg-foreground transition-all duration-100", blink ? "h-0.5" : "h-1.5")}
            />
            <div
              className={cn("w-1.5 rounded-full bg-foreground transition-all duration-100", blink ? "h-0.5" : "h-1.5")}
            />
          </div>
          <div
            className={cn(
              "mt-1 rounded-full border-b-2 border-foreground",
              mood === "happy" && "w-4 h-2 rounded-b-full border-b-2 border-t-0",
              mood === "sleepy" && "w-3 h-1",
              mood === "focused" && "w-2 h-0.5",
              mood === "curious" && "w-3 h-1.5 rounded-full border-2 border-foreground border-t-0",
              mood === "hungry" && "w-4 h-2 rounded-b-full border-b-2 border-t-0",
            )}
          />
        </div>
        <span className="absolute -top-2 -right-2 text-base">{cfg.emoji}</span>
      </button>
      <div className="text-center space-y-1.5">
        <div className="flex items-center justify-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", cfg.dot)} />
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">{cfg.label}</span>
        </div>
        <p className="text-sm text-foreground/80 italic">"{cfg.message}"</p>
      </div>
      <div className="flex gap-1.5 flex-wrap justify-center">
        {MOOD_ORDER.map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={cn(
              "rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-wider transition-all duration-200",
              mood === m
                ? "border-foreground/40 bg-foreground/10 text-foreground"
                : "border-border/40 text-muted-foreground hover:border-foreground/30",
            )}
          >
            {m}
          </button>
        ))}
      </div>
      <p className="font-mono text-[9px] text-muted-foreground">tap to cycle • auto-set by time of day</p>
    </div>
  );
}

// Character card
function CharacterCard() {
  const [hovered, setHovered] = useState(false);
  const traits = [
    { label: "class", value: "herbalist-engineer" },
    { label: "habitat", value: "libraries & late nights" },
    { label: "weapon", value: "a half-filled notebook" },
    { label: "familiar", value: "a raven named after a star" },
    { label: "quest", value: "building interfaces for minds" },
    { label: "weakness", value: "good tea & interesting problems" },
  ];
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border transition-all duration-500 cursor-default",
        hovered ? "border-primary/40" : "border-border/50",
        "bg-linear-to-br from-card/80 via-card/60 to-primary/5",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        {["🌿", "🌸", "✦", "🍄", "🌙", "🌾", "🦋", "🌻"].map((s, i) => (
          <span
            key={i}
            className="absolute text-xs transition-all duration-700"
            style={{
              left: `${((i * 127) % 90) + 5}%`,
              top: `${((i * 83) % 80) + 5}%`,
              opacity: hovered ? 0.5 : 0.2,
              transform: hovered ? "scale(1.2)" : "scale(1)",
              transitionDelay: `${i * 30}ms`,
            }}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="relative p-6 space-y-5">
        <div className="space-y-1">
          <p className="font-mono text-[10px] tracking-[0.25em] text-primary">character sheet;</p>
          <h3 className="text-lg font-bold tracking-tight">if i was a character…</h3>
          <p className="font-mono text-xs text-muted-foreground">the cottagecore engineer</p>
        </div>
        <div className="flex justify-center">
          <div className="relative h-24 w-24 rounded-2xl border-2 border-primary/30 bg-primary/5 flex items-center justify-center overflow-hidden">
            <span className="text-5xl select-none">🧙‍♀️</span>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-primary/10 to-transparent" />
          </div>
        </div>
        <div className="space-y-2">
          {traits.map(({ label, value }) => (
            <div key={label} className="flex gap-3 items-baseline">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground w-16 shrink-0">{label}</span>
              <span className="font-mono text-xs text-foreground">{value}</span>
            </div>
          ))}
        </div>
        <p
          className={cn(
            "font-mono text-[10px] text-primary/60 italic transition-opacity duration-300",
            hovered ? "opacity-100" : "opacity-0",
          )}
        >
          ✦ probably has a pressed flower collection
        </p>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

// "If I were a...""
const IF_I_WERE = [
  { category: "a season", answer: "late autumn", emoji: "🍂" },
  { category: "a time of day", answer: "2am", emoji: "🌙" },
  { category: "a weather", answer: "overcast with soft rain", emoji: "🌧️" },
  { category: "a font", answer: "Garamond italic", emoji: "𝑓" },
  { category: "a place", answer: "a quiet library corner", emoji: "📚" },
  { category: "a plant", answer: "a fern in indirect light", emoji: "🌿" },
  { category: "a drink", answer: "jasmine green tea", emoji: "🍵" },
  { category: "a material", answer: "aged paper", emoji: "📜" },
];

function IfIWere() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 glass p-5 space-y-4">
      <p className="font-mono text-[10px] tracking-[0.25em] text-primary">if i were a…</p>
      <div className="grid grid-cols-2 gap-2">
        {IF_I_WERE.map(({ category, answer, emoji }) => (
          <div
            key={category}
            className="group flex items-start gap-2.5 rounded-lg border border-border/40 bg-secondary/20 px-3 py-2.5 hover:border-primary/30 transition-colors"
          >
            <span className="text-base select-none shrink-0">{emoji}</span>
            <div className="min-w-0 space-y-0.5">
              <p className="font-mono text-[9px] tracking-widest text-muted-foreground">{category}</p>
              <p className="font-mono text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                {answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Scents
const SCENTS = [
  { name: "jasmine", note: "the one that means it's time to focus", emoji: "🌸" },
  { name: "old books", note: "bibliosmia - the smell of accumulated time", emoji: "📚" },
  { name: "rain on concrete", note: "petrichor. best smell on earth, actually", emoji: "🌧️" },
  { name: "cedar", note: "forest in a library", emoji: "🌲" },
  { name: "hojicha", note: "roasted and warm and calming", emoji: "🍵" },
  { name: "night air", note: "cold and wide and full of ideas", emoji: "🌙" },
];

function Scents() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 glass p-5 space-y-4">
      <p className="font-mono text-[10px] tracking-[0.25em] text-primary">scents;</p>
      <div className="space-y-2">
        {SCENTS.map(({ name, note, emoji }) => (
          <div
            key={name}
            className="group flex items-center gap-3 rounded-lg border border-border/40 bg-secondary/20 px-3 py-2.5 hover:border-primary/30 transition-colors"
          >
            <span className="text-base select-none shrink-0">{emoji}</span>
            <div className="min-w-0">
              <p className="font-mono text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                {name}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground leading-snug">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sounds
const SOUNDS = [
  { name: "rain on a window", emoji: "🌧️" },
  { name: "kettle coming to boil", emoji: "♨️" },
  { name: "library ambience", emoji: "📖" },
  { name: "lo-fi at low volume", emoji: "🎵" },
  { name: "pages turning", emoji: "📄" },
  { name: "distant thunder", emoji: "⛈️" },
  { name: "keyboard typing", emoji: "⌨️" },
  { name: "wind through leaves", emoji: "🍃" },
];

function SoundsCalming() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 glass p-5 space-y-4">
      <p className="font-mono text-[10px] tracking-[0.25em] text-primary">sounds i find calming;</p>
      <div className="flex flex-wrap gap-2">
        {SOUNDS.map(({ name, emoji }) => (
          <div
            key={name}
            className="flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/30 px-3 py-1.5 hover:border-primary/30 hover:bg-primary/5 transition-colors"
          >
            <span className="text-sm select-none">{emoji}</span>
            <span className="font-mono text-[10px] text-foreground/80">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Things I collect
const COLLECTIONS = [
  { name: "loose-leaf teas", type: "physical", emoji: "🍵", note: "currently 14 varieties" },
  { name: "pressed flowers", type: "physical", emoji: "🌸", note: "in notebooks and between pages" },
  { name: "interesting bookmarks", type: "physical", emoji: "🔖", note: "the stranger the better" },
  { name: "font specimens", type: "digital", emoji: "𝒻", note: "obsessive about type" },
  { name: "SVG icons", type: "digital", emoji: "◈", note: "custom and from the wild" },
  { name: "HCI field notes", type: "digital", emoji: "📓", note: "observations from daily life" },
  { name: "half-finished notebooks", type: "physical", emoji: "📔", note: "always start a new one before finishing" },
  { name: "tea tins", type: "physical", emoji: "🫙", note: "repurposed for everything" },
];

function ThingsICollect() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 glass p-5 space-y-4">
      <p className="font-mono text-[10px] tracking-[0.25em] text-primary">things i collect;</p>
      <div className="space-y-2">
        {COLLECTIONS.map(({ name, type, emoji, note }) => (
          <div
            key={name}
            className="group flex items-center gap-3 rounded-lg border border-border/40 bg-secondary/20 px-3 py-2 hover:border-primary/30 transition-colors"
          >
            <span className="text-base select-none shrink-0">{emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-mono text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                {name}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground">{note}</p>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px]",
                type === "physical"
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-500"
                  : "border-primary/30 bg-primary/10 text-primary",
              )}
            >
              {type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Mood board
const MOOD_TILES = [
  { label: "soft morning light", gradient: "from-amber-100/60 via-rose-100/40 to-amber-50/60", emoji: "☀️" },
  { label: "deep focus", gradient: "from-slate-900/80 via-primary/20 to-slate-800/60", emoji: "🌌" },
  { label: "cottagecore", gradient: "from-green-100/60 via-emerald-50/40 to-lime-100/60", emoji: "🌿" },
  { label: "rain window", gradient: "from-slate-300/50 via-blue-100/30 to-slate-200/50", emoji: "🌧️" },
  { label: "late night", gradient: "from-violet-900/60 via-primary/30 to-indigo-900/60", emoji: "🌙" },
  { label: "library afternoon", gradient: "from-amber-200/50 via-orange-100/30 to-yellow-100/50", emoji: "📚" },
];

function MoodBoard() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 glass p-5 space-y-4">
      <p className="font-mono text-[10px] tracking-[0.25em] text-primary">mood board;</p>
      <div className="grid grid-cols-3 gap-2">
        {MOOD_TILES.map(({ label, gradient, emoji }) => (
          <div
            key={label}
            className={cn(
              "group relative flex aspect-square items-end overflow-hidden rounded-xl bg-gradient-to-br p-2 transition-transform duration-300 hover:scale-[1.04] cursor-default",
              gradient,
            )}
          >
            <span className="absolute top-2 right-2 text-lg select-none">{emoji}</span>
            <p className="font-mono text-[9px] font-semibold text-foreground/80 leading-tight">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Aesthetic tags
const AESTHETIC_TAGS = [
  { tag: "cottagecore", description: "soft, botanical, hand-crafted, unhurried" },
  { tag: "dark academia", description: "libraries, candlelight, marginalia, pursuit of knowledge" },
  { tag: "lo-fi", description: "warm grain, imperfect loops, focus by ambient sound" },
  { tag: "space age", description: "clean geometry, constraint-driven design, vast scale" },
  { tag: "witchcore", description: "old books, dried herbs, moon phases, gathered things" },
  { tag: "solarpunk", description: "technology in harmony with nature, optimistic futures" },
  { tag: "quiet luxury", description: "no logos, good materials, everything earning its place" },
  { tag: "brutalist web", description: "honest structure, nothing decorative, raw function" },
];

function AestheticTags() {
  const [active, setActive] = useState<string | null>(null);
  const activeDesc = AESTHETIC_TAGS.find((a) => a.tag === active)?.description;
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 glass p-5 space-y-4">
      <p className="font-mono text-[10px] tracking-[0.25em] text-primary">aesthetics;</p>
      <div className="flex flex-wrap gap-2">
        {AESTHETIC_TAGS.map(({ tag }) => (
          <button
            key={tag}
            onClick={() => setActive(active === tag ? null : tag)}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-wider transition-all duration-200 active:scale-[0.98]",
              active === tag
                ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20"
                : "border-border/60 bg-secondary/30 text-muted-foreground hover:border-primary/30 hover:text-foreground",
            )}
          >
            {tag}
          </button>
        ))}
      </div>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          activeDesc ? "max-h-12 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <p className="font-mono text-xs text-muted-foreground border-l-2 border-primary/30 pl-3 italic">{activeDesc}</p>
      </div>
    </div>
  );
}

// Things I want to learn
const WANT_TO_LEARN = [
  { thing: "bookbinding", emoji: "📖", status: "someday" },
  { thing: "letterpress printing", emoji: "🖨️", status: "someday" },
  { thing: "Japanese to N3", emoji: "🇯🇵", status: "in progress" },
  { thing: "zero-g interface design", emoji: "🛰️", status: "in progress" },
  { thing: "Korean", emoji: "🇰🇷", status: "started" },
  { thing: "circuit bending", emoji: "⚡", status: "someday" },
  { thing: "calligraphy", emoji: "✒️", status: "someday" },
  { thing: "formal logic", emoji: "∴", status: "in progress" },
  { thing: "Rust", emoji: "🦀", status: "someday" },
  { thing: "celestial navigation", emoji: "🧭", status: "someday" },
];

const STATUS_STYLE: Record<string, string> = {
  "in progress": "border-green-500/30 bg-green-500/10 text-green-500",
  started: "border-amber-500/30 bg-amber-500/10 text-amber-500",
  someday: "border-border/50 bg-secondary/30 text-muted-foreground",
};

function WantToLearn() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 glass p-5 space-y-4">
      <p className="font-mono text-[10px] tracking-[0.25em] text-primary">things i want to learn;</p>
      <div className="flex flex-wrap gap-2">
        {WANT_TO_LEARN.map(({ thing, emoji, status }) => (
          <div
            key={thing}
            className="flex items-center gap-1.5 rounded-full border border-border/50 bg-secondary/20 px-3 py-1.5 hover:border-primary/30 transition-colors"
          >
            <span className="text-sm select-none">{emoji}</span>
            <span className="font-mono text-[10px] text-foreground/80">{thing}</span>
            <span className={cn("rounded-full border px-1.5 py-0.5 font-mono text-[8px]", STATUS_STYLE[status])}>
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Comfort media
const COMFORT_MEDIA = [
  {
    title: "Studio Ghibli films",
    type: "film",
    emoji: "🎬",
    note: "Howl's Moving Castle specifically - watch yearly without fail",
  },
  {
    title: "Nagi no Asukara",
    type: "show",
    emoji: "📺",
    note: "most beautiful thing I've seen. I still think about it.",
  },
  {
    title: "The Design of Everyday Things",
    type: "book",
    emoji: "📖",
    note: "re-read when I forget why design matters",
  },
  {
    title: "lo-fi hip hop radio",
    type: "music",
    emoji: "🎵",
    note: "in the background of more late nights than I can count",
  },
  {
    title: "Stardew Valley",
    type: "game",
    emoji: "🎮",
    note: "for when the world is too much and I need a simpler one",
  },
];

const MEDIA_PILL: Record<string, string> = {
  film: "border-pink-500/30 bg-pink-500/10 text-pink-500",
  show: "border-blue-500/30 bg-blue-500/10 text-blue-500",
  book: "border-amber-500/30 bg-amber-500/10 text-amber-500",
  music: "border-green-500/30 bg-green-500/10 text-green-500",
  game: "border-primary/30 bg-primary/10 text-primary",
};

function ComfortMedia() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 glass p-5 space-y-4">
      <p className="font-mono text-[10px] tracking-[0.25em] text-primary">comfort media;</p>
      <div className="space-y-2.5">
        {COMFORT_MEDIA.map(({ title, type, emoji, note }) => (
          <div
            key={title}
            className="group flex items-start gap-3 rounded-lg border border-border/40 bg-secondary/20 px-3 py-2.5 hover:border-primary/30 transition-colors"
          >
            <span className="text-base select-none shrink-0 mt-0.5">{emoji}</span>
            <div className="flex-1 min-w-0 space-y-0.5">
              <p className="font-mono text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                {title}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">{note}</p>
            </div>
            <span
              className={cn("shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] mt-0.5", MEDIA_PILL[type])}
            >
              {type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Places I want to go
const PLACES = [
  { name: "Kyoto, Japan", emoji: "⛩️", note: "old city energy. want to walk the philosopher's path in autumn" },
  { name: "Edinburgh, Scotland", emoji: "🏰", note: "dark academia in physical form" },
  { name: "Hallstatt, Austria", emoji: "🏔️", note: "looks like a painting. have to verify it's real" },
  { name: "Tromsø, Norway", emoji: "🌌", note: "for the northern lights. and the silence" },
  { name: "Lisbon, Portugal", emoji: "🚋", note: "tiled buildings and good pastries and the Atlantic" },
  { name: "Chiang Mai, Thailand", emoji: "🌸", note: "temples and night markets and jasmine everywhere" },
  { name: "The ISS", emoji: "🛰️", note: "obviously. for the interface design research, obviously." },
];

function PlacesIWantToGo() {
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 glass p-5 space-y-4">
      <p className="font-mono text-[10px] tracking-[0.25em] text-primary">places i want to go;</p>
      <div className="space-y-2">
        {PLACES.map(({ name, emoji, note }) => (
          <div
            key={name}
            className="group flex items-start gap-3 rounded-lg border border-border/40 bg-secondary/20 px-3 py-2.5 hover:border-primary/30 transition-colors"
          >
            <span className="text-base select-none shrink-0 mt-0.5">{emoji}</span>
            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                <p className="font-mono text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  {name}
                </p>
              </div>
              <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Favorites grid
const FAVORITES = [
  {
    category: "animal",
    items: [{ name: "raven", emoji: "🐦‍⬛", note: "intelligent, mysterious, collector of shiny things - relatable" }],
  },
  {
    category: "flowers",
    items: [
      { name: "lily", emoji: "🌷", note: "clean lines, quiet elegance" },
      { name: "tulip", emoji: "🌸", note: "soft geometry, good color range" },
    ],
  },
];

function FavoritesGrid() {
  return (
    <div className="space-y-4">
      {FAVORITES.map((group) => (
        <div key={group.category} className="space-y-2">
          <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">{group.category}</p>
          {group.items.map((item) => (
            <div
              key={item.name}
              className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card/40 glass px-4 py-3 hover:border-primary/30 transition-all duration-300"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200 select-none">
                {item.emoji}
              </span>
              <div className="space-y-0.5 min-w-0">
                <p className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground leading-snug">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Quiz link
function QuizLink() {
  return (
    <a
      href="/quiz"
      className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-xl border border-primary/25 bg-primary/5 px-5 py-4 transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
    >
      <div className="pointer-events-none absolute right-4 top-0 bottom-0 flex items-center gap-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        {["🌿", "🌸", "✦", "🌙"].map((e, i) => (
          <span key={i} className="text-sm" style={{ transform: `rotate(${i * 15 - 20}deg)` }}>
            {e}
          </span>
        ))}
      </div>
      <div className="space-y-0.5">
        <p className="font-mono text-[10px] tracking-[0.25em] text-primary">personality quiz;</p>
        <p className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          which type of person are you?
        </p>
        <p className="text-xs text-muted-foreground">a quiz i made - find out if we're the same kind of weird</p>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0 text-primary/60 transition-all duration-300 group-hover:text-primary group-hover:scale-110 group-hover:rotate-12" />
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
    </a>
  );
}

// Main section
export function FavoriteThings() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="border-t border-border/30 px-4 pt-16 sm:pt-20 pb-8 sm:pb-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-10 sm:mb-14 space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">soft things;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Favorite Things</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            The small things that say something true
          </p>
        </div>

        {/* Row 1 - favorites + quiz • character card • study buddy */}
        <div
          className={cn("mb-6 grid gap-6 lg:grid-cols-3 opacity-0", isVisible && "animate-fade-in-up")}
          style={{ animationDelay: "80ms" }}
        >
          <div className="flex flex-col gap-5">
            <FavoritesGrid />
            <QuizLink />
          </div>
          <CharacterCard />
          <div className="space-y-3">
            <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">study companion;</p>
            <StudyBuddy />
          </div>
        </div>

        {/* Row 2 - if i were • mood board */}
        <div
          className={cn("mb-6 grid gap-6 lg:grid-cols-2 opacity-0", isVisible && "animate-fade-in-up")}
          style={{ animationDelay: "160ms" }}
        >
          <IfIWere />
          <MoodBoard />
        </div>

        {/* Row 3 - aesthetic tags • scents • sounds */}
        <div
          className={cn("mb-6 grid gap-6 lg:grid-cols-3 opacity-0", isVisible && "animate-fade-in-up")}
          style={{ animationDelay: "220ms" }}
        >
          <AestheticTags />
          <Scents />
          <SoundsCalming />
        </div>

        {/* Row 4 - things i collect • want to learn */}
        <div
          className={cn("mb-6 grid gap-6 lg:grid-cols-2 opacity-0", isVisible && "animate-fade-in-up")}
          style={{ animationDelay: "280ms" }}
        >
          <ThingsICollect />
          <WantToLearn />
        </div>

        {/* Row 5 - comfort media • places */}
        <div
          className={cn("grid gap-6 lg:grid-cols-2 opacity-0", isVisible && "animate-fade-in-up")}
          style={{ animationDelay: "340ms" }}
        >
          <ComfortMedia />
          <PlacesIWantToGo />
        </div>
      </div>
    </section>
  );
}
