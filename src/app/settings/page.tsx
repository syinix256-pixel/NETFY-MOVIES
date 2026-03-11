'use client';

import { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, isAuthenticated, logout, deleteAccount, isDarkMode } = useApp();
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const handleDeleteAccount = () => {
    if (confirmText === 'DELETE') {
      deleteAccount();
      setShowDeleteModal(false);
      router.push('/');
    }
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
            <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
          </svg>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Sign in to access Settings
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Create an account or sign in to manage your settings
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
          color: 'var(--text-primary)'
        }}>
          Settings
        </h1>
      </div>

      {/* Account Section */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <h2 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '12px'
        }}>
          Account
        </h2>
        
        <div style={{ background: 'var(--surface)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Username</p>
            <p style={{ fontSize: '16px', color: 'var(--text-primary)' }}>{user?.username}</p>
          </div>
          
          <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Account Type</p>
            <p style={{ fontSize: '16px', color: user?.isPremium ? '#F5C518' : 'var(--text-primary)' }}>
              {user?.isPremium ? '★ Premium' : 'Free Account'}
            </p>
          </div>
          
          {user?.subscriptionExpiry && (
            <div style={{ padding: '16px' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Subscription Expires</p>
              <p style={{ fontSize: '16px', color: 'var(--text-primary)' }}>
                {new Date(user.subscriptionExpiry).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Subscription Section */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <h2 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '12px'
        }}>
          Subscription
        </h2>
        
        <Link 
          href="/subscription"
          style={{ 
            display: 'block',
            padding: '16px',
            background: user?.isPremium ? 'var(--surface)' : 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
            borderRadius: '12px',
            textDecoration: 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
                {user?.isPremium ? 'Manage Subscription' : 'Upgrade to Premium'}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {user?.isPremium ? 'View plan details' : 'Get unlimited access'}
              </p>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--text-secondary)">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
          </div>
        </Link>
      </div>

      {/* Actions Section */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <h2 style={{ 
          fontSize: '14px', 
          fontWeight: '600', 
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '12px'
        }}>
          Actions
        </h2>
        
        <div style={{ background: 'var(--surface)', borderRadius: '12px', overflow: 'hidden' }}>
          <button 
            onClick={logout}
            className="no-select"
            style={{ 
              width: '100%',
              padding: '16px',
              background: 'none',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <p style={{ fontSize: '16px', color: 'var(--text-primary)' }}>Sign Out</p>
          </button>
          
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="no-select"
            style={{ 
              width: '100%',
              padding: '16px',
              background: 'none',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer'
            }}
          >
            <p style={{ fontSize: '16px', color: '#E50914' }}>Delete Account</p>
          </button>
        </div>
      </div>

      {/* About Section */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ 
          background: 'var(--surface)', 
          borderRadius: '12px', 
          padding: '16px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#E50914', marginBottom: '8px' }}>
            NETFY MOVIES
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Version 1.0.0
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Made with ❤️ in Uganda
          </p>
        </div>
      </div>

      {/* Bottom padding for nav */}
      <div style={{ height: '40px' }} />

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(229, 9, 20, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#E50914">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Delete Account?
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                This action cannot be undone. All your data will be permanently deleted.
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Type <strong>DELETE</strong> to confirm:
              </p>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="DELETE"
                className="no-select"
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--surface-elevated)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '16px',
                  textAlign: 'center'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="no-select"
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'var(--surface-elevated)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={confirmText !== 'DELETE'}
                className="no-select"
                style={{
                  flex: 1,
                  padding: '12px',
                  background: confirmText === 'DELETE' ? '#E50914' : 'rgba(229, 9, 20, 0.3)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: confirmText === 'DELETE' ? 'pointer' : 'not-allowed'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
