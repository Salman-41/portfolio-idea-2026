"use client"
import { useState, useCallback, useRef, useEffect } from 'react'

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?'

interface ScrambleOptions {
  duration?: number
  speed?: number
  characters?: string
}

export function useTextScramble(text: string, options: ScrambleOptions = {}) {
  const {
    duration = 2000,
    speed = 40,
    characters = DEFAULT_CHARS
  } = options

  const [displayText, setDisplayText] = useState(text)
  const isAnimating = useRef(false)
  const frameId = useRef<number | null>(null)
  const startTime = useRef<number>(0)

  const scramble = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true
    startTime.current = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime.current
      const progress = Math.min(elapsed / duration, 1)

      const result = text.split('').map((char, index) => {
        if (char === ' ') return ' '
        
        // As progress increases, characters near the start of the string
        // reach their final state first.
        const charProgress = (progress * text.length - index) / 1
        
        if (charProgress >= 1) {
          return char
        } else if (charProgress > 0) {
          return characters[Math.floor(Math.random() * characters.length)]
        } else {
          // Keep original or random before progress hits this index
          return characters[Math.floor(Math.random() * characters.length)]
        }
      }).join('')

      setDisplayText(result)

      if (progress < 1) {
        frameId.current = requestAnimationFrame(animate)
      } else {
        isAnimating.current = false
      }
    }

    frameId.current = requestAnimationFrame(animate)
  }, [text, duration, characters])

  useEffect(() => {
    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current)
    }
  }, [])

  return { displayText, scramble, isAnimating: isAnimating.current }
}
