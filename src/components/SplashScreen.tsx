import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const logoLetters = 'ravsa'.split('')

// Curved exit trajectories
const exitTrajectories = [
  { x: -700, y: -300, cp1: { x: -200, y: 100 }, cp2: { x: -400, y: -100 } }, // r
  { x: 800, y: -200, cp1: { x: 200, y: -150 }, cp2: { x: 500, y: 50 } },    // a
  { x: -500, y: 800, cp1: { x: -100, y: 200 }, cp2: { x: -300, y: 400 } },  // v
  { x: 900, y: 300, cp1: { x: 300, y: 50 }, cp2: { x: 600, y: 200 } },     // s
  { x: -800, y: 100, cp1: { x: -300, y: -100 }, cp2: { x: -500, y: 150 } }, // a
]

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Start exit sequence earlier to show the paths
    const startExitTimer = setTimeout(() => setIsExiting(true), 2500)
    // Wait for the slow 2s animation + stagger + buffer
    const timer = setTimeout(() => onComplete(), 5500)

    return () => {
      clearTimeout(startExitTimer)
      clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#1A5FFF] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      {/* Background radial glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-white/10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ filter: 'blur(100px)' }}
      />

      <div className="relative">
        {/* Drawn Routes SVG - Centered on the logo */}
        <svg 
          className="absolute inset-0 w-[2000px] h-[2000px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" 
          viewBox="0 0 2000 2000"
        >
          <g transform="translate(1000, 1000)">
            {exitTrajectories.map((tr, i) => (
              <motion.path
                key={i}
                d={`M 0 0 C ${tr.cp1.x} ${tr.cp1.y}, ${tr.cp2.x} ${tr.cp2.y}, ${tr.x} ${tr.y}`}
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeDasharray="12,12"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isExiting ? { pathLength: 1, opacity: 0.3 } : {}}
                transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
              />
            ))}
          </g>
        </svg>

        <div className="relative z-10 flex justify-center text-[80px] md:text-[130px] font-bold text-white lowercase tracking-tighter">
          {logoLetters.map((letter, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={isExiting 
                ? { 
                    opacity: 0,
                    x: exitTrajectories[i].x,
                    y: exitTrajectories[i].y,
                    rotate: i % 2 === 0 ? -30 : 30,
                    scale: 0.4,
                    filter: 'blur(12px)',
                  }
                : { opacity: 1, y: 0, filter: 'blur(0px)' }
              }
              transition={isExiting 
                ? { duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }
                : { duration: 1, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }
              }
              style={{ display: 'inline-block' }}
            >
              {letter}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
