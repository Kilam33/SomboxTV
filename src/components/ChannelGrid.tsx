import React from 'react'
import { Play, Users, Star } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import { Channel } from '../types'

interface ChannelGridProps {
  channels: Channel[]
  onChannelSelect: (channel: Channel) => void
}

const ChannelGrid: React.FC<ChannelGridProps> = ({ channels, onChannelSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {channels.map((channel, index) => (
        <motion.div
          key={channel.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="group cursor-pointer"
          onClick={() => onChannelSelect(channel)}
        >
          <Card className="overflow-hidden hover:border-blue-500/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
            <div className="relative">
              {/* Channel Logo/Thumbnail */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                {channel.logo ? (
                  <img
                    src={channel.logo}
                    alt={channel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Play className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="icon" className="bg-blue-600 hover:bg-blue-500">
                    <Play className="w-5 h-5" />
                  </Button>
                </div>

                {/* Live Indicator */}
                {channel.isLive && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>LIVE</span>
                  </div>
                )}

                {/* Rating */}
                {channel.rating && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{channel.rating}</span>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-white mb-2 truncate group-hover:text-blue-400 transition-colors">
                  {channel.name}
                </h3>

                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {channel.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-blue-400 text-sm font-medium">
                    {channel.category}
                  </span>

                  {channel.viewers && (
                    <div className="flex items-center text-gray-400 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      {channel.viewers.toLocaleString()}
                    </div>
                  )}
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default ChannelGrid