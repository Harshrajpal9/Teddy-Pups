import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, MessageCircle, ShieldCheck, Play } from 'lucide-react'
import PupCard from '../components/PupCard'
import PageCta from '../components/PageCta'
import Deco from '../components/Deco'
import useTitle from '../components/useTitle'
import { PUPS, waLink } from '../data'

export default function PuppyDetail() {
  const { slug } = useParams()
  const idx = PUPS.findIndex((p) => p.slug === slug)
  const p = PUPS[idx]
  useTitle(p ? p.name : 'Puppy not found')

  if (!p) return (
    <div className="dots-bg page-in pt-36 pb-24 px-6 text-center min-h-[70vh]">
      <h1 className="h-display text-5xl">That puppy has found a home!</h1>
      <p className="mt-4 text-choco/75">We couldn't find that listing, but there are plenty of others waiting.</p>
      <Link to="/puppies" className="btn btn-rust mt-8">See available puppies</Link>
    </div>
  )

  const prev = PUPS[(idx - 1 + PUPS.length) % PUPS.length], next = PUPS[(idx + 1) % PUPS.length]
  const more = [1, 2, 3, 4, 5].map((n) => PUPS[(idx + n) % PUPS.length])
  const msg = `Hi TeddyPups! I'd love to know more about ${p.name} (${p.meta}).`
  const facts = [['Breed', p.breeds.join(' & ') || '—'], ['Boy or girl', p.sex.join(' & ')], ['Age', p.meta.split(' · ').slice(-1)[0]], ['Origin', p.imported ? 'Imported' : 'In Dubai']]

  return (
    <div className="dots-bg page-in pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        <Link to="/puppies" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-rust transition-colors"><ArrowLeft size={16} />All available puppies</Link>

        <div className="mt-8 grid md:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div className="relative w-full max-w-[420px] mx-auto aspect-square">
            <span className="absolute inset-0 rounded-full bg-[#f3d9a4] translate-x-4 translate-y-4 scale-[1.03]" />
            <div className="absolute inset-[3%] rounded-full overflow-hidden border-[3px] border-choco bg-[#efe3cc]">
              <img src={p.big} alt={`${p.name}, ${p.meta}`} className="w-full h-full object-cover" />
            </div>
            <span className="absolute -right-2 top-[8%] rotate-[12deg] bg-white border-2 border-choco rounded-full px-4 py-1 font-hand font-bold text-lg shadow">Available</span>
            {p.video && <span className="absolute left-[8%] bottom-[10%] inline-flex items-center gap-1.5 rounded-full bg-choco/90 text-white text-xs font-semibold pl-2 pr-3 py-1"><Play size={11} fill="currentColor" />with video</span>}
            <Deco kind="paw" style={{ left: '-4%', top: '14%' }} /><Deco kind="spark" style={{ right: '-6%', bottom: '18%' }} /><Deco kind="heart" style={{ left: '-5%', bottom: '10%' }} />
          </div>

          <div>
            <p className="font-hand font-bold text-xl text-rust">{p.breeds.join(' & ')}</p>
            <h1 className="h-display text-5xl md:text-6xl mt-1" style={{ textWrap: 'balance' }}>{p.name}</h1>
            <p className="mt-3 text-choco/75">{p.meta}</p>

            <dl className="mt-7 grid grid-cols-2 gap-3 max-w-md">
              {facts.map(([k, v]) => (
                <div key={k} className="rounded-xl border-2 border-choco bg-cream px-4 py-2.5">
                  <dt className="font-hand font-bold text-sm text-choco/70">{k}</dt>
                  <dd className="font-semibold capitalize">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 flex gap-3 max-w-md text-sm text-choco/80"><ShieldCheck className="shrink-0 text-rust" size={20} />Every puppy is vaccinated, dewormed and thoroughly checked, with a verified health certificate from licensed vets.</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn btn-wa"><MessageCircle size={16} />Ask about {p.name.split(' ')[0]}</a>
              <Link to="/contact" className="btn btn-line">Visit the showroom</Link>
            </div>
            <div className="mt-8 flex gap-5 text-sm font-semibold">
              <Link to={`/puppies/${prev.slug}`} className="inline-flex items-center gap-1.5 hover:text-rust"><ArrowLeft size={15} />Previous</Link>
              <Link to={`/puppies/${next.slug}`} className="inline-flex items-center gap-1.5 hover:text-rust">Next<ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>

        <h2 className="h-display text-3xl md:text-4xl mt-24">More puppies looking for a home</h2>
        <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 md:gap-x-8 gap-y-14">
          {more.map((m, i) => <li key={m.slug}><PupCard p={m} i={i + idx} /></li>)}
        </ul>
      </div>
      <PageCta />
    </div>
  )
}
