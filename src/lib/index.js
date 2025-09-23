/**
 * Main Library Index
 * Provides clean imports for all library modules
 */

// API Services
export {
  parseGitHubUrl,
  fetchGitHubRepoInfo,
  fetchGitHubReadme,
  clearGitHubCache,
  getCacheStats
} from './api/github.js';

// Markdown Processing
export {
  convertMarkdownToHtml
} from './markdown/converter.js';

export {
  processInlineMarkdown,
  generateAnchorId,
  processCodeBlock,
  processMermaidDiagram,
  getLanguageLabel,
  removeEmojis
} from './markdown/processor.js';

export {
  generateLanguageIcon
} from './markdown/icons.js';

// Constants
export {
  API_CONFIG,
  GITHUB_ENDPOINTS,
  HTTP_STATUS,
  CACHE_KEYS
} from './constants/api.js';

export {
  MARKDOWN_PATTERNS,
  GITHUB_ALERTS,
  PROGRAMMING_LANGUAGES
} from './constants/markdown.js';