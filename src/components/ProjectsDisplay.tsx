import React from 'react';

interface Project {
  title: string;
  description: string;
  githubLink: string;
  deployedLink: string;
  technologies: string[];
}

interface ProjectsDisplayProps {
  projects: Project[];
}

const ProjectsDisplay: React.FC<ProjectsDisplayProps> = ({ projects }) => {
  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div key={index} className="border border-terminal-border rounded-md p-4 bg-terminal-bg/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-terminal-success">█</span>
            <h3 className="text-terminal-success font-bold text-lg">{project.title}</h3>
          </div>
          
          <p className="text-terminal-text mb-3 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.map((tech, techIndex) => (
              <span 
                key={techIndex}
                className="px-2 py-1 bg-terminal-border/20 text-terminal-info text-sm rounded border border-terminal-border"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex gap-4 text-sm">
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-info hover:text-terminal-success transition-colors duration-300 flex items-center gap-1"
            >
              <span>📂</span> GitHub
            </a>
            <a 
              href={project.deployedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-info hover:text-terminal-success transition-colors duration-300 flex items-center gap-1"
            >
              <span>🌐</span> Live Demo
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsDisplay;