# Antigravity Prompt — Upgrade GitHub Profile Finder

## Project Overview

I already have a working GitHub Profile Finder application built with React, Vite, Tailwind CSS, and the public GitHub REST API.

I want to upgrade the existing application into a polished, interactive GitHub Developer Explorer suitable for my developer portfolio and technical interviews.

**IMPORTANT:** Inspect the existing project before modifying anything. Extend the current application instead of creating a new project or rebuilding the UI from scratch.

## 1. Technology Requirements

- Frontend: React with the existing JavaScript setup
- Build tool: Vite
- Styling: Existing Tailwind CSS setup
- Data source: GitHub REST API
- State management: React hooks and the existing architecture
- Browser storage: localStorage for recent searches, favorites, and theme preferences
- No backend or database
- No paid APIs or API tokens

Do not migrate to TypeScript or introduce a new UI framework.

## 2. Advanced Profile Overview

Improve the existing profile card to display:

- Avatar and username
- Full name and bio
- Company, location, and public website, when available
- Followers and following
- Public repository count
- GitHub account creation date
- Profile link that opens the user's GitHub page

Add clear empty-state handling for missing optional profile information.

Make the profile overview visually attractive without overcrowding the page.

## 3. Advanced Repository Explorer

Upgrade the current repository list with the following functionality.

### Repository cards

Display:
- Repository name
- Description
- Primary language
- Stars and forks
- Open issue count
- Last updated date
- Public repository link

### Search and filtering

- Add a search input that filters repositories by name and description.
- Add a programming-language filter populated from the repositories returned by the API.
- Add sorting options:
  - Recently updated
  - Most stars
  - Most forks
  - Repository name, A–Z

### Pagination

- Add a Load More button or pagination.
- Fetch additional repository pages from the GitHub API when necessary.
- Do not silently imply that the first 30 repositories represent every repository.
- Show a useful message when no repositories match the filters.
- Prevent duplicate repositories when loading more results.

Preserve the current filtering and sorting functionality if it already exists.

## 4. Developer Comparison

Add a dedicated comparison section or a separate route if the existing architecture supports it cleanly.

Allow users to enter two GitHub usernames and compare:

- Followers
- Following
- Public repositories
- Total stars and forks across the repositories successfully retrieved
- Programming-language distribution among the repositories retrieved
- Most recently updated repositories

Requirements:

- Fetch both profiles and their repository data from the public GitHub API.
- Display the two developers side by side on desktop.
- Stack the comparison cards on mobile.
- Handle invalid usernames independently.
- Display loading indicators while fetching data.
- Prevent stale responses from replacing results for newer searches.
- Provide a clear action to compare another pair.

Important: Label calculated totals and language distributions accurately. If repository data is incomplete because of pagination or API limits, indicate that the comparison is based on the retrieved repositories.

Do not invent statistics or display fake contribution counts.

## 5. Recent Searches

Implement a recent-search feature.

- Save successfully searched usernames in localStorage.
- Display a small list of recent profiles.
- Allow users to click a username to search it again.
- Avoid duplicate usernames, ignoring differences in letter case.
- Keep the most recent searches first.
- Limit the history to 10 entries.
- Provide a clear-history action with suitable confirmation if needed.

Do not save failed searches as successful results.

## 6. Favorite Profiles

Allow users to bookmark GitHub profiles.

- Add a favorite/unfavorite button to profile cards.
- Create a Favorites section that displays saved profiles.
- Allow users to reopen a saved profile.
- Allow users to remove favorites.
- Persist favorites in localStorage.
- Avoid duplicate favorites.
- Handle missing or deleted GitHub accounts gracefully.

Favorites should work without requiring authentication.

## 7. UI and User Experience

Keep the existing visual identity and improve consistency.

- Preserve the existing dark mode and light mode.
- Preserve the current theme preference behavior.
- Use consistent spacing, typography, cards, borders, and buttons.
- Add subtle transitions and hover states.
- Use skeleton loaders for profile and repository loading where appropriate.
- Add clear empty, loading, and error states.
- Make all controls keyboard-accessible.
- Add accessible labels and visible focus states.
- Ensure external links open safely in a new tab when appropriate.
- Ensure the interface works on desktop, tablet, and mobile.

Avoid unnecessary animations, excessive gradients, cluttered dashboards, and unrelated features.

## 8. GitHub API Integration

Reuse and improve the existing API service, preferably `src/services/githubApi.js` if that is the current filename.

Use these public endpoints:

- Profile: `https://api.github.com/users/{username}`
- Repositories: `https://api.github.com/users/{username}/repos?sort=updated&per_page=30&page=1`

Support pagination by incrementing the page parameter.

Requirements:

- Check HTTP response status before parsing data.
- Handle 404 for nonexistent users.
- Handle 403 and 429 responses where applicable, including API rate limits.
- Handle network failures and malformed responses.
- Do not make unnecessary duplicate requests.
- Do not add a GitHub access token or hardcode credentials.
- Keep API logic separate from presentation components.
- Avoid unnecessary API calls when users change only local filters or sorting.
- Cancel obsolete requests where practical.

Do not create fake API responses or hardcoded profile statistics for the real application.

## 9. Suggested Component Organization

Follow the existing structure where possible. A reasonable organization could be:

`src/components/`
- `ProfileCard.jsx`
- `ProfileStats.jsx`
- `RepositoryList.jsx`
- `RepositoryCard.jsx`
- `RepositoryToolbar.jsx`
- `DeveloperComparison.jsx`
- `RecentSearches.jsx`
- `FavoriteProfiles.jsx`
- `LoadingState.jsx`
- `ErrorState.jsx`
- `EmptyState.jsx`

`src/services/githubApi.js`

`src/utils/formatters.js`

Use reusable components and keep components reasonably small. Do not duplicate components that already exist.

## 10. Testing and Quality Assurance

After implementation, test the following:

1. Search a valid username such as `torvalds`.
2. Search another valid username such as `gaearon`.
3. Search a nonexistent username.
4. Compare two valid usernames.
5. Compare one valid username with one invalid username.
6. Search repositories by name and description.
7. Filter repositories by programming language.
8. Sort repositories by stars, forks, update date, and name.
9. Load additional repository pages without duplicates.
10. Add and remove favorites.
11. Reload the page and confirm favorites persist.
12. Search profiles and confirm recent history persists.
13. Switch themes and reload the page.
14. Test network failures and API rate-limit responses where feasible.
15. Verify mobile, tablet, and desktop layouts.
16. Run the production build using `npm run build`.

Fix errors introduced by the changes and report any remaining limitations.

## 11. Final Instructions

Before making changes:

1. Inspect the existing source code, package versions, routing, components, and API service.
2. Identify which requested features already exist.
3. Provide a short implementation plan.

Then implement the features incrementally while preserving all working functionality.

Do not delete existing functionality, replace the project, install unnecessary packages, commit changes, or push to GitHub automatically.

When finished, provide:
- Features implemented
- Files created or modified
- API endpoints used
- Tests performed
- Build result
- Any known limitations

The final result should feel like a professional GitHub Developer Explorer, not just a basic username search form.