/**
 * Markdown Processing Constants
 */

export const MARKDOWN_PATTERNS = {
  HEADERS: {
    H1: /^# /,
    H2: /^## /,
    H3: /^### /,
    H4: /^#### /,
    H5: /^##### /,
    H6: /^###### /
  },
  LISTS: {
    UNORDERED: /^[-*+]\s+/,
    ORDERED: /^\d+\.\s+/,
    TASK: /^\[[ x]\]\s+/
  },
  BLOCKS: {
    CODE_FENCE: /^```/,
    BLOCKQUOTE: /^> /,
    HORIZONTAL_RULE: /^(---|___|\*\*\*)$/,
    TABLE_ROW: /^\| .* \|$/,
    TABLE_SEPARATOR: /^\|(\s*:?-+:?\s*\|)+\s*$/
  },
  INLINE: {
    BOLD: /\*\*(.*?)\*\*/g,
    ITALIC: /\*(.*?)\*/g,
    CODE: /`([^`]+)`/g,
    LINK: /\[([^\]]+)\]\(([^)]+)\)/g,
    IMAGE: /!\[([^\]]*)\]\(([^)]+)\)/g,
    STRIKETHROUGH: /~~(.*?)~~/g,
    HIGHLIGHT: /==(.*?)==/g,
    SUBSCRIPT: /~([^~]+)~/g,
    SUPERSCRIPT: /\^([^\^]+)\^/g
  }
};

export const GITHUB_ALERTS = {
  NOTE: /^\[!NOTE\]/i,
  TIP: /^\[!TIP\]/i,
  IMPORTANT: /^\[!IMPORTANT\]/i,
  WARNING: /^\[!WARNING\]/i,
  CAUTION: /^\[!CAUTION\]/i
};

export const PROGRAMMING_LANGUAGES = {
  javascript: { label: 'JavaScript', icon: 'js' },
  typescript: { label: 'TypeScript', icon: 'ts' },
  python: { label: 'Python', icon: 'py' },
  react: { label: 'React', icon: 'react' },
  vue: { label: 'Vue.js', icon: 'vue' },
  node: { label: 'Node.js', icon: 'node' },
  bash: { label: 'Bash', icon: 'bash' },
  shell: { label: 'Shell', icon: 'bash' },
  html: { label: 'HTML', icon: 'html' },
  css: { label: 'CSS', icon: 'css' },
  json: { label: 'JSON', icon: 'json' },
  yaml: { label: 'YAML', icon: 'yaml' },
  yml: { label: 'YAML', icon: 'yaml' },
  dockerfile: { label: 'Dockerfile', icon: 'docker' },
  makefile: { label: 'Makefile', icon: 'make' }
};