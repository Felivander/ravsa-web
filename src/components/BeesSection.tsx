import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const features = [
  'realizá pedidos las 24 horas, los 7 días de la semana.',
  'accedé a promociones y descuentos exclusivos.',
  'acumulá puntos y canjealos por recompensas.',
  'seguimiento de pedidos en tiempo real.',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function BeesSection() {
  return (
    <section className="py-[100px] bg-[#f8fafc] overflow-hidden">
      <div className="container-apple mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center">
        
        {/* Left: Text & Features */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col text-left"
        >
          <motion.div 
            className="inline-block bg-[#1A5FFF]/10 text-[#1A5FFF] px-[16px] py-[8px] mb-[24px] w-max font-bold text-[14px] uppercase tracking-wider rounded-md"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            plataforma b2b
          </motion.div>
          
          <h2 className="text-[40px] md:text-[56px] font-bold text-[#1e293b] leading-tight tracking-tight mb-[24px]">
            Todo tu negocio en <br/><span className="text-[#1A5FFF]">una sola app</span>
          </h2>
          
          <p className="text-[19px] text-[#64748b] leading-relaxed mb-[40px]">
            Descubrí mybees, la plataforma digital de cervecería y maltería quilmes diseñada para facilitarte la vida. Comprá más rápido y simple.
          </p>

          <motion.ul 
            className="flex flex-col gap-[16px] mb-[48px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {features.map((feature, i) => (
              <motion.li 
                key={i} 
                className="flex items-start gap-[12px]"
                variants={itemVariant}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.12, type: 'spring', stiffness: 300 }}
                >
                  <CheckCircle2 className="text-[#1A5FFF] flex-shrink-0 mt-[4px]" size={20} />
                </motion.div>
                <span className="text-[17px] text-[#475569]">{feature.charAt(0).toUpperCase() + feature.slice(1)}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div 
            className="flex flex-wrap gap-[16px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.a 
              href="https://mybees.com.ar/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#1A5FFF] text-white px-[32px] py-[16px] font-medium text-[17px] hover:bg-[#154ecc] hover:shadow-lg transition-all duration-300 rounded-md"
              whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(26,95,255,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              Ingresar a mybees
            </motion.a>
            <motion.a 
              href="/pasoapaso_bees.pdf" 
              target="_blank" 
              className="bg-white text-[#1A5FFF] border border-[#e2e8f0] px-[32px] py-[16px] font-medium text-[17px] hover:bg-[#f1f5f9] transition-all duration-300 flex items-center gap-[8px] group rounded-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Ver paso a paso
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right: Floating Mobile Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Decorative background blobs */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#1A5FFF] blur-[120px] opacity-20 rounded-full"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Mobile frame with float */}
          <motion.div 
            className="relative w-[300px] md:w-[340px] h-[600px] md:h-[680px] bg-black border-[8px] border-[#1e293b] shadow-2xl overflow-hidden z-10 rounded-[32px]"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[24px] bg-[#1e293b] z-20 rounded-b-2xl" />
            
            <video 
              src="/club_bees.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none z-10" />
          </motion.div>

          {/* Floating accent dots */}
          <motion.div
            className="absolute top-[10%] right-[10%] w-[10px] h-[10px] bg-[#1A5FFF] rounded-full z-20"
            animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[20%] left-[15%] w-[6px] h-[6px] bg-[#1A5FFF] rounded-full z-20"
            animate={{ y: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </motion.div>
      </div>
    </section>
  )
}
