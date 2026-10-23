import Hero from '../components/Hero'
import Pups from '../components/Pups'
import useTitle from '../components/useTitle'
import { TwoWays, Journey, Passport, Families, Faq, Cta } from '../components/Features'

export default function Home() {
  useTitle('')
  return <><Hero /><Pups /><TwoWays /><Journey /><Passport /><Families /><Faq /><Cta /></>
}
