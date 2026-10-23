import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle, PawPrint } from 'lucide-react'
import { NAV, WA } from '../data'
import { usePageTransition } from './PageTransition'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { link } = usePageTransition()
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', esc)
    return () => { document.body.style.overflow = ''; removeEventListener('keydown', esc) }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-cream/95 backdrop-blur flex items-center justify-between px-6 lg:px-12 h-16">
        <Link to="/" onClick={link('/')} className="flex items-center gap-2 font-display font-black text-xl">
          <span className="grid place-items-center w-10 h-10 rounded-full border-2 border-rust bg-gold"><img src="/images/logo.png" alt="TeddyPups" className="h-10 w-auto" /></span>
          TeddyPups
        </Link>
        <nav className="hidden lg:flex gap-9 text-sm font-semibold" aria-label="Main">
          {NAV.map(([label, to]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={link(to)} className={({ isActive }) => `relative group ${isActive ? 'text-rust' : ''}`}>
              {({ isActive }) => (<>
                {label}
                <PawPrint size={9} className={`absolute left-1/2 -translate-x-1/2 -bottom-3 text-rust transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
              </>)}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-wa hidden sm:inline-flex !py-2"><MessageCircle size={16} />WhatsApp us</a>
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}><Menu /></button>
        </div>
      </div>
      <div className="scallop" />
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 bg-choco text-cream z-50 p-8 flex flex-col gap-6 overflow-y-auto">
          <div className="flex justify-between items-center">
            <span className="font-hand text-2xl text-gold">where to, friend?</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
          </div>
          {NAV.map(([label, to]) => <Link key={to} to={to} onClick={link(to, () => setOpen(false))} className="font-display font-black text-3xl">{label}</Link>)}
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-wa justify-center">WhatsApp us</a>
        </div>
      )}
    </header>
  )
}
