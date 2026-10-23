import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Puppies from './pages/Puppies'
import PuppyDetail from './pages/PuppyDetail'
import HappyFamilies from './pages/HappyFamilies'
import HowItWorks from './pages/HowItWorks'
import FaqPage from './pages/Faq'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="puppies" element={<Puppies />} />
        <Route path="puppies/:slug" element={<PuppyDetail />} />
        <Route path="happy-families" element={<HappyFamilies />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
