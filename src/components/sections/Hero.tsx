import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, ShoppingBag, ChevronDown } from 'lucide-react'
import { Magnetic } from '../ui/Magnetic'
import { ToppingGlyph } from '../waffle/parts'
import type { Topping } from '../../config/menu'
import { menu } from '../../config/menu'
import { Photo } from '../ui/Photo'

const FLOATERS: { t: Topping; x: string; y: string; s: number; depth: number }[] = [
  { t: 'strawberry', x: '8%', y: '20%', s: 1.6, depth: 30 },
  { t: 'chocchunk', x: '46%', y: '12%', s: 1.3, depth: -20 },
  { t: 'blueberry', x: '4%', y: '78%', s: 1.3, depth: 24 },
  { t: 'almond', x: '52%', y: '84%', s: 1.4, depth: -30 },
  { t: 'cookie', x: '93%', y: '14%', s: 1.4, depth: 18 },
  { t: 'strawberry', x: '90%', y: '86%', s: 1.2, depth: -16 },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return
    mx.set(e.clientX / window.innerWidth - 0.5)
    my.set(e.clientY / window.innerHeight - 0.5)
  }

  return (
    <section
      ref={ref}
      id="home"
      data-nav-theme="dark"
      onPointerMove={onMove}
      className="relative isolate min-h-[100svh] overflow-hidden bg-choco-deep text-cream"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_40%,#70402C_0%,#32170F_45%,#1E0C06_100%)]" />
      <div className="waffle-pattern absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* floating ingredients with pointer parallax */}
      {FLOATERS.map((f, i) => (
        <Floater key={i} f={f} sx={sx} sy={sy} i={i} />
      ))}

      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-5 pb-28 pt-28 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-6 lg:pb-20">
        <motion.div style={{ y: reduce ? 0 : textY }} className="relative z-10">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="eyebrow mb-6 text-caramel"
          >
            <span className="h-px w-10 bg-caramel" /> Waffles · Croffles · Desserts — Bhandup West
          </motion.p>
          <h1 className="font-display text-[clamp(3.2rem,9.2vw,8.6rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.035em]">
            {['Waffles that', 'make you', 'go'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                  {i === 2 && (
                    <span className="relative ml-[0.18em] inline-block text-caramel">
                      wow.
                      <motion.svg
                        viewBox="0 0 200 30"
                        className="absolute -bottom-[0.12em] left-0 w-full"
                        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                        animate={{ opacity: 1 }}
                        aria-hidden
                      >
                        <motion.path
                          d="M4 20 C40 4 80 28 120 14 S180 8 196 18"
                          stroke="#E85B62"
                          strokeWidth="6"
                          strokeLinecap="round"
                          fill="none"
                          initial={reduce ? false : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.9, delay: 1.1, ease: 'easeInOut' }}
                        />
                      </motion.svg>
                    </span>
                  )}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-7 max-w-lg text-lg leading-relaxed text-cream/80 md:text-xl"
          >
            From golden honey butter dreams to chocolate-loaded indulgence, discover your next obsession.
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Magnetic>
              <a href="#menu" className="btn btn-gold">Explore Menu <ArrowRight size={18} aria-hidden /></a>
            </Magnetic>
            <Magnetic>
              <a href="#order" className="btn btn-ghost-light">Order Now <ShoppingBag size={18} aria-hidden /></a>
            </Magnetic>
          </motion.div>
          <motion.dl
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-10 flex gap-8 text-sm text-cream/70"
          >
            <div>
              <dt className="sr-only">Flavours</dt>
              <dd><span className="font-display text-3xl font-extrabold text-cream">{menu.length}</span> signature flavours</dd>
            </div>
            <div>
              <dt className="sr-only">Starting price</dt>
              <dd>from <span className="font-display text-3xl font-extrabold text-cream">₹{Math.min(...menu.map((m) => m.price))}</span></dd>
            </div>
          </motion.dl>
        </motion.div>

        {/* cinematic photo stack */}
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <motion.div
            initial={reduce ? false : { clipPath: 'inset(100% 0 0 0 round 999px 999px 32px 32px)' }}
            animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 32px 32px)' }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.7, 0, 0.2, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[32px] shadow-[0_40px_120px_-30px_rgba(0,0,0,.8)] max-lg:aspect-[5/5]"
          >
            <motion.div style={{ y: reduce ? 0 : imgY }} className="absolute inset-[-10%_0]">
              <Photo
                name="ref-chocolate-pour"
                alt="Chocolate sauce being poured over a scoop on a golden waffle (placeholder reference photo)"
                priority
                sizes="(min-width:1024px) 45vw, 90vw"
                className="h-full w-full object-cover object-[50%_40%]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-choco-deep/60 via-transparent to-transparent" />
            <span className="placeholder-badge absolute bottom-4 left-4">Placeholder photo</span>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ duration: 1, delay: 1, type: 'spring', bounce: 0.35 }}
            className="absolute -bottom-6 -left-4 w-[42%] overflow-hidden rounded-[28px] border-4 border-cream shadow-2xl md:-left-10"
          >
            <Photo name="ref-sugar-dust" alt="Waffle with strawberries, mint and chocolate dusted with sugar (placeholder reference photo)" sizes="200px" className="aspect-square w-full object-cover" />
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, type: 'spring' }}
            className="absolute -right-2 top-[12%] grid h-28 w-28 place-items-center rounded-full bg-strawberry text-center font-hand text-xl leading-tight text-white shadow-xl md:h-32 md:w-32 md:text-2xl"
          >
            <span className="rotate-[10deg]">fresh &<br />loaded!</span>
          </motion.div>
        </div>
      </div>

      {/* marquee */}
      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-cream/10 bg-caramel py-3 text-choco">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-lg font-extrabold uppercase tracking-tight">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-8" aria-hidden={k === 1}>
              {menu.map((m) => (
                <span key={m.id} className="flex items-center gap-8">
                  {m.name} <span className="text-strawberry">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <a href="#journey" className="absolute bottom-16 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[11px] uppercase tracking-[0.3em] text-cream/60 hover:text-cream md:flex" aria-label="Scroll to see a waffle being made">
        Scroll
        <ChevronDown className="bob" size={20} aria-hidden />
      </a>
    </section>
  )
}

function Floater({ f, sx, sy, i }: { f: (typeof FLOATERS)[number]; sx: ReturnType<typeof useSpring>; sy: ReturnType<typeof useSpring>; i: number }) {
  const x = useTransform(sx, (v) => v * f.depth * 2)
  const y = useTransform(sy, (v) => v * f.depth * 2)
  return (
    <motion.div style={{ left: f.x, top: f.y, x, y }} className={`pointer-events-none absolute -z-[1] ${i > 3 ? 'max-md:hidden' : ''}`} aria-hidden>
      <svg width={44 * f.s} height={44 * f.s} viewBox="-22 -22 44 44" className="float-slow drop-shadow-[0_10px_20px_rgba(0,0,0,.5)]" style={{ animationDelay: `${i * 0.7}s` }}>
        <ToppingGlyph type={f.t} seed={i / 6} />
      </svg>
    </motion.div>
  )
}
