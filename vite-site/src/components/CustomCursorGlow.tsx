import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const shouldShowCursorGlow = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function CustomCursorGlow() {
  const [enabled, setEnabled] = useState(shouldShowCursorGlow)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Smooth out the movement using spring physics
  const springConfig = { damping: 32, stiffness: 145 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateEnabled = () => setEnabled(shouldShowCursorGlow())

    pointerQuery.addEventListener('change', updateEnabled)
    reducedMotionQuery.addEventListener('change', updateEnabled)
    return () => {
      pointerQuery.removeEventListener('change', updateEnabled)
      reducedMotionQuery.removeEventListener('change', updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 200) // 200 is half the width/height of the glow
      cursorY.set(e.clientY - 200)
    }
    
    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY, enabled])

  if (!enabled) {
    return null
  }

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(46, 200, 120, 0.07) 0%, rgba(224, 193, 132, 0.025) 42%, transparent 72%)',
        filter: 'blur(56px)',
        pointerEvents: 'none',
        zIndex: 12,
        x: smoothX,
        y: smoothY,
        mixBlendMode: 'soft-light',
      }}
    />
  )
}
