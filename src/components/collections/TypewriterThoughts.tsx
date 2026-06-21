"use client";
import { cn } from "@/src/lib/core-features/utils";
import { useEffect, useState, useRef } from "react";

const THOUGHTS = [
  "orbital interface design",
  "why oolong hits different at 3pm",
  "what cognition looks like in zero gravity",
  "building systems that think with you",
  "HCI for environments humans have never been",
  "the gap between a tool and a companion",
  "Vietnamese tones and muscle memory",
  "what makes a hackathon feel like home",
  "designing for cognitive load without dumbing things down",
  "tea as a ritual, not a habit",
  "space systems that adapt to human error",
  "why the best interfaces disappear",
  "neurotech and the ethics of reading minds",
  "what would a zero-gravity keyboard look like",
  "the intersection of editorial design and engineering",
];

export function TypewriterThoughts({ className }: { className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [thoughtIdx, setThoughtIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "erasing">("typing");
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const thought = THOUGHTS[thoughtIdx];

    if (phase === "typing") {
      if (displayed.length < thought.length) {
        frameRef.current = setTimeout(
          () => {
            setDisplayed(thought.slice(0, displayed.length + 1));
          },
          42 + Math.random() * 30,
        ); // slight randomness = more human
      } else {
        frameRef.current = setTimeout(() => setPhase("pause"), 2200);
      }
    }

    if (phase === "pause") {
      frameRef.current = setTimeout(() => setPhase("erasing"), 0);
    }

    if (phase === "erasing") {
      if (displayed.length > 0) {
        frameRef.current = setTimeout(() => {
          setDisplayed((d) => d.slice(0, -1));
        }, 18);
      } else {
        setThoughtIdx((i) => (i + 1) % THOUGHTS.length);
        setPhase("typing");
      }
    }

    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [displayed, phase, thoughtIdx]);

  return (
    <p className={cn("font-mono text-sm text-muted-foreground", className)}>
      <span className="text-primary/60 mr-1.5">thinking about</span>
      <span>{displayed}</span>
      <span className="inline-block w-0.5 h-4 bg-primary align-middle ml-0.5 animate-pulse" aria-hidden />
    </p>
  );
}
