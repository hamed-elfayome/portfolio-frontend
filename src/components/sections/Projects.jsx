import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useState } from 'react';
import projects from '../../data/projects.json';
import ProjectCard from '../ui/ProjectCard';

const Projects = () => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <section 
      id="projects" 
      ref={ref}
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Selected projects"
    >
      <div className={`transition-all duration-1000 delay-600 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <ul className="group/list">
          {projects.map((project, index) => (
            <li key={project.id} className="mb-12">
              <div 
                className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                <div className="z-10 sm:order-2 sm:col-span-6">
                  <h3>
                    {project.githubUrl && project.githubUrl !== '#' ? (
                      <a 
                        className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${project.title} (opens in a new tab)`}
                      >
                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                        <span>
                          {project.title}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path>
                          </svg>
                        </span>
                      </a>
                    ) : (
                      <span className="font-medium leading-tight text-slate-200 text-base">{project.title}</span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm leading-normal text-slate-400 transition-all duration-500 ease-in-out">
                    {hoveredProject === project.id ? project.description : project.summary}
                  </p>
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a 
                      className="relative mt-2 inline-flex items-center text-sm font-medium text-slate-300 hover:text-teal-300 focus-visible:text-teal-300"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`View ${project.title} on GitHub (opens in a new tab)`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mr-1 h-3 w-3" aria-hidden="true">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd"></path>
                      </svg>
                      <span>View on GitHub</span>
                    </a>
                  )}
                  <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                    {project.technologies.map((tech, techIndex) => (
                      <li key={techIndex} className="mr-1.5 mt-2">
                        <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                          {tech}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Project Card Component */}
                <ProjectCard project={project} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Projects;