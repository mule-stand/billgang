import { atom, onConnect, reatomAsync, withDataAtom } from '@reatom/framework'
import { fetchOrders } from '../../api/index.js'
export const PageSize = 10

export const pageNumberAtom = atom(1)

export const getOrders = reatomAsync((ctx) =>
  fetchOrders({ PageNumber: ctx.get(pageNumberAtom), PageSize }),
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
