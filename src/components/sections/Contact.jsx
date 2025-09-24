import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import contactData from '../../data/contact.json';

const Contact = () => {
  const [ref, isIntersecting] = useIntersectionObserver();

  return (
    <section 
      id="contact" 
      ref={ref}
      className="snap-section"
      aria-label="Contact"
    >
      <div className={`w-full max-w-4xl mx-auto transition-all duration-1000 delay-800 ${
        isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h2 className="text-2xl font-semibold text-slate-200 mb-6">{contactData.title}</h2>
        <p className="text-slate-400 leading-relaxed mb-8 max-w-2xl">
          {contactData.description}
        </p>
        <a 
          href={`mailto:${contactData.email}`}
          className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
        >
          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
          <span>
            {contactData.buttonText}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true">
              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path>
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
};

export default Contact;
