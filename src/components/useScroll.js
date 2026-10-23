import { useEffect, useState } from 'react'
// 0..1 progress through a tall section while its sticky child is pinned
export function useSectionProgress(ref) {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf
    const calc = () => {
      const el = ref.current; if (!el) return
      const r = el.getBoundingClientRect()
      const range = r.height - window.innerHeight
      setP(Math.min(1, Math.max(0, range > 0 ? -r.top / range : 0)))
    }
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(calc) }
    window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on); calc()
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [ref])
  return p
}
export function useSize() {
  const [s, set] = useState({ w: window.innerWidth, h: window.innerHeight })
  useEffect(() => { const f = () => set({ w: window.innerWidth, h: window.innerHeight }); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f) }, [])
  return s
}
