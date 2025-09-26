import React from 'react';
import BasePopover from './BasePopover';

const ExperiencePopover = ({ experience, isOpen, onClose }) => {
  if (!experience) return null;

  const renderPopoverHeader = () => (
    <>
      <div className="flex flex-wrap gap-4 items-center justify-between mb-3">
        <div className="flex flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-white">
            {experience.position}
          </h2>
          <p className="text-teal-300 font-medium">
            {experience.company}
          </p>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          {experience.period}
        </span>
      </div>

      <p className="text-slate-300 text-sm leading-relaxed mb-3">
        {experience.summary}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {experience.technologies.map((tech, index) => (
          <span
            key={index}
            className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </>
  );

  const renderContent = () => (
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

      {/* All Key Achievements (if more than 3) */}
      {experience.achievements && experience.achievements.length > 3 && (
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm font-medium text-slate-200">All Achievements</span>
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
  );

  return (
    <BasePopover
      isOpen={isOpen}
      onClose={onClose}
      title={renderPopoverHeader()}
      maxWidth="md:max-w-3xl"
    >
      <div className="p-4">
        {renderContent()}
      </div>
    </BasePopover>
  );
};

export default ExperiencePopover;