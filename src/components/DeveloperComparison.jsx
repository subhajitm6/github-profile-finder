import React, { useState } from 'react';
import { Users2, ArrowRightLeft, Star, GitFork, BookOpen, AlertCircle, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { fetchUserAndRepos, sanitizeUsername } from '../services/githubApi';
import { formatCompactNumber } from '../utils/formatters';

export default function DeveloperComparison() {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');

  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [hasCompared, setHasCompared] = useState(false);

  const computeMetrics = (repos = []) => {
    let totalStars = 0;
    let totalForks = 0;
    const langCounts = {};

    repos.forEach((r) => {
      totalStars += r.stargazers_count || 0;
      totalForks += r.forks_count || 0;
      if (r.language) {
        langCounts[r.language] = (langCounts[r.language] || 0) + 1;
      }
    });

    // Top 3 languages
    const topLanguages = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([lang, count]) => ({ lang, count }));

    return { totalStars, totalForks, topLanguages };
  };

  const handleCompare = async (e) => {
    if (e) e.preventDefault();
    const u1 = sanitizeUsername(user1);
    const u2 = sanitizeUsername(user2);

    if (!u1 || !u2 || isLoading) return;

    setIsLoading(true);
    setError1(null);
    setError2(null);
    setData1(null);
    setData2(null);
    setHasCompared(true);

    const p1Promise = fetchUserAndRepos(u1)
      .then((res) => ({ success: true, ...res, metrics: computeMetrics(res.repos) }))
      .catch((err) => ({ success: false, error: err.message }));

    const p2Promise = fetchUserAndRepos(u2)
      .then((res) => ({ success: true, ...res, metrics: computeMetrics(res.repos) }))
      .catch((err) => ({ success: false, error: err.message }));

    const [res1, res2] = await Promise.all([p1Promise, p2Promise]);

    if (res1.success) {
      setData1(res1);
    } else {
      setError1(res1.error);
    }

    if (res2.success) {
      setData2(res2);
    } else {
      setError2(res2.error);
    }

    setIsLoading(false);
  };

  const renderDevCard = (username, data, error) => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs dark:border-[#30363D] dark:bg-[#161B22]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-[#58A6FF]" />
          <p className="mt-3 text-xs text-slate-500 dark:text-[#9198A1]">
            Analyzing @{username}...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50/50 p-6 text-center dark:border-rose-900/50 dark:bg-rose-950/20">
          <AlertCircle className="h-6 w-6 text-rose-500" />
          <h4 className="mt-2 text-sm font-semibold text-rose-700 dark:text-rose-400">
            Failed to load @{username}
          </h4>
          <p className="mt-1 text-xs text-rose-600/80 dark:text-rose-400/80">
            {error}
          </p>
        </div>
      );
    }

    if (!data) return null;

    const { profile, repos, metrics } = data;

    return (
      <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#30363D] dark:bg-[#161B22]">
        <div>
          {/* Header */}
          <div className="flex items-center gap-3.5">
            <img
              src={profile.avatar_url}
              alt={`${profile.login}'s avatar`}
              className="h-14 w-14 rounded-xl border border-slate-100 object-cover dark:border-[#30363D]"
            />
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-base font-bold text-slate-900 dark:text-[#E6EDF3]">
                {profile.name || profile.login}
              </h4>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline dark:text-[#58A6FF]"
              >
                <span>@{profile.login}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 dark:border-[#30363D] dark:bg-[#21262D]/60">
              <span className="text-[11px] text-slate-500 dark:text-[#9198A1]">Followers</span>
              <p className="text-base font-bold text-slate-900 dark:text-[#E6EDF3]">
                {formatCompactNumber(profile.followers)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 dark:border-[#30363D] dark:bg-[#21262D]/60">
              <span className="text-[11px] text-slate-500 dark:text-[#9198A1]">Following</span>
              <p className="text-base font-bold text-slate-900 dark:text-[#E6EDF3]">
                {formatCompactNumber(profile.following)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 dark:border-[#30363D] dark:bg-[#21262D]/60">
              <span className="text-[11px] text-slate-500 dark:text-[#9198A1]">Public Repos</span>
              <p className="text-base font-bold text-slate-900 dark:text-[#E6EDF3]">
                {formatCompactNumber(profile.public_repos)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 dark:border-[#30363D] dark:bg-[#21262D]/60">
              <span className="text-[11px] text-slate-500 dark:text-[#9198A1]">Sampled Stars</span>
              <p className="text-base font-bold text-amber-600 dark:text-amber-400">
                {formatCompactNumber(metrics.totalStars)}
              </p>
            </div>
          </div>

          {/* Top Languages */}
          <div className="mt-5 border-t border-slate-100 pt-4 dark:border-[#30363D]">
            <p className="text-xs font-semibold text-slate-700 dark:text-[#E6EDF3]">
              Top Languages (from {repos.length} retrieved repos):
            </p>
            {metrics.topLanguages.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {metrics.topLanguages.map(({ lang, count }) => (
                  <span
                    key={lang}
                    className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-[#21262D] dark:text-[#E6EDF3]"
                  >
                    <span>{lang}</span>
                    <span className="text-[10px] text-slate-400">({count})</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-1 text-xs text-slate-400">No language data recorded</p>
            )}
          </div>

          {/* Most recent repositories */}
          <div className="mt-4 border-t border-slate-100 pt-4 dark:border-[#30363D]">
            <p className="text-xs font-semibold text-slate-700 dark:text-[#E6EDF3]">
              Recently Active Repos:
            </p>
            <div className="mt-2 space-y-1.5">
              {repos.slice(0, 3).map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-2 text-xs">
                  <a
                    href={r.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate min-w-0 flex-1 font-medium text-slate-800 hover:text-blue-600 dark:text-[#E6EDF3] dark:hover:text-[#58A6FF]"
                  >
                    {r.name}
                  </a>
                  <span className="text-[11px] text-slate-400 flex items-center gap-0.5 shrink-0">
                    <Star className="h-3 w-3 text-amber-500 inline" />
                    {r.stargazers_count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 text-[10px] text-slate-400 dark:text-[#9198A1]">
          * Totals based on retrieved sample ({repos.length} public repos).
        </p>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
      {/* Compare Form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-sm dark:border-[#30363D] dark:bg-[#161B22]">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-blue-600 dark:text-[#58A6FF] shrink-0" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#E6EDF3]">
            Developer Head-to-Head Comparison
          </h3>
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-[#9198A1]">
          Compare followers, public repositories, language distribution, and stars between any two GitHub developers.
        </p>

        <form onSubmit={handleCompare} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1 min-w-0">
            <label htmlFor="user1-input" className="sr-only">First developer</label>
            <input
              id="user1-input"
              type="text"
              value={user1}
              onChange={(e) => setUser1(e.target.value)}
              placeholder="Developer 1 (e.g. torvalds)"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-[#30363D] dark:bg-[#21262D] dark:text-[#E6EDF3]"
            />
          </div>

          <span className="text-center text-xs font-bold text-slate-400 sm:px-1 shrink-0">VS</span>

          <div className="flex-1 min-w-0">
            <label htmlFor="user2-input" className="sr-only">Second developer</label>
            <input
              id="user2-input"
              type="text"
              value={user2}
              onChange={(e) => setUser2(e.target.value)}
              placeholder="Developer 2 (e.g. gaearon)"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-[#30363D] dark:bg-[#21262D] dark:text-[#E6EDF3]"
            />
          </div>

          <button
            type="submit"
            disabled={!user1.trim() || !user2.trim() || isLoading}
            className="w-full sm:w-auto flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50 dark:bg-[#1F6FEB] dark:hover:bg-blue-600 cursor-pointer"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRightLeft className="h-4 w-4" />}
            <span>Compare</span>
          </button>
        </form>
      </div>

      {/* Comparison Results */}
      {hasCompared && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {renderDevCard(user1, data1, error1)}
          {renderDevCard(user2, data2, error2)}
        </div>
      )}
    </div>
  );
}
