// ─── streak-tracker-data.ts ───────────────────────────────────────────────────
// Fetch functions for all streak tracker data sources.
// Server-side only - never imported by client components.
//
// Required env vars:
//   GITHUB_USERNAME          your GitHub username
//   GITHUB_PAT               GitHub personal access token (read:user scope)
//   FIGMA_PAT                Figma personal access token
//   FIGMA_TEAM_IDS           comma-separated team IDs
//   FIGMA_FILE_KEYS          optional extra file keys for personal drafts
//   GOOGLE_SHEET_ID          spreadsheet ID from the sheet URL
//   GOOGLE_SERVICE_ACCOUNT   JSON string of your service account key

export interface DayData {
  date: string
  activity: number
}

// ─── GITHUB ───────────────────────────────────────────────────────────────────

const GITHUB_GRAPHQL = "https://api.github.com/graphql"

interface GHDay { date: string; contributionCount: number }

export async function fetchGitHubContributions(): Promise<DayData[]> {
  const username = process.env.GITHUB_USERNAME
  const token = process.env.GITHUB_PAT
  if (!username || !token) { console.warn("Missing GITHUB_USERNAME or GITHUB_PAT"); return [] }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays { date contributionCount }
            }
          }
        }
      }
    }
  `

  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ query, variables: { username } }),
    next: { revalidate: 3600 },
  })
  if (!res.ok) { console.error("GitHub API error:", res.status); return [] }

  const json = await res.json()
  if (json.errors) { console.error("GitHub GraphQL errors:", JSON.stringify(json.errors)); return [] }

  const weeks: { contributionDays: GHDay[] }[] =
    json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? []

  return weeks.flatMap(w => w.contributionDays).map(d => ({
    date: d.date,
    activity:
      d.contributionCount === 0 ? 0 :
      d.contributionCount < 10 ? 1 :
      d.contributionCount < 20 ? 2 :
      d.contributionCount < 30 ? 3 : 4,
  }))
}

// ─── FIGMA ────────────────────────────────────────────────────────────────────

const FIGMA_BASE = "https://api.figma.com/v1"
interface FigmaProject { id: string; name: string }
interface FigmaFile    { key: string; name: string }
interface FigmaVersion { created_at: string }

async function figmaGet<T>(path: string, token: string): Promise<T | null> {
  const res = await fetch(`${FIGMA_BASE}${path}`, {
    headers: { "X-Figma-Token": token },
    next: { revalidate: 3600 },
  })
  if (!res.ok) { console.error(`Figma API error ${path}:`, res.status); return null }
  return res.json() as Promise<T>
}

async function getAllFigmaFileKeys(token: string): Promise<string[]> {
  const teamIds = process.env.FIGMA_TEAM_IDS?.split(",").map(s => s.trim()).filter(Boolean) ?? []
  const extraKeys = process.env.FIGMA_FILE_KEYS?.split(",").map(s => s.trim()).filter(Boolean) ?? []
  if (!teamIds.length && !extraKeys.length) { console.warn("No FIGMA_TEAM_IDS or FIGMA_FILE_KEYS"); return [] }

  const projectArrays = await Promise.all(
    teamIds.map(id => figmaGet<{ projects: FigmaProject[] }>(`/teams/${id}/projects`, token).then(d => d?.projects ?? []))
  )
  const fileArrays = await Promise.all(
    projectArrays.flat().map(p => figmaGet<{ files: FigmaFile[] }>(`/projects/${p.id}/files`, token).then(d => d?.files ?? []))
  )
  return [...new Set([...fileArrays.flat().map(f => f.key), ...extraKeys])]
}

export async function fetchFigmaActivity(): Promise<DayData[]> {
  const token = process.env.FIGMA_PAT
  if (!token) { console.warn("Missing FIGMA_PAT"); return [] }

  const fileKeys = await getAllFigmaFileKeys(token)
  if (!fileKeys.length) return []

  const allVersions = await Promise.all(
    fileKeys.map(key => figmaGet<{ versions: FigmaVersion[] }>(`/files/${key}/versions`, token).then(d => d?.versions ?? []))
  )

  const countsByDate: Record<string, number> = {}
  allVersions.flat().forEach(v => {
    const date = v.created_at.split("T")[0]
    countsByDate[date] = (countsByDate[date] ?? 0) + 1
  })
  if (!Object.keys(countsByDate).length) return []

  const max = Math.max(...Object.values(countsByDate), 1)
  return Object.entries(countsByDate).map(([date, count]) => ({
    date,
    activity: Math.max(1, Math.round((count / max) * 4)),
  }))
}

// ─── GOOGLE SHEETS ────────────────────────────────────────────────────────────

type HabitColumn = "reading" | "writing" | "tea"
const HABIT_COL_INDEX: Record<HabitColumn, number> = { reading: 1, writing: 2, tea: 3 }
const SHEETS_BASE = "https://sheets.googleapis.com/v4/spreadsheets"

async function getSheetsAccessToken(): Promise<string> {
  const sa = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT ?? "{}")
  const { GoogleAuth } = await import("googleapis").then(m => m)
  const auth = new GoogleAuth({
    credentials: sa,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  })
  const client = await auth.getClient()
  const token = await client.getAccessToken()
  return token.token ?? ""
}

export async function fetchHabitData(habit: HabitColumn): Promise<DayData[]> {
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!sheetId) { console.warn("Missing GOOGLE_SHEET_ID"); return [] }
  try {
    const accessToken = await getSheetsAccessToken()
    const colLetter = String.fromCharCode(65 + HABIT_COL_INDEX[habit])
    const res = await fetch(`${SHEETS_BASE}/${sheetId}/values/A:${colLetter}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      next: { revalidate: 3600 },
    })
    if (!res.ok) { console.error("Sheets API error:", res.status); return [] }
    const json = await res.json()
    return (json.values as string[][] ?? []).slice(1)
      .map(row => ({ date: row[0] ?? "", activity: row[HABIT_COL_INDEX[habit]]?.toUpperCase() === "TRUE" ? 4 : 0 }))
      .filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d.date))
  } catch (err) {
    console.error("fetchHabitData error:", err)
    return []
  }
}

// ─── ALL AT ONCE ──────────────────────────────────────────────────────────────

export async function fetchAllStreakData() {
  const [github, figma, reading, writing, tea] = await Promise.all([
    fetchGitHubContributions(),
    fetchFigmaActivity(),
    fetchHabitData("reading"),
    fetchHabitData("writing"),
    fetchHabitData("tea"),
  ])
  return { github, figma, reading, writing, tea }
}