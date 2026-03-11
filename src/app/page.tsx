'use client';

import MovieCard from '@/components/MovieCard';
import { useApp } from '@/lib/AppContext';
import Link from 'next/link';

export default function Home() {
  const { isAuthenticated, user, movies } = useApp();

  const trendingMovies = movies.filter(m => m.isNew).slice(0, 5);
  const popularMovies = movies.filter(m => m.rating >= 4.5).slice(0, 6);
  const freeMovies = movies.filter(m => !m.isPremium);

  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '70vh',
        minHeight: '500px',
        backgroundImage: `linear-gradient(to bottom, transparent 0%, var(--background) 100%), url(${trendingMovies[0]?.thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 20px 40px'
      }}>
        <div className="hero-gradient" style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none'
        }} />
        
        <div style={{ 
          position: 'relative', 
          zIndex: 1, 
          maxWidth: '600px',
          animation: 'fadeIn 0.8s ease-out'
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <span className="badge badge-new">NEW</span>
            <span className="badge badge-hd">HD</span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(28px, 5vw, 48px)', 
            fontWeight: 'bold', 
            color: 'var(--text-primary)',
            marginBottom: '12px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            {trendingMovies[0]?.title}
          </h1>
          
          <p style={{ 
            fontSize: '14px', 
            color: 'var(--text-secondary)',
            marginBottom: '20px',
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {trendingMovies[0]?.description}
          </p>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link 
              href={`/movie/${trendingMovies[0]?.id}`}
              className="no-select"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#E50914',
                color: 'white',
                padding: '12px 28px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Play Now
            </Link>
            
            <Link 
              href="/browse"
              className="no-select"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.2)',
                color: 'var(--text-primary)',
                padding: '12px 28px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                backdropFilter: 'blur(4px)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
              </svg>
              More Info
            </Link>
          </div>
        </div>
      </section>

      {/* Subscription Banner */}
      {!isAuthenticated && (
        <section style={{ padding: '20px', background: 'linear-gradient(135deg, #E50914 0%, #B20710 100%)' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>
                Get NETFY Premium
              </h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
                UGX 10,000/week or UGX 30,000/month
              </p>
            </div>
            <Link 
              href="/subscription"
              className="no-select"
              style={{
                background: 'white',
                color: '#E50914',
                padding: '10px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Subscribe Now
            </Link>
          </div>
        </section>
      )}

      {/* User Status */}
      {isAuthenticated && user && (
        <section style={{ padding: '20px' }}>
          <div style={{
            background: 'var(--surface)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Welcome back,
              </p>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>
                {user.username}
              </h3>
            </div>
            <div style={{
              background: user.isPremium ? 'linear-gradient(135deg, #F5C518 0%, #FF6B00 100%)' : 'var(--surface-elevated)',
              padding: '8px 16px',
              borderRadius: '20px'
            }}>
              <span style={{ 
                fontSize: '12px', 
                fontWeight: '600',
                color: user.isPremium ? '#000' : 'var(--text-secondary)'
              }}>
                {user.isPremium ? '★ PREMIUM' : 'Free Plan'}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Trending Movies */}
      <section style={{ padding: '20px 0' }}>
        <div style={{ padding: '0 20px', marginBottom: '16px' }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: '#E50914' }}>🔥</span> Trending Now
          </h2>
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '16px',
          padding: '0 20px'
        }}>
          {trendingMovies.map((movie, index) => (
            <div key={movie.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fadeIn">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>

      {/* Popular Movies */}
      <section style={{ padding: '20px 0' }}>
        <div style={{ padding: '0 20px', marginBottom: '16px' }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: '#F5C518' }}>★</span> Popular Picks
          </h2>
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '16px',
          padding: '0 20px'
        }}>
          {popularMovies.map((movie, index) => (
            <div key={movie.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fadeIn">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>

      {/* Free to Watch */}
      <section style={{ padding: '20px 0' }}>
        <div style={{ padding: '0 20px', marginBottom: '16px' }}>
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: '#46D369' }}>✓</span> Free to Watch
          </h2>
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '16px',
          padding: '0 20px'
        }}>
          {freeMovies.slice(0, 6).map((movie, index) => (
            <div key={movie.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fadeIn">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>

      {/* All Movies CTA */}
      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <Link 
          href="/browse"
          className="no-select"
          style={{
            display: 'inline-block',
            background: 'var(--surface)',
            color: 'var(--text-primary)',
            padding: '16px 40px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          Browse All Movies →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '40px 20px', 
        borderTop: '1px solid rgba(255,255,255,0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#E50914',
          marginBottom: '16px',
          letterSpacing: '2px'
        }}>
          NETFY<span style={{ color: 'var(--text-primary)' }}>MOVIES</span>
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          © 2024 NETFY MOVIES. All rights reserved.
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Made with ❤️ in Uganda
        </p>
      </footer>
    </div>
  );
}
