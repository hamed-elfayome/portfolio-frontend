import React, { useState, useEffect, useRef } from 'react';
import { fetchGitHubReadme, fetchGitHubRepoInfo, convertMarkdownToHtml } from '../../lib';
import mermaid from 'mermaid';

const ProjectPopover = ({ project, isOpen, onClose }) => {
  const [readmeContent, setReadmeContent] = useState('');
  const [repoInfo, setRepoInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (isOpen && project) {
      fetchProjectData();
    }
  }, [isOpen, project]);

  useEffect(() => {
    // Initialize Mermaid with dark theme
    const initializeMermaid = () => {
      try {
        console.log('Mermaid object:', mermaid);
        console.log('Mermaid version:', mermaid.version || 'unknown');

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
        console.log('✅ Mermaid initialized successfully');

        // Test if Mermaid can render a simple diagram
        const testCode = 'graph TD; A-->B';
        console.log('Testing Mermaid with simple diagram...');

        mermaid.render('test-diagram', testCode)
          .then(result => {
            console.log('✅ Test diagram rendered successfully:', result.svg ? 'SVG generated' : 'No SVG');
          })
          .catch(err => {
            console.log('❌ Test diagram failed:', err.message);
          });

      } catch (error) {
        console.error('❌ Failed to initialize Mermaid:', error);
      }
    };

    // Check if mermaid is available
    console.log('Checking Mermaid availability...');
    console.log('typeof mermaid:', typeof mermaid);
    console.log('window.mermaid:', typeof window.mermaid);

    if (typeof mermaid !== 'undefined') {
      console.log('Mermaid is available, initializing...');
      initializeMermaid();
    } else {
      console.log('Mermaid not immediately available, waiting...');
      setTimeout(() => {
        if (typeof mermaid !== 'undefined') {
          console.log('Mermaid now available after delay');
          initializeMermaid();
        } else {
          console.error('❌ Mermaid still not available after delay');
        }
      }, 500);
    }
  }, []);

  const renderMermaidDiagrams = async () => {
    const mermaidElements = document.querySelectorAll('.mermaid:not([data-processed])');
    console.log(`🔍 Found ${mermaidElements.length} mermaid elements to process`);

    for (const element of mermaidElements) {
      try {
        const mermaidCode = element.textContent.trim();
        console.log('📝 Processing Mermaid code:', mermaidCode.substring(0, 50) + '...');

        if (!mermaidCode) {
          console.warn('⚠️  Empty mermaid code, skipping');
          continue;
        }

        // Show loading state
        element.innerHTML = '<div class="text-slate-400 text-sm p-4 flex items-center gap-2"><div class="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-400"></div>Rendering diagram...</div>';

        let rendered = false;

        // Method 1: Try modern render API
        try {
          console.log('🎨 Trying mermaid.render()...');
          const uniqueId = `diagram_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
          const result = await mermaid.render(uniqueId, mermaidCode);

          if (result && result.svg) {
            element.innerHTML = result.svg;
            rendered = true;
            console.log('✅ Successfully rendered with mermaid.render()');
          } else {
            console.log('⚠️  mermaid.render() returned no SVG');
          }
        } catch (e) {
          console.log('❌ mermaid.render() failed:', e.message);
        }

        // Method 2: Try classic init method
        if (!rendered) {
          try {
            console.log('🔧 Trying mermaid.init()...');
            element.innerHTML = mermaidCode;
            element.removeAttribute('data-processed'); // Allow re-processing

            // Wrap init in a promise
            await new Promise((resolve, reject) => {
              const timeout = setTimeout(() => {
                reject(new Error('Init timeout'));
              }, 3000);

              try {
                mermaid.init(undefined, element);

                // Check for SVG after a delay
                setTimeout(() => {
                  clearTimeout(timeout);
                  const svg = element.querySelector('svg');
                  if (svg) {
                    console.log('✅ Successfully rendered with mermaid.init()');
                    rendered = true;
                    resolve();
                  } else {
                    reject(new Error('No SVG generated by init()'));
                  }
                }, 1000);
              } catch (e) {
                clearTimeout(timeout);
                reject(e);
              }
            });

          } catch (e) {
            console.log('❌ mermaid.init() failed:', e.message);
          }
        }

        // Fallback: Show formatted source code
        if (!rendered) {
          console.log('📄 All rendering methods failed, showing formatted source');
          element.innerHTML = `
            <div class="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
              <div class="text-xs text-slate-500 mb-2">Mermaid Source Code:</div>
              <pre class="text-sm text-slate-300 whitespace-pre-wrap font-mono bg-slate-900/50 p-3 rounded overflow-x-auto">${mermaidCode}</pre>
            </div>
          `;
        }

        element.setAttribute('data-processed', 'true');

      } catch (error) {
        console.error('💥 Critical error processing mermaid element:', error);
        element.innerHTML = `
          <div class="text-red-400 text-sm p-4 bg-red-900/20 rounded-lg border border-red-700">
            <div class="font-semibold mb-2 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Diagram Rendering Error
            </div>
            <div class="text-xs mb-3 text-red-300">${error.message}</div>
            <details class="text-xs">
              <summary class="cursor-pointer hover:text-red-300 transition-colors">Show source code</summary>
              <pre class="mt-2 bg-slate-800 p-3 rounded whitespace-pre-wrap text-slate-300">${element.textContent || 'No content'}</pre>
            </details>
          </div>
        `;
        element.setAttribute('data-processed', 'true');
      }
    }
  };

  useEffect(() => {
    if (readmeContent && isOpen) {
      const timeoutId = setTimeout(async () => {
        // Render Mermaid diagrams
        await renderMermaidDiagrams();

        // Setup copy code buttons
        const copyButtons = document.querySelectorAll('.copy-code-btn:not([data-listener-added])');
        copyButtons.forEach(button => {
          button.addEventListener('click', handleCopyCode);
          button.setAttribute('data-listener-added', 'true');
        });
      }, 500); // Increased timeout to ensure DOM is ready

      return () => clearTimeout(timeoutId);
    }
  }, [readmeContent, isOpen]);

  const handleCopyCode = (event) => {
    const button = event.currentTarget;
    const codeBlock = button.closest('.code-block-container').querySelector('code');
    const code = codeBlock.textContent;

    navigator.clipboard.writeText(code).then(() => {
      // Show feedback
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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle internal links and scroll anchors
  useEffect(() => {
    if (!readmeContent || !isOpen) return;

    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      // Handle scroll links (internal anchors)
      if (link.classList.contains('scroll-link')) {
        e.preventDefault();
        const anchorId = link.getAttribute('data-anchor');
        const targetElement = document.getElementById(anchorId);

        if (targetElement) {
          // Smooth scroll to the target element within the popover
          const popoverContent = link.closest('.readme-content').parentElement;
          const elementTop = targetElement.offsetTop - popoverContent.offsetTop;

          popoverContent.scrollTo({
            top: elementTop - 20, // Add some offset
            behavior: 'smooth'
          });
        }
      }

      // Handle relative/internal links - could fetch content from same repo
      else if (link.classList.contains('internal-link')) {
        e.preventDefault();
        console.log('Internal link clicked:', link.getAttribute('data-relative'));
        // TODO: Could implement fetching of other files from the same repo
      }
    };

    const readmeContainer = document.querySelector('.readme-content');
    if (readmeContainer) {
      readmeContainer.addEventListener('click', handleLinkClick);

      return () => {
        readmeContainer.removeEventListener('click', handleLinkClick);
      };
    }
  }, [readmeContent, isOpen]);

  const fetchProjectData = async () => {
    if (!project.githubUrl || project.githubUrl === '#') {
      setError('No GitHub repository available');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch both README and repository info in parallel
      const [readme, repo] = await Promise.allSettled([
        fetchGitHubReadme(project.githubUrl),
        fetchGitHubRepoInfo(project.githubUrl)
      ]);

      if (readme.status === 'fulfilled') {
        const htmlContent = convertMarkdownToHtml(readme.value);
        setReadmeContent(htmlContent);
      } else {
        const error = readme.reason;
        if (error?.message?.includes('Content Security Policy')) {
          console.warn('GitHub API blocked by CSP, skipping README fetch');
        } else {
          console.warn('README fetch failed:', error);
        }
      }

      if (repo.status === 'fulfilled') {
        setRepoInfo(repo.value);
      } else {
        const error = repo.reason;
        if (error?.message?.includes('Content Security Policy')) {
          console.warn('GitHub API blocked by CSP, skipping repo info fetch');
        } else {
          console.warn('Repository info fetch failed:', error);
        }
      }

      // Only show error if it's not a CSP issue
      const isCSPError = (readme.status === 'rejected' && readme.reason?.message?.includes('Content Security Policy')) ||
                        (repo.status === 'rejected' && repo.reason?.message?.includes('Content Security Policy'));
      
      if (readme.status === 'rejected' && repo.status === 'rejected' && !isCSPError) {
        setError('Failed to load project details from GitHub');
      }

    } catch (err) {
      setError('Failed to load project details');
      console.error('Error fetching project data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 backdrop-blur-md animate-fadeIn"
      onClick={handleBackdropClick}
    >
      {/* Mobile Fixed Back Button - Outside popover container */}
      <button
        onClick={onClose}
        className="md:hidden fixed top-4 left-4 z-[60] w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/90 backdrop-blur-sm rounded-full transition-colors border border-slate-700/50"
        aria-label="Back"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div
        ref={popoverRef}
        className="relative w-full h-full md:w-full md:max-w-3xl md:h-auto md:max-h-[85vh] bg-slate-900/70 border-0 md:border md:border-slate-700 rounded-none md:rounded-xl shadow-xl animate-slideUp overflow-y-auto md:overflow-hidden md:flex md:flex-col pt-12 md:pt-0"
      >
        {/* Mobile/Desktop Header */}
        <div className="relative p-4 border-b border-slate-700 md:flex-shrink-0">
          
          {/* Desktop Close Button */}
          <button
            onClick={onClose}
            className="hidden md:flex absolute top-3 right-3 w-8 h-8 items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="md:pr-10 pl-0 md:pl-0">
            <h2 className="text-lg font-semibold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-slate-300 text-sm mb-3">
              {project.description}
            </p>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-600"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded border border-slate-600">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
              
              {repoInfo && (
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  {repoInfo.language && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                      <span>{repoInfo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span>{repoInfo.stars}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable Content Layout */}
        <div className="md:flex-1 md:overflow-y-auto md:min-h-0">
          <div className="p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-400"></div>
                <span className="ml-3 text-slate-400 text-sm">Loading...</span>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-slate-400 text-sm">{error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* README Content */}
                {readmeContent && (
                  <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                      <span className="text-sm font-medium text-slate-200">Documentation</span>
                    </div>
                    <div className="bg-slate-900 rounded p-3 max-h-80 md:max-h-64 overflow-y-auto border border-slate-700">
                      <div
                        className="readme-content max-w-none prose prose-invert prose-sm"
                        dangerouslySetInnerHTML={{ __html: readmeContent }}
                      />
                    </div>
                  </div>
                )}

                {/* Repository Info */}
                {repoInfo && (repoInfo.description || repoInfo.topics?.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {repoInfo.description && (
                      <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-sm font-medium text-slate-200">Repository</span>
                        </div>
                        <p className="text-slate-300 text-sm">{repoInfo.description}</p>
                      </div>
                    )}
                    
                    {repoInfo.topics && repoInfo.topics.length > 0 && (
                      <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-sm font-medium text-slate-200">Topics</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {repoInfo.topics.slice(0, 6).map((topic, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded border border-slate-600"
                            >
                              #{topic}
                            </span>
                          ))}
                          {repoInfo.topics.length > 6 && (
                            <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded border border-slate-600">
                              +{repoInfo.topics.length - 6}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Links */}
                <div className="flex items-center justify-center gap-3 pt-2 pb-4">
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-600 hover:border-slate-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-sm font-medium">View Code</span>
                    </a>
                  )}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPopover;