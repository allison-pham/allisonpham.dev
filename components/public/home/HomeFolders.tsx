"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type FolderItem = {
  src?: string
  alt: string
}

type FolderProps = {
  label: string
  items?: FolderItem[]
  href?: string
  icon?: React.ReactNode
}

// [left item, center item, right item]
const FAN = [
  { rotate: -14, ty: -76, delay: 0 },
  { rotate: 1, ty: -86, delay: 65 },
  { rotate: 15, ty: -74, delay: 130 },
] as const

const OPEN_EASE = "cubic-bezier(0.22, 1, 0.36, 1)"
const CLOSE_EASE = "cubic-bezier(0.4, 0, 0.2, 1)"
const PREVIEW = [
  { x: -20, rotate: -9 },
  { x: 0, rotate: 0 },
  { x: 20, rotate: 9 },
] as const

function Folder({ label, items = [], href, icon }: FolderProps) {
  const [open, setOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const handleOpen = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setOpen(true)
  }

  const handleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = setTimeout(() => {
      setOpen(false)
      closeTimerRef.current = null
    }, 80)
  }

  const inner = (
    <div
      className="flex cursor-pointer flex-col items-center gap-4"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      {/* Folder shell */}
      <div className="relative" style={{ width: 172, height: 152, perspective: "1000px" }}>
        {/* Tab — top-left bump */}
        <div
          className="absolute left-0 rounded-t-xl border border-b-0 bg-card"
          style={{
            bottom: 118,
            height: 18,
            width: 60,
            borderColor: "hsl(var(--border) / 0.75)",
          }}
        />

        {/* Folder body (back layer) */}
        <div
          className="absolute bottom-0 inset-x-0 rounded-2xl rounded-tl-none border"
          style={{
            height: 118,
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border) / 0.75)",
          }}
        />

        {/* Tiny preview cards peeking from behind the flap when closed */}
        {PREVIEW.map(({ x, rotate }, i) => {
          const item = items[i]
          return (
            <div
              key={`preview-${i}`}
              className="absolute overflow-hidden rounded-lg border border-border/60 bg-secondary shadow-sm"
              style={{
                width: 66,
                height: 48,
                left: "50%",
                marginLeft: -33,
                bottom: 88,
                zIndex: 24 + i,
                pointerEvents: "none",
                willChange: "transform, opacity",
                opacity: open ? 0 : 1,
                transform: open
                  ? `translateX(${x}px) translateY(-8px) rotate(${rotate}deg) scale(0.9)`
                  : `translateX(${x}px) translateY(0px) rotate(${rotate}deg) scale(1)`,
                transition: `opacity ${open ? 180 : 260}ms ${CLOSE_EASE}, transform ${open ? 260 : 340}ms ${open ? OPEN_EASE : CLOSE_EASE}`,
              }}
            >
              {item?.src ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="54px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-secondary/85" />
              )}
            </div>
          )
        })}

        {/* Folder front flap — opens outward toward the viewer */}
        <div
          className="absolute inset-x-0 overflow-hidden rounded-2xl rounded-tl-none border"
          style={{
            height: 108,
            bottom: 10,
            zIndex: 36,
            willChange: "transform, box-shadow",
            transformOrigin: "50% 100%",
            backgroundColor: "hsl(var(--card))",
            borderColor: "hsl(var(--border) / 0.5)",
            boxShadow: open ? "0 16px 28px hsl(var(--foreground) / 0.16)" : "0 2px 6px hsl(var(--foreground) / 0.06)",
            transform: open ? "translateY(-7px) rotateX(-74deg)" : "translateY(0px) rotateX(0deg)",
            transition: `transform ${open ? 560 : 380}ms ${open ? OPEN_EASE : CLOSE_EASE}, box-shadow 320ms ${CLOSE_EASE}`,
            pointerEvents: "none",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-card to-card" />
          {icon && <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">{icon}</div>}
        </div>

        {/* Item cards — live above the folder body via z-index */}
        {FAN.map(({ rotate, ty, delay }, i) => {
          const item = items[i]
          const reverseDelay = (FAN.length - 1 - i) * 45
          const moveDuration = open ? 520 : 360
          const fadeDuration = open ? 280 : 220
          const staggerDelay = open ? delay : reverseDelay
          return (
            <div
              key={i}
              className="absolute overflow-hidden rounded-xl border border-border/60 bg-secondary/60 shadow-md"
              style={{
                width: 96,
                height: 74,
                left: "50%",
                marginLeft: -48,
                bottom: 22,
                zIndex: 20 + i,
                transformOrigin: "50% 100%",
                willChange: "transform, opacity",
                opacity: open ? 1 : 0,
                transform: open
                  ? `rotate(${rotate}deg) translateY(${ty}px) scale(1)`
                  : `rotate(0deg) translateY(8px) scale(0.56)`,
                transition: `transform ${moveDuration}ms ${open ? OPEN_EASE : CLOSE_EASE} ${staggerDelay}ms, opacity ${fadeDuration}ms ${CLOSE_EASE} ${staggerDelay}ms`,
              }}
            >
              {item?.src ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-secondary/80" />
              )}
            </div>
          )
        })}

        {/* Folder back rim — subtle depth strip at the top of the body */}
        <div
          className="absolute inset-x-0 rounded-2xl rounded-tl-none border-x border-t"
          style={{
            bottom: 108,
            height: 14,
            zIndex: 5,
            backgroundColor: "hsl(var(--card) / 0.6)",
            borderColor: "hsl(var(--border) / 0.4)",
          }}
        />
      </div>

      {/* Label pill */}
      <span className="rounded-full border border-primary/35 bg-primary/12 px-4 py-1.5 font-mono text-xs font-medium tracking-wide text-primary">
        {label}
      </span>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="no-underline">
        {inner}
      </Link>
    )
  }
  return inner
}

