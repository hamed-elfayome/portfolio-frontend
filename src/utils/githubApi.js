/**
 * @deprecated This file is deprecated. Use the new library structure instead.
 * Import from: import { fetchGitHubReadme, fetchGitHubRepoInfo, convertMarkdownToHtml } from '../lib';
 */

// Re-export from new library structure for backward compatibility
export {
  parseGitHubUrl,
  fetchGitHubRepoInfo,
  fetchGitHubReadme,
  convertMarkdownToHtml,
  clearGitHubCache as clearCache
} from '../lib/index.js';