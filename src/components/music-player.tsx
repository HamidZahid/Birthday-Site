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
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Initialize audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      
      // Add event listeners
      const audio = audioRef.current
      audio.addEventListener('canplaythrough', () => setIsLoaded(true))
      audio.addEventListener('ended', () => {
        setIsLocalPlaying(false)
        onPlayingChange?.(false)
      })
      audio.addEventListener('error', () => {
        console.error('Audio playback error')
        setIsLocalPlaying(false)
        onPlayingChange?.(false)
      })

      return () => {
        audio.removeEventListener('canplaythrough', () => setIsLoaded(true))
        audio.removeEventListener('ended', () => {
          setIsLocalPlaying(false)
          onPlayingChange?.(false)
        })
        audio.removeEventListener('error', () => {
          setIsLocalPlaying(false)
          onPlayingChange?.(false)
        })
      }
    }
  }, [onPlayingChange])

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Sync with external isPlaying prop
  useEffect(() => {
    if (!isLoaded) return

    const audio = audioRef.current
    if (!audio) return

    if (isPlaying !== isLocalPlaying) {
      setIsLocalPlaying(isPlaying)
      
      try {
        if (isPlaying) {
          const playPromise = audio.play()
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error('Playback error:', error)
              setIsLocalPlaying(false)
              onPlayingChange?.(false)
            })
          }
        } else {
          audio.pause()
        }
      } catch (error) {
        console.error('Audio control error:', error)
        setIsLocalPlaying(false)
        onPlayingChange?.(false)
      }
    }
  }, [isPlaying, isLocalPlaying, onPlayingChange, isLoaded])

  const togglePlay = async () => {
    if (!isLoaded) return

    const audio = audioRef.current
    if (!audio) return

    const newPlayingState = !isLocalPlaying
    
    try {
      if (newPlayingState) {
        const playPromise = audio.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsLocalPlaying(true)
              onPlayingChange?.(true)
            })
            .catch((error) => {
              console.error('Playback error:', error)
              setIsLocalPlaying(false)
              onPlayingChange?.(false)
            })
        }
      } else {
        audio.pause()
        setIsLocalPlaying(false)
        onPlayingChange?.(false)
      }
    } catch (error) {
      console.error('Audio control error:', error)
      setIsLocalPlaying(false)
      onPlayingChange?.(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 z-40 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 hidden md:block"
    >
      <div className="flex items-center gap-4">
        <motion.button
          onClick={togglePlay}
          disabled={!isLoaded}
          className={`
            p-3 rounded-full shadow-lg flex items-center justify-center
            ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}
            ${isLocalPlaying ? 'bg-primary-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white'}
            hover:scale-105 transition-all duration-200
          `}
          whileHover={{ scale: isLoaded ? 1.1 : 1 }}
          whileTap={{ scale: isLoaded ? 0.95 : 1 }}
        >
          {isLocalPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
      </div>
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />
    </motion.div>
  )
} 