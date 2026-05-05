import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const num = parseInt(target.replace(/\D/g, ''))
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const increment = num / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= num) {
        setCount(num)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, num])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { count: 1700, suffix: '+', label: 'Clientes' },
  { count: 47, suffix: '', label: 'Colaboradores' },
  { count: 25, suffix: '', label: 'Años de exp.' },
]

const suppliers = [
  { name: 'Quilmes', logo: '/images/clients/client1.png' },
  { name: 'AB InBev', logo: '/images/clients/client2.png' },
  { name: 'PepsiCo', logo: '/images/clients/client3.png' },
  { name: 'Red Bull', logo: '/images/clients/client4.png' },
  { name: 'Nestlé', logo: '/images/clients/client5.png' },
]

// Double the list for seamless marquee
const marqueeSuppliers = [...suppliers, ...suppliers, ...suppliers]

export default function TrustBar() {
  return (
    <section className="bg-[#f1f5f9] w-full py-[60px] md:py-[40px] overflow-hidden" style={{ boxShadow: 'inset 0 8px 12px -8px rgba(0,0,0,0.08), inset 0 -8px 12px -8px rgba(0,0,0,0.08)' }}>
      <div className="container-apple mx-auto flex flex-col md:flex-row items-center justify-between gap-[40px]">
        
        {/* Stats with animated counters */}
        {/* Stats with animated counters */}
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-[16px] md:gap-[40px] text-[#1e293b] w-full lg:w-auto">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center md:items-start bg-white/50 backdrop-blur-sm border border-white/50 px-[24px] py-[16px] rounded-2xl shadow-sm min-w-[140px]"
            >
              <span className="text-[28px] md:text-[32px] font-bold leading-none tracking-tight text-[#1A5FFF]">
                <AnimatedCounter target={String(stat.count)} suffix={stat.suffix} />
              </span>
              <motion.span 
                className="text-[13px] font-medium text-[#64748b] uppercase tracking-wider mt-[4px]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                {stat.label}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div 
          className="hidden md:block w-[1px] h-[60px] bg-[#e2e8f0]"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        {/* Infinite marquee logos */}
        <div className="relative overflow-hidden flex-1 max-w-[500px]">
          <div className="absolute left-0 top-0 bottom-0 w-[40px] bg-gradient-to-r from-[#f1f5f9] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-[40px] bg-gradient-to-l from-[#f1f5f9] to-transparent z-10 pointer-events-none" />
          <div className="marquee-track flex items-center gap-[40px]">
            {marqueeSuppliers.map((s, i) => (
              <img 
                key={i}
                src={s.logo} 
                alt={s.name} 
                className="h-[35px] md:h-[45px] w-auto object-contain opacity-90 flex-shrink-0 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
