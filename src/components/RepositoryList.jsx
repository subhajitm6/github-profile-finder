import React, { useMemo } from 'react';
import RepositoryCard from './RepositoryCard';
import { FolderGit2, SearchX, Loader2 } from 'lucide-react';

export default function RepositoryList({
  repos,
  filterText,
  selectedLanguage,
  sortBy,
  onLoadMore,
  hasMore,
  isLoadingMore,
  totalPublicRepos,
}) {
  // Local filtering and sorting without extra API calls
  const filteredAndSortedRepos = useMemo(() => {
    if (!repos || !Array.isArray(repos)) return [];

    let result = [...repos];

    // 1. Filter by name and description
    if (filterText && filterText.trim() !== '') {
      const query = filterText.trim().toLowerCase();
      result = result.filter((repo) => {
        const nameMatch = repo.name?.toLowerCase().includes(query);
        const descMatch = repo.description?.toLowerCase().includes(query);
        return nameMatch || descMatch;
      });
    }

    // 2. Filter by language
    if (selectedLanguage && selectedLanguage.trim() !== '') {
      result = result.filter(
        (repo) => (repo.language || '').toLowerCase() === selectedLanguage.toLowerCase()
      );
    }

    // 3. Sort by selected criteria
    result.sort((a, b) => {
      if (sortBy === 'stars') {
        return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      }
      if (sortBy === 'forks') {
        return (b.forks_count || 0) - (a.forks_count || 0);
      }
      if (sortBy === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      }
      // Default: recently updated
      const dateA = new Date(a.updated_at || 0).getTime();
      const dateB = new Date(b.updated_at || 0).getTime();
      return dateB - dateA;
    });

    return result;
  }, [repos, filterText, selectedLanguage, sortBy]);

  // Case 1: User has 0 public repositories overall
  if (!repos || repos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/50 p-8 text-center sm:p-12 dark:border-[#30363D] dark:bg-[#161B22]/50">
        <FolderGit2 className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600" />
        <h4 className="mt-3 text-sm font-semibold text-slate-700 dark:text-[#E6EDF3]">No public repositories</h4>
        <p className="mt-1 text-xs text-slate-400 dark:text-[#9198A1]">
          This developer has not published any public repositories yet.
        </p>
      </div>
    );
  }

  // Case 2: Filter yielded no matches
  if (filteredAndSortedRepos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/50 p-8 text-center sm:p-12 dark:border-[#30363D] dark:bg-[#161B22]/50">
        <SearchX className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600" />
        <h4 className="mt-3 text-sm font-semibold text-slate-700 dark:text-[#E6EDF3]">No matching repositories</h4>
        <p className="mt-1 text-xs text-slate-400 dark:text-[#9198A1]">
          No repositories matched your filters. Try clearing or modifying your search or language selection.
        </p>
      </div>
    );
  }

  // Case 3: Render responsive grid of cards + pagination Load More
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {filteredAndSortedRepos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>

      {/* Pagination Load More Button */}
      {hasMore && (
        <div className="flex flex-col items-center justify-center pt-2">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-2xs transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50 dark:border-[#30363D] dark:bg-[#161B22] dark:text-[#E6EDF3] dark:hover:bg-[#21262D]"
          >
            {isLoadingMore ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-blue-600 dark:text-[#58A6FF]" />
                <span>Loading more repositories...</span>
              </>
            ) : (
              <span>Load More Repositories ({repos.length} of {totalPublicRepos})</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
