import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { WA_LINK, IG_LINK, WA_MSG_INFO, waLink } from '../data'

const fadeUp = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:0.6,ease:[0.16,1,0.3,1]}} }

function Section({ children, className='' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  )
}

export default function Nosotros() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Hero nosotros */}
      <div className="relative bg-[#111] border-b border-white/10 py-24 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#F97316,transparent)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#1E3A8A,transparent)', filter: 'blur(80px)' }} />

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            className="inline-block bg-orange-500/10 border border-orange-500/30 rounded-full px-5 py-1.5 mb-6">
            <span className="text-orange-400 text-xs font-black tracking-[3px] uppercase">Quiénes somos</span>
          </motion.div>
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            className="font-bebas text-[clamp(48px,9vw,90px)] text-white leading-none tracking-wide mb-6">
            LA HISTORIA<br />DETRÁS DEL <span className="text-orange-500">BAJÓN</span>
          </motion.div>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
            className="text-white/50 font-semibold text-lg leading-relaxed">
            Nacimos en Ceres con una sola obsesión: hacer la mejor hamburguesa de la zona.
            Sin apuro, sin compromiso, con mucho queso.
          </motion.p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">

        {/* Nuestra historia */}
        <Section>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-orange-400 text-xs font-black tracking-[3px] uppercase mb-4">01 — Nuestra historia</div>
              <div className="font-bebas text-[clamp(36px,6vw,60px)] text-white leading-none tracking-wide mb-6">
                EMPEZAMOS<br /><span className="text-orange-500">CON UNA</span><br />HAMBURGUESA
              </div>
              <p className="text-white/50 font-semibold leading-relaxed mb-4">
                Bendito Bajón nació de una idea simple: hacer hamburguesas artesanales de verdad en Ceres, Santa Fe.
                La técnica smash burger, medallones bien aplastados sobre la plancha, costra perfecta, queso que se derrite hasta el borde.
              </p>
              <p className="text-white/50 font-semibold leading-relaxed">
                Abrimos los jueves, viernes, sábados y domingos de 21 a 23hs. Sin reservas, sin complicaciones.
                Solo vos, una hamburgesa y el momento bajón.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img src="/img/burg1.png" alt="Bendito Bajón" className="w-full h-72 object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl overflow-hidden border-2 border-orange-500 shadow-xl shadow-orange-500/20">
                <img src="/img/logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </Section>

        {/* Líneas */}
        <Section>
          <div className="text-orange-400 text-xs font-black tracking-[3px] uppercase mb-4 text-center">02 — Nuestras líneas</div>
          <div className="font-bebas text-[clamp(36px,6vw,60px)] text-white leading-none tracking-wide mb-12 text-center">
            TRES LÍNEAS, <span className="text-orange-500">UNA PASIÓN</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name:"Burger's", emoji:'🍔', desc:'Las clásicas de la casa. Clásica, Oklahoma, Cuarto, Extra Cheddar y Cheese Burger. El punto de partida perfecto.', color:'from-orange-500/20 to-transparent' },
              { name:'Benditas', emoji:'😇', desc:'Con ingredientes especiales. Butter, Cheese Bacon, Bacon 2.0 y Ameri. Para los que quieren algo distinto.', color:'from-blue-500/20 to-transparent' },
              { name:'Bajoneras', emoji:'🤙', desc:'Las más atrevidas. MDB, Argenta, Bendita Crispy y Bendita Pickle. Para los que buscan el bajón total.', color:'from-red-500/20 to-transparent' },
            ].map((line, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i*0.15 }}
                whileHover={{ y:-6 }}
                className="bg-[#111] border border-white/10 rounded-2xl p-8 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${line.color}`} />
                <div className="text-5xl mb-5">{line.emoji}</div>
                <div className="font-bebas text-3xl text-white tracking-wide mb-3">{line.name}</div>
                <p className="text-white/45 text-sm font-semibold leading-relaxed">{line.desc}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Técnica */}
        <Section>
          <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-3xl p-10 md:p-14">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="text-orange-400 text-xs font-black tracking-[3px] uppercase mb-4">03 — La técnica</div>
                <div className="font-bebas text-[clamp(36px,6vw,56px)] text-white leading-none tracking-wide mb-6">
                  SMASH BURGER<br /><span className="text-orange-500">DE VERDAD</span>
                </div>
                <p className="text-white/55 font-semibold leading-relaxed mb-4">
                  La técnica smash es simple pero exigente. Medallón de carne fresca sobre plancha bien caliente,
                  aplastado para maximizar el contacto con el hierro. El resultado: una costra dorada perfecta
                  y un interior jugoso.
                </p>
                <p className="text-white/55 font-semibold leading-relaxed">
                  Cuatro tamaños: Simple, Doble, Triple y Cuádruple. Porque en Bendito Bajón, vos elegís cuánto bajón querés.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {['/img/burg2.png','/img/burg3.png','/img/burg4.png','/img/burg1.png'].map((src, i) => (
                  <motion.div key={i} whileHover={{ scale:1.05, rotate: i%2===0 ? 1 : -1 }}
                    className="rounded-2xl overflow-hidden border border-white/10 shadow-xl"
                    style={{ aspectRatio:'1' }}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* CTA */}
        <Section>
          <div className="text-center">
            <div className="font-bebas text-[clamp(40px,7vw,72px)] text-white leading-none tracking-wide mb-4">
              SEGUINOS EN<br /><span className="text-orange-500">INSTAGRAM</span>
            </div>
            <p className="text-white/40 font-semibold mb-8">Fotos, novedades y el día a día del local.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.a href={IG_LINK} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
                className="flex items-center gap-3 text-white rounded-full px-8 py-4 font-black text-base no-underline"
                style={{ background:'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366)' }}>
                @bendito.bajon_ →
              </motion.a>
              <motion.a href={waLink(WA_MSG_INFO)} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-4 font-black text-base no-underline transition-colors">
                Hacer un pedido →
              </motion.a>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
