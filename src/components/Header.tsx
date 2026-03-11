'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/lib/AppContext';

export default function Header() {
  const { isAuthenticated, isAdmin, user, logout } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="safe-area-top" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)',
      padding: '16px 20px',
      paddingTop: 'max(16px, env(safe-area-inset-top))'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" className="no-select" style={{ textDecoration: 'none' }}>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            color: '#E50914',
            margin: 0,
            letterSpacing: '2px'
          }}>
            NETFY<span style={{ color: '#fff' }}>MOVIES</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="show-on-mobile-only" style={{ display: 'none' }}>
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              padding: '8px',
              cursor: 'pointer'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
        </nav>

        {/* Desktop Menu */}
        <nav className="hide-on-mobile" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/" className="nav-link no-select" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
          <Link href="/browse" className="nav-link no-select" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Browse</Link>
          <Link href="/watchlist" className="nav-link no-select" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Watchlist</Link>
          <Link href="/downloads" className="nav-link no-select" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>Downloads</Link>
          <Link href="/subscription" className="nav-link no-select" style={{ color: '#E50914', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Go Premium</Link>
          
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="no-select"
                style={{
                  background: '#E50914',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px'
                }}
              >
                <span>{user?.username}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </button>

              {showMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: '#1F1F1F',
                  borderRadius: '8px',
                  padding: '8px 0',
                  minWidth: '180px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}>
                  <Link 
                    href="/settings" 
                    className="no-select"
                    onClick={() => setShowMenu(false)}
                    style={{ display: 'block', padding: '12px 16px', color: 'white', textDecoration: 'none', fontSize: '14px' }}
                  >
                    Settings
                  </Link>
                  {isAdmin && (
                    <Link 
                      href="/admin" 
                      className="no-select"
                      onClick={() => setShowMenu(false)}
                      style={{ display: 'block', padding: '12px 16px', color: '#E50914', textDecoration: 'none', fontSize: '14px' }}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={() => { logout(); setShowMenu(false); }}
                    className="no-select"
                    style={{ width: '100%', textAlign: 'left', padding: '12px 16px', background: 'none', border: 'none', color: '#E50914', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              href="/login" 
              className="no-select"
              style={{
                background: '#E50914',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 20px',
                color: 'white',
                cursor: 'pointer',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#141414',
          padding: '16px',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Link href="/" className="nav-link no-select" onClick={() => setShowMobileMenu(false)} style={{ display: 'block', padding: '12px 0', color: 'white', textDecoration: 'none' }}>Home</Link>
          <Link href="/browse" className="nav-link no-select" onClick={() => setShowMobileMenu(false)} style={{ display: 'block', padding: '12px 0', color: 'white', textDecoration: 'none' }}>Browse</Link>
          <Link href="/watchlist" className="nav-link no-select" onClick={() => setShowMobileMenu(false)} style={{ display: 'block', padding: '12px 0', color: 'white', textDecoration: 'none' }}>Watchlist</Link>
          <Link href="/downloads" className="nav-link no-select" onClick={() => setShowMobileMenu(false)} style={{ display: 'block', padding: '12px 0', color: 'white', textDecoration: 'none' }}>Downloads</Link>
          <Link href="/subscription" className="nav-link no-select" onClick={() => setShowMobileMenu(false)} style={{ display: 'block', padding: '12px 0', color: '#E50914', textDecoration: 'none', fontWeight: '600' }}>Go Premium</Link>
          
          {isAuthenticated ? (
            <>
              <Link href="/settings" className="nav-link no-select" onClick={() => setShowMobileMenu(false)} style={{ display: 'block', padding: '12px 0', color: 'white', textDecoration: 'none' }}>Settings</Link>
              <button onClick={() => { logout(); setShowMobileMenu(false); }} className="no-select" style={{ width: '100%', textAlign: 'left', padding: '12px 0', background: 'none', border: 'none', color: '#E50914', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <Link href="/login" className="nav-link no-select" onClick={() => setShowMobileMenu(false)} style={{ display: 'block', padding: '12px 0', color: '#E50914', textDecoration: 'none', fontWeight: '600' }}>Sign In</Link>
          )}
        </div>
      )}
    </header>
  );
}
