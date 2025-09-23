/**
 * CSP-Safe Fetch Utility
 * Handles Content Security Policy restrictions gracefully
 */

/**
 * Attempts to fetch data with fallback strategies for CSP restrictions
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise<Response>} - Fetch response
 */
export const cspSafeFetch = async (url, options = {}) => {
  try {
    // First attempt: Direct fetch
    return await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-Site',
        ...options.headers
      }
    });
  } catch (error) {
    // Check if it's a CSP or network error
    if (error.name === 'TypeError' && 
        (error.message.includes('fetch') || 
         error.message.includes('CORS') ||
         error.message.includes('Content Security Policy'))) {
      
      console.warn('Direct fetch blocked by CSP, attempting proxy fallback...');
      
      try {
        // Fallback: Use a CORS proxy (if available)
        const proxyUrl = `https://cors-anywhere.herokuapp.com/${url}`;
        return await fetch(proxyUrl, {
          ...options,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/vnd.github.v3+json',
            ...options.headers
          }
        });
      } catch (proxyError) {
        console.warn('Proxy fetch also failed:', proxyError);
        throw new Error('Network error: Unable to connect to GitHub API. This may be due to Content Security Policy restrictions.');
      }
    }
    
    throw error;
  }
};

/**
 * Fetches GitHub data with CSP-safe approach
 * @param {string} endpoint - GitHub API endpoint
 * @returns {Promise<Object>} - API response data
 */
export const fetchGitHubData = async (endpoint) => {
  const url = `https://api.github.com${endpoint}`;
  
  try {
    const response = await cspSafeFetch(url);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('GitHub API fetch failed:', error);
    throw error;
  }
};

/**
 * Checks if an error is related to CSP restrictions
 * @param {Error} error - The error to check
 * @returns {boolean} - True if it's a CSP-related error
 */
export const isCSPError = (error) => {
  return error?.message?.includes('Content Security Policy') ||
         error?.message?.includes('CORS') ||
         (error?.name === 'TypeError' && error?.message?.includes('fetch'));
};
