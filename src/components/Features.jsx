import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Plane, Headphones, Globe2, Send } from 'lucide-react'
import { useSectionProgress } from './useScroll'
import { PUPS, FAMILIES, FAQS, SHOWROOM, WA } from '../data'

const Stars = ({ n = 16, c = '#f4d08a' }) => (
  <>{Array.from({ length: n }, (_, i) => (
    <span key={i} className="absolute text-[10px] animate-twinkle pointer-events-none" style={{ color: c, left: `${(i * 53) % 100}%`, top: `${(i * 29) % 100}%`, animationDelay: `${(i % 6) * 0.4}s` }}>✦</span>
  ))}</>
)

export function TwoWays() {
  return (
    <section className="relative bg-gradient-to-b from-[#f6d796] to-[#f4cf85] pt-24 pb-28 px-6 text-center overflow-hidden">
      <h2 className="h-display text-4xl sm:text-5xl md:text-7xl max-w-2xl mx-auto">Two ways to meet your puppy</h2>
      <div className="relative mt-16 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-2 bottom-[-20px] w-5 bg-gradient-to-r from-[#a8662f] to-[#c98a45] border-[3px] border-choco rounded z-10" />
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -top-6 z-20 items-center">
          <span className="bg-[#d9923f] border-[3px] border-choco h-12 px-8 grid place-items-center font-display font-black text-xl -mr-1 [clip-path:polygon(0_0,100%_0,100%_100%,0_100%,12px_50%)] whitespace-nowrap">Puppies in Dubai</span>
          <span className="bg-[#d9923f] border-[3px] border-choco h-12 px-8 grid place-items-center font-display font-black text-xl [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_50%,calc(100%_-_12px)_100%,0_100%)] whitespace-nowrap">Imported for you</span>
        </div>
        <div className="pt-4 md:pt-16 md:pr-12 flex flex-col items-center">
          <h3 className="md:hidden font-display font-black text-2xl mb-6">Puppies in Dubai</h3>
          <div className="relative w-56 h-52">
            <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 220 110" fill="none" stroke="#b9893f" strokeWidth="2"><path d="M0 108H220M20 108V60h22v48M52 108V40h26v68M150 108V30h24v68M184 108V70h22v38"/></svg>
            <div className="absolute left-4 top-0 w-24 border-[3px] border-choco bg-cream">
              <div className="h-4 [background:repeating-linear-gradient(90deg,#a8451d_0_12px,#fff_12px_24px)]" />
              <img src={SHOWROOM} alt="Showroom" className="w-full h-28 object-cover" />
            </div>
            <span className="absolute bottom-0 left-2 font-hand text-xs">In our showroom</span>
          </div>
          <p className="max-w-xs mt-5 text-sm text-choco/75">See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
          <Link to="/puppies?origin=local" className="btn btn-rust mt-5">Meet local puppies</Link>
        </div>
        <div className="pt-4 md:pt-16 md:pl-12 flex flex-col items-center">
          <h3 className="md:hidden font-display font-black text-2xl mb-6">Imported for you</h3>
          <div className="relative w-64 h-52">
            <svg className="absolute inset-0" viewBox="0 0 260 200" fill="none"><path d="M30 150 Q130 20 230 120" stroke="#b5452a" strokeWidth="2" strokeDasharray="3 6" /><circle cx="30" cy="150" r="4" fill="#b5452a" /><circle cx="230" cy="120" r="4" fill="#b5452a" /></svg>
            <div className="absolute left-16 top-6 animate-fly"><Plane className="w-24 h-24 text-rust" fill="#fff" strokeWidth={1.5} /></div>
            <span className="absolute left-2 bottom-8 font-hand text-sm">Korea</span><span className="absolute right-0 bottom-14 font-hand text-sm">Dubai</span>
          </div>
          <p className="max-w-xs mt-5 text-sm text-choco/75">Exclusive Korean teacup puppies, delivered. Order from the world's most reputable breeders and let us handle the import.</p>
          <Link to="/puppies?origin=imported" className="btn btn-rust mt-5">See imported puppies</Link>
        </div>
      </div>
    </section>
  )
}

