import React, { useState, useEffect } from 'react';

const GitHubContributionMap = ({ username, className = "" }) => {
  const [contributions, setContributions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);

        // Try to fetch using GitHub's embed approach
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);

        if (response.ok) {
          const data = await response.json();

          // Create SVG from API data
          const contributionsSVG = createContributionsSVG(data);
          setContributions(contributionsSVG);
        } else {
          throw new Error('Failed to fetch contributions');
        }
      } catch (err) {
        console.warn('GitHub contributions API failed:', err.message);
        setError('Unable to load contribution data');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchContributions();
    }
  }, [username]);

  const createContributionsSVG = (data) => {
    const contributions = data.contributions;
    const weeks = Math.ceil(contributions.length / 7);

    // Check if we're on mobile (this is a rough approximation)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    if (isMobile) {
      // Mobile: Create a very compact layout - use original layout but much smaller
      const squareSize = 2;
      const gap = 1;
      const totalWidth = weeks * (squareSize + gap);
      const totalHeight = 7 * (squareSize + gap);

      let svg = `<svg width="100%" height="auto" viewBox="0 0 ${totalWidth + 10} ${totalHeight + 10}" preserveAspectRatio="xMinYMin meet" style="background: transparent;">
        <g transform="translate(5, 5)">`;

      contributions.forEach((contribution, index) => {
        const week = Math.floor(index / 7);
        const day = index % 7;
        const x = week * (squareSize + gap);
        const y = day * (squareSize + gap);

        // Map contribution count to color intensity
        let color = '#0f172a'; // No contributions
        if (contribution.count > 0) color = '#0d4d3c'; // 1+ contributions
        if (contribution.count >= 2) color = '#065f46'; // 2+ contributions
        if (contribution.count >= 4) color = '#047857'; // 4+ contributions
        if (contribution.count >= 6) color = '#059669'; // 6+ contributions
        if (contribution.count >= 10) color = '#10b981'; // 10+ contributions

        svg += `<rect width="${squareSize}" height="${squareSize}" x="${x}" y="${y}" fill="${color}"
                stroke="#374151" stroke-width="0.2" rx="0.3"
                data-count="${contribution.count}" data-date="${contribution.date}"/>`;
      });

      svg += `</g></svg>`;
      return svg;
    } else {
      // Desktop: Keep original horizontal layout
      let svg = `<svg width="100%" height="auto" viewBox="0 0 ${weeks * 13 + 20} 112" preserveAspectRatio="xMinYMin meet" style="background: transparent;">
        <g transform="translate(10, 20)">`;

      contributions.forEach((contribution, index) => {
        const week = Math.floor(index / 7);
        const day = index % 7;
        const x = week * 13;
        const y = day * 13;

        // Map contribution count to color intensity
        let color = '#0f172a'; // No contributions
        if (contribution.count > 0) color = '#0d4d3c'; // 1+ contributions
        if (contribution.count >= 2) color = '#065f46'; // 2+ contributions
        if (contribution.count >= 4) color = '#047857'; // 4+ contributions
        if (contribution.count >= 6) color = '#059669'; // 6+ contributions
        if (contribution.count >= 10) color = '#10b981'; // 10+ contributions

        svg += `<rect width="10" height="10" x="${x}" y="${y}" fill="${color}"
                stroke="#374151" stroke-width="1" rx="2"
                data-count="${contribution.count}" data-date="${contribution.date}"/>`;
      });

      svg += `</g></svg>`;
      return svg;
    }
  };

  if (loading) {
    return (
      <div className={`bg-slate-800 rounded-lg p-4 border border-slate-700 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-slate-200">Activity</span>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-400"></div>
          <span className="ml-3 text-slate-400 text-sm">Loading activity...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-slate-800 rounded-lg p-4 border border-slate-700 ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-sm font-medium text-slate-200">Activity</span>
        </div>
        <div className="text-center py-4">
          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-slate-700 flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-400 text-sm">Unable to load activity</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-hidden">
      <div
        className="contribution-map w-full"
        dangerouslySetInnerHTML={{ __html: contributions }}
      />
    </div>
  );
};

export default GitHubContributionMap;
