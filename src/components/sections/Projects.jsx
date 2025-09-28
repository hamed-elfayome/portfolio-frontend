import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useState } from 'react';
import projects from '../../data/projects.json';
import ProjectCard from '../ui/ProjectCard';
import ProjectPopover from '../ui/ProjectPopover';

const Projects = () => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsPopoverOpen(true);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="snap-section"
      aria-label="Selected projects"
    >
      <div className={`w-full max-w-4xl mx-auto transition-all duration-1000 delay-600 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Mobile Section Title */}
        <div className="lg:hidden mb-8">
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Projects</h2>
          <p className="text-slate-400 text-sm">Selected work and personal projects</p>
        </div>
        <ul className="group/list">
          {projects.map((project, index) => (
            <li key={project.id} className={`${index === projects.length - 1 ? 'mb-0' : 'mb-12'}`}>
              <div
                className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                <div className="z-10 sm:order-2 sm:col-span-6">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <h3>
                        <span className="font-medium leading-tight text-slate-200 hover:text-teal-300 text-base mb-1 transition-colors">
                          {project.title}
                        </span>
                      </h3>
                      <div className="absolute -bottom-1 left-0 h-px bg-slate-600/40 w-full">
                        <div className="h-full bg-teal-400 transition-all duration-500 ease-out group-hover:w-full w-0"></div>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:scale-110 transition-all duration-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  </div>
                  <p className="mt-2 text-sm leading-normal text-slate-400">
                    {project.summary}
                  </p>
                  <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                    {project.technologies.map((tech, techIndex) => (
                      <li key={techIndex} className="mr-1.5 mt-2">
                        <div className="relative px-1.5 py-0.5 text-[10px] font-medium leading-5 text-teal-300 bg-teal-400/5 border border-teal-400/20 rounded-md backdrop-blur-sm transition-all duration-300 group-hover:border-teal-400/15 group-hover:bg-teal-400/10">
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

      {/* Project Details Popover */}
      <ProjectPopover
        project={selectedProject}
        isOpen={isPopoverOpen}
        onClose={handleClosePopover}
      />
    </section>
  );
};

export default Projects;