import { createContext, useContext, useState, useCallback } from 'react'
import { useCart } from '../hooks/useCart'
import { useToast } from '../components/Toast'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const cartState = useCart()
  const showToast = useToast()

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [editingItem, setEditingItem]         = useState(null) // ítem en edición
  const [cartShake, setCartShake]             = useState(false)

  const handleAddToCart = useCallback((item) => {
    cartState.addItem(item)
    setCartShake(true)
    setTimeout(() => setCartShake(false), 500)
    showToast(`${item.product.name}${item.size !== 'Unidad' ? ` (${item.size})` : ''} agregado`)
  }, [cartState, showToast])

  // Abrir modal en modo edición desde el drawer
  const handleEditItem = useCallback((item) => {
    setEditingItem(item)
    setSelectedProduct(item.product)
  }, [])

  // Guardar edición: reemplaza el ítem en el carrito in-place
  const handleSaveEdit = useCallback((updatedFields) => {
    if (!editingItem) return
    cartState.updateItem(editingItem.id, updatedFields)
    showToast('Ítem actualizado')
    setEditingItem(null)
    setSelectedProduct(null)
  }, [editingItem, cartState, showToast])

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null)
    setEditingItem(null)
  }, [])

  const openCart  = useCallback(() => cartState.setCartOpen(true),  [cartState])
  const closeCart = useCallback(() => cartState.setCartOpen(false), [cartState])

  return (
    <CartContext.Provider value={{
      ...cartState,
      cartShake,
      selectedProduct,
      editingItem,
      setSelectedProduct,
      handleAddToCart,
      handleEditItem,
      handleSaveEdit,
      handleCloseModal,
      openCart,
      closeCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCartContext() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCartContext debe usarse dentro de <CartProvider>')
  return ctx
}
