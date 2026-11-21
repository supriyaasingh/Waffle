/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  WAFFLEKAR — CENTRAL BUSINESS CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  Edit this file to update everything the website says about the business.
 *
 *  VERIFICATION STATUS LEGEND
 *    "owner"      → supplied by the owner / client brief (treated as accurate)
 *    "reported"   → seen in a public listing or brief, NOT yet confirmed
 *    "missing"    → not found; the site shows a tasteful placeholder
 *
 *  Research log (21 Nov 2026): web searches for "Wafflekar", the address and
 *  the phone number returned NO indexed Google, Zomato, Swiggy or Instagram
 *  listing. Everything below that depends on those platforms is therefore
 *  switched off (verified: false / url: null) until the owner confirms it.
 *
 *  NOTE: this file is also imported by vite.config.ts to generate the
 *  JSON-LD schema, sitemap.xml and robots.txt — keep it free of browser APIs.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Verification = 'owner' | 'reported' | 'missing'

/** Public site URL — replace once the domain is live (used for SEO + sitemap). */
export const SITE_URL = 'https://www.wafflekar.in' // TODO(owner): confirm real domain

export const business = {
  name: 'WAFFLEKAR',
  tagline: 'Waffles, Croffles & Desserts',
  category: 'Waffles, Croffles and Desserts',

  address: {
    lines: [
      'G-01, Ground Floor, Beauty Landmark,',
      'Manav CHS, Jangal Mangal Road,',
      'Bhatti Pada, Bhandup West,',
      'Mumbai, Maharashtra – 400078',
    ],
    street: 'G-01, Ground Floor, Beauty Landmark, Manav CHS, Jangal Mangal Road, Bhatti Pada',
    locality: 'Bhandup West',
    city: 'Mumbai',
    region: 'Maharashtra',
    postalCode: '400078',
    country: 'IN',
    status: 'owner' as Verification,
  },

  phone: {
    display: '+91 86527 87894',
    e164: '+918652787894',
    status: 'owner' as Verification,
  },

  /**
   * Opening hours. `confirmed: false` shows the hours with a
   * "to be confirmed" label and keeps them OUT of the SEO schema.
   */
  hours: {
    confirmed: false,
    summary: '3 PM – 12 AM',
    days: 'Every day', // TODO(owner): confirm days of operation
    opens: '15:00',
    closes: '00:00',
    status: 'reported' as Verification,
  },

  /** Price range for schema.org (based on published menu prices). */
  priceRange: '₹90 – ₹210',
} as const

/** Search link to the address on Google Maps (works without a verified listing). */
export const mapsQuery = encodeURIComponent(
  `${business.name}, ${business.address.street}, ${business.address.locality}, ${business.address.city} ${business.address.postalCode}`,
)

export const links = {
  call: `tel:${business.phone.e164}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  mapsSearch: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  mapEmbed: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
  /** Exact Google Business Profile URL — paste once verified, e.g. https://maps.app.goo.gl/xxxx */
  googleBusinessProfile: null as string | null,
  /** "Write a review" link from Google Business Profile → Ask for reviews. */
  googleWriteReview: null as string | null,
}

/**
 * ORDERING PLATFORMS — set `url` to the EXACT outlet link once verified.
 * A platform with `url: null` is shown as "Coming soon" and is never linked.
 */
export const ordering = {
  swiggy: { label: 'Swiggy', url: null as string | null },
  zomato: { label: 'Zomato', url: null as string | null },
}

/**
 * RATINGS — never shown as numbers unless `verified: true`.
 * The brief mentions a Google listing at 5.0 / 20 reviews; it could not be
 * independently found, so it is stored here but hidden until verified.
 */
export interface PlatformRating {
  id: 'google' | 'zomato' | 'swiggy'
  platform: string
  verified: boolean
  rating: number | null
  reviewCount: number | null
  /** Optional sub-label e.g. "Dining" / "Delivery" */
  note?: string
  url: string | null
  cta: string
}

export const ratings: PlatformRating[] = [
  {
    id: 'google',
    platform: 'Google Reviews',
    verified: false, // TODO(owner): flip to true after confirming the live numbers
    rating: 5.0, // reported in brief — hidden until verified
    reviewCount: 20, // reported in brief — hidden until verified
    url: null, // set to links.googleBusinessProfile once known
    cta: 'Read Google Reviews',
  },
  { id: 'zomato', platform: 'Zomato', verified: false, rating: null, reviewCount: null, url: null, cta: 'View on Zomato' },
  { id: 'swiggy', platform: 'Swiggy', verified: false, rating: null, reviewCount: null, url: null, cta: 'Order on Swiggy' },
]

/**
 * Verified customer quotes ONLY (copy from a real public review, with
 * permission). Leave empty to show the "your review could be here" card.
 */
export const testimonials: { quote: string; author: string; source: string; url?: string }[] = []

/** Social accounts — add only real, verified handles. */
export const socials: { platform: 'instagram' | 'facebook' | 'youtube'; handle: string; url: string }[] = []

/** Editable brand copy (no invented claims — owner can refine). */
export const copy = {
  storyHeadline: "NOT JUST A WAFFLE. IT'S A LITTLE MOMENT OF HAPPINESS.",
  storyParagraphs: [
    'Some days call for something golden, warm and a little bit indulgent. That is where WAFFLEKAR comes in — a neighbourhood dessert stop in Bhandup West built around one simple idea: a great waffle can turn an ordinary evening into a good one.',
    'Crisp edges, soft centres and toppings that go all the way to the corners. Whether you are sharing a plate after college, treating someone special or ordering a late-evening craving home, every waffle is made to be that little moment you look forward to.',
  ],
  // TODO(owner): add your real story — when you started, why waffles, what makes you different.
}

/** Feature cards. `claim: true` marks copy that needs owner confirmation. */
export const features = [
  { title: 'Delicious flavour combinations', body: 'From honey-butter classics to kunafa and lotus — eleven ways to fall for a waffle.', icon: 'sparkles' },
  { title: 'Beautifully presented desserts', body: 'Plated to be photographed first and devoured a second later.', icon: 'camera' },
  { title: 'A treat for every craving', body: 'Chocolate-loaded, fruity, cheesy or nutty — and priced from ₹90.', icon: 'heart' },
  { title: 'Your neighbourhood waffle destination', body: 'Right on Jangal Mangal Road, Bhandup West. Drop in, or call ahead.', icon: 'map-pin' },
] as const
