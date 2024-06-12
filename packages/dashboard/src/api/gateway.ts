import { reatomAsync, withDataAtom } from '@reatom/framework'
import { z } from 'zod'
import { fetchGatewaysDetail } from './index.js'

import { parseResult } from '../utils/index.js'
export enum PaymentMethod {
  BankCard = 'BANK_CARD',
  BankTransfer = 'BANK_TRANSFER',
  PayPal = 'PAYPAL',
  CashApp = 'CASHAPP',
  Crypto = 'CRYPTO',
  AppleGooglePay = 'APPLE_AND_GOOGLE_PAY',
  Custom = 'CUSTOM',
}

export const GatewayInfoSchema = z.array(
  z.object({
    name: z.string(),
    displayName: z.string(),
    logoCfImageId: z.string(),
    poweredByImageCfImageId: z.string().optional(),
    paymentMethods: z.array(z.nativeEnum(PaymentMethod)),
  }),
)
export type GatewayInfo = z.infer<typeof GatewayInfoSchema>

export const getGatewaysDetail = reatomAsync(async (_, gateways) =>
  parseResult(await fetchGatewaysDetail(gateways), GatewayInfoSchema),
).pipe(withDataAtom(null))
