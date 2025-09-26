import React, { useState, useEffect } from 'react';
import { fetchGitHubReadme, fetchGitHubRepoInfo, convertMarkdownToHtml } from '../../lib';
import mermaid from 'mermaid';
import BasePopover from './BasePopover';

const ProjectPopover = ({ project, isOpen, onClose }) => {
  const [readmeContent, setReadmeContent] = useState('');
  const [repoInfo, setRepoInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && project) {
      fetchProjectData();
    }
  }, [isOpen, project]);

  const initializeMermaid = () => {
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#0891b2',
          primaryTextColor: '#e2e8f0',
          primaryBorderColor: '#475569',
          lineColor: '#64748b',
          secondaryColor: '#1e293b',
          tertiaryColor: '#334155',
          background: '#0f172a',
          mainBkg: '#1e293b',
          secondBkg: '#334155',
          tertiaryBkg: '#475569'
        },
        securityLevel: 'loose',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true
        }
      });
    } catch (error) {
      console.error('Failed to initialize Mermaid:', error);
    }
  };

  useEffect(() => {
    if (typeof mermaid !== 'undefined') {
      initializeMermaid();
    }
  }, []);

  const renderMermaidDiagrams = async () => {
    const mermaidElements = document.querySelectorAll('.mermaid:not([data-processed])');

    for (const element of mermaidElements) {
      try {
        const mermaidCode = element.textContent.trim();
        if (!mermaidCode) continue;

        element.innerHTML = '<div class="text-slate-400 text-sm p-4 flex items-center gap-2"><div class="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>Rendering diagram...</div>';

        try {
          const uniqueId = `diagram_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
          const result = await mermaid.render(uniqueId, mermaidCode);

          if (result?.svg) {
            element.innerHTML = result.svg;
          } else {
            throw new Error('No SVG generated');
          }
        } catch (renderError) {
          element.innerHTML = `
            <div class="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
              <div class="text-xs text-slate-500 mb-2">Mermaid Source Code:</div>
              <pre class="text-sm text-slate-300 whitespace-pre-wrap font-mono bg-slate-900/50 p-3 rounded overflow-x-auto">${mermaidCode}</pre>
            </div>
          `;
        }

        element.setAttribute('data-processed', 'true');
      } catch (error) {
        console.error('Error processing mermaid element:', error);
        element.innerHTML = `
          <div class="text-red-400 text-sm p-4 bg-red-900/20 rounded-lg border border-red-700">
            <div class="font-semibold mb-2">Diagram Rendering Error</div>
            <div class="text-xs text-red-300">${error.message}</div>
          </div>
        `;
        element.setAttribute('data-processed', 'true');
      }
    }
  };

  useEffect(() => {
    if (readmeContent && isOpen) {
      const timeoutId = setTimeout(async () => {
        await renderMermaidDiagrams();
        setupCopyButtons();
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [readmeContent, isOpen]);

  const setupCopyButtons = () => {
    const copyButtons = document.querySelectorAll('.copy-code-btn:not([data-listener-added])');
    copyButtons.forEach(button => {
      button.addEventListener('click', handleCopyCode);
      button.setAttribute('data-listener-added', 'true');
    });
  };

  const handleCopyCode = (event) => {
    const button = event.currentTarget;
    const codeBlock = button.closest('.code-block-container').querySelector('code');
    const code = codeBlock.textContent;

    navigator.clipboard.writeText(code).then(() => {
      const originalHTML = button.innerHTML;
      button.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      `;
      button.title = 'Copied!';

      setTimeout(() => {
        button.innerHTML = originalHTML;
        button.title = 'Copy code';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy code:', err);
    });
  };

  const fetchProjectData = async () => {
    if (!project.githubUrl || project.githubUrl === '#') {
      setError('No GitHub repository available');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [readme, repo] = await Promise.allSettled([
        fetchGitHubReadme(project.githubUrl),
        fetchGitHubRepoInfo(project.githubUrl)
      ]);

      if (readme.status === 'fulfilled') {
        const htmlContent = convertMarkdownToHtml(readme.value);
        setReadmeContent(htmlContent);
      }

      if (repo.status === 'fulfilled') {
        setRepoInfo(repo.value);
      }

      const hasCSPError = (readme.status === 'rejected' && readme.reason?.message?.includes('Content Security Policy')) ||
                         (repo.status === 'rejected' && repo.reason?.message?.includes('Content Security Policy'));

      if (readme.status === 'rejected' && repo.status === 'rejected' && !hasCSPError) {
        setError('Failed to load project details from GitHub');
      }
    } catch (err) {
      setError('Failed to load project details');
      console.error('Error fetching project data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderProjectTitle = () => (
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h3>
          {project.title}
        </h3>
        {/* GitHub Repository Link */}
        {project.githubUrl && project.githubUrl !== '#' && (
          <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
            </svg>
            View Repository
          </a>
        )}
      </div>
  )

  const renderProjectHeader = () => (
    <>
      {/* Project Description */}
      <p className="text-slate-300 text-sm leading-relaxed mb-3">
        {project.description}
      </p>

      {/*/!* Repository Description (if different from project description) *!/*/}
      {/*{repoInfo && repoInfo.description && repoInfo.description !== project.description && (*/}
      {/*  <p className="text-slate-400 text-xs leading-relaxed mb-3 italic">*/}
      {/*    Repository: {repoInfo.description}*/}
      {/*  </p>*/}
      {/*)}*/}

      {/* Technologies */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.technologies.map((tech, index) => (
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-400"></div>
          <span className="ml-3 text-slate-400 text-sm">Loading...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-400 text-sm">{error}</p>
        </div>
      );
    }

    // Only show README content in body
    if (readmeContent) {
      return (
        <div className="bg-slate-700/30 rounded p-4 overflow-y-auto">
          <div
            className="readme-content max-w-none prose prose-invert prose-sm"
            dangerouslySetInnerHTML={{ __html: readmeContent }}
          />
        </div>
      );
    }

    // If no README, show message
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-slate-400 text-sm">No documentation available</p>
        {/* Action Links for projects without README */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded border border-teal-500 hover:border-teal-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="text-sm font-medium">Live Demo</span>
            </a>
          )}
        </div>
      </div>
    );
  };

  if (!project) return null;

  return (
    <BasePopover
      isOpen={isOpen}
      onClose={onClose}
      title={renderProjectTitle()}
      headerContent={renderProjectHeader()}
      maxWidth="md:max-w-3xl"
    >
      <div className="p-4">
        {renderContent()}
      </div>
    </BasePopover>
  );
};

export default ProjectPopover;