import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Companion from './Companion'
import CursorTrail from './CursorTrail'
import ScrollToTop from './ScrollToTop'
import { PageTransitionProvider } from './PageTransition'

export default function Layout() {
  const { pathname } = useLocation()
  const home = pathname === '/'
  // the dog starts in the hero on Home and rests in the footer basket on every other page
  return (
    <PageTransitionProvider>
      <ScrollToTop />
      <Navbar />
      <main id="main"><Outlet /></main>
      <Footer />
      <Companion key={home ? 'home' : 'other'} home={home} />
      <CursorTrail />
    </PageTransitionProvider>
  )
}
