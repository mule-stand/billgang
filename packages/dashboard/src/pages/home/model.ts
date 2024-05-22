import { fetchHome } from '../../api/index.js'
import { reatomAsync, withDataAtom, onConnect } from '@reatom/framework'

export const getHome = reatomAsync(fetchHome).pipe(withDataAtom(null))
onConnect(getHome.dataAtom, getHome)
