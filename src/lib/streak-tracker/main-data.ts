// ─────────────────────────────────────────────
//  Streak Tracker - Manual Habit Data
//  Fill in your activity below.
//
//  Each entry is a date + a session count (1–4).
//  Date format: "YYYY-MM-DD"
//  Sessions: 1 = light, 2 = moderate, 3 = solid, 4 = deep
// ─────────────────────────────────────────────

export interface HabitEntry {
  date: string     // "YYYY-MM-DD"
  sessions: 1 | 2 | 3 | 4
  note?: string    // optional log note, e.g. "finished chapter 12"
}

export interface HabitData {
  tea: HabitEntry[]
  reading: HabitEntry[]
  writing: HabitEntry[]
}

export const habitData: HabitData = {

  tea: [
    { date: "2025-05-29", sessions: 2, note: "gongfu session, dancong" },
    { date: "2025-05-28", sessions: 1 },
    { date: "2025-05-27", sessions: 3, note: "morning + afternoon + evening" },
    { date: "2025-05-25", sessions: 2 },
    { date: "2025-05-24", sessions: 1 },
    { date: "2025-05-22", sessions: 4, note: "tea ceremony with friends" },
    { date: "2025-05-21", sessions: 2 },
    { date: "2025-05-20", sessions: 1 },
    { date: "2025-05-19", sessions: 3 },
    { date: "2025-05-18", sessions: 2 },
    // add more entries here...
  ],

  reading: [
    { date: "2025-05-29", sessions: 2, note: "Piranesi, ch. 4–6" },
    { date: "2025-05-28", sessions: 1 },
    { date: "2025-05-26", sessions: 3, note: "finished part II" },
    { date: "2025-05-25", sessions: 2 },
    { date: "2025-05-23", sessions: 1 },
    { date: "2025-05-22", sessions: 2 },
    { date: "2025-05-20", sessions: 4, note: "read for 3 hours straight" },
    { date: "2025-05-19", sessions: 1 },
    { date: "2025-05-17", sessions: 2 },
    { date: "2025-05-16", sessions: 3 },
    // add more entries here...
  ],

  writing: [
    { date: "2025-05-29", sessions: 1, note: "morning pages" },
    { date: "2025-05-28", sessions: 2 },
    { date: "2025-05-27", sessions: 3, note: "essay draft + journal" },
    { date: "2025-05-25", sessions: 1 },
    { date: "2025-05-24", sessions: 2 },
    { date: "2025-05-21", sessions: 1 },
    { date: "2025-05-20", sessions: 2 },
    { date: "2025-05-18", sessions: 3, note: "2000 words on the commute piece" },
    { date: "2025-05-17", sessions: 1 },
    { date: "2025-05-15", sessions: 2 },
    // add more entries here...
  ],

}