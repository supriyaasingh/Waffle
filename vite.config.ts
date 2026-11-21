import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'
import { business, SITE_URL, links } from './src/config/business.ts'
import { menu } from './src/config/menu.ts'

/**
 * Generates SEO assets from the central config so they never drift:
 *  - JSON-LD (Restaurant + LocalBusiness) injected into index.html
 *  - sitemap.xml and robots.txt emitted at build time
 * Only verified data is used (hours are omitted until confirmed; no ratings).
 */
function seo(): Plugin {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'LocalBusiness'],
    '@id': `${SITE_URL}/#business`,
    name: business.name,
    description: `${business.name} — ${business.category} in ${business.address.locality}, ${business.address.city}.`,
    url: SITE_URL,
    telephone: business.phone.e164,
    image: `${SITE_URL}/images/og-image.jpg`,
    servesCuisine: ['Desserts', 'Waffles', 'Croffles'],
    priceRange: business.priceRange,
    currenciesAccepted: 'INR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: `${business.address.locality}, ${business.address.city}`,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    hasMap: links.mapsSearch,
    hasMenu: {
      '@type': 'Menu',
      hasMenuSection: {
        '@type': 'MenuSection',
        name: 'Waffles',
        hasMenuItem: menu.map((m) => ({
          '@type': 'MenuItem',
          name: m.name,
          description: m.description,
          offers: { '@type': 'Offer', price: m.price, priceCurrency: 'INR' },
        })),
      },
    },
  }
  if (business.hours.confirmed) {
    schema.openingHoursSpecification = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: business.hours.opens,
      closes: business.hours.closes,
    }
  }
  return {
    name: 'wafflekar-seo',
    transformIndexHtml(html) {
      return html
        .replaceAll('%SITE_URL%', SITE_URL)
        .replace('</head>', `  <script type="application/ld+json">${JSON.stringify(schema)}</script>\n  </head>`)
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>\n</urlset>\n`,
      })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n` })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) return 'motion'
        },
      },
    },
  },
})
