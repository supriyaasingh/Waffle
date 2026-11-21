import { memo, useId } from 'react'
import type { WaffleArt as Art } from '../../config/menu'
import { W, WaffleBody, ToppingGlyph, seeded, shade } from './parts'

/** Sauce layer drawn over the waffle. Exported so the scroll scene can reuse the shapes. */
export const sauce = {
  drizzle: [
    'M78 120 C120 96 140 150 182 128 S250 92 292 120 S330 140 330 140',
    'M70 182 C110 160 150 214 196 188 S262 156 330 186',
    'M74 246 C118 222 150 276 200 250 S270 220 326 250',
    'M90 300 C130 284 170 318 212 296 S280 276 318 300',
  ],
  pool:
    'M200 108 C246 104 292 128 296 170 C300 196 284 210 290 236 C296 270 262 298 222 292 C196 288 180 302 150 296 C112 288 100 256 108 226 C112 206 98 194 102 168 C108 126 156 110 200 108Z',
  drips: ['M140 290 C140 312 136 330 142 346 A6 6 0 0 0 152 342 C150 326 152 310 152 292', 'M254 286 C256 300 252 318 258 330 A6 6 0 0 0 268 326 C266 312 266 298 266 284'],
  lace: [
    'M90 130 C140 90 170 200 220 140 S300 120 310 170',
    'M92 210 C140 170 180 270 230 210 S300 200 312 240',
    'M100 280 C140 250 180 320 230 280 S290 270 300 300',
    'M120 100 C100 160 180 180 160 240 S200 320 180 330',
    'M240 96 C210 160 290 190 260 250 S280 320 270 330',
  ],
}

function WaffleArtImpl({ art, seed, className, title }: { art: Art; seed: string; className?: string; title?: string }) {
  const uid = useId().replace(/:/g, '')
  const rnd = seeded(seed)
  const positions = [
    [150, 150], [250, 140], [200, 205], [130, 250], [270, 250], [205, 290], [110, 175], [292, 190], [180, 120], [230, 255],
  ]
  const n = art.toppings.includes('lotus') ? 8 : 10
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`${uid}-shadow`}>
          <stop offset=".5" stopColor="#000" stopOpacity=".45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="358" rx="170" ry="26" fill={`url(#${uid}-shadow)`} />
      <WaffleBody uid={uid} base={art.base} />
      {/* sauce */}
      {art.sauceStyle === 'pool' && (
        <g>
          <path d={sauce.pool} fill={art.sauce} opacity=".95" />
          <path d={sauce.pool} fill="none" stroke={shade(art.sauce, 0.35)} strokeWidth="3" strokeOpacity=".5" transform="translate(-4 -4)" />
          {sauce.drips.map((d) => (
            <path key={d} d={d} fill={art.sauce} />
          ))}
          <ellipse cx="170" cy="150" rx="26" ry="9" fill="#fff" opacity=".22" transform="rotate(-18 170 150)" />
        </g>
      )}
      {art.sauceStyle === 'drizzle' &&
        sauce.drizzle.map((d) => (
          <g key={d}>
            <path d={d} fill="none" stroke={shade(art.sauce, -0.25)} strokeWidth="11" strokeLinecap="round" />
            <path d={d} fill="none" stroke={art.sauce} strokeWidth="8" strokeLinecap="round" />
            <path d={d} fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="2" strokeLinecap="round" transform="translate(-1 -2)" />
          </g>
        ))}
      {art.sauceStyle === 'lace' &&
        sauce.lace.map((d) => (
          <g key={d}>
            <path d={d} fill="none" stroke={art.sauce} strokeWidth="5" strokeLinecap="round" />
            <path d={d} fill="none" stroke="#FFE7A6" strokeOpacity=".6" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        ))}
      {/* toppings */}
      {positions.slice(0, n).map(([x, y], i) => {
        const t = art.toppings[i % art.toppings.length]
        const jx = (rnd() - 0.5) * 22
        const jy = (rnd() - 0.5) * 22
        const s = 0.85 + rnd() * 0.45
        const rot = (rnd() - 0.5) * 60
        return (
          <g key={i} transform={`translate(${x + jx} ${y + jy}) rotate(${rot}) scale(${s})`}>
            <ToppingGlyph type={t} seed={rnd()} />
          </g>
        )
      })}
      {/* gloss */}
      <rect x={W.x + 14} y={W.y + 10} width={W.size * 0.5} height="10" rx="5" fill="#fff" opacity=".12" />
    </svg>
  )
}

export const WaffleArt = memo(WaffleArtImpl)
