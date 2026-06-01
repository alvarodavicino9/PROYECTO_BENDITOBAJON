import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Store, Bike, ChevronDown, CheckCircle, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WAIT_TIME_MIN, WAIT_TIME_MAX } from '../data'

const PAYMENT_METHODS = ['Efectivo', 'Transferencia', 'Mercado Pago', 'Débito / Crédito']

// ── Confirmation screen shown after order is sent ────
function OrderConfirmed({ orderNum, onClose, onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="flex flex-col items-center justify-center h-full px-8 py-12 text-center"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
        className="w-24 h-24 rounded-full bg-green-500/15 border-2 border-green-500/40 flex items-center justify-center mb-6"
      >
        <CheckCircle size={48} className="text-green-400" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="font-bebas text-4xl text-white tracking-wide mb-2">
          ¡Pedido enviado!
        </div>
        <div className="text-orange-400 font-black text-sm tracking-widest uppercase mb-5">
          N° {orderNum}
        </div>
        <p className="text-white/50 font-semibold text-sm leading-relaxed mb-4">
          Tu pedido se envió por WhatsApp. En cuanto lo recibamos te confirmamos y coordinamos la entrega.
        </p>

        {/* Wait time estimate */}
        <div className="bg-orange-500/10 border border-orange-500/25 rounded-2xl px-5 py-4 mb-8 inline-block">
          <div className="text-orange-400 text-xs font-black tracking-widest uppercase mb-1">
            Tiempo estimado
          </div>
          <div className="font-bebas text-3xl text-white tracking-wide">
            {WAIT_TIME_MIN}–{WAIT_TIME_MAX} min
          </div>
          <div className="text-white/40 text-xs font-semibold mt-0.5">
            Una vez confirmado el pedido
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-8 text-left w-full max-w-xs mx-auto">
          {[
            { icon: '📲', text: 'Abrí WhatsApp y enviá el mensaje generado' },
            { icon: '✅', text: 'Nosotros confirmamos tu pedido' },
            { icon: '🍔', text: `Retirás o recibís en ${WAIT_TIME_MIN}–${WAIT_TIME_MAX} min` },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3"
            >
              <span className="text-lg flex-shrink-0">{step.icon}</span>
              <span className="text-white/65 text-sm font-semibold">{step.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full">
          <motion.button
            onClick={() => { onClear(); onClose() }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-2xl py-3.5 font-black text-sm transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            Hacer otro pedido
          </motion.button>
          <Link
            to="/menu"
            onClick={() => { onClear(); onClose() }}
            className="w-full bg-white/8 hover:bg-white/15 text-white/70 hover:text-white rounded-2xl py-3.5 font-black text-sm transition-colors text-center no-underline"
          >
            Volver al menú
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main CartDrawer ───────────────────────────────────
export default function CartDrawer({
  cart, open, onClose, onRemove, buildWAMessage,
  orderSent, markOrderSent, clearCart
}) {
  const [orderType, setOrderType] = useState('retiro')
  const [address, setAddress]     = useState('')
  const [name, setName]           = useState('')
  const [phone, setPhone]         = useState('')
  const [payment, setPayment]     = useState('')
  const [payOpen, setPayOpen]     = useState(false)
  const [errors, setErrors]       = useState({})
  const [sentOrderNum, setSentOrderNum] = useState('')

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name    = 'Ingresá tu nombre'
    if (!payment)     e.payment = 'Seleccioná un método de pago'
    if (orderType === 'delivery' && !address.trim()) e.address = 'Ingresá tu dirección'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const resetForm = () => {
    setOrderType('retiro')
    setAddress('')
    setName('')
    setPhone('')
    setPayment('')
    setErrors({})
    setSentOrderNum('')
  }

  const handleClear = () => {
    clearCart()
    resetForm()
  }

  const send = () => {
    if (!cart.length) return
    if (!validate())  return

    // Generate order number for confirmation screen
    const now = new Date()
    const pad = n => String(n).padStart(2, '0')
    const num = `BB-${pad(now.getDate())}${pad(now.getMonth()+1)}-${pad(now.getHours())}${pad(now.getMinutes())}`
    setSentOrderNum(num)

    const url = buildWAMessage({ orderType, address, name, phone, paymentMethod: payment })
    window.open(url, '_blank')

    // Show confirmation screen after a short delay (let WA open first)
    setTimeout(() => markOrderSent(), 400)
  }

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: open ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 35 }}
        className="fixed right-0 top-0 bottom-0 w-[440px] max-w-full bg-[#111] z-[51] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
          <div>
            <h2 className="font-bebas text-3xl text-white tracking-wide leading-none">
              {orderSent ? '¡Listo!' : 'Mi Pedido'}
            </h2>
            {!orderSent && cart.length > 0 && (
              <p className="text-white/40 text-xs font-semibold mt-0.5">
                {cart.reduce((a,i) => a+i.qty, 0)} producto{cart.reduce((a,i) => a+i.qty, 0) > 1 ? 's' : ''}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl leading-none transition-colors"
          >
            ×
          </button>
        </div>

        {/* Body — switches between cart and confirmation */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {orderSent ? (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full"
              >
                <OrderConfirmed
                  orderNum={sentOrderNum}
                  onClose={onClose}
                  onClear={handleClear}
                />
              </motion.div>
            ) : (
              <motion.div
                key="cart"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                {/* Cart items */}
                <div className="px-6 py-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 text-white/30">
                      <div className="text-6xl mb-4">🍔</div>
                      <div className="font-bold text-lg text-white/50">Tu pedido está vacío</div>
                      <div className="text-sm mt-2">Elegí una hamburguesa del menú</div>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {cart.map(item => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20, height: 0 }}
                          className="flex gap-3 py-4"
                        >
                          <img
                            src={item.product.img} alt={item.product.name}
                            className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-white/10"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-black text-sm text-white leading-tight">
                              {item.qty}× {item.product.name}
                              {item.size && item.size !== 'Unidad' && (
                                <span className="text-orange-400"> · {item.size}</span>
                              )}
                            </div>
                            {(item.extras?.length > 0 || item.removes?.length > 0 || item.notes) && (
                              <div className="text-xs text-white/35 font-semibold mt-1 leading-relaxed">
                                {item.extras?.length > 0 && <span>+{item.extras.join(', ')} </span>}
                                {item.removes?.length > 0 && <span>· {item.removes.join(', ')} </span>}
                                {item.notes && <span>· "{item.notes}"</span>}
                              </div>
                            )}
                            <button
                              onClick={() => onRemove(item.id)}
                              className="text-red-400/60 hover:text-red-400 text-xs font-black mt-2 transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form */}
                {cart.length > 0 && (
                  <div className="px-6 pb-2 space-y-4 border-t border-white/10 pt-4">

                    {/* Order type */}
                    <div>
                      <div className="text-xs text-white/40 font-black tracking-widest uppercase mb-2">
                        Tipo de pedido
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { val:'retiro',   icon:<Store size={15}/>,  label:'Retiro en local' },
                          { val:'delivery', icon:<Bike size={15}/>,   label:'Delivery' },
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

                    {/* Address */}
                    <AnimatePresence>
                      {orderType === 'delivery' && (
                        <motion.div
                          initial={{ height:0, opacity:0 }}
                          animate={{ height:'auto', opacity:1 }}
                          exit={{ height:0, opacity:0 }}
                        >
                          <label className="text-xs text-white/40 font-black tracking-widest uppercase block mb-1.5">
                            Dirección de entrega *
                          </label>
                          <input type="text" placeholder="Calle, número, barrio..."
                            value={address} onChange={e => { setAddress(e.target.value); setErrors(v=>({...v,address:null})) }}
                            className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-white text-sm font-semibold outline-none transition-colors placeholder-white/20 ${
                              errors.address ? 'border-red-500/70' : 'border-white/15 focus:border-orange-500'
                            }`}
                          />
                          {errors.address && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.address}</p>}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Name */}
                    <div>
                      <label className="text-xs text-white/40 font-black tracking-widest uppercase block mb-1.5">
                        Tu nombre *
                      </label>
                      <input type="text" placeholder="¿Cómo te llamás?"
                        value={name} onChange={e => { setName(e.target.value); setErrors(v=>({...v,name:null})) }}
                        className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-white text-sm font-semibold outline-none transition-colors placeholder-white/20 ${
                          errors.name ? 'border-red-500/70' : 'border-white/15 focus:border-orange-500'
                        }`}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1 font-semibold">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-xs text-white/40 font-black tracking-widest uppercase block mb-1.5">
                        Teléfono (opcional)
                      </label>
                      <input type="tel" placeholder="Tu número de WhatsApp"
                        value={phone} onChange={e => setPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 focus:border-orange-500 rounded-xl px-4 py-2.5 text-white text-sm font-semibold outline-none transition-colors placeholder-white/20"
                      />
                    </div>

                    {/* Payment */}
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
                              initial={{ opacity:0, y:-8, scale:0.97 }}
                              animate={{ opacity:1, y:0, scale:1 }}
                              exit={{ opacity:0, y:-8, scale:0.97 }}
                              transition={{ duration: 0.15 }}
                              className="absolute bottom-full left-0 right-0 mb-2 bg-[#1a1a1a] border border-white/15 rounded-xl overflow-hidden z-10 shadow-2xl"
                            >
                              {PAYMENT_METHODS.map(m => (
                                <button key={m}
                                  onClick={() => { setPayment(m); setPayOpen(false); setErrors(v=>({...v,payment:null})) }}
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
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Send button — only when cart has items and not yet sent */}
        {!orderSent && cart.length > 0 && (
          <div className="flex-shrink-0 px-6 pb-8 pt-4 border-t border-white/10">
            <motion.button
              onClick={send}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-2xl py-4 font-black text-base flex items-center justify-center gap-3 transition-colors"
              style={{ boxShadow: '0 8px 24px rgba(37,211,102,.35)' }}
            >
              <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enviar pedido por WhatsApp
            </motion.button>
            <p className="text-center text-white/25 text-xs font-semibold mt-3">
              Se abrirá WhatsApp con tu pedido completo
            </p>
          </div>
        )}
      </motion.div>
    </>
  )
}
