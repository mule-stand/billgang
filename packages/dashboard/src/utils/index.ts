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
  let date = new Date(isoTime)
  let dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  let timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  }
  let formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(date)
  let formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date)
  return {
    date: formattedDate,
    time: formattedTime,
  }
}
