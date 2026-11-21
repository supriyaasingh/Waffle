import { MotionConfig } from 'framer-motion'
import { OrderProvider } from './state/order'
import { Nav } from './components/layout/Nav'
import { Footer } from './components/layout/Footer'
import { OrderTray } from './components/layout/OrderTray'
import { ScrollProgress, WaffleCursor } from './components/layout/Chrome'
import { Hero } from './components/sections/Hero'
import { WaffleJourney } from './components/journey/WaffleJourney'
import { Signature } from './components/sections/Signature'
import { Spotlight } from './components/sections/Spotlight'
import { MenuSection } from './components/sections/MenuSection'
import { Story } from './components/sections/Story'
import { Reviews } from './components/sections/Reviews'
import { Gallery } from './components/sections/Gallery'
import { Location } from './components/sections/Location'
import { OrderCTA } from './components/sections/OrderCTA'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <OrderProvider>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-caramel focus:px-4 focus:py-2 focus:font-bold">
          Skip to content
        </a>
        <ScrollProgress />
        <WaffleCursor />
        <Nav />
        <main id="main">
          <Hero />
          <WaffleJourney />
          <Signature />
          <Spotlight />
          <MenuSection />
          <Story />
          <Reviews />
          <Gallery />
          <Location />
          <OrderCTA />
        </main>
        <Footer />
        <OrderTray />
      </OrderProvider>
    </MotionConfig>
  )
}
