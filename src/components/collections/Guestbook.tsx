"use client";
import { cn } from "@/src/lib/core-features/utils";
import { Send, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  sticker: string;
  color: string;
  created_at: string;
};

// Stickers
const STICKERS = [
  { emoji: "🍵", label: "tea", color: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30" },
  { emoji: "✦", label: "sparkle", color: "bg-primary/10 text-primary border-primary/30" },
  { emoji: "🌸", label: "blossom", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/30" },
  { emoji: "🛸", label: "space", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" },
  {
    emoji: "🔬",
    label: "research",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
  },
  { emoji: "🪴", label: "plant", color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30" },
  { emoji: "📚", label: "books", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30" },
  { emoji: "🎨", label: "design", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30" },
  { emoji: "⭐", label: "star", color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30" },
  { emoji: "🧠", label: "hci", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30" },
  { emoji: "🍊", label: "citrus", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30" },
  { emoji: "🌙", label: "moon", color: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30" },
];

// Seed entries
const SEED_ENTRIES: GuestbookEntry[] = [
  {
    id: "1",
    name: "maya",
    message: "cozy and thoughtful ✦",
    sticker: "🍵",
    color: STICKERS[0].color,
    created_at: "2025-05-12T10:00:00Z",
  },
  {
    id: "2",
    name: "carlos",
    message: "#journal-feature",
    sticker: "🌸",
    color: STICKERS[2].color,
    created_at: "2025-05-10T14:22:00Z",
  },
  {
    id: "3",
    name: "priya",
    message: "HCI + space systems ✦",
    sticker: "🛸",
    color: STICKERS[3].color,
    created_at: "2025-05-08T09:11:00Z",
  },
  {
    id: "4",
    name: "bob",
    message: "yay hackathons!",
    sticker: "🍊",
    color: STICKERS[10].color,
    created_at: "2025-05-05T18:45:00Z",
  },
  {
    id: "5",
    name: "yuki",
    message: "yay, the spirit orb",
    sticker: "✦",
    color: STICKERS[1].color,
    created_at: "2025-05-02T22:30:00Z",
  },
  {
    id: "6",
    name: "trinity",
    message: "design sense!",
    sticker: "🎨",
    color: STICKERS[7].color,
    created_at: "2025-04-28T16:00:00Z",
  },
];

// Entry card
function EntryCard({ entry, index, isVisible }: { entry: GuestbookEntry; index: number; isVisible: boolean }) {
  const sticker = STICKERS.find((s) => s.emoji === entry.sticker) ?? STICKERS[0];
  const stampBorder = sticker.color.split(" ").find((c) => c.startsWith("border-")) ?? "border-primary/30";
  const stampBg = sticker.color.split(" ").find((c) => c.startsWith("bg-")) ?? "bg-primary/10";
  const date = new Date(entry.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={cn("group relative rounded-2xl border border-border/60 bg-card/50 p-5 transition-all duration-300 opacity-0", "hover:border-primary/20 hover:bg-card/80 hover:-translate-y-0.5", isVisible && "animate-fade-in-up")}
      style={{ animationDelay: `${(index % 12) * 50 + 100}ms` }}
    >
      {/* Stamp */}
      <div className={cn("absolute -top-3 -right-3 w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg shadow-sm bg-card transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6", stampBorder)}>
        {entry.sticker}
      </div>

      {/* Message */}
      <p className="text-sm leading-relaxed text-foreground/85 mb-3 pr-4">{entry.message}</p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", stampBg)} />
          <span className="font-mono text-xs font-medium text-foreground truncate">{entry.name}</span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground/60 shrink-0">{date}</span>
      </div>
    </div>
  );
}

// Form
function GuestbookForm({ onSuccess }: { onSuccess: (entry: GuestbookEntry) => void }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sticker, setSticker] = useState(STICKERS[0]);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !message.trim()) {
      setError("Name and message are required.");
      return;
    }
    setError("");
    const entry: GuestbookEntry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      message: message.trim(),
      sticker: sticker.emoji,
      color: sticker.color,
      created_at: new Date().toISOString(),
    };
    onSuccess(entry);
    setDone(true);
    setName("");
    setMessage("");
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center space-y-2">
        <p className="text-2xl">{sticker.emoji}</p>
        <p className="font-mono text-sm text-primary">stamped & saved ✦</p>
        <p className="text-xs text-muted-foreground">thanks for signing the guestbook!</p>
        <button onClick={() => setDone(false)} className="mt-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
          leave another note
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-6 space-y-4">
      <p className="font-mono text-xs tracking-wider text-primary">leave a note;</p>

      {/* Name */}
      <div className="space-y-1.5">
        <label className="font-mono text-[11px] text-muted-foreground">your name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          placeholder="what should I call you?"
          className="w-full rounded-xl border border-border/60 bg-secondary/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus:outline-none focus:bg-card/60 transition-all"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="font-mono text-[11px] text-muted-foreground">your message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={200}
          rows={3}
          placeholder="say something nice, leave a thought, ask a question..."
          className="w-full rounded-xl border border-border/60 bg-secondary/30 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus:outline-none focus:bg-card/60 transition-all resize-none"
        />
        <p className="font-mono text-[10px] text-muted-foreground/50 text-right">{message.length}/200</p>
      </div>

      {/* Sticker picker */}
      <div className="space-y-2">
        <label className="font-mono text-[11px] text-muted-foreground">pick a stamp</label>
        <div className="flex flex-wrap gap-2">
          {STICKERS.map((s) => (
            <button
              key={s.emoji}
              onClick={() => setSticker(s)}
              title={s.label}
              className={cn(
                "w-9 h-9 rounded-xl border-2 flex items-center justify-center text-base transition-all duration-150 hover:scale-110 active:scale-95",
                sticker.emoji === s.emoji ? cn("scale-110 shadow-sm", s.color) : "border-border/50 bg-secondary/30 hover:border-primary/30",
              )}
            >
              {s.emoji}
            </button>
          ))}
        </div>
        <div className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs", sticker.color)}>
          <span>{sticker.emoji}</span>
          <span>{sticker.label}</span>
          <span className="text-muted-foreground/60">selected</span>
        </div>
      </div>

      {error && <p className="font-mono text-xs text-red-500">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={!name.trim() || !message.trim()}
        className={cn(
          "w-full flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-sm transition-all duration-200 active:scale-[0.98]",
          "border-primary bg-primary/15 text-primary hover:bg-primary/25",
          "disabled:opacity-40 disabled:cursor-not-allowed",
        )}
      >
        <Send className="h-4 w-4" />
        stamp &amp; sign
      </button>
    </div>
  );
}

// Main component
export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(SEED_ENTRIES);
  const [isVisible, setIsVisible] = useState(false);
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

  const handleNewEntry = (entry: GuestbookEntry) => {
    setEntries((prev) => [entry, ...prev]);
  };

  return (
    <section ref={ref} className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className={cn("mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">visitors;</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Guestbook ✉</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">You found it - leave a note and pick a stamp (I read every one).</p>
          </div>
          <span className="font-mono text-sm text-muted-foreground">{entries.length} notes</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Wall of entries */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 content-start">
            {entries.map((entry, i) => (
              <EntryCard key={entry.id} entry={entry} index={i} isVisible={isVisible} />
            ))}
          </div>

          {/* Form */}
          <div className={cn("opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "200ms" }}>
            <GuestbookForm onSuccess={handleNewEntry} />
          </div>
        </div>
      </div>
    </section>
  );
}
