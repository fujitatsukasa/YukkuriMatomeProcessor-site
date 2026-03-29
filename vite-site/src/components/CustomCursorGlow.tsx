import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursorGlow() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Smooth out the movement using spring physics
  const springConfig = { damping: 25, stiffness: 200 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 200) // 200 is half the width/height of the glow
      cursorY.set(e.clientY - 200)
    }
    
    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(46, 200, 120, 0.15) 0%, rgba(224, 193, 132, 0.05) 40%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 9999,
        x: smoothX,
        y: smoothY,
        mixBlendMode: 'screen',
      }}
    />
  )
}
