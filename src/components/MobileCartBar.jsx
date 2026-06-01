import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

export default function MobileCartBar({ count, onOpen }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 pb-5 pt-2"
          style={{ background: 'linear-gradient(to top, rgba(10,10,10,1) 60%, transparent)' }}
        >
          <motion.button
            onClick={onOpen}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-between bg-orange-500 rounded-2xl px-5 py-4 shadow-2xl"
            style={{ boxShadow: '0 8px 32px rgba(249,115,22,.5)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <ShoppingCart size={18} className="text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-black text-sm leading-none">Ver mi pedido</div>
                <div className="text-white/70 text-xs font-semibold mt-0.5">
                  {count} producto{count > 1 ? 's' : ''} seleccionado{count > 1 ? 's' : ''}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-black text-sm">Enviar →</span>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
