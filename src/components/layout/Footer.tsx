import { ArrowUp, Phone, MapPin, Clock } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { business, links, socials } from '../../config/business'

export function Footer() {
  return (
    <footer data-nav-theme="dark" className="relative bg-choco-deep pb-28 pt-20 text-cream/75 md:pb-12">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="font-display text-[clamp(3.5rem,15vw,13rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.05em] text-cream/[0.07]" aria-hidden>
          Wafflekar
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm">{business.tagline}. Golden, crispy, chocolate-loaded happiness in Bhandup West, Mumbai.</p>
          </div>
          <nav aria-label="Footer">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-caramel">Explore</p>
            <ul className="space-y-2 text-sm">
              {[['#home', 'Home'], ['#story', 'Our Story'], ['#menu', 'Menu'], ['#reviews', 'Reviews'], ['#contact', 'Contact'], ['#order', 'Order']].map(([h, l]) => (
                <li key={h}><a href={h} className="hover:text-cream">{l}</a></li>
              ))}
            </ul>
          </nav>
          <div className="text-sm">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-caramel">Visit</p>
            <p className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" aria-hidden />
              <a href={links.mapsSearch} target="_blank" rel="noopener noreferrer" className="hover:text-cream">{business.address.lines.join(' ')}</a>
            </p>
            <p className="mt-3 flex gap-2"><Clock size={16} className="mt-0.5 shrink-0" aria-hidden />{business.hours.summary}{!business.hours.confirmed && ' (to be confirmed)'}</p>
          </div>
          <div className="text-sm">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-caramel">Contact</p>
            <a href={links.call} className="flex items-center gap-2 hover:text-cream"><Phone size={16} aria-hidden /> {business.phone.display}</a>
            <div className="mt-4 flex flex-wrap gap-2">
              {socials.length ? (
                socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-cream/20 px-3 py-1.5 capitalize hover:border-cream">{s.platform}</a>
                ))
              ) : (
                <span className="text-cream/45">Social links coming soon</span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved. Placeholder imagery used until real product photography is added.</p>
          <a href="#home" className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 font-semibold text-cream/80 hover:border-cream hover:text-cream">
            Back to top <ArrowUp size={14} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  )
}
