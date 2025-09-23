/**
 * Main Markdown to HTML Converter
 * Handles full document conversion with GitHub flavored markdown support
 */

import { MARKDOWN_PATTERNS, GITHUB_ALERTS } from '../constants/markdown.js';
import {
  processInlineMarkdown,
  generateAnchorId,
  processCodeBlock,
  processMermaidDiagram
} from './processor.js';

/**
 * Convert markdown to HTML with GitHub flavored markdown support
 * @param {string} markdown - Markdown content
 * @returns {string} - HTML content
 */
export const convertMarkdownToHtml = (markdown) => {
  if (!markdown) return '';

  // Split into lines for better processing
  const lines = markdown.split('\n');
  const htmlLines = [];
  let inCodeBlock = false;
  let codeBlockLanguage = '';
  let codeBlockContent = [];
  let inList = false;
  let listItems = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Handle code blocks
    if (trimmedLine.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        const code = codeBlockContent.join('\n');

        if (codeBlockLanguage.toLowerCase() === 'mermaid') {
          // Render Mermaid diagram
          htmlLines.push(processMermaidDiagram(code));
        } else {
          // Regular code block
          htmlLines.push(processCodeBlock(code, codeBlockLanguage));
        }

        inCodeBlock = false;
        codeBlockContent = [];
        codeBlockLanguage = '';
      } else {
        // Start code block
        inCodeBlock = true;
        codeBlockLanguage = trimmedLine.substring(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Handle lists
    const isUnorderedList = trimmedLine.match(MARKDOWN_PATTERNS.LISTS.UNORDERED);
    const isOrderedList = trimmedLine.match(MARKDOWN_PATTERNS.LISTS.ORDERED);

    if (isUnorderedList || isOrderedList) {
      const currentListType = isOrderedList ? 'ol' : 'ul';

      if (!inList) {
        // Start new list
        inList = true;
        listItems = [];
        listItems.listType = currentListType;
      }

      let listContent = trimmedLine.replace(MARKDOWN_PATTERNS.LISTS.UNORDERED, '')
                                   .replace(MARKDOWN_PATTERNS.LISTS.ORDERED, '');

      // Handle task lists (GitHub style)
      if (listContent.match(MARKDOWN_PATTERNS.LISTS.TASK)) {
        const isChecked = listContent.startsWith('[x]');
        listContent = listContent.replace(MARKDOWN_PATTERNS.LISTS.TASK, '');
        const processedContent = processInlineMarkdown(listContent);
        const checkbox = isChecked
          ? '<input type="checkbox" checked disabled class="mr-2 accent-teal-500">'
          : '<input type="checkbox" disabled class="mr-2 accent-teal-500">';
        listItems.push(`<li class="task-list-item">${checkbox}${processedContent}</li>`);
      } else {
        const processedContent = processInlineMarkdown(listContent);
        listItems.push(`<li>${processedContent}</li>`);
      }
      continue;
    } else {
      if (inList) {
        // End list
        const listTag = listItems.listType || 'ul';
        htmlLines.push(`<${listTag}>${listItems.join('')}</${listTag}>`);
        inList = false;
        listItems = [];
      }
    }

    // Handle horizontal rules
    if (MARKDOWN_PATTERNS.BLOCKS.HORIZONTAL_RULE.test(trimmedLine)) {
      htmlLines.push('<hr />');
    }
    // Handle headers with anchor IDs
    else if (MARKDOWN_PATTERNS.HEADERS.H1.test(trimmedLine)) {
      const headerText = trimmedLine.substring(2);
      const anchorId = generateAnchorId(headerText);
      const processedText = processInlineMarkdown(headerText);
      htmlLines.push(`<h1 id="${anchorId}">${processedText}</h1>`);
    } else if (MARKDOWN_PATTERNS.HEADERS.H2.test(trimmedLine)) {
      const headerText = trimmedLine.substring(3);
      const anchorId = generateAnchorId(headerText);
      const processedText = processInlineMarkdown(headerText);
      htmlLines.push(`<h2 id="${anchorId}">${processedText}</h2>`);
    } else if (MARKDOWN_PATTERNS.HEADERS.H3.test(trimmedLine)) {
      const headerText = trimmedLine.substring(4);
      const anchorId = generateAnchorId(headerText);
      const processedText = processInlineMarkdown(headerText);
      htmlLines.push(`<h3 id="${anchorId}">${processedText}</h3>`);
    } else if (MARKDOWN_PATTERNS.HEADERS.H4.test(trimmedLine)) {
      const headerText = trimmedLine.substring(5);
      const anchorId = generateAnchorId(headerText);
      const processedText = processInlineMarkdown(headerText);
      htmlLines.push(`<h4 id="${anchorId}">${processedText}</h4>`);
    } else if (MARKDOWN_PATTERNS.HEADERS.H5.test(trimmedLine)) {
      const headerText = trimmedLine.substring(6);
      const anchorId = generateAnchorId(headerText);
      const processedText = processInlineMarkdown(headerText);
      htmlLines.push(`<h5 id="${anchorId}">${processedText}</h5>`);
    } else if (MARKDOWN_PATTERNS.HEADERS.H6.test(trimmedLine)) {
      const headerText = trimmedLine.substring(7);
      const anchorId = generateAnchorId(headerText);
      const processedText = processInlineMarkdown(headerText);
      htmlLines.push(`<h6 id="${anchorId}">${processedText}</h6>`);
    } else if (trimmedLine === '') {
      // Empty line - add some spacing
      htmlLines.push('<div class="my-2"></div>');
    } else if (MARKDOWN_PATTERNS.BLOCKS.BLOCKQUOTE.test(trimmedLine)) {
      // Blockquote
      const content = processInlineMarkdown(trimmedLine.substring(2));
      htmlLines.push(`<blockquote><p>${content}</p></blockquote>`);
    } else if (trimmedLine.startsWith('[!')) {
      // GitHub-style callouts/alerts
      let alertMatch = null;
      for (const [type, pattern] of Object.entries(GITHUB_ALERTS)) {
        if (pattern.test(trimmedLine)) {
          alertMatch = [null, type];
          break;
        }
      }

      if (alertMatch) {
        const alertType = alertMatch[1].toLowerCase();
        const content = processInlineMarkdown(trimmedLine.replace(/^\[![^\]]+\]\s*/, ''));
        htmlLines.push(`<div class="markdown-alert markdown-alert-${alertType}"><p>${content}</p></div>`);
      } else {
        // Regular paragraph
        const content = processInlineMarkdown(line);
        if (content.trim()) {
          htmlLines.push(`<p>${content}</p>`);
        }
      }
    } else if (trimmedLine.match(/^<(details|\/details|summary|\/summary)>/i)) {
      // Details/summary elements - pass through
      htmlLines.push(trimmedLine);
    } else if (MARKDOWN_PATTERNS.BLOCKS.TABLE_ROW.test(trimmedLine)) {
      // Table row
      const cells = trimmedLine.slice(1, -1).split('|').map(cell => cell.trim());
      const isHeader = lines[i + 1] && MARKDOWN_PATTERNS.BLOCKS.TABLE_SEPARATOR.test(lines[i + 1].trim());

      if (isHeader) {
        const headerCells = cells.map(cell => `<th>${processInlineMarkdown(cell)}</th>`).join('');
        htmlLines.push(`<table><thead><tr>${headerCells}</tr></thead><tbody>`);
      } else if (htmlLines[htmlLines.length - 1] && htmlLines[htmlLines.length - 1].includes('<tbody>')) {
        const dataCells = cells.map(cell => `<td>${processInlineMarkdown(cell)}</td>`).join('');
        htmlLines.push(`<tr>${dataCells}</tr>`);
      }
    } else if (MARKDOWN_PATTERNS.BLOCKS.TABLE_SEPARATOR.test(trimmedLine)) {
      // Table separator - skip it as we handle it above
      continue;
    } else {
      // Regular paragraph
      const content = processInlineMarkdown(line);
      if (content.trim()) {
        htmlLines.push(`<p>${content}</p>`);
      }
    }
  }

  // Handle final list if exists
  if (inList) {
    const listTag = listItems.listType || 'ul';
    htmlLines.push(`<${listTag}>${listItems.join('')}</${listTag}>`);
  }

  return htmlLines.join('\n');
};