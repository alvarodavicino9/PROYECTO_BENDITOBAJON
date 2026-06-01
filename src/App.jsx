import { useState, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import ProductModal from './components/ProductModal'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import MobileCartBar from './components/MobileCartBar'
import { ToastProvider, useToast } from './components/Toast'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import { useCart } from './hooks/useCart'

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function AppInner() {
  const location = useLocation()
  const {
    cart, cartOpen, setCartOpen,
    orderSent, markOrderSent,
    addItem, removeItem, clearCart,
    count, countForProduct, buildWAMessage
  } = useCart()

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartShake, setCartShake] = useState(false)
  const showToast = useToast()

  const handleAddToCart = useCallback((item) => {
    addItem(item)
    setCartShake(true)
    setTimeout(() => setCartShake(false), 500)
    showToast(`${item.product.name}${item.size !== 'Unidad' ? ` (${item.size})` : ''} agregado`)
  }, [addItem, showToast])

  const openCart = useCallback(() => setCartOpen(true), [setCartOpen])

  return (
    <>
      <Navbar cartCount={count} onCartOpen={openCart} cartShake={cartShake} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/menu" element={
            <PageWrapper>
              <Menu
                onOpenProduct={setSelectedProduct}
                onAddToCart={handleAddToCart}
                countForProduct={countForProduct}
              />
            </PageWrapper>
          } />
          <Route path="/nosotros" element={<PageWrapper><Nosotros /></PageWrapper>} />
          <Route path="/contacto" element={<PageWrapper><Contacto /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      <Footer />

      <WhatsAppFloat cartCount={count} onCartOpen={openCart} />
      <MobileCartBar count={count} onOpen={openCart} />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdd={handleAddToCart}
      />

      <CartDrawer
        cart={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={removeItem}
        buildWAMessage={buildWAMessage}
        orderSent={orderSent}
        markOrderSent={markOrderSent}
        clearCart={clearCart}
      />
    </>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  )
}
