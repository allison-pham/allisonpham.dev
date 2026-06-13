export interface Experience {
  id: string
  role: string
  company: string
  companyUrl?: string
  logo?: string
  period: string
  type: string
  current: boolean
  description: string
  highlights: string[]
  tags: string[]
  labels?: string[]
  hasReadMore?: boolean
}

export const experiences: Experience[] = [
  {
    id: "lab",
    role: "Researcher",
    company: "Lab",
    companyUrl: "",
    logo: "",
    period: "Mar 2026 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Research projects and initiatives in the context of HCI in space and neurotech",
      "Interaction in microgravity environments",
      "Conducting user research, designing experiments, and developing prototypes to explore human-robot interaction in microgravity environments"
    ],
    tags: ["HCI"],
    hasReadMore: false,
  },

  {
    id: "hack-for-la",
    role: "Product & Strategy",
    company: "Hack for LA",
    logo: "/experiences/hack-for-la.svg",
    companyUrl: "",
    period: "Jan 2026 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
    ],
    tags: [],
    hasReadMore: false,
  },

  {
    id: "notion",
    role: "Campus Leader",
    company: "Notion",
    logo: "/experiences/notion.svg",
    companyUrl: "https://notion.so",
    period: "Sep 2025 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Building community and reaching students across campus via productivity tools",
      "Empowering students to bring impact and project visions to life"
    ],
    tags: ["Productivity", "Community"],
    hasReadMore: false,
  },

  {
    id: "productembark",
    role: "Product Designer",
    company: "ProductEmbark",
    logo: "",
    companyUrl: "",
    period: "Jun 2025 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Product building, operations, etc."
    ],
    tags: [],
    hasReadMore: false,
  },

  {
    id: "citrus-hack",
    role: "Director (Prev UI/UX Design & Operations)",
    company: "Citrus Hack",
    logo: "/experiences/citrus-hack.svg",
    companyUrl: "https://citrushack.com",
    period: "May 2025 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Previous UI/UX Design & Operations Lead (Dec 2024 - Jun 2025)",
      "Lead hackathon organizers to plan the Inland Empire's largest and oldest student-run hackathon (by ACM at UCR) with 300+ participants and 45 projects submitted",
      "Manage teams and processes across operations, finance, marketing, UI/UX design, and software engineering",
      "Coordinate total of 25 industry professionals (Amazon, Google, Salesforce, Visa, etc.), 20 sponsors and partners (secure 15+), 15+ tracks and prizes, and 10+ mini events"
    ],
    tags: ["Hackathon"],
    hasReadMore: true,
  },

  {
    id: "cutie-hack",
    role: "Director (Prev Operations)",
    company: "Cutie Hack",
    logo: "/experiences/cutie-hack.svg",
    companyUrl: "https://cutiehack.com",
    period: "May 2025 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Previous Operations Lead (Jun 2024 - Jun 2025) & Operations Committee (Oct 2023 - May 2024)"
    ],
    tags: ["Hackathon"],
    hasReadMore: true,
  },

  {
    id: "acm",
    role: "President (Prev Events)",
    company: "ACM at UCR",
    logo: "/experiences/acm.svg",
    companyUrl: "https://acm.cs.ucr.edu",
    period: "Apr 2025 - Present",
    type: "",
    current: true,
    description:
      "ACM = Association for Computing Machinery",
    highlights: [
      "Previous Event Chair (Feb 2024 - Jun 2025) & Board Intern (Oct 2023 - Mar 2024)"
    ],
    tags: ["Computer Science", "Engineering"],
    hasReadMore: true,
  },

  {
    id: "gamespawn",
    role: "Treasurer (Prev Projects & Workshops)",
    company: "Gamespawn",
    logo: "/experiences/gamespawn.svg",
    companyUrl: "https://gamespawn.cs.ucr.edu",
    period: "Mar 2025 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Previous Project + Workshop Coordinator (Mar 2024 - Jun 2025) & Junior Officer (Dec 2023 - Mar 2024)"
    ],
    tags: [],
    hasReadMore: false,
  },

  {
    id: "drenith",
    role: "Content & Writing",
    company: "Drenith",
    logo: "",
    companyUrl: "",
    period: "Sep 2024 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Writing about tech"
    ],
    tags: [],
    hasReadMore: false,
  },

  {
    id: "daylyx",
    role: "Engineer",
    company: "Daylyx",
    logo: "",
    companyUrl: "",
    period: "Jan 2024 - Present",
    type: "",
    current: true,
    description:
      "",
    highlights: [
      "Working on AI/ML models"
    ],
    tags: [],
    hasReadMore: false,
  },

  {
    id: "nasa-research",
    role: "Design & Research (Autonomous Traversal)",
    company: "NASA",
    companyUrl: "https://nasa.gov",
    logo: "/experiences/nasa.svg",
    period: "Jan 2026 - May 2026",
    type: "",
    current: false,
    description:
      "",
    highlights: [
    ],
    tags: ["Space"],
    hasReadMore: false,
  },

  {
    id: "asucr",
    role: "College of Engineering Senator",
    company: "Associated Students of UCR (ASUCR)",
    logo: "/experiences/asucr.svg",
    companyUrl: "",
    period: "May 2024 - Apr 2025",
    type: "Previous",
    current: false,
    description:
      "Full title: Bourns College of Engineering (BCOE) Senator",
    highlights: [
      "Previous Executive Fellow (Oct 2023 - Jun 2024), Senate Intern (Nov 2023 - Jun 2024), etc."
    ],
    tags: [],
    hasReadMore: false,
  },

  {
    id: "inkfuse",
    role: "Engineer",
    company: "InkFuse",
    logo: "",
    companyUrl: "",
    period: "Aug 2024 - Mar 2025",
    type: "Previous",
    current: false,
    description:
      "",
    highlights: [
    ],
    tags: [],
    hasReadMore: false,
  },

  {
    id: "nasa-engineering",
    role: "Lead Systems Engineer (L'SPACE)",
    company: "NASA",
    logo: "/experiences/nasa.svg",
    companyUrl: "https://nasa.gov",
    period: "Sep 2024 - Nov 2024",
    type: "Previous",
    current: false,
    description:
      "",
    highlights: [
    ],
    tags: ["Space"],
    hasReadMore: false,
  },

  {
    id: "nucleo",
    role: "Software Engineer & Research Intern",
    company: "Nucleo Research",
    logo: "/experiences/nucleo.svg",
    companyUrl: "https://nucleoresearch.com",
    period: "Aug 2024 - Sep 2024",
    type: "Previous",
    current: false,
    description:
      "Full title: Software Engineer & Research Development Intern",
    highlights: [
    ],
    tags: ["Neurotech"],
    hasReadMore: false,
  },

  {
    id: "ucr",
    role: "Computer Science Grader",
    company: "University of California, Riverside",
    logo: "/experiences/ucr.svg",
    companyUrl: "https://ucr.edu",
    period: "Jan 2024 - Mar 2024",
    type: "Previous",
    current: false,
    description:
      "",
    highlights: [
      "Department of CS & Engineering",
    ],
    tags: ["Computer Science", "Education"],
    hasReadMore: false,
  },
]

export const filterTags = ["all", "current", "previous"] as const
export type FilterTag = (typeof filterTags)[number]
 
export function getFilterCount(filter: string, exps: Experience[]): number {
  if (filter === "all") return exps.length
  if (filter === "current") return exps.filter((e) => e.current).length
  if (filter === "previous") return exps.filter((e) => !e.current).length
  return exps.filter((e) => e.tags.includes(filter)).length
}
 
export function filterExperiences(activeFilters: string[], exps: Experience[]): Experience[] {
  if (activeFilters.includes("all")) return exps
  return exps.filter((exp) =>
    activeFilters.some((f) => {
      if (f === "current") return exp.current
      if (f === "previous") return !exp.current
      return exp.tags.includes(f)
    })
  )
}
 
export function getSafeExternalUrl(url?: string): string | undefined {
  if (!url) return undefined
  const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`
  try {
    const parsed = new URL(normalized)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return undefined
    return parsed.toString()
  } catch {
    return undefined
  }
}