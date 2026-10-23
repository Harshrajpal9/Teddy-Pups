import { Link, useSearchParams } from 'react-router-dom'
import { Heart, MessageCircle, PawPrint, Sparkle } from 'lucide-react'
import PupCard from '../components/PupCard'
import Dog from '../components/Dog'
import useTitle from '../components/useTitle'
import { PUPS, BREEDS, keyOf, WA, GONE } from '../data'

const WHERE = [['everywhere', 'Everywhere'], ['local', 'In Dubai'], ['imported', 'Imported'], ['korean', 'Korean Teacup']]
const SEX = [['boy', 'Boys'], ['girl', 'Girls']]

const GONE_STYLE = [
  { blob: '#f6cbb9', doodles: [[PawPrint, '-left-[22%] top-[46%]', 14, true, 'text-rust'], [Sparkle, '-right-[38%] top-[34%]', 24, true, 'text-choco']] },
  { blob: '#f4c3b6', doodles: [[Heart, '-left-[16%] -top-[6%]', 24, false, 'text-rust'], [Sparkle, '-right-[26%] top-[46%]', 16, true, 'text-rust']] },
  { blob: '#cfe4e1', doodles: [[Heart, '-right-[18%] top-[26%]', 26, false, 'text-rust']] },
  { blob: '#f5d3a5', doodles: [[PawPrint, 'left-[6%] -top-[12%]', 16, true, 'text-rust'], ['dots', '-right-[24%] top-[38%]'], [Heart, 'right-[0%] bottom-[8%]', 18, false, 'text-rust']] },
  { blob: '#ecd0b0', doodles: [[Sparkle, '-right-[22%] top-[24%]', 20, true, 'text-rust']] },
]

const Row = ({ label, children }) => (
  <div className="grid grid-cols-[74px_1fr] sm:grid-cols-[92px_1fr] items-center gap-3">
    <span className="font-hand font-bold text-choco/80">{label}</span>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
)

