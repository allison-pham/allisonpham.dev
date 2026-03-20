"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  Camera, Calendar, MapPin, X, ChevronLeft, ChevronRight,
  Heart, MessageCircle, Share2
} from "lucide-react"

interface Photo {
  id: string
  src: string
  alt: string
  aspectRatio: "square" | "portrait" | "landscape"
}

interface PhotoDump {
  id: string
  title: string
  date: string
  location?: string
  description: string
  photos: Photo[]
  mood?: string
}

const photoDumps: PhotoDump[] = [
  {
    id: "food-drink-moments",
    title: "Food & Drink Moments",
    date: "2024-26",
    description: "A collection of food & drink experiences over the past few years",
    mood: "cozy",
    photos: [
      { id: "c1", src: "/placeholder.svg", alt: "", aspectRatio: "square" },
      { id: "c2", src: "/placeholder.svg", alt: "", aspectRatio: "landscape" },
      { id: "c3", src: "/placeholder.svg", alt: "", aspectRatio: "portrait" },
      { id: "c4", src: "/placeholder.svg", alt: "", aspectRatio: "square" },
    ],
  },
]

export function PhotoDumps() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedDump, setSelectedDump] = useState<PhotoDump | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Close lightbox on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null)
        setSelectedDump(null)
      }
      if (lightboxIndex !== null && selectedDump) {
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) => prev !== null ? (prev + 1) % selectedDump.photos.length : 0)
        }
        if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) => prev !== null ? (prev - 1 + selectedDump.photos.length) % selectedDump.photos.length : 0)
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, selectedDump])

  const moodColors: Record<string, string> = {
    wonderstruck: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    satisfied: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30",
    peaceful: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    cozy: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30",
    energized: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
  }

  return (
    <section ref={ref} className="relative px-4 sm:px-6 pt-16 sm:pt-16 pb-8 sm:pb-12">
      <div className={cn("mx-auto w-full max-w-7xl opacity-0", isVisible && "animate-fade-in-up")}>
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Photo Dumps</h2>
          <p className="w-full text-base sm:text-lg text-muted-foreground leading-relaxed">
            Moments from life captured through photos.
          </p>
        </div>

        {/* Dumps Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {photoDumps.map((dump, i) => (
            <button
              key={dump.id}
              onClick={() => setSelectedDump(dump)}
              className={cn(
                "group text-left rounded-xl border border-border bg-card/40 glass overflow-hidden opacity-0 hover:border-primary/50 transition-all",
                isVisible && "animate-fade-in-up",
              )}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Preview grid */}
              <div className="grid grid-cols-3 gap-0.5 p-1">
                {dump.photos.slice(0, 3).map((photo, idx) => (
                  <div
                    key={photo.id}
                    className={cn(
                      "aspect-square bg-secondary/50 rounded overflow-hidden",
                      idx === 0 && "col-span-2 row-span-2 aspect-auto"
                    )}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5" />
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{dump.title}</h3>
                  {dump.mood && (
                    <span className={cn(
                      "px-2 py-0.5 rounded-full border font-mono text-[9px]",
                      moodColors[dump.mood] || "bg-secondary text-muted-foreground border-border"
                    )}>
                      {dump.mood}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{dump.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {dump.date}
                  </span>
                  {dump.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {dump.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Camera className="h-3 w-3" />
                    {dump.photos.length} photos
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedDump && (
        <div
          className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm overflow-y-auto"
          onClick={() => setSelectedDump(null)}
        >
          <div
            className="max-w-4xl mx-auto px-4 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDump(null)}
              className="fixed top-4 right-4 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{selectedDump.title}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {selectedDump.date}
                </span>
                {selectedDump.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {selectedDump.location}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{selectedDump.description}</p>
            </div>

            {/* Photos Grid */}
            <div className="columns-2 md:columns-3 gap-3 space-y-3">
              {selectedDump.photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => setLightboxIndex(index)}
                  className={cn(
                    "w-full rounded-lg overflow-hidden bg-secondary/50 hover:opacity-90 transition-opacity break-inside-avoid",
                    photo.aspectRatio === "portrait" && "aspect-[3/4]",
                    photo.aspectRatio === "landscape" && "aspect-[4/3]",
                    photo.aspectRatio === "square" && "aspect-square"
                  )}
                >
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && selectedDump && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((prev) => prev !== null ? (prev - 1 + selectedDump.photos.length) % selectedDump.photos.length : 0)
            }}
            className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="max-w-4xl max-h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
              <Camera className="h-16 w-16 text-muted-foreground/30" />
            </div>
            <p className="text-center text-white/60 text-sm mt-4">
              {lightboxIndex + 1} / {selectedDump.photos.length}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((prev) => prev !== null ? (prev + 1) % selectedDump.photos.length : 0)
            }}
            className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  )
}