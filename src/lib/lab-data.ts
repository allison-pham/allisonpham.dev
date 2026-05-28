export interface LabItem {
  id: string
  name: string
  description: string
  progress: number
  lastUpdated: string
  url: string
  branch: string
  commits: number
}

export const currentPieces: LabItem[] = [
  {
    id: "nexa",
    name: "nexa",
    description: "AI agent - building autonomous workflows to speed up repetitive tasks",
    progress: 5,
    lastUpdated: "mar 2026",
    url: "",
    branch: "main",
    commits: 0,
  },
]

export const previousIterations: LabItem[] = []

export const ideasQueue: LabItem[] = [
  {
    id: "ml-models",
    name: "ml-models",
    description: "machine learning model prototypes for applied use cases",
    progress: 0,
    lastUpdated: "wip",
    url: "",
    branch: "main",
    commits: 0,
  },
]