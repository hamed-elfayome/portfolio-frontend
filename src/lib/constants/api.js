/**
 * API Configuration and Constants
 */

export const API_CONFIG = {
  GITHUB_API_BASE: 'https://api.github.com',
  REQUEST_TIMEOUT: 10000,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  USER_AGENT: 'Portfolio-Site'
};

export const GITHUB_ENDPOINTS = {
  REPO: (owner, repo) => `/repos/${owner}/${repo}`,
  README: (owner, repo, path = 'README.md') => `/repos/${owner}/${repo}/contents/${path}`,
  CONTENTS: (owner, repo, path) => `/repos/${owner}/${repo}/contents/${path}`
};

export const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  RATE_LIMITED: 403
};

export const CACHE_KEYS = {
  README: (owner, repo) => `readme-${owner}/${repo}`,
  REPO: (owner, repo) => `repo-${owner}/${repo}`
};