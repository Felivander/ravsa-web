import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'

const jobs = [
  {
    id: 'repositor',
    title: 'repositor/a',
    location: 'concordia, entre ríos',
    status: 'open',
    href: '/repositor.html',
    desc: 'Buscamos perfiles proactivos para asegurar la correcta exhibición de nuestros productos en los puntos de venta.',
  },
  {
    id: 'supervisor',
    title: 'supervisor/a de depósito',
    location: 'concordia, entre ríos',
    status: 'closed',
    href: '/supervisordeposito.html',
    desc: 'Liderar y coordinar las tareas operativas del depósito, asegurando el cumplimiento de los estándares de calidad.',
  },
  {
    id: 'vendedor',
    title: 'vendedor/a',
    location: 'concordia, entre ríos',
    status: 'closed',
    href: '/vendedor.html',
    desc: 'Desarrollar y mantener la cartera de clientes, asesorando sobre nuestro portafolio de productos.',
  },
]

const sectionVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  },
}

export default function CultureSection() {
  const [openJobId, setOpenJobId] = useState<string | null>(jobs[0].id)

  const toggleJob = (id: string) => {
    setOpenJobId(openJobId === id ? null : id)
  }

  return (
    <section id="nosotros" className="py-[100px] bg-white border-t border-[#e2e8f0]">
      <div className="container-apple mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[80px]">
        
        {/* Left: About Us */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          <h2 className="text-[40px] md:text-[56px] font-bold text-[#1e293b] leading-tight tracking-tight mb-[24px]">
            Nuestra <span className="text-[#1A5FFF]">cultura</span>
          </h2>
          <p className="text-[19px] text-[#64748b] leading-relaxed mb-[32px]">
            Desde 1999, somos la distribuidora exclusiva de cervecería y maltería Quilmes en la región. Nos mueve la pasión por el servicio, la logística eficiente y el desarrollo de nuestra gente.
          </p>
          
          <motion.div 
            className="w-full aspect-video overflow-hidden shadow-lg mb-[32px] rounded-lg relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img 
              src="/images/slider-main/bg2.jpg" 
              alt="Equipo RAVSA" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          <motion.p 
            className="text-[17px] text-[#475569] leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Más de 40 colaboradores forman parte de este gran equipo que todos los días sale a la calle a llevar las mejores marcas a más de 1700 puntos de venta.
          </motion.p>
        </motion.div>

        {/* Right: Jobs Accordion */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
          id="busquedas"
        >
          <div className="mb-[32px]">
            <h3 className="text-[32px] font-bold text-[#1e293b] mb-[8px]">Sumáte al equipo</h3>
            <p className="text-[17px] text-[#64748b]">Conoce nuestras búsquedas laborales activas.</p>
          </div>

          <motion.div 
            className="flex flex-col gap-[16px] mb-[40px]"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {jobs.map((job) => (
              <motion.div 
                key={job.id} 
                variants={cardVariant}
                className={`border transition-all duration-300 rounded-lg ${
                  openJobId === job.id ? 'border-[#1A5FFF] bg-[#f8fafc] shadow-md' : 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1] hover:shadow-sm'
                }`}
                layout
              >
                <button 
                  onClick={() => toggleJob(job.id)}
                  className="w-full px-[24px] py-[20px] flex items-center justify-between text-left"
                >
                  <div>
                    <h4 className={`text-[19px] font-bold transition-colors duration-300 ${openJobId === job.id ? 'text-[#1A5FFF]' : 'text-[#1e293b]'}`}>
                      {job.title.charAt(0).toUpperCase() + job.title.slice(1)}
                    </h4>
                    <p className="text-[14px] text-[#64748b] mt-[4px]">{job.location.charAt(0).toUpperCase() + job.location.slice(1)}</p>
                  </div>
                  <div className="flex items-center gap-[16px]">
                    <span className={`text-[12px] font-semibold px-[10px] py-[4px] rounded-md transition-colors ${
                      job.status === 'open' ? 'bg-[#1A5FFF]/10 text-[#1A5FFF]' : 'bg-[#e2e8f0] text-[#64748b]'
                    }`}>
                      {job.status === 'open' ? 'Abierta' : 'Cerrada'}
                    </span>
                    <motion.div
                      animate={{ rotate: openJobId === job.id ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ChevronDown size={20} className="text-[#94a3b8]" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {openJobId === job.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.div 
                        className="px-[24px] pb-[24px] pt-[8px]"
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <p className="text-[16px] text-[#475569] mb-[20px]">{job.desc.charAt(0).toUpperCase() + job.desc.slice(1)}</p>
                        {job.status === 'open' ? (
                          <motion.a 
                            href={job.href}
                            className="inline-flex items-center gap-[8px] text-[#1A5FFF] font-semibold hover:text-[#154ecc] transition-colors group"
                            whileHover={{ x: 4 }}
                          >
                            Ver detalles y postularse
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </motion.a>
                        ) : (
                          <span className="text-[14px] text-[#94a3b8] italic">Búsqueda finalizada.</span>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="bg-[#1e293b] p-[32px] text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-[24px] rounded-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Subtle gradient accent */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#1A5FFF] opacity-10 blur-[80px] rounded-full" />
            <div>
              <h4 className="text-[21px] font-bold text-white mb-[8px] relative z-10">¿No encontraste tu puesto?</h4>
              <p className="text-[15px] text-[#94a3b8] relative z-10">Dejános tu cv en nuestra base de datos general.</p>
            </div>
            <motion.a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSceuhjD-SISBYf9T_N_w5rnv6uIi28eQtyDh2zZIRUgrkTubw/viewform" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#1A5FFF] text-white px-[24px] py-[12px] font-semibold text-[15px] hover:bg-[#154ecc] transition-colors whitespace-nowrap rounded-md relative z-10"
              whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(26,95,255,0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              Enviar cv
            </motion.a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
