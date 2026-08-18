"use client";
import Image from "next/image";
import { Star, Tag, Lightbulb, Quote, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/core-features/utils";
import { books, allBookTags, statusConfig, coverUrl, type ReadingStatus } from "@/src/lib/books";

const STATUS_FILTERS: Array<ReadingStatus | "all"> = ["all", "read", "reading", "want"];

const SPINE_COLORS: Record<string, string> = {
  "bg-yellow-300": "bg-yellow-300",
  "bg-gray-400": "bg-gray-400",
  "bg-blue-300": "bg-blue-300",
  "bg-emerald-300": "bg-emerald-300",
  "bg-pink-300": "bg-pink-300",
  "bg-gray-300": "bg-gray-300",
  "bg-purple-300": "bg-purple-300",
  "bg-orange-300": "bg-orange-300",
  "bg-red-300": "bg-red-300",
  "bg-cyan-300": "bg-cyan-300",
  "bg-indigo-300": "bg-indigo-300",
  "bg-slate-300": "bg-slate-300",
  "bg-red-400": "bg-red-400",
};

function StarRating({ rating }: { rating?: number }) {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-2.5 w-2.5", i < rating ? "fill-primary text-primary" : "text-border")} />
      ))}
    </div>
  );
}

export function BooksContent() {
  const [statusFilter, setStatusFilter] = useState<ReadingStatus | "all">("all");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<(typeof books)[0] | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filtered = books.filter((b) => (statusFilter === "all" || b.status === statusFilter) && (!tagFilter || b.tags.includes(tagFilter)));

  const handleSelect = (book: (typeof books)[0] | null) => {
    setSelected(book);
    setShowDetails(false);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all active:scale-[0.98]",
              statusFilter === s ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-foreground/40",
            )}
          >
            {s !== "all" && <span className={cn("h-1.5 w-1.5 rounded-full", statusConfig[s as ReadingStatus].dot)} />}
            {s === "all" ? "all" : statusConfig[s as ReadingStatus].label}
          </button>
        ))}
        {allBookTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
            className={cn(
              "rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wider transition-all",
              tagFilter === tag ? "border-primary/50 bg-primary/10 text-primary" : "border-border/60 bg-secondary/30 text-muted-foreground hover:border-primary/30",
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid + side panel */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_300px]">
        {/* Cover grid */}
        <div className="grid grid-cols-4 gap-3 content-start">
          {filtered.map((book) => (
            <button key={book.id} onClick={() => handleSelect(selected?.id === book.id ? null : book)} className="group relative flex flex-col gap-1.5">
              <div
                className={cn(
                  "relative aspect-[2/3] w-full overflow-hidden rounded-lg border bg-secondary/40 transition-all duration-300",
                  selected?.id === book.id
                    ? "border-primary shadow-lg shadow-primary/20 scale-[1.06] -translate-y-1.5"
                    : "border-border/50 group-hover:border-primary/50 group-hover:scale-[1.06] group-hover:-translate-y-1.5 group-hover:shadow-md group-hover:shadow-primary/15",
                )}
              >
                {book.isbn ? (
                  <Image src={coverUrl(book.isbn, "M")} alt={`${book.title} cover`} fill sizes="(min-width: 640px) 10vw, 20vw" className="object-cover" />
                ) : (
                  // No ISBN fallback — colored spine + title
                  <div className={cn("absolute inset-0 flex items-end p-1.5", SPINE_COLORS[book.spineColor ?? ""] ?? "bg-secondary")}>
                    <p className="font-mono text-[8px] text-foreground/60 leading-tight line-clamp-3">{book.title}</p>
                  </div>
                )}
                <div className={cn("absolute right-1 top-1 h-2 w-2 rounded-full ring-2 ring-background", statusConfig[book.status].dot)} />
              </div>
              <p className={cn("line-clamp-2 text-center font-mono text-[9px] leading-tight transition-colors", selected?.id === book.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground")}>{book.title}</p>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-4 py-10 text-center">
              <p className="font-mono text-xs text-muted-foreground">No books match.</p>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="sticky top-0 self-start">
          {selected ? (
            <div className="rounded-xl border border-primary/30 bg-card/50 overflow-hidden animate-fade-in-up">
              {/* Colored spine tab */}
              <div className={cn("h-1.5 w-full", SPINE_COLORS[selected.spineColor ?? ""] ?? "bg-primary/30")} />

              <div className="p-4 space-y-4">
                {/* Cover + title */}
                <div className="flex gap-3">
                  <div className={cn("relative h-24 w-16 shrink-0 overflow-hidden rounded-lg border border-border/50 bg-secondary/40")}>
                    {selected.isbn ? (
                      <Image src={coverUrl(selected.isbn, "M")} alt={`${selected.title} cover`} fill sizes="64px" className="object-cover" />
                    ) : (
                      <div className={cn("absolute inset-0", SPINE_COLORS[selected.spineColor ?? ""] ?? "bg-secondary/60")} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="font-bold text-xs leading-snug tracking-tight">{selected.title}</h3>
                      <button onClick={() => handleSelect(null)} className="font-mono text-sm text-muted-foreground hover:text-primary shrink-0 leading-none">
                        ×
                      </button>
                    </div>
                    <p className="font-mono text-[10px] text-muted-foreground">{selected.author}</p>
                    {selected.year && <p className="font-mono text-[9px] text-muted-foreground/60">read {selected.year}</p>}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn("flex items-center gap-1 font-mono text-[9px]", statusConfig[selected.status].color)}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", statusConfig[selected.status].dot)} />
                        {selected.status === "want" ? "antilibrary" : selected.status}
                      </span>
                      <StarRating rating={selected.rating} />
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {selected.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                      className={cn(
                        "rounded-md border px-2 py-0.5 font-mono text-[9px] tracking-wider transition-colors",
                        tagFilter === tag ? "border-primary/50 bg-primary/10 text-primary" : "border-border/60 bg-secondary/40 text-muted-foreground hover:text-primary",
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Annotation */}
                <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5">
                  <p className="font-mono text-[9px] text-primary tracking-wider mb-1.5">Summary</p>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">{selected.annotation}</p>
                </div>

                {/* Dropdown toggle */}
                <button onClick={() => setShowDetails((d) => !d)} className="w-full flex items-center justify-between font-mono text-[9px] text-muted-foreground hover:text-primary transition-colors">
                  <span>key takeaways + quotes</span>
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", showDetails && "rotate-180")} />
                </button>

                {showDetails && (
                  <div className="space-y-4 border-t border-border/30 pt-3">
                    {/* Key Takeaways */}
                    <div>
                      <h4 className="font-mono text-[9px] tracking-widest text-muted-foreground mb-1.5 flex items-center gap-1">
                        <Lightbulb className="h-3 w-3 text-primary" /> Key Takeaways
                      </h4>
                      <ul className="space-y-1.5">
                        {(selected.keyTakeaways?.length ? selected.keyTakeaways : ["N/A"]).map((t, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs">
                            <span className="text-primary font-mono text-[10px] mt-0.5 shrink-0">{idx + 1}.</span>
                            <span className="text-muted-foreground leading-relaxed">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Favorite Quotes */}
                    <div>
                      <h4 className="font-mono text-[9px] tracking-widest text-muted-foreground mb-1.5 flex items-center gap-1">
                        <Quote className="h-3 w-3 text-primary" /> Favorite Quotes
                      </h4>
                      <div className="space-y-2">
                        {(selected.favoriteQuotes?.length ? selected.favoriteQuotes : ["N/A"]).map((q, idx) => (
                          <blockquote key={idx} className="pl-3 border-l-2 border-primary/40 text-xs italic text-muted-foreground leading-relaxed">
                            &ldquo;{q}&rdquo;
                          </blockquote>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/40 bg-card/20 p-6 text-center h-full min-h-[140px]">
              <span className="text-2xl">▣</span>
              <p className="font-mono text-[10px] text-muted-foreground">click a cover</p>
              <div className="mt-1 space-y-1">
                {STATUS_FILTERS.slice(1).map((s) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <span className={cn("h-1.5 w-1.5 rounded-full", statusConfig[s as ReadingStatus].dot)} />
                    <span className="font-mono text-[9px] text-muted-foreground">{statusConfig[s as ReadingStatus].label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
