import { logoutCustomer, tokenAtom } from '../auth/model.js'
import { ctx } from '../index.js'
// rewards user
// export const shopDomen = 'dfbd.billgang.store'
// const shopId = '38332d9f-3bb6-4b3f-ac68-90151b968958'
// const customerToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1NDY4Njg2MiIsImN1c3RvbWVyIjoiVHJ1ZSIsImV4cCI6MTcyMTk2NTQ2OX0.7-2-sy0fje93JzyXNY5JK6a1CbOPQPVDlJ93Ul3kH34'

// default user
// export const shopDomen = 'min.billgang.store'
// const shopId = '71676f46-2af8-4519-8901-7550f14ad15a'
// const customerToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1NDY3NjQ1MSIsImN1c3RvbWVyIjoiVHJ1ZSIsImV4cCI6MTcyMTExMTYxOX0.L-3B2deA2RVzBPrGWxMEGkTgq6wX-yafMhpSSp7EvQM'

// oreshaver
export const shopDomen = 'oreshaver.billgang.store'
const shopId = '15124f8d-2c8c-4dda-a04c-31c16816f9b6'
//const customerToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1NDY5MDQ0NyIsImN1c3RvbWVyIjoiVHJ1ZSIsImV4cCI6MTcyMzA0Mjg0MH0.ehBdy8JxhriwhTaTPuyxKmOLgGMW67NdVBEtSc9ssRE'
const UNAUTHORIZED_STATUS_CODE = 401
type FetchOptions = RequestInit & {
  params?: { [key: string]: string }
  returnHeaders?: boolean
}
type PageType = {
  PageNumber: number
}

type PageWithUrlType = PageType & {
  url: string
}

const apiUrl = 'https://customers-api.billgang.com'
export const apiUrlWithShopId = `${apiUrl}/${shopId}`
export const apiUrlWithShopDomen = `${apiUrl}/${shopDomen}`

async function request(baseURL: string, options: FetchOptions = {}) {
  const { params, returnHeaders, ...fetchOptions } = options
  const customerToken = ctx.get(tokenAtom)
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${customerToken}`,
  }

  const url = new URL(`${apiUrlWithShopId}/${baseURL}`)

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.append(key, value)
      }
    }
  }

  try {
    const response = await fetch(url.toString(), {
      ...fetchOptions,
      headers,
    })
    if (!response.ok) {
      throw response
    }
    const data = await response.json()
    if (returnHeaders) {
      return { headers: response.headers, data }
    }
    return data
  } catch (error) {
    if (
      error instanceof Response &&
      error.status === UNAUTHORIZED_STATUS_CODE
    ) {
      console.error('Unauthorized error, token might be invalid:', error)
      logoutCustomer(ctx)
    } else {
      console.error('Fetch error:', error)
    }
    throw error
  }
}

export const fetchDashInfo = () => request('customers/dash/info')
export const fetchHome = () => request('customers/dash/dashboard/home')
export const fetchRewards = () => request('customers/rewards')
export const fetchBalance = () => request('customers/balance')

export const PageSize = 10

export const fetchWithPages = async ({ url, PageNumber }: PageWithUrlType) => {
  const res = await request(url, {
    params: {
      PageNumber: PageNumber.toString(),
      PageSize: PageSize.toString(),
    },
    returnHeaders: true,
  })
  const totalCount = Number(res.headers.get('x-pagination-total'))
  return { list: res.data, totalCount }
}
export const fetchOrders = ({ PageNumber }: PageType) =>
  fetchWithPages({ url: 'customers/orders', PageNumber })

export const fetchTransactions = ({ PageNumber }: PageType) =>
  fetchWithPages({
    url: 'customers/balance/transactions',
    PageNumber,
  })
