"use client";
import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "interactive" | "journal";

// default → sparkle ✦ (always)
// journal → tea cup  (journal / collections sections)
// interactive → orbit + satellite (buttons, links, inputs)

const PURPLE = "oklch(75.792% 0.13736 296.393)";

const OFFSET: Record<CursorMode, [number, number]> = {
  default: [12, 12],
  interactive: [12, 12],
  journal: [12, 12],
};

// Sparkle (default)
function SparkleCursor() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main 4-point star */}
      <path d="M13 2 L14.4 11.6 L24 13 L14.4 14.4 L13 24 L11.6 14.4 L2 13 L11.6 11.6 Z" fill={PURPLE} fillOpacity="0.95" />
      {/* Small star top-right */}
      <path d="M21 3 L21.9 6.1 L25 7 L21.9 7.9 L21 11 L20.1 7.9 L17 7 L20.1 6.1 Z" fill={PURPLE} fillOpacity="0.45" />
      {/* Tiny dot bottom-left */}
      <circle cx="5" cy="20" r="1.2" fill={PURPLE} fillOpacity="0.3" />
    </svg>
  );
}

// Orbit + satellite (interactive)
function OrbitCursor() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sparkle center */}
      <path d="M14 7 L15 12 L20 13 L15 14 L14 19 L13 14 L8 13 L13 12 Z" fill={PURPLE} fillOpacity="0.95" />
      {/* Orbit ring tilted */}
      <ellipse cx="14" cy="14" rx="11" ry="5.5" stroke={PURPLE} strokeWidth="1.2" strokeOpacity="0.55" fill="none" transform="rotate(-35 14 14)" />
      {/* Satellite dot on ring */}
      <circle cx="22.5" cy="9" r="2" fill={PURPLE} fillOpacity="0.85" />
      {/* Tiny star top-left */}
      <path d="M4 4 L4.5 6 L6.5 6.5 L4.5 7 L4 9 L3.5 7 L1.5 6.5 L3.5 6 Z" fill={PURPLE} fillOpacity="0.35" />
      {/* Tiny dot bottom-right */}
      <circle cx="24" cy="22" r="1" fill={PURPLE} fillOpacity="0.25" />
    </svg>
  );
}

// Tea cup (journal / collections)
function TeaCursor() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cup body */}
      <path d="M4 9 L5.8 19.5 Q6 21 7.5 21 L15.5 21 Q17 21 17.2 19.5 L19 9 Z" fill={PURPLE} fillOpacity="0.88" />
      {/* Handle */}
      <path d="M19 11.5 Q23.5 11.5 23.5 14.5 Q23.5 17.5 19 17.5" stroke={PURPLE} strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.88" />
      {/* Steam - left */}
      <path d="M8.5 7 Q9.2 5 8.5 3" stroke={PURPLE} strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.5" />
      {/* Steam - center */}
      <path d="M11.5 6 Q12.2 4 11.5 2" stroke={PURPLE} strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.5" />
      {/* Steam - right */}
      <path d="M14.5 7 Q15.2 5 14.5 3" stroke={PURPLE} strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.5" />
      {/* Saucer */}
      <ellipse cx="11.5" cy="22.2" rx="8" ry="1.8" fill={PURPLE} fillOpacity="0.35" />
    </svg>
  );
}

// Cursor switcher
function CursorSVG({ mode }: { mode: CursorMode }) {
  switch (mode) {
    case "interactive":
      return <OrbitCursor />;
    case "journal":
      return <TeaCursor />;
    default:
      return <SparkleCursor />;
  }
}

// Context detection
const JOURNAL_KEYWORDS = [
  "journal",
  "diary",
  "collections",
  "tea",
  "bookmarks",
  "bookshelf",
  "reading",
  "sticker",
  "badge",
  "planner",
  "qa",
  "streak",
  "language",
  "favorite",
  "photo",
  "hci",
  "influence",
  "knowledge",
  "micro",
  "rubber",
  "skills",
  "thinking",
  "whatIread",
];

function detectMode(el: Element | null): CursorMode {
  if (!el) return "default";

  let node: Element | null = el;
  while (node && node !== document.documentElement) {
    const tag = node.tagName.toLowerCase();

    // Interactive elements → orbit
    if (tag === "button" || tag === "a" || tag === "input" || tag === "textarea" || tag === "select" || node.getAttribute("role") === "button" || (node.getAttribute("tabindex") !== null && node.getAttribute("tabindex") !== "-1")) {
      return "interactive";
    }

    // Journal / collections sections → tea
    const id = node.id?.toLowerCase() ?? "";
    const cls = Array.from(node.classList).join(" ").toLowerCase();
    const ds = node.getAttribute("data-section")?.toLowerCase() ?? "";
    if (JOURNAL_KEYWORDS.some((k) => id.includes(k) || cls.includes(k) || ds.includes(k))) {
      return "journal";
    }

    node = node.parentElement;
  }

  return "default";
}

// Main component
export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const rafRef = useRef<number | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Hide native cursor everywhere
    const style = document.createElement("style");
    style.id = "custom-cursor-hide";
    style.textContent = `
      @media (pointer: fine) {
        *, *::before, *::after { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setMode(detectMode(el));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    // Lerp-smoothed follow
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.2);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.2);
      setPos({ x: currentPos.current.x, y: currentPos.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      document.getElementById("custom-cursor-hide")?.remove();
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  const [ox, oy] = OFFSET[mode];

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        left: pos.x - ox,
        top: pos.y - oy,
        pointerEvents: "none",
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        transform: clicking ? "scale(0.82)" : "scale(1)",
        transition: "opacity 0.12s, transform 0.08s",
        willChange: "left, top",
      }}
    >
      <CursorSVG mode={mode} />
    </div>
  );
}
