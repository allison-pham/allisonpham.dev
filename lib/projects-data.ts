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
  hasCaseStudy?: boolean
  thumbnailSrc?: string
  thumbnailAlt?: string
  caseStudy?: Partial<ProjectCaseStudy>
}

export type Project = ProjectSeed & {
  slug: string
}

const projectSeeds: ProjectSeed[] = [
  {
    id: "acadence",
    title: "Acadence",
    description: "Web app that includes all notifications from Canvas, Gradescope, zyBooks, etc.",
    tags: [],
    status: "in progress",
    year: "2026",
    url: "https://github.com/allison-pham/acadence",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "ingredia",
    title: "Ingredia",
    description: "Social platform for checking ingredients within products",
    tags: ["React", "JavaScript", "Express.js", "Figma"],
    status: "in progress",
    year: "2026",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "citrus-cutie-hack-main-website",
    title: "Citrus & Cutie Hack: Main Website",
    description: "Main (central) website for ACM at UCR's hackathons (Citrus and Cutie Hack)",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Supabase", "Clerk", "Figma"],
    status: "in progress",
    year: "2026",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "component-library",
    title: "Component Library",
    description: "",
    tags: [],
    status: "ideation",
    year: "2026",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "hci-in-space",
    title: "HCI in Space",
    description: "Cognitive load in environments and microgravity interaction design (HCI concepts adapted for astronaut workflows)",
    tags: [],
    status: "ideation",
    year: "2026",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "terraground",
    title: "TerraGround",
    description: "Emergency system",
    tags: ["Next.js", "TypeScript", "Figma"],
    status: "in progress",
    year: "2026",
    url: "https://github.com/allison-pham/terraground",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "nexa",
    title: "Nexa",
    description: "AI agent - building autonomous workflows to speed up repetitive tasks",
    tags: ["Next.js", "TypeScript", "Figma"],
    status: "in progress",
    year: "2026",
    url: "https://github.com/allison-pham/nexa",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "personality-quiz",
    title: "Personality Quiz",
    description: "Interactive quiz experiments for personality-driven recommendations",
    tags: [],
    status: "ideation",
    year: "2026",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "awesome-engineering-resources",
    title: "Awesome Engineering Resources",
    description: "Resources for computer science, electrical engineering, product design, and product management",
    tags: ["Markdown"],
    status: "in progress",
    year: "2025",
    url: "https://github.com/allison-pham/awesome-engineering-resources",
    homepage: "",
    featured: true,
    highlight: true,
    hasCaseStudy: false
  },

  {
    id: "github-package",
    title: "GitHub Package",
    description: "",
    tags: [],
    status: "ideation",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "figma-plugin-tool",
    title: "Figma Plugin Tool",
    description: "",
    tags: [],
    status: "ideation",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "ml-models",
    title: "ML Models",
    description: "Machine learning model prototypes for applied use cases",
    tags: [],
    status: "ideation",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "neurowell",
    title: "NeuroWell",
    description: "Accessible platform for neuroscience",
    tags: [],
    status: "ideation",
    year: "2025",
    url: "https://github.com/allison-pham/neurowell",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "missionsync",
    title: "MissionSync",
    description: "Deep space communication",
    // Space asset directory and data exploration for orbital mission insights
    tags: [],
    status: "ideation",
    year: "2025",
    url: "https://github.com/allison-pham/missionsync",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "astrotrade",
    title: "AstroTrade",
    description: "Enhancing space systems, 1 step at a time - space logistics and mission coordination",
    tags: [],
    status: "ideation",
    year: "2025",
    url: "https://github.com/allison-pham/astrotrade",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "cognistack",
    title: "CogniStack",
    description: "Tech resources web app (learning system for computer science x electrical engineering x product)",
    tags: ["Next.js", "TypeScript", "Figma"],
    status: "in progress",
    year: "2025",
    url: "https://github.com/allison-pham/cognistack",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "thinksync",
    title: "Thinksync",
    description: "Cognitive UX platform (with a software-focused BCI system) inspired by neuromorphic engineering, leveraging neural networks and sensory feedback for adaptive HCI",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Supabase", "PyTorch", "WebSockets"],
    status: "in progress",
    year: "2025",
    url: "https://github.com/allison-pham/thinksync",
    homepage: "",
    featured: true,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "productembark-website",
    title: "ProductEmbark: Website",
    description: "",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    status: "in progress",
    year: "2025",
    url: "https://github.com/productembark/product-embark-website",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "project-design-template",
    title: "Project Design Template",
    description: "Template for projects",
    tags: ["Figma"],
    status: "shipped",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "musely",
    title: "Musely",
    description: "A jar collection of mood journaling combined with favorite music albums",
    tags: ["React", "Vite", "Tailwind CSS", "JavaScript", "Figma"],
    status: "in progress",
    year: "2025",
    url: "https://github.com/allison-pham/musely",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "finflow",
    title: "FinFlow",
    description: "Fintech x healthcare (financial software - personal finance workflow concept for better money habits)",
    tags: [],
    status: "archived",
    year: "2025",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "client-chat-bot",
    title: "Client Chat Bot",
    description: "A chat bot for client communication",
    tags: ["Next.js", "CSS", "JavaScript", "Python", "Flask", "SQLite", "Docker"],
    status: "shipped",
    year: "2024",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "ai-bot-integration",
    title: "AI Bot Integration",
    description: "Integrate AI bot with retrieval-augmented generation (RAG) for apps (Notion, etc.)",
    tags: ["Python"],
    status: "shipped",
    year: "2024",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "boilerplate",
    title: "Boilerplate",
    description: "Template for projects",
    tags: ["Next.js", "TypeScript"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/boilerplate",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "assistify",
    title: "Assistify",
    description: "AI customer support (questions → quality responses)",
    tags: ["Next.js", "Material UI", "JavaScript"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/assistify",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "wellnest",
    title: "WellNest",
    description: "Pantry tracker for effortless nutrition tracking",
    tags: ["Next.js", "Material UI", "JavaScript", "Firebase", "Figma"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/wellnest",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "eevi",
    title: "Eevi",
    description: "0→1 software tool for productivity and side quests",
    tags: ["React", "CSS", "JavaScript"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/eevi",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "enviropath",
    title: "EnviroPath",
    description: "",
    tags: ["Figma"],
    status: "shipped",
    year: "2024",
    url: "",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "youflow",
    title: "YouFlow",
    description: "Data analyzer for healthcare research",
    tags: ["Python", "pandas", "Figma"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/youflow",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "bioquest",
    title: "BioQuest",
    description: "Gamification meets sustainability",
    tags: ["HTML", "CSS", "JavaScript", "Python", "Figma"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/bioquest",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "quick-study",
    title: "Quick Study",
    description: "Reduce and optimize study sessions",
    tags: ["Python"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/quick-study",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "appsort",
    title: "AppSort",
    description: "Streamline the application review process",
    tags: ["Python", "pandas"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/appsort",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "task-dev-bot",
    title: "Task Dev Bot",
    description: "Task management Discord bot",
    tags: ["Python"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/task-dev-bot",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "pantrypilot",
    title: "PantryPilot",
    description: "Streamline grocery shopping with a few clicks (grocery in one)",
    tags: ["Python", "scikit-learn", "pandas", "NumPy"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/pantrypilot",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "life-dev",
    title: "Life Dev",
    description: "Productivity solver for task and time management",
    tags: ["C++"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/life-dev",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "task-flow",
    title: "Task Flow",
    description: "Task scheduler to track flow of to do lists",
    tags: ["Vue.js", "JavaScript", "Python", "Flask"],
    status: "shipped",
    year: "2024",
    url: "https://github.com/allison-pham/task-flow",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "weatherwise",
    title: "WeatherWise",
    description: "Weather notification system to prepare for all situations",
    tags: ["Python"],
    status: "shipped",
    year: "2023",
    url: "https://github.com/allison-pham/weatherwise",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false,
    thumbnailSrc: "/projects/weatherwise.svg",
    thumbnailAlt: "WeatherWise cover"
  },

  {
    id: "shelf-sense",
    title: "Shelf Sense",
    description: "Data analysis for books to seamlessly draw effective conclusions",
    tags: ["Python", "NumPy", "pandas", "Matplotlib"],
    status: "shipped",
    year: "2023",
    url: "https://github.com/allison-pham/shelf-sense",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "qr-connect",
    title: "QR Connect",
    description: "Save wifi logins → save time (through QR codes)",
    tags: ["Python"],
    status: "shipped",
    year: "2023",
    url: "https://github.com/allison-pham/qr-connect",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false,
    thumbnailSrc: "/projects/qr-connect.svg",
    thumbnailAlt: "QR Connect cover"
  },

  {
    id: "cozy-chat",
    title: "Cozy Chat",
    description: "All-in-one platform (learning x productivity x social media) with syncing across platforms (GitHub, Instagram, Notion, Twitter)",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Figma"],
    // tags: ["Education"],
    status: "archived",
    year: "2023",
    url: "https://github.com/allison-pham/cozy-chat",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "frigerator-sim",
    title: "Frigerator Sim(ulator)",
    description: "Reduce food waste and increase efficiency",
    tags: ["C++"],
    status: "shipped",
    year: "2023",
    url: "https://github.com/pilafnoodle/FridgeSimulator",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false
  },

  {
    id: "flappy-bird",
    title: "Flappy Bird",
    description: "Childhood game recreated",
    tags: ["C#", "Unity"],
    status: "shipped",
    year: "2023",
    url: "https://github.com/allison-pham/flappy-bird",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false,
    thumbnailSrc: "/projects/flappy-bird.svg",
    thumbnailAlt: "Flappy Bird cover"
  },

  {
    id: "thin-ice",
    title: "Thin Ice",
    description: "Remake of a childhood game (fire puffle that traverses an ice maze), built for personal learning and growth",
    tags: ["Java", "libGDX"],
    status: "shipped",
    year: "2023",
    url: "https://github.com/allison-pham/thin-ice",
    homepage: "",
    featured: false,
    highlight: false,
    hasCaseStudy: false,
    thumbnailSrc: "/projects/thin-ice.svg",
    thumbnailAlt: "Thin Ice cover"
  }
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