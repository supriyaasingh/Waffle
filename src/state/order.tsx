import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { menu } from '../config/menu'

type Lines = Record<string, number>

interface OrderCtx {
  lines: Lines
  count: number
  total: number
  open: boolean
  setOpen: (v: boolean) => void
  add: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  lastAdded: string | null
}

const Ctx = createContext<OrderCtx | null>(null)
const KEY = 'wafflekar-order'

export function OrderProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Lines>(() => {
    try {
      const raw = localStorage.getItem(KEY)
      const parsed = raw ? (JSON.parse(raw) as Lines) : {}
      // drop items that no longer exist on the menu
      return Object.fromEntries(Object.entries(parsed).filter(([id, q]) => menu.some((m) => m.id === id) && q > 0))
    } catch {
      return {}
    }
  })
  const [open, setOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState<string | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines))
    } catch {
      /* storage unavailable — order still works for this visit */
    }
  }, [lines])

  const add = useCallback((id: string) => {
    setLines((l) => ({ ...l, [id]: (l[id] ?? 0) + 1 }))
    setLastAdded(id)
    window.setTimeout(() => setLastAdded((cur) => (cur === id ? null : cur)), 1800)
  }, [])
  const remove = useCallback((id: string) => {
    setLines((l) => {
      const n = (l[id] ?? 0) - 1
      const next = { ...l }
      if (n <= 0) delete next[id]
      else next[id] = n
      return next
    })
  }, [])
  const clear = useCallback(() => setLines({}), [])

  const value = useMemo(() => {
    let count = 0
    let total = 0
    for (const [id, q] of Object.entries(lines)) {
      const item = menu.find((m) => m.id === id)
      if (!item) continue
      count += q
      total += q * item.price
    }
    return { lines, count, total, open, setOpen, add, remove, clear, lastAdded }
  }, [lines, open, add, remove, clear, lastAdded])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useOrder() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useOrder must be used inside OrderProvider')
  return c
}

/** Plain-text summary for sharing / reading out on a call. */
export function orderText(lines: Lines) {
  const rows = Object.entries(lines)
    .map(([id, q]) => {
      const m = menu.find((x) => x.id === id)
      return m ? `${q} × ${m.name} — ₹${m.price * q}` : ''
    })
    .filter(Boolean)
  const total = Object.entries(lines).reduce((s, [id, q]) => s + (menu.find((m) => m.id === id)?.price ?? 0) * q, 0)
  return `My WAFFLEKAR order:\n${rows.join('\n')}\nTotal: ₹${total}`
}
