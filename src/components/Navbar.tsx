import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'inicio', href: '#inicio' },
  { label: 'nosotros', href: '#nosotros' },
  { label: 'productos', href: '#productos' },
  { label: 'trabajo', href: '#busquedas' },
  { label: 'contacto', href: '#contacto' },
]

export default function Navbar({ isHidden }: { isHidden?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[60] h-[64px] transition-all duration-300 ${scrolled ? 'bg-[#1A5FFF]/95 backdrop-blur-md shadow-md' : 'bg-[#1A5FFF]'} flex items-center justify-center`}
        style={{ opacity: isHidden ? 0 : 1 }}
      >
        <div className="w-full max-w-[1200px] px-[24px] flex items-center justify-between">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); handleNav('#inicio'); }} className="flex items-center hover:opacity-80 transition-opacity">
            <motion.span 
              layoutId="logo"
              className="text-[24px] font-bold tracking-tight text-white lowercase"
            >
              ravsa
            </motion.span>
          </a>
          
          <div className="hidden md:flex items-center gap-[32px]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                className="text-[15px] font-medium text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}

          </div>

          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white hover:text-white/80 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-md md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[80%] max-w-[400px] bg-[#1A5FFF] shadow-2xl flex flex-col p-[32px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-[8px] mt-[64px]">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    className="text-[32px] font-bold text-white py-[12px] lowercase tracking-tight border-b border-white/10"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              
              <motion.div 
                className="mt-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-white/60 text-[14px] mb-[16px] lowercase">evolución en distribución</p>
                <a 
                  href="#contacto" 
                  onClick={(e) => { e.preventDefault(); handleNav('#contacto'); }} 
                  className="block w-full text-center py-[18px] bg-white text-[#1A5FFF] font-bold text-[18px] rounded-xl shadow-lg hover:bg-white/90 transition-colors lowercase"
                >
                  contactanos
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