export default function Puppies() {
  useTitle('Available puppies')
  const [sp, setSp] = useSearchParams()
  const origin = sp.get('origin') || 'everywhere'
  const breed = sp.get('breed') || ''
  const sex = sp.get('sex') || ''

  // filters live in the URL so a filtered list can be shared
  const set = (k, v) => { const n = new URLSearchParams(sp); v ? n.set(k, v) : n.delete(k); setSp(n, { replace: true }) }

  const list = PUPS.filter((p) =>
    (origin === 'local' ? !p.imported : origin === 'imported' ? p.imported : origin === 'korean' ? p.korean : true) &&
    (!breed || p.breeds.some((b) => keyOf(b) === breed)) &&
    (!sex || p.sex.includes(sex)))

  return (
    <div className="dots-bg page-in pt-28">
      <header className="w-full px-6 lg:px-12 mb-12 flex items-start justify-between gap-8">
        <div className="min-w-0">
          <p className="font-hand font-bold text-lg text-rust">every puppy is family</p>
          <div className="inline-block max-w-full">
            <h1 className="h-display text-[clamp(3.2rem,9vw,6rem)] leading-none">Available puppies</h1>
            <svg className="mt-1 block w-full h-3 text-rust" viewBox="0 0 400 12" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2 7 C40 1 80 12 120 6 S200 1 240 7 S320 12 398 5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <p className="mt-5 max-w-lg text-lg text-choco/80 leading-relaxed">
            Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
          </p>
        </div>

        <figure className="hidden sm:block shrink-0 text-center -rotate-3 mt-2" aria-hidden="true">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-[3px] border-choco bg-[#f7e2b3] flex items-end justify-center overflow-hidden shadow-[4px_5px_0_rgba(42,23,16,.22)]">
            <Dog className="w-32 md:w-40 translate-y-3" />
          </div>
          <figcaption className="font-hand text-sm mt-2">self-portrait</figcaption>
        </figure>
      </header>

      <div className="w-full px-6 lg:px-12 pb-24">
        <section aria-label="Filter puppies" className="relative rounded-2xl border-[3px] border-choco bg-cream p-5 md:p-6 space-y-4 shadow-[5px_6px_0_rgba(42,23,16,.9)]">
          <i className="absolute -top-3 left-6 w-20 h-5 bg-[#f1d9a0]/90 -rotate-2" aria-hidden="true" />
          <Row label="where">
            {WHERE.map(([k, l]) => <button key={k} type="button" className="chip" aria-pressed={origin === k} onClick={() => set('origin', k === 'everywhere' ? '' : k)}>{l}</button>)}
          </Row>
          <Row label="breed">
            {BREEDS.map((b) => <button key={b} type="button" className="chip" aria-pressed={breed === keyOf(b)} onClick={() => set('breed', breed === keyOf(b) ? '' : keyOf(b))}>{b}</button>)}
          </Row>
          <Row label="boy or girl">
            {SEX.map(([k, l]) => <button key={k} type="button" className="chip" aria-pressed={sex === k} onClick={() => set('sex', sex === k ? '' : k)}>{l}</button>)}
          </Row>
        </section>

        <p className="mt-10 font-hand font-bold text-xl" aria-live="polite">
          {list.length} {list.length === 1 ? 'puppy' : 'puppies'} looking for a home
        </p>

        {list.length ? (
          <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 md:gap-x-8 gap-y-14">
            {list.map((p, i) => <li key={p.slug}><PupCard p={p} i={i} /></li>)}
          </ul>
        ) : (
          <div className="mt-8 max-w-lg rounded-2xl border-[3px] border-dashed border-choco/60 bg-white/60 p-8 text-center">
            <p className="h-display text-2xl">No puppies match that mix right now.</p>
            <p className="mt-2 text-sm text-choco/75">Try fewer filters, or tell us what you're looking for and we'll keep an eye out.</p>
            <div className="mt-5 flex flex-wrap gap-3 justify-center">
              <button type="button" className="btn btn-line" onClick={() => setSp({}, { replace: true })}>Clear filters</button>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-wa"><MessageCircle size={16} />Ask on WhatsApp</a>
            </div>
          </div>
        )}
      </div>

      <section className="relative overflow-hidden bg-[#f7e3b5]"
        style={{ backgroundImage: 'radial-gradient(rgba(155,65,27,.12) 1.2px, transparent 1.2px)', backgroundSize: '26px 26px' }}>
        <div className="w-full px-6 lg:px-12 pt-20 pb-32 md:pb-36 grid items-center gap-14 lg:grid-cols-[auto_1fr] lg:gap-x-16">
          <div className="text-center lg:text-left">
            <h2 className="h-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[.9]">Already<br />gone home</h2>
            <p className="mt-3 text-base text-choco/85">These puppies have found their families.</p>
            <div className="relative mt-6 inline-block">
              <Link to="/happy-families" className="btn btn-rust !text-base !px-8 !py-3">See the puppies who've gone home</Link>
              <PawPrint size={22} fill="currentColor" strokeWidth={1.5} className="absolute -top-3 left-3 -rotate-12 text-choco pointer-events-none" aria-hidden="true" />
            </div>
          </div>

          <ul className="grid grid-cols-5 w-full max-w-4xl justify-self-center gap-x-3 sm:gap-x-6 lg:gap-x-8 gap-y-14">
            {GONE.map((g, i) => {
              const st = GONE_STYLE[i % GONE_STYLE.length]
              return (
                <li key={g.name} className="min-w-0 text-center">
                  <div className="relative w-[82%] max-w-[8.5rem] aspect-square mx-auto">
                    <span className="absolute -inset-[4%] translate-x-[3%] translate-y-[3%] rounded-full" style={{ background: st.blob }} aria-hidden="true" />
                    <span className="absolute -inset-[9%] -rotate-12 rounded-[52%_48%_50%_50%] border-[1.5px] border-choco/80" aria-hidden="true" />
                    <img src={g.src} alt={g.name} loading="lazy"
                      className="relative w-full h-full rounded-full bg-[#f4c9c2] object-cover" />
                    {st.doodles.map(([Icon, pos, size, filled, color], k) => Icon === 'dots' ? (
                      <span key={k} className={`absolute flex gap-1 items-end ${pos}`} aria-hidden="true">
                        <i className="w-1 h-1 rounded-full bg-choco" /><i className="w-1.5 h-1.5 rounded-full bg-choco" /><i className="w-1 h-1 rounded-full bg-choco mb-1" />
                      </span>
                    ) : (
                      <Icon key={k} size={size} strokeWidth={1.5} fill={filled ? 'currentColor' : 'none'}
                        className={`absolute ${color} ${pos}`} aria-hidden="true" />
                    ))}
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 -rotate-6 whitespace-nowrap rounded-full border-2 border-rust bg-white px-2 sm:px-3 py-0.5 font-hand font-bold text-[10px] sm:text-xs lg:text-sm text-rust shadow-[1px_2px_0_rgba(42,23,16,.25)]">
                      gone home ♥
                    </span>
                  </div>
                  <p className="mt-6 font-display font-bold text-sm sm:text-base lg:text-lg text-choco">{g.name}</p>
                </li>
              )
            })}
          </ul>
        </div>

        <svg className="absolute inset-x-0 bottom-0 w-full h-20 md:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 70 C240 120 480 125 720 105 C960 85 1200 40 1440 30 L1440 120 L0 120Z" fill="#2a1710" />
        </svg>
      </section>
    </div>
  )
}
