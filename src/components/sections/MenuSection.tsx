import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Search, X, Phone, Info } from 'lucide-react'
import { categories, menu, pricesConfirmed, type CategoryId } from '../../config/menu'
import { MenuCard } from '../menu/ProductCard'
import { SplitHeading, Reveal } from '../ui/Reveal'
import { links } from '../../config/business'

type Filter = 'all' | CategoryId

export function MenuSection() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const cats = categories.filter((c) => c.visible)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return menu.filter(
      (m) => (filter === 'all' || m.category === filter) && (!q || `${m.name} ${m.description} ${m.art.toppings.join(' ')}`.toLowerCase().includes(q)),
    )
  }, [filter, query])

  const activeCat = cats.find((c) => c.id === filter)

  return (
    <section id="menu" data-nav-theme="light" className="relative bg-cream-2 py-24 md:py-32">
      <div className="waffle-pattern pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_40%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal><p className="eyebrow mb-4 text-caramel-deep"><span className="h-px w-8 bg-caramel" /> The full menu</p></Reveal>
            <SplitHeading text="Choose your craving." accent={['craving']} className="h-section text-choco" />
          </div>
          <Reveal delay={0.15}>
            <label className="group relative flex w-full items-center lg:w-[340px]">
              <span className="sr-only">Search the menu</span>
              <Search size={18} className="pointer-events-none absolute left-4 text-choco/50" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search — try “cheese” or “almond”"
                className="h-14 w-full rounded-full border border-choco/15 bg-white pl-11 pr-12 text-[16px] shadow-sm outline-none transition placeholder:text-choco/40 focus:border-caramel focus:ring-4 focus:ring-caramel/20"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="absolute right-2 grid h-10 w-10 place-items-center rounded-full hover:bg-choco/5" aria-label="Clear search">
                  <X size={16} />
                </button>
              )}
            </label>
          </Reveal>
        </div>

        {/* category chips */}
        <LayoutGroup>
          <div role="tablist" aria-label="Menu categories" className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
            {([{ id: 'all', label: 'All' }, ...cats] as { id: Filter; label: string }[]).map((c) => {
              const n = c.id === 'all' ? menu.length : menu.filter((m) => m.category === c.id).length
              const on = filter === c.id
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={on}
                  type="button"
                  onClick={() => setFilter(c.id)}
                  className={`relative shrink-0 rounded-full px-5 py-3 text-sm font-bold transition-colors ${on ? 'text-cream' : 'bg-white/70 text-choco/75 hover:text-choco'}`}
                >
                  {on && <motion.span layoutId="menu-chip" className="absolute inset-0 -z-0 rounded-full bg-choco" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  <span className="relative">{c.label} <span className={on ? 'text-caramel' : 'text-choco/40'}>{n}</span></span>
                </button>
              )
            })}
          </div>
        </LayoutGroup>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {results.map((m) => (
              <MenuCard key={m.id} item={m} />
            ))}
          </AnimatePresence>
        </div>

        {results.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 rounded-[28px] border-2 border-dashed border-choco/15 bg-white/60 p-8 text-center">
            <p className="font-display text-2xl font-extrabold">
              {activeCat?.emptyNote && !query ? `${activeCat.label} — coming to the online menu` : 'No waffles match that search.'}
            </p>
            <p className="mx-auto mt-2 max-w-md text-choco/65">
              {activeCat?.emptyNote && !query ? activeCat.emptyNote : 'Try another flavour — or call us and we’ll help you pick.'}
            </p>
            <a href={links.call} className="btn btn-choco mt-5"><Phone size={16} /> Call WAFFLEKAR</a>
          </motion.div>
        )}

        {!pricesConfirmed && (
          <p className="mt-8 flex items-start gap-2 text-xs text-choco/55">
            <Info size={14} className="mt-0.5 shrink-0" aria-hidden />
            Prices shown are the currently published menu prices and may change — please confirm when you order. Images are illustrations.
          </p>
        )}
      </div>
    </section>
  )
}
