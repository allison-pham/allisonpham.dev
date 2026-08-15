"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/src/lib/core-features/utils";

type OrbMood = "idle" | "happy" | "sleepy" | "focused" | "thinking";
type OrbOutfit = "scarf" | "crown" | "teacup" | "glasses" | "nightcap";

// Mood → outfit mapping

const MOOD_OUTFIT: Record<OrbMood, OrbOutfit> = {
  idle: "scarf",
  happy: "crown",
  sleepy: "nightcap",
  focused: "glasses",
  thinking: "teacup",
};

// Quips
const QUIPS: Record<OrbMood, string[]> = {
  idle: ["hi ✦", "still here ~", "just floating...", "peek ◉", "hello ˚｡", "boo! ...hi"],
  happy: ["yay! ✿", "love this energy", "we're thriving ~", "so good ✦", "( ˶ˆᗜˆ˵ )"],
  sleepy: ["zz...", "sleepy hours...", "zzz ˚｡", "it's late...", "*yawn*", "5 more mins..."],
  focused: ["in the zone", "big brain time", "◉ focus mode", "deep work ✦", "concentrating..."],
  thinking: ["tea time 🍵", "love the journal", "cozy vibes ✿", "sticker time!", "so cute in here"],
};

// Section detection
const SECTION_MOODS: { keywords: string[]; mood: OrbMood }[] = [
  {
    keywords: ["journal", "diary", "collections", "tea", "sticker", "badge", "bookshelf", "bookmarks", "reading", "favorite", "language", "streak", "photo"],
    mood: "thinking",
  },
  { keywords: ["projects", "project"], mood: "focused" },
  { keywords: ["hci", "space", "research", "origin", "parallel"], mood: "focused" },
  { keywords: ["hero", "about", "home"], mood: "happy" },
];

function getMoodFromScroll(): OrbMood {
  const sections = document.querySelectorAll("section, [data-section]");
  const center = window.innerHeight / 2;
  let closest: Element | null = null;
  let closestDist = Infinity;
  sections.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const dist = Math.abs(rect.top + rect.height / 2 - center);
    if (dist < closestDist) {
      closestDist = dist;
      closest = el;
    }
  });
  if (!closest) return "idle";
  const id = (closest as Element).id?.toLowerCase() ?? "";
  const cls = Array.from((closest as Element).classList)
    .join(" ")
    .toLowerCase();
  for (const { keywords, mood } of SECTION_MOODS) {
    if (keywords.some((k) => id.includes(k) || cls.includes(k))) return mood;
  }
  return "idle";
}

function getTimeBasedMood(): OrbMood | null {
  const h = new Date().getHours();
  if (h >= 23 || h < 5) return "sleepy";
  return null;
}

// Outfit accessories
function Scarf() {
  // cozy little scarf draped around the bottom
  return (
    <g>
      <path d="M14 54 Q40 64 66 54 Q66 60 60 62 Q40 70 20 62 Q14 60 14 54Z" fill="#7F77DD" opacity="0.9" />
      <path d="M14 54 Q40 60 66 54 Q66 57 40 60 Q14 57 14 54Z" fill="#AFA9EC" opacity="0.7" />
      {/* scarf tail hanging down left */}
      <path d="M20 62 Q16 68 18 76 Q20 72 24 74 Q22 68 24 62Z" fill="#7F77DD" opacity="0.85" />
      {/* little stripe detail */}
      <path d="M18 56 Q40 61 62 56" stroke="#CECBF6" strokeWidth="1" fill="none" opacity="0.6" />
    </g>
  );
}

function Crown() {
  return (
    <g>
      {/* crown base band */}
      <rect x="22" y="10" width="36" height="8" rx="2" fill="#EF9F27" opacity="0.95" />
      {/* three crown points */}
      <polygon points="22,10 27,0 32,10" fill="#EF9F27" opacity="0.95" />
      <polygon points="37,10 40,1 43,10" fill="#EF9F27" opacity="0.95" />
      <polygon points="48,10 53,0 58,10" fill="#EF9F27" opacity="0.95" />
      {/* gem on center point */}
      <circle cx="40" cy="4" r="2.5" fill="#ED93B1" />
      {/* gems on side points */}
      <circle cx="27" cy="5" r="1.8" fill="#AFA9EC" />
      <circle cx="53" cy="5" r="1.8" fill="#AFA9EC" />
      {/* band shine */}
      <path d="M24 13 Q40 11 56 13" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
    </g>
  );
}

