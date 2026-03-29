import { motion } from 'framer-motion'

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}>
      <motion.div
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
          rotate: [0, 45, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(46, 200, 120, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          borderRadius: '50%',
        }}
      />
      
      <motion.div
        animate={{
          y: [0, 60, 0],
          x: [0, -40, 0],
          rotate: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(224, 193, 132, 0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
        }}
      />
      
      <motion.div
        animate={{
          y: [0, -40, 0],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        style={{
          position: 'absolute',
          top: '40%',
          left: '40%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(82, 142, 255, 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
          borderRadius: '50%',
        }}
      />
    </div>
  )
}
