"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { ExternalLink, Github, Sparkles } from "lucide-react"
import { projects } from "@/lib/projects-data"
import { TechIcon } from "@/components/TechStackIcons"

export function FeaturedProjects() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const featuredProjects = projects.filter((p) => p.featured)
  if (featuredProjects.length === 0) return null

  return (
    <section ref={sectionRef} className="border-t border-border/30 px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-10 sm:mb-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between opacity-0", isVisible && "animate-fade-in-up")}>
          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">spotlight;</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Featured Builds ★</h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            View all projects
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="space-y-6">
          {featuredProjects.map((featured, index) => (
            <article
              key={featured.id}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-primary/30 bg-linear-to-br from-primary/8 via-card/50 to-primary/8 glass hover-lift transition-all duration-400 opacity-0",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className="grid sm:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-video sm:aspect-auto min-h-64 overflow-hidden border-b sm:border-b-0 sm:border-r border-border/60 bg-secondary/35">
                  {featured.thumbnailSrc ? (
                    <Image
                      src={featured.thumbnailSrc}
                      alt={featured.thumbnailAlt || `${featured.title} thumbnail`}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground">cover image coming soon</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-7 sm:p-10">
                  <div>
                    <div className="mb-4 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5 w-fit animate-pulse-glow">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      <span className="font-mono text-[10px] font-medium tracking-wider text-primary">featured</span>
                    </div>
                    <div className="mb-3 font-mono text-xs text-muted-foreground">{featured.year}</div>
                    <h3 className="mb-3 text-2xl font-bold tracking-tight transition-all duration-300 group-hover:text-gradient">
                      {featured.title}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                      {featured.description}
                    </p>
                    <div className="mb-6 flex flex-wrap items-center gap-2">
                      {featured.tags.map((tag) => (
                        <TechIcon key={tag} tag={tag} />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    {featured.hasCaseStudy && (
                      <Link
                        href={`/projects/${featured.slug}`}
                        className="group/link flex items-center gap-2 font-mono text-xs text-primary transition-all duration-300 hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                        <span className="underline-animate">Case Study</span>
                      </Link>
                    )}
                    {featured.url.trim() && (
                      <a
                        href={featured.url.trim()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-2 font-mono text-xs text-muted-foreground transition-all duration-300 hover:text-primary"
                      >
                        <Github className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                        <span className="underline-animate">GitHub</span>
                      </a>
                    )}
                    {featured.homepage.trim() && (
                      <a
                        href={featured.homepage.trim()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link flex items-center gap-2 font-mono text-xs text-primary transition-all duration-300 hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110 group-hover/link:rotate-12" />
                        <span className="underline-animate">Live</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}