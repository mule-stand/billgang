import { fetchOrders } from '../../api/index.js'
import { reatomAsync, withDataAtom, onConnect, atom } from '@reatom/framework'

export const pageNumberAtom = atom(1)

export const getOrders = reatomAsync((ctx) =>
  fetchOrders(ctx.get(pageNumberAtom).toString()),
).pipe(withDataAtom(null))

pageNumberAtom.onChange((ctx) => {
  getOrders(ctx)
})

onConnect(getOrders.dataAtom, getOrders)
