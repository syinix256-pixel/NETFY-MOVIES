'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/lib/AppContext';
import { genres } from '@/lib/data';
import MovieCard from '@/components/MovieCard';
import MobileSelect from '@/components/MobileSelect';

export default function BrowsePage() {
  const { movies } = useApp();
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const genreOptions = useMemo(() => 
    genres.map(g => ({ value: g, label: g })),
  []);

  const filteredMovies = useMemo(() => {
    let filtered = movies;
    
    if (selectedGenre !== 'All') {
      filtered = filtered.filter(m => m.genre.includes(selectedGenre));
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [movies, selectedGenre, searchQuery]);

  return (
    <div style={{ 
      background: 'var(--background)', 
      minHeight: '100vh',
      paddingTop: '20px'
    }}>
      {/* Header */}
      <div style={{ padding: '0 20px', marginBottom: '20px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: 'var(--text-primary)',
          marginBottom: '16px'
        }}>
          Browse Movies
        </h1>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies..."
            className="no-select"
            style={{
              ...{
                width: '100%',
                padding: '12px 16px 12px 44px',
                background: 'var(--surface)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '16px'
              }
            }}
          />
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="var(--text-secondary)"
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
          >
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>

        {/* Genre Filter */}
        <MobileSelect
          label="Select Genre"
          options={genreOptions}
          value={selectedGenre}
          onChange={setSelectedGenre}
        />
      </div>

      {/* Genre Pills (Desktop) */}
      <div className="show-on-mobile-only" style={{ padding: '0 20px 16px', display: 'none' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className="no-select"
              style={{
                padding: '8px 16px',
                background: selectedGenre === genre ? '#E50914' : 'var(--surface)',
                border: 'none',
                borderRadius: '20px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div style={{ padding: '0 20px', marginBottom: '16px' }}>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '16px',
          padding: '0 20px'
        }}>
          {filteredMovies.map((movie, index) => (
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
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" style={{ margin: '0 auto 16px', opacity: 0.5 }}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <p style={{ fontSize: '16px' }}>No movies found</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>Try adjusting your search or filter</p>
        </div>
      )}

      {/* Bottom padding for nav */}
      <div style={{ height: '40px' }} />
    </div>
  );
}