const folders: Array<FolderProps & { id: string }> = [
  {
    id: "designing",
    label: "Designing",
    href: "/projects",
    items: [
      { src: "/logos/notion.svg", alt: "Notion logo" },
      { src: "/logos/acm.svg", alt: "ACM logo" },
      { src: "/logos/cutie-hack.svg", alt: "Cutie Hack logo" },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 16 L16 11 L21 16 L16 21 Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "building",
    label: "Building",
    href: "/lab",
    items: [
      { src: "/logos/nasa.svg", alt: "NASA logo" },
      { src: "/logos/ucr.svg", alt: "UCR logo" },
      { src: "/logos/nucleo.svg", alt: "Nucleo logo" },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="8" y="14" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 14 V10 a4 4 0 0 1 8 0 V14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "researching",
    label: "Researching",
    href: "/experiences",
    items: [
      { src: "/logos/nasa.svg", alt: "NASA research logo" },
      { src: "/logos/ucr.svg", alt: "UCR research logo" },
      { src: "/logos/acm.svg", alt: "ACM research logo" },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="14" cy="14" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M19 19 L25 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "writing",
    label: "Writing",
    href: "/journal",
    items: [
      { src: "/logos/notion.svg", alt: "Notion writing logo" },
      { src: "/logos/citrus-hack.svg", alt: "Citrus Hack writing logo" },
      { src: "/logos/cutie-hack.svg", alt: "Cutie Hack writing logo" },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M10 22 L22 10 M19 9 L23 13 M9 19 L13 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 24 L10 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function HomeFolders() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="border-t border-border/30 px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className={cn("mb-12 space-y-3 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] sm:tracking-[0.35em] text-primary">explore;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Areas of Work ✦</h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Hover a folder to peek inside.
          </p>
        </div>

        <div className="flex flex-wrap justify-start gap-10 sm:gap-14">
          {folders.map((folder, i) => (
            <div
              key={folder.id}
              className={cn("opacity-0", isVisible && "animate-fade-in-up")}
              style={{ animationDelay: `${i * 80 + 200}ms` }}
            >
              <Folder
                label={folder.label}
                href={folder.href}
                items={folder.items}
                icon={folder.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
