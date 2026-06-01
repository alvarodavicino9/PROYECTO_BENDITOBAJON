import { useState } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { EXTRAS } from '../data'

const SIZES = [['S','Simple'],['D','Doble'],['T','Triple'],['C','Cuadruple']]

export default function ProductModal({ product, onClose, onAdd }) {
  const [size, setSize] = useState('Simple')
  const [qty, setQty] = useState(1)
  const [extras, setExtras] = useState([])
  const [removes, setRemoves] = useState([])
  const [notes, setNotes] = useState('')
  const dragControls = useDragControls()

  const toggleExtra = name => setExtras(p => p.includes(name) ? p.filter(e => e !== name) : [...p, name])
  const toggleRemove = name => setRemoves(p => p.includes(name) ? p.filter(r => r !== name) : [...p, name])

  const handleAdd = () => {
    onAdd({ product, size, qty, extras: [...extras], removes: [...removes], notes: notes.trim() })
    onClose()
  }

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-end md:items-center justify-center p-0 md:p-6"
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
            {/* Drag handle — mobile only */}
            <div
              className="flex justify-center pt-3 pb-1 md:hidden cursor-grab active:cursor-grabbing"
              onPointerDown={e => dragControls.start(e)}
            >
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            {/* Image */}
            <div className="relative">
              <img src={product.img} alt={product.name}
                className="w-full h-56 object-cover rounded-t-3xl md:rounded-t-3xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent rounded-t-3xl" />
              <button onClick={onClose}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white text-xl hover:bg-black/80 transition-colors leading-none">
                ×
              </button>
              <span className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
                {product.cat}
              </span>
            </div>

            <div className="px-6 pb-8">
              <h2 className="font-bebas text-4xl text-white mt-2 leading-none">{product.name}</h2>
              <p className="text-white/50 text-sm font-semibold mt-2 mb-6 leading-relaxed">{product.desc}</p>

              {/* Size */}
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

              {/* Remove */}
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

              {/* Notes */}
              <div className="text-xs text-white/40 font-black tracking-widest uppercase mb-3">Notas</div>
              <textarea
                value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Ej: bien cocida, sin sal..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-semibold resize-none h-20 outline-none focus:border-orange-500 transition-colors placeholder-white/20 mb-6"
              />

              {/* Footer */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white/5 rounded-full px-4 py-2">
                  <button onClick={() => setQty(q => Math.max(1, q-1))}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-black text-lg transition-colors leading-none">−</button>
                  <span className="text-white font-black text-lg min-w-[20px] text-center">{qty}</span>
                  <button onClick={() => setQty(q => q+1)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white font-black text-lg transition-colors leading-none">+</button>
                </div>
                <motion.button
                  onClick={handleAdd}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full py-4 font-black text-base shadow-xl shadow-orange-500/30 transition-colors"
                >
                  Agregar {qty > 1 ? `${qty}x` : ''} al pedido
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
