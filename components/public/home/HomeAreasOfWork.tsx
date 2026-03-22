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
  colors?: FolderColors
}

type FolderColors = {
  tabBg: string
  tabBorder: string
  bodyBg: string
  bodyBorder: string
  flapBg: string
  flapBorder: string
  rimBg: string
  rimBorder: string
  labelBg: string
  labelBorder: string
  labelText: string
}

const DEFAULT_FOLDER_COLORS: FolderColors = {
  tabBg: "hsl(var(--card))",
  tabBorder: "hsl(var(--border) / 0.75)",
  bodyBg: "hsl(var(--card))",
  bodyBorder: "hsl(var(--border) / 0.75)",
  flapBg: "hsl(var(--card))",
  flapBorder: "hsl(var(--border) / 0.5)",
  rimBg: "hsl(var(--card) / 0.6)",
  rimBorder: "hsl(var(--border) / 0.4)",
  labelBg: "hsl(var(--primary) / 0.12)",
  labelBorder: "hsl(var(--primary) / 0.35)",
  labelText: "hsl(var(--primary))",
}

// Change folder colors here.
const FOLDER_COLOR_THEMES: Record<string, FolderColors> = {
  building: {
    tabBg: "hsl(30 74% 89%)",
    tabBorder: "hsl(30 54% 56% / 0.72)",
    bodyBg: "hsl(30 74% 93%)",
    bodyBorder: "hsl(30 48% 52% / 0.72)",
    flapBg: "hsl(30 68% 90%)",
    flapBorder: "hsl(30 50% 50% / 0.62)",
    rimBg: "hsl(30 50% 84% / 0.72)",
    rimBorder: "hsl(30 44% 49% / 0.46)",
    labelBg: "hsl(30 85% 55% / 0.16)",
    labelBorder: "hsl(30 78% 46% / 0.38)",
    labelText: "hsl(30 74% 29%)",
  },
  research: {
    tabBg: "hsl(152 42% 88%)",
    tabBorder: "hsl(152 33% 50% / 0.72)",
    bodyBg: "hsl(152 42% 92%)",
    bodyBorder: "hsl(152 32% 46% / 0.72)",
    flapBg: "hsl(152 38% 89%)",
    flapBorder: "hsl(152 31% 44% / 0.62)",
    rimBg: "hsl(152 28% 83% / 0.72)",
    rimBorder: "hsl(152 26% 42% / 0.46)",
    labelBg: "hsl(152 56% 42% / 0.16)",
    labelBorder: "hsl(152 52% 34% / 0.38)",
    labelText: "hsl(152 58% 24%)",
  },
  "behind-the-scenes": {
    tabBg: "hsl(272 42% 90%)",
    tabBorder: "hsl(272 30% 58% / 0.72)",
    bodyBg: "hsl(272 42% 94%)",
    bodyBorder: "hsl(272 28% 54% / 0.72)",
    flapBg: "hsl(272 38% 91%)",
    flapBorder: "hsl(272 28% 51% / 0.62)",
    rimBg: "hsl(272 24% 86% / 0.72)",
    rimBorder: "hsl(272 22% 50% / 0.46)",
    labelBg: "hsl(272 62% 58% / 0.16)",
    labelBorder: "hsl(272 52% 48% / 0.38)",
    labelText: "hsl(272 54% 31%)",
  },
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

const PREVIEW_LAYOUTS = {
  1: [{ x: 0, rotate: 0 }],
  2: [
    { x: -12, rotate: -6 },
    { x: 12, rotate: 6 },
  ],
  3: PREVIEW,
} as const

const FAN_LAYOUTS = {
  1: [{ rotate: 0, ty: -82, delay: 0 }],
  2: [
    { rotate: -9, ty: -80, delay: 0 },
    { rotate: 9, ty: -80, delay: 70 },
  ],
  3: FAN,
} as const

function Folder({ label, items = [], href, icon, colors }: FolderProps) {
  const [open, setOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const palette = colors ?? DEFAULT_FOLDER_COLORS
  const visibleItems = items.slice(0, 3)
  const itemCount = visibleItems.length
  const previewSlots = itemCount > 0 ? PREVIEW_LAYOUTS[itemCount as 1 | 2 | 3] : []
  const fanSlots = itemCount > 0 ? FAN_LAYOUTS[itemCount as 1 | 2 | 3] : []
  const topIndex = itemCount === 2 ? 1 : Math.floor(itemCount / 2)

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
        {/* Tab - top-left bump */}
        <div
          className="absolute left-0 rounded-t-xl border border-b-0 bg-card"
          style={{
            bottom: 118,
            height: 18,
            width: 60,
            backgroundColor: palette.tabBg,
            borderColor: palette.tabBorder,
          }}
        />

        {/* Folder body (back layer) */}
        <div
          className="absolute bottom-0 inset-x-0 rounded-2xl rounded-tl-none border"
          style={{
            height: 118,
            backgroundColor: palette.bodyBg,
            borderColor: palette.bodyBorder,
          }}
        />

        {/* Tiny preview cards peeking from behind the flap when closed */}
        {previewSlots.map(({ x, rotate }, i) => {
          const item = visibleItems[i]
          const previewZIndex = i === topIndex ? 30 : 24 + i
          return (
            <div
              key={`preview-${i}`}
              className="absolute overflow-hidden rounded-lg border border-border/60 bg-secondary shadow-sm"
              style={{
                width: 72,
                height: 72,
                left: "50%",
                marginLeft: -36,
                bottom: 88,
                zIndex: previewZIndex,
                pointerEvents: "none",
                willChange: "transform, opacity",
                opacity: open ? 0 : 1,
                transform: open
                  ? `translateX(${x}px) translateY(-8px) rotate(${rotate}deg) scale(0.9)`
                  : `translateX(${x}px) translateY(0px) rotate(${rotate}deg) scale(1)`,
                transition: `opacity ${open ? 180 : 260}ms ${CLOSE_EASE}, transform ${open ? 260 : 340}ms ${open ? OPEN_EASE : CLOSE_EASE}`,
              }}
            >
              {item?.src && (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              )}
            </div>
          )
        })}

        {/* Folder front flap - opens outward toward the viewer */}
        <div
          className="absolute inset-x-0 overflow-hidden rounded-2xl rounded-tl-none border"
          style={{
            height: 108,
            bottom: 10,
            zIndex: 36,
            willChange: "transform, box-shadow",
            transformOrigin: "50% 100%",
            backgroundColor: palette.flapBg,
            borderColor: palette.flapBorder,
            boxShadow: open ? "0 16px 28px hsl(var(--foreground) / 0.16)" : "0 2px 6px hsl(var(--foreground) / 0.06)",
            transform: open ? "translateY(-7px) rotateX(-74deg)" : "translateY(0px) rotateX(0deg)",
            transition: `transform ${open ? 560 : 380}ms ${open ? OPEN_EASE : CLOSE_EASE}, box-shadow 320ms ${CLOSE_EASE}`,
            pointerEvents: "none",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: palette.flapBg }} />
          {icon && <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">{icon}</div>}
        </div>

        {/* Item cards - live above the folder body via z-index */}
        {fanSlots.map(({ rotate, ty, delay }, i) => {
          const item = visibleItems[i]
          const reverseDelay = (fanSlots.length - 1 - i) * 45
          const moveDuration = open ? 520 : 360
          const fadeDuration = open ? 280 : 220
          const staggerDelay = open ? delay : reverseDelay
          const fanZIndex = i === topIndex ? 30 : 20 + i
          return (
            <div
              key={i}
              className="absolute overflow-hidden rounded-xl border border-border/60 bg-secondary/60 shadow-md"
              style={{
                width: 96,
                height: 96,
                left: "50%",
                marginLeft: -48,
                bottom: 22,
                zIndex: fanZIndex,
                transformOrigin: "50% 100%",
                willChange: "transform, opacity",
                opacity: open ? 1 : 0,
                transform: open
                  ? `rotate(${rotate}deg) translateY(${ty}px) scale(1)`
                  : `rotate(0deg) translateY(8px) scale(0.56)`,
                transition: `transform ${moveDuration}ms ${open ? OPEN_EASE : CLOSE_EASE} ${staggerDelay}ms, opacity ${fadeDuration}ms ${CLOSE_EASE} ${staggerDelay}ms`,
              }}
            >
              {item?.src && (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              )}
            </div>
          )
        })}

        {/* Folder back rim - subtle depth strip at the top of the body */}
        <div
          className="absolute inset-x-0 rounded-2xl rounded-tl-none border-x border-t"
          style={{
            bottom: 108,
            height: 14,
            zIndex: 5,
            backgroundColor: palette.rimBg,
            borderColor: palette.rimBorder,
          }}
        />
      </div>

      {/* Label pill */}
      <span
        className="rounded-full border px-4 py-1.5 font-mono text-xs font-medium tracking-wide"
        style={{
          backgroundColor: palette.labelBg,
          borderColor: palette.labelBorder,
          color: palette.labelText,
        }}
      >
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
    id: "building-designing",
    label: "Building & Designing",
    // href: "/projects",
    colors: FOLDER_COLOR_THEMES.building,
    items: [
      { src: "/tools/framer.svg", alt: "Framer logo" },
      { src: "/tools/figma.svg", alt: "Figma logo" },
      { src: "/tools/spline.svg", alt: "Spline logo" },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 16 L16 11 L21 16 L16 21 Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },

  {
    id: "research",
    label: "Research",
    // href: "/experiences",
    colors: FOLDER_COLOR_THEMES.research,
    items: [
      // { src: "/logos/ucr.svg", alt: "UCR research logo" },
      { src: "/logos/nasa.svg", alt: "NASA research logo" },
      // { src: "/logos/acm.svg", alt: "ACM research logo" },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="14" cy="14" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M19 19 L25 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },

  {
    id: "behind-the-scenes",
    label: "Behind the Scenes",
    // href: "/behind-the-scenes",
    colors: FOLDER_COLOR_THEMES["behind-the-scenes"],
    items: [
      { src: "/logos/notion.svg", alt: "Behind the scenes logo" },
      { src: "/logos/nasa.svg", alt: "Behind the scenes logo" },
      { src: "/logos/acm.svg", alt: "Behind the scenes logo" },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="22" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="22" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 12 L19 12 M18 13 L14 20 M14 13 L18 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export function AreasOfWork() {
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
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Areas of Work ‧₊ ♪˚⊹</h2>
          {/* <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Hover a folder to peek inside.
          </p> */}
        </div>

        <div className="flex flex-wrap justify-start gap-14 sm:gap-30">
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
                colors={folder.colors}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
