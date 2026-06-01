import { useState, useCallback } from 'react'
import { WA_NUMBER } from '../data'

function generateOrderNumber() {
  const now = new Date()
  const pad = n => String(n).padStart(2, '0')
  return `BB-${pad(now.getDate())}${pad(now.getMonth()+1)}-${pad(now.getHours())}${pad(now.getMinutes())}`
}

export function useCart() {
  const [cart, setCart]           = useState([])
  const [cartOpen, setCartOpen]   = useState(false)
  const [orderSent, setOrderSent] = useState(false)  // controls confirmation screen

  const addItem = useCallback((item) => {
    setCart(prev => [...prev, { ...item, id: Date.now() }])
  }, [])

  const removeItem = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    setOrderSent(false)
  }, [])

  const markOrderSent = useCallback(() => {
    setOrderSent(true)
  }, [])

  const count = cart.reduce((a, i) => a + i.qty, 0)

  const countForProduct = useCallback((productId) => {
    return cart
      .filter(i => i.product.id === productId)
      .reduce((a, i) => a + i.qty, 0)
  }, [cart])

  const buildWAMessage = useCallback(({ orderType, address, name, phone, paymentMethod }) => {
    const now = new Date()
    const pad = n => String(n).padStart(2, '0')
    const orderNum = generateOrderNumber()
    const timeStr  = `${pad(now.getHours())}:${pad(now.getMinutes())}`
    const dateStr  = `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()}`

    let msg = `¡Hola! Quiero realizar el siguiente pedido:\n\n`
    msg += `📋 *Pedido N° ${orderNum}* — ${dateStr} ${timeStr}hs\n`
    msg += `━━━━━━━━━━━━━━━━━━━━\n\n`
    msg += `📌 *Detalle del Pedido:*\n`

    cart.forEach((item) => {
      const size = item.size && item.size !== 'Unidad' ? ` (${item.size})` : ''
      msg += `• *${item.product.name}*${size} x ${item.qty}\n`
      if (item.extras?.length)  msg += `   ✨ +${item.extras.join(', ')}\n`
      if (item.removes?.length) msg += `   ❌ Sin: ${item.removes.join(', ')}\n`
      if (item.notes)           msg += `   📝 "${item.notes}"\n`
    })

    msg += `\n💰 *Total:* A confirmar por el local\n`
    msg += `━━━━━━━━━━━━━━━━━━━━\n\n`
    msg += `👤 *Datos de Entrega / Contacto:*\n`
    if (name)  msg += `• *Nombre:* ${name}\n`
    if (phone) msg += `• *Teléfono:* ${phone}\n`

    if (orderType === 'delivery') {
      msg += `• *Dirección:* ${address || 'A confirmar'}\n`
    } else {
      msg += `• *Modalidad:* Retiro en local (Lavalle y 3 de Febrero)\n`
    }

    if (paymentMethod) msg += `• *Método de Pago:* ${paymentMethod}\n`
    msg += `\n¡Muchas gracias! Quedo atento a la confirmación. 🙌`

    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
  }, [cart])

  return {
    cart,
    cartOpen,
    setCartOpen,
    orderSent,
    markOrderSent,
    addItem,
    removeItem,
    clearCart,
    count,
    countForProduct,
    buildWAMessage
  }
}
