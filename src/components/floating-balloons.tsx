'use client'

import { motion } from 'framer-motion'

const balloonColors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
]

const balloonShapes = [
  'rounded-full',
  'rounded-balloon-1',
  'rounded-balloon-2',
]

export function FloatingBalloons() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0.5],
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [-100, -200, -300]
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            delay: Math.random() * 15,
            ease: 'easeInOut'
          }}
        >
          {/* Balloon */}
          <div 
            className={`
              relative w-16 h-20
              ${balloonColors[Math.floor(Math.random() * balloonColors.length)]}
              ${balloonShapes[Math.floor(Math.random() * balloonShapes.length)]}
              shadow-lg
            `}
          >
            {/* String */}
            <div className="absolute bottom-0 left-1/2 w-0.5 h-12 bg-gray-300 transform -translate-x-1/2 origin-top" />
          </div>
        </motion.div>
      ))}
    </div>
  )
} 