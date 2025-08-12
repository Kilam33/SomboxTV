import React, { useState } from 'react'
import { Search, User, Settings, Bell, Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { motion, AnimatePresence } from 'framer-motion'

interface HeaderProps {
  onSearch: (query: string) => void
  onCategorySelect: (category: string) => void
  selectedCategory: string
  focusedElement?: string | null
  setFocusedElement?: (element: string | null) => void
  isMovieMode?: boolean
}

const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  onCategorySelect, 
  selectedCategory,
  focusedElement,
  setFocusedElement,
  isMovieMode = false
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const tvCategories = ['All', 'Movies', 'Sports', 'News', 'Entertainment', 'Documentary', 'Technology']
  const movieCategories = ['All', 'Action', 'Drama', 'Sci-Fi', 'Crime', 'Romance', 'Animation', 'Comedy', 'Horror', 'Thriller', 'Adventure']

  const categories = isMovieMode ? movieCategories : tvCategories

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-gray-700/30 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">SB</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">SomBox TV</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {categories.map((category, index) => {
              const isFocused = focusedElement === `nav-${index}`
              const isSelected = selectedCategory === category
              
              return (
                <Button
                  key={category}
                  variant={isSelected ? "default" : "ghost"}
                  size="lg"
                  onClick={() => onCategorySelect(category)}
                  className={`transition-all duration-300 hover:scale-105 text-lg px-6 py-3 rounded-xl ${
                    isSelected 
                      ? 'bg-blue-500/20 border border-blue-400/30 text-blue-300 shadow-lg shadow-blue-500/20' 
                      : 'hover:bg-white/10 hover:text-blue-300'
                  } ${
                    isFocused ? 'ring-4 ring-blue-500/50 scale-110 bg-white/10' : ''
                  }`}
                  onFocus={() => setFocusedElement?.(`nav-${index}`)}
                  onBlur={() => focusedElement === `nav-${index}` && setFocusedElement?.(null)}
                  tabIndex={0}
                >
                  {category}
                </Button>
              )
            })}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-6">
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <Input
                  type="text"
                  placeholder={isMovieMode ? "Search movies..." : "Search channels..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 w-80 h-12 text-lg bg-gray-800/30 backdrop-blur-md border-gray-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl"
                  onFocus={() => setFocusedElement?.('search')}
                  onBlur={() => focusedElement === 'search' && setFocusedElement?.(null)}
                  tabIndex={0}
                />
              </div>
            </form>

            <Button 
              variant="ghost" 
              size="icon" 
              className={`hidden md:flex w-12 h-12 rounded-xl hover:bg-white/10 transition-all duration-300 ${
                focusedElement === 'notifications' ? 'ring-4 ring-blue-500/50 bg-white/10' : ''
              }`}
              onFocus={() => setFocusedElement?.('notifications')}
              onBlur={() => focusedElement === 'notifications' && setFocusedElement?.(null)}
              tabIndex={0}
            >
              <Bell className="w-6 h-6" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className={`hidden md:flex w-12 h-12 rounded-xl hover:bg-white/10 transition-all duration-300 ${
                focusedElement === 'settings' ? 'ring-4 ring-blue-500/50 bg-white/10' : ''
              }`}
              onFocus={() => setFocusedElement?.('settings')}
              onBlur={() => focusedElement === 'settings' && setFocusedElement?.(null)}
              tabIndex={0}
            >
              <Settings className="w-6 h-6" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className={`hidden md:flex w-12 h-12 rounded-xl hover:bg-white/10 transition-all duration-300 ${
                focusedElement === 'profile' ? 'ring-4 ring-blue-500/50 bg-white/10' : ''
              }`}
              onFocus={() => setFocusedElement?.('profile')}
              onBlur={() => focusedElement === 'profile' && setFocusedElement?.(null)}
              tabIndex={0}
            >
              <User className="w-6 h-6" />
            </Button>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className={`lg:hidden w-12 h-12 rounded-xl hover:bg-white/10 transition-all duration-300 ${
                focusedElement === 'mobile-menu' ? 'ring-4 ring-blue-500/50 bg-white/10' : ''
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onFocus={() => setFocusedElement?.('mobile-menu')}
              onBlur={() => focusedElement === 'mobile-menu' && setFocusedElement?.(null)}
              tabIndex={0}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-black/80 backdrop-blur-xl border-t border-gray-700/30"
            >
              <div className="py-6 space-y-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                    <Input
                      type="text"
                      placeholder={isMovieMode ? "Search movies..." : "Search channels..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 w-full h-12 text-lg bg-gray-800/30 backdrop-blur-md border-gray-600/50 rounded-xl"
                    />
                  </div>
                </form>

                {/* Mobile Navigation */}
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category, index) => {
                    const isFocused = focusedElement === `mobile-nav-${index}`
                    const isSelected = selectedCategory === category
                    
                    return (
                      <Button
                        key={category}
                        variant={isSelected ? "default" : "ghost"}
                        size="lg"
                        onClick={() => {
                          onCategorySelect(category)
                          setIsMenuOpen(false)
                        }}
                        className={`justify-start text-lg px-6 py-4 rounded-xl transition-all duration-300 ${
                          isSelected 
                            ? 'bg-blue-500/20 border border-blue-400/30 text-blue-300' 
                            : 'hover:bg-white/10 hover:text-blue-300'
                        } ${
                          isFocused ? 'ring-4 ring-blue-500/50 bg-white/10' : ''
                        }`}
                        onFocus={() => setFocusedElement?.(`mobile-nav-${index}`)}
                        onBlur={() => focusedElement === `mobile-nav-${index}` && setFocusedElement?.(null)}
                        tabIndex={0}
                      >
                        {category}
                      </Button>
                    )
                  })}
                </div>

                {/* Mobile Actions */}
                <div className="flex space-x-3">
                  <Button variant="ghost" size="lg" className="flex-1 text-lg rounded-xl hover:bg-white/10">
                    <Bell className="w-5 h-5 mr-3" />
                    Notifications
                  </Button>
                  <Button variant="ghost" size="lg" className="flex-1 text-lg rounded-xl hover:bg-white/10">
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                  </Button>
                  <Button variant="ghost" size="lg" className="flex-1 text-lg rounded-xl hover:bg-white/10">
                    <User className="w-5 h-5 mr-3" />
                    Profile
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header