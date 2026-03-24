export type ProjectStatus = "shipped" | "in progress" | "ideation" | "archived"

export type ProjectImage = {
  src: string
  alt: string
  caption?: string
}

export type ProjectCaseStudySection = {
  id: string
  title: string
  description: string
  images?: ProjectImage[]
}

export type ProjectCaseStudy = {
  role: string
  duration: string
  specialization: string
  oneSentence: string
  quickAction: string
  sections: ProjectCaseStudySection[]
}

export type ProjectSeed = {
  id: string
  title: string
  description: string
  tags: string[]
  status: ProjectStatus
  year: string
  url: string
  homepage: string
  featured: boolean
  highlight: boolean
  thumbnailSrc?: string
  thumbnailAlt?: string
  caseStudy?: Partial<ProjectCaseStudy>
}

export type Project = ProjectSeed & {
  slug: string
}

const projectSeeds: ProjectSeed[] = [
  // {
  //   id: "hci-in-space",
  //   title: "HCI in Space",
  //   description: "Human-computer interaction concepts adapted for astronaut workflows",
  //   tags: ["HCI", "UX", "Space Tech"],
  //   status: "ideation",
  //   year: "2026",
  //   url: "",
  //   homepage: "",
  //   featured: true,
  //   highlight: true,
  //   thumbnailSrc: "",
  //   thumbnailAlt: "HCI in Space project cover",
  //   caseStudy: {
  //     role: "Product Designer",
  //     duration: "Month + year",
  //     specialization: "HCI Design",
  //     oneSentence: "Design interaction systems that reduce cognitive load in zero-gravity workspaces.",
  //     quickAction: "Rapid concept validation with storyboard testing.",
  //   },
  // },

  {
    id: "nexa",
    title: "Nexa",
    description: "AI agent - building autonomous workflows to speed up repetitive tasks",
    tags: ["Automation"],
    status: "ideation",
    // year: "2026",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    year: ""
  },

  // {
  //   id: "personality-quiz",
  //   title: "Personality Quiz",
  //   description: "Interactive quiz experiments for personality-driven recommendations",
  //   tags: ["UX", "Experiment"],
  //   status: "archived",
  //   year: "2026",
  //   url: "",
  //   homepage: "",
  //   featured: false,
  //   highlight: false,
  // },

  // {
  //   id: "ml-models",
  //   title: "ML Models",
  //   description: "Machine learning model prototypes for applied use cases",
  //   tags: ["ML", "Python"],
  //   status: "ideation",
  //   year: "2025",
  //   url: "",
  //   homepage: "",
  //   featured: false,
  //   highlight: false,
  // },

  // {
  //   id: "neurowell",
  //   title: "NeuroWell",
  //   description: "Healthcare learning combining neuroscience education & wellness",
  //   tags: ["Wellness", "Product"],
  //   status: "archived",
  //   year: "2025",
  //   url: "",
  //   homepage: "",
  //   featured: false,
  //   highlight: false,
  // },

  // {
  //   id: "missionsync",
  //   title: "MissionSync",
  //   description: "Async interfaces for mission planning (coordination system concept)",
  //   tags: [],
  //   status: "ideation",
  //   year: "2025",
  //   url: "",
  //   homepage: "",
  //   featured: false,
  //   highlight: false,
  // },

  // {
  //   id: "astrotrade",
  //   title: "AstroTrade",
  //   description: "Space commerce & trading simulation concept inspired by space-economy scenarios",
  //   tags: ["Space", "Finance"],
  //   status: "archived",
  //   year: "2025",
  //   url: "",
  //   homepage: "",
  //   featured: false,
  //   highlight: false,
  // },

  // {
  //   id: "orbitintel",
  //   title: "OrbitIntel",
  //   description: "Space asset directory & data exploration for orbital mission insights",
  //   tags: ["Space Tech"],
  //   status: "ideation",
  //   year: "2025",
  //   url: "",
  //   homepage: "",
  //   featured: false,
  //   highlight: false,
  // },
  
  // {
  //   id: "thinksync",
  //   title: "ThinkSync",
  //   description: "Cognitive UX",
  //   tags: ["Productivity"],
  //   status: "ideation",
  //   year: "2025",
  //   url: "",
  //   homepage: "",
  //   featured: false,
  //   highlight: false,
  // },

  // {
  //   id: "musely",
  //   title: "Musely",
  //   description: "Music x journaling",
  //   tags: ["Creative Tools"],
  //   status: "archived",
  //   year: "2025",
  //   url: "",
  //   homepage: "",
  //   featured: false,
  //   highlight: false,
  // },

  // {
  //   id: "finflow",
  //   title: "FinFlow",
  //   description: "Personal finance workflow concept for better money habits",
  //   tags: ["Finance", "Product"],
  //   status: "archived",
  //   year: "2025",
  //   url: "",
  //   homepage: "",
  //   featured: false,
  //   highlight: false,
  // },

  {
    id: "assistify",
    title: "Assistify",
    description: "Receive tailored support with quality responses",
    tags: ["Next.js", "TypeScript", "Material UI"],
    status: "shipped",
    // year: "2024",
    url: "https://github.com/allison-pham/assistify",
    homepage: "",
    featured: false,
    highlight: false,
    year: ""
  },

  {
    id: "eevi",
    title: "Eevi",
    description: "The 0 → 1 software tool",
    tags: ["React"],
    status: "shipped",
    // year: "2024",
    url: "https://github.com/allison-pham/eevi-side-quests",
    homepage: "",
    featured: false,
    highlight: false,
    year: ""
  },

  // {
  //   id: "youflow",
  //   title: "YouFlow",
  //   description: "Data analyzer experiments for structured workflow insight",
  //   tags: ["Data", "Python"],
  //   status: "archived",
  //   year: "2024",
  //   url: "https://github.com/allison-pham/youflow-data-analyzer",
  //   homepage: "",
  //   featured: false,
  //   highlight: false,
  // },

  // {
  //   id: "bioquest",
  //   title: "BioQuest",
  //   description: "Environment learning through gamification",
  //   tags: ["Data"],
  //   status: "archived",
  //   year: "2024",
  //   url: "",
  //   homepage: "",
  //   featured: false,
  //   highlight: false,
  // },
 
  {
    id: "pantrypilot",
    title: "PantryPilot",
    description: "Streamline grocery shopping with a few clicks",
    tags: ["Python", "scikit-learn", "pandas", "NumPy"],
    status: "shipped",
    // year: "2024",
    url: "https://github.com/allison-pham/grocery-in-one",
    homepage: "",
    featured: false,
    highlight: false,
    year: ""
  },

  {
    id: "shelfsense",
    title: "ShelfSense",
    description: "Data analysis for books with actionable reading insights",
    tags: ["Python", "NumPy", "pandas", "Matplotlib"],
    status: "shipped",
    // year: "2023",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    year: ""
  },

  {
    id: "qr-connect",
    title: "QR Connect",
    description: "Save wifi logins → reduce setup time",
    tags: ["Python"],
    status: "shipped",
    // year: "2023",
    url: "https://github.com/allison-pham/qr-connect",
    homepage: "",
    featured: false,
    highlight: false,
    year: ""
  },

  // {
  //   id: "cozy-chat",
  //   title: "Cozy Chat",
  //   description: "All-in-one learning & social platform concept",
  //   tags: ["Education"],
  //   status: "archived",
  //   year: "2023 & 2026",
  //   url: "",
  //   homepage: "",
  //   featured: false,
  //   highlight: false,
  //   caseStudy: {
  //   }
  // },
]

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export const projects: Project[] = projectSeeds.map((project) => ({
  ...project,
  slug: slugify(project.title),
}))

