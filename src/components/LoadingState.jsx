import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="mx-auto my-12 max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12 dark:border-[#30363D] dark:bg-[#161B22]">
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-[#58A6FF]" />
        <h3 className="mt-4 text-base font-semibold text-slate-800 dark:text-[#E6EDF3]">
          Fetching GitHub profile...
        </h3>
        <p className="mt-1 text-xs text-slate-500 dark:text-[#9198A1]">
          Gathering user details and repositories
        </p>

        {/* Skeleton placeholder */}
        <div className="mt-8 w-full animate-pulse space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-[#21262D]"></div>
            <div className="flex-1 space-y-2 text-left">
              <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-[#21262D]"></div>
              <div className="h-3 w-1/4 rounded bg-slate-200 dark:bg-[#21262D]"></div>
            </div>
          </div>
          <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-[#21262D]"></div>
          <div className="grid grid-cols-3 gap-3 pt-4">
            <div className="h-16 rounded-xl bg-slate-100 dark:bg-[#21262D]"></div>
            <div className="h-16 rounded-xl bg-slate-100 dark:bg-[#21262D]"></div>
            <div className="h-16 rounded-xl bg-slate-100 dark:bg-[#21262D]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
