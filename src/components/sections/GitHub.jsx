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
          <div className="space-y-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 rounded border border-slate-700/50 animate-pulse">
                <div className="h-3 bg-slate-700 rounded w-32"></div>
                <div className="h-2 bg-slate-700 rounded w-8"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {repos.slice(0, 4).map((repo) => (
              <div key={repo.id} className="flex items-center justify-between py-2 px-3 rounded border border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-800/30 transition-all duration-200 group">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-300 hover:text-white transition-colors font-mono"
                >
                  {repo.name}
                </a>
                <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  {repo.language && (
                    <span className="text-xs text-slate-500 font-mono">
                      {repo.language}
                    </span>
                  )}
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-slate-300 transition-colors"
                      title="Live Demo"
                    >
                      ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Real GitHub Stats */}
      <div className={`grid gap-4 ${Object.values(statsConfig).filter(config => config.show).length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
        {statsLoading ? (
          // Loading states
          [...Array(Object.values(statsConfig).filter(config => config.show).length)].map((_, i) => (
            <div key={i} className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center animate-pulse">
              <div className="h-6 bg-slate-700 rounded mb-2"></div>
              <div className="h-3 bg-slate-700 rounded w-3/4 mx-auto"></div>
            </div>
          ))
        ) : userStats ? (
          // Dynamic stats based on config
          <>
            {statsConfig.publicRepos.show && (
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
                <div className="text-lg font-semibold text-white mb-1">{userStats.publicRepos}</div>
                <div className="text-xs text-slate-400">{statsConfig.publicRepos.label}</div>
              </div>
            )}
            {statsConfig.totalContributions.show && (
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
                <div className="text-lg font-semibold text-white mb-1">{userStats.totalContributions}</div>
                <div className="text-xs text-slate-400">{statsConfig.totalContributions.label}</div>
              </div>
            )}
            {statsConfig.languages.show && (
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
                <div className="text-lg font-semibold text-white mb-1">{userStats.languages}</div>
                <div className="text-xs text-slate-400">{statsConfig.languages.label}</div>
              </div>
            )}
            {statsConfig.totalStars.show && (
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
                <div className="text-lg font-semibold text-white mb-1">{userStats.totalStars}</div>
                <div className="text-xs text-slate-400">{statsConfig.totalStars.label}</div>
              </div>
            )}
            {statsConfig.followers.show && (
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
                <div className="text-lg font-semibold text-white mb-1">{userStats.followers}</div>
                <div className="text-xs text-slate-400">{statsConfig.followers.label}</div>
              </div>
            )}
          </>
        ) : (
          // Error state
          <div className={`${Object.values(statsConfig).filter(config => config.show).length === 3 ? 'col-span-1 md:col-span-3' : 'col-span-2 md:col-span-4'} bg-slate-800 rounded-lg p-4 border border-slate-700 text-center`}>
            <div className="text-slate-400 text-sm">Unable to load GitHub stats</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GitHub;
