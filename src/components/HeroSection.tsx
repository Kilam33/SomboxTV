import React, { useState, useEffect } from 'react'
import { Play, Info, Volume2, VolumeX } from 'lucide-react'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import { mockFeaturedContent } from '../data/mockData'
import { formatDuration } from '../lib/utils'

interface HeroSectionProps {
  onPlay: (contentId: string) => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ onPlay }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === mockFeaturedContent.length - 1 ? 0 : prevIndex + 1
      )
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const currentContent = mockFeaturedContent[currentIndex]

  return (
    <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        key={currentContent.id}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${currentContent.thumbnail})` }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <motion.div
              key={`${currentContent.id}-content`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {currentContent.genre.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-gray-800/80 text-gray-200 text-sm rounded-full backdrop-blur-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {currentContent.title}
              </h1>

              {/* Meta Information */}
              <div className="flex items-center space-x-6 mb-6 text-gray-300">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{currentContent.rating}</span>
                </div>
                {currentContent.duration && (
                  <span>{formatDuration(currentContent.duration)}</span>
                )}
                <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">HD</span>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl">
                {currentContent.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => onPlay(currentContent.id)}
                  className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Play Now
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-400 text-white hover:bg-white hover:text-black font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <Info className="w-5 h-5 mr-2" />
                  More Info
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Audio Control */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className="absolute bottom-20 right-8 bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>

          {/* Progress Indicators */}
          <div className="absolute bottom-8 left-4 flex space-x-2">
            {mockFeaturedContent.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-8 h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection