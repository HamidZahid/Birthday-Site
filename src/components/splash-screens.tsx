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
      background: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-400 via-purple-400 to-indigo-400",
      confettiColors: ['#FF69B4', '#FFB6C1', '#FFC0CB', '#FF1493', '#ffffff'],
      emoji: "🎂"
    },
    {
      title: "Made something special for Madam Jee 🎀💙🎁",
      description: "Because you're special to me!",
      background: "bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-400 via-teal-400 to-emerald-400",
      confettiColors: ['#00CED1', '#48D1CC', '#40E0D0', '#20B2AA', '#ffffff'],
      emoji: "🎁"
    },
    {
      title: "Ready to See? 🎨",
      description: "Do you want to see what I made?",
      background: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-400 via-purple-400 to-pink-400",
      showButtons: true,
      confettiColors: ['#FFD700', '#FFA500', '#FF8C00', '#FF4500', '#ffffff'],
      emoji: "✨"
    }
  ]

  useEffect(() => {
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
        className={`min-h-screen flex items-center justify-center ${screens[currentScreen].background} relative overflow-hidden`}
      >
        {/* Animated background patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E")',
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        <ReactConfetti
          width={width}
          height={height}
          colors={screens[currentScreen].confettiColors}
          numberOfPieces={150}
          gravity={0.25}
          wind={0}
          friction={0.99}
          initialVelocityY={10}
          recycle={true}
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
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            className="mb-12 relative"
          >
            {/* Large emoji with glow effect */}
            <motion.div
              className="text-7xl md:text-8xl mb-8 relative"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [-5, 5, -5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="absolute inset-0 blur-xl opacity-50">{screens[currentScreen].emoji}</div>
              <div className="relative">{screens[currentScreen].emoji}</div>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 relative"
              animate={{
                y: [0, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="absolute inset-0 blur-lg opacity-50 text-white">{screens[currentScreen].title}</div>
              <div className="relative">{screens[currentScreen].title}</div>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {screens[currentScreen].description}
            </motion.p>
          </motion.div>

          {screens[currentScreen].showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col md:flex-row justify-center items-center gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYesClick}
                className="px-8 py-4 bg-white text-primary-500 rounded-full text-xl font-bold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Yes! Show me 🎉
              </motion.button>

              <motion.button
                animate={{
                  x: noButtonPosition.x,
                  y: noButtonPosition.y,
                }}
                whileHover={{ scale: 1.05 }}
                onHoverStart={moveNoButton}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full text-xl font-bold hover:bg-white/30 transition-all shadow-lg"
              >
                No, thanks
              </motion.button>
            </motion.div>
          )}

          {/* Progress indicator */}
          <motion.div 
            className="absolute bottom-12 left-0 right-0 flex justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {screens.map((_, index) => (
              <motion.div
                key={index}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentScreen ? 'w-8 bg-white' : 'w-3 bg-white/30'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </motion.div>

          {/* Loading bar */}
          {currentScreen < screens.length - 1 && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white/30"
              initial={{ width: '0%', opacity: 0.5 }}
              animate={{ 
                width: '100%',
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                width: { duration: 4, ease: 'linear' },
                opacity: { duration: 2, repeat: Infinity }
              }}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
} 