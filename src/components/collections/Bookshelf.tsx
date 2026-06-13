"use client"
import Image from "next/image"
import { books, allBookTags, statusConfig, coverUrl, type ReadingStatus } from "@/src/lib/bookshelf-data"
import { cn } from "@/src/lib/core-features/utils"
import { Star } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const STATUS_FILTERS: Array<ReadingStatus | "all"> = ["all", "read", "reading", "want"]

function StarRating({ rating }: { rating?: number }) {
  if (!rating) return null
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn("h-2.5 w-2.5", i < rating ? "fill-primary text-primary" : "text-border")} />
      ))}
    </div>
  )
}

export function Bookshelf() {
  const [isVisible, setIsVisible] = useState(false)
  const [statusFilter, setStatusFilter] = useState<ReadingStatus | "all">("all")
  const [tagFilter, setTagFilter] = useState<string | null>(null)
  const [selected, setSelected] = useState<typeof books[0] | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const filtered = books.filter((b) =>
    (statusFilter === "all" || b.status === statusFilter) &&
    (!tagFilter || b.tags.includes(tagFilter))
  )

  return (
    <section ref={sectionRef} className="overflow-x-clip px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-10 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">reading shelf;</p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Bookshelf</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">Books that changed how I think</p>
        </div>

        <div className={cn("mb-8 flex flex-wrap gap-4 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "80ms" }}>
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={cn("flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all active:scale-[0.98]",
                  statusFilter === s ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground hover:border-foreground/40")}>
                {s !== "all" && <span className={cn("h-1.5 w-1.5 rounded-full", statusConfig[s as ReadingStatus].dot)} />}
                {s === "all" ? "all" : statusConfig[s as ReadingStatus].label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {allBookTags.map((tag) => (
              <button key={tag} onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                className={cn("rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider transition-all",
                  tagFilter === tag ? "border-primary/50 bg-primary/10 text-primary" : "border-border/60 bg-secondary/30 text-muted-foreground hover:border-primary/30")}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
              {filtered.map((book, i) => (
                <button key={book.id} onClick={() => setSelected(selected?.id === book.id ? null : book)}
                  className={cn(
                    "group relative flex flex-col gap-2 rounded-lg transition-all duration-300 opacity-0",
                    isVisible && "animate-fade-in-up",
                  )}
                  style={{ animationDelay: `${i * 40 + 120}ms` }}>
                  <div className={cn(
                    "relative aspect-[2/3] w-full overflow-hidden rounded-lg border bg-secondary/40 transition-all duration-300",
                    selected?.id === book.id
                      ? "border-primary shadow-lg shadow-primary/20 scale-[1.06] -translate-y-1.5"
                      : "border-border/50 group-hover:border-primary/50 group-hover:scale-[1.06] group-hover:-translate-y-1.5 group-hover:shadow-lg group-hover:shadow-primary/15",
                  )}>
                    <Image
                      src={coverUrl(book.isbn, "M")}
                      alt={`${book.title} cover`}
                      fill
                      sizes="(min-width: 1024px) 12vw, (min-width: 640px) 18vw, 30vw"
                      className="object-cover"
                    />
                    <div className={cn("absolute right-1.5 top-1.5 h-2 w-2 rounded-full ring-2 ring-background", statusConfig[book.status].dot)} />
                  </div>
                  <p className={cn(
                    "line-clamp-2 text-center font-mono text-[9px] leading-tight transition-colors",
                    selected?.id === book.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                  )}>
                    {book.title}
                  </p>
                </button>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <p className="font-mono text-sm text-muted-foreground">No books match those filters.</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {selected ? (
              <div className="rounded-xl border border-primary/30 bg-card/40 glass p-6 space-y-4 animate-fade-in-up sticky top-24">
                <div className="flex gap-4">
                  <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg border border-border/50 bg-secondary/40">
                    <Image src={coverUrl(selected.isbn, "M")} alt={`${selected.title} cover`} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn("flex items-center gap-1.5 font-mono text-[9px]", statusConfig[selected.status].color)}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", statusConfig[selected.status].dot)} />
                        {statusConfig[selected.status].label}
                      </span>
                      <button onClick={() => setSelected(null)} className="font-mono text-xs text-muted-foreground hover:text-primary">×</button>
                    </div>
                    <h3 className="font-bold leading-tight tracking-tight text-foreground">{selected.title}</h3>
                    <p className="font-mono text-xs text-muted-foreground">{selected.author}</p>
                    {selected.year && <p className="font-mono text-[10px] text-muted-foreground">read {selected.year}</p>}
                    <StarRating rating={selected.rating} />
                  </div>
                </div>
                <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                  <p className="text-sm leading-relaxed text-muted-foreground italic">{selected.annotation}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => (
                    <button key={tag} onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                      className={cn("rounded-md border px-2 py-0.5 font-mono text-[9px] tracking-wider transition-colors",
                        tagFilter === tag ? "border-primary/50 bg-primary/10 text-primary" : "border-border/60 bg-secondary/40 text-muted-foreground hover:text-primary")}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border/40 bg-card/20 p-10 text-center sticky top-24">
                <span className="text-3xl">▣</span>
                <p className="font-mono text-xs text-muted-foreground">click a cover to read the annotation</p>
                <div className="mt-2 space-y-1.5">
                  {STATUS_FILTERS.slice(1).map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <span className={cn("h-2 w-2 rounded-full", statusConfig[s as ReadingStatus].dot)} />
                      <span className="font-mono text-[10px] text-muted-foreground">{statusConfig[s as ReadingStatus].label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}