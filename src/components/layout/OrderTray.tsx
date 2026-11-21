import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, X, Phone, Copy, Check, ShoppingBag, Trash2 } from 'lucide-react'
import { orderText, useOrder } from '../../state/order'
import { menu, formatPrice } from '../../config/menu'
import { business, links, ordering } from '../../config/business'
import { WaffleArt } from '../waffle/WaffleArt'

/** Slide-over order summary + sticky mobile "Order" bar. */
export function OrderTray() {
  const { lines, count, total, open, setOpen, add, remove, clear } = useOrder()
  const [copied, setCopied] = useState(false)
  const [showBar, setShowBar] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const order = document.getElementById('order')
      // only after the pinned waffle journey, so it never covers the animation's own CTAs
      const journey = document.getElementById('journey')
      const pastHero = journey ? journey.getBoundingClientRect().bottom < window.innerHeight * 0.5 : window.scrollY > window.innerHeight
      const atOrder = order ? order.getBoundingClientRect().top < window.innerHeight * 0.8 && order.getBoundingClientRect().bottom > 0 : false
      setShowBar(pastHero && !atOrder)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, setOpen])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(orderText(lines))
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  const entries = Object.entries(lines)
    .map(([id, q]) => ({ item: menu.find((m) => m.id === id)!, q }))
    .filter((e) => e.item)

  return (
    <>
      {/* sticky mobile order bar */}
      <AnimatePresence>
        {showBar && !open && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex gap-2 md:hidden"
          >
            <a href={links.call} className="btn btn-choco flex-1 shadow-2xl" aria-label={`Call ${business.name}`}>
              <Phone size={18} aria-hidden /> Call
            </a>
            <button type="button" onClick={() => setOpen(true)} className="btn btn-gold flex-[1.6] shadow-2xl">
              <ShoppingBag size={18} aria-hidden />
              {count > 0 ? `Your order · ${count} · ${formatPrice(total)}` : 'Start your order'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-choco-deep/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Your order"
              className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-cream shadow-2xl max-sm:inset-x-0 max-sm:top-auto max-sm:max-h-[88svh] max-sm:rounded-t-[32px]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            >
              <div className="flex items-center justify-between border-b border-choco/10 px-6 py-5">
                <p className="font-display text-2xl font-extrabold uppercase tracking-tight">Your order</p>
                <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-choco/5" aria-label="Close order" autoFocus>
                  <X size={22} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {entries.length === 0 ? (
                  <div className="py-14 text-center">
                    <ShoppingBag size={40} className="mx-auto text-choco/25" aria-hidden />
                    <p className="mt-4 font-display text-xl font-extrabold">Your plate is empty.</p>
                    <p className="mt-1 text-sm text-choco/60">Add a few waffles from the menu to plan your order.</p>
                    <a href="#menu" onClick={() => setOpen(false)} className="btn btn-choco mt-6">Browse the menu</a>
                  </div>
                ) : (
                  <ul className="divide-y divide-choco/10">
                    {entries.map(({ item, q }) => (
                      <li key={item.id} className="flex items-center gap-3 py-3">
                        <div className="h-16 w-16 shrink-0 rounded-2xl" style={{ background: `${item.theme[2]}40` }}>
                          <WaffleArt art={item.art} seed={item.id} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold">{item.name}</p>
                          <p className="text-sm text-choco/60">{formatPrice(item.price)} each</p>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-white p-1">
                          <button type="button" onClick={() => remove(item.id)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-choco/5" aria-label={`Remove one ${item.name}`}><Minus size={14} /></button>
                          <span className="w-5 text-center text-sm font-bold" aria-live="polite">{q}</span>
                          <button type="button" onClick={() => add(item.id)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-choco/5" aria-label={`Add one more ${item.name}`}><Plus size={14} /></button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {entries.length > 0 && (
                <div className="border-t border-choco/10 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-choco/60">Estimated total</span>
                    <span className="font-display text-3xl font-extrabold">{formatPrice(total)}</span>
                  </div>
                  <p className="mt-1 text-xs text-choco/50">Prices may change — WAFFLEKAR will confirm your total.</p>
                  <div className="mt-4 grid gap-2">
                    <a href={links.call} className="btn btn-gold w-full text-base"><Phone size={18} aria-hidden /> Call to place this order</a>
                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" onClick={copy} className="btn btn-ghost-dark !min-h-11 text-sm">
                        {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied' : 'Copy order'}
                      </button>
                      <button type="button" onClick={clear} className="btn btn-ghost-dark !min-h-11 text-sm"><Trash2 size={16} /> Clear</button>
                    </div>
                    {Object.values(ordering).some((o) => o.url) && (
                      <div className="mt-1 flex gap-2">
                        {Object.entries(ordering).map(([k, o]) => o.url && (
                          <a key={k} href={o.url} target="_blank" rel="noopener noreferrer" className="btn btn-choco flex-1 !min-h-11 text-sm">{o.label}</a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
