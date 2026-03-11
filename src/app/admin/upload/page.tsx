'use client';

import { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Movie } from '@/lib/types';
import { genres as allGenres } from '@/lib/data';
import Link from 'next/link';

export default function AdminUploadPage() {
  const { user, isAuthenticated, isAdmin, addMovie } = useApp();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [rating, setRating] = useState(4.0);
  const [isNew, setIsNew] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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

  const availableGenres = allGenres.filter(g => g !== 'All');

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!title.trim()) {
      setError('Movie title is required');
      return;
    }
    if (!description.trim()) {
      setError('Description is required');
      return;
    }
    if (!thumbnail.trim()) {
      setError('Thumbnail URL is required');
      return;
    }
    if (!videoUrl.trim()) {
      setError('Video URL is required');
      return;
    }
    if (!duration.trim()) {
      setError('Duration is required');
      return;
    }
    if (selectedGenres.length === 0) {
      setError('Select at least one genre');
      return;
    }

    setIsSubmitting(true);

    try {
      const newMovie: Omit<Movie, 'id'> = {
        title: title.trim(),
        description: description.trim(),
        thumbnail: thumbnail.trim(),
        videoUrl: videoUrl.trim(),
        duration: duration.trim(),
        year,
        genre: selectedGenres,
        rating,
        isNew,
        isPremium
      };

      addMovie(newMovie);
      
      setSuccess(true);
      // Reset form
      setTitle('');
      setDescription('');
      setThumbnail('');
      setVideoUrl('');
      setDuration('');
      setYear(new Date().getFullYear());
      setSelectedGenres([]);
      setRating(4.0);
      setIsNew(true);
      setIsPremium(false);
    } catch (err) {
      setError('Failed to add movie. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      background: 'var(--background)', 
      minHeight: '100vh',
      paddingTop: '20px',
      paddingBottom: '40px'
    }}>
      {/* Header */}
      <div style={{ padding: '0 20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/admin" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </Link>
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            color: 'var(--text-primary)'
          }}>
            Upload Movie
          </h1>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px', marginLeft: '36px' }}>
          Add a new movie to NETFY
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div style={{ 
          margin: '0 20px 20px',
          padding: '16px',
          background: 'rgba(70, 211, 105, 0.15)',
          border: '1px solid #46D369',
          borderRadius: '8px',
          color: '#46D369'
        }}>
          ✓ Movie uploaded successfully! It will appear in the browse section.
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{ 
          margin: '0 20px 20px',
          padding: '16px',
          background: 'rgba(229, 9, 20, 0.15)',
          border: '1px solid #E50914',
          borderRadius: '8px',
          color: '#E50914'
        }}>
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ padding: '0 20px' }}>
        <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '20px' }}>
          
          {/* Title */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Movie Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter movie title"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'var(--background)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter movie description"
              rows={3}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'var(--background)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Thumbnail URL */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Thumbnail URL *
            </label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="https://example.com/thumbnail.jpg"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'var(--background)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Video URL */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Video URL *
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://example.com/video.mp4"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'var(--background)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Duration and Year */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Duration *
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 2h 15m"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'var(--background)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Year *
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value) || new Date().getFullYear())}
                min={1900}
                max={2100}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'var(--background)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Genres */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Genres * (select at least one)
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {availableGenres.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  style={{
                    padding: '8px 16px',
                    background: selectedGenres.includes(genre) ? '#E50914' : 'var(--background)',
                    border: `1px solid ${selectedGenres.includes(genre) ? '#E50914' : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '20px',
                    color: selectedGenres.includes(genre) ? 'white' : 'var(--text-primary)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Rating: {rating.toFixed(1)}
            </label>
            <input
              type="range"
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
              min={0}
              max={5}
              step={0.1}
              style={{
                width: '100%',
                accentColor: '#E50914'
              }}
            />
          </div>

          {/* Toggles */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                style={{ accentColor: '#E50914', width: '18px', height: '18px' }}
              />
              <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Mark as New</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
                style={{ accentColor: '#E50914', width: '18px', height: '18px' }}
              />
              <span style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Premium Only</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '16px',
              background: isSubmitting ? '#666' : '#E50914',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1
            }}
          >
            {isSubmitting ? 'Uploading...' : 'Upload Movie'}
          </button>
        </div>
      </form>
    </div>
  );
}
