"use client"
import { cn } from "@/src/lib/utils"
import { Coffee, Terminal, X, User, Mail, BookOpen } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import React from "react"

// Stats
const stats = [
  { label: "Engineering", value: "0→1 builds" },
  { label: "Design", value: "Accessibility" },
  { label: "Research", value: "HCI & neuro" },
  { label: "Cups of tea", value: "∞" },
]

// Origin story
interface Chapter {
  id: string; year: string; title: string; color: string; content: string; tag: string
}

const chapters: Chapter[] = [
  {
    id: "beginning", year: "2010s", title: "Taking Things Apart", color: "#ffd6a5", tag: "origin",
    content: `It started before I knew it was starting.
    I always needed to know how things worked and why.

    Between toys, electronics, games, and more, I was curious on how they work at a fundamental level.
    I loved immersing myself in exploration and action in games for leisure.
    
    I was trying to understand the system underneath.
    What makes this do that?
    What happens if I change this part?
    The instinct to trace the thing back to its first principles never went away and instead grew to find new focuses.`,
  },
  {
    id: "scratch", year: "2020-22", title: "Coding Journey", color: "#d4edda", tag: "craft",
    content: `The first time I wrote code, I remember the specific feeling of realizing that the computer would do exactly what I told it to and only what I told it to.
    That seemed like a superpower and magic at the same time (it still does).

    My first line of code drew me in. Even though the couple lines were small, the impact it had with me was huge.
    I spent hours learning how to further code.
    I didn't view it as programming, but rather an art form.

    I was learning that the gap between what you imagine and what you produce is where all the work lives.
    Closing that gap is satisfying in a way that is magical.

    These may not have been impressive accomplishments, but they were the first time I understood that making something is different from understanding something and that both matter.`,
  },
  {
    id: "discovery", year: "2023", title: "College & Intersection", color: "#a8d8ea", tag: "education",
    content: `Before I began my journey in computer engineering, I used to be an economics major (as a result of being inspired by economics books I read during high school)!
    
    My pathway wasn't always linear, but I did make several major changes during the spring and summer before I started my time at UC Riverside (economics → business economics → business administration → undeclared → computer engineering).

    I chose computer engineering because I wanted the whole painted picture. Not just software, but the hardware underneath it.
    Essentially the electrical systems underneath that and the human beings sitting on top of it all.
    That intersection felt honest in a way that picking just one felt like cheating.

    Computer engineering at various colleges differs.
    At UCR, it directly combines computer science and electrical engineering.

    The first couple of quarters were more interesting than I'd hoped.
    I remember sitting in lab thinking about how the principles we were learning would eventually touch something someone was trying to do.
    Perhaps some interface, system, or moment of a person's day.
    That connection became the thing I kept chasing.
    
    I joined several orgs during my first year, but the ones I mainly stuck with were ACM, ASUCR, and Gamespawn.
    I joined ACM and Gamespawn because I wanted to be around other computer science and engineering students.
    I stayed because I found a community!`,
  },
  {
    id: "hci", year: "2024", title: "Discovering Further", color: "#e8d5f7", tag: "research",
    content: `I realized I didn't have the whole painted picture.
    
    I explored design and the beginnings of human-computer interaction (HCI) through user-centered design (UCD) (at the time, I didn't know what HCI was).`,
  },
  {
    id: "nasa", year: "2025", title: "More Real Constraints", color: "#f7c5c5", tag: "experience",
    content: `I discovered what human-computer interaction (HCI) and human-centered design (HCD) truly meant.
    The moment I understood what HCI actually was (not just "make buttons look nice"), but the science of how humans and systems interact, I felt like I'd found the right discipline.
    That includes all the cognitive load, affordance theory, contextual inquiry, and more that comes with it.

    Don Norman's work hit me hard.
    The idea that design isn't on the user (it's on the designer), reframed everything I'd ever thought about technology.
    Every accessible interface I'd ever used had a designer behind it who made choices that led to that.
    
    I continued doing research.
    I started thinking about what the hardest, most extreme version of what the HCI problem would look like.
    That further took me down the pathway of space.

    Working in research labs taught me what real constraints feel like.
    Not the constraints of a class project (where the stakes are a grade), but the constraints of systems where failure is not recoverable.

    Every decision is documented.
    Every assumption is questioned.
    Every interface is pressure-tested against the conditions it will actually operate in, not the conditions I wish it operated in.
    I brought that rigor back with me and it changed how I think about everything I build now.

    It also gave me a new research focus: if you can design for astronauts in pressurized suits in microgravity, what does that teach you about designing for everyone else?
    The answer turns out to be: a lot.`,
  },
  {
    id: "leadership", year: "2025 (cont.)", title: "Building Communities", color: "#ffeaa7", tag: "leadership",
    content: `Becoming President of ACM was something I didn't plan for. 
    I joined as a Board Intern, then Event Chair.
    I eventually ended up running for President since I saw things that could be continued and improved on.
    I had ideas about how to make them better.
    
    What I learned from directing Citrus Hack and Cutie Hack - with hundreds of participants, several sponsors, tight timelines, budgets, etc. is that leadership is mostly a design problem.
    It's designing systems for people (except people are less predictable than pixels).

    Being a Campus Leader for Notion showed me the other side: not organizing events but building habits, helping people find tools that fit how they think.`,
  },
  {
    id: "now", year: "2026 →", title: "Where It's Going", color: "#c4b5fd", tag: "present",
    content: `Right now I'm somewhere in the middle of a lot of things.
    Research that's getting somewhere.
    Projects that are taking shape.
    A website that's more alive than any version I've built before.

    The thread I keep following is this: what does it mean to build things that feel like extensions of the mind rather than obstacles to it?
    That question started with a kid figuring out how toys and games worked.
    Since then, it hasn't changed in any bad way and instead, that desire for exploration grew.
    
    I'm not entirely sure where my journey will lead me next (life is unpredictable!).
    But I know what I'm looking for: interfaces that think with people, systems that respect cognition, and the occasional good cup of tea at the right moment.`,
  },
]

