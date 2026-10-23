import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BadgeCheck, Heart, HeartPulse, MessageCircle, MessageSquare, PawPrint, Plane, Search, ShieldCheck, Smile, Truck } from 'lucide-react'
import Dog from '../components/Dog'
import Deco from '../components/Deco'
import useTitle from '../components/useTitle'
import { STEPS, WA } from '../data'

const Skyline = ({ className = '', stroke = '#3a2418', w = 3 }) => (
  <svg className={className} viewBox="0 0 400 160" preserveAspectRatio="xMidYMax meet" fill="none" stroke={stroke} strokeWidth={w} strokeLinejoin="round" aria-hidden="true">
    <path d="M0 160V96h26V70h22v90M62 160V104h20v56M96 160V80h18v80M128 160V64l10-10 10 10v96M166 160V60h10V30h8V8l4-8 4 8v22h8v30h10v100M232 160V92h22V64h14v96M282 160V78h18v82M314 160V54h14V40h10v14h10v106M360 160V98h40" />
    <path d="M0 160h400" />
  </svg>
)
const PlaneShape = () => (
  <>
    <path d="M10 44 Q60 18 112 34 Q60 62 10 44Z" fill="#fffdf8" stroke="#2a1710" strokeWidth="3" strokeLinejoin="round" />
    <path d="M52 34 L40 6 L58 8 L76 32Z" fill="#b5502a" stroke="#2a1710" strokeWidth="3" strokeLinejoin="round" />
    <path d="M52 48 L40 74 L58 72 L74 50Z" fill="#b5502a" stroke="#2a1710" strokeWidth="3" strokeLinejoin="round" />
    <path d="M14 42 L6 28 L18 32Z" fill="#b5502a" stroke="#2a1710" strokeWidth="3" strokeLinejoin="round" />
  </>
)
const PlaneArt = () => (
  <svg viewBox="0 0 120 80" className="w-32 md:w-44 -rotate-6" aria-hidden="true"><PlaneShape /></svg>
)

function FlightPath() {
  const box = useRef(null), plane = useRef(null)
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const P0 = [40, 250], P1 = [200, 20], P2 = [360, 240]
    const place = (t) => {
      const u = 1 - t
      const x = u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0]
      const y = u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1]
      const dx = 2 * u * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0])
      const dy = 2 * u * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1])
      const a = (Math.atan2(dy, dx) * 180) / Math.PI
      plane.current.setAttribute('transform', `translate(${x} ${y}) rotate(${a}) scale(.7) translate(-60 -40)`)
    }
    let raf = 0
    const calc = () => {
      raf = 0
      if (reduce) return place(0.5)
      const r = box.current.getBoundingClientRect(), vh = innerHeight
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.6)))
      place(p * p * (3 - 2 * p))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(calc) }
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    calc()
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div ref={box} className="relative h-80 md:h-[26rem]">
      <Skyline className="absolute inset-x-0 bottom-0 w-full h-[55%] opacity-50" stroke="#8a5a3a" w={2.5} />
      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax meet" fill="none" aria-hidden="true">
        <path d="M40 250 Q200 20 360 240" stroke="#b5502a" strokeWidth="2.5" strokeDasharray="2 8" strokeLinecap="round" />
        <circle cx="40" cy="250" r="6" fill="#b5502a" /><circle cx="360" cy="240" r="6" fill="#b5502a" />
        <text x="18" y="280" className="font-hand" fontSize="20" fill="#2a1710">Korea</text>
        <text x="326" y="272" className="font-hand" fontSize="20" fill="#2a1710">Dubai</text>
        <g ref={plane}><PlaneShape /></g>
      </svg>
    </div>
  )
}

