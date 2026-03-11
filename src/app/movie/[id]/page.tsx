'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { PAY_PER_VIEW_PRICE, MOBILE_MONEY_NUMBERS } from '@/lib/types';
import Link from 'next/link';

export default function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { movies } = useApp();
  const movie = movies.find(m => m.id === resolvedParams.id);
  const router = useRouter();
  const { isAuthenticated, user, addToWatchlist, removeFromWatchlist, watchlist, addToPurchased, addToDownloads } = useApp();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!movie) {
    return (
      <div style={{ 
        background: 'var(--background)', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', color: 'var(--text-primary)', marginBottom: '12px' }}>Movie Not Found</h1>
          <Link href="/browse" style={{ color: '#E50914', textDecoration: 'none' }}>Browse Movies</Link>
        </div>
      </div>
    );
  }

  const isInWatchlist = watchlist.includes(movie.id);
  const hasAccess = !movie.isPremium || user?.isPremium || user?.purchasedMovies.includes(movie.id);

  const handlePlay = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (!hasAccess) {
      setShowPaymentModal(true);
      return;
    }
    
    setIsPlaying(true);
  };

  const handlePayment = () => {
    setPaymentSuccess(true);
    if (user) {
      addToPurchased(movie.id);
    }
    
    setTimeout(() => {
      setShowPaymentModal(false);
      setPaymentSuccess(false);
      setIsPlaying(true);
    }, 2000);
  };

  const handleDownload = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (!hasAccess) {
      setShowPaymentModal(true);
      return;
    }
    addToDownloads(movie.id);
    alert('Movie added to downloads!');
  };

  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '60vh',
        minHeight: '400px',
        backgroundImage: `linear-gradient(to bottom, transparent 0%, var(--background) 100%), url(${movie.thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {/* Back Button */}
        <Link 
          href="/browse"
          className="no-select"
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 10,
            background: 'rgba(0,0,0,0.5)',
            borderRadius: '50%',
            padding: '10px',
            display: 'flex',
            cursor: 'pointer'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </Link>

        {/* Play Button Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <button
            onClick={handlePlay}
            className="no-select"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(229, 9, 20, 0.9)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s'
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Movie Info */}
      <div style={{ padding: '20px', marginTop: '-60px', position: 'relative' }}>
        {/* Badges */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          {movie.isNew && <span className="badge badge-new">NEW</span>}
          {movie.isPremium && <span className="badge badge-premium">PREMIUM</span>}
          <span className="badge badge-hd">HD</span>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
          {movie.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{movie.year}</span>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>•</span>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{movie.duration}</span>
          <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>•</span>
          <span style={{ fontSize: '14px', color: '#F5C518' }}>★ {movie.rating}</span>
        </div>

        {/* Genres */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {movie.genre.map(g => (
            <span key={g} style={{
              padding: '6px 12px',
              background: 'var(--surface)',
              borderRadius: '16px',
              fontSize: '12px',
              color: 'var(--text-secondary)'
            }}>
              {g}
            </span>
          ))}
        </div>

        {/* Description */}
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
          {movie.description}
        </p>

        {/* Access Message */}
        {!hasAccess && isAuthenticated && (
          <div style={{
            background: 'rgba(229, 9, 20, 0.1)',
            border: '1px solid rgba(229, 9, 20, 0.3)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px' }}>
              This is a premium movie
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Pay UGX {PAY_PER_VIEW_PRICE} to watch or subscribe to Premium
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={handlePlay}
            className="no-select"
            style={{
              flex: 1,
              padding: '14px',
              background: '#E50914',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            {hasAccess ? 'Play Now' : `Pay UGX ${PAY_PER_VIEW_PRICE}`}
          </button>

          {isAuthenticated && (
            <button
              onClick={() => isInWatchlist ? removeFromWatchlist(movie.id) : addToWatchlist(movie.id)}
              className="no-select"
              style={{
                padding: '14px',
                background: 'var(--surface)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={isInWatchlist ? '#E50914' : 'var(--text-secondary)'}>
                <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
              </svg>
            </button>
          )}

          {hasAccess && (
            <button
              onClick={handleDownload}
              className="no-select"
              style={{
                padding: '14px',
                background: 'var(--surface)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--text-secondary)">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
            </button>
          )}
        </div>

        {/* Subscribe CTA */}
        {!hasAccess && isAuthenticated && (
          <Link 
            href="/subscription"
            className="no-select"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '14px',
              background: 'linear-gradient(135deg, #F5C518 0%, #FF6B00 100%)',
              borderRadius: '8px',
              color: '#000',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            Get Premium - UGX 10,000/week
          </Link>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {paymentSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#46D369',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Payment Successful!
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  Enjoy your movie
                </p>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '16px', textAlign: 'center' }}>
                  Pay to Watch
                </h2>

                <div style={{ 
                  background: 'var(--surface-elevated)', 
                  borderRadius: '12px', 
                  padding: '16px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{movie.title}</p>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#E50914' }}>
                    UGX {PAY_PER_VIEW_PRICE}
                  </p>
                </div>

                <p style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px' }}>
                  Pay to one of these numbers:
                </p>
                {MOBILE_MONEY_NUMBERS.map((number, i) => (
                  <div key={i} style={{
                    padding: '12px',
                    background: 'var(--surface-elevated)',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    {number}
                  </div>
                ))}

                <button
                  onClick={handlePayment}
                  className="no-select"
                  style={{
                    width: '100%',
                    marginTop: '16px',
                    padding: '14px',
                    background: '#E50914',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  I Have Paid - Watch Now
                </button>

                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="no-select"
                  style={{
                    width: '100%',
                    marginTop: '12px',
                    padding: '12px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Video Player (when playing) */}
      {isPlaying && hasAccess && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setIsPlaying(false)}
            className="no-select"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              padding: '12px',
              cursor: 'pointer'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          
          <video 
            src={movie.videoUrl} 
            controls 
            autoPlay 
            style={{ width: '100%', maxWidth: '800px' }}
          />
        </div>
      )}

      {/* Bottom padding */}
      <div style={{ height: '40px' }} />
    </div>
  );
}
