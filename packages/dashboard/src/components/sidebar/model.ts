import { onConnect, reatomAsync, withDataAtom } from '@reatom/framework'
import { fetchDashInfo } from '../../api/index.js'

export const getDashInfo = reatomAsync(fetchDashInfo).pipe(withDataAtom(null))

onConnect(getDashInfo.dataAtom, getDashInfo)
