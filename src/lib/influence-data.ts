export type InfluenceType = "person" | "book" | "paper" | "project" | "concept";
export type InfluenceDomain = "hci" | "engineering" | "design" | "cognition" | "product" | "personal";

export type Influence = {
  id: string;
  name: string;
  type: InfluenceType;
  domain: InfluenceDomain;
  what: string; // what it is
  changed: string; // one sentence on what it changed
  url?: string;
  year?: string;
};

export const influences: Influence[] = [
  {
    id: "don-norman",
    name: "Don Norman",
    type: "person",
    domain: "hci",
    year: "ongoing",
    url: "https://jnd.org",
    what: "Cognitive scientist, author of The Design of Everyday Things",
    changed: "Reframed every bad interface as a design failure, not a user failure.",
  },
  { id: "jef-raskin", name: "Jef Raskin", type: "person", domain: "hci", year: "ongoing", what: "Human interface pioneer, designer of the original Mac UI", changed: "Convinced me that modes are the enemy of all good interfaces." },
  {
    id: "design-everyday",
    name: "The Design of Everyday Things",
    type: "book",
    domain: "design",
    year: "2023",
    url: "https://www.basicbooks.com/titles/don-norman/the-design-of-everyday-things/9780465050659/",
    what: "Norman's foundational text on affordances, feedback, and mental models",
    changed: "Made me stop blaming myself when I couldn't figure out a door.",
  },
  {
    id: "humane-interface",
    name: "The Humane Interface",
    type: "book",
    domain: "hci",
    year: "2024",
    what: "Raskin's argument for modeless, monolithic interfaces",
    changed: "The most radical interface design book I've read - half of it I disagree with, which means it's working.",
  },
  {
    id: "thinking-fast",
    name: "Thinking, Fast and Slow",
    type: "book",
    domain: "cognition",
    year: "2023",
    url: "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow",
    what: "Kahneman's dual-process theory of human cognition",
    changed: "System 1 and System 2 became a mental model I use constantly when designing for decision-making.",
  },
  { id: "fitts-law", name: "Fitts's Law", type: "paper", domain: "hci", year: "2022", what: "1954 paper predicting pointing time as a function of distance and target size", changed: "The moment I realized interaction design has actual physics." },
  {
    id: "miller-law",
    name: "Miller's Law",
    type: "paper",
    domain: "cognition",
    year: "2022",
    what: "George Miller's 1956 paper on the limits of short-term memory (7±2)",
    changed: "Every navigation menu I design now starts with the question: how many items is too many?",
  },
  {
    id: "linear",
    name: "Linear",
    type: "project",
    domain: "product",
    year: "2023",
    url: "https://linear.app",
    what: "Issue tracker that treats product velocity as a design constraint",
    changed: "Showed me that opinionated software with strong defaults is a feature, not a limitation.",
  },
  {
    id: "notion",
    name: "Notion",
    type: "project",
    domain: "product",
    year: "2022",
    url: "https://notion.so",
    what: "Block-based productivity tool and wiki hybrid",
    changed: "Working as a Campus Leader here changed how I think about product ecosystems and community as design.",
  },
  {
    id: "figma-multi",
    name: "Figma Multiplayer",
    type: "concept",
    domain: "engineering",
    year: "2024",
    url: "https://www.figma.com/blog/multiplayer-editing-in-figma/",
    what: "Figma's CRDT-based real-time collaboration architecture",
    changed: "Multiplayer as a design constraint rather than a feature - now I think about collaboration state in everything I build.",
  },
  {
    id: "tufte",
    name: "Edward Tufte",
    type: "person",
    domain: "design",
    year: "2024",
    url: "https://www.edwardtufte.com",
    what: "Data visualization theorist and statistician",
    changed: "Chartjunk is a moral failing. Data-ink ratio is a real thing I now calculate mentally.",
  },
  {
    id: "alan-kay",
    name: "Alan Kay",
    type: "person",
    domain: "engineering",
    year: "2024",
    what: "Inventor of object-oriented programming and the Dynabook concept",
    changed: "'The best way to predict the future is to invent it' went from a poster quote to an engineering philosophy.",
  },
  {
    id: "nasa-hfds",
    name: "NASA Human Factors Design Standards",
    type: "paper",
    domain: "hci",
    year: "2025",
    url: "https://hfds.ksc.nasa.gov",
    what: "NASA's internal design standards for human-system interfaces in spacecraft",
    changed: "The most detailed document I've read on designing for high-stakes environments - changed what I think HCI research should aspire to.",
  },
  {
    id: "attention-effort",
    name: "Attention and Effort",
    type: "book",
    domain: "cognition",
    year: "2025",
    what: "Kahneman's 1973 pre-cursor to Thinking Fast and Slow",
    changed: "The earlier, denser version of dual-process theory - more precise about the actual mechanisms of attention than the popular version.",
  },
];

export const influenceDomainConfig: Record<InfluenceDomain, { color: string; bg: string; border: string }> = {
  hci: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.3)" },
  engineering: { color: "#60a5fa", bg: "rgba(96,165,250,0.12)", border: "rgba(96,165,250,0.3)" },
  design: { color: "#f472b6", bg: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.3)" },
  cognition: { color: "#34d399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)" },
  product: { color: "#fbbf24", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)" },
  personal: { color: "#fb923c", bg: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.3)" },
};

export const influenceTypeIcon: Record<InfluenceType, string> = {
  person: "◉",
  book: "▣",
  paper: "◈",
  project: "◆",
  concept: "◇",
};
