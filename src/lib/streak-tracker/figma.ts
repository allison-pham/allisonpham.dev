// ─────────────────────────────────────────────
//  Figma Activity Fetcher
//
//  Figma doesn't expose a public "contributions" API like GitHub,
//  so we approximate design activity by fetching version history
//  across your team projects.
//
//  Requires a Personal Access Token:
//  Figma → Account Settings → Personal access tokens → Create new token
//  Scope needed: File content (read), Projects (read)
//
//  Strategy (mirrors sixelf's approach):
//    1. Fetch all projects in your team
//    2. Fetch files in each project
//    3. Fetch version history for each file
//    4. Count versions saved per day → activity score
// ─────────────────────────────────────────────

const FIGMA_API = "https://api.figma.com/v1"

export interface FigmaDay {
  date: string   // "YYYY-MM-DD"
  saves: number  // number of file versions saved that day
}

export interface FigmaResult {
  days: Record<string, number>  // date → save count
  totalSaves: number
}

async function figmaGet(path: string, token: string) {
  const res = await fetch(`${FIGMA_API}${path}`, {
    headers: { "X-Figma-Token": token },
  })
  if (!res.ok) throw new Error(`Figma API error ${res.status}: ${res.statusText}`)
  return res.json()
}

// ─── Fetch all projects in a team ───────────────────────────────────────────

export async function fetchFigmaTeamProjects(teamId: string, token: string): Promise<{ id: string; name: string }[]> {
  const data = await figmaGet(`/teams/${teamId}/projects`, token)
  return data.projects ?? []
}

// ─── Fetch all files in a project ───────────────────────────────────────────

export async function fetchFigmaProjectFiles(projectId: string, token: string): Promise<{ key: string; name: string }[]> {
  const data = await figmaGet(`/projects/${projectId}/files`, token)
  return data.files ?? []
}

// ─── Fetch version history for a file ───────────────────────────────────────

interface FigmaVersion {
  id: string
  created_at: string  // ISO timestamp
  label: string | null
  user: { id: string; handle: string }
}

export async function fetchFigmaFileVersions(fileKey: string, token: string): Promise<FigmaVersion[]> {
  const data = await figmaGet(`/files/${fileKey}/versions`, token)
  return data.versions ?? []
}

// ─── Main: aggregate saves per day across all team files ────────────────────

export async function fetchFigmaActivity(
  teamId: string,
  token: string,
  fromDate?: string,   // "YYYY-MM-DD", defaults to 1 year ago
): Promise<FigmaResult> {
  const cutoff = fromDate
    ? new Date(fromDate)
    : new Date(new Date().setFullYear(new Date().getFullYear() - 1))

  const days: Record<string, number> = {}

  const projects = await fetchFigmaTeamProjects(teamId, token)

  for (const project of projects) {
    const files = await fetchFigmaProjectFiles(project.id, token)

    for (const file of files) {
      // Rate-limit: small delay between file requests to avoid 429s
      await new Promise(r => setTimeout(r, 120))

      let versions: FigmaVersion[] = []
      try {
        versions = await fetchFigmaFileVersions(file.key, token)
      } catch {
        // Skip files we can't access (shared externally, etc.)
        continue
      }

      for (const v of versions) {
        const dt = new Date(v.created_at)
        if (dt < cutoff) continue
        const dateKey = dt.toISOString().split("T")[0]
        days[dateKey] = (days[dateKey] ?? 0) + 1
      }
    }
  }

  return {
    days,
    totalSaves: Object.values(days).reduce((a, b) => a + b, 0),
  }
}

// ─── Normalize save counts → 0–4 activity scale ─────────────────────────────

export function normalizeFigmaSaves(saves: number): 0 | 1 | 2 | 3 | 4 {
  if (saves === 0)  return 0
  if (saves <= 3)   return 1
  if (saves <= 8)   return 2
  if (saves <= 16)  return 3
  return 4
}

// ─────────────────────────────────────────────
//  Alternative: single-file mode
//  If you only want to track one Figma file
//  (e.g. your main design system), use this instead.
// ─────────────────────────────────────────────

export async function fetchFigmaSingleFileActivity(
  fileKey: string,   // the key from your Figma file URL: figma.com/file/KEY/...
  token: string,
  fromDate?: string,
): Promise<FigmaResult> {
  const cutoff = fromDate
    ? new Date(fromDate)
    : new Date(new Date().setFullYear(new Date().getFullYear() - 1))

  const days: Record<string, number> = {}
  const versions = await fetchFigmaFileVersions(fileKey, token)

  for (const v of versions) {
    const dt = new Date(v.created_at)
    if (dt < cutoff) continue
    const dateKey = dt.toISOString().split("T")[0]
    days[dateKey] = (days[dateKey] ?? 0) + 1
  }

  return {
    days,
    totalSaves: Object.values(days).reduce((a, b) => a + b, 0),
  }
}