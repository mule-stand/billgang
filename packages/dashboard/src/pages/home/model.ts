import { onConnect, reatomAsync, withDataAtom } from '@reatom/framework'
import { fetchHome } from '../../api/index.js'

export const getHome = reatomAsync(fetchHome).pipe(withDataAtom(null))
onConnect(getHome.dataAtom, getHome)
