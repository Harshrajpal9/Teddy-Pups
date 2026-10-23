import { useState } from 'react'
import { PUPS, WA } from '../data'

export default function Hero() {
  const [hover, setHover] = useState(null)
  const arches = [[8, 'h-24', 'hidden lg:block'], [1, 'h-36', 'hidden sm:block'], [2, 'h-28', ''], null, [3, 'h-32', ''], [4, 'h-40', 'hidden sm:block'], [14, 'h-24', 'hidden lg:block']]
  return (
    <section className="relative pt-32 text-center bg-gradient-to-b from-cream via-[#fff6e4] to-[#fdf1da] overflow-hidden">
      <div className="absolute left-1/2 top-40 -translate-x-1/2 w-[70vw] h-80 rounded-full bg-[#ffe9b8]/60 blur-3xl" />
      <p className="relative font-hand font-bold text-2xl text-rust inline-block">every puppy is family
        <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none"><path d="M0 4 Q12 0 25 4 T50 4 T75 4 T100 4" stroke="#9b411b" strokeWidth="1.5" fill="none" /></svg>
      </p>
      <h1 className="h-display relative text-[clamp(2.8rem,7vw,5.2rem)] mt-4 max-w-3xl mx-auto">Premium teacup puppies in Dubai</h1>
      <p className="relative mt-6 max-w-lg mx-auto text-lg text-choco/75">Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.</p>
      <div className="relative mt-7 flex flex-wrap gap-4 justify-center">
        <a href="#pups" className="btn btn-rust">View available puppies</a>
        <a href={WA} className="btn btn-line">Enquire on WhatsApp</a>
      </div>
      <div className="relative mt-14 flex items-end justify-center gap-2 sm:gap-4 xl:gap-10 px-4 h-52 overflow-visible">
        {arches.map((a, i) => a ? (
          <div key={i} className={`relative shrink-0 ${a[2]}`} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
            style={{ animation: `rise .9s cubic-bezier(.2,.8,.2,1) ${i * 0.12}s both` }}>
            <div className="transition-transform duration-300 ease-out" style={{ transform: hover === i ? 'translateY(-16px)' : 'none' }}>
              <span className={`absolute -top-5 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap bg-white border-2 border-choco rounded-full px-3 py-0.5 font-hand font-bold text-sm -rotate-3 shadow transition-all duration-300 ${hover === i ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>{PUPS[a[0]].name}</span>
              <div className={`w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 ${a[1]} rounded-t-full border-[3px] border-choco overflow-hidden`}>
                <img src={PUPS[a[0]].photo} alt={PUPS[a[0]].name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        ) : (
          <div key={i} id="hero-dog-slot" className="shrink-0 -mb-2 w-28 sm:w-36 lg:w-44 aspect-[200/190]" />
        ))}
      </div>
      <div className="relative z-20 -mt-3 h-8 bg-[radial-gradient(circle_at_50%_100%,#fdf1da_58%,#2a1710_60%,#2a1710_64%,transparent_65%)] [background-size:68px_100%]" />
      <div className="argyle h-28 relative z-20" />
    </section>
  )
}
