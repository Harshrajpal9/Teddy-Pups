import { Link } from 'react-router-dom'
import useTitle from '../components/useTitle'
export default function NotFound() {
  useTitle('Page not found')
  return (
    <div className="dots-bg page-in pt-40 pb-32 px-6 text-center min-h-[75vh]">
      <p className="font-hand font-bold text-2xl text-rust">oops, wrong turn</p>
      <h1 className="h-display text-6xl md:text-8xl mt-2">404</h1>
      <p className="mt-4 text-choco/75">That page ran off with a ball.</p>
      <div className="mt-8 flex gap-4 justify-center flex-wrap"><Link to="/" className="btn btn-rust">Back home</Link><Link to="/puppies" className="btn btn-line">See puppies</Link></div>
    </div>
  )
}
