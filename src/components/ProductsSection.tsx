import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const categories = [
  { id: 'bebidas', label: 'sin alcohol', desc: 'gaseosas, aguas, jugos e isotónicas.', img: '/images/productos/bebidas.jpg' },
  { id: 'cervezas', label: 'cervezas', desc: 'marcas nacionales, premium e importadas.', img: '/images/productos/cervezas.jpg' },
  { id: 'vinos', label: 'vinos', desc: 'bodega dante robino, espumantes y sidras.', img: '/images/productos/vinos.jpg' },
  { id: 'energizantes', label: 'energizantes', desc: 'red bull, rockstar y más opciones.', img: '/images/productos/energizantes.jpg' },
  { id: 'almacen', label: 'almacén', desc: 'leches, yerbas, snacks y esenciales.', img: '/images/productos/almacen.jpg' },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState(categories[0].id)
  const activeCategory = categories.find(c => c.id === activeTab) || categories[0]

  return (
    <section id="productos" className="py-[80px] md:py-[120px] bg-white">
      <div className="container-apple mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row justify-between items-center md:items-end mb-[40px] md:mb-[60px] text-center md:text-left gap-[24px]"
        >
          <div>
            <h2 className="typography-display-lg text-[#1e293b] mb-[16px]">
              Nuestro <span className="text-[#1A5FFF]">portafolio</span>
            </h2>
            <p className="typography-lead text-[#64748b] max-w-[600px] lowercase">
              Explorá nuestro catálogo completo con más de 300 productos líderes del mercado.
            </p>
          </div>
          <motion.a 
            href="/Catalogo_Productos_RAVSA_2026.pdf" 
            target="_blank" 
            className="flex items-center gap-[8px] text-[#1A5FFF] font-semibold text-[17px] hover:text-[#154ecc] transition-colors group lowercase"
            whileHover={{ x: 4 }}
          >
            Descargar catálogo completo
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px] lg:gap-[80px]">
          {/* Tabs Menu */}
          <motion.div 
            className="lg:col-span-4 flex flex-row lg:flex-col gap-[10px] overflow-x-auto pb-[12px] lg:pb-0 scrollbar-hide relative px-[24px] lg:px-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                variants={itemVariant}
                onClick={() => setActiveTab(cat.id)}
                className={`flex-shrink-0 text-left px-[20px] lg:px-[24px] py-[12px] lg:py-[20px] border transition-all duration-300 rounded-full lg:rounded-2xl relative overflow-hidden ${
                  activeTab === cat.id 
                    ? 'bg-[#1A5FFF] border-[#1A5FFF] text-white shadow-lg shadow-blue-500/25' 
                    : 'bg-[#f8fafc] border-[#e2e8f0] text-[#475569] hover:bg-[#e2e8f0]'
                }`}
                whileHover={{ scale: activeTab === cat.id ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active indicator bar - Desktop only */}
                {activeTab === cat.id && (
                  <motion.div
                    layoutId="tab-active-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[4px] bg-white rounded-r-full hidden lg:block"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <h3 className={`text-[17px] lg:text-[21px] font-bold ${activeTab === cat.id ? 'text-white' : 'text-[#1e293b]'} lowercase`}>
                  {cat.label}
                </h3>
                <p className={`text-[15px] hidden lg:block mt-[4px] ${activeTab === cat.id ? 'text-white/80' : 'text-[#64748b]'} lowercase`}>
                  {cat.desc}
                </p>
              </motion.button>
            ))}
          </motion.div>

          {/* Image Display */}
          <div className="lg:col-span-8 relative h-[350px] lg:h-[600px] overflow-hidden bg-[#f1f5f9] shadow-2xl rounded-[32px] lg:rounded-3xl mx-[24px] lg:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={activeCategory.img} 
                  alt={activeCategory.label} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                <div className="absolute bottom-[24px] left-[24px] right-[24px] lg:hidden text-white">
                   <h3 className="text-[24px] font-bold lowercase">{activeCategory.label}</h3>
                   <p className="text-[15px] text-white/90 lowercase">{activeCategory.desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="absolute bottom-[24px] right-[24px] hidden lg:flex gap-[8px] z-10">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`h-[6px] rounded-full transition-colors ${
                    activeTab === cat.id ? 'bg-white' : 'bg-white/40'
                  }`}
                  animate={{ width: activeTab === cat.id ? 32 : 6 }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
