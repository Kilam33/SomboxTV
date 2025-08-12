import React from 'react'
import { Play, Users, Star, Clock } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import { Channel } from '../types'

interface ChannelGridProps {
  channels: Channel[]
  onChannelSelect: (channel: Channel) => void
  focusedElement?: string | null
  setFocusedElement?: (element: string | null) => void
  isMovieMode?: boolean
}

const ChannelGrid: React.FC<ChannelGridProps> = ({ 
  channels, 
  onChannelSelect, 
  focusedElement,
  setFocusedElement,
  isMovieMode = false
}) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {channels.map((channel, index) => {
        const isFocused = focusedElement === `channel-${index}`
        
        return (
          <motion.div
            key={channel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer"
            onClick={() => onChannelSelect(channel)}
            onFocus={() => setFocusedElement?.(`channel-${index}`)}
            onBlur={() => focusedElement === `channel-${index}` && setFocusedElement?.(null)}
            tabIndex={0}
          >
            <Card className={`overflow-hidden transition-all duration-500 rounded-2xl group-hover:shadow-2xl group-hover:shadow-blue-500/20 ${
              isFocused 
                ? 'border-2 border-blue-400/60 bg-blue-500/10 scale-105 shadow-2xl shadow-blue-500/30' 
                : 'border border-gray-700/30 hover:border-blue-500/40 bg-gray-800/40 backdrop-blur-sm'
            }`}>
              <div className="relative">
                {/* Movie Poster/Thumbnail */}
                <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                  {channel.logo ? (
                    <img
                      src={channel.logo}
                      alt={channel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-16 h-16 text-gray-400" />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 flex items-center justify-center ${
                    isFocused ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    <Button size="icon" className="bg-blue-600/90 hover:bg-blue-500 w-16 h-16 rounded-xl backdrop-blur-sm">
                      <Play className="w-8 h-8" />
                    </Button>
                  </div>

                  {/* Rating Badge */}
                  {channel.rating && (
                    <div className="absolute top-4 left-4 bg-yellow-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-semibold flex items-center space-x-1 shadow-lg">
                      <Star className="w-3 h-3 fill-white" />
                      <span>{channel.rating}</span>
                    </div>
                  )}

                  {/* Duration Badge */}
                  {isMovieMode && (
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm flex items-center space-x-1 shadow-lg">
                      <Clock className="w-3 h-3" />
                      <span>2h 32m</span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg">
                    {channel.category}
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className={`font-semibold text-white mb-3 text-xl truncate transition-colors duration-300 ${
                    isFocused ? 'text-blue-300' : 'group-hover:text-blue-300'
                  }`}>
                    {channel.name}
                  </h3>

                  <p className="text-gray-400 text-base mb-4 line-clamp-2">
                    {channel.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 text-base font-medium">
                      {channel.category}
                    </span>

                    {channel.viewers && (
                      <div className="flex items-center text-gray-400 text-base">
                        <Users className="w-5 h-5 mr-2" />
                        {channel.viewers.toLocaleString()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}

export default ChannelGrid