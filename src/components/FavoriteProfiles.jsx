import React from 'react';
import { Bookmark, Trash2, ExternalLink } from 'lucide-react';

export default function FavoriteProfiles({ favorites = [], onSelect, onRemove }) {
  if (!favorites || favorites.length === 0) return null;

  return (
    <div className="mx-auto mt-8 w-full max-w-6xl">
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3 dark:border-[#30363D]">
        <Bookmark className="h-4 w-4 text-amber-500 fill-amber-500" />
        <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-[#E6EDF3]">
          Saved Favorites ({favorites.length})
        </h3>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((user) => (
          <div
            key={user.login}
            className="group relative flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-2xs transition hover:border-slate-300 hover:shadow-xs dark:border-[#30363D] dark:bg-[#161B22] dark:hover:border-slate-600"
          >
            <button
              type="button"
              onClick={() => onSelect(user.login)}
              className="flex items-center gap-2.5 min-w-0 flex-1 text-left"
            >
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="h-9 w-9 rounded-lg border border-slate-100 object-cover dark:border-[#30363D]"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-900 group-hover:text-blue-600 dark:text-[#E6EDF3] dark:group-hover:text-[#58A6FF]">
                  {user.name || user.login}
                </p>
                <p className="truncate text-[11px] text-slate-500 dark:text-[#9198A1]">
                  @{user.login}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onRemove(user.login)}
              aria-label={`Remove @${user.login} from favorites`}
              className="ml-2 rounded-lg p-1.5 text-slate-400 opacity-60 transition hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100 dark:text-[#9198A1] dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