function OriginStoryPanel() {
  const [activeId, setActiveId] = useState(chapters[0].id)
  const chapter = chapters.find((c) => c.id === activeId)!
  const activeIdx = chapters.findIndex((c) => c.id === activeId)

  return (
    <div className="flex h-full flex-col gap-4 sm:flex-row">
      <div className="flex gap-1 overflow-x-auto pb-1 sm:w-44 sm:shrink-0 sm:flex-col sm:gap-1 sm:overflow-x-visible sm:pb-0">
        {chapters.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActiveId(ch.id)}
            className={cn(
              "flex shrink-0 flex-col rounded-lg border px-3 py-2 text-left transition-all duration-150 sm:shrink",
              activeId !== ch.id && "border-transparent text-muted-foreground hover:bg-secondary/40",
            )}
            style={activeId === ch.id ? { background: ch.color + "50", borderColor: ch.color } : {}}
          >
            <span className="font-mono text-[9px] text-muted-foreground">{ch.year}</span>
            <span className={cn("mt-0.5 whitespace-nowrap text-xs leading-tight sm:whitespace-normal", activeId === ch.id ? "font-semibold text-foreground" : "text-muted-foreground")}>
              {ch.title}
            </span>
          </button>
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border/30 bg-transparent">
        <div className="h-1.5 w-full shrink-0 transition-colors duration-300" style={{ background: chapter.color }} />
        <div className="flex flex-col overflow-y-auto p-5" style={{ height: 320 }}>
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">{chapter.year}</span>
            <span className="rounded-full px-2.5 py-0.5 font-mono text-[10px] text-foreground/70" style={{ background: chapter.color + "55" }}>
              {chapter.tag}
            </span>
          </div>
          <h3 className="mb-4 text-base font-bold tracking-tight">{chapter.title}</h3>
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            {chapter.content.split(/\n\s*\n/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="mt-6 flex shrink-0 items-center justify-between border-t border-border/40 pt-4">
            <button
              onClick={() => activeIdx > 0 && setActiveId(chapters[activeIdx - 1].id)}
              disabled={activeIdx === 0}
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary disabled:opacity-30"
            >← prev</button>
            <span className="font-mono text-[10px] text-muted-foreground">{activeIdx + 1} / {chapters.length}</span>
            <button
              onClick={() => activeIdx < chapters.length - 1 && setActiveId(chapters[activeIdx + 1].id)}
              disabled={activeIdx === chapters.length - 1}
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary disabled:opacity-30"
            >next →</button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface NoteItem {
  id: number
  text: string
  mood: string
  color: string
  rotation: number
  x: number
  y: number
  time?: string
}

interface MoodConfig {
  id: string
  label: string
  color: string
}

const INITIAL_NOTES: NoteItem[] = [
  { id: 1, text: "some days the hardest part is just starting.", mood: "reflective", color: "#ffd6a5", rotation: -3, x: 20, y: 15 },
  { id: 2, text: "i think constraints are secretly gifts.", mood: "hopeful", color: "#a8d8ea", rotation: 2, x: 55, y: 25 },
  { id: 3, text: "the answer was simpler than i made it.", mood: "clarity", color: "#d4edda", rotation: -1, x: 35, y: 45 },
  { id: 4, text: "still figuring it out. that's the point.", mood: "honest", color: "#f7c5c5", rotation: 4, x: 60, y: 55 },
  { id: 5, text: "tea fixes more than it should.", mood: "light", color: "#e8d5f7", rotation: -2, x: 25, y: 65 },
  { id: 6, text: "shipped something imperfect today. proud of it.", mood: "hopeful", color: "#ffeaa7", rotation: 3, x: 45, y: 72 },
]

const MOODS: MoodConfig[] = [
  { id: "honest", label: "honest", color: "#f7c5c5" },
  { id: "hopeful", label: "hopeful", color: "#a8d8ea" },
  { id: "reflective", label: "reflective", color: "#ffd6a5" },
  { id: "clarity", label: "clarity", color: "#d4edda" },
  { id: "light", label: "light", color: "#e8d5f7" },
  { id: "heavy", label: "heavy", color: "#b8d4f0" },
]

function JarSVG({ noteCount, animating }: { noteCount: number; animating: boolean }) {
  return (
    <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 200, filter: "drop-shadow(0 8px 32px rgba(124,58,237,0.15))" }}>
      <rect x="52" y="18" width="96" height="22" rx="6" fill="#c4b5fd" opacity="0.9"/>
      <rect x="60" y="14" width="80" height="12" rx="4" fill="#a78bfa" opacity="0.8"/>
      <rect x="64" y="16" width="72" height="3" rx="1.5" fill="rgba(255,255,255,0.4)"/>
      <path d="M48 40 C44 40 38 48 36 60 L28 220 C26 235 36 252 50 252 L150 252 C164 252 174 235 172 220 L164 60 C162 48 156 40 152 40 Z"
        fill="rgba(248,247,255,0.95)" stroke="#e2d9f3" strokeWidth="2"/>
      <path d="M56 48 C54 48 50 54 48 64 L44 120" stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round"/>
      {INITIAL_NOTES.slice(0, Math.min(noteCount, 6)).map((note, i) => {
        const nx = 45 + (note.x / 100) * 110
        const ny = 80 + (note.y / 100) * 140
        return (
          <g key={note.id} transform={`translate(${nx}, ${ny}) rotate(${note.rotation})`}
            style={{ animation: animating ? `notefall 0.5s ${i * 0.08}s ease-out both` : "none" }}>
            <rect x="-18" y="-10" width="36" height="22" rx="3" fill={note.color} opacity="0.85"/>
            <line x1="-10" y1="-3" x2="10" y2="-3" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
            <line x1="-10" y1="2" x2="8" y2="2" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
          </g>
        )
      })}
      <path d="M48 40 C44 40 38 48 36 60 L28 220 C26 235 36 252 50 252 L150 252 C164 252 174 235 172 220 L164 60 C162 48 156 40 152 40 Z"
        fill="url(#jarGlass)" stroke="none"/>
      <defs>
        <linearGradient id="jarGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)"/>
          <stop offset="40%" stopColor="rgba(255,255,255,0)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.08)"/>
        </linearGradient>
      </defs>
      <text x="100" y="268" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#9ca3af">
        {noteCount} {noteCount === 1 ? "note" : "notes"}
      </text>
    </svg>
  )
}

function NoteCard({ note, onClick, featured = false }: { note: NoteItem; onClick: () => void; featured?: boolean }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: featured ? "16px 18px" : "12px 14px",
        background: note.color,
        borderRadius: 10,
        transform: `rotate(${note.rotation}deg)`,
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.06)",
        breakInside: "avoid" as const,
        marginBottom: 12,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "rotate(0deg) scale(1.03)"
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = `rotate(${note.rotation}deg)`
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"
      }}
    >
      <p style={{ fontSize: featured ? 14 : 13, color: "#374151", lineHeight: 1.6, marginBottom: 8 }}>{note.text}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(0,0,0,0.35)" }}>{note.mood}</span>
        {note.time && <span style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(0,0,0,0.25)" }}>{note.time}</span>}
      </div>
    </div>
  )
}