export function Journey() {
  const ref = useRef(null), p = useSectionProgress(ref)
  const idx = Math.min(2, Math.floor(p * 3))
  const steps = [
    ['Choose your breed', "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle."],
    ['Get photos & details', 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.'],
    ['Secure & safe delivery', 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.'],
  ]
  const Dots = () => <p className="bg-cream border-2 border-choco rounded-xl px-3 py-2 w-14 flex gap-1">{[0, 1, 2].map((i) => <i key={i} className="w-2 h-2 rounded-full bg-choco" style={{ animation: `dot 1.2s ${i * 0.2}s infinite` }} />)}</p>
  return (
    <section ref={ref} className="relative bg-gradient-to-b from-[#f4cf85] to-[#eeb35f] lg:h-[260vh]">
      <div className="py-20 px-6 lg:py-0 lg:sticky lg:top-0 lg:h-screen lg:pt-24 lg:px-20 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
        <div>
          <h2 className="h-display text-5xl md:text-7xl">Your puppy journey</h2>
          <p className="mt-4 max-w-md">A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.</p>
          <ol className="mt-8 space-y-7">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-4 transition-all duration-500" style={{ opacity: i === idx ? 1 : 0.35, transform: i === idx ? 'translateX(0)' : 'translateX(-6px)' }}>
                <span className={`shrink-0 grid place-items-center w-9 h-9 rounded-full border-2 font-display font-black ${i === idx ? 'bg-rust text-white border-choco' : 'border-rust/50 text-rust/60'}`}>{i + 1}</span>
                <div><h3 className="h-display text-2xl">{t}</h3><p className="text-sm text-choco/75 max-w-sm mt-1">{d}</p></div>
              </li>
            ))}
          </ol>
          <Link to="/how-it-works" className="btn btn-line mt-8 !bg-transparent">How it works</Link>
        </div>
        <div className="relative mx-auto w-[300px] max-w-full">
          <div className="rounded-[30px] border-[6px] border-choco bg-cream shadow-[10px_12px_0_rgba(42,23,16,.2)] overflow-hidden">
            <div className="px-4 py-3 flex items-center gap-2 border-b border-choco/15"><span className="w-8 h-8 rounded-full border-2 border-rust bg-gold" /><div className="text-sm font-bold leading-tight">TeddyPups U.A.E.<small className="block font-normal text-wa">{idx === 0 ? 'online' : 'typing...'}</small></div></div>
            <div className="h-72 p-3 flex flex-col justify-end gap-2 text-xs" style={{ backgroundColor: '#fbf1da', backgroundImage: 'radial-gradient(circle, rgba(155,65,27,.12) 3px, transparent 4px)', backgroundSize: '26px 26px' }}>
              <p className="self-end bg-gold border border-choco/40 rounded-xl p-2 max-w-[80%]">Hi TeddyPups! I'd love to know more about your puppies.</p>
              {idx >= 1 && <div className="grid grid-cols-2 gap-1.5 max-w-[88%] self-start">{[PUPS[1], PUPS[2]].map((x, k) => <img key={k} src={x.photo} alt="" className="h-20 w-full object-cover rounded-lg border-2 border-choco" />)}
                <div className="relative col-span-2 h-28 rounded-lg border-2 border-choco overflow-hidden"><img src={PUPS[0].photo} alt="" className="w-full h-full object-cover" /><span className="absolute inset-0 grid place-items-center"><i className="w-9 h-9 rounded-full bg-white/90 border-2 border-choco grid place-items-center text-xs">▶</i></span></div></div>}
              {idx >= 1 && <div className="bg-cream border-2 border-choco rounded-xl p-2 max-w-[88%]"><p>Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.</p>
                <div className="flex flex-wrap gap-1.5 mt-2">{['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'].map((b) => <span key={b} className="bg-gold border border-choco/50 rounded-full px-2 py-0.5 font-semibold">{b}</span>)}</div></div>}
              {idx === 2 && <p className="bg-cream border-2 border-choco rounded-xl p-2 max-w-[85%]">Once confirmed, we handle everything professionally and ensure your puppy reaches you safely.</p>}
              <Dots />
            </div>
            <div className="p-3 flex items-center border-t border-choco/15 text-xs">Say hello on WhatsApp<span className="ml-auto w-8 h-8 rounded-full bg-wa grid place-items-center text-white"><Send size={14} /></span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Passport() {
  const items = [
    [Heart, 'Vet-checked & healthy', 'Every puppy comes vaccinated, dewormed, and with a verified health certificate.', 'border-rust text-rust rounded-full'],
    [Plane, 'Korea to Dubai, safely', 'Trusted breeders, safe travel, and premium care from start to finish.', 'border-wa text-wa rounded-xl -rotate-3'],
    [Headphones, 'Support 24/7', 'Always here to help, from choosing your puppy to post-delivery support.', 'border-choco text-choco rounded-[50%]'],
    [Globe2, 'Trusted by families worldwide', 'Puppies delivered to loving homes all around the world.', 'border-rust text-rust rounded-full border-dotted'],
  ]
  return (
    <section className="relative bg-gradient-to-b from-[#eeb35f] via-[#e29d4a] to-[#b8622f] pb-0 pt-4 px-4">
      <div className="max-w-6xl mx-auto rounded-[22px] border-[6px] border-[#6b2f12] bg-[#8a3b17] p-3 shadow-[0_16px_0_rgba(0,0,0,.18)]">
        <div className="grid md:grid-cols-2 rounded-xl overflow-hidden bg-[#fbf3e1] [background-image:radial-gradient(circle,rgba(155,65,27,.07)_1px,transparent_2px)] [background-size:16px_16px] relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-choco/25 shadow-[0_0_30px_8px_rgba(0,0,0,.08)]" />
          <div className="p-10 md:p-14 flex flex-col justify-center"><p className="font-hand font-bold text-rust text-lg">puppy passport</p><h2 className="h-display text-5xl md:text-6xl mt-1">Why families trust TeddyPups</h2></div>
          <div className="p-8 grid sm:grid-cols-2 gap-x-8 gap-y-8">
            {items.map(([I, t, d, cls], i) => (
              <div key={t} className="text-center group">
                <div className={`mx-auto w-36 h-32 grid place-items-center border-[3px] ${cls} group-hover:rotate-0 transition-transform duration-300`}>
                  <div><I size={22} className="mx-auto" /><b className="font-display text-[13px] leading-tight block mt-1 px-2">{t}</b></div>
                </div>
                <p className="text-xs text-choco/70 mt-3 max-w-[200px] mx-auto">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative mt-16 h-44 max-w-6xl mx-auto">
        <div className="absolute right-[22%] bottom-6 w-32 h-32 rounded-full bg-[#ffd66b] shadow-[0_0_60px_20px_rgba(255,214,107,.45)] animate-bob" />
        <svg className="absolute inset-x-0 bottom-0 w-full h-28" viewBox="0 0 1000 110" preserveAspectRatio="none" fill="#a4521f" opacity=".75">
          <path d="M0 110V70h30V40h24v30h20V55h30v55h30V30h28v80h40V60h30v50h26V45h36v65h40V70h30v40h30V35h30v75h44V65h26v45h36V50h40v60h30V75h30v35H0z" /></svg>
      </div>
    </section>
  )
}

export function Families() {
  const tilt = [-3, 2, -1.5, 3, 1.5, -2, 2.5, -1]
  return (
    <section className="relative bg-gradient-to-b from-[#b8622f] to-[#6f3319] pt-24 text-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1.2fr_1fr] gap-10 items-start">
        <div><h2 className="h-display text-5xl md:text-7xl">Happy families &amp; puppies</h2>
          <p className="mt-5 max-w-lg text-sm opacity-90">We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.</p></div>
        <blockquote className="relative bg-cream text-choco rounded-2xl border-[3px] border-choco p-5 font-serif text-[15px] shadow-[4px_6px_0_rgba(0,0,0,.25)]">
          “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
          <footer className="font-hand font-bold mt-3 text-sm">Sarah M., Dubai, UAE</footer>
          <i className="absolute -bottom-3 left-10 w-5 h-5 bg-cream border-r-[3px] border-b-[3px] border-choco rotate-45" />
        </blockquote>
      </div>
      <div className="mt-12 h-3 bg-[#4a2210] border-y-2 border-black/40 shadow-lg" />
      <div className="bg-[#7a3a1d] wood pt-12 pb-10 relative">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          {FAMILIES.map((f, i) => (
            <figure key={i} className="relative bg-white p-2.5 pb-2 text-choco text-center shadow-2xl hover:!rotate-0 hover:scale-105 transition-transform duration-300" style={{ transform: `rotate(${tilt[i]}deg)`, marginTop: i % 2 ? 18 : 0 }}>
              <i className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#f1d9a0]/80 rotate-2" />
              <img src={f.src} alt="Happy family" className="aspect-[3/4] w-full object-cover" loading="lazy" />
              <figcaption className="font-hand font-bold text-sm mt-2">{f.cap}</figcaption>
            </figure>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-14 flex items-end justify-between">
          <div className="relative"><i className="block w-1 h-28 bg-[#2a1710]" /><i className="absolute -top-3 -left-3 w-7 h-6 rounded-t-full bg-[#ffd66b] shadow-[0_0_30px_10px_rgba(255,214,107,.35)]" /></div>
          <div className="w-20 h-28 rounded-t-full border-[3px] border-choco bg-[#a8451d] relative"><i className="absolute inset-y-2 left-1/2 w-px bg-choco/60" /></div>
          <Link to="/happy-families" className="btn btn-rust !border-choco">See every happy family</Link>
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section className="relative bg-gradient-to-b from-[#4a2616] to-[#2a1710] text-cream py-24 px-6 lg:px-16 grid lg:grid-cols-[1fr_1.2fr] gap-12 overflow-hidden">
      <Stars n={22} />
      <div className="relative">
        <h2 className="h-display text-5xl md:text-7xl">Questions, answered</h2>
        <Link to="/faq" className="btn mt-8 !bg-transparent !text-cream !border-cream/80">Read all questions</Link>
      </div>
      <ul className="relative space-y-7 max-w-xl">
        {FAQS.map(([q, a]) => (
          <li key={q} className="pl-6 relative"><span className="absolute left-0 top-1 text-gold">✦</span>
            <h3 className="h-display text-xl md:text-2xl leading-tight">{q}</h3><p className="text-sm opacity-85 mt-2 leading-relaxed">{a}</p></li>
        ))}
      </ul>
    </section>
  )
}

export function Cta() {
  return (
    <section className="relative bg-gradient-to-b from-[#2a1710] to-[#241410] text-cream pt-24 pb-20 px-6 text-center overflow-hidden">
      <Stars n={14} c="#c2703d" />
      <h2 className="h-display text-5xl md:text-7xl max-w-3xl mx-auto relative">Ready to meet your new best friend?</h2>
      <p className="relative mt-5 max-w-xl mx-auto opacity-85">Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.</p>
      <div className="relative mt-12 mx-auto w-[340px] h-[250px] max-[380px]:scale-90">
        <div className="absolute inset-x-0 bottom-6 top-6 rounded-t-xl bg-[#5a3320] wood border-2 border-black/30" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[110px] h-[200px] rounded-t-full border-[3px] border-choco overflow-hidden bg-[#ffd9a0] shadow-[0_0_40px_rgba(255,200,120,.35)]"><img src={PUPS[0].photo} alt="Max, waiting inside" className="w-full h-full object-cover" /></div>
        <div className="absolute left-[92px] top-[-8px] w-[34px] h-[208px] rounded-t-full bg-[#a8451d] border-[3px] border-choco -skew-y-3 origin-left"><i className="absolute left-1/2 -translate-x-1/2 top-8 w-3 h-6 rounded-full bg-[#ffd66b] border-2 border-choco" /></div>
        <span className="absolute right-6 top-14 w-5 h-7 rounded bg-[#ffd66b] shadow-[0_0_20px_6px_rgba(255,214,107,.5)]" />
        <i className="absolute left-4 bottom-8 w-12 h-16 rounded-t-3xl bg-[#4e9a4a] border-[3px] border-choco" /><i className="absolute right-4 bottom-8 w-12 h-16 rounded-t-3xl bg-[#4e9a4a] border-[3px] border-choco" />
        <div className="absolute inset-x-6 bottom-0 h-7 bg-[#3a2418] rounded" />
        <span className="absolute left-1/2 -translate-x-1/2 bottom-1 bg-[#f1c46d] text-choco border-2 border-choco px-4 font-hand font-bold text-sm">welcome home</span>
      </div>
      <div className="relative mt-8 flex gap-4 justify-center flex-wrap">
        <a href={WA} className="btn btn-wa">Enquire on WhatsApp</a>
        <Link to="/contact" className="btn !bg-transparent !text-cream !border-cream/80">Visit & contact</Link>
      </div>
    </section>
  )
}
