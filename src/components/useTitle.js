import { useEffect } from 'react'
export default function useTitle(t) {
  useEffect(() => { document.title = t ? `${t} — TeddyPups U.A.E.` : 'TeddyPups U.A.E. — Premium teacup puppies in Dubai' }, [t])
}
