import { motion } from 'framer-motion'
import { Plus, Check } from 'lucide-react'
import { formatPrice, type MenuItem } from '../../config/menu'
import { WaffleArt } from '../waffle/WaffleArt'
import { useOrder } from '../../state/order'

export function ProductVisual({ item, className = '' }: { item: MenuItem; className?: string }) {
  if (item.photo)
    return <img src={item.photo} alt={item.name} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />
  return <WaffleArt art={item.art} seed={item.id} title={`Illustration of ${item.name}`} className={className} />
}

export function VegMark({ veg }: { veg: boolean | null }) {
  if (veg === null) return null // only shown when verified by owner
  const c = veg ? '#1F8A3B' : '#A3271F'
  return (
    <span className="inline-grid h-4 w-4 place-items-center rounded-[3px] border-2" style={{ borderColor: c }} title={veg ? 'Vegetarian' : 'Contains egg / non-veg'}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
      <span className="sr-only">{veg ? 'Vegetarian' : 'Non-vegetarian'}</span>
    </span>
  )
}

export function AddButton({ item, tone = 'gold', label = 'Add to order' }: { item: MenuItem; tone?: 'gold' | 'choco' | 'light'; label?: string }) {
  const { add, lastAdded, lines } = useOrder()
  const just = lastAdded === item.id
  const qty = lines[item.id] ?? 0
  const cls = tone === 'gold' ? 'btn-gold' : tone === 'choco' ? 'btn-choco' : 'btn-ghost-light'
  return (
    <button type="button" onClick={() => add(item.id)} className={`btn ${cls} !min-h-11 !px-4 !py-2 text-sm`} aria-label={`Add ${item.name} to your order`}>
      <motion.span key={just ? 'y' : 'n'} initial={{ scale: 0.4, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} className="grid place-items-center">
        {just ? <Check size={16} /> : <Plus size={16} />}
      </motion.span>
      {just ? 'Added!' : label}
      {qty > 0 && !just && <span className="rounded-full bg-choco/15 px-1.5 text-xs">{qty}</span>}
    </button>
  )
}

/** Large signature card — tinted with the product's own colours. */
export function SignatureCard({ item, index }: { item: MenuItem; index: number }) {
  const [deep, mid, glow] = item.theme
  return (
    <article
      className={`group relative flex w-[78vw] max-w-[340px] shrink-0 snap-center flex-col overflow-hidden rounded-[34px] p-5 text-cream shadow-[0_30px_60px_-30px_rgba(50,23,15,.7)] transition-transform duration-500 hover:-translate-y-2 sm:w-[320px] ${index % 2 ? 'md:mt-14' : ''}`}
      style={{ background: `radial-gradient(circle at 50% 30%, ${glow}55, transparent 60%), linear-gradient(160deg, ${mid}, ${deep})` }}
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-sm font-bold text-cream/60">{String(index + 1).padStart(2, '0')}</span>
        <span className="rounded-full bg-cream/15 px-3 py-1 font-display text-lg font-extrabold backdrop-blur">{formatPrice(item.price)}</span>
      </div>
      <div className="relative -mx-2 my-2 aspect-square">
        <div className="absolute inset-[18%] rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100" style={{ background: glow, opacity: 0.35 }} />
        <ProductVisual item={item} className="relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:rotate-[-8deg] group-hover:scale-110" />
      </div>
      <div className="mt-auto">
        <div className="flex items-center gap-2"><VegMark veg={item.veg} /></div>
        <h3 className="font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-tight">{item.name}</h3>
        <p className="mt-2 min-h-[3em] text-sm leading-relaxed text-cream/75">{item.description}</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <AddButton item={item} />
          <a href="#order" className="text-sm font-semibold text-cream/80 underline-offset-4 hover:text-cream hover:underline">Order now</a>
        </div>
      </div>
    </article>
  )
}

/** Compact menu row card. */
export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35 }}
      className="group relative flex items-center gap-4 overflow-hidden rounded-[26px] border border-choco/8 bg-white p-3 pr-4 shadow-[0_14px_40px_-28px_rgba(50,23,15,.6)] transition-shadow hover:shadow-[0_24px_50px_-26px_rgba(50,23,15,.7)]"
    >
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[20px]" style={{ background: `linear-gradient(150deg, ${item.theme[2]}55, ${item.theme[1]}30)` }}>
        <ProductVisual item={item} className="h-full w-full transition-transform duration-500 group-hover:scale-115 group-hover:rotate-[-6deg]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-extrabold leading-tight tracking-tight">{item.name}</h3>
          <span className="shrink-0 font-display text-lg font-extrabold text-caramel-deep">{formatPrice(item.price)}</span>
        </div>
        <div className="mt-0.5"><VegMark veg={item.veg} /></div>
        <p className="mt-1 line-clamp-2 text-sm text-choco/65">{item.description}</p>
        <div className="mt-2">
          <AddButton item={item} tone="choco" label="Add" />
        </div>
      </div>
    </motion.article>
  )
}
