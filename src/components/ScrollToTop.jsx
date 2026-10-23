import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// new page scrolls to the top, a #hash scrolls to its element
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    let t
    const el = hash && document.getElementById(hash.slice(1))
    if (hash) t = setTimeout(() => (document.getElementById(hash.slice(1)) || el)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const r = requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
    return () => { clearTimeout(t); cancelAnimationFrame(r) }
  }, [pathname, hash])
  return null
}
