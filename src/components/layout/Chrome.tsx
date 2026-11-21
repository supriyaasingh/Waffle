import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin caramel scroll-progress bar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-caramel via-strawberry to-caramel" aria-hidden />
}

/**
 * Desktop-only waffle cursor companion. The native cursor is kept for
 * accessibility; this little waffle trails it and grows over interactive items.
 */
export function WaffleCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    setEnabled(mq.matches)
    const on = () => setEnabled(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const el = ref.current!
    let x = -100, y = -100, tx = -100, ty = -100, s = 1, ts = 1, raf = 0
    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      const t = e.target as HTMLElement | null
      ts = t?.closest('a,button,[role=tab],input,label') ? 1.9 : 1
    }
    const loop = () => {
      x += (tx - x) * 0.2
      y += (ty - y) * 0.2
      s += (ts - s) * 0.2
      el.style.transform = `translate3d(${x + 14}px, ${y + 14}px, 0) scale(${s}) rotate(${(tx - x) * 0.6}deg)`
      raf = requestAnimationFrame(loop)
    }
    const leave = () => { tx = ty = -100 }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div ref={ref} className="cursor-waffle -ml-3 -mt-3" aria-hidden>
      <svg width="24" height="24" viewBox="0 0 40 40" className="drop-shadow-[0_4px_8px_rgba(50,23,15,.35)]">
        <rect x="2" y="2" width="36" height="36" rx="11" fill="#D99A42" />
        {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={8 + c * 9} y={8 + r * 9} width="6.5" height="6.5" rx="2" fill="#9A5E1C" opacity=".75" />))}
        <circle cx="30" cy="9" r="5" fill="#E85B62" />
      </svg>
    </div>
  )
}
