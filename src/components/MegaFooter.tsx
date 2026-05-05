import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  message: string
}

const links = [
  { label: 'inicio', href: '#inicio' },
  { label: 'nosotros', href: '#nosotros' },
  { label: 'productos', href: '#productos' },
  { label: 'trabajo', href: '#busquedas' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  },
}

export default function MegaFooter() {
  const { register, handleSubmit, formState: { isSubmitting, isSubmitSuccessful }, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    console.log(data)
    reset()
  }

  return (
    <footer id="contacto" className="bg-[#1e293b] text-white pt-[100px] pb-[40px] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#1A5FFF] opacity-[0.06] blur-[120px] rounded-full" />
      <div className="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] bg-[#1A5FFF] opacity-[0.04] blur-[100px] rounded-full" />

      <div className="container-apple mx-auto relative z-10">
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-[80px] mb-[80px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          
          {/* Left: Info & Links */}
          <motion.div variants={itemVariant} className="lg:col-span-5 flex flex-col">
            <motion.h2 
              className="text-[32px] font-bold text-white mb-[24px] tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Ravsa
            </motion.h2>
            <p className="text-[17px] text-[#94a3b8] mb-[48px] max-w-[400px] leading-relaxed">
              Distribuidora exclusiva de Cervecería y Maltería Quilmes en Entre Ríos. Líderes en logística y comercialización desde 1999.
            </p>
            
            <div className="grid grid-cols-2 gap-[40px]">
              <div>
                <h3 className="text-[15px] font-semibold text-white mb-[16px] uppercase tracking-wider">Secciones</h3>
                <ul className="flex flex-col gap-[12px]">
                  {links.map((link, i) => (
                    <motion.li 
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                    >
                      <a href={link.href} className="text-[16px] text-[#94a3b8] hover:text-[#1A5FFF] transition-colors duration-300">
                        {link.label.charAt(0).toUpperCase() + link.label.slice(1)}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-[15px] font-semibold text-white mb-[16px] uppercase tracking-wider">Contacto</h3>
                <ul className="flex flex-col gap-[12px]">
                  <li className="text-[16px] text-[#94a3b8]">345 422-0400</li>
                  <li className="text-[16px] text-[#94a3b8]">Concordia, Entre Ríos</li>
                  <li className="text-[16px] text-[#94a3b8] mt-[8px]">
                    <a href="mailto:info@ravsa.com.ar" className="text-[#1A5FFF] hover:text-white transition-colors duration-300">info@ravsa.com.ar</a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div 
            variants={itemVariant}
            className="lg:col-span-7 bg-white/5 border border-white/10 p-[40px] md:p-[48px] rounded-2xl relative overflow-hidden"
          >
            {/* Subtle form glow */}
            <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-[#1A5FFF] opacity-[0.08] blur-[80px] rounded-full" />
            
            <h3 className="text-[28px] font-bold text-white mb-[8px] relative z-10">Escribinos</h3>
            <p className="text-[16px] text-[#94a3b8] mb-[32px] relative z-10">¿Querés comercializar nuestros productos? Dejanos tu mensaje.</p>
            
            {isSubmitSuccessful ? (
              <motion.div 
                className="bg-[#1A5FFF]/20 border border-[#1A5FFF]/30 p-[32px] text-center rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <h4 className="text-[20px] font-bold text-white mb-[8px]">¡Mensaje enviado!</h4>
                <p className="text-[16px] text-[#94a3b8]">Te responderemos a la brevedad.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[20px] relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="text-[14px] text-[#94a3b8] mb-[8px] block">Nombre y apellido</label>
                    <input 
                      {...register('name', { required: true })}
                      className="w-full bg-white/5 border border-white/10 p-[16px] text-white placeholder:text-[#64748b] outline-none focus:border-[#1A5FFF] focus:bg-white/10 focus:shadow-[0_0_20px_rgba(26,95,255,0.15)] transition-all duration-300 rounded-lg"
                      placeholder="Tu nombre"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="text-[14px] text-[#94a3b8] mb-[8px] block">Email</label>
                    <input 
                      type="email"
                      {...register('email', { required: true })}
                      className="w-full bg-white/5 border border-white/10 p-[16px] text-white placeholder:text-[#64748b] outline-none focus:border-[#1A5FFF] focus:bg-white/10 focus:shadow-[0_0_20px_rgba(26,95,255,0.15)] transition-all duration-300 rounded-lg"
                      placeholder="Tu@email.com"
                    />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="text-[14px] text-[#94a3b8] mb-[8px] block">Mensaje</label>
                  <textarea 
                    {...register('message', { required: true })}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 p-[16px] text-white placeholder:text-[#64748b] outline-none focus:border-[#1A5FFF] focus:bg-white/10 focus:shadow-[0_0_20px_rgba(26,95,255,0.15)] transition-all duration-300 resize-none rounded-lg"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </motion.div>
                <motion.button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#1A5FFF] text-white px-[32px] py-[16px] font-semibold text-[17px] hover:bg-[#154ecc] transition-all duration-300 mt-[12px] w-full md:w-auto md:self-end rounded-lg"
                  whileHover={{ scale: 1.03, boxShadow: '0 6px 24px rgba(26,95,255,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </motion.button>
              </form>
            )}
          </motion.div>
          
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-white/10 pt-[32px] flex flex-col md:flex-row justify-between items-center gap-[20px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-[14px] text-[#64748b]">
            Copyright © {new Date().getFullYear()} Ravsa. Todos los derechos reservados.
          </p>
          <div className="flex gap-[24px]">
            <a href="#" className="text-[14px] text-[#64748b] hover:text-white transition-colors duration-300">Privacidad</a>
            <a href="#" className="text-[14px] text-[#64748b] hover:text-white transition-colors duration-300">Términos</a>
          </div>
        </motion.div>
        
      </div>
    </footer>
  )
}
