'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage(2);
    }, 4000);

    const timer2 = setTimeout(() => {
      setStage(3);
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const quotes = [
    "Every moment with you is a gift 🎁",
    "You make the world brighter ✨",
    "Your smile lights up my day 🌟",
    "You're simply amazing 💫"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/birthday-bg.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/30" />
      <div className="text-center relative w-full max-w-4xl mx-auto px-4 z-10">
        <AnimatePresence mode="wait">
          {stage === 1 && (
            <motion.div 
              key="first"
              className="relative inline-block"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <div className="relative">
                {/* Floating emojis background */}
                <motion.div 
                  className="absolute -inset-20 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {['🎈', '✨', '🎉', '🎊', '💫'].map((emoji, index) => (
                    <motion.span
                      key={index}
                      className="absolute text-4xl"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 10, -10, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div 
                  className="text-7xl mb-8 relative z-10"
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ⭐
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold text-pink-600 dark:text-pink-300 mb-6 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 1.5,
                    delay: 0.5,
                    ease: "easeOut"
                  }}
                >
                  <span className="inline-block hover:scale-110 transition-transform">It's</span>{' '}
                  <span className="inline-block hover:scale-110 transition-transform">Your</span>{' '}
                  <span className="inline-block hover:scale-110 transition-transform">Special</span>{' '}
                  <span className="inline-block hover:scale-110 transition-transform">Day!</span>
                </motion.h1>
                
                <motion.div 
                  className="text-3xl md:text-4xl text-purple-600 dark:text-purple-300 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 1.5,
                    delay: 1,
                    ease: "easeOut"
                  }}
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    Yeye! 🎉
                  </motion.span>
                </motion.div>
              </div>

              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 dark:from-pink-800 dark:via-purple-800 dark:to-pink-800 rounded-full blur-3xl opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="second"
              className="relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Floating emojis background */}
                <motion.div 
                  className="absolute -inset-20 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {['💖', '✨', '💝', '💫', '💕'].map((emoji, index) => (
                    <motion.span
                      key={index}
                      className="absolute text-4xl"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 10, -10, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div 
                  className="text-7xl mb-8 relative z-10"
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  💝
                </motion.div>

                <motion.h2
                  className="text-5xl md:text-7xl font-bold text-pink-600 dark:text-pink-300 mb-6 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                >
                  <span className="inline-block hover:scale-110 transition-transform">To</span>{' '}
                  <span className="inline-block hover:scale-110 transition-transform">make</span>{' '}
                  <span className="inline-block hover:scale-110 transition-transform">something</span>{' '}
                  <span className="inline-block hover:scale-110 transition-transform">special</span>
                </motion.h2>

                <motion.h3
                  className="text-3xl md:text-4xl text-purple-600 dark:text-purple-300 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    for you are special to me! 💖
                  </motion.span>
                </motion.h3>
              </div>

              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 dark:from-pink-800 dark:via-purple-800 dark:to-pink-800 rounded-full blur-3xl opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="third"
              className="relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Floating emojis background */}
                <motion.div 
                  className="absolute -inset-20 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {['🎁', '🎈', '🎊', '✨', '💫'].map((emoji, index) => (
                    <motion.span
                      key={index}
                      className="absolute text-4xl"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 10, -10, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div 
                  className="text-7xl mb-8 relative z-10"
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🎁
                </motion.div>

                <motion.h2
                  className="text-5xl md:text-7xl font-bold text-pink-600 dark:text-pink-300 mb-6 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                >
                  <span className="inline-block hover:scale-110 transition-transform">Do</span>{' '}
                  <span className="inline-block hover:scale-110 transition-transform">you</span>{' '}
                  <span className="inline-block hover:scale-110 transition-transform">want</span>{' '}
                  <span className="inline-block hover:scale-110 transition-transform">to</span>{' '}
                  <span className="inline-block hover:scale-110 transition-transform">see</span>
                </motion.h2>

                <motion.h3
                  className="text-3xl md:text-4xl text-purple-600 dark:text-purple-300 mb-8 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    what I made for you? ✨
                  </motion.span>
                </motion.h3>

                <motion.div
                  className="flex gap-6 justify-center relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                >
                  <motion.button
                    className="px-8 py-3 rounded-full bg-pink-500 text-white font-bold text-xl hover:bg-pink-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setStage(4)}
                  >
                    Yes! 😊
                  </motion.button>
                  <motion.button
                    className="px-8 py-3 rounded-full bg-purple-500 text-white font-bold text-xl hover:bg-purple-600 transition-colors no-button"
                    whileHover={{ x: [0, 20, -20, 20, 0] }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      y: [0, -5, 0]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity
                    }}
                  >
                    No 😢
                  </motion.button>
                </motion.div>
              </div>

              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 dark:from-pink-800 dark:via-purple-800 dark:to-pink-800 rounded-full blur-3xl opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          )}

          {stage === 4 && (
            <motion.div
              key="fourth"
              className="relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Floating emojis background */}
                <motion.div 
                  className="absolute -inset-20 z-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {['🎂', '🎈', '🎊', '✨', '💝'].map((emoji, index) => (
                    <motion.span
                      key={index}
                      className="absolute text-4xl"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 10, -10, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div 
                  className="text-7xl mb-8 relative z-10"
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🎂
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-pink-600 dark:text-pink-300 mb-8 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5 }}
                >
                  <motion.span
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [-2, 2, -2, 2, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    Happy Birthday! 🎉
                  </motion.span>
                </motion.h1>

                <motion.div
                  className="space-y-4 relative z-10"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.3
                      }
                    }
                  }}
                >
                  {[
                    "May your day be filled with joy and laughter! 🌟",
                    "Wishing you all the happiness in the world! 💖",
                    "You deserve all the cake, love and happiness today! 🎂",
                    "Here's to another amazing year around the sun! ✨",
                    "Stay amazing and keep spreading your magic! 💫"
                  ].map((quote, index) => (
                    <motion.p
                      key={index}
                      className="text-2xl md:text-3xl text-purple-600 dark:text-purple-300"
                      variants={{
                        hidden: { opacity: 0, x: -50 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      {quote}
                    </motion.p>
                  ))}
                </motion.div>
              </div>

              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 dark:from-pink-800 dark:via-purple-800 dark:to-pink-800 rounded-full blur-3xl opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
