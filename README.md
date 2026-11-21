# WAFFLEKAR — website

Interactive website for **WAFFLEKAR**, a waffle & croffle dessert shop in Bhandup West, Mumbai.

Built with React 19, Vite, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Framer Motion and Lucide icons.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages…).

## Where to edit things

| What | File |
| --- | --- |
| Business info, phone, address, hours, ratings, ordering links, socials, story copy, feature cards | `src/config/business.ts` |
| Menu items, prices, categories, descriptions, veg flags, product photos | `src/config/menu.ts` |
| Site domain (used for SEO, sitemap, Open Graph) | `SITE_URL` in `src/config/business.ts` |
| Gallery tiles | `TILES` in `src/components/sections/Gallery.tsx` |

`sitemap.xml`, `robots.txt` and the JSON-LD `Restaurant` / `LocalBusiness` schema are **generated from the config at build time** (`vite.config.ts`), so they stay in sync.

### Adding real photos

* **Menu item:** put a WebP in `public/images/menu/`, then set `photo: '/images/menu/kunafa.webp'` on the item. Items without a photo show the illustrated waffle.
* **Hero, story or gallery:** export `<name>-640.webp` and `<name>-1280.webp` into `public/images/`, then change the `name` passed to `<Photo>` and remove the "Placeholder" badge.

## Verification status (research on 21 Nov 2026)

Web searches for "Wafflekar", its address and its phone number found **no indexed Google, Zomato, Swiggy or Instagram listing**. So the site follows these rules:

| Item | Status | What the site does |
| --- | --- | --- |
| Name, address, phone | From the owner's brief | Shown everywhere, and used in the schema |
| Menu names and prices (11 items) | Published menu values, provisional | Shown, with a "prices may change" note (`pricesConfirmed = false`) |
| Hours (3 PM – 12 AM) | Listed but unconfirmed | Shown as "to be confirmed"; left out of the schema until `hours.confirmed = true` |
| Google rating (5.0 / 20) | Reported in the brief but not found | **Hidden.** The card says "Coming soon" until `verified: true` |
| Zomato / Swiggy | Not found | "Coming soon" with no link. Paste the exact outlet URLs into `ordering` and `ratings` |
| Instagram / socials | Not found | "Social links coming soon" |
| Testimonials | None | A "leave a review" card. Add only real, permitted quotes to `testimonials` |
| Veg indicator | Unverified | Hidden (`veg: null`) |
| Croffles / Beverages | No items published | Croffles shows an empty state; Beverages is hidden (`visible: false`) |
| Photography | Reference images supplied by the client | Each one is labelled "Placeholder photo". Product cards use illustrations |

"Find us on Google Maps", "Get Directions" and the map embed are address-based Google Maps links, so they work without a verified business listing. When you have the real Google Business Profile URL, set it in `links.googleBusinessProfile`.

## The scroll animation

`src/components/journey/WaffleJourney.tsx` is one GSAP timeline, pinned and scrubbed by ScrollTrigger. A single SVG waffle goes through these stages: batter pour → the grid forms → it bakes golden → chocolate pours and spreads → drizzle and drips → toppings land one by one → a chocolate wave floods the screen ("Resisting this is not an option") → the final reveal ("Made to crave"). Scrolling back reverses it.

* **Mobile** uses a shorter pin, less 3D tilt, fewer particles and a one-line step ticker.
* **`prefers-reduced-motion`** turns off the pin and shows the finished waffle.

All waffles on the site, including the product illustrations, use the same drawing kit (`src/components/waffle/parts.tsx`), so they look consistent.
