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
  id: number
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
  {
    id: 0,
    title: "HCI in Space",
    description: "Human-computer interaction concepts adapted for astronaut workflows.",
    tags: ["HCI", "UX", "Space Tech"],
    status: "ideation",
    year: "2026",
    url: "",
    homepage: "",
    featured: true,
    highlight: true,
    thumbnailSrc: "",
    thumbnailAlt: "HCI in Space project cover",
    caseStudy: {
      role: "Product Designer",
      duration: "Month + year",
      specialization: "HCI Design",
      oneSentence: "Design interaction systems that reduce cognitive load in zero-gravity workspaces.",
      quickAction: "Rapid concept validation with storyboard testing.",
    },
  },
  {
    id: 1,
    title: "AI Agent",
    description: "Building autonomous workflows to speed up repetitive product tasks.",
    tags: ["AI", "Automation"],
    status: "ideation",
    year: "2026",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 2,
    title: "Personality Quiz",
    description: "Interactive quiz experiments for personality-driven recommendations.",
    tags: ["UX", "Experiment"],
    status: "archived",
    year: "2026",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 3,
    title: "ML Models",
    description: "Exploratory machine learning model prototypes for applied use cases.",
    tags: ["ML", "Python"],
    status: "ideation",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 4,
    title: "NeuroWell",
    description: "Mental wellness concept focused on personalized routines and support.",
    tags: ["Wellness", "Product"],
    status: "archived",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 5,
    title: "MissionSync",
    description: "Coordination system concept for teams and mission planning.",
    tags: ["Collaboration", "Planning"],
    status: "archived",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 6,
    title: "AstroTrade",
    description: "Trading simulation concept inspired by space-economy scenarios.",
    tags: ["Simulation", "Finance"],
    status: "ideation",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 7,
    title: "OrbitIntel",
    description: "Data exploration concept for orbital mission insights.",
    tags: ["Analytics", "Space Tech"],
    status: "ideation",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 8,
    title: "ThinkSync",
    description: "Collaborative thinking workspace concept for teams.",
    tags: ["Productivity", "Collaboration"],
    status: "ideation",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 9,
    title: "Musely",
    description: "Creative tool concept for music-assisted ideation.",
    tags: ["Creative Tools"],
    status: "archived",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 10,
    title: "FinFlow",
    description: "Personal finance workflow concept for better money habits.",
    tags: ["Finance", "Product"],
    status: "archived",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 11,
    title: "Assistify",
    description: "Receive tailored support with quality responses.",
    tags: ["Next.js", "TypeScript", "Material UI"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/assistify",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 12,
    title: "WellNest",
    description: "Pantry tracker for effortless nutrition.",
    tags: ["Next.js", "Firebase", "Material UI"],
    status: "shipped",
    year: "2024",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 13,
    title: "Eevi",
    description: "The 0 to 1 software tool.",
    tags: ["React"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/eevi-side-quests",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 14,
    title: "YouFlow",
    description: "Data analyzer experiments for structured workflow insight.",
    tags: ["Data", "Python"],
    status: "archived",
    year: "2024",
    url: "https://github.com/allison-pham/youflow-data-analyzer",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 15,
    title: "BioQuest",
    description: "Bio-focused project exploration and prototyping.",
    tags: ["Biology", "Data"],
    status: "archived",
    year: "2024",
    url: "https://github.com/allison-pham/bioquest",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 16,
    title: "Quick Study",
    description: "Reduce and optimize study sessions.",
    tags: ["Python"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/quick-study",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 17,
    title: "AppSort",
    description: "Streamline the application review process.",
    tags: ["Python", "pandas"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/appsort",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 18,
    title: "PantryPilot",
    description: "Streamline grocery shopping with a few clicks.",
    tags: ["Python", "scikit-learn", "pandas", "NumPy"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/grocery-in-one",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 19,
    title: "Life Dev",
    description:
      "Increase life optimization by setting goals, improving study habits, and planning projects.",
    tags: ["C++"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/weather-reminder-system",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 20,
    title: "WeatherWise",
    description: "Receive notifications of weather changes to prepare for all situations.",
    tags: ["Python"],
    status: "shipped",
    year: "2023",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 21,
    title: "ShelfSense",
    description: "Data analysis for books with actionable reading insights.",
    tags: ["Python", "NumPy", "pandas", "Matplotlib"],
    status: "shipped",
    year: "2023",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 22,
    title: "QR Connect",
    description: "Save wifi logins and reduce setup time.",
    tags: ["Python"],
    status: "shipped",
    year: "2023",
    url: "https://github.com/allison-pham/qr-connect",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 23,
    title: "Cozy Chat",
    description: "All-in-one learning and social platform concept.",
    tags: ["Social", "Learning"],
    status: "archived",
    year: "2023",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
  },
  {
    id: 24,
    title: "Thin Ice",
    description: "Recreation of a fire puffle traversing an ice maze.",
    tags: ["Java", "libGDX"],
    status: "shipped",
    year: "2023",
    url: "https://github.com/allison-pham/thin-ice",
    homepage: "",
    featured: false,
    highlight: false,
  },
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
