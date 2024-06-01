import { atom, onConnect, reatomAsync, withDataAtom } from '@reatom/framework'
import { fetchTransactions } from '../../api/index.js'

export const pageNumberAtom = atom(1)
export const getTransactions = reatomAsync((ctx) =>
  fetchTransactions({ PageNumber: ctx.get(pageNumberAtom) }),
).pipe(withDataAtom(null))

pageNumberAtom.onChange((ctx) => {
  getTransactions(ctx)
})

onConnect(getTransactions.dataAtom, getTransactions)
