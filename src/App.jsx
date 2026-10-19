import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import ProfileCard from './components/ProfileCard';
import RepositoryToolbar from './components/RepositoryToolbar';
import RepositoryList from './components/RepositoryList';
import RecentSearches from './components/RecentSearches';
import FavoriteProfiles from './components/FavoriteProfiles';
import DeveloperComparison from './components/DeveloperComparison';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { fetchUserAndRepos, fetchUserRepos } from './services/githubApi';

export default function App() {
  const [activeTab, setActiveTab] = useState('search'); // 'search' | 'compare'

  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [repoPage, setRepoPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearched, setLastSearched] = useState('');

  // Local repository toolbar state
  const [filterText, setFilterText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [sortBy, setSortBy] = useState('updated');

  // Recent searches state persisted in localStorage (max 10, case-insensitive deduplication)
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const stored = localStorage.getItem('recent_searches');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Favorite profiles persisted in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('favorite_profiles');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('recent_searches', JSON.stringify(recentSearches));
    } catch {}
  }, [recentSearches]);

  useEffect(() => {
    try {
      localStorage.setItem('favorite_profiles', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const addRecentSearch = (username) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((u) => u.toLowerCase() !== username.toLowerCase());
      return [username, ...filtered].slice(0, 10);
    });
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('recent_searches');
    } catch {}
  };

  const handleRemoveRecentSearch = (username) => {
    setRecentSearches((prev) => prev.filter((u) => u.toLowerCase() !== username.toLowerCase()));
  };

  const handleToggleFavorite = (userProfile) => {
    if (!userProfile) return;
    setFavorites((prev) => {
      const exists = prev.some((p) => p.login.toLowerCase() === userProfile.login.toLowerCase());
      if (exists) {
        return prev.filter((p) => p.login.toLowerCase() !== userProfile.login.toLowerCase());
      } else {
        return [
          {
            login: userProfile.login,
            name: userProfile.name,
            avatar_url: userProfile.avatar_url,
          },
          ...prev,
        ];
      }
    });
  };

  const handleRemoveFavorite = (username) => {
    setFavorites((prev) => prev.filter((p) => p.login.toLowerCase() !== username.toLowerCase()));
  };

  const isFavorite = (login) => {
    if (!login) return false;
    return favorites.some((f) => f.login.toLowerCase() === login.toLowerCase());
  };

  const handleSearch = async (username) => {
    const trimmed = username?.trim();
    if (!trimmed || isLoading) return;

    setIsLoading(true);
    setError(null);
    setProfile(null);
    setRepos([]);
    setRepoPage(1);
    setFilterText('');
    setSelectedLanguage('');
    setSortBy('updated');
    setLastSearched(trimmed);

    try {
      const data = await fetchUserAndRepos(trimmed);
      setProfile(data.profile);
      setRepos(data.repos || []);
      addRecentSearch(data.profile.login || trimmed);
    } catch (err) {
      setError(err.message || 'Failed to fetch user profile.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMoreRepos = async () => {
    if (!profile || isLoadingMore) return;
    const nextPage = repoPage + 1;
    setIsLoadingMore(true);

    try {
      const newRepos = await fetchUserRepos(profile.login, nextPage, 30);
      setRepos((prev) => {
        const existingIds = new Set(prev.map((r) => r.id));
        const filteredNew = newRepos.filter((r) => !existingIds.has(r.id));
        return [...prev, ...filteredNew];
      });
      setRepoPage(nextPage);
    } catch {
      // Keep existing repos if load more fails
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleRetry = () => {
    if (lastSearched) {
      handleSearch(lastSearched);
    }
  };

  const handleResetSearch = () => {
    setError(null);
    setProfile(null);
    setRepos([]);
    setLastSearched('');
  };

  // Derive available languages from loaded repos
  const availableLanguages = Array.from(
    new Set(repos.map((r) => r.language).filter(Boolean))
  ).sort();

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased transition-colors duration-200 selection:bg-blue-100 selection:text-blue-700 dark:bg-[#0D1117] dark:text-[#E6EDF3] dark:selection:bg-blue-900/60 dark:selection:text-blue-200">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {activeTab === 'search' ? (
              <>
                {/* Hero Section */}
                <section className="mb-6 text-center sm:mb-12">
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 transition-colors sm:text-4xl md:text-5xl dark:text-[#E6EDF3]">
                    GitHub Developer <span className="text-blue-600 dark:text-[#58A6FF]">Explorer</span>
                  </h1>
                  <p className="mx-auto mt-2 sm:mt-3 max-w-2xl text-xs text-slate-600 transition-colors sm:text-base md:text-lg dark:text-[#9198A1]">
                    Inspect profiles, filter repositories by language, compare metrics, and bookmark top developers.
                  </p>

                  <div className="mt-6 sm:mt-8">
                    <SearchForm onSearch={handleSearch} isLoading={isLoading} />
                    <RecentSearches
                      searches={recentSearches}
                      onSelect={handleSearch}
                      onClear={handleClearRecent}
                      onRemove={handleRemoveRecentSearch}
                    />
                  </div>
                </section>

                {/* Results Area */}
                <section className="transition-all">
                  {isLoading && <LoadingState />}

                  {!isLoading && error && (
                    <ErrorState
                      message={error}
                      searchedUsername={lastSearched}
                      onRetry={handleRetry}
                      onReset={handleResetSearch}
                      onSelectPreset={handleSearch}
                    />
                  )}

                  {!isLoading && !error && profile && (
                    <div className="space-y-8">
                      {/* Profile Card with Favorite Button */}
                      <ProfileCard
                        profile={profile}
                        isFavorite={isFavorite(profile.login)}
                        onToggleFavorite={handleToggleFavorite}
                      />

                      {/* Repositories Section */}
                      <div className="space-y-4">
                        <RepositoryToolbar
                          filterText={filterText}
                          onFilterChange={setFilterText}
                          selectedLanguage={selectedLanguage}
                          onLanguageChange={setSelectedLanguage}
                          availableLanguages={availableLanguages}
                          sortBy={sortBy}
                          onSortChange={setSortBy}
                          totalCount={repos.length}
                          visibleCount={
                            repos.filter((r) => {
                              const matchesText = filterText.trim()
                                ? `${r.name} ${r.description || ''}`
                                    .toLowerCase()
                                    .includes(filterText.toLowerCase().trim())
                                : true;
                              const matchesLang = selectedLanguage
                                ? (r.language || '').toLowerCase() === selectedLanguage.toLowerCase()
                                : true;
                              return matchesText && matchesLang;
                            }).length
                          }
                        />

                        <RepositoryList
                          repos={repos}
                          filterText={filterText}
                          selectedLanguage={selectedLanguage}
                          sortBy={sortBy}
                          onLoadMore={handleLoadMoreRepos}
                          hasMore={repos.length < (profile.public_repos || 0)}
                          isLoadingMore={isLoadingMore}
                          totalPublicRepos={profile.public_repos || 0}
                        />
                      </div>
                    </div>
                  )}

                  {!isLoading && !error && !profile && (
                    <EmptyState onSelectPreset={handleSearch} />
                  )}

                  {/* Saved Favorites Section */}
                  <FavoriteProfiles
                    favorites={favorites}
                    onSelect={handleSearch}
                    onRemove={handleRemoveFavorite}
                  />
                </section>
              </>
            ) : (
              /* Developer Comparison Tab */
              <DeveloperComparison />
            )}
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
