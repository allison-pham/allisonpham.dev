"use client"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/src/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { BlogPost } from "@/src/lib/blog/types"

interface BlogListProps {
  posts: BlogPost[]
}

export function List({ posts }: BlogListProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="min-w-0 space-y-4">
      {posts.map((post, index) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className={cn(
            "group relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 rounded-xl border border-border/60 bg-card/40 glass p-6 sm:p-7 hover-lift transition-all duration-400 hover:border-primary/40 opacity-0",
            isVisible && "animate-fade-in-up",
            post.featured && "border-primary/20",
          )}
          style={{ animationDelay: `${index * 100 + 100}ms` }}
        >
          {/* Index number */}
          <span className="hidden sm:block font-mono text-3xl font-bold text-primary/15 select-none shrink-0 leading-none mt-0.5 transition-colors group-hover:text-primary/30">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Content */}
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="rounded-md border border-border/80 bg-secondary/60 px-2 py-0.5 font-mono text-[10px] text-secondary-foreground">
                {post.category}
              </span>
              {post.featured && (
                <span className="rounded-md border border-primary/50 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary">
                  featured
                </span>
              )}
              <span className="font-mono text-xs text-muted-foreground/60">{post.date}</span>
            </div>

            <h2 className="font-bold tracking-tight text-base sm:text-lg transition-colors group-hover:text-primary">
              {post.title}
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-secondary/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <ArrowRight className="hidden sm:block h-4 w-4 text-muted-foreground/40 shrink-0 mt-1 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1" />

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full rounded-b-xl" />
        </Link>
      ))}
    </div>
  )
}