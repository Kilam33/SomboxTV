import { Channel, Category, FeaturedContent } from '../types'

export const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'The Dark Knight',
    category: 'Action',
    streamUrl: 'https://example.com/stream1',
    logo: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    rating: 9.0,
    isLive: false,
    viewers: 2500000
  },
  {
    id: '2',
    name: 'Inception',
    category: 'Sci-Fi',
    streamUrl: 'https://example.com/stream2',
    logo: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    rating: 8.8,
    isLive: false,
    viewers: 1800000
  },
  {
    id: '3',
    name: 'The Shawshank Redemption',
    category: 'Drama',
    streamUrl: 'https://example.com/stream3',
    logo: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    rating: 9.3,
    isLive: false,
    viewers: 3200000
  },
  {
    id: '4',
    name: 'Pulp Fiction',
    category: 'Crime',
    streamUrl: 'https://example.com/stream4',
    logo: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    rating: 8.9,
    isLive: false,
    viewers: 2100000
  },
  {
    id: '5',
    name: 'The Matrix',
    category: 'Sci-Fi',
    streamUrl: 'https://example.com/stream5',
    logo: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.',
    rating: 8.7,
    isLive: false,
    viewers: 1900000
  },
  {
    id: '6',
    name: 'Forrest Gump',
    category: 'Drama',
    streamUrl: 'https://example.com/stream6',
    logo: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
    rating: 8.8,
    isLive: false,
    viewers: 2800000
  },
  {
    id: '7',
    name: 'The Godfather',
    category: 'Crime',
    streamUrl: 'https://example.com/stream7',
    logo: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    rating: 9.2,
    isLive: false,
    viewers: 3500000
  },
  {
    id: '8',
    name: 'Interstellar',
    category: 'Sci-Fi',
    streamUrl: 'https://example.com/stream8',
    logo: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    rating: 8.6,
    isLive: false,
    viewers: 1600000
  },
  {
    id: '9',
    name: 'The Lion King',
    category: 'Animation',
    streamUrl: 'https://example.com/stream9',
    logo: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    rating: 8.5,
    isLive: false,
    viewers: 2200000
  },
  {
    id: '10',
    name: 'Titanic',
    category: 'Romance',
    streamUrl: 'https://example.com/stream10',
    logo: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
    rating: 7.9,
    isLive: false,
    viewers: 4100000
  },
  {
    id: '11',
    name: 'Avatar',
    category: 'Sci-Fi',
    streamUrl: 'https://example.com/stream11',
    logo: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    rating: 7.8,
    isLive: false,
    viewers: 3800000
  },
  {
    id: '12',
    name: 'The Avengers',
    category: 'Action',
    streamUrl: 'https://example.com/stream12',
    logo: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    description: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
    rating: 8.0,
    isLive: false,
    viewers: 2900000
  }
]

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Action',
    icon: '💥',
    channels: mockChannels.filter(channel => channel.category === 'Action')
  },
  {
    id: '2',
    name: 'Drama',
    icon: '🎭',
    channels: mockChannels.filter(channel => channel.category === 'Drama')
  },
  {
    id: '3',
    name: 'Sci-Fi',
    icon: '🚀',
    channels: mockChannels.filter(channel => channel.category === 'Sci-Fi')
  },
  {
    id: '4',
    name: 'Crime',
    icon: '🔫',
    channels: mockChannels.filter(channel => channel.category === 'Crime')
  },
  {
    id: '5',
    name: 'Romance',
    icon: '💕',
    channels: mockChannels.filter(channel => channel.category === 'Romance')
  },
  {
    id: '6',
    name: 'Animation',
    icon: '🎬',
    channels: mockChannels.filter(channel => channel.category === 'Animation')
  },
  {
    id: '7',
    name: 'Comedy',
    icon: '😂',
    channels: []
  },
  {
    id: '8',
    name: 'Horror',
    icon: '👻',
    channels: []
  },
  {
    id: '9',
    name: 'Thriller',
    icon: '😱',
    channels: []
  },
  {
    id: '10',
    name: 'Adventure',
    icon: '🗺️',
    channels: []
  }
]

export const featuredContent: FeaturedContent[] = [
  {
    id: '1',
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
    videoUrl: 'https://example.com/featured1',
    duration: 152,
    genre: ['Action', 'Crime', 'Drama'],
    rating: 9.0
  },
  {
    id: '2',
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    thumbnail: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
    videoUrl: 'https://example.com/featured2',
    duration: 148,
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    rating: 8.8
  },
  {
    id: '3',
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    thumbnail: 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=1200&h=675&fit=crop',
    videoUrl: 'https://example.com/featured3',
    duration: 142,
    genre: ['Drama'],
    rating: 9.3
  }
]