import { atom, onConnect, reatomAsync, withDataAtom } from '@reatom/framework'
import { fetchOrders } from '../../api/index.js'

export const pageNumberAtom = atom(1)

export const getOrders = reatomAsync((ctx) =>
  fetchOrders({ PageNumber: ctx.get(pageNumberAtom) }),
).pipe(withDataAtom(null))

pageNumberAtom.onChange((ctx) => {
  getOrders(ctx)
})

onConnect(getOrders.dataAtom, getOrders)
