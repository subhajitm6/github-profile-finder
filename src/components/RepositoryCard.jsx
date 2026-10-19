import React from 'react';
import { Star, GitFork, ExternalLink, Circle, AlertCircle } from 'lucide-react';
import { formatDate, formatCompactNumber } from '../utils/formatters';

// Map common languages to distinctive GitHub-inspired accent colors
const LANGUAGE_COLORS = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-blue-400',
  HTML: 'bg-orange-500',
  CSS: 'bg-indigo-500',
  C: 'bg-slate-600',
  'C++': 'bg-pink-600',
  Rust: 'bg-amber-700',
  Go: 'bg-teal-500',
  Java: 'bg-amber-600',
  Ruby: 'bg-red-600',
  PHP: 'bg-indigo-400',
  Shell: 'bg-emerald-500',
};

export default function RepositoryCard({ repo }) {
  if (!repo) return null;

  const {
    name,
    description,
    language,
    stargazers_count,
    forks_count,
    open_issues_count,
    updated_at,
    html_url,
    fork,
  } = repo;

  const langColor = language && LANGUAGE_COLORS[language] ? LANGUAGE_COLORS[language] : 'bg-slate-400';

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-2xs transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-[#30363D] dark:bg-[#161B22] dark:shadow-none dark:hover:border-slate-600 dark:hover:bg-[#1c2128]">
      <div>
        {/* Repo Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <a
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate font-semibold text-slate-900 group-hover:text-blue-600 hover:underline dark:text-[#E6EDF3] dark:group-hover:text-[#58A6FF]"
                title={name}
              >
                {name}
              </a>
              {fork && (
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-[#21262D] dark:text-[#9198A1]">
                  Fork
                </span>
              )}
            </div>
          </div>

          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open repository ${name} on GitHub`}
            className="text-slate-400 transition hover:text-slate-700 dark:text-[#9198A1] dark:hover:text-[#E6EDF3]"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Description */}
        <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2 dark:text-[#9198A1]">
          {description || 'No description provided.'}
        </p>
      </div>

      {/* Footer / Meta */}
      <div className="mt-4 flex flex-wrap items-center gap-3.5 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-[#30363D] dark:text-[#9198A1]">
        {/* Primary Language */}
        {language && (
          <div className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${langColor}`} />
            <span>{language}</span>
          </div>
        )}

        {/* Stars */}
        <div className="flex items-center gap-1" title={`${stargazers_count ?? 0} stars`}>
          <Star className="h-3.5 w-3.5 text-amber-500" />
          <span>{formatCompactNumber(stargazers_count)}</span>
        </div>

        {/* Forks */}
        <div className="flex items-center gap-1" title={`${forks_count ?? 0} forks`}>
          <GitFork className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
          <span>{formatCompactNumber(forks_count)}</span>
        </div>

        {/* Open Issues */}
        {typeof open_issues_count === 'number' && open_issues_count > 0 && (
          <div className="flex items-center gap-1" title={`${open_issues_count} open issues`}>
            <AlertCircle className="h-3.5 w-3.5 text-rose-500/80" />
            <span>{formatCompactNumber(open_issues_count)}</span>
          </div>
        )}

        {/* Updated At */}
        {updated_at && (
          <div className="ml-auto text-[11px] text-slate-400 dark:text-[#9198A1]">
            Updated {formatDate(updated_at)}
          </div>
        )}
      </div>
    </div>
  );
}
