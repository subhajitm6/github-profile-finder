import React from 'react';
import { UserCheck, Sparkles } from 'lucide-react';

export default function EmptyState({ onSelectPreset }) {
  const suggestions = ['subhajitm6', 'torvalds', 'gaearon', 'shadcn', 'facebook'];

  return (
    <div className="mx-auto my-12 max-w-lg rounded-2xl border border-dashed border-slate-200 bg-white/60 p-8 text-center backdrop-blur-sm sm:p-12 dark:border-[#30363D] dark:bg-[#161B22]/60">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/10 dark:bg-blue-950/50 dark:text-[#58A6FF]">
        <UserCheck className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-xl font-bold text-slate-800 dark:text-[#E6EDF3]">
        Search for a GitHub developer
      </h2>
      <p className="mt-2 text-sm text-slate-500 leading-relaxed dark:text-[#9198A1]">
        Find any public profile to inspect their repositories, programming languages, star counts, followers, and activity.
      </p>

      {onSelectPreset && (
        <div className="mt-6">
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400 dark:text-[#9198A1]">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Popular profiles to explore</span>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {suggestions.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => onSelectPreset(name)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-2xs transition hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-600 dark:border-[#30363D] dark:bg-[#21262D] dark:text-[#E6EDF3] dark:hover:border-[#58A6FF] dark:hover:bg-[#30363D] dark:hover:text-[#58A6FF]"
              >
                @{name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
