import ProjectCard from '../../components/ProjectCard';

const projects = [
  {
    title: "Current Work",
    description: "Exploring to optimize products for solutions in finance and healthcare. Additional initiatives: research, policy, and writing.",
  },
  {
    title: "Assistify",
    description: "Receive tailored support with quality responses",
    technologies: ["Next.js", "TypeScript", "Material UI", "OpenAI API"],
    githubLink: "https://github.com/allison-pham/assistify",
  },
  {
    title: "WellNest",
    description: "Effortlessly track nutrition",
    technologies: ["Next.js", "Firebase", "Material UI"],
  },
  {
    title: "Eevi",
    description: "The 0-> 1 software tool",
    technologies: ["React"],
    githubLink: "https://github.com/allison-pham/eevi-side-quests",
  },
  {
    title: "Grocery in One",
    description: "Streamline grocery shopping with a few clicks",
    technologies: ["Python", "scikit-learn", "pandas", "NumPy", "Machine Learning", "Data Science"],
    githubLink: "https://github.com/allisonpham/grocery-in-one",
  },
  {
    title: "Weather Reminder System",
    description: "Receive notifications of weather changes to prepare for all situations",
    technologies: ["Python", "Systems Design"],
  },
  {
    title: "Books Data Analysis",
    description: "Analyze book data to draw effective conclusions",
    technologies: ["Python", "pandas", "NumPy", "Matplotlib", "Data Science"],
    githubLink: "https://github.com/allisonpham/books-data-analysis",
  },
];

export default function ProjectsPage() {
  return (
    <main className="px-12 sm:px-36 md:px-52 lg:px-72 xl:px-80 py-20 max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Projects</h1>
        <p className="text-gray-300 text-lg max-w-2xl">
          My collection of techology solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No projects to display yet.</p>
        </div>
      )}
    </main>
  );
}