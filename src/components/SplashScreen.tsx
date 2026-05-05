import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const logoLetters = 'ravsa'.split('')

// Individual routes for each letter (entry/exit paths)
const letterRoutes = [
  { start: { x: -200, y: -150 }, mid: { x: -50, y: 50 }, end: { x: 0, y: 0 } }, // r
  { start: { x: 300, y: -100 }, mid: { x: 100, y: -20 }, end: { x: 0, y: 0 } }, // a
  { start: { x: -150, y: 250 }, mid: { x: -80, y: 100 }, end: { x: 0, y: 0 } }, // v
  { start: { x: 250, y: 200 }, mid: { x: 150, y: 50 }, end: { x: 0, y: 0 } },  // s
  { start: { x: -300, y: 0 }, mid: { x: -150, y: -50 }, end: { x: 0, y: 0 } }, // a
]

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; distance: number }>>([])

  useEffect(() => {
    // Burst particles before exit
    const burstTimer = setTimeout(() => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        angle: (i / 20) * 360,
        distance: 250 + Math.random() * 300,
      }))
      setParticles(newParticles)
    }, 2800)

    // Complete and exit
    const timer = setTimeout(() => onComplete(), 3200)

    return () => {
      clearTimeout(burstTimer)
      clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#1A5FFF] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
      }}
    >
      {/* Decorative Distribution Paths (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M -100 -100 L 200 300 L 500 -50"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "linear" }}
        />
        <motion.path
          d="M 1200 800 L 800 400 L 1000 100"
          stroke="white"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "linear", delay: 0.5 }}
        />
      </svg>

      {/* Background radial pulse */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-white/10"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 0.9, 1.4] }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        style={{ filter: 'blur(100px)' }}
      />

      <div className="relative z-10">
        <div className="flex justify-center text-[72px] md:text-[120px] font-bold text-white lowercase tracking-tight">
          {logoLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ 
                opacity: 0, 
                x: letterRoutes[i].start.x, 
                y: letterRoutes[i].start.y,
                filter: 'blur(10px)',
                scale: 0.5
              }}
              animate={{ 
                opacity: 1, 
                x: [letterRoutes[i].start.x, letterRoutes[i].mid.x, 0],
                y: [letterRoutes[i].start.y, letterRoutes[i].mid.y, 0],
                filter: 'blur(0px)',
                scale: 1
              }}
              exit={{
                opacity: 0,
                x: -letterRoutes[i].start.x * 1.5,
                y: -letterRoutes[i].start.y * 1.5,
                filter: 'blur(12px)',
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ display: 'inline-block' }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Burst particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-[4px] h-[4px] bg-white rounded-full shadow-[0_0_10px_white]"
          style={{ left: '50%', top: '50%' }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  )
}
