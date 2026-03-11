export interface User {
  id: string;
  username: string;
  password: string;
  email?: string;
  phone?: string;
  role: 'admin' | 'user';
  isPremium: boolean;
  subscriptionType?: 'weekly' | 'monthly';
  subscriptionExpiry?: string;
  watchlist: string[];
  watchHistory: string[];
  purchasedMovies: string[];
  createdAt: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  year: number;
  genre: string[];
  rating: number;
  isNew: boolean;
  isPremium: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
}

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  currentPage: string;
}

export const ADMIN_CREDENTIALS = {
  username: 'basemera',
  password: 'Basemeraadmin'
};

export const USER_CREDENTIALS = {
  username: 'gilbert',
  password: 'Gilbertadmin'
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'weekly',
    name: 'Weekly Pass',
    price: 10000,
    duration: '7 days',
    features: [
      'Access all movies',
      'HD quality streaming',
      'Download for offline viewing',
      'No ads',
      'Watch on 1 device'
    ]
  },
  {
    id: 'monthly',
    name: 'Monthly Pass',
    price: 30000,
    duration: '30 days',
    features: [
      'Access all movies',
      'HD quality streaming',
      'Download for offline viewing',
      'No ads',
      'Watch on 2 devices',
      'Early access to new releases'
    ]
  }
];

export const PAY_PER_VIEW_PRICE = 500;

export const MOBILE_MONEY_NUMBERS = [
  '0775648886',
  '0707538010'
];
