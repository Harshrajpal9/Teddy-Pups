import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import Dog from '../components/Dog'
import useTitle from '../components/useTitle'
import { FAQ_BOARD, waLink } from '../data'

const PINS = ['#e8742a', '#3f6fb5', '#e0a53a', '#c9504a']

function Note({ q, a, i, open, onToggle }) {
  const right = i % 2 === 1
  return (
    <li className={`relative ${right ? 'ml-8 sm:ml-14' : ''}`}
      style={{ transform: open ? 'none' : `rotate(${right ? 0.6 : -0.8}deg)`, transition: 'transform .3s ease' }}>
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-5 h-5 rounded-full border-2 border-choco shadow" style={{ background: PINS[i % 4] }} aria-hidden="true" />
      <div className="relative w-full rounded-lg border-2 border-choco bg-gradient-to-b from-cream to-[#fff3dc] text-choco shadow-[5px_6px_0_rgba(42,23,16,.3)]">
        <button type="button" onClick={onToggle} aria-expanded={open}
          className="w-full flex items-center justify-between gap-4 text-left px-6 py-6">
          <span className="h-display text-xl md:text-2xl leading-snug">{q}</span>
          <ChevronDown size={24} className={`shrink-0 text-rust transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="px-6 pb-6">
            <p className="pt-4 border-t-2 border-dashed border-rust/30 text-base md:text-lg text-choco/70 leading-relaxed">{a}</p>
          </div>
        )}
        {!open && <span className="absolute right-1.5 bottom-1.5 w-5 h-5 border border-choco bg-[#f1dfb8] [clip-path:polygon(100%_0,100%_100%,0_100%)]" aria-hidden="true" />}
      </div>
    </li>
  )
}

export default function Faq() {
  useTitle('Questions & answers')
  const [q, setQ] = useState('')
  const [openIdx, setOpenIdx] = useState(null)

  const term = q.trim().toLowerCase()
  const list = FAQ_BOARD.filter(([qq, aa]) => !term || (qq + ' ' + aa).toLowerCase().includes(term))

  return (
    <div className="page-in pt-28 pb-24 min-h-screen bg-gradient-to-b from-[#a65a2f] via-[#7b4023] to-[#2f1a10] text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 className="h-display text-[clamp(3.2rem,9vw,6.5rem)] max-w-3xl">Questions<br />&amp; answers</h1>
        <p className="mt-6 max-w-xl text-lg md:text-xl text-cream/85">
          Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7.
        </p>

        <div className="mt-12 grid lg:grid-cols-[300px_1fr] gap-10 lg:gap-14 items-start">
          <aside className="lg:sticky lg:top-28">
            <label htmlFor="faq-search" className="font-hand font-bold text-lg text-gold">sniff out a question</label>
            <div className="mt-2 flex items-center gap-2 rounded-full bg-cream text-choco px-4 py-3 shadow-[0_3px_0_rgba(0,0,0,.25)]">
              <Search size={18} className="shrink-0 text-rust" />
              <input id="faq-search" value={q} onChange={(e) => { setQ(e.target.value); setOpenIdx(null) }}
                placeholder="delivery, Korea, vaccinated…" className="w-full bg-transparent text-base placeholder:text-choco/45 focus:outline-none" />
            </div>
            <p className="mt-3 font-hand text-base text-cream/80" aria-live="polite">{list.length} {list.length === 1 ? 'note' : 'notes'} on the board</p>

            <div className="relative mt-6 w-40">
              <span className="absolute -top-3 left-14 grid place-items-center w-10 h-10 rounded-full border-2 border-choco bg-cream text-rust font-hand font-bold text-xl" aria-hidden="true">?</span>
              <Dog className="w-36 mt-6" />
            </div>

            <a href={waLink("Hi TeddyPups! I have a question: ")} target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-6 !text-base">Ask your own question</a>
          </aside>

          <div className="rounded-[22px] border-[5px] border-[#5a3017] bg-[#c99a5f] p-4 sm:p-6 shadow-[0_10px_0_rgba(0,0,0,.28)]"
            style={{ backgroundImage: 'radial-gradient(rgba(90,48,23,.28) 1.2px, transparent 1.6px), radial-gradient(rgba(255,235,190,.25) 1px, transparent 1.4px)', backgroundSize: '9px 9px, 13px 13px', backgroundPosition: '0 0, 4px 6px' }}>
            {list.length ? (
              <ul className="space-y-7 py-3">
                {list.map(([qq, aa], i) => (
                  <Note key={qq} q={qq} a={aa} i={i} open={openIdx === qq} onToggle={() => setOpenIdx(openIdx === qq ? null : qq)} />
                ))}
              </ul>
            ) : (
              <div className="m-4 rounded-sm border-[1.5px] border-choco bg-cream p-8 text-center text-choco">
                <p className="h-display text-2xl">No notes match that.</p>
                <p className="mt-2 text-base text-choco/75">Try another word, or ask us directly on WhatsApp.</p>
                <button type="button" className="btn btn-line mt-5" onClick={() => setQ('')}>Clear search</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
