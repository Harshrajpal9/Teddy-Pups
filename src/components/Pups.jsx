import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSectionProgress, useSize } from './useScroll'
import { PUPS } from '../data'

const DW = 176, GAP = 34

// scrolling down slides the doors sideways while the section is pinned
export default function Pups() {
  const ref = useRef(null)
  const p = useSectionProgress(ref)
  const { w, h } = useSize()
  const [hover, setHover] = useState(null)

  const track = (PUPS.length + 1) * (DW + GAP) + 80
  const shift = Math.max(0, track - w) * p
  const dogLeft = 40 + p * (w - 240)
  const near = Math.floor((dogLeft + shift + 30 - 40) / (DW + GAP))
  return (
    <section id="pups" ref={ref} style={{ height: Math.max(0, track - w) + h * 1.1 }} className="relative bg-gradient-to-b from-[#fdf1da] to-[#f6d796]">
      <div className="sticky top-0 h-screen overflow-hidden pt-20 sm:pt-24">
        <div className="px-6 lg:px-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="h-display text-4xl sm:text-5xl md:text-7xl">Meet the pups</h2>
            <p className="mt-3 hidden sm:block text-choco/70">Real puppies, real photos, looking for their families right now.</p>
          </div>
          <Link to="/puppies" className="btn btn-rust !py-2 !px-4 sm:!py-3 sm:!px-6">See all available puppies</Link>
        </div>
        <div className="absolute inset-x-0 bottom-[84px] will-change-transform" style={{ transform: `translateX(${-shift}px)` }}>
          <div className="flex items-end" style={{ gap: GAP, paddingLeft: 40 }}>
            {PUPS.map((d, i) => {
              const open = hover === i || near === i
              return (
                <Link to={`/puppies/${d.slug}`} key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="shrink-0 text-center block" style={{ width: DW }}>
                  <h3 className={`h-display text-[1.15rem] leading-[1.05] transition-colors ${open ? 'text-rust' : ''}`}>{d.name.split(' ').map((wd, k) => <span key={k} className="block">{wd}</span>)}</h3>
                  <p className="text-[11px] text-choco/70 mt-1 h-8 leading-tight">{d.sub}</p>
                  <div className="relative mx-auto mt-2 h-[215px]" style={{ width: 140, perspective: 700 }}>
                    <div className="absolute inset-0 rounded-t-[70px] border-[3px] border-choco overflow-hidden bg-[#3a2418]">
                      <img src={d.photo} alt={d.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 rounded-t-[70px] border-[3px] border-choco transition-transform duration-500 ease-out"
                      style={{ background: d.door, transformOrigin: 'left center', transform: open ? 'rotateY(-72deg)' : 'rotateY(0)' }}>
                      <div className="absolute inset-3 rounded-t-[56px] border-2 border-white/30" />
                      <span className="absolute right-3 top-[112px] w-2.5 h-2.5 rounded-full bg-gold border-2 border-choco" />
                      <span className="absolute left-7 top-[78px] text-[14px] opacity-55 grayscale-[.3]">🐾</span>
                    </div>
                    <span className="absolute -right-3 top-8 -rotate-6 bg-white border-2 border-choco rounded-full px-2.5 py-0.5 font-hand font-bold text-sm shadow">Available</span>
                  </div>
                </Link>
              )
            })}
            <Link to="/puppies" className="shrink-0 text-center block" style={{ width: DW }}>
              <div className="mx-auto mt-[88px] h-[215px] w-[140px] rounded-t-[70px] border-[3px] border-dashed border-choco/70 grid place-items-center">
                <span className="h-display text-xl leading-tight underline decoration-rust decoration-[3px] underline-offset-4">Meet<br />them all</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[84px] bg-[#e2a35c] border-t-[3px] border-choco wood" />
      </div>
    </section>
  )
}
