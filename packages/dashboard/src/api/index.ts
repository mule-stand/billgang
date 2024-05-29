// rewards user
const customerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1NDY4Njg2MiIsImN1c3RvbWVyIjoiVHJ1ZSIsImV4cCI6MTcyMTk2NTQ2OX0.7-2-sy0fje93JzyXNY5JK6a1CbOPQPVDlJ93Ul3kH34'
const shopId = '38332d9f-3bb6-4b3f-ac68-90151b968958'

// default user
// const customerToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1NDY3NjQ1MSIsImN1c3RvbWVyIjoiVHJ1ZSIsImV4cCI6MTcyMTExMTYxOX0.L-3B2deA2RVzBPrGWxMEGkTgq6wX-yafMhpSSp7EvQM'
// const shopId = '15124f8d-2c8c-4dda-a04c-31c16816f9b6'

const defaultOptions = {
  headers: {
    Authorization: `Bearer ${customerToken}`,
    'Content-Type': 'application/json',
  },
}
type FetchOptions = RequestInit & {
  params?: { [key: string]: string }
  returnHeaders?: boolean
}
type PageType = {
  PageNumber: number
  PageSize: number
}

type PageWithUrlType = PageType & {
  url: string
}

const apiUrl = 'https://customers-api.billgang.com'
async function request(baseURL: string, options: FetchOptions = {}) {
  const url = new URL(`${apiUrl}/${shopId}/${baseURL}`)
  const { params, returnHeaders, ...fetchOptions } = options

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.append(key, value)
      }
    }
  }

  try {
    const response = await fetch(url.toString(), {
      ...defaultOptions,
      ...fetchOptions,
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
    console.error('Fetch error:', error)
    throw error
  }
}

export const fetchDashInfo = () => request('customers/dash/info')
export const fetchHome = () => request('customers/dash/dashboard/home')
export const fetchBalance = () => request('customers/dash/dashboard/home')
export const fetchRewards = () => request('customers/rewards')

export const fetchWithPages = async ({
  url,
  PageNumber,
  PageSize,
}: PageWithUrlType) => {
  const res = await request(url, {
    params: {
      PageNumber: PageNumber.toString(),
      PageSize: PageSize.toString(),
    },
    returnHeaders: true,
  })
  const totalCount = res.headers.get('x-pagination-total')
  return { list: res.data, totalCount }
}
export const fetchOrders = ({ PageNumber, PageSize }: PageType) =>
  fetchWithPages({ url: 'customers/orders', PageNumber, PageSize })

export const fetchTransactions = ({ PageNumber, PageSize }: PageType) =>
  fetchWithPages({
    url: 'customers/balance/transactions',
    PageNumber,
    PageSize,
  })
