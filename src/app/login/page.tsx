'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }

    const success = login(username, password);
    if (success) {
      router.push('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'var(--background)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold',
            color: '#E50914',
            letterSpacing: '2px'
          }}>
            NETFY<span style={{ color: 'var(--text-primary)' }}>MOVIES</span>
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'var(--surface)',
          padding: '32px',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
          {error && (
            <div style={{
              background: 'rgba(229, 9, 20, 0.1)',
              border: '1px solid #E50914',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '20px',
              color: '#E50914',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field no-select"
              placeholder="Enter username"
              style={{ userSelect: 'text' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field no-select"
              placeholder="Enter password"
              style={{ userSelect: 'text' }}
            />
          </div>

          <button
            type="submit"
            className="no-select"
            style={{
              width: '100%',
              padding: '14px',
              background: '#E50914',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.2s'
            }}
          >
            Sign In
          </button>
        </form>

        {/* Demo Credentials */}
        <div style={{
          marginTop: '24px',
          padding: '20px',
          background: 'var(--surface)',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Demo Credentials
          </h3>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            <p><strong style={{ color: '#E50914' }}>Admin:</strong> basemera / Basemeraadmin</p>
            <p><strong style={{ color: '#46D369' }}>User:</strong> gilbert / Gilbertadmin</p>
          </div>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link 
            href="/"
            className="no-select"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
