import React from 'react';
import { AlertCircle, RefreshCw, Home, Sparkles } from 'lucide-react';

export default function ErrorState({ message, searchedUsername, onRetry, onReset, onSelectPreset }) {
  const suggestions = ['subhajitm6', 'torvalds', 'shadcn', 'gaearon'];

  return (
    <div className="mx-auto my-12 max-w-lg rounded-2xl border border-rose-200 bg-rose-50/50 p-6 text-center sm:p-10 dark:border-rose-900/50 dark:bg-rose-950/20">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shadow-sm shadow-rose-500/10 dark:bg-rose-900/40 dark:text-rose-400">
        <AlertCircle className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-800 dark:text-[#E6EDF3]">
        Unable to load profile
      </h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed dark:text-[#9198A1]">
        {message || 'An unexpected error occurred while fetching data from GitHub.'}
      </p>

      {/* Suggested profiles to test with */}
      {onSelectPreset && (
        <div className="mt-6 border-t border-rose-200/60 pt-5 dark:border-rose-900/40">
          <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500 dark:text-[#9198A1]">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Try searching for an active developer:</span>
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {suggestions.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => onSelectPreset(name)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:border-blue-400 hover:text-blue-600 dark:border-[#30363D] dark:bg-[#161B22] dark:text-[#E6EDF3] dark:hover:border-[#58A6FF] dark:hover:text-[#58A6FF]"
              >
                @{name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-[#238636] dark:hover:bg-[#2ea043]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Try again</span>
          </button>
        )}

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-100 dark:border-[#30363D] dark:bg-[#21262D] dark:text-[#E6EDF3] dark:hover:bg-[#30363D]"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Back to search</span>
          </button>
        )}
      </div>
    </div>
  );
}
