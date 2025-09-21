import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useState } from 'react';
import experience from '../../data/experience.json';

const Experience = () => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <section 
      id="experience" 
      ref={ref}
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Work experience"
    >
      <div className={`transition-all duration-1000 delay-400 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <ol className="group/list">
          {experience.map((exp, index) => (
                   <li key={exp.id} className="mb-12">
                     <div 
                       className="group relative grid pb-1 transition-all sm:grid-cols-12 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
                       onMouseEnter={() => setHoveredItem(exp.id)}
                       onMouseLeave={() => setHoveredItem(null)}
                     >
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-3" aria-label={exp.period}>
                  {exp.period}
                </header>
                <div className="z-10 sm:col-span-9">
                  <h3 className="font-medium leading-snug text-slate-200">
                    <div>
                      {exp.companyUrl && exp.companyUrl !== '#' ? (
                        <a 
                          className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${exp.position} at ${exp.company} (opens in a new tab)`}
                        >
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                          <span>
                            {exp.position} · <span className="inline-block">
                              {exp.company}
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path>
                              </svg>
                            </span>
                          </span>
                        </a>
                      ) : (
                        <span>{exp.position} · {exp.company}</span>
                      )}
                    </div>
                  </h3>
                         <p className="mt-2 text-sm leading-normal text-slate-400 transition-all duration-500 ease-in-out">
                           {hoveredItem === exp.id ? exp.description : exp.summary}
                         </p>
                  <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                    {exp.technologies.map((tech, techIndex) => (
                      <li key={techIndex} className="mr-1.5 mt-2">
                        <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                          {tech}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
