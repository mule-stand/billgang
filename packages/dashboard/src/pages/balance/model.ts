import { atom, onConnect, reatomAsync, withDataAtom } from '@reatom/framework'
import { z } from 'zod'

import {
  fetchBalance,
  fetchBalanceSettings,
  fetchTransactions,
  postBalanceTopUp,
} from '../../api/index.js'

import { getGatewaysDetail } from '../../api/gateway.js'
import { getDashInfo } from '../../components/sidebar/model.js'
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

const BaseTopUpSettingsSchema = z.object({
  gateways: z.array(z.string()),
  currency: z.string(),
})

const TopUpBonusEnabledSchema = z.object({
  topUpBonusEnabled: z.literal(true),
  minimumTopUpForBonus: z.number(),
  bonusPercent: z.number().int(),
})

const TopUpBonusDisabledSchema = z.object({
  topUpBonusEnabled: z.literal(false),
  minimumTopUpForBonus: z.number().optional(),
  bonusPercent: z.number().int().optional(),
})

const CashbackEnabledSchema = z.object({
  cashbackEnabled: z.literal(true),
  cashbackPercent: z.number().int(),
})

const CashbackDisabledSchema = z.object({
  cashbackEnabled: z.literal(false),
  cashbackPercent: z.number().int().optional(),
})

const TopUpSettingsSchema = BaseTopUpSettingsSchema.and(
  TopUpBonusEnabledSchema.or(TopUpBonusDisabledSchema).and(
    CashbackEnabledSchema.or(CashbackDisabledSchema),
  ),
)

const BalanceTopUpSettingsSchema = z.object({
  isEnabled: z.boolean(),
  topUpSettings: TopUpSettingsSchema,
})
const RequestTopUpBalanceSchema = z.object({
  data: z.object({
    chargeId: z.string(),
  }),
})

export type Transaction = z.infer<typeof TransactionScheme>
export type BalanceTopUpSettings = z.infer<typeof BalanceTopUpSettingsSchema>

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

export const getBalanceSettings = reatomAsync(async (ctx) => {
  const res = parseResult(
    await fetchBalanceSettings(),
    BalanceTopUpSettingsSchema,
  )
  getGatewaysDetail(ctx, res.topUpSettings.gateways)
  return res
}).pipe(withDataAtom(null))

export const requestTopUpBalance = reatomAsync(
  async (ctx, { price, gateway }) =>
    parseResult(
      await postBalanceTopUp({
        customerEmail: ctx.get(getDashInfo.dataAtom)?.email ?? '',
        price,
        gateway,
      }),
      RequestTopUpBalanceSchema,
    ),
).pipe(withDataAtom(null))

pageNumberAtom.onChange((ctx) => {
  getTransactions(ctx)
})

onConnect(getTransactions.dataAtom, getTransactions)
onConnect(getBalance.dataAtom, getBalance)
onConnect(getBalanceSettings.dataAtom, getBalanceSettings)
