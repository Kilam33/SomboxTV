import React, { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import HomePage from './components/HomePage'
import ChannelGuide from './components/ChannelGuide'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ChannelGrid from './components/ChannelGrid'
import VideoPlayer from './components/VideoPlayer'
import TVNavigationGuide from './components/TVNavigationGuide'
import { mockChannels, mockCategories } from './data/mockData'
import { Channel } from './types'

type AppView = 'loading' | 'home' | 'channel-guide' | 'channels' | 'player'

function App() {
  const [currentView, setCurrentView] = useState<AppView>('loading')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
  const [previousView, setPreviousView] = useState<AppView>('home')
  const [filteredChannels, setFilteredChannels] = useState(mockChannels)
  const [isMovieMode, setIsMovieMode] = useState(false)
  
  // TV/Remote navigation state
  const [focusedElement, setFocusedElement] = useState<string | null>(null)
  const [currentFocusIndex, setCurrentFocusIndex] = useState(0)
  const [isNavigating, setIsNavigating] = useState(false)
  const [showNavigationGuide, setShowNavigationGuide] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)

  const handleLoadingComplete = () => {
    setCurrentView('home')
    // Set initial focus to first category when loading completes
    setTimeout(() => {
      setFocusedElement('category-0')
      setCurrentFocusIndex(0)
    }, 100)
  }

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showNavigationGuide) {
        if (e.key === 'Escape') {
          setShowNavigationGuide(false)
        }
        return
      }

      if (currentView === 'player') {
        // Handle video player controls
        switch (e.key) {
          case 'Escape':
            handleClosePlayer()
            break
          case ' ':
          case 'Enter':
            e.preventDefault()
            // Toggle play/pause in video player
            break
          case 'ArrowLeft':
            e.preventDefault()
            // Seek backward
            break
          case 'ArrowRight':
            e.preventDefault()
            // Seek forward
            break
          case 'ArrowUp':
            e.preventDefault()
            // Volume up
            break
          case 'ArrowDown':
            e.preventDefault()
            // Volume down
            break
        }
        return
      }

      if (currentView === 'home') {
        // Home page navigation
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault()
            navigateHomeLeft()
            break
          case 'ArrowRight':
            e.preventDefault()
            navigateHomeRight()
            break
          case 'Enter':
          case ' ':
            e.preventDefault()
            handleHomeEnterKey()
            break
          case 'Escape':
            e.preventDefault()
            // Could be used for settings or other actions
            break
          case 'h':
          case 'H':
            e.preventDefault()
            setShowNavigationGuide(true)
            break
        }
        return
      }

      if (currentView === 'channel-guide') {
        // Channel guide navigation
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault()
            navigateChannelGuideUp()
            break
          case 'ArrowDown':
            e.preventDefault()
            navigateChannelGuideDown()
            break
          case 'ArrowLeft':
            e.preventDefault()
            navigateChannelGuideLeft()
            break
          case 'ArrowRight':
            e.preventDefault()
            navigateChannelGuideRight()
            break
          case 'Enter':
          case ' ':
            e.preventDefault()
            handleChannelGuideEnterKey()
            break
          case 'Escape':
            e.preventDefault()
            handleChannelGuideEscapeKey()
            break
          case 'h':
          case 'H':
            e.preventDefault()
            setShowNavigationGuide(true)
            break
        }
        return
      }

      if (currentView === 'channels') {
        // Channels page navigation
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault()
            navigateUp()
            break
          case 'ArrowDown':
            e.preventDefault()
            navigateDown()
            break
          case 'ArrowLeft':
            e.preventDefault()
            navigateLeft()
            break
          case 'ArrowRight':
            e.preventDefault()
            navigateRight()
            break
          case 'Enter':
          case ' ':
            e.preventDefault()
            handleEnterKey()
            break
          case 'Escape':
            e.preventDefault()
            handleEscapeKey()
            break
          case 'Backspace':
            e.preventDefault()
            handleBackspaceKey()
            break
          case 'h':
          case 'H':
            e.preventDefault()
            setShowNavigationGuide(true)
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentView, selectedChannel, focusedElement, currentFocusIndex, filteredChannels, showNavigationGuide])

  // Home page navigation
  const navigateHomeLeft = () => {
    if (currentFocusIndex > 0) {
      setCurrentFocusIndex(currentFocusIndex - 1)
      setFocusedElement(`category-${currentFocusIndex - 1}`)
    }
  }

  const navigateHomeRight = () => {
    if (currentFocusIndex < 2) { // 3 categories total
      setCurrentFocusIndex(currentFocusIndex + 1)
      setFocusedElement(`category-${currentFocusIndex + 1}`)
    }
  }

  const handleHomeEnterKey = () => {
    if (focusedElement?.startsWith('category-')) {
      const index = parseInt(focusedElement.split('-')[1])
      const categories = ['Live TV\'s', 'Movies', 'Radios']
      const selectedCategory = categories[index]
      handleCategorySelect(selectedCategory)
    }
  }

  // Channel guide navigation
  const navigateChannelGuideUp = () => {
    // Navigate through countries or channels
    if (focusedElement?.startsWith('country-')) {
      const index = parseInt(focusedElement.split('-')[1])
      if (index > 0) {
        setFocusedElement(`country-${index - 1}`)
        setCurrentFocusIndex(index - 1)
      }
    } else if (focusedElement?.startsWith('channel-')) {
      const index = parseInt(focusedElement.split('-')[1])
      if (index > 0) {
        setFocusedElement(`channel-${index - 1}`)
        setCurrentFocusIndex(index - 1)
      }
    }
  }

  const navigateChannelGuideDown = () => {
    // Navigate through countries or channels
    if (focusedElement?.startsWith('country-')) {
      const index = parseInt(focusedElement.split('-')[1])
      if (index < 7) { // 8 countries total
        setFocusedElement(`country-${index + 1}`)
        setCurrentFocusIndex(index + 1)
      }
    } else if (focusedElement?.startsWith('channel-')) {
      const index = parseInt(focusedElement.split('-')[1])
      if (index < 4) { // 5 channels total
        setFocusedElement(`channel-${index + 1}`)
        setCurrentFocusIndex(index + 1)
      }
    }
  }

  const navigateChannelGuideLeft = () => {
    // Navigate between sidebar sections
    if (focusedElement?.startsWith('channel-')) {
      setFocusedElement('country-0')
      setCurrentFocusIndex(0)
    }
  }

  const navigateChannelGuideRight = () => {
    // Navigate between sidebar sections
    if (focusedElement?.startsWith('country-')) {
      setFocusedElement('channel-0')
      setCurrentFocusIndex(0)
    }
  }

  const handleChannelGuideEnterKey = () => {
    if (focusedElement?.startsWith('channel-')) {
      const index = parseInt(focusedElement.split('-')[1])
      const channels = [
        { id: '1', name: 'Nat Geo Wild HD', category: 'Documentary', streamUrl: 'https://example.com/stream1' },
        { id: '2', name: 'Disney Channel', category: 'Entertainment', streamUrl: 'https://example.com/stream2' },
        { id: '3', name: 'HBO Family', category: 'Entertainment', streamUrl: 'https://example.com/stream3' },
        { id: '4', name: 'CNN International', category: 'News', streamUrl: 'https://example.com/stream4' },
        { id: '5', name: 'ESPN', category: 'Sports', streamUrl: 'https://example.com/stream5' }
      ]
      const channel = channels[index]
      if (channel) {
        handleChannelSelect(channel)
      }
    }
  }

  const handleChannelGuideEscapeKey = () => {
    // Go back to home page
    setCurrentView('home')
    setFocusedElement('category-0')
    setCurrentFocusIndex(0)
  }

  // Channels page navigation
  const navigateUp = () => {
    if (currentFocusIndex >= 4) {
      setCurrentFocusIndex(currentFocusIndex - 4)
      setFocusedElement(`channel-${currentFocusIndex - 4}`)
    }
  }

  const navigateDown = () => {
    if (currentFocusIndex + 4 < filteredChannels.length) {
      setCurrentFocusIndex(currentFocusIndex + 4)
      setFocusedElement(`channel-${currentFocusIndex + 4}`)
    }
  }

  const navigateLeft = () => {
    if (currentFocusIndex > 0) {
      setCurrentFocusIndex(currentFocusIndex - 1)
      setFocusedElement(`channel-${currentFocusIndex - 1}`)
    }
  }

  const navigateRight = () => {
    if (currentFocusIndex < filteredChannels.length - 1) {
      setCurrentFocusIndex(currentFocusIndex + 1)
      setFocusedElement(`channel-${currentFocusIndex + 1}`)
    }
  }

  const handleEnterKey = () => {
    if (focusedElement?.startsWith('channel-')) {
      const index = parseInt(focusedElement.split('-')[1])
      const channel = filteredChannels[index]
      if (channel) {
        handleChannelSelect(channel)
      }
    }
  }

  const handleEscapeKey = () => {
    if (selectedChannel) {
      handleClosePlayer()
    } else {
      // Go back to home page
      setCurrentView('home')
      setFocusedElement('category-0')
      setCurrentFocusIndex(0)
    }
  }

  const handleBackspaceKey = () => {
    // Go back to previous screen or clear search
    if (searchQuery) {
      setSearchQuery('')
    } else {
      // Go back to home page
      setCurrentView('home')
      setFocusedElement('category-0')
      setCurrentFocusIndex(0)
    }
  }

  const handleCategorySelect = (category: string, channelNumber?: number) => {
    setSelectedCategory(category)
    
    // If channelNumber is provided, route to specific channel guide
    if (channelNumber) {
      setCurrentView('channel-guide')
      setFocusedElement('country-0')
      setCurrentFocusIndex(0)
      setIsMovieMode(false)
      // Store the selected category for filtering channels
      console.log(`Selected channel ${channelNumber}: ${category}`)
    } else {
      // Legacy behavior for backward compatibility
      if (category === "Live TV's") {
        setCurrentView('channel-guide')
        setFocusedElement('country-0')
        setCurrentFocusIndex(0)
        setIsMovieMode(false)
      } else if (category === "Movies") {
        setCurrentView('channels')
        setFocusedElement('channel-0')
        setCurrentFocusIndex(0)
        setIsMovieMode(true)
      } else {
        setCurrentView('channels')
        setFocusedElement('channel-0')
        setCurrentFocusIndex(0)
        setIsMovieMode(false)
      }
    }
  }

  const handleSearch = () => {
    setCurrentView('channels')
    setFocusedElement('search')
  }

  const handleSettings = () => {
    // TODO: Implement settings page
    console.log('Settings clicked')
  }

  const handleProfile = () => {
    // TODO: Implement profile page
    console.log('Profile clicked')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setFocusedElement('category-0')
    setCurrentFocusIndex(0)
    setIsMovieMode(false)
  }

  useEffect(() => {
    let filtered = mockChannels

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(channel => channel.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(channel =>
        channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredChannels(filtered)
    
    // Reset focus when filters change
    setCurrentFocusIndex(0)
    setFocusedElement('channel-0')
  }, [selectedCategory, searchQuery])

  const handleChannelSelect = (channel: Channel) => {
    setPreviousView(currentView)
    setSelectedChannel(channel)
    setCurrentView('player')
    setFocusedElement(null)
  }

  const handleClosePlayer = () => {
    console.log('Close button clicked, returning to home')
    setSelectedChannel(null)
    // Return to home screen
    setCurrentView('home')
    setFocusedElement('category-0')
    setCurrentFocusIndex(0)
  }

  const handleBackToChannels = () => {
    console.log('Back button clicked, previous view:', previousView)
    setSelectedChannel(null)
    // Return to previous view
    if (previousView === 'channel-guide') {
      setCurrentView('channel-guide')
      setFocusedElement('channel-0')
    } else if (previousView === 'channels') {
      setCurrentView('channels')
      setFocusedElement(`channel-${currentFocusIndex}`)
    } else {
      // Fallback to home
      setCurrentView('home')
      setFocusedElement('category-0')
      setCurrentFocusIndex(0)
    }
  }

  const handlePlay = (contentId: string) => {
    // Find and play featured content
    const featuredChannel = mockChannels[0] // For demo, play first channel
    setPreviousView(currentView)
    setSelectedChannel(featuredChannel)
    setCurrentView('player')
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black text-white"
      tabIndex={-1}
    >
      {/* Loading Screen */}
      <AnimatePresence>
        {currentView === 'loading' && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Home Page */}
      <AnimatePresence>
        {currentView === 'home' && (
          <HomePage
            onCategorySelect={handleCategorySelect}
            onSearch={handleSearch}
            onSettings={handleSettings}
            onProfile={handleProfile}
            focusedElement={focusedElement}
            setFocusedElement={setFocusedElement}
          />
        )}
      </AnimatePresence>

      {/* Channel Guide */}
      <AnimatePresence>
        {currentView === 'channel-guide' && (
          <ChannelGuide
            onBack={handleBackToHome}
            onChannelSelect={handleChannelSelect}
            focusedElement={focusedElement}
            setFocusedElement={setFocusedElement}
            selectedCategory={selectedCategory}
          />
        )}
      </AnimatePresence>

      {/* Channels Page */}
      <AnimatePresence>
        {currentView === 'channels' && (
          <>
            {/* Header */}
            <Header
              onSearch={setSearchQuery}
              onCategorySelect={setSelectedCategory}
              selectedCategory={selectedCategory}
              focusedElement={focusedElement}
              setFocusedElement={setFocusedElement}
              isMovieMode={isMovieMode}
            />

            {/* Help Button */}
            <button
              onClick={() => setShowNavigationGuide(true)}
              className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 z-40"
              title="Press H for help"
            >
              ?
            </button>

            {/* Main Content */}
            <main className="pt-16">
              {/* Hero Section */}
              <HeroSection onPlay={handlePlay} isMovieMode={isMovieMode} />

              {/* Channels Section */}
              <section className="container mx-auto px-4 py-12">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold mb-2">
                    {selectedCategory === 'All' 
                      ? (isMovieMode ? 'All Movies' : 'All Channels') 
                      : `${selectedCategory} ${isMovieMode ? 'Movies' : 'Channels'}`
                    }
                  </h2>
                  <p className="text-gray-400 text-lg">
                    {searchQuery 
                      ? `Search results for "${searchQuery}" (${filteredChannels.length} found)`
                      : `Discover ${filteredChannels.length} amazing ${isMovieMode ? 'movies' : 'channels'}`
                    }
                  </p>
                </div>

                <ChannelGrid
                  channels={filteredChannels}
                  onChannelSelect={handleChannelSelect}
                  focusedElement={focusedElement}
                  setFocusedElement={setFocusedElement}
                  isMovieMode={isMovieMode}
                />

                {filteredChannels.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-8xl mb-4">📺</div>
                    <h3 className="text-2xl font-semibold mb-2">No {isMovieMode ? 'movies' : 'channels'} found</h3>
                    <p className="text-gray-400 text-lg">
                      {searchQuery 
                        ? 'Try adjusting your search terms'
                        : `No ${isMovieMode ? 'movies' : 'channels'} available in this category`
                      }
                    </p>
                  </div>
                )}
              </section>
            </main>
          </>
        )}
      </AnimatePresence>

      {/* Video Player */}
      <AnimatePresence>
        {currentView === 'player' && selectedChannel && (
          <VideoPlayer
            channel={selectedChannel}
            onClose={handleClosePlayer}
            onBack={handleBackToChannels}
          />
        )}
      </AnimatePresence>

      {/* TV Navigation Guide */}
      <TVNavigationGuide
        isVisible={showNavigationGuide}
        onClose={() => setShowNavigationGuide(false)}
      />
    </div>
  )
}

export default App