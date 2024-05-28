import { onConnect, reatomAsync, withDataAtom } from '@reatom/framework'
import { fetchRewards } from '../../api/index.js'

export const getRewards = reatomAsync(fetchRewards).pipe(withDataAtom(null))

onConnect(getRewards.dataAtom, getRewards)
