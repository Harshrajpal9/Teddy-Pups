import { useEffect, useRef, useState } from 'react'
import Dog from './Dog'

// one mascot for the whole site: follows the scroll on Home, sits in the footer basket elsewhere
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

export default function Companion({ home = true }) {
  const el = useRef(null)
  const [look, setLook] = useState({ run: false, flip: false })

  useEffect(() => {
    const node = el.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const s = { x: 0, y: 0, k: 1, ready: false, raf: 0, last: 0, force: 0, run: false, flip: false }

    // where the dog should be right now: centre x, bottom y and scale
    const target = () => {
      const vw = innerWidth, vh = innerHeight, W = node.offsetWidth
      const max = document.documentElement.scrollHeight - vh
      const p = max > 0 ? clamp(scrollY / max, 0, 1) : 0

      const basket = document.getElementById('dog-basket')
      if (basket) {
        const r = basket.getBoundingClientRect()
        if (!home) return { cx: r.left + r.width / 2, by: r.bottom - 22, k: 1 }
        if (r.top < vh - r.height * 0.6) return { cx: r.left + r.width / 2, by: r.bottom - 22, k: 1 }
      }
      if (!home) return { cx: -999, by: -999, k: 1 }
      const slot = document.getElementById('hero-dog-slot')
      if (slot && scrollY < 24) {
        const r = slot.getBoundingClientRect()
        return { cx: r.left + r.width / 2, by: r.bottom, k: r.width / W }
      }
      const pups = document.getElementById('pups')
      if (pups) {
        const r = pups.getBoundingClientRect()
        if (r.top < vh * 0.15 && r.bottom > vh * 0.85) {
          const range = r.height - vh
          const pp = clamp(range > 0 ? -r.top / range : 0, 0, 1)
          const stickyTop = Math.min(Math.max(r.top, 0), r.bottom - vh)
          return { cx: 40 + pp * (vw - 240) + 48, by: Math.min(vh - 4, stickyTop + vh - 40), k: 1 }
        }
      }
      const t = 0.5 - 0.5 * Math.cos(p * Math.PI * 5)
      return { cx: 12 + W / 2 + t * (vw - W - 24), by: vh - 4, k: 1 }
    }

    const tick = (now) => {
      s.raf = 0
      const g = target()
      const dt = s.last ? Math.min(64, now - s.last) : 16
      s.last = now
      if (!s.ready || reduce || !home) {
        s.x = g.cx; s.y = g.by; s.k = g.k
        if (!s.ready) { s.ready = true; node.style.opacity = '1' }
      } else {
        const a = 1 - Math.exp(-dt / 140)
        s.x += (g.cx - s.x) * a; s.y += (g.by - s.y) * a; s.k += (g.k - s.k) * a
      }
      const dx = g.cx - s.x, d = Math.hypot(dx, g.by - s.y)
      let run = s.run, flip = s.flip
      if (!run && d > 10) run = true
      else if (run && d < 3) run = false
      if (run && Math.abs(dx) > 3) flip = dx < 0
      if (run !== s.run || flip !== s.flip) { s.run = run; s.flip = flip; setLook({ run, flip }) }

      const W = node.offsetWidth, H = node.offsetHeight
      node.style.transform = `translate3d(${s.x - W / 2}px, ${s.y - H}px, 0) scale(${s.k})`

      const settled = d < 0.3 && Math.abs(g.k - s.k) < 0.003
      if (!settled || now < s.force) s.raf = requestAnimationFrame(tick)
      else s.last = 0
    }
    const kick = () => { if (!s.raf) s.raf = requestAnimationFrame(tick) }

    s.force = performance.now() + 1500
    addEventListener('scroll', kick, { passive: true })
    addEventListener('resize', kick)
    addEventListener('load', kick)
    const ro = new ResizeObserver(kick); ro.observe(document.body)
    kick()
    return () => {
      removeEventListener('scroll', kick); removeEventListener('resize', kick); removeEventListener('load', kick)
      ro.disconnect(); cancelAnimationFrame(s.raf)
    }
  }, [home])

  return (
    <div ref={el} className="fixed left-0 top-0 z-40 w-24 md:w-28 pointer-events-none opacity-0 will-change-transform"
      style={{ transformOrigin: '50% 100%' }}>
      <Dog pose={look.run ? 'run' : 'sit'} flip={look.run && look.flip} className="w-full block" />
    </div>
  )
}
