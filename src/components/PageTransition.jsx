import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Dog from './Dog'
import { NAV } from '../data'

// navbar click: curtain covers the page, route changes behind it, curtain lifts
const COVER = 620, HOLD = 520, REVEAL = 640
const Ctx = createContext(null)
export const usePageTransition = () => useContext(Ctx)

const labelFor = (to) => (NAV.find(([, p]) => p === to.split('#')[0]) || [])[0] || 'TeddyPups'

export function PageTransitionProvider({ children }) {
  const navigate = useNavigate()
  const loc = useLocation()
  const [st, setSt] = useState({ phase: 'idle', label: '', run: 0 })
  const busy = useRef(false)
  const timers = useRef([])
  const here = useRef(loc.pathname + loc.hash)
  here.current = loc.pathname + loc.hash
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const go = useCallback((to) => {
    if (busy.current || to === here.current) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { navigate(to); return }
    busy.current = true
    document.body.style.overflow = 'hidden'
    setSt((s) => ({ phase: 'cover', label: labelFor(to), run: s.run + 1 }))
    later(() => navigate(to), COVER)
    later(() => setSt((s) => ({ ...s, phase: 'reveal' })), COVER + HOLD)
    later(() => { setSt((s) => ({ ...s, phase: 'idle' })); busy.current = false; document.body.style.overflow = '' }, COVER + HOLD + REVEAL)
  }, [navigate])

  const link = useCallback((to, extra) => (e) => {
    extra?.()
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    go(to)
  }, [go])

  return (
    <Ctx.Provider value={{ go, link }}>
      {children}
      <Curtain {...st} />
    </Ctx.Provider>
  )
}

function Curtain({ phase, run }) {
  if (phase === 'idle') return null
  return (
    <div className={`pt-curtain pt-${phase}`} aria-hidden="true">
      <div className="pt-argyle" />
      <div className="pt-dogtrack" key={run}>
        <Dog pose="run" className="w-28 md:w-36" />
      </div>
      <p className="pt-text font-hand font-bold text-rust text-3xl md:text-4xl">every puppy is family</p>
    </div>
  )
}
