"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ArrowLeft, Calendar, Bookmark, Twitter, Linkedin, Link2, ChevronUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog/types"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface BlogPostContentProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export function BlogPostContent({ post, relatedPosts }: BlogPostContentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [copied, setCopied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-20 sm:pt-28 pb-8 sm:pb-10 border-b border-border/30">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30 pointer-events-none", post.color)} />
        <div className="mx-auto max-w-4xl relative z-10">
          {/* Back Link */}
          <Link
            href="/blog"
            className={cn(
              "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group opacity-0",
              isVisible && "animate-fade-in-up",
            )}
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-mono">back to blog</span>
          </Link>

          {/* Category & Meta */}
          <div
            className={cn("flex flex-wrap items-center gap-3 mb-6 opacity-0", isVisible && "animate-fade-in-up")}
            style={{ animationDelay: "100ms" }}
          >
            <span className="rounded-lg border border-primary/50 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary tracking-wider">
              {post.category}
            </span>
            {post.featured && (
              <span className="rounded-lg border border-amber-500/50 bg-amber-500/10 px-3 py-1.5 font-mono text-xs text-amber-400">
                featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "150ms" }}
          >
            <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">{post.title}</span>
          </h1>

          {/* Excerpt */}
          <p
            className={cn(
              "text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "200ms" }}
          >
            {post.excerpt}
          </p>

          {/* Author & Meta Row
          <div
            className={cn(
              "flex flex-wrap items-center justify-between gap-6 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "250ms" }}
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-border">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback className="bg-secondary font-mono">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div> */}

          {/* Date & Tags */}
          <div
            className={cn("flex flex-col gap-3 mt-5 opacity-0", isVisible && "animate-fade-in-up")}
            style={{ animationDelay: "250ms" }}
          >
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-secondary/60 border border-border/50 px-3 py-1 font-mono text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="px-4 sm:px-6">
          <div className="mx-auto max-w-4xl -mt-1">
            <div className="relative aspect-[2/1] w-full overflow-hidden rounded-b-2xl border border-border/40 border-t-0">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <section className="px-4 sm:px-6 pt-8 sm:pt-10 pb-12 sm:pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            {/* Main Content */}
            <article
              ref={contentRef}
              className={cn(
                "max-w-none opacity-0",
                "[&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-foreground sm:[&_h1]:text-4xl",
                "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground",
                "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground",
                "[&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:my-4",
                "[&_a]:text-primary [&_a]:no-underline hover:[&_a]:underline",
                "[&_strong]:font-semibold [&_strong]:text-foreground",
                "[&_code]:rounded [&_code]:bg-secondary/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-primary",
                "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border/50 [&_pre]:bg-card/80 [&_pre]:p-4",
                "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
                "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted-foreground",
                "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-muted-foreground",
                "[&_li]:my-1 [&_li::marker]:text-primary",
                "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-l-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: "350ms" }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
            </article>

            {/* Sticky Share Sidebar
            <aside
              className={cn("hidden lg:block opacity-0", isVisible && "animate-fade-in-up")}
              style={{ animationDelay: "400ms" }}
            >
              <div className="sticky top-32 flex flex-col gap-3">
                <span className="font-mono text-xs text-muted-foreground mb-2 text-center">share</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10 bg-transparent"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
                      "_blank",
                    )
                  }
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10 bg-transparent"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10",
                    copied && "border-primary/50 bg-primary/10",
                  )}
                  onClick={handleCopyLink}
                >
                  <Link2 className="h-4 w-4" />
                  <span className="sr-only">Copy link</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-lg border-border/50 hover:border-primary/50 hover:bg-primary/10 bg-transparent"
                >
                  <Bookmark className="h-4 w-4" />
                  <span className="sr-only">Bookmark</span>
                </Button>
              </div>
            </aside> */}
          </div>

          {/* Mobile Share Bar */}
          <div
            className={cn(
              "lg:hidden flex items-center justify-center gap-4 mt-12 pt-8 border-t border-border/30 opacity-0",
              isVisible && "animate-fade-in-up",
            )}
            style={{ animationDelay: "450ms" }}
          >
            <span className="font-mono text-xs text-muted-foreground">share:</span>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-border/50 bg-transparent"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
                  "_blank",
                )
              }
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-lg border-border/50 bg-transparent"
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                  "_blank",
                )
              }
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn("h-9 w-9 rounded-lg border-border/50", copied && "border-primary/50 bg-primary/10")}
              onClick={handleCopyLink}
            >
              <Link2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-border/50 bg-transparent">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <span className="inline-block rounded-lg border border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs tracking-wider text-muted-foreground mb-4">
                Related Posts
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Continue <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">Reading</span>
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-5 transition-all duration-300 hover:border-primary/40 hover:bg-card/60 hover-lift opacity-0",
                    isVisible && "animate-fade-in-up",
                  )}
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      relatedPost.color,
                    )}
                  />
                  <div className="relative z-10">
                    <span className="inline-block rounded-md bg-secondary/60 px-2 py-1 font-mono text-[10px] text-muted-foreground mb-3">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-gradient transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{relatedPost.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{relatedPost.date}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full border border-border bg-card/90 glass backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:border-primary/50 hover:bg-card",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        )}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </>
  )
}


