/**
 * GitHub API Service
 * 
 * Endpoints:
 * - Profile: GET https://api.github.com/users/{username}
 * - Repos: GET https://api.github.com/users/{username}/repos?sort=updated&per_page=30&page={page}
 */

const BASE_URL = 'https://api.github.com';

export function sanitizeUsername(input) {
  if (!input || typeof input !== 'string') return '';
  let clean = input.trim();

  // Strip full or partial GitHub URLs (e.g. https://github.com/subhajitm6 or github.com/subhajitm6/repo)
  clean = clean.replace(/^(?:https?:\/\/)?(?:www\.)?github\.com\//i, '');

  // Strip leading and trailing slashes
  clean = clean.replace(/^\/+|\/+$/g, '');

  // If path format like username/repo, extract the username
  if (clean.includes('/')) {
    clean = clean.split('/')[0];
  }

  // Strip leading '@' or other common prefixes
  clean = clean.replace(/^[@#]+/, '');

  return clean.trim();
}

/**
 * Handle HTTP error responses cleanly.
 */
async function handleResponse(response, username = '') {
  if (response.ok) {
    return await response.json();
  }

  if (response.status === 404) {
    const userHint = username ? ` "${username}"` : '';
    const error = new Error(
      `User${userHint} not found. Please make sure to search for a GitHub user handle (e.g. subhajitm6, torvalds) rather than a repository name or URL.`
    );
    error.status = 404;
    throw error;
  }

  if (response.status === 403 || response.status === 429) {
    const error = new Error('GitHub API rate limit reached (60 requests/hour unauthenticated). Please wait a few moments or try again later.');
    error.status = response.status;
    throw error;
  }

  const error = new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  error.status = response.status;
  throw error;
}

/**
 * Fetch a GitHub user's profile by username.
 * @param {string} username 
 * @returns {Promise<Object>}
 */
export async function fetchUserProfile(username) {
  const sanitized = sanitizeUsername(username);
  if (!sanitized) {
    const error = new Error('Please enter a valid GitHub username.');
    error.status = 400;
    throw error;
  }
  const cleanUsername = encodeURIComponent(sanitized);
  const url = `${BASE_URL}/users/${cleanUsername}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });
    return await handleResponse(response, sanitized);
  } catch (err) {
    if (err.status) throw err;
    const networkError = new Error('Unable to connect to GitHub. Please check your internet connection.');
    networkError.status = 0;
    throw networkError;
  }
}

/**
 * Fetch a GitHub user's public repositories with pagination support.
 * @param {string} username 
 * @param {number} page
 * @param {number} perPage 
 * @returns {Promise<Array>}
 */
export async function fetchUserRepos(username, page = 1, perPage = 30) {
  const sanitized = sanitizeUsername(username);
  if (!sanitized) {
    return [];
  }
  const cleanUsername = encodeURIComponent(sanitized);
  const url = `${BASE_URL}/users/${cleanUsername}/repos?sort=updated&per_page=${perPage}&page=${page}`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });
    return await handleResponse(response, sanitized);
  } catch (err) {
    if (err.status) throw err;
    const networkError = new Error('Unable to fetch repositories from GitHub.');
    networkError.status = 0;
    throw networkError;
  }
}

/**
 * Fetch both user profile and initial repositories (page 1) in parallel.
 * @param {string} username 
 * @returns {Promise<{profile: Object, repos: Array}>}
 */
export async function fetchUserAndRepos(username) {
  const [profile, repos] = await Promise.all([
    fetchUserProfile(username),
    fetchUserRepos(username, 1, 30),
  ]);

  return { profile, repos };
}
