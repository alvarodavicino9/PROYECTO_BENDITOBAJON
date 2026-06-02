import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Search, X, Flame } from 'lucide-react'
import { PRODUCTS, CATEGORIES, SALSAS, EXTRAS } from '../data'

const fadeUp  = { hidden:{ opacity:0, y:30 }, visible:{ opacity:1, y:0, transition:{ duration:0.5, ease:[0.16,1,.3,1] } } }
const stagger = { visible:{ transition:{ staggerChildren:0.06 } } }

// ── Skeleton shimmer para tarjetas mientras carga la imagen ──
function BurgerSkeleton() {
  return (
    <div className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-52 bg-white/5" />
      <div className="p-4 space-y-2">
        <div className="h-5 bg-white/8 rounded-lg w-2/3" />
        <div className="h-3 bg-white/5 rounded w-full" />
        <div className="h-3 bg-white/5 rounded w-4/5" />
      </div>
    </div>
  )
}

// ── Tarjeta de burger ────────────────────────────────────
function BurgerCard({ product, onOpen, cartQty }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.08 })
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.article
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={{ y: -7, scale: 1.02 }}
      onClick={() => onOpen(product)}
      role="button"
      tabIndex={0}
      aria-label={`Ver opciones de ${product.name}${cartQty > 0 ? `, ${cartQty} en tu pedido` : ''}`}
      onKeyDown={e => e.key === 'Enter' && onOpen(product)}
      className="bg-[#111] border rounded-2xl overflow-hidden cursor-pointer group relative focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
      style={{
        borderColor: cartQty > 0 ? 'rgba(249,115,22,.5)' : 'rgba(255,255,255,.08)',
        boxShadow: cartQty > 0
          ? '0 0 0 1px rgba(249,115,22,.3), 0 8px 32px rgba(249,115,22,.15)'
          : '0 4px 24px rgba(0,0,0,.4)',
        transition: 'transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s, border-color .3s'
      }}
      onMouseEnter={e => { if (cartQty === 0) e.currentTarget.style.borderColor = 'rgba(249,115,22,.4)' }}
      onMouseLeave={e => { if (cartQty === 0) e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)' }}
    >
      {/* Badge de cantidad en carrito */}
      <AnimatePresence>
        {cartQty > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            aria-hidden="true"
            className="absolute top-3 right-3 z-20 bg-orange-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-black text-xs shadow-lg shadow-orange-500/50"
          >
            {cartQty}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Imagen con skeleton */}
      <div className="relative h-52 overflow-hidden bg-[#1a1a1a]">
        {/* Skeleton visible hasta que carga */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse" aria-hidden="true" />
        )}
        <img
          src={product.img}
          alt={`${product.name} — ${product.desc}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
          {product.cat}
        </span>
        <motion.div
          animate={cartQty > 0 ? { background: '#22C55E' } : { background: '#F97316' }}
          aria-hidden="true"
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
    </motion.article>
  )
}

// ── Tarjeta de salsa ─────────────────────────────────────
function SalsaCard({ salsa, onAdd, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [added,     setAdded]     = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    onAdd({
      product: { name: salsa.name, img: salsa.img, cat: 'Salsa', id: 'salsa_' + index },
      size: 'Unidad', qty: 1, extras: [], removes: [], notes: ''
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
        {!imgLoaded && <div className="absolute inset-0 bg-white/5 animate-pulse" aria-hidden="true" />}
        <img
          src={salsa.img}
          alt={salsa.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
      </div>
      <div className="p-3">
        <div className="text-white text-xs font-black mb-2 leading-tight">{salsa.name}</div>
        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.9 }}
          aria-label={`Agregar ${salsa.name} al pedido`}
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

// ── Carrusel "Lo más pedido" ─────────────────────────────
function PopularStrip({ products, onOpen, countForProduct }) {
  const popular = products.filter(p => p.popular)
  if (!popular.length) return null

  return (
    <section aria-label="Lo más pedido" className="border-b border-white/10 py-8 px-6 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-full bg-orange-500/15 flex items-center justify-center flex-shrink-0">
            <Flame size={16} className="text-orange-400" aria-hidden="true" />
          </div>
          <h2 className="font-bebas text-2xl text-white tracking-wide leading-none">Lo más pedido</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-orange-500/40 to-transparent" aria-hidden="true" />
        </div>

        {/* Scroll horizontal */}
        <div
          className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          role="list"
          aria-label="Productos más pedidos"
        >
          {popular.map(p => {
            const qty = countForProduct ? countForProduct(p.id) : 0
            return (
              <motion.button
                key={p.id}
                role="listitem"
                onClick={() => onOpen(p)}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                aria-label={`${p.name} — ${p.desc}${qty > 0 ? `, ${qty} en tu pedido` : ''}`}
                className="flex-shrink-0 w-44 bg-[#161616] border rounded-2xl overflow-hidden text-left snap-start focus:outline-none focus:ring-2 focus:ring-orange-500"
                style={{
                  borderColor: qty > 0 ? 'rgba(249,115,22,.5)' : 'rgba(255,255,255,.1)',
                  boxShadow: qty > 0 ? '0 0 0 1px rgba(249,115,22,.2)' : 'none',
                }}
              >
                <div className="relative h-28 overflow-hidden bg-[#1a1a1a]">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
                  {qty > 0 && (
                    <span aria-hidden="true" className="absolute top-2 right-2 bg-orange-500 text-white rounded-full w-5 h-5 text-[10px] font-black flex items-center justify-center">
                      {qty}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <div className="font-bebas text-base text-white tracking-wide leading-tight mb-0.5">{p.name}</div>
                  <div className="text-orange-400 text-[10px] font-black">Ver opciones →</div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Buscador ─────────────────────────────────────────────
function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative max-w-md mx-auto mt-6">
      <label htmlFor="menu-search" className="sr-only">Buscar en el menú</label>
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
        aria-hidden="true"
      />
      <input
        id="menu-search"
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Buscar burger..."
        autoComplete="off"
        className="w-full bg-white/5 border border-white/10 focus:border-orange-500 rounded-full pl-10 pr-10 py-2.5 text-white text-sm font-semibold outline-none transition-colors placeholder-white/25"
      />
      <AnimatePresence>
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClear}
            aria-label="Limpiar búsqueda"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <X size={11} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Página completa ──────────────────────────────────────
export default function Menu({ onOpenProduct, onAddToCart, countForProduct }) {
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [search,       setSearch]       = useState('')

  const filtered = PRODUCTS.filter(p => {
    const matchCat    = activeFilter === 'Todos' || p.cat === activeFilter
    const matchSearch = !search.trim() ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const clearSearch = () => setSearch('')

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">

      {/* Header */}
      <header className="bg-[#111] border-b border-white/10 py-14 px-6 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp}
            className="inline-block bg-orange-500/10 border border-orange-500/30 rounded-full px-5 py-1.5 mb-4">
            <span className="text-orange-400 text-xs font-black tracking-[3px] uppercase">Menú completo</span>
          </motion.div>
          <motion.h1 variants={fadeUp}
            className="font-bebas text-[clamp(44px,8vw,80px)] text-white leading-none tracking-wide mb-3">
            NUESTRAS <span className="text-orange-500">HAMBUR&shy;GUESAS</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/40 font-semibold max-w-sm mx-auto text-sm">
            Carne smasheada artesanal. Elegí tu favorita y personalizala.
          </motion.p>
        </motion.div>

        {/* Buscador */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}>
          <SearchBar value={search} onChange={setSearch} onClear={clearSearch} />
        </motion.div>

        {/* Filtros de categoría */}
        <motion.div
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
          className="flex justify-center gap-2 mt-5 flex-wrap"
          role="group"
          aria-label="Filtrar por categoría"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveFilter(cat); clearSearch() }}
              aria-pressed={activeFilter === cat}
              className={`px-5 py-2 rounded-full text-sm font-black transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white/8 text-white/50 hover:bg-white/15 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </header>

      {/* Carrusel "Lo más pedido" — solo cuando no hay búsqueda activa */}
      {!search && activeFilter === 'Todos' && (
        <PopularStrip
          products={PRODUCTS}
          onOpen={onOpenProduct}
          countForProduct={countForProduct}
        />
      )}

      {/* Grid de burgers */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeFilter + search}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration: 0.2 }}
              role="list"
              aria-label={`Productos${search ? ` para "${search}"` : activeFilter !== 'Todos' ? ` de ${activeFilter}` : ''}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map(p => (
                <div key={p.id} role="listitem">
                  <BurgerCard
                    product={p}
                    onOpen={onOpenProduct}
                    cartQty={countForProduct ? countForProduct(p.id) : 0}
                  />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              className="text-center py-20"
              role="status"
              aria-live="polite"
            >
              <div className="text-5xl mb-4">🔍</div>
              <div className="font-bebas text-2xl text-white/50 tracking-wide mb-2">Sin resultados</div>
              <p className="text-white/30 text-sm font-semibold mb-5">
                No encontramos burgers que coincidan con "<span className="text-white/50">{search}</span>"
              </p>
              <button
                onClick={clearSearch}
                className="bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 font-black text-sm px-6 py-2.5 rounded-full transition-colors"
              >
                Limpiar búsqueda
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Sección de Salsas */}
      <section aria-label="Salsas y aderezos" className="bg-[#111] border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            className="flex items-center gap-5 mb-2"
          >
            <h2 className="font-bebas text-[clamp(26px,5vw,46px)] text-white tracking-wide whitespace-nowrap">
              SALSAS & <span className="text-orange-500">ADEREZOS</span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-500 to-transparent" aria-hidden="true" />
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
          <ul className="flex gap-3 flex-wrap" aria-label="Lista de extras disponibles">
            {EXTRAS.map((e, i) => (
              <li key={i} className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2">
                <span className="text-white text-sm font-bold">{e.name}</span>
                <span className="text-orange-400 text-xs font-black" aria-label={`Precio: ${e.price}`}>{e.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
