type ClassName = string | undefined | false | null
export type Price = {
  amount: number
  currency?: string
  quantity?: number
}

export const ccn = (...classNames: ClassName[]) => {
  return classNames.filter((name) => !!name).join(' ')
}

export const convertCfImageIdToUrl = (
  cfImageId: string,
  imageWidth = 'auto',
) => {
  return `https://imagedelivery.net/${cfImageId}/w=${imageWidth}`
}

export const formatPrice = (price: Price): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency || 'USD',
  })

  let amount = price.amount

  if (price.quantity) {
    amount = amount * price.quantity
  }

  return formatter.format(amount)
}

export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
export const extractDateAndTime = (isoTime: string) => {
  const date = new Date(isoTime)
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  }
  const dateString = date.toLocaleString('en-US', dateOptions)
  const timeString = date.toLocaleString('en-US', timeOptions)

  return [dateString, timeString]
}