const SECTIONS = [
  ['1', 'Two ways home', 'two-ways'],
  ['2', 'Our premium puppy promise', 'promise'],
  ['3', 'Delivery & collection', 'delivery'],
  ['4', 'Why choose us', 'why'],
]
const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const DUBAI = {
  title: 'Meet your puppy in person',
  text: "Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face to face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they're raised with care, proper nutrition, and veterinary checks.",
  steps: [
    [Search, 'Explore our puppies', 'Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.', '#fde3b5'],
    [Heart, 'Choose your puppy', 'Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.', '#fbd5d0'],
    [Smile, 'Meet before you choose', 'Spend time bonding before making your decision.', '#d6e6f2'],
    [Truck, 'Pick-up or delivery', 'Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.', '#dcebd2'],
  ],
}
const IMPORTED = {
  title: 'Order a rare breed, delivered safe',
  text: "Looking for a rare miniature breed? Tell us what you want and we order from trusted, reputable breeders, handling the import and a safe, stress-free delivery to you. Exclusive Korean teacup puppies are available this way.",
  steps: [
    [Search, ...STEPS[0], '#fde3b5'],
    [MessageCircle, ...STEPS[1], '#d6e6f2'],
    [Plane, ...STEPS[2], '#dcebd2'],
  ],
}
const PROMISE = [
  [BadgeCheck, 'Hand-selected breeders', 'We work only with trusted, reputable breeders.', '#b5502a', 'rotate-[-4deg]'],
  [ShieldCheck, 'Full transparency', 'Real photos, videos and health details are shared before anything is confirmed.', '#3f8a5b', 'rotate-[2deg]'],
  [Plane, 'Safe, stress-free delivery', 'We handle every detail so your puppy arrives happy, healthy and ready to love.', '#7a5a45', 'rotate-[-2deg]'],
]
const DELIVERY = [
  ['Take your puppy home the same day', 'Local puppies are available immediately — visit, fall in love, and go home together.'],
  ['Delivery within Dubai', 'Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably.'],
  ['Safe international cargo', 'We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free.'],
  ['Worldwide delivery', 'We safely deliver puppies to loving homes all around the world. Our trusted international cargo partner ensures your new furry friend travels comfortably and arrives safely, no matter the distance.'],
]
const WHY = [
  [Plane, 'International cargo', 'We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.'],
  [MessageSquare, 'Support 24/7', "Our team is available 24/7 to answer your questions and assist you through every step of the adoption process. From choosing your puppy to post-delivery support — we're just a message away."],
  [HeartPulse, 'Health guarantee', 'All our puppies come with a verified health certificate from licensed vets. We ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.'],
]

