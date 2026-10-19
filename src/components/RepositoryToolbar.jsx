import React from 'react';
import { Search, ArrowUpDown, Filter } from 'lucide-react';

export default function RepositoryToolbar({
  filterText,
  onFilterChange,
  selectedLanguage,
  onLanguageChange,
  availableLanguages = [],
  sortBy,
  onSortChange,
  totalCount,
  visibleCount,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title & Count */}
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-[#E6EDF3]">
            Public Repositories
          </h3>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-[#58A6FF]">
            {visibleCount}
            {visibleCount !== totalCount ? ` of ${totalCount} loaded` : ''}
          </span>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Filter */}
          <div className="relative min-w-[180px] flex-1 sm:w-56 sm:flex-initial">
            <label htmlFor="repo-filter-input" className="sr-only">
              Filter repositories
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 dark:text-[#9198A1]">
              <Search className="h-4 w-4" />
            </div>
            <input
              id="repo-filter-input"
              type="text"
              value={filterText}
              onChange={(e) => onFilterChange(e.target.value)}
              placeholder="Search name & description..."
              className="w-full rounded-xl border border-slate-200 bg-white py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-[#30363D] dark:bg-[#161B22] dark:text-[#E6EDF3] dark:placeholder-[#9198A1] dark:focus:border-[#58A6FF] dark:focus:ring-[#58A6FF]/20"
            />
          </div>

          {/* Language Filter */}
          <div className="relative flex items-center">
            <label htmlFor="repo-language-select" className="sr-only">
              Filter by language
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 dark:text-[#9198A1]">
              <Filter className="h-3.5 w-3.5" />
            </div>
            <select
              id="repo-language-select"
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white py-1.5 pl-8 pr-7 text-xs font-medium text-slate-700 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-[#30363D] dark:bg-[#161B22] dark:text-[#E6EDF3] dark:focus:border-[#58A6FF] dark:focus:ring-[#58A6FF]/20"
            >
              <option value="">All Languages</option>
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Select */}
          <div className="relative flex items-center">
            <label htmlFor="repo-sort-select" className="sr-only">
              Sort repositories
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-400 dark:text-[#9198A1]">
              <ArrowUpDown className="h-3.5 w-3.5" />
            </div>
            <select
              id="repo-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white py-1.5 pl-8 pr-7 text-xs font-medium text-slate-700 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-[#30363D] dark:bg-[#161B22] dark:text-[#E6EDF3] dark:focus:border-[#58A6FF] dark:focus:ring-[#58A6FF]/20"
            >
              <option value="updated">Recently updated</option>
              <option value="stars">Most stars</option>
              <option value="forks">Most forks</option>
              <option value="name">Alphabetical (A–Z)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
