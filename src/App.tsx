import { useState, lazy, Suspense } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import SplashScreen from './components/SplashScreen'

const ProductsSection = lazy(() => import('./components/ProductsSection'))
const BeesSection = lazy(() => import('./components/BeesSection'))
const CultureSection = lazy(() => import('./components/CultureSection'))
const MegaFooter = lazy(() => import('./components/MegaFooter'))

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <LayoutGroup>
      <AnimatePresence>
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <Navbar isHidden={loading} />
      {!loading && (
        <>
          <main>
            <Hero />
            <TrustBar />
            <Suspense fallback={<div className="h-[200px] flex items-center justify-center text-[#1A5FFF]">cargando...</div>}>
              <ProductsSection />
              <BeesSection />
              <CultureSection />
            </Suspense>
          </main>
          <Suspense fallback={<div className="h-[100px] bg-[#1e293b]"></div>}>
            <MegaFooter />
          </Suspense>
        </>
      )}
    </LayoutGroup>
  )
}
