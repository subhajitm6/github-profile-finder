import React from 'react';
import { BookOpen, Users, UserCheck } from 'lucide-react';
import { formatCompactNumber } from '../utils/formatters';

export default function ProfileStats({ reposCount, followersCount, followingCount }) {
  const stats = [
    {
      id: 'repos',
      label: 'Repositories',
      value: formatCompactNumber(reposCount),
      raw: reposCount ?? 0,
      icon: BookOpen,
      color: 'text-blue-600 dark:text-[#58A6FF]',
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    },
    {
      id: 'followers',
      label: 'Followers',
      value: formatCompactNumber(followersCount),
      raw: followersCount ?? 0,
      icon: Users,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/40',
    },
    {
      id: 'following',
      label: 'Following',
      value: formatCompactNumber(followingCount),
      raw: followingCount ?? 0,
      icon: UserCheck,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className="flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 transition hover:bg-slate-50 dark:border-[#30363D] dark:bg-[#21262D]/60 dark:hover:bg-[#21262D]"
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.bgColor} ${stat.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-[#E6EDF3]" title={stat.raw.toLocaleString()}>
                {stat.value}
              </p>
              <p className="text-xs font-medium text-slate-500 dark:text-[#9198A1]">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
