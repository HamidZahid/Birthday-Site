'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ThemeToggle } from '@/components/theme-toggle'
import { CountdownTimer } from '@/components/countdown-timer'
import { MusicPlayer } from '@/components/music-player'
import { FloatingBalloons } from '@/components/floating-balloons'
import dynamic from 'next/dynamic'

// Create a client-side only wrapper for Confetti
const ClientConfetti = dynamic(() => import('react-confetti'), {
  ssr: false,
})

// Create a client-side only wrapper for the entire page
const BirthdayPageContent = dynamic(() => Promise.resolve(BirthdayPageComponent), {
  ssr: false,
})

// Photo gallery images
const photos = [
  { 
    id: 1, 
    src: '/images/image-1.jpg', 
    alt: 'Birthday memory 1',
    title: 'Special Moment',
    description: 'A captured memory of joy and celebration'
  },
  { 
    id: 2, 
    src: '/images/image-2.jpg', 
    alt: 'Birthday memory 2',
    title: 'Happy Times',
    description: 'Another beautiful moment to remember'
  }
]

// Birthday song path
const birthdaySong = '/music/birthday.mp3'

// Replace with actual birthday date
const birthdayDate = new Date('2024-12-31')

function BirthdayPageComponent() {
  const [isCountdownComplete, setIsCountdownComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Initialize window dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const handleCountdownComplete = () => {
    setIsCountdownComplete(true)
    setShowConfetti(true)
    setIsMusicPlaying(true)
    setTimeout(() => setShowConfetti(false), 10000)
  }

  const toggleMusic = () => {
    setIsMusicPlaying(prev => !prev)
  }

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Space bar toggles music
      if (event.code === 'Space' && event.target === document.body) {
        event.preventDefault() // Prevent page scroll
        toggleMusic()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        if (
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(index)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
          >
            <ClientConfetti
              width={dimensions.width}
              height={dimensions.height}
              recycle={false}
              numberOfPieces={500}
              gravity={0.2}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingBalloons />
      
      {/* Mobile Music Controls */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={toggleMusic}
        className="fixed bottom-20 right-6 z-40 w-12 h-12 flex items-center justify-center bg-primary-500 rounded-full shadow-lg md:hidden"
      >
        <span className="text-xl text-white">
          {isMusicPlaying ? '🔇' : '🔊'}
        </span>
      </motion.button>

      {/* Navigation Dots */}
      <div className="fixed right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col gap-3 md:gap-4">
          {['Home', 'Gallery', 'Wishes'].map((section, index) => (
            <motion.button
              key={section}
              onClick={() => {
                const element = document.querySelectorAll('section')[index]
                element.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-300 ${
                activeSection === index
                  ? 'bg-primary-500 scale-125'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      <ThemeToggle />
      <MusicPlayer 
        audioSrc={birthdaySong} 
        isPlaying={isMusicPlaying}
        onPlayingChange={setIsMusicPlaying}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 px-4">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/80 dark:via-gray-900/30 dark:to-gray-900/80"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-24 md:w-32 h-24 md:h-32 mx-auto mb-8 md:mb-12"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-purple-600 animate-pulse" />
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-purple-600 filter drop-shadow-lg leading-tight">
            {isCountdownComplete ? '🎉 Happy Birthday! 🎉' : 'Coming Soon...'}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl lg:text-3xl mb-12 md:mb-16 text-gray-700 dark:text-gray-300 px-4"
          >
            {isCountdownComplete 
              ? 'The wait is over! Time to celebrate!' 
              : 'Counting down to the special day!'}
          </motion.p>
          <CountdownTimer 
            targetDate={birthdayDate} 
            onComplete={handleCountdownComplete}
          />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full p-1">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce mx-auto" />
          </div>
        </motion.div>
      </section>

      {/* Photo Gallery Section */}
      <section className="relative py-20 md:py-32 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-purple-600">
              Precious Memories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base px-4">
              A collection of beautiful moments and cherished memories that we've shared together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl aspect-[4/3]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                      <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 md:mb-3">{photo.title}</h3>
                      <p className="text-gray-200 text-xs md:text-sm">{photo.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Birthday Wishes Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-purple-600">
              Birthday Wishes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base px-4">
              Special messages and heartfelt wishes from your loved ones.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                message: "May your day be filled with joy, laughter, and all the things that make you happiest! 🎉",
                author: "Family",
                emoji: "❤️"
              },
              {
                message: "Wishing you a fantastic birthday filled with wonderful surprises and beautiful moments! 🎂",
                author: "Friends",
                emoji: "✨"
              },
              {
                message: "Here's to another year of amazing adventures and beautiful memories! 🌟",
                author: "Best Friends",
                emoji: "🎈"
              }
            ].map((wish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{wish.emoji}</div>
                <p className="text-gray-700 dark:text-gray-300 mb-3 md:mb-4 italic text-sm md:text-base">
                  "{wish.message}"
                </p>
                <p className="text-primary-500 font-semibold text-sm md:text-base">- {wish.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 text-center text-gray-600 dark:text-gray-400 bg-gradient-to-t from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-sm md:text-base"
        >
          Made with <span className="text-red-500 animate-pulse">❤️</span> for your special day
        </motion.p>
      </footer>
    </main>
  )
}

// Export a simple wrapper component that uses the client-side only version
export default function BirthdayPage() {
  return <BirthdayPageContent />
} 