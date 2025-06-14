'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
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
  },
  { 
    id: 3, 
    src: '/images/image-3.jpg', 
    alt: 'Birthday memory 3',
    title: 'Precious Memory',
    description: 'Another beautiful chapter in our story'
  }
]

// Birthday song path
const birthdaySong = '/music/birthday.mp3'

// Replace with actual birthday date
const birthdayDate = new Date('2024-12-31')

// Enhanced music player controls
function useMusicControl() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(birthdaySong)
      audioRef.current.loop = true

      // Cleanup function
      return () => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.src = ''
          audioRef.current = null
        }
      }
    }
  }, []) // Empty dependency array means this only runs once on mount

  const toggleMusic = useCallback(() => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(error => console.log('Music autoplay prevented:', error))
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }, [isMusicPlaying])

  return { isMusicPlaying, toggleMusic }
}

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div className="relative flex flex-col items-center">
          <motion.div
            className="text-6xl md:text-7xl mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3,
            }}
          >
            🎂
          </motion.div>
          <motion.div
            className="flex gap-3 mb-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {'Loading...'.split('').map((char, index) => (
              <motion.span
                key={index}
                className="text-2xl md:text-3xl font-bold text-primary-500 dark:text-primary-400"
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                  }
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
          <motion.div
            className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function BirthdayPageComponent() {
  const [isLoading, setIsLoading] = useState(true)
  const [isCountdownComplete, setIsCountdownComplete] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { isMusicPlaying, toggleMusic } = useMusicControl()
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
    setTimeout(() => setShowConfetti(false), 15000)
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
  }, [toggleMusic])

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
    <>
      <AnimatePresence>
        {isLoading && (
          <SplashScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <main className={`min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 ${isLoading ? 'hidden' : ''}`}>
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
                recycle={true}
                numberOfPieces={200}
                gravity={0.3}
                colors={['#FF69B4', '#FFD700', '#FF6B6B', '#4FD1C5', '#9F7AEA', '#F6E05E', '#68D391', '#4299E1']}
                tweenDuration={5000}
                onConfettiComplete={(confetti) => {
                  setShowConfetti(false)
                  confetti?.reset()
                }}
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
          onPlayingChange={toggleMusic}
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
            className="relative text-center z-10 max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
              className="relative w-32 md:w-40 h-32 md:h-40 mx-auto mb-8 md:mb-12"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/30 to-purple-600/30 animate-pulse blur-xl"></div>
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-purple-600 animate-pulse flex items-center justify-center">
                <span className="text-4xl md:text-5xl">🎂</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 filter drop-shadow-lg leading-tight relative">
                {isCountdownComplete ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center gap-4"
                  >
                    <motion.div 
                      className="text-6xl md:text-7xl lg:text-8xl"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [-5, 5, -5]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      🎉
                    </motion.div>
                    <motion.div 
                      className="relative font-extrabold"
                      animate={{
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 blur-lg opacity-50"></div>
                      <div className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 bg-size-200 animate-gradient-x">
                        Happy Birthday!
                      </div>
                    </motion.div>
                    <motion.div 
                      className="text-6xl md:text-7xl lg:text-8xl"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [5, -5, 5]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      🎉
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-purple-600">
                    Coming Soon...
                  </div>
                )}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl lg:text-3xl mb-12 md:mb-16 text-gray-700 dark:text-gray-300 px-4 relative"
            >
              {isCountdownComplete 
                ? (
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="inline-block"
                  >
                    <span className="text-primary-500">Time to celebrate!</span>
                    <span className="inline-block animate-wiggle ml-2">🎈</span>
                  </motion.span>
                ) 
                : 'Counting down to the special day!'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl blur-lg -z-10"></div>
              <CountdownTimer 
                targetDate={birthdayDate} 
                onComplete={handleCountdownComplete}
              />
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-primary-500 dark:border-primary-400 rounded-full p-1">
              <div className="w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full animate-bounce mx-auto"></div>
            </div>
          </motion.div>
        </section>

        <style jsx global>{`
          @keyframes wiggle {
            0%, 100% { transform: rotate(-3deg); }
            50% { transform: rotate(3deg); }
          }
          .animate-wiggle {
            animation: wiggle 1s ease-in-out infinite;
          }
          @keyframes gradient-x {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
          }
          .bg-size-200 {
            background-size: 200% 200%;
          }
        `}</style>

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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-purple-600 relative inline-block">
                Precious Memories
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 to-purple-600/20 blur-lg -z-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl px-4">
                A collection of beautiful moments and cherished memories that we've shared together.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
              {photos.slice(0, 2).map((photo, index) => (
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

            {/* Centered Third Image */}
            <div className="mt-6 md:mt-8 lg:mt-12 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative group w-full max-w-2xl mx-auto"
              >
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl aspect-[4/3]">
                  <img
                    src={photos[2].src}
                    alt={photos[2].alt}
                    className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                      <h3 className="text-white text-xl md:text-2xl font-semibold mb-2 md:mb-3">{photos[2].title}</h3>
                      <p className="text-gray-200 text-xs md:text-sm">{photos[2].description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-purple-600 relative inline-block">
                Birthday Wishes
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 to-purple-600/20 blur-lg -z-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg md:text-xl px-4">
                Special messages and heartfelt wishes from your loved one.
              </p>
            </motion.div>

            <div className="flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-6 md:p-8 transform hover:scale-105 transition-transform duration-300 relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl md:rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="text-4xl md:text-5xl mb-4 md:mb-6 text-center animate-bounce">🎀</div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 md:mb-6 text-base md:text-lg leading-relaxed whitespace-pre-line text-center">
                    {[{
                      message: "Happiest Birthday to my most favorite person 🎀❤\nYou came into my life unexpectedly and became the closest soul to me 🤍🥺\nThank you for always understanding, supporting, and valuing me 🤗\nI'll always cherish the moments, memories, and your daily stories 🥺(apko pata aj kia hua 😩)\nYour presence gave me peace, strength, and countless smiles 🌸😇\nMay Allah bless you with endless happiness, success & His protection 🌙✨\nMay you continue to shine with grace, faith, and dignity 🧕🌷\nStay safe, stay blessed and always keep smiling 😊❤",
                      author: "Your Special Someone",
                      emoji: "🎀"
                    }][0].message}
                  </p>
                  <motion.p 
                    className="text-primary-500 font-semibold text-base md:text-lg text-center"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    - Your Special Someone
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 md:py-8 text-center text-gray-600 dark:text-gray-400 bg-gradient-to-t from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center gap-2"
          >
            <p className="flex items-center justify-center gap-2 text-sm md:text-base">
              Made with 
              <motion.span 
                className="text-red-500"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                ❤️
              </motion.span> 
              for your special day
            </p>
            <motion.div
              className="text-2xl mt-2"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              🎀 🎈 🎂
            </motion.div>
          </motion.div>
        </footer>
      </main>
    </>
  )
}

// Export a simple wrapper component that uses the client-side only version
export default function BirthdayPage() {
  return <BirthdayPageContent />
} 