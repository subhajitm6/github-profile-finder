import React from 'react';
import { History, Trash2, ArrowUpRight } from 'lucide-react';

export default function RecentSearches({ searches = [], onSelect, onClear, onRemove }) {
  if (!searches || searches.length === 0) return null;

  return (
    <div className="mx-auto mt-4 w-full max-w-2xl">
      <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-[#9198A1]">
        <div className="flex items-center gap-1.5 font-medium">
          <History className="h-3.5 w-3.5" />
          <span>Recent Searches</span>
        </div>
        {onClear && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClear();
            }}
            className="flex items-center gap-1 text-[11px] font-medium text-slate-500 transition-colors hover:text-rose-500 dark:text-[#9198A1] dark:hover:text-rose-400 cursor-pointer"
          >
            <Trash2 className="h-3 w-3" />
            <span>Clear history</span>
          </button>
        )}
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {searches.map((username) => (
          <div
            key={username}
            className="group inline-flex items-center rounded-lg border border-slate-200/80 bg-white/70 text-xs text-slate-700 shadow-2xs transition hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-600 dark:border-[#30363D] dark:bg-[#161B22] dark:text-[#E6EDF3] dark:hover:border-[#58A6FF] dark:hover:bg-[#21262D] max-w-full"
          >
            <button
              type="button"
              onClick={() => onSelect(username)}
              className="inline-flex items-center gap-1 py-1 pl-2.5 pr-1.5 cursor-pointer min-w-0"
            >
              <span className="truncate max-w-[140px] sm:max-w-[200px]">@{username}</span>
              <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100 text-blue-500 dark:text-[#58A6FF] shrink-0" />
            </button>
            {onRemove && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onRemove(username);
                }}
                title={`Remove ${username} from history`}
                aria-label={`Remove ${username} from history`}
                className="py-1 pr-2 pl-0.5 text-slate-400 opacity-60 transition hover:opacity-100 hover:text-rose-500 dark:hover:text-rose-400 cursor-pointer"
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
