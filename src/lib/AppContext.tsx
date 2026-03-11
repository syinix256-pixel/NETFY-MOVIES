'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { User, Movie } from './types';
import { ADMIN_CREDENTIALS, USER_CREDENTIALS } from './types';
import { movies as initialMovies } from './data';

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isDarkMode: boolean;
  movies: Movie[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addToWatchlist: (movieId: string) => void;
  removeFromWatchlist: (movieId: string) => void;
  addToPurchased: (movieId: string) => void;
  purchaseSubscription: (planId: 'weekly' | 'monthly') => void;
  deleteAccount: () => void;
  watchlist: string[];
  purchasedMovies: string[];
  downloads: string[];
  addToDownloads: (movieId: string) => void;
  removeFromDownloads: (movieId: string) => void;
  addMovie: (movie: Omit<Movie, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'netfy_user';
const DARK_MODE_KEY = 'netfy_dark_mode';
const DOWNLOADS_KEY = 'netfy_downloads';

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [downloads, setDownloads] = useState<string[]>([]);
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const mountedRef = useRef(false);

  const applyDarkMode = (dark: boolean) => {
    document.documentElement.style.setProperty('--background', dark ? '#000000' : '#F5F5F5');
    document.documentElement.style.setProperty('--surface', dark ? '#141414' : '#FFFFFF');
    document.documentElement.style.setProperty('--surface-elevated', dark ? '#1F1F1F' : '#FFFFFF');
    document.documentElement.style.setProperty('--text-primary', dark ? '#FFFFFF' : '#141414');
    document.documentElement.style.setProperty('--text-secondary', dark ? '#B3B3B3' : '#666666');
    document.documentElement.style.setProperty('--secondary', dark ? '#221F1F' : '#E5E5E5');
  };

  // Initialize on mount
  useEffect(() => {
    mountedRef.current = true;
    
    // Load dark mode preference
    try {
      const storedDarkMode = localStorage.getItem(DARK_MODE_KEY);
      if (storedDarkMode !== null) {
        const parsed = JSON.parse(storedDarkMode);
        setIsDarkMode(parsed);
        // Apply immediately
        applyDarkMode(parsed);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
        applyDarkMode(prefersDark);
      }

      // Load user
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
        } catch (e) {
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      // Load downloads
      const storedDownloads = localStorage.getItem(DOWNLOADS_KEY);
      if (storedDownloads) {
        try {
          const parsed = JSON.parse(storedDownloads);
          setDownloads(parsed);
        } catch (e) {
          localStorage.removeItem(DOWNLOADS_KEY);
        }
      }
    } catch (e) {
      // Handle any errors gracefully
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(DARK_MODE_KEY);
      if (stored === null) {
        setIsDarkMode(e.matches);
        applyDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Persist user
  useEffect(() => {
    if (mountedRef.current && user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else if (mountedRef.current && !user) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  // Persist dark mode
  useEffect(() => {
    if (mountedRef.current) {
      localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDarkMode));
    }
  }, [isDarkMode]);

  // Persist downloads
  useEffect(() => {
    if (mountedRef.current) {
      localStorage.setItem(DOWNLOADS_KEY, JSON.stringify(downloads));
    }
  }, [downloads]);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const adminUser: User = {
        id: 'admin-1',
        username: ADMIN_CREDENTIALS.username,
        password: ADMIN_CREDENTIALS.password,
        role: 'admin',
        isPremium: true,
        watchlist: [],
        watchHistory: [],
        purchasedMovies: [],
        createdAt: new Date().toISOString()
      };
      setUser(adminUser);
      return true;
    }

    if (username === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password) {
      const regularUser: User = {
        id: 'user-1',
        username: USER_CREDENTIALS.username,
        password: USER_CREDENTIALS.password,
        role: 'user',
        isPremium: false,
        watchlist: [],
        watchHistory: [],
        purchasedMovies: [],
        createdAt: new Date().toISOString()
      };
      setUser(regularUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addToWatchlist = (movieId: string) => {
    if (user && !user.watchlist.includes(movieId)) {
      setUser({
        ...user,
        watchlist: [...user.watchlist, movieId]
      });
    }
  };

  const removeFromWatchlist = (movieId: string) => {
    if (user) {
      setUser({
        ...user,
        watchlist: user.watchlist.filter(id => id !== movieId)
      });
    }
  };

  const addToPurchased = (movieId: string) => {
    if (user && !user.purchasedMovies.includes(movieId)) {
      setUser({
        ...user,
        purchasedMovies: [...user.purchasedMovies, movieId]
      });
    }
  };

  const purchaseSubscription = (planId: 'weekly' | 'monthly') => {
    if (user) {
      const expiry = new Date();
      if (planId === 'weekly') {
        expiry.setDate(expiry.getDate() + 7);
      } else {
        expiry.setDate(expiry.getDate() + 30);
      }

      setUser({
        ...user,
        isPremium: true,
        subscriptionType: planId,
        subscriptionExpiry: expiry.toISOString()
      });
    }
  };

  const deleteAccount = () => {
    setUser(null);
    setDownloads([]);
  };

  const addToDownloads = (movieId: string) => {
    if (!downloads.includes(movieId)) {
      setDownloads([...downloads, movieId]);
    }
  };

  const removeFromDownloads = (movieId: string) => {
    setDownloads(downloads.filter(id => id !== movieId));
  };

  const addMovie = (movie: Omit<Movie, 'id'>) => {
    const newId = `movie-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newMovie: Movie = { ...movie, id: newId };
    setMovies(prev => [newMovie, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isDarkMode,
        login,
        logout,
        addToWatchlist,
        removeFromWatchlist,
        addToPurchased,
        purchaseSubscription,
        deleteAccount,
        watchlist: user?.watchlist || [],
        purchasedMovies: user?.purchasedMovies || [],
        downloads,
        addToDownloads,
        removeFromDownloads,
        movies,
        addMovie
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
