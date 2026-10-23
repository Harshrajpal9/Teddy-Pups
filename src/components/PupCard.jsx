import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import Deco from './Deco'

const TINT = ['#f3d9a4', '#cfe2ee', '#f6c8ae', '#e9dfbf']
const SHIFT = [[8, 10], [-10, 8], [10, -6], [-8, -8], [12, 6]]
const ARC = [-20, 15, 40, -50, 70, 5]
const DECOS = [
  [['paw', { left: '-6%', top: '12%' }], ['swirl', { left: '-12%', bottom: '20%' }]],
  [['dash', { left: '-16%', top: '4%' }], ['paw', { right: '-12%', bottom: '24%' }]],
  [['dots', { left: '10%', top: '-9%' }], ['spark', { right: '-14%', bottom: '28%' }]],
  [['spark', { left: '-15%', bottom: '30%' }], ['dots', { right: '30%', top: '-10%' }]],
  [['heart', { left: '-10%', top: '-4%' }], ['paw', { right: '-12%', bottom: '18%' }]],
  [['star', { right: '-14%', bottom: '36%' }], ['heart', { left: '-12%', bottom: '8%' }]],
]

export default function PupCard({ p, i = 0 }) {
  const [ready, setReady] = useState(false)
  const [dx, dy] = SHIFT[i % SHIFT.length]
  return (
    <Link to={`/puppies/${p.slug}`} className="group block text-center focus-visible:outline-none">
      <div className="relative w-full max-w-[190px] mx-auto aspect-square">
        <span className="absolute inset-0 rounded-full transition-transform duration-500 group-hover:scale-105" style={{ background: TINT[i % 4], transform: `translate(${dx}px, ${dy}px) scale(1.03)` }} />
        <svg className="absolute -inset-[6%] w-[112%] h-[112%] pointer-events-none" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <path d="M8 40A44 44 0 0 1 86 16" stroke="#2a1710" strokeWidth=".9" strokeLinecap="round" style={{ transform: `rotate(${ARC[i % ARC.length]}deg)`, transformOrigin: '50% 50%' }} />
        </svg>
        <div className="absolute inset-[5%] rounded-full overflow-hidden border-2 border-choco bg-[#efe3cc] transition-transform duration-300 group-hover:scale-[1.04] group-hover:-rotate-2 group-focus-visible:ring-4 ring-rust/50">
          <img src={p.photo} alt={`${p.name}, ${p.meta}`} loading="lazy" onLoad={() => setReady(true)}
            className={`w-full h-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`} />
        </div>
        {p.video && <span className="absolute left-[7%] bottom-[14%] inline-flex items-center gap-1 rounded-full bg-choco/90 text-white text-[10px] font-semibold pl-1.5 pr-2 py-0.5"><Play size={9} fill="currentColor" />video</span>}
        <span className="absolute -right-2 top-[6%] rotate-[14deg] bg-white border-2 border-choco rounded-full px-2.5 py-0.5 font-hand font-bold text-sm shadow">Available</span>
        {DECOS[i % DECOS.length].map(([k, st]) => <Deco key={k} kind={k} style={st} />)}
      </div>
      <h3 className="h-display text-[1.3rem] md:text-[1.45rem] leading-[1.05] mt-5 transition-colors group-hover:text-rust" style={{ textWrap: 'balance' }}>{p.name}</h3>
      <p className="mt-1.5 text-xs text-choco/75 px-3 leading-snug" style={{ textWrap: 'balance' }}>{p.meta}</p>
    </Link>
  )
}
