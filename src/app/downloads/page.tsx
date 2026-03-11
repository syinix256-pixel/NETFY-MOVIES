'use client';

import { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import Link from 'next/link';

export default function DownloadsPage() {
  const { downloads, addToDownloads, removeFromDownloads, isAuthenticated, movies } = useApp();
  const [downloading, setDownloading] = useState<string[]>([]);

  const downloadedMovies = movies.filter(m => downloads.includes(m.id));

  const handleDownload = (movieId: string) => {
    if (!isAuthenticated) return;
    
    setDownloading(prev => [...prev, movieId]);
    
    // Simulate download
    setTimeout(() => {
      addToDownloads(movieId);
      setDownloading(prev => prev.filter(id => id !== movieId));
    }, 2000);
  };

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
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Sign in to download movies
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Download movies to watch offline anytime
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
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#46D369">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          Downloads
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
          {downloadedMovies.length} movie{downloadedMovies.length !== 1 ? 's' : ''} downloaded
        </p>
      </div>

      {/* Downloaded Movies */}
      {downloadedMovies.length > 0 ? (
        <div style={{ padding: '0 20px' }}>
          {downloadedMovies.map((movie, index) => (
            <div 
              key={movie.id}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '12px',
                background: 'var(--surface)',
                borderRadius: '12px',
                marginBottom: '12px',
                animation: 'fadeIn 0.3s ease-out',
                animationDelay: `${index * 0.05}s`
              }}
            >
              <div style={{
                width: '80px',
                height: '120px',
                borderRadius: '8px',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <img 
                  src={movie.thumbnail} 
                  alt={movie.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {movie.title}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  {movie.duration} • {movie.year}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => removeFromDownloads(movie.id)}
                    className="no-select"
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(229, 9, 20, 0.1)',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#E50914',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
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
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          <p style={{ fontSize: '18px', color: 'var(--text-primary)', marginBottom: '8px' }}>
            No downloads yet
          </p>
          <p style={{ fontSize: '14px', marginBottom: '24px' }}>
            Browse movies and download them to watch offline
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

      {/* Download Tips */}
      <div style={{ padding: '20px', marginTop: '20px' }}>
        <div style={{
          background: 'var(--surface)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            💡 Download Tips
          </h3>
          <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '16px' }}>
            <li>Download movies over WiFi to save mobile data</li>
            <li>Downloaded movies are available offline</li>
            <li>Get premium to download in HD quality</li>
            <li>Downloads expire after 30 days</li>
          </ul>
        </div>
      </div>

      {/* Bottom padding for nav */}
      <div style={{ height: '40px' }} />
    </div>
  );
}
