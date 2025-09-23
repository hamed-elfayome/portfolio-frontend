/**
 * GitHub API Service
 * Handles all GitHub-related API calls and data fetching
 */

import { API_CONFIG, GITHUB_ENDPOINTS, HTTP_STATUS, CACHE_KEYS } from '../constants/api.js';
import { fetchGitHubData, isCSPError } from '../utils/csp-safe-fetch.js';

// Simple in-memory cache
const cache = new Map();

/**
 * Parse GitHub URL to extract owner and repository
 * @param {string} githubUrl - GitHub repository URL
 * @returns {Object|null} - Parsed repo info or null
 */
export const parseGitHubUrl = (githubUrl) => {
  if (!githubUrl || typeof githubUrl !== 'string') {
    return null;
  }

  const urlPattern = /github\.com\/([^\/]+)\/([^\/]+)/;
  const match = githubUrl.match(urlPattern);

  if (match) {
    return {
      owner: match[1],
      repo: match[2].replace(/\.git$/, '') // Remove .git extension if present
    };
  }

  return null;
};

/**
 * Make a request to GitHub API with proper headers and error handling
 * @param {string} endpoint - API endpoint
 * @returns {Promise<Object>} - API response
 */
const makeGitHubRequest = async (endpoint) => {
  try {
    return await fetchGitHubData(endpoint);
  } catch (error) {
    if (isCSPError(error)) {
      throw new Error('Network error: Unable to connect to GitHub API. This may be due to Content Security Policy restrictions.');
    }
    throw error;
  }
};

/**
 * Fetch repository information from GitHub
 * @param {string} githubUrl - GitHub repository URL
 * @returns {Promise<Object>} - Repository information
 */
export const fetchGitHubRepoInfo = async (githubUrl) => {
  const repoInfo = parseGitHubUrl(githubUrl);

  if (!repoInfo) {
    throw new Error('Invalid GitHub URL');
  }

  const { owner, repo } = repoInfo;
  const cacheKey = CACHE_KEYS.REPO(owner, repo);

  // Check cache first
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION) {
      return cached.data;
    }
  }

  try {
    const endpoint = GITHUB_ENDPOINTS.REPO(owner, repo);
    const data = await makeGitHubRequest(endpoint);

    const repoData = {
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      topics: data.topics || [],
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      license: data.license?.name,
      homepage: data.homepage,
      defaultBranch: data.default_branch
    };

    // Cache the result
    cache.set(cacheKey, {
      data: repoData,
      timestamp: Date.now()
    });

    return repoData;

  } catch (error) {
    console.error('Error fetching repository info:', error);
    throw error;
  }
};

/**
 * Fetch README content from GitHub repository
 * @param {string} githubUrl - GitHub repository URL
 * @param {string} readmePath - Path to README file (default: 'README.md')
 * @returns {Promise<string>} - README content in markdown format
 */
export const fetchGitHubReadme = async (githubUrl, readmePath = 'README.md') => {
  const repoInfo = parseGitHubUrl(githubUrl);

  if (!repoInfo) {
    throw new Error('Invalid GitHub URL');
  }

  const { owner, repo } = repoInfo;
  const cacheKey = CACHE_KEYS.README(owner, repo);

  // Check cache first
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (Date.now() - cached.timestamp < API_CONFIG.CACHE_DURATION) {
      return cached.data;
    }
  }

  try {
    const endpoint = GITHUB_ENDPOINTS.README(owner, repo, readmePath);
    const data = await makeGitHubRequest(endpoint);

    if (!data.content) {
      throw new Error('README content not found');
    }

    // Decode base64 content
    const readmeContent = atob(data.content.replace(/\s/g, ''));

    // Cache the result
    cache.set(cacheKey, {
      data: readmeContent,
      timestamp: Date.now()
    });

    return readmeContent;

  } catch (error) {
    console.error('Error fetching README:', error);
    throw error;
  }
};

/**
 * Clear all cached GitHub API data
 */
export const clearGitHubCache = () => {
  cache.clear();
};

/**
 * Get cache statistics
 */
export const getCacheStats = () => {
  return {
    size: cache.size,
    keys: Array.from(cache.keys())
  };
};