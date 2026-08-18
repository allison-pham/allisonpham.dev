"use client";
import { allEntryTags, entries, getDatesWithEntries, getEntriesForDate, type CalendarEntry, type EntryType, typeConfig } from "@/src/lib/calendar-data";
import { ChevronLeft, ChevronRight, ExternalLink, MapPin } from "lucide-react";
import { cn } from "@/src/lib/core-features/utils";
import { useEffect, useRef, useState, useMemo } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const TYPE_FILTERS: Array<EntryType | "all"> = ["all", "event", "schedule", "daily"];

function toDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

function EntryCard({ entry, compact = false }: { entry: CalendarEntry; compact?: boolean }) {
  const cfg = typeConfig[entry.type];
  return (
    <div className={cn("group relative overflow-hidden rounded-xl border bg-card/40 glass transition-all duration-300 hover:border-primary/30", compact ? "p-3" : "p-5", "border-border/50")}>
      <div className={cn("absolute inset-0 bg-linear-to-br opacity-40", cfg.bg)} />
      <div className="relative space-y-2">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl select-none">{entry.emoji}</span>
            <div className="space-y-0.5 min-w-0">
              <p className={cn("font-bold tracking-tight text-foreground transition-colors group-hover:text-primary leading-tight", compact ? "text-xs" : "text-sm")}>{entry.title}</p>
              {entry.startTime && (
                <p className="font-mono text-[10px] text-muted-foreground">
                  {formatTime(entry.startTime)}
                  {entry.endTime ? ` → ${formatTime(entry.endTime)}` : ""}
                </p>
              )}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[9px] tracking-wider", cfg.pill)}>{entry.tag}</span>
            {entry.url && (
              <a href={entry.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        {!compact && entry.description && <p className="text-xs leading-relaxed text-muted-foreground border-l-2 border-primary/20 pl-3">{entry.description}</p>}

        {/* Location */}
        {!compact && entry.location && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="font-mono text-[10px]">{entry.location}</span>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

function MiniCalendar({ year, month, selectedDate, onSelectDate, onPrevMonth, onNextMonth }: { year: number; month: number; selectedDate: string | null; onSelectDate: (d: string) => void; onPrevMonth: () => void; onNextMonth: () => void }) {
  const datesWithEntries = useMemo(() => getDatesWithEntries(year, month), [year, month]);
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date().toISOString().split("T")[0];
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) => (i < firstDay ? null : i - firstDay + 1));

  return (
    <div className="rounded-xl border border-border/50 bg-card/40 glass p-5">
      {/* Month nav */}
      <div className="mb-4 flex items-center justify-between">
        <button onClick={onPrevMonth} className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <p className="font-mono text-sm font-semibold text-foreground">
          {MONTHS[month - 1]} {year}
        </p>
        <button onClick={onNextMonth} className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors">
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Day headers */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center font-mono text-[9px] tracking-wider text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const dateStr = toDateStr(year, month, day);
          const hasEntries = datesWithEntries.has(dateStr);
          const isToday = dateStr === today;
          const isSelected = dateStr === selectedDate;
          return (
            <button
              key={dateStr}
              onClick={() => onSelectDate(isSelected ? "" : dateStr)}
              className={cn(
                "relative flex h-8 w-full flex-col items-center justify-center rounded-lg font-mono text-xs transition-all duration-200 active:scale-95",
                isSelected && "bg-primary text-primary-foreground shadow-sm shadow-primary/30",
                !isSelected && isToday && "border border-primary/40 text-primary",
                !isSelected && !isToday && "text-foreground hover:bg-secondary/60",
              )}
            >
              {day}
              {hasEntries && !isSelected && <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DayRoutine() {
  const dailies = entries.filter((e) => e.type === "daily" && e.startTime).sort((a, b) => (a.startTime! > b.startTime! ? 1 : -1));

  return (
    <div className="rounded-xl border border-border/50 bg-card/40 glass p-5 space-y-4">
      <div className="space-y-1">
        <p className="font-mono text-[10px] tracking-[0.25em] text-primary">a typical day;</p>
        <p className="font-mono text-xs text-muted-foreground">What most days look like</p>
      </div>
      <div className="relative space-y-0">
        {/* Timeline line */}
        <div className="absolute left-25 top-0 bottom-0 w-px bg-border/40" />
        {dailies.map((entry, i) => (
          <div key={entry.id} className="relative flex items-start gap-3 py-2.5 group">
            {/* Time */}
            <span className="w-24 shrink-0 font-mono text-[10px] text-muted-foreground text-right leading-none mt-0.5">
              {entry.startTime && (
                <>
                  {formatTime(entry.startTime).replace(":00", "")}
                  {entry.endTime && <> - {formatTime(entry.endTime).replace(":00", "")}</>}
                </>
              )}
            </span>
            {/* Dot */}
            <div className={cn("relative z-10 mt-0.5 h-3 w-3 shrink-0 rounded-full border-2 border-background transition-transform group-hover:scale-125", typeConfig.daily.dot)} />
            {/* Content */}
            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{entry.emoji}</span>
                <p className="font-mono text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{entry.title}</p>
              </div>
              {entry.description && <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">{entry.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CurrentlyUpTo() {
  const scheduleItems = entries.filter((e) => e.type === "schedule");
  return (
    <div className="rounded-xl border border-border/50 bg-card/40 glass p-5 space-y-4">
      <div className="space-y-1">
        <p className="font-mono text-[10px] tracking-[0.25em] text-primary">currently;</p>
        <p className="font-mono text-xs text-muted-foreground">What I'm up to right now</p>
      </div>
      <div className="space-y-3">
        {scheduleItems.map((entry) => (
          <div key={entry.id} className="group flex items-start gap-3">
            <span className="text-base select-none mt-0.5">{entry.emoji}</span>
            <div className="space-y-0.5 min-w-0">
              <p className="font-mono text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{entry.title}</p>
              {entry.description && <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">{entry.description}</p>}
              <span className={cn("inline-flex rounded-full border px-2 py-0.5 font-mono text-[9px]", typeConfig.schedule.pill)}>{entry.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Calendar() {
  const [isVisible, setIsVisible] = useState(false);
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<EntryType | "all">("all");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const prevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  // Selected date entries
  const dateEntries = selectedDate ? getEntriesForDate(selectedDate) : [];

  // Upcoming events (type === "event", sorted by date)
  const upcoming = entries
    .filter((e) => {
      if (e.type !== "event") return false;
      if (typeFilter !== "all" && e.type !== typeFilter) return false;
      if (tagFilter && e.tag !== tagFilter) return false;
      return e.date >= new Date().toISOString().split("T")[0];
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  function formatDisplayDate(dateStr: string) {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  }

  return (
    <section ref={sectionRef} className="overflow-x-clip px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className={cn("space-y-3 mb-6 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs tracking-[0.25em] text-primary flex items-center gap-2">in the world;</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Calendar</h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">Events I've been at, what I'm building, and what a typical day looks like (slice of how I spend my startTime)</p>
        </div>

        {/* Filters */}
        <div className={cn("mb-8 flex flex-wrap gap-2 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "80ms" }}>
          {TYPE_FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-wider transition-all active:scale-[0.98]",
                typeFilter === t ? (t === "all" ? "border-primary bg-primary/15 text-primary" : typeConfig[t as EntryType].pill) : "border-border text-muted-foreground hover:border-foreground/40",
              )}
            >
              {t !== "all" && <span className={cn("h-1.5 w-1.5 rounded-full", typeConfig[t as EntryType].dot)} />}
              {t === "all" ? "all" : typeConfig[t as EntryType].label}
            </button>
          ))}
          <div className="w-px bg-border/40 self-stretch mx-1" />
          {allEntryTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-wider transition-all",
                tagFilter === tag ? "border-primary/50 bg-primary/10 text-primary" : "border-border/60 bg-secondary/30 text-muted-foreground hover:border-primary/30",
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Main grid */}
        <div className={cn("grid gap-6 lg:grid-cols-3 opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: "140ms" }}>
          {/* Left col - calendar + selected day */}
          <div className="space-y-5">
            <MiniCalendar year={year} month={month} selectedDate={selectedDate} onSelectDate={setSelectedDate} onPrevMonth={prevMonth} onNextMonth={nextMonth} />

            {/* Selected date panel */}
            {selectedDate && (
              <div className="rounded-xl border border-primary/30 bg-card/40 glass p-5 space-y-4 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs font-semibold text-foreground">{formatDisplayDate(selectedDate)}</p>
                  <button onClick={() => setSelectedDate("")} className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors">
                    ×
                  </button>
                </div>
                {dateEntries.length > 0 ? (
                  <div className="space-y-3">
                    {dateEntries.map((e) => (
                      <EntryCard key={e.id} entry={e} compact />
                    ))}
                  </div>
                ) : (
                  <p className="font-mono text-[10px] text-muted-foreground">Nothing logged for this day.</p>
                )}
              </div>
            )}

            {/* Currently up to */}
            <CurrentlyUpTo />
          </div>

          {/* Center + right - upcoming events + daily routine */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming events */}
            <div className="space-y-3">
              <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">Upcoming Events</p>
              {upcoming.length > 0 ? (
                <div className="space-y-3">
                  {upcoming.map((entry, i) => (
                    <div key={entry.id} className={cn("opacity-0", isVisible && "animate-fade-in-up")} style={{ animationDelay: `${i * 60 + 200}ms` }}>
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {new Date(entry.date + "T12:00:00").toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <div className="h-px flex-1 bg-border/30" />
                      </div>
                      <EntryCard entry={entry} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border/50 p-8 text-center">
                  <p className="font-mono text-xs text-muted-foreground">No upcoming events matching those filters.</p>
                </div>
              )}
            </div>

            {/* Day routine */}
            <DayRoutine />
          </div>
        </div>
      </div>
    </section>
  );
}
