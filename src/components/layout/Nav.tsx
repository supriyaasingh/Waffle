import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu as MenuIcon, X, ShoppingBag, Phone } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { useOrder } from '../../state/order'
import { links, business } from '../../config/business'

const NAV = [
  { href: '#home', label: 'Home' },
  { href: '#story', label: 'Our Story' },
  { href: '#menu', label: 'Menu' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(true)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const { count, setOpen: openOrder } = useOrder()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      // detect whether the nav currently sits over a dark section
      const probe = document.elementsFromPoint(window.innerWidth / 2, 40).find((el) => el instanceof HTMLElement && el.dataset.navTheme)
      setDark(((probe as HTMLElement | undefined)?.dataset.navTheme ?? 'dark') === 'dark')
      // active link
      let cur = '#home'
      for (const n of NAV) {
        const s = document.querySelector(n.href)
        if (s && s.getBoundingClientRect().top < window.innerHeight * 0.4) cur = n.href
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const onDark = dark && !open
  const shell = scrolled
    ? onDark
      ? 'bg-choco-deep/70 border-cream/10 shadow-[0_10px_40px_-20px_rgba(0,0,0,.6)]'
      : 'bg-cream/80 border-choco/10 shadow-[0_10px_40px_-24px_rgba(50,23,15,.5)]'
    : 'bg-transparent border-transparent'

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2 backdrop-blur-xl transition-all duration-500 md:px-5 ${shell}`}
        >
          <a href="#home" className="shrink-0" aria-label="WAFFLEKAR home">
            <Logo tone={onDark ? 'light' : 'dark'} />
          </a>
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <li key={n.href} className="relative">
                <a
                  href={n.href}
                  className={`relative block rounded-full px-4 py-2 text-sm font-semibold transition-colors ${onDark ? 'text-cream/80 hover:text-cream' : 'text-choco/75 hover:text-choco'}`}
                  aria-current={active === n.href ? 'true' : undefined}
                >
                  {active === n.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className={`absolute inset-0 -z-10 rounded-full ${onDark ? 'bg-cream/12' : 'bg-choco/8'}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openOrder(true)}
              className={`relative grid h-11 w-11 place-items-center rounded-full transition-colors ${onDark ? 'text-cream hover:bg-cream/10' : 'text-choco hover:bg-choco/5'}`}
              aria-label={`Your order, ${count} item${count === 1 ? '' : 's'}`}
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-strawberry px-1 text-[11px] font-bold text-white">
                  {count}
                </motion.span>
              )}
            </button>
            <a href="#order" className="btn btn-gold hidden !min-h-10 !py-2 sm:inline-flex">Order Now</a>
            <button
              type="button"
              className={`grid h-11 w-11 place-items-center rounded-full lg:hidden ${onDark ? 'text-cream' : 'text-choco'}`}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-cream px-6 pb-8 pt-28 lg:hidden"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="waffle-pattern pointer-events-none absolute inset-0 opacity-60" />
            <ul className="relative space-y-1">
              {NAV.map((n, i) => (
                <motion.li key={n.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }}>
                  <a href={n.href} onClick={() => setOpen(false)} className="block py-2 font-display text-5xl font-extrabold uppercase tracking-tight text-choco active:text-caramel">
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="relative mt-auto grid gap-3">
              <a href="#order" onClick={() => setOpen(false)} className="btn btn-gold w-full text-base">
                <ShoppingBag size={18} /> Order Now
              </a>
              <a href={links.call} className="btn btn-ghost-dark w-full text-base">
                <Phone size={18} /> {business.phone.display}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
