'use client';

import { movies } from '@/lib/data';
import MovieCard from '@/components/MovieCard';
import { useApp } from '@/lib/AppContext';
import Link from 'next/link';

export default function WatchlistPage() {
  const { watchlist, isAuthenticated } = useApp();

  const watchlistMovies = movies.filter(m => watchlist.includes(m.id));

  if (!isAuthenticated) {
    return (
      <div style={{ 
        background: 'var(--background)', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="var(--text-secondary)" style={{ margin: '0 auto 24px', opacity: 0.5 }}>
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
          </svg>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Sign in to view your Watchlist
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Create an account or sign in to save movies to your watchlist
          </p>
          <Link 
            href="/login"
            className="no-select"
            style={{
              display: 'inline-block',
              background: '#E50914',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'var(--background)', 
      minHeight: '100vh',
      paddingTop: '20px'
    }}>
      {/* Header */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#E50914">
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
          My Watchlist
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
          {watchlistMovies.length} movie{watchlistMovies.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      {/* Movies Grid */}
      {watchlistMovies.length > 0 ? (
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '16px',
          padding: '0 20px'
        }}>
          {watchlistMovies.map((movie, index) => (
            <div key={movie.id} style={{ animationDelay: `${index * 0.05}s` }} className="animate-fadeIn">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: 'var(--text-secondary)'
        }}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" style={{ margin: '0 auto 16px', opacity: 0.3 }}>
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
          </svg>
          <p style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Your watchlist is empty
          </p>
          <p style={{ fontSize: '14px', marginBottom: '24px' }}>
            Browse movies and add them to your watchlist
          </p>
          <Link 
            href="/browse"
            className="no-select"
            style={{
              display: 'inline-block',
              background: '#E50914',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Browse Movies
          </Link>
        </div>
      )}

      {/* Bottom padding for nav */}
      <div style={{ height: '40px' }} />
    </div>
  );
}
