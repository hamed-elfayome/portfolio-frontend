import { useState, useEffect } from 'react';
import socialLinks from '../../data/socialLinks.json';
import navLinks from '../../data/navigation.json';
import personalInfo from '../../data/personalInfo.json';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { scrollToSection } from '../../utils/helpers';
import avatarImage from '../../assets/images/avatar.png';

const Sidebar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(navLinks.map(link => link.href.substring(1)), 100);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    const sectionId = href.substring(1);
    scrollToSection(sectionId);
  };

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        {/* Avatar */}
        <div className="relative h-fit w-fit mb-8 flex justify-center lg:justify-start group">
          <img 
            src={avatarImage} 
            alt={`${personalInfo.name} avatar`}
            className="relative z-10 w-28 h-28 object-cover rounded-full transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute z-0 top-0 right-3 bg-accent w-10 h-14 transition-all duration-500 group-hover:translate-x-4 group-hover:translate-y-2 group-hover:opacity-0"></div>
          <div className="absolute z-0 bottom-0 left-4 bg-primary/10 w-9 h-16 transition-all duration-500 group-hover:-translate-x-4 group-hover:-translate-y-2 group-hover:opacity-0"></div>
          <div className="absolute z-0 bottom-12 bg-primary w-full h-6 transition-all duration-500 group-hover:translate-y-16 group-hover:h-1 group-hover:opacity-70"></div>
        </div>
        
        {/* Name */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-200 sm:text-4xl">
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-primary transition-colors duration-300"
          >
            {personalInfo.name}
          </button>
        </h1>

        {/* Title */}
        <h2 className="mt-3 text-base font-medium tracking-tight text-slate-200 sm:text-lg">
          {personalInfo.title}
        </h2>

        {/* Tagline */}
        <p className="mt-4 max-w-xs leading-normal text-sm text-slate-400">
          {personalInfo.tagline}
        </p>

        {/* Navigation */}
        <nav className="nav hidden lg:block" aria-label="In-page jump links">
          <ul className="mt-16 w-max">
            {navLinks.map((link, index) => (
              <li key={link.name}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`group flex items-center py-3 ${
                    activeSection === link.href.substring(1) ? 'active' : ''
                  }`}
                >
                  <span className={`nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${
                    activeSection === link.href.substring(1) ? 'w-16 bg-slate-200' : ''
                  }`}></span>
                  <span className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200 ${
                    activeSection === link.href.substring(1) ? 'text-slate-200' : 'text-slate-500'
                  }`}>
                    {link.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Social Links */}
      <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
          {socialLinks.map((social) => (
            <li key={social.name} className="mr-5 shrink-0 text-xs">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-slate-200"
                aria-label={`${social.name} (opens in a new tab)`}
                title={social.name}
              >
                <span className="sr-only">{social.name}</span>
                {social.icon === 'github' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                )}
                {social.icon === 'linkedin' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                )}
                {social.icon === 'twitter' && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                  </svg>
                )}
                {social.icon === 'email' && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
                    </svg>
                )}
                {social.icon === 'phone' && (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"
                         aria-hidden="true">
                      <path
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>
      </header>
  );
};

export default Sidebar;