function NotesJarPanel() {
  const [view, setView] = useState<"jar" | "browse" | "write">("jar")
  const [notes, setNotes] = useState<NoteItem[]>(INITIAL_NOTES)
  const [shaking, setShaking] = useState(false)
  const [randomNote, setRandomNote] = useState<NoteItem | null>(null)
  const [animating, setAnimating] = useState(false)
  const [draft, setDraft] = useState<{ text: string; mood: string }>({ text: "", mood: "honest" })
  const [submitted, setSubmitted] = useState(false)
  const [dropping, setDropping] = useState(false)

  const shake = () => {
    setShaking(true)
    setTimeout(() => {
      setShaking(false)
      const idx = Math.floor(Math.random() * notes.length)
      setRandomNote(notes[idx])
    }, 500)
  }

  const handleDrop = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.text.trim()) return
    setDropping(true)
    setTimeout(() => {
      const moodData = MOODS.find(m => m.id === draft.mood)
      const newNote: NoteItem = {
        id: Date.now(),
        text: draft.text.trim(),
        mood: draft.mood,
        color: moodData?.color ?? "#ffd6a5",
        rotation: (Math.random() - 0.5) * 8,
        x: 20 + Math.random() * 60,
        y: 15 + Math.random() * 70,
        time: "just now",
      }
      setNotes(prev => [newNote, ...prev])
      setDraft({ text: "", mood: "honest" })
      setDropping(false)
      setSubmitted(true)
      setAnimating(true)
      setTimeout(() => { setSubmitted(false); setAnimating(false); setView("jar") }, 2000)
    }, 800)
  }

  return (
    <div style={{ fontFamily: "inherit" }}>
      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0) rotate(0deg)}
          20%{transform:translateX(-6px) rotate(-3deg)}
          40%{transform:translateX(6px) rotate(3deg)}
          60%{transform:translateX(-4px) rotate(-2deg)}
          80%{transform:translateX(4px) rotate(1deg)}
        }
        @keyframes notefall {
          from{opacity:0;transform:translateY(-20px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes dropin {
          0%{transform:translateY(-40px) scale(0.8);opacity:0}
          60%{transform:translateY(4px) scale(1.02);opacity:1}
          100%{transform:translateY(0) scale(1);opacity:1}
        }
        .jar-shake { animation: shake 0.5s ease; }
      `}</style>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(0,0,0,0.04)", borderRadius: 10, padding: 4, width: "fit-content" }}>
        {([["jar", "🫙 the jar"], ["browse", "📋 browse all"], ["write", "✍️ drop a note"]] as const).map(([v, label]) => (
          <button key={v} onClick={() => setView(v)}
            style={{ background: view === v ? "rgba(124,58,237,0.12)" : "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: 11, padding: "6px 14px", borderRadius: 8, color: view === v ? "#7c3aed" : "#9ca3af", transition: "all 0.15s" }}>
            {label}
          </button>
        ))}
      </div>

      {view === "jar" && (
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 24, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div className={shaking ? "jar-shake" : ""} style={{ width: "100%" }}>
              <JarSVG noteCount={notes.length} animating={animating} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
              <button onClick={shake}
                style={{ padding: "8px 12px", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 10, fontFamily: "monospace", fontSize: 11, color: "#7c3aed", cursor: "pointer" }}>
                🤲 shake the jar
              </button>
              <button onClick={() => setView("write")}
                style={{ padding: "8px 12px", background: "rgba(124,58,237,0.04)", border: "1px solid rgba(124,58,237,0.1)", borderRadius: 10, fontFamily: "monospace", fontSize: 11, color: "#9ca3af", cursor: "pointer" }}>
                + drop a note
              </button>
            </div>
          </div>

          <div style={{ minHeight: 280, overflowY: "auto" }}>
            {randomNote ? (
              <div style={{ animation: "dropin 0.4s ease" }}>
                <p style={{ fontFamily: "monospace", fontSize: 10, color: "#9ca3af", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
                  drawn from the jar ✦
                </p>
                <NoteCard note={randomNote} featured onClick={() => {}} />
                <button onClick={shake}
                  style={{ marginTop: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: 11, color: "#7c3aed" }}>
                  draw another →
                </button>
              </div>
            ) : (
              <div>
                <p style={{ fontFamily: "monospace", fontSize: 10, color: "#9ca3af", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
                  recent notes
                </p>
                {notes.slice(0, 3).map(note => (
                  <NoteCard key={note.id} note={note} onClick={() => setRandomNote(note)} />
                ))}
                <button onClick={() => setView("browse")}
                  style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: 11, color: "#7c3aed" }}>
                  see all {notes.length} notes →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {view === "browse" && (
        <div style={{ maxHeight: 380, overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <p style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af" }}>{notes.length} notes in the jar</p>
            <button onClick={shake}
              style={{ padding: "6px 14px", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)", borderRadius: 8, fontFamily: "monospace", fontSize: 11, color: "#7c3aed", cursor: "pointer" }}>
              random ✦
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {MOODS.map(m => (
              <span key={m.id}
                style={{ padding: "3px 12px", borderRadius: 999, background: m.color, fontFamily: "monospace", fontSize: 10, color: "#374151", border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer" }}>
                {m.label}
              </span>
            ))}
          </div>
          <div style={{ columns: 2, gap: 12 }}>
            {notes.map(note => (
              <NoteCard key={note.id} note={note} onClick={() => { setRandomNote(note); setView("jar") }} />
            ))}
          </div>
        </div>
      )}

      {view === "write" && (
        <div style={{ maxWidth: 440 }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "32px 20px" }}>
              <div style={{ fontSize: 48, marginBottom: 12, animation: "dropin 0.5s ease" }}>🫙</div>
              <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>Note dropped into the jar.</p>
              <p style={{ fontFamily: "monospace", fontSize: 12, color: "#9ca3af" }}>Anyone can find it now. Thank you.</p>
            </div>
          ) : (
            <div>
              <p style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af", marginBottom: 16 }}>
                One thought. Anonymous. It goes into the jar and anyone can read it.
              </p>
              <form onSubmit={handleDrop} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ position: "relative" }}>
                  <textarea value={draft.text} onChange={e => setDraft(d => ({...d, text: e.target.value}))}
                    placeholder="drop a thought, question, or something you're carrying today..."
                    maxLength={140} rows={4}
                    style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.1)", fontSize: 14, lineHeight: 1.7, resize: "none", background: MOODS.find(m => m.id === draft.mood)?.color + "40" ?? "#fafafa", transition: "background 0.3s", fontFamily: "inherit", outline: "none" }} />
                  <span style={{ position: "absolute", bottom: 10, right: 12, fontFamily: "monospace", fontSize: 10, color: draft.text.length > 120 ? "#ef4444" : "#9ca3af" }}>
                    {140 - draft.text.length}
                  </span>
                </div>
                <div>
                  <p style={{ fontFamily: "monospace", fontSize: 10, color: "#9ca3af", marginBottom: 8, letterSpacing: "0.1em" }}>MOOD / TONE</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {MOODS.map(m => (
                      <button key={m.id} type="button"
                        onClick={() => setDraft(d => ({...d, mood: m.id}))}
                        style={{ padding: "5px 12px", borderRadius: 999, background: m.color, border: `2px solid ${draft.mood === m.id ? "rgba(0,0,0,0.3)" : "transparent"}`, fontFamily: "monospace", fontSize: 11, cursor: "pointer", color: "#374151", transition: "all 0.15s", transform: draft.mood === m.id ? "scale(1.05)" : "scale(1)" }}>
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
                {draft.text && (
                  <div style={{ padding: "12px 14px", background: MOODS.find(m => m.id === draft.mood)?.color ?? "#ffd6a5", borderRadius: 10, transform: "rotate(-1deg)", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                    <p style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(0,0,0,0.3)", marginBottom: 4, letterSpacing: "0.1em" }}>PREVIEW</p>
                    <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{draft.text}</p>
                    <p style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(0,0,0,0.3)", marginTop: 6 }}>{draft.mood}</p>
                  </div>
                )}
                <button type="submit" disabled={!draft.text.trim() || dropping}
                  style={{ padding: "10px 18px", background: draft.text.trim() ? "rgba(124,58,237,0.1)" : "rgba(0,0,0,0.04)", border: "1px solid", borderColor: draft.text.trim() ? "rgba(124,58,237,0.3)" : "rgba(0,0,0,0.1)", borderRadius: 10, fontFamily: "monospace", fontSize: 12, color: draft.text.trim() ? "#7c3aed" : "#9ca3af", cursor: draft.text.trim() ? "pointer" : "default", transition: "all 0.15s" }}>
                  {dropping ? "dropping into jar..." : "🫙 drop into the jar"}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

type ModalType = "about" | "letter" | "story" | "notes" | null

const linkCn = "underline decoration-wavy decoration-current/45 underline-offset-3 transition-colors hover:decoration-current/80"

const modalContent: Record<
  NonNullable<ModalType>,
  { title: string; subtitle: string; icon: typeof User; wide?: boolean; body: React.ReactNode }
> = {
  about: {
    title: "Full About",
    subtitle: "who i am;",
    icon: User,
    body: (
      <>
        <p>Good design is sometimes invisible. It signifies the difference between a system that constrains and extends people. The best interfaces don't just respond to people, they think with them.</p>
        <p>Previously I've built at{" "}
          <a href="https://nucleo.com" target="_blank" rel="noopener noreferrer" className={linkCn}>Nucleo</a>,{" "}
          <a href="https://nasa.gov" target="_blank" rel="noopener noreferrer" className={linkCn}>NASA</a>,
          research labs for CS and HCI, etc. Currently I'm designing at the intersection of software, cognition, and product. I'm a researcher (located in the West Coast) and study computer engineering at{" "}
          <a href="https://ucr.edu" target="_blank" rel="noopener noreferrer" className={linkCn}>UC Riverside</a>{" "}
          through the intersection of computer science, electrical engineering, human-computer interaction, and product design.
        </p>
        <p>I lead{" "}
          <a href="https://acm.cs.ucr.edu" target="_blank" rel="noopener noreferrer" className={linkCn}>ACM</a>{" "}
          as President, direct{" "}
          <a href="https://www.citrushack.com" target="_blank" rel="noopener noreferrer" className={linkCn}>Citrus Hack</a>{" "}
          and{" "}
          <a href="https://www.cutiehack.com" target="_blank" rel="noopener noreferrer" className={linkCn}>Cutie Hack</a>,
          serve as a Campus Leader at{" "}
          <a href="https://notion.so" target="_blank" rel="noopener noreferrer" className={linkCn}>Notion</a>,
          and engage further through campus and international initiatives. I'm currently researching HCI for systems by designing interfaces that hold up in different environments.
        </p>
        <p>In my childhood, I explored as much as I could find just to understand how it worked. That instinct became a passion with how systems shape the way people think, decide, and act. My target is to build things that feel like extensions of the mind - not obstacles to it.</p>
        <p>My current rabbit holes: cognitive load in interface design, space systems, what it means to design for cognition under pressure, and whatever I find at the bottom of a good cup of tea.</p>
      </>
    ),
  },

  letter: {
    title: "Letter",
    subtitle: "to a stranger;",
    icon: Mail,
    body: (
      <>
        <p>Hey!</p>
        <p>If you're reading this, you probably found your way here out of curiosity (that's already something we have in common!). Maybe you were searching about tech, human-computer interaction (HCI), space interfaces, or just want to dip your toes into exploration.</p>
        <p>Regardless of how you ended up here, welcome to my website / corner of the internet and I'm glad you're here! To introduce myself: <strong className="font-semibold text-foreground">I'm Allison and I build things.</strong>{" "}Mostly software and systems, but I also design and work with hardware.</p>
        <p>I build structures for how people think. My direction in life is toward things that make people feel more capable, more clear, and a little less lost in figuring it all out. I study and research human-computer interaction (HCI) because I'm obsessed with the question of why some things feel effortless and others feel a bit more complex.</p>
        <p>I love researching HCI in the context of space! Sounds a bit much, but it's really the in depth version of my #1 question: what does it take to make technology feel effortless and human?</p>
        <p>I built my personal website the same way I approach most things: by asking what I actually want to say, then building around it. I have all these sections, rabbit holes, and interactive pieces because I wanted to make something that felt like having a mini coffee chat with a person. From all the versions of my personal website, I have learned that iteration takes many steps and that there is always room for improvement.</p>
        <p>Here's what I want you to know (if you made it this far and in case you only read this page):
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>I believe the best technology makes you feel smarter, not smaller and gives you a type of feeling</li>
            <li>I believe constraints are where interesting things happen</li>
            <li>I believe the process matters as much as the output - maybe more</li>
            <li>And I believe most good ideas arrive when you're making tea and take a deep breath</li>
          </ul>
        </p>
        <p>If something on this website made you think, made you want to build something, or just made you feel like the internet can still be a weird and genuine place, then that's everything I was hoping for.
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>If you want to leave a note, there's a jar for that</li>
            <li>If you have a question, there's a box for that too</li>
            <li>And if you just want to wander around, feel free to do so (there are a ton of different spots in my website)!</li>
          </ul>
        </p>
        <p>Thanks for stopping by and being curious enough to end up here!</p>
        <p>With warmth,</p>
        <p>- Allison 💌</p>
      </>
    ),
  },

  story: {
    title: "My Story",
    subtitle: "origin;",
    icon: BookOpen,
    wide: true,
    body: <OriginStoryPanel />,
  },

  notes: {
    title: "Notes Jar",
    subtitle: "collective thoughts;",
    icon: BookOpen,
    wide: true,
    body: <NotesJarPanel />,
  },
}

const buttons: { type: NonNullable<ModalType>; label: string }[] = [
  { type: "about", label: "full about" },
  { type: "letter", label: "letter" },
  { type: "story", label: "my story" },
  { type: "notes", label: "notes jar" },
]

function AboutModal({
  type,
  onClose,
  onSwitch,
}: {
  type: NonNullable<ModalType>
  onClose: () => void
  onSwitch: (t: NonNullable<ModalType>) => void
}) {
  const content = modalContent[type]
  const Icon = content.icon
  const isWide = !!content.wide

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = "" }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm pointer-events-none" />
      <div
        className={cn(
          "relative z-10 flex w-full flex-col rounded-2xl border border-border/60 bg-card/95 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300",
          isWide ? "max-w-3xl" : "max-w-lg",
        )}
        style={{ maxHeight: "85vh" }}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border/40 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-widest text-muted-foreground">{content.subtitle}</p>
              <h3 className="text-sm font-semibold">{content.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div
          className={cn("min-h-0 flex-1 px-6 py-5", !isWide && "overflow-y-auto")}
          style={{ minHeight: 380, ...(isWide && { overflowY: "auto" }) }}
        >
          {isWide
            ? <div className="h-full">{content.body}</div>
            : <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">{content.body}</div>
          }
        </div>

        <div className="flex shrink-0 gap-2 border-t border-border/40 px-6 py-4">
          {buttons.map((btn) => (
            <button
              key={btn.type}
              onClick={() => btn.type !== type && onSwitch(btn.type)}
              className={cn(
                "rounded-lg border px-3 py-1.5 font-mono text-xs transition-all duration-200",
                btn.type === type
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground",
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-x-clip px-4 sm:px-6 pt-24 sm:pt-36 pb-12 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">

          <div className="min-w-0 space-y-8">
            <div className={cn("space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
              <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">about;</p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">Allison Pham ✦</h1>
            </div>

            <div className={cn("flex flex-wrap items-center gap-3 opacity-0", isVisible && "animate-fade-in-up stagger-2")}>
              <span className="flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                <Terminal className="h-3 w-3 text-primary" />Engineering & design
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                <Coffee className="h-3 w-3 text-primary" />HCI & space systems
              </span>
            </div>

            <div className={cn("space-y-4 text-base sm:text-lg leading-relaxed text-muted-foreground opacity-0", isVisible && "animate-fade-in-up stagger-3")}>
              <p>I build through the intersection of tech, engineering, and <span className="font-bold italic underline decoration-wavy">product</span> to develop projects and initiatives geared towards impact from the ground up.</p>
              <p>I work on designing products that target the architecture behind how others think, decide, and act. I'm driven by the desire to ensure every system feeling like an <span className="font-bold italic underline decoration-wavy">extension</span> of the <span className="font-bold italic underline decoration-wavy">mind</span>, not a constraint on it.</p>
              <p>Productivity mixed in with resilient serendipity and serenity are my current targets. Thoughtful design and product engineering are a constant passion of mine.</p>
            </div>

            {/* 4 modal buttons */}
            <div className={cn("flex flex-wrap gap-2 opacity-0", isVisible && "animate-fade-in-up stagger-3")}>
              {buttons.map((btn) => (
                <button
                  key={btn.type}
                  onClick={() => setActiveModal(btn.type)}
                  className="rounded-lg border border-border/60 bg-card/50 px-4 py-2 font-mono text-xs text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary active:scale-[0.97]"
                >
                  {btn.label} ↗
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className={cn("grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:grid-cols-4 opacity-0", isVisible && "animate-fade-in-up stagger-4")}>
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border/50 bg-card/50 glass p-4 text-center hover-lift transition-all duration-300 hover:border-primary/40">
                  {stat.value}
                  <div className="mt-1 font-mono text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className={cn("relative min-w-0 opacity-0", isVisible && "animate-scale-in stagger-4")}>
            <div className="relative rounded-2xl border border-border/60 bg-card/60 glass p-4 sm:p-8 hover-lift">
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <div className="h-3 w-3 rounded-full bg-primary/60" />
              </div>
              <div className="absolute top-3.5 left-1/2 hidden -translate-x-1/2 rounded-md bg-background/50 px-3 py-1 font-mono text-xs text-muted-foreground sm:block">
                about-allison.json
              </div>
              <pre className="mt-6 max-w-full overflow-x-auto font-mono text-xs leading-6 text-foreground/80 sm:mt-8">
                <code className="block min-w-max">{`
{
  "name": "Allison Pham",

  "current missions & targets": [
    "Computer science",
    "Electrical engineering",
    "Product design & management",
    "Human-computer interaction (HCI)",
    "Space systems"
  ],

  "involvement": [
    "President @ ACM",
    "Director @ Citrus Hack",
    "Director @ Cutie Hack",
    "Campus Leader @ Notion"
  ],

  "status": "designing products"  
}
                `}</code>
              </pre>
            </div>
            <div className="hidden sm:block absolute -right-4 -top-4 rounded-lg border border-primary/40 bg-primary/15 glass px-4 py-1.5 font-mono text-xs text-primary animate-float">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                night code sessions, fueled by tea & design curiosity 🌙
              </span>
            </div>
          </div>
        </div>
      </div>

      {activeModal && (
        <AboutModal
          type={activeModal}
          onClose={() => setActiveModal(null)}
          onSwitch={setActiveModal}
        />
      )}
    </section>
  )
}