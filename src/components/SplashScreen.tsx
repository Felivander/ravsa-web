import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const logoLetters = 'ravsa'.split('')

// Curved exit routes for each letter
const exitRoutes = [
  { x: [0, -120, -400, -800], y: [0, 80, -150, -300], rotate: -15 }, // r
  { x: [0, 150, 350, 800], y: [0, -100, -50, -200], rotate: 25 },   // a
  { x: [0, -80, -200, -500], y: [0, 150, 300, 700], rotate: -10 },  // v
  { x: [0, 200, 450, 900], y: [0, 100, 250, 150], rotate: 20 },    // s
  { x: [0, -150, -450, -900], y: [0, -50, -150, 50], rotate: -30 }, // a
]

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; distance: number }>>([])

  useEffect(() => {
    // Burst particles right before exit
    const burstTimer = setTimeout(() => {
      const newParticles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        angle: (i / 25) * 360,
        distance: 300 + Math.random() * 400,
      }))
      setParticles(newParticles)
    }, 2400)

    // Complete and exit
    const timer = setTimeout(() => onComplete(), 3000)

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
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 },
      }}
    >
      {/* Background radial glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-white/10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.2, 1], opacity: [0, 1, 0.8] }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ filter: 'blur(120px)' }}
      />

      {/* Decorative Floating Lines (Animated Curves) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <motion.path
          d="M -100 200 C 200 100, 400 600, 1100 400"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeDasharray="10,10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M 1100 800 C 800 900, 600 400, -100 500"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeDasharray="10,10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>

      <div className="relative z-10">
        <div className="flex justify-center text-[80px] md:text-[130px] font-bold text-white lowercase tracking-tighter">
          {logoLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ 
                opacity: 0, 
                y: 20,
                filter: 'blur(15px)',
                scale: 0.8
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                filter: 'blur(0px)',
                scale: 1
              }}
              exit={{
                opacity: 0,
                x: exitRoutes[i].x,
                y: exitRoutes[i].y,
                rotate: exitRoutes[i].rotate,
                filter: 'blur(10px)',
                scale: 0.7,
                transition: { 
                  duration: 1.2, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.05
                }
              }}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.1,
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
          className="absolute w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_12px_white]"
          style={{ left: '50%', top: '50%' }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  )
}
