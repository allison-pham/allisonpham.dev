"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function DevAutoRefresh() {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return

    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        router.refresh()
      }
    }, 1200)

    return () => window.clearInterval(id)
  }, [router])

  return null
}
