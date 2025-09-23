/**
 * Application Configuration
 */

export const APP_CONFIG = {
  name: 'Portfolio Site',
  version: '1.0.0',
  author: 'Hamed',
  description: 'Personal portfolio website showcasing projects and skills',

  // Feature flags
  features: {
    githubIntegration: true,
    mermaidDiagrams: true,
    darkMode: true,
    animations: true
  },

  // UI Configuration
  ui: {
    maxProjectsPerPage: 12,
    popoverMaxWidth: '90vw',
    popoverMaxHeight: '80vh',
    animationDuration: 300
  },

  // External services
  services: {
    github: {
      apiUrl: 'https://api.github.com',
      timeout: 10000,
      cacheTimeout: 300000 // 5 minutes
    },
    analytics: {
      enabled: false,
      trackingId: null
    }
  }
};