import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Camera, Heart, MapPin } from 'lucide-react'
import { copy, features } from '../../config/business'
import { SplitHeading, Reveal } from '../ui/Reveal'
import { Photo } from '../ui/Photo'

const ICONS = { sparkles: Sparkles, camera: Camera, heart: Heart, 'map-pin': MapPin } as const
const CARD_TONES = ['bg-choco text-cream', 'bg-strawberry text-white', 'bg-caramel text-choco', 'bg-blueberry text-white']

export function Story() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], ['12%', '-12%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['-6%', '18%'])
  const rot = useTransform(scrollYProgress, [0, 1], [-6, 6])

  return (
    <section ref={ref} id="story" data-nav-theme="light" className="relative overflow-hidden bg-cream py-24 md:py-36">
      <div className="grain pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
        {/* parallax photo collage */}
        <div className="relative order-2 h-[520px] md:h-[640px] lg:order-1">
          <motion.figure style={{ y: reduce ? 0 : y1 }} className="absolute left-0 top-0 w-[68%] overflow-hidden rounded-[36px] shadow-[0_40px_80px_-40px_rgba(50,23,15,.8)]">
            <Photo name="ref-strawberry-chocolate" alt="Waffles with strawberries, chocolate drizzle and edible flowers (placeholder reference photo)" sizes="(min-width:1024px) 34vw, 68vw" className="aspect-[4/5] w-full object-cover" />
            <span className="placeholder-badge absolute bottom-3 left-3">Placeholder photo</span>
          </motion.figure>
          <motion.figure style={{ y: reduce ? 0 : y2, rotate: reduce ? 0 : rot }} className="absolute bottom-0 right-0 w-[56%] overflow-hidden rounded-[36px] border-[6px] border-cream shadow-[0_40px_80px_-30px_rgba(50,23,15,.8)]">
            <Photo name="ref-caramel-biscuit" alt="Stacked waffles with caramel sauce and biscuit crumble (placeholder reference photo)" sizes="(min-width:1024px) 28vw, 56vw" className="aspect-square w-full object-cover" />
            <span className="placeholder-badge absolute bottom-3 left-3">Placeholder photo</span>
          </motion.figure>
          <div className="absolute left-[54%] top-[44%] grid h-24 w-24 -translate-x-1/2 place-items-center rounded-full bg-caramel font-hand text-lg leading-tight text-choco shadow-xl">
            <span className="-rotate-12 text-center">made<br />for you</span>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal><p className="eyebrow mb-5 text-strawberry"><span className="h-px w-8 bg-strawberry" /> Our story</p></Reveal>
          <SplitHeading text={copy.storyHeadline} accent={['HAPPINESS']} className="font-display text-[clamp(2.1rem,4.6vw,4.2rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-choco" />
          {copy.storyParagraphs.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-choco/75">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <p className="mt-8 font-hand text-3xl text-milk">— see you at the counter ♡</p>
          </Reveal>
        </div>
      </div>

      {/* Why choose WAFFLEKAR */}
      <div className="relative mx-auto mt-28 max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SplitHeading text="Why WAFFLEKAR?" accent={['WAFFLEKAR?']} className="h-section text-choco" />
          <Reveal><p className="max-w-sm text-choco/70">Four little reasons the neighbourhood keeps coming back for one more bite.</p></Reveal>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = ICONS[f.icon]
            return (
              <Reveal key={f.title} delay={i * 0.08} className={i % 2 ? 'lg:mt-12' : ''}>
                <motion.article
                  whileHover={reduce ? undefined : { y: -8, rotate: i % 2 ? 1.5 : -1.5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className={`relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-[32px] p-7 ${CARD_TONES[i]}`}
                >
                  <div className="waffle-pattern pointer-events-none absolute -right-10 -top-10 h-40 w-40 rotate-12 rounded-[28px] opacity-60" />
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur"><Icon size={26} aria-hidden /></span>
                  <h3 className="mt-auto pt-10 font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-tight">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-80">{f.body}</p>
                </motion.article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