function Nightcap() {
  return (
    <g>
      {/* cap body - tall floppy cone leaning right */}
      <path d="M28 14 Q38 2 48 18 Q44 8 40 12 Q36 4 28 14Z" fill="#AFA9EC" opacity="0.9" />
      <path d="M20 20 Q28 14 48 18 Q44 24 20 20Z" fill="#CECBF6" opacity="0.95" />
      {/* floppy tip drooping right */}
      <path d="M48 18 Q58 22 56 30 Q52 24 48 18Z" fill="#AFA9EC" opacity="0.8" />
      {/* pompom at tip */}
      <circle cx="56" cy="30" r="4" fill="white" opacity="0.9" />
      {/* band stripe -->  */}
      <path d="M20 20 Q34 24 48 18" stroke="white" strokeWidth="2.5" fill="none" opacity="0.5" />
      {/* little stars on cap */}
      <circle cx="34" cy="12" r="1.2" fill="white" opacity="0.6" />
      <circle cx="42" cy="9" r="0.9" fill="white" opacity="0.5" />
    </g>
  );
}

function Glasses() {
  return (
    <g>
      {/* left lens -->  */}
      <circle cx="30" cy="40" r="11" fill="none" stroke="#185FA5" strokeWidth="2.2" opacity="0.85" />
      <circle cx="30" cy="40" r="11" fill="#E6F1FB" opacity="0.25" />
      {/* right lens */}
      <circle cx="50" cy="40" r="11" fill="none" stroke="#185FA5" strokeWidth="2.2" opacity="0.85" />
      <circle cx="50" cy="40" r="11" fill="#E6F1FB" opacity="0.25" />
      {/* bridge */}
      <path d="M41 40 Q40 38 39 40" stroke="#185FA5" strokeWidth="2" fill="none" opacity="0.85" />
      {/* left arm */}
      <path d="M19 38 Q14 36 10 38" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
      {/* right arm */}
      <path d="M61 38 Q66 36 70 38" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
      {/* lens shine */}
      <path d="M23 34 Q26 32 28 34" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M43 34 Q46 32 48 34" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
    </g>
  );
}

function TeacupAccessory() {
  return (
    <g>
      {/* little teacup sitting on top of head offset right */}
      <g transform="translate(44, 2) scale(0.7)">
        {/* saucer */}
        <ellipse cx="16" cy="30" rx="16" ry="4" fill="#CECBF6" opacity="0.9" />
        {/* cup */}
        <path d="M6 14 Q4 24 8 28 Q16 32 24 28 Q28 24 26 14Z" fill="#7F77DD" opacity="0.9" />
        {/* cup rim */}
        <ellipse cx="16" cy="14" rx="10" ry="3" fill="#AFA9EC" opacity="0.95" />
        {/* handle */}
        <path d="M26 16 Q32 16 32 20 Q32 24 26 24" stroke="#7F77DD" strokeWidth="2" fill="none" opacity="0.85" />
        {/* steam */}
        <path d="M10 10 Q11 6 10 2" stroke="#AFA9EC" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M16 8 Q17 4 16 0" stroke="#AFA9EC" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
      </g>
    </g>
  );
}

function Outfit({ outfit }: { outfit: OrbOutfit }) {
  switch (outfit) {
    case "scarf":
      return <Scarf />;
    case "crown":
      return <Crown />;
    case "nightcap":
      return <Nightcap />;
    case "glasses":
      return <Glasses />;
    case "teacup":
      return <TeacupAccessory />;
  }
}

// Orb face
const MOOD_COLORS = {
  idle: { body: "#CECBF6", bg: "#EEEDFE", mouth: "#534AB7", pupil: "#3C3489" },
  happy: { body: "#F4C0D1", bg: "#FBEAF0", mouth: "#993556", pupil: "#993556" },
  sleepy: { body: "#D3D1C7", bg: "#F1EFE8", mouth: "#888780", pupil: "#5F5E5A" },
  focused: { body: "#B5D4F4", bg: "#E6F1FB", mouth: "#185FA5", pupil: "#185FA5" },
  thinking: { body: "#B5D4F4", bg: "#E6F1FB", mouth: "#185FA5", pupil: "#185FA5" },
};

