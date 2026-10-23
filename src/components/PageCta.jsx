import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { WA } from '../data'

export default function PageCta({ title = 'Ready to meet your new best friend?', children, secondary = { to: '/puppies', label: 'Browse puppies' } }) {
  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-16 mt-20">
      <div className="relative overflow-hidden rounded-3xl border-[3px] border-choco bg-[#2a1710] text-cream text-center px-6 py-14 shadow-[6px_8px_0_rgba(42,23,16,.25)]">
        {[8, 22, 41, 63, 78, 91].map((l, i) => <span key={l} className="absolute text-[10px] text-gold animate-twinkle pointer-events-none" style={{ left: `${l}%`, top: `${(i * 37) % 80 + 6}%`, animationDelay: `${i * 0.4}s` }}>✦</span>)}
        <h2 className="h-display relative text-4xl md:text-5xl max-w-2xl mx-auto">{title}</h2>
        {children && <p className="relative mt-4 max-w-xl mx-auto opacity-85">{children}</p>}
        <div className="relative mt-8 flex flex-wrap gap-4 justify-center">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-wa"><MessageCircle size={16} />Enquire on WhatsApp</a>
          <Link to={secondary.to} className="btn !bg-transparent !text-cream !border-cream/80">{secondary.label}</Link>
        </div>
      </div>
    </section>
  )
}
