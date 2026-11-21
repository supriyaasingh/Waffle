import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { W, WaffleBody, ToppingGlyph, pocketRects } from '../waffle/parts'
import { sauce } from '../waffle/WaffleArt'
import type { Topping } from '../../config/menu'
import { Magnetic } from '../ui/Magnetic'

gsap.registerPlugin(ScrollTrigger)

const RAW = '#F1DAA6'
const GOLD = '#D8933A'
const CHOC = '#3A1A0E'

/** Toppings that assemble on the hero waffle, in the order they land. */
const TOPPINGS: { t: Topping; x: number; y: number; r: number; s: number }[] = [
  { t: 'strawberry', x: 150, y: 150, r: -20, s: 1.25 },
  { t: 'strawberry', x: 262, y: 236, r: 25, s: 1.2 },
  { t: 'cookie', x: 248, y: 140, r: 0, s: 1.1 },
  { t: 'almond', x: 196, y: 214, r: 40, s: 1.05 },
  { t: 'chocchunk', x: 128, y: 250, r: 12, s: 1.1 },
  { t: 'strawberry', x: 196, y: 296, r: 160, s: 1.05 },
  { t: 'almond', x: 290, y: 176, r: -60, s: 1 },
  { t: 'chocchunk', x: 228, y: 106, r: -18, s: 0.95 },
  { t: 'cookie', x: 110, y: 186, r: 30, s: 0.95 },
  { t: 'blueberry', x: 300, y: 290, r: 0, s: 1 },
  { t: 'almond', x: 150, y: 312, r: 100, s: 0.95 },
]

/** Ingredients that burst around the waffle in the chocolate explosion. */
const ORBIT: { t: Topping; x: number; y: number; s: number; d: number }[] = [
  { t: 'strawberry', x: -38, y: -30, s: 2.2, d: 0 },
  { t: 'chocchunk', x: 36, y: -34, s: 2, d: 1 },
  { t: 'almond', x: 42, y: 8, s: 1.8, d: 2 },
  { t: 'blueberry', x: -44, y: 14, s: 1.9, d: 3 },
  { t: 'cookie', x: -26, y: 36, s: 2, d: 4 },
  { t: 'walnut', x: 30, y: 36, s: 1.9, d: 5 },
  { t: 'strawberry', x: 12, y: -44, s: 1.6, d: 6 },
  { t: 'chocchunk', x: -14, y: 46, s: 1.5, d: 7 },
]

const STEPS = ['Batter meets heat', 'The grid takes shape', 'Golden & crisp', 'The chocolate pour', 'Toppings, one by one']

const DROPS = [
  { l: '12%', t: '22%', s: 22, d: 0 },
  { l: '84%', t: '18%', s: 16, d: 1.2 },
  { l: '76%', t: '70%', s: 26, d: 2.1 },
  { l: '18%', t: '74%', s: 18, d: 0.6 },
  { l: '50%', t: '10%', s: 12, d: 1.7 },
  { l: '92%', t: '46%', s: 14, d: 2.6 },
  { l: '6%', t: '48%', s: 14, d: 3.1 },
]

function Drop({ size, color = CHOC }: { size: number; color?: string }) {
  return (
    <svg width={size} height={size * 1.35} viewBox="0 0 20 27" aria-hidden>
      <path d="M10 0 C14 8 20 13 20 18 A10 9 0 0 1 0 18 C0 13 6 8 10 0Z" fill={color} />
      <ellipse cx="6.5" cy="17" rx="2.2" ry="3.4" fill="#fff" opacity=".28" />
    </svg>
  )
}

