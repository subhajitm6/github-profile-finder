import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { sanitizeUsername } from '../services/githubApi';

export default function SearchForm({ onSearch, isLoading = false }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = sanitizeUsername(username);
    if (clean && !isLoading && onSearch) {
      onSearch(clean);
    }
  };

  const handleClear = () => {
    setUsername('');
    const input = document.getElementById('github-username-input');
    if (input) input.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl" role="search" aria-label="GitHub username search">
      <div className="relative flex items-center rounded-2xl border border-slate-200/90 bg-white p-1.5 sm:p-2 shadow-sm shadow-slate-200/50 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 hover:border-slate-300 dark:border-[#30363D] dark:bg-[#161B22] dark:shadow-none dark:hover:border-slate-600 dark:focus-within:border-[#58A6FF] dark:focus-within:ring-[#58A6FF]/20">
        <label htmlFor="github-username-input" className="sr-only">
          GitHub Username
        </label>
        <div className="pointer-events-none pl-2.5 sm:pl-3 text-slate-400 dark:text-[#9198A1] shrink-0">
          <Search className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </div>
        <input
          id="github-username-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username (e.g. subhajitm6, torvalds)..."
          disabled={isLoading}
          autoComplete="off"
          spellCheck="false"
          className="min-w-0 flex-1 border-none bg-transparent px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none disabled:opacity-50 dark:text-[#E6EDF3] dark:placeholder-[#9198A1]"
        />

        {username && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search input"
            className="mr-1 sm:mr-2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:text-[#9198A1] dark:hover:bg-[#21262D] dark:hover:text-[#E6EDF3] shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <button
          id="search-button"
          type="submit"
          disabled={!username.trim() || isLoading}
          aria-busy={isLoading}
          className="flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 dark:bg-[#1F6FEB] dark:hover:bg-blue-600 dark:shadow-none"
        >
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}
