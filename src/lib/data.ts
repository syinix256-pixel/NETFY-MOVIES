import { Movie } from './types';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'The Last Kingdom',
    description: 'A powerful story of war, betrayal, and the fight for kingdom survival in medieval England.',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '1h 45m',
    year: 2024,
    genre: ['Action', 'Drama', 'History'],
    rating: 4.8,
    isNew: true,
    isPremium: false
  },
  {
    id: '2',
    title: 'Shadow Warriors',
    description: 'Elite warriors must stop a terrorist plot that threatens global security.',
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '2h 10m',
    year: 2024,
    genre: ['Action', 'Thriller'],
    rating: 4.5,
    isNew: true,
    isPremium: true
  },
  {
    id: '3',
    title: 'Love in Paris',
    description: 'A romantic journey through the streets of Paris that changes two strangers lives forever.',
    thumbnail: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '1h 55m',
    year: 2024,
    genre: ['Romance', 'Drama'],
    rating: 4.3,
    isNew: false,
    isPremium: false
  },
  {
    id: '4',
    title: 'Mystery Island',
    description: 'A group of friends discover secrets on an abandoned island that should have stayed buried.',
    thumbnail: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '1h 38m',
    year: 2023,
    genre: ['Horror', 'Mystery'],
    rating: 4.1,
    isNew: false,
    isPremium: true
  },
  {
    id: '5',
    title: 'Speed Demons',
    description: 'High-stakes racing drama where everything is on the line.',
    thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=600&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '2h 05m',
    year: 2024,
    genre: ['Action', 'Drama'],
    rating: 4.6,
    isNew: true,
    isPremium: false
  },
  {
    id: '6',
    title: 'The Great Heist',
    description: 'A master thief plans the biggest bank robbery in history.',
    thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '2h 20m',
    year: 2023,
    genre: ['Crime', 'Thriller'],
    rating: 4.7,
    isNew: false,
    isPremium: true
  },
  {
    id: '7',
    title: 'Family Reunion',
    description: 'A heartwarming story about family, forgiveness, and second chances.',
    thumbnail: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '1h 50m',
    year: 2024,
    genre: ['Drama', 'Family'],
    rating: 4.4,
    isNew: true,
    isPremium: false
  },
  {
    id: '8',
    title: 'Alien Invasion',
    description: 'Humanity fights back against an extraterrestrial threat.',
    thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '2h 15m',
    year: 2024,
    genre: ['Sci-Fi', 'Action'],
    rating: 4.2,
    isNew: true,
    isPremium: true
  },
  {
    id: '9',
    title: 'Kitchen Nightmares',
    description: 'A chef takes over a failing restaurant and must turn it around.',
    thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=600&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '1h 42m',
    year: 2023,
    genre: ['Comedy', 'Drama'],
    rating: 3.9,
    isNew: false,
    isPremium: false
  },
  {
    id: '10',
    title: 'The Detective',
    description: 'A brilliant detective solves the most complicated cases.',
    thumbnail: 'https://images.unsplash.com/photo-1585951237318-9ea5e175b891?w=400&h=600&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '1h 58m',
    year: 2024,
    genre: ['Mystery', 'Crime'],
    rating: 4.5,
    isNew: false,
    isPremium: true
  },
  {
    id: '11',
    title: 'Wild Adventures',
    description: 'An epic journey through the wilderness that tests survival skills.',
    thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=600&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '1h 48m',
    year: 2023,
    genre: ['Adventure', 'Action'],
    rating: 4.0,
    isNew: false,
    isPremium: false
  },
  {
    id: '12',
    title: 'Comedy Central',
    description: 'A hilarious comedy that will keep you laughing all night.',
    thumbnail: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=600&fit=crop',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    duration: '1h 35m',
    year: 2024,
    genre: ['Comedy'],
    rating: 4.1,
    isNew: true,
    isPremium: false
  }
];

export const genres = [
  'All',
  'Action',
  'Drama',
  'Comedy',
  'Romance',
  'Horror',
  'Thriller',
  'Sci-Fi',
  'Mystery',
  'Crime',
  'Adventure',
  'History',
  'Family'
];

export const trendingMovies = movies.filter(m => m.isNew).slice(0, 5);
export const popularMovies = movies.filter(m => m.rating >= 4.5).slice(0, 6);
export const freeMovies = movies.filter(m => !m.isPremium);
export const premiumMovies = movies.filter(m => m.isPremium);
