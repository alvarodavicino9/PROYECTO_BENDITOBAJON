import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { WA_LINK, WA_MSG_INFO, waLink } from '../data'

const WaIcon = () => (
  <svg width="26" height="26" fill="white" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function WhatsAppFloat({ cartCount = 0, onCartOpen }) {
  const [tooltip, setTooltip] = useState(false)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const hasCart = cartCount > 0

  useEffect(() => {
    // Show after 1s
    const t = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(t)
  }, [])

  // Auto-show tooltip once on load after 3s, hide after 5s
  useEffect(() => {
    const t1 = setTimeout(() => setTooltip(true), 3500)
    const t2 = setTimeout(() => setTooltip(false), 7000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const handleClick = () => {
    if (hasCart) {
      // Has items → open cart drawer
      onCartOpen()
    } else if (location.pathname !== '/menu') {
      // No items, not on menu → go to menu
      navigate('/menu')
    } else {
      // On menu, no items → open WhatsApp
      window.open(waLink(WA_MSG_INFO), '_blank')
    }
  }

  const tooltipText = hasCart
    ? `${cartCount} item${cartCount > 1 ? 's' : ''} en tu pedido`
    : location.pathname === '/menu'
    ? '¡Hacé tu pedido por WA!'
    : 'Ver el menú completo'

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, x: 16, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="relative pointer-events-auto cursor-pointer"
            onClick={handleClick}
          >
            <div className={`rounded-2xl px-4 py-2.5 shadow-2xl whitespace-nowrap ${
              hasCart ? 'bg-orange-500 text-white' : 'bg-white text-gray-900'
            }`}>
              <div className={`font-black text-sm ${hasCart ? 'text-white' : 'text-gray-900'}`}>
                {tooltipText}
              </div>
              {!hasCart && (
                <div className="text-xs text-gray-400 font-semibold">Respondemos rápido 🍔</div>
              )}
            </div>
            {/* Arrow pointing right */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2"
              style={{
                width: 0, height: 0,
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderLeft: `8px solid ${hasCart ? '#F97316' : 'white'}`
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleClick}
            onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
            className="pointer-events-auto relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors"
            style={{
              background: hasCart ? '#F97316' : '#25D366',
              boxShadow: hasCart
                ? '0 8px 32px rgba(249,115,22,.55)'
                : '0 8px 32px rgba(37,211,102,.55)'
            }}
          >
            {/* Pulse ring */}
            <span
              className="absolute inset-0 rounded-full opacity-30 animate-ping"
              style={{ background: hasCart ? '#F97316' : '#25D366' }}
            />

            {/* Icon: cart if items, WA if not */}
            <AnimatePresence mode="wait">
              {hasCart ? (
                <motion.div key="cart"
                  initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                  <ShoppingCart size={24} className="text-white" />
                </motion.div>
              ) : (
                <motion.div key="wa"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  exit={{ scale: 0 }} transition={{ duration: 0.2 }}>
                  <WaIcon />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cart badge */}
            <AnimatePresence>
              {hasCart && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 bg-white text-orange-600 rounded-full w-5 h-5 text-xs font-black flex items-center justify-center shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
