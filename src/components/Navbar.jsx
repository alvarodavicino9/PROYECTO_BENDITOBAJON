import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, MapPin } from 'lucide-react'
import { WA_LINK, IG_LINK, MAPS_LINK, WA_MSG_INFO, waLink } from '../data'

// Real Instagram SVG
const IgIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const LINKS = [
  { to: '/',         label: 'Inicio' },
  { to: '/menu',     label: 'Menú' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar({ cartCount, onCartOpen, cartShake }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-orange-500/20 shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <motion.img
            src="/img/logo.png" alt="Bendito Bajón"
            className="w-11 h-11 rounded-full object-cover border-2 border-orange-500"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          />
          <div className="hidden sm:block">
            <div className="font-bebas text-xl text-orange-500 tracking-wider leading-none">Bendito Bajón</div>
            <div className="text-[10px] text-white/40 font-bold tracking-[2px] uppercase">Hamburguesas · Ceres, SF</div>
          </div>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Instagram */}
          <motion.a
            href={IG_LINK} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            className="hidden md:flex w-9 h-9 rounded-full items-center justify-center text-white transition-all"
            style={{ background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366)' }}
            title="Instagram"
          >
            <IgIcon size={16} />
          </motion.a>

          {/* Maps */}
          <motion.a
            href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            className="hidden md:flex w-9 h-9 rounded-full bg-orange-500 items-center justify-center transition-all"
            title="Ubicación"
          >
            <MapPin size={16} className="text-white" />
          </motion.a>

          {/* Cart */}
          <motion.button
            onClick={onCartOpen}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            animate={cartShake ? { x: [0, -6, 6, -4, 4, 0] } : {}}
            transition={cartShake ? { duration: 0.4 } : {}}
            className="relative flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 text-sm font-black transition-colors shadow-lg shadow-orange-500/30"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Pedido</span>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-white text-orange-700 rounded-full w-5 h-5 text-xs font-black flex items-center justify-center shadow"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-white/70 hover:text-white"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black/98 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {LINKS.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      isActive ? 'bg-orange-500 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="flex gap-3 mt-3 pt-3 border-t border-white/10">
                <a href={IG_LINK} target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold text-center flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743)' }}>
                  <IgIcon size={15} /> Instagram
                </a>
                <a href={waLink(WA_MSG_INFO)} target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-green-500 text-white text-sm font-bold text-center">
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
