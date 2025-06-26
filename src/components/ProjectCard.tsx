interface ProjectCardProps {
  title: string;
  description: string;
  technologies?: string[];
  githubLink?: string;
  figmaLink?: string;
  demoLink?: string;
}

export default function ProjectCard({ 
  title, 
  description, 
  technologies = [],
  githubLink,
  figmaLink,
  demoLink
}: ProjectCardProps) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-purple-400/50 hover:bg-gray-800/70 transition-all duration-300">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      
      <p className="text-gray-300 mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies?.map((tech) => (
          <span 
            key={tech}
            className="text-xs bg-gray-700 px-2 py-1 rounded-md text-gray-300"
          >
            <span className="text-purple-400"># </span>
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 text-sm">
        {githubLink && (
          <a 
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors"
          >
            GitHub
          </a>
        )}
        
        {figmaLink && (
          <a 
            href={figmaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors"
          >
            Figma
          </a>
        )}
        
        {demoLink && (
          <a 
            href={demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-400 transition-colors"
          >
            Demo
          </a>
        )}
      </div>
    </div>
  );
}