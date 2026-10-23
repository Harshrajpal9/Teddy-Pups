import { useEffect, useRef } from 'react'
import paw from '../assets/paw.png'

export default function CursorTrail() {
  const box = useRef(null)
  useEffect(() => {
    let lx = innerWidth / 2, ly = innerHeight / 2, n = 0, raf = 0, ev = null
    const timers = new Set()
    const step = () => {
      raf = 0
      const e = ev; if (!e) return
      const root = document.documentElement.style
      root.setProperty('--lx', ((e.clientX / innerWidth) * 2 - 1).toFixed(2))
      root.setProperty('--ly', ((e.clientY / innerHeight) * 2 - 1).toFixed(2))
      if (Math.hypot(e.clientX - lx, e.clientY - ly) < 44) return
      const a = (Math.atan2(e.clientY - ly, e.clientX - lx) * 180) / Math.PI + 90
      lx = e.clientX; ly = e.clientY; n++
      const el = document.createElement('img')
      el.src = paw; el.alt = ''; el.draggable = false; el.className = 'paw-trail'
      el.style.cssText = `left:${lx + (n % 2 ? -9 : 9)}px;top:${ly}px;--r:${a}deg`
      box.current.appendChild(el)
      const t = setTimeout(() => { el.remove(); timers.delete(t) }, 1600); timers.add(t)
    }
    const move = (e) => { ev = e; if (!raf) raf = requestAnimationFrame(step) }
    addEventListener('mousemove', move)
    return () => { removeEventListener('mousemove', move); cancelAnimationFrame(raf); timers.forEach(clearTimeout) }
  }, [])
  return <div ref={box} className="fixed inset-0 pointer-events-none z-[60] overflow-hidden" />
}
