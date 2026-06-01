import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Clock, Phone } from 'lucide-react'
import { WA_LINK, IG_LINK, MAPS_LINK, WA_MSG_CONTACTO, WA_MSG_DELIVERY, waLink } from '../data'

const IgIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const fadeUp = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:0.6,ease:[0.16,1,0.3,1]}} }

function Card({ children, className='', delay=0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp} transition={{ delay }}
      whileHover={{ y:-5, borderColor:'rgba(249,115,22,.4)' }}
      className={`bg-[#111] border border-white/10 rounded-2xl p-8 transition-colors ${className}`}>
      {children}
    </motion.div>
  )
}

const HORARIO = [
  { dia:'Jueves',    hora:'21:00 – 23:00', open:true },
  { dia:'Viernes',   hora:'21:00 – 23:00', open:true },
  { dia:'Sábado',    hora:'21:00 – 23:00', open:true },
  { dia:'Domingo',   hora:'21:00 – 23:00', open:true },
  { dia:'Lunes',     hora:'Cerrado',        open:false },
  { dia:'Martes',    hora:'Cerrado',        open:false },
  { dia:'Miércoles', hora:'Cerrado',        open:false },
]

function isCurrentlyOpen() {
  const now = new Date()
  const day = now.getDay()
  const mins = now.getHours() * 60 + now.getMinutes()
  return [0,4,5,6].includes(day) && mins >= 1260 && mins < 1380
}

export default function Contacto() {
  const open = isCurrentlyOpen()
  const dayNames = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
  const todayName = dayNames[new Date().getDay()]

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Header */}
      <div className="bg-[#111] border-b border-white/10 py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background:'radial-gradient(circle,#F97316,transparent)', filter:'blur(80px)' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            className="inline-block bg-orange-500/10 border border-orange-500/30 rounded-full px-5 py-1.5 mb-5">
            <span className="text-orange-400 text-xs font-black tracking-[3px] uppercase">Encontranos</span>
          </motion.div>
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            className="font-bebas text-[clamp(44px,9vw,88px)] text-white leading-none tracking-wide mb-5">
            HABLEMOS <span className="text-orange-500">DEL</span><br />SIGUIENTE BAJÓN
          </motion.div>
          <motion.div initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} transition={{delay:0.4}}
            className={`inline-flex items-center gap-3 rounded-2xl px-6 py-3 border ${
              open ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'
            }`}>
            <span className={`w-3 h-3 rounded-full ${open ? 'bg-green-400 animate-pulse-dot' : 'bg-red-400'}`} />
            <span className={`font-black text-base ${open ? 'text-green-400' : 'text-red-400'}`}>
              {open ? 'Abierto ahora · cierra a las 23:00' : 'Cerrado · abre Jue–Dom a las 21:00'}
            </span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-6">

        {/* WhatsApp hero card */}
        <Card delay={0.1} className="border-green-500/20 hover:border-green-500/40">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Phone size={22} className="text-green-400" />
                </div>
                <div>
                  <div className="font-bebas text-2xl text-white tracking-wide">WhatsApp</div>
                  <div className="text-white/40 text-sm font-semibold">Único canal de pedidos</div>
                </div>
              </div>
              <p className="text-white/50 font-semibold leading-relaxed mb-4">
                Todos los pedidos se toman por WhatsApp. Armá tu pedido desde el menú,
                mandanos el recibo y nosotros confirmamos enseguida.
              </p>
              <div className="font-bebas text-3xl text-white tracking-wide mb-5">+54 9 3491 44-0753</div>
              <motion.a href={waLink(WA_MSG_CONTACTO)} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-4 font-black text-base no-underline transition-colors">
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Abrir WhatsApp
              </motion.a>
            </div>
            <div className="flex-shrink-0">
              <img src="/img/mascota.png" alt="Mascota"
                className="w-36 h-36 object-contain"
                style={{ filter:'drop-shadow(0 16px 32px rgba(37,211,102,.3))', animation:'float 3.5s ease-in-out infinite' }} />
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Horario */}
          <Card delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Clock size={22} className="text-orange-400" />
              </div>
              <div>
                <div className="font-bebas text-2xl text-white tracking-wide">Horario</div>
                <div className="text-white/40 text-sm font-semibold">Cuándo nos encontrás</div>
              </div>
            </div>
            <div className="space-y-1">
              {HORARIO.map(({ dia, hora, open: isOpen }) => (
                <div key={dia}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-xl ${
                    dia === todayName ? 'bg-orange-500/15 border border-orange-500/30' : 'hover:bg-white/3'
                  }`}>
                  <div className="flex items-center gap-2">
                    {dia === todayName && (
                      <span className="text-[10px] font-black text-orange-400 uppercase tracking-wider bg-orange-500/20 px-2 py-0.5 rounded-full">Hoy</span>
                    )}
                    <span className={`text-sm font-bold ${isOpen ? 'text-white' : 'text-white/30'}`}>{dia}</span>
                  </div>
                  <span className={`text-sm font-black ${isOpen ? 'text-orange-400' : 'text-red-400/50'}`}>{hora}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Ubicación + Instagram stacked */}
          <div className="flex flex-col gap-6">
            <Card delay={0.3} className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <MapPin size={22} className="text-orange-400" />
                </div>
                <div>
                  <div className="font-bebas text-2xl text-white tracking-wide">Ubicación</div>
                  <div className="text-white/40 text-sm font-semibold">Ceres, Santa Fe</div>
                </div>
              </div>
              <div className="text-white font-bold text-lg mb-1">Lavalle y 3 de Febrero</div>
              <div className="text-white/40 font-semibold text-sm mb-4">Ceres, Santa Fe, Argentina</div>
              <div className="rounded-xl overflow-hidden border border-white/10 mb-4" style={{height:140}}>
                <iframe title="Mapa"
                  src="https://maps.google.com/maps?q=Ceres,+Santa+Fe,+Argentina&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0" loading="lazy" />
              </div>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
                className="text-orange-400 font-black text-sm hover:text-orange-300 transition-colors">
                Ver en Google Maps →
              </a>
            </Card>

            <Card delay={0.4}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background:'linear-gradient(135deg,rgba(240,148,51,.25),rgba(220,39,67,.25))' }}>
                    <IgIcon size={22} className="text-pink-400" />
                  </div>
                  <div>
                    <div className="font-bebas text-2xl text-white tracking-wide">Instagram</div>
                    <div className="text-white/40 text-sm font-semibold">@bendito.bajon_</div>
                  </div>
                </div>
                <motion.a href={IG_LINK} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
                  className="flex items-center gap-2 text-white rounded-full px-5 py-2.5 font-black text-sm no-underline"
                  style={{ background:'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366)' }}>
                  <IgIcon size={14} /> Seguir
                </motion.a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