function OrbFace({ mood, pupils, bobY, squish, clicking }: { mood: OrbMood; pupils: { x: number; y: number }; bobY: number; squish: number; clicking: boolean }) {
  const c = MOOD_COLORS[mood];
  const isHappy = mood === "happy";
  const isSleepy = mood === "sleepy";
  const outfit = MOOD_OUTFIT[mood];

  const scaleX = clicking ? 1.1 : 1 + squish * 0.018;
  const scaleY = clicking ? 0.92 : 1 - squish * 0.018;

  const px = Math.max(-3.5, Math.min(3.5, pupils.x * 4));
  const py = Math.max(-2.5, Math.min(2.5, pupils.y * 3));

  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `translateY(${bobY}px) scaleX(${scaleX}) scaleY(${scaleY})`,
        transition: clicking ? "transform 0.07s" : "transform 0.18s ease-out",
        filter: `drop-shadow(0 4px 14px ${c.body}cc) drop-shadow(0 1px 4px ${c.body}88)`,
      }}
    >
      {/* Body */}
      <circle cx="40" cy="40" r="32" fill={c.bg} />
      <circle cx="40" cy="40" r="30" fill={c.body} />
      {/* Shine */}
      <ellipse cx="28" cy="22" rx="10" ry="6" fill="white" opacity="0.45" transform="rotate(-15 28 22)" />
      <circle cx="50" cy="16" r="3" fill="white" opacity="0.18" />

      {/* Outfit - rendered behind face features for scarf, in front for hat */}
      {outfit === "scarf" && <Outfit outfit={outfit} />}

      {/* Blush - very light */}
      <ellipse cx="20" cy="50" rx="7" ry="4" fill="#ED93B1" opacity="0.22" />
      <ellipse cx="60" cy="50" rx="7" ry="4" fill="#ED93B1" opacity="0.22" />

      {/* Eyes */}
      {isSleepy ? (
        // heavy drooping lids
        <g>
          <ellipse cx="30" cy="42" rx="6.5" ry="7" fill="white" opacity="0.9" />
          <ellipse cx="50" cy="42" rx="6.5" ry="7" fill="white" opacity="0.9" />
          <ellipse cx="30" cy="45" rx="4" ry="4.5" fill={c.pupil} />
          <circle cx="28" cy="43" r="1.4" fill="white" opacity="0.65" />
          <ellipse cx="50" cy="45" rx="4" ry="4.5" fill={c.pupil} />
          <circle cx="48" cy="43" r="1.4" fill="white" opacity="0.65" />
          {/* heavy lids */}
          <ellipse cx="30" cy="38" rx="7.5" ry="5" fill={c.body} />
          <ellipse cx="50" cy="38" rx="7.5" ry="5" fill={c.body} />
          <path d="M22 40 Q30 44 38 40" stroke={c.pupil} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
          <path d="M42 40 Q50 44 58 40" stroke={c.pupil} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
        </g>
      ) : isHappy ? (
        // arc eyes wide apart
        <g>
          <path d="M18 41 Q27 32 36 41" stroke={c.pupil} strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <path d="M44 41 Q53 32 62 41" stroke={c.pupil} strokeWidth="3.2" strokeLinecap="round" fill="none" />
        </g>
      ) : (
        // normal round eyes following cursor
        <g>
          <circle cx="30" cy="40" r="5.5" fill="white" opacity="0.95" />
          <circle cx={30 + px} cy={40 + py} r="3.8" fill={c.pupil} />
          <circle cx={28 + px} cy={38 + py} r="1.5" fill="white" opacity="0.75" />
          <circle cx="50" cy="40" r="5.5" fill="white" opacity="0.95" />
          <circle cx={50 + px} cy={40 + py} r="3.8" fill={c.pupil} />
          <circle cx={48 + px} cy={38 + py} r="1.5" fill="white" opacity="0.75" />
        </g>
      )}

      {/* Mouth */}
      {isSleepy ? (
        <path d="M34 54 Q40 57 46 54" stroke={c.mouth} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      ) : isHappy ? (
        <path d="M26 53 Q40 64 54 53" stroke={c.mouth} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M33 52 Q40 56 47 52" stroke={c.mouth} strokeWidth="2" strokeLinecap="round" fill="none" />
      )}

      {/* Outfit on top (hats, glasses, teacup) */}
      {outfit !== "scarf" && <Outfit outfit={outfit} />}

      {/* Mood extras */}
      {isSleepy && (
        <>
          <text x="57" y="20" fontSize="9" fill="#888780" opacity="0.55" fontFamily="monospace">
            z
          </text>
          <text x="62" y="13" fontSize="7" fill="#888780" opacity="0.35" fontFamily="monospace">
            z
          </text>
        </>
      )}
      {isHappy && (
        <>
          <text x="64" y="20" fontSize="9" fill={c.pupil} opacity="0.5">
            ✦
          </text>
          <text x="5" y="24" fontSize="6" fill={c.pupil} opacity="0.35">
            ✦
          </text>
        </>
      )}
    </svg>
  );
}

