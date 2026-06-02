import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { Share2, Check } from 'lucide-react'
import { EXTRAS } from '../data'

const SIZES = [['S','Simple'],['D','Doble'],['T','Triple'],['C','Cuadruple']]

export default function ProductModal({ product, editingItem, onClose, onAdd, onSaveEdit }) {
  const isEditing = Boolean(editingItem)
  const [shared, setShared] = useState(false)

  const handleShare = useCallback(async () => {
    const shareData = {
      title: `Bendito Bajón — ${product.name}`,
      text: `${product.name}: ${product.desc} 🍔`,
      url: `${window.location.origin}/menu`,
    }
    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData)
      } else {
        // Fallback: copiar al portapapeles
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        // El usuario canceló el share nativo — no es un error real
        console.warn('Share error:', err)
      }
    }
  }, [product])

  const [size,    setSize]    = useState(editingItem?.size    ?? 'Simple')
  const [qty,     setQty]     = useState(editingItem?.qty     ?? 1)
  const [extras,  setExtras]  = useState(editingItem?.extras  ?? [])
  const [removes, setRemoves] = useState(editingItem?.removes ?? [])
  const [notes,   setNotes]   = useState(editingItem?.notes   ?? '')
  const dragControls = useDragControls()

  // Re-inicializar cuando cambia el ítem (modo edición vs. modo nuevo)
  useEffect(() => {
    setSize(editingItem?.size    ?? 'Simple')
    setQty (editingItem?.qty     ?? 1)
    setExtras (editingItem?.extras  ?? [])
    setRemoves(editingItem?.removes ?? [])
    setNotes  (editingItem?.notes   ?? '')
  }, [editingItem, product])

  // Scroll lock — bloquea el body mientras el modal está abierto
  useEffect(() => {
    if (!product) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [product])

  const toggleExtra  = name => setExtras (p => p.includes(name) ? p.filter(e => e !== name) : [...p, name])
  const toggleRemove = name => setRemoves(p => p.includes(name) ? p.filter(r => r !== name) : [...p, name])

  const handleConfirm = () => {
    const payload = { product, size, qty, extras: [...extras], removes: [...removes], notes: notes.trim() }
    if (isEditing) {
      onSaveEdit(payload)
    } else {
      onAdd(payload)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-end md:items-center justify-center p-0 md:p-6"
          onClick={e => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => { if (info.offset.y > 100) onClose() }}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className="bg-[#111] rounded-t-3xl md:rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto select-none"
            style={{ touchAction: 'pan-y' }}
          >
            {/* Drag handle mobile */}
            <div
              className="flex justify-center pt-3 pb-1 md:hidden cursor-grab active:cursor-grabbing"
              onPointerDown={e => dragControls.start(e)}
            >
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Imagen */}
            <div className="relative">
              <img src={product.img} alt={product.name}
                className="w-full h-56 object-cover rounded-t-3xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent rounded-t-3xl" />
              <button onClick={onClose}
                aria-label="Cerrar"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white text-xl hover:bg-black/80 transition-colors leading-none">
                ×
              </button>
              {/* Botón compartir */}
              <motion.button
                onClick={handleShare}
                aria-label={shared ? 'Copiado al portapapeles' : 'Compartir esta burger'}
                whileTap={{ scale: 0.9 }}
                className={`absolute top-4 right-14 w-9 h-9 rounded-full backdrop-blur flex items-center justify-center transition-all ${
                  shared ? 'bg-green-500 text-white' : 'bg-black/60 hover:bg-black/80 text-white'
                }`}
              >
                <AnimatePresence mode="wait">
                  {shared ? (
                    <motion.span key="check" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}>
                      <Check size={15} aria-hidden="true" />
                    </motion.span>
                  ) : (
                    <motion.span key="share" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}>
                      <Share2 size={15} aria-hidden="true" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
              {/* Badge modo edición */}
              {isEditing ? (
                <span className="absolute top-4 left-4 bg-blue-500 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
                  Editando
                </span>
              ) : (
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
                  {product.cat}
                </span>
              )}
            </div>

            <div className="px-6 pb-8">
              <h2 className="font-bebas text-4xl text-white mt-2 leading-none">{product.name}</h2>
              <p className="text-white/50 text-sm font-semibold mt-2 mb-6 leading-relaxed">{product.desc}</p>

              {/* Tamaño */}
              <div className="text-xs text-white/40 font-black tracking-widest uppercase mb-3">Tamaño</div>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {SIZES.map(([lbl, val]) => (
                  <button key={val} onClick={() => setSize(val)}
                    className={`py-3 rounded-xl border transition-all ${
                      size === val
                        ? 'border-orange-500 bg-orange-500/15'
                        : 'border-white/10 bg-white/3 hover:border-orange-500/50'
                    }`}>
                    <span className={`font-bebas text-3xl block leading-none ${size === val ? 'text-orange-500' : 'text-white/70'}`}>{lbl}</span>
                    <span className="text-[9px] font-bold text-white/35 uppercase tracking-wide">{val}</span>
                  </button>
                ))}
              </div>

              {/* Extras */}
              <div className="text-xs text-white/40 font-black tracking-widest uppercase mb-3">Extras (opcional)</div>
              <div className="mb-6">
                {EXTRAS.map(e => (
                  <button key={e.name} onClick={() => toggleExtra(e.name)}
                    className="w-full flex items-center gap-3 py-3 border-b border-white/5 hover:bg-white/3 transition-colors rounded-lg px-1">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all text-xs font-black ${
                      extras.includes(e.name) ? 'bg-orange-500 border-orange-500 text-white' : 'border-white/25'
                    }`}>
                      {extras.includes(e.name) && '✓'}
                    </div>
                    <span className="flex-1 text-left text-sm text-white/65 font-semibold">{e.name}</span>
                    <span className="text-orange-400 text-xs font-black">{e.price}</span>
                  </button>
                ))}
              </div>

              {/* Quitar ingredientes */}
              {product.rm?.length > 0 && (
                <>
                  <div className="text-xs text-white/40 font-black tracking-widest uppercase mb-3">Quitar ingredientes</div>
                  <div className="mb-6">
                    {product.rm.map(r => (
                      <button key={r} onClick={() => toggleRemove(r)}
                        className="w-full flex items-center gap-3 py-3 border-b border-white/5 hover:bg-white/3 transition-colors rounded-lg px-1">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all text-xs font-black ${
                          removes.includes(r) ? 'bg-red-500 border-red-500 text-white' : 'border-white/25'
                        }`}>
                          {removes.includes(r) && '×'}
                        </div>
                        <span className="text-sm text-white/55 font-semibold">{r}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Notas */}
              <div className="text-xs text-white/40 font-black tracking-widest uppercase mb-3">Notas del ítem</div>
              <textarea
                value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Ej: bien cocida, sin sal..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-semibold resize-none h-20 outline-none focus:border-orange-500 transition-colors placeholder-white/20 mb-6"
              />

              {/* Footer: qty + botón */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-black text-lg transition-colors leading-none">−</button>
                  <span className="text-white font-black text-lg min-w-[20px] text-center">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-black text-lg transition-colors leading-none">+</button>
                </div>
                <motion.button
                  onClick={handleConfirm}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className={`flex-1 text-white rounded-full py-4 font-black text-base shadow-xl transition-colors ${
                    isEditing
                      ? 'bg-blue-500 hover:bg-blue-600 shadow-blue-500/30'
                      : 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/30'
                  }`}
                >
                  {isEditing ? 'Guardar cambios' : `Agregar${qty > 1 ? ` ${qty}x` : ''} al pedido`}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
