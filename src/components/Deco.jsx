import paw from '../assets/paw.png'

export default function Deco({ kind, style }) {
  const base = 'absolute pointer-events-none select-none'
  switch (kind) {
    case 'paw': return <img src={paw} alt="" draggable="false" className={`${base} w-3.5 opacity-80`} style={style} />
    case 'spark': return <span className={`${base} text-xl leading-none text-[#b5452a]`} style={style} aria-hidden="true">✦</span>
    case 'star': return <span className={`${base} text-2xl leading-none text-choco`} style={style} aria-hidden="true">✦</span>
    case 'heart': return <svg className={`${base} w-6 h-6`} style={style} viewBox="0 0 24 24" fill="none" stroke="#2a1710" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true"><path d="M12 20.5s-7.3-4.6-9.4-9A5.3 5.3 0 0 1 12 6.6a5.3 5.3 0 0 1 9.4 4.9c-2.1 4.4-9.4 9-9.4 9z" /></svg>
    case 'dots': return <svg className={`${base} w-5 h-4`} style={style} viewBox="0 0 20 16" fill="#2a1710" aria-hidden="true"><circle cx="4" cy="10" r="1.7" /><circle cx="10" cy="4" r="1.5" /><circle cx="16" cy="9" r="1.3" /></svg>
    case 'dash': return <svg className={`${base} w-4 h-5`} style={style} viewBox="0 0 16 20" stroke="#b5452a" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M2 4l9 3M2 11l9 3" /></svg>
    case 'swirl': return <svg className={`${base} w-5 h-5`} style={style} viewBox="0 0 24 24" fill="none" stroke="#b5452a" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 12m0 0a2 2 0 1 1 3 1.7 4.5 4.5 0 1 1-6.5-4.2 7 7 0 1 1 9.5 7" /></svg>
    default: return null
  }
}