// Speech bubble
function SpeechBubble({ text, visible, above }: { text: string; visible: boolean; above: boolean }) {
  return (
    <div
      className={cn(
        "absolute pointer-events-none transition-all duration-300 whitespace-nowrap z-10",
        above ? "bottom-full right-0 mb-3" : "top-full right-0 mt-3",
        visible ? "opacity-100 translate-y-0" : above ? "opacity-0 translate-y-1" : "opacity-0 -translate-y-1",
      )}
    >
      <div className="relative bg-card border border-border/60 rounded-2xl px-3.5 py-2 shadow-lg">
        <span className="font-mono text-xs text-foreground">{text}</span>
        {above ? (
          <>
            <div className="absolute top-full right-6 border-[5px] border-transparent border-t-border/60" />
            <div className="absolute top-full right-6 -translate-y-[1px] border-[5px] border-transparent border-t-card" />
          </>
        ) : (
          <>
            <div className="absolute bottom-full right-6 border-[5px] border-transparent border-b-border/60" />
            <div className="absolute bottom-full right-6 translate-y-[1px] border-[5px] border-transparent border-b-card" />
          </>
        )}
      </div>
    </div>
  );
}

// Main component
const MOODS: OrbMood[] = ["idle", "happy", "sleepy", "focused", "thinking"];
const MOOD_LABELS: Record<OrbMood, string> = {
  idle: "cozy 🧣",
  happy: "happy 👑",
  sleepy: "sleepy 🌙",
  focused: "focused 🔵",
  thinking: "tea time 🍵",
};

