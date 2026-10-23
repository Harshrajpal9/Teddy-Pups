import { useState } from 'react'
import { PawPrint } from 'lucide-react'
import Dog from '../components/Dog'
import useTitle from '../components/useTitle'
import { BREEDS, CONTACT, SHOWROOM, WA, waLink } from '../data'

const blank = 'mx-1 bg-transparent border-0 border-b-[1.5px] border-dashed border-rust/60 px-1 py-0.5 font-hand text-rust focus:outline-none focus:border-solid placeholder:text-choco/30 text-base md:text-lg'

const Skyline = () => (
  <svg className="absolute right-0 bottom-0 w-[78%] h-24 pointer-events-none" viewBox="0 0 300 96" preserveAspectRatio="xMaxYMax meet" fill="none" stroke="#e6b676" strokeWidth="2.5" aria-hidden="true">
    <path d="M0 96V60h22V40h18v56M52 96V70h16v26M84 96V56l12-10 12 10v40M120 96V30h14v66M146 96V20l5-14 5 14v76M170 96V50h20v46M202 96V36h14v60M228 96V62h22V44h16v52M278 96V70h22" />
  </svg>
)

export default function Contact() {
  useTitle('Visit & contact')
  const [f, setF] = useState({ name: '', phone: '', email: '', city: '', interest: '', msg: '' })
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value })

  // no backend: the form opens WhatsApp with the message already written
  const send = (e) => {
    e.preventDefault()
    const l = [`Dear TeddyPups, my name is ${f.name.trim() || 'a future puppy parent'}.`]
    if (f.phone.trim()) l.push(`You can reach me on ${f.phone.trim()}.`)
    if (f.email.trim()) l.push(`Email: ${f.email.trim()}.`)
    if (f.city.trim()) l.push(`I live in ${f.city.trim()}.`)
    l.push(`I'm curious about: ${f.interest || 'any puppy (not sure yet)'}.`)
    if (f.msg.trim()) l.push(f.msg.trim())
    l.push('With love, a future puppy parent')
    window.open(waLink(l.join('\n')), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="page-in pt-28 pb-24 bg-gradient-to-b from-cream via-[#fff3d9] to-[#f9dfa8] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          <h1 className="h-display text-[clamp(3.2rem,9vw,6.5rem)]">Get in touch<br />with us</h1>
          <p className="max-w-xl text-lg md:text-xl text-choco/75 lg:pb-3">
            Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we'd love to hear from you!
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-[minmax(0,480px)_1fr] gap-10 lg:gap-14 items-start">
          <div>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-wa !py-3 !px-7 !text-base">WhatsApp {CONTACT.phone}</a>
            <div className="mt-7 space-y-5 text-base">
              <div><p className="font-hand text-lg">call us</p><a href={`tel:${CONTACT.tel}`} className="underline decoration-rust underline-offset-2 font-semibold">{CONTACT.phone}</a></div>
              <div><p className="font-hand text-lg">email</p><a href={`mailto:${CONTACT.email}`} className="underline decoration-rust underline-offset-2 font-semibold break-all">{CONTACT.email}</a></div>
            </div>

            <div className="relative mt-8 overflow-hidden rounded-2xl border border-choco bg-[#fbe6bd]">
              <div className="h-4 border-b border-choco" style={{ background: 'repeating-linear-gradient(90deg,#b8562c 0 14px,#fff 14px 28px)' }} />
              <Skyline />
              <div className="relative p-6 sm:pr-[42%] sm:pb-7">
                <h2 className="h-display text-2xl md:text-3xl">Visit us in Downtown Dubai</h2>
                <p className="mt-3 text-sm md:text-base text-choco/80 leading-relaxed">Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.</p>
                <p className="mt-4 flex items-center gap-2 text-sm md:text-base font-semibold"><PawPrint size={16} className="text-rust shrink-0" />{CONTACT.address}</p>
                <a href="https://www.google.com/maps?q=Downtown+Dubai" target="_blank" rel="noopener noreferrer" className="btn btn-line mt-5 !py-2.5 !px-5 !text-sm !border !rounded-full">Open in Google Maps</a>
              </div>
              <div className="relative mx-6 mb-6 w-36 sm:mx-0 sm:mb-0 sm:absolute sm:right-4 sm:bottom-4 sm:w-[34%] aspect-[3/4] rounded-t-full border-2 border-choco overflow-hidden bg-[#a8451d]">
                <img src={SHOWROOM} alt="A tiny teddy bear puppy held up in the TeddyPups showroom" loading="lazy" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="relative">
            <form onSubmit={send} className="relative rounded-[28px] border border-choco bg-cream p-7 md:p-10 pl-10 md:pl-14 shadow-[8px_8px_0_rgba(42,23,16,.12)]">
              <span className="absolute left-5 top-0 bottom-0 w-px bg-rust/30" aria-hidden="true" />
              <span className="absolute -top-4 -right-1 rotate-6 grid place-items-center w-14 h-14 rounded-xl border-2 border-dashed border-rust/60 bg-[#f6dfaa]" aria-hidden="true"><PawPrint className="text-rust" /></span>

              <p className="font-hand font-bold text-3xl md:text-4xl text-rust">Dear TeddyPups,</p>

              <p className="mt-6 text-base md:text-lg leading-[2.7]">
                my name is <input className={`${blank} w-48`} value={f.name} onChange={on('name')} autoComplete="name" aria-label="Your name" />, and you can reach me on
                <input className={`${blank} w-44`} value={f.phone} onChange={on('phone')} placeholder="+971 50 123 4567" inputMode="tel" autoComplete="tel" aria-label="Phone" /> or by email at
                <input className={`${blank} w-48`} type="email" value={f.email} onChange={on('email')} placeholder="optional" autoComplete="email" aria-label="Email" />.
              </p>
              <p className="text-base md:text-lg leading-[2.7]">
                I live in <input className={`${blank} w-44`} value={f.city} onChange={on('city')} placeholder="e.g. Dubai Marina" aria-label="Where you live" />, and I'm curious about
                <select className={`${blank} cursor-pointer`} value={f.interest} onChange={on('interest')} aria-label="Interested in">
                  <option value="">any puppy (not sure yet)</option>
                  {BREEDS.map((b) => <option key={b}>{b}</option>)}
                  <option>An imported puppy</option>
                  <option>Visiting the showroom</option>
                </select>.
              </p>

              <textarea rows={5} value={f.msg} onChange={on('msg')} placeholder="Anything else you'd like to tell us..." aria-label="Message"
                className="mt-3 w-full resize-y bg-transparent font-hand text-lg text-choco placeholder:text-choco/35 focus:outline-none"
                style={{ lineHeight: '28px', backgroundImage: 'repeating-linear-gradient(transparent 0 27px, rgba(42,23,16,.18) 27px 28px)' }} />

              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="font-hand text-base md:text-lg">with love, a future puppy parent</span>
                <button type="submit" className="btn btn-rust !py-3 !px-7 !text-base">Post my letter</button>
              </div>
            </form>
            <Dog className="absolute -bottom-16 right-2 w-20 md:w-24" />
          </div>
        </div>
      </div>
    </div>
  )
}
