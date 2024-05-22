import { fetchDashInfo } from '../../api/index.js'
import { reatomAsync, withDataAtom, onConnect } from '@reatom/framework'

export const getDashInfo = reatomAsync(fetchDashInfo).pipe(withDataAtom(null))

onConnect(getDashInfo.dataAtom, getDashInfo)
