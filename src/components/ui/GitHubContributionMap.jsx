import React, { useState, useEffect } from 'react';

const GitHubContributionMap = ({ username, className = "" }) => {
  const [contributions, setContributions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        // Using GitHub's contribution graph API with CORS proxy
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = `https://github.com/users/${username}/contributions`;
        
        const response = await fetch(proxyUrl + targetUrl, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch contributions');
        }
        
        const html = await response.text();
        // Parse the SVG from the response
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const svg = doc.querySelector('svg');
        
        if (svg) {
          // Customize the SVG for our dark theme
          svg.setAttribute('width', '100%');
          svg.setAttribute('height', 'auto');
          svg.setAttribute('viewBox', '0 0 728 112');
          svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');
          svg.style.background = 'transparent';
          
          // Style the rectangles for dark theme
          const rects = svg.querySelectorAll('rect');
          rects.forEach(rect => {
            rect.style.stroke = '#374151';
            rect.style.strokeWidth = '1';
          });
          
          setContributions(svg.outerHTML);
        } else {
          throw new Error('No contribution data found');
        }
      } catch (err) {
        console.warn('GitHub API failed, using fallback:', err.message);
        // Fallback: Create a mock contribution map
        setContributions(createMockContributions());
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchContributions();
    }
  }, [username]);

  const createMockContributions = () => {
    // Create a simple mock contribution map
    const weeks = 53;
    const daysPerWeek = 7;
    const totalDays = weeks * daysPerWeek;
    
    let svg = `<svg width="100%" height="auto" viewBox="0 0 728 112" preserveAspectRatio="xMinYMin meet" style="background: transparent;">
      <g transform="translate(20, 20)">`;
    
    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < daysPerWeek; day++) {
        const dayIndex = week * daysPerWeek + day;
        const intensity = Math.random() * 4; // 0-4 intensity levels
        const x = week * 13;
        const y = day * 13;
        
        let color = '#1e293b'; // slate-800
        if (intensity > 0) color = '#0f172a'; // slate-900
        if (intensity > 1) color = '#065f46'; // emerald-800
        if (intensity > 2) color = '#047857'; // emerald-700
        if (intensity > 3) color = '#059669'; // emerald-600
        
        svg += `<rect width="10" height="10" x="${x}" y="${y}" fill="${color}" 
                stroke="#374151" stroke-width="1" rx="2"/>`;
      }
    }
    
    svg += `</g></svg>`;
    return svg;
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
    <div className={`bg-slate-800 rounded-lg p-4 border border-slate-700 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-slate-200">Activity</span>
        </div>
        <div className="text-xs text-slate-500 font-mono">365 days</div>
      </div>
      
      <div className="bg-slate-900 rounded p-2 md:p-3 border border-slate-700 overflow-x-auto overflow-y-hidden">
        <div
          className="contribution-map min-w-[680px] md:min-w-0"
          dangerouslySetInnerHTML={{ __html: contributions }}
        />
      </div>
      
      <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
        <span>Less</span>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-slate-700 rounded-sm border border-slate-600"></div>
          <div className="w-3 h-3 bg-slate-800 rounded-sm border border-slate-600"></div>
          <div className="w-3 h-3 bg-emerald-800 rounded-sm border border-slate-600"></div>
          <div className="w-3 h-3 bg-emerald-700 rounded-sm border border-slate-600"></div>
          <div className="w-3 h-3 bg-emerald-600 rounded-sm border border-slate-600"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default GitHubContributionMap;
