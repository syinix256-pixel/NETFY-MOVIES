'use client';

import { useState, useEffect, ReactNode } from 'react';

interface MobileSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function MobileSelect({ options, value, onChange, label }: MobileSelectProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [showSheet, setShowSheet] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setShowSheet(true)}
          className="no-select"
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'var(--surface-elevated)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>{options.find(o => o.value === value)?.label || 'Select'}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </button>

        {showSheet && (
          <>
            <div 
              className="bottom-sheet-overlay"
              onClick={() => setShowSheet(false)}
            />
            <div className="bottom-sheet">
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '16px' 
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {label || 'Select Option'}
                </h3>
                <button
                  onClick={() => setShowSheet(false)}
                  className="no-select"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '8px'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
              
              <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setShowSheet(false);
                    }}
                    className="no-select"
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: value === option.value ? 'var(--primary)' : 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      color: value === option.value ? 'white' : 'var(--text-primary)',
                      fontSize: '16px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      marginBottom: '8px'
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  // Desktop select
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="no-select"
      style={{
        width: '100%',
        padding: '12px 16px',
        background: 'var(--surface-elevated)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        color: 'var(--text-primary)',
        fontSize: '16px',
        cursor: 'pointer'
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
