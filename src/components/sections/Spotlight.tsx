import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Phone, Sparkles } from 'lucide-react'
import { menu, formatPrice, type MenuItem } from '../../config/menu'
import { ProductVisual, AddButton } from '../menu/ProductCard'
import { ToppingGlyph } from '../waffle/parts'
import { links } from '../../config/business'

/** Products that get an extra-special stage treatment. */
const STAR: Record<string, { label: string; pattern: string }> = {
  'biscoff-supreme-delight': { label: 'Caramel crunch', pattern: 'radial-gradient(circle at 20% 30%, #E8A35A33 0 2px, transparent 3px) 0 0/22px 22px' },
  'blueberry-cheese-cloud': { label: 'Cloud-soft', pattern: 'radial-gradient(circle at 50% 50%, #A898F026 0 18px, transparent 19px) 0 0/80px 80px' },
  'kunafa-honey-lace': { label: 'Golden threads', pattern: 'repeating-linear-gradient(60deg, #F7CF6A1c 0 2px, transparent 2px 14px)' },
  'nutty-brownie-overload': { label: 'Fudge overload', pattern: 'linear-gradient(45deg, #A8653A14 25%, transparent 25% 75%, #A8653A14 75%) 0 0/40px 40px' },
}

const ORDERED = [...menu].sort((a, b) => Number(!!STAR[b.id]) - Number(!!STAR[a.id]))

export function Spotlight() {
  const [id, setId] = useState('kunafa-honey-lace')
  const item = menu.find((m) => m.id === id) ?? menu[0]
  const reduce = useReducedMotion()
  const [deep, mid, glow] = item.theme
  const star = STAR[item.id]

  return (
    <section id="spotlight" data-nav-theme="dark" aria-label="Product spotlight" className="relative overflow-hidden text-cream">
      <motion.div
        className="absolute inset-0"
        animate={{ background: `radial-gradient(ellipse at 70% 45%, ${glow}66 0%, ${mid} 38%, ${deep} 85%)` }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
      />
      {star && <motion.div key={item.id} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} style={{ background: star.pattern }} />}

      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        {/* selector */}
        <div>
          <p className="eyebrow mb-4 text-cream/70"><Sparkles size={14} /> Spotlight</p>
          <h2 className="h-section mb-8 text-cream">Pick your<br /><span style={{ color: glow }} className="transition-colors duration-700">obsession.</span></h2>
          <div role="tablist" aria-label="Choose a waffle" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0">
            {ORDERED.map((m) => (
              <SpotTab key={m.id} m={m} active={m.id === id} onSelect={() => setId(m.id)} />
            ))}
          </div>
        </div>

        {/* stage */}
        <div role="tabpanel" aria-live="polite" className="relative grid min-h-[560px] place-items-center">
          {/* floating ingredients of the selected waffle */}
          <AnimatePresence>
            {item.art.toppings.flatMap((t, ti) =>
              [0, 1, 2].map((k) => {
                const ang = ((ti * 3 + k) / (item.art.toppings.length * 3)) * Math.PI * 2
                const r = 42 + (k % 2) * 6
                return (
                  <motion.div
                    key={`${item.id}-${t}-${k}`}
                    className="pointer-events-none absolute left-1/2 top-[42%]"
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{ opacity: 0.95, x: `${Math.cos(ang) * r}vmin`, y: `${Math.sin(ang) * r * 0.7}vmin`, scale: 1.4 + (k % 2) * 0.4, rotate: k * 50 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.05 * k + 0.1 * ti, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden
                  >
                    <svg width="44" height="44" viewBox="-22 -22 44 44" className="float-slow -ml-[22px] -mt-[22px] max-md:scale-75" style={{ animationDelay: `${k * 0.6}s` }}>
                      <ToppingGlyph type={t} seed={k / 3} />
                    </svg>
                  </motion.div>
                )
              }),
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -40, scale: 0.6, y: 60 }}
              animate={{ opacity: 1, rotate: 0, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 30, scale: 0.7, y: -40 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[min(78vw,430px)]"
            >
              <div className="absolute inset-[12%] rounded-full blur-3xl" style={{ background: glow, opacity: 0.45 }} />
              <ProductVisual item={item} className="relative drop-shadow-[0_40px_40px_rgba(0,0,0,.45)]" />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={item.id + '-copy'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative z-10 w-full rounded-[28px] border border-cream/15 bg-black/25 p-5 backdrop-blur-md md:p-6"
            >
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-hand text-2xl" style={{ color: glow }}>{star ? star.label : item.mood}</p>
                  <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-extrabold uppercase leading-[0.92] tracking-tight">{item.name}</h3>
                  <p className="mt-2 max-w-md text-cream/80">{item.description}</p>
                </div>
                <motion.p key={item.price} initial={{ scale: 1.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-5xl font-extrabold">
                  {formatPrice(item.price)}
                </motion.p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <AddButton item={item} />
                <a href={links.call} className="btn btn-ghost-light !min-h-11 !py-2 text-sm"><Phone size={16} /> Call to order</a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function SpotTab({ m, active, onSelect }: { m: MenuItem; active: boolean; onSelect: () => void }) {
  return (
    <button
      role="tab"
      type="button"
      aria-selected={active}
      onClick={onSelect}
      className={`group relative flex shrink-0 items-center justify-between gap-4 rounded-full px-4 py-2.5 text-left transition-colors lg:rounded-2xl lg:py-2 ${active ? 'bg-cream text-choco' : 'bg-cream/8 text-cream/75 hover:bg-cream/12 hover:text-cream lg:bg-transparent'}`}
    >
      <span className="whitespace-nowrap font-display text-[15px] font-bold lg:text-lg">
        {m.name}
        {STAR[m.id] && <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-widest text-strawberry">★</span>}
      </span>
      <span className={`hidden font-display font-bold lg:block ${active ? 'text-caramel-deep' : 'text-cream/40'}`}>{formatPrice(m.price)}</span>
    </button>
  )
}
