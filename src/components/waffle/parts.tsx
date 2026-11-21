import type { Topping } from '../../config/menu'

/** Deterministic PRNG so illustrations never change between renders. */
export function seeded(seedStr: string) {
  let h = 1779033703 ^ seedStr.length
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  let a = h >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Waffle geometry, shared by every waffle on the site (viewBox 0 0 400 400). */
export const W = { x: 60, y: 60, size: 280, r: 46, cells: 4 }

export const pocketRects = (() => {
  const out: { x: number; y: number; s: number }[] = []
  const pad = 20
  const gap = 14
  const s = (W.size - pad * 2 - gap * (W.cells - 1)) / W.cells
  for (let r = 0; r < W.cells; r++)
    for (let c = 0; c < W.cells; c++) out.push({ x: W.x + pad + c * (s + gap), y: W.y + pad + r * (s + gap), s })
  return out
})()

export function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16)
  const f = (v: number) => Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)))
  const r = f((n >> 16) & 255)
  const g = f((n >> 8) & 255)
  const b = f(n & 255)
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

/** Single topping glyph centred at 0,0 (~ 40px). */
export function ToppingGlyph({ type, seed = 0 }: { type: Topping; seed?: number }) {
  switch (type) {
    case 'strawberry':
      return (
        <g>
          <path d="M0 22 C-18 10 -22 -6 -14 -15 C-8 -21 -2 -19 0 -14 C2 -19 8 -21 14 -15 C22 -6 18 10 0 22Z" fill="#E23B48" />
          <path d="M0 15 C-11 7 -14 -3 -9 -9 C-5 -13 -1 -11 0 -8 C1 -11 5 -13 9 -9 C14 -3 11 7 0 15Z" fill="#FF8A8F" />
          <path d="M0 9 C-5 4 -6 -2 -3 -5 L0 -3 L3 -5 C6 -2 5 4 0 9Z" fill="#FFD3D5" />
          <path d="M-8 -17 C-5 -24 5 -24 8 -17 L3 -15 L0 -21 L-3 -15Z" fill="#3E9B4F" />
          {[[-9, 0], [9, 0], [-5, 10], [5, 10], [0, -12]].map(([x, y], i) => (
            <ellipse key={i} cx={x} cy={y} rx="1.2" ry="1.8" fill="#FFE9A8" />
          ))}
        </g>
      )
    case 'blueberry':
      return (
        <g>
          <circle r="11" fill="#4B3C8E" />
          <circle cx="-4" cy="-4" r="4" fill="#8E7FD6" opacity=".7" />
          <path d="M0 -10 l2 -3 l2 3 l-2 1.5Z M-3 -9 l-2 -2" stroke="#2A1F5E" strokeWidth="1.4" fill="#2A1F5E" />
        </g>
      )
    case 'mango':
      return (
        <g transform={`rotate(${seed * 40})`}>
          <rect x="-11" y="-11" width="22" height="22" rx="5" fill="#FFAA1F" />
          <rect x="-11" y="-11" width="22" height="9" rx="4" fill="#FFD166" opacity=".8" />
        </g>
      )
    case 'cookie':
      return (
        <g fill="#B8732F">
          <path d="M-10 -4 L-3 -10 L6 -7 L9 2 L1 8 L-8 5Z" />
          <path d="M-6 -3 L-1 -6 L4 -4" stroke="#D99A55" strokeWidth="2" fill="none" />
          <circle cx="14" cy="10" r="3.5" />
          <circle cx="-14" cy="11" r="2.5" />
          <circle cx="12" cy="-12" r="2" />
        </g>
      )
    case 'lotus':
      return (
        <g transform={`rotate(${-15 + seed * 30})`}>
          <rect x="-24" y="-14" width="48" height="28" rx="6" fill="#B8692C" />
          <rect x="-20" y="-10" width="40" height="20" rx="4" fill="#C9783A" stroke="#A65B22" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M-12 0 h24" stroke="#A65B22" strokeWidth="2" strokeLinecap="round" />
        </g>
      )
    case 'almond':
      return (
        <g transform={`rotate(${seed * 180})`}>
          <path d="M0 -13 C9 -6 9 7 0 13 C-9 7 -9 -6 0 -13Z" fill="#C88A52" />
          <path d="M0 -10 C4 -4 4 5 0 10" stroke="#E8B985" strokeWidth="2" fill="none" />
        </g>
      )
    case 'walnut':
      return (
        <g transform={`rotate(${seed * 90})`}>
          <path d="M-12 -6 C-14 -13 -4 -15 0 -9 C4 -15 14 -13 12 -6 C16 0 12 10 4 9 C2 14 -2 14 -4 9 C-12 10 -16 0 -12 -6Z" fill="#8A5A30" />
          <path d="M0 -8 V8 M-7 -3 C-4 0 -4 3 -7 5 M7 -3 C4 0 4 3 7 5" stroke="#5E3818" strokeWidth="1.6" fill="none" />
        </g>
      )
    case 'brownie':
      return (
        <g transform={`rotate(${seed * 30 - 15})`}>
          <rect x="-13" y="-11" width="26" height="24" rx="3" fill="#2E140A" />
          <rect x="-13" y="-11" width="26" height="8" rx="3" fill="#4A2414" />
          <circle cx="-5" cy="3" r="1.5" fill="#5E3420" />
          <circle cx="5" cy="7" r="1.5" fill="#5E3420" />
        </g>
      )
    case 'kunafa':
      return (
        <g fill="none" stroke="#E9A63A" strokeWidth="1.6" strokeLinecap="round">
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={i} d={`M${-18 + i * 2} ${-10 + (i % 3) * 3} C${-6 + i} ${-18 + i * 2} ${6 - i} ${18 - i * 2} ${18 - i * 2} ${8 - (i % 3) * 3}`} />
          ))}
          <g stroke="#C4791E">
            {Array.from({ length: 4 }).map((_, i) => (
              <path key={i} d={`M${-14 + i * 6} -12 C${-8 + i * 4} 0 ${-2 + i * 3} 6 ${4 + i * 3} 12`} />
            ))}
          </g>
        </g>
      )
    case 'cream':
      return (
        <g>
          <path d="M-16 8 C-20 -2 -10 -6 -6 -4 C-8 -14 6 -16 7 -6 C14 -8 20 0 15 8 Z" fill="#FFF9EE" />
          <path d="M-10 4 C-4 0 4 0 10 4 M-4 -4 C0 -8 4 -6 4 -3" stroke="#EADCC4" strokeWidth="1.6" fill="none" />
        </g>
      )
    case 'butter':
      return (
        <g transform={`rotate(${seed * 20 - 10})`}>
          <rect x="-15" y="-12" width="30" height="24" rx="4" fill="#FFE59A" />
          <rect x="-15" y="-12" width="30" height="9" rx="4" fill="#FFF3C4" />
          <path d="M-15 10 C-10 16 -4 12 0 16" stroke="#FFE59A" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
      )
    case 'cheese':
      return (
        <g>
          <path d="M-15 8 C-18 -1 -9 -5 -5 -3 C-6 -12 7 -13 7 -4 C13 -6 18 1 14 8 C6 12 -6 12 -15 8Z" fill="#FFF6DA" />
          <path d="M-8 2 C-3 -2 3 -2 8 2" stroke="#F0DFA8" strokeWidth="1.6" fill="none" />
        </g>
      )
    case 'chocchunk':
      return (
        <g transform={`rotate(${seed * 60 - 30})`}>
          <rect x="-10" y="-10" width="20" height="20" rx="2" fill="#3A1A0E" />
          <rect x="-7" y="-7" width="14" height="14" rx="1.5" fill="#4E2616" />
          <path d="M-7 -7 L7 -7" stroke="#6E3E26" strokeWidth="1.4" />
        </g>
      )
    case 'redvelvet':
      return (
        <g fill="#9C1F2E">
          <path d="M-8 -6 L0 -11 L8 -5 L6 5 L-5 7Z" />
          <circle cx="11" cy="9" r="3" />
          <circle cx="-12" cy="8" r="2.4" />
        </g>
      )
    case 'honey':
      return (
        <g>
          <path d="M0 -12 C6 -4 8 2 8 5 A8 8 0 0 1 -8 5 C-8 2 -6 -4 0 -12Z" fill="#F2B23A" />
          <ellipse cx="-3" cy="2" rx="2" ry="3" fill="#FFE29A" />
        </g>
      )
  }
}