export default function HowItWorks() {
  useTitle('How it works')
  const [mode, setMode] = useState('dubai')
  const d = mode === 'dubai' ? DUBAI : IMPORTED

  return (
    <div className="page-in pt-28 pb-24 min-h-screen bg-gradient-to-b from-cream via-[#fff3d9] to-[#f6cf85] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <header className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-end">
          <h1 className="h-display text-[clamp(3rem,9vw,6.5rem)]">How it works</h1>
          <p className="max-w-xl text-base md:text-lg text-choco/75 leading-relaxed lg:pb-4">
            Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.
          </p>
        </header>
        <nav aria-label="On this page" className="mt-7 flex flex-wrap gap-2.5">
          {SECTIONS.map(([n, l, id]) => (
            <button key={id} type="button" onClick={() => jump(id)}
              className="inline-flex items-center gap-2 rounded-full border border-choco bg-cream px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#f6d796]">
              <span className="font-display font-black text-rust">{n}</span>{l}
            </button>
          ))}
        </nav>

        <div id="two-ways" className="relative mt-20 scroll-mt-28 flex flex-wrap items-end justify-between gap-6">
          <Deco kind="paw" style={{ left: '38%', top: '-6%' }} />
          <Deco kind="paw" style={{ left: '46%', top: '30%' }} />
          <div>
            <p className="font-hand font-bold text-2xl text-rust">choose your way</p>
            <h2 className="h-display text-[clamp(2.6rem,6vw,4.5rem)]">Two ways home</h2>
          </div>
          <div className="flex items-center gap-3 max-w-full">
            <div role="group" aria-label="How do you want your puppy?" className="flex rounded-full border-2 border-choco bg-cream p-1.5 shadow-[3px_4px_0_rgba(42,23,16,.2)]">
              {[['dubai', 'In Dubai', 'meet in person'], ['imported', 'Imported', 'order upon request']].map(([k, l, s]) => (
                <button key={k} type="button" aria-pressed={mode === k} onClick={() => setMode(k)}
                  className={`rounded-full px-4 sm:px-6 py-2.5 text-left transition-colors ${mode === k ? 'bg-rust text-cream' : 'text-choco hover:bg-[#f6d796]'}`}>
                  <span className="block font-bold text-base sm:text-lg">{l}</span>
                  <span className="block font-hand text-sm opacity-80">{s}</span>
                </button>
              ))}
            </div>
            <Dog className="w-20 hidden sm:block" />
          </div>
        </div>

        <section key={mode} className="page-in mt-16 grid md:grid-cols-[1fr_1.1fr] gap-12 items-end" aria-live="polite">
          <div className="pb-2">
            <h3 className="h-display text-4xl md:text-6xl">{d.title}</h3>
            <p className="mt-5 text-base md:text-lg text-choco/80 leading-relaxed">{d.text}</p>
          </div>
          <div className="relative rounded-3xl border-[3px] border-choco bg-gradient-to-b from-[#fff6e3] to-[#fbe3b0] overflow-hidden h-64 md:h-80 shadow-[6px_8px_0_rgba(42,23,16,.28)] -rotate-1">
            <p className="absolute left-5 top-4 font-hand text-base">{mode === 'dubai' ? 'Downtown, Dubai' : 'Korea → Dubai'}</p>
            <span className="absolute right-12 top-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#f6c466] shadow-[0_0_50px_rgba(246,196,102,.85)]" />
            {mode === 'imported' && <div className="absolute left-[28%] top-[24%]"><PlaneArt /></div>}
            <Skyline className="absolute inset-x-0 bottom-0 w-full h-[78%]" />
          </div>
        </section>

        <ol className={`mt-12 grid gap-6 sm:grid-cols-2 ${d.steps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
          {d.steps.map(([Icon, t, body, tint], i) => (
            <li key={t} className="rounded-2xl border-2 border-choco bg-cream p-6 shadow-[4px_5px_0_rgba(42,23,16,.2)]">
              <span className="grid place-items-center w-14 h-14 rounded-full" style={{ background: tint }}><Icon size={28} className="text-rust" /></span>
              <p className="mt-5 font-hand text-base text-rust font-bold">Step {i + 1}</p>
              <h3 className="font-display font-black text-2xl leading-tight">{t}</h3>
              <p className="mt-3 text-lg text-choco/75 leading-relaxed">{body}</p>
            </li>
          ))}
        </ol>

        <section id="promise" className="scroll-mt-28 relative mt-24 rounded-3xl border-[3px] border-choco p-8 md:p-14 shadow-[6px_8px_0_rgba(42,23,16,.2)] -rotate-[0.6deg]"
          style={{ background: '#fffaf0', backgroundImage: 'linear-gradient(45deg, rgba(155,65,27,.06) 1px, transparent 1px), linear-gradient(-45deg, rgba(155,65,27,.06) 1px, transparent 1px)', backgroundSize: '34px 34px' }}>
          <p className="font-hand font-bold text-xl text-rust">puppy passport</p>
          <h2 className="h-display text-5xl md:text-7xl mt-1">Our premium<br />puppy promise</h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {PROMISE.map(([Icon, t, body, color, rot]) => (
              <div key={t} className="text-center">
                <div className={`mx-auto grid place-items-center w-40 h-40 md:w-44 md:h-44 rounded-full ${rot}`} style={{ border: `3px dashed ${color}`, color, boxShadow: `inset 0 0 0 7px #fffaf0, inset 0 0 0 9px ${color}` }}>
                  <div><Icon size={38} className="mx-auto" /><p className="mt-2 px-6 font-display font-black text-base leading-tight">{t}</p></div>
                </div>
                <p className="mt-5 text-lg text-choco/75 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="delivery" className="scroll-mt-28 mt-28 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <h2 className="h-display text-[clamp(2.6rem,6vw,4.5rem)]">Delivery &amp;<br />collection</h2>
            <p className="mt-6 text-xl md:text-2xl text-choco/80 max-w-xl leading-relaxed">From a same day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.</p>
            <dl className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {DELIVERY.map(([t, b]) => (
                <div key={t}>
                  <dt className="font-display font-black text-xl md:text-2xl leading-tight">{t}</dt>
                  <dd className="mt-2 text-lg text-choco/75 leading-relaxed">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
          <FlightPath />
        </section>

        <section id="why" className="scroll-mt-28 mt-28 grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
          <div>
            <h2 className="h-display text-[clamp(2.6rem,6vw,4.5rem)]">Why choose us</h2>
            <p className="mt-6 text-xl md:text-2xl text-choco/80 max-w-xl leading-relaxed">
              We're here to help you find a new family member. From the moment you visit our site to the joyful day your puppy arrives at your door, we're with you every step of the way. Our mission is to make the entire adoption process smooth, transparent, and full of love.
            </p>
          </div>
          <ul className="space-y-9 lg:pt-6">
            {WHY.map(([Icon, t, b]) => (
              <li key={t} className="flex gap-5">
                <Icon size={36} className="shrink-0 text-rust mt-1" />
                <div>
                  <h3 className="font-display font-black text-2xl leading-tight">{t}</h3>
                  <p className="mt-2 text-lg text-choco/75 leading-relaxed">{b}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-28 relative rounded-3xl border-[3px] border-choco bg-cream p-8 md:p-14 shadow-[6px_8px_0_rgba(42,23,16,.25)] grid md:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <h2 className="h-display text-4xl md:text-6xl">Unique and high quality puppies</h2>
            <p className="mt-6 text-xl text-choco/80 max-w-3xl leading-relaxed">
              When you choose TeddyPups, you can trust that you're getting a puppy of the highest quality. We also provide guidance and support to new pet owners, offering advice on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-wa !text-lg !px-8 !py-3.5"><MessageCircle size={20} />Ask us on WhatsApp</a>
              <Link to="/puppies" className="btn btn-line !text-lg !px-8 !py-3.5"><PawPrint size={20} />See available puppies</Link>
            </div>
          </div>
          <div className="relative hidden md:block w-56">
            <span className="absolute -top-2 left-6 rounded-full border-2 border-choco bg-cream px-4 py-1 font-hand text-base">hm?</span>
            <Dog pose="run" moving={false} className="w-52 mt-8" />
          </div>
        </section>
      </div>
    </div>
  )
}
