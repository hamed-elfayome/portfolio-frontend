import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds, offset = 100) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      
      // Find the section that's currently in view
      let currentSection = '';
      
      for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          
          // If we've scrolled past this section, it's the current one
          if (scrollPosition >= sectionTop) {
            currentSection = sectionIds[i];
          } else {
            // If we haven't reached this section yet, stop looking
            break;
          }
        }
      }
      
      // If no section is found and we're at the top, set the first section
      if (!currentSection && scrollPosition < 200) {
        currentSection = sectionIds[0] || '';
      }
      
      setActiveSection(currentSection);
    };

    // Set initial active section
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};
