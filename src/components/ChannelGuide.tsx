import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Tv, Star, Search, User, Cloud } from 'lucide-react'
import { Channel } from '../types'

interface ChannelGuideProps {
  onBack: () => void
  onChannelSelect: (channel: Channel) => void
  focusedElement?: string | null
  setFocusedElement?: (element: string | null) => void
  selectedCategory?: string
}

interface ChannelWithDetails {
  id: string
  name: string
  category: string
  streamUrl: string
  logo: string
  views: string
  badges: string[]
  isFavorite: boolean
  description: string
  channelNumber?: number
}

const ChannelGuide: React.FC<ChannelGuideProps> = ({
  onBack,
  onChannelSelect,
  focusedElement,
  setFocusedElement,
  selectedCategory
}) => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelWithDetails | null>(null)
  const [focusedChannelIndex, setFocusedChannelIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [numberInput, setNumberInput] = useState('')
  const [numberInputTimeout, setNumberInputTimeout] = useState<number | null>(null)
  const channelRefs = useRef<(HTMLButtonElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const channels: ChannelWithDetails[] = [
    {
      id: '1',
      name: 'Somali National TV',
      category: 'Somali',
      streamUrl: 'https://example.com/stream1',
      logo: 'somali',
      views: '+15.2K Views',
      badges: ['HD', 'EPG', 'LIVE'],
      isFavorite: true,
      description: 'Official Somali national television channel',
      channelNumber: 1
    },
    {
      id: '2',
      name: 'Universal TV Somalia',
      category: 'Somali',
      streamUrl: 'https://example.com/stream2',
      logo: 'universal',
      views: '+8.5K Views',
      badges: ['HD', 'EPG', 'LIVE'],
      isFavorite: false,
      description: 'Somali entertainment and news channel',
      channelNumber: 2
    },
    {
      id: '3',
      name: 'Horn Cable TV',
      category: 'Somali',
      streamUrl: 'https://example.com/stream3',
      logo: 'horn',
      views: '+12.8K Views',
      badges: ['HD', 'EPG', 'LIVE'],
      isFavorite: true,
      description: 'Somali news and current affairs',
      channelNumber: 3
    },
    {
      id: '4',
      name: 'Somali Channel One',
      category: 'Somali',
      streamUrl: 'https://example.com/stream4',
      logo: 'channelone',
      views: '+6.7K Views',
      badges: ['HD', 'EPG'],
      isFavorite: false,
      description: 'Somali cultural and entertainment programming',
      channelNumber: 4
    },
    {
      id: '5',
      name: 'Somali News Network',
      category: 'Somali',
      streamUrl: 'https://example.com/stream5',
      logo: 'snn',
      views: '+9.3K Views',
      badges: ['HD', 'EPG', 'LIVE'],
      isFavorite: false,
      description: '24/7 Somali news coverage',
      channelNumber: 5
    },
    {
      id: '6',
      name: 'Somali Entertainment TV',
      category: 'Somali',
      streamUrl: 'https://example.com/stream6',
      logo: 'setv',
      views: '+4.2K Views',
      badges: ['HD', 'EPG'],
      isFavorite: false,
      description: 'Somali movies, music and entertainment',
      channelNumber: 6
    },
    {
      id: '7',
      name: 'Somali Sports Channel',
      category: 'Somali',
      streamUrl: 'https://example.com/stream7',
      logo: 'ssc',
      views: '+7.1K Views',
      badges: ['HD', 'EPG', 'LIVE'],
      isFavorite: true,
      description: 'Somali sports coverage and analysis',
      channelNumber: 7
    },
    {
      id: '8',
      name: 'Somali Educational TV',
      category: 'Somali',
      streamUrl: 'https://example.com/stream8',
      logo: 'setv',
      views: '+2.8K Views',
      badges: ['HD', 'EPG'],
      isFavorite: false,
      description: 'Educational programming for all ages',
      channelNumber: 8
    }
  ]

  // Filter channels based on selected category and add automatic numbering
  const getFilteredChannels = () => {
    let filtered = channels
    
    // First filter by category if selected
    if (selectedCategory) {
      const categoryMap: { [key: string]: string[] } = {
        'Somali TV': ['somali'],
        'News': ['news', 'current affairs'],
        'Sports': ['sports', 'football', 'basketball'],
        'Wildlife': ['wildlife', 'nature', 'documentary'],
        'Kids TV': ['kids', 'children', 'cartoon'],
        'Movies': ['movies', 'entertainment', 'film'],
        'Radio': ['radio', 'music', 'audio'],
        'Docuseries': ['documentary', 'series', 'educational'],
        'Entertainment': ['entertainment', 'comedy', 'variety']
      }
      
      const allowedCategories = categoryMap[selectedCategory] || []
      filtered = channels.filter(channel => 
        allowedCategories.some(cat => 
          channel.category.toLowerCase().includes(cat.toLowerCase()) ||
          channel.name.toLowerCase().includes(cat.toLowerCase())
        )
      )
    }
    
    // Then filter by favorites if showFavorites is true
    if (showFavorites) {
      filtered = filtered.filter(channel => channel.isFavorite)
    }
    
    return filtered.map((channel, index) => ({
      ...channel,
      channelNumber: index + 1
    }))
  }

  const filteredChannels = getFilteredChannels()

  // Initialize with first channel selected
  useEffect(() => {
    if (filteredChannels.length > 0 && !selectedChannel) {
      setSelectedChannel(filteredChannels[0])
      setFocusedElement?.('channel-0')
      // Center the first channel on mount with longer delay to ensure DOM is ready
      setTimeout(() => scrollToChannel(0), 200)
    }
  }, [filteredChannels])

  // Update selected channel when filtered channels change
  useEffect(() => {
    if (filteredChannels.length > 0) {
      setSelectedChannel(filteredChannels[0])
      setFocusedChannelIndex(0)
      setFocusedElement?.('channel-0')
      // Center the first channel when category or favorites filter changes with longer delay
      setTimeout(() => scrollToChannel(0), 200)
    }
  }, [selectedCategory, showFavorites])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }

  const scrollToChannel = (index: number) => {
    if (!containerRef.current || !channelRefs.current[index]) return
    
    const container = containerRef.current
    const element = channelRefs.current[index]
    
    if (element) {
      const containerRect = container.getBoundingClientRect()
      
      // Calculate the center of the viewport
      const containerCenter = containerRect.height / 2
      
      // Calculate the element's position relative to the container
      const elementTop = element.offsetTop
      const elementHeight = element.offsetHeight
      const elementCenter = elementTop + (elementHeight / 2)
      
      // Calculate scroll position to center the element
      const scrollPosition = elementCenter - containerCenter
      
      // Ensure we don't scroll past the top
      const maxScrollTop = container.scrollHeight - container.clientHeight
      const finalScrollPosition = Math.max(0, Math.min(scrollPosition, maxScrollTop))
      
      // Smooth scroll to center the focused channel
      container.scrollTo({
        top: finalScrollPosition,
        behavior: 'smooth'
      })
    }
  }

  const findNearestChannelToCenter = () => {
    if (!containerRef.current) return 0
    
    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    const containerCenter = containerRect.height / 2
    
    let nearestIndex = 0
    let minDistance = Infinity
    
    channelRefs.current.forEach((element, index) => {
      if (element) {
        const elementRect = element.getBoundingClientRect()
        const elementCenter = elementRect.top + (elementRect.height / 2)
        const distance = Math.abs(elementCenter - containerCenter)
        
        if (distance < minDistance) {
          minDistance = distance
          nearestIndex = index
        }
      }
    })
    
    return nearestIndex
  }

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    // Prevent scroll propagation to parent containers
    event.stopPropagation()
    
    if (isScrolling) return
    
    setIsScrolling(true)
    
    // Debounce the scroll event
    setTimeout(() => {
      const nearestIndex = findNearestChannelToCenter()
      if (nearestIndex !== focusedChannelIndex) {
        setFocusedChannelIndex(nearestIndex)
        setSelectedChannel(filteredChannels[nearestIndex])
        setFocusedElement?.(`channel-${nearestIndex}`)
      }
      setIsScrolling(false)
    }, 150)
  }

  const handleChannelClick = (channel: ChannelWithDetails, index: number) => {
    // Immediately update focus and selection
    setFocusedChannelIndex(index)
    setSelectedChannel(channel)
    setFocusedElement?.(`channel-${index}`)
    
    // Scroll to center the clicked channel with longer delay
    setTimeout(() => scrollToChannel(index), 100)
  }

  const handleChannelDoubleClick = (channel: ChannelWithDetails) => {
    // Double click to play the channel
    handleChannelPlay(channel)
  }

  const handleChannelSelect = (channel: ChannelWithDetails, index: number) => {
    setSelectedChannel(channel)
    setFocusedChannelIndex(index)
    setFocusedElement?.(`channel-${index}`)
    
    // Ensure smooth scrolling to center the selected channel with longer delay
    setTimeout(() => scrollToChannel(index), 100)
  }

  const handleChannelPlay = (channel: ChannelWithDetails) => {
    // Convert ChannelWithDetails to Channel format for video player
    const channelForPlayer: Channel = {
      id: channel.id,
      name: channel.name,
      category: channel.category,
      streamUrl: channel.streamUrl,
      logo: channel.logo,
      description: channel.description,
      isLive: channel.badges.includes('LIVE'),
      viewers: parseInt(channel.views.replace(/[^0-9]/g, '')) || 0
    }
    
    // Call the parent's onChannelSelect to route to video player
    onChannelSelect(channelForPlayer)
  }

  // Handle number pad input
  const handleNumberInput = (number: string) => {
    if (numberInputTimeout) {
      clearTimeout(numberInputTimeout)
    }

    const newInput = numberInput + number
    setNumberInput(newInput)

    const channelNumber = parseInt(newInput)
    const channelIndex = filteredChannels.findIndex(channel => channel.channelNumber === channelNumber)
    
    if (channelIndex !== -1) {
      handleChannelSelect(filteredChannels[channelIndex], channelIndex)
    }

    const timeout = window.setTimeout(() => {
      setNumberInput('')
    }, 2000)
    setNumberInputTimeout(timeout)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key >= '0' && event.key <= '9') {
      event.preventDefault()
      handleNumberInput(event.key)
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const nextIndex = Math.min(focusedChannelIndex + 1, filteredChannels.length - 1)
      if (nextIndex !== focusedChannelIndex) {
        handleChannelSelect(filteredChannels[nextIndex], nextIndex)
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      const prevIndex = Math.max(focusedChannelIndex - 1, 0)
      if (prevIndex !== focusedChannelIndex) {
        handleChannelSelect(filteredChannels[prevIndex], prevIndex)
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleChannelPlay(filteredChannels[focusedChannelIndex])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      onBack()
    } else if (event.key === 'f' || event.key === 'F') {
      event.preventDefault()
      setShowFavorites(!showFavorites)
    } else if (event.key === 'a' || event.key === 'A') {
      event.preventDefault()
      setShowFavorites(false)
    }
  }

  const getChannelLogo = (logoType: string) => {
    const logos: Record<string, JSX.Element> = {
      'somali': (
        <div className="w-full h-full bg-blue-600 rounded-lg flex items-center justify-center">
          <div className="text-white font-bold text-xs">
            <div>SOMALI</div>
            <div className="text-[8px]">TV</div>
          </div>
        </div>
      ),
      'universal': (
        <div className="w-full h-full bg-green-600 rounded-lg flex items-center justify-center">
          <div className="text-white font-bold text-xs">UNIVERSAL</div>
        </div>
      ),
      'horn': (
        <div className="w-full h-full bg-red-600 rounded-lg flex items-center justify-center">
          <div className="text-white font-bold text-xs">HORN</div>
        </div>
      ),
      'channelone': (
        <div className="w-full h-full bg-purple-600 rounded-lg flex items-center justify-center">
          <div className="text-white font-bold text-xs">CHANNEL</div>
        </div>
      ),
      'snn': (
        <div className="w-full h-full bg-orange-600 rounded-lg flex items-center justify-center">
          <div className="text-white font-bold text-xs">SNN</div>
        </div>
      ),
      'setv': (
        <div className="w-full h-full bg-teal-600 rounded-lg flex items-center justify-center">
          <div className="text-white font-bold text-xs">SE TV</div>
        </div>
      ),
      'ssc': (
        <div className="w-full h-full bg-yellow-600 rounded-lg flex items-center justify-center">
          <div className="text-black font-bold text-xs">SSC</div>
        </div>
      )
    }
    return logos[logoType] || (
      <div className="w-full h-full bg-gray-600 rounded-lg flex items-center justify-center">
        <div className="text-white font-bold text-xs">TV</div>
      </div>
    )
  }

  return (
    <div 
      className="h-screen text-white flex bg-gray-900 overflow-hidden" 
      onKeyDown={handleKeyDown} 
      tabIndex={-1}
      onWheel={(e) => {
        // Prevent wheel events on the main container to avoid page scrolling
        e.preventDefault()
      }}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-30 p-6 bg-gradient-to-b from-gray-900/90 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="w-14 h-14 rounded-full bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center transition-all duration-300 text-gray-400 hover:text-white backdrop-blur-md border border-gray-600/30"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
                         <div>
               <h1 className="text-3xl font-bold text-white">
                 Somali TV Channels
               </h1>
               <p className="text-gray-400 text-sm mt-2">
                 Use arrow keys to navigate • Type channel number • Press OK/Enter to select
               </p>
             </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Number Input Display */}
            {numberInput && (
                          <div className="flex items-center space-x-3 bg-blue-500/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-blue-400/30">
              <span className="text-blue-400 text-sm font-medium">Channel:</span>
              <span className="text-white text-xl font-bold font-mono">{numberInput}</span>
            </div>
            )}
            
            <div className="flex items-center space-x-4 text-white text-lg">
              <span className="font-mono font-bold">{formatTime(currentTime)}</span>
              <div className="flex items-center space-x-2">
                <Cloud className="w-6 h-6 text-gray-400" />
                <span className="font-bold">24°</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

             {/* Center Panel - Channel Cards */}
       <div className="flex-1 flex overflow-hidden">
                   {/* Floating Filter Buttons - Left Side */}
          <div className="flex flex-col space-y-4 justify-center ml-8 mr-8 flex-shrink-0">
            {/* All TV Button */}
            <button
              onClick={() => setShowFavorites(false)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                !showFavorites
                  ? 'bg-white/20 text-white shadow-lg shadow-white/20 backdrop-blur-md border border-white/30'
                  : 'bg-gray-800/40 text-gray-400 hover:text-white hover:bg-gray-700/40 backdrop-blur-md border border-gray-600/30'
              }`}
              style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
            >
              <Tv className="w-6 h-6" />
            </button>
            
            {/* Favorites Button */}
            <button
              onClick={() => setShowFavorites(true)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                showFavorites
                  ? 'bg-yellow-500/20 text-yellow-400 shadow-lg shadow-yellow-500/20 backdrop-blur-md border border-yellow-400/30'
                  : 'bg-gray-800/40 text-gray-400 hover:text-yellow-400 hover:bg-gray-700/40 backdrop-blur-md border border-gray-600/30'
              }`}
              style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
            >
              <Star className="w-6 h-6" />
            </button>
          </div>
         
         <div className="w-1/3 max-w-md overflow-hidden">
                       <div 
              ref={containerRef}
              className="overflow-y-auto scrollbar-hide relative h-full"
              style={{
                scrollBehavior: 'smooth'
              }}
              onScroll={handleScroll}
              onWheel={(e) => {
                // Prevent wheel events from bubbling up to parent containers
                e.stopPropagation()
              }}
            >
             <div className="px-4 space-y-4" style={{ paddingTop: '40vh', paddingBottom: '40vh' }}>
               {filteredChannels.map((channel, index) => {
                const isFocused = focusedChannelIndex === index
                const isSelected = selectedChannel?.id === channel.id
                
                return (
                  <div key={channel.id} className="relative">
                    {/* Focus indicator */}
                    {isFocused && (
                      <div 
                        className="absolute left-[-1rem] top-1/2 w-1 h-16 bg-gradient-to-r from-white to-white/50 rounded-full transform -translate-y-1/2 shadow-lg shadow-white/30 z-20"
                        style={{
                          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))'
                        }}
                      />
                    )}
                    
                                                                                                                             <button
                        ref={(el) => {
                          channelRefs.current[index] = el
                        }}
                                                onClick={() => handleChannelClick(channel, index)}
                                                onDoubleClick={() => handleChannelDoubleClick(channel)}
                        tabIndex={-1}
                       className={`w-full h-40 rounded-xl p-8 border transition-all duration-500 ease-out group relative overflow-hidden ${
                         isFocused
                           ? 'bg-gray-800/40 border-white/30 shadow-2xl shadow-white/10 scale-105 backdrop-blur-xl opacity-100'
                           : 'border-gray-700/30 hover:border-gray-600/40 hover:bg-gray-800/20 opacity-60 hover:opacity-80 backdrop-blur-md scale-95'
                       }`}
                       style={{
                         background: isFocused 
                           ? 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%), rgba(31, 41, 55, 0.4)'
                           : 'linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 50%, rgba(0,0,0,0.02) 100%), rgba(31, 41, 55, 0.2)',
                         backdropFilter: 'blur(20px) saturate(180%)',
                         WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                         transformOrigin: 'center'
                       }}
                     >
                       {/* Glass reflection effect */}
                       <div 
                         className={`absolute inset-0 rounded-xl transition-opacity duration-500 ${
                           isFocused ? 'opacity-30' : 'opacity-5'
                         }`}
                         style={{
                           background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)'
                         }}
                       />
                       
                       

                       {/* Favorite star in top-right corner */}
                       {channel.isFavorite && (
                         <div className="absolute top-4 right-4 z-10">
                           <Star className={`text-yellow-400 fill-current transition-all duration-500 ${
                             isFocused ? 'w-5 h-5 opacity-100' : 'w-4 h-4 opacity-70'
                           }`} 
                           style={{
                             filter: isFocused ? 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))' : 'none'
                           }}
                           />
                         </div>
                       )}
                       
                                                <div className="flex items-center h-full relative z-10">
                           {/* Channel Logo - Left Side */}
                           <div className={`mr-8 transition-all duration-500 ${
                             isFocused ? 'w-20 h-20' : 'w-16 h-16'
                           }`}>
                             {getChannelLogo(channel.logo)}
                           </div>

                                                       {/* Channel Info - Right Side */}
                            <div className="flex-1 text-left flex flex-col justify-between h-full">
                              {/* Top Section - Name and Views */}
                              <div>
                                {/* Channel Name */}
                                <h3 className={`font-bold text-white mb-2 transition-all duration-500 ${
                                  isFocused ? 'text-xl' : 'text-lg'
                                }`}>
                                  {channel.name}
                                </h3>

                                {/* View Count */}
                                <p className={`text-white/70 transition-all duration-500 ${
                                  isFocused ? 'text-base opacity-100' : 'text-sm opacity-80'
                                }`}>
                                  {channel.views}
                                </p>
                              </div>

                              {/* Bottom Section - Badges */}
                              <div className="flex flex-wrap gap-1.5 mt-auto">
                                {channel.badges.map((badge, badgeIndex) => (
                                  <span
                                    key={badgeIndex}
                                    className={`px-2 py-1 rounded-sm font-semibold text-[10px] ${
                                      badge === 'HD' || badge === '4K' 
                                        ? 'bg-blue-500/90 text-white shadow-lg shadow-blue-500/30' 
                                        : badge === 'LIVE'
                                        ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/30'
                                        : 'bg-white/25 text-white shadow-lg shadow-white/10'
                                    }`}
                                    style={{
                                      backdropFilter: 'blur(10px)',
                                      WebkitBackdropFilter: 'blur(10px)'
                                    }}
                                  >
                                    {badge}
                                  </span>
                                ))}
                              </div>
                            </div>
                         </div>
                     </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

                 {/* Right Panel - Video Preview */}
         <div className="w-2/3 relative overflow-hidden">
          {selectedChannel ? (
            <div 
              className="w-full h-full relative overflow-hidden bg-gray-800/40 backdrop-blur-sm border-l border-gray-700/40"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="400" height="300" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="cheetah" patternUnits="userSpaceOnUse" width="200" height="150"%3E%3Crect width="200" height="150" fill="%23D4A574"/%3E%3Ccircle cx="40" cy="40" r="16" fill="%238B4513" opacity="0.7"/%3E%3Ccircle cx="120" cy="70" r="12" fill="%23654321" opacity="0.8"/%3E%3Ccircle cx="160" cy="140" r="14" fill="%238B4513" opacity="0.6"/%3E%3Ccircle cx="60" cy="120" r="10" fill="%23654321" opacity="0.9"/%3E%3Ccircle cx="180" cy="60" r="8" fill="%238B4513" opacity="0.5"/%3E%3Ccircle cx="20" cy="100" r="12" fill="%23654321" opacity="0.7"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="400" height="300" fill="url(%23cheetah)"/%3E%3C/svg%3E")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-gray-900/40 z-10"></div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-transparent z-20">
                <div className="text-white">
                  <p className="text-sm text-white/80 mb-2">Now Playing</p>
                  <h2 className="text-2xl font-bold mb-4">{selectedChannel.name}</h2>
                  <p className="text-sm text-white/90 leading-relaxed mb-6">
                    {selectedChannel.description === 'Official Somali national television channel' 
                      ? 'Live coverage of Somali national news, cultural programs, and government announcements. Broadcasting in Somali language with English subtitles.'
                      : selectedChannel.description === 'Somali entertainment and news channel'
                      ? 'Popular Somali entertainment channel featuring local music, dramas, and cultural shows. Also includes news updates and current affairs.'
                      : selectedChannel.description === 'Somali news and current affairs'
                      ? 'Comprehensive coverage of Somali politics, business, and social issues. In-depth analysis and live reporting from across the country.'
                      : selectedChannel.description
                    }
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full transition-all duration-300"
                        style={{ width: '65%' }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-white/70">
                      <span>01:52:37</span>
                      <span>02:10:46</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800/20 backdrop-blur-sm border-l border-gray-700/40">
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