export type ReadingStatus = "read" | "reading" | "want";

export type Book = {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  status: ReadingStatus;
  annotation?: string;
  tags: string[];
  year?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  spineColor?: string;
  category?: string;
  keyTakeaways?: string[];
  favoriteQuotes?: string[];
};

export const books: Book[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "",
    status: "want",
    year: "n/a",
    category: "self-improvement",
    tags: [],
    spineColor: "bg-yellow-300",
    annotation: "N/A",
    keyTakeaways: ["N/A"],
    favoriteQuotes: ["N/A"],
  },

  {
    id: "attention",
    title: "Attention and Effort",
    author: "Daniel Kahneman",
    isbn: "9780130505187",
    status: "read",
    rating: 4,
    year: "2025",
    annotation: "Denser than Thinking Fast and Slow but more precise about the actual mechanisms.",
    tags: ["cognition", "research"],
    spineColor: "bg-yellow-300",
  },

  {
    id: "cathedral",
    title: "The Cathedral and the Bazaar",
    author: "Eric S. Raymond",
    isbn: "9780596001087",
    status: "read",
    rating: 4,
    year: "2025",
    annotation: "Open source as a social system, not just a licensing model.",
    tags: ["engineering", "culture"],
    spineColor: "bg-gray-400",
  },

  {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    status: "read",
    rating: 3,
    year: "2023",
    annotation: "Some of it is dogma, but the naming chapter is genuinely worth the whole book.",
    tags: ["engineering"],
    spineColor: "bg-blue-300",
  },

  {
    id: "design-justice",
    title: "Design Justice",
    author: "Sasha Costanza-Chock",
    isbn: "9780262043458",
    status: "want",
    annotation: "Next on the list - inclusive design as a systemic practice, not an accessibility checklist.",
    tags: ["design", "accessibility"],
    spineColor: "bg-emerald-300",
  },

  {
    id: "doet",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    isbn: "9780465050659",
    status: "read",
    rating: 5,
    year: "2023",
    annotation: "Made me stop blaming myself when I couldn't figure out a door.",
    tags: ["design", "HCI"],
    spineColor: "bg-pink-300",
    keyTakeaways: ["N/A"],
    favoriteQuotes: ["N/A"],
  },

  {
    id: "dorian-gray",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    isbn: "",
    status: "read",
    category: "gothic-fiction",
    tags: ["fiction"],
    spineColor: "bg-blue-300",
    annotation: "As Dorian Gray sinks into a worse life, his body retains his youth, while his painted portrait decays to reflect his inner self.",
    keyTakeaways: ["N/A"],
    favoriteQuotes: ["N/A"],
  },

  {
    id: "earnest",
    title: "The Importance of Being Earnest",
    author: "Oscar Wilde",
    isbn: "",
    status: "read",
    category: "satirical-play",
    tags: ["fiction"],
    spineColor: "bg-purple-300",
    annotation: "N/A",
    keyTakeaways: ["N/A"],
    favoriteQuotes: ["N/A"],
  },

  { id: "envelope-poems", title: "Envelope Poems", author: "Emily Dickinson", isbn: "", status: "read", category: "poetry", tags: [], spineColor: "bg-gray-300", annotation: "N/A", keyTakeaways: ["N/A"], favoriteQuotes: ["N/A"] },

  {
    id: "envisioning",
    title: "Envisioning Information",
    author: "Edward Tufte",
    isbn: "9780961392116",
    status: "read",
    rating: 5,
    year: "2024",
    annotation: "Chartjunk is a moral failing - this book made that argument unforgettably.",
    tags: ["data viz", "design"],
    spineColor: "bg-gray-300",
    keyTakeaways: ["The density and precision of information design. Every page is a lesson."],
    favoriteQuotes: ["N/A"],
  },

  {
    id: "flow",
    title: "Flow",
    author: "Mihaly Csikszentmihalyi",
    isbn: "9780061339202",
    status: "read",
    rating: 4,
    year: "2025",
    annotation: "Optimal experience as a design target - not just UX buzzword, an actual psychological state.",
    tags: ["cognition", "design"],
    spineColor: "bg-purple-300",
    keyTakeaways: ["The psychology of optimal experience and how design can get out of the way."],
    favoriteQuotes: ["N/A"],
  },

  {
    id: "great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "",
    status: "read",
    category: "literary-fiction",
    tags: ["fiction"],
    spineColor: "bg-emerald-300",
    annotation: "N/A",
    keyTakeaways: ["N/A"],
    favoriteQuotes: ["N/A"],
  },

  {
    id: "humane",
    title: "The Humane Interface",
    author: "Jef Raskin",
    isbn: "9780201379372",
    status: "read",
    rating: 5,
    year: "2024",
    annotation: "The most radical interface design book I've read - half of it I disagree with.",
    tags: ["HCI", "design"],
    spineColor: "bg-orange-300",
  },

  {
    id: "inspired",
    title: "Inspired",
    author: "Marty Cagan",
    isbn: "9781119387503",
    status: "reading",
    rating: 4,
    year: "2026",
    annotation: "The clearest writing on what product management actually is versus what people think it is.",
    tags: ["product"],
    spineColor: "bg-red-300",
  },

  { id: "mastery", title: "Mastery", author: "Robert Greene", isbn: "", status: "want", category: "", tags: [], spineColor: "bg-orange-300", annotation: "N/A", keyTakeaways: ["N/A"], favoriteQuotes: ["N/A"] },

  {
    id: "pragmatic",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    isbn: "9780135957059",
    status: "read",
    rating: 4,
    year: "2024",
    annotation: "The chapter on orthogonality changed how I structure code more than any pattern book.",
    tags: ["engineering"],
    spineColor: "bg-cyan-300",
  },

  {
    id: "space-human",
    title: "Space Human Factors Engineering",
    author: "Matthew Ondler",
    isbn: "9781119681380",
    status: "want",
    annotation: "NASA-grade HCI for space systems - the intersection of everything I care about.",
    tags: ["HCI", "space"],
    spineColor: "bg-indigo-300",
  },

  { id: "the-alchemist", title: "The Alchemist", author: "Paulo Coelho", isbn: "", status: "read", category: "", tags: [], spineColor: "bg-gray-300", annotation: "N/A", keyTakeaways: ["N/A"], favoriteQuotes: ["N/A"] },

  {
    id: "thinking-fast",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    isbn: "9780374533557",
    status: "read",
    rating: 5,
    year: "2023",
    annotation: "System 1 and System 2 became the mental model I use most in interface design.",
    tags: ["cognition", "psychology"],
    spineColor: "bg-gray-300",
    keyTakeaways: ["How System 1 and System 2 shape every decision and interface."],
    favoriteQuotes: ["N/A"],
  },

  {
    id: "visual-display",
    title: "The Visual Display of Quantitative Information",
    author: "Edward Tufte",
    isbn: "9781930824133",
    status: "read",
    rating: 5,
    year: "2024",
    annotation: "Data-ink ratio is now a thing I calculate mentally every time I make a chart.",
    tags: ["data viz", "design"],
    spineColor: "bg-slate-300",
  },

  {
    id: "zero-to-one",
    title: "Zero to One",
    author: "Peter Thiel",
    isbn: "9780804139021",
    status: "read",
    rating: 4,
    year: "2024",
    annotation: "Competition is for losers - the most contrarian useful frame for thinking about products.",
    tags: ["product", "startups"],
    spineColor: "bg-red-400",
    keyTakeaways: ["Changed how I think about 0→1."],
    favoriteQuotes: ["N/A"],
  },
];

export const allBookTags = [...new Set(books.flatMap((b) => b.tags))];

export const statusConfig: Record<ReadingStatus, { label: string; color: string; dot: string }> = {
  read: { label: "read", color: "text-green-500", dot: "bg-green-500" },
  reading: { label: "reading", color: "text-yellow-500", dot: "bg-yellow-500 animate-pulse" },
  want: { label: "want to read", color: "text-blue-400", dot: "bg-blue-400" },
};

export function coverUrl(isbn: string, size: "S" | "M" | "L" = "M") {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
}
