import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, X, ArrowLeft } from 'lucide-react'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Channel } from '../types'

interface VideoPlayerProps {
  channel: Channel | null
  onClose: () => void
  onBack: () => void
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  channel, 
  onClose,
  onBack
}) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [focusedControl, setFocusedControl] = useState<string | null>(null)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<number>()

  useEffect(() => {
    const hideControls = () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 5000) // Increased timeout for TV usage
    }

    const showControlsHandler = () => {
      setShowControls(true)
      hideControls()
    }

    if (isPlaying) {
      hideControls()
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  // Keyboard navigation for video player
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault()
          togglePlayPause()
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
        case 'ArrowUp':
          e.preventDefault()
          volumeUp()
          break
        case 'ArrowDown':
          e.preventDefault()
          volumeDown()
          break
        case 'm':
        case 'M':
          e.preventDefault()
          toggleMute()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, volume, isMuted])

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const volumeUp = () => {
    const newVolume = Math.min(1, volume + 0.1)
    handleVolumeChange(newVolume)
  }

  const volumeDown = () => {
    const newVolume = Math.max(0, volume - 0.1)
    handleVolumeChange(newVolume)
  }

  if (!channel) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        poster={channel.logo}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={channel.streamUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Controls Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60"
          >
            {/* Top Right Buttons */}
            <div className="absolute top-8 right-8 flex items-center space-x-4 z-10">
              {/* Back Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Back button clicked')
                  onBack()
                }}
                className="w-14 h-14 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-white hover:text-white transition-all duration-300 backdrop-blur-md border border-gray-600/30 cursor-pointer"
                onFocus={() => setFocusedControl('back')}
                onBlur={() => focusedControl === 'back' && setFocusedControl(null)}
                tabIndex={0}
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>

              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Close button clicked')
                  onClose()
                }}
                className="w-14 h-14 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-white hover:text-white transition-all duration-300 backdrop-blur-md border border-gray-600/30 cursor-pointer"
                onFocus={() => setFocusedControl('close')}
                onBlur={() => focusedControl === 'close' && setFocusedControl(null)}
                tabIndex={0}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Center Play/Pause Button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('Play/Pause button clicked')
                  togglePlayPause()
                }}
                className="w-20 h-20 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-all duration-300 cursor-pointer"
                onFocus={() => setFocusedControl('play')}
                onBlur={() => focusedControl === 'play' && setFocusedControl(null)}
                tabIndex={0}
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10" />
                ) : (
                  <Play className="w-10 h-10" />
                )}
              </Button>
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <div className="flex items-center justify-center space-x-4">
                {/* Volume Controls */}
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      console.log('Volume button clicked')
                      toggleMute()
                    }}
                    className={`w-14 h-14 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-white transition-all duration-300 backdrop-blur-md border border-gray-600/30 cursor-pointer ${
                      focusedControl === 'mute' ? 'ring-4 ring-blue-500/50 bg-white/10' : ''
                    }`}
                    onFocus={() => setFocusedControl('mute')}
                    onBlur={() => focusedControl === 'mute' && setFocusedControl(null)}
                    tabIndex={0}
                  >
                    {isMuted ? (
                      <VolumeX className="w-6 h-6" />
                    ) : (
                      <Volume2 className="w-6 h-6" />
                    )}
                  </Button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      e.stopPropagation()
                      handleVolumeChange(parseFloat(e.target.value))
                    }}
                    className="w-32 h-2 accent-blue-500 bg-gray-600/30 rounded-full cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default VideoPlayer