'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bottom-nav hide-on-mobile">
      <Link 
        href="/" 
        className={`bottom-nav-item no-select ${isActive('/') ? 'active' : ''}`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        <span style={{ fontSize: '12px', marginTop: '4px' }}>Home</span>
      </Link>

      <Link 
        href="/browse" 
        className={`bottom-nav-item no-select ${isActive('/browse') ? 'active' : ''}`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/>
        </svg>
        <span style={{ fontSize: '12px', marginTop: '4px' }}>Browse</span>
      </Link>

      <Link 
        href="/watchlist" 
        className={`bottom-nav-item no-select ${isActive('/watchlist') ? 'active' : ''}`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
        </svg>
        <span style={{ fontSize: '12px', marginTop: '4px' }}>Watchlist</span>
      </Link>

      <Link 
        href="/downloads" 
        className={`bottom-nav-item no-select ${isActive('/downloads') ? 'active' : ''}`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
        </svg>
        <span style={{ fontSize: '12px', marginTop: '4px' }}>Downloads</span>
      </Link>
    </nav>
  );
}
