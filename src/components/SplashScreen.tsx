import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const logoLetters = 'ravsa'.split('')
const taglineLetters = 'evolución en distribución'.split('')

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [showTagline, setShowTagline] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; distance: number }>>([])

  useEffect(() => {
    // Logo finishes at ~0.3 + 4*0.1 + 0.5 = ~1.2s. Show tagline at 1.3s
    const taglineTimer = setTimeout(() => setShowTagline(true), 1300)

    // Burst particles before exit
    const burstTimer = setTimeout(() => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        angle: (i / 20) * 360,
        distance: 200 + Math.random() * 300,
      }))
      setParticles(newParticles)
    }, 3200)

    // Complete and exit
    const timer = setTimeout(() => onComplete(), 3600)

    return () => {
      clearTimeout(taglineTimer)
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
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
      }}
    >
      {/* Glow rings */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full border-2 border-white/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.5, 2], opacity: [0, 0.4, 0] }}
        transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
      />
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full border border-white/10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2, 3], opacity: [0, 0.3, 0] }}
        transition={{ duration: 2.5, ease: 'easeOut', delay: 0.8 }}
      />

      {/* Background radial pulse */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-white/10"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1, 0.8, 1.2] }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        style={{ filter: 'blur(80px)' }}
      />

      {/* Shared container — items-stretch so tagline fills logo width */}
      <div className="relative z-10 flex flex-col items-stretch">
        {/* "ravsa" — letter-by-letter, shared layout with Navbar */}
        <motion.span
          layoutId="logo"
          className="flex justify-center text-[64px] md:text-[96px] font-bold text-white lowercase tracking-tight"
          transition={{ layout: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
        >
          {logoLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)', rotateX: -90 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ display: 'inline-block' }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>

        {/* "evolución en distribución" — stretches to logo width, tight spacing */}
        {showTagline && (
          <motion.div
            className="flex mt-[-2px]"
            style={{ justifyContent: 'space-between' }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {taglineLetters.filter(l => l !== ' ').join('').split('').length && taglineLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="text-[11px] md:text-[14px] font-light text-white/70 uppercase"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: i * 0.035,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  textAlign: 'center',
                  flex: letter === ' ' ? '0 0 0.5em' : '0 0 auto',
                }}
              >
                {letter === ' ' ? '' : letter}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Burst particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-[4px] h-[4px] bg-white rounded-full"
          style={{ left: '50%', top: '50%' }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </motion.div>
  )
}
