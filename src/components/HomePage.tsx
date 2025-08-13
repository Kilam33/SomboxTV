import React, { useState, useEffect } from 'react'
import { Tv, Film, Radio, Search, Settings, User, Mic, Cloud, Music, Newspaper, Trophy, Baby, BookOpen, Laugh } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface HomePageProps {
  onCategorySelect: (category: string, channelNumber: number) => void
  onSearch: () => void
  onSettings: () => void
  onProfile: () => void
  focusedElement?: string | null
  setFocusedElement?: (element: string | null) => void
}

interface ChannelCard {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<any>
  number: number
  isLive?: boolean
  isPlaying?: boolean
  playingText?: string
  currentShow?: string
  nextShow?: string
  viewers?: string
}

interface ButtonProps {
  children: React.ReactNode
  variant?: 'default'
  size?: 'default'
  className?: string
  onClick?: () => void
  onFocus?: () => void
  onBlur?: () => void
  tabIndex?: number
  [key: string]: any
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'default', size = 'default', className = '', onClick, onFocus, onBlur, tabIndex, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    onClick={onClick}
    onFocus={onFocus}
    onBlur={onBlur}
    tabIndex={tabIndex}
    {...props}
  >
    {children}
  </button>
)

const HomePage: React.FC<HomePageProps> = ({
  onCategorySelect,
  onSearch,
  onSettings,
  onProfile,
  focusedElement,
  setFocusedElement
}) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [weather, setWeather] = useState({ temp: 24, condition: 'cloudy' })

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const channels: ChannelCard[] = [
    {
      id: 'somali-tv',
      title: "Somali TV",
      subtitle: "Main Channel",
      icon: Tv,
      number: 1,
      isLive: true,
      currentShow: "Somali News",
      nextShow: "Cultural Program",
      viewers: "15.2K watching"
    },
    {
      id: 'news',
      title: "News",
      subtitle: "Breaking News",
      icon: Newspaper,
      number: 2,
      isLive: true,
      currentShow: "Morning News",
      nextShow: "Weather Update",
      viewers: "8.5K watching"
    },
    {
      id: 'sports',
      title: "Sports",
      subtitle: "Live Sports",
      icon: Trophy,
      number: 3,
      isLive: true,
      currentShow: "Football Match",
      nextShow: "Basketball",
      viewers: "12.8K watching"
    },
    {
      id: 'wildlife',
      title: "Wildlife",
      subtitle: "Nature & Animals",
      icon: BookOpen,
      number: 4,
      currentShow: "African Safari",
      nextShow: "Ocean Life",
      viewers: "3.1K watching"
    },
    {
      id: 'kids-tv',
      title: "Kids TV",
      subtitle: "Children's Shows",
      icon: Baby,
      number: 5,
      currentShow: "Cartoon Time",
      nextShow: "Educational",
      viewers: "6.7K watching"
    },
    {
      id: 'movies',
      title: "Movies",
      subtitle: "Latest Films",
      icon: Film,
      number: 6,
      currentShow: "Action Movie",
      nextShow: "Comedy Show",
      viewers: "9.3K watching"
    },
    {
      id: 'radio',
      title: "Radio",
      subtitle: "Music & Talk",
      icon: Radio,
      number: 7,
      playingText: "Somali Radio",
      currentShow: "Radio Mix",
      nextShow: "Radio Mix",
      viewers: "4.2K watching"
    },
    {
      id: 'docuseries',
      title: "Docuseries",
      subtitle: "Real Stories",
      icon: BookOpen,
      number: 8,
      currentShow: "History Series",
      nextShow: "Science Show",
      viewers: "2.8K watching"
    },
    {
      id: 'entertainment',
      title: "Entertainment",
      subtitle: "Fun & Shows",
      icon: Laugh,
      number: 9,
      currentShow: "Comedy Show",
      nextShow: "Variety Program",
      viewers: "7.1K watching"
    }
  ]

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      
      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-12 py-6">
        {/* Left Section - Logo and Search */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-4">
          <span className="text-white text-2xl font-bold">SomBox</span>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">TV</span>
            </div>
            
          </div>

          {/* Search */}
          <div className="flex items-center space-x-3 ml-8">
            <Button
              onClick={onSearch}
              className={`w-10 h-10 text-gray-400 hover:text-white rounded-full transition-all duration-300 ${
                focusedElement === 'search' ? 'ring-2 ring-blue-400 text-white' : ''
              }`}
              onFocus={() => setFocusedElement?.('search')}
              onBlur={() => focusedElement === 'search' && setFocusedElement?.(null)}
              tabIndex={0}
            >
              <Mic className="w-5 h-5" />
            </Button>
            <span className="text-gray-400 text-lg">Search</span>
          </div>
        </div>

        {/* Right Section - Settings and Profile */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={onSettings}
            className={`w-10 h-10 text-gray-400 hover:text-white rounded-full transition-all duration-300 ${
              focusedElement === 'settings' ? 'ring-2 ring-blue-400 text-white' : ''
            }`}
            onFocus={() => setFocusedElement?.('settings')}
            onBlur={() => focusedElement === 'settings' && setFocusedElement?.(null)}
            tabIndex={0}
          >
            <Settings className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center overflow-hidden">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </header>

      {/* Cards Container */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-12 py-8">
        <div className="w-full max-w-7xl">
          {/* Channel Cards */}
          <div className="flex flex-col space-y-8">
            {/* First Row - 4 Most Used Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {channels.slice(0, 4).map((channel, index) => {
                const isFocused = focusedElement === `channel-${index}`
                const IconComponent = channel.icon
                
                return (
                  <motion.div
                    key={channel.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    {/* Focus indicator */}
                    <AnimatePresence>
                      {isFocused && (
                        <motion.div
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute -bottom-4 w-20 h-0.5 bg-white rounded-full"
                          style={{ left: '39%', transform: 'translateX(-50%)' }}
                        />
                      )}
                    </AnimatePresence>
                    
                    <motion.button
                      onClick={() => onCategorySelect(channel.title, channel.number)}
                      className={`relative w-full h-72 rounded-2xl border border-gray-700/40 transition-all duration-300 overflow-hidden backdrop-blur-sm ${
                        isFocused 
                          ? 'bg-gray-900/60 border-blue-500/50 shadow-2xl transform scale-105 shadow-blue-500/20' 
                          : 'bg-gray-900/40 hover:bg-gray-800/50 hover:border-gray-600/50 shadow-lg'
                      }`}
                      onFocus={() => setFocusedElement?.(`channel-${index}`)}
                      onBlur={() => focusedElement === `channel-${index}` && setFocusedElement?.(null)}
                      tabIndex={0}
                    >
                      {/* Card Content */}
                      <div className="relative z-10 h-full flex flex-col justify-between p-6">
                        {/* Top Section */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2">
                            {channel.isLive && (
                              <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                                LIVE
                              </div>
                            )}
                            {channel.isPlaying && (
                              <div className="flex items-center space-x-1 text-green-400 text-xs">
                                <span>▶</span>
                                <span>{channel.playingText}</span>
                              </div>
                            )}
                          </div>
                          <span className="text-gray-400 text-xs">
                            {channel.viewers}
                          </span>
                        </div>

                        {/* Center Number */}
                        <div className="flex-1 flex items-center justify-center">
                          <motion.div 
                            className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                              isFocused 
                                ? 'border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/30' 
                                : 'border-gray-600 group-hover:border-blue-400 group-hover:bg-blue-500/10'
                            }`}
                            animate={{
                              scale: isFocused ? 1.05 : 1
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className={`text-3xl font-bold transition-colors duration-300 ${
                              isFocused ? 'text-white' : 'text-gray-400 group-hover:text-white'
                            }`}>
                              {channel.number}
                            </span>
                          </motion.div>
                        </div>

                        {/* Bottom Section */}
                        <div className="text-center">
                          <h2 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
                            isFocused ? 'text-white' : 'text-gray-300 group-hover:text-white'
                          }`}>
                            {channel.title}
                          </h2>
                          <p className="text-gray-500 text-sm mb-2">
                            {channel.subtitle}
                          </p>
                          {channel.currentShow && (
                            <div className="text-xs text-gray-400">
                              <div>Now: {channel.currentShow}</div>
                              {channel.nextShow && (
                                <div>Next: {channel.nextShow}</div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  </motion.div>
                )
              })}
            </div>

            {/* Second Row - 5 Remaining Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {channels.slice(4, 9).map((channel, index) => {
                const actualIndex = index + 4
                const isFocused = focusedElement === `channel-${actualIndex}`
                const IconComponent = channel.icon
                
                return (
                  <motion.div
                    key={channel.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (actualIndex) * 0.1 }}
                    className="relative group"
                  >
                    {/* Focus indicator */}
                    <AnimatePresence>
                      {isFocused && (
                        <motion.div
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute -bottom-4 w-20 h-0.5 bg-white rounded-full"
                          style={{ left: '39%', transform: 'translateX(-50%)' }}
                        />
                      )}
                    </AnimatePresence>
                    
                    <motion.button
                      onClick={() => onCategorySelect(channel.title, channel.number)}
                      className={`relative w-full h-72 rounded-2xl border border-gray-700/40 transition-all duration-300 overflow-hidden backdrop-blur-sm ${
                        isFocused 
                          ? 'bg-gray-900/60 border-blue-500/50 shadow-2xl transform scale-105 shadow-blue-500/20' 
                          : 'bg-gray-900/40 hover:bg-gray-800/50 hover:border-gray-600/50 shadow-lg'
                      }`}
                      onFocus={() => setFocusedElement?.(`channel-${actualIndex}`)}
                      onBlur={() => focusedElement === `channel-${actualIndex}` && setFocusedElement?.(null)}
                      tabIndex={0}
                    >
                      {/* Card Content */}
                      <div className="relative z-10 h-full flex flex-col justify-between p-6">
                        {/* Top Section */}
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2">
                            {channel.isLive && (
                              <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                                LIVE
                              </div>
                            )}
                            {channel.isPlaying && (
                              <div className="flex items-center space-x-1 text-green-400 text-xs">
                                <span>▶</span>
                                <span>{channel.playingText}</span>
                              </div>
                            )}
                          </div>
                          <span className="text-gray-400 text-xs">
                            {channel.viewers}
                          </span>
                        </div>

                        {/* Center Number */}
                        <div className="flex-1 flex items-center justify-center">
                          <motion.div 
                            className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                              isFocused 
                                ? 'border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/30' 
                                : 'border-gray-600 group-hover:border-blue-400 group-hover:bg-blue-500/10'
                            }`}
                            animate={{
                              scale: isFocused ? 1.05 : 1
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className={`text-3xl font-bold transition-colors duration-300 ${
                              isFocused ? 'text-white' : 'text-gray-400 group-hover:text-white'
                            }`}>
                              {channel.number}
                            </span>
                          </motion.div>
                        </div>

                        {/* Bottom Section */}
                        <div className="text-center">
                          <h2 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
                            isFocused ? 'text-white' : 'text-gray-300 group-hover:text-white'
                          }`}>
                            {channel.title}
                          </h2>
                          <p className="text-gray-500 text-sm mb-2">
                            {channel.subtitle}
                          </p>
                          {channel.currentShow && (
                            <div className="text-xs text-gray-400">
                              <div>Now: {channel.currentShow}</div>
                              {channel.nextShow && (
                                <div>Next: {channel.nextShow}</div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Panel */}
      <div className="absolute bottom-8 right-8 text-right">
        {/* Weather */}
        <div className="flex items-center justify-end space-x-2 mb-4">
          <Cloud className="w-5 h-5 text-gray-400" />
          <span className="text-white text-lg font-medium">24°</span>
        </div>

        {/* Time */}
        <div className="text-white">
          <div className="text-4xl font-bold mb-1">{formatTime(currentTime)}</div>
          <div className="text-sm text-gray-400">{formatDate(currentTime)}</div>
        </div>
      </div>
    </div>
  )
}

export default HomePage