"use client";
import { Clock, Image as ImageIcon, MessageSquare, Smile, Terminal } from "lucide-react";
import { cn } from "@/src/lib/core-features/utils";
import { useEffect, useRef, useState } from "react";

const roles = ["human cognition", "interface systems", "user interactions", "space interfaces", "cohesive actions"];

type Mode = "buddy" | "chat" | "clock" | "photos" | "terminal";
const MODES: {
  id: Mode;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}[] = [
  { id: "clock", icon: Clock, label: "time" },
  { id: "buddy", icon: Smile, label: "buddy" },
  { id: "chat", icon: MessageSquare, label: "q&a" },
  { id: "photos", icon: ImageIcon, label: "photos" },
  { id: "terminal", icon: Terminal, label: "terminal" },
];

// Study buddy
type Mood = "focused" | "tired" | "happy" | "curious" | "hungry";
const MOODS: Record<Mood, { emoji: string; label: string; message: string; bg: string; dot: string }> = {
  focused: {
    emoji: "🌿",
    label: "focused",
    message: "in the zone",
    bg: "bg-green-500/10 border-green-500/25",
    dot: "bg-green-500",
  },
  tired: {
    emoji: "🌙",
    label: "tired",
    message: "five more minutes…",
    bg: "bg-blue-400/10 border-blue-400/25",
    dot: "bg-blue-400 animate-pulse",
  },
  happy: {
    emoji: "🌸",
    label: "happy",
    message: "everything is soft and good today",
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
    message: "tea break (non-negotiable)",
    bg: "bg-amber-400/10 border-amber-400/25",
    dot: "bg-amber-400",
  },
};

const MOOD_ORDER: Mood[] = ["focused", "tired", "happy", "curious", "hungry"];

