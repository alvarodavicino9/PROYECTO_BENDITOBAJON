import { useState, useEffect } from 'react'
import { LOCAL_ABIERTO_OVERRIDE } from '../data'

function calcIsOpen() {
  // Bug fix: LOCAL_ABIERTO_OVERRIDE nunca se chequeaba antes
  if (LOCAL_ABIERTO_OVERRIDE === true)  return true
  if (LOCAL_ABIERTO_OVERRIDE === false) return false

  const d   = new Date()
  const day = d.getDay()               // 0=Dom 4=Jue 5=Vie 6=Sab
  const min = d.getHours() * 60 + d.getMinutes()
  return [0, 4, 5, 6].includes(day) && min >= 1260 && min < 1380
}

/**
 * Devuelve si el local está abierto ahora.
 * Se re-evalúa cada 60 segundos para que la UI se actualice
 * si el usuario deja la pestaña abierta al cambiar el horario.
 */
export function useIsOpen() {
  const [open, setOpen] = useState(calcIsOpen)

  useEffect(() => {
    const id = setInterval(() => setOpen(calcIsOpen()), 60_000)
    return () => clearInterval(id)
  }, [])

  return open
}
