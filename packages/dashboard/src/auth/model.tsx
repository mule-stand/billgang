import { action, atom, reatomAsync } from '@reatom/framework'
import { withLocalStorage } from '@reatom/persist-web-storage'
import { apiUrlWithShopDomen } from '../api/index.js'

export const tokenAtom = atom('').pipe(withLocalStorage('token'))
type OtpRequest = {
  requested: boolean
  email?: string
}
export const otpRequestAtom = atom<OtpRequest>({ requested: false, email: '' })

/*
 * OTP
 * */
export enum RequestOtpErrorCode {
  UNHANDLED = 0,
}

type RequestOtpParams = {
  email: string
  recaptcha: string
}

type AuthFetchParams = {
  url: string
  body: object
}
const authFetch = async ({ url, body }: AuthFetchParams) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    return {
      success: false,
      result: await response.json(),
    }
  }

  return {
    success: true,
    result: await response.json(),
  }
}

export const requestOtp = reatomAsync(
  async (_ctx, { email, recaptcha }: RequestOtpParams) => {
    const url = `${apiUrlWithShopDomen}/auth/otp/request`

    const { success } = await authFetch({
      url,
      body: {
        email,
        recaptcha,
      },
    })

    if (!success) {
      return {
        errorCode: RequestOtpErrorCode.UNHANDLED,
      }
    }

    return {
      errorCode: null,
    }
  },
)

/*
 * Auth
 * */
export enum LoginCustomerErrorCode {
  UNHANDLED = 0,
  INVALID_OTP = 1,
}
export const loginCustomer = reatomAsync(async (ctx, { otp, recaptcha }) => {
  const url = `${apiUrlWithShopDomen}/auth/otp/login`
  const email = ctx.get(otpRequestAtom).email

  const { success, result } = await authFetch({
    url,
    body: {
      email,
      otp,
      recaptcha,
    },
  })

  if (!success) {
    const errors = result.errors
    if (errors !== null) {
      if (errors.includes('Invalid OTP code')) {
        return {
          errorCode: LoginCustomerErrorCode.INVALID_OTP,
        }
      }
    }

    return {
      errorCode: LoginCustomerErrorCode.UNHANDLED,
    }
  }

  tokenAtom(ctx, result.data)
  return {
    errorCode: null,
  }
})

export const logoutCustomer = action((ctx) => {
  tokenAtom(ctx, '')
})
