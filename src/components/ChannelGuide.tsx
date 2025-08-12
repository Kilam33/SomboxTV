import React, { useState, useEffect } from 'react'
import { ArrowLeft, Tv, Star, Search, User, Clock, Cloud } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Channel } from '../types'

interface ChannelGuideProps {
  onBack: () => void
  onChannelSelect: (channel: Channel) => void
  focusedElement?: string | null
  setFocusedElement?: (element: string | null) => void
}

interface Country {
  id: string
  name: string
  flag: string
  channelCount: number
}

interface ChannelWithDetails extends Channel {
  views: string
  badges: string[]
  isFavorite: boolean
  logo: string
}

const ChannelGuide: React.FC<ChannelGuideProps> = ({
  onBack,
  onChannelSelect,
  focusedElement,
  setFocusedElement
}) => {
  const [selectedCountry, setSelectedCountry] = useState('United States')
  const [selectedChannel, setSelectedChannel] = useState<ChannelWithDetails | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const countries: Country[] = [
    { id: 'us', name: 'United States', flag: '🇺🇸', channelCount: 147 },
    { id: 'ukraine', name: 'Ukraine', flag: '🇺🇦', channelCount: 89 },
    { id: 'brazil', name: 'Brazil', flag: '🇧🇷', channelCount: 156 },
    { id: 'germany', name: 'Germany', flag: '🇩🇪', channelCount: 134 },
    { id: 'france', name: 'France', flag: '🇫🇷', channelCount: 98 },
    { id: 'portugal', name: 'Portugal', flag: '🇵🇹', channelCount: 67 },
    { id: 'south-africa', name: 'South Africa', flag: '🇿🇦', channelCount: 45 },
    { id: 'china', name: 'China', flag: '🇨🇳', channelCount: 234 }
  ]

  const channels: ChannelWithDetails[] = [
    {
      id: '1',
      name: 'Nat Geo Wild HD',
      category: 'Documentary',
      streamUrl: 'https://example.com/stream1',
      logo: '/nat-geo-wild.png',
      views: '+8.2M Views',
      badges: ['HD', 'EPG'],
      isFavorite: true,
      description: 'Wildlife and nature documentaries'
    },
    {
      id: '2',
      name: 'Disney Channel',
      category: 'Entertainment',
      streamUrl: 'https://example.com/stream2',
      logo: '/disney.png',
      views: '850K Views',
      badges: ['4K', 'EPG', 'S'],
      isFavorite: false,
      description: 'Family entertainment and cartoons'
    },
    {
      id: '3',
      name: 'HBO Family',
      category: 'Entertainment',
      streamUrl: 'https://example.com/stream3',
      logo: '/hbo.png',
      views: '1.7M Views',
      badges: ['HD', 'EPG'],
      isFavorite: false,
      description: 'Family movies and series'
    },
    {
      id: '4',
      name: 'CNN International',
      category: 'News',
      streamUrl: 'https://example.com/stream4',
      logo: '/cnn.png',
      views: '2.1M Views',
      badges: ['HD', 'EPG', 'LIVE'],
      isFavorite: true,
      description: 'International news coverage'
    },
    {
      id: '5',
      name: 'ESPN',
      category: 'Sports',
      streamUrl: 'https://example.com/stream5',
      logo: '/espn.png',
      views: '3.5M Views',
      badges: ['HD', 'EPG', 'LIVE'],
      isFavorite: false,
      description: 'Sports coverage and analysis'
    }
  ]

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const handleChannelFocus = (channel: ChannelWithDetails) => {
    setSelectedChannel(channel)
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Sidebar - Countries */}
      <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Back Button */}
        <div className="p-6 border-b border-gray-800">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className={`w-12 h-12 text-white hover:bg-white/20 ${
              focusedElement === 'back' ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
            }`}
            onFocus={() => setFocusedElement?.('back')}
            onBlur={() => focusedElement === 'back' && setFocusedElement?.(null)}
            tabIndex={0}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </div>

        {/* Title */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">Live TV's</h1>
        </div>

        {/* Navigation Icons */}
        <div className="px-6 mb-6 flex space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 ${
              focusedElement === 'tv-nav' ? 'bg-blue-600 text-white' : 'text-white hover:bg-white/20'
            }`}
            onFocus={() => setFocusedElement?.('tv-nav')}
            onBlur={() => focusedElement === 'tv-nav' && setFocusedElement?.(null)}
            tabIndex={0}
          >
            <Tv className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 ${
              focusedElement === 'favorites' ? 'bg-blue-600 text-white' : 'text-white hover:bg-white/20'
            }`}
            onFocus={() => setFocusedElement?.('favorites')}
            onBlur={() => focusedElement === 'favorites' && setFocusedElement?.(null)}
            tabIndex={0}
          >
            <Star className="w-6 h-6" />
          </Button>
        </div>

        {/* Countries List */}
        <div className="flex-1 overflow-y-auto">
          {countries.map((country, index) => {
            const isSelected = selectedCountry === country.name
            const isFocused = focusedElement === `country-${index}`
            
            return (
              <button
                key={country.id}
                onClick={() => setSelectedCountry(country.name)}
                className={`w-full p-4 flex items-center space-x-4 transition-all duration-300 ${
                  isSelected 
                    ? 'bg-blue-600 text-white' 
                    : isFocused 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                onFocus={() => setFocusedElement?.(`country-${index}`)}
                onBlur={() => focusedElement === `country-${index}` && setFocusedElement?.(null)}
                tabIndex={0}
              >
                <span className="text-2xl">{country.flag}</span>
                <div className="flex-1 text-left">
                  <div className={`font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {country.name}
                  </div>
                  <div className="text-sm opacity-70">
                    {country.channelCount} Channels
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Center Panel - Channel List */}
      <div className="flex-1 bg-gray-950 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {channels.map((channel, index) => {
              const isFocused = focusedElement === `channel-${index}`
              
              return (
                <motion.div
                  key={channel.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => onChannelSelect(channel)}
                    onFocus={() => {
                      setFocusedElement?.(`channel-${index}`)
                      handleChannelFocus(channel)
                    }}
                    onBlur={() => focusedElement === `channel-${index}` && setFocusedElement?.(null)}
                    className={`w-full p-4 bg-gray-900 rounded-lg border-2 transition-all duration-300 flex items-center space-x-4 group ${
                      isFocused 
                        ? 'border-white bg-gray-800' 
                        : 'border-transparent hover:border-gray-700'
                    }`}
                    tabIndex={0}
                  >
                    {/* Channel Logo */}
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-400">
                        {channel.name.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>

                    {/* Channel Info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`text-lg font-semibold ${
                          isFocused ? 'text-white' : 'text-gray-200'
                        }`}>
                          {channel.name}
                        </h3>
                        <span className="text-sm text-gray-400">
                          {channel.views}
                        </span>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center space-x-2">
                        {channel.badges.map((badge, badgeIndex) => (
                          <span
                            key={badgeIndex}
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              badge === 'HD' || badge === '4K' 
                                ? 'bg-blue-600 text-white' 
                                : badge === 'LIVE'
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-700 text-gray-300'
                            }`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Favorite Icon */}
                    {channel.isFavorite && (
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    )}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Right Panel - Video Preview */}
      <div className="w-96 bg-gray-900 border-l border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-white font-semibold">{formatTime(currentTime)}</span>
            <div className="flex items-center space-x-2">
              <Cloud className="w-5 h-5 text-gray-400" />
              <span className="text-white">24°</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 text-white hover:bg-white/20"
            >
              <Search className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Video Preview */}
        <div className="flex-1 relative overflow-hidden">
          {selectedChannel ? (
            <>
              {/* Background Image */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black">
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <span className="text-2xl font-bold text-gray-400">
                        {selectedChannel.name.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {selectedChannel.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Now Playing Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Animals and Nature
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Big cat expert Boone Smith follows a strange trail of carnage and death to track cats in Patagonia. He documents their behavior - from kittens to killers.
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: '70%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>01:52:37</span>
                      <span>02:10:46</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <Tv className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a channel to preview</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChannelGuide
