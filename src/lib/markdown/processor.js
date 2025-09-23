/**
 * Markdown Processing Service
 * Handles conversion of markdown to HTML with GitHub flavored markdown support
 */

import { MARKDOWN_PATTERNS, GITHUB_ALERTS, PROGRAMMING_LANGUAGES } from '../constants/markdown.js';
import { generateLanguageIcon } from './icons.js';

/**
 * Remove all emojis from text
 * @param {string} text - Text to remove emojis from
 * @returns {string} - Text with all emojis removed
 */
export const removeEmojis = (text) => {
  if (!text) return '';
  
  // Comprehensive emoji regex covering all Unicode emoji ranges
  const emojiRegex = /([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F170}-\u{1F251}]|[\u{1F018}-\u{1F270}]|[\u{238C}-\u{2454}]|[\u{20D0}-\u{20FF}]|[\u{FE00}-\u{FE0F}]|[\u{1F004}]|[\u{1F0CF}]|[\u{1F170}-\u{1F251}]|[\u{1F300}-\u{1F5FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{1FB00}-\u{1FBFF}]|[\u{1FC00}-\u{1FCFF}]|[\u{1FD00}-\u{1FDFF}]|[\u{1FE00}-\u{1FEFF}]|[\u{1FF00}-\u{1FFFF}])/gu;
  
  return text.replace(emojiRegex, '');
};

/**
 * Escape HTML entities in text
 * @param {string} text - Text to escape
 * @returns {string} - Escaped HTML
 */
const escapeHtml = (text) => {
  if (!text) return '';
  
  // Simple HTML escaping that preserves emojis
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * Generate unique ID for elements
 * @param {string} prefix - ID prefix
 * @returns {string} - Unique ID
 */
const generateId = (prefix = 'element') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Generate anchor ID from header text
 * @param {string} text - Header text
 * @returns {string} - Anchor ID
 */
export const generateAnchorId = (text) => {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

/**
 * Process inline markdown elements
 * @param {string} text - Text to process
 * @returns {string} - Processed HTML
 */
export const processInlineMarkdown = (text) => {
  return removeEmojis(text)
    
    // Images (before links to avoid conflicts)
    .replace(MARKDOWN_PATTERNS.INLINE.IMAGE,
      '<img src="$2" alt="$1" class="max-w-full h-auto rounded my-3 border border-slate-700" />')

    // Links - Remove links and show only the text content
    .replace(MARKDOWN_PATTERNS.INLINE.LINK, (match, text, url) => {
      // Just return the text content without the link
      return `<span class="text-slate-300">${text}</span>`;
    })

    // Bold (process after emojis to preserve them)
    .replace(MARKDOWN_PATTERNS.INLINE.BOLD, (match, content) => {
      const processedContent = content; // Content already has emojis processed
      return `<strong class="font-semibold text-slate-200">${processedContent}</strong>`;
    })
    .replace(/__(.*?)__/g, (match, content) => {
      const processedContent = content; // Content already has emojis processed
      return `<strong class="font-semibold text-slate-200">${processedContent}</strong>`;
    })

    // Italic (process after emojis to preserve them)
    .replace(MARKDOWN_PATTERNS.INLINE.ITALIC, (match, content) => {
      const processedContent = content; // Content already has emojis processed
      return `<em class="italic text-slate-300">${processedContent}</em>`;
    })
    .replace(/_(.*?)_/g, (match, content) => {
      const processedContent = content; // Content already has emojis processed
      return `<em class="italic text-slate-300">${processedContent}</em>`;
    })

    // Inline code
    .replace(MARKDOWN_PATTERNS.INLINE.CODE, '<code class="bg-slate-800 text-teal-300 px-2 py-1 rounded text-sm font-mono border border-slate-700">$1</code>')

    // Strikethrough
    .replace(MARKDOWN_PATTERNS.INLINE.STRIKETHROUGH, '<del class="text-slate-500">$1</del>')

    // Highlight/Mark
    .replace(MARKDOWN_PATTERNS.INLINE.HIGHLIGHT, '<mark class="bg-yellow-400/20 text-yellow-200 px-1 rounded">$1</mark>')

    // Subscript and Superscript
    .replace(MARKDOWN_PATTERNS.INLINE.SUBSCRIPT, '<sub>$1</sub>')
    .replace(MARKDOWN_PATTERNS.INLINE.SUPERSCRIPT, '<sup>$1</sup>')

    // Keyboard keys
    .replace(/<kbd>([^<]+)<\/kbd>/g, '<kbd class="bg-slate-700 text-slate-200 px-1 py-0.5 rounded text-xs font-mono border border-slate-600">$1</kbd>');
};

/**
 * Get language label for display
 * @param {string} language - Programming language
 * @returns {string} - Display label
 */
export const getLanguageLabel = (language) => {
  if (!language) return 'Code';

  const langInfo = PROGRAMMING_LANGUAGES[language.toLowerCase()];
  return langInfo ? langInfo.label : language.charAt(0).toUpperCase() + language.slice(1);
};

/**
 * Process code block with language detection and styling
 * @param {string} code - Code content
 * @param {string} language - Programming language
 * @returns {string} - Processed HTML
 */
export const processCodeBlock = (code, language = '') => {
  const languageLabel = getLanguageLabel(language);
  const languageIcon = generateLanguageIcon(language);
  
  // Clean up the code content - remove leading/trailing whitespace and normalize line endings
  const cleanCode = code.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  return `<div class="code-block-container my-6"><div class="code-block-header bg-slate-800 rounded-t-lg px-4 py-2 border border-slate-700 border-b-0 flex items-center justify-between"><div class="flex items-center gap-2">${languageIcon}<span class="text-sm font-medium text-slate-300">${languageLabel}</span></div><button class="copy-code-btn text-slate-400 hover:text-slate-200 transition-colors" title="Copy code"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button></div><pre class="bg-slate-800 rounded-b-lg p-4 overflow-x-auto border border-slate-700 border-t-0"><code class="language-${language} text-sm text-slate-300 font-mono leading-relaxed">${escapeHtml(cleanCode)}</code></pre></div>`;
};

/**
 * Process Mermaid diagram
 * @param {string} mermaidCode - Mermaid diagram code
 * @returns {string} - Processed HTML
 */
export const processMermaidDiagram = (mermaidCode) => {
  const mermaidId = generateId('mermaid');
  
  // Clean up the mermaid code content
  const cleanMermaidCode = mermaidCode.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  return `<div class="mermaid-wrapper my-6"><div class="mermaid" id="${mermaidId}">${cleanMermaidCode}</div></div>`;
};