/** Waffle body (crust + pockets) used everywhere. `tone` controls the bake colour. */
export function WaffleBody({ uid, base, grid = true }: { uid: string; base: string; grid?: boolean }) {
  return (
    <g>
      <defs>
        <radialGradient id={`${uid}-top`} cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor={shade(base, 0.28)} />
          <stop offset=".6" stopColor={base} />
          <stop offset="1" stopColor={shade(base, -0.28)} />
        </radialGradient>
        <linearGradient id={`${uid}-pocket`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={shade(base, -0.42)} />
          <stop offset=".55" stopColor={shade(base, -0.12)} />
          <stop offset="1" stopColor={shade(base, 0.12)} />
        </linearGradient>
      </defs>
      {/* side / thickness */}
      <rect x={W.x} y={W.y + 12} width={W.size} height={W.size} rx={W.r} fill={shade(base, -0.45)} />
      {/* top */}
      <rect x={W.x} y={W.y} width={W.size} height={W.size} rx={W.r} fill={`url(#${uid}-top)`} />
      <rect x={W.x + 3} y={W.y + 3} width={W.size - 6} height={W.size - 6} rx={W.r - 3} fill="none" stroke={shade(base, 0.35)} strokeOpacity=".5" strokeWidth="2" />
      {grid &&
        pocketRects.map((p, i) => (
          <g key={i}>
            <rect x={p.x} y={p.y} width={p.s} height={p.s} rx="9" fill={`url(#${uid}-pocket)`} />
            <rect x={p.x + 3} y={p.y + p.s - 6} width={p.s - 6} height="3" rx="1.5" fill={shade(base, 0.3)} opacity=".45" />
          </g>
        ))}
    </g>
  )
}
