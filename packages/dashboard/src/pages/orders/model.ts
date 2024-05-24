import { fetchOrders } from '../../api/index.js'
import { reatomAsync, withDataAtom, onConnect, atom } from '@reatom/framework'
export const PageSize = 10

export const pageNumberAtom = atom(1)
export const enum OrderStatus {
  NEW,
  PENDING,
  COMPLETED,
  CANCELLED,
  EXPIRED,
  FULL_DELIVERY_FAILURE,
  PARTIALLY_DELIVERED,
  REFUNDED,
  FAILED,
}
export const getOrders = reatomAsync((ctx) =>
  fetchOrders(ctx.get(pageNumberAtom).toString(), PageSize.toString()),
).pipe(withDataAtom(null))

pageNumberAtom.onChange((ctx) => {
  getOrders(ctx)
})
export const getPaginationText = (page: number, totalEntries: number) => {
  const entriesPerPage = PageSize
  const startEntry = (page - 1) * entriesPerPage + 1
  const endEntry = Math.min(page * entriesPerPage, totalEntries)
  return `Showing ${startEntry}-${endEntry} entries of ${totalEntries}`
}
onConnect(getOrders.dataAtom, getOrders)
