import { escape } from 'querystring'

const customerToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1NDY3NjQ1MSIsImN1c3RvbWVyIjoiVHJ1ZSIsImV4cCI6MTcyMTExMTYxOX0.L-3B2deA2RVzBPrGWxMEGkTgq6wX-yafMhpSSp7EvQM'
const shopId = '15124f8d-2c8c-4dda-a04c-31c16816f9b6'
const defaultOptions = {
  headers: {
    Authorization: `Bearer ${customerToken}`,
    'Content-Type': 'application/json',
  },
}
interface FetchOptions extends RequestInit {
  params?: { [key: string]: string }
  returnHeaders?: boolean
}

const apiUrl = 'https://customers-api.billgang.com'
async function request(baseURL: string, options: FetchOptions = {}) {
  const url = new URL(`${apiUrl}/${shopId}/${baseURL}`)
  const { params, returnHeaders, ...fetchOptions } = options // Exclude params from fetch options

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
    } else {
      return data
    }
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

export const fetchDashInfo = () => request('customers/dash/info')
export const fetchHome = () => request('customers/dash/dashboard/home')
export const fetchOrders = async (PageNumber: string, PageSize: string) => {
  const res = await request('customers/orders', {
    params: { PageNumber, PageSize },
    returnHeaders: true,
  })
  const totalCount = res.headers.get('x-pagination-total')
  return { list: res.data, totalCount }
}
