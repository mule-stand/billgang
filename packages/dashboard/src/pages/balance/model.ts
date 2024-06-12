import { atom, onConnect, reatomAsync, withDataAtom } from '@reatom/framework'
import { z } from 'zod'

import { fetchBalance, fetchTransactions } from '../../api/index.js'
import { PriceSchema, parseResult } from '../../utils/index.js'

export const pageNumberAtom = atom(1)
export enum TransactionStatus {
  Added = 'ADDED',
  Removed = 'REMOVED',
}
const TransactionScheme = z.object({
  id: z.string().uuid(),
  price: PriceSchema,
  createdAt: z.string().datetime(),
  description: z.string(),
  status: z.nativeEnum(TransactionStatus),
})

const ResultScheme = z.object({
  list: z.array(TransactionScheme),
  totalCount: z.number(),
})
const BalanceScheme = z.object({
  currency: z.string(),
  manualBalance: z.number(),
  realBalance: z.number(),
})

export type Transaction = z.infer<typeof TransactionScheme>

export const getTransactions = reatomAsync(async (ctx) =>
  parseResult(
    await fetchTransactions({ PageNumber: ctx.get(pageNumberAtom) }),
    ResultScheme,
  ),
).pipe(withDataAtom(null))

export const getBalance = reatomAsync(async () => {
  const result = parseResult(await fetchBalance(), BalanceScheme)
  return {
    amount: result.realBalance + result.manualBalance,
    currency: result.currency,
  }
}).pipe(withDataAtom(null))
pageNumberAtom.onChange((ctx) => {
  getTransactions(ctx)
})

onConnect(getTransactions.dataAtom, getTransactions)
onConnect(getBalance.dataAtom, getBalance)
