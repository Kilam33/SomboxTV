import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward, Settings, X } from 'lucide-react'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { Channel } from '../types'

interface VideoPlayerProps {
  channel: Channel | null
  onClose: () => void
  isFullscreen: boolean
  onToggleFullscreen: () => void
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  channel, 
  onClose, 
  isFullscreen, 
  onToggleFullscreen 
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
        case 'ArrowLeft':
          e.preventDefault()
          seekBackward()
          break
        case 'ArrowRight':
          e.preventDefault()
          seekForward()
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
        case 'f':
        case 'F':
          e.preventDefault()
          onToggleFullscreen()
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

  const seekForward = () => {
    if (videoRef.current && duration) {
      const newTime = Math.min(duration, currentTime + 10)
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const seekBackward = () => {
    if (videoRef.current && duration) {
      const newTime = Math.max(0, currentTime - 10)
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const newTime = (clickX / rect.width) * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  if (!channel) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${
        isFullscreen 
          ? 'fixed inset-0 z-50 bg-black' 
          : 'relative bg-black rounded-2xl overflow-hidden shadow-2xl'
      }`}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => !isFullscreen && setShowControls(false)}
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
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-2xl">{channel.name}</h3>
                  <p className="text-gray-300 text-lg">{channel.category}</p>
                </div>
                {channel.isLive && (
                  <div className="bg-red-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-lg font-semibold flex items-center space-x-2 shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    <span>LIVE</span>
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20 w-16 h-16 rounded-xl transition-all duration-300"
                onFocus={() => setFocusedControl('close')}
                onBlur={() => focusedControl === 'close' && setFocusedControl(null)}
                tabIndex={0}
              >
                <X className="w-8 h-8" />
              </Button>
            </div>

            {/* Center Play/Pause Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className="bg-black/50 hover:bg-black/70 text-white w-24 h-24 rounded-full backdrop-blur-sm transition-all duration-300"
                onFocus={() => setFocusedControl('play')}
                onBlur={() => focusedControl === 'play' && setFocusedControl(null)}
                tabIndex={0}
              >
                {isPlaying ? (
                  <Pause className="w-12 h-12" />
                ) : (
                  <Play className="w-12 h-12" />
                )}
              </Button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-6">
              {/* Progress Bar */}
              {!channel.isLive && (
                <div 
                  className="w-full h-3 bg-gray-600/50 backdrop-blur-sm rounded-full cursor-pointer border border-gray-500/30"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  />
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlayPause}
                    className={`text-white hover:bg-white/20 w-16 h-16 rounded-xl transition-all duration-300 ${
                      focusedControl === 'play-pause' ? 'ring-4 ring-blue-500/50 bg-white/10' : ''
                    }`}
                    onFocus={() => setFocusedControl('play-pause')}
                    onBlur={() => focusedControl === 'play-pause' && setFocusedControl(null)}
                    tabIndex={0}
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8" />
                    )}
                  </Button>

                  {!channel.isLive && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`text-white hover:bg-white/20 w-16 h-16 rounded-xl transition-all duration-300 ${
                          focusedControl === 'rewind' ? 'ring-4 ring-blue-500/50 bg-white/10' : ''
                        }`}
                        onClick={seekBackward}
                        onFocus={() => setFocusedControl('rewind')}
                        onBlur={() => focusedControl === 'rewind' && setFocusedControl(null)}
                        tabIndex={0}
                      >
                        <SkipBack className="w-8 h-8" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`text-white hover:bg-white/20 w-16 h-16 rounded-xl transition-all duration-300 ${
                          focusedControl === 'forward' ? 'ring-4 ring-blue-500/50 bg-white/10' : ''
                        }`}
                        onClick={seekForward}
                        onFocus={() => setFocusedControl('forward')}
                        onBlur={() => focusedControl === 'forward' && setFocusedControl(null)}
                        tabIndex={0}
                      >
                        <SkipForward className="w-8 h-8" />
                      </Button>
                    </>
                  )}

                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className={`text-white hover:bg-white/20 w-16 h-16 rounded-xl transition-all duration-300 ${
                        focusedControl === 'mute' ? 'ring-4 ring-blue-500/50 bg-white/10' : ''
                      }`}
                      onFocus={() => setFocusedControl('mute')}
                      onBlur={() => focusedControl === 'mute' && setFocusedControl(null)}
                      tabIndex={0}
                    >
                      {isMuted ? (
                        <VolumeX className="w-8 h-8" />
                      ) : (
                        <Volume2 className="w-8 h-8" />
                      )}
                    </Button>

                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-32 h-3 accent-blue-500"
                    />
                  </div>

                  {!channel.isLive && (
                    <span className="text-white text-xl font-mono">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`text-white hover:bg-white/20 w-16 h-16 rounded-xl transition-all duration-300 ${
                      focusedControl === 'settings' ? 'ring-4 ring-blue-500/50 bg-white/10' : ''
                    }`}
                    onFocus={() => setFocusedControl('settings')}
                    onBlur={() => focusedControl === 'settings' && setFocusedControl(null)}
                    tabIndex={0}
                  >
                    <Settings className="w-8 h-8" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleFullscreen}
                    className={`text-white hover:bg-white/20 w-16 h-16 rounded-xl transition-all duration-300 ${
                      focusedControl === 'fullscreen' ? 'ring-4 ring-blue-500/50 bg-white/10' : ''
                    }`}
                    onFocus={() => setFocusedControl('fullscreen')}
                    onBlur={() => focusedControl === 'fullscreen' && setFocusedControl(null)}
                    tabIndex={0}
                  >
                    {isFullscreen ? (
                      <Minimize className="w-8 h-8" />
                    ) : (
                      <Maximize className="w-8 h-8" />
                    )}
                  </Button>
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