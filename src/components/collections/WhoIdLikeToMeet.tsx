"use client";
import { useState } from "react";
import { cn } from "@/src/lib/core-features/utils";

type Category = "research" | "design" | "building" | "community" | "intellectual";

interface Person {
  id: number;
  description: string;
  why: string;
  category: Category;
  open: boolean;
}

const people: Person[] = [
  {
    id: 1,
    description: "Someone who has done UX research in genuinely extreme environments - surgical suites, deep-sea, high-altitude, military. Not hypothetical constraints. Real ones.",
    why: "I want to know what actually breaks when you design for a person under maximum stress, and what you'd never have guessed from a lab study.",
    category: "research",
    open: true,
  },
  {
    id: 2,
    description: "A transit systems designer who has shipped something that millions of people use every day - and has opinions about what they'd do differently.",
    why: "MetroSync started as a design exercise. I want to know where the real constraints are, from someone who's hit them.",
    category: "design",
    open: true,
  },
  {
    id: 3,
    description: "Someone building tools specifically for how people think - not productivity apps, but tools that extend or augment cognition in some meaningful way.",
    why: "This is the intersection I keep coming back to. I want to find the other people who are obsessed with it.",
    category: "building",
    open: true,
  },
  {
    id: 4,
    description: "A researcher who has worked on the human factors side of space missions - not interface design specifically, but the broader question of how people function in isolation and confinement.",
    why: "The HCI problems I'm studying live inside a larger human factors context. I need to understand that context better.",
    category: "research",
    open: true,
  },
  {
    id: 5,
    description: "Someone who has run a hackathon for 500+ people and is willing to be honest about what went wrong.",
    why: "I've directed Citrus Hack and Cutie Hack. I want to compare notes with someone who's been further down that road.",
    category: "community",
    open: true,
  },
  {
    id: 6,
    description: "A designer who has worked on both consumer products and safety-critical systems - and has thoughts on what each context gets wrong about the other.",
    why: "I keep feeling like consumer product design and safety-critical design are talking past each other. Someone who has done both would have the translation layer I'm missing.",
    category: "design",
    open: true,
  },
  {
    id: 7,
    description: "Someone who has read both Norman and Csíkszentmihályi and has an opinion on where they disagree.",
    why: "This is a litmus test question. I want to find people who have thought hard about the same intersection I'm in.",
    category: "intellectual",
    open: true,
  },
];

const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string }> = {
  research: { bg: "bg-blue-500/8", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/30" },
  design: { bg: "bg-pink-500/8", text: "text-pink-600 dark:text-pink-400", border: "border-pink-500/30" },
  building: { bg: "bg-primary/8", text: "text-primary", border: "border-primary/30" },
  community: { bg: "bg-emerald-500/8", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/30" },
  intellectual: { bg: "bg-amber-500/8", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/30" },
};

export function WhoIdLikeToMeet() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const categories = [...new Set(people.map((p) => p.category))];
  const filtered = filter ? people.filter((p) => p.category === filter) : people;

  return (
    <section className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-12 sm:pb-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 space-y-3">
          <p className="font-mono text-xs tracking-[0.25em] text-primary">intentional networking;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Who I'd Like to Meet ◈</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">Specific types of people, not generic networking. If this sounds like you - or someone you know - the question box is right there.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter(null)}
            className={cn("rounded-full border px-3.5 py-1 font-mono text-xs transition-all", !filter ? "border-primary/40 bg-primary/10 text-primary" : "border-border/50 text-muted-foreground hover:border-primary/30")}
          >
            all
          </button>
          {categories.map((cat) => {
            const c = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => setFilter(filter === cat ? null : cat)}
                className={cn("rounded-full border px-3.5 py-1 font-mono text-xs transition-all", filter === cat ? cn(c.bg, c.text, c.border) : "border-border/50 text-muted-foreground hover:border-primary/30")}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* List */}
        <div className="space-y-2.5 mb-8">
          {filtered.map((person, i) => {
            const c = CATEGORY_COLORS[person.category];
            const isOpen = expanded === person.id;
            return (
              <div
                key={person.id}
                onClick={() => setExpanded(isOpen ? null : person.id)}
                className={cn("rounded-xl border bg-card/40 p-5 cursor-pointer transition-all duration-200", isOpen ? cn("border-2", c.border) : "border-border/50 hover:border-border")}
              >
                <div className="flex gap-3 items-start">
                  <span className="font-mono text-sm font-bold text-primary/20 w-6 shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex-1 min-w-0">
                    <div className={cn("flex items-start justify-between gap-3", isOpen && "mb-3")}>
                      <p className="text-sm text-foreground/80 leading-relaxed">{person.description}</p>
                      <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[10px] shrink-0", c.bg, c.text, c.border)}>{person.category}</span>
                    </div>
                    {isOpen && (
                      <div className="pl-0 border-l-2 border-primary/20 pl-3 rounded-r">
                        <p className="font-mono text-[10px] text-primary mb-1 tracking-wider">WHY</p>
                        <p className="text-xs text-muted-foreground leading-relaxed italic">{person.why}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="rounded-xl border border-primary/20 bg-card/40 p-5">
          {!showForm ? (
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-sm mb-1">That's you - or someone you know?</p>
                <p className="text-xs text-muted-foreground">Say hello. I read everything.</p>
              </div>
              <button onClick={() => setShowForm(true)} className="font-mono text-xs border border-primary/30 bg-primary/10 text-primary rounded-lg px-4 py-2 hover:bg-primary/20 transition-all shrink-0">
                reach out →
              </button>
            </div>
          ) : sent ? (
            <div className="text-center py-2">
              <p className="font-bold text-sm mb-1">Sent ✦</p>
              <p className="font-mono text-xs text-muted-foreground">Thank you for reaching out. I'll reply.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (message.trim()) setSent(true);
              }}
            >
              <p className="font-mono text-[10px] text-muted-foreground mb-3 tracking-wider">SEND A MESSAGE</p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me who you are and why you're reaching out..."
                rows={4}
                className="w-full rounded-lg border border-border/50 bg-secondary/20 px-3 py-2.5 text-sm leading-relaxed resize-none mb-3 focus:outline-none focus:border-primary/40"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className={cn("font-mono text-xs rounded-lg px-4 py-2 border transition-all", message.trim() ? "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20" : "border-border/30 text-muted-foreground cursor-not-allowed")}
                >
                  send →
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="font-mono text-xs rounded-lg px-4 py-2 border border-border/30 text-muted-foreground hover:text-foreground transition-all">
                  cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
