import { Link } from 'react-router-dom'
import { Instagram, Facebook, Music2, Moon } from 'lucide-react'
import { WA, CONTACT } from '../data'

export default function Footer() {
  const stars = Array.from({ length: 16 }, (_, i) => ({ l: (i * 67) % 100, t: (i * 41) % 60, d: (i % 5) * 0.5 }))
  return (
    <footer id="site-footer" className="relative bg-[#241410] text-cream pt-24 pb-10 px-6 lg:px-16 overflow-hidden">
      {stars.map((s, i) => <span key={i} className="absolute text-gold animate-twinkle pointer-events-none select-none leading-none" style={{ left: `${s.l}%`, top: `${s.t}%`, fontSize: 8 + (i % 3) * 3, animationDelay: `${s.d}s` }}>✦</span>)}
      <Moon className="absolute right-[7%] top-10 text-gold animate-bob" fill="#f4d08a" size={34} />
      <div className="relative grid md:grid-cols-[2fr_1fr_1fr] gap-12">
        <div>
          <h2 className="font-hand font-bold text-5xl text-[#f9e3ae]">Home, at last.</h2>
          <p className="mt-4 text-sm max-w-sm opacity-85">TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.</p>
          {/* the dog from Companion sits in this basket */}
          <div id="dog-basket" className="mt-8 relative w-52 h-32">
            <span className="absolute -top-3 left-32 bg-cream text-choco rounded-full px-2 text-xs font-hand font-bold z-[46]">hm?</span>
            <div className="absolute inset-x-1 bottom-9 h-12 rounded-[50%] bg-[#5a3320] border-[3px] border-choco" />
            <div className="absolute inset-x-5 bottom-11 h-8 rounded-[50%] bg-[#f3dcae]" />
            <div className="absolute inset-x-0 bottom-0 h-14 z-[45] rounded-t-lg rounded-b-[28px] border-[3px] border-choco bg-[#d3a064] [background-image:repeating-linear-gradient(90deg,transparent_0_9px,rgba(42,23,16,.4)_9px_11px),repeating-linear-gradient(0deg,transparent_0_10px,rgba(42,23,16,.25)_10px_12px)]" />
            <div className="absolute -inset-x-1 bottom-12 h-4 z-[45] rounded-full border-[3px] border-choco bg-[#b9803f]" />
          </div>
        </div>
        <div><h3 className="font-hand font-bold text-gold text-lg">Explore</h3>
          <ul className="mt-3 space-y-2.5 text-sm font-semibold">{[['Available puppies', '/puppies'], ['Happy families', '/happy-families'], ['How it works', '/how-it-works'], ['Delivery & collection', '/how-it-works#delivery'], ['FAQ', '/faq'], ['Visit & contact', '/contact']].map(([l, to]) => <li key={l}><Link to={to} className="hover:text-gold transition-colors">{l}</Link></li>)}</ul></div>
        <div><h3 className="font-hand font-bold text-gold text-lg">Say hello</h3>
          <ul className="mt-3 space-y-2.5 text-sm"><li><a href={WA} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">WhatsApp {CONTACT.phone}</a></li><li><a href={`mailto:${CONTACT.email}`} className="hover:text-gold transition-colors">{CONTACT.email}</a></li><li>{CONTACT.address}</li></ul>
          <div className="mt-4 flex gap-2 flex-wrap">{[[Instagram, 'Instagram'], [Music2, 'TikTok'], [Facebook, 'Facebook']].map(([I, n], k) => <a key={n} href={CONTACT.socials[k][1]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 border border-cream/50 rounded-full px-3 py-1 text-xs font-semibold hover:bg-cream hover:text-choco transition"><I size={12} />{n}</a>)}</div></div>
      </div>
      <p className="relative mt-12 pt-6 border-t border-cream/10 text-xs opacity-70">© 2026 TeddyPups U.A.E. · every puppy is family</p>
    </footer>
  )
}