export const projectFilters = ["all", "shipped", "in progress", "ideation", "archived"] as const

export type ProjectFilter = (typeof projectFilters)[number]

export const allProjectTags = [...new Set(projects.flatMap((project) => project.tags))]

const defaultSectionTitles: Array<{ id: string; title: string }> = [
  { id: "background-story", title: "Background Story" },
  { id: "overview", title: "Overview (About & Impact)" },
  { id: "problem", title: "Problem" },
  { id: "ideas-features", title: "Ideas and Features" },
  { id: "user-research", title: "User Research" },
  { id: "persona-storyboard", title: "User Persona + Storyboard" },
  { id: "architecture-design", title: "Architecture / The Design" },
  { id: "solution-prototype", title: "Solution (with Prototype)" },
  { id: "reflection", title: "Reflection" },
]

export function getProjectCaseStudy(project: Project): ProjectCaseStudy {
  const fallbackRole = "Product Designer"
  const fallbackDuration = "Month + year"
  const fallbackSpecialization = project.tags[0] || "Technical skills"

  return {
    role: project.caseStudy?.role || fallbackRole,
    duration: project.caseStudy?.duration || fallbackDuration,
    specialization: project.caseStudy?.specialization || fallbackSpecialization,
    oneSentence:
      project.caseStudy?.oneSentence ||
      project.description ||
      `A case study for ${project.title}.`,
    quickAction:
      project.caseStudy?.quickAction ||
      "Add your key action or outcome here.",
    sections:
      project.caseStudy?.sections && project.caseStudy.sections.length > 0
        ? project.caseStudy.sections
        : defaultSectionTitles.map((section) => ({
            id: section.id,
            title: section.title,
            description: `Add narrative for ${section.title.toLowerCase()} in ${project.title}.`,
          })),
  }
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getRelatedProjects(currentSlug: string, limit = 3): Project[] {
  return projects.filter((project) => project.slug !== currentSlug).slice(0, limit)
}
