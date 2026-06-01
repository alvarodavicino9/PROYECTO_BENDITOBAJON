import { motion } from 'framer-motion'

const ITEMS = [
  '🍔 SMASH BURGER ARTESANAL',
  '📍 CERES, SANTA FE',
  '⚡ #MOMENTOBAJON',
  '🕒 JUE–DOM · 21 A 23HS',
  '🛵 DELIVERY DISPONIBLE',
  '✨ CARNE FRESCA TODOS LOS DÍAS',
]

export default function Marquee() {
  const text = [...ITEMS, ...ITEMS] // duplicate for seamless loop

  return (
    <div className="bg-orange-500 overflow-hidden py-3 border-y border-orange-600 relative">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
        className="flex gap-0 whitespace-nowrap"
      >
        {text.map((item, i) => (
          <span key={i} className="font-bebas text-white text-base tracking-widest px-8 flex items-center gap-2">
            {item}
            <span className="text-orange-300 mx-2">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
