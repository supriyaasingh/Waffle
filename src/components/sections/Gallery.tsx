import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera, Store, X } from 'lucide-react'
import { itemById, type MenuItem } from '../../config/menu'
import { Photo } from '../ui/Photo'
import { ProductVisual } from '../menu/ProductCard'
import { SplitHeading, Reveal } from '../ui/Reveal'

type Tile =
  | { kind: 'photo'; name: string; alt: string; caption: string; tall?: boolean }
  | { kind: 'art'; item: MenuItem; tall?: boolean }
  | { kind: 'soon'; icon: 'store' | 'camera'; caption: string; tall?: boolean }

/**
 * Gallery tiles. Replace `photo` entries with real WAFFLEKAR photographs:
 * drop `<name>-640.webp` + `<name>-1280.webp` into /public/images and change
 * the name + caption here (and remove the placeholder badge text if you like).
 */
const TILES: Tile[] = [
  { kind: 'photo', name: 'ref-strawberry-chocolate', alt: 'Chocolate-drizzled waffles with strawberry hearts and edible flowers', caption: 'Chocolate & strawberries', tall: true },
  { kind: 'art', item: itemById('kunafa-honey-lace')! },
  { kind: 'photo', name: 'ref-chocolate-pour', alt: 'Hot chocolate sauce pouring over a waffle', caption: 'The chocolate pour' },
  { kind: 'soon', icon: 'store', caption: 'Our storefront — photo coming soon', tall: true },
  { kind: 'photo', name: 'ref-caramel-biscuit', alt: 'Caramel-biscuit waffles stacked high', caption: 'Biscuit & caramel', tall: true },
  { kind: 'art', item: itemById('blueberry-cheese-cloud')! },
  { kind: 'photo', name: 'ref-sugar-dust', alt: 'Waffle with strawberries and a dusting of sugar', caption: 'Strawberry & sugar dust' },
  { kind: 'soon', icon: 'camera', caption: 'Inside the shop — photo coming soon' },
  { kind: 'art', item: itemById('biscoff-supreme-delight')! },
]

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  useEffect(() => {
    if (open === null) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])
  const current = open !== null ? TILES[open] : null

  return (
    <section id="gallery" data-nav-theme="light" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Reveal><p className="eyebrow mb-4 text-blueberry"><span className="h-px w-8 bg-blueberry" /> #wafflekar</p></Reveal>
            <SplitHeading text="Eat with your eyes first." accent={['eyes']} className="h-section text-choco" />
          </div>
          <Reveal><p className="max-w-sm text-sm text-choco/60">Photos marked <b>placeholder</b> are reference images — they’ll be swapped for real WAFFLEKAR photography.</p></Reveal>
        </div>

        <div className="columns-2 gap-3 md:columns-3 md:gap-4 [&>*]:mb-3 md:[&>*]:mb-4">
          {TILES.map((t, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06} className="break-inside-avoid">
              {t.kind === 'soon' ? (
                <div className={`grid place-items-center rounded-[24px] border-2 border-dashed border-choco/15 bg-cream-2 p-6 text-center text-choco/55 ${t.tall ? 'aspect-[3/4]' : 'aspect-square'}`}>
                  <div>
                    {t.icon === 'store' ? <Store className="mx-auto" size={36} aria-hidden /> : <Camera className="mx-auto" size={36} aria-hidden />}
                    <p className="mt-3 font-display text-lg font-bold leading-tight">{t.caption}</p>
                  </div>
                </div>
              ) : (
                <motion.button
                  type="button"
                  layoutId={`tile-${i}`}
                  onClick={() => setOpen(i)}
                  className={`group relative block w-full overflow-hidden rounded-[24px] text-left ${t.kind === 'art' ? 'aspect-square' : t.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                  style={t.kind === 'art' ? { background: `radial-gradient(circle at 50% 40%, ${t.item.theme[2]}, ${t.item.theme[1]} 60%, ${t.item.theme[0]})` } : undefined}
                  aria-label={`Open ${t.kind === 'art' ? t.item.name : t.caption}`}
                >
                  {t.kind === 'photo' ? (
                    <Photo name={t.name} alt={`${t.alt} (placeholder reference photo)`} sizes="(min-width:768px) 33vw, 50vw" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                  ) : (
                    <div className="h-full w-full p-4 transition-transform duration-700 group-hover:rotate-[-6deg] group-hover:scale-110"><ProductVisual item={t.item} /></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-choco-deep/80 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                  <span className="absolute bottom-3 left-4 right-4 font-display text-base font-bold leading-tight text-cream md:text-lg">
                    {t.kind === 'art' ? t.item.name : t.caption}
                  </span>
                  <span className="placeholder-badge absolute left-3 top-3">{t.kind === 'art' ? 'Illustration' : 'Placeholder'}</span>
                </motion.button>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && open !== null && current.kind !== 'soon' && (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center bg-choco-deep/90 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image"
          >
            <motion.div layoutId={`tile-${open}`} className="relative w-full max-w-3xl overflow-hidden rounded-[28px]" onClick={(e) => e.stopPropagation()}
              style={current.kind === 'art' ? { background: `radial-gradient(circle at 50% 40%, ${current.item.theme[2]}, ${current.item.theme[1]} 60%, ${current.item.theme[0]})` } : undefined}>
              {current.kind === 'photo' ? (
                <Photo name={current.name} alt={current.alt} sizes="90vw" className="max-h-[80vh] w-full object-contain" />
              ) : (
                <div className="mx-auto max-w-lg p-8"><ProductVisual item={current.item} /></div>
              )}
              <button type="button" onClick={() => setOpen(null)} className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-cream text-choco" aria-label="Close" autoFocus>
                <X size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
