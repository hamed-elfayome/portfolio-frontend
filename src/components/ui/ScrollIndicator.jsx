import { useState, useEffect } from 'react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { scrollToSection } from '../../utils/helpers';

const ScrollIndicator = () => {
  const sectionIds = ['about', 'experience', 'projects', 'github', 'contact'];
  const activeSection = useScrollSpy(sectionIds, 100);
  const currentSection = activeSection ? sectionIds.indexOf(activeSection) : 0;
  const totalSections = sectionIds.length;

  const scrollToNext = () => {
    if (currentSection === totalSections - 1) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    } else {
      const nextSectionId = sectionIds[currentSection + 1];
      scrollToSection(nextSectionId);
    }
  };

  // Copy the exact sidebar approach
  const handleNavClick = (href) => {
    const sectionId = href.substring(1);
    console.log('ScrollIndicator calling scrollToSection with:', sectionId);
    console.log('scrollToSection function:', scrollToSection);
    scrollToSection(sectionId);
  };

  const scrollToPrev = () => {
    handleNavClick('#about');
  };

  // Always show the indicator

  return (
    <div className="hidden lg:fixed lg:bottom-6 lg:right-6 lg:z-30 lg:flex lg:flex-col lg:items-center lg:gap-2">
      {/* Up arrow - dimmed when on first section */}
      <button
        onClick={scrollToPrev}
        disabled={currentSection <= 0}
        className={`group p-2 rounded transition-all duration-200 ${
          currentSection <= 0
            ? 'opacity-30 cursor-default'
            : 'hover:bg-slate-800/30 opacity-100'
        }`}
        aria-label="Scroll to previous section"
      >
        <svg
          className={`w-3 h-3 transition-colors duration-200 ${
            currentSection <= 0
              ? 'text-slate-600'
              : 'text-slate-500 group-hover:text-slate-300'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Minimal progress dots */}
      <div className="flex flex-col gap-1">
        {Array.from({ length: totalSections }, (_, index) => (
          <div
            key={index}
            className={`w-px h-2 transition-all duration-500 ${
              index === currentSection
                ? 'bg-teal-400 h-4'
                : index < currentSection
                ? 'bg-teal-400/40'
                : 'bg-slate-600/40'
            }`}
          />
        ))}
      </div>

      {/* Down arrow - dimmed when on last section */}
      <button
        onClick={scrollToNext}
        disabled={currentSection === totalSections - 1}
        className={`group p-2 rounded transition-all duration-200 ${
          currentSection === totalSections - 1
            ? 'opacity-30 cursor-default'
            : 'hover:bg-slate-800/30 opacity-100'
        }`}
        aria-label="Scroll to next section"
      >
        <svg
          className={`w-3 h-3 transition-colors duration-200 ${
            currentSection === totalSections - 1
              ? 'text-slate-600'
              : 'text-slate-500 group-hover:text-slate-300'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default ScrollIndicator;