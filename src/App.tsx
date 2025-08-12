import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ChannelGrid from './components/ChannelGrid'
import VideoPlayer from './components/VideoPlayer'
import { mockChannels, mockCategories } from './data/mockData'
import { Channel } from './types'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
  const [isPlayerFullscreen, setIsPlayerFullscreen] = useState(false)
  const [filteredChannels, setFilteredChannels] = useState(mockChannels)

  const handleLoadingComplete = () => {
    setIsLoading(false)
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
  }, [selectedCategory, searchQuery])

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel)
  }

  const handleClosePlayer = () => {
    setSelectedChannel(null)
    setIsPlayerFullscreen(false)
  }

  const handleToggleFullscreen = () => {
    setIsPlayerFullscreen(!isPlayerFullscreen)
  }

  const handlePlay = (contentId: string) => {
    // Find and play featured content
    const featuredChannel = mockChannels[0] // For demo, play first channel
    setSelectedChannel(featuredChannel)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Header */}
      {!isLoading && (
        <Header
          onSearch={setSearchQuery}
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      )}

      {/* Main Content */}
      {!isLoading && (
        <main className="pt-16">
          {!selectedChannel && (
            <>
              {/* Hero Section */}
              <HeroSection onPlay={handlePlay} />

              {/* Channels Section */}
              <section className="container mx-auto px-4 py-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">
                    {selectedCategory === 'All' ? 'All Channels' : `${selectedCategory} Channels`}
                  </h2>
                  <p className="text-gray-400">
                    {searchQuery 
                      ? `Search results for "${searchQuery}" (${filteredChannels.length} found)`
                      : `Discover ${filteredChannels.length} amazing channels`
                    }
                  </p>
                </div>

                <ChannelGrid
                  channels={filteredChannels}
                  onChannelSelect={handleChannelSelect}
                />

                {filteredChannels.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📺</div>
                    <h3 className="text-xl font-semibold mb-2">No channels found</h3>
                    <p className="text-gray-400">
                      {searchQuery 
                        ? 'Try adjusting your search terms'
                        : 'No channels available in this category'
                      }
                    </p>
                  </div>
                )}
              </section>
            </>
          )}

          {/* Video Player */}
          <AnimatePresence>
            {selectedChannel && (
              <div className={isPlayerFullscreen ? 'fixed inset-0 z-50' : 'container mx-auto px-4 py-8'}>
                <VideoPlayer
                  channel={selectedChannel}
                  onClose={handleClosePlayer}
                  isFullscreen={isPlayerFullscreen}
                  onToggleFullscreen={handleToggleFullscreen}
                />
              </div>
            )}
          </AnimatePresence>
        </main>
      )}

      {/* Categories Preview (when not in player mode) */}
      {!isLoading && !selectedChannel && (
        <section className="container mx-auto px-4 py-12 border-t border-gray-800">
          <h2 className="text-2xl font-bold mb-8">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {mockCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className="group p-6 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {category.channels.length} channels
                </p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default App