export function WaffleJourney() {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const q = gsap.utils.selector(el)
    const mm = gsap.matchMedia()

    mm.add(
      {
        desktop: '(min-width: 1024px)',
        mobile: '(max-width: 1023px)',
        reduce: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { desktop, reduce } = ctx.conditions as { desktop: boolean; mobile: boolean; reduce: boolean }

        // ── initial states ──────────────────────────────────────────────
        gsap.set(q('.j-pocket'), { scale: 0.55, opacity: 0.35, transformOrigin: '50% 50%' })
        gsap.set(q('.j-gold'), { opacity: 0 })
        gsap.set(q('.j-spread'), { attr: { r: 0 } })
        gsap.set(q('.j-drizzle'), { strokeDashoffset: 1, opacity: 0 })
        gsap.set(q('.j-drip'), { scaleY: 0, transformOrigin: '50% 0%' })
        gsap.set(q('.j-topping'), { y: -460, opacity: 0, rotation: -90, transformOrigin: '50% 50%' })
        gsap.set(q('.j-stream'), { scaleY: 0, transformOrigin: '50% 0%' })
        gsap.set(q('.j-batter-stream'), { scaleY: 0, transformOrigin: '50% 0%' })
        gsap.set(q('.j-ripple'), { attr: { r: 0 }, opacity: 0.9 })
        gsap.set(q('.j-wave'), { yPercent: 105 })
        gsap.set(q('.j-choc-bg'), { opacity: 0 })
        gsap.set(q('.j-cream-bg'), { opacity: 0 })
        gsap.set(q('.j-orbit'), { opacity: 0, scale: 0, x: 0, y: 0 })
        gsap.set(q('.j-steps, .j-cap-3, .j-cap-4'), { autoAlpha: 0 })
        gsap.set(q('.j-cap-3 .j-line > span, .j-cap-4 .j-line > span'), { yPercent: 110 })
        gsap.set(q('.j-halo'), { opacity: 0, scale: 0.6 })
        gsap.set(q('.j-step'), { opacity: 0.35 })
        gsap.set(q('.j-mstep'), { autoAlpha: 0, yPercent: 60 })
        gsap.set(q('.j-tilt'), { rotationX: 42, rotationZ: -12 })
        // Scene 1: waffle sits low & smaller so the headline stays readable
        gsap.set(q('.j-move'), { y: desktop ? '8vh' : '-3vh', scale: desktop ? 0.62 : 0.6 })

        // ── load intro (Scene 1) — independent wrappers so it never fights scroll ──
        if (!reduce) {
          gsap.from(q('.j-enter'), { y: 140, scale: 0.7, opacity: 0, rotation: -25, duration: 1.6, ease: 'expo.out', delay: 0.2 })
          gsap.from(q('.j-cap-1 .j-line > span'), { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.12, delay: 0.1 })
          gsap.from(q('.j-cap-1 .j-fade'), { y: 24, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.6 })
        }

        // ── scroll timeline (Scenes 2 → 4) ──────────────────────────────
        const tl = gsap.timeline({ defaults: { ease: 'none' }, paused: reduce })
        const sideX = desktop ? '22vw' : '0vw'
        const sideY = desktop ? '0vh' : '-9vh'

        tl.addLabel('prep')
          // Scene 1 out
          .to(q('.j-cap-1'), { autoAlpha: 0, y: -80, duration: 0.8 }, 0)
          .to(q('.j-atmos'), { opacity: 0, duration: 1 }, 0)
          .to(q('.j-cream-bg'), { opacity: 1, duration: 1 }, 0)
          .to(q('.j-move'), { x: sideX, y: sideY, scale: desktop ? 1 : 0.82, duration: 1.2, ease: 'power1.inOut' }, 0)
          .to(q('.j-tilt'), { rotationX: desktop ? 38 : 24, rotationZ: -8, duration: 1.2, ease: 'power1.inOut' }, 0)
          .to(q('.j-steps'), { autoAlpha: 1, duration: 0.4 }, 0.6)
          // 01 Batter meets heat
          .to(q('.j-batter-stream'), { scaleY: 1, duration: 0.5, ease: 'power2.in' }, 0.2)
          .to(q('.j-ripple'), { attr: { r: 210 }, opacity: 0, duration: 1, ease: 'power2.out' }, 0.6)
          .set(q('.j-batter-stream'), { transformOrigin: '50% 100%' }, 0.95)
          .to(q('.j-batter-stream'), { scaleY: 0, duration: 0.35 }, 0.95)
          // 02 The grid takes shape
          .to(q('.j-pocket'), { scale: 1, opacity: 1, duration: 0.5, stagger: { each: 0.05, from: 'center', grid: [4, 4] }, ease: 'back.out(2)' }, 1.3)
          .to(q('.j-tilt'), { rotationZ: 6, duration: 1.2 }, 1.3)
          // 03 Golden & crisp
          .to(q('.j-gold'), { opacity: 1, duration: 1, ease: 'power1.inOut' }, 2.4)
          .to(q('.j-tilt'), { rotationX: desktop ? 18 : 12, duration: 1 }, 2.4)
          .to(q('.j-steam'), { opacity: 1, duration: 0.6 }, 2.6)
          // 04 The chocolate pour
          .to(q('.j-stream'), { scaleY: 1, duration: 0.5, ease: 'power2.in' }, 3.5)
          .to(q('.j-spread'), { attr: { r: 250 }, duration: 1.2, ease: 'power1.out' }, 3.9)
          .to(q('.j-drizzle'), { strokeDashoffset: 0, opacity: 1, duration: 0.5, stagger: 0.15 }, 4.1)
          .to(q('.j-drip'), { scaleY: 1, duration: 0.5, stagger: 0.15, ease: 'power2.in' }, 4.6)
          .set(q('.j-stream'), { transformOrigin: '50% 100%' }, 4.8)
          .to(q('.j-stream'), { scaleY: 0, duration: 0.3 }, 4.8)
          .to(q('.j-steam'), { opacity: 0.5, duration: 0.4 }, 4.8)
          // 05 Toppings, one by one
          .to(q('.j-topping'), { y: 0, opacity: 1, rotation: 0, duration: 0.45, stagger: 0.12, ease: 'bounce.out' }, 5.1)
          .to(q('.j-tilt'), { rotationZ: -4, duration: 1.6 }, 5.1)
          .addLabel('explosion', 6.6)
          // Scene 3 — chocolate explosion
          .to(q('.j-steps'), { autoAlpha: 0, y: -40, duration: 0.4 }, 6.6)
          .to(q('.j-move'), { x: 0, y: desktop ? '12vh' : '8vh', scale: desktop ? 0.98 : 0.9, duration: 1, ease: 'power2.inOut' }, 6.6)
          .to(q('.j-tilt'), { rotationX: 0, rotationZ: 0, duration: 1, ease: 'power2.inOut' }, 6.6)
          .to(q('.j-wave'), { yPercent: 0, duration: 1.1, ease: 'power2.inOut' }, 6.7)
          .set(q('.j-choc-bg'), { opacity: 1 }, 7.8)
          .to(q('.j-wave'), { yPercent: -110, duration: 0.6, ease: 'power1.in' }, 7.8)
          .to(q('.j-orbit'), {
            opacity: 1,
            scale: (i: number) => ORBIT[i]?.s ?? 1,
            x: (i: number) => `${(ORBIT[i]?.x ?? 0) * (desktop ? 1 : 0.85)}vmin`,
            y: (i: number) => `${(ORBIT[i]?.y ?? 0) * (desktop ? 1 : 0.85)}vmin`,
            rotation: (i: number) => (i % 2 ? 40 : -40),
            duration: 1,
            stagger: 0.04,
            ease: 'expo.out',
          }, 7.2)
          .to(q('.j-cap-3'), { autoAlpha: 1, duration: 0.01 }, 7.4)
          .to(q('.j-cap-3 .j-line > span'), { yPercent: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }, 7.4)
          // Scene 4 — reveal
          .addLabel('reveal', 8.8)
          .to(q('.j-cap-3 .j-line > span'), { yPercent: -110, duration: 0.5, stagger: 0.08, ease: 'power2.in' }, 8.8)
          .to(q('.j-cap-3'), { autoAlpha: 0, duration: 0.01 }, 9.4)
          .to(q('.j-orbit'), {
            x: (i: number) => `${(ORBIT[i]?.x ?? 0) * (desktop ? 1.7 : 1.15)}vmin`,
            y: (i: number) => `${Math.max(-20, (ORBIT[i]?.y ?? 0) * 1.1)}vmin`,
            opacity: 0.55,
            duration: 1,
          }, 8.8)
          .to(q('.j-move'), { scale: desktop ? 0.88 : 0.8, y: desktop ? '8vh' : '6vh', duration: 1, ease: 'power2.inOut' }, 8.8)
          .to(q('.j-halo'), { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, 8.9)
          .to(q('.j-cap-4'), { autoAlpha: 1, duration: 0.01 }, 9.2)
          .to(q('.j-cap-4 .j-line > span'), { yPercent: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, 9.2)
          .from(q('.j-cap-4 .j-fade'), { y: 30, opacity: 0, duration: 0.5 }, 9.6)
          .to({}, { duration: 0.6 }) // hold the final frame

        // step indicator (desktop list + mobile ticker share the same timing)
        const stepAt = [0.3, 1.3, 2.4, 3.5, 5.1, 6.6]
        STEPS.forEach((_, i) => {
          tl.to(q(`.j-step-${i}`), { opacity: 1, duration: 0.2 }, stepAt[i])
            .to(q(`.j-step-${i}`), { opacity: 0.35, duration: 0.2 }, stepAt[i + 1])
            .to(q(`.j-mstep-${i}`), { autoAlpha: 1, yPercent: 0, duration: 0.2 }, stepAt[i])
          if (i < STEPS.length - 1) tl.to(q(`.j-mstep-${i}`), { autoAlpha: 0, yPercent: -60, duration: 0.2 }, stepAt[i + 1])
        })

        if (reduce) {
          tl.progress(1)
          gsap.set(q('.j-fade'), { clearProps: 'transform,opacity' })
          return
        }

        ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: () => `+=${window.innerHeight * (desktop ? 7 : 5)}`,
          pin: true,
          scrub: desktop ? 0.9 : 0.6,
          animation: tl,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            el.style.setProperty('--journey', self.progress.toFixed(3))
            // nav reads this to switch between light/dark styling
            el.dataset.navTheme = self.progress > 0.05 && self.progress < 0.72 ? 'light' : 'dark'
          },
        })
      },
    )
    return () => mm.revert()
  }, [])

  return (
    <section
      ref={root}
      id="journey"
      data-nav-theme="dark"
      aria-label="The making of a WAFFLEKAR waffle"
      className="journey relative h-[100svh] w-full overflow-hidden"
    >
      {/* ── backgrounds ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,#8A4F22_0%,#4A2212_45%,#1E0C06_100%)]" />
      <div className="j-atmos absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(217,154,66,.55),transparent_55%)]" />
      <div className="j-cream-bg absolute inset-0 bg-cream">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_55%,rgba(217,154,66,.28),transparent_60%)]" />
        <div className="grain absolute inset-0 opacity-40" />
      </div>
      <div className="j-choc-bg absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,#5A2C17_0%,#32170F_55%,#1A0905_100%)]" />

      {/* chocolate wave that floods the screen */}
      <svg className="j-wave pointer-events-none absolute inset-x-0 -top-[10%] h-[130%] w-full" viewBox="0 0 1440 1200" preserveAspectRatio="none" aria-hidden>
        <path
          d="M0 120 C120 40 260 180 400 110 C520 50 600 160 720 120 C840 80 940 190 1080 120 C1200 60 1320 150 1440 100 V1200 H0Z"
          fill={CHOC}
        />
        <path d="M0 150 C140 90 260 200 420 140 C560 90 640 190 760 150 C900 110 1000 210 1120 150 C1240 100 1340 170 1440 140" stroke="#5A2C17" strokeWidth="18" fill="none" />
        {[180, 520, 860, 1210].map((x, i) => (
          <path key={x} d={`M${x} 110 C${x - 10} 200 ${x - 14} ${260 + i * 30} ${x} ${290 + i * 30} C${x + 14} ${260 + i * 30} ${x + 10} 200 ${x} 110Z`} fill={CHOC} />
        ))}
      </svg>

      {/* floating droplets */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {DROPS.map((d, i) => (
          <div key={i} className={`float-drop absolute ${i > 3 ? 'max-md:hidden' : ''}`} style={{ left: d.l, top: d.t, animationDelay: `${d.d}s` }}>
            <Drop size={d.s} color={i % 3 === 0 ? '#70402C' : CHOC} />
          </div>
        ))}
      </div>

      {/* Scene 1 headline — sits BEHIND the waffle */}
      <div className="j-cap-1 absolute inset-0 z-[1] flex flex-col items-center justify-between px-4 pb-[max(2rem,6vh)] pt-[max(6rem,12vh)] text-center">
        <div>
          <p className="j-fade mb-4 font-hand text-2xl text-caramel md:text-3xl">fresh off the iron ✦ Bhandup West</p>
          <h2 className="font-display text-[clamp(2.9rem,8.6vw,8.4rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.03em] text-cream">
            <span className="j-line block overflow-hidden"><span className="block">Good days start</span></span>
            <span className="j-line block overflow-hidden"><span className="block">with <em className="not-italic text-caramel">waffles.</em></span></span>
          </h2>
        </div>
        <div className="relative z-[3] flex flex-col items-center gap-5">
          <p className="j-fade max-w-md text-base text-cream/85 md:text-lg">
            Golden, crispy, chocolate-loaded happiness. Your next favourite bite is waiting.
          </p>
          <div className="j-fade flex flex-wrap justify-center gap-3">
            <Magnetic>
              <a href="#menu" className="btn btn-gold">Explore Our Menu <ArrowRight size={18} aria-hidden /></a>
            </Magnetic>
            <Magnetic>
              <a href="#order" className="btn btn-ghost-light">Order Your Cravings <ShoppingBag size={18} aria-hidden /></a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* step list (Scene 2) */}
      <div className="j-steps absolute z-[3] max-lg:inset-x-0 max-lg:bottom-[5vh] max-lg:px-6 lg:left-[7vw] lg:top-1/2 lg:-translate-y-1/2">
        <p className="mb-2 font-hand text-2xl text-strawberry lg:mb-4 lg:text-3xl">how happiness is made</p>
        <ol className="grid gap-3 font-display text-choco max-lg:hidden">
          {STEPS.map((s, i) => (
            <li key={s} className={`j-step j-step-${i} flex items-baseline gap-3`}>
              <span className="text-sm font-bold text-caramel">0{i + 1}</span>
              <span className="text-[clamp(1.4rem,3vw,2.75rem)] font-extrabold uppercase leading-none tracking-tight">{s}</span>
            </li>
          ))}
        </ol>
        <MobileStepTicker />
      </div>

      {/* Scene 3 + 4 captions */}
      <div className="j-cap-3 pointer-events-none absolute inset-x-0 top-[11vh] z-[3] px-4 text-center">
        <h2 className="font-display text-[clamp(2.6rem,9vw,9rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.03em] text-cream">
          <span className="j-line block overflow-hidden"><span className="block">Resisting this</span></span>
          <span className="j-line block overflow-hidden"><span className="block text-caramel">is not an option.</span></span>
        </h2>
      </div>
      <div className="j-cap-4 absolute inset-x-0 top-[12vh] z-[3] flex flex-col items-center px-4 text-center">
        <h2 className="font-display text-[clamp(2.4rem,7.5vw,7.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.03em] text-cream">
          <span className="j-line block overflow-hidden"><span className="block">Made to crave.</span></span>
          <span className="j-line block overflow-hidden"><span className="block text-caramel">Impossible to forget.</span></span>
        </h2>
      </div>
      <div className="j-cap-4 absolute inset-x-0 bottom-[6vh] z-[4] flex justify-center">
        <div className="j-fade">
          <Magnetic>
            <a href="#signature" className="btn btn-gold text-base">Find your favourite <ArrowRight size={18} aria-hidden /></a>
          </Magnetic>
        </div>
      </div>

      {/* ── the waffle stage ── */}
      <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center pt-[12vh]">
        <div className="j-move relative will-change-transform">
          <div className="j-halo absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(217,154,66,.55),rgba(217,154,66,0)_65%)]" />
          {/* orbiting ingredients (explosion) */}
          {ORBIT.map((o, i) => (
            <div key={i} className={`j-orbit absolute left-1/2 top-1/2 ${i > 5 ? 'max-md:hidden' : ''}`}>
              <svg width="44" height="44" viewBox="-22 -22 44 44" className="float-slow -ml-[22px] -mt-[22px]" style={{ animationDelay: `${o.d * 0.4}s` }} aria-hidden>
                <ToppingGlyph type={o.t} seed={i / 8} />
              </svg>
            </div>
          ))}
          {/* pour streams (screen-space vertical) */}
          <div className="j-batter-stream absolute bottom-1/2 left-1/2 h-[70vh] w-[14px] -translate-x-1/2 rounded-b-full bg-gradient-to-r from-[#E9CC90] via-[#FFF1D0] to-[#E9CC90]" />
          <div className="j-stream absolute bottom-[48%] left-[46%] h-[72vh] w-[18px] -translate-x-1/2 rounded-b-full bg-gradient-to-r from-[#24100A] via-[#6A3A22] to-[#24100A]" />
          <div className="j-enter">
            <div className="persp">
              <div className="j-tilt">
                <div className="sway">
                  <JourneyWaffle />
                </div>
              </div>
            </div>
          </div>
          {/* steam */}
          <svg className="j-steam steam pointer-events-none absolute -top-[22%] left-1/2 h-[45%] w-[60%] -translate-x-1/2" viewBox="0 0 200 160" aria-hidden>
            {[60, 100, 140].map((x, i) => (
              <path key={x} d={`M${x} 160 C${x - 20} 120 ${x + 20} 90 ${x} 50 C${x - 14} 25 ${x + 6} 10 ${x} 0`} stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" style={{ animationDelay: `${i * 0.9}s` }} />
            ))}
          </svg>
        </div>
      </div>

      {/* scroll hint */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 z-[3] -translate-x-1/2 text-center text-[11px] uppercase tracking-[0.3em] text-cream/50 opacity-[calc(1-var(--journey,0)*20)] max-md:hidden">
        scroll to bake
      </div>
    </section>
  )
}

