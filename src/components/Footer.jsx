import { NavLink } from 'react-router-dom'
import { MapPin, Phone } from 'lucide-react'
import { WA_LINK, IG_LINK, MAPS_LINK, WA_MSG_INFO, waLink } from '../data'

const IgIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-black border-t border-orange-500/15 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/img/logo.png" alt="Logo" className="w-14 h-14 rounded-full object-cover border-2 border-orange-500" />
              <div>
                <div className="font-bebas text-2xl text-orange-500 tracking-wide">Bendito Bajón</div>
                <div className="text-white/40 text-xs font-bold tracking-widest uppercase">Hamburguesas Artesanales</div>
              </div>
            </div>
            <p className="text-white/40 text-sm font-semibold leading-relaxed">
              Carne smasheada artesanal en Ceres, Santa Fe. Pedidos por WhatsApp, Jue–Dom de 21 a 23hs.
            </p>
            <div className="flex gap-3 mt-5">
              <a href={IG_LINK} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
                style={{ background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366)' }}>
                <IgIcon size={16} />
              </a>
              <a href={waLink(WA_MSG_INFO)} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center transition-transform hover:scale-110">
                <Phone size={16} className="text-white" />
              </a>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center transition-transform hover:scale-110">
                <MapPin size={16} className="text-white" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="font-bebas text-xl text-white tracking-wide mb-5">Navegación</div>
            <div className="space-y-2">
              {[['/', 'Inicio'], ['/menu', 'Menú'], ['/nosotros', 'Nosotros'], ['/contacto', 'Contacto']].map(([to, label]) => (
                <NavLink key={to} to={to} end={to === '/'}
                  className="block text-white/50 hover:text-orange-400 text-sm font-semibold transition-colors">
                  → {label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="font-bebas text-xl text-white tracking-wide mb-5">Contacto</div>
            <div className="space-y-4">
              <a href={waLink(WA_MSG_INFO)} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-green-400 text-sm font-semibold transition-colors group">
                <div className="w-9 h-9 rounded-xl bg-green-500/15 group-hover:bg-green-500/25 flex items-center justify-center transition-colors">
                  <Phone size={15} className="text-green-400" />
                </div>
                +54 9 3491 44-0753
              </a>
              <a href={IG_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-pink-400 text-sm font-semibold transition-colors group">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                  style={{ background: 'rgba(240,148,51,0.12)' }}>
                  <IgIcon size={15} />
                </div>
                @bendito.bajon_
              </a>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-orange-400 text-sm font-semibold transition-colors group">
                <div className="w-9 h-9 rounded-xl bg-orange-500/15 group-hover:bg-orange-500/25 flex items-center justify-center transition-colors">
                  <MapPin size={15} className="text-orange-400" />
                </div>
                Lavalle y 3 de Febrero, Ceres
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/20 text-xs font-semibold">© 2025 Bendito Bajón — Todos los derechos reservados</div>
          <div className="flex gap-3">
            <a href={IG_LINK} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110"
              style={{ background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743)' }}>
              <IgIcon size={14} />
            </a>
            <a href={waLink(WA_MSG_INFO)} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center transition-transform hover:scale-110">
              <Phone size={14} className="text-white" />
            </a>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center transition-transform hover:scale-110">
              <MapPin size={14} className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
