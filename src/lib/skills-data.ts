export type SkillLevel = "foundational" | "proficient" | "advanced" | "building"
export type SkillDomain = "languages" | "frontend" | "backend" | "ml" | "design" | "research" | "tools"

export type SkillNode = {
  id: string
  label: string
  domain: SkillDomain
  level: SkillLevel
  /** ids this skill requires as prerequisites */
  requires: string[]
  note?: string
}

export const skillNodes: SkillNode[] = [
  // Languages
  { id: "python",     label: "Python",       domain: "languages", level: "advanced",     requires: [],           note: "Primary language for ML, scripting, and research code." },
  { id: "typescript", label: "TypeScript",   domain: "languages", level: "advanced",     requires: ["javascript"], note: "All new frontend work is TS-first." },
  { id: "javascript", label: "JavaScript",   domain: "languages", level: "proficient",   requires: [],           },
  { id: "java",       label: "Java",         domain: "languages", level: "proficient",   requires: [],           note: "CS coursework and Android." },
  { id: "cpp",        label: "C++",          domain: "languages", level: "foundational", requires: ["java"],     note: "Systems and embedded coursework." },
  { id: "go",         label: "Go",           domain: "languages", level: "building",     requires: ["javascript"], note: "Learning for backend services." },

  // Frontend
  { id: "react",      label: "React",        domain: "frontend",  level: "advanced",     requires: ["javascript", "typescript"] },
  { id: "nextjs",     label: "Next.js",      domain: "frontend",  level: "advanced",     requires: ["react"] },
  { id: "tailwind",   label: "Tailwind",     domain: "frontend",  level: "advanced",     requires: ["javascript"] },
  { id: "d3",         label: "D3.js",        domain: "frontend",  level: "proficient",   requires: ["javascript"], note: "Force graphs, custom viz." },
  { id: "threejs",    label: "Three.js",     domain: "frontend",  level: "building",     requires: ["javascript", "react"] },

  // Backend
  { id: "nodejs",     label: "Node.js",      domain: "backend",   level: "proficient",   requires: ["javascript"] },
  { id: "fastapi",    label: "FastAPI",      domain: "backend",   level: "proficient",   requires: ["python"] },
  { id: "postgres",   label: "PostgreSQL",   domain: "backend",   level: "proficient",   requires: [],           },
  { id: "supabase",   label: "Supabase",     domain: "backend",   level: "proficient",   requires: ["postgres"] },
  { id: "docker",     label: "Docker",       domain: "backend",   level: "foundational", requires: [],           },

  // ML / Research
  { id: "pytorch",    label: "PyTorch",      domain: "ml",        level: "proficient",   requires: ["python"],   note: "Deep learning models and experiments." },
  { id: "sklearn",    label: "scikit-learn", domain: "ml",        level: "advanced",     requires: ["python"],   note: "Classical ML - classification, clustering, pipelines." },
  { id: "langchain",  label: "LangChain",    domain: "ml",        level: "proficient",   requires: ["python", "pytorch"] },
  { id: "numpy",      label: "NumPy",        domain: "ml",        level: "advanced",     requires: ["python"],   },
  { id: "pandas",     label: "pandas",       domain: "ml",        level: "advanced",     requires: ["numpy"],    },

  // Design
  { id: "figma",      label: "Figma",        domain: "design",    level: "advanced",     requires: [],           note: "Component systems, prototyping, design tokens." },
  { id: "hci-methods",label: "HCI Methods",  domain: "research",  level: "proficient",   requires: ["figma"],    note: "Usability testing, think-alouds, cognitive walkthroughs." },
  { id: "user-research", label: "User Research", domain: "research", level: "proficient", requires: ["hci-methods"] },

  // Tools
  { id: "git",        label: "Git",          domain: "tools",     level: "advanced",     requires: [],           },
  { id: "vercel",     label: "Vercel",       domain: "tools",     level: "proficient",   requires: ["nextjs"],   },
  { id: "github-actions", label: "GitHub Actions", domain: "tools", level: "foundational", requires: ["git"],  },
]

export const skillDomainConfig: Record<SkillDomain, { label: string; color: string; bg: string; border: string }> = {
  languages: { label: "Languages",  color: "#a78bfa", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.3)" },
  frontend:  { label: "Frontend",   color: "#60a5fa", bg: "rgba(96,165,250,0.12)",  border: "rgba(96,165,250,0.3)"  },
  backend:   { label: "Backend",    color: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.3)"  },
  ml:        { label: "ML / AI",    color: "#f472b6", bg: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.3)" },
  design:    { label: "Design",     color: "#fbbf24", bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.3)"  },
  research:  { label: "Research",   color: "#fb923c", bg: "rgba(251,146,60,0.12)",  border: "rgba(251,146,60,0.3)"  },
  tools:     { label: "Tools",      color: "#94a3b8", bg: "rgba(148,163,184,0.12)", border: "rgba(148,163,184,0.3)" },
}

export const skillLevelConfig: Record<SkillLevel, { label: string; opacity: number }> = {
  advanced:     { label: "advanced",     opacity: 1    },
  proficient:   { label: "proficient",   opacity: 0.82 },
  foundational: { label: "foundational", opacity: 0.6  },
  building:     { label: "building",     opacity: 0.5  },
}
