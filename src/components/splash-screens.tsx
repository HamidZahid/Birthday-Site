'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ReactConfetti from 'react-confetti'
import { useWindowSize } from 'react-use'

export function SplashScreens() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const router = useRouter()
  const { width, height } = useWindowSize()

  const screens = [
    {
      title: "It's Your Birthday YeYe! 🎉",
      description: "Get ready for something amazing!",
      background: "bg-gradient-to-r from-pink-500 to-purple-500",
      confettiColors: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#ffffff']
    },
    {
      title: "Made Something Special 🎁",
      description: "Because you're special to me!",
      background: "bg-gradient-to-r from-blue-500 to-teal-500",
      confettiColors: ['#00CED1', '#48D1CC', '#40E0D0', '#20B2AA', '#ffffff']
    },
    {
      title: "Ready to See? 🎨",
      description: "Do you want to see what I made?",
      background: "bg-gradient-to-r from-primary-500 to-purple-600",
      showButtons: true,
      confettiColors: ['#FFD700', '#FFA500', '#FF8C00', '#FF4500', '#ffffff']
    }
  ]

  useEffect(() => {
    // Automatically advance to next screen after 4 seconds
    // Only advance if not on the last screen
    if (currentScreen < screens.length - 1) {
      const timer = setTimeout(() => {
        setCurrentScreen(prev => prev + 1)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [currentScreen, screens.length])

  const moveNoButton = () => {
    const newX = Math.random() * 200 - 100
    const newY = Math.random() * 200 - 100
    setNoButtonPosition({ x: newX, y: newY })
  }

  const handleYesClick = () => {
    router.push('/birthday')
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`min-h-screen flex items-center justify-center ${screens[currentScreen].background} overflow-hidden`}
      >
        {/* Full-screen confetti with consistent downward motion */}
        <ReactConfetti
          width={width}
          height={height}
          colors={screens[currentScreen].confettiColors}
          numberOfPieces={150}
          gravity={0.25}
          wind={0}
          drift={0}
          friction={0.99}
          initialVelocityY={10}
          recycle={true}
          run={true}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        />

        <div className="text-center text-white p-8 max-w-2xl relative z-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {screens[currentScreen].title}
            </h1>
            <p className="text-lg md:text-xl">
              {screens[currentScreen].description}
            </p>
          </motion.div>

          {screens[currentScreen].showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex justify-center items-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYesClick}
                className="px-6 py-3 bg-white text-primary-500 rounded-full text-lg font-bold hover:bg-opacity-90 transition-all"
              >
                Yes! Show me 🎉
              </motion.button>

              <motion.button
                animate={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y,
                }}
                whileHover={{ scale: 1.1 }}
                onHoverStart={moveNoButton}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-lg font-bold hover:bg-white/30 transition-all"
              >
                No, thanks
              </motion.button>
            </motion.div>
          )}

          {/* Progress indicator */}
          <motion.div 
            className="absolute bottom-8 left-0 right-0 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {screens.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentScreen ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </motion.div>

          {/* Loading bar for current screen */}
          {currentScreen < screens.length - 1 && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white/30"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 4, ease: 'linear' }}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 