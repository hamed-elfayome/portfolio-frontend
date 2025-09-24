import React, { useEffect, useRef, useState } from 'react';

const ExperiencePopover = ({ experience, isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      setIsClosing(false);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (!isOpen && !isClosing) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
        setIsClosing(false);
        document.body.style.overflow = 'unset';
      }, 300); // Match the animation duration

      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 ${
        isClosing
          ? 'animate-backdropFadeOut'
          : 'animate-backdropFadeIn'
      }`}
      onClick={handleBackdropClick}
    >
      {/* Mobile Fixed Back Button - Outside popover container */}
      <button
        onClick={handleClose}
        className="md:hidden fixed top-4 left-4 z-[60] w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/90 backdrop-blur-sm rounded-full transition-colors border border-slate-700/50"
        aria-label="Back"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div
        ref={popoverRef}
        className={`relative w-full h-full md:w-full md:max-w-3xl md:h-auto md:max-h-[85vh] bg-slate-900/70 border-0 md:border md:border-slate-700 rounded-none md:rounded-xl shadow-xl overflow-y-auto md:overflow-hidden md:flex md:flex-col pt-12 md:pt-0 ${
          isClosing
            ? 'animate-slideDown'
            : 'animate-slideUp'
        }`}
      >
        {/* Mobile/Desktop Header */}
        <div className="relative p-4 border-b border-slate-700 md:flex-shrink-0">

          {/* Desktop Close Button */}
          <button
            onClick={handleClose}
            className="hidden md:flex absolute top-3 right-3 w-8 h-8 items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="md:pr-10 pl-0 md:pl-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {experience.position}
                </h2>
                <p className="text-teal-300 font-medium">
                  {experience.company}
                </p>
              </div>
              <span className="text-sm text-slate-400 font-medium">
                {experience.period}
              </span>
            </div>

            <p className="text-slate-300 text-sm mb-3">
              {experience.summary}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {experience.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content Layout */}
        <div className="md:flex-1 md:overflow-y-auto md:min-h-0">
          <div className="p-4">
            <div className="space-y-4">
              {/* Experience Details */}
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-200">Experience Details</span>
                </div>
                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {experience.details}
                  </p>
                </div>
              </div>

              {/* Key Achievements */}
              {experience.achievements && experience.achievements.length > 0 && (
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium text-slate-200">Key Achievements</span>
                  </div>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, index) => (
                      <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies Used */}
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-200">Technologies & Tools</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-slate-700 text-slate-300 text-sm rounded border border-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company Link */}
              {experience.companyUrl && experience.companyUrl !== '#' && (
                <div className="flex items-center justify-center pt-2 pb-4">
                  <a
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded border border-teal-500 hover:border-teal-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="text-sm font-medium">Visit Company</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePopover;