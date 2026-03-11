'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import Link from 'next/link';

export default function RegisterPage() {
  const [identifier, setIdentifier] = useState(''); // Can be email or telephone
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useApp();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    // Validate email or telephone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+256|256|0)[7-9]\d{8}$/;
    
    const isEmail = emailRegex.test(identifier);
    const isPhone = phoneRegex.test(identifier.replace(/\s/g, ''));
    
    if (!isEmail && !isPhone) {
      setError('Please enter a valid email or telephone number (e.g., 0771234567)');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const success = register(identifier, password, isEmail ? 'email' : 'phone');
    if (success) {
      router.push('/');
    } else {
      setError('An account with this information already exists');
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
            Create your account
          </p>
        </div>

        {/* Register Form */}
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
              Email or Telephone
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="input-field no-select"
              placeholder="email@example.com or 0771234567"
              style={{ userSelect: 'text' }}
            />
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px' }}>
              Enter your email (e.g., john@example.com) or phone (e.g., 0771234567)
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
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
              placeholder="Create a password"
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
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field no-select"
              placeholder="Confirm your password"
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
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link 
              href="/login"
              className="no-select"
              style={{
                color: '#E50914',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
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
