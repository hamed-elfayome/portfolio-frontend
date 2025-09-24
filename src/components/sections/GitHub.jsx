import React, { useState, useEffect } from 'react';
import GitHubContributionMap from '../ui/GitHubContributionMap';

const GitHub = () => {
  const githubUsername = 'hamed-elfayome';

  // Configuration for which stats to show
  const statsConfig = {
    publicRepos: { show: true, label: 'Public Repos' },
    totalContributions: { show: true, label: 'Contributions (Year)' },
    totalStars: { show: false, label: 'Total Stars' },
    followers: { show: false, label: 'Followers' },
    languages: { show: true, label: 'Languages' }
  };

  const [repos, setRepos] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [contributionsData, setContributionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch repositories, user data, and contributions in parallel
        const [reposResponse, userResponse, contributionsResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`),
          fetch(`https://api.github.com/users/${githubUsername}`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`)
        ]);

        let reposData = [];
        if (reposResponse.ok) {
          reposData = await reposResponse.json();
          setRepos(reposData);
        }

        let totalContributions = 0;
        if (contributionsResponse.ok) {
          const contributionsData = await contributionsResponse.json();
          setContributionsData(contributionsData);

          // Calculate total contributions for the year
          totalContributions = contributionsData.total?.lastYear || 0;
        }

        if (userResponse.ok) {
          const userData = await userResponse.json();

          // Calculate additional stats from repos
          const languages = new Set();
          let totalStars = 0;

          reposData.forEach(repo => {
            if (repo.language) languages.add(repo.language);
            totalStars += repo.stargazers_count;
          });

          setUserStats({
            publicRepos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            totalStars,
            totalContributions,
            languages: languages.size,
            createdAt: userData.created_at
          });
        }
      } catch (error) {
        console.warn('GitHub API failed:', error);
      } finally {
        setLoading(false);
        setStatsLoading(false);
      }
    };

    fetchGitHubData();
  }, [githubUsername]);

  return (
    <section id="github" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      {/* Terminal-style Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
          </div>
          <span className="text-slate-500 font-mono text-xs">~/github</span>
        </div>
        <div className="font-mono text-sm">
          <span className="text-slate-500">$</span>
          <span className="text-white ml-2">git status --porcelain</span>
        </div>
      </div>

      {/* Activity Visualization */}
      <div className="mb-8 bg-slate-900/50 rounded-lg border border-slate-700/30 overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-700/30 bg-slate-800/30">
          <span className="font-mono text-xs text-slate-400">activity --last-year</span>
        </div>
        <div className="p-4">
          <GitHubContributionMap
            username={githubUsername}
            className="w-full"
          />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mb-8 bg-slate-900/50 rounded-lg border border-slate-700/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {statsLoading ? (
              <div className="flex gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-700 rounded-full animate-pulse"></div>
                    <div className="h-3 bg-slate-700 rounded w-12 animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : userStats ? (
              <>
                {statsConfig.publicRepos.show && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="font-mono text-xs text-slate-400">
                      {userStats.publicRepos} repos
                    </span>
                  </div>
                )}
                {statsConfig.totalContributions.show && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="font-mono text-xs text-slate-400">
                      {userStats.totalContributions} commits
                    </span>
                  </div>
                )}
                {statsConfig.languages.show && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="font-mono text-xs text-slate-400">
                      {userStats.languages} langs
                    </span>
                  </div>
                )}
                <span className="font-mono text-xs text-slate-600">/year</span>
              </>
            ) : (
              <span className="text-xs text-slate-500 font-mono">connection failed</span>
            )}
          </div>
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            @{githubUsername}
          </a>
        </div>
      </div>

      {/* Repository Tree */}
      <div className="bg-slate-900/50 rounded-lg border border-slate-700/30 overflow-hidden">
        <div className="px-4 py-2 border-b border-slate-700/30 bg-slate-800/30">
          <span className="font-mono text-xs text-slate-400">ls -la --recent</span>
        </div>
        <div className="p-4">
          {loading ? (
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 py-1 animate-pulse">
                  <div className="w-4 h-3 bg-slate-700 rounded"></div>
                  <div className="h-3 bg-slate-700 rounded flex-1 max-w-xs"></div>
                  <div className="h-2 bg-slate-700 rounded w-16"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {repos.slice(0, 4).map((repo) => (
                <div key={repo.id} className="flex items-center gap-3 py-1 hover:bg-slate-800/30 rounded px-2 -mx-2 transition-colors group">
                  <span className="text-slate-500 text-xs w-4 flex justify-center">
                    {repo.language ? (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-5L12 5H5a2 2 0 00-2 2z" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </span>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-slate-300 hover:text-white transition-colors flex-1"
                  >
                    {repo.name}
                  </a>
                  <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    {repo.language && (
                      <span className="font-mono text-xs text-slate-500">
                        .{repo.language.toLowerCase()}
                      </span>
                    )}
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-slate-300 transition-colors font-mono text-xs"
                        title="Live Demo"
                      >
                        live
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GitHub;
