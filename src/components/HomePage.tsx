import React, { useState, useEffect } from 'react'
import { Tv, Film, Radio, Search, Settings, User, Mic, Cloud } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface HomePageProps {
  onCategorySelect: (category: string) => void
  onSearch: () => void
  onSettings: () => void
  onProfile: () => void
  focusedElement?: string | null
  setFocusedElement?: (element: string | null) => void
}

interface CategoryCard {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<any>
  count: string
  isLive?: boolean
  isPlaying?: boolean
  playingText?: string
  lastUpdate?: string
  playingImage?: string
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

  const categories: CategoryCard[] = [
    {
      id: 'live-tv',
      title: "Live TV's",
      subtitle: "+5000 Channels",
      icon: Tv,
      count: "+5000 Channels",
      lastUpdate: "Last Update 2 day ago"
    },
    {
      id: 'movies',
      title: "Movies",
      subtitle: "+1200 Series",
      icon: Film,
      count: "+1200 Series",
      isLive: true
    },
    {
      id: 'radio',
      title: "Radios",
      subtitle: "+500 Stations",
      icon: Radio,
      count: "+500 Stations",
      isPlaying: true,
      playingText: "Playing... Azad Mahsa Am"
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
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">MI</span>
            </div>
            <span className="text-white text-2xl font-bold">IPTV</span>
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
        <div className="w-full max-w-5xl">
          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const isFocused = focusedElement === `category-${index}`
              const IconComponent = category.icon
              
              return (
                <motion.div
                  key={category.id}
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
                          className="absolute -bottom-2 w-20 h-0.5 bg-white rounded-full"
                          style={{ left: '50%', transform: 'translateX(-50%)' }}
                        />
                     )}
                   </AnimatePresence>
                  
                  <motion.button
                    onClick={() => onCategorySelect(category.title)}
                    className={`relative w-full h-96 rounded-2xl border border-gray-700/40 transition-all duration-300 overflow-hidden backdrop-blur-sm ${
                      isFocused 
                        ? 'bg-gray-900/60 border-blue-500/50 shadow-2xl transform scale-105 shadow-blue-500/20' 
                        : 'bg-gray-900/40 hover:bg-gray-800/50 hover:border-gray-600/50 shadow-lg'
                    }`}
                    onFocus={() => setFocusedElement?.(`category-${index}`)}
                    onBlur={() => focusedElement === `category-${index}` && setFocusedElement?.(null)}
                    tabIndex={0}
                  >
                    {/* Card Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-8">
                      {/* Top Section */}
                      <div className="flex justify-between items-start">
                        {category.lastUpdate && (
                          <span className="text-gray-400 text-xs px-2 py-1 bg-gray-700/50 rounded">
                            {category.lastUpdate}
                          </span>
                        )}
                        {category.isLive && (
                          <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                            LIVE
                          </div>
                        )}
                        {category.isPlaying && (
                          <div className="flex items-center space-x-1 text-gray-300 text-xs">
                            <span>▶</span>
                            <span>{category.playingText}</span>
                          </div>
                        )}
                      </div>

                      {/* Center Icon */}
                      <div className="flex-1 flex items-center justify-center">
                        <motion.div 
                          className={`w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                            isFocused 
                              ? 'border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/30' 
                              : 'border-gray-600 group-hover:border-blue-400 group-hover:bg-blue-500/10'
                          }`}
                          animate={{
                            scale: isFocused ? 1.05 : 1
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <IconComponent className={`w-12 h-12 transition-colors duration-300 ${
                            isFocused ? 'text-white' : 'text-gray-400 group-hover:text-white'
                          }`} />
                        </motion.div>
                      </div>

                      {/* Bottom Section */}
                      <div className="text-center">
                        <h2 className={`text-2xl font-semibold mb-2 transition-colors duration-300 ${
                          isFocused ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {category.title}
                        </h2>
                        <p className="text-gray-500 text-base">
                          {category.count}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              )
            })}
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