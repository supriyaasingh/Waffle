/** WAFFLEKAR wordmark with a little waffle-grid "A". Pure SVG + text, no external asset. */
export function Logo({ tone = 'dark', className = '' }: { tone?: 'dark' | 'light'; className?: string }) {
  const fg = tone === 'light' ? '#FFF3DF' : '#32170F'
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden>
        <rect x="2" y="3" width="36" height="36" rx="11" fill="#B87A26" />
        <rect x="2" y="1" width="36" height="36" rx="11" fill="#D99A42" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={8 + c * 9} y={7 + r * 9} width="6.5" height="6.5" rx="2" fill="#9A5E1C" opacity=".75" />),
        )}
        <path d="M9 12 C15 8 20 18 26 12 S33 14 33 14" stroke="#32170F" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M27 6 C33 2 38 8 33 12 C30 15 27 11 27 6Z" fill="#E85B62" />
      </svg>
      <span className="font-display text-[22px] font-extrabold leading-none tracking-[-0.04em]" style={{ color: fg }}>
        WAFFLE<span className="text-caramel">KAR</span>
      </span>
    </span>
  )
}