function getMoodFromTime(): Mood {
  const h = new Date().getHours();
  if (h >= 6 && h < 10) return "tired";
  if (h >= 10 && h < 13) return "focused";
  if (h >= 13 && h < 15) return "hungry";
  if (h >= 15 && h < 19) return "curious";
  if (h >= 19 && h < 22) return "happy";
  return "tired";
}
function StudyBuddy() {
  const [mood, setMood] = useState<Mood>(getMoodFromTime);
  const [blink, setBlink] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  useEffect(() => {
    const schedule = (): ReturnType<typeof setTimeout> =>
      setTimeout(
        () => {
          setBlink(true);
          setTimeout(() => setBlink(false), 150);
          schedule();
        },
        3000 + Math.random() * 4000,
      );
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
    <div className={cn("flex flex-col items-center gap-4 rounded-xl border p-5 transition-all duration-500 h-full justify-center", cfg.bg)}>
      <button
        onClick={handleClick}
        aria-label="Click to change mood"
        className={cn(
          "relative flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-current/20 bg-background/60 transition-transform duration-200 hover:scale-105 active:scale-95 select-none",
          wiggle && "animate-[wiggle_0.4s_ease-in-out]",
        )}
      >
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex gap-2 items-center">
            <div className={cn("w-1.5 rounded-full bg-foreground transition-all duration-100", blink ? "h-0.5" : "h-1.5")} />
            <div className={cn("w-1.5 rounded-full bg-foreground transition-all duration-100", blink ? "h-0.5" : "h-1.5")} />
          </div>
          <div
            className={cn(
              "mt-1 rounded-full border-b-2 border-foreground",
              mood === "happy" && "w-4 h-2 border-b-2 rounded-b-full rounded-t-none border-t-0",
              mood === "tired" && "w-3 h-1",
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
        <p className="text-sm text-foreground/80 italic leading-snug">"{cfg.message}"</p>
      </div>
      <div className="flex gap-1.5 flex-wrap justify-center">
        {MOOD_ORDER.map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={cn(
              "rounded-full border px-2.5 py-0.5 font-mono text-[9px] tracking-wider transition-all duration-200",
              mood === m ? "border-foreground/40 bg-foreground/10 text-foreground" : "border-border/40 text-muted-foreground hover:border-foreground/30",
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

// Chat Q&A
const QUICK_QS = [
  {
    q: "What's your focus?",
    a: "Designing systems at the intersection of cognition and technology. This primarily gears towards interfaces that work with how people think, not against it.",
  },
  {
    q: "What are you building?",
    a: "A personal website that's both a portfolio and adigital brain. Also currently building a deep in parallel graph processing system.",
  },
  {
    q: "What excites you most?",
    a: "HCI research for space systems. Designing under extreme constraints where interfaces genuinely matter.",
  },
  {
    q: "What's your design approach?",
    a: "Start with how people think, then work backwards to the interface. Cognitive load is the main mission.",
  },
  {
    q: "What do you do for fun?",
    a: "Reading, tea logging, and whatever rabbit hole I fell into this week.",
  },
  {
    q: "Where are you based?",
    a: "West Coast! I'm currently studying Computer Engineering at UC Riverside.",
  },
];

function ChatQA() {
  const [history, setHistory] = useState<{ q: string; a: string; done: boolean }[]>([]);
  const [asked, setAsked] = useState<Set<number>>(new Set());
  const [typing, setTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [pendingA, setPendingA] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [history, typedText]);

  const ask = (i: number) => {
    if (asked.has(i) || typing) return;
    setAsked((prev) => new Set([...prev, i]));
    setTyping(true);
    setTypedText("");
    setPendingA(QUICK_QS[i].a);
    setHistory((prev) => [...prev, { q: QUICK_QS[i].q, a: "", done: false }]);
  };

  useEffect(() => {
    if (!typing || !pendingA) return;
    if (typedText.length < pendingA.length) {
      const t = setTimeout(() => setTypedText(pendingA.slice(0, typedText.length + 2)), 16);
      return () => clearTimeout(t);
    } else {
      setHistory((prev) => prev.map((h, i) => (i === prev.length - 1 ? { ...h, a: pendingA, done: true } : h)));
      setTypedText("");
      setPendingA("");
      setTyping(false);
    }
  }, [typing, typedText, pendingA]);

  const remaining = QUICK_QS.map((q, i) => ({ ...q, i })).filter(({ i }) => !asked.has(i));

  return (
    <div className="flex flex-col h-full gap-0" style={{ minHeight: 0 }}>
      {/* Chat area */}
      <div ref={listRef} className="flex-1 overflow-y-auto space-y-3 pr-0.5" style={{ minHeight: 0 }}>
        {/* Intro bubble */}
        <div className="flex items-end gap-2">
          {/* Avatar */}
          <div className="h-7 w-7 shrink-0 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center font-mono text-[10px] text-primary">ap</div>
          {/* Thought bubble */}
          <div className="relative max-w-[80%]">
            <div className="rounded-2xl rounded-bl-sm border border-border/50 bg-card/60 px-3.5 py-2.5 text-xs leading-relaxed text-muted-foreground">
              <span className="block font-mono text-[10px] text-primary mb-0.5">Hi, it's me!</span>
              Feel free to ask me a question below ↓
            </div>
            {/* Thought dots */}
            <div className="absolute -bottom-3 left-2 flex gap-0.5 items-end">
              <span className="h-1.5 w-1.5 rounded-full border border-border/50 bg-card/60" />
              <span className="h-1 w-1 rounded-full border border-border/50 bg-card/60" />
            </div>
          </div>
        </div>

        {history.map((item, i) => (
          <div key={i} className="space-y-2">
            {/* User question */}
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary/15 border border-primary/20 px-3.5 py-2.5 font-mono text-xs text-foreground">{item.q}</div>
            </div>
            {/* Assistant answer */}
            <div className="flex items-end gap-2">
              <div className="h-7 w-7 shrink-0 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center font-mono text-[10px] text-primary">ap</div>
              <div className="max-w-[80%] rounded-2xl rounded-bl-sm border border-border/50 bg-card/60 px-3.5 py-2.5 text-xs leading-relaxed text-muted-foreground">
                {i === history.length - 1 && typing ? (
                  <>
                    {typedText}
                    <span className="animate-pulse text-primary">▋</span>
                  </>
                ) : (
                  item.a
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Question chips */}
      <div className="shrink-0 border-t border-border/30 pt-2 mt-2">
        {remaining.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {remaining.map(({ q, i }) => (
              <button
                key={i}
                onClick={() => ask(i)}
                disabled={typing}
                className="rounded-full border border-border/60 bg-card/40 px-2.5 py-1 font-mono text-[9px] text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary disabled:opacity-40"
              >
                {q}
              </button>
            ))}
          </div>
        ) : (
          <p className="font-mono text-[9px] text-muted-foreground/50 text-center">you've asked everything ✦</p>
        )}
      </div>
    </div>
  );
}

// Clock
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const hour = time.getHours();
  const timeOfDay = hour < 6 ? "late night" : hour < 12 ? "morning" : hour < 17 ? "afternoon" : hour < 21 ? "evening" : "night";
  const activity: Record<string, string> = {
    "late night": "debugging or reading",
    morning: "coffee + systems work",
    afternoon: "designing or in class",
    evening: "building or tea",
    night: "reading or winding down",
  };
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <div className="text-center">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-3">allison's local time</p>
        <p className="font-mono text-6xl font-bold tracking-tight text-primary tabular-nums">
          {time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })}
        </p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          {time.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="rounded-lg border border-border/50 bg-card/40 px-5 py-3 text-center">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground mb-1">probably doing</p>
        <p className="font-mono text-sm text-foreground">{activity[timeOfDay]}</p>
        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{timeOfDay} on the west coast</p>
      </div>
    </div>
  );
}

// Photo cards
const PHOTO_CARDS = [
  {
    src: "",
    caption: "hackathon director",
    sub: "running citrus hack + cutie hack",
    emoji: "🍊",
    tw: "from-orange-500/15 to-primary/8",
  },
  {
    src: "",
    caption: "hci researcher",
    sub: "studying interfaces for space",
    emoji: "🔭",
    tw: "from-primary/15 to-blue-500/8",
  },
  {
    src: "",
    caption: "notion campus lead",
    sub: "community + events through campus & more",
    emoji: "📓",
    tw: "from-neutral-400/15 to-primary/8",
  },
  {
    src: "",
    caption: "tea enthusiast",
    sub: "logging every cup",
    emoji: "🍵",
    tw: "from-green-500/15 to-amber-500/8",
  },
  {
    src: "",
    caption: "hobby enthusiast",
    sub: "exploring different hobbies",
    emoji: "🤹",
    tw: "from-pink-400/15 to-primary/8",
  },
];

function PhotoCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsets, setOffsets] = useState(() =>
    PHOTO_CARDS.map((_, i) => ({
      x: (i - 2) * 15,
      y: (i % 2 === 0 ? -1 : 1) * 9,
      rot: (i - 2) * 4.5,
      z: PHOTO_CARDS.length - i,
    })),
  );
  const drag = useRef<{
    idx: number;
    startX: number;
    startY: number;
    ox: number;
    oy: number;
  } | null>(null);

  const bringToFront = (idx: number) =>
    setOffsets((prev) =>
      prev.map((o, i) => ({
        ...o,
        z: i === idx ? PHOTO_CARDS.length : Math.max(0, o.z - 1),
      })),
    );

  const onPointerDown = (e: React.PointerEvent, idx: number) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    bringToFront(idx);
    drag.current = {
      idx,
      startX: e.clientX,
      startY: e.clientY,
      ox: offsets[idx].x,
      oy: offsets[idx].y,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const { idx, startX, startY, ox, oy } = drag.current;
    setOffsets((prev) => prev.map((o, i) => (i === idx ? { ...o, x: ox + e.clientX - startX, y: oy + e.clientY - startY } : o)));
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  return (
    <div className="flex flex-col h-full gap-2">
      <p className="font-mono text-[10px] tracking-widest text-muted-foreground shrink-0">drag the cards ↓</p>
      <div ref={containerRef} className="relative flex-1" onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
        {PHOTO_CARDS.map((card, i) => (
          <div
            key={i}
            className={cn("absolute left-1/2 top-1/2 w-36 rounded-xl border border-border/60 bg-linear-to-br select-none touch-none", card.tw)}
            style={{
              transform: `translate(calc(-50% + ${offsets[i].x}px), calc(-50% + ${offsets[i].y}px)) rotate(${offsets[i].rot}deg)`,
              zIndex: offsets[i].z,
              cursor: drag.current?.idx === i ? "grabbing" : "grab",
            }}
            onPointerDown={(e) => onPointerDown(e, i)}
          >
            <div className="h-24 w-full overflow-hidden rounded-t-xl bg-secondary/40 flex items-center justify-center border-b border-border/30">
              {card.src ? <img src={card.src} alt={card.caption} className="h-full w-full object-cover pointer-events-none" /> : <span className="text-3xl pointer-events-none">{card.emoji}</span>}
            </div>
            <div className="p-2.5 space-y-0.5">
              <p className="font-mono text-[10px] font-semibold leading-tight text-foreground">{card.caption}</p>
              <p className="font-mono text-[9px] leading-tight text-muted-foreground">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Terminal
const COMMANDS: Record<string, string> = {
  help: "available: about • focus • stack • links • clear",
  about: "allison pham - computer engineering @ ucr. hci researcher. acm president. citrus & cutie hack director. notion campus leader. etc.",
  focus: "currently → hci for space systems, parallel graph processing, & more",
  stack: "computer science, electrical engineering, product (design & management)",
  links: "github: allison-pham | linkedin: imallisonpham",
  clear: "__CLEAR__",
};
function MiniTerminal() {
  const [history, setHistory] = useState<string[]>(["> type 'help' to start"]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [history]);
  const run = (cmd: string) => {
    const key = cmd.trim().toLowerCase();
    const result = COMMANDS[key] ?? `not found: '${key}'. type 'help'.`;
    if (result === "__CLEAR__") {
      setHistory(["> type 'help' to start"]);
      return;
    }
    setHistory((p) => [...p, `> ${cmd}`, result]);
  };
  return (
    <div className="flex flex-col h-full" style={{ minHeight: 0 }}>
      <div ref={listRef} className="flex-1 overflow-y-auto space-y-1 font-mono text-[11px]" style={{ minHeight: 0 }}>
        {history.map((line, i) => (
          <p key={i} className={cn("leading-relaxed break-all", line.startsWith(">") ? "text-primary" : "text-muted-foreground")}>
            {line}
          </p>
        ))}
      </div>
      <div className="shrink-0 flex items-center gap-2 border-t border-border/40 pt-2 mt-2">
        <span className="font-mono text-[11px] text-primary">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim()) {
              run(input.trim());
              setInput("");
            }
          }}
          className="flex-1 bg-transparent font-mono text-[11px] text-foreground outline-none placeholder:text-muted-foreground/40"
          placeholder="type a command..."
        />
      </div>
    </div>
  );
}

// Hero
export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mode, setMode] = useState<Mode>("buddy");

  useEffect(() => {
    const target = roles[currentRole];
    const t = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < target.length) setDisplayText(target.slice(0, displayText.length + 1));
          else setTimeout(() => setIsDeleting(true), 2000);
        } else {
          if (displayText.length > 0) setDisplayText(displayText.slice(0, -1));
          else {
            setIsDeleting(false);
            setCurrentRole((p) => (p + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );
    return () => clearTimeout(t);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section className="relative px-4 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center lg:min-h-[70vh]">
          {/* Left */}
          <div className="space-y-8 sm:space-y-10">
            <div className="space-y-3 animate-fade-in-up">
              <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">Allison Pham</p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl text-balance">
                Design engineering
                <br />
                <span className="bg-linear-to-l from-primary/50 to-accent text-transparent bg-clip-text typing-cursor">{displayText}</span>
              </h1>
            </div>

            <p className="m-0 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
              <span className="font-bold italic underline decoration-wavy">Human-centered</span> systems for <span className="italic">cognition & productivity</span>
            </p>

            <p className="m-0 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
              ✦ Campus Leader @{" "}
              <a href="https://notion.so" target="_blank" rel="noopener noreferrer" className="underline decoration-wavy decoration-current/45 underline-offset-3 transition-colors hover:decoration-current/80">
                Notion
              </a>
            </p>

            <p className="m-0 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
              ✦ Director @{" "}
              <a href="https://www.citrushack.com" target="_blank" rel="noopener noreferrer" className="underline decoration-wavy decoration-current/45 underline-offset-3 transition-colors hover:decoration-current/80">
                Citrus Hack
              </a>{" "}
              +{" "}
              <a href="https://www.cutiehack.com" target="_blank" rel="noopener noreferrer" className="underline decoration-wavy decoration-current/45 underline-offset-3 transition-colors hover:decoration-current/80">
                Cutie Hack
              </a>
            </p>

            {/* <p className="m-0 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
              ✦ Campus Leader @ Notion & Leading ACM + Hackathons
            </p> */}

            {/* <p className="m-0 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">
              ✦ Campus Leader @{" "}
              <a
                href="https://notion.so"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-wavy decoration-current/45 underline-offset-3 transition-colors hover:decoration-current/80"
              >
                Notion
              </a>{" "}

              & Leading{" "}
              <a
                href="https://acm.cs.ucr.edu"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-wavy decoration-current/45 underline-offset-3 transition-colors hover:decoration-current/80"
              >
                ACM
              </a>{" "}
              
              + {" "}
              <a
                href="https://www.citrushack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-wavy decoration-current/45 underline-offset-3 transition-colors hover:decoration-current/80"
              >
                Hackathons
              </a>
            </p> */}

            <p className="m-0 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">✦ Researching HCI in space</p>

            <p className="m-0 max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">✦ Computer Engineering @ UC Riverside</p>

            <p className="max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground">✦ CS • EE • Design • PM</p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
              <a
                href="/projects"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg border border-primary bg-primary/10 px-7 py-4 sm:py-3.5 font-mono text-sm text-primary transition-all duration-500 hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
              >
                <span className="relative z-10">explore builds</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 group-hover:translate-x-0" />
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="relative animate-scale-in stagger-4">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all duration-200 active:scale-[0.97]",
                    mode === m.id ? "border-primary bg-primary/15 text-primary" : "border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  <m.icon className="h-3 w-3" />
                  {m.label}
                </button>
              ))}
            </div>

            {/* Fixed height */}
            <div className="relative rounded-xl border border-border bg-card/60 glass hover-lift" style={{ height: "400px" }}>
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-primary/50" />
              </div>
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 rounded-md bg-background/50 px-3 py-1 font-mono text-[10px] text-muted-foreground">terminal://{mode}</div>
              {/* Inner content area */}
              <div className="absolute inset-0 top-10 px-5 pb-5 overflow-hidden flex flex-col">
                {mode === "clock" && <LiveClock />}
                {mode === "buddy" && <StudyBuddy />}
                {mode === "chat" && <ChatQA />}
                {mode === "photos" && <PhotoCards />}
                {mode === "terminal" && <MiniTerminal />}
              </div>
            </div>

            <div className="absolute -right-2 sm:-right-6 -top-2 sm:-top-6 rounded-lg border border-primary/40 bg-primary/15 glass px-3 sm:px-4 py-1.5 font-mono text-[11px] sm:text-xs text-primary animate-float">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                mission in progress (v8.0)
              </span>
            </div>
            <div className="absolute -bottom-3 sm:-bottom-6 -left-2 sm:-left-6 rounded-lg border border-border bg-card glass px-3 sm:px-4 py-1.5 font-mono text-[11px] sm:text-xs text-muted-foreground animate-float" style={{ animationDelay: "1s" }}>
              curiositea
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-primary/5 blur-3xl" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-fade-in stagger-6">
        <span className="font-mono text-xs text-muted-foreground">see more</span>
        <div className="w-px h-12 bg-linear-to-b from-primary/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
