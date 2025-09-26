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
                  <h3>
                    <span className="font-medium leading-tight text-slate-200 hover:text-teal-300 text-base transition-colors">
                      {project.title}
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-normal text-slate-400">
                    {project.summary}
                  </p>
                  <div className="mt-2 text-sm text-slate-400">
                    Click to view full project details →
                  </div>
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