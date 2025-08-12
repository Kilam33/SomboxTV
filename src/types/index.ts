export interface Channel {
  id: string
  name: string
  category: string
  logo?: string
  streamUrl: string
  description?: string
  rating?: number
  isLive?: boolean
  viewers?: number
}

export interface Category {
  id: string
  name: string
  icon?: string
  channels: Channel[]
}

export interface FeaturedContent {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  duration?: number
  genre: string[]
  rating: number
}

export interface User {
  id: string
  name: string
  avatar?: string
  preferences: {
    favoriteCategories: string[]
    watchHistory: string[]
  }
}