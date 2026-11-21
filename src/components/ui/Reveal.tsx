import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Fade/slide-in on scroll. */
export function Reveal({ children, delay = 0, y = 40, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Big headline that reveals word by word, each word rising from a mask.
 *  The in-view trigger lives on the heading itself (the masked words are
 *  clipped, so they can never be "in view" on their own). */
export function SplitHeading({ text, className = '', as = 'h2', accent = [] }: { text: string; className?: string; as?: 'h1' | 'h2' | 'h3'; accent?: string[] }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      aria-label={text}
      initial={reduce ? false : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ staggerChildren: 0.06 }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom" aria-hidden>
          <motion.span
            className={`inline-block ${accent.includes(w.replace(/[.,]/g, '')) ? 'text-caramel' : ''}`}
            variants={{ hidden: { y: '110%' }, shown: { y: '0%', transition: { duration: 0.85, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] } } }}
          >
            {w}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
