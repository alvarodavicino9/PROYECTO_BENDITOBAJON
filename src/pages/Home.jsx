import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ChevronDown, MapPin, Clock, Bike } from 'lucide-react'
import { WA_LINK, WA_MSG_INFO, WA_MSG_DELIVERY, waLink, WAIT_TIME_MIN, WAIT_TIME_MAX } from '../data'
import { useIsOpen } from '../hooks/useIsOpen'

const fadeUp = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:0.6,ease:[0.16,1,0.3,1]}} }
const stagger = { visible:{transition:{staggerChildren:0.12}} }

// ── HOW TO ORDER ─────────────────────────────────────
const STEPS = [
  {
    num: '01',
    icon: '🍔',
    title: 'Elegí tu hamburguesa',
    desc: 'Entrá al menú, elegí la que más te gusta y personalizala: tamaño, extras y lo que quieras sacar.'
  },
  {
    num: '02',
    icon: '🛒',
    title: 'Armá tu pedido',
    desc: 'Agregá todo lo que querés al carrito. Podés pedir varias hamburguesas y salsas en el mismo pedido.'
  },
  {
    num: '03',
    icon: '📲',
    title: 'Mandalo por WhatsApp',
    desc: 'Con un toque se genera el recibo completo y se manda directo a nuestro WhatsApp. Nosotros confirmamos.'
  },
  {
    num: '04',
    icon: '🎉',
    title: '¡A disfrutar!',
    desc: 'Retirás en el local o pedís delivery. Jue–Dom de 21 a 23hs en Lavalle y 3 de Febrero, Ceres.'
  }
]

