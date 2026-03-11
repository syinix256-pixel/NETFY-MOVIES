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
  login: (identifier: string, password: string) => boolean;
  register: (identifier: string, password: string, type: 'email' | 'phone') => boolean;
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
const REGISTERED_USERS_KEY = 'netfy_registered_users';

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage - this runs once on mount
  const getInitialState = () => {
    let initialDarkMode = true;
    let initialUser: User | null = null;
    let initialDownloads: string[] = [];
    
    try {
      // Load dark mode
      const storedDarkMode = localStorage.getItem(DARK_MODE_KEY);
      if (storedDarkMode !== null) {
        initialDarkMode = JSON.parse(storedDarkMode);
      } else if (typeof window !== 'undefined') {
        initialDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }

      // Load user
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        try {
          let parsed = JSON.parse(storedUser);
          // Check if subscription has expired
          if (parsed.subscriptionExpiry) {
            const expiryDate = new Date(parsed.subscriptionExpiry);
            const now = new Date();
            if (expiryDate <= now) {
              // Subscription expired, update user
              parsed.isPremium = false;
              parsed.subscriptionType = undefined;
              parsed.subscriptionExpiry = undefined;
              localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
            }
          }
          initialUser = parsed;
        } catch (e) {
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      // Load downloads
      const storedDownloads = localStorage.getItem(DOWNLOADS_KEY);
      if (storedDownloads) {
        try {
          initialDownloads = JSON.parse(storedDownloads);
        } catch (e) {
          localStorage.removeItem(DOWNLOADS_KEY);
        }
      }
    } catch (e) {
      // Handle any errors gracefully
    }
    
    return { initialDarkMode, initialUser, initialDownloads };
  };

  const initialState = { initialDarkMode: true, initialUser: null, initialDownloads: [] };
  
  const [user, setUser] = useState<User | null>(initialState.initialUser);
  const [isDarkMode, setIsDarkMode] = useState(initialState.initialDarkMode);
  const [downloads, setDownloads] = useState<string[]>(initialState.initialDownloads);
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [hasHydrated, setHasHydrated] = useState(false);
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
    
    let darkModeValue = true;
    
    // Load saved data from localStorage
    try {
      // Load dark mode
      const storedDarkMode = localStorage.getItem(DARK_MODE_KEY);
      if (storedDarkMode !== null) {
        darkModeValue = JSON.parse(storedDarkMode);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDarkMode(darkModeValue);
      } else {
        darkModeValue = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsDarkMode(darkModeValue);
      }

      // Load user
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        try {
          let parsed = JSON.parse(storedUser);
          // Check if subscription has expired
          if (parsed.subscriptionExpiry) {
            const expiryDate = new Date(parsed.subscriptionExpiry);
            const now = new Date();
            if (expiryDate <= now) {
              // Subscription expired, update user
              parsed.isPremium = false;
              parsed.subscriptionType = undefined;
              parsed.subscriptionExpiry = undefined;
              localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
            }
          }
          setUser(parsed);
        } catch (e) {
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      // Load downloads
      const storedDownloads = localStorage.getItem(DOWNLOADS_KEY);
      if (storedDownloads) {
        try {
          setDownloads(JSON.parse(storedDownloads));
        } catch (e) {
          localStorage.removeItem(DOWNLOADS_KEY);
        }
      }
    } catch (e) {
      // Handle any errors gracefully
    }
    
    // Apply initial dark mode with the calculated value
    applyDarkMode(darkModeValue);
    
    // Mark as hydrated after loading data
    setHasHydrated(true);

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(DARK_MODE_KEY);
      if (stored === null) {
        const newDarkMode = e.matches;
        setIsDarkMode(newDarkMode);
        applyDarkMode(newDarkMode);
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

  const login = (identifier: string, password: string): boolean => {
    // Check for admin login (username only for admin)
    if (identifier === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const adminUser: User = {
        id: 'admin-1',
        username: ADMIN_CREDENTIALS.username,
        password: ADMIN_CREDENTIALS.password,
        email: 'admin@netfy.com',
        phone: undefined,
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

    // Check registered users (email or phone)
    try {
      const storedUsers = localStorage.getItem(REGISTERED_USERS_KEY);
      if (storedUsers) {
        const users: User[] = JSON.parse(storedUsers);
        const foundUser = users.find(u => 
          (u.email === identifier || u.phone === identifier) && u.password === password
        );
        
        if (foundUser) {
          // Check if subscription has expired
          let userToLogin = { ...foundUser };
          if (foundUser.subscriptionExpiry) {
            const expiryDate = new Date(foundUser.subscriptionExpiry);
            const now = new Date();
            if (expiryDate <= now) {
              // Subscription expired, update user
              userToLogin.isPremium = false;
              userToLogin.subscriptionType = undefined;
              userToLogin.subscriptionExpiry = undefined;
              
              // Update in storage
              const updatedUsers = users.map(u => 
                u.id === foundUser.id ? userToLogin : u
              );
              localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updatedUsers));
            }
          }
          setUser(userToLogin);
          return true;
        }
      }
    } catch (e) {
      // Handle error
    }

    // Legacy user check (fallback)
    if (identifier === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password) {
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

  const register = (identifier: string, password: string, type: 'email' | 'phone'): boolean => {
    try {
      const storedUsers = localStorage.getItem(REGISTERED_USERS_KEY);
      let users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

      // Check if user already exists
      const exists = users.some(u => 
        (type === 'email' && u.email === identifier) || 
        (type === 'phone' && u.phone === identifier)
      );

      if (exists) {
        return false;
      }

      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        username: identifier.split('@')[0] || identifier,
        password,
        email: type === 'email' ? identifier : undefined,
        phone: type === 'phone' ? identifier : undefined,
        role: 'user',
        isPremium: false,
        watchlist: [],
        watchHistory: [],
        purchasedMovies: [],
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
      
      // Auto-login after registration
      setUser(newUser);
      return true;
    } catch (e) {
      return false;
    }
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

  // Don't render children until hydrated to prevent hydration mismatch
  if (!hasHydrated) {
    return (
      <AppContext.Provider
        value={{
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          isDarkMode: true,
          login: () => false,
          register: () => false,
          logout: () => {},
          addToWatchlist: () => {},
          removeFromWatchlist: () => {},
          addToPurchased: () => {},
          purchaseSubscription: () => {},
          deleteAccount: () => {},
          watchlist: [],
          purchasedMovies: [],
          downloads: [],
          addToDownloads: () => {},
          removeFromDownloads: () => {},
          movies: initialMovies,
          addMovie: () => {}
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isDarkMode,
        login,
        register,
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
