import { Star, ExternalLink, Clock, MessageSquareHeart } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { ratings, testimonials, links, type PlatformRating } from '../../config/business'
import { SplitHeading, Reveal } from '../ui/Reveal'

const BRAND: Record<PlatformRating['id'], { bg: string; mark: React.ReactNode }> = {
  google: {
    bg: 'bg-white text-choco',
    mark: (
      <svg viewBox="0 0 48 48" width="34" height="34" aria-hidden>
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
        <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
      </svg>
    ),
  },
  zomato: { bg: 'bg-[#E23744] text-white', mark: <span className="font-display text-2xl font-extrabold italic tracking-tight">zomato</span> },
  swiggy: { bg: 'bg-[#FC8019] text-white', mark: <span className="font-display text-2xl font-extrabold tracking-tight">Swiggy</span> },
}

function Stars({ value, muted }: { value: number; muted?: boolean }) {
  return (
    <span className="flex gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={20} className={muted ? 'opacity-25' : ''} fill={!muted && i < Math.round(value) ? 'currentColor' : 'none'} />
      ))}
    </span>
  )
}

export function Reviews() {
  const reduce = useReducedMotion()
  return (
    <section id="reviews" data-nav-theme="dark" className="relative overflow-hidden bg-choco py-24 text-cream md:py-32">
      <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-caramel/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal><p className="eyebrow mb-4 text-caramel"><span className="h-px w-8 bg-caramel" /> Ratings & reviews</p></Reveal>
        <SplitHeading text="Don't take our word for it." accent={['word']} className="h-section max-w-4xl text-cream" />
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-cream/70">
            We only show ratings we can verify on the platform itself. Links below open the official listings.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {ratings.map((r, i) => {
            const b = BRAND[r.id]
            const show = r.verified && r.rating !== null
            return (
              <Reveal key={r.id} delay={i * 0.08}>
                <motion.article
                  whileHover={reduce ? undefined : { y: -6 }}
                  className={`relative flex h-full min-h-[300px] flex-col rounded-[32px] p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)] ${b.bg}`}
                >
                  <div className="flex items-center justify-between">
                    {b.mark}
                    {!show && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-black/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                        <Clock size={12} aria-hidden /> {r.url ? 'Rating pending' : 'Coming soon'}
                      </span>
                    )}
                  </div>
                  <p className="mt-6 text-sm font-semibold uppercase tracking-widest opacity-70">{r.platform}</p>
                  {show ? (
                    <>
                      <p className="mt-1 flex items-end gap-3">
                        <span className="font-display text-7xl font-extrabold leading-none">{r.rating!.toFixed(1)}</span>
                        <span className="pb-2 text-lg font-bold opacity-60">/ 5</span>
                      </p>
                      <span className="mt-2 text-caramel"><Stars value={r.rating!} /></span>
                      <p className="mt-2 text-sm opacity-70">Based on {r.reviewCount} reviews{r.note ? ` · ${r.note}` : ''}</p>
                    </>
                  ) : (
                    <>
                      <span className="mt-3"><Stars value={0} muted /></span>
                      <p className="mt-3 text-sm leading-relaxed opacity-75">
                        {r.id === 'google'
                          ? 'Our Google rating will appear here once the business listing is confirmed.'
                          : `WAFFLEKAR on ${r.platform} — listing link coming soon.`}
                      </p>
                    </>
                  )}
                  <div className="mt-auto pt-6">
                    {r.url ? (
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="btn btn-choco w-full !text-cream">
                        {r.cta} <ExternalLink size={16} aria-hidden />
                      </a>
                    ) : r.id === 'google' ? (
                      <a href={links.mapsSearch} target="_blank" rel="noopener noreferrer" className="btn w-full border border-current/25 hover:bg-black/5">
                        Find us on Google Maps <ExternalLink size={16} aria-hidden />
                      </a>
                    ) : (
                      <span className="btn w-full border border-current/30" aria-disabled="true">{r.cta} · soon</span>
                    )}
                  </div>
                </motion.article>
              </Reveal>
            )
          })}
        </div>

        {/* verified testimonials only */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <Reveal key={t.quote}>
              <figure className="h-full rounded-[28px] border border-cream/10 bg-cream/5 p-7">
                <blockquote className="font-display text-xl leading-snug">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-cream/60">— {t.author}, via {t.url ? <a className="underline" href={t.url} target="_blank" rel="noopener noreferrer">{t.source}</a> : t.source}</figcaption>
              </figure>
            </Reveal>
          ))}
          {testimonials.length === 0 && (
            <Reveal className="md:col-span-3">
              <div className="flex flex-col items-start justify-between gap-5 rounded-[28px] border border-dashed border-cream/25 p-7 md:flex-row md:items-center">
                <div className="flex items-start gap-4">
                  <MessageSquareHeart className="mt-1 shrink-0 text-strawberry" size={28} aria-hidden />
                  <div>
                    <p className="font-display text-2xl font-extrabold">Tried a WAFFLEKAR waffle?</p>
                    <p className="mt-1 text-cream/65">Your review helps your neighbours find their next favourite dessert. Real reviews will be featured here.</p>
                  </div>
                </div>
                <a href={links.googleWriteReview ?? links.mapsSearch} target="_blank" rel="noopener noreferrer" className="btn btn-gold shrink-0">
                  {links.googleWriteReview ? 'Write a Google review' : 'Find us on Google'} <ExternalLink size={16} aria-hidden />
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
