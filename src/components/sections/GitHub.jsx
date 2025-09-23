import React, { useState, useEffect } from 'react';
import GitHubContributionMap from '../ui/GitHubContributionMap';

const GitHub = () => {
  const githubUsername = 'hamedelfayome';
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
        if (response.ok) {
          const data = await response.json();
          setRepos(data);
        }
      } catch (error) {
        console.warn('Failed to fetch repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [githubUsername]);

  return (
    <section id="github" className="py-12">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-2">GitHub</h2>
        <p className="text-slate-400 text-sm">
          My coding journey and open source contributions
        </p>
      </div>

      {/* Activity Map */}
      <div className="mb-8">
        <GitHubContributionMap 
          username={githubUsername}
          className="w-full"
        />
      </div>

      {/* Recent Repositories */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Recent Repositories</h3>
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
          >
            View all →
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-800 rounded-lg p-4 border border-slate-700 animate-pulse">
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-3 bg-slate-700 rounded w-3/4 mb-3"></div>
                <div className="flex gap-2">
                  <div className="h-3 bg-slate-700 rounded w-16"></div>
                  <div className="h-3 bg-slate-700 rounded w-12"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.slice(0, 4).map((repo) => (
              <div key={repo.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-white truncate flex-1">
                    {repo.name}
                  </h4>
                  <div className="flex items-center gap-1 ml-2">
                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-xs text-slate-400">{repo.stargazers_count}</span>
                  </div>
                </div>
                
                {repo.description && (
                  <p className="text-slate-400 text-xs mb-3 line-clamp-2">
                    {repo.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
                        title="Live Demo"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
                      title="View Code"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
          <div className="text-lg font-semibold text-white mb-1">50+</div>
          <div className="text-xs text-slate-400">Repositories</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
          <div className="text-lg font-semibold text-white mb-1">1,200+</div>
          <div className="text-xs text-slate-400">Contributions</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
          <div className="text-lg font-semibold text-white mb-1">15+</div>
          <div className="text-xs text-slate-400">Languages</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
          <div className="text-lg font-semibold text-white mb-1">365</div>
          <div className="text-xs text-slate-400">Days Active</div>
        </div>
      </div>
    </section>
  );
};

export default GitHub;
