import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { PRODUCTS, CATEGORIES, SALSAS, EXTRAS } from '../data'

const fadeUp = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:{duration:0.5,ease:[0.16,1,.3,1]}} }
const stagger = { visible:{transition:{staggerChildren:0.06}} }

function BurgerCard({ product, onOpen, cartQty }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -7, scale: 1.02 }}
      onClick={() => onOpen(product)}
      className="bg-[#111] border rounded-2xl overflow-hidden cursor-pointer group relative"
      style={{
        borderColor: cartQty > 0 ? 'rgba(249,115,22,.5)' : 'rgba(255,255,255,.08)',
        boxShadow: cartQty > 0
          ? '0 0 0 1px rgba(249,115,22,.3), 0 8px 32px rgba(249,115,22,.15)'
          : '0 4px 24px rgba(0,0,0,.4)',
        transition: 'transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s, border-color .3s'
      }}
      onMouseEnter={e => {
        if (cartQty === 0) e.currentTarget.style.borderColor = 'rgba(249,115,22,.4)'
      }}
      onMouseLeave={e => {
        if (cartQty === 0) e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'
      }}
    >
      {/* Cart quantity badge */}
      <AnimatePresence>
        {cartQty > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="absolute top-3 right-3 z-20 bg-orange-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-black text-xs shadow-lg shadow-orange-500/50"
          >
            {cartQty}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-52 overflow-hidden bg-[#1a1a1a]">
        <img src={product.img} alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
          {product.cat}
        </span>

        {/* Plus button */}
        <motion.div
          animate={cartQty > 0 ? { rotate: 0, background: '#22C55E' } : { rotate: 0, background: '#F97316' }}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white text-xl shadow-lg transition-all duration-300 group-hover:scale-110"
          style={{ boxShadow: cartQty > 0 ? '0 4px 14px rgba(34,197,94,.5)' : '0 4px 14px rgba(249,115,22,.5)' }}
        >
          +
        </motion.div>
      </div>

      <div className="p-4 flex flex-col">
        <div className="font-bebas text-2xl text-white tracking-wide mb-1">{product.name}</div>
        <div className="text-white/40 text-xs font-semibold leading-relaxed mb-3">{product.desc}</div>
        <div className={`text-xs font-black tracking-wide uppercase transition-colors ${
          cartQty > 0 ? 'text-green-400' : 'text-orange-400'
        }`}>
          {cartQty > 0 ? `✓ ${cartQty} en tu pedido · Agregar más` : 'Ver opciones →'}
        </div>
      </div>
    </motion.div>
  )
}

function SalsaCard({ salsa, onAdd, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    onAdd({
      product: { name: salsa.name, img: salsa.img, cat: 'Salsa', id: 'salsa_' + index },
      size: 'Unidad',
      qty: 1,
      extras: [],
      removes: [],
      notes: ''
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:20 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -5 }}
      className="bg-[#1a1a1a] border border-white/8 rounded-2xl overflow-hidden group"
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(249,115,22,.4)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'}
      style={{ transition: 'border-color .2s, transform .25s' }}
    >
      <div className="relative overflow-hidden h-28">
        <img src={salsa.img} alt={salsa.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-3">
        <div className="text-white text-xs font-black mb-2 leading-tight">{salsa.name}</div>
        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.9 }}
          className={`w-full py-1.5 rounded-xl text-xs font-black transition-all duration-300 ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-orange-500/15 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/30 hover:border-transparent'
          }`}
        >
          {added ? '✓ Agregado' : '+ Agregar'}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Menu({ onOpenProduct, onAddToCart, countForProduct }) {
  const [activeFilter, setActiveFilter] = useState('Todos')

  const filtered = activeFilter === 'Todos'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === activeFilter)

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">

      {/* Header */}
      <div className="bg-[#111] border-b border-white/10 py-14 px-6 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp}
            className="inline-block bg-orange-500/10 border border-orange-500/30 rounded-full px-5 py-1.5 mb-4">
            <span className="text-orange-400 text-xs font-black tracking-[3px] uppercase">Menú completo</span>
          </motion.div>
          <motion.div variants={fadeUp}
            className="font-bebas text-[clamp(44px,8vw,80px)] text-white leading-none tracking-wide mb-3">
            NUESTRAS <span className="text-orange-500">HAMBUR&shy;GUESAS</span>
          </motion.div>
          <motion.p variants={fadeUp} className="text-white/40 font-semibold max-w-sm mx-auto text-sm">
            Carne smasheada artesanal. Elegí tu favorita y personalizala.
          </motion.p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
          className="flex justify-center gap-2 mt-8 flex-wrap"
        >
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-black transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white/8 text-white/50 hover:bg-white/15 hover:text-white border border-white/10'
              }`}>
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Burger Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((p) => (
              <BurgerCard
                key={p.id}
                product={p}
                onOpen={onOpenProduct}
                cartQty={countForProduct ? countForProduct(p.id) : 0}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Salsas */}
      <div className="bg-[#111] border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            className="flex items-center gap-5 mb-2"
          >
            <div className="font-bebas text-[clamp(26px,5vw,46px)] text-white tracking-wide whitespace-nowrap">
              SALSAS & <span className="text-orange-500">ADEREZOS</span>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-500 to-transparent" />
          </motion.div>
          <motion.p
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            className="text-white/40 text-sm font-semibold mb-8"
          >
            Podés sumar una salsa extra a tu pedido
          </motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-10">
            {SALSAS.map((s, i) => (
              <SalsaCard key={i} salsa={s} onAdd={onAddToCart} index={i} />
            ))}
          </div>

          {/* Extras */}
          <div className="font-bebas text-xl text-white tracking-wide mb-4">EXTRAS DISPONIBLES</div>
          <div className="flex gap-3 flex-wrap">
            {EXTRAS.map((e, i) => (
              <div key={i} className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2">
                <span className="text-white text-sm font-bold">{e.name}</span>
                <span className="text-orange-400 text-xs font-black">{e.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
