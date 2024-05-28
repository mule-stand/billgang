import { fetchRewards } from '../../api/index.js'
import { reatomAsync, withDataAtom, onConnect } from '@reatom/framework'

export const getRewards = reatomAsync(fetchRewards).pipe(withDataAtom(null))

onConnect(getRewards.dataAtom, getRewards)
