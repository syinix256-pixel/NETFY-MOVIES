'use client';

import { Movie } from '@/lib/types';
import { useApp } from '@/lib/AppContext';
import Link from 'next/link';

interface MovieCardProps {
  movie: Movie;
  showActions?: boolean;
}

export default function MovieCard({ movie, showActions = true }: MovieCardProps) {
  const { watchlist, addToWatchlist, removeFromWatchlist, user, isAuthenticated } = useApp();
  const isInWatchlist = watchlist.includes(movie.id);
  const hasAccess = !movie.isPremium || user?.isPremium || user?.purchasedMovies.includes(movie.id);

  return (
    <div className="movie-card" style={{
      background: 'var(--surface)',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <Link href={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
        {/* Thumbnail */}
        <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden' }}>
          <img 
            src={movie.thumbnail} 
            alt={movie.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          
          {/* Badges */}
          <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '4px' }}>
            {movie.isNew && <span className="badge badge-new">NEW</span>}
            {movie.isPremium && <span className="badge badge-premium">PREMIUM</span>}
            <span className="badge badge-hd">HD</span>
          </div>

          {/* Duration */}
          <div style={{ position: 'absolute', bottom: '8px', right: '8px' }}>
            <span className="badge" style={{ background: 'rgba(0,0,0,0.7)', color: 'white' }}>
              {movie.duration}
            </span>
          </div>

          {/* Overlay on hover */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.2s'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#E50914',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: '12px' }}>
        <h3 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: 'var(--text-primary)',
          margin: '0 0 4px 0',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {movie.title}
        </h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{movie.year}</span>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>•</span>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{movie.genre[0]}</span>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>•</span>
          <span style={{ fontSize: '12px', color: '#F5C518' }}>★ {movie.rating}</span>
        </div>

        {showActions && isAuthenticated && (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (isInWatchlist) {
                removeFromWatchlist(movie.id);
              } else {
                addToWatchlist(movie.id);
              }
            }}
            className="no-select"
            style={{
              width: '100%',
              padding: '8px',
              background: isInWatchlist ? 'var(--surface-elevated)' : '#E50914',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {isInWatchlist ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                </svg>
                In Watchlist
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
                </svg>
                Add to Watchlist
              </>
            )}
          </button>
        )}

        {!hasAccess && isAuthenticated && (
          <div style={{
            marginTop: '8px',
            padding: '8px',
            background: 'rgba(229, 9, 20, 0.1)',
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '11px', color: '#E50914' }}>
              Pay UGX 500 to watch
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