export function SpiritOrb() {
  const [autoMood, setAutoMood] = useState<OrbMood>("idle");
  const [manualMood, setManualMood] = useState<OrbMood | null>(null);
  const [showMoodLabel, setShowMoodLabel] = useState(false);
  const [pupils, setPupils] = useState({ x: 0, y: 0 });
  const [bobY, setBobY] = useState(0);
  const [squish, setSquish] = useState(0);
  const [clicking, setClicking] = useState(false);
  const [quip, setQuip] = useState("");
  const [showQuip, setShowQuip] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: -1, y: -1 });
  const [bubbleAbove, setBubbleAbove] = useState(true);

  const mood = manualMood ?? autoMood;

  const orbRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const quipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const moodTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const labelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bobT = useRef(0);
  const lastQuipTime = useRef(0);
  const hasDragged = useRef(false);

  // Initial position
  useEffect(() => {
    setPos({ x: window.innerWidth - 108, y: window.innerHeight - 108 });
  }, []);

  // Bob
  useEffect(() => {
    if (isDragging) return;
    const animate = () => {
      bobT.current += 0.02;
      setBobY(Math.sin(bobT.current) * 5);
      setSquish(Math.sin(bobT.current * 2));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDragging]);

  // Pupils
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      const rect = orbRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setPupils({
        x: Math.max(-1, Math.min(1, ((e.clientX - cx) / window.innerWidth) * 4)),
        y: Math.max(-1, Math.min(1, ((e.clientY - cy) / window.innerHeight) * 4)),
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Mood (auto)
  useEffect(() => {
    const update = () => setAutoMood(getTimeBasedMood() ?? getMoodFromScroll());
    update();
    window.addEventListener("scroll", update, { passive: true });
    moodTimer.current = setInterval(update, 8000);
    return () => {
      window.removeEventListener("scroll", update);
      if (moodTimer.current) clearInterval(moodTimer.current);
    };
  }, []);

  // Quips
  useEffect(() => {
    const schedule = () => {
      quipTimer.current = setTimeout(
        () => {
          const pool = QUIPS[mood];
          setQuip(pool[Math.floor(Math.random() * pool.length)]);
          setShowQuip(true);
          lastQuipTime.current = Date.now();
          setTimeout(() => setShowQuip(false), 3500);
          schedule();
        },
        14000 + Math.random() * 16000,
      );
    };
    schedule();
    return () => {
      if (quipTimer.current) clearTimeout(quipTimer.current);
    };
  }, [mood]);

  // Bubble direction
  useEffect(() => {
    setBubbleAbove(pos.y > 120);
  }, [pos.y]);

  // Drag
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      hasDragged.current = false;
      dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      setIsDragging(true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const onMove = (e: PointerEvent) => {
        hasDragged.current = true;
        setPos({
          x: Math.max(0, Math.min(window.innerWidth - 88, e.clientX - dragOffset.current.x)),
          y: Math.max(0, Math.min(window.innerHeight - 88, e.clientY - dragOffset.current.y)),
        });
      };
      const onUp = () => {
        setIsDragging(false);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [pos],
  );

  // ── Click ──
  const handleClick = useCallback(() => {
    if (hasDragged.current) return;
    setClicking(true);
    setTimeout(() => setClicking(false), 150);
    if (Date.now() - lastQuipTime.current > 2000) {
      const pool = QUIPS[mood];
      setQuip(pool[Math.floor(Math.random() * pool.length)]);
      setShowQuip(true);
      lastQuipTime.current = Date.now();
      if (quipTimer.current) clearTimeout(quipTimer.current);
      setTimeout(() => setShowQuip(false), 3500);
    }
  }, [mood]);

  // ── Cycle mood manually ──
  const handleCycle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setManualMood((prev) => {
        const base = prev ?? autoMood;
        const idx = MOODS.indexOf(base);
        const next = MOODS[(idx + 1) % MOODS.length];
        return next;
      });
      setShowMoodLabel(true);
      if (labelTimer.current) clearTimeout(labelTimer.current);
      labelTimer.current = setTimeout(() => setShowMoodLabel(false), 2000);
    },
    [autoMood],
  );

  if (pos.x === -1) return null;

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed z-[9998] w-9 h-9 rounded-full border border-border/60 bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95"
        style={{ left: pos.x, top: pos.y }}
        aria-label="Show spirit orb"
      >
        <span className="font-mono text-xs text-primary">✦</span>
      </button>
    );
  }

  return (
    <div ref={orbRef} className="group fixed z-[9998] select-none" style={{ left: pos.x, top: pos.y, width: 80, height: 80 }}>
      <SpeechBubble text={quip} visible={showQuip} above={bubbleAbove} />

      {/* Mood label tooltip on cycle */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-200 whitespace-nowrap z-10",
          bubbleAbove ? "bottom-full mb-2" : "top-full mt-2",
          showMoodLabel ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
        )}
      >
        <span className="font-mono text-[10px] bg-card border border-border/50 rounded-full px-2.5 py-1 text-muted-foreground shadow-sm">{MOOD_LABELS[mood]}</span>
      </div>

      {/* Orb */}
      <div
        onPointerDown={onPointerDown}
        onClick={handleClick}
        className={cn("relative w-full h-full", isDragging ? "cursor-grabbing" : "cursor-grab")}
        style={{ touchAction: "none" }}
        role="button"
        tabIndex={0}
        aria-label="Spirit orb - drag me around or click to chat"
      >
        <OrbFace mood={mood} pupils={isDragging ? { x: 0, y: 0 } : pupils} bobY={isDragging ? 0 : bobY} squish={squish} clicking={clicking} />
      </div>

      {/* Minimize × */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setMinimized(true);
        }}
        className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-secondary border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground shadow-sm"
        aria-label="Minimize orb"
        style={{ fontSize: 10 }}
      >
        ×
      </button>

      {/* Cycle outfit button */}
      <button
        onClick={handleCycle}
        className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-secondary border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary shadow-sm"
        aria-label="Cycle outfit"
        style={{ fontSize: 9 }}
      >
        ✦
      </button>
    </div>
  );
}
