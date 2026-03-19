"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Github, Linkedin, ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "about", href: "/about" },
  { label: "experiences", href: "/experiences" },
  { label: "projects", href: "/projects" },
  { label: "blog", href: "/blog" },
  { label: "lab", href: "/lab" },
]

const moreNavItems = [
  { label: "collections", href: "/collections" },
  { label: "timeline", href: "/timeline" },
]

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/imallisonpham", handle: "imallisonpham", icon: Linkedin },
  { label: "GitHub", href: "https://github.com/allison-pham", handle: "@allison-pham", icon: Github },
]

export function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const moreCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()

  const handleMoreEnter = () => {
    if (moreCloseTimer.current) clearTimeout(moreCloseTimer.current)
    setIsMoreOpen(true)
  }

  const handleMoreLeave = () => {
    moreCloseTimer.current = setTimeout(() => setIsMoreOpen(false), 200)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isMobileMenuOpen
          ? "border-b border-border/50 bg-background shadow-sm"
          : isScrolled
            ? "border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm"
            : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-primary/35 bg-card/80 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/website-logo.svg"
                alt="Allison Pham logo"
                fill
                sizes="32px"
                className="object-contain p-1"
                priority
              />
            </span>
            <span className="bg-linear-to-l from-primary/50 to-accent bg-clip-text text-transparent font-semibold">
              Allison Pham
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href || (item.href.startsWith("/#") && pathname === "/")
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2.5 font-mono text-xs tracking-widest transition-all duration-300 rounded-lg hover:bg-secondary/50",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                    hoveredIndex === index && "text-foreground",
                  )}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span
                    className={cn(
                      "absolute left-1.5 text-primary transition-all duration-200 opacity-0 -translate-x-2",
                      (hoveredIndex === index || isActive) && "opacity-100 translate-x-0",
                    )}
                  >
                    {">"}
                  </span>
                  <span className={cn("transition-transform duration-200", (hoveredIndex === index || isActive) && "translate-x-2")}>
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300",
                      hoveredIndex === index || isActive ? "w-6" : "w-0",
                    )}
                  />
                </Link>
              )
            })}

            {/* More Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMoreEnter}
              onMouseLeave={handleMoreLeave}
            >
              <button
                className={cn(
                  "relative flex items-center gap-1 px-4 py-2.5 font-mono text-xs tracking-widest transition-all duration-300 rounded-lg hover:bg-secondary/50",
                  isMoreOpen
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                <span>more</span>
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isMoreOpen && "rotate-180")} />
              </button>

              <div
                className={cn(
                  "absolute top-full right-0 mt-2 min-w-40 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-xl overflow-hidden transition-all duration-200",
                  isMoreOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
                )}
              >
                {moreNavItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 font-mono text-xs tracking-widest transition-all duration-200 hover:bg-secondary/50",
                        isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span className="text-primary">{">"}</span>
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">

            <div className="hidden items-center gap-1 sm:flex">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-all duration-300 hover:text-primary hover:bg-primary/10"
                >
                  <link.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-card border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-bottom-9 pointer-events-none shadow-lg">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            <div className="hidden h-5 w-px bg-border sm:block" />

            <div className="hidden items-center gap-2.5 font-mono text-xs text-muted-foreground sm:flex px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>♡: engineering & designing</span>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/50 md:hidden transition-colors hover:bg-secondary"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <div
          className={cn(
            "rounded-b-xl border border-border/50 bg-background shadow-lg transition-all duration-400 md:hidden",
            isMobileMenuOpen
              ? "max-h-[65vh] overflow-y-auto overscroll-contain opacity-100 pt-4"
              : "max-h-0 overflow-hidden opacity-0",
          )}
        >
          <div className="flex flex-col gap-1 border-t border-border/50 pt-4">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3.5 font-mono text-sm tracking-widest transition-all duration-200 active:bg-secondary hover:bg-secondary/50",
                    isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-primary">{">"}</span>
                  {item.label}
                </Link>
              )
            })}

            {/* More section divider */}
            <div className="px-4 pt-4 pb-2">
              <p className="font-mono text-xs text-muted-foreground tracking-widest">more</p>
            </div>

            {moreNavItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3.5 font-mono text-sm tracking-widest transition-all duration-200 active:bg-secondary hover:bg-secondary/50",
                    isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground",
                  )}
                  style={{ animationDelay: `${(navItems.length + index) * 50}ms` }}
                >
                  <span className="text-primary">{">"}</span>
                  {item.label}
                </Link>
              )
            })}

            <div className="mt-4 grid gap-2 border-t border-border/50 pt-4 px-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2.5 text-muted-foreground transition-colors active:bg-secondary hover:border-primary/50 hover:text-primary hover:bg-primary/10"
                >
                  <div className="flex items-center gap-2.5">
                    <link.icon className="h-4 w-4" />
                    <span className="font-mono text-xs tracking-widest">{link.label}</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{link.handle}</span>
                </a>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2.5 px-4 py-3 font-mono text-xs text-muted-foreground bg-secondary/30 rounded-lg mx-4 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>status: building</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}