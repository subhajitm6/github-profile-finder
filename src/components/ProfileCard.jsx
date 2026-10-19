import React from 'react';
import { MapPin, Calendar, ExternalLink, Building2, Link as LinkIcon, Bookmark, BookmarkCheck } from 'lucide-react';
import ProfileStats from './ProfileStats';
import { formatDate } from '../utils/formatters';

export default function ProfileCard({ profile, isFavorite = false, onToggleFavorite }) {
  if (!profile) return null;

  const displayName = profile.name || profile.login;
  const username = profile.login;
  const avatarUrl = profile.avatar_url;
  const bio = profile.bio;
  const location = profile.location;
  const company = profile.company;
  const blog = profile.blog;
  const createdAt = profile.created_at;
  const htmlUrl = profile.html_url;

  // Format blog URL safely - ensure only http and https protocols are rendered
  const formattedBlog = (() => {
    if (!blog) return null;
    try {
      const url = new URL(blog.startsWith('http://') || blog.startsWith('https://') ? blog : `https://${blog}`);
      return (url.protocol === 'http:' || url.protocol === 'https:') ? url.href : null;
    } catch {
      return null;
    }
  })();

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 transition-colors sm:p-8 dark:border-[#30363D] dark:bg-[#161B22] dark:shadow-none">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
        {/* Avatar */}
        <div className="shrink-0">
          <img
            src={avatarUrl}
            alt={`${displayName}'s avatar`}
            className="h-24 w-24 rounded-2xl border-2 border-slate-100 object-cover shadow-sm sm:h-28 sm:w-28 dark:border-[#30363D]"
            loading="lazy"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 truncate dark:text-[#E6EDF3]">
                {displayName}
              </h2>
              <a
                href={htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-blue-600 hover:underline dark:text-[#58A6FF]"
              >
                @{username}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Favorite Toggle Button */}
              {onToggleFavorite && (
                <button
                  type="button"
                  onClick={() => onToggleFavorite(profile)}
                  aria-label={isFavorite ? `Remove @${username} from favorites` : `Save @${username} to favorites`}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 text-xs font-semibold shadow-2xs transition ${
                    isFavorite
                      ? 'border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-400'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-[#30363D] dark:bg-[#21262D] dark:text-[#E6EDF3] dark:hover:bg-[#30363D]'
                  }`}
                >
                  {isFavorite ? (
                    <>
                      <BookmarkCheck className="h-3.5 w-3.5 fill-current text-amber-500" />
                      <span>Favorited</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-3.5 w-3.5" />
                      <span>Favorite</span>
                    </>
                  )}
                </button>
              )}

              <a
                href={htmlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-[#30363D] dark:bg-[#21262D] dark:text-[#E6EDF3] dark:hover:bg-[#30363D]"
              >
                <span>View GitHub</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-3 text-sm text-slate-600 leading-relaxed dark:text-[#9198A1]">
            {bio || 'This user has no bio.'}
          </p>

          {/* Metadata badges */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-[#9198A1]">
            {company ? (
              <div className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
                <span className="truncate">{company}</span>
              </div>
            ) : null}

            {location ? (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
                <span>{location}</span>
              </div>
            ) : null}

            {formattedBlog ? (
              <div className="flex items-center gap-1.5">
                <LinkIcon className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
                <a
                  href={formattedBlog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-blue-600 hover:underline dark:text-[#58A6FF]"
                >
                  {blog}
                </a>
              </div>
            ) : null}

            {createdAt && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
                <span>Joined {formatDate(createdAt)}</span>
              </div>
            )}
          </div>

          {/* Stats Bar */}
          <div className="mt-6 border-t border-slate-100 pt-6 dark:border-[#30363D]">
            <ProfileStats
              reposCount={profile.public_repos}
              followersCount={profile.followers}
              followingCount={profile.following}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
