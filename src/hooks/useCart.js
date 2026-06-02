import { useState, useEffect, useCallback } from 'react'
import { WA_NUMBER } from '../data'

function generateOrderNumber() {
  const now = new Date()
  const pad = n => String(n).padStart(2, '0')
  return `BB-${pad(now.getDate())}${pad(now.getMonth()+1)}-${pad(now.getHours())}${pad(now.getMinutes())}`
}

const STORAGE_KEY = 'bendito_cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  } catch {}
}

export function useCart() {
  const [cart, setCart]           = useState(loadCart)
  const [cartOpen, setCartOpen]   = useState(false)
  const [orderSent, setOrderSent] = useState(false)

  useEffect(() => { saveCart(cart) }, [cart])

  const addItem = useCallback((item) => {
    setCart(prev => [...prev, { ...item, id: Date.now() }])
  }, [])

  const removeItem = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  // Reemplaza un ítem completo in-place (para edición desde el modal)
  const updateItem = useCallback((id, updatedFields) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, ...updatedFields } : i))
  }, [])

  // Sube o baja la cantidad de un ítem; si llega a 0 lo elimina
  const updateQty = useCallback((id, delta) => {
    setCart(prev =>
      prev
        .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter(i => i.qty > 0)
    )
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    setOrderSent(false)
    saveCart([])
  }, [])

  const markOrderSent = useCallback(() => setOrderSent(true), [])

  const count = cart.reduce((a, i) => a + i.qty, 0)

  const countForProduct = useCallback((productId) =>
    cart.filter(i => i.product.id === productId).reduce((a, i) => a + i.qty, 0)
  , [cart])

  // orderNote = nota general del pedido (campo nuevo del formulario)
  const buildWAMessage = useCallback(({ orderType, address, name, phone, paymentMethod, orderNote }) => {
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
    if (orderNote?.trim()) msg += `\n📋 *Nota para el local:* ${orderNote.trim()}\n`
    msg += `\n¡Muchas gracias! Quedo atento a la confirmación. 🙌`

    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
  }, [cart])

  return {
    cart, cartOpen, setCartOpen,
    orderSent, markOrderSent,
    addItem, removeItem, updateItem, updateQty, clearCart,
    count, countForProduct, buildWAMessage,
  }
}
