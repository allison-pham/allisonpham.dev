"use client"
import { getToolIcon } from "@/src/lib/core-features/tool-icons-data"
import { useState } from "react"
import { cn } from "@/src/lib/core-features/utils"

export function ToolIcons({ name }: { name: string }) {
  const entry = getToolIcon(name)
  const [tapped, setTapped] = useState(false)

  if (!entry) {
    return (
      <span className="rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground transition-colors hover:border-primary/50 hover:bg-primary/10">
        {name}
      </span>
    )
  }

  return (
    <div
      className="group/icon relative"
      onClick={() => setTapped((p) => !p)}
      onMouseLeave={() => setTapped(false)}
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-md transition-transform duration-200 hover:scale-110">
        <img
          src={entry.icon}
          alt={name}
          width={18}
          height={18}
          className="object-contain"
          loading="lazy"
        />
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-20 -translate-x-1/2 transition-all duration-150",
          "opacity-0 translate-y-1",
          "group-hover/icon:opacity-100 group-hover/icon:translate-y-0",
          tapped && "opacity-100 translate-y-0",
        )}
      >
        <div className="whitespace-nowrap rounded-md border border-border/60 bg-popover px-2 py-1 font-mono text-[10px] text-popover-foreground shadow-md">
          {name}
        </div>
        <div className="mx-auto mt-0.5 h-1.5 w-1.5 rotate-45 border-b border-r border-border/60 bg-popover" />
      </div>
    </div>
  )
}