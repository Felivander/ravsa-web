import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const textVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const wordVariant = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const parallaxY1 = useTransform(smoothProgress, [0, 1], [0, -80])
  const parallaxY2 = useTransform(smoothProgress, [0, 1], [0, -40])
  const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.1])

  const handleCta = (href: string) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(href, '_blank')
    }
  }

  const headlineWords = ['Potenciamos', 'tu', '|negocio|', 'con', 'las', 'mejores', 'marcas']

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative w-full min-h-[90vh] bg-[#f8fafc] bg-dots flex items-center pt-[80px] overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ scale: bgScale }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A5FFF]/5 via-transparent to-[#1A5FFF]/3" />
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[#1A5FFF] rounded-full opacity-[0.04] blur-[100px] hero-float-slow" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#1A5FFF] rounded-full opacity-[0.03] blur-[80px] hero-float" />
      </motion.div>

      <div className="container-apple relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
        {/* Left: Content */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left"
        >
          {/* Badge with shimmer */}
          <motion.div
            variants={wordVariant}
            className="inline-flex items-center gap-[8px] bg-white border border-[#e2e8f0] px-[16px] py-[8px] mb-[24px] shadow-sm rounded-lg overflow-hidden relative"
          >
            <div className="absolute inset-0 shimmer-sweep" />
            <span className="w-[8px] h-[8px] bg-[#1A5FFF] animate-pulse rounded-full relative z-10"></span>
            <span className="text-[13px] font-semibold text-[#475569] uppercase tracking-wider relative z-10">
              distribuidor oficial quilmes
            </span>
          </motion.div>

          {/* Headline word-by-word */}
          <motion.h1
            variants={textVariants}
            className="text-[56px] lg:text-[72px] font-bold text-[#1e293b] leading-[1.05] tracking-tight mb-[24px]"
          >
            {headlineWords.map((word, i) => {
              const isAccent = word.startsWith('|') && word.endsWith('|')
              const clean = isAccent ? word.slice(1, -1) : word
              return (
                <motion.span
                  key={i}
                  variants={wordVariant}
                  className={`inline-block mr-[12px] ${isAccent ? 'text-[#1A5FFF]' : ''}`}
                >
                  {clean}
                </motion.span>
              )
            })}
          </motion.h1>

          <motion.p
            variants={wordVariant}
            className="text-[19px] text-[#64748b] leading-relaxed mb-[40px] max-w-[500px] lowercase"
          >
            líder regional en la distribución de bebidas y alimentos. abastecemos más de 1700 comercios en entre ríos.
          </motion.p>

          <motion.div variants={wordVariant} className="flex flex-wrap gap-[16px]">
            <motion.button
              onClick={() => handleCta('#productos')}
              className="bg-[#1A5FFF] text-white px-[32px] py-[16px] font-medium text-[17px] hover:bg-[#154ecc] transition-all duration-300 flex items-center gap-[8px] lowercase rounded-md relative overflow-hidden group"
              whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(26,95,255,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10">ver catálogo</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
            <motion.button
              onClick={() => handleCta('https://mybees.com.ar/')}
              className="bg-white text-[#1A5FFF] border-2 border-[#1A5FFF] px-[32px] py-[16px] font-medium text-[17px] hover:bg-[#1A5FFF] hover:text-white transition-all duration-300 flex items-center gap-[8px] lowercase group rounded-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              acceder a mybees
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right: Dynamic Image Composition with parallax */}
        <div className="relative h-[600px] hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: parallaxY1 }}
            className="absolute top-0 right-[10%] w-[70%] h-[70%] overflow-hidden shadow-2xl z-20 border-4 border-white rounded-[24px]"
          >
            <motion.img
              src="/images/slider-main/bg1.jpg"
              alt="Depósito RAVSA"
              className="w-full h-full object-cover object-left"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: parallaxY2 }}
            className="absolute bottom-[5%] left-0 w-[55%] h-[55%] overflow-hidden shadow-2xl z-30 border-4 border-white rounded-[24px]"
          >
            <motion.img
              src="/images/slider-main/bg2.jpg"
              alt="Flota RAVSA"
              className="w-full h-full object-cover object-[70%_center]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
          {/* Animated glow blob */}
          <motion.div
            className="absolute top-[20%] left-[-5%] w-[120px] h-[120px] bg-[#1A5FFF] blur-[80px] opacity-30 z-10 rounded-full"
            animate={{
              x: [0, 20, 0, -20, 0],
              y: [0, -15, 0, 15, 0],
              scale: [1, 1.2, 1, 0.9, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Secondary floating blob */}
          <motion.div
            className="absolute bottom-[10%] right-[5%] w-[80px] h-[80px] bg-[#1A5FFF] blur-[60px] opacity-20 z-10 rounded-full"
            animate={{
              x: [0, -15, 0, 15, 0],
              y: [0, 20, 0, -20, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>
      </div>
    </section>
  )
}
