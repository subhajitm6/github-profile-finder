import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="mx-auto my-12 max-w-lg rounded-2xl border border-rose-200 bg-rose-50/50 p-8 text-center sm:p-10 dark:border-rose-900/50 dark:bg-rose-950/20">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 shadow-sm shadow-rose-500/10 dark:bg-rose-900/40 dark:text-rose-400">
        <AlertCircle className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-800 dark:text-[#E6EDF3]">
        Unable to load profile
      </h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed dark:text-[#9198A1]">
        {message || 'An unexpected error occurred while fetching data from GitHub.'}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-[#238636] dark:hover:bg-[#2ea043]"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
}
