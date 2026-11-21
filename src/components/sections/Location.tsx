import { useState } from 'react'
import { MapPin, Phone, Navigation, Clock, ExternalLink } from 'lucide-react'
import { business, links } from '../../config/business'
import { SplitHeading, Reveal } from '../ui/Reveal'
import { Magnetic } from '../ui/Magnetic'

export function Location() {
  const [mapOn, setMapOn] = useState(false)
  return (
    <section id="contact" data-nav-theme="light" className="relative overflow-hidden bg-cream-2 py-24 md:py-32">
      <div className="waffle-pattern pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_80%_20%,black,transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal><p className="eyebrow mb-4 text-caramel-deep"><MapPin size={14} aria-hidden /> Find us</p></Reveal>
        <SplitHeading text="Your next waffle is closer than you think." accent={['closer']} className="h-section max-w-5xl text-choco" />

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="flex h-full flex-col rounded-[32px] bg-choco p-7 text-cream md:p-9">
              <p className="font-display text-3xl font-extrabold">{business.name}</p>
              <address className="mt-4 not-italic leading-relaxed text-cream/80">
                {business.address.lines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
              </address>
              <dl className="mt-8 grid gap-5 border-t border-cream/10 pt-7">
                <div className="flex items-start gap-4">
                  <dt className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cream/10"><Phone size={18} aria-label="Phone" /></dt>
                  <dd>
                    <a href={links.call} className="font-display text-2xl font-extrabold hover:text-caramel">{business.phone.display}</a>
                    <p className="text-sm text-cream/55">Tap to call</p>
                  </dd>
                </div>
                <div className="flex items-start gap-4">
                  <dt className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cream/10"><Clock size={18} aria-label="Opening hours" /></dt>
                  <dd>
                    <p className="font-display text-2xl font-extrabold">{business.hours.summary}</p>
                    <p className="text-sm text-cream/55">{business.hours.confirmed ? business.hours.days : 'Listed hours — to be confirmed. Call ahead to check.'}</p>
                  </dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-wrap gap-3 pt-9">
                <Magnetic><a href={links.directions} target="_blank" rel="noopener noreferrer" className="btn btn-gold"><Navigation size={18} aria-hidden /> Get Directions</a></Magnetic>
                <Magnetic><a href={links.call} className="btn btn-ghost-light"><Phone size={18} aria-hidden /> Call Now</a></Magnetic>
              </div>
              <a href={links.googleBusinessProfile ?? links.mapsSearch} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm text-cream/60 underline-offset-4 hover:text-cream hover:underline">
                {links.googleBusinessProfile ? 'Open our Google Business listing' : 'Open in Google Maps'} <ExternalLink size={14} aria-hidden />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-[420px] overflow-hidden rounded-[32px] bg-choco/10 shadow-[0_30px_60px_-30px_rgba(50,23,15,.6)] lg:h-full lg:min-h-[480px]">
              {mapOn ? (
                <iframe
                  title="Map showing WAFFLEKAR, Bhandup West"
                  src={links.mapEmbed}
                  className="h-full w-full border-0 grayscale-[30%] sepia-[20%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setMapOn(true)}
                  className="group relative grid h-full w-full place-items-center bg-[#EBD9B8] text-choco"
                  aria-label="Load the interactive Google map"
                >
                  {/* stylised map illustration — real map loads on tap (saves data + speeds up the page) */}
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" aria-hidden>
                    <rect width="600" height="480" fill="#EFDFC2" />
                    {[60, 170, 300, 420, 540].map((x) => <path key={x} d={`M${x} 0 L${x + 40} 480`} stroke="#fff" strokeWidth="14" />)}
                    {[80, 200, 330, 430].map((y) => <path key={y} d={`M0 ${y} L600 ${y - 30}`} stroke="#fff" strokeWidth="10" />)}
                    <path d="M0 260 C150 230 300 300 600 240" stroke="#D99A42" strokeWidth="22" fill="none" opacity=".7" />
                    <rect x="350" y="90" width="110" height="80" rx="14" fill="#CFE3B5" />
                    <rect x="80" y="320" width="140" height="90" rx="14" fill="#CFE3B5" />
                  </svg>
                  <span className="relative flex flex-col items-center">
                    <span className="relative grid h-16 w-16 place-items-center rounded-full bg-strawberry text-white shadow-xl transition-transform group-hover:-translate-y-1">
                      <MapPin size={28} aria-hidden />
                      <span className="absolute inset-0 animate-ping rounded-full bg-strawberry/50" />
                    </span>
                    <span className="mt-4 rounded-full bg-choco px-5 py-2.5 text-sm font-bold text-cream shadow-lg">Tap to load interactive map</span>
                    <span className="mt-2 text-xs font-semibold text-choco/60">Jangal Mangal Road · Bhandup West</span>
                  </span>
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
