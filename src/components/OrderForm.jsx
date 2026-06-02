import { AnimatePresence, motion } from 'framer-motion'
import { Store, Bike, ChevronDown } from 'lucide-react'

const PAYMENT_METHODS = ['Efectivo', 'Transferencia', 'Mercado Pago', 'Débito / Crédito']

export default function OrderForm({
  orderType, setOrderType,
  address, setAddress,
  name, setName,
  phone, setPhone,
  payment, setPayment,
  payOpen, setPayOpen,
  orderNote, setOrderNote,
  errors, setErrors,
}) {
  return (
    <div className="px-6 pb-2 space-y-4 border-t border-white/10 pt-4">

      {/* Tipo de pedido */}
      <div>
        <div className="text-xs text-white/40 font-black tracking-widest uppercase mb-2">
          Tipo de pedido
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { val: 'retiro',   icon: <Store size={15} />, label: 'Retiro en local' },
            { val: 'delivery', icon: <Bike  size={15} />, label: 'Delivery' },
          ].map(opt => (
            <button key={opt.val} onClick={() => setOrderType(opt.val)}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs font-black transition-all ${
                orderType === opt.val
                  ? 'border-orange-500 bg-orange-500/15 text-orange-400'
                  : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white/80'
              }`}>
              {opt.icon} {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dirección — solo delivery */}
      <AnimatePresence>
        {orderType === 'delivery' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <label className="text-xs text-white/40 font-black tracking-widest uppercase block mb-1.5">
              Dirección de entrega *
            </label>
            <input type="text" placeholder="Calle, número, barrio..."
              value={address}
              onChange={e => { setAddress(e.target.value); setErrors(v => ({ ...v, address: null })) }}
              className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-white text-sm font-semibold outline-none transition-colors placeholder-white/20 ${
                errors.address ? 'border-red-500/70' : 'border-white/15 focus:border-orange-500'
              }`}
            />
            {errors.address && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.address}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nombre */}
      <div>
        <label className="text-xs text-white/40 font-black tracking-widest uppercase block mb-1.5">
          Tu nombre *
        </label>
        <input type="text" placeholder="¿Cómo te llamás?"
          value={name}
          onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: null })) }}
          className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-white text-sm font-semibold outline-none transition-colors placeholder-white/20 ${
            errors.name ? 'border-red-500/70' : 'border-white/15 focus:border-orange-500'
          }`}
        />
        {errors.name && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.name}</p>}
      </div>

      {/* Teléfono */}
      <div>
        <label className="text-xs text-white/40 font-black tracking-widest uppercase block mb-1.5">
          Teléfono (opcional)
        </label>
        <input type="tel" placeholder="Tu número de WhatsApp"
          value={phone} onChange={e => setPhone(e.target.value)}
          className="w-full bg-white/5 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-semibold outline-none transition-colors placeholder-white/20"
        />
      </div>

      {/* Método de pago */}
      <div>
        <label className="text-xs text-white/40 font-black tracking-widest uppercase block mb-1.5">
          Método de pago *
        </label>
        <div className="relative">
          <button
            onClick={() => setPayOpen(v => !v)}
            className={`w-full flex items-center justify-between bg-white/5 border rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              errors.payment ? 'border-red-500/70' : 'border-white/15 hover:border-orange-500/50'
            }`}
          >
            <span className={payment ? 'text-white' : 'text-white/25'}>
              {payment || 'Seleccioná un método...'}
            </span>
            <ChevronDown size={15} className={`text-white/40 transition-transform ${payOpen ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {payOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-0 right-0 mb-2 bg-[#1a1a1a] border border-white/15 rounded-xl overflow-hidden z-10 shadow-2xl"
              >
                {PAYMENT_METHODS.map(m => (
                  <button key={m}
                    onClick={() => { setPayment(m); setPayOpen(false); setErrors(v => ({ ...v, payment: null })) }}
                    className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors hover:bg-orange-500/15 hover:text-orange-400 ${
                      payment === m ? 'text-orange-400 bg-orange-500/10' : 'text-white/70'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {errors.payment && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.payment}</p>}
      </div>

      {/* Nota general del pedido */}
      <div>
        <label className="text-xs text-white/40 font-black tracking-widest uppercase block mb-1.5">
          Nota para el local (opcional)
        </label>
        <textarea
          value={orderNote} onChange={e => setOrderNote(e.target.value)}
          placeholder='Ej: timbre no funciona, dejar en portería, es para cumpleaños...'
          className="w-full bg-white/5 border border-white/10 focus:border-orange-500 rounded-xl px-4 py-3 text-white text-sm font-semibold resize-none h-16 outline-none transition-colors placeholder-white/20"
        />
      </div>

    </div>
  )
}
