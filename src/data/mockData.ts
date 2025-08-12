import { Channel, Category, FeaturedContent } from '../types'

export const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'Premium Movies HD',
    category: 'Movies',
    logo: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    streamUrl: 'https://example.com/stream1',
    description: 'Latest blockbuster movies in crystal clear HD',
    rating: 4.8,
    isLive: true,
    viewers: 12847
  },
  {
    id: '2',
    name: 'Sports Central',
    category: 'Sports',
    logo: 'https://images.pexels.com/photos/163452/basketball-dunk-blue-game-163452.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    streamUrl: 'https://example.com/stream2',
    description: 'Live sports coverage 24/7',
    rating: 4.6,
    isLive: true,
    viewers: 8934
  },
  {
    id: '3',
    name: 'Global News Network',
    category: 'News',
    logo: 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    streamUrl: 'https://example.com/stream3',
    description: 'Breaking news and current affairs',
    rating: 4.4,
    isLive: true,
    viewers: 5632
  },
  {
    id: '4',
    name: 'Comedy Gold',
    category: 'Entertainment',
    logo: 'https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    streamUrl: 'https://example.com/stream4',
    description: 'Non-stop comedy shows and stand-up',
    rating: 4.7,
    isLive: true,
    viewers: 3421
  },
  {
    id: '5',
    name: 'Documentary World',
    category: 'Documentary',
    logo: 'https://images.pexels.com/photos/355952/pexels-photo-355952.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    streamUrl: 'https://example.com/stream5',
    description: 'Fascinating documentaries from around the globe',
    rating: 4.9,
    isLive: false,
    viewers: 2156
  },
  {
    id: '6',
    name: 'Tech Today',
    category: 'Technology',
    logo: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    streamUrl: 'https://example.com/stream6',
    description: 'Latest tech news, reviews, and innovations',
    rating: 4.5,
    isLive: true,
    viewers: 7843
  }
]

export const mockCategories: Category[] = [
  { id: 'movies', name: 'Movies', icon: '🎬', channels: mockChannels.filter(c => c.category === 'Movies') },
  { id: 'sports', name: 'Sports', icon: '⚽', channels: mockChannels.filter(c => c.category === 'Sports') },
  { id: 'news', name: 'News', icon: '📺', channels: mockChannels.filter(c => c.category === 'News') },
  { id: 'entertainment', name: 'Entertainment', icon: '🎭', channels: mockChannels.filter(c => c.category === 'Entertainment') },
  { id: 'documentary', name: 'Documentary', icon: '🌍', channels: mockChannels.filter(c => c.category === 'Documentary') },
  { id: 'technology', name: 'Technology', icon: '💻', channels: mockChannels.filter(c => c.category === 'Technology') }
]

export const mockFeaturedContent: FeaturedContent[] = [
  {
    id: '1',
    title: 'Cosmic Odyssey',
    description: 'An epic journey through the mysteries of space and time. Follow our heroes as they navigate the vast cosmos in search of new worlds and civilizations.',
    thumbnail: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
    videoUrl: 'https://example.com/featured1',
    duration: 7200,
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    rating: 4.8
  },
  {
    id: '2',
    title: 'The Last Detective',
    description: 'A gripping crime thriller that will keep you on the edge of your seat. Detective Morgan faces his most challenging case yet.',
    thumbnail: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
    videoUrl: 'https://example.com/featured2',
    duration: 5400,
    genre: ['Crime', 'Thriller', 'Mystery'],
    rating: 4.6
  },
  {
    id: '3',
    title: 'Nature\'s Symphony',
    description: 'Experience the breathtaking beauty of our planet through stunning cinematography and captivating storytelling.',
    thumbnail: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
    videoUrl: 'https://example.com/featured3',
    duration: 4800,
    genre: ['Documentary', 'Nature'],
    rating: 4.9
  }
]