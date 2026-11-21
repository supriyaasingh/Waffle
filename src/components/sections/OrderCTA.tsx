import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Phone, ExternalLink } from 'lucide-react'
import { links, ordering } from '../../config/business'
import { Magnetic } from '../ui/Magnetic'
import { WaffleArt } from '../waffle/WaffleArt'
import { itemById } from '../../config/menu'

export function OrderCTA() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rot = useTransform(scrollYProgress, [0, 1], [-40, 40])
  const rot2 = useTransform(scrollYProgress, [0, 1], [30, -30])
  const a = itemById('nutty-brownie-overload')!
  const b = itemById('strawberry-cream-dream')!

  return (
    <section ref={ref} id="order" data-nav-theme="dark" className="relative isolate overflow-hidden bg-choco-deep py-28 text-cream md:py-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_100%,#D99A42_0%,#70402C_30%,#1E0C06_70%)] opacity-90" />
      {/* drip edge from the section above */}
      <svg className="absolute inset-x-0 top-0 -z-[1] h-16 w-full" viewBox="0 0 1440 64" preserveAspectRatio="none" aria-hidden>
        <path d="M0 0 H1440 V18 C1380 18 1370 50 1340 50 C1310 50 1310 18 1260 18 H1000 C960 18 950 60 920 60 C890 60 890 18 840 18 H520 C480 18 470 44 440 44 C410 44 410 18 370 18 H160 C120 18 116 54 90 54 C64 54 60 18 0 18Z" fill="#F8E6C7" />
      </svg>

      <motion.div style={{ rotate: reduce ? 0 : rot }} className="pointer-events-none absolute -left-24 top-24 w-[46vw] max-w-[440px] opacity-90 max-md:-left-32 max-md:w-[70vw]" aria-hidden>
        <WaffleArt art={a.art} seed={a.id} />
      </motion.div>
      <motion.div style={{ rotate: reduce ? 0 : rot2 }} className="pointer-events-none absolute -bottom-16 -right-20 w-[42vw] max-w-[400px] opacity-90 max-md:-right-32 max-md:w-[64vw]" aria-hidden>
        <WaffleArt art={b.art} seed={b.id} />
      </motion.div>

      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <p className="font-hand text-3xl text-caramel">psst… you’re hungry</p>
        <h2 className="mt-3 font-display text-[clamp(3rem,10vw,8.5rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.035em]">
          Craving something <span className="text-caramel">sweet?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg text-cream/80">Don’t just scroll past your cravings. Make them happen.</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic>
            <a href={links.call} className="btn btn-gold !min-h-14 !px-8 text-base"><Phone size={18} aria-hidden /> Call Now</a>
          </Magnetic>
          {Object.entries(ordering).map(([k, o]) =>
            o.url ? (
              <Magnetic key={k}>
                <a href={o.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light !min-h-14 !px-8 text-base">
                  Order on {o.label} <ExternalLink size={16} aria-hidden />
                </a>
              </Magnetic>
            ) : (
              <span key={k} className="btn btn-ghost-light !min-h-14 !px-8 text-base" aria-disabled="true" title={`${o.label} ordering link coming soon`}>
                Order on {o.label} · <span className="font-hand text-lg">soon</span>
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