function HowToOrder() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section className="bg-[#111] py-24 px-6 border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <div className="inline-block bg-orange-500/10 border border-orange-500/30 rounded-full px-5 py-1.5 mb-5">
              <span className="text-orange-400 text-xs font-black tracking-[3px] uppercase">Simple y rápido</span>
            </div>
            <div className="font-bebas text-[clamp(40px,7vw,72px)] text-white leading-none tracking-wide mb-3">
              ¿CÓMO <span className="text-orange-500">PEDIMOS?</span>
            </div>
            <p className="text-white/40 font-semibold max-w-sm mx-auto">
              En 4 pasos tenés tu bajón listo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line desktop */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent pointer-events-none" />

            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                className="relative"
              >
                <div className="bg-[#0a0a0a] border border-white/8 rounded-2xl p-6 h-full hover:border-orange-500/30 transition-colors group">
                  {/* Number */}
                  <div className="flex items-start justify-between mb-5">
                    <span className="font-bebas text-5xl text-orange-500/20 group-hover:text-orange-500/40 transition-colors leading-none">
                      {step.num}
                    </span>
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <div className="font-bebas text-xl text-white tracking-wide mb-2 leading-tight">
                    {step.title}
                  </div>
                  <p className="text-white/45 text-sm font-semibold leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {/* Mobile connector */}
                {i < STEPS.length - 1 && (
                  <div className="lg:hidden flex justify-center my-2">
                    <div className="w-px h-6 bg-orange-500/25" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="text-center mt-12">
            <Link to="/menu"
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-10 py-4 font-black text-base no-underline transition-colors shadow-xl shadow-orange-500/30">
              Ir al menú →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ── STAT CARD ────────────────────────────────────────
function StatCard({ icon, title, value, href, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const El = href ? motion.a : motion.div
  return (
    <El
      ref={ref}
      href={href} target={href ? '_blank' : undefined} rel="noopener noreferrer"
      initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.16,1,0.3,1] }}
      whileHover={{ y:-6, borderColor:'rgba(249,115,22,.4)' }}
      className="bg-[#111] border border-white/10 rounded-2xl p-6 transition-colors block"
      style={{ textDecoration:'none' }}
    >
      <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center mb-4 text-orange-400">
        {icon}
      </div>
      <div className="font-bebas text-xl text-orange-400 tracking-wide mb-1">{title}</div>
      <div className="text-white/50 text-sm font-semibold leading-relaxed whitespace-pre-line">{value}</div>
    </El>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0,1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const open = useIsOpen()

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center px-6"
        style={{ background: 'linear-gradient(160deg,#0a0a0a 0%,#1a0800 50%,#0a0a0a 100%)' }}
      >
        <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full opacity-20 animate-blob"
          style={{ background:'radial-gradient(circle,#F97316,transparent)', filter:'blur(90px)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-15 animate-blob"
          style={{ background:'radial-gradient(circle,#1E3A8A,transparent)', filter:'blur(100px)', animationDelay:'3s' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage:'linear-gradient(rgba(249,115,22,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.04) 1px,transparent 1px)', backgroundSize:'50px 50px' }} />

        <motion.div style={{ y, opacity }} className="relative z-10 flex flex-col items-center w-full">

          {/* Status pill — reactivo, respeta LOCAL_ABIERTO_OVERRIDE */}
          <motion.div
            initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
            className={`inline-flex items-center gap-2.5 border rounded-full px-4 py-2 mb-6 backdrop-blur transition-colors duration-700 ${
              open
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <span className={`w-2 h-2 rounded-full block flex-shrink-0 ${open ? 'bg-green-400 animate-pulse-dot' : 'bg-red-400/70'}`} />
            <span className={`text-xs font-black tracking-wide ${open ? 'text-green-400' : 'text-white/50'}`}>
              {open
                ? `Abierto · cierra a las 23:00`
                : 'Cerrado · abre Jue–Dom 21:00 hs'}
            </span>
            {open && (
              <span className="text-white/30 text-xs">·</span>
            )}
            {open && (
              <span className="text-orange-400 text-xs font-black">
                {WAIT_TIME_MIN}–{WAIT_TIME_MAX} min
              </span>
            )}
          </motion.div>

          {/* Logo */}
          <motion.img
            src="/img/logo.png" alt="Bendito Bajón"
            initial={{ opacity:0, scale:0.5, rotate:-10 }}
            animate={{ opacity:1, scale:1, rotate:0 }}
            transition={{ type:'spring', stiffness:200, damping:20, delay:0.2 }}
            whileHover={{ scale:1.05, rotate:3 }}
            className="w-44 h-44 md:w-52 md:h-52 rounded-full object-cover border-4 border-orange-500 mb-6"
            style={{ boxShadow:'0 0 60px rgba(249,115,22,.45),0 0 120px rgba(249,115,22,.15)' }}
          />

          {/* Title */}
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}>
            <div className="font-bebas text-[clamp(68px,13vw,128px)] text-white leading-[.9] tracking-wider"
              style={{ textShadow:'0 0 40px rgba(249,115,22,.25)' }}>BENDITO</div>
            <div className="font-bebas text-[clamp(68px,13vw,128px)] text-orange-500 leading-[.9] tracking-wider mb-5"
              style={{ textShadow:'0 0 60px rgba(249,115,22,.5)' }}>BAJÓN</div>
            <div className="text-white/40 font-bold tracking-[4px] uppercase text-sm mb-10">
              Hamburguesas Artesanales · Ceres, Santa Fe
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
            className="flex gap-3 flex-wrap justify-center mb-12"
          >
            <motion.a href={waLink(WA_MSG_INFO)} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.05, y:-2 }} whileTap={{ scale:0.97 }}
              className="flex items-center gap-3 bg-orange-500 text-white rounded-full px-8 py-4 font-black text-base no-underline"
              style={{ boxShadow:'0 8px 32px rgba(249,115,22,.5)' }}>
              <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Hacer pedido
            </motion.a>
            <motion.div whileHover={{ scale:1.05, y:-2 }} whileTap={{ scale:0.97 }}>
              <Link to="/menu"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur border border-white/20 text-white rounded-full px-8 py-4 font-black text-base no-underline transition-colors">
                Ver menú
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Mascota flotante */}
        <motion.img
          src="/img/mascota.png" alt="Mascota"
          initial={{ opacity:0, x:80 }} animate={{ opacity:1, x:0 }}
          transition={{ delay:0.7, type:'spring', stiffness:150 }}
          className="absolute right-[3%] bottom-0 pointer-events-none"
          style={{
            width:'clamp(80px,14vw,180px)',
            filter:'drop-shadow(0 20px 40px rgba(249,115,22,.35))',
            animation:'float 3.5s ease-in-out infinite'
          }}
        />

        <motion.div
          animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 cursor-pointer"
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior:'smooth' })}
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <section id="features" className="bg-[#111] py-16 px-6 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard delay={0} icon={<Clock size={22}/>} title="Horario" value={'Jue – Dom: 21:00 – 23:00\nLun – Mié: Cerrado'} />
          <StatCard delay={0.1} icon={<MapPin size={22}/>} title="Ubicación" value={'Lavalle y 3 de Febrero\nCeres, Santa Fe'}
            href="https://maps.google.com/?q=Lavalle+y+3+de+Febrero,+Ceres,+Santa+Fe" />
          <StatCard delay={0.2} icon={<Bike size={22}/>} title="Delivery" value={'Hacemos delivery.\nConsultá por zona y disponibilidad.'} href={WA_LINK} />
        </div>
      </section>

      {/* ── HOW TO ORDER ── */}
      <HowToOrder />

      {/* ── MENU PREVIEW ── */}
      <section className="bg-[#0a0a0a] py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.3 }} variants={stagger}>
            <motion.div variants={fadeUp}
              className="inline-block bg-orange-500/10 border border-orange-500/30 rounded-full px-5 py-2 mb-5">
              <span className="text-orange-400 text-xs font-black tracking-[3px] uppercase">#MomentoBajón</span>
            </motion.div>
            <motion.div variants={fadeUp}
              className="font-bebas text-[clamp(44px,8vw,80px)] text-white leading-none tracking-wide mb-3">
              HACEMOS LAS <span className="text-orange-500">MEJORES</span><br />HAMBURGUESAS
            </motion.div>
            <motion.p variants={fadeUp} className="text-white/40 font-semibold max-w-md mx-auto mb-10">
              Carne smasheada artesanal, ingredientes frescos, salsas propias. Tres líneas, una pasión.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link to="/menu"
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-10 py-4 font-black text-base no-underline transition-colors"
                style={{ boxShadow:'0 8px 32px rgba(249,115,22,.4)' }}>
                Ver menú completo →
              </Link>
            </motion.div>
          </motion.div>

          {/* Preview strip */}
          <div className="mt-16 flex gap-4 overflow-hidden justify-center">
            {[
              { src: '/img/burg1.png', alt: 'Burger Clásica — cheddar, lechuga, tomate y aderezo Bendito' },
              { src: '/img/burg2.png', alt: 'Burger Oklahoma — carne smasheada con cebolla caramelizada' },
              { src: '/img/burg3.png', alt: 'Burger Cuarto — ketchup, mostaza y cebollita' },
              { src: '/img/burg4.png', alt: 'Burger Extra Cheddar — triple cheddar y aderezo Bendito' },
            ].map(({ src, alt }, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i*0.1, duration:0.6 }}
                whileHover={{ y:-8, scale:1.04 }}
                className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section className="bg-orange-500 py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage:'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize:'20px 20px' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="font-bebas text-[clamp(44px,8vw,72px)] text-white leading-none tracking-wide mb-4">
            LISTO PARA TU<br/>MOMENTO BAJÓN?
          </div>
          <p className="text-white/80 font-semibold mb-8 text-lg">
            Hacé tu pedido por WhatsApp. Rápido, fácil y directo.
          </p>
          <motion.a href={waLink(WA_MSG_INFO)} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale:1.05 }} whileTap={{ scale:0.97 }}
            className="inline-flex items-center gap-3 bg-white text-orange-600 rounded-full px-10 py-4 font-black text-lg no-underline shadow-2xl">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#ea580c"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Pedir ahora
          </motion.a>
        </div>
      </section>
    </>
  )
}
