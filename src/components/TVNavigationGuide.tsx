import React, { useState } from 'react'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, Pause, Volume2, VolumeX, X } from 'lucide-react'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface TVNavigationGuideProps {
  isVisible: boolean
  onClose: () => void
}

const TVNavigationGuide: React.FC<TVNavigationGuideProps> = ({ isVisible, onClose }) => {
  const [currentSection, setCurrentSection] = useState(0)

  const sections = [
    {
      title: "Basic Navigation",
      controls: [
        { icon: ArrowUp, label: "Navigate Up", description: "Move focus to element above" },
        { icon: ArrowDown, label: "Navigate Down", description: "Move focus to element below" },
        { icon: ArrowLeft, label: "Navigate Left", description: "Move focus to element on the left" },
        { icon: ArrowRight, label: "Navigate Right", description: "Move focus to element on the right" },
        { icon: Play, label: "Enter/Space", description: "Select or activate focused element" },
      ]
    },
    {
      title: "Video Player Controls",
      controls: [
        { icon: Play, label: "Play/Pause", description: "Space or Enter to toggle playback" },
        { icon: ArrowLeft, label: "Rewind", description: "Seek backward 10 seconds" },
        { icon: ArrowRight, label: "Fast Forward", description: "Seek forward 10 seconds" },
        { icon: Volume2, label: "Volume Up", description: "Increase volume" },
        { icon: VolumeX, label: "Volume Down", description: "Decrease volume" },
        { icon: X, label: "Mute", description: "Press 'M' to toggle mute" },
      ]
    },
    {
      title: "Quick Actions",
      controls: [
        { icon: X, label: "Escape", description: "Go back or close current screen" },
        { icon: Play, label: "Fullscreen", description: "Press 'F' to toggle fullscreen" },
        { icon: ArrowLeft, label: "Backspace", description: "Clear search or go back" },
      ]
    }
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">TV Navigation Guide</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="w-16 h-16 text-white hover:bg-white/20"
              >
                <X className="w-8 h-8" />
              </Button>
            </div>

            {/* Section Navigation */}
            <div className="flex space-x-4 mb-8">
              {sections.map((section, index) => (
                <Button
                  key={index}
                  variant={currentSection === index ? "default" : "ghost"}
                  onClick={() => setCurrentSection(index)}
                  className="text-lg px-6 py-3"
                >
                  {section.title}
                </Button>
              ))}
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sections[currentSection].controls.map((control, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                        <control.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {control.label}
                        </h3>
                        <p className="text-gray-400 text-lg">
                          {control.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-center text-lg">
                Use the arrow keys on your remote to navigate, and Enter/Space to select
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TVNavigationGuide
