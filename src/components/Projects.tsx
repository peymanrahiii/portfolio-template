import { Project } from '@/types/portfolio';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Projects & Portfolio
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-indigo-300 transition duration-300 hover:shadow-lg"
            >
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                {project.name}
              </h4>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 