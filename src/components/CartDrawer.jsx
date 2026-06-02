import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { CheckCircle, ShoppingBag, Trash2, Pencil, Eye, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WAIT_TIME_MIN, WAIT_TIME_MAX } from '../data'
import OrderForm from './OrderForm'

// ── Pantalla de confirmación post-envío ─────────────────
function OrderConfirmed({ orderNum, onClose, onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="flex flex-col items-center justify-center h-full px-8 py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
        className="w-24 h-24 rounded-full bg-green-500/15 border-2 border-green-500/40 flex items-center justify-center mb-6"
      >
        <CheckCircle size={48} className="text-green-400" strokeWidth={1.5} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="font-bebas text-4xl text-white tracking-wide mb-2">¡Pedido enviado!</div>
        <div className="text-orange-400 font-black text-sm tracking-widest uppercase mb-5">N° {orderNum}</div>
        <p className="text-white/50 font-semibold text-sm leading-relaxed mb-4">
          Tu pedido se envió por WhatsApp. En cuanto lo recibamos te confirmamos y coordinamos la entrega.
        </p>

        <div className="bg-orange-500/10 border border-orange-500/25 rounded-2xl px-5 py-4 mb-8 inline-block">
          <div className="text-orange-400 text-xs font-black tracking-widest uppercase mb-1">Tiempo estimado</div>
          <div className="font-bebas text-3xl text-white tracking-wide">{WAIT_TIME_MIN}–{WAIT_TIME_MAX} min</div>
          <div className="text-white/40 text-xs font-semibold mt-0.5">Una vez confirmado el pedido</div>
        </div>

        <div className="space-y-3 mb-8 text-left w-full max-w-xs mx-auto">
          {[
            { icon: '📲', text: 'Abrí WhatsApp y enviá el mensaje generado' },
            { icon: '✅', text: 'Nosotros confirmamos tu pedido' },
            { icon: '🍔', text: `Retirás o recibís en ${WAIT_TIME_MIN}–${WAIT_TIME_MAX} min` },
          ].map((step, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3"
            >
              <span className="text-lg flex-shrink-0">{step.icon}</span>
              <span className="text-white/65 text-sm font-semibold">{step.text}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-3 w-full">
          <motion.button
            onClick={() => { onClear(); onClose() }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-2xl py-3.5 font-black text-sm transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} /> Hacer otro pedido
          </motion.button>
          <Link to="/menu" onClick={() => { onClear(); onClose() }}
            className="w-full bg-white/8 hover:bg-white/15 text-white/70 hover:text-white rounded-2xl py-3.5 font-black text-sm transition-colors text-center no-underline"
          >
            Volver al menú
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Ítem del carrito con swipe-to-delete, +/−, editar ──
function CartItem({ item, onRemove, onUpdateQty, onEdit }) {
  const x = useMotionValue(0)
  // El fondo rojo aparece progresivamente al deslizar hacia la izquierda
  const deleteOpacity = useTransform(x, [-80, -20], [1, 0])
  const itemOpacity   = useTransform(x, [-120, 0], [0.3, 1])
  const [swiping, setSwiping] = useState(false)

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -80) {
      // threshold superado → eliminar
      onRemove(item.id)
    } else {
      // volver al centro
      x.set(0)
    }
    setSwiping(false)
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Fondo rojo (se ve al deslizar) */}
      <motion.div
        style={{ opacity: deleteOpacity }}
        className="absolute inset-0 bg-red-500/20 flex items-center justify-end pr-4 rounded-xl"
      >
        <Trash2 size={20} className="text-red-400" />
      </motion.div>

      {/* Ítem deslizable */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -120, right: 0 }}
        dragElastic={{ left: 0.1, right: 0 }}
        style={{ x, opacity: itemOpacity }}
        onDragStart={() => setSwiping(true)}
        onDragEnd={handleDragEnd}
        className="flex gap-3 py-3 px-1 bg-transparent relative z-10 cursor-grab active:cursor-grabbing"
        style={{ x, touchAction: 'pan-y' }}
      >
        <img
          src={item.product.img} alt={item.product.name}
          className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-white/10"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="font-black text-sm text-white leading-tight">
              {item.product.name}
              {item.size && item.size !== 'Unidad' && (
                <span className="text-orange-400"> · {item.size}</span>
              )}
            </div>
            {/* Botón editar */}
            <button
              onClick={() => !swiping && onEdit(item)}
              className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/8 hover:bg-blue-500/20 flex items-center justify-center text-white/40 hover:text-blue-400 transition-colors"
            >
              <Pencil size={13} />
            </button>
          </div>

          {(item.extras?.length > 0 || item.removes?.length > 0 || item.notes) && (
            <div className="text-xs text-white/35 font-semibold mt-0.5 leading-relaxed">
              {item.extras?.length  > 0 && <span>+{item.extras.join(', ')} </span>}
              {item.removes?.length > 0 && <span>· Sin: {item.removes.join(', ')} </span>}
              {item.notes && <span>· "{item.notes}"</span>}
            </div>
          )}

          {/* Controles de cantidad */}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => onUpdateQty(item.id, -1)}
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-black text-sm transition-colors leading-none"
            >−</button>
            <span className="text-white font-black text-sm min-w-[16px] text-center">{item.qty}</span>
            <button
              onClick={() => onUpdateQty(item.id, +1)}
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-black text-sm transition-colors leading-none"
            >+</button>
            <span className="text-white/25 text-xs font-semibold ml-1">
              · deslizá para eliminar
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ── Dialog de confirmación para vaciar carrito ──────────
function ClearConfirmDialog({ onConfirm, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-end justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        onClick={e => e.stopPropagation()}
        className="bg-[#1a1a1a] border border-white/15 rounded-2xl p-6 w-full max-w-sm"
      >
        <div className="text-center mb-5">
          <div className="text-3xl mb-3">🗑️</div>
          <div className="font-bebas text-2xl text-white tracking-wide mb-1">¿Vaciar el carrito?</div>
          <p className="text-white/50 text-sm font-semibold">Se van a eliminar todos los productos del pedido.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 bg-white/8 hover:bg-white/15 text-white/70 font-black text-sm py-3 rounded-xl transition-colors">
            Cancelar
          </button>
          <button onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-black text-sm py-3 rounded-xl transition-colors">
            Sí, vaciar
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Paso de confirmación antes de enviar ────────────────
function OrderReview({ cart, orderType, address, name, phone, payment, orderNote, onConfirm, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="flex flex-col h-full"
    >
      {/* Header del review */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 flex-shrink-0">
        <button
          onClick={onBack}
          aria-label="Volver al carrito"
          className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} aria-hidden="true" />
        </button>
        <div>
          <div className="font-bebas text-xl text-white tracking-wide leading-none">Revisá tu pedido</div>
          <div className="text-white/40 text-xs font-semibold">Confirmá antes de enviar</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {/* Ítems */}
        <div>
          <div className="text-xs text-white/40 font-black tracking-widest uppercase mb-3">Productos</div>
          <div className="space-y-2">
            {cart.map(item => (
              <div key={item.id} className="flex gap-3 bg-white/4 rounded-xl p-3 border border-white/8">
                <img src={item.product.img} alt={item.product.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-white/10" />
                <div className="flex-1 min-w-0">
                  <div className="font-black text-sm text-white leading-tight">
                    {item.product.name}
                    {item.size && item.size !== 'Unidad' && (
                      <span className="text-orange-400"> · {item.size}</span>
                    )}
                    <span className="text-white/40 font-semibold"> ×{item.qty}</span>
                  </div>
                  {(item.extras?.length > 0 || item.removes?.length > 0 || item.notes) && (
                    <div className="text-xs text-white/35 mt-0.5 leading-relaxed">
                      {item.extras?.length  > 0 && <div>+{item.extras.join(', ')}</div>}
                      {item.removes?.length > 0 && <div>Sin: {item.removes.join(', ')}</div>}
                      {item.notes && <div>"{item.notes}"</div>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Datos de entrega */}
        <div>
          <div className="text-xs text-white/40 font-black tracking-widest uppercase mb-3">Datos de entrega</div>
          <div className="bg-white/4 rounded-xl border border-white/8 divide-y divide-white/8">
            {[
              { label: 'Modalidad', value: orderType === 'delivery' ? '🛵 Delivery' : '🏪 Retiro en local' },
              ...(orderType === 'delivery' ? [{ label: 'Dirección', value: address }] : []),
              { label: 'Nombre', value: name },
              ...(phone ? [{ label: 'Teléfono', value: phone }] : []),
              { label: 'Pago', value: payment },
              ...(orderNote?.trim() ? [{ label: 'Nota', value: orderNote }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between gap-3 px-4 py-3">
                <span className="text-white/40 text-xs font-black uppercase tracking-wide flex-shrink-0">{label}</span>
                <span className="text-white text-sm font-semibold text-right">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/25 rounded-xl px-4 py-3">
          <p className="text-orange-300 text-xs font-semibold leading-relaxed">
            Al confirmar se abrirá WhatsApp con tu pedido completo. Nosotros lo revisamos y te confirmamos enseguida.
          </p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex-shrink-0 px-6 pb-8 pt-4 border-t border-white/10 space-y-3">
        <motion.button
          onClick={onConfirm}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="w-full bg-green-500 hover:bg-green-600 text-white rounded-2xl py-4 font-black text-base flex items-center justify-center gap-3 transition-colors"
          style={{ boxShadow: '0 8px 24px rgba(37,211,102,.35)' }}
        >
          <svg width="20" height="20" fill="white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Confirmar y enviar
        </motion.button>
        <button
          onClick={onBack}
          className="w-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-2xl py-3 font-black text-sm transition-colors"
        >
          ← Volver a editar
        </button>
      </div>
    </motion.div>
  )
}

// ── CartDrawer principal ────────────────────────────────
export default function CartDrawer({
  cart, open, onClose, onRemove, onUpdateQty, onEditItem,
  buildWAMessage, orderSent, markOrderSent, clearCart,
}) {
  const [orderType,  setOrderType]  = useState('retiro')
  const [address,    setAddress]    = useState('')
  const [name,       setName]       = useState('')
  const [phone,      setPhone]      = useState('')
  const [payment,    setPayment]    = useState('')
  const [payOpen,    setPayOpen]    = useState(false)
  const [orderNote,  setOrderNote]  = useState('')
  const [errors,     setErrors]     = useState({})
  const [sentOrderNum, setSentOrderNum] = useState('')
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [showReview, setShowReview] = useState(false) // paso de confirmación

  // Scroll lock cuando el drawer está abierto
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

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
    setAddress(''); setName(''); setPhone(''); setPayment('')
    setOrderNote(''); setErrors({}); setSentOrderNum(''); setShowReview(false)
  }

  const handleClear = () => { clearCart(); resetForm() }

  const confirmClear = () => { setShowClearConfirm(false); handleClear() }

  // Validar y pasar al paso de confirmación
  const handleReview = () => {
    if (!cart.length || !validate()) return
    setShowReview(true)
  }

  // Desde el review: enviar de verdad
  const send = () => {
    const now = new Date(), pad = n => String(n).padStart(2, '0')
    const num = `BB-${pad(now.getDate())}${pad(now.getMonth()+1)}-${pad(now.getHours())}${pad(now.getMinutes())}`
    setSentOrderNum(num)
    const url = buildWAMessage({ orderType, address, name, phone, paymentMethod: payment, orderNote })
    window.open(url, '_blank')
    setShowReview(false)
    setTimeout(() => markOrderSent(), 400)
  }

  const totalQty = cart.reduce((a, i) => a + i.qty, 0)

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
                {totalQty} producto{totalQty !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Botón vaciar carrito — con confirmación */}
            {!orderSent && cart.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-red-500/15 flex items-center justify-center text-white/30 hover:text-red-400 transition-colors"
                title="Vaciar carrito"
              >
                <Trash2 size={15} />
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl leading-none transition-colors"
            >×</button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {orderSent ? (
              <motion.div key="confirmed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                <OrderConfirmed orderNum={sentOrderNum} onClose={onClose} onClear={handleClear} />
              </motion.div>
            ) : showReview ? (
              <motion.div key="review" className="h-full flex flex-col">
                <OrderReview
                  cart={cart}
                  orderType={orderType}
                  address={address}
                  name={name}
                  phone={phone}
                  payment={payment}
                  orderNote={orderNote}
                  onConfirm={send}
                  onBack={() => setShowReview(false)}
                />
              </motion.div>
            ) : (
              <motion.div key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                {/* Lista de ítems */}
                <div className="px-5 py-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 text-white/30">
                      <div className="text-6xl mb-4">🍔</div>
                      <div className="font-bold text-lg text-white/50">Tu pedido está vacío</div>
                      <div className="text-sm mt-2">Elegí una hamburguesa del menú</div>
                    </div>
                  ) : (
                    <AnimatePresence>
                      {cart.map(item => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-b border-white/5 last:border-0"
                        >
                          <CartItem
                            item={item}
                            onRemove={onRemove}
                            onUpdateQty={onUpdateQty}
                            onEdit={onEditItem}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>

                {/* Formulario */}
                {cart.length > 0 && (
                  <OrderForm
                    orderType={orderType}   setOrderType={setOrderType}
                    address={address}       setAddress={setAddress}
                    name={name}             setName={setName}
                    phone={phone}           setPhone={setPhone}
                    payment={payment}       setPayment={setPayment}
                    payOpen={payOpen}       setPayOpen={setPayOpen}
                    orderNote={orderNote}   setOrderNote={setOrderNote}
                    errors={errors}         setErrors={setErrors}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Botón enviar */}
        {!orderSent && !showReview && cart.length > 0 && (
          <div className="flex-shrink-0 px-6 pb-8 pt-4 border-t border-white/10">
            <motion.button
              onClick={handleReview}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-2xl py-4 font-black text-base flex items-center justify-center gap-3 transition-colors"
              style={{ boxShadow: '0 8px 24px rgba(37,211,102,.35)' }}
            >
              <Eye size={20} aria-hidden="true" />
              Revisar y enviar pedido
            </motion.button>
            <p className="text-center text-white/25 text-xs font-semibold mt-3">
              Podrás revisar todo antes de confirmar
            </p>
          </div>
        )}
      </motion.div>

      {/* Dialog confirmar vaciado */}
      <AnimatePresence>
        {showClearConfirm && (
          <ClearConfirmDialog
            onConfirm={confirmClear}
            onCancel={() => setShowClearConfirm(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
