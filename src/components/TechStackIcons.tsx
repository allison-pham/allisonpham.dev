"use client"
import { getTechIcon } from "@/src/lib/tech-stack-icons"

export function TechIcon({ tag }: { tag: string }) {
  const entry = getTechIcon(tag)

  if (!entry) {
    return (
      <span className="rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground transition-colors hover:border-primary/50 hover:bg-primary/10">
        {tag}
      </span>
    )
  }

  return (
    <div className="group/icon relative">
      <div className="flex h-7 w-7 items-center justify-center rounded-md transition-transform duration-200 hover:scale-110">
        <img
          src={entry.icon}
          alt={tag}
          width={18}
          height={18}
          className="object-contain"
          loading="lazy"
        />
      </div>

      <div className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-20 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-150 group-hover/icon:translate-y-0 group-hover/icon:opacity-100">
        <div className="whitespace-nowrap rounded-md border border-border/60 bg-popover px-2 py-1 font-mono text-[10px] text-popover-foreground shadow-md">
          {tag}
        </div>
        <div className="mx-auto mt-0.5 h-1.5 w-1.5 rotate-45 border-b border-r border-border/60 bg-popover" />
      </div>
    </div>
  )
}