import { fetchTransactions } from '../../api/index.js'
import { reatomAsync, withDataAtom, onConnect, atom } from '@reatom/framework'
export const PageSize = 10

export const pageNumberAtom = atom(1)
export const getTransactions = reatomAsync((ctx) =>
  fetchTransactions({ PageNumber: ctx.get(pageNumberAtom), PageSize }),
).pipe(withDataAtom(null))

pageNumberAtom.onChange((ctx) => {
  getTransactions(ctx)
})
export const getPaginationText = (page: number, totalEntries: number) => {
  const entriesPerPage = PageSize
  const startEntry = (page - 1) * entriesPerPage + 1
  const endEntry = Math.min(page * entriesPerPage, totalEntries)
  return `Showing ${startEntry}-${endEntry} entries of ${totalEntries}`
}
onConnect(getTransactions.dataAtom, getTransactions)
