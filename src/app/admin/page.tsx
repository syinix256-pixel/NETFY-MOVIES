'use client';

import { useApp } from '@/lib/AppContext';
import Link from 'next/link';

export default function AdminPage() {
  const { user, isAuthenticated, isAdmin, movies } = useApp();

  if (!isAuthenticated || !isAdmin) {
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
          <svg width="80" height="80" viewBox="0 0 24 24" fill="#E50914" style={{ margin: '0 auto 24px' }}>
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
          </svg>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Admin Access Only
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            This page is restricted to administrators only
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
              fontWeight: '600'
            }}
          >
            Sign In as Admin
          </Link>
        </div>
      </div>
    );
  }

  const totalMovies = movies.length;
  const premiumMovies = movies.filter(m => m.isPremium).length;
  const freeMovies = movies.filter(m => !m.isPremium).length;
  const newMovies = movies.filter(m => m.isNew).length;

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
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
          Admin Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
          Welcome, {user?.username}
        </p>
      </div>

      {/* Stats */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#E50914' }}>{totalMovies}</p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total Movies</p>
          </div>
          <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#F5C518' }}>{premiumMovies}</p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Premium</p>
          </div>
          <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#46D369' }}>{freeMovies}</p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Free</p>
          </div>
          <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#E50914' }}>{newMovies}</p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>New</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
          Quick Actions
        </h2>
        
        <div style={{ background: 'var(--surface)', borderRadius: '12px', overflow: 'hidden' }}>
          <Link href="/browse" style={{ display: 'block', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-primary)' }}>📽️ Manage Movies</p>
          </Link>
          <Link href="/admin/upload" style={{ display: 'block', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-primary)' }}>➕ Upload Movie</p>
          </Link>
          <Link href="/subscription" style={{ display: 'block', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-primary)' }}>💰 Subscription Plans</p>
          </Link>
          <Link href="/settings" style={{ display: 'block', padding: '16px', textDecoration: 'none' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-primary)' }}>⚙️ Settings</p>
          </Link>
        </div>
      </div>

      {/* App Info */}
      <div style={{ padding: '20px' }}>
        <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#E50914', marginBottom: '8px' }}>
            NETFY MOVIES
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Version 1.0.0</p>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Admin Panel
          </p>
        </div>
      </div>

      {/* Bottom padding */}
      <div style={{ height: '40px' }} />
    </div>
  );
}
