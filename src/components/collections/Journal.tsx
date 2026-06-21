"use client";
import { ArrowLeft, ArrowRight, BookOpen, Heart, Satellite, FlaskConical, Telescope, CheckCircle2, Circle, ChevronDown, ChevronUp, Zap, Clock, Star, Trophy, Coffee, Globe, Sparkles, Plus } from "lucide-react";
import { cn } from "@/src/lib/core-features/utils";
import { useEffect, useRef, useState } from "react";

type SpreadId = "cover" | "qa" | "badges" | "planner" | "stickers";

const STATS = [
  { val: "4", label: "hackathons led", Icon: Trophy },
  { val: "12+", label: "projects built", Icon: Satellite },
  { val: "3", label: "langs learning", Icon: Globe },
  { val: "∞", label: "cups of tea", Icon: Coffee },
];

const TAGS = [
  { label: "HCI", color: "bg-primary/10 text-primary border-primary/30" },
  { label: "Space", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
  { label: "Design", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30" },
  { label: "Systems", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
];

interface QAItem {
  id: string;
  prompt: string;
  answer: string;
  tag?: string;
  tagColor?: string;
}

const QA_ITEMS: QAItem[] = [
  {
    id: "obsession",
    prompt: "what's your current obsession?",
    answer: "Cognitive load in interface design - specifically how to reduce mental friction without removing depth. Also whatever's at the bottom of a good cup of tea.",
    tag: "now",
    tagColor: "bg-primary/10 text-primary border-primary/30",
  },
  {
    id: "build",
    prompt: "if you could only build one thing, what would it be?",
    answer: "An interface that thinks *with* you, not for you. Something that holds up under pressure and adapts to the way different minds work.",
    tag: "vision",
    tagColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
  },
  {
    id: "words",
    prompt: "three words that describe your work",
    answer: "systems • clarity • curiosity",
    tag: "identity",
    tagColor: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
  },
  {
    id: "reading",
    prompt: "currently reading?",
    answer: "The Design of Everyday Things (Norman). Also deep in HCI papers about attention and cognitive offloading.",
    tag: "shelf",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  {
    id: "space",
    prompt: "why space systems?",
    answer: "Interface design with zero room for error, operating in environments humans have never been. The stakes force you to think differently about every design decision.",
    tag: "research",
    tagColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  {
    id: "advice",
    prompt: "advice to your past self?",
    answer: "Ship earlier. The gap between 'good enough to learn from' and 'perfect enough to show' costs more than you think.",
    tag: "lessons",
    tagColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
  },
  {
    id: "notwork",
    prompt: "what do you do when you're not working?",
    answer: "Language study (Vietnamese, etc.), tea rituals, reading anything about how systems shape human behavior.",
    tag: "life",
    tagColor: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30",
  },
];

type BadgeCategory = "builder" | "researcher" | "leader" | "learner" | "life";
type Rarity = "common" | "rare" | "legendary";

interface Badge {
  id: string;
  emoji: string;
  label: string;
  description: string;
  unlocked: boolean;
  category: BadgeCategory;
  rarity: Rarity;
  unlockedDate?: string;
}

const BADGES: Badge[] = [
  { id: "first-ship", emoji: "🚀", label: "first ship", description: "Deployed your first project live", unlocked: true, category: "builder", rarity: "common", unlockedDate: "2022" },
  { id: "fullstack", emoji: "⚡", label: "full stack", description: "Built an end-to-end product solo", unlocked: true, category: "builder", rarity: "rare", unlockedDate: "2023" },
  { id: "open-source", emoji: "🌐", label: "open source", description: "Contributed to open source projects", unlocked: true, category: "builder", rarity: "common", unlockedDate: "2023" },
  { id: "hackathon-winner", emoji: "🏆", label: "hackathon W", description: "Won at a competitive hackathon", unlocked: false, category: "builder", rarity: "legendary" },
  { id: "director", emoji: "🎯", label: "director", description: "Directed a hackathon with 300+ attendees", unlocked: true, category: "leader", rarity: "legendary", unlockedDate: "2024" },
  { id: "president", emoji: "👑", label: "president", description: "Led ACM at UCR as President", unlocked: true, category: "leader", rarity: "legendary", unlockedDate: "2024" },
  { id: "campus-leader", emoji: "🌱", label: "campus leader", description: "Notion Campus Leader", unlocked: true, category: "leader", rarity: "rare", unlockedDate: "2023" },
  { id: "hci-nerd", emoji: "🔬", label: "hci nerd", description: "Researching HCI & cognitive interfaces", unlocked: true, category: "researcher", rarity: "rare", unlockedDate: "2024" },
  { id: "space-systems", emoji: "🛸", label: "space systems", description: "Explored space interface design", unlocked: true, category: "researcher", rarity: "rare", unlockedDate: "2025" },
  { id: "published", emoji: "📄", label: "published", description: "First research paper published", unlocked: false, category: "researcher", rarity: "legendary" },
  { id: "trilingual", emoji: "🗣️", label: "trilingual", description: "Learning Vietnamese, Japanese & Korean", unlocked: true, category: "learner", rarity: "rare", unlockedDate: "ongoing" },
  { id: "bookworm", emoji: "📚", label: "bookworm", description: "Read 20+ books in a year", unlocked: true, category: "learner", rarity: "common", unlockedDate: "2024" },
  { id: "100-problems", emoji: "💡", label: "100 problems", description: "Solved 100+ algo challenges", unlocked: false, category: "learner", rarity: "rare" },
  { id: "tea-log", emoji: "🍵", label: "tea log", description: "31-day consecutive tea streak", unlocked: true, category: "life", rarity: "common", unlockedDate: "2024" },
  { id: "night-owl", emoji: "🦉", label: "night owl", description: "Shipped code past 2am (too many times)", unlocked: true, category: "life", rarity: "common", unlockedDate: "always" },
  { id: "graduation", emoji: "🎓", label: "graduation", description: "Crossed the finish line", unlocked: false, category: "life", rarity: "legendary" },
];

const CATEGORY_FILTERS = ["all", "builder", "researcher", "leader", "learner", "life"] as const;
type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

const RARITY_CONFIG = {
  common: { border: "border-border/60", glow: "" },
  rare: { border: "border-primary/40", glow: "shadow-sm shadow-primary/20" },
  legendary: { border: "border-amber-400/50 dark:border-amber-400/40", glow: "shadow-sm shadow-amber-400/30" },
};

// Planner
type QuestStatus = "active" | "shipped" | "paused" | "upcoming";

interface Quest {
  id: string;
  emoji: string;
  title: string;
  description: string;
  progress: number;
  status: QuestStatus;
  category: string;
  dueHint?: string;
  subTasks?: { label: string; done: boolean }[];
}

const QUESTS: Quest[] = [
  {
    id: "portfolio",
    emoji: "🌐",
    title: "Ship portfolio v3",
    category: "build",
    description: "The site you're looking at - Royale High journal and all.",
    progress: 85,
    status: "active",
    dueHint: "Jun 2025",
    subTasks: [
      { label: "Hero component (8 modes)", done: true },
      { label: "Projects page + tech icons", done: true },
      { label: "Journal feature set", done: false },
      { label: "Deploy + domain", done: false },
    ],
  },
  {
    id: "hci-research",
    emoji: "🔬",
    title: "HCI research paper",
    category: "research",
    description: "Designing interfaces for high-cognitive-load environments.",
    progress: 60,
    status: "active",
    dueHint: "Spring 2025",
    subTasks: [
      { label: "Literature review", done: true },
      { label: "Study design", done: true },
      { label: "Data collection", done: false },
      { label: "Paper draft", done: false },
    ],
  },
  {
    id: "parallel-graph",
    emoji: "⬡",
    title: "Parallel graph processing",
    category: "code",
    description: "BFS, SSSP, connected components - lock-free & concurrent in C++.",
    progress: 70,
    status: "active",
    dueHint: "Course deadline",
    subTasks: [
      { label: "Phase 1: BFS", done: true },
      { label: "Phase 2: SSSP", done: true },
      { label: "Phase 3: lock-free", done: false },
      { label: "Phase 4: concurrent", done: false },
    ],
  },
  {
    id: "citrus-hack-2025",
    emoji: "🍊",
    title: "Citrus Hack 2025",
    category: "lead",
    description: "Directing the spring hackathon - sponsorships, logistics, hacker experience.",
    progress: 100,
    status: "shipped",
    dueHint: "Spring 2025",
  },
  {
    id: "language-viet",
    emoji: "🗣️",
    title: "Vietnamese B1",
    category: "learn",
    description: "Reading and conversational fluency goals.",
    progress: 35,
    status: "active",
    dueHint: "ongoing",
  },
  {
    id: "cutie-hack-2025",
    emoji: "🌸",
    title: "Cutie Hack 2025",
    category: "lead",
    description: "Directing the fall hackathon - planning begins early.",
    progress: 5,
    status: "upcoming",
    dueHint: "Fall 2025",
  },
];

const STATUS_CONFIG: Record<QuestStatus, { label: string; dot: string; badge: string }> = {
  active: { label: "active", dot: "bg-primary animate-pulse", badge: "bg-primary/10 text-primary border-primary/30" },
  shipped: { label: "shipped", dot: "bg-emerald-500", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" },
  paused: { label: "paused", dot: "bg-amber-500", badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30" },
  upcoming: { label: "upcoming", dot: "bg-blue-500", badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
};

const QUEST_FILTERS = ["all", "active", "shipped", "upcoming"] as const;
type QuestFilter = (typeof QUEST_FILTERS)[number];

// Sticker
interface Sticker {
  id: string;
  emoji: string;
  label: string;
  detail: string;
  pack: string;
  color: string;
  size: "sm" | "md" | "lg";
}

const STICKER_PACKS: Record<string, { label: string; description: string }> = {
  "rabbit-holes": { label: "rabbit holes", description: "Things I fall into and can't stop reading about" },
  languages: { label: "languages", description: "Currently learning - slowly but surely" },
  fuel: { label: "daily fuel", description: "What keeps the machine running" },
  aesthetics: { label: "aesthetics", description: "Vibes that live in my head rent-free" },
  tools: { label: "tools i love", description: "The stack that sparks joy" },
};

const STICKERS: Sticker[] = [
  { id: "hci", emoji: "🧠", label: "HCI", detail: "Human-computer interaction", pack: "rabbit-holes", color: "bg-primary/10 text-primary border-primary/30", size: "lg" },
  {
    id: "space",
    emoji: "🌌",
    label: "space systems",
    detail: "Interface design for orbit",
    pack: "rabbit-holes",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    size: "lg",
  },
  {
    id: "cognition",
    emoji: "⚡",
    label: "cognition",
    detail: "How minds process information",
    pack: "rabbit-holes",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    size: "md",
  },
  {
    id: "systems",
    emoji: "⬡",
    label: "systems design",
    detail: "Distributed & concurrent systems",
    pack: "rabbit-holes",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    size: "md",
  },
  {
    id: "design-sys",
    emoji: "◻",
    label: "design systems",
    detail: "Typography, tokens, constraints",
    pack: "rabbit-holes",
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30",
    size: "sm",
  },
  { id: "vietnamese", emoji: "🇻🇳", label: "Vietnamese", detail: "Heritage language - X goal", pack: "languages", color: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30", size: "lg" },
  { id: "japanese", emoji: "🎌", label: "Japanese", detail: "Currently at X level", pack: "languages", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30", size: "md" },
  { id: "korean", emoji: "🇰🇷", label: "Korean", detail: "Beginner - TOPIK goals", pack: "languages", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30", size: "sm" },
  { id: "tea", emoji: "🍵", label: "oolong", detail: "175°F exactly, every time", pack: "fuel", color: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30", size: "lg" },
  { id: "matcha", emoji: "🌿", label: "matcha", detail: "Ceremonial grade or bust", pack: "fuel", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30", size: "md" },
  { id: "music", emoji: "🎵", label: "lo-fi", detail: "The only way to focus", pack: "fuel", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30", size: "sm" },
  { id: "minimal", emoji: "◉", label: "minimal", detail: "Less, but better", pack: "aesthetics", color: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/30", size: "md" },
  {
    id: "cozy",
    emoji: "🪴",
    label: "cozy productivity",
    detail: "Warm + soft + deep focus",
    pack: "aesthetics",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    size: "lg",
  },
  {
    id: "sci-fi",
    emoji: "🔭",
    label: "sci-fi adjacent",
    detail: "Solarpunk, not cyberpunk",
    pack: "aesthetics",
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    size: "sm",
  },
  { id: "figma", emoji: "🎨", label: "Figma", detail: "For everything visual", pack: "tools", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30", size: "md" },
  { id: "nextjs", emoji: "▲", label: "Next.js", detail: "Ships fast, feels great", pack: "tools", color: "bg-foreground/5 text-foreground/70 border-foreground/20", size: "md" },
  { id: "notion", emoji: "□", label: "Notion", detail: "Second brain since 2021", pack: "tools", color: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/30", size: "sm" },
];

const SIZE_CLASSES = {
  sm: "px-2.5 py-1 text-xs",
  md: "px-3.5 py-1.5 text-sm",
  lg: "px-4 py-2 text-sm font-medium",
};

function CoverPage({ liked, likeCount, onLike }: { liked: boolean; likeCount: number; onLike: () => void }) {
  return (
    <div className="h-full flex flex-col p-6 overflow-y-auto gap-4">
      <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">diary planner • pg. 01</p>

      {/* Avatar + name */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-2xl font-bold text-primary">A</div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background" />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight">Allison</h3>
            <p className="text-sm text-muted-foreground font-mono">Computer Engineering • UCR</p>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-[10px] text-muted-foreground tracking-wider">class of 2027</span>
            </div>
          </div>
        </div>
        <button
          onClick={onLike}
          className={cn(
            "flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs transition-all duration-200 active:scale-95 shrink-0",
            liked ? "border-pink-500/40 bg-pink-500/10 text-pink-600 dark:text-pink-400" : "border-border text-muted-foreground hover:border-pink-500/30 hover:text-pink-500",
          )}
        >
          <Heart className={cn("h-3.5 w-3.5 transition-all", liked && "fill-current")} />
          <span>{likeCount}</span>
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {TAGS.map((tag) => (
          <span key={tag.label} className={cn("rounded-full border px-3 py-1 font-mono text-xs", tag.color)}>
            {tag.label}
          </span>
        ))}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map(({ val, label, Icon }) => (
          <div key={label} className="rounded-xl border border-border/60 bg-secondary/40 px-4 py-3 text-center">
            <Icon className="mx-auto mb-1.5 h-4 w-4 text-primary/60" />
            <p className="text-xl font-bold tracking-tight text-foreground">{val}</p>
            <p className="font-mono text-[10px] text-muted-foreground tracking-wide mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Tagline */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 mt-auto">
        <p className="font-mono text-xs text-muted-foreground mb-1">one-liner;</p>
        <p className="text-sm leading-relaxed text-foreground">Building at the intersection of software, cognition, and design - with tea, always.</p>
      </div>
    </div>
  );
}

function QAPage() {
  const [open, setOpen] = useState<string | null>(QA_ITEMS[0].id);
  return (
    <div className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
        <div className="space-y-1">
          <p className="font-mono text-xs tracking-[0.25em] text-primary">write!;</p>
          <h3 className="text-2xl font-bold tracking-tight">Journal Q&amp;A ✎</h3>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
          <Plus className="h-3 w-3" />
          <span>{QA_ITEMS.length} prompts answered</span>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-3 overflow-y-auto flex-1">
        {QA_ITEMS.map((item) => {
          const isOpen = open === item.id;
          return (
            <div key={item.id} className={cn("rounded-xl border border-border/60 bg-card/40 overflow-hidden transition-all duration-300", isOpen && "border-primary/20 bg-primary/[0.02]")}>
              <button className="w-full px-5 py-4 flex items-start justify-between gap-4 text-left group" onClick={() => setOpen(isOpen ? null : item.id)}>
                <div className="flex items-start gap-3 min-w-0">
                  <span className="font-mono text-xs text-primary mt-0.5 shrink-0">→</span>
                  <span className={cn("font-mono text-sm transition-colors", isOpen ? "text-foreground" : "text-muted-foreground group-hover:text-foreground")}>{item.prompt}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {item.tag && <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[10px] hidden sm:inline-flex", item.tagColor)}>{item.tag}</span>}
                  {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-4 pt-0 border-t border-border/40">
                  <p className="text-sm leading-relaxed text-foreground/80 pl-5 pt-3">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BadgesPage() {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [tooltip, setTooltip] = useState<{ badge: Badge; x: number; y: number } | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const filtered = filter === "all" ? BADGES : BADGES.filter((b) => b.category === filter);
  const unlockedCount = BADGES.filter((b) => b.unlocked).length;

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, badge: Badge) => {
    if (!badge.unlocked || !pageRef.current) return;
    const pageRect = pageRef.current.getBoundingClientRect();
    const badgeRect = e.currentTarget.getBoundingClientRect();
    // Position relative to the page container
    let x = badgeRect.left - pageRect.left + badgeRect.width / 2;
    const y = badgeRect.top - pageRect.top;
    // Clamp x so tooltip (176px wide) never overflows left or right
    x = Math.max(88, Math.min(x, pageRect.width - 88));
    setTooltip({ badge, x, y });
  };

  return (
    <div ref={pageRef} className="h-full flex flex-col p-6 relative">
      {/* Floating tooltip - rendered at page level, never clipped by grid */}
      {tooltip && (
        <div className="absolute z-30 w-44 rounded-lg border border-border bg-popover px-3 py-2 shadow-md pointer-events-none" style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, calc(-100% - 8px))" }}>
          <p className="font-mono text-[10px] text-primary mb-1">{tooltip.badge.label}</p>
          <p className="text-xs text-muted-foreground leading-snug">{tooltip.badge.description}</p>
          {tooltip.badge.unlockedDate && <p className="font-mono text-[9px] text-muted-foreground/60 mt-1.5">unlocked: {tooltip.badge.unlockedDate}</p>}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
        <div className="space-y-1">
          <p className="font-mono text-xs tracking-[0.25em] text-primary">achievements;</p>
          <h3 className="text-2xl font-bold tracking-tight">Badge Collection ✦</h3>
          <p>Earned milestones, locked goals - hover to read the story behind each one.</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xl font-bold text-foreground">
            {unlockedCount}
            <span className="text-muted-foreground text-sm">/{BADGES.length}</span>
          </p>
          <p className="font-mono text-[10px] text-muted-foreground tracking-wider">collected</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORY_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-mono text-xs tracking-wider transition-all duration-200 active:scale-[0.98]",
              filter === f ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 overflow-y-auto flex-1 content-start">
        {filtered.map((badge) => (
          <div
            key={badge.id}
            className={cn(
              "relative flex flex-col items-center gap-2 rounded-xl border p-3.5 transition-all duration-300 cursor-default",
              badge.unlocked ? cn("bg-card/50", RARITY_CONFIG[badge.rarity].border, RARITY_CONFIG[badge.rarity].glow, "hover:bg-card hover:-translate-y-0.5") : "border-border/30 bg-secondary/20 opacity-40 grayscale",
            )}
            onMouseEnter={(e) => handleMouseEnter(e, badge)}
            onMouseLeave={() => setTooltip(null)}
          >
            {badge.unlocked && badge.rarity !== "common" && (
              <div
                className={cn(
                  "absolute -top-1.5 -right-1.5 rounded-full px-1.5 py-0.5 font-mono text-[8px] border",
                  badge.rarity === "legendary" ? "bg-amber-400/15 text-amber-600 dark:text-amber-400 border-amber-400/40" : "bg-primary/10 text-primary border-primary/30",
                )}
              >
                {badge.rarity === "legendary" ? "✦" : "★"}
              </div>
            )}
            <span className="text-2xl leading-none">{badge.emoji}</span>
            <span className="font-mono text-[10px] text-center text-muted-foreground leading-tight">{badge.label}</span>
            {!badge.unlocked && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl">
                <span className="font-mono text-[9px] text-muted-foreground/60">locked</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-border/30">
        <p className="font-mono text-[10px] text-muted-foreground/50 tracking-wider">rarity:</p>
        {(["common", "rare", "legendary"] as const).map((r) => (
          <div key={r} className="flex items-center gap-1.5">
            <div className={cn("w-3 h-3 rounded border", RARITY_CONFIG[r].border)} />
            <span className="font-mono text-[10px] text-muted-foreground">{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlannerPage() {
  const [filter, setFilter] = useState<QuestFilter>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const filtered = filter === "all" ? QUESTS : QUESTS.filter((q) => q.status === filter);
  const activeCount = QUESTS.filter((q) => q.status === "active").length;

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
        <div className="space-y-1">
          <p className="font-mono text-xs tracking-[0.25em] text-primary">planner;</p>
          <h3 className="text-2xl font-bold tracking-tight">Active Quests ◎</h3>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
          <Zap className="h-3.5 w-3.5 text-primary" />
          <span className="font-mono text-xs text-primary">{activeCount} active quests</span>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {QUEST_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-mono text-xs tracking-wider transition-all duration-200 active:scale-[0.98]",
              filter === f ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Quest cards */}
      <div className="space-y-3 overflow-y-auto flex-1">
        {filtered.map((quest) => {
          const cfg = STATUS_CONFIG[quest.status];
          const isExpanded = expanded === quest.id;
          const doneTasks = quest.subTasks?.filter((t) => t.done).length ?? 0;
          const totalTasks = quest.subTasks?.length ?? 0;
          return (
            <div
              key={quest.id}
              className={cn("rounded-xl border bg-card/40 overflow-hidden transition-all duration-300", quest.status === "shipped" ? "border-emerald-500/20 bg-emerald-500/[0.02]" : "border-border/60 hover:border-primary/20 hover:bg-card/70")}
            >
              <div className="p-5 cursor-pointer" onClick={() => quest.subTasks && setExpanded(isExpanded ? null : quest.id)}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-xl leading-none mt-0.5">{quest.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className={cn("font-semibold tracking-tight", quest.status === "shipped" && "line-through text-muted-foreground")}>{quest.title}</h4>
                      <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[10px]", cfg.badge)}>
                        <span className={cn("inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle", cfg.dot)} />
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{quest.description}</p>
                  </div>
                  {quest.dueHint && (
                    <div className="flex items-center gap-1 shrink-0">
                      <Clock className="h-3 w-3 text-muted-foreground/50" />
                      <span className="font-mono text-[10px] text-muted-foreground/60">{quest.dueHint}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-secondary/60 overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-700", quest.status === "shipped" ? "bg-emerald-500" : "bg-primary")} style={{ width: `${quest.progress}%` }} />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground shrink-0 w-7 text-right">{quest.progress}%</span>
                </div>
              </div>

              {quest.subTasks && isExpanded && (
                <div className="px-5 pb-4 border-t border-border/30">
                  <div className="pt-3 space-y-2">
                    {quest.subTasks.map((task) => (
                      <div key={task.label} className="flex items-center gap-2.5">
                        {task.done ? <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> : <Circle className="h-4 w-4 text-border flex-shrink-0" />}
                        <span className={cn("text-xs", task.done ? "line-through text-muted-foreground" : "text-foreground/80")}>{task.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {quest.subTasks && (
                <div className="px-5 pb-3 flex justify-end">
                  <button onClick={() => setExpanded(isExpanded ? null : quest.id)} className="font-mono text-[10px] text-muted-foreground/50 hover:text-primary transition-colors">
                    {isExpanded ? "collapse ↑" : `${doneTasks}/${totalTasks} subtasks →`}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StickersPage() {
  const [activePack, setActivePack] = useState("all");
  const [hoveredSticker, setHoveredSticker] = useState<string | null>(null);
  const filtered = activePack === "all" ? STICKERS : STICKERS.filter((s) => s.pack === activePack);

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header - matches JournalStickers */}
      <div className="space-y-1 mb-6">
        <p className="font-mono text-xs tracking-[0.25em] text-primary">sticker packs!;</p>
        <h3 className="text-2xl font-bold tracking-tight">Interests ✿</h3>
        <p className="text-sm text-muted-foreground">Everything I'm into - hover for details.</p>
      </div>

      {/* Pack selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActivePack("all")}
          className={cn(
            "rounded-full border px-3.5 py-1.5 font-mono text-xs tracking-wider transition-all duration-200 active:scale-[0.98]",
            activePack === "all" ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
          )}
        >
          all packs ✦
        </button>
        {Object.entries(STICKER_PACKS).map(([key, pack]) => (
          <button
            key={key}
            onClick={() => setActivePack(key)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-mono text-xs tracking-wider transition-all duration-200 active:scale-[0.98]",
              activePack === key ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {pack.label}
          </button>
        ))}
      </div>

      {/* Pack description */}
      {activePack !== "all" && (
        <div className="mb-4 rounded-xl border border-border/40 bg-secondary/30 px-4 py-3">
          <p className="text-sm text-muted-foreground italic">{STICKER_PACKS[activePack]?.description}</p>
        </div>
      )}

      {/* Sticker cloud */}
      <div className="flex flex-wrap gap-3 overflow-y-auto flex-1 content-start">
        {filtered.map((sticker) => (
          <div key={sticker.id} className="relative" onMouseEnter={() => setHoveredSticker(sticker.id)} onMouseLeave={() => setHoveredSticker(null)}>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border font-mono transition-all duration-200 cursor-default select-none",
                SIZE_CLASSES[sticker.size],
                sticker.color,
                hoveredSticker === sticker.id && "scale-105 -translate-y-0.5",
              )}
            >
              <span>{sticker.emoji}</span>
              <span>{sticker.label}</span>
            </span>
            {hoveredSticker === sticker.id && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 w-44 rounded-lg border border-border bg-popover px-3 py-2 shadow-md pointer-events-none">
                <p className="text-xs text-muted-foreground leading-snug">{sticker.detail}</p>
                <p className="font-mono text-[9px] text-muted-foreground/50 mt-1">{STICKER_PACKS[sticker.pack]?.label}</p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Spread
const SPREADS: { id: SpreadId; label: string; icon: React.ElementType }[] = [
  { id: "cover", label: "cover", icon: BookOpen },
  { id: "qa", label: "write!", icon: Sparkles },
  { id: "badges", label: "badges", icon: Star },
  { id: "planner", label: "planner", icon: CheckCircle2 },
  { id: "stickers", label: "stickers", icon: Heart },
];

export function Journal() {
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleLike = () => {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  const renderPage = (id: SpreadId) => {
    switch (id) {
      case "cover":
        return <CoverPage liked={liked} likeCount={likeCount} onLike={handleLike} />;
      case "qa":
        return <QAPage />;
      case "badges":
        return <BadgesPage />;
      case "planner":
        return <PlannerPage />;
      case "stickers":
        return <StickersPage />;
    }
  };

  const spread = SPREADS[current];

  return (
    <section ref={ref} className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-10 sm:mb-14 space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">diary planner;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Journal ✦˚｡</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">Royale High-inspired diary / journal - flip through to explore each section</p>
        </div>

        <div className={cn("opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "150ms" }}>
          <div className="mx-auto max-w-2xl lg:max-w-3xl">
            {/* Tab row */}
            <div className="flex gap-1 pl-10">
              {SPREADS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 h-8 rounded-t-lg border border-b-0 transition-all duration-200 font-mono text-xs",
                      i === current ? "bg-card border-border/60 text-primary z-10" : "bg-secondary/40 border-border/30 text-muted-foreground hover:text-primary hover:bg-secondary/70",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Book body */}
            <div className="flex rounded-r-xl rounded-l-sm border border-border/60 overflow-hidden bg-card" style={{ minHeight: 580 }}>
              {/* Spine */}
              <div className="w-10 shrink-0 bg-primary/85 flex flex-col items-center justify-center gap-4">
                {SPREADS.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrent(i)}
                    aria-label={s.label}
                    className={cn(
                      "w-4 h-4 rounded-full border-2 transition-all duration-200",
                      i === current ? "border-primary-foreground bg-primary-foreground scale-110" : "border-primary-foreground/40 bg-primary-foreground/10 hover:bg-primary-foreground/30",
                    )}
                  />
                ))}
              </div>

              {/* Page content */}
              <div className="flex-1 min-w-0 overflow-hidden">{renderPage(spread.id)}</div>
            </div>

            {/* Bottom edge */}
            <div className="h-2 ml-10 bg-secondary/60 rounded-b-lg border border-border/30 border-t-0" />

            {/* Controls */}
            <div className="flex items-center gap-4 mt-5 justify-center">
              <button
                onClick={() => setCurrent((p) => Math.max(0, p - 1))}
                disabled={current === 0}
                className="flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2 font-mono text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> prev
              </button>

              <div className="flex gap-2 items-center">
                {SPREADS.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={cn("rounded-full transition-all duration-200", i === current ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-primary/40")} />
                ))}
              </div>

              <button
                onClick={() => setCurrent((p) => Math.min(SPREADS.length - 1, p + 1))}
                disabled={current === SPREADS.length - 1}
                className="flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2 font-mono text-xs text-muted-foreground transition-all hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                next <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="mt-3 text-center font-mono text-[10px] text-muted-foreground/40 tracking-widest">
              pg. 0{current + 1} - {spread.label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
