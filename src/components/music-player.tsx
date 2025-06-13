'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface MusicPlayerProps {
  audioSrc: string
  isPlaying?: boolean
  onPlayingChange?: (isPlaying: boolean) => void
}

export function MusicPlayer({ audioSrc, isPlaying = false, onPlayingChange }: MusicPlayerProps) {
  const [isLocalPlaying, setIsLocalPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Sync with external isPlaying prop
  useEffect(() => {
    if (isPlaying !== isLocalPlaying) {
      setIsLocalPlaying(isPlaying)
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.play().catch(() => {
            // Handle autoplay restrictions
            setIsLocalPlaying(false)
            onPlayingChange?.(false)
          })
        } else {
          audioRef.current.pause()
        }
      }
    }
  }, [isPlaying, isLocalPlaying, onPlayingChange])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    const newPlayingState = !isLocalPlaying
    setIsLocalPlaying(newPlayingState)
    onPlayingChange?.(newPlayingState)
    
    if (audioRef.current) {
      if (newPlayingState) {
        audioRef.current.play().catch(() => {
          setIsLocalPlaying(false)
          onPlayingChange?.(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-40 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4"
    >
      <div className="flex items-center gap-4">
        <motion.button
          onClick={togglePlay}
          className={`
            p-4 rounded-full shadow-lg flex items-center justify-center
            ${isLocalPlaying ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white'}
            hover:scale-105 transition-all duration-200
          `}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLocalPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </motion.button>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Birthday Music
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>
      <audio ref={audioRef} src={audioSrc} loop />
    </motion.div>
  )
} 