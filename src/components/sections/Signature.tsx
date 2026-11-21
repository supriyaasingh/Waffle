import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { menu } from '../../config/menu'
import { SignatureCard } from '../menu/ProductCard'
import { SplitHeading, Reveal } from '../ui/Reveal'

export function Signature() {
  const rail = useRef<HTMLDivElement>(null)
  const scrollBy = (dir: number) => {
    const el = rail.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 700), behavior: 'smooth' })
  }
  const items = menu.filter((m) => m.signature)

  return (
    <section id="signature" data-nav-theme="light" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="grain pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal><p className="eyebrow mb-4 text-strawberry"><span className="h-px w-8 bg-strawberry" /> The signature collection</p></Reveal>
            <SplitHeading text="Eleven ways to fall in love." accent={['love']} className="h-section max-w-3xl text-choco" />
          </div>
          <Reveal delay={0.2} className="flex items-center gap-3">
            <p className="max-w-xs text-sm text-choco/70 md:text-right">Swipe through the line-up. Tap <b>Add to order</b> to build your plate.</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => scrollBy(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-choco/20 transition hover:bg-choco hover:text-cream" aria-label="Previous waffles"><ArrowLeft size={20} /></button>
              <button type="button" onClick={() => scrollBy(1)} className="grid h-12 w-12 place-items-center rounded-full bg-choco text-cream transition hover:bg-milk" aria-label="Next waffles"><ArrowRight size={20} /></button>
            </div>
          </Reveal>
        </div>
      </div>
      <div
        ref={rail}
        className="no-scrollbar relative mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-16 pt-4 md:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        role="list"
        aria-label="Signature waffles"
      >
        {items.map((m, i) => (
          <div role="listitem" key={m.id} className="contents">
            <SignatureCard item={m} index={i} />
          </div>
        ))}
        <div className="w-1 shrink-0" aria-hidden />
      </div>
      <p className="relative mx-auto max-w-7xl px-5 text-xs text-choco/50 md:px-8">
        Illustrations shown — real WAFFLEKAR product photos coming soon. Prices are the currently published menu prices and may change.
      </p>
    </section>
  )
}