/** Mobile shows one step at a time; reads the same opacity GSAP sets on .j-step. */
function MobileStepTicker() {
  return (
    <div className="lg:hidden">
      <div className="relative h-[2.2em] overflow-hidden font-display text-[1.65rem] font-extrabold uppercase leading-none text-choco">
        {STEPS.map((s, i) => (
          <span key={s} className={`j-mstep j-mstep-${i} absolute inset-x-0 top-0 flex items-baseline gap-3`}>
            <span className="text-sm font-bold text-caramel">0{i + 1}</span>
            {s}
          </span>
        ))}
      </div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-choco/10">
        <div className="h-full origin-left rounded-full bg-caramel" style={{ transform: 'scaleX(calc((var(--journey,0) - .08) * 1.6))' }} />
      </div>
    </div>
  )
}

/** The one waffle that is baked, sauced and topped as you scroll. */
function JourneyWaffle() {
  return (
    <svg viewBox="0 0 400 400" className="block h-[min(62vmin,560px)] w-[min(62vmin,560px)] max-md:h-[78vmin] max-md:w-[78vmin] overflow-visible" role="img" aria-label="A waffle being baked, covered in chocolate and topped with strawberries, cookie crumbs and almonds">
      <defs>
        <clipPath id="j-clip">
          <rect x={W.x} y={W.y} width={W.size} height={W.size + 14} rx={W.r} />
        </clipPath>
        <clipPath id="j-spread-clip">
          <circle className="j-spread" cx="200" cy="200" r="0" />
        </clipPath>
        <radialGradient id="j-shadow">
          <stop offset=".45" stopColor="#000" stopOpacity=".5" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="j-choc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6A3A22" />
          <stop offset=".5" stopColor={CHOC} />
          <stop offset="1" stopColor="#1C0B05" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="372" rx="175" ry="28" fill="url(#j-shadow)" />

      {/* raw batter waffle */}
      <g>
        <WaffleBody uid="jraw" base={RAW} grid={false} />
        {pocketRects.map((p, i) => (
          <rect key={i} className="j-pocket" x={p.x} y={p.y} width={p.s} height={p.s} rx="9" fill="#D6B57A" />
        ))}
      </g>
      {/* golden waffle (crossfades in = browning) */}
      <g className="j-gold">
        <WaffleBody uid="jgold" base={GOLD} />
      </g>
      {/* batter ripple */}
      <circle className="j-ripple" cx="200" cy="200" r="0" fill="none" stroke="#FFF4DA" strokeWidth="10" clipPath="url(#j-clip)" />

      {/* chocolate spread + drizzle */}
      <g clipPath="url(#j-spread-clip)">
        <path d={sauce.pool} fill="url(#j-choc)" />
        <ellipse cx="168" cy="146" rx="30" ry="9" fill="#fff" opacity=".18" transform="rotate(-18 168 146)" />
      </g>
      {sauce.drips.map((d) => (
        <path key={d} className="j-drip" d={d} fill={CHOC} />
      ))}
      {sauce.drizzle.map((d) => (
        <path key={d} className="j-drizzle" d={d} pathLength={1} strokeDasharray="1 1" fill="none" stroke="#4A2414" strokeWidth="7" strokeLinecap="round" />
      ))}

      {/* toppings */}
      {TOPPINGS.map((tp, i) => (
        <g key={i} className="j-topping">
          <g transform={`translate(${tp.x} ${tp.y}) rotate(${tp.r}) scale(${tp.s})`}>
            <ToppingGlyph type={tp.t} seed={i / TOPPINGS.length} />
          </g>
        </g>
      ))}
    </svg>
  )
}

