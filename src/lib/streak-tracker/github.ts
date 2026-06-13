// ─────────────────────────────────────────────
//  GitHub Contributions Fetcher
//
//  Uses GitHub's public GraphQL API.
//  Requires a Personal Access Token with `read:user` scope.
//  Create one at: https://github.com/settings/tokens
//
//  The token is stored only in memory (never persisted).
// ─────────────────────────────────────────────

export interface GitHubDay {
  date: string        // "YYYY-MM-DD"
  contributionCount: number
}

export interface GitHubResult {
  weeks: GitHubDay[][]
  totalContributions: number
}

const GITHUB_GRAPHQL = "https://api.github.com/graphql"

const CONTRIBUTIONS_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`

export async function fetchGitHubContributions(
  username: string,
  token: string,
  fromDate?: string,   // defaults to 1 year ago
  toDate?: string      // defaults to today
): Promise<GitHubResult> {
  const to   = toDate   ? new Date(toDate)   : new Date()
  const from = fromDate ? new Date(fromDate) : new Date(new Date().setFullYear(to.getFullYear() - 1))

  const res = await fetch(GITHUB_GRAPHQL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${token}`,
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: {
        username,
        from: from.toISOString(),
        to:   to.toISOString(),
      },
    }),
  })

  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)

  const json = await res.json()

  if (json.errors) {
    throw new Error(`GitHub GraphQL error: ${json.errors.map((e: { message: string }) => e.message).join(", ")}`)
  }

  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar
  if (!calendar) throw new Error("User not found or no contribution data")

  const weeks: GitHubDay[][] = calendar.weeks.map(
    (w: { contributionDays: GitHubDay[] }) => w.contributionDays
  )

  return {
    weeks,
    totalContributions: calendar.totalContributions,
  }
}

// ─────────────────────────────────────────────
//  Map GitHub contribution counts → 0–4 activity scale
//  matching the rest of the tracker
// ─────────────────────────────────────────────
export function normalizeGitHubCount(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0)  return 0
  if (count <= 2)   return 1
  if (count <= 6)   return 2
  if (count <= 12)  return 3
  return 4
}